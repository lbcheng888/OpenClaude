// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession,getIsRemoteMode} from "../src/session/0131_sent.ts";
import {kPl,xPl} from "./m5107.ts";
import {IPl,HPl} from "./m5108.ts";
var DPl={};
isFullscreenWithTTY(DPl,{goalNonInteractive:()=>goalNonInteractive,default:()=>Wfm});
var qfm,goalNonInteractive,Wfm;
var PPl=b(()=>{lt();qfm={type:"local-jsx",name:"goal",description:"Set a goal Claude checks before stopping",argumentHint:"[<condition> | clear]",immediate:!0,load:()=>Promise.resolve().then(() => (kPl(),xPl))},goalNonInteractive={type:"local",name:"goal",supportsNonInteractive:!0,thinClientDispatch:"post-text",description:"Set a goal \u2014 keep working until the condition is met",get isHidden(){return!getIsNonInteractiveSession()},isEnabled:()=>getIsNonInteractiveSession()||getIsRemoteMode(),load:()=>Promise.resolve().then(() => (IPl(),HPl))},Wfm=qfm});
export {DPl,qfm,goalNonInteractive,Wfm,PPl};
