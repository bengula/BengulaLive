import { PortfolioItem } from "../types";
import { portfolioItemTags } from "./portfolioTags";

export const portfolioItemsList: PortfolioItem[] = [
  // --- FEATURED PROJECTS ---
  {
    id: "fin-education-init",
    title: "Sovereign Debt Ladder Masterclasses",
    category: portfolioItemTags.project,
    description: "Led multiple high-yield sovereign bond seminars for young professionals, corporate managers, and diaspora associations. Demystified the DhowCSD accounts system to encourage retail participation in infrastructure bonds.",
    impact: "Equipped over 1,550 Kenyans with direct practical skills to deploy capital into safe, double-digit tax-free government debt auctions, bypassing banking intermediaries.",
    location: "Nairobi & Virtual",
    year: "2024 - 2026",
    metrics: [
      { label: "Graduates Trained", value: "1,505+ alumni" },
      { label: "Bids Submitted", value: "KSh 95,000,000+" },
      { label: "Bond Ladder Tool", value: "Distributed Free" }
    ],
    blogId: "sovereign-debt-explained",
    riskProfile: "Low"
  },
  {
    id: "tea-sorting-eng",
    title: "Tea Cooperative Strategic Restructure",
    category: portfolioItemTags.project,
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
  {
    id: "seo-lead-engine",
    title: "SME SEO & Inbound Lead Engine",
    category: portfolioItemTags.project,
    description: "Rebuilt the website, search visibility, and content engine for a Nairobi professional-services SME that was invisible on Google and relying entirely on referrals.",
    impact: "Took the business from page 4 to the top 3 results for its core service terms, turning organic search into a predictable, month-on-month source of qualified enquiries.",
    location: "Nairobi",
    year: "2025 - 2026",
    metrics: [
      { label: "Organic Traffic", value: "+310% in 6 mo" },
      { label: "Inbound Leads", value: "12 → 90 / mo" },
      { label: "Cost / Lead", value: "-64%" }
    ],
    riskProfile: "Low"
  },
  // --- BUSINESS VENTURES ---
  {
    id: "retail-data-dashboard",
    title: "Retail Data & Decision Dashboard",
    category: portfolioItemTags.businessVenture,
    description: "Built a live sales, stock, and margin dashboard for a multi-branch retailer that was making buying and pricing calls on gut feel and stale spreadsheets.",
    impact: "Put daily numbers in front of the owner, exposing dead stock and underpriced lines — decisions moved from monthly guesswork to weekly, evidence-led action.",
    location: "Mombasa & Nairobi",
    year: "2025",
    metrics: [
      { label: "Dead Stock", value: "-38% in Q1" },
      { label: "Gross Margin", value: "+5.2 pts" },
      { label: "Report Lag", value: "30 days → live" }
    ],
    riskProfile: "Low"
  },
  {
    id: "kikuyu-ridge-syndicate",
    title: "Kikuyu Ridge land-Banking Syndicate",
    category: portfolioItemTags.businessVenture,
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
    category: portfolioItemTags.businessVenture,
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
    id: "ecommerce-conversion-launch",
    title: "E-commerce Storefront & Conversion Launch",
    category: portfolioItemTags.caseStudy,
    description: "Took an agri-products brand online from scratch — storefront, payments, analytics, and a search-and-social funnel — then tuned the checkout against real drop-off data.",
    impact: "Launched a working online channel that now sells beyond the physical shop, with conversion tracking that shows exactly which campaigns and pages pay back.",
    location: "Meru & Online",
    year: "2025",
    metrics: [
      { label: "Online Revenue", value: "0 → 28% of sales" },
      { label: "Checkout Conv.", value: "1.1% → 3.4%" },
      { label: "Return Buyers", value: "31% repeat rate" }
    ],
    riskProfile: "Low"
  },
  {
    id: "high-earner-transition",
    title: "Sleeping Asset Yield Optimization",
    category: portfolioItemTags.caseStudy,
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
    category: portfolioItemTags.caseStudy,
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
