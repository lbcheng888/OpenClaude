// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {jt,ws} from "./m228.ts";
import {dn,Se,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function I5r(){let e=POt.join(tr(),"session-env",getSessionId());return await jt().mkdir(e),e}
async function i$i(e,t){let n=e.toLowerCase();return POt.join(await I5r(),`${n}-hook-${t}.sh`)}
async function a$i(){try{let e=await I5r(),t=await ixe.readdir(e);await Promise.all(t.filter((n)=>(n.startsWith("filechanged-hook-")||n.startsWith("cwdchanged-hook-"))&&bRn.test(n)).map((n)=>ixe.writeFile(POt.join(e,n),"")))}catch(e){if(dn(e)!=="ENOENT")logForDebugging(`Failed to clear cwd env files: ${Se(e)}`)}}
function Tnt(){logForDebugging("Invalidating session environment cache"),sxe=void 0,SRn=void 0}
async function l$i(){let e=getSessionId();if(sxe!==void 0&&SRn===e)return sxe;let t=[],n=process.env.CLAUDE_ENV_FILE;if(n)try{let o=(await ixe.readFile(n,"utf8")).trim();if(o)t.push(o),logForDebugging(`Session environment loaded from CLAUDE_ENV_FILE: ${n} (${o.length} chars)`)}catch(o){if(dn(o)!=="ENOENT")logForDebugging(`Failed to read CLAUDE_ENV_FILE: ${Se(o)}`)}let r=await I5r();try{let s=(await ixe.readdir(r)).filter((i)=>bRn.test(i)).sort(Gxd);for(let i of s){let a=POt.join(r,i);try{let l=(await ixe.readFile(a,"utf8")).trim();if(l)t.push(l)}catch(l){if(dn(l)!=="ENOENT")logForDebugging(`Failed to read hook file ${a}: ${Se(l)}`)}}if(s.length>0)logForDebugging(`Session environment loaded from ${s.length} hook file(s)`)}catch(o){if(dn(o)!=="ENOENT")logForDebugging(`Failed to load session environment from hooks: ${Se(o)}`)}if(t.length===0)return logForDebugging("No session environment scripts found"),sxe=null,SRn=e,sxe;return sxe=t.join(`
`),SRn=e,logForDebugging(`Session environment script ready (${sxe.length} chars total)`),sxe}
function Gxd(e,t){let n=e.match(bRn),r=t.match(bRn),o=n?.[1]||"",s=r?.[1]||"";if(o!==s)return(s$i[o]??99)-(s$i[s]??99);let i=parseInt(n?.[2]||"0",10),a=parseInt(r?.[2]||"0",10);return i-a}
var ixe,POt,sxe=void 0,SRn=void 0,s$i,bRn;
var K2e=b(()=>{lt();qe();sn();bt();ws();ixe=require("fs/promises"),POt=require("path");s$i={setup:0,sessionstart:1,cwdchanged:2,filechanged:3},bRn=/^(setup|sessionstart|cwdchanged|filechanged)-hook-(\d+)\.sh$/});
export {I5r,i$i,a$i,Tnt,l$i,Gxd,ixe,POt,sxe,SRn,s$i,bRn,K2e};
