// @ts-nocheck
import {st as T_} from "../../vendor/m5.ts";
import {logForDebugging as y,qe as UH} from "./0234_setHasFormattedOutput.ts";
import {Se as ZH,Pn as x6,bt as R_} from "../../vendor/m195.ts";
import {jt as d_,ws as L9} from "../../vendor/m228.ts";
import {x7e as Ue_,mc as D1} from "./0645_maxBytes.ts";
import {setOauthTokenFromFd as la,setOauthScopesFromFd as mY_,getOauthTokenFromFd as uY_,getApiKeyFromFd as q_8,setApiKeyFromFd as K_8,lt as A_} from "../session/0131_sent.ts";
import {b as L} from "../../runtime.ts";
import {sn as $6} from "./0047_namespace.ts";
// @ts-nocheck
function persistCredentialToFile(filePath, credential, credentialLabel) {
  if (!T_(process.env.CLAUDE_CODE_REMOTE)) return;
  try {
    remoteCredentialFs.mkdirSync(remoteCredentialDir, {
      recursive: true,
      mode: 448
    }), remoteCredentialFs.writeFileSync(filePath, credential, {
      encoding: "utf8",
      mode: 384
    }), y(`Persisted ${credentialLabel} to ${filePath} for subprocess access`);
  } catch (writeErr) {
    y(`Failed to persist ${credentialLabel} to disk (non-fatal): ${ZH(writeErr)}`, {
      level: "error"
    });
  }
}
function readCredentialFromFile(filePath, credentialLabel) {
  try {
    let content = d_().readFileSync(filePath, {
      encoding: "utf8"
    }).trim();
    if (!content) return null;
    return y(`Read ${credentialLabel} from well-known file ${filePath}`), content;
  } catch (readErr) {
    if (!x6(readErr)) y(`Failed to read ${credentialLabel} from ${filePath}: ${ZH(readErr)}`, {
      level: "debug"
    });
    return null;
  }
}
function readCredentialFromFd({
  envVar: envVar,
  wellKnownPath: wellKnownPath,
  label: label,
  getCached: getCached,
  setCached: setCached
}) {
  let cachedValue = getCached();
  if (cachedValue !== undefined) return cachedValue;
  let fdEnvValue = process.env[envVar];
  if (!fdEnvValue) {
    let fileValue = readCredentialFromFile(wellKnownPath, label);
    return setCached(fileValue), fileValue;
  }
  let fdNumber = parseInt(fdEnvValue, 10);
  if (Number.isNaN(fdNumber)) return y(`${envVar} must be a valid file descriptor number, got: ${fdEnvValue}`, {
    level: "error"
  }), setCached(null), null;
  try {
    let fdPath = `/dev/fd/${fdNumber}`,
      fdContent = Ue_(fdPath, {
        maxBytes: maxCredentialReadBytes
      }).trim();
    if (!fdContent) return y(`File descriptor contained empty ${label}`, {
      level: "error"
    }), setCached(null), null;
    return y(`Successfully read ${label} from file descriptor ${fdNumber}`), setCached(fdContent), persistCredentialToFile(wellKnownPath, fdContent, label), fdContent;
  } catch (fdReadErr) {
    y(`Failed to read ${label} from file descriptor ${fdNumber}: ${ZH(fdReadErr)}`, {
      level: "error"
    });
    let fallbackValue = readCredentialFromFile(wellKnownPath, label);
    return setCached(fallbackValue), fallbackValue;
  }
}
function consumeBgAuthSnapshot() {
  let snapshotPath = process.env.CLAUDE_BG_AUTH_SNAPSHOT_PATH;
  if (!snapshotPath) return;
  delete process.env.CLAUDE_BG_AUTH_SNAPSHOT_PATH;
  try {
    let snapshotContent = d_().readFileSync(snapshotPath, {
      encoding: "utf8"
    });
    remoteCredentialFsPromises.unlink(snapshotPath).catch(() => {});
    let snapshotData = JSON.parse(snapshotContent);
    if (typeof snapshotData?.accessToken !== "string" || !snapshotData.accessToken) {
      y("bg auth snapshot missing accessToken", {
        level: "warn"
      });
      return;
    }
    if (la(snapshotData.accessToken), Array.isArray(snapshotData.scopes)) mY_(snapshotData.scopes);
    if (snapshotData.subscriptionType) process.env.CLAUDE_CODE_SUBSCRIPTION_TYPE = snapshotData.subscriptionType;
    if (snapshotData.rateLimitTier) process.env.CLAUDE_CODE_RATE_LIMIT_TIER = snapshotData.rateLimitTier;
    y("Consumed bg auth snapshot from sockDir");
  } catch (parseErr) {
    if (!x6(parseErr)) y(`Failed to consume bg auth snapshot: ${ZH(parseErr)}`, {
      level: "warn"
    });
  }
}
function readOAuthTokenFromFd() {
  return consumeBgAuthSnapshot(), readCredentialFromFd({
    envVar: "CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR",
    wellKnownPath: oauthTokenWellKnownPath,
    label: "OAuth token",
    getCached: uY_,
    setCached: la
  });
}
function readApiKeyFromFd() {
  return readCredentialFromFd({
    envVar: "CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR",
    wellKnownPath: apiKeyWellKnownPath,
    label: "API key",
    getCached: q_8,
    setCached: K_8
  });
}
var remoteCredentialFs,
  remoteCredentialFsPromises,
  remoteCredentialDir = "/home/claude/.claude/remote",
  oauthTokenWellKnownPath,
  apiKeyWellKnownPath,
  sessionIngressTokenPath,
  maxCredentialReadBytes = 65536;
var remoteCredentialModuleInit = L(() => {
  A_();
  UH();
  $6();
  R_();
  D1();
  L9();
  remoteCredentialFs = require("fs"), remoteCredentialFsPromises = require("fs/promises"), oauthTokenWellKnownPath = `${remoteCredentialDir}/.oauth_token`, apiKeyWellKnownPath = `${remoteCredentialDir}/.api_key`, sessionIngressTokenPath = `${remoteCredentialDir}/.session_ingress_token`;
});

export {persistCredentialToFile as kvr,readCredentialFromFile as xvt,readCredentialFromFd as NOs,consumeBgAuthSnapshot as IIu,readOAuthTokenFromFd as x8,readApiKeyFromFd as kvt,remoteCredentialFs as pcn,remoteCredentialFsPromises as MOs,remoteCredentialDir as mcn,oauthTokenWellKnownPath as kIu,apiKeyWellKnownPath as HIu,sessionIngressTokenPath as fcn,maxCredentialReadBytes as xvr,remoteCredentialModuleInit as Acn};
