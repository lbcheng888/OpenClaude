// @ts-nocheck
import {b} from "../runtime.ts";
import {tE,l4,uc} from "../src/api/1448_month.ts";
import {pVn,cft} from "../src/telemetry/4910_pVn.ts";
import {qvo,pvl} from "../src/tui/4913_call.ts";
import {fvl,mvl} from "./m4913.ts";
var kim,Avl,jvo;
var hvl=b(()=>{tE();pVn();kim={type:"local-jsx",name:"fast",get description(){return`Toggle fast mode (${l4()})`},get isHidden(){return!uc()},argumentHint:"[on|off]",get immediate(){return cft()},requires:{ink:!0},thinClientDispatch:"control-request",load:()=>Promise.resolve().then(() => (qvo(),pvl))},Avl={type:"local",name:"fast",supportsNonInteractive:!0,get description(){return`Toggle fast mode (${l4()})`},argumentHint:"[on|off]",load:()=>Promise.resolve().then(() => (fvl(),mvl))},jvo=kim});
export {kim,Avl,jvo,hvl};
