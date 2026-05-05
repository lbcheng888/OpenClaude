#!/usr/bin/env node
// Official Update Pipeline: extract → diff → map → report
// Usage: node tools/update-from-binary.mjs [path-to-new-binary]

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const versionsDir = join(projectRoot, ".versions");
const toolsDir = join(__dirname);

// === Step 1: Extract full_bundle.cjs from binary ===
async function extractBundle(binaryPath, version) {
  const extractScript = "/Users/lbcheng/open-claude-code/extract_v4.py";
  const outDir = join(versionsDir, version);

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  console.log(`Extracting from ${binaryPath}...`);
  console.log(`  (This runs extract_v4.py with BINARY=${binaryPath} OUTDIR=${outDir})`);

  // Run the Python extraction script with env vars
  const cmd = `BINARY="${binaryPath}" OUTDIR="${outDir}" python3 "${extractScript}"`;
  try {
    execSync(cmd, { stdio: "inherit", timeout: 120000 });
  } catch (e) {
    console.error("Extraction failed. Make sure the binary exists and is a Bun standalone.");
    process.exit(1);
  }

  const bundlePath = join(outDir, "main_bundle", "full_bundle.cjs");
  if (!existsSync(bundlePath)) {
    console.error("full_bundle.cjs not found after extraction!");
    process.exit(1);
  }

  const size = (readFileSync(bundlePath).length / 1024 / 1024).toFixed(1);
  console.log(`  Extracted: ${bundlePath} (${size} MB)`);
  return { bundlePath, outDir };
}

// === Step 2: Extract Z blocks from a full_bundle.cjs ===
function extractZBlocks(bundlePath) {
  const src = readFileSync(bundlePath, "utf-8");
  const jsEnd = src.lastIndexOf("lu3();})");
  const clean = jsEnd !== -1 ? src.slice(0, jsEnd + "lu3();})".length) : src;

  const blocks = {};
  const re = /var\s+(\w+)=Z\(\(\)=>\{/g;
  let m;
  while ((m = re.exec(clean)) !== null) {
    const name = m[1];
    const bodyStart = m.index + m[0].length;
    let depth = 1, i = bodyStart;
    while (i < clean.length && depth > 0) {
      if (clean[i] === "{") depth++;
      else if (clean[i] === "}") depth--;
      i++;
    }
    blocks[name] = clean.slice(bodyStart, i - 1);
  }
  return blocks;
}

// === Step 3: Diff Z blocks between two versions ===
function diffZBlocks(oldBlocks, newBlocks) {
  const changed = [];
  const added = [];
  const removed = [];

  for (const [name, body] of Object.entries(newBlocks)) {
    if (!oldBlocks[name]) {
      added.push(name);
    } else if (oldBlocks[name] !== body) {
      changed.push({ name, oldLen: oldBlocks[name].length, newLen: body.length });
    }
  }

  for (const name of Object.keys(oldBlocks)) {
    if (!newBlocks[name]) removed.push(name);
  }

  return { changed, added, removed };
}

// === Step 4: Map Z blocks to our TypeScript files ===
const ZBLOCK_TO_FILE = {
  // Dialog components
  ef3: "src/terminal/components/wrappers.tsx",         // ConfigErrorDialog
  ES3: "src/terminal/components/dialogs.tsx",          // SettingsErrors
  DkH: "src/terminal/components/batch-3.tsx",          // ToolConfirmWithRemember
  BuK: "src/terminal/components/batch-3.tsx",          // TeleportProgressView
  IS3: "src/terminal/components/batch-4.tsx",          // TeleportRepoMismatch
  GS3: "src/terminal/components/batch-3.tsx",          // ModelMigrationDialog
  // Agent Loop
  CQK: "src/core/agent-loop.ts",                       // Tool execution
  // Startup/Welcome
  nA6: "src/terminal/startup-screen.tsx",              // Welcome greeting
  tcH: "src/terminal/startup-screen.tsx",              // Header info
  // Main TUI
  VM6: "src/terminal/components/dialogs.tsx",          // TrustDialog
};

function mapToFiles(changedBlocks) {
  const fileChanges = {};
  for (const item of changedBlocks) {
    const name = typeof item === "string" ? item : item.name;
    const file = ZBLOCK_TO_FILE[name];
    if (file) {
      if (!fileChanges[file]) fileChanges[file] = [];
      fileChanges[file].push(name);
    }
  }
  return fileChanges;
}

// === Main ===
async function main() {
  const args = process.argv.slice(2);
  const binaryPath = args[0] || process.env.CLAUDE_CODE_BINARY;

  if (!binaryPath) {
    console.log("Usage: node tools/update-from-binary.mjs <path-to-new-binary>");
    console.log("  or:  CLAUDE_CODE_BINARY=<path> node tools/update-from-binary.mjs");
    console.log("");
    console.log("This tool:");
    console.log("  1. Extracts full_bundle.cjs from the new binary");
    console.log("  2. Diffs Z blocks against the current version");
    console.log("  3. Reports which TypeScript files need updating");
    console.log("  4. Shows the exact Z block diff for each changed component");
    process.exit(0);
  }

  // Get version from binary
  let version;
  try {
    version = execSync(`"${binaryPath}" --version`, { encoding: "utf-8", timeout: 10000 }).trim();
    version = version.match(/(\d+\.\d+\.\d+)/)?.[1] || "unknown";
  } catch {
    version = new Date().toISOString().slice(0, 10);
  }
  console.log(`Binary version: ${version}`);

  // Check if we have a current version to diff against
  const currentBundle = "/Users/lbcheng/open-claude-code/extracted_v4/main_bundle/full_bundle.cjs";
  if (!existsSync(currentBundle)) {
    console.log("No current bundle found — extracting new one as baseline.");
  }

  // Extract new bundle
  const { bundlePath } = await extractBundle(binaryPath, version);

  if (!existsSync(currentBundle)) {
    console.log("\nBaseline created. Run again with a new binary to diff.");
    return;
  }

  // Diff
  console.log("\n=== Diffing Z blocks ===");
  const oldBlocks = extractZBlocks(currentBundle);
  const newBlocks = extractZBlocks(bundlePath);
  const { changed, added, removed } = diffZBlocks(oldBlocks, newBlocks);

  console.log(`  Changed: ${changed.length} blocks`);
  console.log(`  Added: ${added.length} blocks`);
  console.log(`  Removed: ${removed.length} blocks`);

  // Map to files
  const fileChanges = mapToFiles([...changed, ...added]);

  if (Object.keys(fileChanges).length > 0) {
    console.log("\n=== Files needing update ===");
    for (const [file, blocks] of Object.entries(fileChanges)) {
      console.log(`  ${file}: ${blocks.join(", ")}`);
    }
  }

  // Show actual diffs for mapped blocks
  if (changed.length > 0) {
    console.log("\n=== Block diffs ===");
    for (const { name, oldLen, newLen } of changed) {
      if (ZBLOCK_TO_FILE[name]) {
        const diff = newLen - oldLen;
        const sign = diff > 0 ? "+" : "";
        console.log(`  ${name} → ${ZBLOCK_TO_FILE[name]} (${sign}${diff} bytes)`);
      }
    }
  }

  // Update symlink to latest extraction
  console.log(`\nNew extraction: ${bundlePath}`);
  console.log("To apply changes: review the diff above and update the listed TypeScript files.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
