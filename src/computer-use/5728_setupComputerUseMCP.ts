// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {i3e as KIH} from "../tools/3221_type.ts";
import {sbn as U16,q7 as wn,Mfe as LOH} from "./2198_iTerm_app.ts";
import {cit as $6_,uit as Y6_} from "../telemetry/3229_enabled.ts";
import {f3 as Vl,T0 as Eh} from "../mcp/0733_serverName.ts";
import {Rf as WY} from "../../vendor/m465.ts";
import {ait as T6_} from "../../vendor/m3222.ts";
var cs4 = {};
j_(cs4, {
  setupComputerUseMCP: () => setupComputerUseMCP
});

/** MCP server name / server key for the computer-use subsystem. */
declare const wn: string;

/**
 * Returns the list of MCP tool definitions for the computer-use capabilities
 * (based on the current platform capabilities and coordinate mode).
 */
declare function KIH(capabilities: {
  screenshotFiltering: string;
  platform: string;
}, coordinateMode: string, installedApps?: string[]): Array<{
  name: string;
  description: string;
  inputSchema: object;
}>;

/** Builds a fully-qualified MCP tool name: `mcp__<serverName>__<toolName>`. */
declare function Vl(serverName: string, toolName: string): string;

/** Returns the active coordinate mode ("pixels" | "normalized_0_100"). */
declare function $6_(): string;

/** Returns true when Claude Code is running as a self-contained bundled binary. */
declare function WY(): boolean;

/** Computer-use executor capabilities object (screenshotFiltering, platform). */
declare const U16: {
  screenshotFiltering: string;
  platform: string;
};

/**
 * Build and return the MCP configuration and allowed-tools list needed to
 * spin up the computer-use MCP server for the current session.
 *
 * When running as a bundled binary the server is launched as a child of the
 * current executable (`process.execPath --computer-use-mcp`).  When running
 * from source the `cli.js` shim next to `setup.ts` is used instead.
 */
function setupComputerUseMCP(): {
  mcpConfig: Record<string, {
    type: string;
    command: string;
    args: string[];
    scope: string;
  }>;
  allowedTools: string[];
} {
  // Build the allowed-tools list: one qualified name per capability.
  let toolDefinitions = KIH(U16, $6_()).map((toolDef: {
      name: string;
    }) => Vl(wn, toolDef.name)),
    // Args to pass when spawning the computer-use MCP subprocess.
    serverArgs = WY() ? ["--computer-use-mcp"] : [pathModule.join(urlModule.fileURLToPath("file:///home/runner/work/claude-cli-internal/claude-cli-internal/src/utils/computerUse/setup.ts"), "..", "cli.js"), "--computer-use-mcp"];
  return {
    mcpConfig: {
      [wn]: {
        type: "stdio",
        command: process.execPath,
        args: serverArgs,
        scope: "dynamic"
      }
    },
    allowedTools: toolDefinitions
  };
}

// Module-level lazy-loaded Node built-ins (cross-module references preserved as-is).
var pathModule: typeof import("path"), urlModule: typeof import("url");
var ds4 = L(() => {
  T6_();
  Eh();
  LOH();
  Y6_();
  pathModule = require("path"), urlModule = require("url");
});
export {cs4 as Dhc,setupComputerUseMCP,pathModule as Ihc,urlModule as xhc,ds4 as Phc};
