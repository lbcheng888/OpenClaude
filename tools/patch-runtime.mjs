#!/usr/bin/env node
// Patch runtime.js with missing variable stubs found in full_bundle.cjs
// Strategy: find all function calls in Z block bodies that reference
// undefined variables, and add var stubs for them.

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const runtimePath = join(__dirname, '..', 'dist', 'runtime.js');
const outputPath = join(__dirname, '..', 'dist', 'runtime-patched.js');

console.log('Reading runtime.js...');
let runtime = readFileSync(runtimePath, 'utf-8');

// ============================================================
// Step 1: Find all var declarations (stubs + Z blocks)
// ============================================================
const declaredVars = new Set();
const varRe = /var\s+(\w+)\s*[=;,\n]/g;
let m;
while ((m = varRe.exec(runtime)) !== null) {
  declaredVars.add(m[1]);
}

// Also find function declarations
const funcRe = /function\s+(\w+)\s*\(/g;
while ((m = funcRe.exec(runtime)) !== null) {
  declaredVars.add(m[1]);
}

// Also: class declarations, async function, etc.
const classRe = /class\s+(\w+)/g;
while ((m = classRe.exec(runtime)) !== null) {
  declaredVars.add(m[1]);
}

console.log(`Found ${declaredVars.size} declared variables/functions/classes`);

// ============================================================
// Step 2: Find all function calls in Z block bodies
// ============================================================
// Extract Z block bodies
const zBodyRe = /var\s+(\w+)=Z\(\(\)=>\{([^}]+)\}\)/g;
const referencedInZ = new Set();
while ((m = zBodyRe.exec(runtime)) !== null) {
  const body = m[2];
  // Find all function calls: NAME();
  const callRe = /\b([A-Za-z_]\w{1,10})\(\)/g;
  let cm;
  while ((cm = callRe.exec(body)) !== null) {
    referencedInZ.add(cm[1]);
  }
}

console.log(`Found ${referencedInZ.size} unique function calls in Z block bodies`);

// Also find calls in non-Z inline code
const inlineCallRe = /\b([A-Za-z_]\w{1,10})\(\)/g;
const allCalls = new Set();
while ((m = inlineCallRe.exec(runtime)) !== null) {
  // Only count calls that look like Z block invocations (capital + short)
  const name = m[1];
  if (name.length >= 2 && name.length <= 8 && /[A-Z]/.test(name)) {
    allCalls.add(name);
  }
}

// ============================================================
// Step 3: Find variables that are called but never declared
// ============================================================
const missing = new Set();
for (const name of referencedInZ) {
  if (!declaredVars.has(name)) {
    missing.add(name);
  }
}
// Also check all calls
for (const name of allCalls) {
  if (!declaredVars.has(name) && name.length >= 3) {
    // Only add if it looks like a Z block name (3-4 uppercase chars typical)
    if (/^[A-Z]/.test(name) && name.length <= 6) {
      missing.add(name);
    }
  }
}

console.log(`Missing symbols (called but not declared): ${missing.size}`);

// ============================================================
// Step 4: Add missing var stubs
// ============================================================
// Find the right place to insert — after existing var __p declarations
const stubSectionEnd = runtime.indexOf('function yH('); // first real function
if (stubSectionEnd === -1) {
  console.error('Cannot find insertion point!');
  process.exit(1);
}

// Use ALL missing vars (no filter — the stub system handles any type safely)
const allMissing = [...missing].filter(name => {
  // Only filter out JS keywords and builtins
  const jsKeywords = new Set([
    'async','await','if','else','for','while','return','throw','true','false',
    'null','void','typeof','new','delete','NaN','undefined','Infinity',
    'yield','class','extends','switch','case','break','continue',
    'try','catch','finally','function','var','let','const','debugger',
    'this','super','arguments','import','export','default',
    'string','number','boolean','nullish','optional','unknown','any',
    'symbol','object','bigint','never','readonly','keyof',
    'Date','Error','Object','Array','String','Number','Boolean','RegExp',
    'Map','Set','Promise','Symbol','Math','JSON','parseInt','parseFloat',
    'resolve','reject','randomUUID','Close','Raw','create','Create',
    'Uint8Array','ArrayBuffer','Buffer','Int32Array',
  ]);
  return !jsKeywords.has(name) && name.length >= 2;
});

const newStubs = [...allMissing].map(name => `var ${name}=__p;`).join('\n');
runtime = runtime.slice(0, stubSectionEnd) + newStubs + '\n' + runtime.slice(stubSectionEnd);

// ============================================================
// Step 5: Write output
// ============================================================
writeFileSync(outputPath, runtime);
console.log(`\nWritten ${outputPath} (${(runtime.length / 1024 / 1024).toFixed(1)} MB)`);
console.log(`Added ${allMissing.length} missing var stubs`);
