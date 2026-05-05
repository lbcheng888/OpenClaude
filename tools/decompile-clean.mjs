#!/usr/bin/env node
// Clean decompiler: strips React Compiler cache, renames variables
// Produces readable TypeScript/JSX from minified official code

import { readFileSync, writeFileSync } from 'fs';

const src = readFileSync('/Users/lbcheng/open-claude-code/extracted_v4/main_bundle/full_bundle.cjs', 'utf-8');
const jsEnd = src.lastIndexOf('lu3();})');
const clean = jsEnd !== -1 ? src.slice(0, jsEnd + 'lu3();})'.length) : src;

// ============================================================
// Variable map
// ============================================================
const VARS = {
  hU: 'React', OJ: 'React', H2: 'React', qO: 'React', fD: 'React',
  ckH: 'React', KDH: 'React', O2_: 'React', Dc: 'React', DI: 'React',
  FU: 'React', IT8: 'React', bT8: 'React', $V: 'React',
  v: 'Text', B: 'Box',
  Z6: 'Dialog', C6: 'Select', B7: 'ErrorDisplay', T4: 'ConfirmDialog',
  TA: 'Pane', j$H: 'DialogTitle', zW: 'KeyboardHint',
  qD: 'AppStateProvider', lD: 'TerminalProvider',
};

// ============================================================
// Strip React Compiler cache from a function body
// ============================================================
function stripCompilerCache(body) {
  // Pattern: let _=XXX.c(N),{...params...}=H,...
  // Then: if(_[i]!==old)_[i]=old,_[j]=new;else new=_[j];
  // And: if(_[i]===Symbol.for("react.memo_cache_sentinel"))new=expr,_[i]=new;else new=_[i];
  //
  // Strategy: find all cache references and convert to direct assignments

  let result = body;

  // Remove the cache declaration: let _=XXX.c(N) → nothing
  result = result.replace(/\blet\s+_=\w+\.c\(\d+\),?/g, '');

  // Convert: if(_[i]!==X||_[j]!==Y)Z=expr,_[i]=X,_[j]=Y,_[k]=Z;else Z=_[k];
  // To: const Z=expr;
  // Pattern: if(_[N]!==...){...;_[N]=...;_[M]=...}else ...;
  // This is complex, let me do simpler patterns

  // Pattern 1: memo sentinel check
  // if(_[i]===Symbol.for("react.memo_cache_sentinel"))X=expr,_[i]=X;else X=_[i];
  result = result.replace(
    /if\(_\[(\d+)\]===Symbol\.for\("react\.memo_cache_sentinel"\)\)(\w+)=(.+?),_\[\1\]=\2;else \2=_\[\1\]/g,
    (_, idx, varName, expr) => `const ${varName}=${expr}`
  );

  // Pattern 2: change detection
  // if(_[i]!==X||_[j]!==Y)Z=expr,_[i]=X,_[j]=Y,_[k]=Z;else Z=_[k];
  result = result.replace(
    /if\(_\[(\d+)\]!==(\w+)(?:\|\|_\[(\d+)\]!==(\w+))?\)(\w+)=(.+?),(_\[\d+\]=[^;]+;?)+else \5=_\[\d+\]/g,
    (match) => {
      // Extract the assignment expression
      const assignMatch = match.match(/(\w+)=(.+?),(?:_\[\d+\]=[^;]+;?)+else/);
      if (assignMatch) return `const ${assignMatch[1]}=${assignMatch[2]}`;
      return match; // Keep original if can't parse
    }
  );

  return result;
}

// ============================================================
// Extract function body
// ============================================================
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
      if (ch === '`') inTemplate = true; else { inString = true; stringChar = ch; }
      i++; continue;
    }
    if (inString && ch === stringChar && prev !== '\\') inString = false;
    if (inTemplate && ch === '`' && prev !== '\\') inTemplate = false;
    if (!inString && !inTemplate) { if (ch === '{') depth++; else if (ch === '}') depth--; }
    i++;
  }
  return source.slice(startIdx + 1, i - 1);
}

// ============================================================
// Translate to readable code
// ============================================================
function translate(body) {
  let r = body;

  // Replace React.createElement
  for (const [min, read] of Object.entries(VARS)) {
    r = r.replace(new RegExp(`\\b${min}\\.default\\.createElement\\(`, 'g'), `${read}.createElement(`);
    r = r.replace(new RegExp(`\\b${min}\\.createElement\\(`, 'g'), `${read}.createElement(`);
  }

  // Replace component type references inside createElement calls
  r = r.replace(/\.createElement\((\w+)/g, (match, el) => {
    const resolved = VARS[el] || el;
    return `.createElement(${resolved}`;
  });

  // Boolean literals
  r = r.replace(/\b!0\b/g, 'true');
  r = r.replace(/\b!1\b/g, 'false');

  return r;
}

// ============================================================
// Generate clean JSX from createElement calls
// ============================================================
function toJSX(body) {
  // Extract createElement calls and convert to JSX
  // This is lossy but gives the structure
  const lines = [];
  const ceRe = /(\w+)\.createElement\((\w+),\s*(\{[^}]*\})(?:,\s*(.+?))?\)/g;
  let m, indent = 0;
  while ((m = ceRe.exec(body)) !== null) {
    const [_, react, el, props, children] = m;
    const propStr = props.replace(/[{}]/g, '').replace(/:!0\b/g, ':true').replace(/:!1\b/g, ':false').replace(/,/g, ', ');
    const childStr = children ? children.slice(0, 60) : '';
    lines.push(`${'  '.repeat(indent)}<${el}${propStr !== '{}' ? ' ' + propStr : ''}>${childStr ? '\n' + '  '.repeat(indent+1) + childStr + '\n' + '  '.repeat(indent) : ''}</${el}>`);
  }
  return lines.join('\n');
}

// ============================================================
// Main
// ============================================================
const targetName = process.argv[2];
if (!targetName) { console.error('Usage: node decompile-clean.mjs <name>'); process.exit(1); }

const fnRe = new RegExp(`function ${targetName}\\(([^)]*)\\)\\{`);
const match = fnRe.exec(clean);
if (!match) { console.error(`"${targetName}" not found`); process.exit(1); }

const params = match[1];
const bodyStart = match.index + match[0].length - 1;
let body = extractBody(clean, bodyStart);

console.log(`// ===== DECOMPILED: ${targetName}(${params}) =====`);
console.log(`// From official Claude Code v2.1.128`);
console.log('');

// Strip cache
let stripped = stripCompilerCache(body);
console.log('// --- After cache strip ---');
console.log(stripped.slice(0, 1500));
console.log('');

// Translate variable names
let translated = translate(stripped);
console.log('// --- Translated ---');
console.log(translated.slice(0, 1500));
console.log('');

// JSX view
console.log('// --- JSX Structure ---');
console.log(toJSX(translated));
