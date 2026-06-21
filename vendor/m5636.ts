// @ts-nocheck
import {detectCurrentRepository,parseGitHubRepository,ZI} from "./m692.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {findGitRoot,Ba} from "./m693.ts";
import {A_,ng} from "./m132.ts";
import {getGlobalConfig,saveGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {ud,mc} from "../src/config/0645_maxBytes.ts";
import {getRemoteUrlForDir,vO} from "./m691.ts";
import {b} from "../runtime.ts";
class T1o{frameDurations=[];totalFrames=0;firstRenderTime;lastRenderTime;record(e){let t=performance.now();if(this.firstRenderTime===void 0)this.firstRenderTime=t;if(this.lastRenderTime=t,this.totalFrames++,this.frameDurations.push(e),this.frameDurations.length>3600)this.frameDurations.splice(0,this.frameDurations.length>>1)}getMetrics(){if(this.totalFrames===0||this.firstRenderTime===void 0||this.lastRenderTime===void 0)return;let e=this.lastRenderTime-this.firstRenderTime;if(e<=0)return;let t=this.totalFrames/(e/1000),n=this.frameDurations.slice().sort((i,a)=>a-i),r=Math.max(0,Math.ceil(n.length*0.01)-1),o=n[r],s=o>0?1000/o:0;return{averageFps:Math.round(t*100)/100,low1PctFps:Math.round(s*100)/100}}}
async function Nrc(){try{let e=await detectCurrentRepository();if(!e){logForDebugging("Not in a GitHub repository, skipping path mapping update");return}let t=getOriginalCwd(),r=findGitRoot(t)??t,o;try{o=A_(await Mrc.realpath(r))}catch{o=r}let s=e.toLowerCase(),a=getGlobalConfig().githubRepoPaths?.[s]??[];if(a[0]===o){logForDebugging(`Path ${o} already tracked for repo ${s}`);return}let l=a.filter((u)=>u!==o),c=[o,...l];saveGlobalConfig((u)=>({...u,githubRepoPaths:{...u.githubRepoPaths,[s]:c}})),logForDebugging(`Added ${o} to tracked paths for repo ${s}`)}catch(e){logForDebugging(`Error updating repo path mapping: ${e}`)}}
function QQn(e){let t=getGlobalConfig(),n=e.toLowerCase();return t.githubRepoPaths?.[n]??[]}
async function ZQn(e){let t=await Promise.all(e.map(ud));return e.filter((n,r)=>t[r])}
async function Brc(e,t){try{let n=await getRemoteUrlForDir(e);if(!n)return!1;let r=parseGitHubRepository(n);if(!r)return!1;return r.toLowerCase()===t.toLowerCase()}catch{return!1}}
function Frc(e,t){let n=getGlobalConfig(),r=e.toLowerCase(),o=n.githubRepoPaths?.[r]??[],s=o.filter((a)=>a!==t);if(s.length===o.length)return;let i={...n.githubRepoPaths};if(s.length===0)delete i[r];else i[r]=s;saveGlobalConfig((a)=>({...a,githubRepoPaths:i})),logForDebugging(`Removed ${t} from tracked paths for repo ${r}`)}
var Mrc;
var gVt=b(()=>{lt();ng();Qn();qe();ZI();mc();vO();Ba();Mrc=require("fs/promises")});
export {T1o,Nrc,QQn,ZQn,Brc,Frc,Mrc,gVt};
