// @ts-nocheck
import {getSecuritySensitiveSetting,br} from "../src/config/0745_updateSettingsForSource.ts";
import {sWl,k1o} from "./m5258.ts";
import {H1o,I1o,aZn} from "./m5259.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {ST,Vce,uMo,Kl,po} from "../src/tools/5224_userPromptCount.ts";
import {J$,Lw} from "./m4308.ts";
import {b} from "../runtime.ts";
function fWl(){let e=getSecuritySensitiveSetting("footerLinksRegexes").flat();return e.length>0?e:void 0}
function hWl(){sWl((e,t)=>{let n=fWl(),r=t.footerLinks.filter((s)=>s.key!==void 0),o=!n||n.length===0?r:cPm(e,n,r);if(t.footerLinks.length===o.length&&t.footerLinks.every((s,i)=>{let a=o[i];return a!==void 0&&s.url===a.url&&s.dedupUrl===a.dedupUrl&&s.label===a.label&&s.prefix===a.prefix&&s.key===a.key&&s.color===a.color}))return null;return{footerLinks:o}})}
function gWl(e,t){try{let n=fWl();if(!n||n.length===0)return;let r=_Wl(dPm(e)),o=r?H1o(n,r).reverse():[];if(o.length===0)return;He("repl_footer_links"),t((s)=>{let i=I1o(s.footerLinks,o);return i===s.footerLinks?s:{...s,footerLinks:i}})}catch(n){Ie(n),xe("repl_footer_links","scan_failed")}}
function cPm(e,t,n=[]){if(!t||t.length===0)return n;let r=_Wl(e);if(!r)return n;return I1o(n,H1o(t,r).reverse())}
function _Wl(e){let t="",n=0;for(let r=e.length-1;r>=0&&t.length<x1o&&n<lPm;r--){let o=e[r];if(!uPm(o))continue;n++;let s=[];for(let i of ST([o],!0)){let a=fPm(i);if(a)s.push(a)}if(s.length>0){let i=s.join(`
`);t=t?i+`
`+t:i}}return t.length>x1o?t.slice(-x1o):t}
function uPm(e){if(e.type==="assistant")return Array.isArray(e.message.content)&&e.message.content.some((t)=>t.type==="text");if(e.type==="user"){if(e.isMeta||!Array.isArray(e.message.content))return!1;return e.message.content.some((t)=>t.type==="tool_result"&&(typeof t.content==="string"||Array.isArray(t.content)&&t.content.some((n)=>n.type==="text")))}return!1}
function dPm(e){for(let t=e.length-1;t>=0;t--){let n=e[t];if(n.type==="user"&&!n.isMeta&&!Vce(n)&&!pPm(n)&&!mPm(n))return e.slice(t+1)}return e.slice()}
function pPm(e){if(e.type!=="user"||!Array.isArray(e.message.content))return!1;let t=e.message.content[0];return t?.type==="text"&&(t.text===J$||t.text===Lw)}
function mPm(e){if(e.type!=="user")return!1;let t=e.message.content,n=typeof t==="string"?t:Array.isArray(t)&&t[0]?.type==="text"?t[0].text:"";return(n.startsWith(mWl)?n.slice(mWl.length):n).startsWith(uMo)}
function fPm(e){if(e.type==="assistant"){let t=e.message.content[0];return t.type==="text"?D1o(t.text):""}if(e.type==="user"){if(e.isMeta)return"";let t=e.message.content[0];if(t.type!=="tool_result")return"";if(typeof t.content==="string")return D1o(t.content);if(Array.isArray(t.content))return D1o(Kl(t.content,`
`));return""}return""}
function D1o(e){return e.length>pWl?e.slice(-pWl):e}
var pWl=8192,x1o=65536,lPm=256,mWl=`<system-reminder>
`;
var P1o=b(()=>{k1o();aZn();vn();po();br();mn()});
export {fWl,hWl,gWl,cPm,_Wl,uPm,dPm,pPm,mPm,fPm,D1o,pWl,x1o,lPm,mWl,P1o};
