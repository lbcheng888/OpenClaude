// @ts-nocheck
import {ESn,q2r} from "./m2382.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Mie({line:e,column:t,active:n,visible:r=!1}){let o=hAe.useContext(ESn),s=hAe.useRef(null),i=hAe.useCallback((a)=>{s.current=a},[]);return hAe.useLayoutEffect(()=>{let a=s.current;if(n&&a)o({relativeX:t,relativeY:e,node:a,visible:r});else o(null,a)}),hAe.useLayoutEffect(()=>()=>{o(null,s.current)},[o]),i}
var hAe;
var _et=b(()=>{q2r();hAe=M(Te(),1)});
export {Mie,hAe,_et};
