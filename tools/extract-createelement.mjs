#!/usr/bin/env node
// Extract exact createElement trees from full_bundle.cjs (official Claude Code source)
// Focus on components that map to our batch files

import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('/Users/lbcheng/open-claude-code/extracted_v4/main_bundle/full_bundle.cjs', 'utf-8');
// Use only the JS portion (before binary garbage)
const jsEnd = src.lastIndexOf('lu3();})');
const clean = jsEnd !== -1 ? src.slice(0, jsEnd + 'lu3();})'.length) : src;

// ============================================================
// Helper: extract a function body from source
// ============================================================
function extractFunctionBody(source, fnStart) {
  // fnStart points to the '{' after 'function NAME(params)'
  let depth = 1, i = fnStart + 1;
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
  return source.slice(fnStart + 1, i - 1);
}

// ============================================================
// Extract specific components by name
// ============================================================
const TARGETS = [
  // Our component → official function name
  { our: 'ConfigErrorDialog', official: 'ef3' },
  { our: 'InvalidSettingsDialog', official: 'ES3' },
  { our: 'TeleportProgressView', official: 'BuK' },
  { our: 'TeleportRepoMismatch', official: 'IS3' },
  { our: 'Select/ConfirmDialog', official: 'T4' },
  { our: 'KeyboardHint', official: 'zW' },
  { our: 'DialogTitle', official: 'j$H' },
  { our: 'DialogFrame/Pane', official: 'TA' },
  { our: 'TrustDialog', official: 'VM6' },
  { our: 'PlanModeEntry', official: 'cPK' },
  { our: 'SandboxBashConfirm', official: 'gPK' },
  { our: 'ToolConfirm', official: 'DkH' },
  { our: 'ModelMigration', official: 'GS3' },
];

const results = [];

for (const target of TARGETS) {
  const fnRe = new RegExp(`function ${target.official}\\(([^)]*)\\)\\{`);
  const match = fnRe.exec(clean);
  if (!match) {
    // Try with arrow functions or other patterns
    console.log(`  ${target.official} → NOT FOUND as function`);
    continue;
  }

  const params = match[1];
  const bodyStart = match.index + match[0].length - 1; // position of opening '{'
  const body = extractFunctionBody(clean, bodyStart);

  // Find all React.createElement calls in the body
  // Variables that can be React: any 2-6 char identifier followed by .createElement
  // or .default.createElement
  const ceRe = /(\w+)\.(?:default\.)?createElement\(/g;
  const reactVars = new Set();
  let rm;
  while ((rm = ceRe.exec(body)) !== null) {
    reactVars.add(rm[1]);
  }

  if (reactVars.size === 0) {
    console.log(`  ${target.official} → no createElement calls`);
    results.push({ official: target.official, our: target.our, params, bodyLen: body.length, createElementCount: 0 });
    continue;
  }

  // Extract createElement calls with their full arguments
  const calls = [];
  for (const rv of reactVars) {
    const fullCeRe = new RegExp(`${rv}\\.(?:default\\.)?createElement\\(([^,]+?),\\s*(\\{[^}]*\\})?(?:,\\s*(.+?))?\\)`, 'g');
    let cm;
    while ((cm = fullCeRe.exec(body)) !== null) {
      calls.push({
        reactVar: rv,
        element: cm[1]?.trim() || '?',
        props: cm[2] || '{}',
        children: (cm[3] || '').slice(0, 200).trim(),
      });
    }
  }

  console.log(`  ${target.official}(${params.slice(0, 60)}) → ${calls.length} createElement calls [${reactVars.size} React vars: ${[...reactVars].join(',')}]`);

  results.push({
    official: target.official,
    our: target.our,
    params,
    bodyLen: body.length,
    reactVars: [...reactVars],
    createElementCount: calls.length,
    createElementCalls: calls,
    bodyPreview: body.slice(0, 500),
  });
}

// ============================================================
// Output
// ============================================================
writeFileSync(
  '/Users/lbcheng/open-claude-code/claude-code-full/dist/official-createelement.json',
  JSON.stringify(results, null, 2)
);

// Print detailed structures for key components
console.log('\n===== COMPONENT STRUCTURE DETAILS =====\n');

for (const r of results) {
  if (r.createElementCount === 0) continue;
  console.log(`=== ${r.official} → ${r.our} ===`);
  console.log(`  React vars: ${r.reactVars.join(', ')}`);
  console.log(`  createElement calls:`);
  for (const c of (r.createElementCalls || [])) {
    console.log(`    ${c.reactVar}.createElement(${c.element}, ${c.props}${c.children ? ', ' + c.children : ''})`);
  }
  console.log('');
}

console.log(`\nResults saved to dist/official-createelement.json`);
