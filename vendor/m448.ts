// @ts-nocheck
import {Cre,kWe} from "./m86.ts";
import {b} from "../runtime.ts";
function i0c(e,t){return function(n,r){if(n==null)return n;if(!Cre(n))return e(n,r);var o=n.length,s=t?o:-1,i=Object(n);while(t?s--:++s<o)if(r(i[s],s,i)===!1)break;return n}}
var EGo;
var CGo=b(()=>{kWe();EGo=i0c});
export {i0c,EGo,CGo};
