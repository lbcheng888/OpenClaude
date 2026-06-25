// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
import {tn} from "../src/config/0230_encoding.ts";
function iIp(e){return g$a.createHash("sha256").update(e).digest("hex")}
function _$a(e){g9n.delete(e)}
function y$a(){g9n.clear()}
function cIp(e){return}
function uIp(e){return _9n.join(or(),"dump-prompts",`${e??getSessionId()}.jsonl`)}
function dIp(e,t){Rdo.promises.mkdir(_9n.dirname(e),{recursive:!0}).then(()=>Rdo.promises.appendFile(e,t+`
`)).catch(()=>{})}
function pIp(e,t,n,r){try{return}catch{}finally{n.dumpInFlight=!1}}
function T$a(e){let t=uIp(e);return async(n,r)=>{let o=g9n.get(e)??{initialized:!1,lastInitDataHash:"",dumpInFlight:!1};if(g9n.set(e,o),r?.method==="POST"&&r.body&&!o.dumpInFlight){o.dumpInFlight=!0;let s=new Date().toISOString();setImmediate(pIp,r.body,s,o,t)}return globalThis.fetch(n,r)}}
var g$a,Rdo,_9n,aIp,lIp=5,Ado,g9n;
var b3t=b(()=>{lt();dn();tn();g$a=require("crypto"),Rdo=require("fs"),_9n=require("path");aIp=["model","system","tools","max_tokens","thinking","output_config","context_management","metadata"],Ado=[],g9n=new Map});
export {iIp,_$a,y$a,cIp,uIp,dIp,pIp,T$a,g$a,Rdo,_9n,aIp,lIp,Ado,g9n,b3t};
