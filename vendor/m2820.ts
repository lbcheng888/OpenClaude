// @ts-nocheck
import {Text} from "./m2433.ts";
import {getFastModeModelDisplayName,lr} from "./m233.ts";
import {YM,Tve} from "./m2279.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
var QWi="",ZWi="";
function F4(e){let t=eGi.c(17),{ratio:n,width:r,fillColor:o,emptyColor:s,variant:i}=e,a=i===void 0?"block":i,l,c,u,d,p,m;if(t[0]!==s||t[1]!==o||t[2]!==n||t[3]!==a||t[4]!==r){m=Symbol.for("react.early_return_sentinel");e:{let h=tBd(n);if(a==="pill"){let{fill:g,empty:_}=eBd(),T=Math.round(h*r);m=Wot.jsxs(Text,{children:[Wot.jsx(Text,{color:o,children:getFastModeModelDisplayName(g,T)}),Wot.jsx(Text,{color:s,dimColor:s===void 0,children:getFastModeModelDisplayName(_,r-T)})]});break e}l=Text,c=o,u=s,d=`${Math.round(h*100)}%`,p=nBd(h,r)}t[0]=s,t[1]=o,t[2]=n,t[3]=a,t[4]=r,t[5]=l,t[6]=c,t[7]=u,t[8]=d,t[9]=p,t[10]=m}else l=t[5],c=t[6],u=t[7],d=t[8],p=t[9],m=t[10];if(m!==Symbol.for("react.early_return_sentinel"))return m;let f;if(t[11]!==l||t[12]!==c||t[13]!==u||t[14]!==d||t[15]!==p)f=Wot.jsx(l,{color:c,backgroundColor:u,"aria-label":d,children:p}),t[11]=l,t[12]=c,t[13]=u,t[14]=d,t[15]=p,t[16]=f;else f=t[16];return f}
var eGi,Wot,KIn,QFd,ZFd,eBd=()=>YM.hasGeometricShapesInkBleedBug()?ZFd:QFd,tBd=(e)=>Math.min(1,Math.max(0,e)),nBd=(e,t)=>{let n=Math.floor(e*t),r=[KIn.at(-1).repeat(n)];if(n<t){let o=e*t-n,s=Math.floor(o*(KIn.length-1));r.push(KIn[s]);let i=t-n-1;if(i>0)r.push(KIn[0].repeat(i))}return r.join("")};
var iHe=b(()=>{Tve();je();lr();eGi=x(tt(),1),Wot=x(oe(),1),KIn=[" ","\u258F","\u258E","\u258D","\u258C","\u258B","\u258A","\u2589","\u2588"],QFd={fill:"\u25B0",empty:"\u25B1"},ZFd={fill:"\u2588",empty:"\u2591"}});
export {QWi,ZWi,F4,eGi,Wot,KIn,QFd,ZFd,eBd,tBd,nBd,iHe};
