// @ts-nocheck
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {cs,kte} from "./m3992.ts";
import {Sx,fne} from "./m4618.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function YKn(e){let t=w_l.c(8),{errors:n}=e;if(n.length===0)return null;let r,o,s;if(t[0]!==n){let a=n.reduce(Ktm,{}),l=Object.keys(a).sort();r=Box,o="column",s=l.map((c)=>{let u=a[c]||[];u.sort(Vtm);let d=new Map;return u.forEach((p)=>{if(p.suggestion||p.docLink){let m=`${p.suggestion||""}|${p.docLink||""}`;if(!d.has(m))d.set(m,{suggestion:p.suggestion,docLink:p.docLink})}}),y6.jsxs(Box,{flexDirection:"column",children:[y6.jsx(Text,{children:c}),y6.jsx(cs,{variant:"tree",children:u.map(Gtm)}),d.size>0&&y6.jsx(Box,{flexDirection:"column",marginTop:1,children:Array.from(d.values()).map(Wtm)})]},c)}),t[0]=n,t[1]=r,t[2]=o,t[3]=s}else r=t[1],o=t[2],s=t[3];let i;if(t[4]!==r||t[5]!==o||t[6]!==s)i=y6.jsx(r,{flexDirection:o,children:s}),t[4]=r,t[5]=o,t[6]=s,t[7]=i;else i=t[7];return i}
function Wtm(e,t){return y6.jsxs(Box,{flexDirection:"column",marginBottom:1,children:[e.suggestion&&y6.jsx(Text,{dimColor:!0,wrap:"wrap",children:e.suggestion}),e.docLink&&y6.jsx(Sx,{url:e.docLink})]},`suggestion-pair-${t}`)}
function Gtm(e,t){let n=ztm(e);return y6.jsx(cs.Node,{children:n?y6.jsxs(Text,{children:[n,": ",y6.jsx(Text,{dimColor:!0,children:e.message})]}):y6.jsx(Text,{dimColor:!0,children:e.message})},t)}
function Vtm(e,t){if(!e.path&&t.path)return-1;if(e.path&&!t.path)return 1;return(e.path||"").localeCompare(t.path||"")}
function Ktm(e,t){let n=t.file||"(file not specified)";if(!e[n])e[n]=[];return e[n].push(t),e}
function ztm(e){if(!e.path)return null;let t=e.path.split("."),n=t[t.length-1];if(e.invalidValue!==null&&e.invalidValue!==void 0&&n!==void 0&&!isNaN(parseInt(n,10))){let r=typeof e.invalidValue==="string"?`"${e.invalidValue}"`:String(e.invalidValue);return[...t.slice(0,-1),r].join(".")}return e.path}
var w_l,y6;
var cvo=b(()=>{je();fne();kte();w_l=x(tt(),1),y6=x(oe(),1)});
export {YKn,Wtm,Gtm,Vtm,Ktm,ztm,w_l,y6,cvo};
