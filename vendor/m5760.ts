// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {wZn,lNo} from "./m5295.ts";
import {execFileNoThrowWithCwd,Ii} from "./m690.ts";
import {xe,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {YAt,ioe,hyr,Ud} from "./m615.ts";
import {Ml,Yk} from "./m2796.ts";
var Kyc={};
ft(Kyc,{runHeadlessBashCommand:()=>runHeadlessBashCommand});
async function runHeadlessBashCommand(e){let{command:t}=e,n=e.cwd??isTmuxControlMode(),{file:r,args:o}=wZn()==="powershell"?{file:"pwsh",args:["-NoProfile","-Command",t]}:{file:"/bin/sh",args:["-c",t]},{stdout:s,stderr:i,code:a,error:l}=await execFileNoThrowWithCwd(r,o,{abortSignal:e.abortSignal,cwd:n,preserveOutputOnError:!0}),c=l&&!l.startsWith(`Command failed with exit code ${a}`)?l:"";if(c)xe("input_remote_bash","spawn_failed");else He("input_remote_bash");return{outputUuid:Vyc.randomUUID(),outputText:`<${YAt}>${Ml(s)}</${YAt}><${ioe}>${Ml(i||c)}</${ioe}><${hyr}>${a}</${hyr}>`,exitCode:a}}
var Vyc;
var zyc=b(()=>{Ud();mn();Po();Ii();lNo();Yk();Vyc=require("crypto")});
export {Kyc,runHeadlessBashCommand,Vyc,zyc};
