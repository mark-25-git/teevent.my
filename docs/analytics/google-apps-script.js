/**
 * TEEVENT CLICK TRACKING - Google Apps Script
 * 
 * This script receives POST requests from the Teevent website
 * and logs button clicks to a Google Sheet.
 * 
 * Setup Instructions:
 * 1. Open Google Sheets and create a new spreadsheet named "Teevent Analytics"
 * 2. Create a sheet named "Click Count"
 * 3. Add headers in row 1: Date | Button | Detail
 * 4. Go to Extensions > Apps Script
 * 5. Delete any existing code and paste this script
 * 6. Click Save (Ctrl+S)
 * 7. Click Deploy > New Deployment
 * 8. Select type: Web App
 * 9. Settings:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 10. Click Deploy and copy the Web App URL
 * 11. Paste the URL in the website's analytics.js file
 */

// Configuration
const SHEET_NAME = 'Click Count';

/**
 * Handle POST requests from the website
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Log the click to Google Sheet
    logClick(data.button, data.detail);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Click tracked successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput('Teevent Click Tracking API is running. Use POST requests to log clicks.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Log a button click to the Google Sheet
 * @param {string} button - The button label/name
 * @param {string} detail - Additional details (optional, can be null or empty)
 */
function logClick(button, detail) {
  // Get the active spreadsheet (this script is bound to it)
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found. Please create it first.');
  }
  
  // Get current timestamp in Malaysia timezone (GMT+8)
  const timestamp = Utilities.formatDate(
    new Date(), 
    'Asia/Kuala_Lumpur', 
    'yyyy-MM-dd HH:mm:ss'
  );
  
  // Prepare the row data
  const rowData = [
    timestamp,           // Column A: Date/Time
    button,             // Column B: Button label
    detail || ''        // Column C: Detail (empty string if null/undefined)
  ];
  
  // Append the row to the sheet
  sheet.appendRow(rowData);
  
  Logger.log('Click logged: ' + button + ' at ' + timestamp);
}

/**
 * Test function - Run this to verify the script works
 * Click the play button next to this function to test
 */
function testLogClick() {
  // Test logging a simple button click
  logClick('Try Now', '');
  
  // Test logging a click with details
  const testDetail = 'Package: The Classic, Total Print Area: 1347.4 cm², Print Locations: 2 locations, Color Complexity: Full Color, Quantity: 50 pieces';
  logClick('Calculate Quote', testDetail);
  
  Logger.log('Test completed. Check your Google Sheet.');
}

/**
 * Initialize the sheet with headers (run once if needed)
 */
function initializeSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found. Please create it first.');
  }
  
  // Set headers
  const headers = ['Date', 'Button', 'Detail'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4285f4')
    .setFontColor('#ffffff');
  
  // Set column widths
  sheet.setColumnWidth(1, 180); // Date column
  sheet.setColumnWidth(2, 150); // Button column
  sheet.setColumnWidth(3, 500); // Detail column
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  Logger.log('Sheet initialized successfully');
}

