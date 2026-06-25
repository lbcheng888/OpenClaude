// @ts-nocheck
import {Ne as Ge} from "../../vendor/m583.ts";
import {Vi as ta,$d as hp} from "../config/0620_$d.ts";
import {isPolicyAllowed as ii,Bu as sd} from "../../vendor/m2213.ts";
import {getAPIProvider as Hr,Ps as si} from "../api/1287_usesFirstPartyModelIds.ts";
import {getAuthHeaders as B8,withOAuth401Retry as g0,kk as uk} from "../api/2037_withOAuth401Retry.ts";
import {x1e as yMe,Ie,vn as wn} from "../session/0621_length.ts";
import {kc as Gc,lpe as gX,aA as QC} from "../../vendor/m234.ts";
import {qt as Wt,tn as Xt} from "../config/0230_encoding.ts";
import {getDebugLogPath as Fde,flushDebugLogs as Sor,logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {pk as Kx,ps as bs} from "../../vendor/m230.ts";
import {jul as Onl,Yul as Lnl} from "./4492_transcriptPath.ts";
import {loadAllSubagentTranscriptsFromDisk as Dgo,_a as za} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {uVn as tjn,Kk as vk,po as lo} from "../tools/5224_userPromptCount.ts";
import {getLastCancelledAPIMessageId as UOe,getLastAPIRequest as Ztr,lt as ct} from "../session/0132_sent.ts";
import {Hft as spt,SCo as Sgo} from "../../vendor/m4489.ts";
import {Pt as Bt,He,xe as Pe,mn as cn} from "../telemetry/0600_feature_name.ts";
import {Vs as ei,lT as dT} from "../../vendor/m2195.ts";
import {isCancel as cB,isAxiosError as nT} from "../../vendor/m573.ts";
import {__export as K_,Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Le as Ue,HN as gOe} from "../../vendor/m5.ts";
import {xr as Br,QT as BS} from "../../vendor/m1461.ts";
import {logEventTo1P as $Xe,GM as S1} from "../session/2203_shutdown1PEventLogging.ts";
import {or as sr,dn as an} from "../config/0137_namespace.ts";
import {k9e as r$e,pNt as mLt} from "../../vendor/m3072.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {_k as Xx} from "../core/0576_isCancel.ts";
// @ts-nocheck
function M6e() {
  if (Ge.DISABLE_FEEDBACK_COMMAND) return {
    kind: "disabled",
    reason: "/feedback has been disabled via the DISABLE_FEEDBACK_COMMAND environment variable"
  };
  if (Ge.DISABLE_BUG_COMMAND) return {
    kind: "disabled",
    reason: "/feedback has been disabled via the DISABLE_BUG_COMMAND environment variable"
  };
  if (ta()) return {
    kind: "disabled",
    reason: "/feedback has been disabled via the CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC environment variable"
  };
  if (!ii("allow_product_feedback")) return {
    kind: "disabled",
    reason: "/feedback has been disabled by your organization's policy"
  };
  switch (Hr()) {
    case "bedrock":
      return {
        kind: "bundle",
        cause: "provider",
        label: "Amazon Bedrock"
      };
    case "vertex":
      return {
        kind: "bundle",
        cause: "provider",
        label: "Vertex AI"
      };
    case "foundry":
      return {
        kind: "bundle",
        cause: "provider",
        label: "Microsoft Foundry"
      };
    case "anthropicAws":
      return {
        kind: "bundle",
        cause: "provider",
        label: "Claude Platform on AWS"
      };
    case "mantle":
      return {
        kind: "bundle",
        cause: "provider",
        label: "Amazon Bedrock (Mantle)"
      };
    case "gateway":
      return {
        kind: "bundle",
        cause: "provider",
        label: "an API gateway"
      };
    case "firstParty":
  }
  if (B8().error) return {
    kind: "bundle",
    cause: "no_creds",
    label: "no Anthropic credentials"
  };
  return {
    kind: "post"
  };
}
function isAlwaysFalse() {
  let e = M6e();
  switch (e.kind) {
    case "post":
    case "share":
      return null;
    case "disabled":
      return e.reason;
    case "bundle":
      if (e.cause === "no_creds") return `/feedback requires Anthropic credentials (OAuth or API key). Report issues at ${Mnl}`;
      return `/feedback is not available when using ${e.label}. Report issues at ${Mnl}`;
  }
}
function shouldShowNoToolVisibilityHint() {
  return yMe().map(e => {
    let t = {
      ...e
    };
    if (t && typeof t.error === "string") t.error = Gc(t.error);
    return t;
  });
}
function buildAntiVerbosityPrompt(model, t, n) {
  if (!model) return [];
  let r = model.split(`
`),
    o = [],
    s = [],
    i = new Set(),
    a = -1;
  for (let p of r) {
    if (!p) continue;
    let m;
    try {
      m = Wt(p);
    } catch {
      continue;
    }
    if (typeof m !== "object" || m === null) continue;
    if (m.type === "system" && m.subtype === "compact_boundary") {
      a = o.length;
      continue;
    }
    if (m.type !== "user" && m.type !== "assistant") continue;
    if (typeof m.uuid !== "string" || typeof m.timestamp !== "string" || m.isSidechain === true || !m.message) continue;
    if (n.has(m.uuid) || i.has(m.uuid)) continue;
    i.add(m.uuid), o.push(m.type === "user" ? {
      type: "user",
      uuid: m.uuid,
      timestamp: m.timestamp,
      message: m.message,
      ...(m.isMeta === true && {
        isMeta: true
      }),
      ...(m.toolUseResult !== undefined && {
        toolUseResult: m.toolUseResult
      }),
      ...(m.isCompactSummary === true && {
        isCompactSummary: true
      })
    } : {
      type: "assistant",
      uuid: m.uuid,
      timestamp: m.timestamp,
      message: m.message,
      requestId: m.requestId
    }), s.push(Buffer.byteLength(p));
  }
  if (a <= 0) return [];
  let l = 0,
    c = a,
    u = new Set();
  while (c > 0) {
    let p = s[c - 1];
    if (p === undefined) break;
    if (p > t) {
      u.add(c - 1), c--;
      continue;
    }
    if (l + p > t) break;
    l += p, c--;
  }
  let d = o.slice(c, a);
  return u.size === 0 ? d : d.filter((p, m) => !u.has(c + m));
}
function buildActionCautionPrompt(model, t) {
  let n;
  for (let a of model) {
    if (a.type === "user" && a.isCompactSummary === true) continue;
    if (n === undefined || a.timestamp < n) n = a.timestamp;
  }
  let r = [],
    o = [];
  for (let a of t) if (n === undefined || a.timestamp < n) r.push(a);else o.push(a);
  if (o.length === 0) return [...r, ...model];
  let s = model.findLastIndex(a => a.type === "user" && a.isCompactSummary === true),
    i = s === -1 ? model.length : s;
  return [...r, ...model.slice(0, i), ...o, ...model.slice(i)];
}
async function buildTaskContinuityPrompt() {
  let e = Fde();
  if (!e) return null;
  try {
    await Sor();
    let {
        content: t,
        bytesRead: n,
        bytesTotal: r
      } = await Kx(e, f4p),
      o = t;
    if (n < r) o = o.slice(o.indexOf(`
`) + 1), o = `[debug log truncated to last ${n} of ${r} bytes]
${o}`;
    return Gc(o);
  } catch {
    return null;
  }
}
async function buildHooksExplainerPrompt({
  messages: e,
  description: t,
  surface: n,
  scope: r = "session",
  backgroundTasks: o = {},
  transcripts: s = {},
  surveyFeedbackSource: i,
  excludeThirdPartyTranscripts: a
}) {
  let [l, c] = await Promise.all([Onl({
      messages: e,
      backgroundTasks: o,
      transcripts: s,
      diskSubagentTranscripts: Dgo(),
      scope: r,
      maxRawTranscriptBytes: m4p,
      excludeThirdPartyTranscripts: a
    }), buildTaskContinuityPrompt()]),
    u = tjn(e) === -1 ? [] : buildAntiVerbosityPrompt(l.rawTranscriptJsonl, A4p, new Set(e.map(A => A.uuid))),
    d = vk(e),
    p = u.length === 0 ? d : buildActionCautionPrompt(d, u),
    m = {
      latestAssistantMessageId: l.latestAssistantMessageId,
      latestAssistantAPIMessageId: l.latestAssistantAPIMessageId,
      lastInterruptedAssistantAPIMessageId: UOe(),
      message_count: e.length,
      datetime: new Date().toISOString(),
      description: t,
      surface: n,
      scope: r,
      platform: l.platform,
      gitRepo: l.isGit,
      commitSha: l.commitSha,
      terminal: l.terminal,
      version: l.version,
      transcript: p,
      errors: shouldShowNoToolVisibilityHint(),
      lastApiRequest: Ztr(),
      ...(Object.keys(l.subagentTranscripts).length > 0 && {
        subagentTranscripts: l.subagentTranscripts
      }),
      ...(l.rawTranscriptJsonl && {
        rawTranscriptJsonl: l.rawTranscriptJsonl
      }),
      ...(l.recentSessionTranscripts && {
        recentSessionTranscripts: l.recentSessionTranscripts
      }),
      ...(c && {
        debugLog: c
      }),
      ...(i && {
        survey_appearance_id: i.appearanceId,
        survey_response: i.response,
        survey_type: i.surveyType
      })
    },
    f = l.thirdPartyExclusions.recentSessions + l.thirdPartyExclusions.subagents + (l.thirdPartyExclusions.rawTranscript ? 1 : 0);
  if (u.length > 0) {
    if (spt(m, Rgo, xgo).length > vgo) return Bt("feedback_precompact", "over_payload_cap"), {
      payload: {
        ...m,
        transcript: d
      },
      thirdPartyDroppedCount: f
    };
    He("feedback_precompact");
  } else if (tjn(e) !== -1 && !l.thirdPartyExclusions.rawTranscript) Bt("feedback_precompact", "empty_recovery");
  return {
    payload: m,
    thirdPartyDroppedCount: f
  };
}
function getHeronBrookPromptOverride(e) {
  if (e instanceof Error) {
    let t = Error(Gc(e.message));
    if (e.stack) t.stack = Gc(e.stack);
    Ie(t);
  } else {
    let t = Gc(String(e));
    Ie(Error(t));
  }
}
async function buildAutonomyPrompt(model, t) {
  if (ta()) return {
    success: false
  };
  let n = 0;
  try {
    let r = spt(model, Rgo, xgo);
    if (n = r.length, n > vgo) return {
      success: false,
      payloadTooLarge: true,
      failureReason: "payload_too_large_precheck"
    };
    let o = await g0(() => ei.post("/api/claude_cli_feedback", r, {
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 30000,
      signal: t
    }));
    if (!o.ok) switch (o.reason) {
      case "essential-traffic-only":
        return {
          success: false
        };
      case "data-residency":
        return {
          success: false,
          failureReason: "data_residency"
        };
      case "no-auth":
        return {
          success: false,
          failureReason: "auth_error"
        };
    }
    if (o.status === 200) {
      if (o.data?.feedback_id) return {
        success: true,
        feedbackId: o.data.feedback_id
      };
      return getHeronBrookPromptOverride(Error("Failed to submit feedback: request did not return feedback_id")), {
        success: false,
        failureReason: "missing_feedback_id"
      };
    }
    let s = "Failed to submit feedback:" + o.status;
    if (o.status === 401 || o.status === 403 || o.status === 429) v(s);else getHeronBrookPromptOverride(Error(s));
    return {
      success: false,
      failureReason: "http_error",
      statusCode: o.status
    };
  } catch (r) {
    if (cB(r)) return {
      success: false
    };
    if (r instanceof RangeError) return {
      success: false,
      payloadTooLarge: true,
      failureReason: "payload_too_large_range_error"
    };
    if (nT(r)) {
      if (r.response?.status === 413) return {
        success: false,
        payloadTooLarge: true,
        failureReason: "payload_too_large_413",
        statusCode: 413
      };
      if (r.code === "ECONNABORTED" && n > vgo / 8) return {
        success: false,
        payloadTooLarge: true,
        failureReason: "payload_too_large_timeout"
      };
    }
    if (nT(r) && r.response?.status === 403) {
      let o = r.response.data;
      if (o?.error?.type === "permission_error" && o?.error?.message?.includes("Custom data retention settings")) return v("Cannot submit feedback because custom data retention settings are enabled"), {
        success: false,
        isZdrOrg: true,
        failureReason: "zdr_org",
        statusCode: 403
      };
    }
    if (K_(r)) v(Gc(Se(r)));else getHeronBrookPromptOverride(r);
    if (nT(r) && r.response) return {
      success: false,
      failureReason: "http_error",
      statusCode: r.response.status
    };
    return {
      success: false,
      failureReason: nT(r) && r.code === "ECONNABORTED" ? "timeout" : "network_error"
    };
  }
}
async function buildLanguagePrompt({
  messages: e,
  description: t,
  surface: n,
  scope: r = "session",
  backgroundTasks: o,
  transcripts: s,
  signal: i,
  surveyFeedbackSource: a
}) {
  let {
      payload: l,
      thirdPartyDroppedCount: c
    } = await buildHooksExplainerPrompt({
      messages: e,
      description: t,
      surface: n,
      scope: r,
      backgroundTasks: o,
      transcripts: s,
      surveyFeedbackSource: a,
      excludeThirdPartyTranscripts: true
    }),
    u = l.latestAssistantMessageId,
    d = await buildAutonomyPrompt(l, i),
    p = d,
    m = 0;
  if (!p.success && p.payloadTooLarge) {
    let {
      transcript: f,
      subagentTranscripts: A,
      lastApiRequest: h,
      recentSessionTranscripts: g,
      rawTranscriptJsonl: _,
      debugLog: y,
      ...T
    } = l;
    if (m = 1, p = await buildAutonomyPrompt({
      ...T,
      transcript: [],
      ...(_ && {
        rawTranscriptJsonl: _
      }),
      ...(y && {
        debugLog: y
      })
    }, i), !p.success && p.payloadTooLarge) m = 2, p = await buildAutonomyPrompt({
      ...T,
      transcript: []
    }, i);
  }
  if (p.success) {
    j("tengu_bug_report_submitted", {
      surface: Ue(n),
      retried_after_too_large: String(!d.success && d.payloadTooLarge === true),
      strip_level: String(m),
      third_party_transcripts_dropped: gOe(c),
      feedback_id: p.feedbackId,
      last_assistant_message_id: Br(u),
      last_assistant_api_message_id: Br(l.latestAssistantAPIMessageId),
      last_interrupted_assistant_api_message_id: Br(l.lastInterruptedAssistantAPIMessageId),
      ...(a && {
        survey_appearance_id: a.appearanceId,
        survey_response: Ue(a.response),
        survey_type: Ue(a.surveyType)
      })
    }), $Xe("tengu_bug_report_description", {
      feedback_id: p.feedbackId,
      descriptionLength: t.length
    });
    let f = !d.success && d.payloadTooLarge === true;
    if (f) Bt("feedback_submit", "payload_stripped");else He("feedback_submit");
    return {
      success: true,
      feedbackId: p.feedbackId,
      retriedAfterTooLarge: f
    };
  }
  if (p.failureReason) Pe("feedback_submit", p.failureReason), j("tengu_bug_report_failed", {
    surface: Ue(n),
    reason: p.failureReason,
    status_code: String(p.statusCode ?? ""),
    first_attempt_too_large: String(!d.success && d.payloadTooLarge === true)
  });
  return {
    success: false,
    isZdrOrg: p.isZdrOrg,
    failureReason: p.failureReason,
    statusCode: p.statusCode
  };
}
function buildOutputStylePrompt() {
  return wgo.join(sr(), "feedback-bundles");
}
async function formatPromptList(items, t = "feedback.json") {
  let o = `cc-${new Date().toISOString().replace(/[-:]/g, "").replace("T", "-").slice(0, 15)}-${Nnl.randomBytes(3).toString("hex")}`,
    s = buildOutputStylePrompt(),
    i = wgo.join(s, `${o}.zip`);
  try {
    await njn.mkdir(s, {
      recursive: true,
      mode: 448
    });
    let {
        Zip: a,
        ZipDeflate: l
      } = await Promise.resolve().then(() => (r$e(), mLt)),
      c = Bnl.createWriteStream(i, {
        mode: 384
      });
    return await new Promise((u, d) => {
      c.on("error", d);
      let p = new a((f, A, h) => {
          if (f) return c.destroy(), d(f);
          if (c.write(A), h) c.end(() => u());
        }),
        m = new l(t);
      p.add(m), m.push(items, true), p.end();
    }), He("feedback_bundle"), {
      success: true,
      bundleId: o,
      zipPath: i
    };
  } catch (a) {
    return await njn.rm(i, {
      force: true
    }).catch(() => {}), Ie(a), Pe("feedback_bundle", "write_failed"), {
      success: false,
      error: Se(a)
    };
  }
}
async function buildNonFableSystemPrefix({
  messages: e,
  description: t,
  surface: n,
  scope: r = "session",
  backgroundTasks: o,
  transcripts: s,
  surveyFeedbackSource: i
}) {
  let a;
  try {
    let {
        payload: l
      } = await buildHooksExplainerPrompt({
        messages: e,
        description: t,
        surface: n,
        scope: r,
        backgroundTasks: o,
        transcripts: s,
        surveyFeedbackSource: i,
        excludeThirdPartyTranscripts: false
      }),
      c = gX(l);
    a = spt(c, Rgo, xgo);
  } catch (l) {
    return Ie(l), Pe("feedback_bundle", "write_failed"), {
      success: false,
      error: Se(l)
    };
  }
  return formatPromptList(a);
}
var Nnl,
  Bnl,
  njn,
  wgo,
  Mnl = "https://github.com/anthropics/claude-code/issues",
  Rgo,
  xgo,
  m4p = 4194304,
  f4p = 2097152,
  vgo = 8388608,
  A4p = 2097152;
var N6e = b(() => {
  ct();
  Sgo();
  je();
  Or();
  an();
  St();
  bs();
  uk();
  wn();
  lo();
  si();
  hp();
  QC();
  za();
  Xt();
  cn();
  S1();
  Ct();
  BS();
  Xx();
  dT();
  sd();
  Lnl();
  Nnl = require("crypto"), Bnl = require("fs"), njn = require("fs/promises"), wgo = require("path");
  Rgo = new Set(["transcript"]), xgo = new Set(["subagentTranscripts"]);
});
export {M6e as I8e,isAlwaysFalse as kCo,shouldShowNoToolVisibilityHint as HCo,buildAntiVerbosityPrompt as Djp,buildActionCautionPrompt as Pjp,buildTaskContinuityPrompt as Ojp,buildHooksExplainerPrompt as Zul,getHeronBrookPromptOverride as ECo,buildAutonomyPrompt as CCo,buildLanguagePrompt as n8t,buildOutputStylePrompt as Ljp,formatPromptList as ICo,buildNonFableSystemPrefix as edl,Nnl as Xul,Bnl as Qul,njn as dVn,wgo as RCo,Mnl as Jul,Rgo as vCo,xgo as wCo,m4p as Hjp,f4p as Ijp,vgo as ACo,A4p as xjp,N6e as x8e};
