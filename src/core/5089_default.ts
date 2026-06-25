// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {lt as ct,isReplBridgeActive as AH} from "../session/0132_sent.ts";
import {pH as qk,isBridgeEnabled as eH} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {QNl as oHl,XNl as rHl} from "../tui/5088_call.ts";
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
export {m24 as ZNl,remoteControlCommandDef as VSm,c8T as KSm,p24 as eFl};
