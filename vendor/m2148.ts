// @ts-nocheck
import {Q} from "../runtime.ts";
import {ISn} from "./m2147.ts";
import {xi} from "./m2096.ts";
var Nyi=Q((xSn)=>{Object.defineProperty(xSn,"__esModule",{value:!0});xSn.getMachineId=void 0;var Osd=ISn(),Lsd=xi();async function Msd(){try{let t=(await(0,Osd.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((r)=>r.includes("IOPlatformUUID"));if(!t)return;let n=t.split('" = "');if(n.length===2)return n[1].slice(0,-1)}catch(e){Lsd.diag.debug(`error reading machine id: ${e}`)}return}xSn.getMachineId=Msd});
export {Nyi};
