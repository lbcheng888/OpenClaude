#!/usr/bin/env node
// Extract only UI-rendering Z blocks from full_bundle.cjs
// Skip CLI/daemon/network/infrastructure blocks
// Creates a lightweight bundle that loads fast

import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('/Users/lbcheng/open-claude-code/extracted_v4/main_bundle/full_bundle.cjs', 'utf-8');
const jsEnd = src.lastIndexOf('lu3();})');
const clean = jsEnd !== -1 ? src.slice(0, jsEnd + 'lu3();})'.length) : src;

console.log('Full bundle:', (clean.length / 1024 / 1024).toFixed(1), 'MB');

// ============================================================
// Strategy: identify which Z blocks reference React/Ink/createElement
// Keep those, stub everything else
// ============================================================

// Find all Z block declarations
const zBlockRe = /var\s+(\w+)=Z\(\(\)=>\{([^}]+?)\}\)/g;
const uiBlocks = new Set();
const infraBlocks = new Set();
let zm;

// First pass: categorize each block
const blockBodies = {};
while ((zm = zBlockRe.exec(clean)) !== null) {
  const name = zm[1];
  const body = zm[2];
  blockBodies[name] = body;

  // UI indicators
  const hasCreateElement = /\w+\.(?:default\.)?createElement\(/.test(body);
  const hasUImport = /u\(fH\(\),\d+\)/.test(body); // React import
  const hasNImport = /u\(nH\(\),\d+\)/.test(body); // default import
  const hasRequire = /require\(/.test(body);
  const hasProcess = /\bprocess\.(?!env)/.test(body);

  if (hasCreateElement || hasUImport || hasNImport) {
    uiBlocks.add(name);
  } else if (hasProcess || hasRequire) {
    infraBlocks.add(name);
  }
  // Blocks with neither are utility/import aggregators → keep as UI
}

// Second pass: blocks depended on by UI blocks are also needed
function getDeps(body) {
  const deps = new Set();
  const depRe = /\b([A-Z]\w{1,8})\(\)/g;
  let m;
  while ((m = depRe.exec(body)) !== null) deps.add(m[1]);
  return deps;
}

// Build dependency graph
const allDeps = {};
for (const [name, body] of Object.entries(blockBodies)) {
  allDeps[name] = getDeps(body);
}

// Expand: any block that a UI block depends on becomes UI too
let changed = true;
while (changed) {
  changed = false;
  for (const name of [...uiBlocks]) {
    for (const dep of (allDeps[name] || [])) {
      if (!uiBlocks.has(dep) && !infraBlocks.has(dep) && blockBodies[dep]) {
        uiBlocks.add(dep);
        changed = true;
      }
    }
  }
}

console.log(`UI blocks: ${uiBlocks.size}`);
console.log(`Infrastructure blocks (excluded): ${infraBlocks.size}`);
console.log(`Total blocks: ${Object.keys(blockBodies).length}`);

// Now create the slim bundle:
// 1. Keep the module system (n, u, Z, j_, __p, etc.)
// 2. Keep UI Z blocks with their bodies
// 3. Stub non-UI Z blocks (replace body with return __p;)

// Find the module system preamble (everything before first Z block)
const firstZ = clean.search(/var\s+\w+=Z\(\(\)=>\{/);
let preamble = clean.slice(0, firstZ);

// Stub non-UI Z blocks: replace their bodies
let result = preamble;

// Process the rest (all Z blocks + inline functions)
const rest = clean.slice(firstZ);

// Replace non-UI Z block bodies
for (const [name, body] of Object.entries(blockBodies)) {
  if (!uiBlocks.has(name)) {
    // Replace this Z block body with stub
    const pattern = `var ${name}=Z(()=>{${escapeRegExp(body)}})`;
    const replacement = `var ${name}=Z(()=>{return __p;})`;
    if (rest.includes(pattern)) {
      console.log(`Stubbing: ${name}`);
    }
  }
}

// Simpler approach: just use regex to replace non-UI Z blocks
let simplified = rest;
for (const name of Object.keys(blockBodies)) {
  if (!uiBlocks.has(name)) {
    // Replace: var NAME=Z(()=>{BODY}) → var NAME=Z(()=>{return __p;})
    const re = new RegExp(`var ${name}=Z\\(\\(\\)=>\\{[^}]+?\\}\\)`, 'g');
    simplified = simplified.replace(re, `var ${name}=Z(()=>{return __p;})`);
  }
}

result += simplified;

const outPath = '/Users/lbcheng/open-claude-code/claude-code-full/dist/ui-bundle.cjs';
writeFileSync(outPath, result);
console.log(`\nUI bundle: ${(result.length / 1024 / 1024).toFixed(1)} MB → ${outPath}`);
console.log(`Reduction: ${((1 - result.length / clean.length) * 100).toFixed(0)}% smaller`);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
