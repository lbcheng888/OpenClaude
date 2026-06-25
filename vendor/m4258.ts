// @ts-nocheck
import {isTmuxControlMode,Po} from "./m638.ts";
import {Yc,ws,Zm} from "../src/config/2709_Zm.ts";
import {unt,iOt} from "./m2522.ts";
import {Mo} from "../src/mcp/2200_mcpServerName.ts";
import {su,ow} from "./m2257.ts";
import {p5e,Uye} from "./m4181.ts";
import {__o,eYa} from "../src/tools/4258_error.ts";
import {Gl,ri} from "../src/tools/2235_userFacingName.ts";
import {Mf,$A} from "../src/config/2711_WORKFLOW_TOOL_NAME.ts";
import {u_o,qja} from "../src/core/4252_prompt.ts";
import {b,x} from "../runtime.ts";
function t2p(e){let t=[],n=[],r=0;function o(i,a){if(r>=tYa)return;if(r+=a.length,i.push(a),r>=tYa)i.push("[console output truncated at 50MB]")}function s(i){return i.map((a)=>{if(typeof a==="string")return a;try{return e.stringify(a,null,2)}catch{return e.toStr(a)}}).join(" ")}return{log:(...i)=>o(t,s(i)),info:(...i)=>o(t,s(i)),debug:(...i)=>o(t,s(i)),error:(...i)=>o(n,s(i)),warn:(...i)=>o(n,s(i)),getStdout:()=>t.join(`
`),getStderr:()=>n.join(`
`),clear:()=>{t.length=0,n.length=0,r=0}}}
function Oqt(e){Object.setPrototypeOf(e,null);try{delete e.constructor,delete e.prototype}catch{}return e}
function n2p(e){let t=P5e.runInContext(`(() => {
      // Capture intrinsics in closure NOW (literal-eval time, pre-user-code).
      // Global identifiers inside these function bodies resolve at CALL time
      // via globalThis \u2014 hardenVMIntrinsics freezes the String/Object
      // constructor OBJECTS but the globalThis bindings stay writable, so VM
      // code can reassign globalThis.String and a call-time lookup would use
      // it (same convention as createVMClone in vmHardening.ts). The
      // value-captured members below (Err/stringify/parse/toStr/exotics) are
      // immune by construction.
      const _String = String, _keys = Object.keys,
            _defineProperty = Object.defineProperty, _isArray = Array.isArray
      // Single error-message extractor for EVERY catch in this literal
      // (also exported as errMsg). Read .message ONCE \u2014 a stateful accessor
      // can return a string to a typeof check and a hostile VM value to a
      // re-read, smuggling a non-string into {error} objects that cross to
      // the host. String() fallback via the captured intrinsic; never
      // throws ('<unprintable thrown value>' for poison getters), so a
      // throwing getter can't turn an {error} return into a raw rejection.
      const _errStr = (e) => {
        try {
          const m = e?.message
          return typeof m === 'string' ? m : _String(e)
        } catch {
          return '<unprintable thrown value>'
        }
      }
      return {
      arr: () => [],
      obj: () => ({}),
      wrap: (hostFn, cloneFn) => (input) => {
        const p = (async () => {
          try { return cloneFn(await hostFn(input)) }
          catch (e) {
            if (e?.name === 'ReplayCacheExhausted') throw e
            return { error: _errStr(e) }
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
            return { error: _errStr(e) }
          }
        })()
        p.catch(() => {})
        return p
      },
      wrapPropagate: (hostFn, cloneFn, Err) => (input) => {
        const p = (async () => {
          try { return cloneFn(await hostFn(input)) }
          catch (e) {
            const err = new Err(_errStr(e))
            // Read .name once for the same stateful-accessor reason.
            const n = e?.name
            if (typeof n === 'string') {
              _defineProperty(err, 'name', { value: n, configurable: true, writable: true })
            }
            throw err
          }
        })()
        p.catch(() => {})
        return p
      },
      callVM: (vmFn, cloneFn) => async (input) => cloneFn(await vmFn(input)),
      resolveDeep: async (v, cloneFn) => {
        // This catch's return is the one resolveDeep exit that bypasses
        // cloneFn, so the {error} value MUST be a primitive \u2014 _errStr
        // guarantees a string, keeping raw VM objects from crossing the
        // boundary by identity.
        try { v = await v } catch (e) { return { error: _errStr(e) } }
        if (v !== null && typeof v === 'object' && !_isArray(v)) {
          try {
            for (const k of _keys(v)) {
              try {
                const val = v[k]
                if (val === null || typeof val !== 'object' || typeof val.then !== 'function') continue
                _defineProperty(v, k, { value: await val, writable: true, enumerable: true, configurable: true })
              } catch (e) {
                _defineProperty(v, k, { value: { error: _errStr(e) }, writable: true, enumerable: true, configurable: true })
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
      errMsg: _errStr,
      }
    })()`,e);function n(a){let l;try{l=t.errMsg(a)}catch{return"<unprintable thrown value>"}return typeof l==="string"?l:"<unprintable thrown value>"}function r(a,l=new WeakMap){if(typeof a==="function")return;if(a===null||typeof a!=="object")return a;if(y_o.types.isProxy(a))return;let c=l.get(a);if(c!==void 0)return c;if(!Object.hasOwn(a,"then")&&!Object.hasOwn(a,"toJSON")&&!Object.hasOwn(a,"toString")&&!Object.hasOwn(a,"valueOf")&&!Object.hasOwn(a,Symbol.toPrimitive)&&t.exotics.has(Object.getPrototypeOf(a)))return a;if(Array.isArray(a)){let d=t.arr();l.set(a,d);let p=Number.isSafeInteger(a.length)?a.length:0,m=Math.min(p,4096);for(let f=0;f<m;f++){let h=Object.getOwnPropertyDescriptor(a,f);d[f]=r(h&&"value"in h?h.value:void 0,l)}return d.length=p,d}let u=t.obj();l.set(a,u);for(let d of Object.keys(a)){let p=Object.getOwnPropertyDescriptor(a,d);Object.defineProperty(u,d,{value:r(p&&"value"in p?p.value:void 0,l),writable:!0,enumerable:!0,configurable:!0})}return u}let o=new WeakSet;function s(a){return o.add(a),a}function i(a){throw new t.Err(n(a))}return{fn:(a)=>Oqt((...l)=>{try{return a(...l)}catch(c){i(c)}}),clone:r,throwVM:(a)=>{throw new t.Err(a)},stringify:t.stringify,parse:t.parse,toStr:t.toStr,errMsg:n,asyncData:(a)=>{let l=Oqt((c)=>a(c));return s(t.wrap(l,r))},asyncDataN:(a)=>{let l=Oqt((...c)=>a(...c));return s(t.wrapN(l,r))},asyncDataPropagate:(a)=>{let l=Oqt((c)=>a(c));return s(t.wrapPropagate(l,r,t.Err))},asyncDataVM:(a)=>{let l=t.wrap(a,r);return s(Oqt((c)=>{try{return l(r(c))}catch(u){i(u)}}))},hostCallVM:(a)=>{let l=t.callVM(a,r);return(c)=>l(r(c))},resolveDeep:(a)=>t.resolveDeep(a,r),awaitVM:t.awaitVM,isSealedAsync:(a)=>typeof a==="function"&&o.has(a)}}
function Z6n(e,t){let n=Object.getOwnPropertyDescriptor(e,t);return n&&"value"in n?n.value:void 0}
function rYa(e,t,n,r,o,s,i,a,l){let c={__proto__:null,log:t.fn(n.log),info:t.fn(n.info),debug:t.fn(n.debug),error:t.fn(n.error),warn:t.fn(n.warn)};e.console=c;for(let[d,p]of Object.entries(r))e[d]=t.asyncData(p);for(let[d,p]of Object.entries(o))e[d]=t.asyncDataN(p);let u=P5e.runInContext('(f) => { try { if (typeof f === "function") f() } catch {} }',e);e.setTimeout=t.fn((d,p)=>{if(typeof d!=="function")return 0;let m=Number(setTimeout(()=>u(d),typeof p==="number"?p:void 0));return a.add(m),m}),e.clearTimeout=t.fn((d)=>{if(typeof d!=="number")return;clearTimeout(d),a.delete(d)}),e.setInterval=t.fn((d,p)=>{if(typeof d!=="function")return 0;let m=Number(setInterval(()=>u(d),typeof p==="number"?p:void 0));return a.add(m),m}),e.clearInterval=t.fn((d)=>{if(typeof d!=="number")return;clearInterval(d),a.delete(d)}),e.atob=t.fn((d)=>atob(t.toStr(d))),e.btoa=t.fn((d)=>btoa(t.toStr(d))),e.shQuote=t.fn((d)=>`'${t.toStr(d).replaceAll("'","'\\''")}'`),e.registerTool=t.fn((d,p,m,f,h)=>{if(typeof d!=="string"||!ZUp.test(d))t.throwVM(`registerTool: name must match ^[a-zA-Z0-9_-]{1,111}$ (wire name is prefixed with 'eval_registered__'), got ${typeof d}: ${t.toStr(d).slice(0,50)}`);if(i.has(d)&&!s.has(d))t.throwVM(`registerTool: '${d}' collides with a built-in global; choose a different name`);let g=t.parse(t.stringify(m)??"null");if(g===null||typeof g!=="object"||Array.isArray(g))t.throwVM(`registerTool: schema must be a JSON-serializable object, got ${g===null?"null":Array.isArray(g)?"array":typeof g}`);let{displayName:_}=oYa(h,["displayName"]);s.set(d,{name:d,description:t.toStr(p),schema:g,handler:t.hostCallVM(f),displayName:_==null?void 0:t.toStr(_)}),e[d]=t.asyncDataVM(f)}),e.unregisterTool=t.fn((d)=>{if(!s.has(d))return!1;return delete e[d],s.delete(d)}),e.listTools=t.fn(()=>t.clone([...s.keys()])),l2p(e,t,l,c.log),e.getTool=t.fn((d)=>{let p=s.get(d);return p?t.clone({name:p.name,description:p.description,schema:p.schema,displayName:p.displayName}):void 0})}
function oYa(e,t){let n={};if(e===null||typeof e!=="object"||y_o.types.isProxy(e))return n;for(let r of t){let o=Object.getOwnPropertyDescriptor(e,r);if(!o||!("value"in o))continue;let s=o.value;if(typeof s==="string"||typeof s==="number"||typeof s==="boolean")n[r]=s}return n}
function l2p(e,t,n,r){function o(u){let d=t.toStr(u);return Q6n.isAbsolute(d)?d:Q6n.resolve(n.cwd,d)}function s(u,d){let p=Z6n(e,u);if(typeof p!=="function"||!t.isSealedAsync(p))t.throwVM(`${u} tool is not available in this REPL context`);return p(d)}function i(u){return u!==null&&typeof u==="object"?u:{}}function a(u,d){return typeof u[d]==="string"?u[d]:""}function l(u){if(u!==void 0)return{path:o(u)};return n.cwd!==isTmuxControlMode()?{path:n.cwd}:{}}async function c(u,d){let p=Yc(),m=n.cwd===isTmuxControlMode()?"":p?`cd ${c2p(n.cwd)} && `:`Set-Location -LiteralPath ${unt(n.cwd,"the REPL working directory")}; `,f=i(await s(p?Mo:ws,{command:m+u,...typeof d==="number"&&{timeout:d}})),h=a(f,"stdout"),g=a(f,"stderr"),_=a(f,"error");return[h,g&&`[stderr]
${g}`,_&&`[error] ${_}`].filter(Boolean).join(`
`)}e.sh=t.asyncDataN((u,d)=>c(t.toStr(u),d)),e.gh=t.asyncDataN((u)=>{let d=t.toStr(u).trim(),p=n.repo;if(p&&!a2p.test(d)){if(i2p.test(d))d=`${d} -R ${p}`;d=d.replaceAll("repos/:owner/:repo",`repos/${p}`)}return c(`gh ${d}`)}),e.cat=t.asyncDataN(async(u,d,p)=>{let m=i(await s(r2p,{file_path:o(u),...typeof d==="number"&&{offset:d},...typeof p==="number"&&{limit:p}})),f=i(m.file);return a(f,"content")||a(m,"error")}),e.rg=t.asyncDataN(async(u,d,p)=>{let m=oYa(p,s2p),f=i(await s(nYa,{pattern:t.toStr(u),output_mode:"content","-n":!0,...l(d),...m.A!==void 0&&{"-A":m.A},...m.B!==void 0&&{"-B":m.B},...m.C!==void 0&&{"-C":m.C},...m.glob!==void 0&&{glob:m.glob},...m.head!==void 0&&{head_limit:m.head},...m.type!==void 0&&{type:m.type},...m.i!==void 0&&{"-i":m.i}}));return a(f,"content")||a(f,"error")}),e.rgf=t.asyncDataN(async(u,d,p)=>{let m=i(await s(nYa,{pattern:t.toStr(u),output_mode:"files_with_matches",...l(d),...typeof p==="string"&&{glob:p}}));return Array.isArray(m.filenames)?m.filenames:[]}),e.gl=t.asyncDataN(async(u,d)=>{let p=i(await s(su,{pattern:t.toStr(u),...l(d)}));return Array.isArray(p.filenames)?p.filenames:[]}),e.put=t.asyncDataN(async(u,d)=>{let p=i(await s(o2p,{file_path:o(u),content:t.toStr(d)})),m=a(p,"error");return m?`[error] ${m}`:""}),e.chdir=t.fn((u)=>{n.cwd=o(u)}),e.log=r,e.str=t.fn((u,d,p)=>{if(typeof d==="function")t.throwVM("str: function replacer not supported");return t.stringify(u,d,p)})}
function c2p(e){return`'${e.replaceAll("'","'\\''")}'`}
function e5n(e,t){if(e.helperState.cwd=isTmuxControlMode(),t!==void 0)e.helperState.repo=t;e.vmContext.REPO=e.helperState.repo??"",e.vmContext.o=e.sealers.clone({})}
function t5n(e,t){let n=t===void 0?Z6n(e.vmContext,"o"):t;return e.sealers.resolveDeep(n)}
function sYa(e,t,n,r,o){let s=new Map,i=new Set,a=new Set,l={cwd:isTmuxControlMode(),repo:void 0},c=P5e.createContext({__proto__:null},{codeGeneration:{strings:!0,wasm:!1}}),u=n2p(c),d=t2p(u);P5e.runInContext(`Promise.prototype.toString = function () {
      throw new TypeError(
        "REPL: unawaited Promise coerced to string. Shorthand results used " +
        "inline need 'await' \u2014 e.g. const c = await cat(f); put(f, c + s). " +
        "Auto-await applies only to o.* keys at return time.",
      )
    }`,c),p5e(c);let p=__o(e.filter((f)=>!Gl(f,Mf)),t,n,r,o),m=u_o(u.stringify,t,o);rYa(c,u,d,p,m,s,i,a,l),Object.keys(c).forEach((f)=>i.add(f)),e2p.forEach((f)=>i.add(f));try{P5e.runInContext("Object.getOwnPropertyNames(globalThis)",c).forEach((h)=>i.add(h))}catch{["JSON","Array","Object","Promise","globalThis"].forEach((f)=>i.add(f))}return i.add("__proto__"),{vmContext:c,registeredTools:s,reservedGlobals:i,toolWrapperNames:new Set([...Object.keys(p),...Object.keys(m)]),boundaryUuid:null,console:d,sealers:u,clearAllTimers:()=>{for(let f of a)clearTimeout(f);a.clear()},replayLog:[],helperState:l}}
function iYa(e,t,n,r,o,s){let i=__o(t.filter((l)=>!Gl(l,Mf)),n,r,o,s),a=u_o(e.sealers.stringify,n,s);rYa(e.vmContext,e.sealers,e.console,i,a,e.registeredTools,e.reservedGlobals,new Set,e.helperState);for(let l of Object.keys(i))e.toolWrapperNames.add(l);for(let l of Object.keys(a))e.toolWrapperNames.add(l)}
var Q6n,y_o,P5e,ZUp,e2p,tYa=52428800,r2p="Read",o2p="Write",nYa="Grep",s2p,i2p,a2p;
var T_o=b(()=>{ri();Po();iOt();Zm();Uye();ow();$A();qja();eYa();Q6n=require("path"),y_o=require("util"),P5e=x(require("vm")),ZUp=/^[a-zA-Z0-9_-]{1,111}$/,e2p=["sh","cat","rg","rgf","gl","put","gh","chdir","log","str","o","REPO"];s2p=["A","B","C","glob","head","type","i"];i2p=/^(pr|issue|run|workflow|release|label|cache)\b/,a2p=/(^|\s)(-R|--repo\b)/});
export {t2p,Oqt,n2p,Z6n,rYa,oYa,l2p,c2p,e5n,t5n,sYa,iYa,Q6n,y_o,P5e,ZUp,e2p,tYa,r2p,o2p,nYa,s2p,i2p,a2p,T_o};
