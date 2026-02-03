# misu Portfolio Website

Single-page portfolio website for **misu** (Michael Sutter), an AV-Technik consulting company based in Zürich, Switzerland.

🌐 **Live Website:** [heymisu.ch](https://heymisu.ch)

## About

misu specializes in:
- AV technology concepts and planning
- Media control systems (Crestron certified)
- Technical planning according to SIA standards
- System commissioning and quality control

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** (CDN) - Utility-first styling
- **Custom CSS** - `styles.css` + `intro-animation.css`
- **Vanilla JavaScript** - No frameworks (`main.js`, `intro-animation.js`)
- **Google Fonts** - Inter typeface (temporary)
- **Material Icons** - Icon library

## Project Structure

```
misu-website/
├── index.html              # Main single-page application
├── styles.css              # Global styling (layout, sections)
├── intro-animation.css     # Hero intro animation
├── main.js                 # Core interactions (carousel, modals, header)
├── intro-animation.js      # Staggered hero intro timing
├── projects.js             # Project data array
├── sitemap.xml             # XML sitemap for SEO
├── assets/
│   └── img/
│       ├── competences/    # Competence section images
│       └── projects/       # Project portfolio images
├── assets/icons/           # SVG icons
└── assets/fonts/           # Brand font files
└── README.md
```

## Features

- ✨ Animated hero section with staggered text appearance
- 🧭 Auto-hide header on scroll (shows near top)
- 📱 Fully responsive design (mobile-first approach)
- 🎨 Brand colors: `#6B4462` (misu-purple), `#5FD4A5` (misu-mint)
- 🎯 5 expandable competence cards (no icon rotation)
- 🎠 Project carousel with modal detail views (3 items per page)
- 🧩 Modal system for projects + legal pages (Impressum, AGB/Datenschutz)
- 🔒 Swiss DSG-compliant privacy policy
- 🌐 German language (Switzerland market)

## Local Development

No build process required! Simply:

1. Clone the repository
2. Open `index.html` in your browser
3. All dependencies load via CDN

> Tip: open the file directly or serve it with any static server.

## Deployment

This is a static website that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## SEO

- Sitemap included at [sitemap.xml](sitemap.xml)
- Recommended: submit the sitemap to Google Search Console

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2026 misu - Michael Sutter. All rights reserved.

## Contact

- 📧 Email: hello@heymisu.ch
- 📱 Phone: +41 79 571 25 08
- 📍 Location: Zürich, Switzerland
- 📷 Instagram: [@heymisu.ch](https://instagram.com/heymisu.ch)
