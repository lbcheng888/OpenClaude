// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {shouldIncludeParentTier as jSr,settingsMergeCustomizer as boe,parseSettingsFileUncached as zSr,parseSettingsFile as O5,loadManagedFileSettingsFromDir as nvt,keepRestrictiveFromParent as YSr,isAdminPolicyOrigin as lYe,handleFileSystemError as svt,getRelativeSettingsFilePathForSource as g3,ovt,fsn,dCe,uCe,gsn,Bls,QSr,hsn,_sn,XSr,rvt,eNe} from "./0740_settings.ts";
import {getOriginalCwd as gr,getAllowedSettingSources as vSt,getParentManagedSettings as nar,getFlagSettingsInline as CSt,getFlagSettingsPath as YLe,getFlagSettingsExpectedContent as JLe,getUseCoworkPlugins as kSt,lt} from "../session/0132_sent.ts";
import {Coe,mCe,rQ,fCe} from "../../vendor/m741.ts";
import {Csn,ncs,Aoe,tNe} from "./0744_level.ts";
import {C_,GH,XYt,Yqo,Jqo,Wqo,Gqo,Vqo,Kqo,zqo,jqo,o6o,lk} from "../../vendor/m125.ts";
import {eD,wm} from "../../vendor/m707.ts";
import {profileCheckpoint as ta,z9} from "../session/0243_profileReport.ts";
import {Fv,qK} from "../../vendor/m709.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {uM,ZEe} from "../../vendor/m710.ts";
import {Wt,Nd,ps} from "../../vendor/m230.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {zn} from "../api/0465_getOauthConfig.ts";
import {Ov,GN} from "../../vendor/m640.ts";
import {In,Ct} from "../../vendor/m197.ts";
import {ba,pd} from "../../vendor/m706.ts";
import {logForDebugging as A,qe} from "./0236_setHasFormattedOutput.ts";
import {JX,vyr} from "../../vendor/m637.ts";
import {aSr,won} from "../../vendor/m708.ts";
import {sRt,Xl} from "./0651_maxBytes.ts";
import {TeamDeleteToolName as Pe,tn} from "./0230_encoding.ts";
import {qis,YTr} from "../../vendor/m699.ts";
import {He,Pt,xe,mn} from "../telemetry/0600_feature_name.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {uYe,bsn} from "../../vendor/m742.ts";
import {JN,h3} from "../artifact/0736_allow.ts";
import {Qr} from "../../vendor/m323.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
// @ts-nocheck
var y7 = {};
ft(y7, {
  updateSettingsForSource: () => updateSettingsForSource,
  surfaceManagedSettingsErrorsHeadless: () => surfaceManagedSettingsErrorsHeadless,
  shouldIncludeParentTier: () => jSr,
  settingsMergeCustomizer: () => boe,
  rawSettingsContainsKey: () => rawSettingsContainsKey,
  projectSettingsAliasesUserSettings: () => projectSettingsAliasesUserSettings,
  parseSettingsFileUncached: () => zSr,
  parseSettingsFile: () => O5,
  parseRemoteManagedSettings: () => parseRemoteManagedSettings,
  loadManagedFileSettingsFromDir: () => nvt,
  loadManagedFileSettings: () => loadManagedFileSettings,
  keepRestrictiveFromParent: () => YSr,
  isAdminPolicyOrigin: () => lYe,
  hasSurvivingAdminPolicySource: () => hasSurvivingAdminPolicySource,
  hasSkipWorkflowUsageWarning: () => hasSkipWorkflowUsageWarning,
  hasSkipDangerousModePermissionPrompt: () => hasSkipDangerousModePermissionPrompt,
  hasIsolatePeerMachines: () => hasIsolatePeerMachines,
  hasDisableClaudeAiConnectors: () => hasDisableClaudeAiConnectors,
  hasAutoModeOptIn: () => hasAutoModeOptIn,
  handleFileSystemError: () => svt,
  getUseAutoModeDuringPlan: () => getUseAutoModeDuringPlan,
  getSettings_DEPRECATED: () => getSettings_DEPRECATED,
  getSettingsWithSources: () => getSettingsWithSources,
  getSettingsWithErrors: () => getSettingsWithErrors,
  getSettingsRootPathForSource: () => getSettingsRootPathForSource,
  getSettingsForSource: () => getSettingsForSource,
  getSettingsFilePathForSource: () => getSettingsFilePathForSource,
  getSettingsAfterPluginLoad: () => getSettingsAfterPluginLoad,
  getSecuritySensitiveSetting: () => getSecuritySensitiveSetting,
  getRelativeSettingsFilePathForSource: () => g3,
  getPolicySettingsOrigin: () => getPolicySettingsOrigin,
  getPolicySettingsLoadErrors: () => getPolicySettingsLoadErrors,
  getManagedSettingsKeysForLogging: () => getManagedSettingsKeysForLogging,
  getManagedFileSettingsPresence: () => getManagedFileSettingsPresence,
  getLocalSettingsValidationErrors: () => getLocalSettingsValidationErrors,
  getInitialSettings: () => getInitialSettings,
  getFatalAdminPolicyLoadErrors: () => getFatalAdminPolicyLoadErrors,
  getEffectiveSettingSource: () => getEffectiveSettingSource,
  getBasePolicySettingsOrigin: () => getBasePolicySettingsOrigin,
  getBasePolicySettings: () => getBasePolicySettings,
  getAutoModeConfig: () => getAutoModeConfig,
  getAllPolicyTierSettings: () => getAllPolicyTierSettings,
  getAdminPolicyLoadErrors: () => getAdminPolicyLoadErrors,
  filterFatalPolicyErrors: () => filterFatalPolicyErrors
});
function $2() {
  let e = {
    cwd: gr(),
    allowedSources: vSt(),
    parentManaged: nar(),
    flagInline: CSt(),
    flagPath: YLe(),
    flagExpectedContent: JLe(),
    coworkPlugins: kSt(),
    mdm: () => Coe(),
    hkcu: () => mCe(),
    helper: () => Csn(),
    helperWarnings: () => ncs(),
    wslInherits: () => rQ()
  };
  return e.file = () => ovt(e), e;
}
function getSettingsRootPathForSource(e) {
  return fsn(e, $2());
}
function getSettingsFilePathForSource(e) {
  return dCe(e, $2());
}
function projectSettingsAliasesUserSettings() {
  let e = getSettingsFilePathForSource("projectSettings"),
    t = getSettingsFilePathForSource("userSettings");
  return !!e && !!t && Roe.resolve(e) === Roe.resolve(t);
}
function getLocalSettingsValidationErrors() {
  let e = getSettingsFilePathForSource("localSettings");
  if (!e) return [];
  return O5(e).errors;
}
function parseRemoteManagedSettings() {
  return uCe($2());
}
function loadManagedFileSettings() {
  return ovt($2());
}
function getSettingsForSource(e) {
  return gsn(e, $2());
}
function getAllPolicyTierSettings() {
  return Bls($2());
}
function getInitialSettings() {
  return getSettingsWithErrors().settings || {};
}
function getSettingsWithSources() {
  C_();
  let e = [];
  for (let t of eD()) {
    let n = getSettingsForSource(t);
    if (n && Object.keys(n).length > 0) e.push({
      source: t,
      settings: n
    });
  }
  return {
    effective: getInitialSettings(),
    sources: e
  };
}
function getEffectiveSettingSource(e) {
  let t = eD();
  for (let n = t.length - 1; n >= 0; n--) {
    let r = t[n];
    if (getSettingsForSource(r)?.[e] !== undefined) return r;
  }
  return null;
}
function getSettingsWithErrors() {
  let e = GH();
  if (e !== null) return e;
  ta("loadSettingsFromDisk_start");
  let t = QSr($2());
  return ta("loadSettingsFromDisk_end"), XYt(t), t;
}
function getManagedFileSettingsPresence() {
  let e = [Fv()];
  if (Yt() === "wsl" && rQ()) e.unshift(uM);
  for (let t of e) {
    let {
        settings: n
      } = O5(Roe.join(t, "managed-settings.json"), undefined, true),
      {
        wslInheritsWindowsSettings: r,
        ...o
      } = n ?? {},
      s = Object.keys(o).length > 0,
      i = false;
    try {
      let a = Roe.join(t, "managed-settings.d");
      i = Wt().readdirSync(a).some(l => {
        if (!(l.isFile() || l.isSymbolicLink()) || !l.name.endsWith(".json") || l.name.startsWith(".")) return false;
        let {
            settings: c
          } = O5(Roe.join(a, l.name), undefined, true),
          {
            wslInheritsWindowsSettings: u,
            ...d
          } = c ?? {};
        return Object.keys(d).length > 0;
      });
    } catch {}
    if (s || i) return {
      hasBase: s,
      hasDropIns: i
    };
  }
  return {
    hasBase: false,
    hasDropIns: false
  };
}
function FQc() {
  let e = Coe();
  return {
    settings: Object.keys(e.settings).length > 0 ? e.settings : null,
    errors: e.errors
  };
}
function getBasePolicySettings() {
  let e = $2(),
    {
      settings: t
    } = uCe(e);
  if (t) return t;
  let {
    settings: n
  } = FQc();
  if (n) return n;
  let {
    settings: r
  } = loadManagedFileSettings();
  if (r) return r;
  let {
    settings: o
  } = hsn(e);
  if (o) return o;
  let s = mCe();
  return Object.keys(s.settings).length > 0 ? s.settings : null;
}
function getBasePolicySettingsOrigin() {
  let e = _sn({
    ...$2(),
    helper: undefined
  });
  return e === "helper" ? null : e;
}
function getPolicySettingsOrigin() {
  let e = Yqo();
  if (e !== undefined) return e.value;
  let t = Aoe() && Csn() ? "helper" : getBasePolicySettingsOrigin();
  return Jqo(t), t;
}
function getPolicySettingsLoadErrors() {
  let e = Wqo();
  if (e !== undefined) return e;
  let t = [];
  return t.push(...uCe($2()).errors), t.push(...Coe().errors), t.push(...loadManagedFileSettings().errors), t.push(...hsn($2()).errors), t.push(...mCe().errors), Gqo(t), t;
}
function getAdminPolicyLoadErrors() {
  let e = Vqo();
  if (e !== undefined) return e;
  let t = [];
  return t.push(...uCe($2()).errors), t.push(...Coe().errors), t.push(...loadManagedFileSettings().errors), Kqo(t), t;
}
function getFatalAdminPolicyLoadErrors() {
  return filterFatalPolicyErrors(getAdminPolicyLoadErrors());
}
function filterFatalPolicyErrors(e) {
  return e.filter(t => t.severity !== "warning");
}
function hasSurvivingAdminPolicySource() {
  let e = zqo();
  if (e !== undefined) return e;
  let t = r => r != null && Object.keys(r).length > 0,
    n = Aoe() && t(Csn()) || t(uCe($2()).settings) || t(Coe().settings) || t(loadManagedFileSettings().settings);
  return jqo(n), n;
}
function surfaceManagedSettingsErrorsHeadless() {
  let e = getPolicySettingsLoadErrors();
  if (e.length === 0) return;
  let t = e.some(o => o.severity !== "warning"),
    n = t ? "Managed settings failed to load; policies from the failed source are NOT in effect:" : "Managed settings contain invalid entries (remaining valid policies are still enforced):",
    r = e.map(o => `  ${o.file ?? "managed settings"}${o.path ? ` (${o.path})` : ""}: ${o.message}`);
  process.stderr.write(`${n}
${r.join(`
`)}
`), W("tengu_managed_settings_validation_errors", {
    error_count: e.length,
    remote_error_count: zn(e, o => o.file === "remote managed settings"),
    fatal: t
  });
}
function updateSettingsForSource(e, t) {
  if (e === "policySettings" || e === "flagSettings") return {
    error: null
  };
  let n = getSettingsFilePathForSource(e);
  if (!n) return {
    error: null
  };
  try {
    Wt().mkdirSync(Roe.dirname(n));
    let r = XSr(e, $2());
    if (!r) {
      let i = null;
      try {
        i = Ov(n);
      } catch (a) {
        if (!In(a)) throw a;
      }
      if (i !== null) {
        let a = ba(i, false);
        if (a === null) return A(`updateSettingsForSource: invalid JSON in settings file at ${n}`, {
          level: "error"
        }), {
          error: Error(`Invalid JSON syntax in settings file at ${n}`)
        };
        if (a && typeof a === "object") r = a, A(`Using raw settings from ${n} due to validation failure`);
      }
    }
    let o = JX(r || {}, t, (i, a, l, c) => {
      if (a === undefined && c && typeof l === "string") {
        delete c[l];
        return;
      }
      if (Array.isArray(a)) return a;
      return;
    });
    aSr(n);
    let s = Roe.dirname(n) === getSettingsRootPathForSource("userSettings");
    if (sRt(n, Pe(o, null, 2) + `
`, {
      encoding: "utf-8",
      allowSymlink: e === "userSettings" || s,
      checkParentDir: (e === "projectSettings" || e === "localSettings") && !s
    }), C_(), e === "localSettings") qis(g3("localSettings"), gr()).then(i => {
      if (!i.written) return;
      if (i.effective) He("gitignore_global_rule");else if (i.reason === "already_tracked") Pt("gitignore_global_rule", i.reason);else xe("gitignore_global_rule", i.reason ?? "write_ineffective");
    });
  } catch (r) {
    let o = Error(`Failed to read raw settings from ${n}: ${r}`);
    return A(o.message, {
      level: "error"
    }), {
      error: o
    };
  }
  try {
    getSettingsWithErrors();
  } catch (r) {
    Ie(r);
  }
  try {
    uYe.emit(e);
  } catch (r) {
    for (let o of r instanceof AggregateError ? r.errors : [r]) Ie(o);
  }
  return {
    error: null
  };
}
function getManagedSettingsKeysForLogging(e) {
  let t = JN().strip().parse(e),
    n = ["permissions", "sandbox", "hooks"],
    r = [],
    o = {
      permissions: new Set(["allow", "deny", "ask", "defaultMode", "disableBypassPermissionsMode", "disableAutoMode", "additionalDirectories"]),
      sandbox: new Set(["enabled", "failIfUnavailable", "allowUnsandboxedCommands", "network", "filesystem", "ignoreViolations", "excludedCommands", "autoAllowBashIfSandboxed", "enableWeakerNestedSandbox", "enableWeakerNetworkIsolation", "allowAppleEvents", "ripgrep"]),
      hooks: new Set(["PreToolUse", "PostToolUse", "Notification", "UserPromptSubmit", "UserPromptExpansion", "SessionStart", "SessionEnd", "Stop", "SubagentStop", "PreCompact", "PostCompact", "TeammateIdle", "TaskCreated", "TaskCompleted"])
    };
  for (let s of Object.keys(t)) if (n.includes(s) && t[s] && typeof t[s] === "object") {
    let i = t[s],
      a = o[s];
    if (a) {
      for (let l of Object.keys(i)) if (a.has(l)) r.push(`${s}.${l}`);
    }
  } else r.push(s);
  return r.sort();
}
function getSettingsAfterPluginLoad(e) {
  if (!o6o()) W("tengu_plugin_settings_premature_read", {
    key: e
  });
  let {
    settings: t
  } = getSettingsWithErrors();
  return (t || {})[e];
}
function getSecuritySensitiveSetting(e) {
  let t = [];
  for (let n of ["policySettings", "flagSettings", "userSettings"]) {
    let r = getSettingsForSource(n)?.[e];
    if (r !== undefined) t.push(r);
  }
  return t;
}
function hasSkipDangerousModePermissionPrompt() {
  return !!(getSettingsForSource("userSettings")?.skipDangerousModePermissionPrompt || getSettingsForSource("localSettings")?.skipDangerousModePermissionPrompt || getSettingsForSource("flagSettings")?.skipDangerousModePermissionPrompt || getSettingsForSource("policySettings")?.skipDangerousModePermissionPrompt);
}
function hasSkipWorkflowUsageWarning() {
  return !!(getSettingsForSource("userSettings")?.skipWorkflowUsageWarning || getSettingsForSource("localSettings")?.skipWorkflowUsageWarning || getSettingsForSource("flagSettings")?.skipWorkflowUsageWarning || getSettingsForSource("policySettings")?.skipWorkflowUsageWarning);
}
function hasIsolatePeerMachines() {
  return eD().some(e => getSettingsForSource(e)?.isolatePeerMachines === true);
}
function hasDisableClaudeAiConnectors() {
  return eD().some(e => getSettingsForSource(e)?.disableClaudeAiConnectors === true);
}
function hasAutoModeOptIn() {
  return true;
}
function getUseAutoModeDuringPlan() {
  return getSettingsForSource("policySettings")?.useAutoModeDuringPlan !== false && getSettingsForSource("flagSettings")?.useAutoModeDuringPlan !== false && getSettingsForSource("userSettings")?.useAutoModeDuringPlan !== false && getSettingsForSource("localSettings")?.useAutoModeDuringPlan !== false;
}
function getAutoModeConfig() {
  {
    let e = $Qc(),
      t = [],
      n = [],
      r = [],
      o = [];
    for (let s of ["userSettings", "localSettings", "flagSettings", "policySettings"]) {
      let i = getSettingsForSource(s);
      if (!i) continue;
      let a = e.safeParse(i.autoMode);
      if (a.success) {
        if (a.data.allow) t.push(...a.data.allow);
        if (a.data.soft_deny) n.push(...a.data.soft_deny);
        if (a.data.hard_deny) r.push(...a.data.hard_deny);
        if (a.data.environment) o.push(...a.data.environment);
      }
    }
    if (t.length > 0 || n.length > 0 || r.length > 0 || o.length > 0) return {
      ...(t.length > 0 && {
        allow: t
      }),
      ...(n.length > 0 && {
        soft_deny: n
      }),
      ...(r.length > 0 && {
        hard_deny: r
      }),
      ...(o.length > 0 && {
        environment: o
      })
    };
  }
  return;
}
function rawSettingsContainsKey(e) {
  let t = $2();
  for (let n of rvt(t)) {
    if (n === "policySettings") continue;
    if (n === "flagSettings" && t.flagExpectedContent !== undefined) {
      let o = ba(t.flagExpectedContent, false);
      if (o && typeof o === "object" && e in o) return true;
      continue;
    }
    let r = dCe(n, t);
    if (!r) continue;
    try {
      let {
          resolvedPath: o
        } = Nd(Wt(), r),
        s = Ov(o);
      if (!s.trim()) continue;
      let i = ba(s, false);
      if (i && typeof i === "object" && e in i) return true;
    } catch (o) {
      svt(o, r);
    }
  }
  return false;
}
var Roe, getSettings_DEPRECATED, $Qc;
var yr = b(() => {
  vyr();
  Qr();
  lt();
  mn();
  kt();
  qe();
  Ct();
  Xl();
  GN();
  ps();
  YTr();
  pd();
  vn();
  Es();
  tn();
  z9();
  wm();
  won();
  qK();
  ZEe();
  fCe();
  tNe();
  lk();
  lk();
  eNe();
  bsn();
  h3();
  eNe();
  eNe();
  Roe = require("path");
  getSettings_DEPRECATED = getInitialSettings;
  $Qc = ve(() => C.object({
    allow: C.array(C.string()).optional(),
    soft_deny: C.array(C.string()).optional(),
    hard_deny: C.array(C.string()).optional(),
    deny: C.array(C.string()).optional(),
    environment: C.array(C.string()).optional()
  }));
});

export {y7 as VK,$2 as l2,getSettingsRootPathForSource,getSettingsFilePathForSource,projectSettingsAliasesUserSettings,getLocalSettingsValidationErrors,parseRemoteManagedSettings,loadManagedFileSettings,getSettingsForSource,getAllPolicyTierSettings,getInitialSettings,getSettingsWithSources,getEffectiveSettingSource,getSettingsWithErrors,getManagedFileSettingsPresence,FQc as tcu,getBasePolicySettings,getBasePolicySettingsOrigin,getPolicySettingsOrigin,getPolicySettingsLoadErrors,getAdminPolicyLoadErrors,getFatalAdminPolicyLoadErrors,filterFatalPolicyErrors,hasSurvivingAdminPolicySource,surfaceManagedSettingsErrorsHeadless,updateSettingsForSource as ao,getManagedSettingsKeysForLogging,getSettingsAfterPluginLoad,getSecuritySensitiveSetting,hasSkipDangerousModePermissionPrompt,hasSkipWorkflowUsageWarning,hasIsolatePeerMachines,hasDisableClaudeAiConnectors,hasAutoModeOptIn,getUseAutoModeDuringPlan,getAutoModeConfig,rawSettingsContainsKey,Roe,getSettings_DEPRECATED,$Qc as rcu,yr as br};
