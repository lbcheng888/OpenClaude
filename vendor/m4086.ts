// @ts-nocheck
import {rl,jbn,ri} from "../src/tools/2235_userFacingName.ts";
import {b,x} from "../runtime.ts";
import {parsePermissionRule,BRIEF_TOOL_NAME} from "./m2704.ts";
import {tt} from "./m2263.ts";
function A6a(e,t,n){let r=C6a.c(7),o;if(r[0]!==n.toolUseByToolUseID||r[1]!==e||r[2]!==t){e:{let s=n.toolUseByToolUseID.get(e);if(!s){o=null;break e}let i=rl(t,s.name);if(i){o={tool:i,toolUse:s};break e}if(!MPp.has(s.name)){o=null;break e}let a=rl(jbn()??[],s.name);if(!a){o=null;break e}let l;if(r[4]!==a||r[5]!==s)l={tool:a,toolUse:s},r[4]=a,r[5]=s,r[6]=l;else l=r[6];o=l}r[0]=n.toolUseByToolUseID,r[1]=e,r[2]=t,r[3]=o}else o=r[3];return o}
var C6a,MPp;
var R6a=b(()=>{ri();parsePermissionRule();C6a=x(tt(),1),MPp=new Set([BRIEF_TOOL_NAME])});
export {A6a,C6a,MPp,R6a};
