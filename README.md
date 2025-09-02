# Teevent - Custom Merch That Actually Matters

## Project Overview

Teevent is a brand that provides customized event merchandise such as t-shirts, lanyards, tote bags, canvas bags, keychains, badge pins, and other event-related items in Malaysia.

Currently, our main target customers are university events, particularly student organizers. However, we are now expanding to serve local businesses as well.

## Current Implementation Status

### ✅ Completed Features
- **Mixed Theme Design**: Dark hero section with bright content sections
- **Pain Points Section**: Interactive chat animations demonstrating real pain points with uniform card heights
- **Solutions Section**: Modal-based solution cards with background images and CTA button
- **Custom Logo**: SVG logo integration in header
- **Responsive Design**: Mobile-first approach with consistent breakpoints
- **Chat Animations**: WhatsApp-style chat bubbles with custom emoji reactions
- **Modal System**: Interactive solution modals with detailed content
- **Optimized Interactions**: Refined hover effects and button behaviors
- **Plus Button Indicators**: Round plus buttons on solution cards for clickability
- **Simplified Product Cards**: Background image approach with natural text positioning
- **Updated Product Copywriting**: Concise, impactful product descriptions

### 🎯 Key Sections Implemented
1. **Hero Section**: Dark theme with gradient text and primary CTA
2. **Pain Points Section**: 3 interactive chat demonstrations with custom emoji reactions
3. **Solutions Section**: 3 solution cards with modal-based detailed content
4. **Products Section**: Bright theme with product cards
5. **Features Section**: Service benefits with clean presentation
6. **Vision Section**: Future platform vision with bright gradient text
7. **Contact Section**: Call-to-action with email integration

### 🎨 Design System Updates
- **Bright Theme Colors**: Added comprehensive bright theme palette
- **Custom Emojis**: Brand-specific reaction emojis for chat animations
- **Consistent Spacing**: Fixed width inconsistencies across sections
- **Enhanced Typography**: Responsive text scaling with proper hierarchy
- **Modal System**: Interactive modal design with backdrop blur and smooth animations
- **Solution Cards**: Background image integration with left-aligned text and enhanced typography

## Business Model

Teevent operates as an outsourced business. We outsource production to suppliers in China, who ship the products to Malaysia. Once the goods arrive, we handle quality checks and assessments before shipping them to our customers.

This outsourcing arrangement allows us to keep costs low, but it is not something we disclose to customers. From their perspective, we are the direct provider.

## Unique Selling Points

### Competitive Pricing
- Our products are priced to be student-friendly and affordable.
- Market research (done by requesting quotations from local suppliers) shows that our prices, especially for lanyards, are lower than most suppliers in Malaysia.
- Although occasionally customers may find lower quotations elsewhere, this is not frequent. Overall, our prices for lanyards and customized t-shirts remain highly competitive.

### Superior Customer Service
- Through market research, we noticed a common problem: most Malaysian suppliers reply very slowly, some do not reply at all, and their overall service is poor despite charging high prices.
- Teevent differentiates itself by being responsive, attentive, and reliable — qualities that are especially important for student organizers and businesses running time-sensitive events.

### Design Flexibility (Accepting Canva)
- Many suppliers in Malaysia only accept design files in Adobe formats such as Illustrator or Photoshop, which are difficult for the average student organizer to use.
- At Teevent, we also accept Canva designs — a popular and easy-to-use design platform. We then convert Canva files into the necessary Adobe formats.
- This lowers the barrier for customers and makes the ordering process much easier, especially for students who are not trained in design software.

### Lean Cost Structure
- We have no office, minimal staff, and low overheads.
- Our main cost is the cost of goods, allowing us to pass savings directly to customers.

### Quality Assurance
- Even with outsourcing, we ensure proper quality checks in Malaysia before delivery to customers.

## Current Focus

For now, our focus remains on customized merchandise, particularly:

- **Customized t-shirts**
- **Customized lanyards**
- **Canvas bags**
- **Tote bags**
- **Acrylic keychains**
- **Badge pins**

These are our strongest products because:
- We have reliable suppliers.
- Our quality is strong for the price.
- Our prices are extremely competitive in the market.
- Our ordering process is more customer-friendly compared to traditional suppliers.

## Future Vision

Looking ahead, Teevent plans to develop a centralized platform that connects event organizers with suppliers in Malaysia.

### The Problem
- Finding local suppliers is currently inefficient.
- We rely on searching through Google Maps, Google Search, or social media, which is time-consuming.
- Many Malaysian suppliers are still traditional businesses with weak online presence.
- Their responsiveness and customer service are poor, further slowing down the process.

### The Opportunity
- Existing platforms like Shopee are primarily B2C and focus on non-customized products.
- There is a gap in the market for a B2B platform tailored to event organizers and suppliers.

### The Solution
Teevent envisions building a centralized platform (similar to Grab, but for event supply needs) that directly connects event organizers with suppliers.

This would save time, improve efficiency, and create new business opportunities.

---

## Design System

### Overview
The Teevent design system is built around Apple.com-inspired aesthetics that reflect the brand's premium approach to custom merchandise. The design emphasizes clarity, elegance, and user experience while maintaining accessibility and performance.

### Design Philosophy
- **Apple-Inspired Aesthetics**: Clean, minimalist design with generous white space and refined typography
- **Premium Feel**: High-quality visual presentation that conveys trust and professionalism
- **Performance-First**: Fast loading, smooth animations, and responsive interactions
- **Accessibility**: High contrast, readable typography, and clear visual hierarchy
- **Modularity**: Reusable components that maintain consistency across the platform

### Color Palette

#### Primary Colors
- **Pure Black** `#000000` - Primary background and text
- **Pure White** `#ffffff` - Primary text on dark backgrounds
- **Primary Blue** `#007AFF` - Primary brand color, used for main actions and highlights
- **Primary Blue Hover** `#0056CC` - Hover state for primary actions
- **Primary Blue Light** `#3399FF` - Subtle hover state for buttons

#### Secondary Colors
- **Gray Scale**: Comprehensive gray palette from `#fafafa` to `#0a0a0a`
- **Background Colors**: `#111111`, `#1a1a1a` for section backgrounds
- **Text Colors**: `#a0a0a0`, `#737373`, `#525252` for secondary and tertiary text

#### Bright Theme Colors
- **Bright Primary**: `#ffffff` - White backgrounds for content sections
- **Bright Secondary**: `#f8f9fa` - Light gray backgrounds for alternating sections
- **Bright Tertiary**: `#e9ecef` - Slightly darker gray for contact section
- **Bright Card**: `#ffffff` - White card backgrounds
- **Bright Text Primary**: `#000000` - Black text on bright backgrounds
- **Bright Text Secondary**: `#495057` - Dark gray for secondary text
- **Bright Text Tertiary**: `#6c757d` - Medium gray for tertiary text

#### Color Usage Guidelines
- Use Pure Black for primary backgrounds (hero section)
- Pure White for primary text on dark backgrounds
- Primary Blue for CTAs and interactive elements
- Gray scale for secondary content and subtle elements
- Bright theme colors for content-heavy sections
- Maintain sufficient contrast ratios for accessibility

### Typography

#### Font Family
- **Inter** - Primary font family for all text (300, 400, 500, 600, 700, 800 weights)
- **System Fallbacks**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

#### Type Scale
- **Hero Title**: `clamp(3rem, 8vw, 6rem)` - Large, impactful hero text
- **Section Title**: `clamp(2.25rem, 6vw, 3.75rem)` - Section headers
- **Product Title**: `1.875rem` - Product and feature titles
- **Feature Title**: `1.5rem` - Feature card titles
- **Body Large**: `1.125rem` - Large body text
- **Body**: `1rem` - Main content
- **Small**: `0.875rem` - Captions and metadata

#### Typography Guidelines
- Use Inter for all text to maintain visual consistency
- Implement responsive typography with clamp() functions
- Maintain consistent line heights (1.5 for body, 1.25 for headings)
- Use appropriate font weights for hierarchy

### Layout System

#### Grid System
- **Container Width**: `max-width: 1200px`
- **Gutters**: `32px` on desktop, `24px` on mobile
- **Section Padding**: `128px` vertical, `64px` horizontal on desktop
- **Mobile Section Padding**: `64px` vertical, `24px` horizontal

#### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

#### Layout Guidelines
- Use CSS Grid for complex layouts
- Maintain consistent spacing using the 8px grid system
- Ensure responsive behavior across all breakpoints
- Use max-width containers for optimal reading experience

### Component Library

#### Buttons

##### Primary Button (btn-primary)
```css
.btn-primary {
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: var(--font-weight-semibold);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-full);
    text-decoration: none;
    display: inline-block;
    transition: all var(--transition-base);
    border: none;
    cursor: pointer;
}

.btn-primary:hover {
    background: var(--color-primary-light);
}

.btn-primary:active {
    background: var(--color-primary);
}

.nav .btn-primary {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
}
```

**Usage**: Primary CTAs, main actions (e.g., "Start Your Project", "Email Us")
**States**: Default (primary blue), hover (lighter blue), active (original blue)
**Features**: Pill-shaped design, subtle color transitions, consistent styling
**Design Tokens**: Centralized button styling with design token system
**Header Button**: Smaller size for compact navigation

#### Cards

##### Product Card
```css
.product-card {
    background: var(--bg-bright-card);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: var(--radius-3xl);
    overflow: hidden;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-bright-md);
    height: 636px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: var(--space-6) var(--space-4);
}

.product-card:hover {
    box-shadow: var(--shadow-bright-2xl);
}
```

**Usage**: Product displays, feature highlights
**States**: Default, hover (enhanced shadow effect)
**Elements**: Background image, title, description
**Products**: Custom T-Shirts, Custom Lanyards, Canvas Bags, Tote Bags, Acrylic Keychains, Badge Pins
**Current Product Count**: 6 product cards with background image approach
**Theme**: Bright theme with background images and natural text positioning

#### Product Cards (Current Implementation)
**Custom T-Shirts**:
- **Background Image**: `images/products/cotton-tshirt-1.webp`
- **Copy**: "A canvas for your design."
- **Features**: Background image approach with natural text positioning

**Custom Lanyards**:
- **Background Image**: `images/products/lanyard-1-1.webp`
- **Copy**: "Strong, vibrant, built to last."
- **Features**: Clean design with elegant typography

**Canvas Bags**:
- **Background Image**: `images/products/canvas-bag-1.webp`
- **Copy**: "Durable and eco-conscious."
- **Features**: Background image approach with natural text positioning

**Tote Bags**:
- **Background Image**: `images/products/canvas-bag-2.webp`
- **Copy**: "Practical. Reliable. Everyday ready."
- **Features**: Background image approach with natural text positioning

**Acrylic Keychains**:
- **Background Image**: `images/products/acrylic-keychain.webp`
- **Copy**: "Compact, polished, memorable."
- **Features**: Background image approach with natural text positioning

**Badge Pins**:
- **Background Image**: `images/products/badges.webp`
- **Copy**: "Clear, precise, professional."
- **Features**: Background image approach with natural text positioning

##### Feature Card
```css
.feature-card {
    background: var(--bg-bright-card);
    padding: var(--space-8);
    border-radius: var(--radius-3xl);
    text-align: center;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-bright-sm);
}

.feature-card:hover {
    background: var(--bg-bright-secondary);
    box-shadow: var(--shadow-bright-lg);
}
```

**Usage**: Feature highlights, service benefits
**States**: Default, hover (background change and enhanced shadow)
**Elements**: Icon, title, description
**Current Feature Cards**: 3 focused benefits with clean presentation
**Theme**: Bright theme with white backgrounds and subtle hover effects

#### Feature Cards (Current Implementation)
**Competitive Pricing**:
- **Icon**: Dollar sign SVG
- **Copy**: "By optimizing our process, we deliver exceptional quality at prices that respect your budget. It's that simple."

**Superior Service**:
- **Icon**: Message bubble SVG
- **Copy**: "Fast replies. Proactive updates. A reliable partner from start to finish. We're here when you need us, every time."

**Design With Canva**:
- **Icon**: Pencil/design SVG
- **Copy**: "No Adobe? No problem. We are the first to accept Canva designs, which we professionally prep for production at no extra cost."

#### Solutions Section

##### Solution Cards with Modal Integration
```css
.solution-card {
    background: var(--bg-bright-card);
    padding: var(--space-8);
    border-radius: var(--radius-3xl);
    text-align: left;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-bright-sm);
    cursor: pointer;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
}

.solution-card:hover {
    box-shadow: var(--shadow-bright-lg);
}

.card-plus-button {
    position: absolute;
    bottom: var(--space-6);
    right: var(--space-6);
    width: 40px;
    height: 40px;
    background: var(--color-gray-600);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    transition: all var(--transition-base);
    box-shadow: var(--shadow-bright-sm);
}

.card-plus-button:hover {
    background: var(--color-gray-500);
}
```

**Usage**: Presenting Teevent's solutions to pain points with expandable details
**States**: Default, hover (enhanced shadow), modal open
**Elements**: Background image, title, subtitle, plus button, modal content
**Current Solution Cards**: 3 focused solutions with background images, plus buttons, and modal-based detailed content

##### Solution Cards (Current Implementation)
**Fast Support**:
- **Background Image**: `images/solution/fast-support.webp`
- **Subtitle**: "No waiting. Get answers right away so you can keep moving."
- **Modal Content**: Chat demonstration + story about fast response times
- **Text Styling**: Left-aligned with enhanced typography
- **Plus Button**: Dark gray circular button with plus icon

**Honest Pricing**:
- **Background Image**: `images/solution/honest-pricing.webp`
- **Subtitle**: "Honest Pricing.<br>Fair by design.<br>Cut the cost, not the quality."
- **Modal Content**: Story about quality and pricing philosophy
- **Text Styling**: Left-aligned with enhanced typography
- **Plus Button**: Dark gray circular button with plus icon

**Flexible Files**:
- **Background Image**: `images/solution/canva.webp`
- **Subtitle**: "We accept Canva.<br>Use what you have."
- **Modal Content**: Story about Canva accessibility and student-friendly approach
- **Text Styling**: Left-aligned with white text for dark background
- **Plus Button**: Dark gray circular button with plus icon

##### Modal System
```css
.solution-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    display: none;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--bg-bright-primary);
    border-radius: var(--radius-3xl);
    padding: var(--space-8);
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    z-index: 1001;
}
```

#### Pain Points Section

##### Pain Point Cards with Chat Animations
```css
.pain-point-card {
    background: var(--bg-bright-card);
    padding: var(--space-8);
    border-radius: var(--radius-3xl);
    box-shadow: var(--shadow-bright-sm);
    transition: all var(--transition-base);
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.chat-container {
    margin-bottom: var(--space-6);
    border-radius: var(--radius-2xl);
    background: var(--bg-bright-secondary);
    padding: var(--space-4);
    flex: 1;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
```

**Usage**: Demonstrating real pain points through interactive chat animations
**States**: Default, hover (enhanced shadow)
**Elements**: Chat animation, pain point title
**Current Pain Points**: 3 interactive chat demonstrations with uniform card heights

##### Chat Animation System
```css
.message-bubble {
    background: var(--color-primary);
    color: var(--color-white);
    padding: var(--space-3) var(--space-4);
    border-radius: 18px;
    border-bottom-right-radius: 4px;
    max-width: 280px;
    position: relative;
    overflow: visible;
}

.message-received .message-bubble {
    background: var(--color-gray-200);
    color: var(--text-bright-primary);
    border-bottom-right-radius: 18px;
    border-bottom-left-radius: 4px;
}

.message-reaction {
    position: absolute;
    top: -8px;
    right: -8px;
    background: var(--color-primary);
    border: 1px solid var(--color-primary);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-bright-sm);
    z-index: 10;
}
```

**Pain Point 1 - No Reply**:
- **Your Message**: "Hi, can I get a quotation for 100 t-shirts?" (9:30 AM)
- **Animation**: Typing indicator showing supplier is typing but never replies
- **Demonstrates**: Slow response time and poor communication

**Pain Point 2 - High Prices**:
- **Your Message**: "Hi, can I get a quotation for 100 lanyards?" (11:10 AM)
- **Supplier Reply**: "Quotation for 100 pcs lanyard: RM6.20/pc" (8:48 PM)
- **Reaction**: Custom sweat emoji (`images/lame-suppliers/sweat-emoji.webp`)
- **Demonstrates**: Slow response + outrageously high pricing

**Pain Point 3 - Adobe Files Only**:
- **Your Message**: Canva design link (1:57 PM)
- **Supplier Reply**: "Sorry, we only accept Adobe PS or AI files." (7:32 PM)
- **Reaction**: Custom sad emoji (`images/lame-suppliers/sad-emoji.webp`)
- **Demonstrates**: File format restrictions and inflexibility

#### Navigation

**Header**: Fixed navigation with backdrop blur effect and SVG logo
**Logo**: Custom SVG logo (`images/Teevent Logo Redesign/apple landingpage inspired.svg`) with 40px height
**CTA Button**: Compact button in header with smaller padding and font size
**Features**: Smooth scroll behavior and proper focus states
**Responsive**: Narrow header design with optimized spacing

### Animation System

#### Fade-In Animations
```css
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity var(--transition-slower) cubic-bezier(0.215, 0.610, 0.355, 1), 
                transform var(--transition-slower) cubic-bezier(0.215, 0.610, 0.355, 1);
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```

#### Animation Guidelines
- **Duration**: 700ms for fade-in animations using cubic-bezier easing
- **Performance**: Use `transform` and `opacity` for GPU acceleration
- **Accessibility**: Respect `prefers-reduced-motion` user preference
- **Subtle Effects**: Minimal, elegant animations that enhance rather than distract

### Interactive Elements

#### Hover States
- **Product Cards**: Enhanced shadow effect on hover
- **Feature Cards**: Subtle background change and enhanced shadow
- **Solution Cards**: Enhanced shadow with preserved background images
- **Buttons**: Subtle color transition (lighter on hover)
- **Links**: Color transitions for text links

#### Focus States
- **Visible focus indicators** with primary blue outline
- **High contrast** focus rings
- **Keyboard navigation** support throughout
- **Modal focus management** with proper tab order

#### Loading States
- **Smooth reveal animations** for content
- **Progressive disclosure** of elements
- **Performance optimization** with intersection observer

### Visual Effects

#### Gradient Text
```css
.gradient-text {
    background: linear-gradient(90deg, var(--color-gray-50), var(--text-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

#### Shadows
- **Subtle shadows** for depth and hierarchy
- **Hover shadows** for interactive feedback
- **Consistent shadow system** using design tokens

#### Backdrop Effects
- **Header backdrop blur** for modern glass effect
- **Subtle transparency** for overlay elements

### Content Guidelines

#### Messaging Tone
- **Direct and Honest**: Address pain points directly
- **Student-Friendly**: Use relatable language and examples
- **Professional but Approachable**: Maintain credibility while being friendly
- **Problem-Solution Focus**: Clearly identify issues and present solutions

#### Content Structure
- **Hero**: Clear value proposition and primary CTA ("Start Your Project")
- **Pain Points**: Interactive chat demonstrations of common problems with uniform card heights
- **Solutions**: Modal-based solution cards with background images, plus buttons, and CTA button
- **Products**: 6 product cards with background images and concise copywriting
- **Features**: Service benefits with clean, focused messaging
- **Vision**: Future platform vision with gradient text emphasis
- **Contact**: Strong closing with call-to-action ("Email Us")

### Accessibility Standards

#### Color Contrast
- Minimum 4.5:1 ratio for normal text
- Minimum 3:1 ratio for large text
- Test all color combinations for accessibility

#### Keyboard Navigation
- All interactive elements accessible via keyboard
- Visible focus indicators with primary blue outline
- Logical tab order throughout the site

#### Screen Reader Support
- Semantic HTML structure
- Alt text for images
- ARIA labels where necessary

#### Motion Sensitivity
- Respect `prefers-reduced-motion`
- Provide option to disable animations
- Ensure animations don't cause motion sickness

### Performance Guidelines

#### Loading Optimization
- Lazy load non-critical images
- Minimize CSS and JavaScript bundle sizes
- Use efficient animations (transform, opacity)
- Optimize font loading

#### Animation Performance
- Use `will-change` sparingly
- Limit simultaneous animations
- Pause animations when tab is not visible
- Use `requestAnimationFrame` for complex animations

### Responsive Design

#### Mobile-First Approach
- **Base styles are mobile-first** - All styles start with mobile as the default
- **Progressive enhancement** - Features and layouts scale up for larger screens
- **Touch-optimized** - 44px minimum touch targets and touch-friendly interactions
- **Performance-focused** - Optimized for mobile performance

#### Breakpoint Strategy
- **Mobile (≤768px)**: Single column layouts, optimized typography, full-width buttons
- **Tablet (769px-1024px)**: Two-column grids, balanced spacing
- **Desktop (≥1025px)**: Full multi-column layouts with all animations
- **Large Desktop (≥1400px)**: Optimized for ultra-wide screens

#### Touch Interactions
- **44px minimum touch targets** for all interactive elements
- **Touch-friendly button sizes** with proper spacing
- **Reduced motion** on touch devices for better performance
- **Swipe-friendly** grid layouts and card interactions

### Development Standards

#### CSS Architecture
- **Design Token System**: All values are defined as CSS custom properties in `:root`
- **Modular Organization**: Styles are organized by component and functionality
- **Responsive Design**: Mobile-first approach with consistent breakpoints
- **Clean Structure**: Separated concerns with clear file organization

#### JavaScript Guidelines
- **Vanilla JavaScript** for performance and simplicity
- **Modular Functions**: Each feature is organized in its own section
- **Performance Optimization**: Animations pause when tab is not visible
- **Accessibility**: Enhanced keyboard navigation and focus management
- **Intersection Observer**: Efficient scroll-triggered animations
- **Modal System**: Interactive modal management with proper event handling

#### Code Organization
- **Separate concerns** (HTML structure, CSS styling, JS behavior)
- **Modular component approach** with reusable patterns
- **Consistent file structure** with clear documentation
- **Design Tokens**: Centralized design system in CSS custom properties
- **Component-Based**: Each UI component has its own CSS section
- **Clean HTML**: Optimized structure with semantic markup

### Future Considerations

#### Scalability
- Component-based architecture for easy expansion
- Design token system for consistent theming
- Modular CSS for maintainability
- Reusable JavaScript utilities

#### Platform Evolution
- Prepare for B2B platform transition
- Scalable component library
- Design system documentation
- Component testing framework

#### Accessibility Improvements
- Enhanced keyboard navigation
- Better screen reader support
- Motion reduction options
- High contrast mode support

---

## Development Guidelines

### Before You Start Developing

**⚠️ IMPORTANT: Every developer must read this entire README before contributing to the project.**

This document serves as the central source of truth for:
- Business understanding and goals
- Design system specifications
- Development standards and architecture
- Project scope and future direction

### When Making Changes

1. **Update this README** if you make changes to:
   - Business logic or requirements
   - Design system components
   - Development architecture
   - Project scope or direction

2. **Follow the established patterns** for:
   - Component structure
   - CSS architecture
   - JavaScript patterns
   - File organization

3. **Maintain consistency** with:
   - Color palette usage
   - Typography hierarchy
   - Animation guidelines
   - Accessibility standards

### Project Structure

```
v2/
├── README.md              # This central document
├── index.html            # Main landing page with pain points and solutions sections
├── styles/
│   └── main.css         # Main stylesheet with design tokens, bright theme, and modal system
├── scripts/
│   └── main.js          # Main JavaScript functionality with modal system
├── images/
│   ├── products/        # Product images for product cards
│   │   ├── cotton-tshirt-1.webp
│   │   └── lanyard-1-1.webp
│   ├── lame-suppliers/  # Custom emoji reactions for chat animations
│   │   ├── sweat-emoji.webp
│   │   └── sad-emoji.webp
│   ├── solution/        # Background images for solution cards
│   │   ├── fast-support.webp
│   │   ├── honest-pricing.webp
│   │   └── canva.webp
│   └── Teevent Logo Redesign/
│       └── apple landingpage inspired.svg
├── docs/                 # Additional documentation
│   └── modal-debugging-report.md  # Modal system debugging documentation
└── [future components]   # As the project evolves
```

---

## Conclusion

At this stage, Teevent's strength lies in customized merchandise with highly competitive pricing, strong quality, better customer service, and greater flexibility in accepting design files (including Canva).

In the future, Teevent aims to evolve beyond merchandise into a B2B event-supplier platform that bridges the gap between event organizers and Malaysian suppliers.

**This README serves as the foundation for all Teevent development. Follow these guidelines to maintain consistency, accessibility, and performance across all implementations.**

---

*Last updated: September 1, 2025*
*Maintainer: Development Team*
*Version: 2.0 - Apple.com-Inspired Design System with Modal Integration*
