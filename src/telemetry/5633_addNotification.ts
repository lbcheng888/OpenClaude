// @ts-nocheck
import {zpa as woa,reo as Ezr,Kpa as voa,Vpa as Coa,Lit as hot} from "../../vendor/m3270.ts";
import {Ci as ji,fd as np} from "../../vendor/m2469.ts";
import {Lnr as GXn,Mnr as VXn,b2o as $Lo} from "../../vendor/m5629.ts";
import {Jpa as koa,Xpa as Hoa,Qpa as Ioa,OPn as sIn} from "../config/3272_name.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {ts as ms,oh as sh} from "../../vendor/m2600.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {UDe as w0e,Qce as Uce} from "../config/4464_ref.ts";
import {b,x as L} from "../../runtime.ts";
import {tt as nt} from "../../vendor/m2263.ts";
import {et as Te} from "../../vendor/m2261.ts";
// @ts-nocheck
function useClaudeCodeHintRecommendation() {
  let H = hintRecommendationMemoCache.c(11),
    _ = React.useSyncExternalStore(woa, Ezr),
    {
      addNotification: q
    } = ji(),
    {
      recommendation: K,
      clearRecommendation: O,
      tryResolve: T
    } = GXn(),
    z,
    $;
  if (H[0] !== _ || H[1] !== T) z = () => {
    if (!_) return;
    T(async () => {
      let f = await koa(_);
      if (f) v(`[useClaudeCodeHintRecommendation] surfacing ${f.pluginId} from ${f.sourceCommand}`), voa();
      if (Ezr() === _) Coa();
      return f;
    });
  }, $ = [_, T], H[0] = _, H[1] = T, H[2] = z, H[3] = $;else z = H[2], $ = H[3];
  React.useEffect(z, $);
  let Y;
  if (H[4] !== q || H[5] !== O || H[6] !== K) Y = f => {
    if (!K) return;
    Hoa(K.pluginId), j("tengu_plugin_hint_response", {
      _PROTO_plugin_name: ms(K.pluginId).name,
      _PROTO_marketplace_name: K.marketplaceName,
      response: Ue(f)
    });
    e: switch (f) {
      case "yes":
        {
          let {
            pluginId: j,
            pluginName: J,
            marketplaceName: D
          } = K;
          VXn(j, J, "hint-plugin", q, async M => {
            let X = await w0e({
              pluginId: j,
              entry: M.entry,
              marketplaceName: D,
              scope: "user",
              trigger: "hint"
            });
            if (!X.success) throw Error(X.error);
          });
          break e;
        }
      case "disable":
        {
          Ioa();
          break e;
        }
      case "no":
    }
    O();
  }, H[4] = q, H[5] = O, H[6] = K, H[7] = Y;else Y = H[7];
  let A = Y,
    w;
  if (H[8] !== A || H[9] !== K) w = {
    recommendation: K,
    handleResponse: A
  }, H[8] = A, H[9] = K, H[10] = w;else w = H[10];
  return w;
}
var hintRecommendationMemoCache, React;
var mn4 = b(() => {
  np();
  Ct();
  hot();
  je();
  sIn();
  sh();
  Uce();
  $Lo();
  hintRecommendationMemoCache = L(nt(), 1), React = L(Te(), 1);
});
export {useClaudeCodeHintRecommendation as huc,hintRecommendationMemoCache as fuc,React as Unr,mn4 as guc};
