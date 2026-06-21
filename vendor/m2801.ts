// @ts-nocheck
import {JR,U4} from "./m2426.ts";
import {Ec} from "./m2449.ts";
import {Ygi,Ive} from "./m2262.ts";
import {_t,cu} from "./m582.ts";
import {b} from "../runtime.ts";
var vae="ListMcpResourcesTool",U9i=`
Lists available resources from configured MCP servers.
Each resource object includes a 'server' field indicating which server it's from.

Usage examples:
- List all resources from all servers: \`listMcpResources\`
- List resources from a specific server: \`listMcpResources({ server: "myserver" })\`
`,$9i=`
List available resources from configured MCP servers.
Each returned resource will include all standard MCP resource fields plus a 'server' field 
indicating which server the resource belongs to.

Parameters:
- server (optional): The name of a specific MCP server to get resources from. If not provided,
  resources from all servers will be returned.
`;
function MF(e,t,n){if(!(n?.supportsHyperlinks??JR())){if(t!==void 0){let c=Ec(t);if(c!==e&&e!==`http://${c}`&&e!==`https://${c}`)return`${t} (${e})`}return e}let l=(((n?.themeName)?Ygi(n.themeName):!1)?_t.blue:_t.blueBright)(t??e);return`${q9i}${e}${j9i}${l}${q9i}${j9i}`}
var q9i="\x1B]8;;",j9i="\x07";
var s$e=b(()=>{cu();U4();Ive()});
export {vae,U9i,$9i,MF,q9i,j9i,s$e};
