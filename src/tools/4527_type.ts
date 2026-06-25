// @ts-nocheck
import {D4 as Z4} from "../session/2737_V4i.ts";
import {b} from "../../runtime.ts";
import {lt as ct,getIsNonInteractiveSession as kr} from "../session/0132_sent.ts";
import {f1 as V1} from "../../vendor/m4432.ts";
import {Npl as Sol,Mpl as Tol} from "../tui/4526_call.ts";
import {sAo as l_o,Opl as _ol} from "../session/4525_call.ts";
// @ts-nocheck
function zH4() {
  return Z4();
}
var _$q, _$q_2;
var YH4 = b(() => {
  ct();
  V1();
  _$q = {
    type: "local-jsx",
    name: "autocompact",
    description: "Set how full the context gets before auto-summarizing",
    isEnabled: () => zH4() && !kr(),
    isHidden: false,
    argumentHint: "[auto|<tokens>]",
    load: () => Promise.resolve().then(() => (Sol(), Tol)),
    userFacingName() {
      return "autocompact";
    }
  }, _$q_2 = {
    type: "local",
    name: "autocompact",
    supportsNonInteractive: true,
    description: "Configure the auto-compact window size",
    get isHidden() {
      return !kr();
    },
    isEnabled() {
      return zH4() && kr();
    },
    argumentHint: "[auto|<tokens>]",
    load: () => Promise.resolve().then(() => (l_o(), _ol)),
    userFacingName() {
      return "autocompact";
    }
  };
});
export {zH4 as Fpl,_$q as Bpl,_$q_2 as uAo,YH4 as Upl};
