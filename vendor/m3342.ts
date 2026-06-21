// @ts-nocheck
import {l0i,vet,BUe} from "../src/agent/2578_BUe.ts";
import {Le,Xt} from "../src/config/0228_encoding.ts";
import {b} from "../runtime.ts";
function Cst(e){if(!e)return{shellSettings:{},envVars:{},hasHooks:!1,hasClaudeMd:!1};let t={};for(let s of l0i){let i=e[s],a;if(typeof i==="string")a=i;else if(i!==null&&typeof i==="object"&&"command"in i&&typeof i.command==="string")a=i.command;if(a!==void 0&&a.length>0)t[s]=a}let n={};if(e.env&&typeof e.env==="object")for(let[s,i]of Object.entries(e.env)){if(i===void 0)continue;let a=String(i);if(a.length>0&&!vet.has(s.toUpperCase()))n[s]=a}let r=e.hooks!==void 0&&e.hooks!==null&&typeof e.hooks==="object"&&Object.keys(e.hooks).length>0,o=typeof e.claudeMd==="string"&&e.claudeMd.length>0;return{shellSettings:t,envVars:n,hasHooks:r,hooks:r?e.hooks:void 0,hasClaudeMd:o,claudeMd:o?e.claudeMd:void 0}}
function mDn(e){return Object.keys(e.shellSettings).length>0||Object.keys(e.envVars).length>0||e.hasHooks||e.hasClaudeMd}
function Zca(e,t){let n=Cst(e),r=Cst(t);if(!mDn(r))return!1;if(!mDn(n))return!0;let o=Le({shellSettings:n.shellSettings,envVars:n.envVars,hooks:n.hooks,claudeMd:n.claudeMd}),s=Le({shellSettings:r.shellSettings,envVars:r.envVars,hooks:r.hooks,claudeMd:r.claudeMd});return o!==s}
function eua(e){let t=[];for(let n of Object.keys(e.shellSettings))t.push(n);for(let n of Object.keys(e.envVars))t.push(n);if(e.hasHooks)t.push("hooks");if(e.hasClaudeMd)t.push("claudeMd");return t}
var wXr=b(()=>{BUe();Xt()});
export {Cst,mDn,Zca,eua,wXr};
