// @ts-nocheck
import {r8,XI} from "./m459.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {qu,bk} from "./m2291.ts";
import {getAttacherCaps,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
function _Kp(e){return!!r8(e)}
function bul(e){let t=e.trim().split(/\s+/);for(let n of t){if(/^\/[^/]+$/.test(n))continue;if(n.startsWith("-"))continue;let r=v5n.basename(n);if(yKp.has(r.toLowerCase()))continue;return r}return v5n.basename(t[0]??e)}
function nSo(e){let t=bul(e);return TKp.find((n)=>t.includes(n))}
function EKp(e,t,n){if(!n)return[t];if(bKp.has(e))return["-g",`${t}:${n}`];if(e==="subl")return[`${t}:${n}`];return[t]}
function Eul(e,t){let n=Q6();if(!n)return!1;let r=n.split(" "),o=r[0]??n,s=r.slice(1),i=nSo(n);if(i){let c=EKp(i,e,t),u={detached:!0,stdio:"ignore"},d;return d=w5n.spawn(o,[...s,...c],u),d.on("error",(p)=>logForDebugging(`editor spawn failed: ${p}`,{level:"error"})),d.unref(),!0}let a=qu.get(process.stdout);if(!a)return!1;let l=t&&SKp.test(v5n.basename(o));a.enterAlternateScreen();try{let c={stdio:"inherit"},u;{let d=[...s,...l?[`+${t}`,e]:[e]];u=w5n.spawnSync(o,d,c)}if(u.error)return logForDebugging(`editor spawn failed: ${u.error}`,{level:"error"}),!1;return!0}finally{a.exitAlternateScreen()}}
function Q6(){return getAttacherCaps()?.editor??CKp()}
function rSo(){let e=Q6();if(!e)return;let t=bul(e);return t&&t.length<=8?t:void 0}
var w5n,v5n,yKp,TKp,SKp,bKp,CKp;
var TDe=b(()=>{ta();lt();bk();qe();XI();w5n=require("child_process"),v5n=require("path");yKp=new Set(["start","cmd","cmd.exe"]);TKp=["code","cursor","windsurf","codium","subl","atom","gedit","notepad++","notepad"],SKp=/\b(vi|vim|nvim|nano|emacs|pico|micro|helix|hx)\b/,bKp=new Set(["code","cursor","windsurf","codium"]);CKp=wn(()=>{if(process.env.VISUAL?.trim())return process.env.VISUAL.trim();if(process.env.EDITOR?.trim())return process.env.EDITOR.trim();return["code","vi","nano"].find((t)=>_Kp(t))})});
export {_Kp,bul,nSo,EKp,Eul,Q6,rSo,w5n,v5n,yKp,TKp,SKp,bKp,CKp,TDe};
