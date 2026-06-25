// @ts-nocheck
import {yre,EKe} from "./m82.ts";
import {b} from "../runtime.ts";
function fUc(e,t){return function(n,r){if(n==null)return n;if(!yre(n))return e(n,r);var o=n.length,s=t?o:-1,i=Object(n);while(t?s--:++s<o)if(r(i[s],s,i)===!1)break;return n}}
var SJo;
var bJo=b(()=>{EKe();SJo=fUc});
export {fUc,SJo,bJo};
