// @ts-nocheck
import {G7t,Ner} from "./m55.ts";
import {MFo,NFo} from "./m56.ts";
import {V7t,Ber} from "./m57.ts";
import {b} from "../runtime.ts";
function emc(e,t,n,r,o,s){var i=n&Qpc,a=e.length,l=t.length;if(a!=l&&!(i&&l>a))return!1;var c=s.get(e),u=s.get(t);if(c&&u)return c==t&&u==e;var d=-1,p=!0,m=n&Zpc?new G7t:void 0;s.set(e,t),s.set(t,e);while(++d<a){var f=e[d],A=t[d];if(r)var h=i?r(A,f,d,t,e,s):r(f,A,d,e,t,s);if(h!==void 0){if(h)continue;p=!1;break}if(m){if(!MFo(t,function(g,_){if(!V7t(m,_)&&(f===g||o(f,g,n,r,s)))return m.push(_)})){p=!1;break}}else if(!(f===A||o(f,A,n,r,s))){p=!1;break}}return s.delete(e),s.delete(t),p}
var Qpc=1,Zpc=2,K7t;
var Fer=b(()=>{Ner();NFo();Ber();K7t=emc});
export {emc,Qpc,Zpc,K7t,Fer};
