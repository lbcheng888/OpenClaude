// @ts-nocheck
import {X} from "../runtime.ts";
import {y1n} from "./m3688.ts";
import {Xi} from "./m2091.ts";
var zEa=X((T1n)=>{Object.defineProperty(T1n,"__esModule",{value:!0});T1n.getMachineId=void 0;var Dlp=y1n(),Plp=Xi();async function Olp(){try{let t=(await(0,Dlp.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((r)=>r.includes("IOPlatformUUID"));if(!t)return;let n=t.split('" = "');if(n.length===2)return n[1].slice(0,-1)}catch(e){Plp.diag.debug(`error reading machine id: ${e}`)}return}T1n.getMachineId=Olp});
export {zEa};
