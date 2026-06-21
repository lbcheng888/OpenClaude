// @ts-nocheck
import {b} from "../runtime.ts";
function YWe({writeFn:e,flushIntervalMs:t=1000,maxBufferSize:n=100,maxBufferBytes:r=1/0,immediateMode:o=!1}){let s=[],i=0,a=null,l=null;function c(){if(a)clearTimeout(a),a=null}function u(f){try{e(f)}catch{}}function d(){if(l)u(l.join("")),l=null;if(s.length===0)return;u(s.join("")),s=[],i=0,c()}function p(){if(!a)a=setTimeout(d,t)}function m(){if(l){l.push(...s),s=[],i=0,c();return}let f=s;s=[],i=0,c(),l=f,setImmediate(()=>{let A=l;if(l=null,A)u(A.join(""))})}return{write(f){if(o){u(f);return}if(s.push(f),i+=f.length,p(),s.length>=n||i>=r)m()},flush:d,dispose(){d()}}}
function A_(e){return e.normalize("NFC")}
function yd(e){return/^[\\/]{2}/.test(e)}
function YA(e){return/^[\\/]{2}wsl(\$|\.localhost)[\\/]/i.test(e)}
function Crr(e){if(e.startsWith("\\\\?\\UNC\\"))return"\\\\"+e.slice(8);if(e.startsWith("\\\\?\\")&&e.length>=7&&e[5]===":")return e.slice(4);return e}
function dw(e){if(cLe(e))return Crr(e).replace(/^([\\/])[\\/]+/,"$1");return e}
function cLe(e){if(/^\\\\\?\\volume\{/i.test(e))return B2o(e);let t=Crr(e);if(t!==e&&B2o(t))return!0;return yd(t)&&!YA(t)}
function B2o(e){return/(^|[\\/])\.{1,2}([\\/]|$)/.test(e)||e.includes("/")}
function czt(e){try{return Crr(F2o.realpathSync.native(e))}catch{return null}}
function uzt(e,t){let n=Ore.resolve(t).toLowerCase(),r=Ore.resolve(e).toLowerCase();if(Ore.dirname(r)===n||r.startsWith(n+Ore.sep))return!0;let o=czt(t)?.toLowerCase();if(o==null)return!1;let s=czt(Ore.dirname(Ore.resolve(e)))?.toLowerCase();if(s==null)return!0;return s===o||s.startsWith(o+Ore.sep)}
var F2o,Ore;
var ng=b(()=>{F2o=require("fs"),Ore=require("path")});
export {YWe,A_,yd,YA,Crr,dw,cLe,B2o,czt,uzt,F2o,Ore,ng};
