// @ts-nocheck
import {useTheme} from "./m2285.ts";
import {Box} from "./m2432.ts";
import {ezr} from "./m2769.ts";
import {e1} from "./m2376.ts";
import {sn,mc} from "./m237.ts";
import {Text} from "./m2433.ts";
import {NoSelect} from "./m2447.ts";
import {b,x} from "../runtime.ts";
import {J$e} from "./m2773.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function OXi(e){let t=PXi.c(10),{patch:n,dim:r,width:o}=e,[s]=useTheme(),i;if(t[0]!==r||t[1]!==n.lines||t[2]!==n.oldStart||t[3]!==s||t[4]!==o)i=uqd(n.lines,n.oldStart,o,r,s),t[0]=r,t[1]=n.lines,t[2]=n.oldStart,t[3]=s,t[4]=o,t[5]=i;else i=t[5];let a=i,l;if(t[6]!==a)l=a.map(sqd),t[6]=a,t[7]=l;else l=t[7];let c;if(t[8]!==l)c=CW.jsx(Box,{flexDirection:"column",flexGrow:1,children:l}),t[8]=l,t[9]=c;else c=t[9];return c}
function sqd(e,t){return CW.jsx(Box,{children:e},t)}
function iqd(e){return e.map((t)=>{if(t.startsWith("+"))return{code:t.slice(1),i:0,type:"add",originalCode:t.slice(1)};if(t.startsWith("-"))return{code:t.slice(1),i:0,type:"remove",originalCode:t.slice(1)};return{code:t.slice(1),i:0,type:"nochange",originalCode:t.slice(1)}})}
function aqd(e){let t=[],n=0;while(n<e.length){let r=e[n];if(!r){n++;continue}if(r.type==="remove"){let o=[r],s=n+1;while(s<e.length&&e[s]?.type==="remove"){let a=e[s];if(a)o.push(a);s++}let i=[];while(s<e.length&&e[s]?.type==="add"){let a=e[s];if(a)i.push(a);s++}if(o.length>0&&i.length>0){let a=Math.min(o.length,i.length);for(let l=0;l<a;l++){let c=o[l],u=i[l];if(c&&u)c.wordDiff=!0,u.wordDiff=!0,c.matchedLine=u,u.matchedLine=c}t.push(...o.filter(Boolean)),t.push(...i.filter(Boolean)),n=s}else t.push(r),n++}else t.push(r),n++}return t}
function lqd(e,t){return ezr(e,t,{ignoreCase:!1})}
function cqd(e,t,n,r,o){let{type:s,i,wordDiff:a,matchedLine:l,originalCode:c}=e;if(!a||!l)return null;let u=s==="remove"?c:l.originalCode,d=s==="remove"?l.originalCode:c,p=lqd(u,d),m=u.length+d.length;if(p.filter((R)=>R.added||R.removed).reduce((R,w)=>R+w.value.length,0)/m>oqd||r)return null;let g=s==="add"?"+":"-",_=g.length,T=Math.max(1,t-n-1-_),y=[],S=[],E=0;if(p.forEach((R,w)=>{let H=!1,k;if(s==="add"){if(R.added)H=!0,k="diffAddedWord";else if(!R.removed)H=!0}else if(s==="remove"){if(R.removed)H=!0,k="diffRemovedWord";else if(!R.added)H=!0}if(!H)return;e1(R.value,T,"wrap").split(`
`).forEach((O,L)=>{if(!O)return;if(L>0||E+sn(O)>T){if(S.length>0)y.push({content:[...S],contentWidth:E}),S=[],E=0}S.push(CW.jsx(Text,{backgroundColor:k,children:O},`part-${w}-${L}`)),E+=sn(O)})}),S.length>0)y.push({content:S,contentWidth:E});return y.map(({content:R,contentWidth:w},H)=>{let k=`${s}-${i}-${H}`,I=s==="add"?r?"diffAddedDimmed":"diffAdded":r?"diffRemovedDimmed":"diffRemoved",D=H===0?i:void 0,O=(D!==void 0?D.toString().padStart(n):" ".repeat(n))+" ",L=O.length+_+w,P=Math.max(0,t-L);return CW.jsxs(Box,{flexDirection:"row",children:[CW.jsx(NoSelect,{fromLeftEdge:!0,children:CW.jsxs(Text,{color:o?"text":void 0,backgroundColor:I,dimColor:r,children:[O,g]})}),CW.jsxs(Text,{color:o?"text":void 0,backgroundColor:I,dimColor:r,children:[R," ".repeat(P)]})]},k)})}
function uqd(e,t,n,r,o){let s=Math.max(1,Math.floor(n)),i=iqd(e),a=aqd(i),l=dqd(a,t),c=Math.max(...l.map(({i:d})=>d),0),u=Math.max(c.toString().length+1,0);return l.flatMap((d)=>{let{type:p,code:m,i:f,wordDiff:h,matchedLine:g}=d;if(h&&g){let E=cqd(d,s,u,r,o);if(E!==null)return E}let _=2,T=Math.max(1,s-u-1-_);return e1(m,T,"wrap").split(`
`).map((E,R)=>{let w=`${p}-${f}-${R}`,H=R===0?f:void 0,k=(H!==void 0?H.toString().padStart(u):" ".repeat(u))+" ",I=p==="add"?"+":p==="remove"?"-":" ",D=k.length+1+sn(E),O=Math.max(0,s-D),L=p==="add"?r?"diffAddedDimmed":"diffAdded":p==="remove"?r?"diffRemovedDimmed":"diffRemoved":void 0;return CW.jsxs(Box,{flexDirection:"row",children:[CW.jsx(NoSelect,{fromLeftEdge:!0,children:CW.jsxs(Text,{color:o?"text":void 0,backgroundColor:L,dimColor:r||p==="nochange",children:[k,I]})}),CW.jsxs(Text,{color:o?"text":void 0,backgroundColor:L,dimColor:r,children:[E," ".repeat(O)]})]},w)})})}
function dqd(e,t){let n=t,r=[],o=[...e];while(o.length>0){let s=o.shift(),{code:i,type:a,originalCode:l,wordDiff:c,matchedLine:u}=s,d={code:i,type:a,i:n,originalCode:l,wordDiff:c,matchedLine:u};switch(a){case"nochange":n++,r.push(d);break;case"add":n++,r.push(d);break;case"remove":{r.push(d);let p=0;while(o[0]?.type==="remove"){n++;let m=o.shift(),{code:f,type:h,originalCode:g,wordDiff:_,matchedLine:T}=m,y={code:f,type:h,i:n,originalCode:g,wordDiff:_,matchedLine:T};r.push(y),p++}n-=p;break}}}return r}
var PXi,CW,oqd=0.4;
var LXi=b(()=>{J$e();mc();je();PXi=x(tt(),1),CW=x(oe(),1)});
export {OXi,sqd,iqd,aqd,lqd,cqd,uqd,dqd,PXi,CW,oqd,LXi};
