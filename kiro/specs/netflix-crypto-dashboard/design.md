# Design Document

## Overview

The Netflix-Crypto Dashboard is a single-page web application that creates a visually stunning mashup of Netflix trending content and cryptocurrency market data. The design philosophy combines Netflix's signature dark theme with red accents, crypto's neon aesthetic, and Stranger Things' eerie visual language to create a unique, competition-winning experience.

**Design Pillars:**

1. **Visual Impact**: Every element designed to impress and captivate
2. **Smooth Interactions**: 60fps animations with meaningful transitions
3. **Thematic Cohesion**: Seamless blend of Netflix, crypto, and Stranger Things aesthetics
4. **Performance**: Optimized for smooth experience despite heavy visual effects

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        index.html                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Navigation Bar                          │  │
│  │  [Logo] [Netflix] [Crypto] [Correlations] [Theme Toggle]  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Hero Section                            │  │
│  │  [Particle Canvas] [Glitch Title] [Subtitle] [CTA]        │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                Netflix Trending Section                    │  │
│  │  [Section Title] [Carousel Container]                      │  │
│  │  [← ] [Card][Card][Card][Card][Card] [ →]                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                Crypto Tracker Section                      │  │
│  │  [BTC Card] [ETH Card] [SOL Card]                         │  │
│  │  [Sparklines] [Price Animations] [Stats]                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Data Correlation Section                      │  │
│  │  [Combined Chart] [Narrative] [Insights]                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Footer                                  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**File Structure:**

```
/
├── index.html          # Main HTML structure
├── css/
│   ├── styles.css      # Main styles and layout
│   ├── animations.css  # All keyframe animations
│   └── themes.css      # Normal and Upside Down themes
├── js/
│   ├── app.js          # Main application logic
│   ├── particles.js    # Particle system engine
│   ├── charts.js       # Chart rendering (sparklines, correlations)
│   ├── carousel.js     # Netflix carousel functionality
│   └── data.js         # Mock data for Netflix and crypto
└── assets/
    └── images/         # Poster images and icons
```

## Components and Interfaces

### 1. Navigation Component

```
NavBar {
  - logo: Netflix-style "N" with crypto circuit overlay
  - links: Array of section anchors
  - themeToggle: Upside Down mode switch
  - state: { isScrolled: boolean, isMenuOpen: boolean }

  Methods:
  - handleScroll(): Shrink navbar on scroll
  - toggleMenu(): Mobile hamburger animation
  - smoothScrollTo(section): Animated scroll to section
}
```

### 2. Hero Component

```
Hero {
  - particleCanvas: Canvas element for particle system
  - title: Glitching text element
  - subtitle: Typewriter effect text

  Methods:
  - initParticles(): Start particle animation loop
  - glitchText(): Random glitch effect on title
  - parallaxScroll(): Move layers at different speeds
}
```

### 3. Netflix Carousel Component

```
Carousel {
  - container: Scrollable container element
  - cards: Array of ContentCard elements
  - navigation: Left/Right arrow buttons

  Methods:
  - scroll(direction): Smooth scroll left/right
  - handleCardHover(card): Expand card with details
  - snapToCard(): Scroll snap behavior
}

ContentCard {
  - poster: Image URL
  - title: String
  - rating: Number (0-100)
  - rank: Number (trending position)
  - genre: String
  - year: Number
}
```

### 4. Crypto Tracker Component

```
CryptoCard {
  - symbol: 'BTC' | 'ETH' | 'SOL'
  - price: Number
  - change24h: Number (percentage)
  - sparklineData: Array of price points
  - icon: Crypto logo element

  Methods:
  - updatePrice(newPrice): Animate price change
  - renderSparkline(): Draw mini chart
  - flashDirection(): Green/red flash on change
}
```

### 5. Correlation Chart Component

```
CorrelationChart {
  - canvas: Chart canvas element
  - netflixData: Array of viewership points
  - cryptoData: Array of price points
  - tooltip: Hover tooltip element

  Methods:
  - render(): Draw both datasets overlaid
  - handleHover(point): Show tooltip with details
  - animate(): Entrance animation for chart lines
}
```

### 6. Theme Manager

```
ThemeManager {
  - currentTheme: 'normal' | 'upside-down'
  - transitionDuration: 1000ms

  Methods:
  - toggle(): Switch between themes
  - applyUpsideDown(): Add filters, particles, typography
  - playTransition(): Screen flicker effect
}
```

## Data Models

### Netflix Content Model

```javascript
{
  id: number,
  title: string,
  poster: string,           // Image URL
  rating: number,           // 0-100 match percentage
  rank: number,             // Trending position 1-10
  genre: string,
  year: number,
  type: 'movie' | 'series',
  viewership: number,       // Millions of hours
  weeklyChange: number      // Percentage change
}
```

### Cryptocurrency Model

```javascript
{
  symbol: string,           // 'BTC', 'ETH', 'SOL'
  name: string,
  price: number,
  change24h: number,        // Percentage
  change7d: number,
  marketCap: number,
  volume24h: number,
  sparkline: number[],      // 24 hourly price points
  icon: string              // Icon URL or SVG
}
```

### Correlation Data Model

```javascript
{
  date: string,             // ISO date
  netflixViewership: number,
  btcPrice: number,
  topShow: string,          // Netflix show at this time
  narrative: string         // Fun correlation explanation
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Particle Color Palette Consistency

_For any_ particle generated by the particle system, its color SHALL be within the defined palette (Netflix red #E50914, crypto gold #F7931A, crypto blue #627EEA, or variations thereof).
**Validates: Requirements 1.3**

### Property 2: Parallax Transform on Scroll

_For any_ scroll event, all elements with parallax data attributes SHALL have their transform property updated proportionally to scroll position.
**Validates: Requirements 1.4**

### Property 3: Content Card Hover Expansion

_For any_ content card in the carousel, hovering SHALL trigger a scale transform greater than 1.0 and make metadata elements visible.
**Validates: Requirements 2.2**

### Property 4: Content Card Data Completeness

_For any_ Netflix content data object, the rendered card SHALL display the poster image, title, rating percentage, and trending rank.
**Validates: Requirements 2.3**

### Property 5: Crypto Price Direction Indicator

_For any_ price update where new price differs from old price, the card SHALL flash green if price increased or red if price decreased.
**Validates: Requirements 3.2**

### Property 6: Sparkline Data Representation

_For any_ crypto card with sparkline data array, the rendered SVG path SHALL contain points corresponding to each data value.
**Validates: Requirements 3.3**

### Property 7: Crypto Card Hover Stats Reveal

_For any_ crypto card hover event, the detailed stats overlay SHALL become visible with glassmorphism styling applied.
**Validates: Requirements 3.4**

### Property 8: Correlation Chart Dual Dataset

_For any_ correlation chart render, both Netflix viewership line and crypto price line SHALL be present in the visualization.
**Validates: Requirements 4.2**

### Property 9: Correlation Tooltip Content

_For any_ data point hover on the correlation chart, the tooltip SHALL display both the Netflix show name and the crypto price for that date.
**Validates: Requirements 4.3**

### Property 10: Theme Toggle State Change

_For any_ theme toggle click, the body element SHALL toggle between having and not having the 'upside-down' class.
**Validates: Requirements 5.1**

### Property 11: Viewport Reveal Animation

_For any_ element with the 'reveal' class that enters the viewport, it SHALL receive the 'visible' class triggering the fade-in animation.
**Validates: Requirements 6.1**

### Property 12: Ripple Effect on Click

_For any_ click on an interactive element, a ripple element SHALL be created at the click coordinates within the target element.
**Validates: Requirements 6.3**

### Property 13: Animated Number Counting

_For any_ numeric value change in price displays, the displayed value SHALL animate through intermediate values from old to new.
**Validates: Requirements 6.4**

### Property 14: Navbar Shrink on Scroll

_For any_ scroll position greater than the hero section height, the navbar SHALL have the 'shrunk' class applied.
**Validates: Requirements 7.2**

### Property 15: Navigation Smooth Scroll

_For any_ navigation link click, the page SHALL scroll to the section element whose id matches the link's href anchor.
**Validates: Requirements 7.3**

## Error Handling

### Data Loading Errors

- If mock data fails to load, display placeholder content with "Loading..." animations
- Gracefully degrade particle effects if canvas is not supported
- Fallback fonts if custom fonts fail to load

### Animation Performance

- Detect low-performance devices and reduce particle count
- Use `will-change` hints for animated elements
- Implement requestAnimationFrame throttling for scroll handlers

### Browser Compatibility

- Provide CSS fallbacks for backdrop-filter (glassmorphism)
- Use feature detection for IntersectionObserver
- Graceful degradation for older browsers without CSS custom properties

## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific component behaviors:

- Navigation link click handlers
- Theme toggle state management
- Carousel scroll position calculations
- Price formatting functions

### Property-Based Testing Approach

Using **fast-check** library for JavaScript property-based testing.

Each property test will:

1. Generate random valid inputs (content data, prices, scroll positions)
2. Execute the component function
3. Verify the property holds for all generated inputs
4. Run minimum 100 iterations per property

**Test File Structure:**

```
/tests/
├── particles.test.js      # Property 1
├── parallax.test.js       # Property 2
├── carousel.test.js       # Properties 3, 4
├── crypto.test.js         # Properties 5, 6, 7
├── correlation.test.js    # Properties 8, 9
├── theme.test.js          # Property 10
├── animations.test.js     # Properties 11, 12, 13
└── navigation.test.js     # Properties 14, 15
```

**Property Test Annotation Format:**
Each test will include a comment in this format:

```javascript
// **Feature: netflix-crypto-dashboard, Property 1: Particle Color Palette Consistency**
// **Validates: Requirements 1.3**
```

## Visual Design Specifications

### Color Palette

```css
/* Netflix Theme */
--netflix-red: #e50914;
--netflix-black: #141414;
--netflix-dark: #181818;
--netflix-gray: #808080;

/* Crypto Theme */
--btc-orange: #f7931a;
--eth-purple: #627eea;
--sol-gradient: linear-gradient(135deg, #9945ff, #14f195);
--crypto-green: #00ff88;
--crypto-red: #ff4444;

/* Stranger Things Theme */
--st-red: #b81d24;
--st-glow: #ff0000;
--upside-down-bg: #0a0a0a;
--ash-gray: #2a2a2a;

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: 20px;
```

### Typography

```css
/* Primary: Netflix Sans alternative */
--font-primary: "Bebas Neue", sans-serif;

/* Secondary: Clean readable */
--font-secondary: "Inter", sans-serif;

/* Stranger Things mode */
--font-stranger: "Benguiat", "ITC Benguiat", serif;
```

### Animation Timings

```css
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;
--transition-theme: 1000ms ease;

/* Easing curves */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
```

### Responsive Breakpoints

```css
--mobile: 480px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1440px;
```
