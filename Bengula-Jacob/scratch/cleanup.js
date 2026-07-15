const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../content/investing/ultimate-guide-to-personal-finance-kenya.md');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace the specific formula block
const oldFormulaPattern = /A simplified framework looks like this:\s*```[^`]*Income\s*− Taxes and statutory deductions\s*− Essential living expenses\s*− Debt repayments\s*=\s*Available Cash Flow\s*Available Cash Flow\s*↓\s*Emergency Fund\s*↓\s*Long-term Investments\s*↓\s*Lifestyle Spending\s*```/is;

// Let's do a more robust regex for lines 551 to 569:
const targetStart = "A simplified framework looks like this:\n\n```\nIncome\n− Taxes and statutory deductions\n− Essential living expenses\n− Debt repayments\n= Available Cash Flow\n\nAvailable Cash Flow\n↓\n\nEmergency Fund\n↓\n\nLong-term Investments\n\n↓\n\nLifestyle Spending\n```";

const newFormula = `A simplified framework looks like this:

$$ \\text{Available Cash Flow} = \\text{Income} - \\text{Taxes \\& Statutory Deductions} - \\text{Essential Living Expenses} - \\text{Debt Repayments} $$

The generated available cash flow is then allocated sequentially down the priority stack:

\`\`\`mermaid
flowchart TD
    CF["Available Cash Flow"] --> EF["1. Emergency Fund (Build buffer first)"]
    EF --> LI["2. Long-Term Investments (Grow wealth second)"]
    LI --> LS["3. Lifestyle Spending (Spend discretionary residue)"]

    style CF fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style EF fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style LI fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style LS fill:#ffebee,stroke:#d32f2f,stroke-width:2px
\`\`\``;

if (content.includes(targetStart)) {
  content = content.replace(targetStart, newFormula);
  console.log("Formula replaced successfully!");
} else {
  // Let's search using a laxer regex
  const laxPattern = /A simplified framework looks like this:\s*```\s*Income\s*− Taxes and statutory deductions\s*− Essential living expenses\s*− Debt repayments\s*=\s*Available Cash Flow\s*Available Cash Flow\s*↓\s*Emergency Fund\s*↓\s*Long-term Investments\s*↓\s*Lifestyle Spending\s*```/i;
  if (laxPattern.test(content)) {
    content = content.replace(laxPattern, newFormula);
    console.log("Formula replaced using lax pattern!");
  } else {
    console.log("Could not find the exact formula block.");
  }
}

// 2. Replace all em-dashes
// Let's be smart about em-dashes.
// Replace " — " (spaced em-dash) and "—" (unspaced em-dash) with appropriate punctuation depending on context.
// Let's replace " — " with " - " or parentheses / colons.
// First, check references to external sites, which are usually "(CBK) — CBR" -> "(CBK): CBR"
content = content.replace(/\(CBK\)\s*—\s*/g, '(CBK): ');
content = content.replace(/\(KRA\)\s*—\s*/g, '(KRA): ');
content = content.replace(/\(CMA\)\s*—\s*/g, '(CMA): ');
content = content.replace(/\(RBA\)\s*—\s*/g, '(RBA): ');
content = content.replace(/\(IRA\)\s*—\s*/g, '(IRA): ');
content = content.replace(/\(SASRA\)\s*—\s*/g, '(SASRA): ');
content = content.replace(/\(NSE\)\s*—\s*/g, '(NSE): ');
content = content.replace(/\(NSSF\)\s*—\s*/g, '(NSSF): ');
content = content.replace(/\(SHA\)\s*—\s*/g, '(SHA): ');
content = content.replace(/\(T-bill\/T-bond[^\)]*\)\s*—\s*/g, '$1: ');
content = content.replace(/DhowCSD\)\s*—\s*/g, 'DhowCSD): ');
content = content.replace(/FSD Kenya\)\s*—\s*/g, 'FSD Kenya): ');

// Replace other spaced em-dashes
// Let's look at the remaining spaced em-dashes
content = content.replace(/\s*—\s*/g, ' - ');
content = content.replace(/—/g, ' - ');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Em-dashes replaced successfully!");
