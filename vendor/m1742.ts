// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {uE,uRe} from "./m1733.ts";
import {jo,x0} from "./m1726.ts";
import {hashNotDeserialized,uI} from "./m1725.ts";
var NM={};
ft(NM,{stripLeadingHashOrQuery:()=>stripLeadingHashOrQuery,normalizeUrlForComparison:()=>normalizeUrlForComparison,mapToQueryString:()=>mapToQueryString,getDeserializedResponse:()=>getDeserializedResponse});
function kXs(e){if(!e)return e;let t=e.toLowerCase();if(uE.endsWith(t,"?"))t=t.slice(0,-1);else if(uE.endsWith(t,"?/"))t=t.slice(0,-2);if(!uE.endsWith(t,"/"))t+="/";return t}
function stripLeadingHashOrQuery(e){if(e.startsWith("#/"))return e.substring(2);else if(e.startsWith("#")||e.startsWith("?"))return e.substring(1);return e}
function getDeserializedResponse(e){if(!e||e.indexOf("=")<0)return null;try{let t=stripLeadingHashOrQuery(e),n=Object.fromEntries(new URLSearchParams(t));if(n.code||n.ear_jwe||n.error||n.error_description||n.state)return n}catch(t){throw jo(hashNotDeserialized)}return null}
function mapToQueryString(e,t=!0,n){let r=[];return e.forEach((o,s)=>{if(!t&&n&&s in n)r.push(`${s}=${o}`);else r.push(`${s}=${encodeURIComponent(o)}`)}),r.join("&")}
function normalizeUrlForComparison(e){if(!e)return e;let t=e.split("#")[0];try{let n=new URL(t),r=n.origin+n.pathname+n.search;return kXs(r)}catch(n){return kXs(t)}}
var QFe=b(()=>{x0();uRe();uI();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {NM,kXs,stripLeadingHashOrQuery,getDeserializedResponse,mapToQueryString,normalizeUrlForComparison,QFe};
