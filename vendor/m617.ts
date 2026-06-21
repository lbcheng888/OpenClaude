// @ts-nocheck
import {ID,Sre} from "./m70.ts";
import {jj,BOe} from "./m12.ts";
import {fGe,eYt} from "./m209.ts";
import {b} from "../runtime.ts";
function zKc(e){if(!ID(e)||jj(e)!=jKc)return!1;var t=fGe(e);if(t===null)return!0;var n=VKc.call(t,"constructor")&&t.constructor;return typeof n=="function"&&n instanceof n&&sXo.call(n)==KKc}
var jKc="[object Object]",WKc,GKc,sXo,VKc,KKc,_7e;
var zen=b(()=>{BOe();eYt();Sre();WKc=Function.prototype,GKc=Object.prototype,sXo=WKc.toString,VKc=GKc.hasOwnProperty,KKc=sXo.call(Object);_7e=zKc});
export {zKc,jKc,WKc,GKc,sXo,VKc,KKc,_7e,zen};
