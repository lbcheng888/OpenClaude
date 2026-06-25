// @ts-nocheck
import {Xbe,Bbt} from "./m200.ts";
import {Qbe,Ubt} from "./m201.ts";
import {b} from "../runtime.ts";
function _wc(e,t,n,r){var o=!n;n||(n={});var s=-1,i=t.length;while(++s<i){var a=t[s],l=r?r(n[a],e[a],a,n,e):void 0;if(l===void 0)l=e[a];if(o)Xbe(n,a,l);else Qbe(n,a,l)}return n}
var pK;
var gMe=b(()=>{Ubt();Bbt();pK=_wc});
export {_wc,pK,gMe};
