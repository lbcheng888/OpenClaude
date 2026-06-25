// @ts-nocheck
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {Ne} from "./m583.ts";
import {Dpl,xpl} from "../src/core/4523_call.ts";
var VYp,kVn;
var Ppl=b(()=>{Ir();VYp={type:"local",name:"compact",description:"Free up context by summarizing the conversation so far",isEnabled:()=>!Ne.DISABLE_COMPACT,supportsNonInteractive:!0,argumentHint:"<optional custom summarization instructions>",thinClientDispatch:"post-text",load:()=>Promise.resolve().then(() => (Dpl(),xpl))},kVn=VYp});
export {VYp,kVn,Ppl};
