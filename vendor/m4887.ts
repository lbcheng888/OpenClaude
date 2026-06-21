// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0131_sent.ts";
import {rCl,nCl} from "./m4885.ts";
import {cCl,lCl} from "../src/agent/4887_formatRateLimits.ts";
var vvo,wvo;
var uCl=b(()=>{lt();vvo={type:"local-jsx",name:"usage",aliases:["cost","stats"],description:"Show session cost, plan usage, and activity stats",thinClientDispatch:"control-request",immediate:!0,requires:{ink:!0},load:()=>Promise.resolve().then(() => (rCl(),nCl))},wvo={type:"local",name:"usage",aliases:["cost","stats"],supportsNonInteractive:!0,description:"Show session cost, plan usage, and what's contributing to your limits",isEnabled:()=>getIsNonInteractiveSession(),get isHidden(){return!getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (cCl(),lCl))}});
export {vvo,wvo,uCl};
