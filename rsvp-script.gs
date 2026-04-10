// Paste this entire script into Google Apps Script (script.google.com)
// attached to your Google Sheet, then deploy as a Web App.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add headers on first run if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Attending', 'Extra Guests', 'Message']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }

  sheet.appendRow([
    new Date(),
    e.parameter.name      || '',
    e.parameter.email     || '',
    e.parameter.attending || '',
    e.parameter.guests    || '0',
    e.parameter.message   || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: get notified by email on every RSVP
function sendNotification(name, attending, guests) {
  var email = 'YOUR_EMAIL@gmail.com'; // ← change this
  var subject = '💌 New RSVP: ' + name;
  var body = name + ' has responded: ' + attending +
             (guests > 0 ? ' (+ ' + guests + ' guest' + (guests > 1 ? 's' : '') + ')' : '');
  MailApp.sendEmail(email, subject, body);
}
