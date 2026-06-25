// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {initializeErrorLogSink,sVt} from "./m5091.ts";
import {initializeAnalyticsSink,Jge} from "../src/telemetry/3235_createLinkedTransportPair.ts";
var Qgt={};
ft(Qgt,{initSinks:()=>initSinks});
function initSinks(){initializeErrorLogSink(),initializeAnalyticsSink()}
var tGe=b(()=>{Jge();sVt()});
export {Qgt,initSinks,tGe};
