// @ts-nocheck
import {b} from "../runtime.ts";
import {KX,Y_} from "./m522.ts";
var Tzo;
var Szo=b(()=>{KX();Tzo=Y_.hasStandardBrowserEnv?((e,t)=>(n)=>(n=new URL(n,Y_.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(Y_.origin),Y_.navigator&&/(msie|trident)/i.test(Y_.navigator.userAgent)):()=>!0});
export {Tzo,Szo};
