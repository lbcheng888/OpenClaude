// @ts-nocheck
import {Sbe,PTt} from "./m7.ts";
import {b} from "../runtime.ts";
function Bbc(e){var t=this.__data__,n=Sbe(t,e);if(n<0)return!1;var r=t.length-1;if(n==r)t.pop();else Fbc.call(t,n,1);return--this.size,!0}
var Nbc,Fbc,p3o;
var m3o=b(()=>{PTt();Nbc=Array.prototype,Fbc=Nbc.splice;p3o=Bbc});
export {Bbc,Nbc,Fbc,p3o,m3o};
