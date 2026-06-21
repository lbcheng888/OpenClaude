// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {Link} from "../../vendor/m2427.ts";
import {Text} from "../../vendor/m2423.ts";
import {Ui,Ld} from "../../vendor/m2459.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {J4l,EPo,CPo,Y4l,X4l} from "../../vendor/m5316.ts";
import {De,Rn} from "../session/0615_length.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
var eql={};
isFullscreenWithTTY(eql,{ClosedIssueNotice:()=>ClosedIssueNotice});
function Q4l(e){return J8e.createElement(Link,{key:e,url:`${Akm}${e}`},"#",e)}
function hkm(e){if(e.length===1)return J8e.createElement(Text,{color:"success"},"\u2713 Your issue ",Q4l(e[0].number)," has been closed. Thanks for reporting!");let t=e.flatMap((n,r)=>[r>0?", ":"",Q4l(n.number)]);return J8e.createElement(Text,{color:"success"},"\u2713 ",e.length," of your issues have been closed (",t,"). Thanks for reporting!")}
function ClosedIssueNotice(){let e=Z4l.c(3),{addNotification:t}=Ui(),n=ZYn.useRef(!1),r,o;if(e[0]!==t)r=()=>{if(n.current)return;if(n.current=!0,getFeatureValue_CACHED_MAY_BE_STALE("tengu_gouda_loop",!1)){let s=!1,i=[],a=function(u){let d=new Set(i.map(Tkm)),p=u.filter((m)=>!d.has(m.number));if(p.length===0)return;i.push(...p),logEvent("tengu_closed_issue_notice_shown",{newClosedIssueCount:p.length,totalClosedIssueCount:i.length}),t({key:"closed-issue-notice",kind:"event",jsx:hkm(i),priority:"low",timeoutMs:fkm,fold:ykm}),J4l(p.map(_km))};return async function(){let u=await EPo(),d=CPo(u);if(!s&&d.length>0)a(d);let p=await Y4l();if(s||p===null||p>mkm)return;let m=CPo(await EPo());if(!s&&m.length>0)a(m)}().catch(De),()=>{s=!0}}},o=[t],e[0]=t,e[1]=r,e[2]=o;else r=e[1],o=e[2];return ZYn.useEffect(r,o),null}
function _km(e){return e.number}
function ykm(e,t){return t}
function Tkm(e){return e.number}
var Z4l,J8e,ZYn,mkm=4000,fkm=1e4,Akm="https://github.com/anthropics/claude-code/issues/";
var tql=b(()=>{Ld();ze();zn();Ct();X4l();Rn();Z4l=M(rt(),1),J8e=M(Te(),1),ZYn=M(Te(),1)});
export {eql,Q4l,hkm,ClosedIssueNotice,_km,ykm,Tkm,Z4l,J8e,ZYn,mkm,fkm,Akm,tql};
