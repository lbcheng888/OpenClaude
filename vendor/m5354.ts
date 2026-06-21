// @ts-nocheck
import {useClock} from "./m2432.ts";
import {useTerminalFocus,twe} from "./m2380.ts";
import {Q1t,jee,S9e,vla,ost} from "../src/telemetry/3312_stdout.ts";
import {getLastInteractionTime,lt} from "../src/session/0131_sent.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function bjl(e,t=!0){let[n,r]=tX.useState(KIm),[o,s]=tX.useState(0),i=tX.useRef(null),a=tX.useRef(0),l=tX.useRef(0),c=useClock(),u=useTerminalFocus(),d=tX.useRef(u);return d.current=u,tX.useEffect(()=>{if(!Q1t())return;if(!u||jee.disabled)return;if(a.current===0)return;if(Date.now()-a.current<GIm)return;l.current=0,a.current=0,s((p)=>p+1)},[u]),tX.useEffect(()=>S9e.subscribe(()=>{if(jee.disabled)return;l.current=0,a.current=0,s((p)=>p+1)}),[]),tX.useEffect(()=>{if(!t)return;if(jee.disabled)return;let p=!1,m=-1,f=Date.now();function A(y){if(!Q1t())return qIm;return YIm(d.current,Date.now()-getLastInteractionTime(),y?0:l.current)}async function h(){if(p)return;let y=getLastInteractionTime();if(m!==y)m=y,f=Date.now();else if(Date.now()-f>=WIm)return;let T=Date.now(),S;try{S=await vla()}catch(I){De(I),S=null}let v=S;if(p)return;a.current=T;let R=v==="needs-auth",k=v==="fetch-failed",x=R||k?null:v;if(l.current=R?1:x===null?l.current+1:0,jee.badStreak=k?jee.badStreak+1:0,r((I)=>{if(I.lastUpdated>0&&I.pr?.number===x?.number&&I.pr?.url===x?.url&&I.pr?.reviewState===x?.reviewState&&I.pr?.kind===x?.kind&&I.needsAuth===R)return I;return{pr:x,needsAuth:R,lastUpdated:Date.now()}}),jee.badStreak>=VIm){jee.disabled=!0,isTmuxControlMode("github_pr_status_direct","bad_streak_disabled");return}let H=Date.now()-T;if(H>jIm){if(jee.disabled=!0,Q1t())isTmuxControlMode("github_pr_status_direct","slow_disabled",{elapsed_ms:H});return}if(!p)i.current=c.setTimeout(h,A(!1))}let g=A(!0),_=Date.now()-a.current;if(_>=g)h();else i.current=c.setTimeout(h,g-_);return()=>{if(p=!0,i.current)i.current(),i.current=null}},[e,t,o,c]),n}
function YIm(e,t,n){let r=t<30000?90000:t<300000?180000:t<1800000?600000:1800000,o=n<=0?90000:n===1?300000:n===2?900000:1800000;return Math.max(r,o,e?0:zIm)}
var tX,qIm=60000,jIm=4000,WIm=3600000,GIm=1e4,VIm=3,KIm,zIm=300000;
var Ejl=b(()=>{lt();twe();ze();ln();ost();Rn();tX=M(Te(),1),KIm={pr:null,needsAuth:!1,lastUpdated:0}});
export {bjl,YIm,tX,qIm,jIm,WIm,GIm,VIm,KIm,zIm,Ejl};
