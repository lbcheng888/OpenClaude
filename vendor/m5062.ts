// @ts-nocheck
import {st} from "./m5.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {ci,pT} from "./m1289.ts";
import {b} from "../runtime.ts";
function MIl(){if(xft)return xft;if(!st(process.env.DEBUG_CLAUDE_AGENT_SDK))return d8e=null,xft=Promise.resolve(),xft;let e=DRo.join(tr(),"debug");return d8e=DRo.join(e,`sdk-${LIl.randomUUID()}.txt`),process.stderr.write(`SDK debug logs: ${d8e}
`),xft=ci().mkdir(e).catch(()=>{}),xft}
function NIl(){return MIl(),d8e??null}
function sj(e){if(d8e===null)return;let n=`${new Date().toISOString()} ${e}
`;MIl().then(()=>{if(d8e)ci().append(d8e,n).catch(()=>{})})}
var LIl,DRo,d8e,xft=null;
var PRo=b(()=>{pT();sn();LIl=require("crypto"),DRo=require("path")});
export {MIl,NIl,sj,LIl,DRo,d8e,xft,PRo};
