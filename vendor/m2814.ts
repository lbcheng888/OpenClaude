// @ts-nocheck
import {lw,a4} from "./m2436.ts";
import {cc} from "./m2459.ts";
import {JCi,hve} from "./m2271.ts";
import {bt,Gc} from "./m588.ts";
import {b} from "../runtime.ts";
var Rae="ListMcpResourcesTool",DWi=`
Lists available resources from configured MCP servers.
Each resource object includes a 'server' field indicating which server it's from.

Usage examples:
- List all resources from all servers: \`listMcpResources\`
- List resources from a specific server: \`listMcpResources({ server: "myserver" })\`
`,PWi=`
List available resources from configured MCP servers.
Each returned resource will include all standard MCP resource fields plus a 'server' field 
indicating which server the resource belongs to.

Parameters:
- server (optional): The name of a specific MCP server to get resources from. If not provided,
  resources from all servers will be returned.
`;
function LD(e,t,n){if(!(n?.supportsHyperlinks??lw())){if(t!==void 0){let c=cc(t);if(c!==e&&e!==`http://${c}`&&e!==`https://${c}`)return`${t} (${e})`}return e}let l=(((n?.themeName)?JCi(n.themeName):!1)?bt.blue:bt.blueBright)(t??e);return`${OWi}${e}${LWi}${l}${OWi}${LWi}`}
var OWi="\x1B]8;;",LWi="\x07";
var oHe=b(()=>{Gc();a4();hve()});
export {Rae,DWi,PWi,LD,OWi,LWi,oHe};
