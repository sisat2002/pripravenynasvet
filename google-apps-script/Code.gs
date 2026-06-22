// Paste this into your Apps Script project (replacing any existing doPost/doGet),
// bound to the target Google Sheet. Deploy as a Web App with access "Anyone".
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const method = e.parameter.method || "";
  const value = e.parameter.value || "";
  const primary = e.parameter.primary || "";
  const secondary = e.parameter.secondary || "";
  const context = e.parameter.context || "";
  const timestamp = e.parameter.timestamp || new Date().toISOString();

  sheet.appendRow([timestamp, method, value, primary, secondary, context]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
