// @ts-nocheck
import {fs} from "../src/api/0459_getOauthConfig.ts";
import {MD,ws} from "./m228.ts";
import {normalizeTrustedSymlink,patternWithRoot,relativePath,nA} from "../src/permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {getDenyRules,getAllowRules,ay} from "../src/tools/5184_toolAlwaysAllowedRule.ts";
import {Pt,Go} from "./m632.ts";
import {b} from "../runtime.ts";
function Rol(e,t){let n=fs([...MD(e.requestedPath),e.canonicalPath]),r=fs([e.canonicalPath,normalizeTrustedSymlink(e.canonicalPath)]),o=(i,a,l)=>l.some((c)=>cjp(i,a,c));for(let i of getDenyRules(t)){if(i.ruleValue.toolName!==wol)continue;let a=i.ruleValue.ruleContent;if(a===void 0||o(a,i.source,n))return{result:"blockedByRule",rule:i}}let s=getAllowRules(t).filter((i)=>i.ruleValue.toolName===wol);if(s.length===0)return{result:"allowed"};for(let i of s){let a=i.ruleValue.ruleContent;if(a===void 0||o(a,i.source,r))return{result:"allowed"}}return{result:"outsideAllowedPatterns",allowedPatterns:s.map((i)=>i.ruleValue.ruleContent).filter((i)=>i!==void 0)}}
function cjp(e,t,n){let{relativePattern:r,root:o}=patternWithRoot(e,t),s=relativePath(o??Pt(),n);if(s===".."||s.startsWith("../"))return!1;let i=r.replace(/\/{2,}/g,"/").replace(/^\//,"").replace(/\/$/,"");return ujp(i).test(s)}
function ujp(e){let t="^";for(let n=0;n<e.length;n++){let r=e[n];if(n===0&&r==="*"&&e[1]==="*"&&e[2]==="/")t+="(?:.*/)?",n+=2;else if(r==="/"&&e[n+1]==="*"&&e[n+2]==="*")t+="(/.*)?",n+=2;else if(r==="*")if(e[n+1]==="*")t+=".*",n++;else t+="[^/]+";else if("\\^$.|?+()[]{}".includes(r))t+=`\\${r}`;else t+=r}return new RegExp(`${t}$`,"i")}
var wol="Cd";
var xol=b(()=>{Go();ws();nA();ay()});
export {Rol,cjp,ujp,wol,xol};
