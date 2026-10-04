# Your complete Digital With Habib website

This folder is the deployable project root: package.json is directly here. It includes the current design, portfolio, team, founder photo, uploaded originals, animated logo, forms and owner-only no-code admin. The latest founder changes, bold team roles and WhatsApp widget removal are included.

## Keep your own copy

Save this ZIP on your computer and a second backup location. Use GitHub, hosting and domain accounts you control, such as accounts registered to amimrhabib@gmail.com. This source can run independently of the original ChatGPT account. This ZIP does not transfer the existing chatgpt.site URL or hosting/domain accounts. Third-party software and stock assets retain their own licenses.

## Create your private admin password

Install Node.js 22 or 24: https://nodejs.org/en/download

Extract the ZIP, open a terminal in this folder, and run:

```sh
npm run setup
```

This step uses only Node; dependency installation is not required yet. Save the printed password privately. Setup writes a local .env file. Copy its ADMIN_PASSWORD_HASH value into your hosting's private environment settings. Never commit .env or share the password. The standalone copy uses this password, not ChatGPT sign-in.

## Deploy

Follow HOSTINGER.md for direct ZIP upload, GitHub deployment or the included VPS Docker setup. The site requires backend Node.js hosting and persistent writable storage. Static GitHub Pages or a static-only Vite deployment cannot run the admin API.

## Edit without code

Open YOUR-NEW-WEBSITE/#/admin and enter your generated password. Use Portfolio, Brand & settings, Pages & sections, Founder, Team, Client logos, Testimonials, Page text and Backups. Upload media and click Publish changes. Your published content and portfolio are already included; no separate restore ZIP is needed.

The owner link appears only when authenticated. Bookmark the direct admin URL. Visitors cannot edit through the APIs without signing in.

## Local preview

```sh
npm ci
npm run dev
```

Open the address printed by Vite, then add /#/admin. The generated .env is for local HTTP. Production needs HTTPS, NODE_ENV=production and COOKIE_SECURE=true.

## Verify independence before deleting your original account

Check the home page, portfolio details and team. Sign in, change text, publish and upload a test image. Restart/redeploy and check that the changes remain. Confirm a private browser window cannot edit or download private backups. Keep both Studio backups and hosting data-volume backups on accounts you control.

## Snapshot contents

See EXPORT-MANIFEST.json for source/content revision and file checksums. Media are under public/uploads; content is data/studio_content.json. The inbox was empty at export. Historical revisions, old login sessions, secrets and browser-only drafts are excluded. Future changes are not included. Remote fonts and third-party images remain external; see EXTERNAL-ASSETS.txt. Preparing this ZIP has not created a new hosted deployment.

README.md describes the underlying project; this file and HOSTINGER.md take precedence for portable deployment.
