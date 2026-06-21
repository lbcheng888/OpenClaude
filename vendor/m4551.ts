// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0131_sent.ts";
import {h8n,mil} from "../src/agent/4515_parseConfigShorthand.ts";
import {sll,oll} from "./m4549.ts";
import {all,ill} from "./m4550.ts";
var kGp,uTo,lll;
var cll=b(()=>{lt();kGp={aliases:["settings"],type:"local-jsx",name:"config",description:"Open settings",argumentHint:"[key=value]",getArgumentCompletions:(e,t)=>Promise.resolve().then(() => (h8n(),mil)).then((n)=>n.getConfigArgumentCompletions(e,t)),load:()=>Promise.resolve().then(() => (sll(),oll))},uTo={type:"local",name:"config",aliases:["settings"],supportsNonInteractive:!0,description:"Set a setting by key",argumentHint:"key=value",isEnabled:()=>getIsNonInteractiveSession(),get isHidden(){return!getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (all(),ill))},lll=kGp});
export {kGp,uTo,lll,cll};
