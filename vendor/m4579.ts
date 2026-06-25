// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsNonInteractiveSession} from "../src/session/0132_sent.ts";
import {OVn,tml} from "../src/agent/4535_parseConfigShorthand.ts";
import {Mhl,Lhl} from "./m4577.ts";
import {Fhl,Nhl} from "./m4578.ts";
var PZp,CRo,Bhl;
var Uhl=b(()=>{lt();PZp={aliases:["settings"],type:"local-jsx",name:"config",description:"Open settings",argumentHint:"[key=value]",getArgumentCompletions:(e,t)=>Promise.resolve().then(() => (OVn(),tml)).then((n)=>n.getConfigArgumentCompletions(e,t)),load:()=>Promise.resolve().then(() => (Mhl(),Lhl))},CRo={type:"local",name:"config",aliases:["settings"],supportsNonInteractive:!0,description:"Set a setting by key",argumentHint:"key=value",isEnabled:()=>getIsNonInteractiveSession(),get isHidden(){return!getIsNonInteractiveSession()},load:()=>Promise.resolve().then(() => (Fhl(),Nhl))},Bhl=PZp});
export {PZp,CRo,Bhl,Uhl};
