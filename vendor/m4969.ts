// @ts-nocheck
import {b} from "../runtime.ts";
import {qRl,$Rl} from "./m4967.ts";
import {WRl,jRl} from "./m4968.ts";
var ulm,GRl;
var VRl=b(()=>{ulm={type:"local-jsx",name:"plugin",aliases:["plugins","marketplace"],description:"Manage Claude Code plugins",immediate:!0,load:()=>Promise.resolve().then(() => (qRl(),$Rl)),getArgumentCompletions:(e,t)=>Promise.resolve().then(() => (WRl(),jRl)).then((n)=>n.getPluginArgumentCompletions(e,t))},GRl=ulm});
export {ulm,GRl,VRl};
