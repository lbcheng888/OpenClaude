// @ts-nocheck
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function J4(e){let t=$ia.c(10),{added:n,removed:r,bold:o}=e;if(n===0&&r===0)return null;let s;if(t[0]!==n||t[1]!==o)s=n>0&&tDn.jsxs(Text,{color:"diffAddedWord",bold:o,children:["+",n]}),t[0]=n,t[1]=o,t[2]=s;else s=t[2];let i=n>0&&r>0&&" ",a;if(t[3]!==o||t[4]!==r)a=r>0&&tDn.jsxs(Text,{color:"diffRemovedWord",bold:o,children:["-",r]}),t[3]=o,t[4]=r,t[5]=a;else a=t[5];let l;if(t[6]!==s||t[7]!==i||t[8]!==a)l=tDn.jsxs(Text,{children:[s,i,a]}),t[6]=s,t[7]=i,t[8]=a,t[9]=l;else l=t[9];return l}
var $ia,tDn;
var $He=b(()=>{je();$ia=x(tt(),1),tDn=x(oe(),1)});
export {J4,$ia,tDn,$He};
