// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {UCo as LEo,LSl as mTl,BCo as PEo,FCo as OEo,NCo as DEo,Qjt as Cjt} from "../session/4833_flags.ts";
import {isPolicyAllowed as ii,rd as sd} from "../../vendor/m2205.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {pct as qlt,mct as jlt} from "../../vendor/m3956.ts";
import {Cw as CO,LB as V3} from "../../vendor/m1284.ts";
import {YSl as RTl,JSl as xTl} from "../../vendor/m4841.ts";
import {wte as hte} from "../config/3923_maxFiles.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var qY4 = {};
pt(qY4, {
  call: () => call
});
function extractTextFromBlocks(result) {
  return result.map(block => block.type === "text" ? block.text : "").filter(Boolean).join(`
`);
}
async function runUltrareviewLaunch(scope, context, onDone, billingNote, applyFixes, abortSignal) {
  let launchResult = await LEo(scope, context, billingNote, {
    applyFixesOnComplete: applyFixes
  });
  if (abortSignal?.aborted) return;
  if (launchResult) onDone(extractTextFromBlocks(launchResult.blocks), {
    shouldQuery: true,
    metaMessages: launchResult.launched ? [`The output above is already visible to the user. Briefly acknowledge it without repeating the target, URL, or billing note. Findings will arrive via task-notification.${applyFixes ? " The user passed --fix: when the findings arrive, apply them to the local working tree." : ""}`] : undefined
  });else onDone("Ultrareview failed to launch the cloud session. Check that this is a GitHub repo and try again.", {
    display: "system"
  });
}
var _Y4,
  call = async (onDone, context, args) => {
    if (!ii("allow_remote_sessions")) return onDone("Cloud sessions are disabled by your organization's policy. Contact your organization admin to enable them.", {
      display: "system"
    }), null;
    let {
        scopeArgs: scopeArgs,
        applyFixes: applyFixes
      } = mTl(args),
      scopeResult = await PEo(scopeArgs);
    if (!scopeResult.ok) return onDone(scopeResult.error, {
      display: "system"
    }), null;
    let scope = scopeResult.scope,
      billingStatus = await OEo();
    switch (billingStatus.kind) {
      case "blocked":
        {
          j("tengu_review_overage_blocked", {
            reason: billingStatus.reason
          });
          let actionUrlLine = billingStatus.actionUrl ? `
  \u2192 ${billingStatus.actionUrl}` : "",
            adminHint = billingStatus.actionUrl?.includes("/admin-settings/") && qlt() && !CO() ? `
  Run /usage-credits to request this from your admin.` : "";
          return onDone(`${billingStatus.message}${actionUrlLine}${adminHint}`, {
            display: "system"
          }), null;
        }
      case "needs-confirm":
      case "proceed":
        if (billingStatus.kind === "needs-confirm") j("tengu_review_overage_dialog_shown", {});
        return _Y4.default.createElement(RTl, {
          subtitle: billingStatus.kind === "needs-confirm" ? hte() : billingStatus.billingNote || null,
          body: billingStatus.kind === "needs-confirm" ? billingStatus.body : undefined,
          scope: scope,
          onProceed: async abortSignal => {
            if (await runUltrareviewLaunch(scope, context, onDone, billingStatus.billingNote, applyFixes, abortSignal), !abortSignal.aborted && billingStatus.kind === "needs-confirm") DEo();
          },
          onCancel: () => onDone("Ultrareview cancelled.", {
            display: "system"
          })
        });
    }
  };
var KY4 = b(() => {
  Ct();
  sd();
  V3();
  jlt();
  Cjt();
  xTl();
  _Y4 = L(Te(), 1);
});

export {qY4 as QSl,extractTextFromBlocks as iom,runUltrareviewLaunch as aom,_Y4 as XSl,call as lom,KY4 as ZSl};
