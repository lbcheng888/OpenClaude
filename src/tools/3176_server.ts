// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qy,_i,jre,li} from "./0325_ttl.ts";
import {Qr} from "../../vendor/m323.ts";
import {ReactRuntime as Ew,vge,b$,Uae} from "./3238_name.ts";
import {VNt,q9e} from "../../vendor/m3166.ts";
import {UIn,BIn} from "../../vendor/m2809.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {vn,Vc} from "../session/0621_length.ts";
import {QNt,persistBinaryContent as K9e,getBinaryBlobSavedMessage as XNt} from "../agent/3174_persistBinaryContent.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {eW,t$} from "../../vendor/m2601.ts";
import {rHe,T1} from "../../vendor/m2813.ts";
import {G9e,Gsa,Vsa,Aj} from "../../vendor/m3168.ts";
import {fia,dia,pia,mia} from "../../vendor/m3174.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Rae} from "../../vendor/m2814.ts";
/**
 * Tool definition: `ReadMcpResourceTool` (user-facing alias `ReadMcpResource`).
 *
 * Reads a single resource from a connected MCP (Model Context Protocol) server,
 * identified by the server name and the resource URI. Issues a `resources/read`
 * JSON-RPC request to the resolved client and normalizes the returned contents:
 * inline text contents are passed through, while binary (`blob`) contents are
 * base64-decoded and written to disk, with a textual placeholder referencing the
 * saved file. Read-only and concurrency-safe.
 *
 * This module is part of the "tools" subsystem and registers a single tool
 * object (`Y4`) built via the shared tool factory `Ks`.
 *
 * NOTE: All module-level bindings (`vKd`, `wKd`, `kKd`, `Y4`, `ZNt`) and the
 * cross-module helpers referenced below (`b`, `C`, `_i`, `ve`, `Ks`, `BIn`,
 * `t$`, `vge`, `li`, `Vc`, `b$`, `Uae`, `q9e`, `Aj`, `Rae`, `jre`, `K9e`,
 * `XNt`, `Pe`, `T1`, `Gsa`, `Vsa`, `dia`, `pia`, `mia`, and the module-init
 * functions invoked at the top of `ZNt`) keep their original (minified) names
 * because they are referenced by those names elsewhere in the bundle. Only
 * function-local symbols are renamed and typed.
 */

// ---------------------------------------------------------------------------
// Imported (cross-module) helper types used below.
// These mirror the runtime shapes the helpers operate on; they do not change
// any runtime behavior (types are erased at compile time).
// ---------------------------------------------------------------------------

/** Validated input for the tool's `call` (parsed from `inputSchema`). */
interface ReadMcpResourceInput {
  /** The MCP server name to read from. */
  server: string;
  /** The resource URI to read. */
  uri: string;
}

/**
 * A single content item as returned by an MCP `resources/read` response.
 * Either carries inline `text`, an inline base64 `blob`, or neither.
 */
interface McpResourceContent {
  /** Resource URI this content belongs to. */
  uri: string;
  /** MIME type of the content, if known. */
  mimeType?: string;
  /** Inline text content, when the resource is textual. */
  text?: string;
  /** Inline base64-encoded binary content, when the resource is binary. */
  blob?: string;
}

/** A normalized content item placed into the tool's `data.contents` output. */
interface NormalizedResourceContent {
  uri: string;
  mimeType?: string;
  text?: string;
  /** Path where decoded binary blob content was saved to disk. */
  blobSavedTo?: string;
}

var vKd: () => unknown, wKd: Set<number>, kKd: () => unknown, Y4: unknown;
var ZNt = b(() => {
  Qy();
  Qr();
  Ew();
  VNt();
  UIn();
  ri();
  vn();
  QNt();
  tn();
  eW();
  rHe();
  G9e();
  fia();
  vKd = ve(() => C.object({
    server: C.string().describe("The MCP server name"),
    uri: C.string().describe("The resource URI to read")
  })), wKd = new Set([-32002, _i.InvalidParams]), kKd = ve(() => C.object({
    contents: C.array(C.object({
      uri: C.string().describe("Resource URI"),
      mimeType: C.string().optional().describe("MIME type of the content"),
      text: C.string().optional().describe("Text content of the resource"),
      blobSavedTo: C.string().optional().describe("Path where binary blob content was saved")
    })),
    error: C.string().optional().describe("Human-readable error when the server could not read the resource")
  })), Y4 = Ks({
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(input: ReadMcpResourceInput) {
      return `${input.server} ${input.uri}`;
    },
    shouldDefer: !0,
    name: "ReadMcpResourceTool",
    aliases: ["ReadMcpResource"],
    searchHint: "read a specific MCP resource by URI",
    maxResultSizeChars: 1e5,
    async description() {
      return Gsa;
    },
    async prompt() {
      return Vsa;
    },
    get inputSchema() {
      return vKd();
    },
    get outputSchema() {
      return kKd();
    },
    async call(input: ReadMcpResourceInput, {
      options: {
        mcpClients: clients
      }
    }) {
      let {
          server: serverName,
          uri: resourceUri
        } = input,
        client = BIn(clients, serverName);
      if (client.config.pluginSource) t$(client.config.pluginSource);
      let connected = await vge(client),
        readResult;
      try {
        readResult = await connected.client.request({
          method: "resources/read",
          params: {
            uri: resourceUri
          }
        }, jre);
      } catch (err) {
        if (err instanceof li) {
          if (err.code === _i.MethodNotFound) return Vc(client.name, "resources/read returned -32601 MethodNotFound \u2014 server advertises resources but does not implement reads"), {
            data: {
              contents: [],
              error: `Server "${client.name}" advertises resource support but does not implement resource reads.`
            }
          };
          if (wKd.has(err.code)) {
            Vc(client.name, `resources/read returned ${err.code} \u2014 resource not found`), b$.cache.delete(client.name), Uae.cache.delete(client.name);
            let dirHint = q9e(connected.capabilities) ? ` If the URI is a directory resource, use ${Aj} instead.` : "";
            return {
              data: {
                contents: [],
                error: `Resource not found: ${resourceUri} \u2014 it may have been deleted or the URI is stale. Re-run ${Rae} to refresh.${dirHint}`
              }
            };
          }
        }
        throw err;
      }
      return {
        data: {
          contents: await Promise.all(readResult.contents.map(async (content: McpResourceContent, index: number): Promise<NormalizedResourceContent> => {
            if ("text" in content) return {
              uri: content.uri,
              mimeType: content.mimeType,
              text: content.text
            };
            if (!("blob" in content) || typeof content.blob !== "string") return {
              uri: content.uri,
              mimeType: content.mimeType
            };
            let blobFilename = `mcp-resource-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
              savedBlob = await K9e(Buffer.from(content.blob, "base64"), content.mimeType, blobFilename);
            if ("error" in savedBlob) return {
              uri: content.uri,
              mimeType: content.mimeType,
              text: `Binary content could not be saved to disk: ${savedBlob.error}`
            };
            return {
              uri: content.uri,
              mimeType: content.mimeType,
              blobSavedTo: savedBlob.filepath,
              text: XNt(savedBlob.filepath, content.mimeType, savedBlob.size, `[Resource from ${client.name} at ${content.uri}] `)
            };
          }))
        }
      };
    },
    renderToolUseMessage: dia,
    userFacingName: pia,
    renderToolResultMessage: mia,
    isResultTruncated(result: { error?: string }, {
      columns: columns
    }: { columns: number }) {
      if (result.error) return T1(result.error, columns);
      return T1(Pe(result, null, 2), columns);
    },
    mapToolResultToToolResultBlockParam(result: { error?: string }, toolUseId: string) {
      if (result.error) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result.error
      };
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: Pe(result)
      };
    }
  });
});

export {vKd,wKd,kKd,Y4,ZNt};
