// @ts-nocheck
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {Oe,Ie,isTmuxControlMode,ln} from "../telemetry/0594_feature_name.ts";
import {f_,Kx} from "../../vendor/m128.ts";
import {execFileNoThrowWithCwd,oa} from "../../vendor/m684.ts";
import {Fa,Pd} from "../../vendor/m701.ts";
import {cB,Xt} from "./0228_encoding.ts";
import {Upe,xEt} from "../../vendor/m733.ts";
import {RB,J3} from "../artifact/0731_allow.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {pKe,Bnn} from "../../vendor/m737.ts";
import {De,Rn} from "../session/0615_length.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {kg} from "../../vendor/m129.ts";
import {ca} from "../../vendor/m5.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// Apply policyHelper config once; returns null on success or an error string.
async function Fnn(policyConfig: any, sourceType: any) {
  if (ors) return null; // already initialized
  ors = !0;
  let helperDef = policyConfig?.policyHelper;
  if (!helperDef) return null;
  // Only accept policies delivered from trusted admin sources
  if (sourceType === null || !LQc.has(sourceType)) return logForDebugging(`policyHelper ignored: delivered via non-admin source '${sourceType ?? "unknown"}'`, {
    level: "warn"
  }), null;
  let pathError = MQc(helperDef.path);
  if (pathError) return Oe("settings_policy_helper", "bad_path"), `policyHelper failed: ${pathError}`;
  let runResult = await crs(helperDef);
  if ("error" in runResult) return Oe("settings_policy_helper", runResult.code), `policyHelper failed: ${runResult.error}`;
  return $pe = {
    config: helperDef,
    output: runResult.output,
    warnings: runResult.warnings
  }, f_(), NQc(helperDef), logForDebugging(`policyHelper applied (keys: ${Object.keys(runResult.output).join(",")})`, {
    level: "debug"
  }), Ie("settings_policy_helper"), null;
}

// Returns the currently active managed settings from the policy helper output.
function Unn() {
  return $pe?.output.managedSettings ?? null;
}

// Returns the claudeMd string override from policy helper, if any.
function irs() {
  return $pe?.output.claudeMd ?? null;
}

// Returns the appendSystemPrompt override from policy helper, if any.
function ars() {
  return $pe?.output.appendSystemPrompt ?? null;
}

// Returns true if a policy helper result is currently applied.
function woe() {
  return $pe !== null;
}

// Returns any warnings emitted during last policy helper execution.
function lrs() {
  return $pe?.warnings ?? [];
}

// Executes the policyHelper binary and parses its JSON output envelope.
async function crs(helperDef: any) {
  let timeoutMs = helperDef.timeoutMs ?? PQc;
  let {
    stdout: stdoutStr,
    stderr: stderrStr,
    code: exitCode,
    error: execError
  } = await execFileNoThrowWithCwd(helperDef.path, [], {
    timeout: timeoutMs,
    cwd: void 0,
    maxBuffer: Dhr + 1,
    env: {
      ...process.env,
      CLAUDE_CODE_VERSION: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    }
  });
  if (stderrStr) logForDebugging(`policyHelper stderr: ${stderrStr}`, {
    level: "debug"
  });
  if (exitCode !== 0) return {
    error: `exited with code ${exitCode}: ${stderrStr || stdoutStr || execError || ""}`,
    code: "exit_nonzero"
  };
  if (Buffer.byteLength(stdoutStr, "utf8") > Dhr) return {
    error: `stdout exceeded ${Dhr} bytes`,
    code: "oversize"
  };
  let parsedJson = Fa(stdoutStr, !1);
  if (parsedJson === null || typeof parsedJson !== "object") return {
    error: "stdout is not a JSON object",
    code: "parse_failed"
  };
  let envelopeResult = OQc().safeParse(parsedJson);
  if (!envelopeResult.success) return {
    error: `invalid envelope: ${envelopeResult.error.message}`,
    code: "envelope_invalid"
  };
  let outputObj: any = {},
    warningsList: any[] = [];
  if (envelopeResult.data.managedSettings !== void 0) {
    let normalizedSettings = cB(envelopeResult.data.managedSettings);
    warningsList = Upe(normalizedSettings, "policyHelper");
    for (let warningItem of warningsList) logForDebugging(`policyHelper: ${warningItem.message}`, {
      level: "warn"
    });
    let settingsValidation = RB().safeParse(normalizedSettings);
    if (!settingsValidation.success) return {
      error: `managedSettings rejected: ${settingsValidation.error.message}`,
      code: "schema_rejected"
    };
    let {
      policyHelper: _policyHelperField,
      ...settingsWithoutPolicyHelper
    } = settingsValidation.data;
    outputObj.managedSettings = settingsWithoutPolicyHelper;
  }
  if (envelopeResult.data.claudeMd !== void 0) outputObj.claudeMd = envelopeResult.data.claudeMd;
  if (envelopeResult.data.appendSystemPrompt !== void 0) outputObj.appendSystemPrompt = envelopeResult.data.appendSystemPrompt;
  return {
    output: outputObj,
    warnings: warningsList
  };
}

// Validates that the helper binary path is absolute and meets platform requirements.
function MQc(helperPath: any) {
  if (!srs.isAbsolute(helperPath)) return `path must be absolute: ${helperPath}`;
  if (zt() === "windows" && !helperPath.toLowerCase().endsWith(".exe")) return `path must end in .exe on Windows: ${helperPath}`;
  return null;
}

// Schedules periodic re-execution of the policyHelper binary to refresh policy.
function NQc(helperDef: any) {
  if (OEt) clearInterval(OEt), OEt = null;
  let refreshMs = helperDef.refreshIntervalMs ?? 0;
  if (refreshMs <= 0) return;
  OEt = setInterval((currentHelperDef: any) => {
    if (Phr) return; // refresh already in flight
    Phr = !0, crs(currentHelperDef).then((refreshResult: any) => {
      if ("error" in refreshResult) {
        logForDebugging(`policyHelper refresh failed (retaining current policy): ${refreshResult.error}`, {
          level: "warn"
        }), isTmuxControlMode("settings_policy_helper", "refresh_failed");
        return;
      }
      if ($pe) {
        $pe.output = refreshResult.output, $pe.warnings = refreshResult.warnings, f_();
        try {
          pKe.emit("policySettings"), Ohr.emit();
        } catch (emitError: any) {
          De(emitError);
        }
      }
    }).finally(() => {
      Phr = !1;
    });
  }, refreshMs, helperDef), OEt.unref?.();
}

// Module-level state: path module, event emitter, constants, schema factory, label, cached result, flags, timer.
var srs: any,
  Ohr: any,
  PQc = 1e4,
  Dhr = 1048576,
  OQc: any,
  Lhr = "<policyHelper>",
  $pe: any = null,
  ors = !1,
  OEt: any = null,
  Phr = !1,
  LQc: any;

// Lazy initializer: sets up path, event emitter, schema, and trusted source set.
var l1e = b(() => {
  Xr();
  ln();
  qe();
  oa();
  Pd();
  Rn();
  qs();
  kg();
  Xt();
  Kx();
  Bnn();
  J3();
  xEt();
  srs = require("path"), Ohr = ca(), OQc = we(() => E.looseObject({
    managedSettings: E.unknown().optional(),
    claudeMd: E.string().optional(),
    appendSystemPrompt: E.string().optional()
  })), LQc = new Set(["plist", "hklm", "file"]);
});
export {Fnn,Unn,irs,ars,woe,lrs,crs,MQc,NQc,srs,Ohr,PQc,Dhr,OQc,Lhr,$pe,ors,OEt,Phr,LQc,l1e};
