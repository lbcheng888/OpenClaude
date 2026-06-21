// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
var NWd,BWd,mst;
var qJr=b(()=>{Xr();NWd=we(()=>E.enum(["pending","in_progress","completed"])),BWd=we(()=>E.object({content:E.string().min(1,"Content cannot be empty"),status:NWd(),activeForm:E.string().min(1,"Active form cannot be empty")})),mst=we(()=>E.array(BWd()))});
export {NWd,BWd,mst,qJr};
