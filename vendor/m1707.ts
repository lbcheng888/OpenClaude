// @ts-nocheck
import {xOr,VJs} from "./m1706.ts";
import {b} from "../runtime.ts";
function QAe(e,t,n){let{parameterPath:r,mapper:o}=t,s;if(typeof r==="string")r=[r];if(Array.isArray(r)){if(r.length>0)if(o.isConstant)s=o.defaultValue;else{let i=KJs(e,r);if(!i.propertyFound&&n)i=KJs(n,r);let a=!1;if(!i.propertyFound)a=o.required||r[0]==="options"&&r.length===2;s=a?o.defaultValue:i.propertyValue}}else{if(o.required)s={};for(let i in r){let a=o.type.modelProperties[i],l=r[i],c=QAe(e,{parameterPath:l,mapper:a},n);if(c!==void 0){if(!s)s={};s[i]=c}}}return s}
function KJs(e,t){let n={propertyFound:!1},r=0;for(;r<t.length;++r){let o=t[r];if(e&&o in e)e=e[o];else break}if(r===t.length)n.propertyValue=e,n.propertyFound=!0;return n}
function o5u(e){return zJs in e}
function Vme(e){if(o5u(e))return Vme(e[zJs]);let t=xOr.operationRequestMap.get(e);if(!t)t={},xOr.operationRequestMap.set(e,t);return t}
var zJs;
var HHt=b(()=>{VJs();zJs=Symbol.for("@azure/core-client original request")});
export {QAe,KJs,o5u,Vme,zJs,HHt};
