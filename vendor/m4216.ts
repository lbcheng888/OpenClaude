// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr,za} from "./m323.ts";
import {ve} from "./m461.ts";
var m6n,f6n;
var V7a=b(()=>{Qr();m6n=ve(()=>za.enum(["allow","deny","ask"])),f6n=ve(()=>za.object({toolName:za.string(),ruleContent:za.string().optional()}))});
export {m6n,f6n,V7a};
