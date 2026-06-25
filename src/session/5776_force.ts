// @ts-nocheck
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {Oi,ec,Pf} from "../agent/2591_level.ts";
import {coe,VT} from "../../vendor/m648.ts";
import {Ie,vn} from "./0621_length.ts";
import {aJ,UKn,o_l,CL} from "../../vendor/m4609.ts";
import {Ni} from "../../vendor/m127.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {TSc,bSc} from "../../vendor/m5774.ts";
import {Ce,sp,Ct} from "../../vendor/m197.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "../config/0230_encoding.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {bgSupervisorNoun as wy,fC} from "../config/2212_shouldShowLaunchComposer.ts";
import {zd,E8t,mpl,rue,bL} from "../../vendor/m4515.ts";
import {Jte,oft} from "../../vendor/m4411.ts";
import {$Jn,qJn} from "../telemetry/5155_qJn.ts";
import {yE,_ve,Mk,dO} from "../../vendor/m2278.ts";
import {n4,mz} from "../../vendor/m2349.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {b} from "../../runtime.ts";
import {ig} from "../../vendor/m130.ts";
/**
 * Background-session daemon control server (Claude Code v2.1.190).
 *
 * Implements the unix-socket control protocol that the CLI uses to talk to the
 * background supervisor daemon: dispatching/awaiting jobs, attaching a PTY,
 * resizing, replying, killing, leasing and subscribing to a job's stream.
 *
 * NOTE: top-level identifiers (it, Oi, ec, coe, sTt, CSc, ASc, W, Ve, ...) are
 * cross-module aliases resolved by the bundler — they are NOT renamed here.
 */

/** Configured grace window (ms) before a stalled background attach respawns. */
function kXm() {
  let stallMs = it("tengu_bg_attach_stall_ms", wXm);
  return stallMs === 0 ? 0 : Math.max(2000, stallMs);
}

/**
 * Respawn a stalled background worker: reload its persisted session record,
 * decide resume-vs-prompt-vs-keep, kill the old process and request a respawn.
 */
async function HXm(job, socket, requestRespawn, isCancelled) {
  let dispatch = job.dispatch,
    record = await Oi(ec(dispatch.short)).catch(() => null),
    sessionId = record?.resumeSessionId ?? dispatch.sessionId,
    cwd = record?.cwd ?? dispatch.cwd,
    scan = await coe(sessionId, cwd, record?.linkScanPath),
    hasMessages = scan.hasMessages;
  if (!hasMessages) await sTt.rm(scan.path, {
    force: !0
  }).catch(() => {});
  if (job.getPhase().kind !== "running" || socket.destroyed || isCancelled()) return;
  job.kill("SIGKILL"), requestRespawn({
    ...dispatch,
    cwd: cwd,
    source: "respawn",
    reattachEnv: void 0,
    attachStallRespawns: (dispatch.attachStallRespawns ?? 0) + 1,
    launch: hasMessages ? {
      mode: "resume",
      sessionId: sessionId,
      fork: !1,
      flagArgs: record?.respawnFlags ?? dispatch.respawnFlags
    } : sessionId !== dispatch.sessionId ? {
      mode: "prompt",
      args: ["--session-id", sessionId, ...(record?.respawnFlags ?? dispatch.respawnFlags)]
    } : dispatch.launch
  }).catch(err => Ie(err));
}

/**
 * Create and bind the daemon control server on the unix socket.
 * @param jobs       live job registry (short id -> job)
 * @param dispatchFn dispatch handler returning the in-flight settle promise
 * @param nudgeFn    nudge handler (returns whether a restart is happening)
 * @param shutdownFn shutdown handler (returns count of reaped workers)
 * @param isReady    adoption-complete predicate
 * @param isYielding yield-state predicate
 */
async function RSc(jobs, dispatchFn, nudgeFn, shutdownFn = () => 0, isReady = () => !0, isYielding = () => !1) {
  let sockPath = aJ();
  await UKn();
  let controlKey = await o_l();
  await sTt.unlink(sockPath).catch(() => {});
  let conns = new Set(),
    leases = new Map(),
    leaseChange = Ni(),
    addLease = (conn, client) => {
      if (leases.has(conn)) return;
      leases.set(conn, client), W("tengu_daemon_lease", {
        op: Ve("open"),
        label: client?.label ?? null
      }), conn.once("close", () => {
        leases.delete(conn), W("tengu_daemon_lease", {
          op: Ve("close"),
          label: client?.label ?? null
        }), leaseChange.emit();
      }), leaseChange.emit();
    },
    listLeases = () => {
      let out = [];
      for (let client of leases.values()) if (client) out.push(client);
      return out;
    },
    server = CSc.createServer(conn => {
      conn.on("error", () => conn.destroy()), conn.setTimeout(30000, () => conn.destroy()), conns.add(conn), conn.once("close", () => conns.delete(conn));
      let peerUidErr = TSc(conn);
      if (peerUidErr) {
        W("tengu_daemon_peer_uid_reject", {}), conn.once("data", () => fp(conn, {
          ok: !1,
          code: "EPEERUID",
          error: peerUidErr
        }));
        return;
      }
      let buf = Buffer.alloc(0),
        onData = chunk => {
          buf = Buffer.concat([buf, chunk]);
          let nl = buf.indexOf(10);
          if (nl < 0) {
            if (buf.length > yjt) conn.off("data", onData), fp(conn, {
              ok: !1,
              code: "ETOOLARGE",
              error: `request exceeds ${yjt >> 20}MB — shorten the prompt or send in parts`
            });
            return;
          }
          conn.off("data", onData), conn.setTimeout(0);
          let line = buf.subarray(0, nl).toString("utf8"),
            rest = buf.subarray(nl + 1);
          IXm(jobs, dispatchFn, nudgeFn, shutdownFn, isReady, isYielding, addLease, listLeases, controlKey, conn, line, rest).catch(err => {
            fp(conn, {
              ok: !1,
              error: Ce(err),
              code: "EUNKNOWN"
            });
          });
        };
      conn.on("data", onData);
    });
  return server.on("error", err => {
    if (sp(err) && err.syscall === "listen") {
      A(`bg control server bind: ${Ce(err)}`, {
        level: "warn"
      });
      return;
    }
    Ie(err);
  }), await new Promise((resolve, reject) => {
    server.once("error", reject), server.listen(sockPath, () => {
      server.removeListener("error", reject), resolve();
    });
  }), {
    close: opts => new Promise(resolve => {
      for (let conn of conns) conn.destroy();
      server.close(() => {
        if (!opts?.skipUnlink) sTt.unlink(sockPath).catch(() => {});
        resolve();
      });
    }),
    leaseCount: () => leases.size,
    onLeaseChange: leaseChange
  };
}

/** Send a final newline-delimited JSON reply and close the connection. */
function fp(conn, payload) {
  if (conn.destroyed) return;
  conn.end(Pe(payload) + `
`);
}

/** Write a newline-delimited JSON event; destroy the conn if backed up. */
function _jt(conn, payload) {
  if (conn.destroyed) return;
  if (conn.writableLength > yjt) {
    conn.destroy();
    return;
  }
  conn.write(Pe(payload) + `
`);
}

/** A job is "alive" when it has no outcome and isn't retiring or being killed. */
function D9o(job) {
  return !job.record.outcome && !job.isRetiring && !job.isKilling;
}

/**
 * Wait (up to a deadline) for a job with the given short id (and nonce) to
 * become acknowledgeable, then reply with its identity, ESTALE or ETIMEOUT.
 */
async function ESc(jobs, conn, op, short, nonce, timeoutMs, settlePromise) {
  let deadline = Date.now() + Math.min(timeoutMs, 30000),
    extended = !1,
    sawNonceMismatch = !1,
    aliveCandidate,
    settled;
  settlePromise?.then(outcome => {
    settled = outcome;
  }, err => {
    Ie(err), settled = "dropped";
  });
  while (Date.now() < deadline) {
    if (conn.destroyed) return;
    let done = settled === "dup-live" || settled === "dropped" || settled === "closed",
      job = jobs.get(short);
    if (job) {
      if (nonce && job.record.nonce !== nonce) {
        if (sawNonceMismatch = !0, aliveCandidate = D9o(job) ? job : void 0, done) break;
        if (!aliveCandidate && !extended) extended = !0, deadline += Math.min(timeoutMs, 30000);
        await Kn(25);
        continue;
      }
      return fp(conn, {
        ok: !0,
        op: op,
        short: short,
        pid: job.record.pid,
        messagingSock: job.record.messagingSock ?? "",
        via: job.via
      });
    }
    if (aliveCandidate = void 0, done) break;
    await Kn(25);
  }
  if (sawNonceMismatch) {
    if (aliveCandidate && jobs.get(short) === aliveCandidate && D9o(aliveCandidate)) return fp(conn, {
      ok: !0,
      op: op,
      short: short,
      pid: aliveCandidate.record.pid,
      messagingSock: aliveCandidate.record.messagingSock ?? "",
      via: aliveCandidate.via
    });
    return fp(conn, {
      ok: !1,
      error: "a previous dispatch with this id is still being cleaned up — retry in a moment",
      code: "ESTALE"
    });
  }
  return fp(conn, {
    ok: !1,
    error: `${wy()} didn't acknowledge in time — retry`,
    code: "ETIMEOUT"
  });
}

/**
 * Parse and dispatch a single control request line. Handles every op of the
 * daemon protocol (ping/nudge/yield/lease/leases/shutdown/list/has/await-ack/
 * dispatch/reply/kill/respawn-stale/resize/attach/ensure-spare/permission-
 * response/subscribe).
 */
async function IXm(jobs, dispatchFn, nudgeFn, shutdownFn, isReady, isYielding, addLease, listLeases, controlKey, conn, line, pending) {
  let req;
  try {
    req = qt(line);
  } catch {
    return fp(conn, {
      ok: !1,
      error: "bad json",
      code: "EUNKNOWN"
    });
  }
  if (req === null || typeof req !== "object") return fp(conn, {
    ok: !1,
    error: "bad json",
    code: "EUNKNOWN"
  });
  let op = req.op;
  if (op === "ping") return fp(conn, {
    ok: !0,
    op: "ping",
    version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION,
    proto: zd
  });
  if (op === "nudge") return fp(conn, {
    ok: !0,
    op: "nudge",
    restarting: await nudgeFn(),
    version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION
  });
  if (op === "yield") return fp(conn, {
    ok: !0,
    op: "yield",
    yielding: isYielding()
  });
  if (op === "lease") {
    addLease(conn, xXm(req.client)), conn.write(Pe({
      ok: !0,
      op: "lease"
    }) + `
`);
    return;
  }
  if (op === "leases") return fp(conn, {
    ok: !0,
    op: "leases",
    clients: listLeases()
  });
  if (op === "shutdown") {
    let reapWorkers = req.reapWorkers !== !1,
      reaped = shutdownFn(reapWorkers);
    return fp(conn, {
      ok: !0,
      op: "shutdown",
      reaped: reaped
    });
  }
  if (!isReady()) return fp(conn, {
    ok: !1,
    error: `${wy()} starting (adoption in progress)`,
    code: "ESTARTING"
  });
  let proto = req.proto;
  if (typeof proto !== "number" || !Number.isInteger(proto) || proto < E8t || proto > zd) return W("tengu_bg_proto_mismatch", {
    client_proto: typeof proto === "number" ? proto : -1,
    server_proto: zd
  }), fp(conn, {
    ok: !1,
    error: `proto mismatch (server=${zd}, client=${proto}) — ${wy()} and CLI versions differ; restart claude`,
    code: "EPROTO",
    serverProto: zd,
    serverVersion: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://code.claude.com/docs/en/overview",
      VERSION: "2.1.190",
      FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
      BUILD_TIME: "2026-06-24T02:21:52Z",
      GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
    }.VERSION
  });
  let parsed = mpl().safeParse(req);
  if (!parsed.success) return fp(conn, {
    ok: !1,
    error: `malformed request: ${parsed.error.issues[0]?.message ?? "invalid"}`,
    code: "EUNKNOWN"
  });
  let msg = parsed.data;
  switch (msg.op) {
    case "ping":
    case "nudge":
    case "yield":
    case "lease":
    case "leases":
    case "shutdown":
      return;
    case "list":
      return fp(conn, {
        ok: !0,
        op: "list",
        jobs: Array.from(jobs.values()).map(job => job.isKilling || job.isRetiring ? {
          ...job.record,
          dying: !0
        } : job.record)
      });
    case "has":
      {
        let job = jobs.get(msg.short);
        return fp(conn, {
          ok: !0,
          op: "has",
          alive: job !== void 0 && D9o(job),
          present: job !== void 0,
          ready: job !== void 0 && !job.isBooting
        });
      }
    case "await-ack":
      return ESc(jobs, conn, "await-ack", msg.short, msg.nonce, msg.timeoutMs);
    case "dispatch":
      if (!Jte(msg.auth, controlKey)) return fp(conn, {
        ok: !1,
        error: "dispatch rejected: this client didn't present the daemon control key",
        code: "EAUTH"
      });
      if (await Kn(0), conn.readableEnded || conn.destroyed) {
        W("tengu_bg_dispatch_stale_drop", {});
        return;
      }
      return ESc(jobs, conn, "dispatch", msg.d.short, msg.d.nonce, msg.timeoutMs, dispatchFn(msg.d));
    case "reply":
      {
        if (!Jte(msg.auth, controlKey)) return fp(conn, {
          ok: !1,
          error: msg.auth === void 0 ? "reply rejected: this window didn't present the daemon control key — it is likely running a Claude Code older than the daemon (left open across an update?); restart this window and retry, or stop driving the control socket directly" : "reply rejected: the presented daemon control key doesn't match — retry, and restart the Claude Code daemon if this persists",
          code: "EAUTH"
        });
        let job = jobs.get(msg.short);
        if (!job || job.isRetiring || job.isKilling || job.record.outcome) return fp(conn, {
          ok: !1,
          error: "job not found — it may have already exited",
          code: "ENOJOB"
        });
        if (!(await job.reply(msg.text))) return fp(conn, {
          ok: !1,
          error: "job isn't accepting replies — it may be in a non-interactive state",
          code: "ENOREPLY"
        });
        return fp(conn, {
          ok: !0,
          op: "reply"
        });
      }
    case "kill":
      {
        let job = jobs.get(msg.short);
        if (!job) return fp(conn, {
          ok: !1,
          error: "job not found — it may have already exited",
          code: "ENOJOB"
        });
        if (job.dispatch.launch.mode === "exec" && job.record.outcome) return jobs.delete(msg.short), fp(conn, {
          ok: !0,
          op: "kill"
        });
        return job.kill(msg.signal ?? "SIGTERM"), fp(conn, {
          ok: !0,
          op: "kill"
        });
      }
    case "respawn-stale":
      {
        let job = jobs.get(msg.short);
        if (!job) return fp(conn, {
          ok: !1,
          error: "job not found — it may have already exited",
          code: "ENOJOB"
        });
        let result = await job.respawnIfIdleStale();
        return fp(conn, {
          ok: !0,
          op: "respawn-stale",
          ...result
        });
      }
    case "resize":
      {
        let job = jobs.get(msg.short);
        if (!job) return fp(conn, {
          ok: !1,
          error: "job not found — it may have already exited",
          code: "ENOJOB"
        });
        if (msg.attachId) {
          let attacher = job.attachers.get(msg.attachId);
          if (!attacher) return fp(conn, {
            ok: !0,
            op: "resize"
          });
          if (attacher.cols = msg.cols, attacher.rows = msg.rows, attacher.repaint) return attacher.repaint(), fp(conn, {
            ok: !0,
            op: "resize"
          });
        }
        return job.resize(msg.cols, msg.rows), fp(conn, {
          ok: !0,
          op: "resize"
        });
      }
    case "attach":
      {
        if (msg.auth === void 0) A("[bg-attach] legacy client (no control key) — allowed via peerUid", {
          level: "warn"
        });else if (!Jte(msg.auth, controlKey)) return fp(conn, {
          ok: !1,
          error: "attach rejected: the presented daemon control key doesn't match — retry, and restart the Claude Code daemon if this persists",
          code: "EAUTH"
        });
        let job = jobs.get(msg.short);
        if (!job || job.isKilling || job.record.outcome && job.dispatch.launch.mode !== "exec") return fp(conn, {
          ok: !1,
          error: "job not found — it may have already exited",
          code: "ENOJOB"
        });
        if (job.isUnverified) return fp(conn, {
          ok: !1,
          error: "worker is live but supervisor could not verify its identity — try restarting the supervisor to re-adopt",
          code: "EUNVERIFIED"
        });
        if (job.isRetiring) return fp(conn, {
          ok: !1,
          error: "job is retiring; retry attach",
          code: "ERESPAWNING"
        });
        if (job.record.legacy) {
          let dispatch = job.dispatch,
            record = await Oi(ec(dispatch.short)).catch(() => null),
            sessionId = record?.resumeSessionId ?? dispatch.sessionId,
            cwd = record?.cwd ?? dispatch.cwd,
            scan = await coe(sessionId, cwd, record?.linkScanPath),
            hasMessages = scan.hasMessages;
          if (!hasMessages) await sTt.rm(scan.path, {
            force: !0
          }).catch(() => {});
          if (jobs.get(msg.short) !== job || conn.destroyed) return fp(conn, {
            ok: !1,
            error: "supervisor restarting",
            code: "ERESPAWNING"
          });
          if (!job.isKilling) W("tengu_bg_attach_legacy_autorespawn", {}), job.kill("SIGTERM"), dispatchFn({
            ...dispatch,
            cwd: cwd,
            source: "respawn",
            launch: hasMessages ? {
              mode: "resume",
              sessionId: sessionId,
              fork: !1,
              flagArgs: record?.respawnFlags ?? dispatch.respawnFlags
            } : sessionId !== dispatch.sessionId ? {
              mode: "prompt",
              args: ["--session-id", sessionId, ...(record?.respawnFlags ?? dispatch.respawnFlags)]
            } : dispatch.launch
          }).catch(err => Ie(err));
          return fp(conn, {
            ok: !1,
            error: "legacy job respawning with worker-owned PTY; retry attach",
            code: "ERESPAWNING"
          });
        }
        if (job.record.cliVersion && job.record.cliVersion !== {
          ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
          PACKAGE_URL: "@anthropic-ai/claude-code",
          README_URL: "https://code.claude.com/docs/en/overview",
          VERSION: "2.1.190",
          FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
          BUILD_TIME: "2026-06-24T02:21:52Z",
          GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
        }.VERSION && $Jn()) {
          let result = await job.respawnIfIdleStale(void 0, "attach");
          if (result.respawned || result.reason === "in-progress") return fp(conn, {
            ok: !1,
            error: "job is restarting on the updated Claude Code; retry attach",
            code: "ERESPAWNING"
          });
          if (jobs.get(msg.short) !== job || conn.destroyed) return fp(conn, {
            ok: !1,
            error: "supervisor restarting",
            code: "ERESPAWNING"
          });
        }
        addLease(conn, null), conn.write(Pe({
          ok: !0,
          op: "attach",
          decModes: job.decModeSnapshot(),
          via: job.via,
          tempo: job.record.tempo,
          state: job.record.state
        }) + `
`), W("tengu_bg_attach", {
          tempo: Le(job.record.tempo),
          state: job.record.state,
          via: Le(job.via),
          attachers: job.attachers.size
        });
        let altScreenEnter = yE + _ve,
          tailKeep = 6,
          frameBuffer = [],
          bufferedLen = 0,
          carry = "",
          cancelResize = () => {},
          stallTimer,
          stallTicks = 0,
          respawnCancelled = !1,
          stallMs = kXm(),
          stallTickLimit = stallMs === 0 ? 0 : Math.max(1, Math.ceil((stallMs - 500) / 1000)),
          dimLine = text => Mk + yE + `
  \x1B[2m${text}\x1B[0m
`,
          flushFrames = keep => {
            if (frameBuffer === null) return;
            let pendingFrames = frameBuffer;
            if (frameBuffer = null, clearTimeout(placeholderTimer), keep && !conn.destroyed) for (let frame of pendingFrames) conn.write(frame);
          },
          placeholderTimer = setTimeout(() => {
            let waiting = frameBuffer !== null && bufferedLen === 0,
              holdFrame = waiting && msg.holdingFrame === !0;
            if (!holdFrame) flushFrames(!0);
            if (waiting && !conn.destroyed) {
              if (!holdFrame) {
                let state = job.record.state,
                  notice = state === "starting" || state === "resuming" || state === "adopted" || state === "crashed" ? "Session is starting — it will appear once ready. Ctrl+Z to detach" : "Waiting for session to redraw… Ctrl+Z to detach";
                conn.write(dimLine(notice));
              }
              stallTimer = setInterval(() => {
                if (stallTicks++, stallTickLimit > 0 && stallTicks >= stallTickLimit && !job.isKilling && !job.isRetiring && job.dispatch.launch.mode !== "exec") {
                  clearInterval(stallTimer), stallTimer = void 0, cancelResize();
                  let attempt = job.dispatch.attachStallRespawns ?? 0,
                    info = {
                      state: job.record.state,
                      via: Le(job.via),
                      attempt: attempt
                    };
                  if (attempt >= 2) {
                    if (W("tengu_bg_attach_stall_gave_up", info), conn.write(dimLine("Session keeps stalling at startup.") + rue(`ESTALLED: Session ${msg.short} keeps stalling at startup — check ${ec(msg.short)} for logs.`)), !job.isKilling) job.kill("SIGKILL", "failed", "session keeps stalling at startup");
                    return;
                  }
                  W("tengu_bg_attach_stall_respawn", info), conn.write(dimLine("Session not responding — restarting it…")), HXm(job, conn, dispatchFn, () => respawnCancelled).catch(Ie).finally(() => {
                    if (!conn.destroyed) conn.write(rue("ERESPAWNING: worker stalled, restarting"));
                  });
                  return;
                }
                let attacher = job.attachers.get(attachKey);
                cancelResize(), cancelResize = job.resizeForRepaint(attacher?.cols ?? msg.cols, attacher?.rows ?? msg.rows);
              }, 1000), stallTimer.unref();
            }
          }, 500),
          stopStallTimer = () => {
            if (stallTimer) clearInterval(stallTimer), stallTimer = void 0;
          },
          unsubStream = job.onStream.subscribe(chunk => {
            if (conn.destroyed) return;
            if (respawnCancelled = !0, frameBuffer !== null) {
              let combined = carry + chunk;
              if (combined.includes(Mk) || combined.includes(altScreenEnter)) {
                stopStallTimer();
                let frame = chunk.includes(Mk) || chunk.includes(altScreenEnter) ? chunk : combined;
                if (cancelResize(), flushFrames(!1), conn.writableLength <= yjt) conn.write(job.decModeSnapshot().map(n4).join("") + frame);else conn.destroy();
                return;
              }
              if (frameBuffer.push(chunk), bufferedLen += chunk.length, carry = combined.slice(-tailKeep), bufferedLen > 65536) flushFrames(!0);
              return;
            }
            if (stopStallTimer(), conn.writableLength > yjt) {
              conn.destroy();
              return;
            }
            conn.write(chunk);
          }),
          unsubRepaintDone = job.onRepaintDone.subscribe(() => {
            cancelResize(), flushFrames(!0);
          });
        if (Yt() === "windows") for (let other of job.attachers.values()) other.kick();
        let attachKey = msg.attachId ?? conn;
        job.attachers.set(attachKey, {
          cols: msg.cols,
          rows: msg.rows,
          caps: msg.caps,
          deliver: data => {
            if (!conn.destroyed) conn.write(data);
          },
          kick: () => {
            if (W("tengu_bg_attach_kick", {}), stallTimer) clearInterval(stallTimer), stallTimer = void 0;
            if (clearTimeout(placeholderTimer), cancelResize(), unsubStream(), unsubRepaintDone(), conn.removeAllListeners("data"), !conn.destroyed) conn.write(rue("EKICKED: Session opened in another window")), conn.end();
            job.attachers.delete(attachKey);
          }
        }), job.noteActivity(), job.seedFocus(!0), job.sendAttacherCaps(msg.caps ?? null);
        let renderExecFooter;
        if (job.dispatch.launch.mode === "exec") {
          conn.write(Mk + yE);
          for (let frame of job.ringSnapshot()) conn.write(frame);
          if (flushFrames(!1), renderExecFooter = () => {
            let attacher = job.attachers.get(attachKey);
            if (conn.destroyed || !attacher) return;
            let footer = `\r
\x1B[2m— ${job.record.outcome === "done" ? "done" : job.record.outcome === "killed" ? "stopped" : "failed"} \xB7 Ctrl+Z to return —\x1B[0m\r
`;
            conn.write(footer), attacher.repaint = () => {
              if (conn.destroyed) return;
              conn.write(Mk + yE);
              for (let frame of job.ringSnapshot()) conn.write(frame);
              conn.write(footer);
            };
          }, job.record.outcome) {
            renderExecFooter(), conn.once("close", () => {
              clearTimeout(placeholderTimer), unsubStream(), unsubRepaintDone(), job.attachers.delete(attachKey);
            });
            return;
          }
        }
        cancelResize = job.resizeForRepaint(msg.cols, msg.rows);
        let unsubSettle = job.onSettle.subscribe(() => {
            if (renderExecFooter && job.record.outcome !== "killed") return renderExecFooter();
            conn.end();
          }),
          decoder = new ASc.StringDecoder("utf8"),
          onInput = chunk => {
            let text = decoder.write(chunk);
            if (text.length > 0 && !PXm(text)) job.lastInputAttacher = attachKey;
            job.write(text);
          };
        if (pending.length) onInput(pending);
        conn.on("data", onInput), conn.once("close", () => {
          if (stallTimer) clearInterval(stallTimer);
          if (cancelResize(), flushFrames(!1), unsubStream(), unsubSettle(), unsubRepaintDone(), !job.attachers.delete(attachKey)) return;
          let tail = decoder.end();
          if (tail) job.write(tail);
          if (job.attachers.size > 0) {
            let last = [...job.attachers.values()].at(-1);
            job.resizeForRepaint(last.cols, last.rows), job.sendAttacherCaps(last.caps ? {
              ...last.caps,
              systemTheme: void 0
            } : null);
          } else job.seedFocus(!1), job.sendAttacherCaps(null);
        });
        return;
      }
    case "ensure-spare":
      return fp(conn, {
        ok: !0,
        op: "ensure-spare"
      });
    case "permission-response":
      if (!Jte(msg.auth, controlKey)) return fp(conn, {
        ok: !1,
        error: "permission-response rejected: this client didn't present the daemon control key",
        code: "EAUTH"
      });
      return fp(conn, {
        ok: !0,
        op: "permission-response"
      });
    case "subscribe":
      {
        let job = jobs.get(msg.short);
        if (!job) return fp(conn, {
          ok: !1,
          error: "job not found — it may have already exited",
          code: "ENOJOB"
        });
        if (addLease(conn, null), _jt(conn, {
          type: "snapshot",
          record: job.record,
          streamTail: job.tail(msg.tail ?? 200)
        }), job.record.outcome) {
          _jt(conn, {
            type: "settled",
            outcome: job.record.outcome
          }), conn.end();
          return;
        }
        let unsubs = [job.onStream.subscribe(line => _jt(conn, {
          type: "stream",
          line: line
        })), job.onState.subscribe(patch => _jt(conn, {
          type: "state",
          patch: patch
        })), job.onSettle.subscribe(outcome => {
          _jt(conn, {
            type: "settled",
            outcome: outcome
          }), conn.end();
        })];
        conn.on("close", () => {
          for (let unsub of unsubs) unsub();
        });
        return;
      }
    default:
      return fp(conn, {
        ok: !1,
        error: `unknown op: ${msg.op}`,
        code: "EUNKNOWN"
      });
  }
}

/** Validate and normalize a lease client descriptor ({label, cwd, pid}). */
function xXm(value) {
  if (value === null || typeof value !== "object") return null;
  let obj = value;
  if (typeof obj.label === "string" && typeof obj.cwd === "string" && typeof obj.pid === "number") return {
    label: obj.label,
    cwd: obj.cwd,
    pid: obj.pid
  };
  return null;
}

/** True if the string is purely terminal escape sequences (no real content). */
function PXm(text) {
  if (!text.includes("\x1B")) return !1;
  return text.replace(DXm, "").length === 0;
}

var sTt,
  CSc,
  ASc,
  yjt = 1048576,
  wXm = 5000,
  DXm;
var vSc = b(() => {
  fC();
  dO();
  mz();
  Pf();
  jn();
  kt();
  qe();
  Ct();
  vn();
  Es();
  VT();
  ig();
  tn();
  qJn();
  CL();
  bSc();
  bL();
  oft();
  sTt = require("fs/promises"), CSc = require("net"), ASc = require("string_decoder");
  DXm = /\x1b\[(?:<\d+;\d+;\d+[Mm]|M[\s\S]{3}|I|O|\??\d+;\d+(?:;\d+)*R|[?>]\d+(?:;\d+)*c|\?\d+(?:;\d+)*\$y|\?997;[12]n|\?\d+u)|\x1bP[^\x1b]*\x1b\\|\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g;
});

export {kXm,HXm,RSc,fp,_jt,D9o,ESc,IXm,xXm,PXm,sTt,CSc,ASc,yjt,wXm,DXm,vSc};
