import { rm, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const originalPortfolioExport = path.join(root, "out", "portfolio");

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

if (await exists(originalPortfolioExport)) {
  await rm(originalPortfolioExport, { recursive: true, force: true });
  console.log("Static export pruned: removed out/portfolio original source images.");
} else {
  console.log("Static export prune skipped: out/portfolio was not present.");
}
