// @ts-nocheck
import {TYt,ssr} from "./m51.ts";
import {_4o,y4o} from "./m52.ts";
import {SYt,isr} from "./m53.ts";
import {b} from "../runtime.ts";
function nCc(e,t,n,r,o,s){var i=n&eCc,a=e.length,l=t.length;if(a!=l&&!(i&&l>a))return!1;var c=s.get(e),u=s.get(t);if(c&&u)return c==t&&u==e;var d=-1,p=!0,m=n&tCc?new TYt:void 0;s.set(e,t),s.set(t,e);while(++d<a){var f=e[d],h=t[d];if(r)var g=i?r(h,f,d,t,e,s):r(f,h,d,e,t,s);if(g!==void 0){if(g)continue;p=!1;break}if(m){if(!_4o(t,function(_,T){if(!SYt(m,T)&&(f===_||o(f,_,n,r,s)))return m.push(T)})){p=!1;break}}else if(!(f===h||o(f,h,n,r,s))){p=!1;break}}return s.delete(e),s.delete(t),p}
var eCc=1,tCc=2,bYt;
var asr=b(()=>{ssr();y4o();isr();bYt=nCc});
export {nCc,eCc,tCc,bYt,asr};
