// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {Mnn,Vgr} from "./m519.ts";
import {Hi,S5} from "./m467.ts";
import {b} from "../runtime.ts";
function zgr(e){return rr.isPlainObject(e)||rr.isArray(e)}
function KQo(e){return rr.endsWith(e,"[]")?e.slice(0,-2):e}
function Kgr(e,t,n){if(!e)return t;return e.concat(t).map(function(o,s){return o=KQo(o),!n&&s?"["+o+"]":o}).join(n?".":"")}
function NWc(e){return rr.isArray(e)&&!e.some(zgr)}
function BWc(e,t,n){if(!rr.isObject(e))throw TypeError("target must be an object");t=t||new(Mnn||FormData),n=rr.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(g,_){return!rr.isUndefined(_[g])});let r=n.metaTokens,o=n.visitor||d,s=n.dots,i=n.indexes,a=n.Blob||typeof Blob<"u"&&Blob,l=n.maxDepth===void 0?100:n.maxDepth,c=a&&rr.isSpecCompliantForm(t);if(!rr.isFunction(o))throw TypeError("visitor must be a function");function u(h){if(h===null)return"";if(rr.isDate(h))return h.toISOString();if(rr.isBoolean(h))return h.toString();if(!c&&rr.isBlob(h))throw new Hi("Blob is not supported. Use a Buffer instead.");if(rr.isArrayBuffer(h)||rr.isTypedArray(h))return c&&typeof Blob==="function"?new Blob([h]):Buffer.from(h);return h}function d(h,g,_){let T=h;if(rr.isReactNative(t)&&rr.isReactNativeBlob(h))return t.append(Kgr(_,g,s),u(h)),!1;if(h&&!_&&typeof h==="object"){if(rr.endsWith(g,"{}"))g=r?g:g.slice(0,-2),h=JSON.stringify(h);else if(rr.isArray(h)&&NWc(h)||(rr.isFileList(h)||rr.endsWith(g,"[]"))&&(T=rr.toArray(h)))return g=KQo(g),T.forEach(function(S,E){!(rr.isUndefined(S)||S===null)&&t.append(i===!0?Kgr([g],E,s):i===null?g:g+"[]",u(S))}),!1}if(zgr(h))return!0;return t.append(Kgr(_,g,s),u(h)),!1}let p=[],m=Object.assign(FWc,{defaultVisitor:d,convertValue:u,isVisitable:zgr});function f(h,g,_=0){if(rr.isUndefined(h))return;if(_>l)throw new Hi("Object is too deeply nested ("+_+" levels). Max depth: "+l,Hi.ERR_FORM_DATA_DEPTH_EXCEEDED);if(p.indexOf(h)!==-1)throw Error("Circular reference detected in "+g.join("."));p.push(h),rr.forEach(h,function(y,S){if((!(rr.isUndefined(y)||y===null)&&o.call(t,y,rr.isString(S)?S.trim():S,g,m))===!0)f(y,g?g.concat(S):[S],_+1)}),p.pop()}if(!rr.isObject(e))throw TypeError("data must be an object");return f(e),t}
var FWc,LEe;
var vAt=b(()=>{oC();S5();Vgr();FWc=rr.toFlatObject(rr,{},null,function(t){return/^is[A-Z]/.test(t)});LEe=BWc});
export {zgr,KQo,Kgr,NWc,BWc,FWc,LEe,vAt};
