#!/usr/bin/env node
// Find ALL variable references in runtime.js that are undefined
// by running it with a global Proxy that catches undefined accesses

import { readFileSync, writeFileSync } from 'fs';

const runtimePath = '/Users/lbcheng/open-claude-code/claude-code-full/dist/runtime.js';
let source = readFileSync(runtimePath, 'utf-8');

// Collect all variable references in the code
const allVars = new Set();
// Match: variable names that appear as standalone identifiers
// This is a rough regex but covers most cases
const varRefRe = /\b([a-zA-Z_\$][a-zA-Z0-9_\$]{1,10})\b/g;
let m;
while ((m = varRefRe.exec(source)) !== null) {
  allVars.add(m[1]);
}

// Collect all declared variables
const declared = new Set();
const varDeclRe = /var\s+([a-zA-Z_\$][a-zA-Z0-9_\$]+)/g;
while ((m = varDeclRe.exec(source))) declared.add(m[1]);

const funcDeclRe = /function\s+([a-zA-Z_\$][a-zA-Z0-9_\$]+)/g;
while ((m = funcDeclRe.exec(source))) declared.add(m[1]);

const classDeclRe = /class\s+([a-zA-Z_\$][a-zA-Z0-9_\$]+)/g;
while ((m = classDeclRe.exec(source))) declared.add(m[1]);

// JS globals that are always available
const jsGlobals = new Set([
  'globalThis','global','window','self','process','console','Buffer',
  'setTimeout','clearTimeout','setInterval','clearInterval','setImmediate',
  'require','module','exports','__filename','__dirname',
  'Object','Array','String','Number','Boolean','Symbol','Map','Set',
  'WeakMap','WeakSet','Promise','Proxy','Reflect','RegExp','Date','Math',
  'JSON','BigInt','parseInt','parseFloat','isNaN','isFinite','undefined',
  'Infinity','NaN','Error','TypeError','ReferenceError','SyntaxError',
  'RangeError','EvalError','URIError','AggregateError',
  'Int8Array','Uint8Array','Uint8ClampedArray','Int16Array','Uint16Array',
  'Int32Array','Uint32Array','Float32Array','Float64Array',
  'BigInt64Array','BigUint64Array','ArrayBuffer','SharedArrayBuffer',
  'DataView','Atomics','Intl','FinalizationRegistry','WeakRef',
  'encodeURI','decodeURI','encodeURIComponent','decodeURIComponent',
  'escape','unescape','isFinite','isNaN','btoa','atob',
  'AbortController','AbortSignal','TextEncoder','TextDecoder',
  'URL','URLSearchParams','FormData','Blob','File','FileReader',
  'WebAssembly','Worker','MessageChannel','MessagePort','BroadcastChannel',
  'Event','EventTarget','CustomEvent',
  'performance','fetch','Headers','Request','Response',
  'structuredClone','queueMicrotask','reportError',
  'async','await','yield','return','throw','new','delete','typeof',
  'void','in','of','instanceof','this','super','arguments',
  'if','else','for','while','do','switch','case','break','continue',
  'try','catch','finally','function','var','let','const','class',
  'extends','import','export','default','static','debugger','with',
  'true','false','null','undefined','NaN','Infinity',
  'string','number','boolean','any','unknown','never','object','symbol',
  'readonly','keyof','nullish','optional','bigint',
  'toString','valueOf','hasOwnProperty','constructor','prototype',
  '__proto__','__defineGetter__','__defineSetter__',
  'randomUUID','Close','Raw','create','Create',
]);

const trulyMissing = [...allVars].filter(v => !declared.has(v) && !jsGlobals.has(v) && v.length >= 2);

console.log(`Total variable references: ${allVars.size}`);
console.log(`Declared: ${declared.size}`);
console.log(`Truly missing: ${trulyMissing.length}`);
console.log(trulyMissing.sort().join('\n'));
