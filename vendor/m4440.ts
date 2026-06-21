// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getHeadForDir,vO} from "./m691.ts";
import {Jwe,XZ,isBashAvailable,qet} from "../src/config/2601_GIT_CONFIG_COUNT.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {b,M} from "../runtime.ts";
import {O4} from "./m2337.ts";
async function eue(e,t,n,r,o,s){if(n?.version)return logForDebugging(`Using manifest version for ${e}: ${n.version}`),n.version;if(o)return logForDebugging(`Using provided version for ${e}: ${o}`),o;if(s){let i=s.substring(0,12);if(typeof t==="object"&&t.source==="git-subdir"){let a=t.path.replaceAll("\\","/").replace(/^\.\//,"").replace(/\/+$/,""),l=Rnl.createHash("sha256").update(a).digest("hex").substring(0,8),c=`${i}-${l}`;return logForDebugging(`Using git-subdir SHA+path version for ${e}: ${c} (path=${a})`),c}return logForDebugging(`Using pre-resolved git SHA for ${e}: ${i}`),i}if(r){let i=await Qgo(r);if(i){let a=i.substring(0,12);return logForDebugging(`Using git SHA for ${e}: ${a}`),a}}return logForDebugging(`No version found for ${e}, using 'unknown'`),"unknown"}
function Qgo(e){return getHeadForDir(e)}
function vjn(e){if(typeof e==="string")return null;switch(e.source){case"github":return Xgo(e.repo);case"url":return e.url;case"git-subdir":return/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/.test(e.url)?Xgo(e.url):e.url;default:return null}}
function Xgo(e){return Jwe()?`https://github.com/${e}.git`:`git@github.com:${e}.git`}
function bqt(e){if(!e)return null;switch(e.source){case"github":return Xgo(e.repo);case"git":return e.url;default:return null}}
function wjn(e,t){let n=bqt(e);if(n===null||!e)return null;let r=t.replace(/^\.(?:\/|$)/,"");if(r==="")return e.source==="github"?{source:"github",repo:e.repo}:{source:"url",url:n};return{source:"git-subdir",url:n,path:r}}
function knl(e,t){return`${e}${xnl}${t}`}
async function Rjn(e,t,n,r){if(!Mqp(e))return logForDebugging(`resolveVersionRange: rejected unsafe URL ${e}`),null;let o=r?.get(e);if(o===void 0)o=execFileNoThrow("git",[...XZ,"ls-remote","--tags","--",e],{env:isBashAvailable()}).then((u)=>u.code!==0?Promise.reject(Error(`ls-remote exit ${u.code}`)):u.stdout),r?.set(e,o);let s;try{s=await o}catch(u){return r?.delete(e),logForDebugging(`resolveVersionRange: ls-remote failed for ${e}: ${u instanceof Error?u.message:String(u)}`),null}let i=`${t}${xnl}`,a=new Map;for(let u of s.split(`
`)){let d=u.indexOf("\t");if(d===-1)continue;let p=u.slice(0,d),m=u.slice(d+1);if(!m.startsWith("refs/tags/"))continue;let f=m.slice(10),A=f.endsWith("^{}");if(A)f=f.slice(0,-3);if(!f.startsWith(i))continue;let h=Cjn.clean(f.slice(i.length));if(h===null)continue;if(!A&&a.has(f))continue;a.set(f,{version:h,ref:f,sha:p})}if(a.size===0)return null;let l=[...a.values()],c=Cjn.maxSatisfying(l.map((u)=>u.version),n);if(c===null)return null;return l.find((u)=>u.version===c)??null}
function Mqp(e){if(/^git@[a-zA-Z0-9.-]+:/.test(e))return!0;try{return["https:","http:","file:"].includes(new URL(e).protocol)}catch{return!1}}
var Rnl,Cjn,xnl="--v";
var Eqt=b(()=>{qe();oa();vO();qet();Rnl=require("crypto"),Cjn=M(O4(),1)});
export {eue,Qgo,vjn,Xgo,bqt,wjn,knl,Rjn,Mqp,Rnl,Cjn,xnl,Eqt};
