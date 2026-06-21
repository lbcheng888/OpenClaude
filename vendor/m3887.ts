// @ts-nocheck
import {b} from "../runtime.ts";
import {Xr,cl} from "./m321.ts";
import {eC,tns} from "./m717.ts";
import {YDa,kFn,xFn} from "./m3886.ts";
import {we} from "./m455.ts";
var Olt,Llt;
var HFn=b(()=>{Xr();eC();YDa();Olt=we(()=>cl.enum(["userSettings","projectSettings","localSettings","session","cliArg"])),Llt=we(()=>cl.discriminatedUnion("type",[cl.object({type:cl.literal("addRules"),rules:cl.array(kFn()),behavior:xFn(),destination:Olt()}),cl.object({type:cl.literal("replaceRules"),rules:cl.array(kFn()),behavior:xFn(),destination:Olt()}),cl.object({type:cl.literal("removeRules"),rules:cl.array(kFn()),behavior:xFn(),destination:Olt()}),cl.object({type:cl.literal("setMode"),mode:tns(),destination:Olt()}),cl.object({type:cl.literal("addDirectories"),directories:cl.array(cl.string()),destination:Olt()}),cl.object({type:cl.literal("removeDirectories"),directories:cl.array(cl.string()),destination:Olt()})]))});
export {Olt,Llt,HFn};
