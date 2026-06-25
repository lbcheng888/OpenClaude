// @ts-nocheck
import {or,dn} from "../src/config/0137_namespace.ts";
import {Js,rT} from "./m1294.ts";
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {In,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
import {MS} from "./m460.ts";
import {ve} from "./m461.ts";
import {jt} from "./m253.ts";
function cPa(){return lPa.join(or(),".last-update-result.json")}
async function nqe(e){try{await Js().atomicWrite(cPa(),TeamDeleteToolName(e))}catch(t){logForDebugging(`Failed to record update result: ${t}`,{level:"error"})}}
async function fUn(){let e;try{e=await Js().read(cPa())}catch(t){if(!In(t))logForDebugging(`Failed to read update result: ${t}`,{level:"error"});return null}try{let t=Xbp().safeParse(qt(e));return t.success?t.data:null}catch{return null}}
var lPa,Xbp;
var vct=b(()=>{MS();rT();qe();dn();Ct();tn();lPa=require("path"),Xbp=ve(()=>jt.object({timestamp:jt.string(),path:jt.enum(["npm-global","npm-local","native"]),outcome:jt.enum(["success","failed"]),status:jt.string(),version_from:jt.string(),version_to:jt.string().nullable(),error_code:jt.string().nullable()}))});
export {cPa,nqe,fUn,lPa,Xbp,vct};
