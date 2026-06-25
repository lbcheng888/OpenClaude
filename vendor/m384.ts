// @ts-nocheck
import {Q} from "../runtime.ts";
import {Km} from "./m356.ts";
var njo=Q((Xfr)=>{Object.defineProperty(Xfr,"__esModule",{value:!0});var Atn=Km(),REe=Atn.operators,Rtn={maximum:{okStr:"<=",ok:REe.LTE,fail:REe.GT},minimum:{okStr:">=",ok:REe.GTE,fail:REe.LT},exclusiveMaximum:{okStr:"<",ok:REe.LT,fail:REe.GTE},exclusiveMinimum:{okStr:">",ok:REe.GT,fail:REe.LTE}},f1c={message:({keyword:e,schemaCode:t})=>Atn.str`must be ${Rtn[e].okStr} ${t}`,params:({keyword:e,schemaCode:t})=>Atn._`{comparison: ${Rtn[e].okStr}, limit: ${t}}`},h1c={keyword:Object.keys(Rtn),type:"number",schemaType:"number",$data:!0,error:f1c,code(e){let{keyword:t,data:n,schemaCode:r}=e;e.fail$data(Atn._`${n} ${Rtn[t].fail} ${r} || isNaN(${n})`)}};Xfr.default=h1c});
export {njo};
