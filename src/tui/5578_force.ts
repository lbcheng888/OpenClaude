// @ts-nocheck
import {useClock} from "../../vendor/m2432.ts";
import {getLastMainThreadCacheTtlMs,lt} from "../session/0131_sent.ts";
import {Mc,mt,configProtoStore} from "../../vendor/m2458.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Hk,PF} from "../api/2739_status.ts";
import {UUn,Sce} from "../../vendor/m3981.ts";
import {m$t,s2n} from "../../vendor/m4016.ts";
import {phe,sA} from "../../vendor/m2782.ts";
import {xRe,KAe} from "../config/2691_reason.ts";
import {F1t,m9e} from "../permissions/3296_recap.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {cFl,lo} from "../tools/5190_userPromptCount.ts";
import {IK,WFe,GFe} from "../../vendor/m2266.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Ms,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {_i,hp} from "../session/1460_promise.ts";
import {nko,Wft} from "../session/5127_confirmed.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
function KMo(e){return e.type==="user"&&!e.isMeta&&!e.isCompactSummary&&!e.isVirtual}
function Iec(e){let t=e.at(-1);return t?.type==="system"&&t.subtype==="away_summary"}
function j2m(e){let t=0,n=-1;for(let o=0;o<e.length;o++){let s=e[o];if(KMo(s))t++;if(s.type==="system"&&s.subtype==="away_summary")n=o}if(t<$2m)return!1;if(n===-1)return!0;let r=0;for(let o=n+1;o<e.length;o++)if(KMo(e[o]))r++;return r>=q2m}
async function W2m(e,t,n){if(t.current)return;try{await Dec.unlink(e)}catch{return}n.current?.({force:!0})}
function Oec(e,t,n,r,o=!0){let s=useClock(),i=XP.useRef(null),a=XP.useRef(0),l=XP.useRef(e),c=XP.useRef(n),u=XP.useRef(null),d=XP.useRef(null),p=XP.useRef(null),m=XP.useRef(VMo),f=XP.useRef(null),A=XP.useRef(null),h=XP.useRef(null),g=XP.useRef(!1),_=XP.useRef(!1);if(l.current=e,c.current&&!n)d.current=Date.now(),p.current=getLastMainThreadCacheTtlMs();c.current=n;let y=Mc(),T=mt((R)=>R.awaySummaryEnabled),S=o&&T,v=getFeatureValue_CACHED_MAY_BE_STALE("tengu_sedge_lantern_config",{delayMs:VMo})?.delayMs;m.current=typeof v==="number"&&Number.isFinite(v)?Math.max(30000,v):VMo,XP.useEffect(()=>{if(!S)return;function R(){i.current?.abort(),i.current=null}async function k(I){let P=d.current,L=p.current;if(P===null||L===null){logForDebugging("[awaySummary] skipped: cache age unknown");return}if(Date.now()-P>L*0.9){logForDebugging("[awaySummary] skipped: cache stale");return}if(!I?.force&&!0&&Hk.status!=="allowed"){logForDebugging("[awaySummary] skipped: at or near rate limit");return}if(!I?.force&&UUn()!==""){logForDebugging("[awaySummary] skipped: draft input present");return}if(!I?.force){let{pendingAgents:U,pendingWorkflows:W}=m$t({tasks:y.getState().tasks,queuedCommands:phe()});if(U>0||W>0){logForDebugging("[awaySummary] skipped: background work pending");return}}if(!I?.force&&xRe()){logForDebugging("[awaySummary] skipped: loop wakeup pending");return}if(!I?.force&&!j2m(l.current))return;if(Iec(l.current))return;R();let D=new AbortController;i.current=D;let N=await F1t(D.signal);if(D.signal.aborted)return;if(N.kind!=="ok"){Oe("away_summary_generate","generate_failed");return}let O=N.text,$=a.current<3?`${O} (disable recaps in /config)`:O;a.current++,t((U)=>[...U,cFl($)]),Ie("away_summary_generate")}function x(){let I=IK();if(I==="blurred"){f.current=Date.now();let P=d.current,L=p.current??3600000;if(P!==null&&Date.now()-P>=Math.min(m.current,L*0.8)&&!c.current)k()}else if(I==="focused"){if(R(),f.current!==null){let P=Date.now(),L=P-f.current;if(L>=U2m)A.current=P,h.current=L,g.current=!0,_.current=Iec(l.current);f.current=null}}}let H=WFe(x);return u.current=k,x(),()=>{H(),R(),u.current=null,f.current=null,A.current=null,h.current=null,g.current=!1,_.current=!1}},[S,t,y]),XP.useEffect(()=>{if(n)return;if(!S)return;let R=d.current;if(R===null)return;let k=p.current??3600000,x=Math.min(m.current,k*0.8),H=Math.max(0,x-(Date.now()-R));return s.setTimeout(()=>{if(IK()==="blurred"&&!c.current)u.current?.()},H)},[n,S,s]),XP.useEffect(()=>{if(!S)return;if(!g.current)return;let R=e.at(-1);if(!R||!KMo(R))return;let k=A.current;if(k===null)return;logEvent("tengu_return_to_session",{msSinceFocus:Date.now()-k,blurDurationMs:h.current??0,hadRecap:_.current,scrolledBeforeSubmit:r.current>k,isFullscreen:Ms()}),g.current=!1,A.current=null,f.current=null,h.current=null,_.current=!1},[e,S]),XP.useEffect(()=>{{if(!S)return;if(!_i())return;let R=process.env.CLAUDE_JOB_DIR;if(!R)return;let k=Pec.join(R,nko),x=s.setTimeout(function H(){try{W2m(k,c,u)}finally{x=s.setTimeout(H,Hec)}},Hec);return()=>x()}},[S,s])}
var Dec,Pec,XP,VMo=180000,U2m=300000,Hec=500,$2m=3,q2m=2;
var Lec=b(()=>{lt();Sce();GFe();ze();Wft();KAe();ln();zn();Ct();m9e();PF();configProtoStore();hp();qe();Pp();sA();lo();s2n();Dec=require("fs/promises"),Pec=require("path"),XP=M(Te(),1)});
export {KMo,Iec,j2m,W2m,Oec,Dec,Pec,XP,VMo,U2m,Hec,$2m,q2m,Lec};
