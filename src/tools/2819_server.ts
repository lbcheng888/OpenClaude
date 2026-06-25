// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {ReactRuntime as Ew,vge,b$} from "./3238_name.ts";
import {UIn,cjr} from "../../vendor/m2809.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {Ct,Ta,Ce} from "../../vendor/m197.ts";
import {vn,Vc} from "../session/0621_length.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {rHe,T1} from "../../vendor/m2813.ts";
import {jWi,KWi,zWi} from "../../vendor/m2817.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Rae,DWi,PWi} from "../../vendor/m2814.ts";
// @ts-nocheck
/**
 * Tool definition: `ListMcpResources` (user-facing name `listMcpResources`).
 *
 * Lists the resources exposed by connected MCP (Model Context Protocol) servers.
 * Optionally filters to a single server by name (matching either the exact
 * server name or its normalized form, handled by the cross-module helper
 * `cjr`). Read-only and concurrency-safe.
 *
 * This module is part of the "tools" subsystem and registers a single tool
 * object (`N4`) built via the shared tool factory `Ks`.
 *
 * NOTE: The module-level symbols (`GFd`, `VFd`, `N4`, `F1t`) and the imported
 * cross-module helpers (`Ks`, `ve`, `C`, `cjr`, `vge`, `b$`, `Vc`, `Ce`, `Ta`,
 * `Pe`, `T1`, `Rae`, `DWi`, `PWi`, `KWi`, `zWi`) are referenced by their
 * original (minified) names elsewhere in the bundle and are therefore preserved
 * verbatim. Only function-local symbols are renamed and typed.
 */

// ---------------------------------------------------------------------------
// Imported (cross-module) helper types used below.
// These mirror the runtime shapes the helpers operate on; they do not change
// any runtime behavior (types are erased at compile time).
// ---------------------------------------------------------------------------

/** A single MCP resource as returned by `b$` (resources/list), tagged with its server. */
interface McpResource {
  /** Resource URI. */
  uri: string;
  /** Human-readable resource name. */
  name: string;
  /** MIME type of the resource, if known. */
  mimeType?: string;
  /** Resource description, if provided. */
  description?: string;
  /** Name of the MCP server that provides this resource. */
  server: string;
}

/** Minimal shape of an MCP client/server entry from `options.mcpClients`. */
interface McpClient {
  /** Configured server name. */
  name: string;
  /** Connection state; only `"connected"` clients can be queried. */
  type: string;
  [key: string]: unknown;
}

/** Validated input for the tool's `call` (parsed from `inputSchema`). */
interface ListMcpResourcesInput {
  /** Optional server name to filter resources by. */
  server?: string;
}

/** A `tool_result` content block param produced for the model. */
interface ToolResultBlockParam {
  tool_use_id: string;
  type: "tool_result";
  content: string;
}

var GFd: () => unknown, VFd: () => unknown, N4: unknown;
var F1t = b(() => {
  Qr();
  Ew();
  UIn();
  ri();
  Ct();
  vn();
  tn();
  rHe();
  jWi();
  GFd = ve(() => C.object({
    server: C.string().optional().describe("Optional server name to filter resources by")
  })), VFd = ve(() => C.array(C.object({
    uri: C.string().describe("Resource URI"),
    name: C.string().describe("Resource name"),
    mimeType: C.string().optional().describe("MIME type of the resource"),
    description: C.string().optional().describe("Resource description"),
    server: C.string().describe("Server that provides this resource")
  }))), N4 = Ks({
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(input: ListMcpResourcesInput) {
      return input.server ?? "";
    },
    shouldDefer: !0,
    name: Rae,
    aliases: ["ListMcpResources"],
    searchHint: "list resources from connected MCP servers",
    maxResultSizeChars: 1e5,
    async description() {
      return DWi;
    },
    async prompt() {
      return PWi;
    },
    get inputSchema() {
      return GFd();
    },
    get outputSchema() {
      return VFd();
    },
    async call(input: ListMcpResourcesInput, {
      options: {
        mcpClients: clients
      }
    }: { options: { mcpClients: McpClient[] } }) {
      let {
          server: serverFilter
        } = input,
        // Resolve which clients to query: with a filter, `cjr` matches by exact
        // name first then by normalized name; with no filter, query every client.
        matchedClients = serverFilter ? cjr(clients, serverFilter) : clients;
      if (serverFilter && matchedClients.length === 0) throw new Ta(`Server "${serverFilter}" not found. Available servers: ${clients.map(client => client.name).join(", ")}`, "MCP server not found");
      return {
        data: (await Promise.all(matchedClients.map(async client => {
          if (client.type !== "connected") return [];
          try {
            let connectedClient = await vge(client);
            return await b$(connectedClient);
          } catch (error) {
            return Vc(client.name, Ce(error)), [];
          }
        }))).flat()
      };
    },
    renderToolUseMessage: KWi,
    userFacingName: () => "listMcpResources",
    renderToolResultMessage: zWi,
    isResultTruncated(result: McpResource[], {
      columns: columns
    }: { columns: number }) {
      return T1(Pe(result, null, 2), columns);
    },
    mapToolResultToToolResultBlockParam(result: McpResource[] | null | undefined, toolUseId: string): ToolResultBlockParam {
      if (!result || result.length === 0) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: "No resources found. MCP servers may still provide tools even if they have no resources."
      };
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: Pe(result)
      };
    }
  });
});

export {GFd,VFd,N4,F1t};
