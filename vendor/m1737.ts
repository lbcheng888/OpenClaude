// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {sE,RCe} from "./m1728.ts";
import {ls,m0} from "./m1721.ts";
import {hashNotDeserialized,LH} from "./m1720.ts";
var E1={};
isFullscreenWithTTY(E1,{stripLeadingHashOrQuery:()=>stripLeadingHashOrQuery,normalizeUrlForComparison:()=>normalizeUrlForComparison,mapToQueryString:()=>mapToQueryString,getDeserializedResponse:()=>getDeserializedResponse});
function PVs(e){if(!e)return e;let t=e.toLowerCase();if(sE.endsWith(t,"?"))t=t.slice(0,-1);else if(sE.endsWith(t,"?/"))t=t.slice(0,-2);if(!sE.endsWith(t,"/"))t+="/";return t}
function stripLeadingHashOrQuery(e){if(e.startsWith("#/"))return e.substring(2);else if(e.startsWith("#")||e.startsWith("?"))return e.substring(1);return e}
function getDeserializedResponse(e){if(!e||e.indexOf("=")<0)return null;try{let t=stripLeadingHashOrQuery(e),n=Object.fromEntries(new URLSearchParams(t));if(n.code||n.ear_jwe||n.error||n.error_description||n.state)return n}catch(t){throw ls(hashNotDeserialized)}return null}
function mapToQueryString(e,t=!0,n){let r=[];return e.forEach((o,s)=>{if(!t&&n&&s in n)r.push(`${s}=${o}`);else r.push(`${s}=${encodeURIComponent(o)}`)}),r.join("&")}
function normalizeUrlForComparison(e){if(!e)return e;let t=e.split("#")[0];try{let n=new URL(t),r=n.origin+n.pathname+n.search;return PVs(r)}catch(n){return PVs(t)}}
var nBe=b(()=>{m0();RCe();LH();/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {E1,PVs,stripLeadingHashOrQuery,getDeserializedResponse,mapToQueryString,normalizeUrlForComparison,nBe};
