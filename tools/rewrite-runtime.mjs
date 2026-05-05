#!/usr/bin/env node
// Phase 2: Rewrite runtime.js for selective Z block execution
// Replaces var NAME=Z(()=>{ with var NAME=__z("NAME",()=>{
// where __z checks an allowlist before executing the callback.

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const runtimePath = join(__dirname, '..', 'dist', 'runtime.js');
const catalogPath = join(__dirname, '..', 'dist', 'z-block-catalog.json');
const outputPath = join(__dirname, '..', 'dist', 'runtime-ui.js');

console.log('Loading runtime.js...');
let source = readFileSync(runtimePath, 'utf-8');

console.log('Loading catalog...');
const catalog = JSON.parse(readFileSync(catalogPath, 'utf-8'));

// Build allowlist: ALL UI-related blocks
const allowlist = new Set(
  catalog.blocks
    .filter(b => ['UI-import', 'UI-render', 'UI-utility'].includes(b.category))
    .map(b => b.name)
);

// Also allow Infrastructure blocks that are needed for the app to function
const infraAllowlist = new Set(
  catalog.blocks
    .filter(b => b.category === 'Infrastructure')
    .map(b => b.name)
);

console.log(`Allowlist: ${allowlist.size} UI blocks + ${infraAllowlist.size} infra blocks = ${allowlist.size + infraAllowlist.size} total`);

// ============================================================
// Step 1: Replace Z(()=>{ with __z("NAME",()=>{
// ============================================================

// Process Z blocks in reverse order (by byte position) to avoid offset drift
const zBlocks = catalog.blocks.sort((a, b) => b.startByte - a.startByte);

let replacements = 0;
for (const block of zBlocks) {
  const pattern = `var ${block.name}=Z(()=>{`;
  const replacement = `var ${block.name}=__z("${block.name}",()=>{`;
  const idx = source.indexOf(pattern, Math.max(0, block.startByte - 50));
  if (idx !== -1 && idx < block.startByte + 50) {
    source = source.slice(0, idx) + replacement + source.slice(idx + pattern.length);
    replacements++;
  }
}
console.log(`Replaced ${replacements} Z(()=>{ → __z("NAME",()=>{`);

// ============================================================
// Step 2: Replace the Z function definition with __z + allowlist
// ============================================================

const oldZDef = 'function Z(i){return function(){return __p;};}';
const newZDef = `
// Z stub — calls through to __z which checks allowlist
function Z(i){return function(){return __p;};}
// __z: selective Z resurrection (with recursion guard)
var __z_resolving=new Set();
function __z(n,callback){
  if(__z_allowlist.has(n)){
    var result;
    return function(){
      if(result!==undefined)return result;
      if(__z_resolving.has(n)){
        // Cycle detected — return stub for this block
        return __p;
      }
      __z_resolving.add(n);
      try{result=callback();}
      finally{__z_resolving.delete(n);}
      return result||__p;
    };
  }
  return function(){return __p;};
}
var __z_allowlist;
`;

source = source.replace(oldZDef, newZDef);

// ============================================================
// Step 3: Create the fH/nH module system (this is the key!)
// Replace stub fH and nH with working implementations.
// fH() returns the React module (named exports)
// nH() returns the default-export helper
// u(module, idx) resolves imports:
//   idx=1 → module itself for fH, or default for nH
//   idx>1 → specific named export
// ============================================================

// Find the fH stub
const fHStub = 'var fH=__p;';
const fHImpl = `
// fH() — React module accessor
// Returns the React namespace (createElement, useState, etc.)
function fH(){return __react_module;}
var __react_module;
`;

source = source.replace(fHStub, fHImpl);

// Find the nH stub
const nHStub = 'var nH=__p;';
const nHImpl = `
// nH() — Default export resolver
// Returns a helper object that u() can read defaults from
function nH(){return __default_helper;}
var __default_helper={};
`;

source = source.replace(nHStub, nHImpl);

// ============================================================
// Step 4: Replace the u function (module import resolver)
// ============================================================

const oldUDef = 'function u(m,f){return __p;}';
const newUDef = `
// u(module, index) — Module import resolver
var __u_cache=new Map();
function u(m,f){
  if(typeof m!=='function')return __p;
  var cached=__u_cache.get(m);
  if(cached&&cached[f]!==undefined)return cached[f];
  var mod=m();
  if(mod===__react_module){
    if(!cached){cached={};__u_cache.set(m,cached);}
    if(f===1){cached[1]=mod;return mod;}
    var names=Object.keys(mod);
    var r=mod[names[f-2]]||__p;
    cached[f]=r;
    return r;
  }
  if(mod===__default_helper){
    if(!cached){cached={};__u_cache.set(m,cached);}
    var d=mod.default||__p;
    cached[1]=d;
    return d;
  }
  return __p;
}
`;

source = source.replace(oldUDef, newUDef);

// ============================================================
// Step 5: Replace the n function (value factory)
// ============================================================

const oldNDef = 'function n(f){return function(){return __p;};}';
const newNDef = `
var __n_depth=0;
function n(f){
  if(__n_depth>50)return function(){return __p;};
  __n_depth++;
  var result;
  try{
    var val=f();
    if(typeof val==='function'){
      result=function lazy(){
        if(__n_depth>50)return __p;
        __n_depth++;
        try{return val.apply(this,arguments);}
        finally{__n_depth--;}
      };
    }else{
      result=function(){return val;};
    }
  }finally{__n_depth--;}
  return result;
}
`;

source = source.replace(oldNDef, newNDef);

// ============================================================
// Step 6: Make j_ actually work (named export helper)
// ============================================================

// j_(obj, props) already has a working implementation, no change needed

// ============================================================
// Step 7: Inject the allowlist and React initialization code
// right before the main code starts executing
// ============================================================

const initCode = `
// === Injected: allowlist initialization ===
__z_allowlist=new Set(${JSON.stringify([...allowlist, ...infraAllowlist])});

// Initialize React module
__react_module={
  createElement:globalThis.OJ.createElement,
  useState:globalThis.u1.useState,
  useEffect:globalThis.u1.useEffect,
  useCallback:globalThis.u1.useCallback,
  useRef:globalThis.u1.useRef,
  useMemo:globalThis.u1.useMemo,
  useContext:globalThis.u1.useContext||function(){},
  useReducer:globalThis.u1.useReducer||function(){},
  useLayoutEffect:globalThis.u1.useLayoutEffect||globalThis.u1.useEffect,
  Fragment:globalThis.OJ.Fragment,
  default:globalThis.OJ.default||globalThis.OJ,
  memo:globalThis.React.memo||function(c){return c;},
  forwardRef:globalThis.React.forwardRef||function(c){return c;},
  createContext:globalThis.React.createContext||function(){return{Provider:function(_){return _.children}}},
  lazy:globalThis.React.lazy||function(){return function(){return null;}},
  Suspense:globalThis.React.Suspense||function(_){return _.children},
  startTransition:globalThis.React.startTransition||function(c){c();},
  useDeferredValue:globalThis.React.useDeferredValue||function(v){return v;},
  useId:globalThis.React.useId||function(){return"uid-0";},
};

// Initialize default helper
__default_helper={
  default:globalThis.OJ,
};

// === End injected code ===
`;

// Insert right before the first Z block execution
// Find "var QC8=__z(" and insert before it
const firstZIdx = source.indexOf('var QC8=__z("');
if (firstZIdx !== -1) {
  // Find beginning of line
  const lineStart = source.lastIndexOf('\n', firstZIdx) + 1;
  source = source.slice(0, lineStart) + initCode + '\n' + source.slice(lineStart);
}

// ============================================================
// Step 8: Also initialize Ink-related globals
// These map to Box, Text, etc.
// In the binary, these are assigned via u(fH(), N) where N is the export index
// But for Ink components, they come from a different module...
//
// Actually looking at the code: createElement is React.createElement,
// but Box/Text are from Ink. The binary uses a separate module system
// for Ink imports. Let me check how v (Text) and B (Box) are assigned.
// ============================================================

// Replace require() stub section to handle Node.js builtins
const requireStub = 'var require=__p;';
const requireImpl = `
var require=function(mod){
  if(mod==="fs")return globalThis.__node_fs||(globalThis.__node_fs={});
  if(mod==="fs/promises")return globalThis.__node_fs_p||(globalThis.__node_fs_p={});
  if(mod==="path")return globalThis.__node_path||(globalThis.__node_path={});
  if(mod==="os")return globalThis.__node_os||(globalThis.__node_os={});
  if(mod==="crypto")return globalThis.__node_crypto||(globalThis.__node_crypto={});
  if(mod==="child_process")return globalThis.__node_cp||(globalThis.__node_cp={});
  if(mod==="net")return globalThis.__node_net||(globalThis.__node_net={});
  if(mod==="readline")return globalThis.__node_rl||(globalThis.__node_rl={});
  if(mod==="url")return globalThis.__node_url||(globalThis.__node_url={});
  if(mod==="stream")return globalThis.__node_stream||(globalThis.__node_stream={});
  if(mod==="events")return globalThis.__node_events||(globalThis.__node_events={});
  return __p;
};
`;

source = source.replace(requireStub, requireImpl);

// ============================================================
// Write output
// ============================================================

writeFileSync(outputPath, source);
console.log(`Written ${outputPath} (${(source.length / 1024 / 1024).toFixed(1)} MB)`);

// Count how many Z blocks were rewritten
const newZCount = (source.match(/__z\("/g) || []).length;
console.log(`Runtime contains ${newZCount} __z blocks (expected ${zBlocks.length})`);
