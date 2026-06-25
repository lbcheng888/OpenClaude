// @ts-nocheck
var Ebc=Object.create;
var{getPrototypeOf:Cbc,defineProperty:DLe,getOwnPropertyNames:esr,getOwnPropertyDescriptor:Abc}=Object,lYt=Object.prototype.hasOwnProperty;
function cYt(e){return this[e]}
var autofixError=(e,t,n)=>{var r=esr(t);for(let o of r)if(!lYt.call(e,o)&&o!=="default")DLe(e,o,{get:cYt.bind(t,o),enumerable:!0});if(n){for(let o of r)if(!lYt.call(n,o)&&o!=="default")DLe(n,o,{get:cYt.bind(t,o),enumerable:!0});return n}},Rbc,vbc,x=(e,t,n)=>{var r=e!=null&&typeof e==="object";if(r){var o=t?Rbc??=new WeakMap:vbc??=new WeakMap,s=o.get(e);if(s)return s}n=e!=null?Ebc(Cbc(e)):{};let i=t||!e||!e.__esModule?DLe(n,"default",{value:e,enumerable:!0}):n;for(let a of esr(e))if(!lYt.call(i,a))DLe(i,a,{get:cYt.bind(e,a),enumerable:!0});if(r)o.set(e,i);return i},oo=(e)=>{var t=(o3o??=new WeakMap).get(e),n;if(t)return t;if(t=DLe({},"__esModule",{value:!0}),e&&typeof e==="object"||typeof e==="function"){for(var r of esr(e))if(!lYt.call(t,r))DLe(t,r,{get:cYt.bind(e,r),enumerable:!(n=Abc(e,r))||n.enumerable})}return o3o.set(e,t),t},o3o,Q=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);
var wbc=(e)=>e;
function kbc(e,t){this[e]=wbc.bind(null,t)}
var ft=(e,t)=>{for(var n in t)DLe(e,n,{get:t[n],enumerable:!0,configurable:!0,set:kbc.bind(t,n)})};
var b=(e,t)=>()=>(e&&(t=e(e=0)),t);
globalThis.__ocNative=(n)=>new URL("./native/"+n,import.meta.url).pathname;
export {Ebc,Cbc,DLe,esr,Abc,lYt,cYt,autofixError,Rbc,vbc,x,oo,o3o,Q,wbc,kbc,ft,b};
