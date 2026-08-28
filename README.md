# Food Lover 🍕

A responsive front-end landing page for a pizza & burger spot, built with HTML5, Bootstrap 5, custom CSS, and vanilla JavaScript.

## Live Preview

Open `index.html` in a browser, or serve the folder with any static server.

## Features

- Responsive hero, menu, offer, reviews, about and footer sections
- Dark / light mode toggle (persisted via `localStorage`, respects system preference)
- Mobile navigation menu with animated hamburger toggle
- Scroll-triggered reveal animations (`IntersectionObserver`)
- Sticky navbar with scroll shadow
- Animated countdown timer on the limited-time offer card
- Back-to-top button
- Preloader on initial page load
- Auto-updating footer copyright year
- Subtle tilt/hover effect on menu cards
- Fade-in on image load

## Tech Stack

- HTML5
- Bootstrap 5.3 (bundled locally, no CDN dependency)
- Custom CSS (`css/style.css`)
- Vanilla JavaScript (`js/script.js`, no frameworks or build step)

## Project Structure

```
project-4/
├── css/
│   ├── bootstrap-cs.css
│   └── style.css
├── img/
├── js/
│   ├── bootstrap-js.js
│   └── script.js
├── index.html
└── README.md
```

## Getting Started

1. Clone the repo
   ```bash
   git clone <your-repo-url>
   cd project-4
   ```
2. Open `index.html` directly in your browser, or run a local server, e.g.:
   ```bash
   npx serve .
   ```

## Notes

- No build tools or dependencies required — everything runs directly in the browser.
- Images were compressed for faster load times before committing.

## License

Free to use for personal or portfolio projects.
