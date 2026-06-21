// @ts-nocheck
import {wsa as doa,nI as JH} from "../../vendor/m3252.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {et as Ze,Ai as pi} from "../../vendor/m2208.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function ZU6() {
  let cache = xK4.c(3),
    pluginTrustMessage;
  if (cache[0] === Symbol.for("react.memo_cache_sentinel")) pluginTrustMessage = doa(), cache[0] = pluginTrustMessage;else pluginTrustMessage = cache[0];
  let trustMessageText = pluginTrustMessage,
    warningHeader;
  if (cache[1] === Symbol.for("react.memo_cache_sentinel")) warningHeader = nBH.createElement(w, {
    color: "claude"
  }, Ze.warning, " "), cache[1] = warningHeader;else warningHeader = cache[1];
  let warningBox;
  if (cache[2] === Symbol.for("react.memo_cache_sentinel")) warningBox = nBH.createElement(B, {
    marginBottom: 1
  }, warningHeader, nBH.createElement(w, {
    dimColor: true,
    italic: true
  }, "Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change. See each plugin's homepage for more information.", trustMessageText ? ` ${trustMessageText}` : "")), cache[2] = warningBox;else warningBox = cache[2];
  return warningBox;
}
var xK4, nBH;
var RAq = b(() => {
  pi();
  Je();
  JH();
  xK4 = L(nt(), 1), nBH = L(Te(), 1);
});

export {ZU6 as eWn,xK4 as vml,nBH as Nje,RAq as YSo};
