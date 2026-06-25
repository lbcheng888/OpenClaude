// @ts-nocheck
import {getSettings_DEPRECATED as $o,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {o1e,Tnn} from "../../vendor/m458.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {preInitQueue as Jn,di} from "../../vendor/m2583.ts";
import {nZn,S1o} from "../../vendor/m5254.ts";
import {nPe,N8t} from "../../vendor/m4540.ts";
import {iCe,T0} from "../mcp/0733_serverName.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {dr,uc} from "../../vendor/m2558.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * MCP server discovery dialog.
 *
 * Rendered when one or more new `.mcp.json`-declared MCP servers are detected in
 * a project. Lets the user pick which of the freshly-discovered servers to
 * enable; the selected ones are written to `enabledMcpjsonServers` and the rest
 * to `disabledMcpjsonServers` in local settings. Cancelling disables all of the
 * discovered servers.
 *
 * @param props.serverNames        Names of the newly-found MCP servers.
 * @param props.pluginServerNames  Set of server names contributed by plugins
 *                                 (used to annotate labels).
 * @param props.onDone             Called once persistence completes, reporting
 *                                 whether writing settings failed.
 */
function tWl({
  serverNames: serverNames,
  pluginServerNames: pluginServerNames,
  onDone: onDone
}: {
  serverNames: string[];
  pluginServerNames?: { has(name: string): boolean };
  onDone: (result: { persistFailed: boolean }) => void;
}) {
  /**
   * Persist the user's selection: approved servers go to the enabled list,
   * the remaining discovered servers go to the disabled list.
   *
   * @param selectedServerNames Server names the user chose to enable.
   */
  function handleSubmit(selectedServerNames: string[]): void {
    let localSettings = $o() || {},
      enabledServers = localSettings.enabledMcpjsonServers || [],
      disabledServers = localSettings.disabledMcpjsonServers || [],
      [approvedServers, rejectedServers] = o1e(serverNames, (name: string) => selectedServerNames.includes(name));
    W("tengu_mcp_multidialog_choice", {
      approved: approvedServers.length,
      rejected: rejectedServers.length
    });
    let persistFailed = !1;
    if (approvedServers.length > 0) {
      let mergedEnabled = os([...enabledServers, ...approvedServers]),
        {
          error: writeError
        } = ao("localSettings", {
          enabledMcpjsonServers: mergedEnabled
        });
      persistFailed ||= writeError != null;
    }
    if (rejectedServers.length > 0) {
      let mergedDisabled = os([...disabledServers, ...rejectedServers]),
        {
          error: writeError
        } = ao("localSettings", {
          disabledMcpjsonServers: mergedDisabled
        });
      persistFailed ||= writeError != null;
    }
    onDone({
      persistFailed: persistFailed
    });
  }
  /** Cancel handler: disable every discovered server, then report completion. */
  let handleCancel = eWl.useCallback(() => {
    let disabledServers = ($o() || {}).disabledMcpjsonServers || [],
      mergedDisabled = os([...disabledServers, ...serverNames]),
      {
        error: writeError
      } = ao("localSettings", {
        disabledMcpjsonServers: mergedDisabled
      });
    onDone({
      persistFailed: writeError != null
    });
  }, [serverNames, onDone]);
  return W6.jsxs(W6.Fragment, {
    children: [W6.jsxs(Jn, {
      title: `${serverNames.length} new MCP servers found in this project`,
      subtitle: "Select any you wish to enable.",
      color: "warning",
      onCancel: handleCancel,
      hideInputGuide: !0,
      children: [W6.jsx(nZn, {}), W6.jsx(nPe, {
        options: serverNames.map((name: string) => ({
          label: iCe(name, pluginServerNames?.has(name) ?? !1),
          value: name
        })),
        defaultValue: serverNames,
        onSubmit: handleSubmit,
        onCancel: handleCancel,
        hideIndexes: !0
      })]
    }), W6.jsx($, {
      paddingX: 1,
      children: W6.jsx(v, {
        dimColor: !0,
        italic: !0,
        children: W6.jsxs(bn, {
          children: [W6.jsx(at, {
            chord: "space",
            action: "select"
          }), W6.jsx(at, {
            chord: "enter",
            action: "confirm"
          }), W6.jsx(dr, {
            action: "confirm:no",
            context: "Confirmation",
            fallback: "Esc",
            description: "reject all"
          })]
        })
      })
    })]
  });
}
var eWl, W6;
var nWl = b(() => {
  Tnn();
  kt();
  je();
  T0();
  br();
  uc();
  N8t();
  Is();
  di();
  Wo();
  S1o();
  eWl = x(et(), 1), W6 = x(oe(), 1);
});

export {tWl,eWl,W6,nWl};
