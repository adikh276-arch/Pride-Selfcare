"use client";
import { useEffect, useState, ReactNode } from 'react';
import { ensureUserInDb } from '@/app/actions/auth';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return typeof window !== 'undefined' ? !!(process.env.NEXT_PUBLIC_DEV_USER_ID || sessionStorage.getItem('user_id')) : false;
  });

  useEffect(() => {
    async function handshake() {
      // 1. Developer Bypass
      const devUserId = process.env.NEXT_PUBLIC_DEV_USER_ID;
      if (devUserId) {
        console.log('Dev Bypass: Setting test user ID');
        sessionStorage.setItem('user_id', devUserId);
        setIsAuthorized(true);
        return;
      }

      const url = new URL(window.location.href);
      const token = url.searchParams.get('token');
      const sessionUserId = sessionStorage.getItem('user_id');

      // 2. Session Check
      if (sessionUserId) {
        setIsAuthorized(true);
        return;
      }

      // 3. Token Extraction (URL or Cookie)
      let activeToken = token;
      if (!activeToken) {
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(row => row.startsWith('x-auth-token='));
        if (authCookie) {
          activeToken = authCookie.split('=')[1];
          console.log('Handshake: Found token in cookies');
        }
      }

      if (activeToken) {
        console.log('Handshake: Exchanging token for identity...');
        try {
          const res = await fetch('https://api.mantracare.com/user/user-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ token: activeToken })
          });

          if (res.ok) {
            const data = await res.json();
            const userId = data.user_id || data.userId;
            if (userId) {
              sessionStorage.setItem('user_id', userId.toString());
              
              // Call Next.js Server Action to insert user securely
              await ensureUserInDb(userId.toString());
              
              const savedPath = localStorage.getItem("APP_REDIRECT_PATH");
              if (savedPath) {
                localStorage.removeItem("APP_REDIRECT_PATH");
                window.location.replace(savedPath);
                return;
              }

              if (token) {
                url.searchParams.delete('token');
                window.history.replaceState({}, document.title, url.toString());
              }
              setIsAuthorized(true);
              return;
            }
          }
        } catch (err) {
          console.error('Handshake API error:', err);
        }
      }

      // 4. Final Fail: Redirect to external Auth Portal
      const currentPath = window.location.pathname + window.location.search;
      console.log('Handshake: No session or token found. Redirecting to Auth Portal...', currentPath);
      localStorage.setItem("APP_REDIRECT_PATH", currentPath);
      window.location.href = 'https://web.mantracare.com/app/pride';
    }

    handshake();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#F9F6FE]">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="mt-6 text-purple-900 font-medium">Authenticating...</p>
      </div>
    );
  }

  return <>{children}</>;
}
