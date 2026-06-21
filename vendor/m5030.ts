// @ts-nocheck
import {b} from "../runtime.ts";
import {pVn,cft} from "../src/telemetry/4910_pVn.ts";
import {Mo,renderModelName,getMainLoopModel} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {Vkl,Gkl} from "../src/telemetry/5023_call.ts";
import {aHl,iHl} from "../src/tui/5030_call.ts";
var lHl,nRo;
var cHl=b(()=>{pVn();Mo();lHl={type:"local",name:"model",supportsNonInteractive:!0,description:"Set the AI model for Claude Code",argumentHint:"<model>",load:()=>Promise.resolve().then(() => (Vkl(),Gkl))},nRo={type:"local-jsx",name:"model",get description(){return`Set the AI model for Claude Code (currently ${renderModelName(getMainLoopModel())})`},argumentHint:"[model]",get immediate(){return cft()},requires:{ink:!0},thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (aHl(),iHl))}});
export {lHl,nRo,cHl};
