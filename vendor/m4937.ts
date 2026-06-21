// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {setReplBridgeActive,lt} from "../src/session/0131_sent.ts";
import {ZY,Y0} from "../src/artifact/4303_Y0.ts";
import {mergeAndFilterTools,h8t} from "../src/agent/4937_mergeAndFilterTools.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function yVn(e,t,n){let r=mt((i)=>i.replBridgeEnabled),o=mt((i)=>i.replBridgeOutboundOnly),s=mt((i)=>i.skillTools);return setReplBridgeActive(r&&!o),Swl.useMemo(()=>{let i=ZY(n,t,{skillTools:s});return mergeAndFilterTools(e,i,n.mode)},[e,t,s,n,r,o])}
var Swl;
var two=b(()=>{lt();configProtoStore();Y0();h8t();Swl=M(Te(),1)});
export {yVn,Swl,two};
