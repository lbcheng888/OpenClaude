// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
function VWc(e){return rr.matchAll(/\w+|\[(\w*)]/g,e).map((t)=>t[0]==="[]"?"":t[1]||t[0])}
function KWc(e){let t={},n=Object.keys(e),r,o=n.length,s;for(r=0;r<o;r++)s=n[r],t[s]=e[s];return t}
function zWc(e){function t(n,r,o,s){let i=n[s++];if(i==="__proto__")return!0;let a=Number.isFinite(+i),l=s>=n.length;if(i=!i&&rr.isArray(o)?o.length:i,l){if(rr.hasOwnProp(o,i))o[i]=rr.isArray(o[i])?o[i].concat(r):[o[i],r];else o[i]=r;return!a}if(!o[i]||!rr.isObject(o[i]))o[i]=[];if(t(n,r,o[i],s)&&rr.isArray(o[i]))o[i]=KWc(o[i]);return!a}if(rr.isFormData(e)&&rr.isFunction(e.entries)){let n={};return rr.forEachEntry(e,(r,o)=>{t(VWc(r),o,n,0)}),n}return null}
var Fnn;
var e_r=b(()=>{oC();Fnn=zWc});
export {VWc,KWc,zWc,Fnn,e_r};
