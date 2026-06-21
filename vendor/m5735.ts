// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {TJ,gDe} from "./m4579.ts";
import {A8e,J8t} from "./m5095.ts";
import {Dft,$8t,Ift,U8t,q8t} from "../src/permissions/5081_workerPid.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {Pt,Go} from "./m632.ts";
import {Htt,Az} from "./m2683.ts";
import {Qn,pJ} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {x7n,R7n,k7n} from "./m5093.ts";
import {$b,QT} from "./m642.ts";
import {X6,ADe} from "./m4578.ts";
var QNo={};
isFullscreenWithTTY(QNo,{parseKindArgs:()=>parseKindArgs,handleListAllKinds:()=>handleListAllKinds,handleCliKind:()=>handleCliKind});
function cX(e){process.stdout.write(e+`
`)}
function W6m(e){process.stderr.write(e+`
`)}
function ED(e){W6m(e),process.exit(1)}
function parseKindArgs(e,t){let n,r=new Map,o=!1,s=-1;for(let c=0;c<t.length;c++){let u=t[c];if(!u.startsWith("-")){s=c;break}if(u!=="--json"&&u.startsWith("--")&&!u.includes("="))c++}let i=s===-1?void 0:t[s],a;if(i===void 0||i==="list")a="list";else if(i==="add"||i==="remove")a=i;else ED(`unknown action '${i}' \u2014 expected: claude daemon ${e} <add|remove|list>`);let l=s===-1?t:[...t.slice(0,s),...t.slice(s+1)];for(let c=0;c<l.length;c++){let u=l[c];if(u==="--json")o=!0;else if(u.startsWith("--")){let d=u.indexOf("="),p=d!==-1?u.slice(2,d):u.slice(2);if(p==="add"||p==="remove")ED(`'${u}' is no longer supported \u2014 use: claude daemon ${e} <add|remove|list>`);r.set(p,d!==-1?u.slice(d+1):l[++c]??"")}else if(a==="remove"&&n===void 0)n=u;else ED(`unknown option '${u}' \u2014 expected: claude daemon ${e} <add|remove|list>`)}return{action:a,removeTarget:n,flags:r,json:o}}
async function PZn(){if(!await TJ())ED("daemon service is not installed (service install is disabled in this version; the daemon runs on demand)")}
async function JNo(e){let t=await A8e(e);if(!t.ok)ED(t.error);return t.config}
async function G6m(e){let t=await JNo(e),n=[],r=t.remoteControl??[];for(let s of r)n.push({kind:"remote-control",dir:s.dir,name:s.name??rre.basename(s.dir),spawnMode:s.spawnMode??"same-dir"});let o=await Dft(e);for(let s of o)n.push({kind:"scheduled",id:s.id,dir:s.directory,enabled:s.enabled,cron:s.cron});return n}
function XNo(e){if(e.length===0){cX("(no entries)");return}let t=["kind","name/id","dir","extra"],n=e.map((s)=>[s.kind,s.id??s.name??"",s.dir,s.kind==="scheduled"?`${s.cron??""}${s.enabled===!1?" (disabled)":""}`:s.kind==="remote-control"?s.spawnMode??"":""]),r=t.map((s,i)=>Math.max(s.length,...n.map((a)=>a[i].length))),o=(s)=>s.map((i,a)=>i.padEnd(r[a])).join("  ");cX(o(t)),cX(r.map((s)=>"-".repeat(s)).join("  "));for(let s of n)cX(o(s))}
async function V6m(e,t){if(e.action==="list"){let y=await Dft(t);if(e.json){cX(Le(y,null,2));return}let T=y.map((S)=>({kind:"scheduled",id:S.id,dir:S.directory,enabled:S.enabled,cron:S.cron}));XNo(T);return}if(e.action==="remove"){if(!e.removeTarget)ED("usage: claude daemon scheduled remove <task-id>");if(await PZn(),!await $8t(e.removeTarget,t))ED(`No scheduled task with id "${e.removeTarget}"`);cX(`removed ${e.removeTarget}`);return}if(await PZn(),e.flags.has("id")&&!e.flags.get("id"))ED("--id requires a non-empty value");if(e.flags.has("model")&&!e.flags.get("model"))ED("--model requires a non-empty value");function n(y){return Ift.includes(y)}if(e.flags.has("permission-mode")&&!n(e.flags.get("permission-mode")??""))ED(`--permission-mode must be one of ${Ift.join(", ")}`);let r=e.flags.get("prompt"),o=e.flags.get("id"),s=e.flags.get("dir"),i=rre.resolve(s??Pt());if(!o&&!r)ED("--prompt is required (or pass --id to update an existing task)");let a=o??K6m(i,r),c=(await Dft(t)).find((y)=>y.id===a),u=r??c?.prompt,d=e.flags.get("cron")??c?.cron;if(!u)ED("--prompt is required");if(!d)ED("--cron is required");let p=Htt(d);if(p.error!==void 0)ED(`invalid --cron '${d}': ${p.error}`);let m=p.cron,f=s?rre.resolve(s):c?.directory??rre.resolve(Pt()),A=e.flags.get("permission-mode")??c?.permissionMode??"dontAsk",h=e.flags.get("model")??c?.model??void 0,{isPathTrusted:g}=await Promise.resolve().then(() => (Qn(),pJ));if(!g(f))ED(`${f} is not a trusted directory \u2014 run \`claude\` there once and accept the trust dialog.`);let _={...c&&{enabled:c.enabled,runTimeoutMinutes:c.runTimeoutMinutes,maxQueued:c.maxQueued},id:a,cron:m,prompt:u,directory:f,permissionMode:A,...h&&{model:h}};if(await U8t(_,t),c)cX(`updated scheduled task '${a}'`);else cX(`added scheduled task '${a}'`)}
function K6m(e,t){let n=(i)=>i.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40),r=n(rre.basename(e)),o=n(t.split(/\s+/).slice(0,4).join(" "));return[r,o].filter(Boolean).join("-")||"task"}
async function z6m(e,t){if(e.action==="list"){let l=(await JNo(t)).remoteControl??[];if(e.json){cX(Le(l,null,2));return}XNo(l.map((c)=>({kind:"remote-control",dir:c.dir,name:c.name??rre.basename(c.dir),spawnMode:c.spawnMode??"same-dir"})));return}if(e.action==="remove"){if(!e.removeTarget)ED("usage: claude daemon remote-control remove <name-or-dir>");await PZn();let a=await Y6m(e.removeTarget,t);await x7n(a,t),cX(`removed ${a}`);return}await PZn();let n=await $b(rre.resolve(e.flags.get("dir")??Pt())),{isPathTrusted:r}=await Promise.resolve().then(() => (Qn(),pJ));if(!r(n))ED(`${n} is not a trusted directory \u2014 run \`claude\` there once and accept the trust dialog.`);let o=e.flags.get("name"),s=e.flags.get("spawn-mode");if(s!==void 0&&s!=="same-dir"&&s!=="worktree")ED(`--spawn-mode must be same-dir or worktree, got '${s}'`);let i=await R7n({dir:n,name:o,spawnMode:s},t);cX(`${i} remote-control server for ${n}`)}
async function Y6m(e,t){let r=(await JNo(t)).remoteControl??[],o=r.filter((a)=>(a.name??rre.basename(a.dir))===e);if(o.length===1)return o[0].dir;if(o.length>1)ED(`ambiguous: multiple remote-control servers match name '${e}'. Use a dir instead.`);let s=await $b(rre.resolve(e)),i=[];for(let a of r)if(await $b(a.dir)===s)i.push(a);if(i.length>=1)return i[0].dir;ED(`no remote-control server matched '${e}'`)}
async function handleListAllKinds(e,t=X6()){let n=await G6m(t);if(e){cX(Le(n,null,2));return}XNo(n)}
async function handleCliKind(e,t,n=X6()){let r=parseKindArgs(e,t);if(e==="scheduled")return V6m(r,n);return z6m(r,n)}
var rre;
var ZNo=b(()=>{Az();Go();QT();Xt();J8t();ADe();gDe();k7n();q8t();rre=require("path")});
export {QNo,cX,W6m,ED,parseKindArgs,PZn,JNo,G6m,XNo,V6m,K6m,z6m,Y6m,handleListAllKinds,handleCliKind,rre,ZNo};
