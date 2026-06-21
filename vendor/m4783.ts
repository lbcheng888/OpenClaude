// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {Text} from "./m2423.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function tyl(e){let t=eyl.c(5),{message:n,isTranscriptMode:r}=e;if(!(r&&n.type==="assistant"&&n.message.model&&n.message.content.some(qem)))return null;let s=tn(n.message.model)+8,i;if(t[0]!==n.message.model)i=KEo.default.createElement(Text,{dimColor:!0},n.message.model),t[0]=n.message.model,t[1]=i;else i=t[1];let a;if(t[2]!==s||t[3]!==i)a=KEo.default.createElement(Box,{minWidth:s},i),t[2]=s,t[3]=i,t[4]=a;else a=t[4];return a}
function qem(e){return e.type==="text"}
var eyl,KEo;
var nyl=b(()=>{Hc();ze();eyl=M(rt(),1),KEo=M(Te(),1)});
export {tyl,qem,eyl,KEo,nyl};
