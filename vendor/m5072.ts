// @ts-nocheck
import {b} from "../runtime.ts";
import {lo,isClaudeAISubscriber} from "../src/config/2036_withOAuthRefreshLock.ts";
import {oNl,rNl} from "../src/tui/5072_call.ts";
var UTm,sNl;
var iNl=b(()=>{lo();UTm={type:"local-jsx",name:"rate-limit-options",description:"Show options when rate limit is reached",isEnabled:()=>isClaudeAISubscriber()||!1,isHidden:!0,load:()=>Promise.resolve().then(() => (oNl(),rNl))},sNl=UTm});
export {UTm,sNl,iNl};
