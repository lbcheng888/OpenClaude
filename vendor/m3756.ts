// @ts-nocheck
import {tr,sn} from "../src/config/0047_namespace.ts";
import {ci,pT} from "./m1289.ts";
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Pn,bt} from "./m195.ts";
import {b} from "../runtime.ts";
import {iv} from "./m454.ts";
import {we} from "./m455.ts";
import {hn} from "./m251.ts";
function Gwa(){return Wwa.join(tr(),".last-update-result.json")}
async function q3e(e){try{await ci().atomicWrite(Gwa(),Le(e))}catch(t){logForDebugging(`Failed to record update result: ${t}`,{level:"error"})}}
async function ENn(){let e;try{e=await ci().read(Gwa())}catch(t){if(!Pn(t))logForDebugging(`Failed to read update result: ${t}`,{level:"error"});return null}try{let t=udp().safeParse(qt(e));return t.success?t.data:null}catch{return null}}
var Wwa,udp;
var Rat=b(()=>{iv();pT();qe();sn();bt();Xt();Wwa=require("path"),udp=we(()=>hn.object({timestamp:hn.string(),path:hn.enum(["npm-global","npm-local","native"]),outcome:hn.enum(["success","failed"]),status:hn.string(),version_from:hn.string(),version_to:hn.string().nullable(),error_code:hn.string().nullable()}))});
export {Gwa,q3e,ENn,Wwa,udp,Rat};
