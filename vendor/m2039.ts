// @ts-nocheck
import {execFileNoThrow,oa} from "./m684.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getAttacherCaps,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function uVu(e){let t;try{t=new URL(e)}catch(n){throw Error(`Invalid URL format: ${e}`)}if(t.protocol!=="http:"&&t.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${t.protocol}`)}
async function $kt(e){try{let n="open",{code:r}=await execFileNoThrow(n,[e]);return r===0}catch(t){return!1}}
async function xhn(e){let t;try{t=new URL(e)}catch{return!1}let n=t.protocol;if(n==="file:"){if(t.host!=="")return!1;try{return await $kt(Ini.fileURLToPath(e))}catch{return!1}}if(!TMr.has(n))return logForDebugging(`[hyperlink] refusing to dispatch clicked link with non-allowlisted scheme ${n}`,{level:"warn"}),!1;return Dni(e)}
async function Oc(e){try{return uVu(e),await Dni(e)}catch(t){return!1}}
async function Dni(e){try{let t=getAttacherCaps()?.browser,n=t!==void 0?t??void 0:process.env.BROWSER,r="darwin";{let o=n||"open",{code:s}=await execFileNoThrow(o,[e]);return s===0}}catch(t){return!1}}
var Ini,TMr;
var b_=b(()=>{lt();qe();oa();Ini=require("url"),TMr=new Set(["https:","http:","vscode:","vscode-insiders:","cursor:","windsurf:","zed:","jetbrains:","idea:","slack:","linear:","notion:","figma:"])});
export {uVu,$kt,xhn,Oc,Dni,Ini,TMr,b_};
