export const triggerActivityWebhook = async () => {
  if (typeof window === "undefined") return;

  const upa_id = sessionStorage.getItem("upa_id");
  const uid = sessionStorage.getItem("uid");

  if (!upa_id || !uid) {
    console.log("Missing upa_id or uid in sessionStorage. Webhook not triggered.");
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
