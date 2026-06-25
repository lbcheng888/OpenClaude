// @ts-nocheck
import {b} from "../runtime.ts";
function Tls(e){return asn.filePatternTools.includes(e)}
function Sls(e){return asn.bashPrefixTools.includes(e)}
function bls(e){return Object.hasOwn(asn.customValidation,e)?asn.customValidation[e]:void 0}
var asn;
var Els=b(()=>{asn={filePatternTools:["Read","Write","Edit","Glob","NotebookRead","NotebookEdit","Cd"],bashPrefixTools:["Bash"],customValidation:{WebSearch:(e)=>{if(e.includes("*")||e.includes("?"))return{valid:!1,error:"WebSearch does not support wildcards",suggestion:"Use exact search terms without * or ?",examples:["WebSearch(claude ai)","WebSearch(typescript tutorial)"]};return{valid:!0}},WebFetch:(e)=>{if(e.includes("://")||e.startsWith("http"))return{valid:!1,error:"WebFetch permissions use domain format, not URLs",suggestion:'Use "domain:hostname" format',examples:["WebFetch(domain:example.com)","WebFetch(domain:github.com)"]};if(!e.startsWith("domain:"))return{valid:!1,error:'WebFetch permissions must use "domain:" prefix',suggestion:'Use "domain:hostname" format',examples:["WebFetch(domain:example.com)","WebFetch(domain:*.google.com)"]};return{valid:!0}}}}});
export {Tls,Sls,bls,asn,Els};
