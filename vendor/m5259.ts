// @ts-nocheck
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {truncateToWidth,XH} from "./m239.ts";
import {Ce,Ct} from "./m197.ts";
import {GXt,lr} from "./m233.ts";
import {cc} from "./m2459.ts";
import {o1e} from "./m458.ts";
import {b} from "../runtime.ts";
import {YU} from "./m459.ts";
import {Jg,jBr} from "./m2044.ts";
import {Hn} from "./m100.ts";
function cWl(e,t,n){let r=e.find((o)=>o.key===t);if(n===null)return r?e.filter((o)=>o.key!==t):e;if(r&&r.url===n.url&&r.dedupUrl===n.dedupUrl&&r.label===n.label&&r.prefix===n.prefix&&r.color===n.color)return e;return[{...n,key:t},...e.filter((o)=>o.key!==t&&(o.key!==void 0||!sZn(o,n)))]}
function H1o(e,t){if(!e||e.length===0||!t)return[];let n=[];for(let r of e){if(r.type!=="regex")continue;let{pattern:o,url:s,label:i}=r;if(typeof o!=="string"||typeof s!=="string"||i!==void 0&&typeof i!=="string"){QDm(`${typeof o}/${typeof s}/${typeof i}`);continue}let a=aPm(o);if(!a)continue;let l=iPm(s);if(l===null)continue;ePm(`${o}\x00${s}\x00${i??""}`,o,`${s}
${i??""}`);let c=0,u=[],d=!1,p=!1,m=!1,f=performance.now();try{for(let g of t.matchAll(a)){if(++c>iWl){logForDebugging(`[footerLinks] pattern ${o} exceeded ${iWl} matches in one scan; stopping (newest matches beyond the ceiling are not collected)`,{level:"warn"}),Pt("repl_footer_links","scan_ceiling");break}if(u.push(g),u.length>lWl)u.shift()}for(let g of u){let _=g.groups??{},T=nPm(s,_);if(T!==null&&T.length>aWl){if(!p)p=!0,logForDebugging(`[footerLinks] dropping over-length url (${T.length} > ${aWl} chars) for pattern ${o}`,{level:"warn"}),Pt("repl_footer_links","url_too_long");continue}let y=T===null?null:dWl(T);if(T===null||!y||uWl(y)!==l){if(!d)d=!0,logForDebugging(`[footerLinks] dropping ${T===null?"dot-segment":y?"origin-shifted":"unparseable"} url for pattern ${o}`,{level:"warn"}),Pt("repl_footer_links",T===null?"dot_segment_url":y?"origin_shifted":"unparseable_url");continue}let S=truncateToWidth(oPm(i?sPm(i,_):g[0]).trim(),JDm);if(S===""){if(!m)m=!0,logForDebugging(`[footerLinks] dropping match with empty label for pattern ${o}`,{level:"warn"}),Pt("repl_footer_links","empty_label");continue}n.push({index:g.index??0,match:{url:T,label:S}})}}catch(g){logForDebugging(`[footerLinks] regex exec failed for ${o}: ${Ce(g)}`,{level:"warn"}),Pt("repl_footer_links","regex_exec_failed")}let h=performance.now()-f;if(h>XDm)logForDebugging(`[footerLinks] slow pattern (${Math.round(h)}ms): ${o}`,{level:"warn"})}return n.sort((r,o)=>r.index-o.index).map((r)=>r.match)}
function nPm(e,t){let n=e.replace(iZn,(s,i)=>encodeURIComponent(GXt(Object.hasOwn(t,i)?t[i]??"":""))),r=n.search(/[?#]/);return(r===-1?n:n.slice(0,r)).split(/[/\\]/).some((s)=>tPm.test(s))?null:n}
function oPm(e){return cc(e).replace(rPm,"")}
function sPm(e,t){return e.replace(iZn,(n,r)=>Object.hasOwn(t,r)?t[r]??"":"")}
function uWl(e){return e.origin!=="null"?e.origin:`${e.protocol}//${e.host}`}
function dWl(e){try{return new URL(e)}catch{return null}}
function I1o(e,t){if(t.length===0)return e;let[n,r]=o1e(e,(a)=>a.key!==void 0),o=[];for(let a of t){if(o.some((l)=>sZn(l,a))||n.some((l)=>sZn(l,a)))continue;o.push(a)}if(o.length===0)return e;let s=r.filter((a)=>!o.some((l)=>sZn(l,a))),i=[...n,...[...o,...s].slice(0,VKt)];if(i.length===e.length&&i.every((a,l)=>{let c=e[l];return a===c||a.url===c.url&&a.dedupUrl===c.dedupUrl&&a.label===c.label&&a.prefix===c.prefix&&a.key===c.key&&a.color===c.color}))return e;return i}
function sZn(e,t){return e.url===t.url||e.url===t.dedupUrl||e.dedupUrl===t.url||e.dedupUrl!==void 0&&e.dedupUrl===t.dedupUrl}
var VKt=5,lWl,iWl,JDm=28,aWl=2048,XDm=50,QDm,iZn,ZDm,ePm,tPm,rPm,iPm,aPm;
var aZn=b(()=>{YU();mn();Jg();qe();Ct();lr();XH();lWl=VKt*4,iWl=lWl*10;QDm=Hn((e)=>{logForDebugging(`[footerLinks] skipping a 'regex' entry with non-string fields (pattern/url/label types: ${e}); the entry is preserved in settings`,{level:"warn"}),Pt("repl_footer_links","unreadable_entry")}),iZn=/\{([^{}]+)\}/g,ZDm=/\(\?<([^>=!][^>]*)>/g,ePm=Hn((e,t,n)=>{let r=new Set([...t.matchAll(ZDm)].map((o)=>o[1]));for(let[,o]of n.matchAll(iZn))if(o!==void 0&&!r.has(o))logForDebugging(`[footerLinks] template references {${o}} but pattern ${t} has no such named capture group`,{level:"warn"})}),tPm=/^(?:\.|%2e){1,2}$/i;rPm=/[\x00-\x1f\x7f]/g;iPm=Hn((e)=>{let t=dWl(e.replace(iZn,"x"));if(!t||!jBr.has(t.protocol))return logForDebugging(`[footerLinks] url template "${e}" must have a literal origin with an allowlisted scheme (e.g. https://host/...); skipping`,{level:"warn"}),Pt("repl_footer_links","bad_url_template"),null;return uWl(t)});aPm=Hn((e)=>{try{return new RegExp(e,"g")}catch(t){return logForDebugging(`[footerLinks] invalid pattern ${e}: ${Ce(t)}`,{level:"warn"}),Pt("repl_footer_links","invalid_pattern"),null}})});
export {cWl,H1o,nPm,oPm,sPm,uWl,dWl,I1o,sZn,VKt,lWl,iWl,JDm,aWl,XDm,QDm,iZn,ZDm,ePm,tPm,rPm,iPm,aPm,aZn};
