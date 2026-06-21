// @ts-nocheck
import {ggt,Yer} from "./m88.ts";
import {b} from "../runtime.ts";
function Pfc(e,t,n,r,o,s){var i=n&Hfc,a=ggt(e),l=a.length,c=ggt(t),u=c.length;if(l!=u&&!i)return!1;var d=l;while(d--){var p=a[d];if(!(i?p in t:Dfc.call(t,p)))return!1}var m=s.get(e),f=s.get(t);if(m&&f)return m==t&&f==e;var A=!0;s.set(e,t),s.set(t,e);var h=i;while(++d<l){p=a[d];var g=e[p],_=t[p];if(r)var y=i?r(_,g,p,t,e,s):r(g,_,p,e,t,s);if(!(y===void 0?g===_||o(g,_,n,r,s):y)){A=!1;break}h||(h=p=="constructor")}if(A&&!h){var T=e.constructor,S=t.constructor;if(T!=S&&(("constructor"in e)&&("constructor"in t))&&!(typeof T=="function"&&T instanceof T&&typeof S=="function"&&S instanceof S))A=!1}return s.delete(e),s.delete(t),A}
var Hfc=1,Ifc,Dfc,aUo;
var lUo=b(()=>{Yer();Ifc=Object.prototype,Dfc=Ifc.hasOwnProperty;aUo=Pfc});
export {Pfc,Hfc,Ifc,Dfc,aUo,lUo};
