// @ts-nocheck
import {lXi} from "./m3016.ts";
import {rGi,oGi} from "./m2823.ts";
import {Djr,Pjr,GJi,VJi} from "./m3015.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function Yot(){if(qjr)return qjr;let e=lXi(),t="default"in e&&e.default?e.default:e;return rGi(t),qjr=t,t}
function B4d(e){return e.default??e}
function A$(e){let t=Yot(),n=e.toLowerCase(),r=Object.prototype.hasOwnProperty.call(Djr,n)?n:Object.prototype.hasOwnProperty.call(Pjr,n)?Pjr[n]:null;if(r!==null){if(uXi.has(r))return null;if(!cXi.has(r)){let o=Djr[r];if(typeof o!=="function")return null;try{t.registerLanguage(r,B4d(o()))}catch(s){return uXi.add(r),Ie(s),null}cXi.add(r);for(let s of GJi[r]??[])A$(s)}return r}return t.getLanguage(n)?n:null}
var qjr=null,cXi,uXi;
var Wjr=b(()=>{oGi();VJi();vn();cXi=new Set,uXi=new Set});
export {Yot,B4d,A$,qjr,cXi,uXi,Wjr};
