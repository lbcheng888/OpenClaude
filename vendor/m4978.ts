// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
var oxl={};
isFullscreenWithTTY(oxl,{call:()=>Slm});
async function Slm(e,t){return t.onQueryEvent?.({type:"open_message_selector"}),{type:"skip"}}
var blm,sxl;
var ixl=b(()=>{blm={description:"Restore the code and/or conversation to a previous point",name:"rewind",aliases:["checkpoint","undo"],argumentHint:"",type:"local",supportsNonInteractive:!1,load:()=>Promise.resolve().then(() => oxl)},sxl=blm});
export {oxl,Slm,blm,sxl,ixl};
