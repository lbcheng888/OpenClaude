// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {Po} from "./m638.ts";
import {qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {tn} from "../src/config/0230_encoding.ts";
import {rz} from "../src/config/2253_displayName.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var fRT,hRT;
var Ycl=b(()=>{Qr();Po();qe();tn();rz();fRT=ve(()=>C.object({updatedAt:C.string().min(1)})),hRT=ve(()=>C.object({syncedFrom:C.string().min(1)}))});
export {fRT,hRT,Ycl};
