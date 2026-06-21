// @ts-nocheck
import {useClock} from "./m2432.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function _Zl(e,t=VUm){let n=useClock(),[r,o]=sQn.useState(!e);return sQn.useEffect(()=>{if(e){o(!1);return}let s=n.setTimeout(()=>o(!0),t);return()=>s()},[e,n,t]),r}
var sQn,VUm=2000;
var yZl=b(()=>{ze();sQn=M(Te(),1)});
export {_Zl,sQn,VUm,yZl};
