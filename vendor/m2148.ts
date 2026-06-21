// @ts-nocheck
import {X,M} from "../runtime.ts";
import {qpi} from "./m2143.ts";
import {jpi} from "./m2144.ts";
import {Gpi} from "./m2145.ts";
import {Kpi} from "./m2146.ts";
import {zpi} from "./m2147.ts";
var Ypi=X((r_n)=>{Object.defineProperty(r_n,"__esModule",{value:!0});r_n.getMachineId=void 0;var xYu=require("process"),uFe;async function kYu(){if(!uFe)switch(xYu.platform){case"darwin":uFe=(await Promise.resolve().then(() => M(qpi()))).getMachineId;break;case"linux":uFe=(await Promise.resolve().then(() => M(jpi()))).getMachineId;break;case"freebsd":uFe=(await Promise.resolve().then(() => M(Gpi()))).getMachineId;break;case"win32":uFe=(await Promise.resolve().then(() => M(Kpi()))).getMachineId;break;default:uFe=(await Promise.resolve().then(() => M(zpi()))).getMachineId;break}return uFe()}r_n.getMachineId=kYu});
export {Ypi};
