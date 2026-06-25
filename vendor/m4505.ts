// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {clearConversation,TVn} from "../src/artifact/4505_clearConversation.ts";
var Mdl={};
ft(Mdl,{call:()=>gYp});
var gYp=async(e,t)=>{let n=e.trim()||void 0;for await(let r of clearConversation({...t,clearedSessionTitle:n}))t.onQueryEvent?.(r);return{type:"text",value:""}};
var Ndl=b(()=>{TVn()});
export {Mdl,gYp,Ndl};
