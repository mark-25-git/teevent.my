# 📊 Teevent Analytics - Tracked Buttons & Actions

## All Tracked Interactions on Index.html

### 🎯 Hero Section
| Button | Action | Detail Logged |
|--------|--------|---------------|
| **Try Now** | Opens quote calculator modal | (empty) |

---

### 📱 WhatsApp Contact Buttons
| Button Text | Location | Detail Logged |
|-------------|----------|---------------|
| **Get a Quote** | Header (Navigation) | `Header` |
| **team** (link in calculator) | Calculator Modal | `Calculator Modal` |
| **Work With Us** | Solutions Section | `Solutions Section` |
| **Choose Better** | Contact CTA Section | `Contact CTA` |

**Logged as:** `WhatsApp: [Button Text]`  
**Detail:** Location on page

---

### 🧮 Quote Calculator
| Button | Action | Detail Logged |
|--------|--------|---------------|
| **Calculate Quote** | Generates price estimate | Full configuration: Package/Material, Total Print Area, Print Locations, Color Complexity, Quantity, Custom Names |

**Example Detail:**
```
Package: The Classic, Total Print Area: 1347.4 cm², Print Locations: 2 locations, Color Complexity: Full Color, Quantity: 50 pieces
```

---

### 🔗 Footer Links
| Link | Action | Detail Logged |
|------|--------|---------------|
| **Instagram** | Opens @team_teevent Instagram | (empty) |
| **Email** | Copies email to clipboard | `team.teevent@gmail.com` |
| **WhatsApp** | Opens WhatsApp chat | (empty) |

**Logged as:** `Footer: [Link Name]`

---

## 📋 Example Google Sheet Data

| Date | Button | Detail |
|------|--------|--------|
| 2025-10-21 23:45:30 | Try Now | |
| 2025-10-21 23:46:15 | Calculate Quote | Package: The Classic, Total Print Area: 1347.4 cm², Print Locations: 2 locations, Color Complexity: Full Color, Quantity: 50 pieces |
| 2025-10-21 23:47:02 | WhatsApp: Get a Quote | Header |
| 2025-10-21 23:48:10 | Footer: Instagram | |
| 2025-10-21 23:49:35 | Footer: Email (Copy) | team.teevent@gmail.com |
| 2025-10-21 23:50:12 | WhatsApp: Work With Us | Solutions Section |
| 2025-10-21 23:51:45 | WhatsApp: Choose Better | Contact CTA |

---

## 📊 Analytics Insights You Can Track

### **Conversion Funnel:**
1. **Top of Funnel**: Try Now clicks
2. **Middle**: Calculate Quote clicks
3. **Bottom**: WhatsApp contact clicks

### **User Journey:**
- How many users open the calculator?
- How many generate quotes?
- Which WhatsApp CTA converts best?
- Do users prefer footer or header contact?

### **Popular Configurations:**
- Analyze Calculator Quote details to see:
  - Most popular packages (Classic vs Premium vs Essential)
  - Typical quantities
  - Most requested configurations
  - Cotton vs Microfiber preference

### **CTA Performance:**
- **Header vs Solutions vs Contact CTA** - Which WhatsApp button works best?
- **Footer links** - Which social channel gets more clicks?
- **Email vs WhatsApp vs Instagram** - Preferred contact method

---

## 🎯 Business Metrics to Calculate

### **Calculator Engagement Rate:**
```
(Calculate Quote Clicks ÷ Try Now Clicks) × 100
```
Target: >70% (users who open calculator actually use it)

### **Quote-to-Contact Rate:**
```
(WhatsApp Clicks ÷ Calculate Quote Clicks) × 100
```
Target: >30% (users who get quote then contact you)

### **Overall Conversion Rate:**
```
(Total WhatsApp Clicks ÷ Try Now Clicks) × 100
```
Shows how many calculator visitors eventually contact you

### **CTA Location Performance:**
Compare WhatsApp clicks by location:
- Header
- Solutions Section
- Contact CTA
- Calculator Modal

---

## 🔧 Current Settings

**Tracking Status:** ✅ Enabled  
**Debug Mode:** ✅ ON (for testing - remember to turn OFF in production)  
**API Endpoint:** Configured and working

### To Disable Debug Logs:
In `scripts/analytics.js`, change:
```javascript
debug: false   // No console logs
```

---

## 📈 Total Tracked Elements

- ✅ 1 Calculator Open button (Try Now)
- ✅ 1 Calculator Submit button (Calculate Quote)
- ✅ 4 WhatsApp contact buttons
- ✅ 3 Footer social links
- ✅ **Total: 9 tracked interactions**

---

**All clicks are automatically logged to your Google Sheet in real-time!** 🚀📊

