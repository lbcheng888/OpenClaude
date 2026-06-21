// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Es,kte} from "./m3926.ts";
import {aD,bne} from "./m4590.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function f5n(e){let t=Vcl.c(8),{errors:n}=e;if(n.length===0)return null;let r,o,s;if(t[0]!==n){let a=n.reduce(q7p,{}),l=Object.keys(a).sort();r=Box,o="column",s=l.map((c)=>{let u=a[c]||[];u.sort($7p);let d=new Map;return u.forEach((p)=>{if(p.suggestion||p.docLink){let m=`${p.suggestion||""}|${p.docLink||""}`;if(!d.has(m))d.set(m,{suggestion:p.suggestion,docLink:p.docLink})}}),Qv.createElement(Box,{key:c,flexDirection:"column"},Qv.createElement(Text,null,c),Qv.createElement(Es,{variant:"tree"},u.map(U7p)),d.size>0&&Qv.createElement(Box,{flexDirection:"column",marginTop:1},Array.from(d.values()).map(F7p)))}),t[0]=n,t[1]=r,t[2]=o,t[3]=s}else r=t[1],o=t[2],s=t[3];let i;if(t[4]!==r||t[5]!==o||t[6]!==s)i=Qv.createElement(r,{flexDirection:o},s),t[4]=r,t[5]=o,t[6]=s,t[7]=i;else i=t[7];return i}
function F7p(e,t){return Qv.createElement(Box,{key:`suggestion-pair-${t}`,flexDirection:"column",marginBottom:1},e.suggestion&&Qv.createElement(Text,{dimColor:!0,wrap:"wrap"},e.suggestion),e.docLink&&Qv.createElement(aD,{url:e.docLink}))}
function U7p(e,t){let n=j7p(e);return Qv.createElement(Es.Node,{key:t},n?Qv.createElement(Text,null,n,": ",Qv.createElement(Text,{dimColor:!0},e.message)):Qv.createElement(Text,{dimColor:!0},e.message))}
function $7p(e,t){if(!e.path&&t.path)return-1;if(e.path&&!t.path)return 1;return(e.path||"").localeCompare(t.path||"")}
function q7p(e,t){let n=t.file||"(file not specified)";if(!e[n])e[n]=[];return e[n].push(t),e}
function j7p(e){if(!e.path)return null;let t=e.path.split("."),n=t[t.length-1];if(e.invalidValue!==null&&e.invalidValue!==void 0&&n!==void 0&&!isNaN(parseInt(n,10))){let r=typeof e.invalidValue==="string"?`"${e.invalidValue}"`:String(e.invalidValue);return[...t.slice(0,-1),r].join(".")}return e.path}
var Vcl,Qv;
var YTo=b(()=>{ze();bne();kte();Vcl=M(rt(),1),Qv=M(Te(),1)});
export {f5n,F7p,U7p,$7p,q7p,j7p,Vcl,Qv,YTo};
