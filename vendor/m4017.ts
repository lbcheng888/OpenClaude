// @ts-nocheck
import {yY,G3t} from "./m4016.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Decorative} from "./m2445.ts";
import {useIsScreenReaderEnabled} from "./m2444.ts";
import {MA,qZ} from "../src/telemetry/2538_qZ.ts";
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {useClock} from "./m2442.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function ZA(e,t,n,r){return Array.from({length:n},()=>({pose:e,offset:t,x:r}))}
function Rpo(e){return[{pose:"default",offset:1,x:e,poof:"dot"},{pose:"default",offset:1,x:e,poof:"wave"}]}
function G0p(e,t){if(!t||e.length===0)return e;let n=e[0],r=n.x!==void 0&&n.x!==0?n:C3a,o=Math.max(1,Math.round(t/A3a));return[...Array.from({length:o},()=>r),...e]}
function N6e(e){let t=b3a.c(15),n;if(t[0]!==e)n=e===void 0?{}:e,t[0]=e,t[1]=n;else n=t[1];let{autoplay:r,sequence:o,delayMs:s,onComplete:i}=n,a=r===void 0?!1:r,{pose:l,bounceOffset:c,x:u,poof:d,onClick:p}=Y0p(a,o,s,i),m;if(t[2]!==l)m=gG.jsx(yY,{pose:l}),t[2]=l,t[3]=m;else m=t[3];let f;if(t[4]!==c||t[5]!==m||t[6]!==u)f=gG.jsx(Box,{marginTop:c,marginLeft:u,flexShrink:0,children:m}),t[4]=c,t[5]=m,t[6]=u,t[7]=f;else f=t[7];let h;if(t[8]!==c||t[9]!==d)h=d&&c>0?gG.jsxs(gG.Fragment,{children:[gG.jsx(Box,{position:"absolute",top:Apo-1,left:0,children:gG.jsx(Text,{color:"inactive",children:y3a[d]})}),gG.jsx(Box,{position:"absolute",top:Apo-1,right:0,children:gG.jsx(Text,{color:"inactive",children:y3a[d]})})]}):null,t[8]=c,t[9]=d,t[10]=h;else h=t[10];let g;if(t[11]!==p||t[12]!==f||t[13]!==h)g=gG.jsx(Decorative,{children:gG.jsxs(Box,{height:Apo,width:R3a,flexDirection:"column",flexShrink:0,overflow:"hidden",onClick:p,children:[f,h]})}),t[11]=p,t[12]=f,t[13]=h,t[14]=g;else g=t[14];return g}
function Y0p(e,t,n,r){let o=useIsScreenReaderEnabled(),[s]=fce.useState(()=>MA(getInitialSettings().prefersReducedMotion)||o),i=(e||t!==void 0)&&!s,[a,l]=fce.useState(i?0:-1),c=fce.useRef(G0p(t?S3a[t]:e?W0p:i3n,t?n:void 0)),u=fce.useRef(r);u.current=r;let d=fce.useRef(!t),p=useClock();fce.useEffect(()=>{if(s)u.current?.()},[s]);let m=()=>{if(e||s||a!==-1||!d.current)return;c.current=T3a[Math.floor(Math.random()*T3a.length)],l(0)};fce.useEffect(()=>{if(a===-1)return;if(a>=c.current.length){d.current=!0,u.current?.(),l(e&&!t?0:-1);return}return p.setTimeout(()=>l(V0p),A3a)},[a,e,t,p]);let f=c.current,h=t?S3a[t].at(-1):C3a,g=a>=0&&a<f.length?f[a]:h;return{pose:g.pose,bounceOffset:g.offset,x:g.x??0,poof:g.poof,onClick:m}}
var b3a,fce,gG,y3a,i3n,E3a,W0p,T3a,C3a,A3a=60,V0p=(e)=>e+1,Apo=3,R3a=9,K0p,z0p,j0p,S3a;
var vpo=b(()=>{je();qZ();br();G3t();b3a=x(tt(),1),fce=x(et(),1),gG=x(oe(),1),y3a={dot:"\xB7",wave:"~"};i3n=[...Rpo(),...ZA("arms-up",0,3),...ZA("default",0,1),...Rpo(),...ZA("arms-up",0,3),...ZA("default",0,1)],E3a=[...ZA("look-right",0,5),...ZA("look-left",0,5),...ZA("default",0,1)],W0p=[...ZA("default",0,12),...ZA("look-right",0,5),...ZA("look-left",0,5)],T3a=[i3n,E3a],C3a={pose:"default",offset:0};K0p=[...i3n,...ZA("default",1,3)],z0p=[...ZA("look-left",0,2),...ZA("look-right",0,2),...ZA("look-left",0,2),...ZA("arms-up",0,3),...ZA("default",0,1)],j0p=[...ZA("default",1,1,-R3a),...ZA("arms-up",0,2,-6),...ZA("default",0,1,-6),...ZA("default",1,1,-6),...ZA("arms-up",0,2,-3),...ZA("default",0,1,-3),...ZA("default",1,1,-3),...ZA("arms-up",0,2,0),...Rpo(0),...ZA("default",0,1,0)],S3a={jump:i3n,look:E3a,celebrate:K0p,skip:j0p,spin:z0p}});
export {ZA,Rpo,G0p,N6e,Y0p,b3a,fce,gG,y3a,i3n,E3a,W0p,T3a,C3a,A3a,V0p,Apo,R3a,K0p,z0p,j0p,S3a,vpo};
