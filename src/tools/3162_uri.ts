// @ts-nocheck
import {KQi,Vrt,oHn} from "../../vendor/m3154.ts";
import {Yrt,defineTool,F$e} from "../../vendor/m3158.ts";
import {Cn,dr} from "../../vendor/m231.ts";
import {b} from "../../runtime.ts";
import {YT,Ni,Jre,Oi} from "./0323_ttl.ts";
import {Xr} from "../../vendor/m321.ts";
import {O0,c$e,Z$,$ae} from "./3222_name.ts";
import {Pee,B0,Wrt} from "../telemetry/3153_Pee.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {bt,Fl} from "../../vendor/m195.ts";
import {Rn,wu} from "../session/0615_length.ts";
import {TMt,persistBinaryContent,getBinaryBlobSavedMessage} from "../agent/3158_persistBinaryContent.ts";
import {Xt,Le} from "../config/0228_encoding.ts";
import {rz,F5} from "../../vendor/m2590.ts";
import {o$e,Tq} from "../../vendor/m2800.ts";
import {SMt,lZi,cZi} from "../../vendor/m3159.ts";
import {mZi,uZi,dZi,pZi} from "../../vendor/m3160.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {collectFlagValueIndexes} from "../mcp/0728_serverName.ts";
import {vae} from "../../vendor/m2801.ts";
async function V$d(mcpClient: any, directoryUri: any) {
  let children: any = (await KQi(mcpClient, directoryUri)).map((item: any) => ({
      uri: Yrt(item.uri),
      name: defineTool(item.name),
      mimeType: item.mimeType !== void 0 ? defineTool(item.mimeType) : void 0
    })),
    listing: any = children.map((item: any) => `${item.name}${item.mimeType === Vrt ? "/" : ""}`).join(`
`);
  return {
    contents: [{
      uri: directoryUri,
      mimeType: Vrt,
      text: children.length > 0 ? `Directory listing for ${directoryUri} (${children.length} ${Cn(children.length, "entry", "entries")}):
${listing}` : `Directory ${directoryUri} is empty.`
    }],
    resources: children
  };
}
var j$d, W$d, G$d, Pq;
var bMt = b(() => {
  YT();
  Xr();
  O0();
  Pee();
  oHn();
  Ri();
  bt();
  Rn();
  TMt();
  F$e();
  Xt();
  dr();
  rz();
  o$e();
  SMt();
  mZi();
  j$d = we(() => E.object({
    server: E.string().describe("The MCP server name"),
    uri: E.string().describe("The resource URI to read")
  })), W$d = new Set([-32002, Ni.InvalidParams]), G$d = we(() => E.object({
    contents: E.array(E.object({
      uri: E.string().describe("Resource URI"),
      mimeType: E.string().optional().describe("MIME type of the content"),
      text: E.string().optional().describe("Text content of the resource"),
      blobSavedTo: E.string().optional().describe("Path where binary blob content was saved")
    })),
    error: E.string().optional().describe("Human-readable error when the server could not read the resource"),
    resources: E.array(E.object({
      uri: E.string().describe("Child resource URI"),
      name: E.string().describe("Child resource name"),
      mimeType: E.string().optional().describe("Child MIME type")
    })).optional().describe(`Direct children when the URI is a directory resource (SEP-2640 resources/directory/read). Subdirectories appear with mimeType "${Vrt}".`)
  })), Pq = pi({
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(inputArgs: any) {
      return `${inputArgs.server} ${inputArgs.uri}`;
    },
    shouldDefer: !0,
    name: "ReadMcpResourceTool",
    aliases: ["ReadMcpResource"],
    searchHint: "read a specific MCP resource by URI",
    maxResultSizeChars: 1e5,
    async description() {
      return lZi;
    },
    async prompt() {
      return cZi;
    },
    get inputSchema() {
      return j$d();
    },
    get outputSchema() {
      return G$d();
    },
    async call(inputArgs: any, {
      options: {
        mcpClients: clientsList
      }
    }: any) {
      let {
          server: serverName,
          uri: resourceUri
        } = inputArgs,
        normalizedName: any = collectFlagValueIndexes(serverName),
        foundClient: any = clientsList.find((client: any) => client.name === serverName) ?? clientsList.find((client: any) => collectFlagValueIndexes(client.name) === normalizedName);
      if (!foundClient) throw new Fl(`Server "${serverName}" not found. Available servers: ${clientsList.map((client: any) => client.name).join(", ")}`, "MCP server not found");
      if (foundClient.type !== "connected") throw new Fl(`Server "${foundClient.name}" is not connected`, "MCP server not connected");
      if (!foundClient.capabilities?.resources) throw new Fl(`Server "${foundClient.name}" does not support resources`, "MCP server has no resources capability");
      if (foundClient.config.pluginSource) F5(foundClient.config.pluginSource);
      let connectedClient: any = await c$e(foundClient),
        readResult: any;
      try {
        readResult = await connectedClient.client.request({
          method: "resources/read",
          params: {
            uri: resourceUri
          }
        }, Jre);
      } catch (err: any) {
        if (err instanceof Oi) {
          if (err.code === Ni.MethodNotFound) return wu(foundClient.name, "resources/read returned -32601 MethodNotFound — server advertises resources but does not implement reads"), {
            data: {
              contents: [],
              error: `Server "${foundClient.name}" advertises resource support but does not implement resource reads.`
            }
          };
          if (B0() && err.code === Ni.InvalidParams && Wrt(connectedClient.capabilities)) try {
            return {
              data: await V$d(connectedClient, resourceUri)
            };
          } catch (dirErr: any) {
            if (!(dirErr instanceof Oi) || dirErr.code !== Ni.InvalidParams) throw dirErr;
          }
          if (W$d.has(err.code)) return wu(foundClient.name, `resources/read returned ${err.code} — resource not found`), Z$.cache.delete(foundClient.name), $ae.cache.delete(foundClient.name), {
            data: {
              contents: [],
              error: `Resource not found: ${resourceUri} — it may have been deleted or the URI is stale. Re-run ${vae} to refresh.`
            }
          };
        }
        throw err;
      }
      return {
        data: {
          contents: await Promise.all(readResult.contents.map(async (contentItem: any, itemIndex: any) => {
            if ("text" in contentItem) return {
              uri: contentItem.uri,
              mimeType: contentItem.mimeType,
              text: contentItem.text
            };
            if (!("blob" in contentItem) || typeof contentItem.blob !== "string") return {
              uri: contentItem.uri,
              mimeType: contentItem.mimeType
            };
            let blobFilename: any = `mcp-resource-${Date.now()}-${itemIndex}-${Math.random().toString(36).slice(2, 8)}`,
              saveResult: any = await persistBinaryContent(Buffer.from(contentItem.blob, "base64"), contentItem.mimeType, blobFilename);
            if ("error" in saveResult) return {
              uri: contentItem.uri,
              mimeType: contentItem.mimeType,
              text: `Binary content could not be saved to disk: ${saveResult.error}`
            };
            return {
              uri: contentItem.uri,
              mimeType: contentItem.mimeType,
              blobSavedTo: saveResult.filepath,
              text: getBinaryBlobSavedMessage(saveResult.filepath, contentItem.mimeType, saveResult.size, `[Resource from ${foundClient.name} at ${contentItem.uri}] `)
            };
          }))
        }
      };
    },
    renderToolUseMessage: uZi,
    userFacingName: dZi,
    renderToolResultMessage: pZi,
    isResultTruncated(result: any, {
      columns: terminalColumns
    }: any) {
      if (result.error) return Tq(result.error, terminalColumns);
      return Tq(Le(result, null, 2), terminalColumns);
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      if (result.error) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result.error
      };
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: Le(result)
      };
    }
  });
});
export {V$d,j$d,W$d,G$d,Pq,bMt};
