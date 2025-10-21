# Teevent Click Tracking Setup Guide

## 📊 Overview

This analytics system tracks button clicks on the Teevent website and logs them to a Google Sheet for analysis.

### Tracked Buttons:
1. **Try Now** - Hero section button that opens the quote calculator
2. **Calculate Quote** - Calculator button that generates price estimates (includes configuration details)

---

## 🚀 Setup Instructions

### Step 1: Create Google Sheet

1. **Open Google Sheets**: https://sheets.google.com
2. **Create new spreadsheet** named: `Teevent Analytics`
3. **Create a sheet** named: `Click Count`
4. **Add headers** in Row 1:
   - Column A: `Date`
   - Column B: `Button`
   - Column C: `Detail`

Your sheet should look like this:
```
| Date | Button | Detail |
|------|--------|--------|
|      |        |        |
```

---

### Step 2: Deploy Google Apps Script

1. **Open your Google Sheet** (`Teevent Analytics`)

2. **Go to Extensions** > **Apps Script**

3. **Delete** any existing code in the editor

4. **Copy and paste** the entire contents of `analytics/google-apps-script.js`

5. **Save the project** (Ctrl+S or click disk icon)
   - Name it: `Teevent Click Tracker`

6. **Test the script** (Optional but recommended):
   - Select the `testLogClick` function from the dropdown
   - Click the ▶️ Run button
   - Authorize the script when prompted
   - Check your Google Sheet - you should see 2 test entries

7. **Deploy as Web App**:
   - Click **Deploy** > **New deployment**
   - Click ⚙️ (gear icon) next to "Select type"
   - Choose **Web app**
   - Configure settings:
     - **Description**: `Teevent Click Tracker v1`
     - **Execute as**: `Me (your email)`
     - **Who has access**: `Anyone`
   - Click **Deploy**
   - **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/AKfycbz.../exec`)

---

### Step 3: Configure Website

1. **Open** `scripts/analytics.js`

2. **Find line 10** (ANALYTICS_CONFIG):
   ```javascript
   apiUrl: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
   ```

3. **Replace** with your Web App URL from Step 2:
   ```javascript
   apiUrl: 'https://script.google.com/macros/s/AKfycbz.../exec',
   ```

4. **Optional**: Adjust settings:
   ```javascript
   enabled: true,  // Set to false to disable tracking
   debug: false    // Set to false in production to hide console logs
   ```

5. **Save the file**

---

### Step 4: Deploy to Production

1. **Commit all changes**:
   - `scripts/analytics.js` (with your Web App URL)
   - `scripts/quote-calculator.js` (updated)
   - `index.html` (analytics.js script tag added)

2. **Push to your website**

3. **Test the tracking**:
   - Visit your website
   - Click "Try Now" button
   - Fill out the calculator and click "Calculate Quote"
   - Check your Google Sheet - you should see the clicks logged!

---

## 📋 What Gets Tracked

### 1. "Try Now" Button
**Logged when:** User clicks the Try Now button in hero section

**Data recorded:**
- Date/Time: `2025-10-21 23:30:15`
- Button: `Try Now`
- Detail: (empty)

### 2. "Calculate Quote" Button
**Logged when:** User clicks Calculate Quote and results are displayed

**Data recorded:**
- Date/Time: `2025-10-21 23:35:42`
- Button: `Calculate Quote`
- Detail: `Package: The Classic, Total Print Area: 1347.4 cm², Print Locations: 2 locations, Color Complexity: Full Color, Quantity: 50 pieces`

**Example for Custom mode:**
- Detail: `Material: Cotton, Total Print Area: 1367.4 cm², Print Locations: 3 locations, Color Complexity: Full Color, Quantity: 80 pieces, Custom Names: Yes (+RM 1-3/pc)`

---

## 🔍 Viewing Analytics

### Google Sheet Data
Your Google Sheet will automatically populate with this format:

| Date | Button | Detail |
|------|--------|--------|
| 2025-10-21 23:30:15 | Try Now | |
| 2025-10-21 23:35:42 | Calculate Quote | Package: The Classic, Total Print Area: 1347.4 cm², Print Locations: 2 locations, Color Complexity: Full Color, Quantity: 50 pieces |
| 2025-10-21 23:40:10 | Try Now | |
| 2025-10-21 23:42:55 | Calculate Quote | Material: Microfiber, Total Print Area: 1911.1 cm², Print Locations: 3 locations, Color Complexity: Full Color, Quantity: 100 pieces, Custom Names: Yes (+RM 1-3/pc) |

### Creating Reports
You can use Google Sheets features to analyze:
- **Count clicks per button**: `=COUNTIF(B:B, "Try Now")`
- **Click rate**: Divide "Calculate Quote" by "Try Now"
- **Popular configurations**: Analyze the Detail column
- **Time-based analysis**: Group by date/hour

---

## 🛠️ Troubleshooting

### Clicks not being tracked?

1. **Check browser console** (F12):
   - Look for errors or warnings
   - If debug mode is on, you should see "Tracking click: Try Now"

2. **Verify API URL** in `scripts/analytics.js`:
   - Make sure it's your actual Web App URL
   - Should start with `https://script.google.com/macros/s/`
   - Should end with `/exec`

3. **Check Google Apps Script**:
   - Open Apps Script editor
   - Go to Executions (left sidebar)
   - See if requests are being received
   - Check for any errors

4. **Verify Sheet Name**:
   - Sheet name must be exactly "Click Count" (case-sensitive)

### CORS Errors?
This is normal! The script uses `mode: 'no-cors'` which means:
- You won't see response details in console
- But data is still being sent and logged
- Check your Google Sheet to confirm it's working

### Authorization Issues?
- Re-run the deployment
- Make sure "Who has access" is set to "Anyone"
- Try running `testLogClick()` function in Apps Script to re-authorize

---

## 🔒 Security & Privacy

- **No personal data** is collected (no names, emails, IPs)
- Only tracks: button clicks, timestamps, and calculator configurations
- Data is stored in your private Google Sheet
- You control all the data

---

## 📊 Future Enhancements

You can extend this system to track:
- More buttons (WhatsApp CTAs, Contact buttons)
- Page views
- Form submissions
- Time spent on page
- Scroll depth
- Modal open/close events

Just add more `trackClick()` calls in the appropriate event handlers!

---

## ✅ Quick Checklist

- [ ] Created "Teevent Analytics" Google Sheet
- [ ] Created "Click Count" sheet with headers (Date, Button, Detail)
- [ ] Opened Extensions > Apps Script from the Google Sheet
- [ ] Pasted the Google Apps Script code
- [ ] Deployed Google Apps Script as Web App
- [ ] Copied Web App URL
- [ ] Updated `scripts/analytics.js` with Web App URL
- [ ] Deployed to production
- [ ] Tested "Try Now" button tracking
- [ ] Tested "Calculate Quote" button tracking
- [ ] Verified data appears in Google Sheet

---

## 📞 Support

If you need help with setup, check:
1. Browser console for errors (F12)
2. Google Apps Script execution logs
3. This guide for common issues

---

**Happy tracking! 📊🎯**

