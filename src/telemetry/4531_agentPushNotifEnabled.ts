// @ts-nocheck
import {getInitialSettings as Fr,ao,br} from "../config/0745_updateSettingsForSource.ts";
import {getGlobalConfig as Ot,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {isClaudeAISubscriber as Eo,lo} from "../config/2036_withOAuthRefreshLock.ts";
import {Vs,lT} from "../../vendor/m2195.ts";
import {qpl,Wpl} from "../../vendor/m4529.ts";
import {wn,pf} from "../config/0693_timestamp.ts";
import {Fb,Ct} from "../../vendor/m197.ts";
import {Pt,He,xe,mn} from "./0600_feature_name.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {b} from "../../runtime.ts";
import {lZ,q0} from "../../vendor/m2270.ts";
import {ig} from "../../vendor/m130.ts";
import {Ni} from "../../vendor/m127.ts";
// @ts-nocheck
/** Read agentPushNotifEnabled and inputNeededNotifEnabled from settings, falling back to global config. */
function Ypl() {
  let initialSettings = Fr(),
    globalConfig = Ot();
  return {
    agentPushNotifEnabled: initialSettings.agentPushNotifEnabled ?? globalConfig.agentPushNotifEnabled,
    inputNeededNotifEnabled: initialSettings.inputNeededNotifEnabled ?? globalConfig.inputNeededNotifEnabled
  };
}

/** Returns true if the current user is a Claude AI subscriber. */
function gAo() {
  return Eo();
}

/** Fetch notification preferences from the server. */
async function XYp() {
  if (!gAo()) return {
    ok: !1,
    reason: "no_auth"
  };
  try {
    let response = await Vs.get(Jpl, {
      timeout: Gpl
    });
    if (!response.ok) return {
      ok: !1,
      reason: "fetch_failed"
    };
    let parsed = qpl().safeParse(response.data);
    if (!parsed.success) return wn("warn", "notif_prefs_fetch_parse_failed", {
      issues: parsed.error.issues.map(issue => issue.path.join(".")).join(",")
    }), {
      ok: !1,
      reason: "parse_failed"
    };
    return {
      ok: !0,
      prefs: parsed.data
    };
  } catch (err) {
    let {
      kind: errKind
    } = Fb(err);
    return wn("warn", "notif_prefs_fetch_failed", {
      kind: errKind
    }), {
      ok: !1,
      reason: "fetch_failed"
    };
  }
}

/** Patch notification preferences on the server based on current local settings. */
async function QYp(body) {
  if (!gAo()) return;
  try {
    if (!(await Vs.patch(Jpl, body, {
      timeout: Gpl
    })).ok) {
      Pt("notif_prefs_patch", "no_auth");
      return;
    }
    wn("info", "notif_prefs_patch_ok", {}), He("notif_prefs_patch");
  } catch (err) {
    let {
      kind: errKind
    } = Fb(err);
    wn("warn", "notif_prefs_patch_failed", {
      kind: errKind
    }), xe("notif_prefs_patch", "http_error");
  }
}

/** Build and send a patch from local notification settings to the server. */
function _Ao() {
  let localPrefs = Ypl(),
    featurePreference = {};
  if (typeof localPrefs.agentPushNotifEnabled === "boolean") featurePreference.bogosort = {
    enable_push: localPrefs.agentPushNotifEnabled
  };
  if (typeof localPrefs.inputNeededNotifEnabled === "boolean") featurePreference.code_requires_action = {
    enable_push: localPrefs.inputNeededNotifEnabled
  };
  if (Object.keys(featurePreference).length === 0) return;
  QYp({
    preferences: {
      feature_preference: featurePreference
    }
  });
}

/** Hydrate local notification prefs state from server, seeding unset local settings from server values. */
async function Xpl() {
  if (!gAo()) {
    Pt("notif_prefs_hydrate", "no_auth"), I8t.setState(() => null), wn("info", "notif_prefs_hydrate_skipped", {
      reason: "no_auth"
    });
    return;
  }
  let fetchResult = await XYp();
  if (!fetchResult.ok) {
    xe("notif_prefs_hydrate", fetchResult.reason), I8t.setState(() => null), wn("info", "notif_prefs_hydrate_skipped", {
      reason: fetchResult.reason
    });
    return;
  }
  let serverPrefs = fetchResult.prefs,
    reachability = serverPrefs.push_reachability ?? null;
  if (I8t.setState(() => reachability), reachability) W("tengu_push_reachability", {
    has_active_channel: reachability.has_active_channel,
    platform_count: reachability.platforms.length
  });
  let featurePreference = serverPrefs.preferences?.feature_preference,
    serverBogosort = featurePreference?.bogosort?.enable_push,
    serverCodeRequiresAction = featurePreference?.code_requires_action?.enable_push,
    localPrefs = Ypl(),
    seedValues = {};
  if (localPrefs.agentPushNotifEnabled === void 0 && typeof serverBogosort === "boolean") seedValues.agentPushNotifEnabled = serverBogosort;
  if (localPrefs.inputNeededNotifEnabled === void 0 && typeof serverCodeRequiresAction === "boolean") seedValues.inputNeededNotifEnabled = serverCodeRequiresAction;
  if (wn("info", "notif_prefs_hydrate_result", {
    has_active_channel: reachability?.has_active_channel,
    server_bogosort: serverBogosort,
    server_code_requires_action: serverCodeRequiresAction,
    seeded: Object.keys(seedValues).length > 0
  }), Object.keys(seedValues).length === 0) {
    He("notif_prefs_hydrate");
    return;
  }
  ao("userSettings", seedValues), Vpl.emit(), He("notif_prefs_hydrate");
}
var Gpl = 1e4,
  I8t,
  Vpl,
  Kpl,
  zpl,
  jpl,
  Jpl = "/api/claude_code/notification/preferences";
var x8t = b(() => {
  lZ();
  lo();
  tr();
  pf();
  Ct();
  br();
  ig();
  mn();
  kt();
  lT();
  Wpl();
  I8t = q0(void 0), Vpl = Ni(), Kpl = I8t.getState, zpl = I8t.subscribe, jpl = Vpl.subscribe;
});

export {Ypl,gAo,XYp,QYp,_Ao,Xpl,Gpl,I8t,Vpl,Kpl,zpl,jpl,Jpl,x8t};
