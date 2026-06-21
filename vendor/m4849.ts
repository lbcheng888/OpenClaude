// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {withTimeout} from "../src/telemetry/1483_withTimeout.ts";
import {readVSCodeScrollSensitivity,Cwe} from "./m2517.ts";
import {mbl,fbl} from "../src/config/4849_onDone.ts";
import {Te} from "./m2253.ts";
var Abl={};
isFullscreenWithTTY(Abl,{call:()=>vom});
var JCo,Com=20,vom=async(e,t)=>{let n=t.messages.length<Com,r=await withTimeout(readVSCodeScrollSensitivity(),250,"VS Code settings read timed out").catch(()=>null);return JCo.createElement(mbl,{onDone:e,showDemoRuler:n,editorSensitivity:r})};
var hbl=b(()=>{fbl();Cwe();JCo=M(Te(),1)});
export {Abl,JCo,Com,vom,hbl};
