/**
 * PORTFOLIO ITEM TEMPLATE
 *
 * Copy the object below into `src/data/portfolioData.ts` when adding a new
 * project, business venture, or case study.
 *
 * Use the shared tags from `portfolioItemTags`:
 *   - portfolioItemTags.project
 *   - portfolioItemTags.businessVenture
 *   - portfolioItemTags.caseStudy
 *
 * Use one of the shared risk levels:
 *   - "Low"
 *   - "Moderate"
 *   - "High"
 */

import { PortfolioItem } from "../types";
import { portfolioItemTags } from "./portfolioTags";

export const templatePortfolioItem: PortfolioItem = {
  id: "your-portfolio-item-id",
  title: "Your Portfolio Item Title",
  category: portfolioItemTags.businessVenture,
  description:
    "A concise explanation of what happened, who it served, and why it mattered.",
  impact:
    "The tactical result or strategic outcome visitors should remember after reading this item.",
  location: "Nairobi / Virtual / Region",
  year: "2026",
  metrics: [
    { label: "Capital", value: "KSh 0" },
    { label: "Participants", value: "0 clients" },
    { label: "Outcome", value: "0%" },
  ],
  blogId: "matching-article-id",
  riskProfile: "Moderate",
};

