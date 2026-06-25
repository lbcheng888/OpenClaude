// @ts-nocheck
import {b} from "../runtime.ts";
import {GX,X_} from "./m528.ts";
var _es;
var yes=b(()=>{GX();_es=X_.hasStandardBrowserEnv?((e,t)=>(n)=>(n=new URL(n,X_.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(X_.origin),X_.navigator&&/(msie|trident)/i.test(X_.navigator.userAgent)):()=>!0});
export {_es,yes};
