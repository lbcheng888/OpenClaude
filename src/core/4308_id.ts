// @ts-nocheck
import {Cl as vl,Ri} from "../tools/2227_userFacingName.ts";
import {dce as Qle,LFn as QBn} from "../permissions/3895_request_id.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function setPermissionHandler(handler, _) {
  if (!Array.isArray(handler)) return [];
  let q = [];
  for (let K of handler) {
    if (K == null || typeof K !== "object" || K.type !== "tool_use") continue;
    let {
      id: O,
      name: T
    } = K;
    if (typeof O !== "string" || typeof T !== "string") continue;
    let z = _ ? vl(_, T)?.mcpInfo : undefined,
      $ = z?.title || Qle(T);
    if ($ === T) continue;
    let Y = {
      id: O,
      display_name: $
    };
    if (z) {
      if (Y.server_display_name = z.displayName || z.serverInfoName || z.serverName, z.iconUrl) Y.icon_url = z.iconUrl;
    }
    q.push(Y);
  }
  return q;
}
var g3q = b(() => {
  QBn();
  Ri();
});

export {setPermissionHandler as Edt,g3q as Wmo};
