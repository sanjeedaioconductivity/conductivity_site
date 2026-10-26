import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// Conductivity content studio. Set SANITY_STUDIO_PROJECT_ID (and optionally SANITY_STUDIO_DATASET) in studio/.env,
// using the same project as the website's NEXT_PUBLIC_SANITY_PROJECT_ID.
export default defineConfig({
  name: "conductivity",
  title: "Conductivity",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "your-project-id",
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list().title("Website content").items([
          S.documentTypeListItem("article").title("Insights articles"),
          S.documentTypeListItem("opportunity").title("Opportunities"),
          S.documentTypeListItem("event").title("Events"),
        ]),
    }),
  ],
  schema: { types: schemaTypes },
});
