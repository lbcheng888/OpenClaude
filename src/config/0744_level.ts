// @ts-nocheck
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {xe,He,Pt,mn} from "../telemetry/0600_feature_name.ts";
import {C_,lk} from "../../vendor/m125.ts";
import {execFileNoThrowWithCwd as Wr,Ii} from "../../vendor/m690.ts";
import {ba,pd} from "../../vendor/m706.ts";
import {IN,tn} from "./0230_encoding.ts";
import {jpe,tvt} from "../../vendor/m738.ts";
import {JN,h3} from "../artifact/0736_allow.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {uYe,bsn} from "../../vendor/m742.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {ig} from "../../vendor/m130.ts";
import {Ni} from "../../vendor/m127.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
// @ts-nocheck
/**
 * policyHelper subsystem.
 *
 * A "policyHelper" is an external executable, configured via admin-delivered
 * settings, that is invoked once at startup (and optionally refreshed on an
 * interval). It emits a JSON envelope on stdout describing managed settings,
 * a CLAUDE.md override, and/or an appended system prompt. This module runs
 * that helper, validates its output, and exposes the resulting policy state.
 */

/**
 * Run the policyHelper described by the given config and, if successful,
 * install its output as the active policy.
 *
 * @param config       Settings object that may carry a `policyHelper` entry.
 * @param deliverySource Where the settings were delivered from; must be an
 *                       admin/managed source for the helper to be honored.
 * @returns null on success/no-op, or a human-readable failure string.
 */
async function runPolicyHelper(config, deliverySource) {
  if (policyHelperAttempted) return null;
  policyHelperAttempted = !0;
  let helper = config?.policyHelper;
  if (!helper) return null;
  if (deliverySource === null || !ADMIN_DELIVERY_SOURCES.has(deliverySource)) return A(`policyHelper ignored: delivered via non-admin source '${deliverySource ?? "unknown"}'`, {
    level: "warn"
  }), null;
  let pathError = validateHelperPath(helper.path);
  if (pathError) return xe("settings_policy_helper", "bad_path"), `policyHelper failed: ${pathError}`;
  let result = await executePolicyHelper(helper);
  if ("error" in result) return xe("settings_policy_helper", result.code), `policyHelper failed: ${result.error}`;
  return activePolicy = {
    config: helper,
    output: result.output,
    warnings: result.warnings
  }, C_(), schedulePolicyRefresh(helper), A(`policyHelper applied (keys: ${Object.keys(result.output).join(",")})`, {
    level: "debug"
  }), He("settings_policy_helper"), null;
}

/** @returns The managed settings supplied by the active policyHelper, if any. */
function getPolicyManagedSettings() {
  return activePolicy?.output.managedSettings ?? null;
}

/** @returns The CLAUDE.md override supplied by the active policyHelper, if any. */
function getPolicyClaudeMd() {
  return activePolicy?.output.claudeMd ?? null;
}

/** @returns The appended system prompt supplied by the active policyHelper, if any. */
function getPolicyAppendSystemPrompt() {
  return activePolicy?.output.appendSystemPrompt ?? null;
}

/** @returns Whether a policyHelper policy is currently active. */
function hasActivePolicy() {
  return activePolicy !== null;
}

/** @returns Warnings emitted while validating the active policyHelper output. */
function getPolicyWarnings() {
  return activePolicy?.warnings ?? [];
}

/**
 * Spawn the helper executable, validate its stdout envelope, and return the
 * extracted policy output (or an error descriptor).
 */
async function executePolicyHelper(helper) {
  let timeout = helper.timeoutMs ?? DEFAULT_HELPER_TIMEOUT_MS,
    {
      stdout: stdout,
      stderr: stderr,
      code: exitCode,
      error: spawnError
    } = await Wr(helper.path, [], {
      timeout: timeout,
      cwd: void 0,
      maxBuffer: MAX_HELPER_STDOUT_BYTES + 1,
      env: {
        ...process.env,
        CLAUDE_CODE_VERSION: {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION
      }
    });
  if (stderr) A(`policyHelper stderr: ${stderr}`, {
    level: "debug"
  });
  if (exitCode !== 0) return {
    error: `exited with code ${exitCode}: ${stderr || stdout || spawnError || ""}`,
    code: "exit_nonzero"
  };
  if (Buffer.byteLength(stdout, "utf8") > MAX_HELPER_STDOUT_BYTES) return {
    error: `stdout exceeded ${MAX_HELPER_STDOUT_BYTES} bytes`,
    code: "oversize"
  };
  let parsed = ba(stdout, !1);
  if (parsed === null || typeof parsed !== "object") return {
    error: "stdout is not a JSON object",
    code: "parse_failed"
  };
  let envelope = getEnvelopeSchema().safeParse(parsed);
  if (!envelope.success) return {
    error: `invalid envelope: ${envelope.error.message}`,
    code: "envelope_invalid"
  };
  let output = {},
    warnings = [];
  if (envelope.data.managedSettings !== void 0) {
    let normalizedSettings = IN(envelope.data.managedSettings);
    warnings = jpe(normalizedSettings, "policyHelper");
    for (let warning of warnings) A(`policyHelper: ${warning.message}`, {
      level: "warn"
    });
    let settingsResult = JN().safeParse(normalizedSettings);
    if (!settingsResult.success) return {
      error: `managedSettings rejected: ${settingsResult.error.message}`,
      code: "schema_rejected"
    };
    let {
      policyHelper: ignoredNestedHelper,
      ...managedSettings
    } = settingsResult.data;
    output.managedSettings = managedSettings;
  }
  if (envelope.data.claudeMd !== void 0) output.claudeMd = envelope.data.claudeMd;
  if (envelope.data.appendSystemPrompt !== void 0) output.appendSystemPrompt = envelope.data.appendSystemPrompt;
  return {
    output: output,
    warnings: warnings
  };
}

/**
 * Validate that the helper path is acceptable.
 * @returns null if valid, otherwise an error message.
 */
function validateHelperPath(helperPath) {
  if (!nodePath.isAbsolute(helperPath)) return `path must be absolute: ${helperPath}`;
  if (Yt() === "windows" && !helperPath.toLowerCase().endsWith(".exe")) return `path must end in .exe on Windows: ${helperPath}`;
  return null;
}

/**
 * (Re)arm the periodic refresh timer for the policyHelper, re-running it on the
 * configured interval and updating the active policy in place on success.
 */
function schedulePolicyRefresh(helper) {
  if (refreshTimer) clearInterval(refreshTimer), refreshTimer = null;
  let intervalMs = helper.refreshIntervalMs ?? 0;
  if (intervalMs <= 0) return;
  refreshTimer = setInterval(currentHelper => {
    if (refreshInFlight) return;
    refreshInFlight = !0, executePolicyHelper(currentHelper).then(result => {
      if ("error" in result) {
        A(`policyHelper refresh failed (retaining current policy): ${result.error}`, {
          level: "warn"
        }), Pt("settings_policy_helper", "refresh_failed");
        return;
      }
      if (activePolicy) {
        activePolicy.output = result.output, activePolicy.warnings = result.warnings, C_();
        try {
          uYe.emit("policySettings"), policyRefreshEmitter.emit();
        } catch (emitError) {
          Ie(emitError);
        }
      }
    }).finally(() => {
      refreshInFlight = !1;
    });
  }, intervalMs, helper), refreshTimer.unref?.();
}

var nodePath,
  policyRefreshEmitter,
  DEFAULT_HELPER_TIMEOUT_MS = 1e4,
  MAX_HELPER_STDOUT_BYTES = 1048576,
  getEnvelopeSchema,
  HELPER_LABEL = "<policyHelper>",
  activePolicy = null,
  policyHelperAttempted = !1,
  refreshTimer = null,
  refreshInFlight = !1,
  ADMIN_DELIVERY_SOURCES;
var tNe = b(() => {
  Qr();
  mn();
  qe();
  Ii();
  pd();
  vn();
  Es();
  ig();
  tn();
  lk();
  bsn();
  h3();
  tvt();
  nodePath = require("path"), policyRefreshEmitter = Ni(), getEnvelopeSchema = ve(() => C.looseObject({
    managedSettings: C.unknown().optional(),
    claudeMd: C.string().optional(),
    appendSystemPrompt: C.string().optional()
  })), ADMIN_DELIVERY_SOURCES = new Set(["plist", "hklm", "file"]);
});

export {runPolicyHelper as Esn,getPolicyManagedSettings as Csn,getPolicyClaudeMd as ecs,getPolicyAppendSystemPrompt as tcs,hasActivePolicy as Aoe,getPolicyWarnings as ncs,executePolicyHelper as rcs,validateHelperPath as Qlu,schedulePolicyRefresh as Zlu,nodePath as Zls,policyRefreshEmitter as cbr,DEFAULT_HELPER_TIMEOUT_MS as Ylu,MAX_HELPER_STDOUT_BYTES as abr,getEnvelopeSchema as Jlu,HELPER_LABEL as ubr,activePolicy as Ype,policyHelperAttempted as Qls,refreshTimer as avt,refreshInFlight as lbr,ADMIN_DELIVERY_SOURCES as Xlu,tNe};
