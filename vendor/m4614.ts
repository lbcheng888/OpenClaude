// @ts-nocheck
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function KKn(e){let t=__l.c(12),{children:n,color:r,dimColor:o}=e,s,i,a,l;if(t[0]!==n||t[1]!==r||t[2]!==o){let u=n.split("`");s=Text,i=r,a=o,l=u.map(Ptm),t[0]=n,t[1]=r,t[2]=o,t[3]=s,t[4]=i,t[5]=a,t[6]=l}else s=t[3],i=t[4],a=t[5],l=t[6];let c;if(t[7]!==s||t[8]!==i||t[9]!==a||t[10]!==l)c=nvo.jsx(s,{color:i,dimColor:a,children:l}),t[7]=s,t[8]=i,t[9]=a,t[10]=l,t[11]=c;else c=t[11];return c}
function Ptm(e,t){return t%2===1?nvo.jsx(Text,{color:"suggestion",children:e},t):e}
var __l,nvo;
var rvo=b(()=>{je();__l=x(tt(),1),nvo=x(oe(),1)});
export {KKn,Ptm,__l,nvo,rvo};
