// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {O0 as WL,c$e as PbH,Z$ as Vx} from "./3222_name.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {bt as L_,Fl as PO,Se as GH} from "../../vendor/m195.ts";
import {Rn as S6,wu as q3} from "../session/0615_length.ts";
import {Xt as H6,Le as bH} from "../config/0228_encoding.ts";
import {o$e as jbH,Tq as pp} from "../../vendor/m2800.ts";
import {e3i as Jv7,Q9i as fv7,Z9i as jv7} from "../../vendor/m2804.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {vae as h7H,U9i as ey7,$9i as Hv7} from "../../vendor/m2801.ts";
import {collectFlagValueIndexes as O1} from "../mcp/0728_serverName.ts";
/**
 * Tool definition: `ListMcpResources` (user-facing name `listMcpResources`).
 *
 * Lists the resources exposed by connected MCP (Model Context Protocol) servers.
 * Optionally filters to a single server by name (matching either the exact
 * server name or its normalized form). Read-only and concurrency-safe.
 *
 * This module is part of the "tools" subsystem and registers a single tool
 * object (`Up`) built via the shared tool factory `c9`.
 *
 * NOTE: The module-level export symbols (`Up`, `Uh_`, `$j3`, `Yj3`) and the
 * imported cross-module helpers (`c9`, `kH`, `k`, `O1`, `PbH`, `Vx`, `PO`,
 * `q3`, `GH`, `bH`, `pp`, `h7H`, `ey7`, `Hv7`, `fv7`, `jv7`) are referenced by
 * their original (minified) names elsewhere in the bundle and are therefore
 * preserved verbatim. Only function-local symbols are renamed and typed.
 */

// ---------------------------------------------------------------------------
// Imported (cross-module) helper types used below.
// These mirror the runtime shapes the helpers operate on; they do not change
// any runtime behavior (types are erased at compile time).
// ---------------------------------------------------------------------------

/** A single MCP resource as returned by `Vx` (resources/list), tagged with its server. */
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

var $j3: () => unknown, Yj3: () => unknown, Up: unknown;
var Uh_ = L(() => {
  a8();
  WL();
  M7();
  L_();
  S6();
  H6();
  jbH();
  Jv7();
  $j3 = kH(() => k.object({
    server: k.string().optional().describe("Optional server name to filter resources by")
  })), Yj3 = kH(() => k.array(k.object({
    uri: k.string().describe("Resource URI"),
    name: k.string().describe("Resource name"),
    mimeType: k.string().optional().describe("MIME type of the resource"),
    description: k.string().optional().describe("Resource description"),
    server: k.string().describe("Server that provides this resource")
  }))), Up = c9({
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
    name: h7H,
    aliases: ["ListMcpResources"],
    searchHint: "list resources from connected MCP servers",
    maxResultSizeChars: 1e5,
    async description() {
      return ey7;
    },
    async prompt() {
      return Hv7;
    },
    get inputSchema() {
      return $j3();
    },
    get outputSchema() {
      return Yj3();
    },
    async call(input: ListMcpResourcesInput, {
      options: {
        mcpClients: clients
      }
    }: { options: { mcpClients: McpClient[] } }) {
      let {
          server: serverFilter
        } = input,
        // Resolve which clients to query: if a filter is given, match by exact
        // name first, otherwise fall back to normalized-name matches; with no
        // filter, query every client.
        matchedClients = serverFilter ? ((name: string) => {
          let exactMatch = clients.find(client => client.name === name);
          if (exactMatch) return [exactMatch];
          let normalizedName = O1(name);
          return clients.filter(client => O1(client.name) === normalizedName);
        })(serverFilter) : clients;
      if (serverFilter && matchedClients.length === 0) throw new PO(`Server "${serverFilter}" not found. Available servers: ${clients.map(client => client.name).join(", ")}`, "MCP server not found");
      return {
        data: (await Promise.all(matchedClients.map(async client => {
          if (client.type !== "connected") return [];
          try {
            let connectedClient = await PbH(client);
            return await Vx(connectedClient);
          } catch (error) {
            return q3(client.name, GH(error)), [];
          }
        }))).flat()
      };
    },
    renderToolUseMessage: fv7,
    userFacingName: () => "listMcpResources",
    renderToolResultMessage: jv7,
    isResultTruncated(result: McpResource[], {
      columns: columns
    }: { columns: number }) {
      return pp(bH(result, null, 2), columns);
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
        content: bH(result)
      };
    }
  });
});

export {$j3 as oHd,Yj3 as sHd,Up as bq,Uh_ as uLt};
