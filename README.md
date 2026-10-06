# AuthorShelf (Serialized Publishing Platform):
An author-first, algorithm-free publishing platform and Progressive Web App (PWA) designed for independent authors to host, share, and monetize their serialized novels directly with readers.
Built to give authors complete ownership over their reader experience without competing against marketplace algorithms or distraction-heavy catalogs.

## Platform Features

### For Readers
- **Direct Author Libraries:** Access an author's complete catalog via clean, custom link sharing.
- **Distraction-Free Reading:** Customizable reader settings (dark/light mode, font scaling, line height, letter spacing).
- **No-Friction Access:** Start reading immediately without mandatory accounts. Reading progress is saved locally.
- **Cross-Author Reader Drawer:** Optional lightweight sign-up allowing readers to save books from multiple independent authors into a single personal library.

### For Authors
- **Multi-Book Management:** Organize and release multiple titles and chapters simultaneously.
- **Media-Rich Chapters:** Embed inline images, background audio/ambient soundscapes, and videos directly into text blocks.
- **Beta / Tester Environment:** Share private staging links with embedded paragraph-level notes to gather targeted reader feedback.
- **Privacy-First Analytics:** High-level and chapter-level tracking for page views, completion rates, and read times.

## Tech Stack
- **Framework:** Next.js (App Router, Server Components & PWA)
- **Database & Auth:** Supabase (PostgreSQL with Row-Level Security for multi-tenant isolation)
- **Styling:** Tailwind CSS + shadcn/ui
- **Hosting & Deployment:** Vercel

## Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
## Quick Start
# Install dependencies
npm install

# Run local development server
npm run dev
