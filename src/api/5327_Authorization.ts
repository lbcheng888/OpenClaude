// @ts-nocheck
import {getClientPlatform,Fg as tg,Le as fromEnum} from "../../vendor/m5.ts";
import {Hxo as SRo,jYn as t7n} from "../config/5085_ISSUES_EXPLAINER.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {xe as Oe,He as Ie,mn as ln} from "../telemetry/0600_feature_name.ts";
import {lt,$be as jde} from "../session/0132_sent.ts";
import {Ro as Mo,hxr as jun} from "../permissions/1458_swapShrinksContextWindow.ts";
import {PNo as iPo,J_t as PAt,ONo as aPo,LNo as lPo} from "../../vendor/m5325.ts";
import {wn as kn,pf as SA} from "../config/0693_timestamp.ts";
import {Nj as aY,rle as ole} from "../telemetry/3340_reason.ts";
import {fVt as G8t,hJn as b7n} from "../../vendor/m5119.ts";
import {DNo as sPo,zKl as B3l,jKl as F3l} from "../../vendor/m5324.ts";
import {Ce as Se,Ct as bt} from "../../vendor/m197.ts";
import {Bgt as Eft,JMl as kkl,XMl as Hkl,X0o as Fwo,QMl as Ikl,Q0o as Uwo,YMl as xkl,WGt as E8t} from "../session/5045_request_id.ts";
import {vNo as ZDo} from "../../vendor/m5321.ts";
import {_0 as ZI,yRt as Gbt} from "../../vendor/m697.ts";
import {VP as vO,kis as Des} from "../../vendor/m696.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {Bdn as tcn,VJe as zze} from "../session/1289_getAccessToken.ts";
import {sleep} from "../telemetry/1488_withTimeout.ts";
import {c5 as Wj,dn as sn} from "../config/0137_namespace.ts";
import {Jgt as Pft,pJn as y7n} from "../../vendor/m5112.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn as zn} from "./2204_stopPeriodicGrowthBookRefresh.ts";
import {Mo as ns} from "../mcp/2200_mcpServerName.ts";
import {ws as Js} from "../config/2709_Zm.ts";
import {Zp as Fm,d1 as Z1} from "../../vendor/m2705.ts";
import {Lk as Tk} from "../config/2259_R9r.ts";
import {kc as Kc,aA as tv} from "../../vendor/m234.ts";
import {truncate,XH as EH} from "../../vendor/m239.ts";
import {LBt as sNt,wto as GJr} from "../../vendor/m3340.ts";
import {getTrustedDeviceToken,untrustedDeviceHint,recoverFromUntrustedDevice,isTrustedDeviceGateEnabled,Fj as lY} from "../telemetry/3343_untrustedDeviceHint.ts";
import {Si as Gi,ud as ReactHooks} from "../../vendor/m134.ts";
import {getBridgeBaseUrlOverride,BY as tJ} from "../../vendor/m4242.ts";
import {toCompatSessionId} from "../core/2809_toInfraSessionId.ts";
import {ho as fo} from "../../vendor/m572.ts";
import {b} from "../../runtime.ts";
import {ap as Gp} from "../../vendor/m573.ts";
import {$d as Ap} from "../config/0620_$d.ts";
import {pH as Vk} from "./5227_isRunningInRemoteEnvironment.ts";
import {hDo as axo} from "../../vendor/m5117.ts";
function $3l(e) {
  return {
    Authorization: `Bearer ${e}`,
    "Content-Type": "application/json",
    "anthropic-version": nxm,
    "anthropic-client-platform": getClientPlatform(),
    "User-Agent": tg()
  };
}
async function q3l(e) {
  let {
      baseUrl: t,
      orgUUID: n,
      title: r,
      getAccessToken: o,
      onAuth401: s,
      onReadFreshOAuthToken: i,
      onProactiveRefresh: a,
      toSDKMessages: l,
      initialHistoryCap: c,
      initialMessages: u,
      onInboundMessage: d,
      onUserMessage: p,
      onSessionEstablished: m,
      onBeforePushTriggeringState: f,
      onPermissionResponse: A,
      onInterrupt: h,
      getInitializeState: g,
      onDialogKindsDeclared: _,
      onSetModel: y,
      onSetMaxThinkingTokens: T,
      onSetPermissionMode: S,
      onRenameSession: v,
      onSetColor: R,
      onFileSuggestions: k,
      onReadFile: x,
      onGetContextUsage: H,
      onGetUsage: I,
      onMcpAuthenticate: P,
      onMcpOauthCallbackUrl: L,
      onMcpReconnect: D,
      onMcpStatus: N,
      onStateChange: O,
      outboundOnly: $,
      tags: U,
      gitRepoUrl: W = null,
      branch: G = "",
      onTransportPersistenceReady: V,
      onTransportPersistenceTeardown: Q,
      reattachSessionId: K,
      reattachSequenceNum: Y,
      livePreviewPorts: J
    } = e,
    ee = !!K,
    te = await SRo(),
    ne = o();
  if (!ne) return logForDebugging("[remote-bridge] No OAuth token"), Oe("bridge_connect", "bridge_connect_no_token"), null;
  let re = () => o() ?? ne,
    {
      getOriginalCwd: oe
    } = await Promise.resolve().then(() => (lt(), jde)),
    {
      getMainLoopModel: ce
    } = await Promise.resolve().then(() => (Mo(), jun));
  async function ue() {
    let ye = await G8e(() => iPo(t, re(), r, te.http_timeout_ms, U, W ? {
      gitRepoUrl: W,
      branch: G
    } : void 0, oe(), ce()), "createCodeSession", te);
    if (ye) logForDebugging(`[remote-bridge] Created session ${ye}`), kn("info", "bridge_repl_v2_session_created");
    return ye;
  }
  let ae;
  if (K) ae = K, logForDebugging(`[remote-bridge] Reattaching to session ${ae}`), kn("info", "bridge_repl_v2_session_reattached"), await G8e(() => rxm(ae, t, re(), n, te.http_timeout_ms), "unarchiveSession", te);else {
    let ye = await ue();
    if (!ye) return O?.("failed", "Session creation failed \u2014 see debug log"), aY("v2_session_create_failed", void 0, !0), Oe("bridge_connect", "bridge_connect_session_create_failed"), null;
    ae = ye;
  }
  let he = await G8e(() => BWt(ae, t, re(), te.http_timeout_ms), "fetchRemoteCredentials", te);
  if (ee && he === null) {
    logForDebugging(`[remote-bridge] Reattach to ${ae} failed; falling back to fresh session`), kn("info", "bridge_repl_v2_reattach_fallback");
    let ye = await ue();
    if (ye) ae = ye, ee = !1, he = await G8e(() => BWt(ae, t, re(), te.http_timeout_ms), "fetchRemoteCredentials (post-fallback)", te);
  }
  if (!he || PAt(he)) {
    let ye = he ? cPo(he) : "Remote credentials fetch failed \u2014 see debug log";
    if (logForDebugging(`[remote-bridge] Creds failed; onStateChange ${O ? "set" : "UNSET"}, msg="${ye}"`), O?.("failed", ye), aY(he ? `v2_remote_creds_${he.reason}` : "v2_remote_creds_failed", void 0, !0), Oe("bridge_connect", "bridge_connect_creds_failed"), !ee) FWt(ae, t, re(), n, te.http_timeout_ms);
    return null;
  }
  logForDebugging(`[remote-bridge] Fetched bridge credentials (expires_in=${he.expires_in}s)`), m?.(ae);
  let se = G8t(he.api_base_url, ae);
  logForDebugging(`[remote-bridge] v2 session URL: ${se}`);
  let le;
  try {
    le = await sPo({
      sessionUrl: se,
      ingressToken: he.worker_jwt,
      sessionId: ae,
      epoch: he.worker_epoch,
      heartbeatIntervalMs: te.heartbeat_interval_ms,
      heartbeatJitterFraction: te.heartbeat_jitter_fraction,
      initialSequenceNum: ee ? Y : void 0,
      getAuthToken: () => he.worker_jwt,
      outboundOnly: $
    });
  } catch (ye) {
    if (logForDebugging(`[remote-bridge] v2 transport setup failed: ${Se(ye)}`, {
      level: "error"
    }), O?.("failed", `Transport setup failed: ${Se(ye)}`), aY("v2_transport_setup_failed", void 0, !0), Oe("bridge_connect", "bridge_connect_transport_failed"), !ee) FWt(ae, t, re(), n, te.http_timeout_ms);
    return null;
  }
  logForDebugging(`[remote-bridge] v2 transport created (epoch=${he.worker_epoch})`), O?.("ready");
  let pe = null,
    de = new Eft(te.uuid_dedup_buffer_size),
    _e = new Set();
  if (u) for (let ye of u) _e.add(ye.uuid), de.add(ye.uuid);
  let fe = new Eft(te.uuid_dedup_buffer_size),
    ie = new ZDo(),
    Ae = ee,
    ge = !1,
    Ce,
    xe = !1,
    Re = 0,
    Me = 3,
    Ke = ee,
    He = (ye, ve) => {
      if (f && (ye === "requires_action" || ye === "idle")) f();
      if (le.reportState(ye, ve), ye === "requires_action" && ve) Ke = !0, le.reportMetadata({
        pending_action: ve
      });else if (Ke) Ke = !1, le.reportMetadata({
        pending_action: null
      });
    },
    Ge,
    Ye,
    ot;
  if (W) (async () => {
    let {
        parseGitRemote: ye,
        parseGitHubRepository: ve
      } = await Promise.resolve().then(() => (ZI(), Gbt)),
      {
        addWatchedRepo: Fe,
        removeWatchedRepo: We,
        getCachedBranchForRepo: ft,
        onRepoBranchChange: ke
      } = await Promise.resolve().then(() => (vO(), Des)),
      pt = ye(W),
      ut = pt ? `${pt.owner}/${pt.name}` : ve(W);
    if (!ut) return;
    let Ht = oe();
    if (await Fe(Ht), ge) {
      We(Ht);
      return;
    }
    let Ft,
      An = async () => {
        if (ge) return;
        let Pr = oe();
        if (Pr !== Ht) {
          if (We(Ht), Ht = Pr, await Fe(Pr), ge) {
            We(Pr);
            return;
          }
        }
        let nr = await ft(Pr);
        if (nr === void 0 || nr === Ft) return;
        Ft = nr, le.reportMetadata({
          current_branches: {
            [ut]: nr
          }
        });
      };
    Ye = () => {
      Ft = void 0;
    }, ot = () => void An();
    let sr = ke(ot);
    Ge = () => {
      sr(), We(Ht);
    }, An();
  })().catch(ye => logForDebugging(`[remote-bridge] current_branches setup failed: ${Se(ye)}`));
  let vt = new Map(),
    $e = !p,
    Je = "initial",
    Rt;
  function Et(ye) {
    if (ge) return;
    logEvent("tengu_bridge_repl_connect_timeout", {
      v2: !0,
      elapsed_ms: te.connect_timeout_ms,
      cause: fromEnum(ye)
    }), Oe("bridge_connect", "bridge_connect_timeout");
  }
  let dt = tcn({
    refreshBufferMs: te.token_refresh_buffer_ms,
    getAccessToken: async () => {
      let ye = o();
      if (a) await a();
      return o() ?? ye;
    },
    onRefresh: (ye, ve) => {
      (async () => {
        if (xe || ge) {
          logForDebugging("[remote-bridge] Recovery already in flight, skipping proactive refresh");
          return;
        }
        xe = !0;
        try {
          let Fe = await G8e(() => BWt(ye, t, ve, te.http_timeout_ms), "fetchRemoteCredentials (proactive)", te);
          if (!Fe || ge) return;
          if (PAt(Fe)) {
            if (!ge) O?.("failed", cPo(Fe));
            return;
          }
          await $t(Fe, "proactive_refresh"), logForDebugging("[remote-bridge] Transport rebuilt (proactive refresh)");
        } catch (Fe) {
          if (logForDebugging(`[remote-bridge] Proactive refresh rebuild failed: ${Se(Fe)}`, {
            level: "error"
          }), kn("error", "bridge_repl_v2_proactive_refresh_failed"), !ge) O?.("failed", `Refresh failed: ${Se(Fe)}`);
        } finally {
          xe = !1;
        }
      })();
    },
    label: "remote"
  });
  dt.scheduleFromExpiresIn(ae, he.expires_in);
  function Dt() {
    le.setOnConnect(() => {
      if (clearTimeout(Rt), Re = 0, logForDebugging("[remote-bridge] v2 transport connected"), kn("info", "bridge_repl_v2_transport_connected"), V) {
        let ye = le.getInternalEventWriter?.(),
          ve = le.getInternalEventReaders?.();
        if (ye && ve) V(ye, ve);
      }
      if (logEvent("tengu_bridge_repl_ws_connected", {
        v2: !0,
        cause: fromEnum(Je)
      }), !Ae && u && u.length > 0) {
        Ae = !0;
        let ye = le;
        _n(u).catch(ve => logForDebugging(`[remote-bridge] flushHistory failed: ${ve}`)).finally(() => {
          if (le !== ye || ge || xe) return;
          Zt(), O?.("connected");
        });
      } else if (!ie.active) O?.("connected");
    }), le.setOnData(ye => {
      kkl(ye, de, fe, d, A ? ve => {
        if (A(ve)) He("running");
      } : void 0, ve => Hkl(ve, {
        transport: le,
        sessionId: ae,
        onInterrupt: h,
        getInitializeState: g,
        onDialogKindsDeclared: _,
        onSetModel: y,
        onSetMaxThinkingTokens: T,
        onSetPermissionMode: S,
        onRenameSession: v,
        onSetColor: R,
        onFileSuggestions: k,
        onReadFile: x,
        onGetContextUsage: H,
        onGetUsage: I,
        onMcpAuthenticate: P,
        onMcpOauthCallbackUrl: L,
        onMcpReconnect: D,
        onMcpStatus: N,
        outboundOnly: $
      }));
    }), le.setOnClose(ye => {
      if (clearTimeout(Rt), ge) return;
      if (logForDebugging(`[remote-bridge] v2 transport closed (code=${ye})`), logEvent("tengu_bridge_repl_ws_closed", {
        code: ye,
        v2: !0
      }), (ye === 401 || ye === 4091) && !xe) {
        if (Re >= Me) {
          logForDebugging(`[remote-bridge] ${ye} recovery exhausted after ${Re} attempts`, {
            level: "error"
          }), O?.("failed", `Transport recovery exhausted (code ${ye})`);
          return;
        }
        Re++, It(ye);
        return;
      }
      O?.("failed", `Transport closed: ${B3l(ye)}`);
    });
  }
  async function $t(ye, ve) {
    Je = ve, Ke = !1, Ye?.(), Q?.(), ie.start();
    try {
      let Fe = le.getLastSequenceNum();
      if (le.close(), le = await sPo({
        sessionUrl: G8t(ye.api_base_url, ae),
        ingressToken: ye.worker_jwt,
        sessionId: ae,
        epoch: ye.worker_epoch,
        heartbeatIntervalMs: te.heartbeat_interval_ms,
        heartbeatJitterFraction: te.heartbeat_jitter_fraction,
        initialSequenceNum: Fe,
        getAuthToken: () => ye.worker_jwt,
        outboundOnly: $
      }), ge) {
        le.close();
        return;
      }
      Dt(), le.connect(), ot?.(), Rt = setTimeout(Et, te.connect_timeout_ms, Je), dt.scheduleFromExpiresIn(ae, ye.expires_in), pe?.updateAccessToken(ye.worker_jwt), Zt();
    } finally {
      ie.drop();
    }
  }
  async function It(ye) {
    if (xe) return;
    xe = !0, ie.start(), O?.("reconnecting", ye === 401 ? "JWT expired \u2014 refreshing" : "CCR init failed \u2014 retrying"), logForDebugging(`[remote-bridge] ${ye} on transport \u2014 attempting credential refresh + rebuild`);
    try {
      let ve = o(),
        Fe = !0;
      if (ye === 401 && s) Fe = await s(ve ?? "");
      let We = o() ?? ve;
      if (!We || ge) {
        if (!ge) O?.("failed", "JWT refresh failed: no OAuth token");
        return;
      }
      let ft = await G8e(() => BWt(ae, t, We, te.http_timeout_ms), "fetchRemoteCredentials (recovery)", te);
      if (!ft && !ge && ye === 401 && s && !Fe) {
        let ke = !1;
        for (let pt = 1; pt <= te.oauth_retry_max_attempts && !ge; pt++) {
          O?.("reconnecting", `OAuth refresh failed \u2014 waiting for a fresh login (${pt}/${te.oauth_retry_max_attempts})`);
          let ut = te.oauth_retry_base_delay_ms * 2 ** (pt - 1),
            Ht = ut * te.init_retry_jitter_fraction * (2 * Math.random() - 1);
          if (await sleep(ut + Ht), ge) return;
          let Ft = i ? await i() : (await s(ve ?? "")) ? o() : void 0;
          if (ge) return;
          let An = Ft !== void 0 && Ft !== (ve ?? "") ? Ft : void 0;
          if (!An) continue;
          ke = !0, ft = await G8e(() => BWt(ae, t, An, te.http_timeout_ms), "fetchRemoteCredentials (recovery re-poll)", te);
          break;
        }
        if (!ft && !ke) {
          if (!ge) O?.("failed", "OAuth token refresh failed \u2014 re-authenticate, then re-enable Remote Control");
          return;
        }
      }
      if (!ft || ge) {
        if (!ge) O?.("failed", `JWT refresh failed after ${ye}`);
        return;
      }
      if (PAt(ft)) {
        if (!ge) O?.("failed", cPo(ft));
        return;
      }
      Ae = ee, await $t(ft, ye === 401 ? "auth_401_recovery" : "init_4091_recovery"), logForDebugging(`[remote-bridge] Transport rebuilt after ${ye}`);
    } catch (ve) {
      if (logForDebugging(`[remote-bridge] ${ye} recovery failed: ${Se(ve)}`, {
        level: "error"
      }), kn("error", ye === 401 ? "bridge_repl_v2_jwt_refresh_failed" : "bridge_repl_v2_4091_recovery_failed"), !ge) O?.("failed", `Transport recovery failed (${ye}): ${Se(ve)}`);
    } finally {
      xe = !1, ie.drop();
    }
  }
  if (Dt(), !ee && u && u.length > 0) ie.start();
  le.connect(), Rt = setTimeout(Et, te.connect_timeout_ms, Je);
  function Zt() {
    let ye = ie.end();
    if (ye.length === 0) return;
    for (let Fe of ye) de.add(Fe.uuid);
    let ve = l(ye).map(Fe => ({
      ...Fe,
      session_id: ae
    }));
    if (ye.some(Fe => Fe.type === "user")) He("running");
    logForDebugging(`[remote-bridge] Drained ${ye.length} queued message(s) after flush`), le.writeBatch(ve);
  }
  async function _n(ye) {
    let ve = ye.filter(Fwo),
      Fe = c > 0 && ve.length > c ? ve.slice(-c) : ve;
    if (Fe.length < ve.length) logForDebugging(`[remote-bridge] Capped initial flush: ${ve.length} -> ${Fe.length} (cap=${c})`);
    let We = l(Fe).map(ft => ({
      ...ft,
      session_id: ae,
      historical: !0
    }));
    if (We.length === 0) return;
    if (ve.at(-1)?.type === "user") He("running");
    logForDebugging(`[remote-bridge] Flushing ${We.length} history events`), await le.writeBatch(We);
  }
  let Nn = !1,
    Fn;
  function Dn(ye) {
    if (ye?.skipArchive) Nn = !0;
    if (ye?.reason) Fn = ye.reason;
    if (Ce) return Ce;
    return ge = !0, Ce = or(), Ce;
  }
  async function or() {
    if (Ge?.(), Q?.(), pe?.stop(), dt.cancelAll(), clearTimeout(Rt), ie.drop(), He("idle"), Fn !== void 0) le.write(Ikl(ae, Fn));
    if (le.write(Uwo(ae)), Nn) {
      if (Fn !== void 0) await Promise.race([le.flush(), sleep(300)]);
      le.close(), logForDebugging(`[remote-bridge] Teardown complete (skipArchive): session=${ae}`), kn("info", "bridge_repl_v2_teardown"), logEvent("tengu_bridge_repl_teardown", {
        v2: !0,
        archive_status: fromEnum("skipped_teleport"),
        archive_ok: !1
      }), Yt();
      return;
    }
    let ye = te.teardown_archive_timeout_ms,
      ve = Date.now(),
      Fe = o(),
      We = await FWt(ae, t, Fe, n, ye),
      ft = ye - (Date.now() - ve);
    if (We === 401 && s && ft >= 200) try {
      await Promise.race([s(Fe ?? ""), sleep(ft)]), Fe = o(), We = await FWt(ae, t, Fe, n, Math.max(1, ye - (Date.now() - ve)));
    } catch (pt) {
      logForDebugging(`[remote-bridge] Teardown 401 retry threw: ${Se(pt)}`, {
        level: "error"
      });
    }
    if (Fn !== void 0) await Promise.race([le.flush(), sleep(300)]);
    le.close();
    let ke = We === "no_token" ? "skipped_no_token" : We === "timeout" || We === "error" ? "network_error" : We >= 500 ? "server_5xx" : We >= 400 ? "server_4xx" : "ok";
    logForDebugging(`[remote-bridge] Torn down (archive=${We})`), kn("info", "bridge_repl_v2_teardown"), logEvent("tengu_bridge_repl_teardown", {
      v2: !0,
      archive_status: fromEnum(ke),
      archive_ok: typeof We === "number" && We < 400,
      archive_http_status: typeof We === "number" ? We : void 0,
      archive_timeout: We === "timeout",
      archive_no_token: We === "no_token"
    }), Yt();
  }
  logEvent("tengu_bridge_repl_started", {
    has_initial_messages: !!(u && u.length > 0),
    v2: !0,
    expires_in_s: he.expires_in,
    inProtectedNamespace: Wj(),
    ...Pft()
  }), Ie("bridge_connect");
  let vr = {
      bridgeSessionId: ae,
      outboundOnly: $ ?? !1,
      environmentId: "",
      sessionIngressUrl: he.api_base_url,
      getLastSequenceNum: () => le.getLastSequenceNum(),
      flush: () => le.flush(),
      writeMessages(ye) {
        let ve = ye.filter(We => Fwo(We) && !_e.has(We.uuid) && !de.has(We.uuid));
        if (ve.length === 0) return;
        if (!$e) for (let We of ve) {
          let ft = xkl(We);
          if (ft !== void 0 && p?.(ft, ae)) {
            $e = !0;
            break;
          }
        }
        if (ie.enqueue(...ve)) {
          logForDebugging(`[remote-bridge] Queued ${ve.length} message(s) during flush`);
          return;
        }
        for (let We of ve) de.add(We.uuid);
        let Fe = l(ve).map(We => ({
          ...We,
          session_id: ae
        }));
        if (ve.some(We => We.type === "user")) He("running");
        logForDebugging(`[remote-bridge] Sending ${ve.length} message(s)`), le.writeBatch(Fe);
      },
      reportMetadata(ye) {
        le.reportMetadata(ye);
      },
      refreshGitBranch() {
        ot?.();
      },
      writeSdkMessages(ye) {
        let ve = ye.filter(We => !We.uuid || !de.has(We.uuid));
        if (ve.length === 0) return;
        for (let We of ve) if (We.uuid) de.add(We.uuid);
        let Fe = ve.map(We => ({
          ...We,
          session_id: ae
        }));
        le.writeBatch(Fe);
      },
      sendControlRequest(ye) {
        if (xe) {
          logForDebugging(`[remote-bridge] Dropping control_request during 401 recovery: ${ye.request_id}`);
          return;
        }
        let ve = {
            ...ye,
            session_id: ae
          },
          Fe = ye.request;
        if (Fe.subtype === "can_use_tool") {
          let We;
          if (getFeatureValue_CACHED_MAY_BE_STALE("tengu_bridge_requires_action_details", !1)) {
            let ft = Fe.tool_name === ns || Fe.tool_name === Js,
              ke;
            if (Fe.tool_name === Fm) {
              let Ht = Array.isArray(Fe.input?.questions) ? Fe.input.questions : [],
                Ft = Ht[0],
                An = Ft?.header || Ft?.question;
              ke = {
                label: "Question",
                body: An ? An + (Ht.length > 1 ? ` (+${Ht.length - 1} more)` : "") : "Tap to answer"
              };
            } else if (Fe.tool_name === Tk) ke = {
              label: "Plan",
              body: "Plan ready for review"
            };
            let pt = ft && typeof Fe.input?.command === "string" ? Kc(Fe.input.command) : void 0,
              ut = ft && typeof Fe.input?.description === "string" ? Fe.input.description : void 0;
            We = {
              tool_name: Fe.tool_name,
              display_tool_name: ke?.label ?? Fe.display_name ?? Fe.tool_name,
              action_description: ke?.body ?? Kc(Fe.description || ut || pt && truncate(pt, 120) || ""),
              raw_command: ke ? void 0 : pt,
              tool_use_id: Fe.tool_use_id,
              request_id: ke ? "" : ye.request_id,
              input: Fe.input
            };
          }
          He("requires_action", We);
        }
        le.write(ve), logForDebugging(`[remote-bridge] Sent control_request request_id=${ye.request_id}`);
      },
      sendControlResponse(ye) {
        if (xe) {
          logForDebugging("[remote-bridge] Dropping control_response during 401 recovery");
          return;
        }
        let ve = {
          ...ye,
          session_id: ae
        };
        He("running"), le.write(ve), logForDebugging("[remote-bridge] Sent control_response");
      },
      sendControlCancelRequest(ye) {
        if (xe) {
          logForDebugging(`[remote-bridge] Dropping control_cancel_request during 401 recovery: ${ye}`);
          return;
        }
        let ve = {
          type: "control_cancel_request",
          request_id: ye,
          session_id: ae
        };
        He("running"), le.write(ve), logForDebugging(`[remote-bridge] Sent control_cancel_request request_id=${ye}`);
      },
      sendResult() {
        if (xe) {
          logForDebugging("[remote-bridge] Dropping result during 401 recovery");
          return;
        }
        He("idle"), le.write(Uwo(ae)), logForDebugging("[remote-bridge] Sent result");
      },
      async subscribePR(ye, ve, Fe) {
        let We = `${ye}#${ve}`,
          ft = vt.get(We);
        if (Fe) vt.set(We, {
          agentId: Fe,
          repo: ye,
          prNumber: ve
        });
        let ke = await sNt("subscribe", ae, ye, ve, t, o, getTrustedDeviceToken);
        if (!ke && Fe) if (ft) vt.set(We, ft);else vt.delete(We);
        return ke;
      },
      async unsubscribePR(ye, ve) {
        let Fe = await sNt("unsubscribe", ae, ye, ve, t, o, getTrustedDeviceToken);
        if (Fe) vt.delete(`${ye}#${ve}`);
        return Fe;
      },
      getPRWebhookTargets() {
        return [...vt.values()];
      },
      teardown: Dn,
      async archive() {
        await FWt(ae, t, o(), n, te.teardown_archive_timeout_ms);
      },
      [Symbol.asyncDispose]() {
        return vr.teardown({
          reason: "host_exit"
        });
      }
    },
    Yt = Gi(vr);
  return vr;
}
async function G8e(e, t, n) {
  let r = n.init_retry_max_attempts;
  for (let o = 1; o <= r; o++) {
    let s = await e();
    if (s !== null) return s;
    if (o < r) {
      let i = n.init_retry_base_delay_ms * 2 ** (o - 1),
        a = i * n.init_retry_jitter_fraction * (2 * Math.random() - 1),
        l = Math.min(i + a, n.init_retry_max_delay_ms);
      logForDebugging(`[remote-bridge] ${t} failed (attempt ${o}/${r}), retrying in ${Math.round(l)}ms`), await sleep(l);
    }
  }
  return null;
}
function cPo(e) {
  switch (e.reason) {
    case "untrusted_device":
      return untrustedDeviceHint();
    case "session_stale_relogin":
      return "session expired for trusted-device check \u2014 run /login to re-authenticate";
  }
}
async function BWt(e, t, n, r) {
  let o = await getTrustedDeviceToken(),
    s = await aPo(e, t, n, r, o);
  if (PAt(s) && s.reason === "untrusted_device") {
    let i = await recoverFromUntrustedDevice(o);
    if (i) s = (await aPo(e, t, n, r, i)) ?? s;
  }
  if (!s) return null;
  if (PAt(s)) {
    if (s.reason === "untrusted_device" && !isTrustedDeviceGateEnabled()) return null;
    return s;
  }
  return getBridgeBaseUrlOverride() ? {
    ...s,
    api_base_url: t
  } : s;
}
async function FWt(e, t, n, r, o) {
  if (!n) return "no_token";
  let s = toCompatSessionId(e);
  try {
    let i = await fo.post(`${t}/v1/sessions/${s}/archive`, {}, {
      headers: {
        ...$3l(n),
        "anthropic-beta": "ccr-byoc-2025-07-29",
        "x-organization-uuid": r
      },
      timeout: o,
      validateStatus: () => !0
    });
    return logForDebugging(`[remote-bridge] Archive ${s} status=${i.status}`), i.status;
  } catch (i) {
    let a = Se(i);
    return logForDebugging(`[remote-bridge] Archive failed: ${a}`), fo.isAxiosError(i) && i.code === "ECONNABORTED" ? "timeout" : "error";
  }
}
async function rxm(e, t, n, r, o) {
  if (!n) return !0;
  let s = toCompatSessionId(e);
  try {
    let i = await fo.post(`${t}/v1/sessions/${s}/unarchive`, {}, {
      headers: {
        ...$3l(n),
        "anthropic-beta": "ccr-byoc-2025-07-29",
        "x-organization-uuid": r
      },
      timeout: o,
      validateStatus: () => !0
    });
    logForDebugging(`[remote-bridge] Unarchive ${s} status=${i.status}`);
    let a = i.status < 300 || i.status === 409;
    if (kn("info", a ? "bridge_repl_v2_unarchive_ok" : "bridge_repl_v2_unarchive_failed"), a || i.status === 404 || i.status === 403) return !0;
    return null;
  } catch (i) {
    return logForDebugging(`[remote-bridge] Unarchive failed: ${Se(i)}`), kn("info", "bridge_repl_v2_unarchive_failed"), null;
  }
}
var nxm = "2023-06-01";
var j3l = b(() => {
  Gp();
  ln();
  zn();
  Ct();
  y7n();
  Z1();
  ReactHooks();
  qe();
  SA();
  sn();
  bt();
  Ap();
  tv();
  EH();
  Vk();
  E8t();
  ole();
  zze();
  axo();
  t7n();
  F3l();
  GJr();
  lY();
  b7n();
  lPo();
  tJ();
  lPo();
});
export {$3l as JKl,q3l as XKl,G8e as MGe,cPo as MNo,BWt as _7t,FWt as y7t,rxm as DMm,nxm as xMm,j3l as QKl};
