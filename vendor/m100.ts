// @ts-nocheck
import {LLe,_Yt} from "./m46.ts";
import {b} from "../runtime.ts";
function bsr(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw TypeError(aRc);var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],s=n.cache;if(s.has(o))return s.get(o);var i=e.apply(this,r);return n.cache=s.set(o,i)||s,i};return n.cache=new(bsr.Cache||LLe),n}
var aRc="Expected a function",Hn;
var Wi=b(()=>{_Yt();bsr.Cache=LLe;Hn=bsr});
export {bsr,aRc,Hn,Wi};
