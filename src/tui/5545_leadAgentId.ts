// @ts-nocheck
import {isInProcessTeammate,Q2} from "../../vendor/m1457.ts";
import {isTeammate,getAgentName,isTeamLead,hasNonLeadTeammate,isPlanModeRequired,Am} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {Mc,bo,mt,configProtoStore} from "../../vendor/m2458.ts";
import {VK,F4} from "../../vendor/m2416.ts";
import {readUnreadMessages,isPlanApprovalResponse,markMessagesAsRead,isPermissionRequest,isPermissionResponse,isSandboxPermissionRequest,isSandboxPermissionResponse,isShutdownRequest,isShutdownApproved,isModeSetRequest,isPlanApprovalRequest,isTeamPermissionUpdate,isStructuredProtocolMessage,planApprovalResumeText,writeToMailbox,formatTeammateMessages,Tx} from "../permissions/3886_writeToMailbox.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {np,aU} from "../config/3875_aU.ts";
import {syncTeammateMode,removeTeammateFromTeamFile,BL} from "../../vendor/m3879.ts";
import {Cl,Ri} from "../tools/2227_userFacingName.ts";
import {O6,Y0} from "../artifact/4303_Y0.ts";
import {jut,u3n} from "../../vendor/m4201.ts";
import {SS,lo} from "../tools/5190_userPromptCount.ts";
import {D2n,P2n,qct} from "../core/4042_id.ts";
import {Jle,mUt} from "../telemetry/3811_configured_channel.ts";
import {XDa,Nlt,ePa,tPa,Blt} from "../../vendor/m3888.ts";
import {tKe,xO,t1,eKe,eC} from "../../vendor/m717.ts";
import {zlt,eIe} from "../permissions/3913_allow.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {ensureBackendsRegistered,getBackendByType,VHe} from "../../vendor/m4209.ts";
import {isInsideTmux,Tte} from "../../vendor/m3877.ts";
import {pst,Nk} from "../agent/3316_id.ts";
import {yS} from "../../vendor/m3824.ts";
import {useInterval} from "../../vendor/m2446.ts";
import {setPermissionModeWithGuards,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
function nQn(e: any): any {
  if (isInProcessTeammate()) return;
  if (isTeammate()) return getAgentName();
  if (isTeamLead(e.teamContext)) {
    if (!hasNonLeadTeammate(e.teamContext)) return;
    let {
      leadAgentId: t,
      teammates: n
    } = e.teamContext;
    return n[t]?.name || "team-lead";
  }
  return;
}
function $Um(e: any): any {
  let t = e.startsWith("mcp__");
  return {
    name: e,
    userFacingName: () => t ? `${e} (MCP)` : e,
    renderToolUseMessage: () => e,
    isMcp: t
  };
}
function ZQl({
  enabled: e,
  isLoading: t,
  focusedInputDialog: n,
  onSubmitMessage: r,
  requestDialog: o
}: any): any {
  let s = r,
    i = Mc(),
    a = bo(),
    l = VK(),
    c = oOe.useRef(new Set()),
    u = oOe.useCallback(async () => {
      if (!e) return;
      let f = i.getState(),
        A = nQn(f);
      if (!A) return;
      let h = await readUnreadMessages(A, f.teamContext?.teamName);
      if (h.length === 0) return;
      logForDebugging(`[InboxPoller] Found ${h.length} unread message(s)`);
      let g = new Set();
      if (isTeammate() && isPlanModeRequired()) for (let D of h) {
        let N = isPlanApprovalResponse(D.text);
        if (N && D.from === np) {
          if (i.getState().toolPermissionContext.mode !== "plan") {
            logForDebugging("[InboxPoller] Ignoring plan approval response while not in plan mode");
            continue;
          }
          if (g.add(D), logForDebugging(`[InboxPoller] Received plan approval response from team-lead: approved=${N.approved}`), N.approved) {
            let O = N.permissionMode ?? "default",
              $ = RMo(O, f.toolPermissionContext, a);
            if (!$.ok) logForDebugging(`[InboxPoller] Refusing inherited mode ${O} from plan approval: ${$.error}; exiting plan mode to default`, {
              level: "warn"
            }), RMo("default", f.toolPermissionContext, a);
            await syncTeammateMode($.ok ? $.mode : "default", f.teamContext?.teamName), logForDebugging(`[InboxPoller] Plan approved by team lead, exited plan mode to ${$.ok ? $.mode : "default"}`);
          } else logForDebugging(`[InboxPoller] Plan rejected by team lead: ${N.feedback || "No feedback provided"}`);
        } else if (N) logForDebugging(`[InboxPoller] Ignoring plan approval response from non-team-lead: ${D.from}`);
      }
      let _ = () => {
          markMessagesAsRead(A, f.teamContext?.teamName, h);
        },
        y = [],
        T = [],
        S = [],
        v = [],
        R = [],
        k = [],
        x = [],
        H = [],
        I = [];
      for (let D of h) {
        let N = isPermissionRequest(D.text),
          O = isPermissionResponse(D.text),
          $ = isSandboxPermissionRequest(D.text),
          U = isSandboxPermissionResponse(D.text),
          W = isShutdownRequest(D.text),
          G = isShutdownApproved(D.text),
          V = isModeSetRequest(D.text),
          Q = isPlanApprovalRequest(D.text);
        if (N) y.push(D);else if (O) T.push(D);else if ($) S.push(D);else if (U) v.push(D);else if (W) R.push(D);else if (G) k.push(D);else if (isTeamPermissionUpdate(D.text)) logForDebugging("[InboxPoller] Dropping team_permission_update message: permission rules are never accepted from the inbox", {
          level: "warn"
        });else if (V) x.push(D);else if (Q) H.push(D);else if (isStructuredProtocolMessage(D.text)) {
          let K = isPlanApprovalResponse(D.text);
          if (K && g.has(D)) I.push({
            ...D,
            text: planApprovalResumeText(K)
          });else logForDebugging(`[InboxPoller] Dropping unrouted protocol frame from ${D.from}: ${D.text.substring(0, 80)}`, {
            level: "warn"
          });
        } else I.push(D);
      }
      if (y.length > 0 && isTeamLead(f.teamContext)) {
        logForDebugging(`[InboxPoller] Found ${y.length} permission request(s)`);
        let D = f.teamContext?.teamName;
        for (let O of y) {
          let $ = isPermissionRequest(O.text);
          if (!$) continue;
          if (c.current.has($.request_id)) continue;
          c.current.add($.request_id);
          let U = Cl(O6(), $.tool_name) ?? $Um($.tool_name),
            {
              dialog: W,
              descriptor: G
            } = await jut({
              tool: U,
              input: $.input,
              description: $.description,
              toolUseID: $.tool_use_id,
              permissionResult: {
                behavior: "ask",
                message: $.description
              },
              assistantMessage: SS({
                content: ""
              }),
              theme: "dark",
              workerBadge: {
                name: $.agent_id,
                color: O.color ?? "cyan"
              },
              toolPermissionContext: f.toolPermissionContext
            });
          o(W, G).then(V => {
            switch (c.current.delete($.request_id), V.behavior) {
              case "allow":
                D2n($.agent_id, {
                  decision: "approved",
                  resolvedBy: "leader",
                  updatedInput: V.updatedInput,
                  permissionUpdates: V.permissionUpdates
                }, $.request_id, D);
                return;
              case "deny":
                D2n($.agent_id, {
                  decision: "rejected",
                  resolvedBy: "leader",
                  feedback: V.feedback
                }, $.request_id, D);
                return;
              case "cancelled":
                D2n($.agent_id, {
                  decision: "rejected",
                  resolvedBy: "leader"
                }, $.request_id, D);
                return;
            }
          });
        }
        let N = isPermissionRequest(y[0]?.text ?? "");
        if (N && !t && !n) Jle({
          message: `${N.agent_id} needs permission for ${N.tool_name}`,
          notificationType: "worker_permission_prompt"
        }, l);
      }
      if (T.length > 0 && isTeammate()) {
        logForDebugging(`[InboxPoller] Found ${T.length} permission response(s)`);
        for (let D of T) {
          let N = isPermissionResponse(D.text);
          if (!N) continue;
          if (D.from !== np) {
            logForDebugging(`[InboxPoller] Ignoring permission response from non-team-lead: ${D.from}`, {
              level: "warn"
            });
            continue;
          }
          if (XDa(N.request_id)) if (logForDebugging(`[InboxPoller] Processing permission response for ${N.request_id}: ${N.subtype}`), N.subtype === "success") Nlt({
            requestId: N.request_id,
            decision: "approved",
            updatedInput: N.response?.updated_input,
            permissionUpdates: N.response?.permission_updates
          });else Nlt({
            requestId: N.request_id,
            decision: "rejected",
            feedback: N.error
          });
        }
      }
      if (S.length > 0 && isTeamLead(f.teamContext)) {
        logForDebugging(`[InboxPoller] Found ${S.length} sandbox permission request(s)`);
        let {
            mode: D,
            isBypassPermissionsModeAvailable: N
          } = f.toolPermissionContext,
          O = tKe(D, N),
          $ = f.teamContext?.teamName;
        async function U(G: any): Promise<any> {
          switch (O) {
            case "allow":
              return !0;
            case "deny":
              return !1;
            case "classify":
              return zlt(G, void 0, [], O6(), f.toolPermissionContext, new AbortController().signal, {
                isSubagentLoop: !1
              });
            case "ask":
              return null;
          }
        }
        let W = [];
        for (let G of S) {
          let V = isSandboxPermissionRequest(G.text);
          if (!V) continue;
          if (!V.hostPattern?.host) {
            logForDebugging("[InboxPoller] Invalid sandbox permission request: missing hostPattern.host");
            continue;
          }
          let Q = await U(V.hostPattern.host);
          if (Q !== null) {
            logForDebugging(`[InboxPoller] Auto-resolving sandbox request ${V.requestId} (mode=${D}, allow=${Q})`), P2n(V.workerName, V.requestId, V.hostPattern.host, Q, $);
            continue;
          }
          W.push({
            requestId: V.requestId,
            workerId: V.workerId,
            workerName: V.workerName,
            workerColor: V.workerColor,
            host: V.hostPattern.host,
            createdAt: V.createdAt
          });
        }
        if (W.length > 0) {
          a((V: any) => ({
            ...V,
            workerSandboxPermissions: {
              ...V.workerSandboxPermissions,
              queue: [...V.workerSandboxPermissions.queue, ...W]
            }
          }));
          let G = W[0];
          if (G && !t && !n) Jle({
            message: `${G.workerName} needs network access to ${G.host}`,
            notificationType: "worker_permission_prompt"
          }, l);
        }
      }
      if (v.length > 0 && isTeammate()) {
        logForDebugging(`[InboxPoller] Found ${v.length} sandbox permission response(s)`);
        for (let D of v) {
          let N = isSandboxPermissionResponse(D.text);
          if (!N) continue;
          if (D.from !== np) {
            logForDebugging(`[InboxPoller] Ignoring sandbox permission response from non-team-lead: ${D.from}`, {
              level: "warn"
            });
            continue;
          }
          if (ePa(N.requestId)) logForDebugging(`[InboxPoller] Processing sandbox permission response for ${N.requestId}: allow=${N.allow}`), tPa({
            requestId: N.requestId,
            host: N.host,
            allow: N.allow
          }), a((O: any) => ({
            ...O,
            pendingSandboxRequest: null
          }));
        }
      }
      if (x.length > 0 && isTeammate()) {
        logForDebugging(`[InboxPoller] Found ${x.length} mode set request(s)`);
        for (let D of x) {
          if (D.from !== np) {
            logForDebugging(`[InboxPoller] Ignoring mode set request from non-team-lead: ${D.from}`);
            continue;
          }
          let N = isModeSetRequest(D.text);
          if (!N) {
            logForDebugging(`[InboxPoller] Failed to parse mode set request: ${D.text.substring(0, 100)}`);
            continue;
          }
          logForDebugging(`[InboxPoller] Applying mode change from team-lead: ${N.mode}`);
          let O = RMo(N.mode, f.toolPermissionContext, a),
            $ = f.teamContext?.teamName;
          if (!O.ok) {
            logForDebugging(`[InboxPoller] Refusing mode set request for ${N.mode}: ${O.error}`, {
              level: "warn"
            }), await syncTeammateMode(xO(i.getState().toolPermissionContext.mode), $);
            continue;
          }
          await syncTeammateMode(O.mode, $);
        }
      }
      if (H.length > 0 && isTeamLead(f.teamContext)) {
        logForDebugging(`[InboxPoller] Found ${H.length} plan approval request(s), auto-approving`);
        let D = f.teamContext?.teamName,
          N = xO(f.toolPermissionContext.mode),
          O = N === "plan" ? "default" : N;
        for (let $ of H) {
          let U = isPlanApprovalRequest($.text);
          if (!U) continue;
          let W = {
            type: "plan_approval_response",
            requestId: U.requestId,
            approved: !0,
            timestamp: new Date().toISOString(),
            permissionMode: O
          };
          writeToMailbox($.from, {
            from: np,
            text: Le(W),
            timestamp: new Date().toISOString()
          }, D), logForDebugging(`[InboxPoller] Auto-approved plan from ${$.from} (request ${U.requestId})`), I.push($);
        }
      }
      if (R.length > 0 && isTeammate()) {
        logForDebugging(`[InboxPoller] Found ${R.length} shutdown request(s)`);
        for (let D of R) I.push(D);
      }
      if (k.length > 0 && isTeamLead(f.teamContext)) {
        logForDebugging(`[InboxPoller] Found ${k.length} shutdown approval(s)`);
        for (let D of k) {
          let N = isShutdownApproved(D.text);
          if (!N) continue;
          if (N.paneId && N.backendType) (async () => {
            try {
              await ensureBackendsRegistered();
              let $ = await isInsideTmux(),
                W = await getBackendByType(N.backendType)?.killPane(N.paneId, !$);
              logForDebugging(`[InboxPoller] Killed pane ${N.paneId} for ${N.from}: ${W}`);
            } catch ($: any) {
              logForDebugging(`[InboxPoller] Failed to kill pane for ${N.from}: ${$}`);
            }
          })();
          let O = N.from;
          if (O && f.teamContext?.teammates) {
            let $ = Object.entries(f.teamContext.teammates).find(([, U]: any) => U.name === O)?.[0];
            if ($) {
              let U = f.teamContext?.teamName;
              if (U) removeTeammateFromTeamFile(U, {
                agentId: $,
                name: O
              });
              let {
                notificationMessage: W
              } = U ? await pst(U, $, O, "shutdown") : {
                notificationMessage: `${O} has shut down.`
              };
              a((G: any) => {
                if (!G.teamContext?.teammates) return G;
                if (!($ in G.teamContext.teammates)) return G;
                let {
                    [$]: V,
                    ...Q
                  } = G.teamContext.teammates,
                  K = {
                    ...G.tasks
                  };
                for (let [Y, J] of Object.entries(K)) if (yS(J) && J.identity.agentId === $) K[Y] = {
                  ...J,
                  status: "completed",
                  endTime: Date.now()
                };
                return {
                  ...G,
                  tasks: K,
                  teamContext: {
                    ...G.teamContext,
                    teammates: Q
                  },
                  inbox: {
                    messages: [...G.inbox.messages, {
                      id: xMo.randomUUID(),
                      from: "system",
                      text: Le({
                        type: "teammate_terminated",
                        message: W
                      }),
                      timestamp: new Date().toISOString(),
                      status: "pending"
                    }]
                  }
                };
              }), logForDebugging(`[InboxPoller] Removed ${O} (${$}) from teamContext`);
            }
          }
          I.push(D);
        }
      }
      if (I.length === 0) {
        _();
        return;
      }
      let P = formatTeammateMessages(I, {
          recipientIsLead: isTeamLead(f.teamContext)
        }),
        L = () => {
          a((D: any) => ({
            ...D,
            inbox: {
              messages: [...D.inbox.messages, ...I.map((N: any) => ({
                id: xMo.randomUUID(),
                from: N.from,
                text: N.text,
                timestamp: N.timestamp,
                status: "pending",
                color: N.color,
                summary: N.summary
              }))]
            }
          }));
        };
      if (!t && !n) {
        if (logForDebugging("[InboxPoller] Session idle, submitting immediately"), !s(P)) logForDebugging("[InboxPoller] Submission rejected, queuing for later delivery"), L();
      } else logForDebugging("[InboxPoller] Session busy, queuing for later delivery"), L();
      _();
    }, [e, t, n, s, a, l, i, o]);
  oOe.useEffect(() => {
    if (!e) return;
    if (t || n) return;
    let f = i.getState();
    if (!nQn(f)) return;
    let h = f.inbox.messages.filter((T: any) => T.status === "pending"),
      g = f.inbox.messages.filter((T: any) => T.status === "processed");
    if (g.length > 0) {
      logForDebugging(`[InboxPoller] Cleaning up ${g.length} processed message(s) that were delivered mid-turn`);
      let T = new Set(g.map((S: any) => S.id));
      a((S: any) => ({
        ...S,
        inbox: {
          messages: S.inbox.messages.filter((v: any) => !T.has(v.id))
        }
      }));
    }
    if (h.length === 0) return;
    logForDebugging(`[InboxPoller] Session idle, delivering ${h.length} pending message(s)`);
    let _ = formatTeammateMessages(h, {
      recipientIsLead: isTeamLead(f.teamContext)
    });
    if (s(_)) {
      let T = new Set(h.map((S: any) => S.id));
      a((S: any) => ({
        ...S,
        inbox: {
          messages: S.inbox.messages.filter((v: any) => !T.has(v.id))
        }
      }));
    } else logForDebugging("[InboxPoller] Submission rejected, keeping messages queued");
  }, [e, t, n, s, a, i]);
  let d = mt((f: any) => !!nQn(f));
  useInterval(() => void u(), e && d ? UUm : null);
  let m = oOe.useRef(!1);
  oOe.useEffect(() => {
    if (!e) return;
    if (m.current) return;
    if (nQn(i.getState())) m.current = !0, u();
  }, [e, u, i]);
}
function RMo(e: any, t: any, n: any): any {
  let r = t1(e),
    o = eKe(r) ? r : t1(xO(r)),
    s = o === "bypassPermissions",
    i = setPermissionModeWithGuards(o, s ? {
      ...t,
      isBypassPermissionsModeAvailable: !0
    } : t, (a: any) => n((l: any) => {
      let c = l.toolPermissionContext,
        u = c.isBypassPermissionsModeAvailable === s ? c : {
          ...c,
          isBypassPermissionsModeAvailable: s
        },
        d = a(u);
      return d === c ? l : {
        ...l,
        toolPermissionContext: d
      };
    }));
  return i.ok ? {
    ok: !0,
    mode: o
  } : i;
}
var xMo: any,
  oOe: any,
  UUm = 1000;
var eZl = b(() => {
  F4();
  ze();
  mUt();
  configProtoStore();
  Ri();
  Y0();
  qe();
  lo();
  eC();
  ly();
  eIe();
  Xt();
  Tte();
  VHe();
  aU();
  qct();
  BL();
  u3n();
  Nk();
  Am();
  Q2();
  Tx();
  Blt();
  xMo = require("crypto"), oOe = M(Te(), 1);
});
export {nQn,$Um,ZQl,RMo,xMo,oOe,UUm,eZl};
