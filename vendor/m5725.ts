// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {c3o} from "./m4.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {jJl,str} from "./m5425.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {Hjl,Oer} from "./m5377.ts";
import {_hc,Shc} from "./m5724.ts";
import {pBo,fBo} from "./m5426.ts";
import {nrr,rrr,Kzt} from "./m5673.ts";
var bhc={};
ft(bhc,{waitForUrlEvent:()=>waitForUrlEvent});
function C7m(){if(Arr)return Arr;try{return Arr=c3o(),Arr}catch{return null}}
function waitForUrlEvent(e){let t=C7m();if(!t)return null;return t.waitForUrlEvent(e)}
var Arr=null;
var Ehc=()=>{};
var S$o={};
ft(S$o,{handleUrlSchemeLaunch:()=>handleUrlSchemeLaunch,handleDeepLinkUri:()=>handleDeepLinkUri});
async function handleDeepLinkUri(e){logForDebugging(`Handling deep link URI: ${e}`);let t;try{t=jJl(e)}catch(a){let l=a instanceof Error?a.message:String(a);return console.error(`Deep link error: ${l}`),xe("deep_link_handle","parse_failed"),1}logForDebugging(`Parsed deep link action: ${TeamDeleteToolName(t)}`);let n=await Chc.realpath(process.execPath).catch(()=>process.execPath),{cwd:r,resolvedRepo:o}=await v7m(t),s=o?await Hjl(r):void 0,i;try{i=await _hc(n,{query:t.query,cwd:r,repo:o,lastFetchMs:s?.getTime()})}catch(a){let l=a instanceof Error?a.message:String(a);return console.error(`Deep link error: ${l}`),xe("deep_link_handle","launch_error"),1}if(!i)return console.error("Failed to open a terminal. Make sure a supported terminal emulator is installed."),xe("deep_link_handle","no_terminal"),1;return He("deep_link_handle"),0}
async function handleUrlSchemeLaunch(){if(process.env.__CFBundleIdentifier!==pBo)return null;try{let{waitForUrlEvent:e}=await Promise.resolve().then(() => (Ehc(),bhc)),t=e(5000);if(!t)return null;return await handleDeepLinkUri(t)}catch{return null}}
async function v7m(e){if(e.cwd)return{cwd:e.cwd};if(e.repo){let t=nrr(e.repo),n=await rrr(t);if(n[0])return logForDebugging(`Resolved repo ${e.repo} \u2192 ${n[0]}`),{cwd:n[0],resolvedRepo:e.repo};logForDebugging(`No local clone found for repo ${e.repo}, falling back to home`)}return{cwd:Ahc.homedir()}}
var Chc,Ahc;
var b$o=b(()=>{mn();qe();Kzt();tn();Oer();str();fBo();Shc();Chc=require("fs/promises"),Ahc=require("os")});
export {bhc,C7m,waitForUrlEvent,Arr,Ehc,S$o,handleDeepLinkUri,handleUrlSchemeLaunch,v7m,Chc,Ahc,b$o};
