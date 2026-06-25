// @ts-nocheck
import {Vs,lT} from "./m2195.ts";
import {b} from "../runtime.ts";
async function pXa(){let e=await Vs.get("/v1/code/triggers",{auth:"teleport-org",headers:{"anthropic-beta":U_o}});if(!e.ok)throw Error(e.reason==="no-auth"?e.detail:`triggers unavailable: ${e.reason}`);return e.data.data??[]}
var U_o="ccr-triggers-2026-01-30";
var $_o=b(()=>{lT()});
export {pXa,U_o,$_o};
