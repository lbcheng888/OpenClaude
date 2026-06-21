// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {Go} from "./m632.ts";
import {qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Xt} from "../src/config/0228_encoding.ts";
import {uZ} from "../src/config/2245_displayName.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var ddy,pdy;
var crl=b(()=>{Xr();Go();qe();Xt();uZ();ddy=we(()=>E.object({updatedAt:E.string().min(1)})),pdy=we(()=>E.object({syncedFrom:E.string().min(1)}))});
export {ddy,pdy,crl};
