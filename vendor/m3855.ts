// @ts-nocheck
import {_A} from "./m459.ts";
import {Whe,Xae,Ske} from "./m3273.ts";
import {b,M} from "../runtime.ts";
import {O4} from "./m2337.ts";
function FBn(){if(!_A())return!1;let e=l4e.join(Whe(),"claude","versions")+l4e.sep;return process.execPath.startsWith(e)}
function sU(e={}){if(!e.pinToCurrentBinary&&FBn())return{cmd:l4e.join(Xae(),"claude"),prefixArgs:[]};if(_A())return{cmd:process.execPath,prefixArgs:[]};let t=process.argv[1];if(!t)return{cmd:process.execPath,prefixArgs:[]};return{cmd:process.execPath,prefixArgs:[t]}}
async function UBn(){let e=l4e.join(Whe(),"claude","versions"),t;try{t=await NBn.readdir(e)}catch{return null}let n=t.filter((r)=>!/\.tmp\.\d+\.\d+$/.test(r)&&BBn.valid(r)).sort(BBn.rcompare);for(let r of n){let o=l4e.join(e,r);try{let s=await NBn.stat(o);if(s.isFile()&&s.size>0)return o}catch{}}return null}
var NBn,l4e,BBn;
var Pge=b(()=>{Ske();NBn=require("fs/promises"),l4e=require("path"),BBn=M(O4(),1)});
export {FBn,sU,UBn,NBn,l4e,BBn,Pge};
