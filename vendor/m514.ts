// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {ten,hpr} from "./m513.ts";
import {Ji,o8} from "./m461.ts";
import {b} from "../runtime.ts";
function _pr(e){return er.isPlainObject(e)||er.isArray(e)}
function Y7o(e){return er.endsWith(e,"[]")?e.slice(0,-2):e}
function gpr(e,t,n){if(!e)return t;return e.concat(t).map(function(o,s){return o=Y7o(o),!n&&s?"["+o+"]":o}).join(n?".":"")}
function HUc(e){return er.isArray(e)&&!e.some(_pr)}
function DUc(e,t,n){if(!er.isObject(e))throw TypeError("target must be an object");t=t||new(ten||FormData),n=er.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,g){return!er.isUndefined(g[h])});let r=n.metaTokens,o=n.visitor||d,s=n.dots,i=n.indexes,a=n.Blob||typeof Blob<"u"&&Blob,l=n.maxDepth===void 0?100:n.maxDepth,c=a&&er.isSpecCompliantForm(t);if(!er.isFunction(o))throw TypeError("visitor must be a function");function u(A){if(A===null)return"";if(er.isDate(A))return A.toISOString();if(er.isBoolean(A))return A.toString();if(!c&&er.isBlob(A))throw new Ji("Blob is not supported. Use a Buffer instead.");if(er.isArrayBuffer(A)||er.isTypedArray(A))return c&&typeof Blob==="function"?new Blob([A]):Buffer.from(A);return A}function d(A,h,g){let _=A;if(er.isReactNative(t)&&er.isReactNativeBlob(A))return t.append(gpr(g,h,s),u(A)),!1;if(A&&!g&&typeof A==="object"){if(er.endsWith(h,"{}"))h=r?h:h.slice(0,-2),A=JSON.stringify(A);else if(er.isArray(A)&&HUc(A)||(er.isFileList(A)||er.endsWith(h,"[]"))&&(_=er.toArray(A)))return h=Y7o(h),_.forEach(function(T,S){!(er.isUndefined(T)||T===null)&&t.append(i===!0?gpr([h],S,s):i===null?h:h+"[]",u(T))}),!1}if(_pr(A))return!0;return t.append(gpr(g,h,s),u(A)),!1}let p=[],m=Object.assign(IUc,{defaultVisitor:d,convertValue:u,isVisitable:_pr});function f(A,h,g=0){if(er.isUndefined(A))return;if(g>l)throw new Ji("Object is too deeply nested ("+g+" levels). Max depth: "+l,Ji.ERR_FORM_DATA_DEPTH_EXCEEDED);if(p.indexOf(A)!==-1)throw Error("Circular reference detected in "+h.join("."));p.push(A),er.forEach(A,function(y,T){if((!(er.isUndefined(y)||y===null)&&o.call(t,y,er.isString(T)?T.trim():T,h,m))===!0)f(y,h?h.concat(T):[T],g+1)}),p.pop()}if(!er.isObject(e))throw TypeError("data must be an object");return f(e),t}
var IUc,ZSe;
var ebt=b(()=>{ZE();o8();hpr();IUc=er.toFlatObject(er,{},null,function(t){return/^is[A-Z]/.test(t)});ZSe=DUc});
export {_pr,Y7o,gpr,HUc,DUc,IUc,ZSe,ebt};
