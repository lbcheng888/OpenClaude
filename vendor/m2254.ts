// @ts-nocheck
import {s2,VT} from "./m648.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {getSessionId,lt} from "../src/session/0132_sent.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {lu,zf} from "./m133.ts";
import {Wt,ps} from "./m230.ts";
import {In,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function the(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"workflow"}
function fEn(){return Pet.join(s2(isTmuxControlMode()),getSessionId(),"workflows","scripts")+Pet.sep}
function vcd(e,t){return`${fEn()}${the(e)}-${t}.js`}
function qEi(e,t,n){let r=fEn(),o=vcd(e,t);return(async()=>{try{await mEn.mkdir(r,{recursive:!0,mode:448}),await mEn.writeFile(o,n,{encoding:"utf-8",mode:384})}catch(s){logForDebugging(`Failed to persist workflow script to ${o}: ${s}`,{level:"warn"})}})(),o}
async function LUe(e){if(lu(e))return{error:`UNC paths are not allowed for workflow scriptPath: ${e}`};let t=Pet.resolve(isTmuxControlMode(),e);try{let n=await Wt().readFileBytes(t,$2+1);if(n.byteLength>$2)return{error:`Workflow script file ${t} exceeds ${$2} bytes`};return{script:n.toString("utf-8"),path:t}}catch(n){if(In(n))return{error:`Workflow script file not found: ${t}`};return{error:`Failed to read workflow script file ${t}: ${n}`}}}
var mEn,Pet,$2=524288;
var oz=b(()=>{lt();zf();Po();qe();Ct();ps();VT();mEn=require("fs/promises"),Pet=require("path")});
export {the,fEn,vcd,qEi,LUe,mEn,Pet,$2,oz};
