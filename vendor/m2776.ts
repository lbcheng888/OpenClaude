// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {Wt,ps} from "./m230.ts";
import {cn,Ce,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function uzr(){let e=p1t.join(or(),"session-env",getSessionId());return await Wt().mkdir(e),e}
async function X5i(e,t){let n=e.toLowerCase();return p1t.join(await uzr(),`${n}-hook-${t}.sh`)}
async function Q5i(){try{let e=await uzr(),t=await Kke.readdir(e);await Promise.all(t.filter((n)=>(n.startsWith("filechanged-hook-")||n.startsWith("cwdchanged-hook-"))&&aIn.test(n)).map((n)=>Kke.writeFile(p1t.join(e,n),"")))}catch(e){if(cn(e)!=="ENOENT")logForDebugging(`Failed to clear cwd env files: ${Ce(e)}`)}}
function Rot(){logForDebugging("Invalidating session environment cache"),Vke=void 0,iIn=void 0}
async function Z5i(){let e=getSessionId();if(Vke!==void 0&&iIn===e)return Vke;let t=[],n=process.env.CLAUDE_ENV_FILE;if(n)try{let o=(await Kke.readFile(n,"utf8")).trim();if(o)t.push(o),logForDebugging(`Session environment loaded from CLAUDE_ENV_FILE: ${n} (${o.length} chars)`)}catch(o){if(cn(o)!=="ENOENT")logForDebugging(`Failed to read CLAUDE_ENV_FILE: ${Ce(o)}`)}let r=await uzr();try{let s=(await Kke.readdir(r)).filter((i)=>aIn.test(i)).sort(xNd);for(let i of s){let a=p1t.join(r,i);try{let l=(await Kke.readFile(a,"utf8")).trim();if(l)t.push(l)}catch(l){if(cn(l)!=="ENOENT")logForDebugging(`Failed to read hook file ${a}: ${Ce(l)}`)}}if(s.length>0)logForDebugging(`Session environment loaded from ${s.length} hook file(s)`)}catch(o){if(cn(o)!=="ENOENT")logForDebugging(`Failed to load session environment from hooks: ${Ce(o)}`)}if(t.length===0)return logForDebugging("No session environment scripts found"),Vke=null,iIn=e,Vke;return Vke=t.join(`
`),iIn=e,logForDebugging(`Session environment script ready (${Vke.length} chars total)`),Vke}
function xNd(e,t){let n=e.match(aIn),r=t.match(aIn),o=n?.[1]||"",s=r?.[1]||"";if(o!==s)return(J5i[o]??99)-(J5i[s]??99);let i=parseInt(n?.[2]||"0",10),a=parseInt(r?.[2]||"0",10);return i-a}
var Kke,p1t,Vke=void 0,iIn=void 0,J5i,aIn;
var Z$e=b(()=>{lt();qe();dn();Ct();ps();Kke=require("fs/promises"),p1t=require("path");J5i={setup:0,sessionstart:1,cwdchanged:2,filechanged:3},aIn=/^(setup|sessionstart|cwdchanged|filechanged)-hook-(\d+)\.sh$/});
export {uzr,X5i,Q5i,Rot,Z5i,xNd,Kke,p1t,Vke,iIn,J5i,aIn,Z$e};
