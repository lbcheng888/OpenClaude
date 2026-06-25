// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0132_sent.ts";
import {mxl,dxl} from "./m4915.ts";
import {Txl,yxl} from "../src/agent/4917_formatRateLimits.ts";
var qIo,WIo;
var Sxl=b(()=>{lt();qIo={type:"local-jsx",name:"usage",aliases:["cost","stats"],description:"Show session cost, plan usage, and activity stats",thinClientDispatch:"control-request",immediate:!0,requires:{ink:!0},load:()=>Promise.resolve().then(() => (mxl(),dxl))},WIo={type:"local",name:"usage",aliases:["cost","stats"],supportsNonInteractive:!0,description:"Show session cost, plan usage, and what's contributing to your limits",isEnabled:()=>getIsNonInteractiveSession(),get isHidden(){return!getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (Txl(),yxl))}});
export {qIo,WIo,Sxl};
