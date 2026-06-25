// @ts-nocheck
import {withOAuth401Retry as g0,kk as uk} from "../api/2037_withOAuth401Retry.ts";
import {Vs as ei,lT as dT} from "../../vendor/m2195.ts";
import {He,xe as Pe,mn as cn} from "./0600_feature_name.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {isConsumerSubscriber as CBe,getOauthAccountInfo as Ic,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {writeToStderr as nGe,LP as iO} from "../../vendor/m232.ts";
import {gracefulShutdown as Pi,isAmberSentinelEnabled as Km} from "../config/3348_flushAnalyticsSinks.ts";
import {b} from "../../runtime.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
// @ts-nocheck
async function oa4() {
  try {
    await g0(async () => {
      let e = await ei.post("/api/oauth/account/grove_notice_viewed", {});
      if (!e.ok) throw Error(`Failed to mark Grove notice viewed: ${e.reason}`);
      return e;
    }), Lee.cache.clear?.(), He("api_grove_notice_mark_viewed");
  } catch (e) {
    v(`Failed to mark Grove notice viewed: ${e instanceof Error ? e.message : String(e)}`, {
      level: "error"
    }), Pe("api_grove_notice_mark_viewed", "request_failed");
  }
}
async function R0n(e) {
  try {
    await g0(async () => {
      let t = await ei.patch("/api/oauth/account/settings", {
        grove_enabled: e
      });
      if (!t.ok) throw Error(`Failed to update Grove settings: ${t.reason}`);
      return t;
    }), Lee.cache.clear?.(), He("api_grove_settings_update");
  } catch (t) {
    v(`updateGroveSettings failed: ${String(t)}`, {
      level: "error"
    }), Pe("api_grove_settings_update", "request_failed");
  }
}
async function nst() {
  if (!CBe()) return false;
  let e = Ic()?.accountUuid;
  if (!e) return false;
  let n = vt().groveConfigCache?.[e],
    r = Date.now();
  if (!n) return v("Grove: No cache, fetching config in background (dialog skipped this session)"), xla(e), false;
  if (r - n.timestamp > kla) return v("Grove: Cache stale, returning cached data and refreshing in background"), xla(e), n.grove_enabled;
  return v("Grove: Using fresh cached config"), n.grove_enabled;
}
async function xla(e) {
  try {
    let t = await Eke();
    if (!t.success) return;
    let n = t.data.grove_enabled,
      r = vt().groveConfigCache?.[e];
    if (r?.grove_enabled === n && Date.now() - r.timestamp <= kla) return;
    un(o => ({
      ...o,
      groveConfigCache: {
        ...o.groveConfigCache,
        [e]: {
          grove_enabled: n,
          timestamp: Date.now()
        }
      }
    }));
  } catch (t) {
    v(`Grove: Failed to fetch and store config: ${t}`);
  }
}
function EJr(e, t, n) {
  if (!e.success || !t.success) return false;
  let r = e.data,
    o = t.data;
  if (r.grove_enabled !== null) return false;
  if (n) return true;
  if (!o.notice_is_grace_period) return true;
  let i = o.notice_reminder_frequency;
  if (i !== null && r.grove_notice_viewed_at) {
    let a = new Date(r.grove_notice_viewed_at).getTime();
    if (isNaN(a)) return Ie(Error(`Invalid grove_notice_viewed_at from API: ${r.grove_notice_viewed_at}`)), true;
    return Math.floor((Date.now() - a) / 86400000) >= i;
  } else {
    let a = r.grove_notice_viewed_at;
    return a === null || a === undefined;
  }
}
async function Ila() {
  let [e, t] = await Promise.all([Lee(), Eke()]);
  if (EJr(e, t, false)) {
    let r = t.success ? t.data : null;
    if (j("tengu_grove_print_viewed", {
      dismissable: r?.notice_is_grace_period
    }), r === null || r.notice_is_grace_period) nGe(`
An update to our Consumer Terms and Privacy Policy will take effect on October 8, 2025. Run \`claude\` to review the updated terms.

`), await oa4();else nGe(`
[ACTION REQUIRED] An update to our Consumer Terms and Privacy Policy has taken effect on October 8, 2025. You must run \`claude\` to review the updated terms.

`), await Pi(1);
  }
}
var kla = 86400000,
  Hla = 3000,
  Lee,
  Eke;
var rst = b(() => {
  na();
  Ct();
  mo();
  je();
  Km();
  iO();
  nr();
  uk();
  wn();
  cn();
  dT();
  Lee = bn(async () => {
    try {
      return {
        success: true,
        data: (await g0(async () => {
          let t = await ei.get("/api/oauth/account/settings", {
            timeout: Hla
          });
          if (!t.ok) throw Error(`Failed to get Grove settings: ${t.reason}`);
          return t;
        })).data
      };
    } catch (e) {
      if (!(e instanceof Error) || !/data-residency|essential-traffic-only|no-auth/.test(e.message)) v(`Failed to fetch Grove settings: ${e}`, {
        level: "error"
      });
      return Lee.cache.clear?.(), {
        success: false
      };
    }
  });
  Eke = bn(async () => {
    try {
      let e = await g0(async () => {
          let s = await ei.get("/api/claude_code_grove", {
            timeout: Hla
          });
          if (!s.ok) throw Error(`Failed to fetch Grove notice config: ${s.reason}`);
          return s;
        }),
        {
          grove_enabled: t,
          domain_excluded: n,
          notice_is_grace_period: r,
          notice_reminder_frequency: o
        } = e.data;
      return {
        success: true,
        data: {
          grove_enabled: t,
          domain_excluded: n ?? false,
          notice_is_grace_period: r ?? true,
          notice_reminder_frequency: o
        }
      };
    } catch (e) {
      return v(`Failed to fetch Grove notice config: ${e}`), {
        success: false
      };
    }
  });
});
export {oa4 as rno,R0n as oLn,nst as Sat,xla as Zga,EJr as ono,Ila as n_a,kla as e_a,Hla as t_a,Lee as Uee,Eke as RIe,rst as bat};
