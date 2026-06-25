// @ts-nocheck
import {b} from "../runtime.ts";
import {Qr,za} from "./m323.ts";
import {FS,qRt} from "./m722.ts";
import {V7a,f6n,m6n} from "./m4216.ts";
import {ve} from "./m461.ts";
var $pt,qpt;
var h6n=b(()=>{Qr();FS();V7a();$pt=ve(()=>za.enum(["userSettings","projectSettings","localSettings","session","cliArg"])),qpt=ve(()=>za.discriminatedUnion("type",[za.object({type:za.literal("addRules"),rules:za.array(f6n()),behavior:m6n(),destination:$pt()}),za.object({type:za.literal("replaceRules"),rules:za.array(f6n()),behavior:m6n(),destination:$pt()}),za.object({type:za.literal("removeRules"),rules:za.array(f6n()),behavior:m6n(),destination:$pt()}),za.object({type:za.literal("setMode"),mode:qRt(),destination:$pt()}),za.object({type:za.literal("addDirectories"),directories:za.array(za.string()),destination:$pt()}),za.object({type:za.literal("removeDirectories"),directories:za.array(za.string()),destination:$pt()})]))});
export {$pt,qpt,h6n};
