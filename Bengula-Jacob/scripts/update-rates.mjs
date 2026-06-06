// Refresh data/forex.csv from a downloaded CBK CSV (a laptop convenience).
//
// Rates are parsed at build time from the CSVs in /data, so you can ALSO update
// them by editing data/forex.csv or data/key-rates.csv directly on GitHub
// (e.g. from your phone) — no laptop needed.
//
// Laptop flow:
//   1. Download "TRADE WEIGHTED AVERAGE INDICATIVE RATES.csv" from
//      https://www.centralbank.go.ke/forex/  (saves to your Downloads).
//   2. Run:  npm run rates:publish      (copies it in, commits, and pushes)
//      or:   npm run update-rates       (just copies it in, so you can review)
import { copyFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { homedir } from "node:os";

const args = process.argv.slice(2);
const publish = args.includes("--publish");
const src =
  args.find((a) => !a.startsWith("--")) ||
  join(homedir(), "Downloads", "TRADE WEIGHTED AVERAGE INDICATIVE RATES.csv");
const dest = join("data", "forex.csv");

if (!existsSync(src)) {
  console.error(`CSV not found: ${src}\nPass a path:  npm run update-rates -- "C:\\path\\to.csv"`);
  process.exit(1);
}

copyFileSync(src, dest);
console.log(`Copied forex CSV into ${dest}.`);

if (publish) {
  try {
    execSync("git add data/forex.csv", { stdio: "inherit" });
    execSync('git commit -m "Update forex rates"', { stdio: "inherit" });
    execSync("git push", { stdio: "inherit" });
    console.log("\nPublished — Cloudflare will redeploy shortly.");
  } catch {
    console.log("\nNothing to publish (rates unchanged?) or a git step failed — see above.");
  }
}
