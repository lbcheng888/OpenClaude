// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {bt,Gc} from "./m588.ts";
import {useTimeout} from "./m2460.ts";
import {Text} from "./m2433.ts";
import {Xe,Zs} from "./m2216.ts";
import {Yn,Pl} from "./m2465.ts";
import {Box} from "./m2432.ts";
import {_r,ui} from "./m2463.ts";
import {getSettingsSchema,SE} from "./m2559.ts";
import {loadAllProjectsMessageLogs,loadSameRepoMessageLogs,getSessionIdFromLog,isLiteLog,loadFullLog,getLastSessionLog,isCustomTitleEnabled,searchSessionsByCustomTitle,_a} from "../src/permissions/5175_writeRemoteAgentMetadata.ts";
import {getSessionId,getOriginalCwd,lt} from "../src/session/0132_sent.ts";
import {J_e,i9t} from "../src/telemetry/3881_stdout.ts";
import {PP,YL} from "./m123.ts";
import {bjn,XHo} from "./m4855.ts";
import {sw,hg} from "./m2280.ts";
import {Or,ss} from "./m2553.ts";
import {ku,rS} from "./m2582.ts";
import {Hc,OE} from "./m3855.ts";
import {fjn,zHo} from "../src/tui/4850_before.ts";
import {Sjn,YHo} from "../src/permissions/4855_path.ts";
import {findLiveNonInteractiveSession,Xle} from "../src/permissions/3885_restoreSkillStateFromMessages.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {Ce,Ct} from "./m197.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var AHl={};
ft(AHl,{filterResumableSessions:()=>filterResumableSessions,call:()=>Mpm});
function bHl(e){switch(e.resultType){case"sessionNotFound":return`Session ${bt.bold(e.arg)} was not found.`;case"multipleMatches":return`Found ${e.count} sessions matching ${bt.bold(e.arg)}. Please use /resume to pick a specific session.`}}
function QHo(e){let t=EHl.c(7),{message:n,args:r,onDone:o}=e;useTimeout(o,0);let s;if(t[0]!==r)s=h9.jsxs(Text,{dimColor:!0,children:[Xe.pointer," /resume ",r]}),t[0]=r,t[1]=s;else s=t[1];let i;if(t[2]!==n)i=h9.jsx(Yn,{children:h9.jsx(Text,{children:n})}),t[2]=n,t[3]=i;else i=t[3];let a;if(t[4]!==s||t[5]!==i)a=h9.jsxs(Box,{flexDirection:"column",children:[s,i]}),t[4]=s,t[5]=i,t[6]=a;else a=t[6];return a}
function Lpm({onDone:e,onResume:t}){let[n,r]=logFeatureOkAsync.useState([]),[o,s]=logFeatureOkAsync.useState([]),[i,a]=logFeatureOkAsync.useState(!0),[l,c]=logFeatureOkAsync.useState(!1),[u,d]=logFeatureOkAsync.useState(!1),{rows:p}=_r(),m=getSettingsSchema(),f=logFeatureOkAsync.useRef(!1),h=logFeatureOkAsync.useCallback(async(y,S)=>{a(!0);try{let E=y?await loadAllProjectsMessageLogs():await loadSameRepoMessageLogs(S);if(f.current)return;let R=filterResumableSessions(E,getSessionId());r(R)}catch(E){if(f.current)return;e("Failed to load conversations")}finally{a(!1)}},[e]);logFeatureOkAsync.useEffect(()=>{async function y(){let S=await J_e(getOriginalCwd());if(f.current)return;s(S),h(!1,S)}y()},[h]);let g=logFeatureOkAsync.useCallback(()=>{let y=!u;d(y),h(y,o)},[u,h,o]);async function _(y){let S=PP(getSessionIdFromLog(y));if(!S){e("Failed to resume conversation");return}let E=isLiteLog(y)?await loadFullLog(y):y;if(f.current)return;let R=bjn(E,u,o);if(R.isCrossProject){if(R.isSameRepoWorktree){c(!0),t(S,E,"slash_command_picker");return}let w=await sw(R.command);if(f.current)return;if(w)process.stdout.write(w);let H=["","This conversation is from a different directory.","","To resume, run:",`  ${R.command}`,"","(Command copied to clipboard)",""].join(`
`);e(H,{display:"user"});return}c(!0),t(S,E,"slash_command_picker")}function T(){f.current=!0,e("Resume cancelled",{display:"system"})}if(Or("confirm:no",T,{context:"Confirmation",isActive:i&&!l}),i||l)return h9.jsxs(ku,{color:"suggestion",children:[h9.jsx(Text,{bold:!0,color:"suggestion",children:"Resume session"}),h9.jsx(Box,{marginTop:1,children:h9.jsx(Hc,{message:l?"Resuming conversation\u2026":"Loading conversations\u2026"})})]});return h9.jsx(fjn,{logs:n,maxHeight:m?Math.floor(p/2):p-2,onCancel:T,onSelect:_,onLogsChanged:()=>h(u,o),showAllProjects:u,onToggleAllProjects:g,onAgenticSearch:Sjn})}
function filterResumableSessions(e,t){return e.filter((n)=>!n.isSidechain&&getSessionIdFromLog(n)!==t)}
var EHl,logFeatureOkAsync,h9,Mpm=async(e,t,n)=>{let r=async(c,u,d)=>{if(await findLiveNonInteractiveSession(c)){e("That session is still running as a background agent. Open `claude agents` to attach to it, or stop it there first to resume here.",{display:"user"});return}try{await t.resume?.(c,u,d),e(void 0,{display:"skip"})}catch(p){Ie(p),e(`Failed to resume: ${Ce(p)}`)}},o=n?.trim();if(!o)return h9.jsx(Lpm,{onDone:e,onResume:r},Date.now());let s=await J_e(getOriginalCwd()),i=await loadSameRepoMessageLogs(s);if(i.length===0)return h9.jsx(QHo,{message:"No conversations found to resume.",args:o,onDone:()=>e("No conversations found to resume.")});let a=PP(o);if(a){let c=i.filter((d)=>getSessionIdFromLog(d)===a).sort((d,p)=>p.modified.getTime()-d.modified.getTime());if(c.length>0){let d=c[0],p=isLiteLog(d)?await loadFullLog(d):d;return r(a,p,"slash_command_session_id"),null}let u=await getLastSessionLog(a);if(u)return r(a,u,"slash_command_session_id"),null}if(isCustomTitleEnabled()){let c=await searchSessionsByCustomTitle(o,{exact:!0});if(c.length===1){let u=c[0],d=getSessionIdFromLog(u);if(d){let p=isLiteLog(u)?await loadFullLog(u):u;return r(d,p,"slash_command_title"),null}}if(c.length>1){let u=bHl({resultType:"multipleMatches",arg:o,count:c.length});return h9.jsx(QHo,{message:u,args:o,onDone:()=>e(u)})}}let l=bHl({resultType:"sessionNotFound",arg:o});return h9.jsx(QHo,{message:l,args:o,onDone:()=>e(l)})};
var RHl=b(()=>{Gc();Zs();lt();OE();rS();zHo();Pl();SE();ui();hg();je();ss();YHo();Xle();XHo();Ct();i9t();vn();_a();YL();EHl=x(tt(),1),logFeatureOkAsync=x(et(),1),h9=x(oe(),1)});
export {AHl,bHl,QHo,Lpm,filterResumableSessions,EHl,logFeatureOkAsync,h9,Mpm,RHl};
