// @ts-nocheck
import {getSettingsSchema,SE} from "./m2559.ts";
import {HNa,INa} from "./m3876.ts";
import {ConsoleOAuthFlow,n9t} from "../src/tui/3876_ConsoleOAuthFlow.ts";
import {L2e,Phe,rS} from "./m2582.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Bl,d_} from "./m3354.ts";
import {preInitQueue,di} from "./m2583.ts";
import {gracefulShutdownSync,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
import {FOn,dga,bIe} from "../src/telemetry/3337_ignoreUntracked.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function $2n(e){let t=xNa.c(20),{onComplete:n,errorsToIgnore:r}=e,o=r===void 0?Svp:r,[s,i]=r9t.useState(null),[a,l]=r9t.useState(!1),c=getSettingsSchema(),u;if(t[0]!==o||t[1]!==n)u=async()=>{let E=await mco(),R=new Set(Array.from(E).filter((w)=>!o.has(w)));if(R.size===0){n();return}if(R.has("needsLogin"))i("needsLogin");else if(R.has("needsGitStash"))i("needsGitStash")},t[0]=o,t[1]=n,t[2]=u;else u=t[2];let d=u,p,m;if(t[3]!==d)p=()=>{d()},m=[d],t[3]=d,t[4]=p,t[5]=m;else p=t[4],m=t[5];r9t.useEffect(p,m);let f=bvp,h;if(t[6]!==d)h=()=>{l(!1),d()},t[6]=d,t[7]=h;else h=t[7];let g=h,_;if(t[8]===Symbol.for("react.memo_cache_sentinel"))_=()=>{l(!0)},t[8]=_;else _=t[8];let T=_,y;if(t[9]!==d)y=()=>{d()},t[9]=d,t[10]=y;else y=t[10];let S=y;if(!s)return null;switch(s){case"needsGitStash":{let E;if(t[11]!==S)E=pY.jsx(HNa,{onStashAndContinue:S,onCancel:f}),t[11]=S,t[12]=E;else E=t[12];return E}case"needsLogin":{let E=a?g:f,R;if(t[13]!==g||t[14]!==c||t[15]!==a)R=a?pY.jsx(ConsoleOAuthFlow,{onDone:g,mode:"login",forceLoginMethod:"claudeai",urlOutdent:c?L2e:Phe}):pY.jsxs(pY.Fragment,{children:[pY.jsxs(Box,{flexDirection:"column",children:[pY.jsx(Text,{dimColor:!0,children:"Teleport requires a Claude.ai account."}),pY.jsx(Text,{dimColor:!0,children:"Your Claude Pro/Max subscription will be used by Claude Code."})]}),pY.jsx(Bl,{confirmLabel:"Login with Claude account",cancelLabel:"Exit",onConfirm:T,onCancel:f})]}),t[13]=g,t[14]=c,t[15]=a,t[16]=R;else R=t[16];let w;if(t[17]!==E||t[18]!==R)w=pY.jsx(preInitQueue,{title:"Log in to Claude",onCancel:E,children:R}),t[17]=E,t[18]=R,t[19]=w;else w=t[19];return w}}}
function bvp(){gracefulShutdownSync(0)}
async function mco(){let e=new Set,[t,n]=await Promise.all([FOn(),dga()]);if(t)e.add("needsLogin");if(!n)e.add("needsGitStash");return e}
var xNa,r9t,pY,Svp;
var fco=b(()=>{bIe();isAmberSentinelEnabled();SE();je();n9t();d_();di();rS();INa();xNa=x(tt(),1),r9t=x(et(),1),pY=x(oe(),1),Svp=new Set});
export {$2n,bvp,mco,xNa,r9t,pY,Svp,fco};
