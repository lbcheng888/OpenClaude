// @ts-nocheck
import {goe,pd} from "./m706.ts";
import {TeamDeleteToolName,qt,tn} from "../src/config/0230_encoding.ts";
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {F4,iHe} from "./m2820.ts";
import {Ansi} from "./m2441.ts";
import {LD,oHe} from "./m2814.ts";
import {B1t,$1t} from "../src/telemetry/2820__meta.ts";
import {Xe,Zs} from "./m2216.ts";
import {formatNumber,Xo} from "./m240.ts";
import {S1,sHe} from "./m2816.ts";
import {b,x} from "../runtime.ts";
import {gZ} from "./m2285.ts";
import {UXi} from "./m3023.ts";
import {mc} from "./m237.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function qXi(e,{verbose:t}){if(Object.keys(e).length===0)return"";let n=goe(e);if(n!==null)return n;return Object.entries(e).map(([r,o])=>{let s=TeamDeleteToolName(o);return`${r}: ${s}`}).join(", ")}
function WXi(e){let t=e.at(-1);if(!t?.data)return _T.jsx(Yn,{height:1,children:_T.jsx(Text,{dimColor:!0,children:"Running\u2026"})});let{progress:n,total:r,progressMessage:o}=t.data;if(n===void 0)return _T.jsx(Yn,{height:1,children:_T.jsx(Text,{dimColor:!0,children:"Running\u2026"})});if(r!==void 0&&r>0){let s=Math.min(1,Math.max(0,n/r)),i=Math.round(s*100);return _T.jsx(Yn,{children:_T.jsxs(Box,{flexDirection:"column",children:[o&&_T.jsx(Text,{dimColor:!0,children:o}),_T.jsxs(Box,{flexDirection:"row",gap:1,children:[_T.jsx(F4,{ratio:s,width:20}),_T.jsxs(Text,{dimColor:!0,children:[i,"%"]})]})]})})}return _T.jsx(Yn,{height:1,children:_T.jsx(Text,{dimColor:!0,children:o??`Processing\u2026 ${n}`})})}
function d0n(e,t,{verbose:n,input:r}){let o=e;if(!n){let c=Tqd(o,r);if(c!==null)return _T.jsx(Yn,{height:1,children:_T.jsxs(Text,{children:["Sent a message to"," ",_T.jsx(Ansi,{children:LD(c.url,c.channel)})]})})}let s=B1t(o),a=s>hqd?`${Xe.warning} Large MCP response (~${formatNumber(s)} tokens), this can fill up context quickly`:null,l;if(Array.isArray(o)){let c=o.map((u,d)=>{if(u.type==="image")return _T.jsx(Box,{justifyContent:"space-between",overflowX:"hidden",width:"100%",children:_T.jsx(Yn,{height:1,children:_T.jsx(Text,{children:"[Image]"})})},d);return _T.jsx(gqd,{item:u,verbose:n},d)});l=_T.jsx(Box,{flexDirection:"column",width:"100%",children:c})}else if(!o)l=_T.jsx(Box,{justifyContent:"space-between",overflowX:"hidden",width:"100%",children:_T.jsx(Yn,{height:1,children:_T.jsx(Text,{dimColor:!0,children:"(No content)"})})});else l=_T.jsx(S1,{content:o,verbose:n});if(a)return _T.jsxs(Box,{flexDirection:"column",children:[_T.jsx(Yn,{height:1,children:_T.jsx(Text,{color:"warning",children:a})}),l]});return l}
function gqd(e){let t=$Xi.c(7),{item:n,verbose:r}=e,o=n.type==="text"&&"text"in n&&n.text!==null&&n.text!==void 0?String(n.text):"",s;if(t[4]!==o||t[5]!==r)s=_T.jsx(S1,{content:o,verbose:r}),t[4]=o,t[5]=r,t[6]=s;else s=t[6];return s}
function _qd(e,{maxChars:t,maxKeys:n}){let r=e.trim();if(r.length===0||r.length>t||r[0]!=="{")return null;let o;try{o=qt(r)}catch{return null}if(o===null||typeof o!=="object"||Array.isArray(o))return null;let s=Object.entries(o);if(s.length===0||s.length>n)return null;return s}
function Tqd(e,t){let n=e;if(Array.isArray(e)){let c=e.find((u)=>u.type==="text");n=c&&"text"in c?c.text:void 0}if(typeof n!=="string"||!n.includes('"message_link"'))return null;let o=_qd(n,{maxChars:2000,maxKeys:6})?.find(([c])=>c==="message_link")?.[1];if(typeof o!=="string")return null;let s=yqd.exec(o);if(!s)return null;let i=t,a=i?.channel_id??i?.channel??s[1],l=typeof a==="string"&&a?a:"slack";return{channel:l.startsWith("#")?l:`#${l}`,url:o}}
var $Xi,_T,hqd=1e4,yqd;
var Jjr=b(()=>{Zs();iHe();gZ();UXi();Pl();sHe();mc();je();Xo();oHe();pd();$1t();tn();$Xi=x(tt(),1),_T=x(oe(),1);yqd=/^https:\/\/[a-z0-9-]+\.slack\.com\/archives\/([A-Z0-9]+)\/p\d+$/});
export {qXi,WXi,d0n,gqd,_qd,Tqd,$Xi,_T,hqd,yqd,Jjr};
