// @ts-nocheck
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {getSettings_DEPRECATED as nq,updateSettingsForSource as Yq,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {Kn as n6,Li as L7} from "../../vendor/m2572.ts";
import {Cbe as wJH,scalar as Eh} from "../mcp/0728_serverName.ts";
import {oYn as ld6,nDo as rPq} from "../../vendor/m5221.ts";
import {pr as X8} from "../../vendor/m2562.ts";
import {b as L,M as u} from "../../runtime.ts";
import {yb as _D} from "../../vendor/m4521.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/*
 * tui/5186_serverName.tsx - React/Ink terminal UI restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
function SN4({
  serverName: H,
  isPluginServer: _ = !1,
  onDone: q
}: any): any {
  function K(O: any): any {
    switch (c("tengu_mcp_dialog_choice", {
      choice: tH(O)
    }), O) {
      case "yes":
      case "yes_all":
        {
          let z = (nq() || {}).enabledMcpjsonServers || [],
            $ = !1;
          if (!z.includes(H)) {
            let {
              error: Y
            } = Yq("localSettings", {
              enabledMcpjsonServers: [...z, H]
            });
            $ ||= Y != null;
          }
          if (O === "yes_all") {
            let {
              error: Y
            } = Yq("localSettings", {
              enableAllProjectMcpServers: !0
            });
            $ ||= Y != null;
          }
          q({
            persistFailed: $
          });
          break;
        }
      case "no":
        {
          let z = (nq() || {}).disabledMcpjsonServers || [],
            $ = !1;
          if (!z.includes(H)) {
            let {
              error: Y
            } = Yq("localSettings", {
              disabledMcpjsonServers: [...z, H]
            });
            $ = Y != null;
          }
          q({
            persistFailed: $
          });
          break;
        }
    }
  }
  return nd6.default.createElement(n6, {
    title: `New MCP server found in this project: ${wJH(H, _)}`,
    color: "warning",
    onCancel: (): any => K("no")
  }, nd6.default.createElement(ld6, null), nd6.default.createElement(X8, {
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
    onChange: (O: any): any => K(O),
    onCancel: (): any => K("no")
  }));
}
var nd6;
var CN4 = L((): any => {
  y_();
  Eh();
  N8();
  _D();
  L7();
  rPq();
  nd6 = u(WH(), 1);
});
export {SN4 as c2l,nd6 as sYn,CN4 as u2l};
