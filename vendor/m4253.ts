// @ts-nocheck
import {$c,XL,Ct} from "./m197.ts";
import {Lw} from "./m4308.ts";
import {Yx,_7e,lr} from "./m233.ts";
import {b} from "../runtime.ts";
import {po} from "../src/tools/5224_userPromptCount.ts";
function p_o(e){switch(e){case"allow":return"allowed";case"deny":return"denied";default:return"asked for confirmation for"}}
function V6n(e){if(!e)return;if(e.type==="classifier")return e.reason;switch(e.type){case"rule":case"mode":case"subcommandResults":case"permissionPromptTool":case"classifier":return;case"hook":case"asyncAgent":case"sandboxOverride":case"workingDir":case"safetyCheck":case"other":return e.reason}}
function Vye(e){if(e instanceof $c)return e.message||Lw;if(!(e instanceof Error))return String(e);let n=m_o(e).filter(Boolean).join(`
`).trim()||"Command failed with no output";if(n.length<=1e4)return n;let r=5000,o=Yx(n,r),s=_7e(n,r),i=n.length-o.length-s.length;return`${o}

... [${i} characters truncated] ...

${s}`}
function m_o(e){if(e instanceof XL)return[`Exit code ${e.code}`,e.interrupted?Lw:"",e.stderr,e.stdout];let t=[e.message];if("stderr"in e&&typeof e.stderr==="string")t.push(e.stderr);if("stdout"in e&&typeof e.stdout==="string")t.push(e.stdout);return t}
function Wja(e){if(e.length===0)return"";return e.reduce((t,n,r)=>{let o=String(n);if(typeof n==="number")return`${String(t)}[${o}]`;return r===0?o:`${String(t)}.${o}`},"")}
function rmt(e,t){let n=t.issues.filter((a)=>a.code==="invalid_type"&&a.message.includes("received undefined")).map((a)=>Wja(a.path)),r=t.issues.filter((a)=>a.code==="unrecognized_keys").flatMap((a)=>a.keys),o=t.issues.filter((a)=>a.code==="invalid_type"&&!a.message.includes("received undefined")).map((a)=>{let l=a,c=a.message.match(/received (\w+)/),u=c?c[1]:"unknown";return{param:Wja(a.path),expected:l.expected,received:u}}),s=t.message,i=[];if(n.length>0){let a=n.map((l)=>`The required parameter \`${l}\` is missing`);i.push(...a)}if(r.length>0){let a=r.map((l)=>`An unexpected parameter \`${l}\` was provided`);i.push(...a)}if(o.length>0){let a=o.map(({param:l,expected:c,received:u})=>`The parameter \`${l}\` type is expected as \`${c}\` but provided as \`${u}\``);i.push(...a)}if(i.length>0)s=`${e} failed due to the following ${i.length>1?"issues":"issue"}:
${i.join(`
`)}`;return s}
var Hqt=b(()=>{Ct();po();lr()});
export {p_o,V6n,Vye,m_o,Wja,rmt,Hqt};
