// @ts-nocheck
import {nt} from "./m127.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {Js,rT} from "./m1294.ts";
import {b} from "../runtime.ts";
function lFl(){if(Vgt)return Vgt;if(!nt(process.env.DEBUG_CLAUDE_AGENT_SDK))return ZWe=null,Vgt=Promise.resolve(),Vgt;let e=Uxo.join(or(),"debug");return ZWe=Uxo.join(e,`sdk-${aFl.randomUUID()}.txt`),process.stderr.write(`SDK debug logs: ${ZWe}
`),Vgt=Js().mkdir(e).catch(()=>{}),Vgt}
function cFl(){return lFl(),ZWe??null}
function P6(e){if(ZWe===null)return;let n=`${new Date().toISOString()} ${e}
`;lFl().then(()=>{if(ZWe)Js().append(ZWe,n).catch(()=>{})})}
var aFl,Uxo,ZWe,Vgt=null;
var $xo=b(()=>{rT();dn();aFl=require("crypto"),Uxo=require("path")});
export {lFl,cFl,P6,aFl,Uxo,ZWe,Vgt,$xo};
