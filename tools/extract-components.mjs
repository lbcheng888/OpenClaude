#!/usr/bin/env node
// Extract UI component render structures from runtime.js
// Parses function bodies containing createElement calls

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const runtimePath = join(__dirname, '..', 'dist', 'runtime.js');
const outputPath = join(__dirname, '..', 'dist', 'component-structures.json');

const source = readFileSync(runtimePath, 'utf-8');

// Find all function definitions followed by createElement usage
// Pattern: function NAME(params){...createElement...}
const FN_RE = /function\s+(\w+)\(([^)]*)\)\s*\{/g;

// Known variable aliases for React.createElement:
// hU, OJ, H2, qO, fD, ckH, KDH, O2_, RP_ are all React namespace imports
const REACT_ALIASES = ['hU', 'OJ', 'H2', 'qO', 'fD', 'ckH', 'KDH', 'O2_', 'RP_', 'ZnH', 'qDH', '_kH'];

// Known aliases for Box: B, vK, wK, ...
// Known aliases for Text: v, uK, ...
// These are assigned via u(fH(), N) where N maps to the Ink module's export index

const components = [];

// For each function, check if it contains createElement
let fnMatch;
while ((fnMatch = FN_RE.exec(source)) !== null) {
  const name = fnMatch[1];
  const params = fnMatch[2];
  const startIdx = fnMatch.index + fnMatch[0].length;

  // Find closing brace
  let depth = 1;
  let i = startIdx;
  let inString = false;
  let inTemplate = false;
  let inRegex = false;
  let inSingleComment = false;
  let inMultiComment = false;
  let stringChar = '';

  while (i < source.length && depth > 0) {
    const ch = source[i];
    const prev = i > 0 ? source[i - 1] : '';

    if (!inString && !inRegex && !inSingleComment && !inMultiComment) {
      if (ch === '/' && source[i + 1] === '/') { inSingleComment = true; i += 2; continue; }
      if (ch === '/' && source[i + 1] === '*') { inMultiComment = true; i += 2; continue; }
    }
    if (inSingleComment && ch === '\n') inSingleComment = false;
    if (inMultiComment && ch === '*' && source[i + 1] === '/') { inMultiComment = false; i += 2; continue; }
    if (inSingleComment || inMultiComment) { i++; continue; }

    if (!inString && !inTemplate && !inRegex && (ch === '"' || ch === "'" || ch === '`')) {
      if (ch === '`') inTemplate = true;
      else { inString = true; stringChar = ch; }
      i++; continue;
    }
    if (inString && ch === stringChar && prev !== '\\') inString = false;
    if (inTemplate && ch === '`' && prev !== '\\') inTemplate = false;

    if (!inString && !inTemplate && ch === '/' && prev !== '\\' && !inRegex) {
      if (/[=(,:!&|?\s]/.test(prev)) { inRegex = true; i++; continue; }
    }
    if (inRegex && ch === '/' && prev !== '\\') inRegex = false;

    if (!inString && !inTemplate && !inRegex) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    i++;
  }
  const endIdx = i + 1; // include closing brace

  const fnBody = source.slice(startIdx, endIdx - 1);

  // Check if body contains createElement from known React aliases
  const hasCreateElement = REACT_ALIASES.some(alias =>
    fnBody.includes(`${alias}.createElement`) ||
    fnBody.includes(`${alias}.default.createElement`)
  );

  if (!hasCreateElement) continue;

  // Extract createElement calls
  const ceCalls = [];
  const ceRe = /(\w+(?:\.default)?)\.createElement\(([^,]*),\s*(\{[^}]*\})?(?:,\s*(.+?))?\)/g;
  let ceMatch;
  while ((ceMatch = ceRe.exec(fnBody)) !== null) {
    ceCalls.push({
      alias: ceMatch[1],
      element: ceMatch[2]?.trim() || '?',
      props: ceMatch[3] || '{}',
      children: (ceMatch[4] || '').slice(0, 100),
    });
  }

  if (ceCalls.length === 0) continue;

  components.push({
    name,
    params: params.replace(/\{|\}/g, '').trim(),
    bodyLength: fnBody.length,
    createElementCount: ceCalls.length,
    elements: [...new Set(ceCalls.map(c => c.element))],
    reactAlias: [...new Set(ceCalls.map(c => c.alias))],
    sampleCalls: ceCalls.slice(0, 15),
  });
}

// Write output
const output = {
  totalComponents: components.length,
  components,
};

writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Extracted ${components.length} components with createElement calls → ${outputPath}`);

// Show key components
const keyComps = components.filter(c =>
  ['ef3', 'ES3', 'IS3', 'xS3', 'BuK', '$I8', 'OX3', 'FfK', 'Tx3', 'sx3', 'z6', 'Mx3'].includes(c.name)
);
console.log('\nKey components:');
keyComps.forEach(c => {
  console.log(`\n${c.name}(${c.params}) [${c.createElementCount} creates, ${c.bodyLength}B]`);
  console.log(`  Elements: ${c.elements.join(', ')}`);
  console.log(`  React: ${c.reactAlias.join(', ')}`);
  c.sampleCalls.slice(0, 5).forEach(s => {
    console.log(`  ${s.alias}.createElement(${s.element}, ${s.props})`);
  });
});
