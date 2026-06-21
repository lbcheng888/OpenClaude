// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
import {Xt} from "../src/config/0228_encoding.ts";
function $yp(e){return uOa.createHash("sha256").update(e).digest("hex")}
function dOa(e){UFn.delete(e)}
function pOa(){UFn.clear()}
function Wyp(e){return}
function Gyp(e){return $Fn.join(tr(),"dump-prompts",`${e??getSessionId()}.jsonl`)}
function Vyp(e,t){qso.promises.mkdir($Fn.dirname(e),{recursive:!0}).then(()=>qso.promises.appendFile(e,t+`
`)).catch(()=>{})}
function Kyp(e,t,n,r){try{return}catch{}finally{n.dumpInFlight=!1}}
function mOa(e){let t=Gyp(e);return async(n,r)=>{let o=UFn.get(e)??{initialized:!1,lastInitDataHash:"",dumpInFlight:!1};if(UFn.set(e,o),r?.method==="POST"&&r.body&&!o.dumpInFlight){o.dumpInFlight=!0;let s=new Date().toISOString();setImmediate(Kyp,r.body,s,o,t)}return globalThis.fetch(n,r)}}
var uOa,qso,$Fn,qyp,jyp=5,$so,UFn;
var R2t=b(()=>{lt();sn();Xt();uOa=require("crypto"),qso=require("fs"),$Fn=require("path");qyp=["model","system","tools","max_tokens","thinking","output_config","context_management","metadata"],$so=[],UFn=new Map});
export {$yp,dOa,pOa,Wyp,Gyp,Vyp,Kyp,mOa,uOa,qso,$Fn,qyp,jyp,$so,UFn,R2t};
