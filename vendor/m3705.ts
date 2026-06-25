// @ts-nocheck
import {Q} from "../runtime.ts";
import {pBn} from "./m3704.ts";
import {xi} from "./m2096.ts";
var c0a=Q((mBn)=>{Object.defineProperty(mBn,"__esModule",{value:!0});mBn.getMachineId=void 0;var TTp=pBn(),STp=xi();async function bTp(){try{let t=(await(0,TTp.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"')).stdout.split(`
`).find((r)=>r.includes("IOPlatformUUID"));if(!t)return;let n=t.split('" = "');if(n.length===2)return n[1].slice(0,-1)}catch(e){STp.diag.debug(`error reading machine id: ${e}`)}return}mBn.getMachineId=bTp});
export {c0a};
