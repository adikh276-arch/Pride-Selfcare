"use client";
import { usePathname } from "next/navigation";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const userId = sessionStorage.getItem("user_id");
  const location = usePathname();

  if (!userId) {
    // Phase 7, Step 4 — Failure Handling: hard redirect to /token
    window.location.href = "/token";
    return null;
  }

  return <>{children}</>;
};
