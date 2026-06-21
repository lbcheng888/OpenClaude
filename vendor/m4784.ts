// @ts-nocheck
import {Box} from "./m2422.ts";
import {tn,Hc} from "./m235.ts";
import {Text} from "./m2423.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function oyl(e){let t=ryl.c(10),{message:n,isTranscriptMode:r,showMessageTimestamps:o}=e,s=o===void 0?!1:o;if(!(n.timestamp&&n.type==="assistant"&&(s||r&&n.message.content.some(jem))))return null;let a,l,c;if(t[0]!==n.timestamp)l=new Date(n.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),a=Box,c=tn(l),t[0]=n.timestamp,t[1]=a,t[2]=l,t[3]=c;else a=t[1],l=t[2],c=t[3];let u;if(t[4]!==l)u=zEo.default.createElement(Text,{dimColor:!0},l),t[4]=l,t[5]=u;else u=t[5];let d;if(t[6]!==a||t[7]!==c||t[8]!==u)d=zEo.default.createElement(a,{minWidth:c},u),t[6]=a,t[7]=c,t[8]=u,t[9]=d;else d=t[9];return d}
function jem(e){return e.type==="text"}
var ryl,zEo;
var syl=b(()=>{Hc();ze();ryl=M(rt(),1),zEo=M(Te(),1)});
export {oyl,jem,ryl,zEo,syl};
