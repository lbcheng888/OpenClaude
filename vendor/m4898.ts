// @ts-nocheck
import {Text} from "./m2423.ts";
import {Rl,TU} from "../src/tui/4359_isSearch.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function dVn(e){let t=OCl.c(9),{ruleValue:n}=e;switch(n.toolName){case Rl.name:if(n.ruleContent)if(n.ruleContent.endsWith(":*")||n.ruleContent.endsWith(" *")){let r;if(t[0]!==n.ruleContent)r=n.ruleContent.slice(0,-2),t[0]=n.ruleContent,t[1]=r;else r=t[1];let o;if(t[2]!==r)o=K9.createElement(Text,{dimColor:!0},"Any Bash command starting with"," ",K9.createElement(Text,{bold:!0},r)),t[2]=r,t[3]=o;else o=t[3];return o}else{let r;if(t[4]!==n.ruleContent)r=K9.createElement(Text,{dimColor:!0},"The Bash command ",K9.createElement(Text,{bold:!0},n.ruleContent)),t[4]=n.ruleContent,t[5]=r;else r=t[5];return r}else{let r;if(t[6]===Symbol.for("react.memo_cache_sentinel"))r=K9.createElement(Text,{dimColor:!0},"Any Bash command"),t[6]=r;else r=t[6];return r}default:if(!n.ruleContent){let r;if(t[7]!==n.toolName)r=K9.createElement(Text,{dimColor:!0},"Any use of the ",K9.createElement(Text,{bold:!0},n.toolName)," tool"),t[7]=n.toolName,t[8]=r;else r=t[8];return r}else return null}}
var OCl,K9;
var Ovo=b(()=>{ze();TU();OCl=M(rt(),1),K9=M(Te(),1)});
export {dVn,OCl,K9,Ovo};
