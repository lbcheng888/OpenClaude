// @ts-nocheck
import {xls,Dls} from "./m737.ts";
import {Sn,lr} from "./m233.ts";
import {qt,tn} from "../src/config/0230_encoding.ts";
import {GSr,Ils} from "./m736.ts";
import {USr,csn} from "./m734.ts";
import {HOOK_EVENTS} from "./m723.ts";
import {b} from "../runtime.ts";
import {isBundledSkillsDisabled} from "./m726.ts";
import {h3,JN,usn,dsn} from "../src/artifact/0736_allow.ts";
import {ve} from "./m461.ts";
function Pls(e){return e.code==="invalid_type"}
function Ols(e){return e.code==="invalid_value"}
function Plu(e){return e.code==="unrecognized_keys"}
function Lls(e){return e.code==="too_small"}
function iYe(e){if(e===null)return"null";if(e===void 0)return"undefined";if(Array.isArray(e))return"array";return typeof e}
function Mls(e){let t=e.match(/received (\w+)/);return t?t[1]:void 0}
function aYe(e,t){return e.issues.map((n)=>{let r=n.path.map(String).join("."),o=n.message,s,i,a,l,c;if(Ols(n))i=n.values.map((d)=>String(d)),a=i.join(" | "),l=void 0,c=void 0;else if(Pls(n)){a=n.expected;let d=Mls(n.message);l=d??iYe(n.input),c=d??iYe(n.input)}else if(Lls(n))a=String(n.minimum);else if(n.code==="custom"&&"params"in n)l=n.params.received,c=l;let u=xls({path:r,code:n.code,expected:a,received:l,enumValues:i,message:n.message,value:l});if(Ols(n))s=i?.map((d)=>`"${d}"`).join(", "),o=`Invalid value. Expected one of: ${s}`;else if(Pls(n)){let d=Mls(n.message)??iYe(n.input);if(n.expected==="object"&&d==="null"&&r==="")o="Invalid or malformed JSON";else o=`Expected ${n.expected}, but received ${d}`}else if(Plu(n)){let d=n.keys.join(", ");o=`Unrecognized ${Sn(n.keys.length,"field")}: ${d}`}else if(Lls(n))o=`Number must be greater than or equal to ${n.minimum}`,s=String(n.minimum);return{file:t,path:r,message:o,expected:s,invalidValue:c,suggestion:u?.suggestion,docLink:u?.docLink}})}
function VSr(e){try{let t=qt(e),n=Dlu().safeParse(t);if(n.success)return{isValid:!0};return{isValid:!1,error:`Settings validation failed:
`+aYe(n.error,"settings").map((s)=>{let i=`- ${s.path}: ${s.message}`;if(s.suggestion)i+=`. ${s.suggestion}`;return i}).join(`
`),fullSchema:GSr()}}catch(t){return{isValid:!1,error:`Invalid JSON: ${t instanceof Error?t.message:"Unknown parsing error"}`,fullSchema:GSr()}}}
function Olu(e,t){if(!e||typeof e!=="object")return[];let n=e;if(!n.permissions||typeof n.permissions!=="object")return[];let r=n.permissions,o=[];for(let s of["allow","deny","ask"]){let i=r[s];if(!Array.isArray(i))continue;r[s]=i.filter((a)=>{if(typeof a!=="string")return o.push({file:t,path:`permissions.${s}`,message:`Non-string value in ${s} array was removed`,severity:"warning",invalidValue:a}),!1;let l=USr(a,s);if(!l.valid){let c=`Invalid permission rule "${a}" was skipped: ${l.error}`;if(l.suggestion)c+=`. ${l.suggestion}`;return o.push({file:t,path:`permissions.${s}`,message:c,severity:"warning",invalidValue:a}),!1}return!0})}return o}
function Mlu(e,t){if(!e||typeof e!=="object")return[];let n=e;if(!("hooks"in n))return[];if(n.hooks===null||typeof n.hooks!=="object"||Array.isArray(n.hooks)){let s=iYe(n.hooks);return delete n.hooks,[{file:t,path:"hooks",message:`"hooks" must be an object mapping event names to matcher arrays; received ${s}. This field was ignored.`,severity:"warning",invalidValue:s,docLink:"https://code.claude.com/docs/en/hooks"}]}let r=n.hooks,o=[];for(let s of Object.keys(r)){if(!Llu.has(s)){delete r[s],o.push({file:t,path:`hooks.${s}`,message:`Unknown hook event "${s}" was ignored. Valid events: ${HOOK_EVENTS.join(", ")}`,severity:"warning",invalidValue:s,docLink:"https://code.claude.com/docs/en/hooks"});continue}if(!Array.isArray(r[s])){let i=iYe(r[s]);delete r[s],o.push({file:t,path:`hooks.${s}`,message:`Hook event "${s}" must be an array of matchers; received ${i}. This entry was ignored.`,severity:"warning",invalidValue:i,docLink:"https://code.claude.com/docs/en/hooks"})}}if(o.length>0&&Object.keys(r).length===0)delete n.hooks;return o}
function Flu(e,t){if(!e||typeof e!=="object")return[];let n=e,r=[];for(let{key:o,schema:s}of Nlu){if(!(o in n))continue;if(!Array.isArray(n[o])){let l=n[o];delete n[o],r.push({file:t,path:o,message:`"${o}" must be an array; received ${iYe(l)}. This field was ignored.`,severity:"warning",invalidValue:l});continue}let i=n[o],a=[];for(let l=0;l<i.length;l++){let c=s().safeParse(i[l]);if(c.success)a.push(i[l]);else r.push({file:t,path:`${o}[${l}]`,message:`Invalid entry was ignored: ${c.error.issues[0]?.message??"failed validation"}`,severity:"warning",invalidValue:i[l]})}if(a.length<i.length)n[o]=a}return r}
function jpe(e,t,n){return[...Olu(e,t),...Mlu(e,t),...n?.skipMcpServerEntryFilter?[]:Flu(e,t)]}
var Dlu,Llu,Nlu;
var tvt=b(()=>{isBundledSkillsDisabled();tn();lr();csn();Ils();h3();Dls();Dlu=ve(()=>JN().strict());Llu=new Set(HOOK_EVENTS);Nlu=[{key:"allowedMcpServers",schema:usn},{key:"deniedMcpServers",schema:dsn}]});
export {Pls,Ols,Plu,Lls,iYe,Mls,aYe,VSr,Olu,Mlu,Flu,jpe,Dlu,Llu,Nlu,tvt};
