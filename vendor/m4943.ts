// @ts-nocheck
import {SDa,sce} from "../src/permissions/3874_permissionMode.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {pr,Yl} from "./m2562.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function EVn(e){let t=Nwl.c(11),{initialModel:n,onComplete:r,onCancel:o}=e,s;if(t[0]!==n){e:{let d=SDa();if(n&&!d.some((p)=>p.value===n)){s=[{value:n,label:n,description:"Current model (custom ID)"},...d];break e}s=d}t[0]=n,t[1]=s}else s=t[1];let i=s,a=n??"sonnet",l;if(t[2]===Symbol.for("react.memo_cache_sentinel"))l=Cye.createElement(Box,{marginBottom:1},Cye.createElement(Text,{dimColor:!0},"Model determines the agent's reasoning capabilities and speed.")),t[2]=l;else l=t[2];let c;if(t[3]!==o||t[4]!==r)c=()=>o?o():r(void 0),t[3]=o,t[4]=r,t[5]=c;else c=t[5];let u;if(t[6]!==a||t[7]!==i||t[8]!==r||t[9]!==c)u=Cye.createElement(Box,{flexDirection:"column"},l,Cye.createElement(pr,{options:i,defaultValue:a,onChange:r,onCancel:c})),t[6]=a,t[7]=i,t[8]=r,t[9]=c,t[10]=u;else u=t[10];return u}
var Nwl,Cye;
var awo=b(()=>{ze();sce();Yl();Nwl=M(rt(),1),Cye=M(Te(),1)});
export {EVn,Nwl,Cye,awo};
