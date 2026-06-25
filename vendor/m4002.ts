// @ts-nocheck
import {getUserSpecifiedModelSetting,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {cee,mge,hHn} from "./m2741.ts";
import {b} from "../runtime.ts";
function k0p(){let e=getUserSpecifiedModelSetting();if(e==="opus"&&cee())return{alias:"opus[1m]",name:"Opus 1M",multiplier:5};else if(e==="sonnet"&&mge())return{alias:"sonnet[1m]",name:"Sonnet 1M",multiplier:5};return null}
function k6e(e){let t=k0p();if(!t)return null;switch(e){case"warning":return`/model ${t.alias}`;case"tip":return`Tip: You have access to ${t.name} with ${t.multiplier}x more context`;default:return null}}
var V9n=b(()=>{hHn();Ro()});
export {k0p,k6e,V9n};
