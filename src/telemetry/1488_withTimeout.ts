// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {sp as Jp,Ct as St} from "../../vendor/m197.ts";
import {logForDebugging,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {zg as Fg} from "../../vendor/m1479.ts";
import {WorkloadIdentityError,TX as dX} from "../../vendor/m140.ts";
// @ts-nocheck
// Promise 超时包装、可中止 sleep，以及 WIF（工作负载身份联合）凭证锁获取

declare const pt: any;
declare const b: any;
declare const logEvent: any;
declare const Ct: any;
declare const Jp: any;
declare const St: any;
declare const logForDebugging: any;
declare const je: any;
declare const Ie: any;
declare const wn: any;
declare const Fg: any;
declare const WorkloadIdentityError: any;
declare const dX: any;
var moduleExports = {};
pt(moduleExports, {
  withTimeout: () => withTimeout,
  sleep: () => sleep
});

/** 可取消的 sleep：支持 AbortSignal、throwOnAbort 和 unref */
function sleep(ms: number, signal?: AbortSignal, opts?: {
  throwOnAbort?: boolean;
  abortError?: () => Error;
  unref?: boolean;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      if (opts?.throwOnAbort || opts?.abortError) reject(opts.abortError?.() ?? Error("aborted"));else resolve();
      return;
    }
    let timer = setTimeout((sig: AbortSignal | undefined, abortHandler: () => void, done: () => void) => {
      sig?.removeEventListener("abort", abortHandler), done();
    }, ms, signal, onAbort, resolve);
    function onAbort() {
      if (clearTimeout(timer), opts?.throwOnAbort || opts?.abortError) reject(opts.abortError?.() ?? Error("aborted"));else resolve();
    }
    if (signal?.addEventListener("abort", onAbort, {
      once: !0
    }), opts?.unref) timer.unref();
  });
}

/** 内部辅助：超时到期后 reject Promise */
function rejectWithTimeout(reject: (err: Error) => void, message: string) {
  reject(Error(message));
}

/** 给任意 Promise 套上超时限制，超时后抛出 message 错误 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  let timeoutRace = new Promise<never>((_, reject) => {
    timerId = setTimeout(rejectWithTimeout, timeoutMs, reject, message);
  });
  return Promise.race([promise, timeoutRace]).finally(() => {
    if (timerId !== void 0) clearTimeout(timerId);
  });
}

/** 用文件锁保护凭证写入，获取锁后执行 handler，完成后释放 */
function withCredentialsLock(handler: (req: any) => Promise<any>, credPath: string) {
  let credDir = pathModule.dirname(credPath);
  return async (req: any) => {
    let releaseLock = await acquireCredentialsLock(credDir);
    try {
      return logEvent("tengu_wif_user_oauth_lock_acquired", {}), await handler(req);
    } finally {
      logEvent("tengu_wif_user_oauth_lock_released", {});
      try {
        await releaseLock();
      } catch (err) {
        if (Jp(err)) logForDebugging(`wif: lock release failed: ${err}`);else Ie(err);
      }
    }
  };
}

/** 带重试的文件锁获取，最多 MAX_LOCK_RETRIES 次 */
async function acquireCredentialsLock(lockDir: string): Promise<() => Promise<void>> {
  for (let attempt = 0;; attempt++) try {
    return await Fg(lockDir, {
      onCompromised: (err: Error) => logForDebugging(`WIF credentials lock compromised: ${err}`, {
        level: "error"
      })
    });
  } catch (err) {
    if (err.code !== "ELOCKED") throw err;
    if (attempt >= MAX_LOCK_RETRIES) throw logEvent("tengu_wif_user_oauth_lock_retry_limit", {
      attempt: attempt
    }), new WorkloadIdentityError(`Could not acquire credentials lock at ${lockDir} after ${MAX_LOCK_RETRIES} retries`);
    logEvent("tengu_wif_user_oauth_lock_retry", {
      attempt: attempt
    }), await sleep(1000 + Math.random() * 1000);
  }
}
var pathModule: typeof import("path"),
  MAX_LOCK_RETRIES = 5;
var initModule = b(() => {
  dX();
  je();
  St();
  wn();
  Ct();
  pathModule = require("path");
});
export {moduleExports as tHt,sleep,rejectWithTimeout as v3u,withTimeout,withCredentialsLock,acquireCredentialsLock as w3u,pathModule as z8s,MAX_LOCK_RETRIES as K8s,initModule as Zxr};
