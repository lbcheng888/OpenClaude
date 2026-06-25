// @ts-nocheck
import {Box} from "./m2432.ts";
import {qE,BG} from "./m4563.ts";
import {pb,eG} from "./m3827.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function OTl(e){let t=PTl.c(10),{currentWorkflowInstallStep:n,secretExists:r,useExistingSecret:o,secretName:s,skipWorkflow:i,selectedWorkflows:a}=e,l=i===void 0?!1:i,c;if(t[0]!==r||t[1]!==s||t[2]!==a||t[3]!==l||t[4]!==o)c=l?["Getting repository information",r&&o?"Using existing API key secret":`Setting up ${s} secret`]:["Getting repository information","Creating branch",a.length>1?"Creating workflow files":"Creating workflow file",r&&o?"Using existing API key secret":`Setting up ${s} secret`,"Opening pull request page"],t[0]=r,t[1]=s,t[2]=a,t[3]=l,t[4]=o,t[5]=c;else c=t[5];let u=c,d;if(t[6]===Symbol.for("react.memo_cache_sentinel"))d=yue.jsx(Box,{marginBottom:1,children:yue.jsx(qE,{subtitle:"Create GitHub Actions workflow",children:"Install GitHub App"})}),t[6]=d;else d=t[6];let p;if(t[7]!==n||t[8]!==u)p=yue.jsx(yue.Fragment,{children:yue.jsxs(pb,{children:[d,u.map((m,f)=>{let h="pending";if(f<n)h="completed";else if(f===n)h="in-progress";return yue.jsx(Box,{children:yue.jsxs(Text,{color:h==="completed"?"success":h==="in-progress"?"warning":void 0,children:[h==="completed"?"\u2713 ":"",m,h==="in-progress"?"\u2026":""]})},f)})]})}),t[7]=n,t[8]=u,t[9]=p;else p=t[9];return p}
var PTl,yue;
var LTl=b(()=>{BG();eG();je();PTl=x(tt(),1),yue=x(oe(),1)});
export {OTl,PTl,yue,LTl};
