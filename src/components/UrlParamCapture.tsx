"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function UrlParamCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    
    const upaId = searchParams.get("upa_id");
    const uid = searchParams.get("uid");

    if (upaId) sessionStorage.setItem("upa_id", upaId);
    if (uid) sessionStorage.setItem("uid", uid);

    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const isHub = pathname === "/" || pathname === "/pride" || pathname === "/pride/";
      if (isHub) {
        sessionStorage.setItem("opened_from_hub", "true");
        sessionStorage.setItem("hub_return_url", pathname + window.location.search);
      }
    }
  }, [searchParams]);

  return null;
}
