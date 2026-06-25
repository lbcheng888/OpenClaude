// @ts-nocheck
import {mw as ZR,X2e as xUe} from "../../vendor/m2608.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function subscribeRefusalFallbackLatchReset(setState) {
  let t,
    n = /^[^@/]+@([^:/]+):/.exec(setState);
  if (n) t = n[1];else try {
    t = new URL(setState).hostname;
  } catch {
    return "unknown";
  }
  let r = t.toLowerCase();
  return tfd.has(r) ? r : "other";
}
function subscribeRefusalFallbackLatchCallback(callback) {
  return callback.includes(`anthropics/${ZR}`);
}
function applyRestoredLatchStateToAppStore(restoredLatchState, setState, n, r, o) {
  j("tengu_plugin_remote_fetch", {
    source: Ue(restoredLatchState),
    host: setState ? subscribeRefusalFallbackLatchReset(setState) : "unknown",
    is_official: restoredLatchState === "plugin_catalog" || (setState ? subscribeRefusalFallbackLatchCallback(setState) : false),
    outcome: Ue(n),
    duration_ms: Math.round(r),
    ...(o && {
      error_kind: o
    })
  });
}
function b5(e) {
  let t = String(e?.message ?? e);
  if (/ENOTFOUND|ECONNREFUSED|EAI_AGAIN|Could not resolve host|Connection refused/i.test(t)) return "dns_or_refused";
  if (/ETIMEDOUT|timed out|timeout/i.test(t)) return "timeout";
  if (/ECONNRESET|socket hang up|Connection reset by peer|remote end hung up/i.test(t)) return "conn_reset";
  if (/403|401|authentication|permission denied/i.test(t)) return "auth";
  if (/404|not found|repository not found/i.test(t)) return "not_found";
  if (/certificate|SSL|TLS|unable to get local issuer/i.test(t)) return "tls";
  if (/Invalid response format|Invalid marketplace schema/i.test(t)) return "invalid_schema";
  return "other";
}
var tfd;
var Z0t = b(() => {
  Ct();
  xUe();
  tfd = new Set(["github.com", "raw.githubusercontent.com", "objects.githubusercontent.com", "gist.githubusercontent.com", "gitlab.com", "bitbucket.org", "codeberg.org", "dev.azure.com", "ssh.dev.azure.com", "storage.googleapis.com"]);
});
export {subscribeRefusalFallbackLatchReset as Xvd,subscribeRefusalFallbackLatchCallback as Qvd,applyRestoredLatchStateToAppStore as RD,b5 as tW,tfd as Jvd,Z0t as XOt};
