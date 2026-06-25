// @ts-nocheck
import {T5,tI} from "./m465.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {du,iw} from "./m2302.ts";
import {getAttacherCaps,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
function bnm(e){return!!T5(e)}
function oyl(e){let t=e.trim().split(/\s+/);for(let n of t){if(/^\/[^/]+$/.test(n))continue;if(n.startsWith("-"))continue;let r=i7n.basename(n);if(Enm.has(r.toLowerCase()))continue;return r}return i7n.basename(t[0]??e)}
function gvo(e){let t=oyl(e);return Cnm.find((n)=>t.includes(n))}
function vnm(e,t,n){if(!n)return[t];if(Rnm.has(e))return["-g",`${t}:${n}`];if(e==="subl")return[`${t}:${n}`];return[t]}
function syl(e,t){let n=T6();if(!n)return!1;let r=n.split(" "),o=r[0]??n,s=r.slice(1),i=gvo(n);if(i){let c=vnm(i,e,t),u={detached:!0,stdio:"ignore"},d;return d=a7n.spawn(o,[...s,...c],u),d.on("error",(p)=>logForDebugging(`editor spawn failed: ${p}`,{level:"error"})),d.unref(),!0}let a=du.get(process.stdout);if(!a)return!1;let l=t&&Anm.test(i7n.basename(o));a.enterAlternateScreen();try{let c={stdio:"inherit"},u;{let d=[...s,...l?[`+${t}`,e]:[e]];u=a7n.spawnSync(o,d,c)}if(u.error)return logForDebugging(`editor spawn failed: ${u.error}`,{level:"error"}),!1;return!0}finally{a.exitAlternateScreen()}}
function T6(){return getAttacherCaps()?.editor??wnm()}
function _vo(){let e=T6();if(!e)return;let t=oyl(e);return t&&t.length<=8?t:void 0}
var a7n,i7n,Enm,Cnm,Anm,Rnm,wnm;
var TPe=b(()=>{Wi();lt();iw();qe();tI();a7n=require("child_process"),i7n=require("path");Enm=new Set(["start","cmd","cmd.exe"]);Cnm=["code","cursor","windsurf","codium","subl","atom","gedit","notepad++","notepad"],Anm=/\b(vi|vim|nvim|nano|emacs|pico|micro|helix|hx)\b/,Rnm=new Set(["code","cursor","windsurf","codium"]);wnm=Hn(()=>{if(process.env.VISUAL?.trim())return process.env.VISUAL.trim();if(process.env.EDITOR?.trim())return process.env.EDITOR.trim();return["code","vi","nano"].find((t)=>bnm(t))})});
export {bnm,oyl,gvo,vnm,syl,T6,_vo,a7n,i7n,Enm,Cnm,Anm,Rnm,wnm,TPe};
