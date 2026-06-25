// @ts-nocheck
import {b} from "../runtime.ts";
import {Bu,isPolicyAllowed} from "./m2213.ts";
import {lo,isClaudeAISubscriber} from "../src/config/2036_withOAuthRefreshLock.ts";
import {U1l,F1l} from "./m5063.ts";
var $1l;
var q1l=b(()=>{Bu();lo();$1l={type:"local-jsx",name:"remote-env",description:"Choose the default environment for cloud agents",isEnabled:()=>isClaudeAISubscriber()&&isPolicyAllowed("allow_remote_sessions"),get isHidden(){return!isClaudeAISubscriber()||!isPolicyAllowed("allow_remote_sessions")},load:()=>Promise.resolve().then(() => (U1l(),F1l))}});
export {$1l,q1l};
