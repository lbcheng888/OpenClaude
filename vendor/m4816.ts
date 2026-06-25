// @ts-nocheck
import {Box} from "./m2432.ts";
import {sn,mc} from "./m237.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function nwl(e){let t=twl.c(10),{message:n,isTranscriptMode:r,showMessageTimestamps:o}=e,s=o===void 0?!1:o;if(!(n.timestamp&&n.type==="assistant"&&(s||r&&n.message.content.some(num))))return null;let a,l,c;if(t[0]!==n.timestamp)l=new Date(n.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),a=Box,c=sn(l),t[0]=n.timestamp,t[1]=a,t[2]=l,t[3]=c;else a=t[1],l=t[2],c=t[3];let u;if(t[4]!==l)u=pHo.jsx(Text,{dimColor:!0,children:l}),t[4]=l,t[5]=u;else u=t[5];let d;if(t[6]!==a||t[7]!==c||t[8]!==u)d=pHo.jsx(a,{minWidth:c,children:u}),t[6]=a,t[7]=c,t[8]=u,t[9]=d;else d=t[9];return d}
function num(e){return e.type==="text"}
var twl,pHo;
var rwl=b(()=>{mc();je();twl=x(tt(),1),pHo=x(oe(),1)});
export {nwl,num,twl,pHo,rwl};
