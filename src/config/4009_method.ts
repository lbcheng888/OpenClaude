// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {z_,lt} from "../session/0132_sent.ts";
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {b} from "../../runtime.ts";
import {dn} from "./0137_namespace.ts";
/**
 * Reset the "preflight HEAD probe already sent" guard flag, so the next
 * call to the warmup function will perform the connectivity check again.
 */
function r3a() {
  preflightProbeSent = !1;
}
/**
 * Fire a single best-effort HEAD request against the Anthropic API base URL to
 * warm up the TLS/DNS connection. Runs at most once (guarded by
 * `preflightProbeSent`), and is skipped entirely when:
 *   - any alternate provider is in use (Bedrock / Vertex / Foundry / AWS /
 *     Mantle) or a gateway auth is configured (`z_()`), or
 *   - any proxy / unix-socket / client-cert env var is set (the probe would
 *     not reflect the real connection path).
 */
function o3a() {
  if (preflightProbeSent) return;
  if (preflightProbeSent = !0, nt(process.env.CLAUDE_CODE_USE_BEDROCK) || nt(process.env.CLAUDE_CODE_USE_VERTEX) || nt(process.env.CLAUDE_CODE_USE_FOUNDRY) || nt(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) || nt(process.env.CLAUDE_CODE_USE_MANTLE) || z_()) return;
  if (process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || process.env.ANTHROPIC_UNIX_SOCKET || process.env.CLAUDE_CODE_CLIENT_CERT || process.env.CLAUDE_CODE_CLIENT_KEY) return;
  let baseUrl: string = process.env.ANTHROPIC_BASE_URL || Hs().BASE_API_URL;
  fetch(baseUrl, {
    method: "HEAD",
    signal: AbortSignal.timeout(1e4)
  }).catch(() => {});
}
/** Guard: whether the one-shot preflight HEAD probe has already been sent. */
var preflightProbeSent = !1;
/** Lazily-initialized side-effect bundle: warms up session, oauth and namespace modules. */
var fpo = b(() => {
  lt();
  Sc();
  dn();
});

export {r3a,o3a,preflightProbeSent as mpo,fpo};
