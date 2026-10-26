import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "your-project-id",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  // The address editors use after `npm run deploy`: https://conductivity.sanity.studio (change if taken).
  studioHost: "conductivity",
});
