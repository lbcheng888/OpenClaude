// @ts-nocheck
import {N2,QT} from "./m642.ts";
import {Pt,Go} from "./m632.ts";
import {getSessionId,lt} from "../src/session/0131_sent.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {yd,ng} from "./m132.ts";
import {jt,ws} from "./m228.ts";
import {Pn,bt} from "./m195.ts";
import {b} from "../runtime.ts";
function Wfe(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"workflow"}
function Iyn(){return DQe.join(N2(Pt()),getSessionId(),"workflows","scripts")+DQe.sep}
function nZu(e,t){return`${Iyn()}${Wfe(e)}-${t}.js`}
function $hi(e,t,n){let r=Iyn(),o=nZu(e,t);return(async()=>{try{await Hyn.mkdir(r,{recursive:!0,mode:448}),await Hyn.writeFile(o,n,{encoding:"utf-8",mode:384})}catch(s){logForDebugging(`Failed to persist workflow script to ${o}: ${s}`,{level:"warn"})}})(),o}
async function rIt(e){if(yd(e))return{error:`UNC paths are not allowed for workflow scriptPath: ${e}`};let t=DQe.resolve(Pt(),e);try{let n=await jt().readFileBytes(t,_$+1);if(n.byteLength>_$)return{error:`Workflow script file ${t} exceeds ${_$} bytes`};return{script:n.toString("utf-8"),path:t}}catch(n){if(Pn(n))return{error:`Workflow script file not found: ${t}`};return{error:`Failed to read workflow script file ${t}: ${n}`}}}
var Hyn,DQe,_$=524288;
var fsModule=b(()=>{lt();ng();Go();qe();bt();ws();QT();Hyn=require("fs/promises"),DQe=require("path")});
export {Wfe,Iyn,nZu,$hi,rIt,Hyn,DQe,_$,fsModule};
