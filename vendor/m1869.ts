// @ts-nocheck
import {X} from "../runtime.ts";
var mJs=X((gBA,pJs)=>{var P4u="[object Object]";function O4u(e){var t=!1;if(e!=null&&typeof e.toString!="function")try{t=!!(e+"")}catch(n){}return t}function L4u(e,t){return function(n){return e(t(n))}}var M4u=Function.prototype,uJs=Object.prototype,dJs=M4u.toString,N4u=uJs.hasOwnProperty,B4u=dJs.call(Object),F4u=uJs.toString,U4u=L4u(Object.getPrototypeOf,Object);function $4u(e){return!!e&&typeof e=="object"}function q4u(e){if(!$4u(e)||F4u.call(e)!=P4u||O4u(e))return!1;var t=U4u(e);if(t===null)return!0;var n=N4u.call(t,"constructor")&&t.constructor;return typeof n=="function"&&n instanceof n&&dJs.call(n)==B4u}pJs.exports=q4u});
export {mJs};
