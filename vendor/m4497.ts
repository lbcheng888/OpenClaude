// @ts-nocheck
import {os} from "../src/api/0465_getOauthConfig.ts";
import {d0,ps} from "./m230.ts";
import {normalizeTrustedSymlink,patternWithRoot,relativePath,Xm} from "../src/permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {getDenyRules,getAllowRules,ly} from "../src/tools/5218_toolAlwaysAllowedRule.ts";
import {isTmuxControlMode,Po} from "./m638.ts";
import {b} from "../runtime.ts";
function hdl(e,t){let n=os([...d0(e.requestedPath),e.canonicalPath]),r=os([e.canonicalPath,normalizeTrustedSymlink(e.canonicalPath)]),o=(i,a,l)=>l.some((c)=>Kjp(i,a,c));for(let i of getDenyRules(t)){if(i.ruleValue.toolName!==fdl)continue;let a=i.ruleValue.ruleContent;if(a===void 0||o(a,i.source,n))return{result:"blockedByRule",rule:i}}let s=getAllowRules(t).filter((i)=>i.ruleValue.toolName===fdl);if(s.length===0)return{result:"allowed"};for(let i of s){let a=i.ruleValue.ruleContent;if(a===void 0||o(a,i.source,r))return{result:"allowed"}}return{result:"outsideAllowedPatterns",allowedPatterns:s.map((i)=>i.ruleValue.ruleContent).filter((i)=>i!==void 0)}}
function Kjp(e,t,n){let{relativePattern:r,root:o}=patternWithRoot(e,t),s=relativePath(o??isTmuxControlMode(),n);if(s===".."||s.startsWith("../"))return!1;let i=r.replace(/\/{2,}/g,"/").replace(/^\//,"").replace(/\/$/,"");return zjp(i).test(s)}
function zjp(e){let t="^";for(let n=0;n<e.length;n++){let r=e[n];if(n===0&&r==="*"&&e[1]==="*"&&e[2]==="/")t+="(?:.*/)?",n+=2;else if(r==="/"&&e[n+1]==="*"&&e[n+2]==="*")t+="(/.*)?",n+=2;else if(r==="*")if(e[n+1]==="*")t+=".*",n++;else t+="[^/]+";else if("\\^$.|?+()[]{}".includes(r))t+=`\\${r}`;else t+=r}return new RegExp(`${t}$`,"i")}
var fdl="Cd";
var gdl=b(()=>{Po();ps();Xm();ly()});
export {hdl,Kjp,zjp,fdl,gdl};
