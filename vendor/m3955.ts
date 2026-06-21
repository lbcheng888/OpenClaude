// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {i$t,Gio} from "./m3953.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {Kio,Vio} from "./m3954.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
var Yio={};
isFullscreenWithTTY(Yio,{callNonInteractive:()=>callNonInteractive,call:()=>vbp});
var zio,RUn="/extra-usage is now /usage-credits",vbp=async(e,t)=>{let{call:n}=await Promise.resolve().then(() => (i$t(),Gio)),o=await n((s,i)=>e(s?`${RUn}

${s}`:RUn,i),t);if(o==null)return o;return zio.default.createElement(Box,{flexDirection:"column"},zio.default.createElement(Text,{dimColor:!0},RUn),o)},callNonInteractive=async()=>{let{call:e}=await Promise.resolve().then(() => (Kio(),Vio)),t=await e();return{type:"text",value:`${RUn}

${t.value}`}};
var Jio=b(()=>{ze();zio=M(Te(),1)});
export {Yio,zio,RUn,vbp,callNonInteractive,Jio};
