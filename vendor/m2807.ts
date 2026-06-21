// @ts-nocheck
import {Text} from "./m2423.ts";
import {uf,dr} from "./m231.ts";
import {die,rZe} from "./m2292.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var o3i="",s3i="";
function Eq(e){let t=i3i.c(17),{ratio:n,width:r,fillColor:o,emptyColor:s,variant:i}=e,a=i===void 0?"block":i,l,c,u,d,p,m;if(t[0]!==s||t[1]!==o||t[2]!==n||t[3]!==a||t[4]!==r){m=Symbol.for("react.early_return_sentinel");e:{let A=AHd(n);if(a==="pill"){let{fill:h,empty:g}=fHd(),_=Math.round(A*r);m=fLt.default.createElement(Text,null,fLt.default.createElement(Text,{color:o},uf(h,_)),fLt.default.createElement(Text,{color:s,dimColor:s===void 0},uf(g,r-_)));break e}l=Text,c=o,u=s,d=`${Math.round(A*100)}%`,p=hHd(A,r)}t[0]=s,t[1]=o,t[2]=n,t[3]=a,t[4]=r,t[5]=l,t[6]=c,t[7]=u,t[8]=d,t[9]=p,t[10]=m}else l=t[5],c=t[6],u=t[7],d=t[8],p=t[9],m=t[10];if(m!==Symbol.for("react.early_return_sentinel"))return m;let f;if(t[11]!==l||t[12]!==c||t[13]!==u||t[14]!==d||t[15]!==p)f=fLt.default.createElement(l,{color:c,backgroundColor:u,"aria-label":d},p),t[11]=l,t[12]=c,t[13]=u,t[14]=d,t[15]=p,t[16]=f;else f=t[16];return f}
var i3i,fLt,nxn,pHd,mHd,fHd=()=>die.hasGeometricShapesInkBleedBug()?mHd:pHd,AHd=(e)=>Math.min(1,Math.max(0,e)),hHd=(e,t)=>{let n=Math.floor(e*t),r=[nxn.at(-1).repeat(n)];if(n<t){let o=e*t-n,s=Math.floor(o*(nxn.length-1));r.push(nxn[s]);let i=t-n-1;if(i>0)r.push(nxn[0].repeat(i))}return r.join("")};
var _xe=b(()=>{rZe();ze();dr();i3i=M(rt(),1),fLt=M(Te(),1),nxn=[" ","\u258F","\u258E","\u258D","\u258C","\u258B","\u258A","\u2589","\u2588"],pHd={fill:"\u25B0",empty:"\u25B1"},mHd={fill:"\u2588",empty:"\u2591"}});
export {o3i,s3i,Eq,i3i,fLt,nxn,pHd,mHd,fHd,AHd,hHd,_xe};
