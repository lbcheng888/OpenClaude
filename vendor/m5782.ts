// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {sJ,_Pe} from "./m4607.ts";
import {rGe,TVt} from "./m5125.ts";
import {Ygt,uVt,jgt,cVt,dVt} from "../src/permissions/5111_workerPid.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {Prt,formatPermissionRule} from "./m2695.ts";
import {tr,JY} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {bJn,SJn,EJn} from "./m5123.ts";
import {Vb,VT} from "./m648.ts";
import {_6,hPe} from "./m4606.ts";
var V9o={};
ft(V9o,{parseKindArgs:()=>parseKindArgs,handleListAllKinds:()=>handleListAllKinds,handleCliKind:()=>handleCliKind});
function XJ(e){process.stdout.write(e+`
`)}
function XXm(e){process.stderr.write(e+`
`)}
function Px(e){XXm(e),process.exit(1)}
function parseKindArgs(e,t){let n,r=new Map,o=!1,s=-1;for(let c=0;c<t.length;c++){let u=t[c];if(!u.startsWith("-")){s=c;break}if(u!=="--json"&&u.startsWith("--")&&!u.includes("="))c++}let i=s===-1?void 0:t[s],a;if(i===void 0||i==="list")a="list";else if(i==="add"||i==="remove")a=i;else Px(`unknown action '${i}' \u2014 expected: claude daemon ${e} <add|remove|list>`);let l=s===-1?t:[...t.slice(0,s),...t.slice(s+1)];for(let c=0;c<l.length;c++){let u=l[c];if(u==="--json")o=!0;else if(u.startsWith("--")){let d=u.indexOf("="),p=d!==-1?u.slice(2,d):u.slice(2);if(p==="add"||p==="remove")Px(`'${u}' is no longer supported \u2014 use: claude daemon ${e} <add|remove|list>`);r.set(p,d!==-1?u.slice(d+1):l[++c]??"")}else if(a==="remove"&&n===void 0)n=u;else Px(`unknown option '${u}' \u2014 expected: claude daemon ${e} <add|remove|list>`)}return{action:a,removeTarget:n,flags:r,json:o}}
async function Qrr(){if(!await sJ())Px("daemon service is not installed (service install is disabled in this version; the daemon runs on demand)")}
async function W9o(e){let t=await rGe(e);if(!t.ok)Px(t.error);return t.config}
async function QXm(e){let t=await W9o(e),n=[],r=t.remoteControl??[];for(let s of r)n.push({kind:"remote-control",dir:s.dir,name:s.name??ere.basename(s.dir),spawnMode:s.spawnMode??"same-dir"});let o=await Ygt(e);for(let s of o)n.push({kind:"scheduled",id:s.id,dir:s.directory,enabled:s.enabled,cron:s.cron});return n}
function G9o(e){if(e.length===0){XJ("(no entries)");return}let t=["kind","name/id","dir","extra"],n=e.map((s)=>[s.kind,s.id??s.name??"",s.dir,s.kind==="scheduled"?`${s.cron??""}${s.enabled===!1?" (disabled)":""}`:s.kind==="remote-control"?s.spawnMode??"":""]),r=t.map((s,i)=>Math.max(s.length,...n.map((a)=>a[i].length))),o=(s)=>s.map((i,a)=>i.padEnd(r[a])).join("  ");XJ(o(t)),XJ(r.map((s)=>"-".repeat(s)).join("  "));for(let s of n)XJ(o(s))}
async function ZXm(e,t){if(e.action==="list"){let y=await Ygt(t);if(e.json){XJ(TeamDeleteToolName(y,null,2));return}let S=y.map((E)=>({kind:"scheduled",id:E.id,dir:E.directory,enabled:E.enabled,cron:E.cron}));G9o(S);return}if(e.action==="remove"){if(!e.removeTarget)Px("usage: claude daemon scheduled remove <task-id>");if(await Qrr(),!await uVt(e.removeTarget,t))Px(`No scheduled task with id "${e.removeTarget}"`);XJ(`removed ${e.removeTarget}`);return}if(await Qrr(),e.flags.has("id")&&!e.flags.get("id"))Px("--id requires a non-empty value");if(e.flags.has("model")&&!e.flags.get("model"))Px("--model requires a non-empty value");function n(y){return jgt.includes(y)}if(e.flags.has("permission-mode")&&!n(e.flags.get("permission-mode")??""))Px(`--permission-mode must be one of ${jgt.join(", ")}`);let r=e.flags.get("prompt"),o=e.flags.get("id"),s=e.flags.get("dir"),i=ere.resolve(s??isTmuxControlMode());if(!o&&!r)Px("--prompt is required (or pass --id to update an existing task)");let a=o??eQm(i,r),c=(await Ygt(t)).find((y)=>y.id===a),u=r??c?.prompt,d=e.flags.get("cron")??c?.cron;if(!u)Px("--prompt is required");if(!d)Px("--cron is required");let p=Prt(d);if(p.error!==void 0)Px(`invalid --cron '${d}': ${p.error}`);let m=p.cron,f=s?ere.resolve(s):c?.directory??ere.resolve(isTmuxControlMode()),h=e.flags.get("permission-mode")??c?.permissionMode??"dontAsk",g=e.flags.get("model")??c?.model??void 0,{isPathTrusted:_}=await Promise.resolve().then(() => (tr(),JY));if(!_(f))Px(`${f} is not a trusted directory \u2014 run \`claude\` there once and accept the trust dialog.`);let T={...c&&{enabled:c.enabled,runTimeoutMinutes:c.runTimeoutMinutes,maxQueued:c.maxQueued},id:a,cron:m,prompt:u,directory:f,permissionMode:h,...g&&{model:g}};if(await cVt(T,t),c)XJ(`updated scheduled task '${a}'`);else XJ(`added scheduled task '${a}'`)}
function eQm(e,t){let n=(i)=>i.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,40),r=n(ere.basename(e)),o=n(t.split(/\s+/).slice(0,4).join(" "));return[r,o].filter(Boolean).join("-")||"task"}
async function tQm(e,t){if(e.action==="list"){let l=(await W9o(t)).remoteControl??[];if(e.json){XJ(TeamDeleteToolName(l,null,2));return}G9o(l.map((c)=>({kind:"remote-control",dir:c.dir,name:c.name??ere.basename(c.dir),spawnMode:c.spawnMode??"same-dir"})));return}if(e.action==="remove"){if(!e.removeTarget)Px("usage: claude daemon remote-control remove <name-or-dir>");await Qrr();let a=await nQm(e.removeTarget,t);await bJn(a,t),XJ(`removed ${a}`);return}await Qrr();let n=await Vb(ere.resolve(e.flags.get("dir")??isTmuxControlMode())),{isPathTrusted:r}=await Promise.resolve().then(() => (tr(),JY));if(!r(n))Px(`${n} is not a trusted directory \u2014 run \`claude\` there once and accept the trust dialog.`);let o=e.flags.get("name"),s=e.flags.get("spawn-mode");if(s!==void 0&&s!=="same-dir"&&s!=="worktree")Px(`--spawn-mode must be same-dir or worktree, got '${s}'`);let i=await SJn({dir:n,name:o,spawnMode:s},t);XJ(`${i} remote-control server for ${n}`)}
async function nQm(e,t){let r=(await W9o(t)).remoteControl??[],o=r.filter((a)=>(a.name??ere.basename(a.dir))===e);if(o.length===1)return o[0].dir;if(o.length>1)Px(`ambiguous: multiple remote-control servers match name '${e}'. Use a dir instead.`);let s=await Vb(ere.resolve(e)),i=[];for(let a of r)if(await Vb(a.dir)===s)i.push(a);if(i.length>=1)return i[0].dir;Px(`no remote-control server matched '${e}'`)}
async function handleListAllKinds(e,t=_6()){let n=await QXm(t);if(e){XJ(TeamDeleteToolName(n,null,2));return}G9o(n)}
async function handleCliKind(e,t,n=_6()){let r=parseKindArgs(e,t);if(e==="scheduled")return ZXm(r,n);return tQm(r,n)}
var ere;
var K9o=b(()=>{formatPermissionRule();Po();VT();tn();TVt();hPe();_Pe();EJn();dVt();ere=require("path")});
export {V9o,XJ,XXm,Px,parseKindArgs,Qrr,W9o,QXm,G9o,ZXm,eQm,tQm,nQm,handleListAllKinds,handleCliKind,ere,K9o};
