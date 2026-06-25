// @ts-nocheck
import {b} from "../runtime.ts";
function qki(e,t,n){let r=mPt.get(e);if(r)r.push(t);else mPt.set(e,[t]);if(n)A4r=!0}
function Wki(){let e=A4r;return A4r=!1,e}
var Zg,mPt,A4r=!1;
var dhe=b(()=>{Zg=new WeakMap,mPt=new WeakMap});
export {qki,Wki,Zg,mPt,A4r,dhe};
