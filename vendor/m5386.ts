// @ts-nocheck
import {useClock} from "./m2442.ts";
import {useTerminalFocus,Uve} from "./m2390.ts";
import {kBt,Nee,D3e,Lha,rat} from "../src/telemetry/3328_stdout.ts";
import {getLastInteractionTime,lt} from "../src/session/0132_sent.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function eYl(e,t=!0){let[n,r]=GJ.useState(tBm),[o,s]=GJ.useState(0),i=GJ.useRef(null),a=GJ.useRef(0),l=GJ.useRef(0),c=useClock(),u=useTerminalFocus(),d=GJ.useRef(u);return d.current=u,GJ.useEffect(()=>{if(!kBt())return;if(!u||Nee.disabled)return;if(a.current===0)return;if(Date.now()-a.current<ZFm)return;l.current=0,a.current=0,s((p)=>p+1)},[u]),GJ.useEffect(()=>D3e.subscribe(()=>{if(Nee.disabled)return;l.current=0,a.current=0,s((p)=>p+1)}),[]),GJ.useEffect(()=>{if(!t)return;if(Nee.disabled)return;let p=!1,m=-1,f=Date.now();function h(y){if(!kBt())return JFm;return rBm(d.current,Date.now()-getLastInteractionTime(),y?0:l.current)}async function g(){if(p)return;let y=getLastInteractionTime();if(m!==y)m=y,f=Date.now();else if(Date.now()-f>=QFm)return;let S=Date.now(),E;try{E=await Lha()}catch(D){Ie(D),E=null}let R=E;if(p)return;a.current=S;let w=R==="needs-auth",H=R==="fetch-failed",k=w||H?null:R;if(l.current=w?1:k===null?l.current+1:0,Nee.badStreak=H?Nee.badStreak+1:0,r((D)=>{if(D.lastUpdated>0&&D.pr?.number===k?.number&&D.pr?.url===k?.url&&D.pr?.reviewState===k?.reviewState&&D.pr?.kind===k?.kind&&D.needsAuth===w)return D;return{pr:k,needsAuth:w,lastUpdated:Date.now()}}),Nee.badStreak>=eBm){Nee.disabled=!0,Pt("github_pr_status_direct","bad_streak_disabled");return}let I=Date.now()-S;if(I>XFm){if(Nee.disabled=!0,kBt())Pt("github_pr_status_direct","slow_disabled",{elapsed_ms:I});return}if(!p)i.current=c.setTimeout(g,h(!1))}let _=h(!0),T=Date.now()-a.current;if(T>=_)g();else i.current=c.setTimeout(g,_-T);return()=>{if(p=!0,i.current)i.current(),i.current=null}},[e,t,o,c]),n}
function rBm(e,t,n){let r=t<30000?90000:t<300000?180000:t<1800000?600000:1800000,o=n<=0?90000:n===1?300000:n===2?900000:1800000;return Math.max(r,o,e?0:nBm)}
var GJ,JFm=60000,XFm=4000,QFm=3600000,ZFm=1e4,eBm=3,tBm,nBm=300000;
var tYl=b(()=>{lt();Uve();je();mn();rat();vn();GJ=x(et(),1),tBm={pr:null,needsAuth:!1,lastUpdated:0}});
export {eYl,rBm,GJ,JFm,XFm,QFm,ZFm,eBm,tBm,nBm,tYl};
