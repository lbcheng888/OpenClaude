// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var Aep,Rep,pat;
var Ato=b(()=>{Qr();Aep=ve(()=>C.enum(["pending","in_progress","completed"])),Rep=ve(()=>C.object({content:C.string().min(1,"Content cannot be empty"),status:Aep(),activeForm:C.string().min(1,"Active form cannot be empty")})),pat=ve(()=>C.array(Rep()))});
export {Aep,Rep,pat,Ato};
