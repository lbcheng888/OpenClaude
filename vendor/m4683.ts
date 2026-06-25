// @ts-nocheck
import {Text} from "./m2433.ts";
import {bn,Is} from "./m2565.ts";
import {Box} from "./m2432.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function _7n(e){let t=qSl.c(9),{serverToolsCount:n,serverPromptsCount:r,serverResourcesCount:o}=e,s;if(t[0]!==r||t[1]!==o||t[2]!==n){if(s=[],n>0)s.push("tools");if(o>0)s.push("resources");if(r>0)s.push("prompts");t[0]=r,t[1]=o,t[2]=n,t[3]=s}else s=t[3];let i;if(t[4]===Symbol.for("react.memo_cache_sentinel"))i=ght.jsx(Text,{bold:!0,children:"Capabilities: "}),t[4]=i;else i=t[4];let a;if(t[5]!==s)a=s.length>0?ght.jsx(bn,{children:s}):"none",t[5]=s,t[6]=a;else a=t[6];let l;if(t[7]!==a)l=ght.jsxs(Box,{children:[i,ght.jsx(Text,{color:"text",children:a})]}),t[7]=a,t[8]=l;else l=t[8];return l}
var qSl,ght;
var Jvo=b(()=>{je();Is();qSl=x(tt(),1),ght=x(oe(),1)});
export {_7n,qSl,ght,Jvo};
