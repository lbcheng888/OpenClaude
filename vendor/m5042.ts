// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Ws,vd} from "../src/session/1465_promise.ts";
import {gracefulShutdown,isAmberSentinelEnabled} from "../src/config/3348_flushAnalyticsSinks.ts";
var VMl={};
ft(VMl,{call:()=>Vym});
async function Vym(){if(Ws())return{type:"text",value:"Session keeps running. Use /stop to end it."};return await gracefulShutdown(0,"prompt_input_exit"),{type:"skip"}}
var KMl=b(()=>{vd();isAmberSentinelEnabled()});
export {VMl,Vym,KMl};
