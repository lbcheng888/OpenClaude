// @ts-nocheck
import {si,gT} from "./m2190.ts";
import {b} from "../runtime.ts";
async function VGa(){let e=await si.get("/v1/code/triggers",{auth:"teleport-org",headers:{"anthropic-beta":Wpo}});if(!e.ok)throw Error(e.reason==="no-auth"?e.detail:`triggers unavailable: ${e.reason}`);return e.data.data??[]}
var Wpo="ccr-triggers-2026-01-30";
var Gpo=b(()=>{gT()});
export {VGa,Wpo,Gpo};
