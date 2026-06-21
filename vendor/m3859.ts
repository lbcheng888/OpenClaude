// @ts-nocheck
import {eb,pE} from "./m2548.ts";
import {o0a,s0a} from "./m3858.ts";
import {ConsoleOAuthFlow,HUt} from "../src/tui/3858_ConsoleOAuthFlow.ts";
import {LUe,TAe,lS} from "./m2571.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {ac,e_} from "./m3338.ts";
import {Kn,Li} from "./m2572.ts";
import {gracefulShutdownSync,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
import {K0n,tca,Oke} from "../src/telemetry/3321_ignoreUntracked.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function $Bn(e){let t=i0a.c(20),{onComplete:n,errorsToIgnore:r}=e,o=r===void 0?HAp:r,[s,i]=g9.useState(null),[a,l]=g9.useState(!1),c=eb(),u;if(t[0]!==o||t[1]!==n)u=async()=>{let S=await Eoo(),v=new Set(Array.from(S).filter((R)=>!o.has(R)));if(v.size===0){n();return}if(v.has("needsLogin"))i("needsLogin");else if(v.has("needsGitStash"))i("needsGitStash")},t[0]=o,t[1]=n,t[2]=u;else u=t[2];let d=u,p,m;if(t[3]!==d)p=()=>{d()},m=[d],t[3]=d,t[4]=p,t[5]=m;else p=t[4],m=t[5];g9.useEffect(p,m);let f=IAp,A;if(t[6]!==d)A=()=>{l(!1),d()},t[6]=d,t[7]=A;else A=t[7];let h=A,g;if(t[8]===Symbol.for("react.memo_cache_sentinel"))g=()=>{l(!0)},t[8]=g;else g=t[8];let _=g,y;if(t[9]!==d)y=()=>{d()},t[9]=d,t[10]=y;else y=t[10];let T=y;if(!s)return null;switch(s){case"needsGitStash":{let S;if(t[11]!==T)S=g9.default.createElement(o0a,{onStashAndContinue:T,onCancel:f}),t[11]=T,t[12]=S;else S=t[12];return S}case"needsLogin":{let S=a?h:f,v;if(t[13]!==h||t[14]!==c||t[15]!==a)v=a?g9.default.createElement(ConsoleOAuthFlow,{onDone:h,mode:"login",forceLoginMethod:"claudeai",urlOutdent:c?LUe:TAe}):g9.default.createElement(g9.default.Fragment,null,g9.default.createElement(Box,{flexDirection:"column"},g9.default.createElement(Text,{dimColor:!0},"Teleport requires a Claude.ai account."),g9.default.createElement(Text,{dimColor:!0},"Your Claude Pro/Max subscription will be used by Claude Code.")),g9.default.createElement(ac,{confirmLabel:"Login with Claude account",cancelLabel:"Exit",onConfirm:_,onCancel:f})),t[13]=h,t[14]=c,t[15]=a,t[16]=v;else v=t[16];let R;if(t[17]!==S||t[18]!==v)R=g9.default.createElement(Kn,{title:"Log in to Claude",onCancel:S},v),t[17]=S,t[18]=v,t[19]=R;else R=t[19];return R}}}
function IAp(){gracefulShutdownSync(0)}
async function Eoo(){let e=new Set,[t,n]=await Promise.all([K0n(),tca()]);if(t)e.add("needsLogin");if(!n)e.add("needsGitStash");return e}
var i0a,g9,HAp;
var Coo=b(()=>{Oke();ym();pE();ze();HUt();e_();Li();lS();s0a();i0a=M(rt(),1),g9=M(Te(),1),HAp=new Set});
export {$Bn,IAp,Eoo,i0a,g9,HAp,Coo};
