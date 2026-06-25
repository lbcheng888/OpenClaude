// @ts-nocheck
import {Text} from "./m2433.ts";
import {sl,UB} from "../src/tools/4381_isSearch.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function Zjn(e){let t=Vxl.c(9),{ruleValue:n}=e;switch(n.toolName){case sl.name:if(n.ruleContent)if(n.ruleContent.endsWith(":*")||n.ruleContent.endsWith(" *")){let r;if(t[0]!==n.ruleContent)r=n.ruleContent.slice(0,-2),t[0]=n.ruleContent,t[1]=r;else r=t[1];let o;if(t[2]!==r)o=zTe.jsxs(Text,{dimColor:!0,children:["Any Bash command starting with"," ",zTe.jsx(Text,{bold:!0,children:r})]}),t[2]=r,t[3]=o;else o=t[3];return o}else{let r;if(t[4]!==n.ruleContent)r=zTe.jsxs(Text,{dimColor:!0,children:["The Bash command ",zTe.jsx(Text,{bold:!0,children:n.ruleContent})]}),t[4]=n.ruleContent,t[5]=r;else r=t[5];return r}else{let r;if(t[6]===Symbol.for("react.memo_cache_sentinel"))r=zTe.jsx(Text,{dimColor:!0,children:"Any Bash command"}),t[6]=r;else r=t[6];return r}default:if(!n.ruleContent){let r;if(t[7]!==n.toolName)r=zTe.jsxs(Text,{dimColor:!0,children:["Any use of the ",zTe.jsx(Text,{bold:!0,children:n.toolName})," tool"]}),t[7]=n.toolName,t[8]=r;else r=t[8];return r}else return null}}
var Vxl,zTe;
var XIo=b(()=>{je();UB();Vxl=x(tt(),1),zTe=x(oe(),1)});
export {Zjn,Vxl,zTe,XIo};
