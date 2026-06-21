// @ts-nocheck
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Oq(e){let t=UZi.c(10),{added:n,removed:r,bold:o}=e;if(n===0&&r===0)return null;let s;if(t[0]!==n||t[1]!==o)s=n>0&&$$e.createElement(Text,{color:"diffAddedWord",bold:o},"+",n),t[0]=n,t[1]=o,t[2]=s;else s=t[2];let i=n>0&&r>0&&" ",a;if(t[3]!==o||t[4]!==r)a=r>0&&$$e.createElement(Text,{color:"diffRemovedWord",bold:o},"-",r),t[3]=o,t[4]=r,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==i||t[8]!==a)l=$$e.createElement(Text,null,s,i,a),t[6]=s,t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
var UZi,$$e;
var Qxe=b(()=>{ze();UZi=M(rt(),1),$$e=M(Te(),1)});
export {Oq,UZi,$$e,Qxe};
