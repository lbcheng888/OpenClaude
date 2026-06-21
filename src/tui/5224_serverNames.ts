// @ts-nocheck
import {getSettings_DEPRECATED as nq,updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {dMe as ENH,BZt as Ga_} from "../../vendor/m452.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fs as T9} from "../api/0459_getOauthConfig.ts";
import {Kn as n6,Li as L7} from "../../vendor/m2572.ts";
import {oYn as ld6,nDo as rPq} from "../../vendor/m5221.ts";
import {sDe as BRH,d6t as Rm_} from "../../vendor/m4520.ts";
import {Cbe as wJH,scalar as Eh} from "../mcp/0728_serverName.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {Tn as G6,zs as E9} from "../../vendor/m2554.ts";
import {at as K_,rs as gq} from "../../vendor/m2546.ts";
import {lr as w8,readRoster as f1} from "../../vendor/m2547.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/*
 * tui/5187_serverNames.tsx - React/Ink terminal UI restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
function bN4({
  serverNames: serverNames,
  pluginServerNames: pluginServerNames,
  onDone: onDone
}: any): any {
  function onSubmit(T: any): any {
    let z = nq() || {},
      $ = z.enabledMcpjsonServers || [],
      Y = z.disabledMcpjsonServers || [],
      [A, w] = ENH(serverNames, (j: any): any => T.includes(j));
    c("tengu_mcp_multidialog_choice", {
      approved: A.length,
      rejected: w.length
    });
    let persistFailed = !1;
    if (A.length > 0) {
      let enabledMcpjsonServers = T9([...$, ...A]),
        {
          error: error
        } = Yq("localSettings", {
          enabledMcpjsonServers: enabledMcpjsonServers
        });
      persistFailed ||= error != null;
    }
    if (w.length > 0) {
      let disabledMcpjsonServers = T9([...Y, ...w]),
        {
          error: error
        } = Yq("localSettings", {
          disabledMcpjsonServers: disabledMcpjsonServers
        });
      persistFailed ||= error != null;
    }
    onDone({
      persistFailed: persistFailed
    });
  }
  let onCancel = XU.useCallback((): any => {
    let z = (nq() || {}).disabledMcpjsonServers || [],
      disabledMcpjsonServers = T9([...z, ...serverNames]),
      {
        error: error
      } = Yq("localSettings", {
        disabledMcpjsonServers: disabledMcpjsonServers
      });
    onDone({
      persistFailed: error != null
    });
  }, [serverNames, onDone]);
  return XU.default.createElement(XU.default.Fragment, null, XU.default.createElement(n6, {
    title: `${serverNames.length} new MCP servers found in this project`,
    subtitle: "Select any you wish to enable.",
    color: "warning",
    onCancel: onCancel,
    hideInputGuide: !0
  }, XU.default.createElement(ld6, null), XU.default.createElement(BRH, {
    options: serverNames.map((value: any): any => ({
      label: wJH(value, pluginServerNames?.has(value) ?? !1),
      value: value
    })),
    defaultValue: serverNames,
    onSubmit: onSubmit,
    onCancel: onCancel,
    hideIndexes: !0
  })), XU.default.createElement(B, {
    paddingX: 1
  }, XU.default.createElement(V, {
    dimColor: !0,
    italic: !0
  }, XU.default.createElement(G6, null, XU.default.createElement(K_, {
    chord: "space",
    action: "select"
  }), XU.default.createElement(K_, {
    chord: "enter",
    action: "confirm"
  }), XU.default.createElement(w8, {
    action: "confirm:no",
    context: "Confirmation",
    fallback: "Esc",
    description: "reject all"
  })))));
}
var XU;
var IN4 = L((): any => {
  Ga_();
  y_();
  nH();
  Eh();
  N8();
  f1();
  Rm_();
  E9();
  L7();
  gq();
  rPq();
  XU = u(WH(), 1);
});

export {bN4 as d2l,XU as pj,IN4 as p2l};
