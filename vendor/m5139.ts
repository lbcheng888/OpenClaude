// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession,getIsRemoteMode} from "../src/session/0132_sent.ts";
import {o2l,n2l} from "./m5137.ts";
import {i2l,s2l} from "./m5138.ts";
var a2l={};
ft(a2l,{goalNonInteractive:()=>goalNonInteractive,default:()=>tAm});
var ZCm,goalNonInteractive,tAm;
var l2l=b(()=>{lt();ZCm={type:"local-jsx",name:"goal",description:"Set a goal Claude checks before stopping",argumentHint:"[<condition> | clear]",immediate:!0,load:()=>Promise.resolve().then(() => (o2l(),n2l))},goalNonInteractive={type:"local",name:"goal",supportsNonInteractive:!0,thinClientDispatch:"post-text",description:"Set a goal \u2014 keep working until the condition is met",get isHidden(){return!getIsNonInteractiveSession()},isEnabled:()=>getIsNonInteractiveSession()||getIsRemoteMode(),load:()=>Promise.resolve().then(() => (i2l(),s2l))},tAm=ZCm});
export {a2l,ZCm,goalNonInteractive,tAm,l2l};
