// @ts-nocheck
import {withTimeout as Oc} from "./1488_withTimeout.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {He,mn} from "./0600_feature_name.ts";
import {sLn,Cat,p_a,lno} from "../../vendor/m3358.ts";
import {getIsInteractive as ck,lt} from "../session/0132_sent.ts";
import {du,iw} from "../../vendor/m2302.ts";
import {render as G8,je} from "../../vendor/m2462.ts";
import {AppStateProvider as IE,pq} from "../../vendor/m3370.ts";
import {KeybindingSetup as kC,WW} from "../../vendor/m3362.ts";
import {iLn,cno} from "../../vendor/m3359.ts";
import {getBaseRenderOptions as D1,qee} from "./3372_getBaseRenderOptions.ts";
import {gracefulShutdownSync as Rc,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {b,x} from "../../runtime.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Managed-settings security dialog coordination.
 *
 * When remote/managed settings request a security check, this module either
 * routes the request to an already-registered dialog requester, queues callers
 * until one becomes available, or renders an interactive accept/reject dialog.
 *
 * Module-level state:
 * - dialogRequester (Sno): the currently registered async requester function, or null.
 * - pendingRequesterWaiters (Rat): callbacks waiting for a requester to be set.
 * - dialogActive (yLn): whether an interactive dialog is currently mounted.
 */

/** Returns whether an interactive security dialog is currently active. */
function F_a(): boolean {
  return yLn;
}

/**
 * Registers (or clears) the security-dialog requester. When a non-null requester
 * is set and there are queued waiters, each waiter is resolved with it.
 */
function bno(requester: ((settings: unknown) => Promise<string>) | null): void {
  if (Sno = requester, requester && Rat.length > 0) {
    let waiters = Rat;
    Rat = [];
    for (let resolveWaiter of waiters) resolveWaiter(requester);
  }
}

/**
 * Waits for a security-dialog requester to be registered, with a timeout.
 * Resolves with the requester, or null if the wait times out.
 */
async function ptp(): Promise<((settings: unknown) => Promise<string>) | null> {
  let registerWaiter: (value: unknown) => void,
    waitPromise = new Promise(resolve => {
      registerWaiter = resolve, Rat.push(resolve);
    }),
    result = await Oc(waitPromise, dtp, "managed-settings security dialog requester wait timed out").catch(() => null);
  if (result === null) Rat = Rat.filter(waiter => waiter !== registerWaiter);
  return result;
}

/**
 * Invokes a registered requester for the given settings, emits the corresponding
 * telemetry event for the decision, and records the security check on approval.
 */
async function N_a(requester: (settings: unknown) => Promise<string>, settings: unknown): Promise<string> {
  let decision = await requester(settings);
  if (W(decision === "approved" ? "tengu_managed_settings_security_dialog_accepted" : "tengu_managed_settings_security_dialog_rejected", {}), decision === "approved") He("remote_managed_settings_security_check");
  return decision;
}

/**
 * Runs the managed-settings security check for the given settings.
 *
 * Short-circuits to "no_check_needed" when no check applies. Otherwise routes to
 * a registered requester, a queued one, or mounts an interactive accept/reject
 * dialog and resolves with the user's decision ("approved" / "rejected").
 */
async function B_a(checkContext: unknown, settings: unknown): Promise<string> {
  if (!settings || !sLn(Cat(settings))) return "no_check_needed";
  if (!p_a(checkContext, settings)) return "no_check_needed";
  if (!ck()) return "no_check_needed";
  if (W("tengu_managed_settings_security_dialog_shown", {}), Sno) return N_a(Sno, settings);
  if (du.has(process.stdout)) {
    let queuedRequester = await ptp();
    if (queuedRequester) return N_a(queuedRequester, settings);
  }
  let stdoutAlreadyActive = du.has(process.stdout);
  if (!stdoutAlreadyActive) yLn = !0;
  return new Promise(resolve => {
    (async () => {
      let {
        rerender,
        unmount
      } = await G8(TLn.jsx(IE, {
        children: TLn.jsx(kC, {
          children: TLn.jsx(iLn, {
            settings,
            onAccept: () => {
              if (W("tengu_managed_settings_security_dialog_accepted", {}), He("remote_managed_settings_security_check"), stdoutAlreadyActive) rerender(null);else unmount();
              yLn = !1, resolve("approved");
            },
            onReject: () => {
              if (W("tengu_managed_settings_security_dialog_rejected", {}), stdoutAlreadyActive) rerender(null);else unmount();
              yLn = !1, resolve("rejected");
            }
          })
        })
      }), D1(!1));
    })();
  });
}

/**
 * Interprets a security-check decision: exits the process on rejection,
 * otherwise reports success.
 */
function U_a(decision: string): boolean {
  if (decision === "rejected") return Rc(1), !1;
  return !0;
}

var TLn: any,
  Sno: ((settings: unknown) => Promise<string>) | null = null,
  Rat: Array<(value: unknown) => void>,
  dtp = 5000,
  yLn = !1;
var Eno = b(() => {
  lt();
  cno();
  lno();
  iw();
  je();
  WW();
  pq();
  Np();
  qee();
  mn();
  kt();
  TLn = x(oe(), 1), Rat = [];
});

export {F_a,bno,ptp,N_a,B_a,U_a,TLn,Sno,Rat,dtp,yLn,Eno};
