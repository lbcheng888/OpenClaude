// @ts-nocheck
import {Q,x} from "../runtime.ts";
import {c0a} from "./m3705.ts";
import {u0a} from "./m3706.ts";
import {p0a} from "./m3707.ts";
import {f0a} from "./m3708.ts";
import {h0a} from "./m3709.ts";
var g0a=Q((yBn)=>{Object.defineProperty(yBn,"__esModule",{value:!0});yBn.getMachineId=void 0;var PTp=require("process"),V4e;async function OTp(){if(!V4e)switch(PTp.platform){case"darwin":V4e=(await Promise.resolve().then(() => x(c0a()))).getMachineId;break;case"linux":V4e=(await Promise.resolve().then(() => x(u0a()))).getMachineId;break;case"freebsd":V4e=(await Promise.resolve().then(() => x(p0a()))).getMachineId;break;case"win32":V4e=(await Promise.resolve().then(() => x(f0a()))).getMachineId;break;default:V4e=(await Promise.resolve().then(() => x(h0a()))).getMachineId;break}return V4e()}yBn.getMachineId=OTp});
export {g0a};
