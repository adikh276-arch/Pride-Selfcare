export const triggerActivityWebhook = async () => {
  if (typeof window === "undefined") return;

  // Check sessionStorage first, then fallback to URL search parameters
  let upa_id = sessionStorage.getItem("upa_id");
  let uid = sessionStorage.getItem("uid");

  if ((!upa_id || !uid) && window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const paramUpaId = params.get("upa_id") || params.get("upaid");
    const paramUid = params.get("uid") || params.get("user_id");
    if (paramUpaId) {
      upa_id = paramUpaId;
      sessionStorage.setItem("upa_id", paramUpaId);
    }
    if (paramUid) {
      uid = paramUid;
      sessionStorage.setItem("uid", paramUid);
    }
  }

  // Notify parent window / React Native WebView of activity completion regardless of parameters
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "finish_activity", intent: "complete_activity", upa_id, uid }, "*");
      window.parent.postMessage("finish_activity", "*");
    }
    if ((window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify({
        type: "finish_activity",
        intent: "complete_activity",
        upa_id,
        uid
      }));
    }
  } catch (e) {
    console.warn("Could not post completion message to parent:", e);
  }

  if (!upa_id || !uid) {
    console.log("Missing upa_id or uid in sessionStorage/URL. Webhook API call not triggered.");
    return;
  }

  try {
    const response = await fetch("https://api.mantracare.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "complete_activity",
        upa_id: parseInt(upa_id, 10) || upa_id,
        uid: uid,
      }),
    });
    
    if (!response.ok) {
      console.error("Webhook failed:", await response.text());
    } else {
      console.log("Webhook triggered successfully.");
    }
  } catch (error) {
    console.error("Error triggering webhook:", error);
  }
};
