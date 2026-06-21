// @ts-nocheck
import {Box} from "./m2422.ts";
import {cR,gJ} from "./m4537.ts";
import {HE,JW} from "./m3976.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Jdl(e){let t=Ydl.c(10),{currentWorkflowInstallStep:n,secretExists:r,useExistingSecret:o,secretName:s,skipWorkflow:i,selectedWorkflows:a}=e,l=i===void 0?!1:i,c;if(t[0]!==r||t[1]!==s||t[2]!==a||t[3]!==l||t[4]!==o)c=l?["Getting repository information",r&&o?"Using existing API key secret":`Setting up ${s} secret`]:["Getting repository information","Creating branch",a.length>1?"Creating workflow files":"Creating workflow file",r&&o?"Using existing API key secret":`Setting up ${s} secret`,"Opening pull request page"],t[0]=r,t[1]=s,t[2]=a,t[3]=l,t[4]=o,t[5]=c;else c=t[5];let u=c,d;if(t[6]===Symbol.for("react.memo_cache_sentinel"))d=SDe.default.createElement(Box,{marginBottom:1},SDe.default.createElement(cR,{subtitle:"Create GitHub Actions workflow"},"Install GitHub App")),t[6]=d;else d=t[6];let p;if(t[7]!==n||t[8]!==u)p=SDe.default.createElement(SDe.default.Fragment,null,SDe.default.createElement(HE,null,d,u.map((m,f)=>{let A="pending";if(f<n)A="completed";else if(f===n)A="in-progress";return SDe.default.createElement(Box,{key:f},SDe.default.createElement(Text,{color:A==="completed"?"success":A==="in-progress"?"warning":void 0},A==="completed"?"\u2713 ":"",m,A==="in-progress"?"\u2026":""))}))),t[7]=n,t[8]=u,t[9]=p;else p=t[9];return p}
var Ydl,SDe;
var Xdl=b(()=>{gJ();JW();ze();Ydl=M(rt(),1),SDe=M(Te(),1)});
export {Jdl,Ydl,SDe,Xdl};
