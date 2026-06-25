// @ts-nocheck
import {f3r,nRi} from "./m2290.ts";
import {zy,xU} from "./m23.ts";
import {JEn,JAi} from "./m2287.ts";
import {b} from "../runtime.ts";
function Sdd(e,t,n){var r,o,s,i,a,l,c=0,u=!1,d=!1,p=!0;if(typeof e!="function")throw TypeError(_dd);if(t=f3r(t)||0,zy(n))u=!!n.leading,d="maxWait"in n,s=d?ydd(f3r(n.maxWait)||0,t):s,p="trailing"in n?!!n.trailing:p;function m(R){var w=r,H=o;return r=o=void 0,c=R,i=e.apply(H,w),i}function f(R){return c=R,a=setTimeout(_,t),u?m(R):i}function h(R){var w=R-l,H=R-c,k=t-w;return d?Tdd(k,s-H):k}function g(R){var w=R-l,H=R-c;return l===void 0||w>=t||w<0||d&&H>=s}function _(){var R=JEn();if(g(R))return T(R);a=setTimeout(_,h(R))}function T(R){if(a=void 0,p&&r)return m(R);return r=o=void 0,i}function y(){if(a!==void 0)clearTimeout(a);c=0,r=l=o=a=void 0}function S(){return a===void 0?i:T(JEn())}function E(){var R=JEn(),w=g(R);if(r=arguments,o=this,l=R,w){if(a===void 0)return f(l);if(d)return clearTimeout(a),a=setTimeout(_,t),m(l)}if(a===void 0)a=setTimeout(_,t);return i}return E.cancel=y,E.flush=S,E}
var _dd="Expected a function",ydd,Tdd,rRi;
var oRi=b(()=>{xU();JAi();nRi();ydd=Math.max,Tdd=Math.min;rRi=Sdd});
export {Sdd,_dd,ydd,Tdd,rRi,oRi};
