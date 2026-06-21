// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {Oc,b_} from "./m2039.ts";
var Zxl={};
isFullscreenWithTTY(Zxl,{call:()=>scm});
async function scm(){if(await Oc("https://clau.de/radio"))return{type:"text",value:"Opening Claude FM in your browser\u2026"};return{type:"text",value:"Couldn't open the browser. Listen at: https://clau.de/radio"}}
var ekl=b(()=>{b_()});
export {Zxl,scm,ekl};
