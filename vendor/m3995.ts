// @ts-nocheck
import {wNa,xao} from "./m3993.ts";
import {JUn,Hao} from "./m3994.ts";
import {Text} from "./m2423.ts";
import {et,Ai} from "./m2208.ts";
import {Box} from "./m2422.ts";
import {dg,J4} from "./m2570.ts";
import {FBe,ehn,Z8,isFastModeEligible} from "../src/telemetry/2027_word.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function HNa(e){let t=XUn.c(28),{text:n,useBriefLayout:r,timestamp:o}=e,s=wNa(),i=s?.isQueued??!1,a=typeof n==="object";if(r){let p;if(t[0]!==o)p=o?JUn(o):"",t[0]=o,t[1]=p;else p=t[1];let m=p,f=i?"subtle":"text",A=s?.selectionHighlight==="on",h;if(t[2]!==A)h=A?Ju.createElement(Text,{"aria-label":"selected:",color:"suggestion"},et.pointer," "):null,t[2]=A,t[3]=h;else h=t[3];let g=A?"suggestion":i?"subtle":"briefLabelYou",_;if(t[4]!==g)_=Ju.createElement(Text,{color:g},"You"),t[4]=g,t[5]=_;else _=t[5];let y;if(t[6]!==m)y=m?Ju.createElement(Text,{dimColor:!0}," ",m):null,t[6]=m,t[7]=y;else y=t[7];let T;if(t[8]!==h||t[9]!==_||t[10]!==y)T=Ju.createElement(Box,{flexDirection:"row"},h,_,y),t[8]=h,t[9]=_,t[10]=y,t[11]=T;else T=t[11];let S;if(t[12]!==n||t[13]!==f||t[14]!==a)S=a?Ju.createElement(Ju.Fragment,null,Ju.createElement(Text,{color:f},n.head),Ju.createElement(kNa,{hiddenLines:n.hiddenLines,indent:2}),Ju.createElement(Text,{color:f},n.tail)):Ju.createElement(Text,{color:f},n),t[12]=n,t[13]=f,t[14]=a,t[15]=S;else S=t[15];let v;if(t[16]!==T||t[17]!==S)v=Ju.createElement(Box,{flexDirection:"column",paddingLeft:2},T,S),t[16]=T,t[17]=S,t[18]=v;else v=t[18];return v}let l=3+(s?.paddingWidth??0),c;if(t[19]!==s?.selectionHighlight)c=Ju.createElement(Box,{flexShrink:0},s?.selectionHighlight==="off"?Ju.createElement(Text,null,"  "):Ju.createElement(Text,{"aria-label":s?.selectionHighlight==="on"?"selected:":"you:",color:s?.selectionHighlight==="on"?"suggestion":"subtle"},et.pointer," ")),t[19]=s?.selectionHighlight,t[20]=c;else c=t[20];let u;if(t[21]!==l||t[22]!==n||t[23]!==a)u=a?Ju.createElement(Box,{flexDirection:"column"},Ju.createElement(Iao,{text:n.head}),Ju.createElement(kNa,{hiddenLines:n.hiddenLines,indent:l}),Ju.createElement(Iao,{text:n.tail})):Ju.createElement(Iao,{text:n}),t[21]=l,t[22]=n,t[23]=a,t[24]=u;else u=t[24];let d;if(t[25]!==c||t[26]!==u)d=Ju.createElement(Box,{flexDirection:"row"},c,u),t[25]=c,t[26]=u,t[27]=d;else d=t[27];return d}
function kNa(e){let t=XUn.c(3),{hiddenLines:n,indent:r}=e,o=`(${n} ${n===1?"line":"lines"} hidden)`,s;if(t[0]!==r||t[1]!==o)s=Ju.createElement(dg,{title:o,titleAlign:"start",color:"subtle",padding:r}),t[0]=r,t[1]=o,t[2]=s;else s=t[2];return s}
function Iao(e){let t=XUn.c(3),{text:n}=e,r,o;if(t[0]!==n){o=Symbol.for("react.early_return_sentinel");e:{let s=FBe()?ehn(n):[];if(s.length===0){o=Ju.createElement(Text,{color:"text"},n);break e}let i=[],a=0;for(let l of s){if(l.start>a)i.push(Ju.createElement(Text,{key:`plain-${a}`,color:"text"},n.slice(a,l.start)));for(let c=l.start;c<l.end;c++)i.push(Ju.createElement(Text,{key:`rb-${c}`,color:Z8(c-l.start)},n[c]));a=l.end}if(a<n.length)i.push(Ju.createElement(Text,{key:`plain-${a}`,color:"text"},n.slice(a)));r=Ju.createElement(Text,null,i)}t[0]=n,t[1]=r,t[2]=o}else r=t[1],o=t[2];if(o!==Symbol.for("react.early_return_sentinel"))return o;return r}
var XUn,Ju;
var INa=b(()=>{Ai();xao();ze();Hao();isFastModeEligible();J4();XUn=M(rt(),1),Ju=M(Te(),1)});
export {HNa,kNa,Iao,XUn,Ju,INa};
