// @ts-nocheck
import {b} from "../runtime.ts";
import {ZE,er} from "./m460.ts";
import {KX,Y_} from "./m522.ts";
var bzo;
var Ezo=b(()=>{ZE();KX();bzo=Y_.hasStandardBrowserEnv?{write(e,t,n,r,o,s,i){if(typeof document>"u")return;let a=[`${e}=${encodeURIComponent(t)}`];if(er.isNumber(n))a.push(`expires=${new Date(n).toUTCString()}`);if(er.isString(r))a.push(`path=${r}`);if(er.isString(o))a.push(`domain=${o}`);if(s===!0)a.push("secure");if(er.isString(i))a.push(`SameSite=${i}`);document.cookie=a.join("; ")},read(e){if(typeof document>"u")return null;let t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-86400000,"/")}}:{write(){},read(){return null},remove(){}}});
export {bzo,Ezo};
