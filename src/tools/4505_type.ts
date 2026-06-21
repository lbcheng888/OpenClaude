// @ts-nocheck
import {mq as Z4} from "../session/2725_iFi.ts";
import {b} from "../../runtime.ts";
import {lt as ct,getIsNonInteractiveSession as kr} from "../session/0131_sent.ts";
import {nN as V1} from "../../vendor/m4410.ts";
import {zsl as Sol,Ksl as Tol} from "../tui/4504_call.ts";
import {pyo as l_o,Gsl as _ol} from "../session/4503_call.ts";
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

export {zH4 as Ysl,_$q as Jsl,_$q_2 as gyo,YH4 as Xsl};
