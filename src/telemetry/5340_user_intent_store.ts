// @ts-nocheck
import {_t as ft,uo as fo} from "../../vendor/m2468.ts";
import {CVt as w8t,RJn as WVn,vJn as GVn,EVt as v8t,AVt as R8t} from "../../vendor/m5130.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {getInitialSettings as Kr,br as Er} from "../config/0745_updateSettingsForSource.ts";
import {b,x as L} from "../../runtime.ts";
import {et as Te} from "../../vendor/m2261.ts";
// @ts-nocheck
function d1H() {
  let voiceEnabledFromStore = ft(state => w8t(state.settings)),
    authVersion = ft(state => state.authVersion),
    hasVoiceAuthMemo = React.useMemo(() => voiceEnabledFromStore && WVn(), [authVersion, voiceEnabledFromStore]);
  return React.useEffect(() => {
    if (voiceInitGateLogged) return;
    voiceInitGateLogged = true, j("tengu_voice_init_gate", {
      user_intent_store: voiceEnabledFromStore,
      user_intent_disk: w8t(Kr()),
      has_voice_auth: WVn(),
      voice_mode_allowed: GVn(),
      auth_version: authVersion
    });
  }, []), hasVoiceAuthMemo && v8t() && GVn();
}
var React,
  voiceInitGateLogged = false;
var BF_ = b(() => {
  Ct();
  fo();
  Er();
  R8t();
  React = L(Te(), 1);
});
export {d1H as lde,React as XZn,voiceInitGateLogged as A7l,BF_ as H7t};
