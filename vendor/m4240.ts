// @ts-nocheck
import {Pt,Go} from "./m632.ts";
import {Su,Js,oA} from "../src/config/2697_oA.ts";
import {ns} from "../src/mcp/2194_mcpServerName.ts";
import {yu,VR} from "./m2249.ts";
import {Kqe,S_e} from "./m4169.ts";
import {Spo,L5a} from "../src/tools/4240_error.ts";
import {Lc,Ri} from "../src/tools/2227_userFacingName.ts";
import {PA,Lv} from "../src/config/2699_WORKFLOW_TOOL_NAME.ts";
import {Apo,E5a} from "../src/core/4234_prompt.ts";
import {b,M} from "../runtime.ts";
function LPp(e){let t=[],n=[],r=0;function o(i,a){if(r>=M5a)return;if(r+=a.length,i.push(a),r>=M5a)i.push("[console output truncated at 50MB]")}function s(i){return i.map((a)=>{if(typeof a==="string")return a;try{return e.stringify(a,null,2)}catch{return e.toStr(a)}}).join(" ")}return{log:(...i)=>o(t,s(i)),info:(...i)=>o(t,s(i)),debug:(...i)=>o(t,s(i)),error:(...i)=>o(n,s(i)),warn:(...i)=>o(n,s(i)),getStdout:()=>t.join(`
`),getStderr:()=>n.join(`
`),clear:()=>{t.length=0,n.length=0,r=0}}}
function g3t(e){Object.setPrototypeOf(e,null);try{delete e.constructor,delete e.prototype}catch{}return e}
function MPp(e){let t=rdt.runInContext(`({
      arr: () => [],
      obj: () => ({}),
      wrap: (hostFn, cloneFn) => (input) => {
        const p = (async () => {
          try { return cloneFn(await hostFn(input)) }
          catch (e) {
            if (e?.name === 'ReplayCacheExhausted') throw e
            return { error: typeof e?.message === 'string' ? e.message : String(e) }
          }
        })()
        p.catch(() => {})
        return p
      },
      wrapN: (hostFn, cloneFn) => (...args) => {
        const p = (async () => {
          try { return cloneFn(await hostFn(...args)) }
          catch (e) {
            if (e?.name === 'ReplayCacheExhausted') throw e
            return { error: typeof e?.message === 'string' ? e.message : String(e) }
          }
        })()
        p.catch(() => {})
        return p
      },
      wrapPropagate: (hostFn, cloneFn, Err) => (input) => {
        const p = (async () => {
          try { return cloneFn(await hostFn(input)) }
          catch (e) {
            const err = new Err(typeof e?.message === 'string' ? e.message : String(e))
            if (typeof e?.name === 'string') {
              Object.defineProperty(err, 'name', { value: e.name, configurable: true, writable: true })
            }
            throw err
          }
        })()
        p.catch(() => {})
        return p
      },
      callVM: (vmFn, cloneFn) => async (input) => cloneFn(await vmFn(input)),
      resolveDeep: async (v, cloneFn) => {
        try { v = await v } catch (e) { return { error: typeof e?.message === 'string' ? e.message : String(e) } }
        if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
          try {
            for (const k of Object.keys(v)) {
              try {
                const val = v[k]
                if (val === null || typeof val !== 'object' || typeof val.then !== 'function') continue
                Object.defineProperty(v, k, { value: await val, writable: true, enumerable: true, configurable: true })
              } catch (e) {
                Object.defineProperty(v, k, { value: { error: typeof e?.message === 'string' ? e.message : String(e) }, writable: true, enumerable: true, configurable: true })
              }
            }
          } catch {}
        }
        try { return cloneFn(v) } catch { return undefined }
      },
      awaitVM: async (v) => v,
      exotics: new Set([
        Date, Map, Set, WeakMap, WeakSet, RegExp, Promise,
        Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, AggregateError,
        ArrayBuffer, SharedArrayBuffer, DataView,
        Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array,
        Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array,
        ...(typeof URL !== 'undefined' ? [URL] : []),
      ].map(C => C.prototype)),
      Err: Error,
      stringify: JSON.stringify,
      parse: JSON.parse,
      toStr: String,
    })`,e);function n(o,s=new WeakMap){if(typeof o==="function")return;if(o===null||typeof o!=="object")return o;if(bpo.types.isProxy(o))return;let i=s.get(o);if(i!==void 0)return i;if(!Object.hasOwn(o,"then")&&!Object.hasOwn(o,"toJSON")&&!Object.hasOwn(o,"toString")&&!Object.hasOwn(o,"valueOf")&&!Object.hasOwn(o,Symbol.toPrimitive)&&t.exotics.has(Object.getPrototypeOf(o)))return o;if(Array.isArray(o)){let l=t.arr();s.set(o,l);let c=Number.isSafeInteger(o.length)?o.length:0,u=Math.min(c,4096);for(let d=0;d<u;d++){let p=Object.getOwnPropertyDescriptor(o,d);l[d]=n(p&&"value"in p?p.value:void 0,s)}return l.length=c,l}let a=t.obj();s.set(o,a);for(let l of Object.keys(o)){let c=Object.getOwnPropertyDescriptor(o,l);Object.defineProperty(a,l,{value:n(c&&"value"in c?c.value:void 0,s),writable:!0,enumerable:!0,configurable:!0})}return a}function r(o){let s;try{s=typeof o?.message==="string"?o.message:t.toStr(o)}catch{s="<unprintable thrown value>"}throw new t.Err(s)}return{fn:(o)=>g3t((...s)=>{try{return o(...s)}catch(i){r(i)}}),clone:n,throwVM:(o)=>{throw new t.Err(o)},stringify:t.stringify,parse:t.parse,toStr:t.toStr,asyncData:(o)=>{let s=g3t((i)=>o(i));return t.wrap(s,n)},asyncDataN:(o)=>{let s=g3t((...i)=>o(...i));return t.wrapN(s,n)},asyncDataPropagate:(o)=>{let s=g3t((i)=>o(i));return t.wrapPropagate(s,n,t.Err)},asyncDataVM:(o)=>{let s=t.wrap(o,n);return g3t((i)=>{try{return s(n(i))}catch(a){r(a)}})},hostCallVM:(o)=>{let s=t.callVM(o,n);return(i)=>s(n(i))},resolveDeep:(o)=>t.resolveDeep(o,n),awaitVM:t.awaitVM}}
function B5a(e,t,n,r,o,s,i,a,l){e.console={__proto__:null,log:t.fn(n.log),info:t.fn(n.info),debug:t.fn(n.debug),error:t.fn(n.error),warn:t.fn(n.warn)};for(let[c,u]of Object.entries(r))e[c]=t.asyncData(u);for(let[c,u]of Object.entries(o))e[c]=t.asyncDataN(u);e.setTimeout=t.fn((c,u)=>{let d=Number(setTimeout(()=>c(),typeof u==="number"?u:void 0));return a.add(d),d}),e.clearTimeout=t.fn((c)=>{if(typeof c!=="number")return;clearTimeout(c),a.delete(c)}),e.setInterval=t.fn((c,u)=>{let d=Number(setInterval(()=>c(),typeof u==="number"?u:void 0));return a.add(d),d}),e.clearInterval=t.fn((c)=>{if(typeof c!=="number")return;clearInterval(c),a.delete(c)}),e.atob=t.fn((c)=>atob(t.toStr(c))),e.btoa=t.fn((c)=>btoa(t.toStr(c))),e.shQuote=t.fn((c)=>`'${t.toStr(c).replaceAll("'","'\\''")}'`),e.registerTool=t.fn((c,u,d,p,m)=>{if(typeof c!=="string"||!PPp.test(c))t.throwVM(`registerTool: name must match ^[a-zA-Z0-9_-]{1,111}$ (wire name is prefixed with 'eval_registered__'), got ${typeof c}: ${t.toStr(c).slice(0,50)}`);if(i.has(c)&&!s.has(c))t.throwVM(`registerTool: '${c}' collides with a built-in global; choose a different name`);let f=t.parse(t.stringify(d)??"null");if(f===null||typeof f!=="object"||Array.isArray(f))t.throwVM(`registerTool: schema must be a JSON-serializable object, got ${f===null?"null":Array.isArray(f)?"array":typeof f}`);let{displayName:A}=F5a(m,["displayName"]);s.set(c,{name:c,description:t.toStr(u),schema:f,handler:t.hostCallVM(p),displayName:A==null?void 0:t.toStr(A)}),e[c]=t.asyncDataVM(p)}),e.unregisterTool=t.fn((c)=>{if(!s.has(c))return!1;return delete e[c],s.delete(c)}),e.listTools=t.fn(()=>t.clone([...s.keys()])),qPp(e,t,l),e.getTool=t.fn((c)=>{let u=s.get(c);return u?t.clone({name:u.name,description:u.description,schema:u.schema,displayName:u.displayName}):void 0})}
function F5a(e,t){let n={};if(e===null||typeof e!=="object"||bpo.types.isProxy(e))return n;for(let r of t){let o=Object.getOwnPropertyDescriptor(e,r);if(!o||!("value"in o))continue;let s=o.value;if(typeof s==="string"||typeof s==="number"||typeof s==="boolean")n[r]=s}return n}
function qPp(e,t,n){function r(c){let u=t.toStr(c);return W3n.isAbsolute(u)?u:W3n.resolve(n.cwd,u)}function o(c,u){let d=e[c];if(typeof d!=="function")t.throwVM(`${c} tool is not available in this REPL context`);return d(u)}function s(c){return c!==null&&typeof c==="object"?c:{}}function i(c,u){return typeof c[u]==="string"?c[u]:""}function a(c){if(c!==void 0)return{path:r(c)};return n.cwd!==Pt()?{path:n.cwd}:{}}async function l(c,u){let d=Su(),p=n.cwd===Pt()?"":d?`cd ${jPp(n.cwd)} && `:`Set-Location -LiteralPath '${n.cwd.replace(/'/g,"''")}'; `,m=s(await o(d?ns:Js,{command:p+c,...typeof u==="number"&&{timeout:u}})),f=i(m,"stdout"),A=i(m,"stderr"),h=i(m,"error");return[f,A&&`[stderr]
${A}`,h&&`[error] ${h}`].filter(Boolean).join(`
`)}e.sh=t.asyncDataN((c,u)=>l(t.toStr(c),u)),e.gh=t.asyncDataN((c)=>{let u=t.toStr(c).trim(),d=n.repo;if(d&&!$Pp.test(u)){if(UPp.test(u))u=`${u} -R ${d}`;u=u.replaceAll("repos/:owner/:repo",`repos/${d}`)}return l(`gh ${u}`)}),e.cat=t.asyncDataN(async(c,u,d)=>{let p=s(await o(NPp,{file_path:r(c),...typeof u==="number"&&{offset:u},...typeof d==="number"&&{limit:d}})),m=s(p.file);return i(m,"content")||i(p,"error")}),e.rg=t.asyncDataN(async(c,u,d)=>{let p=F5a(d,FPp),m=s(await o(N5a,{pattern:t.toStr(c),output_mode:"content","-n":!0,...a(u),...p.A!==void 0&&{"-A":p.A},...p.B!==void 0&&{"-B":p.B},...p.C!==void 0&&{"-C":p.C},...p.glob!==void 0&&{glob:p.glob},...p.head!==void 0&&{head_limit:p.head},...p.type!==void 0&&{type:p.type},...p.i!==void 0&&{"-i":p.i}}));return i(m,"content")||i(m,"error")}),e.rgf=t.asyncDataN(async(c,u,d)=>{let p=s(await o(N5a,{pattern:t.toStr(c),output_mode:"files_with_matches",...a(u),...typeof d==="string"&&{glob:d}}));return Array.isArray(p.filenames)?p.filenames:[]}),e.gl=t.asyncDataN(async(c,u)=>{let d=s(await o(yu,{pattern:t.toStr(c),...a(u)}));return Array.isArray(d.filenames)?d.filenames:[]}),e.put=t.asyncDataN(async(c,u)=>{let d=s(await o(BPp,{file_path:r(c),content:t.toStr(u)})),p=i(d,"error");return p?`[error] ${p}`:""}),e.chdir=t.fn((c)=>{n.cwd=r(c)}),e.log=e.console.log,e.str=t.fn((c,u,d)=>{if(typeof u==="function")t.throwVM("str: function replacer not supported");return t.stringify(c,u,d)})}
function jPp(e){return`'${e.replaceAll("'","'\\''")}'`}
function G3n(e,t){if(e.helperState.cwd=Pt(),t!==void 0)e.helperState.repo=t;e.vmContext.REPO=e.helperState.repo??"",e.vmContext.o=e.sealers.clone({})}
function V3n(e,t){let n=t===void 0?e.vmContext.o:t;return e.sealers.resolveDeep(n)}
function U5a(e,t,n,r,o){let s=new Map,i=new Set,a=new Set,l={cwd:Pt(),repo:void 0},c=rdt.createContext({__proto__:null},{codeGeneration:{strings:!0,wasm:!1}}),u=MPp(c),d=LPp(u);rdt.runInContext(`Promise.prototype.toString = function () {
      throw new TypeError(
        "REPL: unawaited Promise coerced to string. Shorthand results used " +
        "inline need 'await' \u2014 e.g. const c = await cat(f); put(f, c + s). " +
        "Auto-await applies only to o.* keys at return time.",
      )
    }`,c),Kqe(c);let p=Spo(e.filter((f)=>!Lc(f,PA)),t,n,r,o),m=Apo(u.stringify,t,o);B5a(c,u,d,p,m,s,i,a,l),Object.keys(c).forEach((f)=>i.add(f)),OPp.forEach((f)=>i.add(f));try{rdt.runInContext("Object.getOwnPropertyNames(globalThis)",c).forEach((A)=>i.add(A))}catch{["JSON","Array","Object","Promise","globalThis"].forEach((f)=>i.add(f))}return i.add("__proto__"),{vmContext:c,registeredTools:s,reservedGlobals:i,toolWrapperNames:new Set([...Object.keys(p),...Object.keys(m)]),boundaryUuid:null,console:d,sealers:u,clearAllTimers:()=>{for(let f of a)clearTimeout(f);a.clear()},replayLog:[],helperState:l}}
function $5a(e,t,n,r,o,s){let i=Spo(t.filter((l)=>!Lc(l,PA)),n,r,o,s),a=Apo(e.sealers.stringify,n,s);B5a(e.vmContext,e.sealers,e.console,i,a,e.registeredTools,e.reservedGlobals,new Set,e.helperState);for(let l of Object.keys(i))e.toolWrapperNames.add(l);for(let l of Object.keys(a))e.toolWrapperNames.add(l)}
var W3n,bpo,rdt,PPp,OPp,M5a=52428800,NPp="Read",BPp="Write",N5a="Grep",FPp,UPp,$Pp;
var Epo=b(()=>{Ri();Go();oA();S_e();VR();Lv();E5a();L5a();W3n=require("path"),bpo=require("util"),rdt=M(require("vm")),PPp=/^[a-zA-Z0-9_-]{1,111}$/,OPp=["sh","cat","rg","rgf","gl","put","gh","chdir","log","str","o","REPO"];FPp=["A","B","C","glob","head","type","i"];UPp=/^(pr|issue|run|workflow|release|label|cache)\b/,$Pp=/(^|\s)(-R|--repo\b)/});
export {LPp,g3t,MPp,B5a,F5a,qPp,jPp,G3n,V3n,U5a,$5a,W3n,bpo,rdt,PPp,OPp,M5a,NPp,BPp,N5a,FPp,UPp,$Pp,Epo};
