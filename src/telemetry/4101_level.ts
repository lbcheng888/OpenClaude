// @ts-nocheck
import {getDynamicConfig_CACHED_MAY_BE_STALE as HO,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {isClaudeAISubscriber as Co,getSubscriptionType as da,isConsumerSubscriber as CBe,getOauthAccountInfo as Ic,lo as mo} from "../config/2036_withOAuthRefreshLock.ts";
import {oE as CO,RM as V3} from "../../vendor/m1289.ts";
import {Vs as ei,lT as dT} from "../../vendor/m2195.ts";
import {Pt as Bt,He,xe as Pe,mn as cn} from "./0600_feature_name.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {jt as Tn} from "../../vendor/m253.ts";
import {b} from "../../runtime.ts";
import {MS as dw} from "../../vendor/m460.ts";
import {ve as Re} from "../../vendor/m461.ts";
// @ts-nocheck
function oa4() {
  let H = HO(jbp, null);
  if (H === null || H === undefined) return null;
  if (eqe === null || eqe.raw !== H) {
    let n = Wbp().safeParse(H);
    if (!n.success) v(`Promo campaign payload failed validation: ${n.error.message}`, {
      level: "warn"
    });
    eqe = n.success ? {
      raw: H,
      campaign: n.data,
      startsAtMs: Date.parse(n.data.startsAt),
      endsAtMs: Date.parse(n.data.endsAt)
    } : {
      raw: H,
      campaign: null,
      startsAtMs: 0,
      endsAtMs: 0
    };
  }
  if (eqe.campaign === null) return null;
  let K = Date.now();
  if (K < eqe.startsAtMs) return null;
  if (K > eqe.endsAtMs) return null;
  return eqe.campaign;
}
function OUn() {
  return oa4()?.command ?? null;
}
function Gbp(e) {
  if (!Co()) return "excluded";
  let t = da();
  if (!t) return "excluded";
  if (e.creditless) return "viewer";
  if (CBe()) return "claimant";
  if (t === "team") {
    if (!Ic()?.organizationRole) return "excluded";
    return CO() ? "claimant" : "viewer";
  }
  return "excluded";
}
function s$t() {
  let e = oa4();
  if (!e) return null;
  let t = Ic()?.organizationUuid;
  if (!t) return null;
  let n = Gbp(e);
  if (n === "excluded") return null;
  if (n === "claimant" && Ybp(t, e.feature)) return null;
  return {
    campaign: e,
    orgId: t,
    audience: n
  };
}
function LUn(e) {
  let t = OUn();
  return t !== null && e === t;
}
function MUn(e) {
  return LUn(e) && tIe();
}
function tIe() {
  let e = s$t();
  if (!e || e.audience !== "claimant") return false;
  if (!e.campaign.command) return false;
  let t = PUn(e.orgId, e.campaign.feature);
  return t !== null && t.eligible && t.available;
}
function cct() {
  let e = s$t();
  if (!e || e.audience !== "viewer") return false;
  if (!e.campaign.command) return false;
  return !Jbp(e.orgId, e.campaign.feature);
}
function Kge() {
  let e = oa4(),
    t = Ic()?.organizationUuid;
  if (!e || !t) return null;
  let n = PUn(t, e.feature);
  if (!n || n.amount_minor_units === null || !n.currency) return null;
  return {
    amountMinorUnits: n.amount_minor_units,
    currency: n.currency
  };
}
function NUn() {
  return Zio ??= Vbp().catch(e => (v(`FotW eligibility refresh failed: ${e}`, {
    level: "warn"
  }), null)).finally(() => {
    Zio = null;
  }), Zio;
}
async function Vbp() {
  let e = s$t();
  if (!e || e.audience !== "claimant") return null;
  let {
    campaign: t,
    orgId: n
  } = e;
  if (PUn(n, t.feature) !== null) return null;
  let r;
  try {
    r = await ei.get(`/api/oauth/organizations/:orgUUID/overage_credit_grant?campaign=${uBa}`, {
      auth: "teleport-org",
      timeout: 1e4,
      validateStatus: o => o < 500
    });
  } catch (o) {
    return Bt("api_fotw_eligibility_fetch", "request_failed"), v(`FotW eligibility fetch failed: ${o}`, {
      level: "warn"
    }), null;
  }
  if (!r.ok || r.status >= 400) return Bt("api_fotw_eligibility_fetch", "unavailable"), null;
  if (He("api_fotw_eligibility_fetch"), r.data.granted) mBa(n, t.feature);
  if (r.data.eligible && r.data.needs_payment_setup === true) {
    if (r.data.amount_minor_units == null || !r.data.currency) return null;
    return {
      amountMinorUnits: r.data.amount_minor_units,
      currency: r.data.currency
    };
  }
  if (PUn(n, t.feature) !== null) return null;
  return ABa(n, t.feature, {
    available: r.data.available,
    eligible: r.data.eligible,
    granted: r.data.granted,
    amount_minor_units: r.data.amount_minor_units ?? null,
    currency: r.data.currency ?? null
  }, {
    onlyIfAbsent: true
  }), null;
}
function PUn(e, t) {
  let r = vt().fotwEligibilityCache?.[e]?.[t];
  if (!r) return null;
  if (Date.now() - r.timestamp > dBa) return null;
  return r.info;
}
async function pBa(e) {
  if (!MUn(e)) return {
    outcome: "skipped"
  };
  let t = s$t();
  if (!t) return {
    outcome: "skipped"
  };
  let {
      campaign: n,
      orgId: r
    } = t,
    o = Kge(),
    s;
  try {
    s = await ei.post("/api/oauth/organizations/:orgUUID/overage_credit_grant", {
      campaign: uBa,
      feature: n.feature,
      enable_overages: true
    }, {
      auth: "teleport-org",
      timeout: 60000,
      validateStatus: i => i < 500
    });
  } catch (i) {
    return Pe("api_fotw_claim", "request_failed"), v(`FotW claim failed: ${i}`, {
      level: "warn"
    }), {
      outcome: "failed"
    };
  }
  if (!s.ok) return {
    outcome: "failed"
  };
  if (s.status >= 400) {
    if (zbp(s.data) === "Failed to grant credit") return Pe("api_fotw_claim", "grant_failed"), {
      outcome: "failed"
    };
    return Bt("api_fotw_claim", "not_available"), ABa(r, n.feature, {
      available: false,
      eligible: false,
      granted: false,
      amount_minor_units: null,
      currency: null
    }), {
      outcome: "not_available"
    };
  }
  if (!s.data.success) return Pe("api_fotw_claim", "grant_failed"), {
    outcome: "failed"
  };
  return He("api_fotw_claim"), mBa(r, n.feature), {
    outcome: "granted",
    amountMinorUnits: s.data.amount_minor_units ?? o?.amountMinorUnits ?? 0,
    currency: s.data.currency ?? o?.currency ?? "USD",
    expiresAt: s.data.expires_at ?? null
  };
}
function zbp(e) {
  let t = Kbp().safeParse(e);
  return t.success ? t.data.error.message : undefined;
}
function Ybp(e, t) {
  let n = vt().fotwClaimedFeatures;
  return Boolean(n?.[e]?.includes(t));
}
function mBa(e, t) {
  un(n => {
    let r = n.fotwClaimedFeatures?.[e] ?? [];
    if (r.includes(t)) return n;
    return {
      ...n,
      fotwClaimedFeatures: {
        ...n.fotwClaimedFeatures,
        [e]: [...r, t]
      }
    };
  });
}
function Jbp(e, t) {
  let n = vt().fotwUpsellFulfilled;
  return Boolean(n?.[e]?.includes(t));
}
function fBa(e) {
  let t = s$t();
  if (!t || t.audience !== "viewer" || !LUn(e)) return;
  let {
    orgId: n,
    campaign: r
  } = t;
  un(o => {
    let s = o.fotwUpsellFulfilled?.[n] ?? [];
    if (s.includes(r.feature)) return o;
    return {
      ...o,
      fotwUpsellFulfilled: {
        ...o.fotwUpsellFulfilled,
        [n]: [...s, r.feature]
      }
    };
  });
}
function ABa(e, t, n, {
  onlyIfAbsent: r = false
} = {}) {
  un(o => {
    let s = o.fotwEligibilityCache?.[e]?.[t],
      i = s && Date.now() - s.timestamp <= dBa;
    if (r && i) return o;
    if (s && s.info.available === n.available && s.info.eligible === n.eligible && s.info.granted === n.granted && s.info.amount_minor_units === n.amount_minor_units && s.info.currency === n.currency && i) return o;
    return {
      ...o,
      fotwEligibilityCache: {
        ...o.fotwEligibilityCache,
        [e]: {
          ...o.fotwEligibilityCache?.[e],
          [t]: {
            info: n,
            timestamp: Date.now()
          }
        }
      }
    };
  });
}
var jbp = "tengu_lilac_loom",
  uBa = "feature_of_the_week",
  dBa = 86400000,
  cBa = () => Tn.string().refine(e => !Number.isNaN(Date.parse(e)) && /(z|[+-]\d{2}:?\d{2})$/i.test(e), "must be ISO 8601 with timezone, e.g. 2026-06-04T16:00:00Z"),
  DUn = () => Tn.string().optional().transform(e => e === "" ? undefined : e),
  Wbp,
  eqe = null,
  Zio = null,
  Kbp;
var uct = b(() => {
  dw();
  mo();
  V3();
  nr();
  je();
  cn();
  Yn();
  dT();
  Wbp = Re(() => Tn.object({
    feature: Tn.string().min(1),
    command: Tn.string().optional().transform(e => e === "" ? undefined : e),
    startsAt: cBa(),
    endsAt: cBa(),
    hideCommandChip: Tn.boolean().optional(),
    creditless: Tn.boolean().optional(),
    titleLabel: DUn(),
    commandBlurb: DUn(),
    tipBlurb: DUn(),
    isTopPriorityAnnouncement: Tn.boolean().optional(),
    announcementLines: Tn.array(Tn.object({
      text: Tn.string(),
      style: Tn.enum(["bold", "dim"]).optional()
    })).optional().transform(e => {
      let t = e?.filter(n => n.text !== "");
      return t?.length ? t : undefined;
    }).catch(undefined),
    tips: Tn.array(Tn.string()).optional().transform(e => {
      let t = e?.filter(Boolean);
      return t?.length ? t : undefined;
    }).catch(undefined),
    redeemBy: DUn()
  }));
  Kbp = Re(() => Tn.object({
    error: Tn.object({
      message: Tn.string()
    })
  }));
});
export {oa4 as wY,OUn as i4n,Gbp as pOp,s$t as u4t,LUn as a4n,MUn as l4n,tIe as kxe,cct as Xdt,Kge as Hye,NUn as c4n,Vbp as mOp,PUn as s4n,pBa as c5a,zbp as hOp,Ybp as gOp,mBa as u5a,Jbp as _Op,fBa as d5a,ABa as p5a,jbp as uOp,uBa as a5a,dBa as l5a,cBa as i5a,DUn as o4n,Wbp as dOp,eqe as Y6e,Zio as $mo,Kbp as fOp,uct as Qdt};
