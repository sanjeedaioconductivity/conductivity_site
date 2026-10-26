# Conductivity content studio (Sanity)

Where the team edits **Insights articles**, **Opportunities** and **Events** without a developer.
The website picks up published changes within about 5 minutes.

## One-time setup

1. Create a free account at <https://www.sanity.io> and a new project (dataset: `production`). Note the **project ID**.
2. In this `studio` folder, create a file named `.env` containing:
   ```
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```
3. Install and publish the studio:
   ```
   npm install
   npm run deploy
   ```
   Editors then use **https://conductivity.sanity.studio** (choose another name if it is taken).
4. In sanity.io/manage → **API → CORS origins**, add the website address (for example `https://www.conductivity.com.pk`).
5. In Vercel → Project → Settings → Environment Variables, add
   `NEXT_PUBLIC_SANITY_PROJECT_ID` (same project ID) and `NEXT_PUBLIC_SANITY_DATASET=production`, then redeploy.
6. In sanity.io/manage → **Members**, invite the people who will edit content.

## Day to day

- **Articles:** title, web address (click *Generate*), insight area, summary, date, author and the article text. Articles get their own page at `/insights/<web-address>`, appear in their area on Insights, in site search, and the newest per area is featured on the Home page.
- **Opportunities:** only genuine, verified, current openings. Each disappears automatically after its closing date.
- **Events:** past and upcoming are sorted automatically by date.

Until the website has a Sanity project ID, it keeps showing the content in `src/data`.
