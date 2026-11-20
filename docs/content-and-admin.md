# Editable content and the admin portal

Every piece of text, every link and every image on the site comes from one content object. Admins edit it at **`/admin`**. It is stored in **MongoDB**, and images go to **Cloudinary**. When nothing has been saved, the page uses the built-in defaults, so the site works before the database is set up.

## Setting it up

1. **Environment.** Copy `.env.example` to `.env.local`, or set the same variables in Vercel:

   | Variable | What it's for |
   | --- | --- |
   | `MONGODB_URI` | MongoDB connection string, e.g. from MongoDB Atlas (`mongodb+srv://…`) |
   | `MONGODB_DB` | Database name (default `ascend`) |
   | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Image uploads from the admin |
   | `CLOUDINARY_UPLOAD_FOLDER` | Cloudinary folder for uploads (default `ascend`) |
   | `REVALIDATE_SECRET` | Optional. Bearer token for `POST /api/revalidate` |

   On Atlas, allow connections from Vercel (Network Access → `0.0.0.0/0`, or Vercel's IP ranges on a paid plan).

2. **Create the first admin.** There is no public sign-up.

   ```bash
   npm run admin:create -- someone@example.com --name "Their Name"
   ```

   This prints a generated password once. Sign in at `/admin/login`, then change it under **Your account**. Admins can add and remove other admins in **Admins**. To give someone a new password from the command line, run the same command with `--reset`.

   The command reads `.env.local`. To create an admin in the production database, run it with the production `MONGODB_URI` set.

3. That's all. Indexes are created automatically on first use.

## Using the admin

- **Page content** has a tab per page (plus **On every page** for the header, footer, closing band and pop-up). Each tab lists that page's sections in page order and shows whether each one uses its default or has been edited (when, and by whom).
- **Editing a section.** Each section opens as a form. Save it, and the live site updates at once. **Discard changes** throws away unsaved edits. **Reset to original** removes the saved version, so the section goes back to the built-in default.
- **Text formatting.** Longer text accepts `**bold**`, `*italic*` and `[link text](https://…)`. Nothing typed can inject HTML.
- **Lists.** Items can be added, removed and reordered. Lists the design needs a set number of (the 14 jigsaw pieces, 6 stories, 4 values, 3 join steps) can be edited but not added to or removed from.
- **Images.** **Upload image** sends the file straight from the browser to Cloudinary, and saves its address and real size. The address can also be set by hand: a `/public` path or a `res.cloudinary.com` URL. Other hosts are refused, because the site's image component only serves configured hosts.
- **Logos on the globes** (partners, alumni, flags). Each has a slug.
  - A known slug keeps its designed place on the globe.
  - A new slug gets a place automatically.
  - A replaced logo with a different shape keeps the same visual weight.
  - Slugs must be unique.

If a save has problems, nothing is saved. The form lists each problem and marks the fields involved.

## How it works

```
/admin form ──▶ saveSectionAction ──▶ validate (zod) ──▶ MongoDB site_content
                 (checks the admin)                        + site_content_history
                         │
                         └─ updateTag("site-content") ──▶ page re-renders with the new content

landing page ◀── getSiteContent() ── "use cache", tag "site-content"
                 MongoDB sections merged over the defaults, each validated on its own
```

| File | What it does |
| --- | --- |
| `src/content/schema.ts` | A zod schema per section. Types the content, validates saves and reads, and generates the admin forms. |
| `src/content/defaults.ts` | The built-in content. Used as the fallback, and to reset a section. |
| `src/content/index.ts` | `getSiteContent()`. Cached until a save. If MongoDB can't be reached, it serves the defaults and caches them for minutes only. |
| `src/content/store.ts`, `mongoStore.ts` | Storage. One document per section in `site_content`, and every save or reset in `site_content_history`. |
| `src/content/save.ts` | Validate, then save one section. |
| `src/content/sections.ts` | Section names, descriptions and order for the admin. |
| `src/app/admin/` | The admin: sign-in, dashboard, section editor, admins, account, and its Server Actions (`actions.ts`). |
| `src/components/admin/SectionEditor.tsx` | Builds a form from a section's schema. Adding a field to the schema adds it to the form. |
| `src/lib/auth/` | Password hashing and sessions. |
| `src/lib/mongodb.ts` | One shared MongoDB connection, plus the indexes. |
| `src/lib/cloudinary.ts` | Upload signing and URL helpers. |
| `scripts/create-admin.mjs` | `npm run admin:create`. |

The landing page is still prerendered and cached. Visitors never wait on MongoDB. The admin renders per request, because it reads the sign-in cookie.

### Collections

| Collection | Holds |
| --- | --- |
| `site_content` | `{ _id: "<section>", value, updatedAt, updatedBy }` |
| `site_content_history` | `{ section, value, savedAt, savedBy, action: "save" \| "reset" }`, every version, for audit or manual rollback |
| `admin_users` | `{ email, name, passwordHash, createdAt, lastLoginAt }` |
| `admin_sessions` | `{ _id: sha256(token), userId, expiresAt }`. Removed automatically when they expire. |
| `admin_login_attempts` | Failed sign-ins. Removed automatically after 15 minutes. |

### Security

- **Passwords** are hashed with scrypt and never stored or logged.
- **Sessions.** The session cookie is a random token: httpOnly, SameSite=Lax, and Secure in production. MongoDB stores only its hash, so a copy of the database can't be used to sign in. Sessions last 7 days. Signing out ends the session, and changing a password ends the user's other sessions.
- **Rate limit.** After 5 failed attempts on an email, sign-in is refused for 15 minutes. A wrong email takes as long to reject as a wrong password.
- **Authorisation.** Every admin page and every Server Action checks the signed-in admin itself, so the admin pages being hidden is not relied on. Next.js also checks the origin of Server Action requests.
- **Uploads.** Cloudinary uploads are signed per request, only for signed-in admins. The API secret never reaches the browser.
- **Search engines.** `/admin` is excluded in `robots.txt` and marked `noindex`.

### Refreshing from outside the app

If content is changed directly in MongoDB (a script, a restore from `site_content_history`), refresh the page:

```bash
curl -X POST -H "Authorization: Bearer $REVALIDATE_SECRET" https://<site>/api/revalidate
```

## What stays in code

This is design rather than content:

- colours, gradients and spacing;
- the globe and jigsaw geometry;
- the "Take your seat" card gradients and quote widths (set in `src/app/(site)/page.tsx`);
- the Tuesday session date and the city list in `TuesdaySlot.tsx`, which drive the time-zone maths. The wording around them is editable.

- the Ascend Africa page's cities (`AFRICA_CITIES` in `TuesdaySlot.tsx`);
- artwork that is part of a page's design: the era cards on About, the roadmap icons and TLDR stars on The programme, the field-note covers and Journal art on Resources (each page's `fixed.ts`). Artwork cycles when an editor adds more items than there are designs.

## The site pages

| Page | Route | Content | Built from |
| --- | --- | --- | --- |
| Ascend | `/` | `src/content/schema.ts` | the landing page components |
| Ascend Africa | `/ascend-africa` | `src/content/schema.ts` (`africa*`), defaults in `src/content/africaDefaults.ts` | the landing page components |
| The programme | `/programme` | `src/content/pages/programme.ts` | `ascend-site/programme.html` |
| Investor Fellowship | `/investor` | `src/content/pages/investor.ts` | `ascend-site/investor.html` |
| About | `/about` | `src/content/pages/about.ts` | `ascend-site/about.html` |
| Alumni & Community | `/alumni` | `src/content/pages/alumni.ts` | `ascend-site/alumni.html` |
| Instructors & Mentors | `/instructors` | `src/content/pages/instructors.ts` | `ascend-site/instructors.html` |
| Resources | `/resources` | `src/content/pages/resources.ts` | `ascend-site/resources.html` |
| FAQs | `/faq` | `src/content/pages/faq.ts` | `ascend-site/faq.html` |
| Partners | `/partners` | `src/content/pages/partners.ts` | `ascend-site/partners.html` (the export notes nothing links here; About has `#partners`) |

**Ascend Africa shares content with Ascend.** It uses the landing page's sections. Sections that read the same on both pages (press, founder letter, TLDR, testimonials, alumni, the deal, promise, employers, values, FAQs, the "Take your seat" bands) are edited once, under **Ascend**. Sections whose wording differs have their own copy under **Ascend Africa**.

**How the other pages are built.** They are ports of the static design export (`ascend-site/*.html`), kept as close to it as possible:

- **Markup** is in `src/app/(site)/<page>/page.tsx`, with every text, link and image from the content.
- **Styles.** `page.css` is the page's original stylesheet, scoped to the page's wrapper (`.pg-<page>`) by `scripts/scope-css.mjs` so it can't affect the rest of the site. `extra.css` holds the few additions: inline styles from the original markup and small mobile fixes. Either file can be edited by hand. To regenerate `page.css` from an updated export, run `node scripts/scope-css.mjs <page> "src/app/(site)/<page>/page.css" <path>/<page>.html`. This overwrites `page.css`.
- **Behaviour.** The canvases, sliders, modals and filters run the original scripts (`src/components/site/scripts/`), inside a small sandbox (`src/components/site/runtime.ts`). The sandbox scopes them to the page and stops everything when the visitor navigates away. Lists those scripts build (programme cards, people, quotes, books…) come from the content, and the values are escaped.
- **Shared by these pages:** the closing "Ready to ascend?" band and the "Applications open" pop-up (`src/content/pages/shared.ts`), and the partner logo sphere (`src/components/site/Orb.tsx`).
- **Images** from the export are in `public/site/`. Their pixel sizes are in `src/content/pages/assetDims.json`. The 54 African flags on Ascend Africa were rendered from the emoji the design uses.

**Forms.** The design's contact form (About) and newsletter sign-up (Resources) only pretended to send. They now open the visitor's email app with the message filled in, addressed to the email set in the admin. Connecting them to a form service or mailing list is a later step.

## Search engines and sharing

- **Every page is prerendered as static HTML.** Search engines get the full text without running JavaScript. The exception is the parts the original scripts build, such as carousels and the alumni wall; Google renders those too.
- **Titles and descriptions** come from each page's **Search & sharing** section in the admin. Each page also gets a canonical URL, Open Graph and Twitter tags, and the shared preview image (`src/app/opengraph-image.tsx`).
- **Structured data** (`src/components/seo/structuredData.ts`) is built from the content:
  - `WebSite` and `Organization` on every page;
  - `Course` on Ascend and Ascend Africa;
  - `FAQPage` on /faq.
- **`sitemap.xml`** lists every page from `src/content/pages/index.ts`.
- **`robots.txt`** keeps `/admin` and `/api` out of search results.
- **Icons:**
  - `src/app/favicon.ico`, `icon.svg` and `apple-icon.png`;
  - `public/icon-192.png` and `icon-512.png` for the web app manifest.
  - They are the Ascend "A" mark from the design export.
- **Before launch:** set `NEXT_PUBLIC_SITE_URL` to the live domain. Canonical URLs, the sitemap and the preview image links are built from it. Then add the site to Google Search Console and submit `/sitemap.xml`.
