// @ts-nocheck
import {b} from "../runtime.ts";
import {rd,isPolicyAllowed} from "./m2205.ts";
import {Ao,isClaudeAISubscriber} from "../src/config/2031_withOAuthRefreshLock.ts";
import {_Hl,gHl} from "./m5033.ts";
var yHl;
var THl=b(()=>{rd();Ao();yHl={type:"local-jsx",name:"remote-env",description:"Choose the default environment for cloud agents",isEnabled:()=>isClaudeAISubscriber()&&isPolicyAllowed("allow_remote_sessions"),get isHidden(){return!isClaudeAISubscriber()||!isPolicyAllowed("allow_remote_sessions")},load:()=>Promise.resolve().then(() => (_Hl(),gHl))}});
export {yHl,THl};
