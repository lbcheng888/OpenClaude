// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {withTimeout} from "../src/telemetry/1488_withTimeout.ts";
import {readVSCodeScrollSensitivity,cwe} from "./m2528.ts";
import {SIl,bIl} from "../src/config/4881_onDone.ts";
import {oe} from "./m2275.ts";
var EIl={};
ft(EIl,{call:()=>Bmm});
var CIl,Fmm=20,Bmm=async(e,t)=>{let n=t.messages.length<Fmm,r=await withTimeout(readVSCodeScrollSensitivity(),250,"VS Code settings read timed out").catch(()=>null);return CIl.jsx(SIl,{onDone:e,showDemoRuler:n,editorSensitivity:r})};
var AIl=b(()=>{bIl();cwe();CIl=x(oe(),1)});
export {EIl,CIl,Fmm,Bmm,AIl};
