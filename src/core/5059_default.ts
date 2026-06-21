// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {lt as ct,yH as AH} from "../session/0131_sent.ts";
import {Vk as qk,isBridgeEnabled as eH} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {wIl as oHl,vIl as rHl} from "../tui/5058_call.ts";
// @ts-nocheck
var m24 = {};
pt(m24, {
  default: () => c8T
});
var remoteControlCommandDef, c8T;
var p24 = b(() => {
  ct();
  qk();
  remoteControlCommandDef = {
    type: "local-jsx",
    name: "remote-control",
    aliases: ["rc"],
    get description() {
      return AH() ? "Disconnect Remote Control" : "Control this session from your phone or claude.ai/code";
    },
    get argumentHint() {
      return AH() ? undefined : "[name]";
    },
    isEnabled: eH,
    get isHidden() {
      return !eH();
    },
    immediate: true,
    load: () => Promise.resolve().then(() => (oHl(), rHl))
  }, c8T = remoteControlCommandDef;
});

export {m24 as RIl,remoteControlCommandDef as Odm,c8T as Ldm,p24 as xIl};
