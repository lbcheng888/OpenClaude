// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
var Yjo=X((DQt)=>{Object.defineProperty(DQt,"__esModule",{value:!0});DQt.assignDefaults=void 0;var TVe=initLf(),Mvc=Ig();function Nvc(e,t){let{properties:n,items:r}=e.schema;if(t==="object"&&n)for(let o in n)zjo(e,o,n[o].default);else if(t==="array"&&Array.isArray(r))r.forEach((o,s)=>zjo(e,s,o.default))}DQt.assignDefaults=Nvc;function zjo(e,t,n){let{gen:r,compositeRule:o,data:s,opts:i}=e;if(n===void 0)return;let a=TVe._`${s}${(0,TVe.getProperty)(t)}`;if(o){(0,Mvc.checkStrictMode)(e,`default is ignored for: ${a}`);return}let l=TVe._`${a} === undefined`;if(i.useDefaults==="empty")l=TVe._`${l} || ${a} === null || ${a} === ""`;r.if(l,TVe._`${a} = ${(0,TVe.stringify)(n)}`)}});
export {Yjo};
