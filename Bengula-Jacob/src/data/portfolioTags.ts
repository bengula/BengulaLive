export const portfolioItemTags = {
  project: "Featured Projects",
  businessVenture: "Business Ventures",
  caseStudy: "Case Studies",
} as const;

export const portfolioCategories = Object.values(portfolioItemTags);
export const portfolioCategoryFilters = ["All", ...portfolioCategories] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
export type PortfolioCategoryFilter = (typeof portfolioCategoryFilters)[number];

export const riskLevels = ["Low", "Moderate", "High"] as const;
export type RiskProfile = (typeof riskLevels)[number];

export const categoryBadgeStyles: Record<PortfolioCategory, string> = {
  [portfolioItemTags.project]: "bg-blue-50 text-blue-900 border border-blue-100",
  [portfolioItemTags.businessVenture]: "bg-indigo-50 text-indigo-700 border border-indigo-100",
  [portfolioItemTags.caseStudy]: "bg-emerald-50 text-emerald-700 border border-emerald-100",
};

export const riskBadgeStyles: Record<RiskProfile, string> = {
  Low: "bg-emerald-50 text-emerald-800 border border-emerald-200/60",
  Moderate: "bg-amber-50 text-amber-800 border border-amber-200/60",
  High: "bg-red-50 text-red-800 border border-red-200/60",
};
