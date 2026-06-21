// @ts-nocheck
import {st} from "../../vendor/m5.ts";
import {tr,sn} from "./0047_namespace.ts";
import {qt,Le,Xt} from "./0228_encoding.ts";
import {Rh,ok} from "../../vendor/m633.ts";
import {kn,SA} from "./0689_timestamp.ts";
import {lF,Mw} from "./2221_recursive.ts";
import {hac,Aac,_ac} from "./5692_pluginId.ts";
import {execFileNoThrow,oa} from "../../vendor/m684.ts";
import {L0e,M0e} from "./4434_path.ts";
import {resolvePluginRoot,gg} from "../agent/4445_resolvePluginRoot.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {setSyncedPluginDirs,lt} from "../session/0131_sent.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {b} from "../../runtime.ts";
function xVt(){return st(process.env.CLAUDE_CODE_SYNC_PLUGINS)}
function kVt(){let e=parseInt(process.env.CLAUDE_CODE_SYNC_PLUGINS_INSTALL_TIMEOUT_MS||"",10);return e>0?e:30000}
function kac(){let e=process.env.CLAUDE_CODE_SYNC_PLUGINS_MCP_TIMEOUT_MS;if(e!==void 0&&e!==""){let t=parseInt(e,10);if(Number.isFinite(t)&&t>=0)return t}return 1e4}
function Iac(){Rht??=rNo()}
function Dac(){return Rht??=rNo(),Rht}
function Pac(){return Rht=(Rht??Promise.resolve()).catch(()=>{}).then(()=>rNo()),Rht}
function Oac(){return mZn}
function HVt(){return nB.join(tr(),"plugins","synced")}
function Lac(){return nB.join(HVt(),xac)}
async function Mac(){try{let e=await II.readFile(Lac(),"utf8");return qt(e)}catch{return null}}
async function w4m(e){await II.mkdir(HVt(),{recursive:!0}),await Rh(Lac(),Le(e,null,2))}
function pZn(){return nB.join(HVt(),".staging")}
function RVt(e){let t=e.replace(/[<>:"|?*\\/]/g,"_"),n=t.toLowerCase();if(n===xac||n===".staging")throw Error("plugin name resolves to reserved path");let r=HVt(),o=nB.join(r,t),s=nB.relative(r,o);if(!s||nB.isAbsolute(s)||s===".."||s.startsWith(`..${nB.sep}`))throw Error(`invalid plugin name: ${e}`);return o}
function R4m(e,t){let n=new Map(t.map((l)=>[l.pluginId,l])),r=new Set(e.map((l)=>l.pluginId)),o=new Set,s=[],i=[];for(let l of e){let c=n.get(l.pluginId),u;try{u=RVt(l.name)}catch{if(kn("warn","plugins_sync_invalid_name"),c)i.push(c);continue}if(o.has(u)){if(kn("warn","plugins_sync_name_collision"),c)i.push(c);continue}if(o.add(u),!c||c.updatedAt!==l.updatedAt||c.name!==l.name)s.push({plugin:l,prev:c});else i.push(c)}let a=t.filter((l)=>!r.has(l.pluginId));return{toDownload:s,toRemove:a,carryover:i,liveDirs:o}}
async function Tac(e,t){let n=RVt(e.name),r=nB.join(pZn(),nB.relative(HVt(),n)),o=nB.join(lF(),`claude-plugin-${process.pid}-${Math.random().toString(36).slice(2)}.zip`);try{let s=Date.now(),i=await hac(e.pluginId,o);if(t.downloadMs.push(Date.now()-s),!i.ok)return i;let a=Date.now();try{await II.rm(r,{recursive:!0,force:!0}),await II.mkdir(pZn(),{recursive:!0});let l=await execFileNoThrow("unzip",["-q","-o",o,"-d",r]),c=l.code===0?await H4m(r).catch(()=>"walk_failed"):"unzip_failed";if(c!=="ok")kn("info","plugins_sync_unzip_fallback",{code:l.code,verdict:c}),await II.rm(r,{recursive:!0,force:!0}),await L0e(o,r);let u=await resolvePluginRoot(r),d=nB.join(pZn(),`.trash-${process.pid}-${Math.random().toString(36).slice(2)}`);try{await II.rename(n,d),Hac.push(II.rm(d,{recursive:!0,force:!0}).catch(()=>{}))}catch{await II.rm(n,{recursive:!0,force:!0})}return await II.rename(u,n),{ok:!0}}finally{t.extractMs.push(Date.now()-a)}}finally{await II.rm(o,{force:!0}).catch(()=>{}),await II.rm(r,{recursive:!0,force:!0}).catch(()=>{})}}
async function k4m(e,t){try{return await Tac(e,t)}catch{return kn("warn","plugins_sync_extract_retry"),await sleep(x4m),Tac(e,t)}}
async function H4m(e,t=v4m){let n=0,r;async function o(a){for(let l=0;l<a.length&&!r;l+=Sac){let c=a.slice(l,l+Sac);for(let u of await Promise.all(c.map((d)=>II.lstat(d))))if(n+=u.size,n>t){r="oversize";return}}}async function s(a){for(let l=0;l<a.length&&!r;l+=bac)await Promise.all(a.slice(l,l+bac).map(i))}async function i(a){if(r)return;let l=[],c=[];for(let u of await II.readdir(a,{withFileTypes:!0})){if(u.isSymbolicLink()){r="symlink";return}if(u.isDirectory())l.push(nB.join(a,u.name));else c.push(nB.join(a,u.name))}if(r)return;await Promise.all([o(c),s(l)])}return await i(e),r??"ok"}
async function Eac(e,t,n){let r=0,o=Array.from({length:Math.min(t,e.length)},async()=>{while(!0){let s=r++;if(s>=e.length)return;await n(e[s])}});await Promise.all(o)}
function Cac(e,t,n){let r=`${e.name}@synced`;mZn.push(t==="network-error"?{type:t,source:r,plugin:e.name,url:e.pluginId,details:n}:{type:t,source:r,plugin:e.name,error:n})}
async function rNo(){let e=Date.now();mZn=[];let t;try{t=Rac.monitorEventLoopDelay({resolution:20}),t.enable()}catch{}let n=()=>{if(!t)return{};return t.disable(),{loop_lag_p95_ms:Math.round(t.percentile(95)/1e6),loop_lag_max_ms:Math.round(t.max/1e6)}},r,o={downloadMs:[],extractMs:[]};try{kn("info","plugins_sync_starting");let s=Date.now(),i=await Aac();if(r=Date.now()-s,!i.success){let S=n();kn("warn","plugins_sync_list_failed",{duration_ms:Date.now()-e,list_ms:r,...S}),logEvent("tengu_plugins_sync_list_failed",{duration_ms:Date.now()-e,list_ms:r,...S}),await wac();return}let a=await Mac(),l=a!==null,{toDownload:c,toRemove:u,carryover:d,liveDirs:p}=R4m(i.plugins,a?.plugins??[]),m=async(S)=>{try{let v=RVt(S);if(p.has(v))return;await II.rm(v,{recursive:!0,force:!0})}catch{}};if(await Promise.all(Hac.splice(0)),await II.rm(pZn(),{recursive:!0,force:!0}).catch(()=>{}),c.length===0&&u.length===0){setSyncedPluginDirs([...p]),kn("info","plugins_sync_no_changes",{count:d.length,duration_ms:Date.now()-e,list_ms:r,had_manifest:l,...n()});return}let f=[],A=[],h=Date.now();await Eac(c,yac,async({plugin:S,prev:v})=>{let R;try{if(R=await k4m(S,o),!R.ok)kn("warn","plugins_sync_download_failed"),Cac(S,"network-error",R.reason)}catch(k){R={ok:!1,reason:Se(k)},kn("warn","plugins_sync_extract_failed"),Cac(S,"generic-error",R.reason)}if(R.ok){if(f.push(S),v&&v.name!==S.name)await m(v.name)}else if(v)A.push(v)});let g=Date.now()-h,_=vac(o);await Eac(u,yac,(S)=>m(S.name));let y=[...d,...f,...A];setSyncedPluginDirs(y.map((S)=>RVt(S.name))),await w4m({lastUpdated:Date.now(),plugins:y});let T=n();kn("info","plugins_sync_complete",{downloaded:f.length,removed:u.length,failed:mZn.length,duration_ms:Date.now()-e,list_ms:r,download_extract_ms:g,had_manifest:l,..._,...T}),logEvent("tengu_plugins_sync_success",{downloaded:f.length,removed:u.length,total:i.plugins.length,duration_ms:Date.now()-e,list_ms:r,download_extract_ms:g,had_manifest:l,..._,...T})}catch(s){let i=n(),a={...r!==void 0&&{list_ms:r},...o.downloadMs.length>0&&vac(o)};kn("error","plugins_sync_unexpected_error",{kind:s instanceof Error?s.constructor.name:"unknown",duration_ms:Date.now()-e,...a,...i}),logEvent("tengu_plugins_sync_error",{duration_ms:Date.now()-e,...a,...i}),await wac()}}
function vac(e){return{download_ms_sum:e.downloadMs.reduce((t,n)=>t+n,0),download_ms_max:Math.max(0,...e.downloadMs),extract_ms_sum:e.extractMs.reduce((t,n)=>t+n,0),extract_ms_max:Math.max(0,...e.extractMs)}}
async function wac(){let e=await Mac();if(!e)return;let t=[];for(let n of e.plugins)try{t.push(RVt(n.name))}catch{}setSyncedPluginDirs(t)}
var II,nB,Rac,yac=6,xac="manifest.json",v4m=536870912,Rht=null,mZn,Hac,x4m=500,Sac=256,bac=16;
var oNo=b(()=>{lt();ok();SA();sn();bt();oa();gg();M0e();Xt();Mw();Ct();_ac();II=require("fs/promises"),nB=require("path"),Rac=require("perf_hooks");mZn=[],Hac=[]});
export {xVt,kVt,kac,Iac,Dac,Pac,Oac,HVt,Lac,Mac,w4m,pZn,RVt,R4m,Tac,k4m,H4m,Eac,Cac,rNo,vac,wac,II,nB,Rac,yac,xac,v4m,Rht,mZn,Hac,x4m,Sac,bac,oNo};
