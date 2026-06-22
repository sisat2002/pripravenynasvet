// Replace with the real Google Apps Script / Sheets webhook URL when ready.
export const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzjNCwmO19rpqejUPRoblXxqyCedZsoo-Vkq4D4Ibx3wBvaM8avXZmZZIqwxWBkjBkAng/exec";

export function sendContactToSheet({ method, value, result }) {
  if (!WEBHOOK_URL || WEBHOOK_URL.includes("REPLACE_WITH_YOUR_GOOGLE_SHEET_WEBHOOK_URL")) {
    console.warn("[webhook] WEBHOOK_URL is not configured yet — skipping send.", {
      method,
      value,
      result,
    });
    return;
  }

  const params = new URLSearchParams({
    method,
    value,
    primary: result.primary,
    secondary: result.secondary,
    context: JSON.stringify(result.context),
    timestamp: new Date().toISOString(),
  });

  // GET + no-cors avoids the request body entirely — Apps Script's doPost
  // never received e.postData under no-cors, so we pass everything as query
  // params instead and read them via e.parameter in doGet.
  fetch(`${WEBHOOK_URL}?${params.toString()}`, {
    method: "GET",
    mode: "no-cors",
  }).catch((err) => {
    console.error("[webhook] Failed to send contact data:", err);
  });
}
