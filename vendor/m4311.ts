// @ts-nocheck
import {Mc,configProtoStore} from "./m2458.ts";
import {LP,MY} from "../src/agent/4311_register.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function mcpTools(){let e=Mc();return QKa.useMemo(()=>LP(()=>e.getState(),e.setState),[e])}
var QKa;
var sJ=b(()=>{MY();configProtoStore();QKa=M(Te(),1)});
export {mcpTools,QKa,sJ};
