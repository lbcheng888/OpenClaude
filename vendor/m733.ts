// @ts-nocheck
import {Nns,Bns} from "./m732.ts";
import {Cn,dr} from "./m231.ts";
import {qt,Xt} from "../src/config/0228_encoding.ts";
import {Ahr,Mns} from "./m731.ts";
import {dhr,wnn} from "./m729.ts";
import {HOOK_EVENTS} from "./m718.ts";
import {b} from "../runtime.ts";
import {sQ} from "./m721.ts";
import {J3,RB,Rnn,xnn} from "../src/artifact/0731_allow.ts";
import {we} from "./m455.ts";
function Fns(e){return e.code==="invalid_type"}
function Uns(e){return e.code==="invalid_value"}
function gQc(e){return e.code==="unrecognized_keys"}
function $ns(e){return e.code==="too_small"}
function lKe(e){if(e===null)return"null";if(e===void 0)return"undefined";if(Array.isArray(e))return"array";return typeof e}
function qns(e){let t=e.match(/received (\w+)/);return t?t[1]:void 0}
function cKe(e,t){return e.issues.map((n)=>{let r=n.path.map(String).join("."),o=n.message,s,i,a,l,c;if(Uns(n))i=n.values.map((d)=>String(d)),a=i.join(" | "),l=void 0,c=void 0;else if(Fns(n)){a=n.expected;let d=qns(n.message);l=d??lKe(n.input),c=d??lKe(n.input)}else if($ns(n))a=String(n.minimum);else if(n.code==="custom"&&"params"in n)l=n.params.received,c=l;let u=Nns({path:r,code:n.code,expected:a,received:l,enumValues:i,message:n.message,value:l});if(Uns(n))s=i?.map((d)=>`"${d}"`).join(", "),o=`Invalid value. Expected one of: ${s}`;else if(Fns(n)){let d=qns(n.message)??lKe(n.input);if(n.expected==="object"&&d==="null"&&r==="")o="Invalid or malformed JSON";else o=`Expected ${n.expected}, but received ${d}`}else if(gQc(n)){let d=n.keys.join(", ");o=`Unrecognized ${Cn(n.keys.length,"field")}: ${d}`}else if($ns(n))o=`Number must be greater than or equal to ${n.minimum}`,s=String(n.minimum);return{file:t,path:r,message:o,expected:s,invalidValue:c,suggestion:u?.suggestion,docLink:u?.docLink}})}
function hhr(e){try{let t=qt(e),n=hQc().safeParse(t);if(n.success)return{isValid:!0};return{isValid:!1,error:`Settings validation failed:
`+cKe(n.error,"settings").map((s)=>{let i=`- ${s.path}: ${s.message}`;if(s.suggestion)i+=`. ${s.suggestion}`;return i}).join(`
`),fullSchema:Ahr()}}catch(t){return{isValid:!1,error:`Invalid JSON: ${t instanceof Error?t.message:"Unknown parsing error"}`,fullSchema:Ahr()}}}
function _Qc(e,t){if(!e||typeof e!=="object")return[];let n=e;if(!n.permissions||typeof n.permissions!=="object")return[];let r=n.permissions,o=[];for(let s of["allow","deny","ask"]){let i=r[s];if(!Array.isArray(i))continue;r[s]=i.filter((a)=>{if(typeof a!=="string")return o.push({file:t,path:`permissions.${s}`,message:`Non-string value in ${s} array was removed`,severity:"warning",invalidValue:a}),!1;let l=dhr(a,s);if(!l.valid){let c=`Invalid permission rule "${a}" was skipped: ${l.error}`;if(l.suggestion)c+=`. ${l.suggestion}`;return o.push({file:t,path:`permissions.${s}`,message:c,severity:"warning",invalidValue:a}),!1}return!0})}return o}
function TQc(e,t){if(!e||typeof e!=="object")return[];let n=e;if(!("hooks"in n))return[];if(n.hooks===null||typeof n.hooks!=="object"||Array.isArray(n.hooks)){let s=lKe(n.hooks);return delete n.hooks,[{file:t,path:"hooks",message:`"hooks" must be an object mapping event names to matcher arrays; received ${s}. This field was ignored.`,severity:"warning",invalidValue:s,docLink:"https://code.claude.com/docs/en/hooks"}]}let r=n.hooks,o=[];for(let s of Object.keys(r)){if(!yQc.has(s)){delete r[s],o.push({file:t,path:`hooks.${s}`,message:`Unknown hook event "${s}" was ignored. Valid events: ${HOOK_EVENTS.join(", ")}`,severity:"warning",invalidValue:s,docLink:"https://code.claude.com/docs/en/hooks"});continue}if(!Array.isArray(r[s])){let i=lKe(r[s]);delete r[s],o.push({file:t,path:`hooks.${s}`,message:`Hook event "${s}" must be an array of matchers; received ${i}. This entry was ignored.`,severity:"warning",invalidValue:i,docLink:"https://code.claude.com/docs/en/hooks"})}}if(o.length>0&&Object.keys(r).length===0)delete n.hooks;return o}
function bQc(e,t){if(!e||typeof e!=="object")return[];let n=e,r=[];for(let{key:o,schema:s}of SQc){if(!(o in n))continue;if(!Array.isArray(n[o])){let l=n[o];delete n[o],r.push({file:t,path:o,message:`"${o}" must be an array; received ${lKe(l)}. This field was ignored.`,severity:"warning",invalidValue:l});continue}let i=n[o],a=[];for(let l=0;l<i.length;l++){let c=s().safeParse(i[l]);if(c.success)a.push(i[l]);else r.push({file:t,path:`${o}[${l}]`,message:`Invalid entry was ignored: ${c.error.issues[0]?.message??"failed validation"}`,severity:"warning",invalidValue:i[l]})}if(a.length<i.length)n[o]=a}return r}
function Upe(e,t,n){return[..._Qc(e,t),...TQc(e,t),...n?.skipMcpServerEntryFilter?[]:bQc(e,t)]}
var hQc,yQc,SQc;
var xEt=b(()=>{sQ();Xt();dr();wnn();Mns();J3();Bns();hQc=we(()=>RB().strict());yQc=new Set(HOOK_EVENTS);SQc=[{key:"allowedMcpServers",schema:Rnn},{key:"deniedMcpServers",schema:xnn}]});
export {Fns,Uns,gQc,$ns,lKe,qns,cKe,hhr,_Qc,TQc,bQc,Upe,hQc,yQc,SQc,xEt};
