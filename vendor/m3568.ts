// @ts-nocheck
import {Q} from "../runtime.ts";
import {ple} from "./m3465.ts";
import {kro} from "./m3472.ts";
import {vAa} from "./m3552.ts";
import {IAa} from "./m3554.ts";
import {PAa} from "./m3555.ts";
import {LAa} from "./m3556.ts";
import {J1n} from "./m3566.ts";
import {Xee} from "./m3573.ts";
import {eNn} from "./m3567.ts";
var XO=Q((wP_,rRa)=>{var JA=rRa.exports=ple(),tRa=kro(),joo,Yoo;JA.codegen=vAa();JA.fetch=IAa();JA.path=PAa();JA.patterns=LAa();var nRa=JA.patterns.reservedRe,eup=JA.patterns.unsafePropertyRe;JA.fs=JA.inquire("fs");JA.checkDepth=function(t){if(t===void 0)t=0;if(t>JA.recursionLimit)throw Error("max depth exceeded");return t};JA.toArray=function(t){if(t){var n=Object.keys(t),r=Array(n.length),o=0;while(o<n.length)r[o]=t[n[o++]];return r}return[]};JA.toObject=function(t){var n={},r=0;while(r<t.length){var o=t[r++],s=t[r++];if(s!==void 0)n[o]=s}return n};JA.isReserved=function(t){return nRa.test(t)};JA.safeProp=function(t){if(!/^[$\w_]+$/.test(t)||nRa.test(t))return"["+JSON.stringify(t)+"]";return"."+t};JA.ucFirst=function(t){return t.charAt(0).toUpperCase()+t.substring(1)};var tup=/_([a-z])/g;JA.camelCase=function(t){return t.substring(0,1)+t.substring(1).replace(tup,function(n,r){return r.toUpperCase()})};JA.compareFieldsById=function(t,n){return t.id-n.id};JA.decorateType=function(t,n){if(t.$type){if(n&&t.$type.name!==n)JA.decorateRoot.remove(t.$type),t.$type.name=n,JA.decorateRoot.add(t.$type);return t.$type}if(!joo)joo=J1n();var r=new joo(n||t.name);return JA.decorateRoot.add(r),r.ctor=t,Object.defineProperty(t,"$type",{value:r,enumerable:!1}),Object.defineProperty(t.prototype,"$type",{value:r,enumerable:!1}),r};var nup=0;JA.decorateEnum=function(t){if(t.$type)return t.$type;if(!Yoo)Yoo=Xee();var n=new Yoo("Enum"+nup++,t);return JA.decorateRoot.add(n),Object.defineProperty(t,"$type",{value:n,enumerable:!1}),n};JA.setProperty=function(t,n,r,o){function s(i,a,l){var c=a.shift();if(eup.test(c))return i;if(a.length>0)i[c]=s(i[c]||{},a,l);else{var u=i[c];if(u&&o)return i;if(u)l=[].concat(u).concat(l);i[c]=l}return i}if(typeof t!=="object")throw TypeError("dst must be an object");if(!n)throw TypeError("path must be specified");return n=n.split("."),s(t,n,r)};Object.defineProperty(JA,"decorateRoot",{get:function(){return tRa.decorated||(tRa.decorated=new(eNn()))}})});
export {XO};
