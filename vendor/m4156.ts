// @ts-nocheck
import {CIe,vce} from "../src/telemetry/4046_oldStart.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {_Ua,blo,wIe} from "./m4047.ts";
import {Ds,Iu} from "./m643.ts";
import {ER,bB} from "./m634.ts";
import {Pn,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Lq,ab} from "../src/config/3178_path.ts";
import {zt,qs} from "./m635.ts";
import {bwe,Pbn} from "./m2509.ts";
import {Nee} from "../src/tools/3222_name.ts";
import {Ie,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {b,M} from "../runtime.ts";
import {Ct} from "./m131.ts";
import {$u} from "../src/mcp/2194_mcpServerName.ts";
import {Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {Te} from "./m2253.ts";
function Sqa(e,t,n,r){let o=r==="single",s=CIe({filePath:e,oldContent:t,newContent:n,singleHunk:o});if(s.length===0)return[];if(o&&s.length>1)De(Error(`Unexpected number of hunks: ${s.length}. Expected 1 hunk.`));return _Ua(s)}
async function bqa(e,t,n,r){let o=!1,s=Ds(e),i="";try{i=ER(s)}catch(c){if(!Pn(c))throw c}async function a(){if(o)return;o=!0;try{await Vuo(r,l)}catch(c){logForDebugging(`Failed to close diff tab in IDE: ${c instanceof Error?c.message:String(c)}`,{level:"error"})}process.off("beforeExit",a),n.abortController.signal.removeEventListener("abort",a)}n.abortController.signal.addEventListener("abort",a),process.on("beforeExit",a);let l=Lq(n.options.mcpClients);try{let{updatedFile:c}=blo({filePath:s,fileContents:i,edits:t});if(!l||l.type!=="connected")throw Error("IDE client not available");let u=s,d=l.config.ideRunningInWindows===!0;if(zt()==="wsl"&&d&&process.env.WSL_DISTRO_NAME)u=await new bwe(process.env.WSL_DISTRO_NAME).toIDEPath(s);let p=await Nee("openDiff",{old_file_path:u,new_file_path:u,new_file_contents:c,tab_name:r},l),m=Array.isArray(p)?p:[p];if(pIp(m))return a(),{oldContent:i,newContent:m[1].text};else if(uIp(m))return a(),{oldContent:i,newContent:c};else if(dIp(m))return a(),{oldContent:i,newContent:i};throw Error("Not accepted")}catch(c){throw logForDebugging(`Failed to show diff in IDE: ${c instanceof Error?c.message:String(c)}`,{level:"error"}),a(),c}}
async function Vuo(e,t){try{if(!t||t.type!=="connected")throw Error("IDE client not available");await Nee("close_tab",{tab_name:e},t),Ie("ide_close_diff_tab")}catch(n){logForDebugging(`Failed to close diff tab in IDE: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),isTmuxControlMode("ide_close_diff_tab","ide_close_diff_tab_failed")}}
function uIp(e){return Array.isArray(e)&&typeof e[0]==="object"&&e[0]!==null&&"type"in e[0]&&e[0].type==="text"&&"text"in e[0]&&e[0].text==="TAB_CLOSED"}
function dIp(e){return Array.isArray(e)&&typeof e[0]==="object"&&e[0]!==null&&"type"in e[0]&&e[0].type==="text"&&"text"in e[0]&&e[0].text==="DIFF_REJECTED"}
function pIp(e){return Array.isArray(e)&&e[0]?.type==="text"&&e[0].text==="FILE_SAVED"&&typeof e[1].text==="string"}
var u9n;
var Eqa=b(()=>{Ct();$u();bB();Iu();ln();wIe();Qn();qe();vce();bt();ab();Pbn();Rn();qs();u9n=M(Te(),1)});
export {Sqa,bqa,Vuo,uIp,dIp,pIp,u9n,Eqa};
