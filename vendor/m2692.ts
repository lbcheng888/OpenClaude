// @ts-nocheck
import {Zfe,cO} from "../src/telemetry/2249_cO.ts";
import {Y7,mE,Jm} from "../src/config/2207_Jm.ts";
import {Vfe,HA} from "./m2219.ts";
import {nEn,xUe,bEi,SEi,vDt} from "./m2246.ts";
import {Irt,v$e} from "./m2691.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function v9i(e){if(!e.endsWith(".md"))return!1;if(Zfe(e))return!1;return Y7(e)}
function mPd(e){return mE()&&v9i(e)}
function w9i(e,{defaults:t={},overrides:n={}}){if(!Vfe.test(e))return e;let{frontmatter:r,body:o}=nEn(e),s=([l,c])=>xUe(r,l)!==c,i=Object.entries(t).filter(([l])=>xUe(r,l)===null),a=Object.entries(n).filter(s);if(i.length+a.length===0)return e;return bEi(SEi(r,Object.fromEntries([...i,...a])),o)}
function Lkn(e,t){if(!v9i(e))return t;return w9i(t,{defaults:{...mE()&&{created:Irt()},originSessionId:getSessionId()}})}
function H9i(){let e=new Map;k9i=async(t)=>{if(!mPd(t))return;let n=Irt();if(e.get(t)===n)return;e.set(t,n);let r,o;try{r=(await ake.stat(t)).mtime,o=await ake.readFile(t,"utf-8")}catch{e.delete(t);return}let s=w9i(o,{overrides:{last_read:n}});if(s===o)return;try{await ake.writeFile(t,s,"utf-8"),await ake.utimes(t,new Date,r)}catch(i){logForDebugging(`tinyMemoryStamps: stamp failed for ${t}: ${String(i)}`,{level:"debug"}),e.delete(t)}}}
async function Mkn(e){await k9i(e)}
var ake,k9i=async()=>{};
var xrt=b(()=>{lt();v$e();qe();HA();vDt();Jm();cO();ake=require("fs/promises")});
export {v9i,mPd,w9i,Lkn,H9i,Mkn,ake,k9i,xrt};
