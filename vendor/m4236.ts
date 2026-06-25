// @ts-nocheck
import {xm,Jm} from "../src/config/2207_Jm.ts";
import {isProcessRunning,lE} from "./m1461.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ce,Ct} from "./m197.ts";
import {Cg,D_} from "../src/agent/2784_withFileTypes.ts";
import {getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {k5e,w6n} from "./m4235.ts";
import {b} from "../runtime.ts";
function e_o(){return nja.join(xm(),gUp)}
async function k6n(){try{return(await t9.stat(e_o())).mtimeMs}catch{return 0}}
async function rja(){let e=e_o(),t,n;try{let[o,s]=await Promise.all([t9.stat(e),t9.readFile(e,"utf8")]);t=o.mtimeMs;let i=parseInt(s.trim(),10);n=Number.isFinite(i)?i:void 0}catch{}if(t!==void 0&&Date.now()-t<_Up){if(n!==void 0&&isProcessRunning(n))return logForDebugging(`[autoDream] lock held by live PID ${n} (mtime ${Math.round((Date.now()-t)/1000)}s ago)`),null}await t9.mkdir(xm(),{recursive:!0}),await t9.writeFile(e,String(process.pid));let r;try{r=await t9.readFile(e,"utf8")}catch{return null}if(parseInt(r.trim(),10)!==process.pid)return null;return t??0}
async function H6n(e){let t=e_o();try{if(e===0){await t9.unlink(t);return}await t9.writeFile(t,"");let n=e/1000;await t9.utimes(t,n,n)}catch(n){logForDebugging(`[autoDream] rollback failed: ${Ce(n)} \u2014 next trigger delayed to minHours`)}}
async function oja(e){let t=Cg(getOriginalCwd());return(await k5e(t,!0)).filter((r)=>r.mtime>e).map((r)=>r.sessionId)}
var t9,nja,gUp=".consolidate-lock",_Up=3600000;
var I6n=b(()=>{lt();Jm();qe();Ct();lE();w6n();D_();t9=require("fs/promises"),nja=require("path")});
export {e_o,k6n,rja,H6n,oja,t9,nja,gUp,_Up,I6n};
