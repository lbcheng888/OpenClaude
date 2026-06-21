// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0131_sent.ts";
import {xll,Rll} from "./m4558.ts";
import {C6t,fTo} from "./m4559.ts";
var ATo,hTo;
var kll=b(()=>{lt();ATo={name:"context",description:"Visualize current context usage as a colored grid",argumentHint:"[all]",isEnabled:()=>!getIsNonInteractiveSession(),type:"local-jsx",thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (xll(),Rll))},hTo={type:"local",name:"context",supportsNonInteractive:!0,description:"Show current context usage",get isHidden(){return!getIsNonInteractiveSession()},isEnabled(){return getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (C6t(),fTo))}});
export {ATo,hTo,kll};
