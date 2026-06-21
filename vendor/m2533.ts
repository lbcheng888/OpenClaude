// @ts-nocheck
import {IZ,rAe} from "./m2372.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function iP(e,t,n=!1){$Hi.useEffect(()=>{let r=e.current;if(!r)return;let o=IZ(r);if(!t){if(n&&o.activeElement===r)o.blur();return}return o.focus(r),o.subscribe(()=>{let s=e.current;if(!s||o.activeElement===s)return;if(!o.activeElement){o.focus(s);return}let i=s.parentNode;while(i){if(i===o.activeElement){o.focus(s);return}i=i.parentNode}})},[t,e,n])}
var $Hi;
var gAe=b(()=>{rAe();$Hi=M(Te(),1)});
export {iP,$Hi,gAe};
