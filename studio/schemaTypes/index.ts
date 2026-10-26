import { defineArrayMember, defineField, defineType } from "sanity";

// Must match insightCategories in the website (src/data/site.ts); articles in other categories are not shown.
const categories = ["Talent Intelligence", "Career Intelligence", "Future of Work", "HR & Organization Development", "Industry Perspectives", "Resources and Guides"];

const slug = (source: string) => defineField({
  name: "slug", title: "Web address", type: "slug", options: { source, maxLength: 80 },
  description: "Click Generate. This becomes the page address.", validation: (r) => r.required(),
});

export const article = defineType({
  name: "article", title: "Insights article", type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required().max(110) }),
    slug("title"),
    defineField({ name: "category", title: "Insight area", type: "string", options: { list: categories, layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Summary", type: "text", rows: 3, description: "One or two sentences shown on cards and in search results.", validation: (r) => r.required().max(220) }),
    defineField({ name: "publishedAt", title: "Publish date", type: "date", initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({
      name: "body", title: "Article text", type: "array",
      description: "Original insight from Conductivity's own work. No client names, statistics or logos without approval.",
      of: [defineArrayMember({
        type: "block",
        styles: [{ title: "Normal", value: "normal" }, { title: "Heading", value: "h2" }, { title: "Subheading", value: "h3" }, { title: "Quote", value: "blockquote" }],
        lists: [{ title: "Bullets", value: "bullet" }, { title: "Numbers", value: "number" }],
        marks: {
          decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }],
          annotations: [{ name: "link", title: "Link", type: "object", fields: [{ name: "href", title: "Address", type: "url", validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }) }] }],
        },
      })],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category" } },
});

export const opportunity = defineType({
  name: "opportunity", title: "Opportunity", type: "document",
  description: "Only genuine, current, verified openings. It disappears from the site automatically after the closing date.",
  fields: [
    defineField({ name: "title", title: "Role or opportunity title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "type", title: "Type", type: "string", options: { list: ["Vacancy", "Project", "Internship", "Placement"], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "organization", title: "Employer", type: "string", description: "Use the employer's name only with their approval.", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location (city)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "remote", title: "Remote", type: "boolean", initialValue: false }),
    defineField({ name: "employmentType", title: "Employment type", type: "string", options: { list: ["FULL_TIME", "PART_TIME", "CONTRACTOR", "INTERN", "TEMPORARY"] } }),
    defineField({ name: "posted", title: "Date posted", type: "date", initialValue: () => new Date().toISOString().slice(0, 10), validation: (r) => r.required() }),
    defineField({ name: "closes", title: "Closing date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "apply", title: "How to apply (link or mailto:)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 6, description: "Responsibilities, requirements and how candidates are assessed.", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "organization" } },
});

export const event = defineType({
  name: "event", title: "Event", type: "document",
  fields: [
    defineField({ name: "name", title: "Event name", type: "string", validation: (r) => r.required() }),
    slug("name"),
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Type", type: "string", options: { list: ["Workshop", "Seminar", "Webinar", "Corporate session", "University session", "Training program", "Conference", "Community activity", "Career event"] }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "name", subtitle: "date" } },
});

export const schemaTypes = [article, opportunity, event];
