// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {Text} from "./m2433.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Zvl(e){let t=Qvl.c(5),{message:n,isTranscriptMode:r}=e;if(!(r&&n.type==="assistant"&&n.message.model&&n.message.content.some(tum)))return null;let s=sn(n.message.model)+8,i;if(t[0]!==n.message.model)i=dHo.jsx(Text,{dimColor:!0,children:n.message.model}),t[0]=n.message.model,t[1]=i;else i=t[1];let a;if(t[2]!==s||t[3]!==i)a=dHo.jsx(Box,{minWidth:s,children:i}),t[2]=s,t[3]=i,t[4]=a;else a=t[4];return a}
function tum(e){return e.type==="text"}
var Qvl,dHo;
var ewl=b(()=>{mc();je();Qvl=x(tt(),1),dHo=x(oe(),1)});
export {Zvl,tum,Qvl,dHo,ewl};
