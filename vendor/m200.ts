// @ts-nocheck
import {hSe,pyt} from "./m198.ts";
import {gSe,myt} from "./m199.ts";
import {b} from "../runtime.ts";
function mgc(e,t,n,r){var o=!n;n||(n={});var s=-1,i=t.length;while(++s<i){var a=t[s],l=r?r(n[a],e[a],a,n,e):void 0;if(l===void 0)l=e[a];if(o)hSe(n,a,l);else gSe(n,a,l)}return n}
var $V;
var ELe=b(()=>{myt();pyt();$V=mgc});
export {mgc,$V,ELe};
