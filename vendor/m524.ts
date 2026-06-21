// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
function BUc(e){return er.matchAll(/\w+|\[(\w*)]/g,e).map((t)=>t[0]==="[]"?"":t[1]||t[0])}
function FUc(e){let t={},n=Object.keys(e),r,o=n.length,s;for(r=0;r<o;r++)s=n[r],t[s]=e[s];return t}
function UUc(e){function t(n,r,o,s){let i=n[s++];if(i==="__proto__")return!0;let a=Number.isFinite(+i),l=s>=n.length;if(i=!i&&er.isArray(o)?o.length:i,l){if(er.hasOwnProp(o,i))o[i]=er.isArray(o[i])?o[i].concat(r):[o[i],r];else o[i]=r;return!a}if(!o[i]||!er.isObject(o[i]))o[i]=[];if(t(n,r,o[i],s)&&er.isArray(o[i]))o[i]=FUc(o[i]);return!a}if(er.isFormData(e)&&er.isFunction(e.entries)){let n={};return er.forEachEntry(e,(r,o)=>{t(BUc(r),o,n,0)}),n}return null}
var ren;
var vpr=b(()=>{ZE();ren=UUc});
export {BUc,FUc,UUc,ren,vpr};
