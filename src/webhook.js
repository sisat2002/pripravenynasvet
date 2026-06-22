// Replace with the real Google Apps Script / Sheets webhook URL when ready.
export const WEBHOOK_URL = "https://example.com/REPLACE_WITH_YOUR_GOOGLE_SHEET_WEBHOOK_URL";

export function sendContactToSheet({ method, value, result }) {
  if (!WEBHOOK_URL || WEBHOOK_URL.includes("REPLACE_WITH_YOUR_GOOGLE_SHEET_WEBHOOK_URL")) {
    console.warn("[webhook] WEBHOOK_URL is not configured yet — skipping send.", {
      method,
      value,
      result,
    });
    return;
  }

  const payload = {
    method,
    value,
    primary: result.primary,
    secondary: result.secondary,
    context: result.context,
    timestamp: new Date().toISOString(),
  };

  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error("[webhook] Failed to send contact data:", err);
  });
}
