// @ts-nocheck
import {_oe,Pd} from "./m701.ts";
import {Le,qt,Xt} from "../src/config/0228_encoding.ts";
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {Eq,_xe} from "./m2807.ts";
import {Ansi} from "./m2431.ts";
import {MF,s$e} from "./m2801.ts";
import {dLt,mLt} from "../src/telemetry/2807__meta.ts";
import {et,Ai} from "./m2208.ts";
import {formatNumber,ps} from "./m238.ts";
import {Sq,a$e} from "./m2803.ts";
import {b,M} from "../runtime.ts";
import {SZ} from "./m2274.ts";
import {GGi} from "./m3010.ts";
import {Hc} from "./m235.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function KGi(e,{verbose:t}){if(Object.keys(e).length===0)return"";let n=_oe(e);if(n!==null)return n;return Object.entries(e).map(([r,o])=>{let s=Le(o);return`${r}: ${s}`}).join(", ")}
function zGi(e){let t=e.at(-1);if(!t?.data)return bu.createElement(Gn,{height:1},bu.createElement(Text,{dimColor:!0},"Running\u2026"));let{progress:n,total:r,progressMessage:o}=t.data;if(n===void 0)return bu.createElement(Gn,{height:1},bu.createElement(Text,{dimColor:!0},"Running\u2026"));if(r!==void 0&&r>0){let s=Math.min(1,Math.max(0,n/r)),i=Math.round(s*100);return bu.createElement(Gn,null,bu.createElement(Box,{flexDirection:"column"},o&&bu.createElement(Text,{dimColor:!0},o),bu.createElement(Box,{flexDirection:"row",gap:1},bu.createElement(Eq,{ratio:s,width:20}),bu.createElement(Text,{dimColor:!0},i,"%"))))}return bu.createElement(Gn,{height:1},bu.createElement(Text,{dimColor:!0},o??`Processing\u2026 ${n}`))}
function Sxn(e,t,{verbose:n,input:r}){let o=e;if(!n){let c=OMd(o,r);if(c!==null)return bu.createElement(Gn,{height:1},bu.createElement(Text,null,"Sent a message to"," ",bu.createElement(Ansi,null,MF(c.url,c.channel))))}let s=dLt(o),a=s>HMd?`${et.warning} Large MCP response (~${formatNumber(s)} tokens), this can fill up context quickly`:null,l;if(Array.isArray(o)){let c=o.map((u,d)=>{if(u.type==="image")return bu.createElement(Box,{key:d,justifyContent:"space-between",overflowX:"hidden",width:"100%"},bu.createElement(Gn,{height:1},bu.createElement(Text,null,"[Image]")));return bu.createElement(IMd,{key:d,item:u,verbose:n})});l=bu.createElement(Box,{flexDirection:"column",width:"100%"},c)}else if(!o)l=bu.createElement(Box,{justifyContent:"space-between",overflowX:"hidden",width:"100%"},bu.createElement(Gn,{height:1},bu.createElement(Text,{dimColor:!0},"(No content)")));else l=bu.createElement(Sq,{content:o,verbose:n});if(a)return bu.createElement(Box,{flexDirection:"column"},bu.createElement(Gn,{height:1},bu.createElement(Text,{color:"warning"},a)),l);return l}
function IMd(e){let t=VGi.c(7),{item:n,verbose:r}=e,o=n.type==="text"&&"text"in n&&n.text!==null&&n.text!==void 0?String(n.text):"",s;if(t[4]!==o||t[5]!==r)s=bu.createElement(Sq,{content:o,verbose:r}),t[4]=o,t[5]=r,t[6]=s;else s=t[6];return s}
function DMd(e,{maxChars:t,maxKeys:n}){let r=e.trim();if(r.length===0||r.length>t||r[0]!=="{")return null;let o;try{o=qt(r)}catch{return null}if(o===null||typeof o!=="object"||Array.isArray(o))return null;let s=Object.entries(o);if(s.length===0||s.length>n)return null;return s}
function OMd(e,t){let n=e;if(Array.isArray(e)){let c=e.find((u)=>u.type==="text");n=c&&"text"in c?c.text:void 0}if(typeof n!=="string"||!n.includes('"message_link"'))return null;let o=DMd(n,{maxChars:2000,maxKeys:6})?.find(([c])=>c==="message_link")?.[1];if(typeof o!=="string")return null;let s=PMd.exec(o);if(!s)return null;let i=t,a=i?.channel_id??i?.channel??s[1],l=typeof a==="string"&&a?a:"slack";return{channel:l.startsWith("#")?l:`#${l}`,url:o}}
var VGi,bu,HMd=1e4,PMd;
var fGr=b(()=>{Ai();_xe();SZ();GGi();sc();a$e();Hc();ze();ps();s$e();Pd();mLt();Xt();VGi=M(rt(),1),bu=M(Te(),1);PMd=/^https:\/\/[a-z0-9-]+\.slack\.com\/archives\/([A-Z0-9]+)\/p\d+$/});
export {KGi,zGi,Sxn,IMd,DMd,OMd,VGi,bu,HMd,PMd,fGr};
