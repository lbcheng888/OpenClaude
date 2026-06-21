// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {initializeErrorLogSink,M8t} from "./m5061.ts";
import {initializeAnalyticsSink,Bhe} from "../src/telemetry/3219_createLinkedTransportPair.ts";
var Lft={};
isFullscreenWithTTY(Lft,{initSinks:()=>initSinks});
function initSinks(){initializeErrorLogSink(),initializeAnalyticsSink()}
var m8e=b(()=>{Bhe();M8t()});
export {Lft,initSinks,m8e};
