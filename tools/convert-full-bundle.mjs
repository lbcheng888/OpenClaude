#!/usr/bin/env node
// Convert full_bundle.cjs (Bun CJS format) to Node.js-compatible runtime
// Replaces Bun VFS requires with stubs, preserves all Z blocks and UI code

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = '/Users/lbcheng/open-claude-code/extracted_v4/main_bundle/full_bundle.cjs';
const outputPath = join(__dirname, '..', 'dist', 'runtime-full.mjs');

console.log('Reading full_bundle.cjs...');
let source = readFileSync(bundlePath, 'utf-8');
console.log(`Source: ${(source.length / 1024 / 1024).toFixed(1)} MB`);

// ============================================================
// Step 1: Strip Bun CJS header
// ============================================================
// The "e @bun-cjs" header is for Bun's internal module system
source = source.replace(/^e @bun-cjs\n/, '');
// Remove the CJS wrapper: (function(exports, require, module, __filename, __dirname) {
// And the closing })
const WRAPPER_START = "(function(exports, require, module, __filename, __dirname) {";
const WRAPPER_END = "})";

// Find the start of actual code (after the wrapper)
const wrapperIdx = source.indexOf(WRAPPER_START);
if (wrapperIdx === -1) {
  console.error('CJS wrapper not found!');
  process.exit(1);
}
// Extract the wrapped body
const wrappedBody = source.slice(wrapperIdx + WRAPPER_START.length);

// Find the real end of JS code: look for "lu3();})" which is the entry point call + wrapper closing
// Everything after is binary garbage from the Bun standalone embedding
const realEnd = wrappedBody.lastIndexOf('lu3();})');
let body;
if (realEnd !== -1) {
  body = wrappedBody.slice(0, realEnd + 'lu3();})'.length - 2); // keep the lu3(); but drop })
  console.log('Found real JS end at offset', realEnd + 'lu3();})'.length, 'bytes');
} else {
  // Fallback: find last }) before binary garbage starts
  const lastParen = wrappedBody.lastIndexOf(WRAPPER_END);
  body = lastParen !== -1 ? wrappedBody.slice(0, lastParen) : wrappedBody;
  console.log('Fallback: using last }) at offset', lastParen);
}

// ============================================================
// Step 2: Replace Bun VFS requires with stub modules
// ============================================================
const bunfsRequires = body.match(/require\("\/\$bunfs\/root\/[^"]+"\)/g) || [];
const uniqueBunfs = [...new Set(bunfsRequires)];
console.log(`Found ${uniqueBunfs.length} unique /$bunfs/root requires:`);
uniqueBunfs.slice(0, 20).forEach(r => console.log(`  ${r}`));
if (uniqueBunfs.length > 20) console.log(`  ... and ${uniqueBunfs.length - 20} more`);

// Create stub module declarations for each Bun VFS module
const stubDeclarations = uniqueBunfs.map(r => {
  const path = r.match(/require\("(\/\$bunfs\/root\/[^"]+)"\)/)[1];
  const varName = path.split('/').pop().replace(/[.-]/g, '_');
  return {
    pattern: r,
    path,
    varName,
    replacement: '__bunfs_stub__',
  };
});

// Replace all Bun VFS requires with a single stub reference
let processed = body;
const bunfsStubSet = new Set();
for (const decl of stubDeclarations) {
  // Replace: require("/$bunfs/root/xxx") → __bunfs_stub()
  // But we need to handle the CJS wrapper pattern:
  // var XXX=n((exports,module)=>{module.exports=require("/$bunfs/root/xxx")})
  // Replace with: var XXX=n((exports,module)=>{module.exports=__bunfs_stub()})
  processed = processed.split(decl.pattern).join('__bunfs_stub()');
  bunfsStubSet.add(decl.path);
}

// ============================================================
// Step 3: Create Bun VFS stub function
// ============================================================
const bunfsStubCode = `
// Stub for Bun VFS native modules
var __bunfs_modules={};
function __bunfs_stub(){
  return {};
}
`;

// ============================================================
// Step 4: Adapt the module system for Node.js
// ============================================================
// The full_bundle has:
//   Z=(H,_)=>()=>(H&&(_=H(H=0)),_)  — lazy initializer with 2 params
//   n=(H,_)=>()=>(_||H((_={exports:{}}).exports,_),_.exports) — CJS factory
//   u=(H,_,q)=>{...} — ESM interop
//   j_=(H,_)=>{...} — named exports
//
// We need to make these work in Node.js ESM context.
// Z and n work standalone. u and j_ rely on module definitions.
// The key: provide React/Ink at the right variable names.

// ============================================================
// Step 5: Wrap in bridge-compatible format
// ============================================================
// The bridge provides:
//   globalThis.OJ, globalThis.u1, globalThis.qD, globalThis.lD
//   globalThis.K2_, globalThis.kk
//
// The full_bundle uses different variable names for React/Ink.
// We need to find the mapping between full_bundle variable names
// and React/Ink exports.

// Search for React.createElement reference patterns
const reactPatterns = processed.match(/(\w+)\.createElement\(/g) || [];
const uniqueReact = [...new Set(reactPatterns.map(p => p.replace('.createElement(', '')))];
console.log(`\nReact.createElement aliases found: ${uniqueReact.join(', ')}`);

// Search for Ink component references (Box, Text patterns)
const inkPatterns = processed.match(/(\w+)\.createElement\((\w+)/g) || [];
const inkElements = [...new Set(inkPatterns.map(p => {
  const m = p.match(/(\w+)\.createElement\((\w+)/);
  return m ? `${m[1]}.createElement(${m[2]})` : '';
}))].filter(Boolean);
console.log(`\nInk element patterns found (first 20):`);
inkElements.slice(0, 20).forEach(e => console.log(`  ${e}`));
if (inkElements.length > 20) console.log(`  ... and ${inkElements.length - 20} more`);

// ============================================================
// Step 6: Build the Node.js-compatible runtime
// ============================================================
const output = `// Complete 1:1 Runtime — extracted from full_bundle.cjs (Bun CJS)
// All Z blocks, components, and utilities preserved.
// Bun VFS requires replaced with stubs.

${bunfsStubCode}

// Original module system (from full_bundle.cjs)
${processed}
`;

writeFileSync(outputPath, output);
console.log(`\nWritten ${outputPath} (${(output.length / 1024 / 1024).toFixed(1)} MB)`);

// ============================================================
// Step 7: Statistics
// ============================================================
const zCount = (output.match(/var \w+=Z\(\(\)=>\{/g) || []).length;
const nCount = (output.match(/var \w+=n\(\(/g) || []).length;
const fnCount = (output.match(/function \w+\(/g) || []).length;

console.log(`\nStatistics:`);
console.log(`  Z blocks: ${zCount}`);
console.log(`  n factories: ${nCount}`);
console.log(`  function defs: ${fnCount}`);
console.log(`  Lines: ${(output.match(/\n/g) || []).length}`);
console.log(`  Bun VFS stubs: ${bunfsStubSet.size}`);
