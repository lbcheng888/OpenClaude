// @ts-nocheck
import {Text} from "./m2423.ts";
import {Gn,sc} from "./m2455.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function LUn(e){let t=v1a.c(22),{hookEvent:n,lookups:r,toolUseID:o,isTranscriptMode:s}=e,i;if(t[0]!==n||t[1]!==r.inProgressHookCounts||t[2]!==o)i=r.inProgressHookCounts.get(o)?.get(n)??0,t[0]=n,t[1]=r.inProgressHookCounts,t[2]=o,t[3]=i;else i=t[3];let a=i,l=r.resolvedHookCounts.get(o)?.get(n)??0;if(a===0)return null;if(n==="PreToolUse"||n==="PostToolUse"){if(s){let f;if(t[4]!==a)f=dI.createElement(Text,{dimColor:!0},a," "),t[4]=a,t[5]=f;else f=t[5];let A;if(t[6]!==n)A=dI.createElement(Text,{dimColor:!0,bold:!0},n),t[6]=n,t[7]=A;else A=t[7];let h=a===1?" hook":" hooks",g;if(t[8]!==h)g=dI.createElement(Text,{dimColor:!0},h," ran"),t[8]=h,t[9]=g;else g=t[9];let _;if(t[10]!==f||t[11]!==A||t[12]!==g)_=dI.createElement(Gn,null,dI.createElement(Box,{flexDirection:"row"},f,A,g)),t[10]=f,t[11]=A,t[12]=g,t[13]=_;else _=t[13];return _}return null}if(l===a)return null;let c;if(t[14]===Symbol.for("react.memo_cache_sentinel"))c=dI.createElement(Text,{dimColor:!0},"Running "),t[14]=c;else c=t[14];let u;if(t[15]!==n)u=dI.createElement(Text,{dimColor:!0,bold:!0},n),t[15]=n,t[16]=u;else u=t[16];let d=a===1?" hook\u2026":" hooks\u2026",p;if(t[17]!==d)p=dI.createElement(Text,{dimColor:!0},d),t[17]=d,t[18]=p;else p=t[18];let m;if(t[19]!==u||t[20]!==p)m=dI.createElement(Gn,null,dI.createElement(Box,{flexDirection:"row"},c,u,p)),t[19]=u,t[20]=p,t[21]=m;else m=t[21];return m}
var v1a,dI;
var cao=b(()=>{ze();sc();v1a=M(rt(),1),dI=M(Te(),1)});
export {LUn,v1a,dI,cao};
