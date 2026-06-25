// @ts-nocheck
import {b} from "../runtime.ts";
import {NSl,MSl} from "../src/telemetry/4680_call.ts";
import {GEl,WEl} from "./m4726.ts";
var VEl,dim,KEl;
var zEl=b(()=>{VEl={type:"local",name:"mcp",supportsNonInteractive:!0,description:"Manage MCP servers",argumentHint:"[reconnect|enable|disable [<server>|all]]",load:()=>Promise.resolve().then(() => (NSl(),MSl))},dim={type:"local-jsx",name:"mcp",description:"Manage MCP servers",immediate:!0,argumentHint:"[reconnect <server>|enable|disable [<server>|all]]",load:()=>Promise.resolve().then(() => (GEl(),WEl))},KEl=dim});
export {VEl,dim,KEl,zEl};
