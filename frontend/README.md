
# BookMyBanquets – Frontend Documentation

## Project Overview

The **BookMyBanquets Frontend** is a React-based web application that provides users with a smooth and intuitive interface to explore banquet venues, view listings by location, and initiate booking requests. The frontend communicates with the backend REST APIs to fetch listings, locality SEO content, and contact/lead information.

The application is built using modern frontend tooling and is optimized for production using a Vite build pipeline.

---

## Tech Stack

### Core

* **React** – UI library
* **Redux** – Global state management
* **CSS** – Styling

### Tooling

* **Vite** – Development server and production build
* **npm** – Package manager

### Deployment

* **Static build (dist folder)**
* Hosted on **cPanel** or **VPS** using Nginx / Apache


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


---

## Production Build Structure

The production-ready frontend is generated inside the `dist/` folder after running the build command.

```
dist/
├── assets/          # Compiled JS & CSS bundles (hashed)
├── index.html       # Application entry point
├── sitemap.xml     # SEO sitemap
├── logo.png         # App logo
├── dialog.avif      # UI asset
├── temp.png         # UI asset
```

### Key Files

* **index.html**

  * Loads the React application
  * Injects compiled JS and CSS from `/assets`

* **assets/**

  * Contains minified and hashed JavaScript and CSS files
  * Generated automatically by Vite

* **sitemap.xml**

  * Used for search engine indexing
  * Improves SEO for locality and listing pages

---

## Environment Variables (Frontend)

Create a `.env` file in the frontend root directory.

```
VITE_API_BASE=https://node.bookmybanquets.in/
```

### Explanation

* **VITE_API_BASE** – Base URL of the backend API used by the frontend

> ⚠️ All Vite environment variables must start with `VITE_`.

---

## Application Structure (Source Level)

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level pages
│   ├── redux/          # Redux store, slices, actions
│   ├── services/       # API service calls
│   ├── assets/         # Images, icons
│   ├── routes/         # App routing configuration
│   └── main.jsx        # App entry point
│
├── public/
│   └── sitemap.xml
│
├── vite.config.js
└── package.json
```

---

## API Integration Flow

1. Frontend calls backend APIs using `VITE_API_BASE`
2. Redux handles global state (listings, user data, UI state)
3. Pages consume Redux state and render UI
4. Forms trigger API calls (contact, lead creation)

---

## SEO & Performance

* Static `sitemap.xml` included in production build
* Locality-based SEO pages supported
* Code splitting and asset hashing via Vite
* Optimized bundle size for fast loading

---

## Running Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Default dev server:

```
https://node.bookmybanquets.in/
```

---

## Building for Production

```bash
npm run build
```

This generates the optimized `dist/` folder used for deployment.

---

## Deployment Instructions (cPanel / VPS)

1. Run `npm run build`
2. Upload contents of `dist/` to public directory (`public_html`)
3. Configure backend API URL in `.env`
4. Ensure server redirects all routes to `index.html` (SPA routing)

### Nginx SPA Config Example

```
location / {
  try_files $uri /index.html;
}
```

---

## Future Improvements

* Server-side rendering (SSR)
* Image optimization pipeline
* PWA support
* Enhanced SEO automation

---

**Author:** Mosim Raza
**Project:** BookMyBanquets Frontend
