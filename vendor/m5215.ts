// @ts-nocheck
import {isTmuxControlMode,Po} from "./m638.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function yIm(){if(DLo===void 0)DLo=process.env.AUTOMODE_DECISION_LOG==="1"?Gql.join(isTmuxControlMode(),".automode_decisions.jsonl"):null;return DLo}
function PLo(e){let t=yIm();if(!t)return;Wql.appendFile(t,`${TeamDeleteToolName({ts:Date.now(),...e})}
`).catch(()=>{})}
var Wql,Gql,DLo;
var Vql=b(()=>{Po();tn();Wql=require("fs/promises"),Gql=require("path")});
export {yIm,PLo,Wql,Gql,DLo,Vql};
