// @ts-nocheck
import {b} from "../runtime.ts";
import {oC,rr} from "./m466.ts";
import {GX,X_} from "./m528.ts";
var Tes;
var Ses=b(()=>{oC();GX();Tes=X_.hasStandardBrowserEnv?{write(e,t,n,r,o,s,i){if(typeof document>"u")return;let a=[`${e}=${encodeURIComponent(t)}`];if(rr.isNumber(n))a.push(`expires=${new Date(n).toUTCString()}`);if(rr.isString(r))a.push(`path=${r}`);if(rr.isString(o))a.push(`domain=${o}`);if(s===!0)a.push("secure");if(rr.isString(i))a.push(`SameSite=${i}`);document.cookie=a.join("; ")},read(e){if(typeof document>"u")return null;let t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-86400000,"/")}}:{write(){},read(){return null},remove(){}}});
export {Tes,Ses};
