// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {Text} from "./m2423.ts";
import {truncate} from "./m237.ts";
import {ic,Ny} from "./m2574.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {ps} from "./m238.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function P_l(e){let{title:t,lines:n,footer:r,emptyMessage:o,customContent:s}=e,i=tn(t);if(s!==void 0)i=Math.max(i,s.width);else if(n.length===0&&o)i=Math.max(i,tn(o));else{let l=Math.max(0,...n.map((c)=>c.timestamp?tn(c.timestamp):0));for(let c of n){let u=l>0?l:0,d=tn(c.text)+(u>0?u+2:0);i=Math.max(i,d)}}if(r)i=Math.max(i,tn(r));return i}
function O_l(e){let t=D_l.c(15),{config:n,actualWidth:r}=e,{title:o,lines:s,footer:i,emptyMessage:a,customContent:l}=n,c;if(t[0]!==s)c=Math.max(0,...s.map(Iem)),t[0]=s,t[1]=c;else c=t[1];let u=c,d;if(t[2]!==o)d=MT.createElement(Text,{bold:!0,color:"claude"},o),t[2]=o,t[3]=d;else d=t[3];let p;if(t[4]!==r||t[5]!==l||t[6]!==a||t[7]!==i||t[8]!==s||t[9]!==u)p=l?MT.createElement(MT.Fragment,null,l.content,i&&MT.createElement(Text,{dimColor:!0,italic:!0},truncate(i,r))):s.length===0&&a?MT.createElement(ic,null,truncate(a,r)):MT.createElement(MT.Fragment,null,s.map((f,A)=>{let h=Math.max(10,r-(u>0?u+2:0));return MT.createElement(Text,{key:A},u>0&&MT.createElement(MT.Fragment,null,MT.createElement(Text,{dimColor:!0},(f.timestamp||"").padEnd(u)),"  "),MT.createElement(Text,null,truncate(f.text,h)))}),i&&MT.createElement(Text,{dimColor:!0,italic:!0},truncate(i,r))),t[4]=r,t[5]=l,t[6]=a,t[7]=i,t[8]=s,t[9]=u,t[10]=p;else p=t[10];let m;if(t[11]!==r||t[12]!==d||t[13]!==p)m=MT.createElement(Box,{flexDirection:"column",width:r},d,p),t[11]=r,t[12]=d,t[13]=p,t[14]=m;else m=t[14];return m}
function Iem(e){return e.timestamp?tn(e.timestamp):0}
var D_l,MT;
var L_l=b(()=>{Hc();ze();ps();Ny();D_l=M(rt(),1),MT=M(Te(),1)});
export {P_l,O_l,Iem,D_l,MT,L_l};
