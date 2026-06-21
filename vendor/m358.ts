// @ts-nocheck
import {X} from "../runtime.ts";
import {dSt} from "./m357.ts";
import {initLf} from "./m354.ts";
import {Tpe} from "./m356.ts";
var qjo=X((gVe)=>{Object.defineProperty(gVe,"__esModule",{value:!0});gVe.boolOrEmptySchema=gVe.topBoolOrEmptySchema=void 0;var Avc=dSt(),hvc=initLf(),gvc=Tpe(),_vc={message:"boolean schema is false"};function yvc(e){let{gen:t,schema:n,validateName:r}=e;if(n===!1)$jo(e,!1);else if(typeof n=="object"&&n.$async===!0)t.return(gvc.default.data);else t.assign(hvc._`${r}.errors`,null),t.return(!0)}gVe.topBoolOrEmptySchema=yvc;function Tvc(e,t){let{gen:n,schema:r}=e;if(r===!1)n.var(t,!1),$jo(e);else n.var(t,!0)}gVe.boolOrEmptySchema=Tvc;function $jo(e,t){let{gen:n,data:r}=e,o={gen:n,keyword:"false schema",data:r,schema:!1,schemaCode:!1,schemaValue:!1,params:{},it:e};(0,Avc.reportError)(o,_vc,void 0,t)}});
export {qjo};
