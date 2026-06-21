// @ts-nocheck
import {b} from "../runtime.ts";
class sE{static isEmptyObj(e){if(e)try{let t=JSON.parse(e);return Object.keys(t).length===0}catch(t){}return!0}static startsWith(e,t){return e.indexOf(t)===0}static endsWith(e,t){return e.length>=t.length&&e.lastIndexOf(t)===e.length-t.length}static queryStringToObject(e){let t={},n=e.split("&"),r=(o)=>decodeURIComponent(o.replace(/\+/g," "));return n.forEach((o)=>{if(o.trim()){let[s,i]=o.split(/=(.+)/g,2);if(s&&i)t[r(s)]=r(i)}}),t}static trimArrayEntries(e){return e.map((t)=>t.trim())}static removeEmptyStringsFromArray(e){return e.filter((t)=>!!t)}static jsonParseHelper(e){try{return JSON.parse(e)}catch(t){return null}}static matchPattern(e,t){return new RegExp(e.replace(/\\/g,"\\\\").replace(/\*/g,"[^ ]*").replace(/\?/g,"\\?")).test(t)}}
var RCe=b(()=>{/*! @azure/msal-common v15.13.1 2025-10-29 */});
export {sE,RCe};
