// @ts-nocheck
import {NFr,K_i} from "./m2279.ts";
import {tT,c2} from "./m13.ts";
import {uTn,$_i} from "./m2276.ts";
import {b} from "../runtime.ts";
function Ked(e,t,n){var r,o,s,i,a,l,c=0,u=!1,d=!1,p=!0;if(typeof e!="function")throw TypeError(Wed);if(t=NFr(t)||0,tT(n))u=!!n.leading,d="maxWait"in n,s=d?Ged(NFr(n.maxWait)||0,t):s,p="trailing"in n?!!n.trailing:p;function m(v){var R=r,k=o;return r=o=void 0,c=v,i=e.apply(k,R),i}function f(v){return c=v,a=setTimeout(g,t),u?m(v):i}function A(v){var R=v-l,k=v-c,x=t-R;return d?Ved(x,s-k):x}function h(v){var R=v-l,k=v-c;return l===void 0||R>=t||R<0||d&&k>=s}function g(){var v=uTn();if(h(v))return _(v);a=setTimeout(g,A(v))}function _(v){if(a=void 0,p&&r)return m(v);return r=o=void 0,i}function y(){if(a!==void 0)clearTimeout(a);c=0,r=l=o=a=void 0}function T(){return a===void 0?i:_(uTn())}function S(){var v=uTn(),R=h(v);if(r=arguments,o=this,l=v,R){if(a===void 0)return f(l);if(d)return clearTimeout(a),a=setTimeout(g,t),m(l)}if(a===void 0)a=setTimeout(g,t);return i}return S.cancel=y,S.flush=T,S}
var Wed="Expected a function",Ged,Ved,z_i;
var Y_i=b(()=>{c2();$_i();K_i();Ged=Math.max,Ved=Math.min;z_i=Ked});
export {Ked,Wed,Ged,Ved,z_i,Y_i};
