// @ts-nocheck
import {b} from "../runtime.ts";
function WKe({writeFn:e,flushIntervalMs:t=1000,maxBufferSize:n=100,maxBufferBytes:r=1/0,immediateMode:o=!1}){let s=[],i=0,a=null,l=null;function c(){if(a)clearTimeout(a),a=null}function u(f){try{e(f)}catch{}}function d(){if(l)u(l.join("")),l=null;if(s.length===0)return;u(s.join("")),s=[],i=0,c()}function p(){if(!a)a=setTimeout(d,t)}function m(){if(l){l.push(...s),s=[],i=0,c();return}let f=s;s=[],i=0,c(),l=f,setImmediate(()=>{let h=l;if(l=null,h)u(h.join(""))})}return{write(f){if(o){u(f);return}if(s.push(f),i+=f.length,p(),s.length>=n||i>=r)m()},flush:d,dispose(){d()}}}
function A_(e){return e.normalize("NFC")}
function lu(e){return/^[\\/]{2}/.test(e)}
function Cf(e){return/^[\\/]{2}wsl(\$|\.localhost)[\\/]/i.test(e)}
function Xar(e){if(e.startsWith("\\\\?\\UNC\\"))return"\\\\"+e.slice(8);if(e.startsWith("\\\\?\\")&&e.length>=7&&e[5]===":")return e.slice(4);return e}
function yR(e){if(Xde(e))return Xar(e).replace(/^([\\/])[\\/]+/,"$1");return e}
function Xde(e){if(/^\\\\\?\\volume\{/i.test(e))return C6o(e);let t=Xar(e);if(t!==e&&C6o(t))return!0;return lu(t)&&!Cf(t)}
function C6o(e){return/(^|[\\/])\.{1,2}([\\/]|$)/.test(e)||e.includes("/")}
function UJt(e){try{return Xar(A6o.realpathSync.native(e))}catch{return null}}
function $Jt(e,t){let n=Ire.resolve(t).toLowerCase(),r=Ire.resolve(e).toLowerCase();if(Ire.dirname(r)===n||r.startsWith(n+Ire.sep))return!0;let o=UJt(t)?.toLowerCase();if(o==null)return!1;let s=UJt(Ire.dirname(Ire.resolve(e)))?.toLowerCase();if(s==null)return!0;return s===o||s.startsWith(o+Ire.sep)}
var A6o,Ire;
var zf=b(()=>{A6o=require("fs"),Ire=require("path")});
export {WKe,A_,lu,Cf,Xar,yR,Xde,C6o,UJt,$Jt,A6o,Ire,zf};
