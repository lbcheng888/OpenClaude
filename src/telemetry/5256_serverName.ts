// @ts-nocheck
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {getSettings_DEPRECATED as $o,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {iCe,T0} from "../mcp/0733_serverName.ts";
import {nZn,S1o} from "../../vendor/m5254.ts";
import {hr} from "../../vendor/m2573.ts";
import {b,x} from "../../runtime.ts";
import {TS} from "../../vendor/m4541.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Dialog prompting the user to approve a newly-discovered MCP server in the
 * current project (from a project-scoped .mcp.json). Lets the user enable just
 * this server, enable this plus all future project MCP servers, or skip it.
 *
 * The user's choice is persisted into local settings (enabledMcpjsonServers /
 * disabledMcpjsonServers / enableAllProjectMcpServers) and reported via the
 * onDone callback with whether persistence failed.
 */
interface McpServerApprovalDialogProps {
  /** Name of the newly-found MCP server. */
  serverName: string;
  /** Whether this server originates from a plugin (affects the title label). */
  isPluginServer?: boolean;
  /** Invoked once the choice has been persisted. */
  onDone: (result: { persistFailed: boolean }) => void;
}

function Q8l({
  serverName: serverName,
  isPluginServer: isPluginServer = !1,
  onDone: onDone
}: McpServerApprovalDialogProps) {
  /** Handles a dialog choice: records telemetry, then persists the decision. */
  function handleChoice(choice: "yes" | "yes_all" | "no"): void {
    switch (W("tengu_mcp_dialog_choice", {
      choice: Le(choice)
    }), choice) {
      case "yes":
      case "yes_all":
        {
          let enabledServers = ($o() || {}).enabledMcpjsonServers || [],
            persistFailed = !1;
          if (!enabledServers.includes(serverName)) {
            let {
              error: writeError
            } = ao("localSettings", {
              enabledMcpjsonServers: [...enabledServers, serverName]
            });
            persistFailed ||= writeError != null;
          }
          if (choice === "yes_all") {
            let {
              error: writeError
            } = ao("localSettings", {
              enableAllProjectMcpServers: !0
            });
            persistFailed ||= writeError != null;
          }
          onDone({
            persistFailed: persistFailed
          });
          break;
        }
      case "no":
        {
          let disabledServers = ($o() || {}).disabledMcpjsonServers || [],
            persistFailed = !1;
          if (!disabledServers.includes(serverName)) {
            let {
              error: writeError
            } = ao("localSettings", {
              disabledMcpjsonServers: [...disabledServers, serverName]
            });
            persistFailed = writeError != null;
          }
          onDone({
            persistFailed: persistFailed
          });
          break;
        }
    }
  }
  return GKt.jsxs(Jn, {
    title: `New MCP server found in this project: ${iCe(serverName, isPluginServer)}`,
    color: "warning",
    onCancel: () => handleChoice("no"),
    children: [GKt.jsx(nZn, {}), GKt.jsx(hr, {
      options: [{
        label: "Use this MCP server",
        value: "yes"
      }, {
        label: "Use this and all future MCP servers in this project",
        value: "yes_all"
      }, {
        label: "Continue without using this MCP server",
        value: "no"
      }],
      onChange: choice => handleChoice(choice),
      onCancel: () => handleChoice("no")
    })]
  });
}
var GKt;
var Z8l = b(() => {
  kt();
  T0();
  br();
  TS();
  di();
  S1o();
  GKt = x(oe(), 1);
});

export {Q8l,GKt,Z8l};
