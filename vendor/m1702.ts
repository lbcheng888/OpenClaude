// @ts-nocheck
import {tIr,JGs} from "./m1701.ts";
import {b} from "../runtime.ts";
function ACe(e,t,n){let{parameterPath:r,mapper:o}=t,s;if(typeof r==="string")r=[r];if(Array.isArray(r)){if(r.length>0)if(o.isConstant)s=o.defaultValue;else{let i=XGs(e,r);if(!i.propertyFound&&n)i=XGs(n,r);let a=!1;if(!i.propertyFound)a=o.required||r[0]==="options"&&r.length===2;s=a?o.defaultValue:i.propertyValue}}else{if(o.required)s={};for(let i in r){let a=o.type.modelProperties[i],l=r[i],c=ACe(e,{parameterPath:l,mapper:a},n);if(c!==void 0){if(!s)s={};s[i]=c}}}return s}
function XGs(e,t){let n={propertyFound:!1},r=0;for(;r<t.length;++r){let o=t[r];if(e&&o in e)e=e[o];else break}if(r===t.length)n.propertyValue=e,n.propertyFound=!0;return n}
function FNu(e){return QGs in e}
function Mme(e){if(FNu(e))return Mme(e[QGs]);let t=tIr.operationRequestMap.get(e);if(!t)t={},tIr.operationRequestMap.set(e,t);return t}
var QGs;
var nRt=b(()=>{JGs();QGs=Symbol.for("@azure/core-client original request")});
export {ACe,XGs,FNu,Mme,QGs,nRt};
