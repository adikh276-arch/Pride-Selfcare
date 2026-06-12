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
  }, [searchParams]);

  return null;
}
