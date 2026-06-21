// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function KYn(){let e=D4l.c(7),t=mt(Vxm);if(!t)return null;if("jsx"in t){let o;if(e[0]!==t.jsx||e[1]!==t.key)o=ZWt.createElement(Text,{wrap:"truncate",key:t.key},t.jsx),e[0]=t.jsx,e[1]=t.key,e[2]=o;else o=e[2];return o}let n=!t.color,r;if(e[3]!==t.color||e[4]!==t.text||e[5]!==n)r=ZWt.createElement(Text,{color:t.color,dimColor:n,wrap:"truncate"},t.text),e[3]=t.color,e[4]=t.text,e[5]=n,e[6]=r;else r=e[6];return r}
function Vxm(e){return e.notifications.current}
var D4l,ZWt;
var bPo=b(()=>{ze();configProtoStore();D4l=M(rt(),1),ZWt=M(Te(),1)});
export {KYn,Vxm,D4l,ZWt,bPo};
