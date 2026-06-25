// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {setReplBridgeActive,lt} from "../src/session/0132_sent.ts";
import {FY,cx} from "../src/artifact/4323_cx.ts";
import {mergeAndFilterTools,MGt} from "../src/agent/4967_mergeAndFilterTools.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function aYn(e,t,n){let r=_t((i)=>i.replBridgeEnabled),o=_t((i)=>i.replBridgeOutboundOnly),s=_t((i)=>i.skillTools);return setReplBridgeActive(r&&!o),MPl.useMemo(()=>{let i=FY(n,t,{skillTools:s});return mergeAndFilterTools(e,i,n.mode)},[e,t,s,n,r,o])}
var MPl;
var g0o=b(()=>{lt();uo();cx();MGt();MPl=x(et(),1)});
export {aYn,MPl,g0o};
