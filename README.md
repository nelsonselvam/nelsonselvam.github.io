# Nelson Selvam — Portfolio (React + Vite + Tailwind)

A clean, responsive single-page portfolio built with React, Vite, and TailwindCSS.  
Pre-filled with resume content. Easy to customize.

## Local Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

### Option A) Deploy to **username.github.io** (user/organization site)
1. Create a repo named `username.github.io` (replace with your GitHub username).
2. Keep `base` as `/` (default) in `vite.config.ts`.
3. Use the provided GitHub Actions workflow.

### Option B) Deploy to `username.github.io/repo` (project site)
1. Create any repo (e.g., `portfolio`).
2. Set `base` in Vite to `/<repo>/` by either:
   - Setting env var: create `.env` with `VITE_BASE=/<repo>/`
   - OR editing `vite.config.ts` base manually.
3. Use the provided GitHub Actions workflow.

### GitHub Actions
Commit and push, then enable Pages:
- Settings → Pages → Build and deployment: Source = GitHub Actions

The workflow below builds the site and publishes it to Pages.

## Customize
- Edit your info in `src/data/resume.ts`
- Adjust colors/spacing in `tailwind.config.js`
- Add more sections/components in `src/components`

---

Made with ❤️
