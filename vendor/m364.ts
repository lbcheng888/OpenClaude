// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
import {apiKeyHelperCache} from "./m357.ts";
var G7o=Q((dtn)=>{Object.defineProperty(dtn,"__esModule",{value:!0});dtn.assignDefaults=void 0;var yze=Km(),UOc=apiKeyHelperCache();function $Oc(e,t){let{properties:n,items:r}=e.schema;if(t==="object"&&n)for(let o in n)W7o(e,o,n[o].default);else if(t==="array"&&Array.isArray(r))r.forEach((o,s)=>W7o(e,s,o.default))}dtn.assignDefaults=$Oc;function W7o(e,t,n){let{gen:r,compositeRule:o,data:s,opts:i}=e;if(n===void 0)return;let a=yze._`${s}${(0,yze.getProperty)(t)}`;if(o){(0,UOc.checkStrictMode)(e,`default is ignored for: ${a}`);return}let l=yze._`${a} === undefined`;if(i.useDefaults==="empty")l=yze._`${l} || ${a} === null || ${a} === ""`;r.if(l,yze._`${a} = ${(0,yze.stringify)(n)}`)}});
export {G7o};
