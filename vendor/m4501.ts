// @ts-nocheck
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {je} from "./m577.ts";
import {jsl,qsl} from "../src/core/4501_call.ts";
var l8p,c8n;
var Wsl=b(()=>{Lr();l8p={type:"local",name:"compact",description:"Free up context by summarizing the conversation so far",isEnabled:()=>!je.DISABLE_COMPACT,supportsNonInteractive:!0,argumentHint:"<optional custom summarization instructions>",thinClientDispatch:"post-text",load:()=>Promise.resolve().then(() => (jsl(),qsl))},c8n=l8p});
export {l8p,c8n,Wsl};
