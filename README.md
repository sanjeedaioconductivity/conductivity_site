# Conductivity website

Next.js (App Router) + Tailwind site implementing the "Conductivity Website Concept" document.
Pages: Home, About, Services, Sanjeeda, Events, Facilities, Inside Conductivity, Insights, Careers, Contact.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Editing content
All copy lives in `src/data/site.ts` (services, journey, events, facilities, insights, contact details, open roles).
Placeholders to replace before launch: contact details, company story / mission / vision / leadership (About),
photos (`Photo` placeholders), sample events and insights, social links, map embed.
The contact form is front-end only — connect `ContactForm.tsx` to an email service / API route.

Colors are Tailwind tokens in `tailwind.config.ts` (`ink`, `spark`, `volt`, `sanj`); the Sanjeeda section uses the
distinct `sanj` (pink/plum) palette. Design is provisional: conductivity.com.pk was not reachable from the build
environment, so match its brand colors/fonts there once available.
