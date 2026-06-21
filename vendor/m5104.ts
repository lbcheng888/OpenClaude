// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {t5t,Z8t,Nft} from "./m5100.ts";
import {TPl,yPl} from "../src/telemetry/5104_call.ts";
var SPl={};
isFullscreenWithTTY(SPl,{default:()=>Ofm});
var Pfm,Ofm;
var bPl=b(()=>{t5t();Pfm={type:"local",name:"voice",description:"Toggle voice mode",argumentHint:"[hold|tap|off]",availability:["claude-ai"],isEnabled:()=>Z8t(),get isHidden(){return!Nft()},supportsNonInteractive:!1,load:()=>Promise.resolve().then(() => (TPl(),yPl))},Ofm=Pfm});
export {SPl,Pfm,Ofm,bPl};
