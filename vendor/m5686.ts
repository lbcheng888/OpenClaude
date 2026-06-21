// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {yBo} from "./m4.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {u5l,oXn} from "./m5391.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {X6l,LJn} from "./m5345.ts";
import {Ric,Hic} from "./m5685.ts";
import {KOo,YOo} from "./m5392.ts";
import {QQn,ZQn,gVt} from "./m5636.ts";
var Iic={};
isFullscreenWithTTY(Iic,{waitForUrlEvent:()=>waitForUrlEvent});
function J3m(){if(uZn)return uZn;try{return uZn=yBo(),uZn}catch{return null}}
function waitForUrlEvent(e){let t=J3m();if(!t)return null;return t.waitForUrlEvent(e)}
var uZn=null;
var Dic=()=>{};
var z1o={};
isFullscreenWithTTY(z1o,{handleUrlSchemeLaunch:()=>handleUrlSchemeLaunch,handleDeepLinkUri:()=>handleDeepLinkUri});
async function handleDeepLinkUri(e){logForDebugging(`Handling deep link URI: ${e}`);let t;try{t=u5l(e)}catch(a){let l=a instanceof Error?a.message:String(a);return console.error(`Deep link error: ${l}`),Oe("deep_link_handle","parse_failed"),1}logForDebugging(`Parsed deep link action: ${Le(t)}`);let n=await Pic.realpath(process.execPath).catch(()=>process.execPath),{cwd:r,resolvedRepo:o}=await Z3m(t),s=o?await X6l(r):void 0,i;try{i=await Ric(n,{query:t.query,cwd:r,repo:o,lastFetchMs:s?.getTime()})}catch(a){let l=a instanceof Error?a.message:String(a);return console.error(`Deep link error: ${l}`),Oe("deep_link_handle","launch_error"),1}if(!i)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),Oe("deep_link_handle","no_terminal"),1;return Ie("deep_link_handle"),0}
async function handleUrlSchemeLaunch(){if(process.env.__CFBundleIdentifier!==KOo)return null;try{let{waitForUrlEvent:e}=await Promise.resolve().then(() => (Dic(),Iic)),t=e(5000);if(!t)return null;return await handleDeepLinkUri(t)}catch{return null}}
async function Z3m(e){if(e.cwd)return{cwd:e.cwd};if(e.repo){let t=QQn(e.repo),n=await ZQn(t);if(n[0])return logForDebugging(`Resolved repo ${e.repo} \u2192 ${n[0]}`),{cwd:n[0],resolvedRepo:e.repo};logForDebugging(`No local clone found for repo ${e.repo}, falling back to home`)}return{cwd:Oic.homedir()}}
var Pic,Oic;
var Y1o=b(()=>{ln();qe();gVt();Xt();LJn();oXn();YOo();Hic();Pic=require("fs/promises"),Oic=require("os")});
export {Iic,J3m,waitForUrlEvent,uZn,Dic,z1o,handleDeepLinkUri,handleUrlSchemeLaunch,Z3m,Pic,Oic,Y1o};
