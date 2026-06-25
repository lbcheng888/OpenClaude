// @ts-nocheck
import {detectCurrentRepository,parseGitHubRepository,_0} from "./m697.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {findGitRoot,ia} from "./m698.ts";
import {A_,zf} from "./m133.ts";
import {getGlobalConfig,saveGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {Gu,Xl} from "../src/config/0651_maxBytes.ts";
import {getRemoteUrlForDir,VP} from "./m696.ts";
import {b} from "../runtime.ts";
class W2o{frameDurations=[];totalFrames=0;firstRenderTime;lastRenderTime;record(e){let t=performance.now();if(this.firstRenderTime===void 0)this.firstRenderTime=t;if(this.lastRenderTime=t,this.totalFrames++,this.frameDurations.push(e),this.frameDurations.length>3600)this.frameDurations.splice(0,this.frameDurations.length>>1)}getMetrics(){if(this.totalFrames===0||this.firstRenderTime===void 0||this.lastRenderTime===void 0)return;let e=this.lastRenderTime-this.firstRenderTime;if(e<=0)return;let t=this.totalFrames/(e/1000),n=this.frameDurations.slice().sort((i,a)=>a-i),r=Math.max(0,Math.ceil(n.length*0.01)-1),o=n[r],s=o>0?1000/o:0;return{averageFps:Math.round(t*100)/100,low1PctFps:Math.round(s*100)/100}}}
async function Rpc(){try{let e=await detectCurrentRepository();if(!e){logForDebugging("Not in a GitHub repository, skipping path mapping update");return}let t=getOriginalCwd(),r=findGitRoot(t)??t,o;try{o=A_(await Apc.realpath(r))}catch{o=r}let s=e.toLowerCase(),a=getGlobalConfig().githubRepoPaths?.[s]??[];if(a[0]===o){logForDebugging(`Path ${o} already tracked for repo ${s}`);return}let l=a.filter((u)=>u!==o),c=[o,...l];saveGlobalConfig((u)=>({...u,githubRepoPaths:{...u.githubRepoPaths,[s]:c}})),logForDebugging(`Added ${o} to tracked paths for repo ${s}`)}catch(e){logForDebugging(`Error updating repo path mapping: ${e}`)}}
function nrr(e){let t=getGlobalConfig(),n=e.toLowerCase();return t.githubRepoPaths?.[n]??[]}
async function rrr(e){let t=await Promise.all(e.map(Gu));return e.filter((n,r)=>t[r])}
async function vpc(e,t){try{let n=await getRemoteUrlForDir(e);if(!n)return!1;let r=parseGitHubRepository(n);if(!r)return!1;return r.toLowerCase()===t.toLowerCase()}catch{return!1}}
function wpc(e,t){let n=getGlobalConfig(),r=e.toLowerCase(),o=n.githubRepoPaths?.[r]??[],s=o.filter((a)=>a!==t);if(s.length===o.length)return;let i={...n.githubRepoPaths};if(s.length===0)delete i[r];else i[r]=s;saveGlobalConfig((a)=>({...a,githubRepoPaths:i})),logForDebugging(`Removed ${t} from tracked paths for repo ${r}`)}
var Apc;
var Kzt=b(()=>{lt();zf();tr();qe();_0();Xl();VP();ia();Apc=require("fs/promises")});
export {W2o,Rpc,nrr,rrr,vpc,wpc,Apc,Kzt};
