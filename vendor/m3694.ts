// @ts-nocheck
import {X,M} from "../runtime.ts";
import {zEa} from "./m3689.ts";
import {YEa} from "./m3690.ts";
import {XEa} from "./m3691.ts";
import {ZEa} from "./m3692.ts";
import {eCa} from "./m3693.ts";
var tCa=X((v1n)=>{Object.defineProperty(v1n,"__esModule",{value:!0});v1n.getMachineId=void 0;var Vlp=require("process"),I3e;async function Klp(){if(!I3e)switch(Vlp.platform){case"darwin":I3e=(await Promise.resolve().then(() => M(zEa()))).getMachineId;break;case"linux":I3e=(await Promise.resolve().then(() => M(YEa()))).getMachineId;break;case"freebsd":I3e=(await Promise.resolve().then(() => M(XEa()))).getMachineId;break;case"win32":I3e=(await Promise.resolve().then(() => M(ZEa()))).getMachineId;break;default:I3e=(await Promise.resolve().then(() => M(eCa()))).getMachineId;break}return I3e()}v1n.getMachineId=Klp});
export {tCa};
