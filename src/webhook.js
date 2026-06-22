export const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyk3IQ4jXm5cgb6gvHUGASrRgaCaprblsvTeNcN7N7Ml8LmAVna_E_oXM3NprV_2p8mWw/exec";

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

  // Apps Script + no-cors only tolerates "simple" content types, so we send
  // JSON as text/plain; Apps Script still reads it from e.postData.contents.
  fetch(WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error("[webhook] Failed to send contact data:", err);
  });
}
