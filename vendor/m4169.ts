// @ts-nocheck
import {W0e,oce} from "../src/telemetry/3912_oldStart.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {vBa,Iuo,V0e} from "./m3913.ts";
import {hs,Tu} from "./m649.ts";
import {Ov,GN} from "./m640.ts";
import {In,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {X4,uS} from "../src/config/3192_path.ts";
import {Yt,Es} from "./m641.ts";
import {awe,SRn} from "./m2519.ts";
import {xee} from "../src/tools/3238_name.ts";
import {He,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {b,x} from "../runtime.ts";
import {kt} from "./m132.ts";
import {vu} from "../src/mcp/2200_mcpServerName.ts";
import {tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {et} from "./m2261.ts";
function IVa(e,t,n,r){let o=r==="single",s=W0e({filePath:e,oldContent:t,newContent:n,singleHunk:o});if(s.length===0)return[];if(o&&s.length>1)Ie(Error(`Unexpected number of hunks: ${s.length}. Expected 1 hunk.`));return vBa(s)}
async function xVa(e,t,n,r){let o=!1,s=hs(e),i="";try{i=Ov(s)}catch(c){if(!In(c))throw c}async function a(){if(o)return;o=!0;try{await Oho(r,l)}catch(c){logForDebugging(`Failed to close diff tab in IDE: ${c instanceof Error?c.message:String(c)}`,{level:"error"})}process.off("beforeExit",a),n.abortController.signal.removeEventListener("abort",a)}n.abortController.signal.addEventListener("abort",a),process.on("beforeExit",a);let l=X4(n.options.mcpClients);try{let{updatedFile:c}=Iuo({filePath:s,fileContents:i,edits:t});if(!l||l.type!=="connected")throw Error("IDE client not available");let u=s,d=l.config.ideRunningInWindows===!0;if(Yt()==="wsl"&&d&&process.env.WSL_DISTRO_NAME)u=await new awe(process.env.WSL_DISTRO_NAME).toIDEPath(s);let p=await xee("openDiff",{old_file_path:u,new_file_path:u,new_file_contents:c,tab_name:r},l),m=Array.isArray(p)?p:[p];if(HNp(m))return a(),{oldContent:i,newContent:m[1].text};else if(wNp(m))return a(),{oldContent:i,newContent:c};else if(kNp(m))return a(),{oldContent:i,newContent:i};throw Error("Not accepted")}catch(c){throw logForDebugging(`Failed to show diff in IDE: ${c instanceof Error?c.message:String(c)}`,{level:"error"}),a(),c}}
async function Oho(e,t){try{if(!t||t.type!=="connected")throw Error("IDE client not available");await xee("close_tab",{tab_name:e},t),He("ide_close_diff_tab")}catch(n){logForDebugging(`Failed to close diff tab in IDE: ${n instanceof Error?n.message:String(n)}`,{level:"error"}),Pt("ide_close_diff_tab","ide_close_diff_tab_failed")}}
function wNp(e){return Array.isArray(e)&&typeof e[0]==="object"&&e[0]!==null&&"type"in e[0]&&e[0].type==="text"&&"text"in e[0]&&e[0].text==="TAB_CLOSED"}
function kNp(e){return Array.isArray(e)&&typeof e[0]==="object"&&e[0]!==null&&"type"in e[0]&&e[0].type==="text"&&"text"in e[0]&&e[0].text==="DIFF_REJECTED"}
function HNp(e){return Array.isArray(e)&&e[0]?.type==="text"&&e[0].text==="FILE_SAVED"&&typeof e[1].text==="string"}
var cqn;
var DVa=b(()=>{kt();vu();GN();Tu();mn();V0e();tr();qe();oce();Ct();uS();SRn();vn();Es();cqn=x(et(),1)});
export {IVa,xVa,Oho,wNp,kNp,HNp,cqn,DVa};
