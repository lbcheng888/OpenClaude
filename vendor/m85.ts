// @ts-nocheck
import {VTt,_sr} from "./m84.ts";
import {b} from "../runtime.ts";
function LAc(e,t,n,r,o,s){var i=n&DAc,a=VTt(e),l=a.length,c=VTt(t),u=c.length;if(l!=u&&!i)return!1;var d=l;while(d--){var p=a[d];if(!(i?p in t:OAc.call(t,p)))return!1}var m=s.get(e),f=s.get(t);if(m&&f)return m==t&&f==e;var h=!0;s.set(e,t),s.set(t,e);var g=i;while(++d<l){p=a[d];var _=e[p],T=t[p];if(r)var y=i?r(T,_,p,t,e,s):r(_,T,p,e,t,s);if(!(y===void 0?_===T||o(_,T,n,r,s):y)){h=!1;break}g||(g=p=="constructor")}if(h&&!g){var S=e.constructor,E=t.constructor;if(S!=E&&(("constructor"in e)&&("constructor"in t))&&!(typeof S=="function"&&S instanceof S&&typeof E=="function"&&E instanceof E))h=!1}return s.delete(e),s.delete(t),h}
var DAc=1,PAc,OAc,q4o;
var W4o=b(()=>{_sr();PAc=Object.prototype,OAc=PAc.hasOwnProperty;q4o=LAc});
export {LAc,DAc,PAc,OAc,q4o,W4o};
