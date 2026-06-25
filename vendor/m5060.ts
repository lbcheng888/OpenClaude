// @ts-nocheck
import {b} from "../runtime.ts";
import {eYn,Egt} from "../src/telemetry/4940_eYn.ts";
import {Ro,renderModelName,getMainLoopModel} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {m1l,p1l} from "../src/telemetry/5053_call.ts";
import {k1l,w1l} from "../src/tui/5060_call.ts";
var H1l,mxo;
var I1l=b(()=>{eYn();Ro();H1l={type:"local",name:"model",supportsNonInteractive:!0,description:"Set the AI model for Claude Code",argumentHint:"<model>",load:()=>Promise.resolve().then(() => (m1l(),p1l))},mxo={type:"local-jsx",name:"model",get description(){return`Set the AI model for Claude Code (currently ${renderModelName(getMainLoopModel())})`},argumentHint:"[model]",get immediate(){return Egt()},requires:{ink:!0},thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (k1l(),w1l))}});
export {H1l,mxo,I1l};
