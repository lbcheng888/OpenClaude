#!/usr/bin/env node
// Phase 1: Z-block cataloging
// Statically parse runtime.js to extract all Z blocks, their bodies, dependencies, and categories.

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const runtimePath = join(__dirname, '..', 'dist', 'runtime.js');
const outputPath = join(__dirname, '..', 'dist', 'z-block-catalog.json');
const source = readFileSync(runtimePath, 'utf-8');

// ============================================================
// Step 1: Find all Z blocks by tracking brace depth
// ============================================================

// Regex to find Z block start: var NAME=Z(()=>{
const Z_START_RE = /var\s+(\w+)=Z\(\(\)=>\{/g;

const zBlocks = [];
const starts = [];

let m;
while ((m = Z_START_RE.exec(source)) !== null) {
  starts.push({ name: m[1], startIdx: m.index + m[0].length - 1 }); // -1 to include opening brace
}

// For each Z block, find the closing brace
for (let i = 0; i < starts.length; i++) {
  const { name, startIdx } = starts[i];
  const endIdx = findClosingBrace(source, startIdx);
  const endPos = endIdx + 2; // include "});"
  const rawBody = source.slice(startIdx + 1, endIdx); // exclude opening brace

  zBlocks.push({
    name,
    startByte: starts[i].startIdx,
    endByte: endPos,
    bodyLength: rawBody.length,
    rawBody,
  });
}

// ============================================================
// Step 2: Analyze each Z block body
// ============================================================

function findClosingBrace(text, openBraceIdx) {
  let depth = 1;
  let i = openBraceIdx + 1;
  let inString = false;
  let stringChar = '';
  let inTemplate = false;
  let inRegex = false;
  let inSingleComment = false;
  let inMultiComment = false;

  while (i < text.length && depth > 0) {
    const ch = text[i];
    const prev = i > 0 ? text[i - 1] : '';
    const prev2 = i > 1 ? text[i - 2] : '';

    // Handle comments
    if (!inString && !inRegex && !inSingleComment && !inMultiComment) {
      if (ch === '/' && text[i + 1] === '/') {
        inSingleComment = true;
        i += 2;
        continue;
      }
      if (ch === '/' && text[i + 1] === '*') {
        inMultiComment = true;
        i += 2;
        continue;
      }
    }
    if (inSingleComment && ch === '\n') {
      inSingleComment = false;
    }
    if (inMultiComment && ch === '*' && text[i + 1] === '/') {
      inMultiComment = false;
      i += 2;
      continue;
    }
    if (inSingleComment || inMultiComment) {
      i++;
      continue;
    }

    // Handle strings
    if (!inString && !inTemplate && !inRegex && (ch === '"' || ch === "'" || ch === '`')) {
      if (ch === '`') {
        inTemplate = true;
      } else {
        inString = true;
        stringChar = ch;
      }
      i++;
      continue;
    }
    if (inString && ch === stringChar && prev !== '\\') {
      inString = false;
    }
    if (inTemplate && ch === '`' && prev !== '\\') {
      inTemplate = false;
    }

    // Handle regex
    if (!inString && !inTemplate && ch === '/' && prev !== '\\' && !inRegex) {
      // Heuristic: regex likely after =, (, ,, :, return
      if (prev === '=' || prev === '(' || prev === ',' || prev === ':' || prev === ' ' || prev === '!' || prev === '&' || prev === '|') {
        inRegex = true;
        i++;
        continue;
      }
    }
    if (inRegex && ch === '/' && prev !== '\\') {
      inRegex = false;
    }

    if (!inString && !inTemplate && !inRegex) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    i++;
  }
  return depth === 0 ? i - 1 : text.length - 1; // -1 to point to closing brace
}

// Extract dependency calls (other Z block invocations)
function extractDependencies(body) {
  const deps = new Set();
  // Pattern: NAME(); — direct calls to other Z blocks
  const depRe = /\b([A-Z][\w]{1,5})\(\)/g;
  let m;
  while ((m = depRe.exec(body)) !== null) {
    deps.add(m[1]);
  }
  return [...deps].sort();
}

// Extract module imports: XXX=u(fH(),1), XXX=u(nH(),1), XXX=require("...")
function extractImports(body) {
  const imports = {
    U: [], // u(fH(),1) — named imports from React/Ink module
    N: [], // u(nH(),1) — default imports
    require: [], // require("...")
  };

  const uNamedRe = /(\w+)=u\(fH\(\),(\d+)\)/g;
  const uDefaultRe = /(\w+)=u\(nH\(\),(\d+)\)/g;
  const requireRe = /(\w+)=require\(["']([^"']+)["']\)/g;

  let m;
  while ((m = uNamedRe.exec(body))) imports.U.push({ var: m[1], index: parseInt(m[2]) });
  while ((m = uDefaultRe.exec(body))) imports.N.push({ var: m[1], index: parseInt(m[2]) });
  while ((m = requireRe.exec(body))) imports.require.push({ var: m[1], module: m[2] });

  return imports;
}

// Check if body contains React/Ink patterns
function containsCreateElement(body) { return /\.createElement\(/.test(body); }
function containsUseState(body) { return /\buseState\b/.test(body); }
function containsUseEffect(body) { return /\buseEffect\b/.test(body); }
function containsUseRef(body) { return /\buseRef\b/.test(body); }
function containsUseCallback(body) { return /\buseCallback\b/.test(body); }
function containsRender(body) { return /\brender\(/.test(body); }
function containsJSXPattern(body) { return /createElement\(/.test(body) || /\.render\(/.test(body); }

// Check for side effects
function hasSideEffects(body) {
  const patterns = [
    /\bprocess\.exit\(/,
    /\bprocess\.argv/,
    /\bsetInterval\(/,
    /\bsetTimeout\(/,
    /\bfetch\(/,
    /\bWebSocket\b/,
    /\bhttp\./,
    /\bnet\./,
    /\bchild_process/,
    /\bworker_threads/,
    /\bserver\./,
  ];
  return patterns.filter(p => p.test(body));
}

// Categorize each Z block
function categorize(body, imports) {
  const hasCreateElement = containsCreateElement(body);
  const hasHooks = containsUseState(body) || containsUseEffect(body) || containsUseRef(body);
  const hasRenderCall = containsRender(body);
  const hasJSX = containsJSXPattern(body);

  // Core infrastructure (file system, crypto, network)
  const infraModules = imports.require.filter(i =>
    ['fs', 'fs/promises', 'crypto', 'child_process', 'worker_threads',
     'net', 'http', 'https', 'tls', 'dns', 'url', 'querystring',
     'stream', 'events', 'buffer', 'os', 'path', 'readline'].includes(i.module)
  );

  if (hasCreateElement || hasHooks || hasRenderCall) return 'UI-render';
  if (hasJSX && !hasCreateElement) return 'UI-import';
  if (imports.U.length > 0 || imports.N.length > 0) return 'UI-import';
  if (infraModules.length >= 3) return 'Infrastructure';
  if (containsUseState(body) || containsUseEffect(body)) return 'UI-utility';

  // Heuristic: lots of dependency calls + no creates = import aggregator
  const depCount = extractDependencies(body).length;
  if (depCount >= 10 && !hasCreateElement && !hasRenderCall) return 'UI-import';

  // Check for CLI patterns
  if (/\bprocess\.argv/.test(body) || /\bcommander\b/.test(body) || /\bparseAsync\b/.test(body))
    return 'CLI';

  return 'UI-utility';
}

// ============================================================
// Step 3: Build complete catalog
// ============================================================

for (const block of zBlocks) {
  block.dependencies = extractDependencies(block.rawBody);
  block.imports = extractImports(block.rawBody);
  block.category = categorize(block.rawBody, block.imports);
  block.sideEffectPatterns = hasSideEffects(block.rawBody).map(r => String(r).slice(1, -1));
  block.hasCreateElement = containsCreateElement(block.rawBody);
  block.hasHooks = containsUseState(block.rawBody) || containsUseEffect(block.rawBody);
  // bodyPreview for debugging (first 200 chars)
  block.bodyPreview = block.rawBody.slice(0, 200).replace(/\n/g, '\\n');
}

// Build dependency graph (reverse: who depends on who)
const dependents = {};
for (const block of zBlocks) {
  for (const dep of block.dependencies) {
    if (!dependents[dep]) dependents[dep] = [];
    dependents[dep].push(block.name);
  }
}

// ============================================================
// Step 4: Statistics and output
// ============================================================

const stats = {};
for (const b of zBlocks) {
  stats[b.category] = (stats[b.category] || 0) + 1;
}

// Iterative topological sort with cycle handling
function topoSort(blocks, depMap) {
  const blockNames = new Set(blocks.keys());
  const order = [];
  const visited = new Set();
  let changed = true;
  while (changed && visited.size < blockNames.size) {
    changed = false;
    for (const name of blockNames) {
      if (visited.has(name)) continue;
      const deps = (depMap[name] || []).filter(d => blockNames.has(d));
      if (deps.length === 0 || deps.every(d => visited.has(d))) {
        visited.add(name);
        order.push(name);
        changed = true;
      }
    }
    // If stuck (cycle), just add remaining
    if (!changed) {
      for (const name of blockNames) {
        if (!visited.has(name)) {
          visited.add(name);
          order.push(name);
          changed = true;
          break;
        }
      }
    }
  }
  return order;
}

const blockMap = new Map(zBlocks.map(b => [b.name, b]));
const depMap = {};
for (const b of zBlocks) {
  depMap[b.name] = b.dependencies.filter(d => blockMap.has(d));
}

const execOrder = topoSort(blockMap, depMap);

// Iterative depth computation with cycle handling
function computeDepths(blocks, depMap) {
  const depths = new Map();
  const blockNames = new Set(blocks.keys());

  // Start with blocks that have known deps (or no deps)
  let changed = true;
  while (changed) {
    changed = false;
    for (const name of blockNames) {
      if (depths.has(name)) continue;
      const deps = (depMap[name] || []).filter(d => blockNames.has(d));
      if (deps.length === 0) {
        depths.set(name, 0);
        changed = true;
      } else if (deps.every(d => depths.has(d))) {
        depths.set(name, Math.max(...deps.map(d => depths.get(d) || 0)) + 1);
        changed = true;
      }
    }
    // Break cycles: assign 0 to remaining unresolvable
    if (!changed) {
      for (const name of blockNames) {
        if (!depths.has(name)) depths.set(name, 0);
      }
    }
  }
  return depths;
}
const depthMap = computeDepths(blockMap, depMap);

const output = {
  summary: {
    totalBlocks: zBlocks.length,
    categoryCounts: stats,
    totalDependencies: zBlocks.reduce((sum, b) => sum + b.dependencies.length, 0),
    executionOrder: execOrder,
    maxDepth: Math.max(...depthMap.values()),
  },
  blocks: zBlocks.map(b => ({
    name: b.name,
    category: b.category,
    startByte: b.startByte,
    bodyLength: b.bodyLength,
    dependencyCount: b.dependencies.length,
    dependencies: b.dependencies.slice(0, 30).join(','),
    importCount: b.imports.U.length + b.imports.N.length + b.imports.require.length,
    namedImports: b.imports.U.map(i => `${i.var}:${i.index}`).join(','),
    defaultImports: b.imports.N.map(i => i.var).join(','),
    requireModules: b.imports.require.map(i => i.module).join(','),
    hasCreateElement: b.hasCreateElement,
    hasHooks: b.hasHooks,
    sideEffects: b.sideEffectPatterns.length > 0 ? b.sideEffectPatterns.join(',') : '',
    bodyPreview: b.bodyPreview,
    depth: depthMap.get(b.name) || 0,
  })),
  dependents,
  executionOrder: execOrder,
};

writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Cataloged ${zBlocks.length} Z blocks → ${outputPath}`);
console.log('Category breakdown:', stats);
console.log('Execution order length:', execOrder.length);
console.log('Max dependency depth:', Math.max(...depthMap.values()));

// Print allowlist: all UI-related blocks
const allowlist = zBlocks
  .filter(b => ['UI-import', 'UI-render', 'UI-utility'].includes(b.category))
  .map(b => b.name);

console.log(`UI allowlist: ${allowlist.length} blocks`);
console.log(`  UI-import: ${zBlocks.filter(b => b.category === 'UI-import').length}`);
console.log(`  UI-render: ${zBlocks.filter(b => b.category === 'UI-render').length}`);
console.log(`  UI-utility: ${zBlocks.filter(b => b.category === 'UI-utility').length}`);

// Write allowlist separately
const allowlistPath = join(__dirname, '..', 'dist', 'z-allowlist.json');
writeFileSync(allowlistPath, JSON.stringify({ allowlist, total: allowlist.length }, null, 2));
console.log(`Allowlist → ${allowlistPath}`);

// Show first 20 UI blocks
console.log('\nFirst 20 UI blocks in execution order:');
const uiFirst = execOrder.filter(n => blockMap.has(n) && ['UI-import', 'UI-render', 'UI-utility'].includes(blockMap.get(n).category));
console.log(uiFirst.slice(0, 20).join(', '));

// Show block depth distribution
const depthDist = {};
for (const b of zBlocks) {
  const d = depthMap.get(b.name) || 0;
  depthDist[d] = (depthDist[d] || 0) + 1;
}
console.log('\nDepth distribution:', depthDist);
