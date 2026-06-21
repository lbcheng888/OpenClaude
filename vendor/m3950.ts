// @ts-nocheck
import {UY,r$t} from "./m3949.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Decorative} from "./m2435.ts";
import {useIsScreenReaderEnabled} from "./m2434.ts";
import {Dv,VZ} from "../src/telemetry/2527_VZ.ts";
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {useClock} from "./m2432.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Gv(e,t,n,r){return Array.from({length:n},()=>({pose:e,offset:t,x:r}))}
function qio(e){return[{pose:"default",offset:1,x:e,poof:"dot"},{pose:"default",offset:1,x:e,poof:"wave"}]}
function GSp(e,t){if(!t||e.length===0)return e;let n=e[0],r=n.x!==void 0&&n.x!==0?n:QMa,o=Math.max(1,Math.round(t/ZMa));return[...Array.from({length:o},()=>r),...e]}
function rqe(e){let t=JMa.c(15),n;if(t[0]!==e)n=e===void 0?{}:e,t[0]=e,t[1]=n;else n=t[1];let{autoplay:r,sequence:o,delayMs:s,onComplete:i}=n,a=r===void 0?!1:r,{pose:l,bounceOffset:c,x:u,poof:d,onClick:p}=JSp(a,o,s,i),m;if(t[2]!==l)m=Yk.createElement(UY,{pose:l}),t[2]=l,t[3]=m;else m=t[3];let f;if(t[4]!==c||t[5]!==m||t[6]!==u)f=Yk.createElement(Box,{marginTop:c,marginLeft:u,flexShrink:0},m),t[4]=c,t[5]=m,t[6]=u,t[7]=f;else f=t[7];let A;if(t[8]!==c||t[9]!==d)A=d&&c>0?Yk.createElement(Yk.Fragment,null,Yk.createElement(Box,{position:"absolute",top:$io-1,left:0},Yk.createElement(Text,{color:"inactive"},KMa[d])),Yk.createElement(Box,{position:"absolute",top:$io-1,right:0},Yk.createElement(Text,{color:"inactive"},KMa[d]))):null,t[8]=c,t[9]=d,t[10]=A;else A=t[10];let h;if(t[11]!==p||t[12]!==f||t[13]!==A)h=Yk.createElement(Decorative,null,Yk.createElement(Box,{height:$io,width:e1a,flexDirection:"column",flexShrink:0,overflow:"hidden",onClick:p},f,A)),t[11]=p,t[12]=f,t[13]=A,t[14]=h;else h=t[14];return h}
function JSp(e,t,n,r){let o=useIsScreenReaderEnabled(),[s]=gce.useState(()=>Dv(getInitialSettings().prefersReducedMotion)||o),i=(e||t!==void 0)&&!s,[a,l]=gce.useState(i?0:-1),c=gce.useRef(GSp(t?YMa[t]:e?WSp:wUn,t?n:void 0)),u=gce.useRef(r);u.current=r;let d=gce.useRef(!t),p=useClock();gce.useEffect(()=>{if(s)u.current?.()},[s]);let m=()=>{if(e||s||a!==-1||!d.current)return;c.current=zMa[Math.floor(Math.random()*zMa.length)],l(0)};gce.useEffect(()=>{if(a===-1)return;if(a>=c.current.length){d.current=!0,u.current?.(),l(e&&!t?0:-1);return}return p.setTimeout(()=>l(VSp),ZMa)},[a,e,t,p]);let f=c.current,A=t?YMa[t].at(-1):QMa,h=a>=0&&a<f.length?f[a]:A;return{pose:h.pose,bounceOffset:h.offset,x:h.x??0,poof:h.poof,onClick:m}}
var JMa,Yk,gce,KMa,wUn,XMa,WSp,zMa,QMa,ZMa=60,VSp=(e)=>e+1,$io=3,e1a=9,KSp,zSp,YSp,YMa;
var jio=b(()=>{ze();VZ();yr();r$t();JMa=M(rt(),1),Yk=M(Te(),1),gce=M(Te(),1),KMa={dot:"\xB7",wave:"~"};wUn=[...qio(),...Gv("arms-up",0,3),...Gv("default",0,1),...qio(),...Gv("arms-up",0,3),...Gv("default",0,1)],XMa=[...Gv("look-right",0,5),...Gv("look-left",0,5),...Gv("default",0,1)],WSp=[...Gv("default",0,12),...Gv("look-right",0,5),...Gv("look-left",0,5)],zMa=[wUn,XMa],QMa={pose:"default",offset:0};KSp=[...wUn,...Gv("default",1,3)],zSp=[...Gv("look-left",0,2),...Gv("look-right",0,2),...Gv("look-left",0,2),...Gv("arms-up",0,3),...Gv("default",0,1)],YSp=[...Gv("default",1,1,-e1a),...Gv("arms-up",0,2,-6),...Gv("default",0,1,-6),...Gv("default",1,1,-6),...Gv("arms-up",0,2,-3),...Gv("default",0,1,-3),...Gv("default",1,1,-3),...Gv("arms-up",0,2,0),...qio(0),...Gv("default",0,1,0)],YMa={jump:wUn,look:XMa,celebrate:KSp,skip:YSp,spin:zSp}});
export {Gv,qio,GSp,rqe,JSp,JMa,Yk,gce,KMa,wUn,XMa,WSp,zMa,QMa,ZMa,VSp,$io,e1a,KSp,zSp,YSp,YMa,jio};
