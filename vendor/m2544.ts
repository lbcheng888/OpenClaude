// @ts-nocheck
import {vZ,mhe} from "./m2382.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function bD(e,t,n=!1){lMi.useEffect(()=>{let r=e.current;if(!r)return;let o=vZ(r);if(!t){if(n&&o.activeElement===r)o.blur();return}return o.focus(r),o.subscribe(()=>{let s=e.current;if(!s||o.activeElement===s)return;if(!o.activeElement){o.focus(s);return}let i=s.parentNode;while(i){if(i===o.activeElement){o.focus(s);return}i=i.parentNode}})},[t,e,n])}
var lMi;
var Ihe=b(()=>{mhe();lMi=x(et(),1)});
export {bD,lMi,Ihe};
