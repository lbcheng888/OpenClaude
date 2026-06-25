// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
var kbn,C$r;
var A$r=b(()=>{Qr();kbn=ve(()=>C.object({restrictions:C.record(C.string(),C.object({allowed:C.boolean()})),compliance_taints:C.array(C.string()).default([]),defaults:C.record(C.string(),C.unknown()).default({}).catch({})})),C$r={restrictions:{},compliance_taints:[],defaults:{}}});
export {kbn,C$r,A$r};
