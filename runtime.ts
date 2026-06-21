// @ts-nocheck
var gdc=Object.create;
var{getPrototypeOf:_dc,defineProperty:MOe,getOwnPropertyNames:ker,getOwnPropertyDescriptor:ydc}=Object,D7t=Object.prototype.hasOwnProperty;
function P7t(e){return this[e]}
var Yo=(e,t,n)=>{var r=ker(t);for(let o of r)if(!D7t.call(e,o)&&o!=="default")MOe(e,o,{get:P7t.bind(t,o),enumerable:!0});if(n){for(let o of r)if(!D7t.call(n,o)&&o!=="default")MOe(n,o,{get:P7t.bind(t,o),enumerable:!0});return n}},Tdc,Sdc,M=(e,t,n)=>{var r=e!=null&&typeof e==="object";if(r){var o=t?Tdc??=new WeakMap:Sdc??=new WeakMap,s=o.get(e);if(s)return s}n=e!=null?gdc(_dc(e)):{};let i=t||!e||!e.__esModule?MOe(n,"default",{value:e,enumerable:!0}):n;for(let a of ker(e))if(!D7t.call(i,a))MOe(i,a,{get:P7t.bind(e,a),enumerable:!0});if(r)o.set(e,i);return i},ro=(e)=>{var t=(fBo??=new WeakMap).get(e),n;if(t)return t;if(t=MOe({},"__esModule",{value:!0}),e&&typeof e==="object"||typeof e==="function"){for(var r of ker(e))if(!D7t.call(t,r))MOe(t,r,{get:P7t.bind(e,r),enumerable:!(n=ydc(e,r))||n.enumerable})}return fBo.set(e,t),t},fBo,X=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);
var bdc=(e)=>e;
function Edc(e,t){this[e]=bdc.bind(null,t)}
var isFullscreenWithTTY=(e,t)=>{for(var n in t)MOe(e,n,{get:t[n],enumerable:!0,configurable:!0,set:Edc.bind(t,n)})};
var b=(e,t)=>()=>(e&&(t=e(e=0)),t);
globalThis.__ocNative=(n)=>new URL("./native/"+n,import.meta.url).pathname;
export {gdc,_dc,MOe,ker,ydc,D7t,P7t,Yo,Tdc,Sdc,M,ro,fBo,X,bdc,Edc,isFullscreenWithTTY,b};
