// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {clearConversation,Qjn} from "../src/artifact/4483_clearConversation.ts";
var Yol={};
isFullscreenWithTTY(Yol,{call:()=>Pjp});
var Pjp=async(e,t)=>{let n=e.trim()||void 0;for await(let r of clearConversation({...t,clearedSessionTitle:n}))t.onQueryEvent?.(r);return{type:"text",value:""}};
var Jol=b(()=>{Qjn()});
export {Yol,Pjp,Jol};
