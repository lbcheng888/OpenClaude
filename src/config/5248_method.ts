// @ts-nocheck
import {st as rt} from "../../vendor/m5.ts";
import {getGatewayAuth as V_,lt as ct} from "../session/0131_sent.ts";
import {getOauthConfig as Is,Dc as Hc} from "../api/0459_getOauthConfig.ts";
import {b} from "../../runtime.ts";
import {sn as an} from "./0047_namespace.ts";
// @ts-nocheck
function t2l() {
  if (e2l) return;
  if (e2l = true, rt(process.env.CLAUDE_CODE_USE_BEDROCK) || rt(process.env.CLAUDE_CODE_USE_VERTEX) || rt(process.env.CLAUDE_CODE_USE_FOUNDRY) || rt(process.env.CLAUDE_CODE_USE_ANTHROPIC_AWS) || rt(process.env.CLAUDE_CODE_USE_MANTLE) || V_()) return;
  if (process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || process.env.ANTHROPIC_UNIX_SOCKET || process.env.CLAUDE_CODE_CLIENT_CERT || process.env.CLAUDE_CODE_CLIENT_KEY) return;
  let e = process.env.ANTHROPIC_BASE_URL || Is().BASE_API_URL;
  fetch(e, {
    method: "HEAD",
    signal: AbortSignal.timeout(1e4)
  }).catch(() => {});
}
var e2l = false;
var iV4 = b(() => {
  ct();
  Hc();
  an();
});

export {t2l as v$l,e2l as C$l,iV4 as w$l};
