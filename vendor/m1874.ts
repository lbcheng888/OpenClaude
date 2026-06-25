// @ts-nocheck
import {Q} from "../runtime.ts";
var lni=Q((BWh,ani)=>{var Qzu="[object Object]";function Zzu(e){var t=!1;if(e!=null&&typeof e.toString!="function")try{t=!!(e+"")}catch(n){}return t}function eju(e,t){return function(n){return e(t(n))}}var tju=Function.prototype,sni=Object.prototype,ini=tju.toString,nju=sni.hasOwnProperty,rju=ini.call(Object),oju=sni.toString,sju=eju(Object.getPrototypeOf,Object);function iju(e){return!!e&&typeof e=="object"}function aju(e){if(!iju(e)||oju.call(e)!=Qzu||Zzu(e))return!1;var t=sju(e);if(t===null)return!0;var n=nju.call(t,"constructor")&&t.constructor;return typeof n=="function"&&n instanceof n&&ini.call(n)==rju}ani.exports=aju});
export {lni};
