// @ts-nocheck
import {X} from "../runtime.ts";
import {mle} from "./m3449.ts";
import {VQr} from "./m3456.ts";
import {dga} from "./m3536.ts";
import {Aga} from "./m3538.ts";
import {_ga} from "./m3539.ts";
import {Tga} from "./m3540.ts";
import {rLn} from "./m3550.ts";
import {rte} from "./m3557.ts";
import {aLn} from "./m3551.ts";
var PL=X((jTg,qga)=>{var $v=qga.exports=mle(),Uga=VQr(),peo,meo;$v.codegen=dga();$v.fetch=Aga();$v.path=_ga();$v.patterns=Tga();var $ga=$v.patterns.reservedRe,pZd=$v.patterns.unsafePropertyRe;$v.fs=$v.inquire("fs");$v.checkDepth=function(t){if(t===void 0)t=0;if(t>$v.recursionLimit)throw Error("max depth exceeded");return t};$v.toArray=function(t){if(t){var n=Object.keys(t),r=Array(n.length),o=0;while(o<n.length)r[o]=t[n[o++]];return r}return[]};$v.toObject=function(t){var n={},r=0;while(r<t.length){var o=t[r++],s=t[r++];if(s!==void 0)n[o]=s}return n};$v.isReserved=function(t){return $ga.test(t)};$v.safeProp=function(t){if(!/^[$\w_]+$/.test(t)||$ga.test(t))return"["+JSON.stringify(t)+"]";return"."+t};$v.ucFirst=function(t){return t.charAt(0).toUpperCase()+t.substring(1)};var mZd=/_([a-z])/g;$v.camelCase=function(t){return t.substring(0,1)+t.substring(1).replace(mZd,function(n,r){return r.toUpperCase()})};$v.compareFieldsById=function(t,n){return t.id-n.id};$v.decorateType=function(t,n){if(t.$type){if(n&&t.$type.name!==n)$v.decorateRoot.remove(t.$type),t.$type.name=n,$v.decorateRoot.add(t.$type);return t.$type}if(!peo)peo=rLn();var r=new peo(n||t.name);return $v.decorateRoot.add(r),r.ctor=t,Object.defineProperty(t,"$type",{value:r,enumerable:!1}),Object.defineProperty(t.prototype,"$type",{value:r,enumerable:!1}),r};var fZd=0;$v.decorateEnum=function(t){if(t.$type)return t.$type;if(!meo)meo=rte();var n=new meo("Enum"+fZd++,t);return $v.decorateRoot.add(n),Object.defineProperty(t,"$type",{value:n,enumerable:!1}),n};$v.setProperty=function(t,n,r,o){function s(i,a,l){var c=a.shift();if(pZd.test(c))return i;if(a.length>0)i[c]=s(i[c]||{},a,l);else{var u=i[c];if(u&&o)return i;if(u)l=[].concat(u).concat(l);i[c]=l}return i}if(typeof t!=="object")throw TypeError("dst must be an object");if(!n)throw TypeError("path must be specified");return n=n.split("."),s(t,n,r)};Object.defineProperty($v,"decorateRoot",{get:function(){return Uga.decorated||(Uga.decorated=new(aLn()))}})});
export {PL};
