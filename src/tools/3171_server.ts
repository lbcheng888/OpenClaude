// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qy,li,_i} from "./0325_ttl.ts";
import {Qr} from "../../vendor/m323.ts";
import {ReactRuntime as Ew,vge} from "./3238_name.ts";
import {VNt,GNt,q9e,Wsa} from "../../vendor/m3166.ts";
import {kee,mcpTools as eH} from "../telemetry/3165_kee.ts";
import {UIn,BIn} from "../../vendor/m2809.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {vn,Vc} from "../session/0621_length.ts";
import {W9e,Kst,O$} from "../../vendor/m3167.ts";
import {tn,TeamDeleteToolName as Pe} from "../config/0230_encoding.ts";
import {lr,Sn} from "../../vendor/m233.ts";
import {eW,t$} from "../../vendor/m2601.ts";
import {rHe,T1} from "../../vendor/m2813.ts";
import {G9e,Aj,Ksa,zsa,Nae} from "../../vendor/m3168.ts";
import {Xsa,jsa,Ysa,Jsa} from "../../vendor/m3169.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
// @ts-nocheck
/**
 * Tool definition: `ReadMcpResourceDir` (alias `ReadMcpResourceDir`).
 *
 * Lists the direct children of a directory resource exposed by a connected MCP
 * (Model Context Protocol) server. Given a `{ server, uri }` pair it resolves the
 * client, verifies the server advertises directory-listing capability, then issues
 * a `resources/directory/read` request and maps the returned children into the
 * tool's output schema. Read-only and concurrency-safe.
 *
 * This module is part of the "tools" subsystem and registers a single tool object
 * (`Hee`) built via the shared tool factory `Ks`.
 *
 * NOTE: The module-level symbols (`cKd`, `uKd`, `Hee`, `zNt`) and every imported
 * cross-module helper (`b`, `ve`, `Ks`, `C`, `Aj`, `Ksa`, `zsa`, `BIn`, `eH`,
 * `q9e`, `t$`, `vge`, `Wsa`, `li`, `_i`, `Vc`, `Nae`, `Kst`, `O$`, `jsa`, `Ysa`,
 * `Jsa`, `T1`, `Pe`, `GNt`, `Sn`, and the side-effect initializers `Qy`, `Qr`,
 * `Ew`, `VNt`, `kee`, `UIn`, `ri`, `vn`, `W9e`, `tn`, `lr`, `eW`, `rHe`, `G9e`,
 * `Xsa`) are referenced by their original (minified) names elsewhere in the
 * bundle and are therefore preserved verbatim. Only function-local symbols are
 * renamed and typed.
 */

// ---------------------------------------------------------------------------
// Imported (cross-module) helper types used below. These mirror the runtime
// shapes the helpers operate on; they do not change any runtime behavior
// (TS types are erased at compile time).
// ---------------------------------------------------------------------------

/** Validated input for the tool's `call` (parsed from `inputSchema`). */
interface ReadMcpResourceDirInput {
  /** The MCP server name. */
  server: string;
  /** The directory resource URI to list. */
  uri: string;
}

/** A single child resource entry returned by `resources/directory/read`. */
interface DirectoryChild {
  /** Child resource URI. */
  uri: string;
  /** Child resource name. */
  name: string;
  /** Child MIME type, if known (subdirectories use the `GNt` directory MIME type). */
  mimeType?: string;
}

/** Mapped tool output: the directory's direct children, or an error message. */
interface ReadMcpResourceDirOutput {
  /** Direct children of the directory resource. */
  resources: DirectoryChild[];
  /** Human-readable error when the server could not list the directory. */
  error?: string;
}

/** Minimal shape of a resolved MCP client/server entry from `options.mcpClients`. */
interface McpClient {
  /** Configured server name. */
  name: string;
  /** Advertised server capabilities (probed by `q9e`). */
  capabilities: unknown;
  /** Server configuration, including an optional plugin source. */
  config: { pluginSource?: unknown };
  [key: string]: unknown;
}

/** A `tool_result` content block param produced for the model. */
interface ToolResultBlockParam {
  tool_use_id: string;
  type: "tool_result";
  content: string;
}

var cKd: () => unknown, uKd: () => unknown, Hee: unknown;
var zNt = b(() => {
  Qy();
  Qr();
  Ew();
  VNt();
  kee();
  UIn();
  ri();
  vn();
  W9e();
  tn();
  lr();
  eW();
  rHe();
  G9e();
  Xsa();
  cKd = ve(() => C.object({
    server: C.string().describe("The MCP server name"),
    uri: C.string().describe("The directory resource URI to list")
  })), uKd = ve(() => C.object({
    resources: C.array(C.object({
      uri: C.string().describe("Child resource URI"),
      name: C.string().describe("Child resource name"),
      mimeType: C.string().optional().describe("Child MIME type")
    })).describe(`Direct children of the directory resource. Subdirectories appear with mimeType "${GNt}".`),
    error: C.string().optional().describe("Human-readable error when the server could not list the directory")
  })), Hee = Ks({
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(input: ReadMcpResourceDirInput) {
      return `${input.server} ${input.uri}`;
    },
    shouldDefer: !0,
    name: Aj,
    aliases: ["ReadMcpResourceDir"],
    searchHint: "list the children of an MCP directory resource",
    maxResultSizeChars: 1e5,
    async description() {
      return Ksa;
    },
    async prompt() {
      return zsa;
    },
    get inputSchema() {
      return cKd();
    },
    get outputSchema() {
      return uKd();
    },
    async call(input: ReadMcpResourceDirInput, {
      options: {
        mcpClients: clients
      }
    }: { options: { mcpClients: McpClient[] } }) {
      let {
          server: serverName,
          uri: resourceUri
        } = input,
        // Resolve the target client by server name from the connected MCP clients.
        client = BIn(clients, serverName);
      if (!eH()) return {
        data: {
          resources: [],
          error: "Directory listing is not enabled in this build."
        }
      };
      if (!q9e(client.capabilities)) return {
        data: {
          resources: [],
          error: `Server "${client.name}" does not support directory listing.`
        }
      };
      if (client.config.pluginSource) t$(client.config.pluginSource);
      let connectedClient = await vge(client),
        children: DirectoryChild[];
      try {
        children = await Wsa(connectedClient, resourceUri);
      } catch (err) {
        if (err instanceof li && err.code === _i.InvalidParams) return Vc(client.name, `resources/directory/read returned ${err.code} — not a directory`), {
          data: {
            resources: [],
            error: `Not a directory resource: ${resourceUri}. If it is a file resource, use ${Nae} instead.`
          }
        };
        throw err;
      }
      return {
        data: {
          resources: children.map(child => ({
            uri: Kst(child.uri),
            name: O$(child.name),
            mimeType: child.mimeType !== void 0 ? O$(child.mimeType) : void 0
          }))
        }
      };
    },
    renderToolUseMessage: jsa,
    userFacingName: Ysa,
    renderToolResultMessage: Jsa,
    isResultTruncated(result: ReadMcpResourceDirOutput, {
      columns: columns
    }: { columns: number }) {
      if (result.error) return T1(result.error, columns);
      return T1(Pe(result, null, 2), columns);
    },
    mapToolResultToToolResultBlockParam(result: ReadMcpResourceDirOutput, toolUseId: string): ToolResultBlockParam {
      if (result.error) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: result.error
      };
      let listing = result.resources.map(child => `${child.name}${child.mimeType === GNt ? "/" : ""}`).join(`
`),
        summary = result.resources.length > 0 ? `Directory listing (${result.resources.length} ${Sn(result.resources.length, "entry", "entries")}):
${listing}` : "Directory is empty.";
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `${summary}

${Pe(result)}`
      };
    }
  });
});

export {cKd,uKd,Hee,zNt};
