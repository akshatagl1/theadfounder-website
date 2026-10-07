// ============================================================
// GOOGLE APPS SCRIPT — paste this into your Google Sheet
// ============================================================
// SETUP STEPS:
// 1. Create a new Google Sheet (sheets.google.com)
// 2. Add these headers in Row 1: Timestamp | Name | Brand | Website | Monthly Spend | Challenge | WhatsApp
// 3. Go to Extensions > Apps Script
// 4. Delete the default code and paste this entire script
// 5. Click Deploy > New deployment
// 6. Type = "Web app"
// 7. Execute as = "Me"
// 8. Who has access = "Anyone"
// 9. Click Deploy, authorize when prompted
// 10. Copy the Web app URL
// 11. Paste that URL into script.js where it says 'YOUR_GOOGLE_SHEET_URL'
// ============================================================

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp,
    data.name,
    data.brand,
    data.website,
    data.spend,
    data.challenge,
    data.whatsapp
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput('The Ad Founder form endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
