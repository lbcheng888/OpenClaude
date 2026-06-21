// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Pt,Go} from "./m632.ts";
import {CYn,MDo} from "./m5260.ts";
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {Oe,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {Ebt,loe,Umr,initKp} from "./m609.ts";
import {isAmberSentinelEnabled,QH} from "./m2784.ts";
var Flc={};
isFullscreenWithTTY(Flc,{runHeadlessBashCommand:()=>runHeadlessBashCommand});
async function runHeadlessBashCommand(e){let{command:t}=e,n=e.cwd??Pt(),{file:r,args:o}=CYn()==="powershell"?{file:"pwsh",args:["-NoProfile","-Command",t]}:{file:"/bin/sh",args:["-c",t]},{stdout:s,stderr:i,code:a,error:l}=await execFileNoThrowWithCwd(r,o,{abortSignal:e.abortSignal,cwd:n,preserveOutputOnError:!0}),c=l&&!l.startsWith(`Command failed with exit code ${a}`)?l:"";if(c)Oe("input_remote_bash","spawn_failed");else Ie("input_remote_bash");return{outputUuid:Blc.randomUUID(),outputText:`<${Ebt}>${isAmberSentinelEnabled(s)}</${Ebt}><${loe}>${isAmberSentinelEnabled(i||c)}</${loe}><${Umr}>${a}</${Umr}>`,exitCode:a}}
var Blc;
var Ulc=b(()=>{initKp();ln();Go();oa();MDo();QH();Blc=require("crypto")});
export {Flc,runHeadlessBashCommand,Blc,Ulc};
