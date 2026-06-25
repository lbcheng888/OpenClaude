// @ts-nocheck
import {JS,Jfe,ez} from "./m2239.ts";
import {setMainThreadAgentHooks,lt} from "../src/session/0132_sent.ts";
import {b} from "../runtime.ts";
function KOe(e){if(e?.hooks&&(!JS("hooks")||Jfe(e.source)))setMainThreadAgentHooks(e.hooks);else setMainThreadAgentHooks(void 0)}
var mtr=b(()=>{lt();ez()});
export {KOe,mtr};
