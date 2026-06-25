// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getHeadForDir,VP} from "./m696.ts";
import {Pwe,jZ,nW,Z2e} from "../src/config/2612_GIT_CONFIG_COUNT.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {b,x} from "../runtime.ts";
import {t4} from "./m2347.ts";
async function Xce(e,t,n,r,o,s){if(n?.version)return logForDebugging(`Using manifest version for ${e}: ${n.version}`),n.version;if(o)return logForDebugging(`Using provided version for ${e}: ${o}`),o;if(s){let i=s.substring(0,12);if(typeof t==="object"&&t.source==="git-subdir"){let a=t.path.replaceAll("\\","/").replace(/^\.\//,"").replace(/\/+$/,""),l=mcl.createHash("sha256").update(a).digest("hex").substring(0,8),c=`${i}-${l}`;return logForDebugging(`Using git-subdir SHA+path version for ${e}: ${c} (path=${a})`),c}return logForDebugging(`Using pre-resolved git SHA for ${e}: ${i}`),i}if(r){let i=await KEo(r);if(i){let a=i.substring(0,12);return logForDebugging(`Using git SHA for ${e}: ${a}`),a}}return logForDebugging(`No version found for ${e}, using 'unknown'`),"unknown"}
function KEo(e){return getHeadForDir(e)}
function VGn(e){if(typeof e==="string")return null;switch(e.source){case"github":return VEo(e.repo);case"url":return e.url;case"git-subdir":return/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/.test(e.url)?VEo(e.url):e.url;default:return null}}
function VEo(e){return Pwe()?`https://github.com/${e}.git`:`git@github.com:${e}.git`}
function j5t(e){if(!e)return null;switch(e.source){case"github":return VEo(e.repo);case"git":return e.url;default:return null}}
function KGn(e,t){let n=j5t(e);if(n===null||!e)return null;let r=t.replace(/^\.(?:\/|$)/,"");if(r==="")return e.source==="github"?{source:"github",repo:e.repo}:{source:"url",url:n};return{source:"git-subdir",url:n,path:r}}
function hcl(e,t){return`${e}${fcl}${t}`}
async function zGn(e,t,n,r){if(!Tzp(e))return logForDebugging(`resolveVersionRange: rejected unsafe URL ${e}`),null;let o=r?.get(e);if(o===void 0)o=execFileNoThrow("git",[...jZ,"ls-remote","--tags","--",e],{env:nW()}).then((u)=>u.code!==0?Promise.reject(Error(`ls-remote exit ${u.code}`)):u.stdout),r?.set(e,o);let s;try{s=await o}catch(u){return r?.delete(e),logForDebugging(`resolveVersionRange: ls-remote failed for ${e}: ${u instanceof Error?u.message:String(u)}`),null}let i=`${t}${fcl}`,a=new Map;for(let u of s.split(`
`)){let d=u.indexOf("\t");if(d===-1)continue;let p=u.slice(0,d),m=u.slice(d+1);if(!m.startsWith("refs/tags/"))continue;let f=m.slice(10),h=f.endsWith("^{}");if(h)f=f.slice(0,-3);if(!f.startsWith(i))continue;let g=GGn.clean(f.slice(i.length));if(g===null)continue;if(!h&&a.has(f))continue;a.set(f,{version:g,ref:f,sha:p})}if(a.size===0)return null;let l=[...a.values()],c=GGn.maxSatisfying(l.map((u)=>u.version),n);if(c===null)return null;return l.find((u)=>u.version===c)??null}
function Tzp(e){if(/^git@[a-zA-Z0-9.-]+:/.test(e))return!0;try{return["https:","http:","file:"].includes(new URL(e).protocol)}catch{return!1}}
var mcl,GGn,fcl="--v";
var Y5t=b(()=>{qe();Ii();VP();Z2e();mcl=require("crypto"),GGn=x(t4(),1)});
export {Xce,KEo,VGn,VEo,j5t,KGn,hcl,zGn,Tzp,mcl,GGn,fcl,Y5t};
