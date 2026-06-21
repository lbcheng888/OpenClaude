// @ts-nocheck
import {st} from "../../vendor/m5.ts";
import {getOrCreateUserID,Qn} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {getSessionId,lt} from "../session/0131_sent.ts";
import {XEn,Q3r} from "../../vendor/m2591.ts";
import {je} from "../../vendor/m577.ts";
import {k2,xH} from "./0580_xH.ts";
import {getOauthAccountInfo,Ao} from "./2031_withOAuthRefreshLock.ts";
import {k1,a5} from "./2187_terminal.ts";
import {b} from "../../runtime.ts";
import {ta,wn} from "../../vendor/m45.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "./0047_namespace.ts";
// Encode a BigInt as a Base58 string (22 chars, Bitcoin alphabet)
function phd(value: bigint): string {
  let base = BigInt(58),
    chars = Array(22).fill("1"),
    pos = 21,
    remaining = value;
  while (remaining > 0n) {
    let digit = Number(remaining % base);
    chars[pos] = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[digit], remaining = remaining / base, pos--;
  }
  return chars.join("");
}

// Parse a UUID string (with or without dashes) into a BigInt
function mhd(uuid: string): bigint {
  let hex = uuid.replaceAll("-", "");
  if (hex.length !== 32) throw Error(`Invalid UUID hex length: ${hex.length}`);
  return BigInt("0x" + hex);
}

// Convert a UUID to a prefixed account ID using Base58 encoding
function W0i(prefix: string, uuid: string): string | undefined {
  try {
    let numericId = mhd(uuid);
    return `${prefix}_01${phd(numericId)}`;
  } catch {
    return;
  }
}

// Read an OTEL config flag from the environment, falling back to the default value table
function fDt(envKey: string): any {
  let defaultValue = fhd[envKey],
    envValue = process.env[envKey];
  if (envValue === void 0) return defaultValue;
  return st(envValue);
}

// Validate that an OTEL resource attribute key/value contains only printable non-special ASCII chars
function G0i(attr: string): boolean {
  for (let idx = 0; idx < attr.length; idx++) {
    let code = attr.charCodeAt(idx);
    // Reject control chars, comma (44), semicolon (59), backslash (92), and DEL+above
    if (code < 33 || code === 44 || code === 59 || code === 92 || code > 126) return !1;
  }
  return !0;
}

// Build the OTEL resource attributes object for metrics reporting
function VUe(): Record<string, any> {
  let userId = getOrCreateUserID(),
    sessionId = getSessionId(),
    extraResourceAttrs = XEn(),
    hasExtraAttrs = Object.keys(extraResourceAttrs).length > 0,
    attrs: Record<string, any> = {};

  // Merge parsed OTEL_RESOURCE_ATTRIBUTES env var, skipping user/identity keys if extra attrs exist
  if (fDt("OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES")) for (let [attrKey, attrVal] of Object.entries(Ahd(je.OTEL_RESOURCE_ATTRIBUTES))) {
    if (hasExtraAttrs && (attrKey.startsWith("user.") || attrKey.startsWith("identity."))) continue;
    attrs[attrKey] = attrVal;
  }
  if (attrs["user.id"] = userId, fDt("OTEL_METRICS_INCLUDE_SESSION_ID")) {
    if (attrs["session.id"] = sessionId, je.CLAUDE_CODE_REMOTE_SESSION_ID) attrs["ccr.session.id"] = je.CLAUDE_CODE_REMOTE_SESSION_ID;
  }

  // Embed the build version from the inline constants block
  if (fDt("OTEL_METRICS_INCLUDE_VERSION")) attrs["app.version"] = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION;
  if (fDt("OTEL_METRICS_INCLUDE_ENTRYPOINT")) {
    let entrypoint = k2();
    if (entrypoint) attrs["app.entrypoint"] = entrypoint;
  }

  // Prefer OAuth account info; fall back to parsing the remote session JWT
  let accountInfo = getOauthAccountInfo() ?? hhd();
  if (accountInfo) {
    let {
      organizationUuid: orgId,
      emailAddress: email,
      accountUuid: accountId
    } = accountInfo;
    if (orgId) attrs["organization.id"] = orgId;
    if (email) attrs["user.email"] = email;
    if (accountId && fDt("OTEL_METRICS_INCLUDE_ACCOUNT_UUID")) {
      attrs["user.account_uuid"] = accountId;
      let taggedId = process.env.CLAUDE_CODE_ACCOUNT_TAGGED_ID || W0i("user", accountId);
      if (taggedId) attrs["user.account_id"] = taggedId;
    }
  }
  if (Object.assign(attrs, extraResourceAttrs), k1.terminal) attrs["terminal.type"] = k1.terminal;
  return attrs;
}

// Extract account identity from the remote session access token (JWT-like format)
function hhd(): {
  organizationUuid: any;
  accountUuid: any;
  emailAddress: any;
} | null {
  if (!je.CLAUDE_CODE_REMOTE_SESSION_ID) return null;
  let token = je.CLAUDE_CODE_SESSION_ACCESS_TOKEN;
  if (!token) return null;
  // Strip the "sk-ant-<type>-" prefix, then split on dots to get JWT segments
  let parts = token.replace(/^sk-ant-[a-z0-9]+-/, "").split(".");
  if (parts.length !== 3 || !parts[1]) return null;
  let payload: any;
  try {
    payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    return null;
  }
  // Helper: return value only if it's a non-empty string
  let toStringOrUndef = (val: any): string | undefined => typeof val === "string" && val.length > 0 ? val : void 0,
    actorClaims = payload.act ?? {};
  return {
    organizationUuid: toStringOrUndef(payload.organization_uuid),
    accountUuid: toStringOrUndef(payload.account_uuid),
    emailAddress: toStringOrUndef(payload.account_email) ?? toStringOrUndef(actorClaims.email)
  };
}

// Default values for OTEL metrics feature flags
var fhd: Record<string, boolean>,
  // Maximum allowed length for OTEL resource attribute keys and values
  V0i = 255,
  // Memoized parser for the OTEL_RESOURCE_ATTRIBUTES env var string
  Ahd: (raw: string | undefined) => Record<string, string>;
var QEn = b(() => {
  ta();
  lt();
  Ao();
  Qn();
  xH();
  Lr();
  a5();
  sn();
  Q3r();
  fhd = {
    OTEL_METRICS_INCLUDE_SESSION_ID: !0,
    OTEL_METRICS_INCLUDE_VERSION: !1,
    OTEL_METRICS_INCLUDE_ACCOUNT_UUID: !0,
    OTEL_METRICS_INCLUDE_ENTRYPOINT: !1,
    OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES: !0
  };
  // Parse "key=value,key=value" OTEL resource attributes string into a plain object
  Ahd = wn((rawAttrs: string | undefined): Record<string, string> => {
    if (!rawAttrs) return {};
    let result: Record<string, string> = {};
    try {
      for (let entry of rawAttrs.split(",")) {
        let [attrKey, attrVal, ...rest] = entry.split("=");
        // Skip malformed entries (missing key, value, or extra '=' segments)
        if (attrKey === void 0 || attrVal === void 0 || rest.length > 0) continue;
        let trimmedKey = attrKey.trim(),
          // Strip surrounding double-quotes from the value if present
          trimmedVal = attrVal.trim().split(/^"|"$/).join("");
        if (trimmedKey.length === 0 || trimmedKey.length > V0i || !G0i(trimmedKey)) throw Error("invalid resource attribute key");
        if (trimmedVal.length > V0i || !G0i(trimmedVal)) throw Error("invalid resource attribute value");
        result[trimmedKey] = decodeURIComponent(trimmedVal);
      }
    } catch {
      return {};
    }
    return result;
  });
});
export {phd,mhd,W0i,fDt,G0i,VUe,hhd,fhd,V0i,Ahd,QEn};
