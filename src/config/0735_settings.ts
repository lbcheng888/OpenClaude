// @ts-nocheck
import {Tw,mf} from "../../vendor/m702.ts";
import {RR,h7} from "../../vendor/m704.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {XM,_be} from "../../vendor/m705.ts";
import {ZX,Xmr} from "../../vendor/m631.ts";
import {jt,jp,ws} from "../../vendor/m228.ts";
import {dn,Pn,bt} from "../../vendor/m195.ts";
import {logForDebugging,qe} from "./0234_setHasFormattedOutput.ts";
import {_2o,y2o,i2o,a2o,h2o,g2o,CKt,hH,EKt,f_,Kx} from "../../vendor/m128.ts";
import {cB,Xt} from "./0228_encoding.ts";
import {Upe,cKe,xEt} from "../../vendor/m733.ts";
import {fhr,RB,J3} from "../artifact/0731_allow.ts";
import {Mpe,iEt} from "../../vendor/m712.ts";
import {ER,bB} from "../../vendor/m634.ts";
import {Fa,Pd} from "../../vendor/m701.ts";
import {tr,sn} from "./0047_namespace.ts";
import {st} from "../../vendor/m5.ts";
import {Xtn,xts} from "../../vendor/m711.ts";
import {fs} from "../api/0459_getOauthConfig.ts";
import {kn,SA} from "./0689_timestamp.ts";
import {b} from "../../runtime.ts";
function HEt(e: any): any {
  let t = new Set(e.allowedSources);
  return t.add("flagSettings"), t.add("policySettings"), Tw.filter((n: any) => t.has(n));
}
function EQc(): any {
  return o1.join(RR(), "managed-settings.json");
}
function IEt(e: any): any {
  if (zt() === "wsl" && e.wslInherits?.()) {
    let t = loadManagedFileSettingsFromDir(XM);
    if (t.settings) return t;
    let n = loadManagedFileSettingsFromDir(RR());
    return {
      settings: n.settings,
      errors: [...t.errors, ...n.errors]
    };
  }
  return loadManagedFileSettingsFromDir(RR());
}
function loadManagedFileSettingsFromDir(e: any): any {
  let t: any[] = [],
    n: any = {},
    r = !1,
    {
      settings: o,
      errors: s
    } = parseSettingsFile(o1.join(e, "managed-settings.json"), void 0, !0);
  if (t.push(...s), o && Object.keys(o).length > 0) n = ZX(n, o, settingsMergeCustomizer), r = !0;
  let i = o1.join(e, "managed-settings.d");
  try {
    let c = jt().readdirSync(i).filter((u: any) => (u.isFile() || u.isSymbolicLink()) && u.name.endsWith(".json") && !u.name.startsWith(".")).map((u: any) => u.name).sort();
    for (let u of c) {
      let {
        settings: d,
        errors: p
      } = parseSettingsFile(o1.join(i, u), void 0, !0);
      if (t.push(...p), d && Object.keys(d).length > 0) n = ZX(n, d, settingsMergeCustomizer), r = !0;
    }
  } catch (c) {
    let u = dn(c);
    if (u !== "ENOENT" && u !== "ENOTDIR") logForDebugging(`managed-settings.d read failed: ${c}`, {
      level: "error"
    });
  }
  let {
    wslInheritsWindowsSettings: a,
    ...l
  } = n;
  return {
    settings: r && Object.keys(l).length > 0 ? n : null,
    errors: t
  };
}
function handleFileSystemError(e: any, t: any): void {
  if (Pn(e)) logForDebugging(`Broken symlink or missing file encountered for settings.json at path: ${t}`);else logForDebugging(`settings file read failed at ${t}: ${e}`, {
    level: "error"
  });
}
function parseSettingsFile(e: any, t: any, n: any): any {
  let r = _2o(e);
  if (r) return {
    settings: r.settings ? cB(r.settings) : null,
    errors: r.errors
  };
  let o = parseSettingsFileUncached(e, t, n);
  return y2o(e, o), {
    settings: o.settings ? cB(o.settings) : null,
    errors: o.errors
  };
}
function jns(e: any): any {
  if (!e.mdm) return {
    settings: null,
    errors: []
  };
  let t = e.mdm();
  return {
    settings: Object.keys(t.settings).length > 0 ? t.settings : null,
    errors: t.errors
  };
}
function Rbe(e: any, t: any): any {
  let n = cB(e),
    r = Upe(n, t, {
      skipMcpServerEntryFilter: !0
    }),
    o: any[] = [],
    s = fhr((i: any) => o.push({
      file: t,
      path: i.path,
      message: i.message,
      severity: "warning"
    })).safeParse(n);
  if (!s.success) return {
    settings: null,
    errors: [...r, ...cKe(s.error, t)]
  };
  return {
    settings: Object.keys(s.data).length > 0 ? s.data : null,
    errors: [...r, ...o]
  };
}
function xbe(e: any): any {
  let t = e?.remote ? e.remote() : Mpe();
  if (!t || Object.keys(t).length === 0) return {
    settings: null,
    errors: []
  };
  return Rbe(t, "remote managed settings");
}
function Dnn(e: any): any {
  let t = e.parentManaged;
  if (!t || Object.keys(t).length === 0) return {
    settings: null,
    errors: []
  };
  return Rbe(t, "parent managed settings");
}
function Wns(e: any): any {
  let t = e.flagInline;
  if (!t) return {
    settings: null,
    errors: []
  };
  let n = cB(t),
    r = Upe(n, "SDK inline settings"),
    o = RB().safeParse(n);
  if (!o.success) return {
    settings: null,
    errors: [...r, ...cKe(o.error, "SDK inline settings")]
  };
  return {
    settings: o.data,
    errors: r
  };
}
function parseSettingsFileUncached(e: any, t: any, n: any): any {
  try {
    let r: any;
    if (t !== void 0) r = t;else {
      let {
        resolvedPath: a
      } = jp(jt(), e);
      r = ER(a);
    }
    if (r.trim() === "") return {
      settings: {},
      errors: []
    };
    let o = cB(Fa(r, !1));
    if (n) {
      let a = Upe(o, e, {
          skipMcpServerEntryFilter: !0
        }),
        l: any[] = [],
        c = fhr((u: any) => l.push({
          file: e,
          path: u.path,
          message: u.message,
          severity: "warning"
        })).safeParse(o);
      if (!c.success) return {
        settings: null,
        errors: [...a, ...cKe(c.error, e)]
      };
      return {
        settings: c.data,
        errors: [...a, ...l]
      };
    }
    let s = Upe(o, e),
      i = RB().safeParse(o);
    if (!i.success) {
      let a = cKe(i.error, e);
      return {
        settings: null,
        errors: [...s, ...a]
      };
    }
    return {
      settings: i.data,
      errors: s
    };
  } catch (r) {
    if (handleFileSystemError(r, e), Pn(r)) return {
      settings: null,
      errors: []
    };
    return {
      settings: null,
      errors: [{
        file: e,
        path: "",
        message: `Settings file could not be read: ${r instanceof Error ? r.message : String(r)}`,
        severity: "fatal"
      }]
    };
  }
}
function Inn(e: any, t: any): any {
  switch (e) {
    case "userSettings":
      return o1.resolve(tr());
    case "policySettings":
    case "projectSettings":
    case "localSettings":
      return o1.resolve(t.cwd);
    case "flagSettings":
      return t.flagPath ? o1.dirname(o1.resolve(t.flagPath)) : o1.resolve(t.cwd);
  }
}
function CQc(e: any): any {
  if (e.coworkPlugins || st(process.env.CLAUDE_CODE_USE_COWORK_PLUGINS)) return "cowork_settings.json";
  return "settings.json";
}
function kbe(e: any, t: any): any {
  switch (e) {
    case "userSettings":
      return o1.join(Inn(e, t), CQc(t));
    case "projectSettings":
    case "localSettings":
      return o1.join(Inn(e, t), getRelativeSettingsFilePathForSource(e));
    case "policySettings":
      return EQc();
    case "flagSettings":
      return t.flagPath;
  }
}
function getRelativeSettingsFilePathForSource(e: any): any {
  switch (e) {
    case "projectSettings":
      return o1.join(".claude", "settings.json");
    case "localSettings":
      return o1.join(".claude", "settings.local.json");
  }
}
function Pnn(e: any, t: any): any {
  let n = i2o(e);
  if (n !== void 0) return n;
  let r = bhr(e, t);
  return a2o(e, r), r;
}
function shouldIncludeParentTier(e: any): any {
  return !e || e.parentSettingsBehavior === "merge";
}
function keepRestrictiveFromParent(e: any, t: any): any {
  let n: any = {};
  if (e.allowManagedHooksOnly === !0) n.allowManagedHooksOnly = !0;
  if (e.allowManagedMcpServersOnly === !0) n.allowManagedMcpServersOnly = !0;
  if (e.disableClaudeAiConnectors === !0) n.disableClaudeAiConnectors = !0;
  if (e.allowManagedPermissionRulesOnly === !0) n.allowManagedPermissionRulesOnly = !0;
  let r = e.strictPluginOnlyCustomization;
  if (r === !0 || Array.isArray(r) && r.length > 0) n.strictPluginOnlyCustomization = r;
  if (e.deniedMcpServers) n.deniedMcpServers = e.deniedMcpServers;
  if (t.forceLoginOrgUUID === void 0 && e.forceLoginOrgUUID) n.forceLoginOrgUUID = e.forceLoginOrgUUID;
  if (t.allowedMcpServers === void 0 && e.allowedMcpServers) n.allowedMcpServers = e.allowedMcpServers;
  if (t.availableModels === void 0 && e.availableModels) n.availableModels = e.availableModels;
  if (e.enforceAvailableModels === !0) n.enforceAvailableModels = !0;
  if (e.permissions) {
    let o = Xtn(e.permissions, ["deny", "ask"]);
    if (e.permissions.disableBypassPermissionsMode === "disable") o.disableBypassPermissionsMode = "disable";
    if (t.allowManagedPermissionRulesOnly !== !0) {
      let {
        allow: s,
        additionalDirectories: i
      } = e.permissions;
      if (s && t.sandbox?.network?.allowManagedDomainsOnly !== !0) o.allow = s;
      if (i) o.additionalDirectories = i;
    }
    if (Object.keys(o).length > 0) n.permissions = o;
  }
  if (e.sandbox) {
    let {
        network: o,
        filesystem: s
      } = e.sandbox,
      i: any = {};
    if (e.sandbox.enabled === !0) i.enabled = !0;
    if (e.sandbox.failIfUnavailable === !0) i.failIfUnavailable = !0;
    if (e.sandbox.allowUnsandboxedCommands === !1) i.allowUnsandboxedCommands = !1;
    if (e.sandbox.autoAllowBashIfSandboxed === !1) i.autoAllowBashIfSandboxed = !1;
    if (o) {
      let a = Xtn(o, ["deniedDomains"]);
      if (o.allowManagedDomainsOnly === !0) a.allowManagedDomainsOnly = !0;
      if (t.sandbox?.network?.allowManagedDomainsOnly !== !0 && o.allowedDomains) a.allowedDomains = o.allowedDomains;
      if (Object.keys(a).length > 0) i.network = a;
    }
    if (s) {
      let a = Xtn(s, ["denyRead", "denyWrite"]);
      if (s.allowManagedReadPathsOnly === !0) a.allowManagedReadPathsOnly = !0;
      if (t.sandbox?.filesystem?.allowManagedReadPathsOnly !== !0 && s.allowRead) a.allowRead = s.allowRead;
      if (Object.keys(a).length > 0) i.filesystem = a;
    }
    if (Object.keys(i).length > 0) n.sandbox = i;
  }
  return n;
}
function Gns(e: any): any {
  let t = h2o();
  if (t !== void 0) return t;
  let n = vQc(e);
  return g2o(n), n;
}
function isAdminPolicyOrigin(e: any): any {
  return e === "helper" || e === "plist" || e === "hklm" || e === "file";
}
function Onn(e: any): any {
  if (e.helper?.()) return "helper";
  if (xbe(e).settings) return "remote";
  if (jns(e).settings) return zt() === "macos" ? "plist" : "hklm";
  if ((e.file?.() ?? IEt(e)).settings) return "file";
  if (Shr(e).parentSlice) return "parent";
  let t = e.hkcu?.();
  return t && Object.keys(t.settings).length > 0 ? "hkcu" : null;
}
function Shr(e: any): any {
  let t: any[] = [],
    {
      settings: n,
      errors: r
    } = xbe(e);
  t.push(...r);
  let {
    settings: o,
    errors: s
  } = jns(e);
  t.push(...s);
  let {
    settings: i,
    errors: a
  } = e.file?.() ?? IEt(e);
  t.push(...a);
  let {
    settings: l,
    errors: c
  } = Dnn(e);
  t.push(...c);
  let u = [n, o, i].filter((A: any) => A !== null),
    d = u[0] ?? null,
    p = {
      allowManagedPermissionRulesOnly: u.some((A: any) => A.allowManagedPermissionRulesOnly === !0) || void 0,
      forceLoginOrgUUID: u.find((A: any) => A.forceLoginOrgUUID !== void 0)?.forceLoginOrgUUID,
      allowedMcpServers: u.find((A: any) => A.allowedMcpServers !== void 0)?.allowedMcpServers,
      availableModels: u[0]?.availableModels,
      sandbox: {
        network: {
          allowManagedDomainsOnly: u.some((A: any) => A.sandbox?.network?.allowManagedDomainsOnly === !0) || void 0
        },
        filesystem: {
          allowManagedReadPathsOnly: u.some((A: any) => A.sandbox?.filesystem?.allowManagedReadPathsOnly === !0) || void 0
        }
      }
    },
    m = l && shouldIncludeParentTier(d) ? keepRestrictiveFromParent(l, p) : null,
    f = m && Object.keys(m).length > 0 ? m : null;
  return {
    tiers: u,
    admin: d,
    parentSlice: f,
    errors: t
  };
}
function vQc(e: any): any {
  let t = e.helper?.();
  if (t) return [t];
  let {
    tiers: n,
    parentSlice: r
  } = Shr(e);
  return r ? [...n, r] : n;
}
function Vns(e: any): any {
  let t = e.helper?.();
  if (t) return {
    settings: t,
    errors: e.helperWarnings?.() ?? []
  };
  let {
    admin: n,
    parentSlice: r,
    errors: o
  } = Shr(e);
  if (!n && !r) {
    let s = e.hkcu?.();
    if (s && Object.keys(s.settings).length > 0) return {
      settings: s.settings,
      errors: [...o, ...s.errors]
    };
    return {
      settings: null,
      errors: [...o, ...(s?.errors ?? [])]
    };
  }
  return {
    settings: ZX({}, r ?? {}, n ?? {}, settingsMergeCustomizer),
    errors: o
  };
}
function bhr(e: any, t: any): any {
  if (e === "policySettings") return Vns(t).settings;
  let n = kbe(e, t),
    {
      settings: r
    } = n ? parseSettingsFile(n, e === "flagSettings" ? t.flagExpectedContent : void 0) : {
      settings: null
    };
  if (e === "flagSettings") {
    let {
      settings: o
    } = Wns(t);
    if (o) return ZX(r || {}, o, settingsMergeCustomizer);
  }
  return r;
}
function wQc(e: any, t: any): any {
  return fs([...e, ...t]);
}
function settingsMergeCustomizer(e: any, t: any, n: any): any {
  if (Array.isArray(e) && Array.isArray(t)) {
    if (n === "fallbackModel") return t;
    return wQc(e, t);
  }
  return;
}
function Ehr(e: any): any {
  if (ghr) return {
    settings: {},
    errors: []
  };
  let t = Date.now();
  kn("info", "settings_load_started"), ghr = !0;
  try {
    let n = CKt(),
      r: any = {};
    if (n) r = ZX(r, n, settingsMergeCustomizer);
    let o: any[] = [],
      s = new Set(),
      i = new Set(),
      a = null;
    for (let l of HEt(e)) {
      if (l === "policySettings") {
        let {
          settings: u,
          errors: d
        } = Vns(e);
        if (a = u, u) r = ZX(r, u, settingsMergeCustomizer);
        for (let p of d) {
          let m = `${p.file}:${p.path}:${p.message}`;
          if (!s.has(m)) s.add(m), o.push(p);
        }
        continue;
      }
      let c = kbe(l, e);
      if (c) {
        let u = o1.resolve(c);
        if (!i.has(u)) {
          i.add(u);
          let {
            settings: d,
            errors: p
          } = parseSettingsFile(c, l === "flagSettings" ? e.flagExpectedContent : void 0);
          for (let m of p) {
            let f = `${m.file}:${m.path}:${m.message}`;
            if (!s.has(f)) s.add(f), o.push(m);
          }
          if (d) r = ZX(r, d, settingsMergeCustomizer);
        }
      }
      if (l === "flagSettings") {
        let {
          settings: u,
          errors: d
        } = Wns(e);
        for (let p of d) {
          let m = `${p.file}:${p.path}:${p.message}`;
          if (!s.has(m)) s.add(m), o.push(p);
        }
        if (u) r = ZX(r, u, settingsMergeCustomizer);
      }
    }
    if (a) {
      if (a.availableModels !== void 0) r.availableModels = [...a.availableModels];
      if (a.enforceAvailableModels !== void 0) r.enforceAvailableModels = a.enforceAvailableModels;
    }
    return kn("info", "settings_load_completed", {
      duration_ms: Date.now() - t,
      source_count: i.size,
      error_count: o.length
    }), {
      settings: r,
      errors: o
    };
  } finally {
    ghr = !1;
  }
}
function RQc(e: any): any {
  let t = hH();
  if (t !== null) return t;
  let n = Ehr(e);
  return EKt(n), n;
}
function xQc(e: any): any {
  let {
    settings: t
  } = RQc(e);
  return t || {};
}
function Kns(e: any): any {
  f_();
  let t: any[] = [];
  for (let n of HEt(e)) {
    let r = Pnn(n, e);
    if (r && Object.keys(r).length > 0) t.push({
      source: n,
      settings: r
    });
  }
  return {
    effective: xQc(e),
    sources: t
  };
}
function zns(e: any, t: any): any {
  let n = HEt(t);
  for (let r = n.length - 1; r >= 0; r--) {
    let o = n[r];
    if (Pnn(o, t)?.[e] !== void 0) return o;
  }
  return null;
}
var o1: any,
  ghr = !1;
var a1e = b(() => {
  Xmr();
  xts();
  iEt();
  qe();
  SA();
  sn();
  bt();
  bB();
  ws();
  Pd();
  qs();
  Xt();
  mf();
  h7();
  _be();
  Kx();
  J3();
  xEt();
  o1 = require("path");
});
export {HEt,EQc,IEt,loadManagedFileSettingsFromDir,handleFileSystemError,parseSettingsFile,jns,Rbe,xbe,Dnn,Wns,parseSettingsFileUncached,Inn,CQc,kbe,getRelativeSettingsFilePathForSource,Pnn,shouldIncludeParentTier,keepRestrictiveFromParent,Gns,isAdminPolicyOrigin,Onn,Shr,vQc,Vns,bhr,wQc,settingsMergeCustomizer,Ehr,RQc,xQc,Kns,zns,o1,ghr,a1e};
