# iPhone 13 3D — GitHub Pages fix

## What was fixed
- Added `vite.config.js` with the GitHub Pages base path `/phone_dismandil/`.
- Removed the browser import map that pointed at `node_modules` (those files are not served by GitHub Pages).
- Kept the Three.js imports for Vite to bundle.
- Copied the GLB model to `public/source/iphone_13_concept.glb` so it is included in production output.
- Updated the GLB URL to use `import.meta.env.BASE_URL`.
- Added a GitHub Actions workflow to build and deploy `dist/`.

## Publish
1. Copy these project files into the root of your `phone_dismandil` GitHub repository.
2. Commit and push to the `main` branch.
3. In GitHub, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
4. Open **Actions** and wait until the “Deploy Vite site to GitHub Pages” workflow succeeds.
5. Visit https://dev-durgaprasad.github.io/phone_dismandil/ and hard-refresh with Ctrl+F5.

Do not upload `node_modules` or `.git` from your local machine. The workflow builds the site automatically after every push.
