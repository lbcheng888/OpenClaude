// @ts-nocheck
import {b} from "../runtime.ts";
function Dbi(e,t,n){let r=NIt.get(e);if(r)r.push(t);else NIt.set(e,[t]);if(n)VUr=!0}
function Pbi(){let e=VUr;return VUr=!1,e}
var apiKeyHelperCache,NIt,VUr=!1;
var tAe=b(()=>{apiKeyHelperCache=new WeakMap,NIt=new WeakMap});
export {Dbi,Pbi,apiKeyHelperCache,NIt,VUr,tAe};
