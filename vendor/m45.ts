// @ts-nocheck
import {FOe,U7t} from "./m44.ts";
import {b} from "../runtime.ts";
function Per(e,t){if(typeof e!="function"||t!=null&&typeof t!="function")throw TypeError(Fpc);var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],s=n.cache;if(s.has(o))return s.get(o);var i=e.apply(this,r);return n.cache=s.set(o,i)||s,i};return n.cache=new(Per.Cache||FOe),n}
var Fpc="Expected a function",wn;
var ta=b(()=>{U7t();Per.Cache=FOe;wn=Per});
export {Per,Fpc,wn,ta};
