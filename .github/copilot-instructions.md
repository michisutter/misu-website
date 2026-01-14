# Copilot Instructions for misu Portfolio Website

## Project Overview
Single-page portfolio website for misu (Michael Sutter), an AV-Technik consulting company based in Zürich, Switzerland. Built with plain HTML, Tailwind CSS (CDN), and vanilla JavaScript—no build tools or frameworks.

**Target Audience:** Swiss market (German language, formal "du" address)  
**Domain:** heymisu.ch  
**Brand Colors:** `#6B4462` (misu-purple), `#5FD4A5` (misu-mint)

## Architecture

### File Structure
```
index.html          # Single-page app with all sections
projects.js         # Centralized project data (array of objects)
assets/img/         # Logos, profile photo, project images
```

### Key Sections (in order)
1. **Hero** - 4-line animated intro with staggered delays (0.5s intervals)
2. **About** - "TECHNIK, DIE BEWEGT" with centered company description
3. **Kompetenzen** - 5 expandable cards (no icon rotation on toggle)
4. **Referenzen** - Carousel (3 items per page) with modal detail view
5. **Über mich** - Biography with profile photo
6. **Footer** - Contact info + legal links
7. **Modals** - Project details, Impressum, AGB/Datenschutz

### Critical Structure Rule
**HTML element order matters for JavaScript:**
```
1. All HTML content (sections + modals)
2. Footer (contains modal trigger links)
3. <script> tag
4. </body>
```
Modal elements must exist in DOM before JavaScript runs. Footer links (`#impressum`, `#agb`) must be parsed before event listeners attach.

## Component Patterns

### Expandable Cards (Kompetenzen)
```javascript
// No icon rotation—explicitly removed per client feedback
kompetenzToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        content.classList.toggle('hidden');
        // NO: icon.style.transform = 'rotate(180deg)'
    });
});
```

### Carousel Implementation
- **Display:** 3 items per page on desktop, responsive breakpoints
- **Data source:** `projects` array from `projects.js`
- **Navigation:** Prev/next buttons + dot indicators
- **State:** `currentPage` tracks position, `itemsPerPage = 3`
- Buttons disable at boundaries (opacity 0.5 when disabled)

### Modal System
Three modal types share this pattern:
```javascript
// 1. Query all trigger links
const links = document.querySelectorAll('a[href="#modal-id"]');

// 2. Prevent default, show modal, lock body scroll
link.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
});

// 3. Close handlers (button + click-outside)
closeBtn.addEventListener('click', () => { /* close */ });
modal.addEventListener('click', (e) => {
    if (e.target === modal) { /* close */ }
});
```

### Auto-Hide Header
Hides on scroll down, shows on scroll up (with 10ms debounce timeout). Always visible when `scrollTop < 100`.

## Data Management

### projects.js Structure
```javascript
const projects = [
    {
        id: 1,
        title: "Project Name",
        image: "assets/img/project-rigi.jpeg",
        description: "German description...",
        tags: ["Partner: Company", "Kunde: Client", "Jahr: 2025"]
    }
];
```
**Current state:** First 3 projects use real image, rest use placeholder URLs.

## Styling Conventions

### Tailwind Configuration
Custom theme extends base Tailwind:
```javascript
colors: {
    'misu-purple': '#6B4462',
    'misu-mint': '#5FD4A5',
}
```

### Smooth Scrolling
```css
html {
    scroll-behavior: smooth;
    scroll-padding-top: 100px;  /* Offset for fixed header */
}
```

### Animation Pattern
Hero uses `@keyframes fadeInUp` with nth-child delays. Lines animate sequentially with 1s gaps.

## Content Guidelines

- **Language:** German (Switzerland)
- **Tone:** Professional but approachable ("du" form)
- **Typography:** Google Fonts Inter (weights 300/400/600/700) - temporary until licensed font available
- **Icons:** Material Icons from Google Fonts
- **Legal:** Swiss compliance required (DSG for privacy, Swiss Impressum standards)

## Development Workflow

### No Build Step
- Open `index.html` directly in browser
- All dependencies loaded via CDN
- Changes require manual browser refresh

### Testing Checklist
1. Modal triggers work (check Footer links first)
2. Carousel navigation (arrows + dots)
3. Header hide/show on scroll
4. Expandable cards toggle correctly
5. Mobile menu functionality

### Common Issues
**Problem:** Modals don't open  
**Fix:** Check HTML order—modals and Footer must be before `<script>` tag

**Problem:** Carousel doesn't load  
**Fix:** Verify `projects.js` loaded before main script (check `<head>`)

**Problem:** Smooth scroll jumps  
**Fix:** Ensure `scroll-padding-top: 100px` set on `<html>`

## Future Enhancements
- Replace placeholder project images with actual client work
- Swap Google Fonts for licensed typeface
- Add contact form functionality (currently just contact display)
- Consider adding favicon
- Add SEO meta tags (og:image, description, etc.)
