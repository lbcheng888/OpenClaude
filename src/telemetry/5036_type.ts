// @ts-nocheck
import {nOe as UDe,G0o as wvo} from "../../vendor/m5034.ts";
import {getIsNonInteractiveSession as kr,lt as ct} from "../session/0132_sent.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {isClaudeAISubscriber as Co,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function resumeStalePromptCancel() {
  return UDe() && !kr() && ut("tengu_c4e_slash_upsell", false);
}
function Bim(e) {
  return `/${e} is available with Claude for Enterprise \u2014 ask your admin about migrating from API-key access.`;
}
function Xmt(e) {
  return {
    type: "local",
    name: e.name,
    aliases: e.aliases,
    description: `${e.description} \u2014 available with Claude for Enterprise`,
    isEnabled: () => !Fim() && resumeStalePromptCancel(),
    isHidden: true,
    supportsNonInteractive: false,
    load: () => Promise.resolve({
      call: async () => (j("tengu_c4e_slash_upsell_shown", {
        command: e.name
      }), {
        type: "text",
        value: Bim(e.name)
      })
    })
  };
}
function Fim() {
  return Co();
}
var $Rl;
var qRl = b(() => {
  ct();
  Yn();
  Ct();
  mo();
  wvo();
  $Rl = [Xmt({
    name: "ultraplan",
    description: "Claude Code on the web drafts a plan you can edit and approve"
  }), Xmt({
    name: "ultrareview",
    description: "Find and verify bugs in your branch using Claude Code on the web"
  }), Xmt({
    name: "teleport",
    aliases: ["tp"],
    description: "Resume a Claude Code session from claude.ai"
  }), Xmt({
    name: "remote-control",
    aliases: ["rc"],
    description: "Control this session from your phone or claude.ai/code"
  }), Xmt({
    name: "schedule",
    aliases: ["routines"],
    description: "Create and manage scheduled remote Claude Code agents"
  }), Xmt({
    name: "autofix-pr",
    description: "Monitor and autofix any issues with the current PR"
  })];
});
export {resumeStalePromptCancel as vym,Bim as wym,Xmt as Ngt,Fim as kym,$Rl as HMl,qRl as IMl};
