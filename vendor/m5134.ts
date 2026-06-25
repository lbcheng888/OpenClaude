// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {AVt,EVt,t_t} from "./m5130.ts";
import {jUl,zUl} from "../src/telemetry/5134_call.ts";
var YUl={};
ft(YUl,{default:()=>VCm});
var GCm,VCm;
var JUl=b(()=>{AVt();GCm={type:"local",name:"voice",description:"Toggle voice mode",argumentHint:"[hold|tap|off]",availability:["claude-ai"],isEnabled:()=>EVt(),get isHidden(){return!t_t()},supportsNonInteractive:!1,load:()=>Promise.resolve().then(() => (jUl(),zUl))},VCm=GCm});
export {YUl,GCm,VCm,JUl};
