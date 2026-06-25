// @ts-nocheck
import {m7e,MXt} from "./m216.ts";
import {b8o,E8o} from "./m217.ts";
import {NXt,ycr} from "./m220.ts";
import {C8o,A8o} from "./m218.ts";
import {w8o,k8o} from "./m219.ts";
import {b} from "../runtime.ts";
function lkc(e,t,n){var r=e.constructor;switch(t){case Xwc:return m7e(e);case Wwc:case Gwc:return new r(+e);case Qwc:return b8o(e,n);case Zwc:case ekc:case tkc:case nkc:case rkc:case okc:case skc:case ikc:case akc:return NXt(e,n);case Vwc:return new r;case Kwc:case Ywc:return new r(e);case zwc:return C8o(e);case jwc:return new r;case Jwc:return w8o(e)}}
var Wwc="[object Boolean]",Gwc="[object Date]",Vwc="[object Map]",Kwc="[object Number]",zwc="[object RegExp]",jwc="[object Set]",Ywc="[object String]",Jwc="[object Symbol]",Xwc="[object ArrayBuffer]",Qwc="[object DataView]",Zwc="[object Float32Array]",ekc="[object Float64Array]",tkc="[object Int8Array]",nkc="[object Int16Array]",rkc="[object Int32Array]",okc="[object Uint8Array]",skc="[object Uint8ClampedArray]",ikc="[object Uint16Array]",akc="[object Uint32Array]",H8o;
var I8o=b(()=>{MXt();E8o();A8o();k8o();ycr();H8o=lkc});
export {lkc,Wwc,Gwc,Vwc,Kwc,zwc,jwc,Ywc,Jwc,Xwc,Qwc,Zwc,ekc,tkc,nkc,rkc,okc,skc,ikc,akc,H8o,I8o};
