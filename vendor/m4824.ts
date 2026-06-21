// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {_t,cu} from "./m582.ts";
import {useTimeout} from "./m2450.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Gn,sc} from "./m2455.ts";
import {Box} from "./m2422.ts";
import {mr,ki} from "./m2453.ts";
import {eb,pE} from "./m2548.ts";
import {loadAllProjectsMessageLogs,loadSameRepoMessageLogs,getSessionIdFromLog,isLiteLog,loadFullLog,getLastSessionLog,isCustomTitleEnabled,searchSessionsByCustomTitle,ja} from "../src/permissions/5143_writeRemoteAgentMetadata.ts";
import {getSessionId,getOriginalCwd,lt} from "../src/session/0131_sent.ts";
import {Oge,PUt} from "../src/telemetry/3863_stdout.ts";
import {pO,MM} from "./m126.ts";
import {DGn,DCo} from "./m4823.ts";
import {zR,lg} from "./m2269.ts";
import {Or,Ts} from "./m2542.ts";
import {Wu,lS} from "./m2571.ts";
import {Jc,vE} from "./m3837.ts";
import {vGn,xCo} from "../src/tui/4818_before.tsx";
import {IGn,HCo} from "../src/permissions/4823_path.ts";
import {findLiveNonInteractiveSession,tce} from "../src/permissions/3867_restoreSkillStateFromMessages.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {Se,bt} from "./m195.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var gSl={};
isFullscreenWithTTY(gSl,{filterResumableSessions:()=>filterResumableSessions,call:()=>Erm});
function fSl(e){switch(e.resultType){case"sessionNotFound":return`Session ${_t.bold(e.arg)} was not found.`;case"multipleMatches":return`Found ${e.count} sessions matching ${_t.bold(e.arg)}. Please use /resume to pick a specific session.`}}
function PCo(e){let t=ASl.c(7),{message:n,args:r,onDone:o}=e;useTimeout(o,0);let s;if(t[0]!==r)s=LE.createElement(Text,{dimColor:!0},et.pointer," /resume ",r),t[0]=r,t[1]=s;else s=t[1];let i;if(t[2]!==n)i=LE.createElement(Gn,null,LE.createElement(Text,null,n)),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]!==s||t[5]!==i)a=LE.createElement(Box,{flexDirection:"column"},s,i),t[4]=s,t[5]=i,t[6]=a;else a=t[6];return a}
function brm({onDone:e,onResume:t}){let[n,r]=PG.useState([]),[o,s]=PG.useState([]),[i,a]=PG.useState(!0),[l,c]=PG.useState(!1),[u,d]=PG.useState(!1),{rows:p}=mr(),m=eb(),f=PG.useRef(!1),A=PG.useCallback(async(y,T)=>{a(!0);try{let S=y?await loadAllProjectsMessageLogs():await loadSameRepoMessageLogs(T);if(f.current)return;let v=filterResumableSessions(S,getSessionId());r(v)}catch(S){if(f.current)return;e("Failed to load conversations")}finally{a(!1)}},[e]);PG.useEffect(()=>{async function y(){let T=await Oge(getOriginalCwd());if(f.current)return;s(T),A(!1,T)}y()},[A]);let h=PG.useCallback(()=>{let y=!u;d(y),A(y,o)},[u,A,o]);async function g(y){let T=pO(getSessionIdFromLog(y));if(!T){e("Failed to resume conversation");return}let S=isLiteLog(y)?await loadFullLog(y):y;if(f.current)return;let v=DGn(S,u,o);if(v.isCrossProject){if(v.isSameRepoWorktree){c(!0),t(T,S,"slash_command_picker");return}let R=await zR(v.command);if(f.current)return;if(R)process.stdout.write(R);let k=["","This conversation is from a different directory.","","To resume, run:",`  ${v.command}`,"","(Command copied to clipboard)",""].join(`
`);e(k,{display:"user"});return}c(!0),t(T,S,"slash_command_picker")}function _(){f.current=!0,e("Resume cancelled",{display:"system"})}if(Or("confirm:no",_,{context:"Confirmation",isActive:i&&!l}),i||l)return LE.createElement(Wu,{color:"suggestion"},LE.createElement(Text,{bold:!0,color:"suggestion"},"Resume session"),LE.createElement(Box,{marginTop:1},LE.createElement(Jc,{message:l?"Resuming conversation\u2026":"Loading conversations\u2026"})));return LE.createElement(vGn,{logs:n,maxHeight:m?Math.floor(p/2):p-2,onCancel:_,onSelect:g,onLogsChanged:()=>A(u,o),showAllProjects:u,onToggleAllProjects:h,onAgenticSearch:IGn})}
function filterResumableSessions(e,t){return e.filter((n)=>!n.isSidechain&&getSessionIdFromLog(n)!==t)}
var ASl,LE,PG,Erm=async(e,t,n)=>{let r=async(c,u,d)=>{if(await findLiveNonInteractiveSession(c)){e("That session is still running as a background agent. Open `claude agents` to attach to it, or stop it there first to resume here.",{display:"user"});return}try{await t.resume?.(c,u,d),e(void 0,{display:"skip"})}catch(p){De(p),e(`Failed to resume: ${Se(p)}`)}},o=n?.trim();if(!o)return LE.createElement(brm,{key:Date.now(),onDone:e,onResume:r});let s=await Oge(getOriginalCwd()),i=await loadSameRepoMessageLogs(s);if(i.length===0)return LE.createElement(PCo,{message:"No conversations found to resume.",args:o,onDone:()=>e("No conversations found to resume.")});let a=pO(o);if(a){let c=i.filter((d)=>getSessionIdFromLog(d)===a).sort((d,p)=>p.modified.getTime()-d.modified.getTime());if(c.length>0){let d=c[0],p=isLiteLog(d)?await loadFullLog(d):d;return r(a,p,"slash_command_session_id"),null}let u=await getLastSessionLog(a);if(u)return r(a,u,"slash_command_session_id"),null}if(isCustomTitleEnabled()){let c=await searchSessionsByCustomTitle(o,{exact:!0});if(c.length===1){let u=c[0],d=getSessionIdFromLog(u);if(d){let p=isLiteLog(u)?await loadFullLog(u):u;return r(d,p,"slash_command_title"),null}}if(c.length>1){let u=fSl({resultType:"multipleMatches",arg:o,count:c.length});return LE.createElement(PCo,{message:u,args:o,onDone:()=>e(u)})}}let l=fSl({resultType:"sessionNotFound",arg:o});return LE.createElement(PCo,{message:l,args:o,onDone:()=>e(l)})};
var _Sl=b(()=>{cu();Ai();lt();vE();lS();xCo();sc();pE();ki();lg();ze();Ts();HCo();tce();DCo();bt();PUt();Rn();ja();MM();ASl=M(rt(),1),LE=M(Te(),1),PG=M(Te(),1)});
export {gSl,fSl,PCo,brm,filterResumableSessions,ASl,LE,PG,Erm,_Sl};
