// @ts-nocheck
import {gf,tA} from "../src/config/2201_tA.ts";
import {isProcessRunning,rE} from "./m1456.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Se,bt} from "./m195.ts";
import {_g,ry} from "../src/agent/2772_withFileTypes.ts";
import {getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {o6e,S3n} from "./m4217.ts";
import {b} from "../runtime.ts";
function spo(){return M8a.join(gf(),XDp)}
async function b3n(){try{return(await O9.stat(spo())).mtimeMs}catch{return 0}}
async function N8a(){let e=spo(),t,n;try{let[o,s]=await Promise.all([O9.stat(e),O9.readFile(e,"utf8")]);t=o.mtimeMs;let i=parseInt(s.trim(),10);n=Number.isFinite(i)?i:void 0}catch{}if(t!==void 0&&Date.now()-t<QDp){if(n!==void 0&&isProcessRunning(n))return logForDebugging(`[autoDream] lock held by live PID ${n} (mtime ${Math.round((Date.now()-t)/1000)}s ago)`),null}await O9.mkdir(gf(),{recursive:!0}),await O9.writeFile(e,String(process.pid));let r;try{r=await O9.readFile(e,"utf8")}catch{return null}if(parseInt(r.trim(),10)!==process.pid)return null;return t??0}
async function E3n(e){let t=spo();try{if(e===0){await O9.unlink(t);return}await O9.writeFile(t,"");let n=e/1000;await O9.utimes(t,n,n)}catch(n){logForDebugging(`[autoDream] rollback failed: ${Se(n)} \u2014 next trigger delayed to minHours`)}}
async function B8a(e){let t=_g(getOriginalCwd());return(await o6e(t,!0)).filter((r)=>r.mtime>e).map((r)=>r.sessionId)}
var O9,M8a,XDp=".consolidate-lock",QDp=3600000;
var C3n=b(()=>{lt();tA();qe();bt();rE();S3n();ry();O9=require("fs/promises"),M8a=require("path")});
export {spo,b3n,N8a,E3n,B8a,O9,M8a,XDp,QDp,C3n};
