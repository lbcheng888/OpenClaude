// @ts-nocheck
import {zt,qs} from "./m635.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function g6m(e){let t=zt();if(t==="windows")return null;let n=e._handle,r=typeof n?.fd==="number"?n.fd:-1;if(r<0)return null;try{return t==="macos"?y6m(r):_6m(r)}catch(o){return logForDebugging(`[daemon] peer uid lookup failed: ${o instanceof Error?o.message:String(o)}`,{level:"warn"}),null}}
function duc(e,t=g6m){let n=process.getuid?.();if(n==null)return null;let r=t(e);if(r==null)return null;if(r===n)return null;let o=`permission denied: connecting uid ${r} != daemon uid ${n} (retry without sudo, or as the daemon owner)`;return logForDebugging(`[daemon] rejecting control connection: ${o}`,{level:"error"}),o}
function _6m(e){if(kZn===void 0)kZn=puc("libc.so.6",{getsockopt:{args:["int","int","int","ptr","ptr"],returns:"int"}})?.getsockopt??null;if(kZn==null)return null;let t=new Uint8Array(12),n=new Uint32Array([12]);if(kZn(e,1,17,t,n)!==0)return null;return new DataView(t.buffer).getUint32(4,!0)}
function y6m(e){if(HZn===void 0)HZn=puc("/usr/lib/libSystem.B.dylib",{getpeereid:{args:["int","ptr","ptr"],returns:"int"}})?.getpeereid??null;if(HZn==null)return null;let t=new Uint32Array(1),n=new Uint32Array(1);return HZn(e,t,n)===0?Number(t[0]):null}
function puc(e,t){try{return require("bun:ffi").dlopen(e,t).symbols}catch(n){return logForDebugging(`[daemon] dlopen(${e}) failed: ${n instanceof Error?n.message:String(n)}`,{level:"warn"}),null}}
var kZn,HZn;
var muc=b(()=>{qe();qs()});
export {g6m,duc,_6m,y6m,puc,kZn,HZn,muc};
