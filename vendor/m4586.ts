// @ts-nocheck
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function p5n(e){let t=Mcl.c(12),{children:n,color:r,dimColor:o}=e,s,i,a,l;if(t[0]!==n||t[1]!==r||t[2]!==o){let u=n.split("`");s=Text,i=r,a=o,l=u.map(k7p),t[0]=n,t[1]=r,t[2]=o,t[3]=s,t[4]=i,t[5]=a,t[6]=l}else s=t[3],i=t[4],a=t[5],l=t[6];let c;if(t[7]!==s||t[8]!==i||t[9]!==a||t[10]!==l)c=N6t.createElement(s,{color:i,dimColor:a},l),t[7]=s,t[8]=i,t[9]=a,t[10]=l,t[11]=c;else c=t[11];return c}
function k7p(e,t){return t%2===1?N6t.createElement(Text,{key:t,color:"suggestion"},e):e}
var Mcl,N6t;
var jTo=b(()=>{ze();Mcl=M(rt(),1),N6t=M(Te(),1)});
export {p5n,k7p,Mcl,N6t,jTo};
