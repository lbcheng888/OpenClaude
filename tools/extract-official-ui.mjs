#!/usr/bin/env node
// Extract all React createElement trees from full_bundle.cjs (official Claude Code source)
// Maps them to our batch components, then diff what's different

import { readFileSync, writeFileSync } from 'fs';

const bundle = readFileSync('/Users/lbcheng/open-claude-code/extracted_v4/main_bundle/full_bundle.cjs', 'utf-8');
const cleanJS = bundle.slice(0, bundle.lastIndexOf('lu3();})') + 'lu3();'.length);

// ============================================================
// Find all function definitions that contain createElement
// ============================================================

// Known React variable aliases — these are assigned via u(fH(),1) or u(nH(),1)
const REACT_VARS = new Set();
const inkVarRe = /(\w+)=u\(fH\(\),(\d+)\)|(\w+)=u\(nH\(\),(\d+)\)/g;
let m;
while ((m = inkVarRe.exec(cleanJS)) !== null) {
  if (m[1]) REACT_VARS.add(m[1]);
  if (m[3]) REACT_VARS.add(m[3]);
}

// Build the full list of React namespace variables
const reactNamespaceVars = [...REACT_VARS].filter(v => v.length >= 2 && v.length <= 6);

// Find function definitions
const fnRe = /function\s+(\w+)\(([^)]*)\)\s*\{/g;
const components = [];

while ((m = fnRe.exec(cleanJS)) !== null) {
  const name = m[1];
  const params = m[2];
  const startIdx = m.index + m[0].length;

  // Find matching closing brace
  let depth = 1;
  let i = startIdx;
  let inString = false, stringChar = '', inTemplate = false, inRegex = false;
  let inSingleComment = false, inMultiComment = false;

  while (i < cleanJS.length && depth > 0) {
    const ch = cleanJS[i];
    const prev = i > 0 ? cleanJS[i - 1] : '';

    if (!inString && !inRegex && !inSingleComment && !inMultiComment) {
      if (ch === '/' && cleanJS[i + 1] === '/') { inSingleComment = true; i += 2; continue; }
      if (ch === '/' && cleanJS[i + 1] === '*') { inMultiComment = true; i += 2; continue; }
    }
    if (inSingleComment && ch === '\n') inSingleComment = false;
    if (inMultiComment && ch === '*' && cleanJS[i + 1] === '/') { inMultiComment = false; i += 2; continue; }
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
  const endIdx = depth === 0 ? i - 1 : cleanJS.length - 1;
  const body = cleanJS.slice(startIdx, endIdx);

  // Check if body uses React.createElement (via any known React variable)
  const hasCreateElement = reactNamespaceVars.some(v =>
    body.includes(`${v}.createElement`) || body.includes(`${v}.default.createElement`)
  );

  if (!hasCreateElement) continue;

  // Extract createElement calls
  const ceCalls = [];
  const ceRe = /(\w+(?:\.default)?)\.createElement\(([^,]+?),\s*(\{[^}]*\})?(?:,\s*(.+?))?\)/g;
  let ceMatch;
  while ((ceMatch = ceRe.exec(body)) !== null) {
    ceCalls.push({
      var: ceMatch[1],
      element: ceMatch[2]?.trim() || '?',
      props: ceMatch[3] || '{}',
      children: (ceMatch[4] || '').slice(0, 120).trim(),
    });
  }

  if (ceCalls.length === 0) continue;

  components.push({
    name,
    params,
    bodyLen: body.length,
    ceCount: ceCalls.length,
    elements: [...new Set(ceCalls.map(c => c.element))],
    reactVar: [...new Set(ceCalls.map(c => c.var))],
    body: body,
  });
}

// ============================================================
// Map to our batch components
// ============================================================
const mapping = {
  'ef3': 'batch-4 ConfigErrorDialog',
  'ES3': 'dialogs SettingsErrors',
  'IS3': 'batch-4 RepoPathSelector',
  'BuK': 'batch-3 TeleportProgressView',
  'T4': 'wrappers OptionSelector',
  'j$H': 'wrappers Dialog (title)',
  'TA': 'wrappers Pane/DialogFrame',
  'zW': 'keyboard hints',
  '_X3': 'config error show dialog',
  'OX3': 'App component (main TUI)',
};

console.log(`Found ${components.length} component functions with createElement\n`);

// Show key components with their structure
for (const comp of components) {
  const mapped = mapping[comp.name];
  if (mapped || comp.ceCount >= 3) {
    console.log(`=== ${comp.name}(${comp.params.slice(0,60)}) [${comp.ceCount} creates, ${comp.bodyLen}B] ${mapped ? '→ ' + mapped : ''} ===`);
    console.log(`  React var: ${comp.reactVar.join(', ')}`);
    console.log(`  Elements: ${comp.elements.join(', ')}`);

    // Print the createElement structure
    if (comp.ceCalls && Array.isArray(comp.ceCalls)) {
      for (const ce of comp.ceCalls) {
        console.log(`  ${ce.var}.createElement(${ce.element}, ${ce.props}${ce.children ? ', ' + ce.children : ''})`);
      }
    } else {
      // Show body preview instead
      console.log(`  Body preview: ${comp.body.slice(0, 300)}...`);
    }
    console.log('');
  }
}

// ============================================================
// Write detailed output for all components
// ============================================================
const output = components.map(c => ({
  name: c.name,
  params: c.params.slice(0, 100),
  mappedTo: mapping[c.name] || '',
  createElementCount: c.ceCount,
  elements: c.elements,
  reactVar: c.reactVar,
  body: c.body.slice(0, 500),
}));

writeFileSync(
  '/Users/lbcheng/open-claude-code/claude-code-full/dist/official-ui-components.json',
  JSON.stringify(output, null, 2)
);
console.log(`Full catalog → dist/official-ui-components.json (${output.length} components)`);
