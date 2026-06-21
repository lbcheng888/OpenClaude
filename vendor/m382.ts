// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
var a5o=X((Cur)=>{Object.defineProperty(Cur,"__esModule",{value:!0});var GQt=initLf(),WSe=GQt.operators,VQt={maximum:{okStr:"<=",ok:WSe.LTE,fail:WSe.GT},minimum:{okStr:">=",ok:WSe.GTE,fail:WSe.LT},exclusiveMaximum:{okStr:"<",ok:WSe.LT,fail:WSe.GTE},exclusiveMinimum:{okStr:">",ok:WSe.GT,fail:WSe.LTE}},uxc={message:({keyword:e,schemaCode:t})=>GQt.str`must be ${VQt[e].okStr} ${t}`,params:({keyword:e,schemaCode:t})=>GQt._`{comparison: ${VQt[e].okStr}, limit: ${t}}`},dxc={keyword:Object.keys(VQt),type:"number",schemaType:"number",$data:!0,error:uxc,code(e){let{keyword:t,data:n,schemaCode:r}=e;e.fail$data(GQt._`${n} ${VQt[t].fail} ${r} || isNaN(${n})`)}};Cur.default=dxc});
export {a5o};
