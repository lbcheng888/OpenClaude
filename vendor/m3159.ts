// @ts-nocheck
import {b} from "../runtime.ts";
import {oHn,Vrt} from "./m3154.ts";
var Jrt="ReadMcpResourceTool",lZi=`
Reads a specific resource from an MCP server.
- server: The name of the MCP server to read from
- uri: The URI of the resource to read

Usage examples:
- Read a resource from a server: \`readMcpResource({ server: "myserver", uri: "my-resource-uri" })\`
`,cZi;
var SMt=b(()=>{oHn();cZi=`
Reads a specific resource from an MCP server, identified by server name and resource URI.

Parameters:
- server (required): The name of the MCP server from which to read the resource
- uri (required): The URI of the resource to read

When the URI names a directory resource on a server that supports directory listing, the result carries a "resources" array listing the directory's direct children. Subdirectories appear with mimeType "${Vrt}"; read them again to descend.
`});
export {Jrt,lZi,cZi,SMt};
