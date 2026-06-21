// @ts-nocheck
import {qfe,GO} from "../src/telemetry/2241_GO.ts";
import {vK,lE,tA} from "../src/config/2201_tA.ts";
import {Lfe,Ev} from "./m2211.ts";
import {yyn,OFe,Thi,yhi,JHt} from "./m2238.ts";
import {Rtt,T2e} from "./m2680.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function $1i(e){if(!e.endsWith(".md"))return!1;if(qfe(e))return!1;return vK(e)}
function MEd(e){return lE()&&$1i(e)}
function q1i(e,{defaults:t={},overrides:n={}}){if(!Lfe.test(e))return e;let{frontmatter:r,body:o}=yyn(e),s=([l,c])=>OFe(r,l)!==c,i=Object.entries(t).filter(([l])=>OFe(r,l)===null),a=Object.entries(n).filter(s);if(i.length+a.length===0)return e;return Thi(yhi(r,Object.fromEntries([...i,...a])),o)}
function Vvn(e,t){if(!$1i(e))return t;return q1i(t,{defaults:{...lE()&&{created:Rtt()},originSessionId:getSessionId()}})}
function W1i(){let e=new Map;j1i=async(t)=>{if(!MEd(t))return;let n=Rtt();if(e.get(t)===n)return;e.set(t,n);let r,o;try{r=(await ERe.stat(t)).mtime,o=await ERe.readFile(t,"utf-8")}catch{e.delete(t);return}let s=q1i(o,{overrides:{last_read:n}});if(s===o)return;try{await ERe.writeFile(t,s,"utf-8"),await ERe.utimes(t,new Date,r)}catch(i){logForDebugging(`tinyMemoryStamps: stamp failed for ${t}: ${String(i)}`,{level:"debug"}),e.delete(t)}}}
async function Kvn(e){await j1i(e)}
var ERe,j1i=async()=>{};
var xtt=b(()=>{lt();T2e();qe();Ev();JHt();tA();GO();ERe=require("fs/promises")});
export {$1i,MEd,q1i,Vvn,W1i,Kvn,ERe,j1i,xtt};
