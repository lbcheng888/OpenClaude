// @ts-nocheck
import {Text} from "./m2423.ts";
import {Tn,zs} from "./m2554.ts";
import {Box} from "./m2422.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function M5n(e){let t=Zpl.c(9),{serverToolsCount:n,serverPromptsCount:r,serverResourcesCount:o}=e,s;if(t[0]!==r||t[1]!==o||t[2]!==n){if(s=[],n>0)s.push("tools");if(o>0)s.push("resources");if(r>0)s.push("prompts");t[0]=r,t[1]=o,t[2]=n,t[3]=s}else s=t[3];let i;if(t[4]===Symbol.for("react.memo_cache_sentinel"))i=Y6t.default.createElement(Text,{bold:!0},"Capabilities: "),t[4]=i;else i=t[4];let a;if(t[5]!==s)a=s.length>0?Y6t.default.createElement(Tn,null,s):"none",t[5]=s,t[6]=a;else a=t[6];let l;if(t[7]!==a)l=Y6t.default.createElement(Box,null,i,Y6t.default.createElement(Text,{color:"text"},a)),t[7]=a,t[8]=l;else l=t[8];return l}
var Zpl,Y6t;
var MSo=b(()=>{ze();zs();Zpl=M(rt(),1),Y6t=M(Te(),1)});
export {M5n,Zpl,Y6t,MSo};
