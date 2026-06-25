// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {Text} from "./m2433.ts";
import {truncate} from "./m239.ts";
import {wl,sy} from "./m2585.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Ivl(e){let{title:t,lines:n,footer:r,emptyMessage:o,customContent:s}=e,i=sn(t);if(s!==void 0)i=Math.max(i,s.width);else if(n.length===0&&o)i=Math.max(i,sn(o));else{let l=Math.max(0,...n.map((c)=>c.timestamp?sn(c.timestamp):0));for(let c of n){let u=l>0?l:0,d=sn(c.text)+(u>0?u+2:0);i=Math.max(i,d)}}if(r)i=Math.max(i,sn(r));return i}
function xvl(e){let t=Hvl.c(15),{config:n,actualWidth:r}=e,{title:o,lines:s,footer:i,emptyMessage:a,customContent:l}=n,c;if(t[0]!==s)c=Math.max(0,...s.map(Gcm)),t[0]=s,t[1]=c;else c=t[1];let u=c,d;if(t[2]!==o)d=pN.jsx(Text,{bold:!0,color:"claude",children:o}),t[2]=o,t[3]=d;else d=t[3];let p;if(t[4]!==r||t[5]!==l||t[6]!==a||t[7]!==i||t[8]!==s||t[9]!==u)p=l?pN.jsxs(pN.Fragment,{children:[l.content,i&&pN.jsx(Text,{dimColor:!0,italic:!0,children:truncate(i,r)})]}):s.length===0&&a?pN.jsx(wl,{children:truncate(a,r)}):pN.jsxs(pN.Fragment,{children:[s.map((f,h)=>{let g=Math.max(10,r-(u>0?u+2:0));return pN.jsxs(Text,{children:[u>0&&pN.jsxs(pN.Fragment,{children:[pN.jsx(Text,{dimColor:!0,children:(f.timestamp||"").padEnd(u)}),"  "]}),pN.jsx(Text,{children:truncate(f.text,g)})]},h)}),i&&pN.jsx(Text,{dimColor:!0,italic:!0,children:truncate(i,r)})]}),t[4]=r,t[5]=l,t[6]=a,t[7]=i,t[8]=s,t[9]=u,t[10]=p;else p=t[10];let m;if(t[11]!==r||t[12]!==d||t[13]!==p)m=pN.jsxs(Box,{flexDirection:"column",width:r,children:[d,p]}),t[11]=r,t[12]=d,t[13]=p,t[14]=m;else m=t[14];return m}
function Gcm(e){return e.timestamp?sn(e.timestamp):0}
var Hvl,pN;
var Dvl=b(()=>{mc();je();Xo();sy();Hvl=x(tt(),1),pN=x(oe(),1)});
export {Ivl,xvl,Gcm,Hvl,pN,Dvl};
