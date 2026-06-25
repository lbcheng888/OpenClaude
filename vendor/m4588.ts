// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0132_sent.ts";
import {sgl,ogl} from "./m4586.ts";
import {X8t,kRo} from "./m4587.ts";
var HRo,IRo;
var igl=b(()=>{lt();HRo={name:"context",description:"Visualize current context usage as a colored grid",argumentHint:"[all]",isEnabled:()=>!getIsNonInteractiveSession(),type:"local-jsx",thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (sgl(),ogl))},IRo={type:"local",name:"context",supportsNonInteractive:!0,description:"Show current context usage",get isHidden(){return!getIsNonInteractiveSession()},isEnabled(){return getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (X8t(),kRo))}});
export {HRo,IRo,igl};
