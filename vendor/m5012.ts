// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {_i,hp} from "../src/session/1460_promise.ts";
import {gracefulShutdown,ym} from "../src/config/3332_flushAnalyticsSinks.ts";
var Ckl={};
isFullscreenWithTTY(Ckl,{call:()=>Pcm});
async function Pcm(){if(_i())return{type:"text",value:"Session keeps running. Use /stop to end it."};return await gracefulShutdown(0,"prompt_input_exit"),{type:"skip"}}
var vkl=b(()=>{hp();ym()});
export {Ckl,Pcm,vkl};
