// @ts-nocheck
import {b} from "../runtime.ts";
import {WS,v3,$l} from "../src/api/1453_month.ts";
import {eYn,Egt} from "../src/telemetry/4940_eYn.ts";
import {s0o,ADl} from "../src/tui/4943_call.ts";
import {vDl,RDl} from "./m4943.ts";
var $hm,wDl,i0o;
var kDl=b(()=>{WS();eYn();$hm={type:"local-jsx",name:"fast",get description(){return`Toggle fast mode (${v3()})`},get isHidden(){return!$l()},argumentHint:"[on|off]",get immediate(){return Egt()},requires:{ink:!0},thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (s0o(),ADl))},wDl={type:"local",name:"fast",supportsNonInteractive:!0,get description(){return`Toggle fast mode (${v3()})`},argumentHint:"[on|off]",load:()=>Promise.resolve().then(() => (vDl(),RDl))},i0o=$hm});
export {$hm,wDl,i0o,kDl};
