// @ts-nocheck
import {fGi} from "./m3003.ts";
import {c3i,u3i} from "./m2810.ts";
import {JWr,XWr,JWi,XWi} from "./m3002.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
function jnt(){if(iGr)return iGr;let e=fGi(),t="default"in e&&e.default?e.default:e;return c3i(t),iGr=t,t}
function ZLd(e){return e.default??e}
function n9(e){let t=jnt(),n=e.toLowerCase(),r=Object.prototype.hasOwnProperty.call(JWr,n)?n:Object.prototype.hasOwnProperty.call(XWr,n)?XWr[n]:null;if(r!==null){if(hGi.has(r))return null;if(!AGi.has(r)){let o=JWr[r];if(typeof o!=="function")return null;try{t.registerLanguage(r,ZLd(o()))}catch(s){return hGi.add(r),De(s),null}AGi.add(r);for(let s of JWi[r]??[])n9(s)}return r}return t.getLanguage(n)?n:null}
var iGr=null,AGi,hGi;
var aGr=b(()=>{u3i();XWi();Rn();AGi=new Set,hGi=new Set});
export {jnt,ZLd,n9,iGr,AGi,hGi,aGr};
