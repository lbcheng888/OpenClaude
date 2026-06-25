// @ts-nocheck
import {Rf} from "./m465.ts";
import {Mee,Jae,o_e} from "./m3289.ts";
import {b,x} from "../runtime.ts";
import {t4} from "./m2347.ts";
function B2n(){if(!Rf())return!1;let e=bqe.join(Mee(),"claude","versions")+bqe.sep;return process.execPath.startsWith(e)}
function RB(e={}){if(!e.pinToCurrentBinary&&B2n())return{cmd:bqe.join(Jae(),"claude"),prefixArgs:[]};if(Rf())return{cmd:process.execPath,prefixArgs:[]};let t=process.argv[1];if(!t)return{cmd:process.execPath,prefixArgs:[]};return{cmd:process.execPath,prefixArgs:[t]}}
async function U2n(){let e=bqe.join(Mee(),"claude","versions"),t;try{t=await N2n.readdir(e)}catch{return null}let n=t.filter((r)=>!/\.tmp\.\d+\.\d+$/.test(r)&&F2n.valid(r)).sort(F2n.rcompare);for(let r of n){let o=bqe.join(e,r);try{let s=await N2n.stat(o);if(s.isFile()&&s.size>0)return o}catch{}}return null}
var N2n,bqe,F2n;
var Y_e=b(()=>{o_e();N2n=require("fs/promises"),bqe=require("path"),F2n=x(t4(),1)});
export {B2n,RB,U2n,N2n,bqe,F2n,Y_e};
