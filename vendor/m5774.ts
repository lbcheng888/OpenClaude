// @ts-nocheck
import {Yt,Es} from "./m641.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function AXm(e){let t=Yt();if(t==="windows")return null;let n=e._handle,r=typeof n?.fd==="number"?n.fd:-1;if(r<0)return null;try{return t==="macos"?vXm(r):RXm(r)}catch(o){return logForDebugging(`[daemon] peer uid lookup failed: ${o instanceof Error?o.message:String(o)}`,{level:"warn"}),null}}
function TSc(e,t=AXm){let n=process.getuid?.();if(n==null)return null;let r=t(e);if(r==null)return null;if(r===n)return null;let o=`permission denied: connecting uid ${r} != daemon uid ${n} (retry without sudo, or as the daemon owner)`;return logForDebugging(`[daemon] rejecting control connection: ${o}`,{level:"error"}),o}
function RXm(e){if(jrr===void 0)jrr=SSc("libc.so.6",{getsockopt:{args:["int","int","int","ptr","ptr"],returns:"int"}})?.getsockopt??null;if(jrr==null)return null;let t=new Uint8Array(12),n=new Uint32Array([12]);if(jrr(e,1,17,t,n)!==0)return null;return new DataView(t.buffer).getUint32(4,!0)}
function vXm(e){if(Yrr===void 0)Yrr=SSc("/usr/lib/libSystem.B.dylib",{getpeereid:{args:["int","ptr","ptr"],returns:"int"}})?.getpeereid??null;if(Yrr==null)return null;let t=new Uint32Array(1),n=new Uint32Array(1);return Yrr(e,t,n)===0?Number(t[0]):null}
function SSc(e,t){try{return require("bun:ffi").dlopen(e,t).symbols}catch(n){return logForDebugging(`[daemon] dlopen(${e}) failed: ${n instanceof Error?n.message:String(n)}`,{level:"warn"}),null}}
var jrr,Yrr;
var bSc=b(()=>{qe();Es()});
export {AXm,TSc,RXm,vXm,SSc,jrr,Yrr,bSc};
