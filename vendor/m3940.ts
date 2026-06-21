// @ts-nocheck
import {getUserSpecifiedModelSetting,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {dee,nhe,Iwn} from "./m2730.ts";
import {b} from "../runtime.ts";
function MSp(){let e=getUserSpecifiedModelSetting();if(e==="opus"&&dee())return{alias:"opus[1m]",name:"Opus 1M",multiplier:5};else if(e==="sonnet"&&nhe())return{alias:"sonnet[1m]",name:"Sonnet 1M",multiplier:5};return null}
function Z4e(e){let t=MSp();if(!t)return null;switch(e){case"warning":return`/model ${t.alias}`;case"tip":return`Tip: You have access to ${t.name} with ${t.multiplier}x more context`;default:return null}}
var gUn=b(()=>{Iwn();Mo()});
export {MSp,Z4e,gUn};
