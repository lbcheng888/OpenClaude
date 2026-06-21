// @ts-nocheck
import {iS,Ufe,RK} from "./m2231.ts";
import {setMainThreadAgentHooks,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function KPe(e){if(e?.hooks&&(!iS("hooks")||Ufe(e.source)))setMainThreadAgentHooks(e.hooks);else setMainThreadAgentHooks(void 0)}
var pXn=b(()=>{lt();RK()});
export {KPe,pXn};
