// @ts-nocheck
import {Q} from "../runtime.ts";
import {NCt} from "./m359.ts";
import {Km} from "./m356.ts";
import {kpe} from "./m358.ts";
var N7o=Q((hze)=>{Object.defineProperty(hze,"__esModule",{value:!0});hze.boolOrEmptySchema=hze.topBoolOrEmptySchema=void 0;var TOc=NCt(),SOc=Km(),bOc=kpe(),EOc={message:"boolean schema is false"};function COc(e){let{gen:t,schema:n,validateName:r}=e;if(n===!1)M7o(e,!1);else if(typeof n=="object"&&n.$async===!0)t.return(bOc.default.data);else t.assign(SOc._`${r}.errors`,null),t.return(!0)}hze.topBoolOrEmptySchema=COc;function AOc(e,t){let{gen:n,schema:r}=e;if(r===!1)n.var(t,!1),M7o(e);else n.var(t,!0)}hze.boolOrEmptySchema=AOc;function M7o(e,t){let{gen:n,data:r}=e,o={gen:n,keyword:"false schema",data:r,schema:!1,schemaCode:!1,schemaValue:!1,params:{},it:e};(0,TOc.reportError)(o,EOc,void 0,t)}});
export {N7o};
