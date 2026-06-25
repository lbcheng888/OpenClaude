// @ts-nocheck
import {execFileNoThrow,Ii} from "./m690.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getAttacherCaps,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function Htd(e){let t;try{t=new URL(e)}catch(n){throw Error(`Invalid URL format: ${e}`)}if(t.protocol!=="http:"&&t.protocol!=="https:")throw Error(`Invalid URL protocol: must use http:// or https://, got ${t.protocol}`)}
async function fxt(e){try{let n="open",{code:r}=await execFileNoThrow(n,[e]);return r===0}catch(t){return!1}}
async function lTn(e){let t;try{t=new URL(e)}catch{return!1}let n=t.protocol;if(n==="file:"){if(t.host!=="")return!1;try{return await fxt(vli.fileURLToPath(e))}catch{return!1}}if(!jBr.has(n))return logForDebugging(`[hyperlink] refusing to dispatch clicked link with non-allowlisted scheme ${n}`,{level:"warn"}),!1;return wli(e)}
async function Zl(e){try{return Htd(e),await wli(e)}catch(t){return!1}}
async function wli(e){try{let t=getAttacherCaps()?.browser,n=t!==void 0?t??void 0:process.env.BROWSER,r="darwin";{let o=n||"open",{code:s}=await execFileNoThrow(o,[e]);return s===0}}catch(t){return!1}}
var vli,jBr;
var Jg=b(()=>{lt();qe();Ii();vli=require("url"),jBr=new Set(["https:","http:","vscode:","vscode-insiders:","cursor:","windsurf:","zed:","jetbrains:","idea:","slack:","linear:","notion:","figma:"])});
export {Htd,fxt,lTn,Zl,wli,vli,jBr,Jg};
