import { useEffect, useState, ReactNode } from 'react';
import { sql } from '@/lib/db';

export function AuthGuard({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function handshake() {
      // 1. Check existing session
      const existingUserId = sessionStorage.getItem('user_id');
      if (existingUserId) {
        setIsAuthenticated(true);
        return;
      }

      // 2. Check URL for token
      const url = new URL(window.location.href);
      let token = url.searchParams.get('token');

      // 3. If no token, store path and attempt silent auth
      if (!token) {
        const currentPath = window.location.pathname + window.location.search;
        sessionStorage.setItem('auth_redirect_path', currentPath);
        
        try {
          // Attempt silent authentication via MantraCare API
          const authRes = await fetch('https://api.mantracare.com/user/get-token', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (authRes.ok) {
            const authData = await authRes.json();
            token = authData.token;
          }
        } catch (err) {
          console.error('Silent auth failed:', err);
        }
      }

      if (!token) {
        window.location.href = '/pride/token'; // Hard redirect if silent auth fails
        return;
      }

      try {
        // 4. Validation
        const res = await fetch('https://api.mantracare.com/user/user-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (!res.ok) {
          throw new Error('Handshake failed');
        }

        const data = await res.json();
        const userId = data.user_id;

        if (!userId) {
          throw new Error('No user_id in response');
        }

        // 5. Store in sessionStorage
        sessionStorage.setItem('user_id', userId);

        // 6. Database Upsert
        await sql`
          INSERT INTO users (id) 
          VALUES (${userId}) 
          ON CONFLICT (id) DO NOTHING
        `;

        // 7. Clean URL and redirect to stored path if exists
        const storedPath = sessionStorage.getItem('auth_redirect_path');
        if (storedPath) {
          sessionStorage.removeItem('auth_redirect_path');
          window.location.href = storedPath;
          return;
        }

        url.searchParams.delete('token');
        window.history.replaceState({}, document.title, url.toString());

        setIsAuthenticated(true);
      } catch (err) {
        console.error('AuthGuard Error:', err);
        window.location.href = '/pride/token';
      }
    }

    handshake();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
        <div className="text-lg animate-pulse">Authenticating...</div>
      </div>
    );
  }

  return <>{children}</>;
}
