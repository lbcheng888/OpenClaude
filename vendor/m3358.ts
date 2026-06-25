// @ts-nocheck
import {N1i,Int,F2e} from "../src/agent/2589_F2e.ts";
import {TeamDeleteToolName,tn} from "../src/config/0230_encoding.ts";
import {b} from "../runtime.ts";
function Cat(e){if(!e)return{shellSettings:{},envVars:{},hasHooks:!1,hasClaudeMd:!1};let t={};for(let s of N1i){let i=e[s],a;if(typeof i==="string")a=i;else if(i!==null&&typeof i==="object"&&"command"in i&&typeof i.command==="string")a=i.command;if(a!==void 0&&a.length>0)t[s]=a}let n={};if(e.env&&typeof e.env==="object")for(let[s,i]of Object.entries(e.env)){if(i===void 0)continue;let a=String(i);if(a.length>0&&!Int.has(s.toUpperCase()))n[s]=a}let r=e.hooks!==void 0&&e.hooks!==null&&typeof e.hooks==="object"&&Object.keys(e.hooks).length>0,o=typeof e.claudeMd==="string"&&e.claudeMd.length>0;return{shellSettings:t,envVars:n,hasHooks:r,hooks:r?e.hooks:void 0,hasClaudeMd:o,claudeMd:o?e.claudeMd:void 0}}
function sLn(e){return Object.keys(e.shellSettings).length>0||Object.keys(e.envVars).length>0||e.hasHooks||e.hasClaudeMd}
function p_a(e,t){let n=Cat(e),r=Cat(t);if(!sLn(r))return!1;if(!sLn(n))return!0;let o=TeamDeleteToolName({shellSettings:n.shellSettings,envVars:n.envVars,hooks:n.hooks,claudeMd:n.claudeMd}),s=TeamDeleteToolName({shellSettings:r.shellSettings,envVars:r.envVars,hooks:r.hooks,claudeMd:r.claudeMd});return o!==s}
function m_a(e){let t=[];for(let n of Object.keys(e.shellSettings))t.push(n);for(let n of Object.keys(e.envVars))t.push(n);if(e.hasHooks)t.push("hooks");if(e.hasClaudeMd)t.push("claudeMd");return t}
var lno=b(()=>{F2e();tn()});
export {Cat,sLn,p_a,m_a,lno};
