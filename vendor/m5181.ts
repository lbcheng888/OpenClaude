// @ts-nocheck
import {Pt,Go} from "./m632.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function XTm(){if(_Io===void 0)_Io=process.env.AUTOMODE_DECISION_LOG==="1"?tBl.join(Pt(),".automode_decisions.jsonl"):null;return _Io}
function yIo(e){let t=XTm();if(!t)return;eBl.appendFile(t,`${Le({ts:Date.now(),...e})}
`).catch(()=>{})}
var eBl,tBl,_Io;
var nBl=b(()=>{Go();Xt();eBl=require("fs/promises"),tBl=require("path")});
export {XTm,yIo,eBl,tBl,_Io,nBl};
