// @ts-nocheck
import {Q,x} from "../runtime.ts";
import {Nyi} from "./m2148.ts";
import {Fyi} from "./m2149.ts";
import {Uyi} from "./m2150.ts";
import {qyi} from "./m2151.ts";
import {Wyi} from "./m2152.ts";
var Gyi=Q((MSn)=>{Object.defineProperty(MSn,"__esModule",{value:!0});MSn.getMachineId=void 0;var jsd=require("process"),aUe;async function Ysd(){if(!aUe)switch(jsd.platform){case"darwin":aUe=(await Promise.resolve().then(() => x(Nyi()))).getMachineId;break;case"linux":aUe=(await Promise.resolve().then(() => x(Fyi()))).getMachineId;break;case"freebsd":aUe=(await Promise.resolve().then(() => x(Uyi()))).getMachineId;break;case"win32":aUe=(await Promise.resolve().then(() => x(qyi()))).getMachineId;break;default:aUe=(await Promise.resolve().then(() => x(Wyi()))).getMachineId;break}return aUe()}MSn.getMachineId=Ysd});
export {Gyi};
