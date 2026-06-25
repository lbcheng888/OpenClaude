// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {sIo,qHl,rIo,oIo,nIo,bGt} from "../session/4865_flags.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {vdt,wdt} from "../../vendor/m4023.ts";
import {oE,RM} from "../../vendor/m1289.ts";
import {nIl,rIl} from "../../vendor/m4873.ts";
import {Rte} from "../config/3990_maxFiles.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/** Module exports namespace. */
var oIl = {};
ft(oIl, {
  call: () => call
});

/**
 * Joins an array of result blocks into a single newline-separated string,
 * extracting only the text from blocks of type "text".
 */
function Tmm(blocks: Array<{ type: string; text?: string }>): string {
  return blocks.map(block => block.type === "text" ? block.text : "").filter(Boolean).join(`
`);
}

/**
 * Runs the Ultrareview cloud session for a given scope and reports the result
 * back to the conversation via the provided emit callback.
 *
 * @param scope         resolved review scope
 * @param context       review run context
 * @param emit          callback that pushes a message into the conversation
 * @param billingNote   optional billing note passed through to the session
 * @param applyFixes    whether the user requested --fix (apply findings locally)
 * @param signal        optional abort signal to cancel the run
 */
async function Smm(
  scope: unknown,
  context: unknown,
  emit: (text: string, options: Record<string, unknown>) => void,
  billingNote: unknown,
  applyFixes: boolean,
  signal?: { aborted?: boolean }
): Promise<void> {
  let result = await sIo(scope, context, billingNote, {
    applyFixesOnComplete: applyFixes
  });
  if (signal?.aborted) return;
  if (result) emit(Tmm(result.blocks), {
    shouldQuery: !0,
    metaMessages: result.launched ? [`The output above is already visible to the user. Briefly acknowledge it without repeating the target, URL, or billing note. Findings will arrive via task-notification.${applyFixes ? " The user passed --fix: when the findings arrive, apply them to the local working tree." : ""}`] : void 0
  });else emit("Ultrareview failed to launch the cloud session. Check that this is a GitHub repo and try again.", {
    display: "system"
  });
}

/** JSX runtime reference (lazily initialized). */
var sIl,
  /**
   * Entry point for the Ultrareview inline command.
   *
   * Validates org policy, resolves the review scope, checks billing/overage
   * status, then either blocks, confirms, or proceeds with the cloud session.
   */
  call = async (
    emit: (text: string, options: Record<string, unknown>) => void,
    context: unknown,
    rawArgs: unknown
  ) => {
    if (!Xs("allow_remote_sessions")) return emit("Cloud sessions are disabled by your organization's policy. Contact your organization admin to enable them.", {
      display: "system"
    }), null;
    let {
        scopeArgs: scopeArgs,
        applyFixes: applyFixes
      } = qHl(rawArgs),
      scopeResult = await rIo(scopeArgs);
    if (!scopeResult.ok) return emit(scopeResult.error, {
      display: "system"
    }), null;
    let scope = scopeResult.scope,
      overage = await oIo();
    switch (overage.kind) {
      case "blocked":
        {
          W("tengu_review_overage_blocked", {
            reason: overage.reason
          });
          let actionLine = overage.actionUrl ? `
  \u2192 ${overage.actionUrl}` : "",
            adminHint = overage.actionUrl?.includes("/admin-settings/") && vdt() && !oE() ? `
  Run /usage-credits to request this from your admin.` : "";
          return emit(`${overage.message}${actionLine}${adminHint}`, {
            display: "system"
          }), null;
        }
      case "needs-confirm":
      case "proceed":
        if (overage.kind === "needs-confirm") W("tengu_review_overage_dialog_shown", {});
        return sIl.jsx(nIl, {
          subtitle: overage.kind === "needs-confirm" ? Rte() : overage.billingNote || null,
          body: overage.kind === "needs-confirm" ? overage.body : void 0,
          scope: scope,
          onProceed: async (signal: { aborted?: boolean }) => {
            if (await Smm(scope, context, emit, overage.billingNote, applyFixes, signal), !signal.aborted && overage.kind === "needs-confirm") nIo();
          },
          onCancel: () => emit("Ultrareview cancelled.", {
            display: "system"
          })
        });
    }
  };

/** Lazy module initializer — ensures dependent modules are ready. */
var iIl = b(() => {
  kt();
  Bu();
  RM();
  wdt();
  bGt();
  rIl();
  sIl = x(oe(), 1);
});

export {oIl,Tmm,Smm,sIl,call as bmm,iIl};
