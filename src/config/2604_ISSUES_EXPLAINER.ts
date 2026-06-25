// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {getOrCreateUserID as T8,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {getSessionId as It,lt} from "../session/0132_sent.ts";
import {$vn,H8r} from "../../vendor/m2602.ts";
import {Ne} from "../../vendor/m583.ts";
import {XU,rI} from "./0586_rI.ts";
import {getOauthAccountInfo as hc,lo} from "./2036_withOAuthRefreshLock.ts";
import {WM,E8} from "./2192_terminal.ts";
import {b} from "../../runtime.ts";
import {Wi,Hn} from "../../vendor/m100.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "./0137_namespace.ts";
// @ts-nocheck
// OTEL metrics resource attributes: builds the attribute map (user/session/version/account
// /entrypoint/org/terminal) for telemetry, gated by OTEL_METRICS_INCLUDE_* env flags.

// Encodes a BigInt into a fixed 22-char base58 string (right-padded with leading "1"s).
function Fvd(value) {
  let base = BigInt(58),
    digits = Array(22).fill("1"),
    pos = 21,
    remaining = value;
  while (remaining > 0n) {
    let digitIndex = Number(remaining % base);
    digits[pos] = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[digitIndex], remaining = remaining / base, pos--;
  }
  return digits.join("");
}
// Parses a UUID (with or without dashes) into a 128-bit BigInt; throws on bad hex length.
function Bvd(uuid) {
  let hex = uuid.replaceAll("-", "");
  if (hex.length !== 32) throw Error(`Invalid UUID hex length: ${hex.length}`);
  return BigInt("0x" + hex);
}
// Builds a tagged id like `${prefix}_01<base58(uuid)>`; returns undefined on failure.
function ENi(prefix, uuid) {
  try {
    let asBigInt = Bvd(uuid);
    return `${prefix}_01${Fvd(asBigInt)}`;
  } catch {
    return;
  }
}
// Resolves an OTEL_METRICS_INCLUDE_* boolean flag from env, falling back to the built-in default.
function VOt(flagName) {
  let defaultValue = Uvd[flagName],
    envValue = process.env[flagName];
  if (envValue === void 0) return defaultValue;
  return nt(envValue);
}
// Validates a resource attribute key/value: printable ASCII excluding comma, semicolon, backslash.
function CNi(text) {
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    if (charCode < 33 || charCode === 44 || charCode === 59 || charCode === 92 || charCode > 126) return !1;
  }
  return !0;
}
// Assembles the full OTEL resource attribute map for metrics export.
function K2e() {
  let userId = T8(),
    sessionId = It(),
    extraAttributes = $vn(),
    hasExtraAttributes = Object.keys(extraAttributes).length > 0,
    attributes = {};
  if (VOt("OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES")) for (let [attrKey, attrValue] of Object.entries($vd(Ne.OTEL_RESOURCE_ATTRIBUTES))) {
    if (hasExtraAttributes && (attrKey.startsWith("user.") || attrKey.startsWith("identity."))) continue;
    attributes[attrKey] = attrValue;
  }
  if (attributes["user.id"] = userId, VOt("OTEL_METRICS_INCLUDE_SESSION_ID")) {
    if (attributes["session.id"] = sessionId, Ne.CLAUDE_CODE_REMOTE_SESSION_ID) attributes["ccr.session.id"] = Ne.CLAUDE_CODE_REMOTE_SESSION_ID;
  }
  if (VOt("OTEL_METRICS_INCLUDE_VERSION")) attributes["app.version"] = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION;
  if (VOt("OTEL_METRICS_INCLUDE_ENTRYPOINT")) {
    let entrypoint = XU();
    if (entrypoint) attributes["app.entrypoint"] = entrypoint;
  }
  let account = hc() ?? qvd();
  if (account) {
    let {
      organizationUuid: organizationUuid,
      emailAddress: emailAddress,
      accountUuid: accountUuid
    } = account;
    if (organizationUuid) attributes["organization.id"] = organizationUuid;
    if (emailAddress) attributes["user.email"] = emailAddress;
    if (accountUuid && VOt("OTEL_METRICS_INCLUDE_ACCOUNT_UUID")) {
      attributes["user.account_uuid"] = accountUuid;
      let accountTaggedId = process.env.CLAUDE_CODE_ACCOUNT_TAGGED_ID || ENi("user", accountUuid);
      if (accountTaggedId) attributes["user.account_id"] = accountTaggedId;
    }
  }
  if (Object.assign(attributes, extraAttributes), WM.terminal) attributes["terminal.type"] = WM.terminal;
  return attributes;
}
// Derives account identity (org/account/email) from the remote-session JWT access token, or null.
function qvd() {
  if (!Ne.CLAUDE_CODE_REMOTE_SESSION_ID) return null;
  let accessToken = Ne.CLAUDE_CODE_SESSION_ACCESS_TOKEN;
  if (!accessToken) return null;
  let segments = accessToken.replace(/^sk-ant-[a-z0-9]+-/, "").split(".");
  if (segments.length !== 3 || !segments[1]) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(segments[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
  let nonEmptyString = candidate => typeof candidate === "string" && candidate.length > 0 ? candidate : void 0,
    actClaim = payload.act ?? {};
  return {
    organizationUuid: nonEmptyString(payload.organization_uuid),
    accountUuid: nonEmptyString(payload.account_uuid),
    emailAddress: nonEmptyString(payload.account_email) ?? nonEmptyString(actClaim.email)
  };
}
var Uvd,
  ANi = 255,
  $vd;
// Module initializer: pulls in deps, sets OTEL_METRICS_INCLUDE_* defaults, and builds the
// W3C-style resource-attributes parser ($vd) with key/value validation.
var qvn = b(() => {
  Wi();
  lt();
  lo();
  tr();
  rI();
  Ir();
  E8();
  dn();
  H8r();
  Uvd = {
    OTEL_METRICS_INCLUDE_SESSION_ID: !0,
    OTEL_METRICS_INCLUDE_VERSION: !1,
    OTEL_METRICS_INCLUDE_ACCOUNT_UUID: !0,
    OTEL_METRICS_INCLUDE_ENTRYPOINT: !1,
    OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES: !0
  };
  $vd = Hn(raw => {
    if (!raw) return {};
    let parsed = {};
    try {
      for (let pair of raw.split(",")) {
        let [rawKey, rawValue, ...rest] = pair.split("=");
        if (rawKey === void 0 || rawValue === void 0 || rest.length > 0) continue;
        let key = rawKey.trim(),
          value = rawValue.trim().split(/^"|"$/).join("");
        if (key.length === 0 || key.length > ANi || !CNi(key)) throw Error("invalid resource attribute key");
        if (value.length > ANi || !CNi(value)) throw Error("invalid resource attribute value");
        parsed[key] = decodeURIComponent(value);
      }
    } catch {
      return {};
    }
    return parsed;
  });
});

export {Fvd,Bvd,ENi,VOt,CNi,K2e,qvd,Uvd,ANi,$vd,qvn};
