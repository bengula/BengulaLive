import { PortfolioItem } from "../types";

export const portfolioItemsList: PortfolioItem[] = [
  // --- FEATURED PROJECTS ---
  {
    id: "fin-education-init",
    title: "Sovereign Debt Ladder Masterclasses",
    category: "Featured Projects",
    description: "Led multiple high-yield sovereign bond seminars for young professionals, corporate managers, and diaspora associations. Demystified the DhowCSD accounts system to encourage retail participation in infrastructure bonds.",
    impact: "Equipped over 1,550 Kenyans with direct practical skills to deploy capital into safe, double-digit tax-free government debt auctions, bypassing banking intermediaries.",
    location: "Nairobi & Virtual",
    year: "2024 - 2026",
    metrics: [
      { label: "Graduates Trained", value: "1,505+ alumni" },
      { label: "Bids Submitted", value: "KSh 95,000,000+" },
      { label: "Bond Ladder Tool", value: "Distributed Free" }
    ],
    blogId: "sovereign-debt-masterclass",
    riskProfile: "Low"
  },
  {
    id: "tea-sorting-eng",
    title: "Tea Cooperative Strategic Restructure",
    category: "Featured Projects",
    description: "Consulted extensively for a private Meru-based agricultural cooperative to structure debt and optimize invoice processing workflows.",
    impact: "Recommended a secure debt consolidation package that reduced borrowing interest expenses by 22%, saving crucial liquid operating capital.",
    location: "Meru District",
    year: "2025",
    metrics: [
      { label: "Debt Managed", value: "KSh 35,000,000" },
      { label: "Interest Saved", value: "KSh 4,200,000" },
      { label: "Advisory Term", value: "3 Months" }
    ],
    blogId: "tea-cooperative-restructure",
    riskProfile: "Low"
  },
  // --- BUSINESS VENTURES ---
  {
    id: "kikuyu-ridge-syndicate",
    title: "Kikuyu Ridge land-Banking Syndicate",
    category: "Business Ventures",
    description: "A secure Bengula Inc co-investment placement that grouped 14 professionals to purchase a prime 5-acre piece of land in Kiambu County near high-growth infrastructural highways.",
    impact: "Unrealized capital appreciation outpaced traditional inflation levels, securing a robust long-term asset backup for the co-investor cohort.",
    location: "Kiambu County",
    year: "2024 - 2026",
    metrics: [
      { label: "Syndicate Size", value: "KSh 42,000,000" },
      { label: "Active Partners", value: "14 investors" },
      { label: "Target IRR", value: "22% Compounded" }
    ],
    blogId: "kikuyu-ridge-syndicate",
    riskProfile: "Moderate"
  },
  {
    id: "cold-chain-startup",
    title: "Zindua Agri-Logistics Seed Alliance",
    category: "Business Ventures",
    description: "Bengula Inc partnered with an innovative fintech startup focusing on cold-storage macadamia and avocado transport systems between regional farming associations and coastal export yards.",
    impact: "Decreased transport crop shrinkage by 35% while increasing the direct payout rate to local farming families on the network.",
    location: "Meru to Mombasa Corridor",
    year: "2024",
    metrics: [
      { label: "Seed Venture", value: "KSh 15,000,000" },
      { label: "Wastage Reduced", value: "-35%" },
      { label: "Farmer Accounts", value: "120+ active" }
    ],
    blogId: "zindua-agri-logistics",
    riskProfile: "Moderate"
  },
  // --- CASE STUDIES ---
  {
    id: "high-earner-transition",
    title: "Sleeping Asset Yield Optimization",
    category: "Case Studies",
    description: "A comprehensive wealth portfolio remodel for a high-earning corporate executive who had idle funds sitting in static, non-income-paying tracts of suburban land.",
    impact: "Liquidated secondary under-utilized vacant parcels and reallocated capital into a diversified sovereign bond ladder, generating immediate liquid cash distributions monthly.",
    location: "Nairobi",
    year: "2025",
    metrics: [
      { label: "Capital Reallocated", value: "KSh 25,000,000" },
      { label: "Monthly Coupons", value: "KSh 340,000 Net" },
      { label: "Tax Liability", value: "0% (All IFBs)" }
    ],
    blogId: "sleeping-asset-optimization",
    riskProfile: "Low"
  },
  {
    id: "sme-margin-remodel",
    title: "SME Packager Margin Optimization",
    category: "Case Studies",
    description: "Conducted business consulting and pricing reviews for a mid-tier local FMCG packing brand experiencing high sales but persistent net profit shortages.",
    impact: "Restructured unit-pricing metrics, configured customer-relationship pipelines, and streamlined manual accounting workflows with lightweight automated digital dashboards.",
    location: "Industrial Area, Nairobi",
    year: "2025",
    metrics: [
      { label: "EBITDA Margin", value: "Grew from 6% to 18%" },
      { label: "Manual Delay", value: "Reduced by 40%" },
      { label: "Annual Revenue", value: "+30% Year-on-Year" }
    ],
    blogId: "sme-packager-optimization",
    riskProfile: "Low"
  }
];
