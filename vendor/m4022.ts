// @ts-nocheck
import {Cl,myn,Ri} from "../src/tools/2227_userFacingName.ts";
import {b,M} from "../runtime.ts";
import {j$,BRIEF_TOOL_NAME} from "./m2692.ts";
import {rt} from "./m2255.ts";
function QBa(e,t,n){let r=XBa.c(7),o;if(r[0]!==n.toolUseByToolUseID||r[1]!==e||r[2]!==t){e:{let s=n.toolUseByToolUseID.get(e);if(!s){o=null;break e}let i=Cl(t,s.name);if(i){o={tool:i,toolUse:s};break e}if(!qCp.has(s.name)){o=null;break e}let a=Cl(myn()??[],s.name);if(!a){o=null;break e}let l;if(r[4]!==a||r[5]!==s)l={tool:a,toolUse:s},r[4]=a,r[5]=s,r[6]=l;else l=r[6];o=l}r[0]=n.toolUseByToolUseID,r[1]=e,r[2]=t,r[3]=o}else o=r[3];return o}
var XBa,qCp;
var ZBa=b(()=>{Ri();j$();XBa=M(rt(),1),qCp=new Set([BRIEF_TOOL_NAME])});
export {QBa,XBa,qCp,ZBa};
