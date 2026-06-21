// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {performSetColor,Z_o} from "./m4486.ts";
var esl={};
isFullscreenWithTTY(esl,{call:()=>Bjp});
async function Bjp(e,t){return{type:"text",value:await performSetColor(e,t)}}
var tsl=b(()=>{Z_o()});
export {esl,Bjp,tsl};
