#!/usr/bin/env node
// Decompile an official component from full_bundle.cjs to readable React/Ink JSX
// Usage: node decompile-component.mjs ef3    (decompiles ConfigErrorDialog)
//        node decompile-component.mjs --list  (lists all available components)

import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('/Users/lbcheng/open-claude-code/extracted_v4/main_bundle/full_bundle.cjs', 'utf-8');
const jsEnd = src.lastIndexOf('lu3();})');
const clean = jsEnd !== -1 ? src.slice(0, jsEnd + 'lu3();})'.length) : src;

// ============================================================
// Known variable mappings (minified → readable)
// ============================================================
const VAR_MAP = {
  // React
  'hU': 'React',
  'OJ': 'React',
  'H2': 'React',
  'qO': 'React',
  'fD': 'React',
  'ckH': 'React',
  'KDH': 'React',
  'O2_': 'React',
  'RP_': 'React',
  'ZnH': 'React',
  'qDH': 'React',
  '_kH': 'React',
  'Dc': 'React',
  'DI': 'React',
  'FU': 'React',
  'IT8': 'React',
  'bT8': 'React',
  'FU': 'React',
  '$V': 'React',
  // Ink components
  'v': 'Text',
  'B': 'Box',
  // Custom components
  'Z6': 'Dialog',
  'C6': 'Select',
  'B7': 'ErrorDisplay',
  'vT6': 'ValidationErrorsList',
  'T4': 'ConfirmDialog',
  'TA': 'Pane',
  'j$H': 'DialogTitle',
  'rV': 'PermissionResult',
  'QnH': 'PermissionSelect',
  'zW': 'KeyboardHint',
  'H6': 'Fragment',
  'eH': 'KeyboardShortcut',
  'r1': 'Spinner',
  'o3': 'LoadingIndicator',
  'LK': 'Text',
  // Others
  'qD': 'AppStateProvider',
  'lD': 'TerminalProvider',
  '_fK': 'FpsProvider',
  'TfK': 'StatsProvider',
  'DfK': 'DeletionProvider',
  'KX3': 'MetricsContext',
  'HfK': 'FpsContext',
  'wfK': 'DeletionContext',
};

// Known prop mappings
const PROP_MAP = {
  '!0': 'true',
  '!1': 'false',
  'void 0': 'undefined',
};

// Reverse-lookup: find components in var→Z mapping
function findComponentVar(name) {
  // Look for var XXX=...{...component...} patterns
  const patterns = [
    new RegExp(`function ${name}\\(([^)]*)\\)\\{`),
    new RegExp(`var ${name}=Z\\(\\(\\)=>\\{`),
    new RegExp(`${name}=Z\\(\\(\\)=>\\{`),
  ];
  for (const re of patterns) {
    if (re.test(clean)) return true;
  }
  return false;
}

// Extract function body
function extractBody(source, startIdx) {
  let depth = 1, i = startIdx + 1;
  let inString = false, stringChar = '', inTemplate = false;
  let inSingleComment = false, inMultiComment = false;

  while (i < source.length && depth > 0) {
    const ch = source[i], prev = i > 0 ? source[i - 1] : '';
    if (!inString && !inSingleComment && !inMultiComment) {
      if (ch === '/' && source[i + 1] === '/') { inSingleComment = true; i += 2; continue; }
      if (ch === '/' && source[i + 1] === '*') { inMultiComment = true; i += 2; continue; }
    }
    if (inSingleComment && ch === '\n') inSingleComment = false;
    if (inMultiComment && ch === '*' && source[i + 1] === '/') { inMultiComment = false; i += 2; continue; }
    if (inSingleComment || inMultiComment) { i++; continue; }
    if (!inString && !inTemplate && (ch === '"' || ch === "'" || ch === '`')) {
      if (ch === '`') inTemplate = true;
      else { inString = true; stringChar = ch; }
      i++; continue;
    }
    if (inString && ch === stringChar && prev !== '\\') inString = false;
    if (inTemplate && ch === '`' && prev !== '\\') inTemplate = false;
    if (!inString && !inTemplate) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    i++;
  }
  return source.slice(startIdx + 1, i - 1);
}

// ============================================================
// Translate a minified body to readable JSX-like structure
// ============================================================
function translateBody(body) {
  let result = body;

  // Replace React.createElement calls
  // Pattern: XXX.default.createElement(ELEMENT, {props}, ...children)
  // or: XXX.createElement(ELEMENT, {props}, ...children)
  const ceRe = /(\w+)(?:\.default)?\.createElement\(/g;
  result = result.replace(ceRe, (match, varName) => {
    const resolved = VAR_MAP[varName] || varName;
    return `${resolved}.createElement(`;
  });

  // Replace variable references in createElement first arg (the element type)
  result = result.replace(/\.createElement\((\w+)/g, (match, el) => {
    const resolved = VAR_MAP[el] || el;
    return `.createElement(${resolved}`;
  });

  // Replace !0 → true, !1 → false in props
  result = result.replace(/\b!0\b/g, 'true');
  result = result.replace(/\b!1\b/g, 'false');

  // Replace minified var names in the output where they're used as component types
  for (const [min, read] of Object.entries(VAR_MAP)) {
    // Replace <min> when used as createElement first arg (already done above)
    // Also replace standalone references where they're used as JSX elements
  }

  return result;
}

// ============================================================
// Main
// ============================================================
const args = process.argv.slice(2);

if (args[0] === '--list') {
  // List all component functions found
  const fnRe = /function\s+(\w{2,6})\(([^)]*)\)\s*\{/g;
  const found = new Set();
  let m;
  while ((m = fnRe.exec(clean)) !== null) {
    const name = m[1];
    // Check if it uses createElement
    const bodyStart = m.index + m[0].length - 1;
    const body = extractBody(clean, bodyStart);
    if (/\w+\.(?:default\.)?createElement\(/.test(body)) {
      found.add(name);
    }
  }
  console.log([...found].sort().join('\n'));
  console.log(`\nTotal: ${found.size} components with createElement calls`);
  process.exit(0);
}

const targetName = args[0];
if (!targetName) {
  console.error('Usage: node decompile-component.mjs <name>');
  console.error('       node decompile-component.mjs --list');
  process.exit(1);
}

// Find and decompile the component
const fnRe = new RegExp(`function ${targetName}\\(([^)]*)\\)\\{`);
const match = fnRe.exec(clean);
if (!match) {
  console.error(`Component "${targetName}" not found`);
  process.exit(1);
}

const params = match[1];
const bodyStart = match.index + match[0].length - 1;
const body = extractBody(clean, bodyStart);
const translated = translateBody(body);

console.log(`// Decompiled: ${targetName}(${params})`);
console.log(`// From official Claude Code v2.1.132 full_bundle.cjs`);
console.log(`// Body size: ${body.length} bytes`);
console.log('');
console.log('// --- Raw minified body ---');
console.log(body.slice(0, 2000));
console.log('');
console.log('// --- Translated (partial) ---');
console.log(translated.slice(0, 2000));

// Also write to file
const outPath = `/Users/lbcheng/open-claude-code/claude-code-full/dist/decompiled-${targetName}.txt`;
writeFileSync(outPath, `// Decompiled: ${targetName}(${params})\n// From official v2.1.132\n\n// === RAW ===\n${body}\n\n// === TRANSLATED ===\n${translated}`);
console.log(`\nFull output → ${outPath}`);
