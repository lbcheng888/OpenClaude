// @ts-nocheck
import {X} from "../runtime.ts";
import {Xgn} from "./m2142.ts";
import {Xi} from "./m2091.ts";
var qpi=X((Qgn)=>{Object.defineProperty(Qgn,"__esModule",{value:!0});Qgn.getMachineId=void 0;var fYu=Xgn(),AYu=Xi();async function hYu(){try{let t=(await(0,fYu.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((r)=>r.includes("IOPlatformUUID"));if(!t)return;let n=t.split('" = "');if(n.length===2)return n[1].slice(0,-1)}catch(e){AYu.diag.debug(`error reading machine id: ${e}`)}return}Qgn.getMachineId=hYu});
export {qpi};
