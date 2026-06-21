// @ts-nocheck
import {mXo,fXo} from "./m622.ts";
import {b} from "../runtime.ts";
function ZKc(e,t,n){return t=AXo(t===void 0?e.length-1:t,0),function(){var r=arguments,o=-1,s=AXo(r.length-t,0),i=Array(s);while(++o<s)i[o]=r[t+o];o=-1;var a=Array(t+1);while(++o<t)a[o]=r[o];return a[t]=n(i),mXo(e,this,a)}}
var AXo,Yen;
var Ymr=b(()=>{fXo();AXo=Math.max;Yen=ZKc});
export {ZKc,AXo,Yen,Ymr};
