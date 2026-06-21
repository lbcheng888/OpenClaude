// @ts-nocheck
import {getSecuritySensitiveSetting,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {A2l,lDo} from "./m5225.ts";
import {cDo,uDo,lYn} from "./m5226.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {wT,Jft,eG,mI,KIo,wc,lo} from "../src/tools/5190_userPromptCount.ts";
import {b} from "../runtime.ts";
function C2l(){let e=getSecuritySensitiveSetting("footerLinksRegexes").flat();return e.length>0?e:void 0}
function v2l(){A2l((e,t)=>{let n=C2l(),r=t.footerLinks.filter((s)=>s.key!==void 0),o=!n||n.length===0?r:JCm(e,n,r);if(t.footerLinks.length===o.length&&t.footerLinks.every((s,i)=>{let a=o[i];return a!==void 0&&s.url===a.url&&s.dedupUrl===a.dedupUrl&&s.label===a.label&&s.prefix===a.prefix&&s.key===a.key&&s.color===a.color}))return null;return{footerLinks:o}})}
function w2l(e,t){try{let n=C2l();if(!n||n.length===0)return;let r=R2l(QCm(e)),o=r?cDo(n,r).reverse():[];if(o.length===0)return;Ie("repl_footer_links"),t((s)=>{let i=uDo(s.footerLinks,o);return i===s.footerLinks?s:{...s,footerLinks:i}})}catch(n){De(n),Oe("repl_footer_links","scan_failed")}}
function JCm(e,t,n=[]){if(!t||t.length===0)return n;let r=R2l(e);if(!r)return n;return uDo(n,cDo(t,r).reverse())}
function R2l(e){let t="",n=0;for(let r=e.length-1;r>=0&&t.length<dDo&&n<YCm;r--){let o=e[r];if(!XCm(o))continue;n++;let s=[];for(let i of wT([o],!0)){let a=tvm(i);if(a)s.push(a)}if(s.length>0){let i=s.join(`
`);t=t?i+`
`+t:i}}return t.length>dDo?t.slice(-dDo):t}
function XCm(e){if(e.type==="assistant")return Array.isArray(e.message.content)&&e.message.content.some((t)=>t.type==="text");if(e.type==="user"){if(e.isMeta||!Array.isArray(e.message.content))return!1;return e.message.content.some((t)=>t.type==="tool_result"&&(typeof t.content==="string"||Array.isArray(t.content)&&t.content.some((n)=>n.type==="text")))}return!1}
function QCm(e){for(let t=e.length-1;t>=0;t--){let n=e[t];if(n.type==="user"&&!n.isMeta&&!Jft(n)&&!ZCm(n)&&!evm(n))return e.slice(t+1)}return e.slice()}
function ZCm(e){if(e.type!=="user"||!Array.isArray(e.message.content))return!1;let t=e.message.content[0];return t?.type==="text"&&(t.text===eG||t.text===mI)}
function evm(e){if(e.type!=="user")return!1;let t=e.message.content,n=typeof t==="string"?t:Array.isArray(t)&&t[0]?.type==="text"?t[0].text:"";return(n.startsWith(E2l)?n.slice(E2l.length):n).startsWith(KIo)}
function tvm(e){if(e.type==="assistant"){let t=e.message.content[0];return t.type==="text"?pDo(t.text):""}if(e.type==="user"){if(e.isMeta)return"";let t=e.message.content[0];if(t.type!=="tool_result")return"";if(typeof t.content==="string")return pDo(t.content);if(Array.isArray(t.content))return pDo(wc(t.content,`
`));return""}return""}
function pDo(e){return e.length>b2l?e.slice(-b2l):e}
var b2l=8192,dDo=65536,YCm=256,E2l=`<system-reminder>
`;
var mDo=b(()=>{lDo();lYn();Rn();lo();yr();ln()});
export {C2l,v2l,w2l,JCm,R2l,XCm,QCm,ZCm,evm,tvm,pDo,b2l,dDo,YCm,E2l,mDo};
