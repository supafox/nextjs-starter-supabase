![Project Header](public/opengraph/og-image.jpg)

# Next.js Boilerplate

A modern Next.js starter template with a modular structure, theming, and best practices.

---

## Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   # or
   bun install
   ```

2. **Run the development server**:

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## File Structure

- **app/**: Main Next.js app directory (routing, layouts, pages).
  - `layout.tsx`: Root layout for all pages.
  - `page.tsx`: Home page.
  - `legal/`: Legal pages (e.g., privacy, terms).
    - `[...slug]/page.tsx`: Dynamic legal content.
- **assets/**: Static assets.
  - `fonts/`: Custom font imports.
  - `icons/`: SVG/React icon components.
  - `styles/`: Global and MDX-specific CSS.
- **components/**: Reusable UI components.
  - `ui/`: Buttons, skeleton loaders, text.
  - `footer/`: Main footer component.
  - `navbar/`: Main navigation bar.
  - `mdx/`: MDX rendering helpers.
- **context/**: React context providers (e.g., theme).
- **data/**: Static data and content.
  - `metadata.ts`: Site metadata.
  - `content/legal/`: MDX files for legal pages.
- **features/**: Feature modules (e.g., theme toggle).
- **layouts/**: Layout components (e.g., main layout).
- **lib/**: Utility functions.
- **public/**: Static files served at root.
  - `opengraph/`: Social sharing images.
  - `web-app/`: Manifest and PWA icons.
  - `favicon/`: Favicon assets.
- **config files**: Project configuration (e.g., `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`).

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
