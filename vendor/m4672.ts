// @ts-nocheck
import {b} from "../runtime.ts";
import {pSl,dSl} from "../src/telemetry/4672_call.ts";
var vrm,mSl;
var fSl=b(()=>{vrm={type:"local",name:"install-slack-app",description:"Install the Claude Slack app",availability:["claude-ai"],supportsNonInteractive:!1,load:()=>Promise.resolve().then(() => (pSl(),dSl))},mSl=vrm});
export {vrm,mSl,fSl};
