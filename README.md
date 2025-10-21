# Teevent Landing Page

> **Better custom event merchandise supplier in Malaysia**  
> T-shirts, lanyards, tote bags, and more for university events and local businesses.

**Live Site:** https://teevent.my

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone [repository-url]

# Open in browser (using Live Server or similar)
# Main file: index.html
```

---

## 📂 Project Structure

```
teevent-landing-page/v2/
├── index.html              # Main landing page
├── referral.html           # Referral program page
├── connect.html            # Connect page
│
├── scripts/
│   ├── main.js            # Core functionality
│   ├── analytics.js       # Click tracking analytics
│   └── quote-calculator.js # T-shirt quote calculator
│
├── styles/
│   └── main.css           # Complete design system
│
├── components/
│   └── footer.html        # Shared footer component
│
├── images/                # All image assets
│   ├── favicon/          # Favicon files (all sizes)
│   ├── hero/             # Hero section images
│   ├── products/         # Product images
│   ├── solution/         # Solution card images
│   ├── event-logos/      # Client logos
│   └── ...
│
├── docs/                  # 📚 Documentation
│   ├── analytics/        # Analytics setup & tracking guides
│   ├── seo/             # SEO optimization checklist
│   ├── deployment/      # Deployment & Git workflows
│   ├── business-overview.txt
│   └── modal-debugging-report.md
│
├── info/                 # Data files
│   ├── lanyard_quotes.json
│   └── tshirt_quotes.json
│
├── vercel.json          # Deployment configuration
├── sitemap.xml          # SEO sitemap
└── robots.txt           # Search engine rules
```

---

## ✨ Features

### 🎯 Core Functionality
- ✅ **T-Shirt Quote Calculator** - Real-time pricing with preset & custom modes
- ✅ **Interactive Pain Points** - WhatsApp-style chat animations
- ✅ **Solution Modals** - Detailed service information
- ✅ **Client Showcase** - Infinite scroll event logos
- ✅ **Testimonials** - Masonry layout with 5 reviews
- ✅ **Responsive Design** - Optimized for all devices

### 📊 Analytics & Tracking
- ✅ **Click Tracking System** - Google Sheets integration
- ✅ **9 Tracked Interactions** - Try Now, Calculate Quote, WhatsApp CTAs, Footer links
- ✅ **Detailed Configuration Logging** - Captures calculator settings
- ✅ **Conversion Funnel** - Track user journey from calculator to contact

### 🔍 SEO & Performance
- ✅ **Meta Tags** - Open Graph, Twitter Cards, Schema.org
- ✅ **Structured Data** - JSON-LD for Organization, Products, Reviews
- ✅ **Clean URLs** - Vercel rewrites remove `.html` extensions
- ✅ **Optimized Favicons** - Full coverage (16x16 to 512x512)
- ✅ **Performance** - Resource preloading, lazy loading

### 🎨 Design System
- ✅ **Mixed Theme** - Dark hero + bright content sections
- ✅ **Design Tokens** - CSS variables for colors, spacing, typography
- ✅ **Smooth Animations** - Fade-ins, hovers, modal transitions
- ✅ **Professional Typography** - Inter font family

---

## 📚 Documentation Index

### 📊 Analytics
| Document | Purpose |
|----------|---------|
| **[Setup Guide](docs/analytics/SETUP_GUIDE.md)** | Step-by-step analytics implementation |
| **[Tracked Buttons](docs/analytics/TRACKED_BUTTONS.md)** | All tracked interactions |
| **[Google Apps Script](docs/analytics/google-apps-script.js)** | Server-side tracking code |

**Quick Start:**
1. Create Google Sheet "Teevent Analytics"
2. Deploy `google-apps-script.js` as Web App
3. Update `scripts/analytics.js` with Web App URL
4. Deploy and test

### 🔍 SEO
| Document | Purpose |
|----------|---------|
| **[SEO Checklist](docs/seo/SEO_CHECKLIST.md)** | Complete optimization tasks |

### 🚀 Deployment
| Document | Purpose |
|----------|---------|
| **[GitHub Push Guide](docs/deployment/GITHUB_PUSH_README.md)** | Git workflow documentation |

### 💼 Business & Technical
| Document | Purpose |
|----------|---------|
| **[Business Overview](docs/business-overview.txt)** | Project context & goals |
| **[Modal Debugging](docs/modal-debugging-report.md)** | Technical implementation details |

---

## 🎯 Target Audience

### Primary Market
- **University Event Organizers** - Student clubs, societies, committees
- **Malaysian Universities** - UTAR, Sunway, UiTM, UKM, and more

### Secondary Market
- **Local Businesses** - Corporate events, team building
- **Event Agencies** - Merchandise suppliers

---

## 📈 Analytics Dashboard

### Tracked Interactions (9 total)

#### **Calculator Journey:**
1. **Try Now** - Hero button (opens calculator)
2. **Calculate Quote** - Generates price estimate
   - Logs full configuration details

#### **WhatsApp CTAs (4 buttons):**
3. **Get a Quote** - Header navigation
4. **team link** - Calculator disclaimer
5. **Work With Us** - Solutions section
6. **Choose Better** - Contact section

#### **Footer Links (3 links):**
7. **Instagram** - Social link
8. **Email (Copy)** - Email copy to clipboard
9. **WhatsApp** - Direct messaging

### Example Data Logged:
```
Date: 2025-10-21 23:45:30 | Button: Try Now
Date: 2025-10-21 23:46:15 | Button: Calculate Quote | Detail: Package: The Classic, Total Print Area: 1347.4 cm², Print Locations: 2 locations, Color Complexity: Full Color, Quantity: 50 pieces
Date: 2025-10-21 23:47:02 | Button: WhatsApp: Get a Quote | Detail: Header
Date: 2025-10-21 23:48:10 | Button: Footer: Instagram
```

**Full Setup:** See [Analytics Setup Guide](docs/analytics/SETUP_GUIDE.md)

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with Schema.org microdata
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No frameworks
- **Google Apps Script** - Analytics backend
- **Vercel** - Hosting & deployment
- **Google Sheets** - Analytics data storage

---

## 🚀 Deployment

### Automatic (Vercel)
```bash
# Push to main branch triggers deployment
git push origin main
```

### Manual
1. Upload all files to web server
2. Configure URL rewrites for clean URLs (see `vercel.json`)
3. Update analytics API URL in `scripts/analytics.js`

**Vercel Configuration:**
- Clean URLs (removes `.html`)
- Redirects for SEO
- Security headers

---

## 🔧 Development Guide

### Local Development
```bash
# Use Live Server or similar
# Open index.html in browser
# Edit and save - changes reflect immediately
```

### Analytics Testing
```javascript
// In scripts/analytics.js
const ANALYTICS_CONFIG = {
    debug: true,    // Enable console logs
    enabled: true   // Track clicks
};
```

Console will show:
```
Initializing Teevent Analytics...
✓ Try Now button tracking initialized
✓ 4 WhatsApp buttons tracking initialized
✓ 2 footer links tracking initialized
✓ Email copy tracking initialized
Tracking click: {button: 'Try Now', detail: '', ...}
```

**Before Production:** Set `debug: false`

---

## 📝 File Organization

### Active Pages
- `index.html` - Main landing page ✅
- `referral.html` - Referral program
- `connect.html` - Connect page

### Archive/Testing
- `quote-integrated.html` - Old calculator prototype
- `favicon-test.html` - Favicon testing page
- `push-to-github.bat` - Git helper script (Windows)

### Configuration
- `vercel.json` - Deployment config
- `site.webmanifest` - PWA manifest
- `browserconfig.xml` - IE/Edge tile config
- `robots.txt` - SEO crawler rules
- `sitemap.xml` - SEO sitemap

---

## 🎨 Quote Calculator

### Features:
- **Beta Badge** - Indicates testing phase
- **Two Modes:**
  - **Preset** - 3 pre-configured packages
  - **Draft** - Custom configuration builder

### Preset Packages:
1. **The Classic** (Popular) - Front: 10×10cm, Back: A3, Full color
2. **The Statement** (Premium) - Front: 10×10cm, Back: A3, Sleeves: 7×7cm, Full color
3. **The Essential** (Budget) - Front: 7×7cm, Back: A3, Limited colors

### Custom Mode:
- Material selection (Cotton/Microfiber)
- 4 print locations (Front, Back, Left Sleeve, Right Sleeve)
- Size quick-select buttons
- Color complexity options
- Custom names/numbers option
- Real-time price calculation

**Results:**
- Price range estimate
- Average price
- Configuration summary
- Based on historical order data

---

## 🎯 Design Highlights

### Color Palette
- **Primary:** `#007AFF` (Apple blue)
- **Dark Backgrounds:** `#000000`, `#0A0A0A`
- **Bright Backgrounds:** `#FFFFFF`, `#F5F5F5`
- **Text:** Responsive contrast for readability

### Typography
- **Font:** Inter (300-800 weights)
- **Scale:** 12px to 64px
- **Line Heights:** 1.2 to 1.8 for optimal reading

### Spacing System
- **Scale:** 4px base unit (4, 8, 12, 16, 24, 32, 48, 64, 80, 96)
- **Consistent:** Applied via CSS variables

---

## 📊 Performance

### Optimizations:
- ✅ Resource preloading (hero image, CSS, JS)
- ✅ DNS prefetch (fonts, CDNs)
- ✅ Lazy loading for below-fold images
- ✅ Optimized image formats (WebP)
- ✅ Minimal external dependencies

### Lighthouse Scores (Target):
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🔒 Privacy & Security

### Analytics Data:
- ✅ No personal information collected
- ✅ No cookies or tracking pixels
- ✅ Anonymous button click data only
- ✅ Data stored in your private Google Sheet

### Security Headers:
```json
"X-Content-Type-Options": "nosniff"
"X-Frame-Options": "DENY"
"X-XSS-Protection": "1; mode=block"
```

---

## 📞 Contact & Support

**Company:** Teevent Enterprise (202503285823)  
**Address:** No. 12, Taman Perdana, Jalan Bakri, 84000 Muar, Johor  
**Website:** https://teevent.my  
**Email:** team.teevent@gmail.com  
**WhatsApp:** +60 13-748 2481  
**Instagram:** [@team_teevent](https://www.instagram.com/team_teevent/)

---

## 📄 License

© 2025 Teevent Enterprise. All rights reserved.

---

## 🗺️ Sitemap

```
teevent.my/
├── /                 # Homepage (index.html)
├── /referral         # Referral program
└── /connect          # Connect page
```

---

**Last Updated:** October 21, 2025  
**Version:** 2.0  
**Status:** Production
