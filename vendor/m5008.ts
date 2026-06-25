// @ts-nocheck
import {ft,b} from "../runtime.ts";
var ALl={};
ft(ALl,{call:()=>P_m});
async function P_m(e,t){return t.onQueryEvent?.({type:"open_message_selector"}),{type:"skip"}}
var O_m,RLl;
var vLl=b(()=>{O_m={description:"Restore the code and/or conversation to a previous point",name:"rewind",aliases:["checkpoint","undo"],argumentHint:"",type:"local",supportsNonInteractive:!1,load:()=>Promise.resolve().then(() => ALl)},RLl=O_m});
export {ALl,P_m,O_m,RLl,vLl};
