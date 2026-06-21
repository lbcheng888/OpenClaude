// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {qrl,jrl,Bjn,A_o,Fjn} from "../permissions/4462_word.ts";
import {My,pE} from "../../vendor/m2548.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {dd,jb,Dd} from "../../vendor/m687.ts";
import {useInterval,D$r} from "../../vendor/m2446.ts";
import {useTimeout} from "../../vendor/m2450.ts";
import {zR,lg} from "../../vendor/m2269.ts";
import {Ln,SS,allTools,lo} from "../tools/5190_userPromptCount.ts";
import {ix,Sz} from "../config/2704_Sz.ts";
import {g_o,Vrl} from "../agent/4463_spawnForkFromDirective.ts";
import {ay,rol} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {X7e,sl} from "../../vendor/m715.ts";
import {Se,bt} from "../../vendor/m195.ts";
import {T_o,y_o} from "../session/4464_deriveFirstPrompt.ts";
import {Jl,ch} from "../../vendor/m2727.ts";
import {Box} from "../../vendor/m2422.ts";
import {Text} from "../../vendor/m2423.ts";
import {Y6,X0e} from "../../vendor/m4460.ts";
import {nl,v_} from "../../vendor/m2573.ts";
import {l_,dU} from "../../vendor/m3932.ts";
import {Tn,zs} from "../../vendor/m2554.ts";
import {at,rs} from "../../vendor/m2546.ts";
import {truncateToWidth,EH} from "../../vendor/m237.ts";
import {MHe,SUt} from "../../vendor/m3829.ts";
import {getLastCacheSafeParams,gP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {J0,oG} from "../agent/5173_len.ts";
import {pS,hE,dq} from "../config/2722_duration_ms.ts";
import {Wc} from "../api/3868_level.ts";
import {saveGlobalConfig,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var tol={};
isFullscreenWithTTY(tol,{call:()=>F6p});
function O6p({question:e,context:t,onDone:n}){let[r,o]=U9.useState(null),[s,i]=U9.useState(!1),[a,l]=U9.useState(null),[c,u]=U9.useState(null),[d,p]=U9.useState(0),[m,f]=U9.useState(()=>qrl()),A=U9.useRef(m),h=U9.useRef(!1),[g,_]=U9.useState(!1),[y,T]=U9.useState(0),S=U9.useRef(null),{rows:v,columns:R}=My(mr()),k=dd();useInterval(()=>p((N)=>N+1),r||a?null:80),useTimeout(()=>T(0),y?2000:null,[y]);function x(N){if(h.current){N.preventDefault();return}if(N.key==="escape"||N.key==="return"||N.key===" "||N.ctrl&&(N.key==="c"||N.key==="d")){N.preventDefault(),n(void 0,{display:"skip"});return}if(N.key==="x"&&A.current.length>0){N.preventDefault(),jrl(r&&!s?[{question:e,response:r}]:[]),A.current=[],f([]);return}if(N.key==="c"&&!N.ctrl&&!N.meta&&r){N.preventDefault(),zR(r).then((O)=>{if(O)process.stdout.write(O)}),T((O)=>O+1);return}if(N.key==="f"&&r&&!s&&!k){N.preventDefault(),h.current=!0,_(!0);let O=[Ln({content:e}),SS({content:r})],$=()=>{h.current=!1,_(!1)};if(!ix())Promise.all([Promise.resolve().then(() => (g_o(),Vrl)),Promise.resolve().then(() => (ay(),rol))]).then(([{spawnForkFromDirective:U},{hasPermissionsToUseTool:W}])=>U(e,t,t.canUseTool??W,O)).then((U)=>{if(U)n(`${X7e} forked ${U.name} (${U.agentId.slice(-4)})`,{display:"system"});else $(),n("Cannot fork before the first conversation turn",{display:"system"})}).catch((U)=>{$(),n(`Failed to fork: ${Se(U)}`)});else Promise.resolve().then(() => (T_o(),y_o)).then(({branchAndResume:U})=>U(t,n,{customTitle:S_o(`btw: ${e}`,80),extraMessages:O}).then((W)=>{if(!W)$()})).catch((U)=>{$(),n(`Failed to branch conversation: ${Se(U)}`)});return}if(N.key==="up"||N.ctrl&&N.key==="p")N.preventDefault(),S.current?.scrollBy(-Zrl);if(N.key==="down"||N.ctrl&&N.key==="n")N.preventDefault(),S.current?.scrollBy(Zrl)}U9.useEffect(()=>{let N=Jl();async function O(){let $=dd();if($&&!jb()){l($.viewerOnly?"Side questions aren't available when viewing a session read-only":"This remote connection doesn't support side questions");return}try{let U=$?await $.sendControlRequest({subtype:"side_question",question:e}):await Bjn({question:e,cacheSafeParams:await B6p(t),parentController:N,onRetry:(W)=>{if(N.signal.aborted)return;u({...W,retryAt:Date.now()+W.retryInMs})}});if(!N.signal.aborted)if(U.response){if(o(U.response),i(U.synthetic??!1),$&&!U.synthetic)A_o(e,U.response)}else l("No response received")}catch(U){if(!N.signal.aborted)l(Se(U)||"Failed to get response")}}return O(),()=>{N.abort()}},[e,t]);let H=m.slice(-P6p),I=m.length-H.length,P=H.length+(I>0?1:0),L=Math.max(20,R-7),D=Math.max(5,v-I6p-D6p-P);return ru.createElement(Box,{flexDirection:"column",paddingLeft:2,marginTop:1,tabIndex:0,autoFocus:!0,onKeyDown:x},I>0&&ru.createElement(Text,{dimColor:!0},"(+",I," earlier /btw)"),H.map((N,O)=>ru.createElement(Text,{key:I+O,dimColor:!0},"/btw ",S_o(N.question,L))),ru.createElement(Text,null,ru.createElement(Text,{color:"warning",bold:!0},"/btw"," "),ru.createElement(Text,{dimColor:!0},S_o(e,L))),ru.createElement(Box,{marginTop:1,marginLeft:2,maxHeight:D},ru.createElement(Y6,{ref:S,flexDirection:"column",flexGrow:1},a?ru.createElement(nl,{error:a}):r?ru.createElement(l_,null,r):ru.createElement(L6p,{frame:d,retry:c}))),ru.createElement(Box,{marginTop:1},g?ru.createElement(Text,{dimColor:!0},"Forking\u2026"):ru.createElement(Text,{dimColor:!0},ru.createElement(Tn,null,(r||a)&&ru.createElement(at,{chord:["up","down"],action:"scroll"}),r&&(y>0?ru.createElement(Text,{color:"success"},"Copied to clipboard"):ru.createElement(at,{chord:"c",action:"copy"})),r&&!s&&!k&&ru.createElement(at,{chord:"f",action:"fork"}),m.length>0&&ru.createElement(at,{chord:"x",action:"clear history"}),ru.createElement(at,{chord:"escape",action:"close"})))))}
function S_o(e,t){return truncateToWidth(e.replace(/\s+/g," ").trim(),t)}
function L6p(e){let t=eol.c(19),{frame:n,retry:r}=e;if(!r){let u;if(t[0]!==n)u=ru.createElement(MHe,{frame:n,messageColor:"warning"}),t[0]=n,t[1]=u;else u=t[1];let d;if(t[2]===Symbol.for("react.memo_cache_sentinel"))d=ru.createElement(Text,{color:"warning"},"Answering\u2026"),t[2]=d;else d=t[2];let p;if(t[3]!==u)p=ru.createElement(Box,null,u,d),t[3]=u,t[4]=p;else p=t[4];return p}let o=Math.max(0,Math.ceil((r.retryAt-Date.now())/1000)),s;if(t[5]!==n)s=ru.createElement(MHe,{frame:n,messageColor:"warning"}),t[5]=n,t[6]=s;else s=t[6];let i;if(t[7]!==r.status)i=M6p(r.status),t[7]=r.status,t[8]=i;else i=t[8];let a;if(t[9]!==i)a=ru.createElement(Text,{color:"warning"},i),t[9]=i,t[10]=a;else a=t[10];let l;if(t[11]!==o||t[12]!==r.maxRetries||t[13]!==r.retryAttempt)l=ru.createElement(Text,{dimColor:!0}," \xB7 retrying in ",o,"s \xB7 attempt ",r.retryAttempt,"/",r.maxRetries),t[11]=o,t[12]=r.maxRetries,t[13]=r.retryAttempt,t[14]=l;else l=t[14];let c;if(t[15]!==s||t[16]!==a||t[17]!==l)c=ru.createElement(Box,null,s,a,l),t[15]=s,t[16]=a,t[17]=l,t[18]=c;else c=t[18];return c}
function M6p(e){switch(e){case 429:return"Rate limited";case 529:return"API overloaded";case 401:case 403:return"Authentication failed";default:return"API error"}}
function N6p(e){let t=e.at(-1);if(t?.type==="assistant"&&t.message.stop_reason===null)return e.slice(0,-1);return e}
async function B6p(e){let t=allTools(N6p(e.messages)),n=getLastCacheSafeParams();if(n)return{systemPrompt:n.systemPrompt,userContext:n.userContext,systemContext:n.systemContext,toolUseContext:e,forkContextMessages:t};let[r,o,s]=await Promise.all([J0(e.options.tools,e.options.mainLoopModel,[]),pS(),hE(e.options.cacheBreakerPhrase)]);return{systemPrompt:Wc(r),userContext:o,systemContext:s,toolUseContext:e,forkContextMessages:t}}
async function F6p(e,t,n){let r=n?.trim();if(!r)return e("Usage: /btw <your question>",{display:"system"}),null;return saveGlobalConfig((o)=>({...o,btwUseCount:o.btwUseCount+1})),ru.createElement(O6p,{question:r,context:t,onDone:e})}
var eol,ru,U9,I6p=5,D6p=6,Zrl=3,P6p=5;
var nol=b(()=>{zs();v_();rs();dU();SUt();sl();oG();pE();dq();Sz();ki();X0e();D$r();lg();ze();Dd();ch();Qn();bt();gP();lo();Fjn();EH();eol=M(rt(),1),ru=M(Te(),1),U9=M(Te(),1)});
export {tol,O6p,S_o,L6p,M6p,N6p,B6p,F6p,eol,ru,U9,I6p,D6p,Zrl,P6p,nol};
