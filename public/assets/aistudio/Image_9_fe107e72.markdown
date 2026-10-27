---
name: Vibrant Surplus Commerce
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#5b403f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#8f6f6e'
  outline-variant: '#e4bebc'
  surface-tint: '#bb152c'
  primary: '#b7102a'
  on-primary: '#ffffff'
  primary-container: '#db313f'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b1'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b1'
  on-primary-fixed: '#410007'
  on-primary-fixed-variant: '#92001c'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  promo-coral: '#FF3E3E'
  surface-subtle: '#F1F5F9'
  border-hairline: '#E2E8F0'
  text-muted: '#64748B'
  text-on-dark: '#FFFFFF'
  badge-deal-bg: '#FEE2E2'
  badge-deal-text: '#991B1B'
  badge-savings-bg: '#ECFDF5'
  badge-savings-text: '#065F46'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  price-sale:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
  price-original:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 16px
  label-timer:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '800'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-bottom-nav:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system expresses a high-energy, value-driven, mobile-first retail experience. Built for fast-fashion off-price commerce with deep catalog breadth, the aesthetic marries commercial urgency with crisp, modern digital craftsmanship. It eschews cluttered discount-store tropes in favor of an energetic modern minimalism: sharp content layouts, fluid touch ergonomics, purposeful color coding for value propositions, and airy spatial breathing room.

The emotional goal is discovery thrill coupled with immediate trust. Customers feel the rapid excitement of limited-quantity surplus clearance ("Crazy Deals", real-time flash counters) without sacrificing transactional confidence, brand legitimacy, and clarity. The visual language utilizes high-contrast typographic anchors, deliberate tactile micro-affordances, and clear chromatic signals that guide thumb-driven interaction effortlessly.

## Colors

The palette is engineered around high functional contrast and psychological conversion signals. 

- **Primary (`#E63946`)**: The primary conversion driver. Reserved for high-urgency callouts, flash sales, primary checkout triggers, clearance banners, and active notification pings. Never overused on passive backgrounds to protect its stopping power.
- **Secondary (`#111827`)**: Deep ink slate providing structural authority, legible navigation headers, high-emphasis text, and grounding elements like the global bottom navigation rail.
- **Tertiary (`#10B981`)**: Trust and savings emerald. Applied strictly to positive financial benefits: savings pill chips ("Save 60%"), free shipping triggers, and verified stock badges.
- **Neutral (`#F8FAFC`)**: Canvas base background providing high white-point contrast against product imagery while reducing eye strain on bright mobile displays.

`promo-coral` (`#FF3E3E`) is dedicated to active timer countdowns and live flash banners. Subtle grays (`#F1F5F9` and `#E2E8F0`) form background surfaces and micro-dividers to preserve layout structure without heavy visual weight.

## Typography

The design system adopts **Plus Jakarta Sans** as the unified type family across all roles. Its geometric foundation, open counters, and humanized curves maximize legibility on high-density mobile screens while infusing modern character.

- **Numerics & Prices**: Sale prices use `price-sale` in bold weight for immediate cognitive scanning. Original strikethrough prices rely on `price-original` styled with muted secondary slate (`#64748B`) and `line-through`.
- **Urgency Counters**: Countdown tickers enforce tabular figure settings (`font-variant-numeric: tabular-nums`) through `label-timer` to avoid horizontal layout jank during live updates.
- **Micro-labels & Badges**: Set in uppercase with tracked spacing (`letterSpacing: 0.04em`) to maintain crisp optical separation inside tight badge bounds.

## Layout & Spacing

The system implements a mobile-first fluid grid optimized for thumb reaches and high catalog density:

- **Mobile Viewports (<640px)**: A 2-column asymmetric fluid grid with `0.75rem` (`12px`) gutters and `1rem` (`16px`) outer screen margins. Product listing cards adapt flexibly to viewport width without content clipping.
- **Tablet / Desktop Viewports (640px - 1280px)**: Reflows smoothly into 3-column, 4-column, and 5-column configurations with fixed maximum content constraints of `1240px` and gutters expanding to `1.25rem`.
- **Rhythm & Touch Targets**: Spacing scales in strict multiples of 4px. Interactive click/tap targets maintain a minimum vertical height of `44px` (or `48px` on critical primary checkout actions).
- **Safe Area Insets**: The bottom navigation anchored bar and drawer panels incorporate `env(safe-area-inset-bottom)` to protect ergonomics across notched bezel-less devices.

## Elevation & Depth

Visual hierarchy uses a refined hybrid approach: clean tonal surface layering reinforced with subtle ambient drop shadows. Surfaces feel tactile without introducing visual clutter or heavy skeuomorphism.

- **Level 0 (Base Canvas)**: Background rendered in neutral canvas (`#F8FAFC`). Flat, un-elevated.
- **Level 1 (Product Cards & Content Units)**: Clean white backgrounds (`#FFFFFF`) with a 1px structural hairline border (`#E2E8F0`) and an ambient, low-contrast shadow: `0 2px 6px -1px rgba(17, 24, 39, 0.04), 0 1px 3px -1px rgba(17, 24, 39, 0.02)`.
- **Level 2 (Dropdowns, Quick-Buy Drawers & Floating Controls)**: Elevated panels feature increased ambient depth: `0 10px 25px -5px rgba(17, 24, 39, 0.08), 0 8px 10px -6px rgba(17, 24, 39, 0.04)`.
- **Level 3 (Sticky Bottom Bar & Modal Sheets)**: The sticky bottom navigation bar is pinned with a top hairline border (`rgba(226, 232, 240, 0.8)`) backed by an ultra-subtle upward glow (`0 -4px 16px rgba(17, 24, 39, 0.06)`). Off-canvas drawers (Cart, Filters) slide above a 50% opacity neutral dark scrim (`rgba(17, 24, 39, 0.5)` with `backdrop-filter: blur(4px)`).

## Shapes

The design system uses a rounded shape language (`roundedness: 2`, base radius `0.5rem` / `8px`). This level balances friendly retail warmth with structural container discipline.

- **Product Cards & Content Panels**: Use `rounded-lg` (`1rem` / `16px`) for exterior framing, while inner image containers feature nested matching radii (`0.75rem` / `12px`) to maintain concentric alignment.
- **Buttons & Inputs**: Form fields and primary CTAs use `rounded-md` (`0.5rem` / `8px`) for immediate affordance and easy tap focus.
- **Badges, Chips & Swatches**: Pill treatment (`rounded-full` / `9999px`) is applied to discount pills ("Crazy Deal", "60% OFF"), category filter chips, and circular color variant swatches.

## Components

### Buttons
- **Primary CTA ("Shop Now", "Checkout")**: High-energy primary red (`#E63946`) background, text in white (`#FFFFFF`), `rounded-md` (8px), height 48px, font `headline-sm` bold. Active state triggers a subtle scale compression (`scale(0.98)`).
- **Secondary CTA ("Quick Buy")**: Crisp white background (`#FFFFFF`) with ink slate border (`#111827`) and text, height 40px, full-width within product card overlays.
- **Ghost Action ("Shop the Look", "See More")**: Borderless, semi-bold ink text with a chevron right icon, height 36px with minimal horizontal padding (`0.5rem`).

### Chips & Badges
- **Discount & Savings Pills**: Compact pill shape (`rounded-full`), padding `0.25rem 0.625rem`. Emerald tier uses `badge-savings-bg` with `badge-savings-text`. Clearance / Crazy Deal tier uses `badge-deal-bg` with `badge-deal-text`.
- **Filter Chips**: Neutral gray (`#F1F5F9`) background with `0.5rem` radius, transforming to solid secondary ink (`#111827`) with white text when active.

### Product Cards
- Stacked mobile vertical layout: 1:1.25 ratio product photography container, top-left corner discount pill, top-right wishlist icon heart.
- Below image: Horizontal row of mini color variant swatches (14px circles with a 1px border gap).
- Followed by product title (`body-sm`, 2-line clamp truncation), price cluster (`price-sale` alongside `price-original` with strike line), and a full-width bottom "Quick Buy" micro-button.

### Countdown Urgency Timer
- Horizontal countdown unit anchored to flash sales. Segmented into dark or coral boxes with `label-timer` tabular digits on top, and uppercase sub-labels (`DAYS`, `HRS`, `MINS`, `SECS`) beneath in `9px` bold type.

### Sticky Bottom Navigation Rail
- 5-tab fixed touch rail: Home, Categories, Crazy Deals (highlighted with primary red dot indicator), Bag/Cart (with live quantity bubble badge), and Account.
- Height: 60px + safe area inset. Icons: 22px stroke weight, accompanied by `label-bottom-nav` text.

### Form Inputs & Mini-Cart Drawer
- **Inputs**: 44px height, light background (`#FFFFFF`), 1px border (`#E2E8F0`), active focus state introduces a 2px ring in primary red (`#E63946`).
- **Cart Slide-Over Drawer**: Right-anchored sheet featuring slide-in animation, inline discount code input with attached "Apply" CTA, sticky total calculation block, and immediate primary checkout action.