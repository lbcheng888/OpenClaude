// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {E} from "../../vendor/m319.ts";
import {st as rt} from "../../vendor/m5.ts";
import {Z9n as m9n,K9t as w9t} from "../../vendor/m4195.ts";
import {o3n as _9n,n3n as h9n,z9t as R9t,r3n as g9n,Zqe as Dqe,yja as t6a,s3n as y9n} from "../../vendor/m4196.ts";
import {zge as Ige,x2t as i2t} from "../../vendor/m3901.ts";
import {Qae as $ae,initXL as yL} from "../agent/3279_code.ts";
import {KL as BL,t6e as Oqe} from "../../vendor/m5180.ts";
import {e0e as MIe,eJ as UY} from "../../vendor/m4342.ts";
import {e6e as Pqe,Fut as fut,RE as HC} from "../agent/4342_toolUseCount.ts";
import {P2a as dUa} from "./4072_theme.ts";
import {Xr} from "../../vendor/m321.ts";
import {Ri,pi as ai} from "./2227_userFacingName.ts";
import {sn as an} from "../config/0047_namespace.ts";
import {oA as cA,Su as du} from "../config/2697_oA.ts";
import {HL as SL,Y9t as x9t} from "./4363_stripAllEnvVars.ts";
import {hz as ez,TC as AC,sq as V4,ejr as a6r,Z6r as i6r} from "../telemetry/2688_hz.ts";
import {vja as a6a,Sja as r6a,Cja as i6a,bja as o6a,Eja as s6a} from "../../vendor/m4197.ts";
import {we as Re} from "../../vendor/m455.ts";
// @ts-nocheck
var MAX_TIMEOUT_MS = {};
pt(MAX_TIMEOUT_MS, {
  applyCcrTimeoutCap: () => u6a,
  MonitorTool: () => HHp
});
function EHp() {
  return {
    description: E.string().describe("Short human-readable description of what you are monitoring (shown in notifications)."),
    timeout_ms: E.number().min(1000).optional().default(MonitorTool).describe(`Kill the monitor after this deadline. Default ${MonitorTool}ms, max ${getOutputSchema}ms. Ignored when persistent is true.`),
    persistent: E.boolean().optional().default(false).describe("Run for the lifetime of the session (no timeout). Use for session-length watches like PR monitoring or log tails. Stop with TaskStop.")
  };
}
function vHp(e) {
  return e.persistent || e.timeout_ms <= getOutputSchema;
}
function u6a(e) {
  if (!rt(process.env.CLAUDE_CODE_REMOTE)) return {
    timeout_ms: e.timeout_ms,
    persistent: e.persistent
  };
  return {
    timeout_ms: e.persistent ? monitorToolBase : Math.min(e.timeout_ms, monitorToolBase),
    persistent: false
  };
}
async function xHp(e, t, n) {
  let {
      description: r
    } = t,
    {
      timeout_ms: o,
      persistent: s
    } = u6a(t),
    {
      abortController: i,
      toolUseId: a,
      taskRegistry: l
    } = n,
    c = m9n(n),
    u = {},
    d = 0,
    p,
    m,
    f = false,
    A = _9n(h9n, R9t),
    h = g9n(T => {
      if (f) return;
      if (A.tryConsume()) {
        if (d > 0) {
          if (Dqe(r, `[${d} events suppressed \u2014 output rate too high. Consider using TaskStop to restart this monitor with a more selective filter.]`, u.id, {
            isHousekeeping: true,
            agentId: c
          }), d = 0, m !== undefined && Date.now() - m > R9t * 3) p = undefined;
        }
        Dqe(r, T, u.id, {
          agentId: c
        });
        return;
      }
      if (d++, m = Date.now(), p === undefined) p = Date.now();
      if (Date.now() - p > t6a) {
        if (f = true, Dqe(r, `[Monitor stopped \u2014 your script produced too much output (${d} events suppressed over ${Math.round((Date.now() - p) / 1000)}s). Write a new monitor command that filters more aggressively \u2014 a tighter grep --line-buffered pattern or a wrapper script that only emits the specific events you need.]`, u.id, {
          isHousekeeping: true,
          agentId: c
        }), u.id) Ige(u.id, l);
      }
    }),
    g = await $ae(e, i.signal, "bash", {
      preventCwdChanges: true,
      shouldUseSandbox: BL({
        command: e,
        dangerouslyDisableSandbox: t.dangerouslyDisableSandbox
      }),
      onStdout: h.onData,
      sessionEnvVars: n.sessionEnvVars
    }),
    _ = await MIe({
      command: e,
      description: r,
      shellCommand: g,
      toolUseId: a,
      agentId: c,
      kind: "monitor"
    }, {
      abortController: i,
      taskRegistry: l
    });
  u.id = _.taskId, Pqe(c, `monitor:${_.taskId}`, l);
  let y = s ? undefined : setTimeout(() => {
    if (f) return;
    Dqe(r, "[Monitor timed out \u2014 re-arm if needed.]", _.taskId, {
      isHousekeeping: true,
      agentId: c
    }), Ige(_.taskId, l);
  }, o);
  return g.result.then(() => {
    if (y) clearTimeout(y);
    h.flush(true), f = true, fut(c, `monitor:${_.taskId}`, l);
  }), {
    data: {
      taskId: _.taskId,
      timeoutMs: s ? 0 : o,
      persistent: s
    }
  };
}
var getOutputSchema = 3600000,
  monitorToolBase = 1800000,
  MonitorTool = 300000,
  THp = "Shell command or script. Each stdout line is an event; exit ends the watch.",
  SHp = "command contains control characters that would be hidden in the approval dialog",
  bHp = () => E.string().refine(dUa, SHp),
  CHp,
  monitorToolExports,
  RHp,
  initMonitorToolModule,
  HHp;
var Ruo = b(() => {
  Xr();
  Ri();
  HC();
  i2t();
  UY();
  an();
  w9t();
  yL();
  cA();
  SL();
  Oqe();
  y9n();
  ez();
  a6a();
  CHp = {
    message: `timeout_ms must be \u2264 ${getOutputSchema}`,
    path: ["timeout_ms"]
  };
  monitorToolExports = Re(() => E.strictObject({
    ...EHp(),
    command: bHp().describe(THp)
  }).refine(vHp, CHp)), RHp = Re(() => E.object({
    taskId: E.string().describe("ID of the background monitor task."),
    timeoutMs: E.number().describe("Timeout deadline in milliseconds (0 when persistent)."),
    persistent: E.boolean().optional().describe("No timeout \u2014 runs until TaskStop or session end.")
  }));
  initMonitorToolModule = {
    name: AC,
    maxResultSizeChars: 1e4,
    shouldDefer: true,
    userFacingName: r6a,
    getToolUseSummary: i6a,
    getActivityDescription(e) {
      return e?.description ? `Monitoring: ${e.description}` : "Monitoring";
    },
    isEnabled() {
      return V4() && du();
    },
    isConcurrencySafe() {
      return true;
    },
    renderToolUseMessage: o6a,
    renderToolResultMessage: s6a,
    get outputSchema() {
      return RHp();
    },
    mapToolResultToToolResultBlockParam(e, t) {
      return {
        tool_use_id: t,
        type: "tool_result",
        content: `Monitor started (task ${e.taskId}, ${e.persistent ? "persistent \u2014 runs until TaskStop or session end" : `timeout ${e.timeoutMs}ms`}). You will be notified on each event. Keep working \u2014 do not poll or sleep. Events may arrive while you are waiting for the user \u2014 an event is not their reply.`
      };
    }
  }, HHp = ai({
    ...initMonitorToolModule,
    searchHint: "watch, monitor, or keep an eye on a process/log/command \u2014 stream each stdout line as a live notification",
    async description() {
      return a6r + i6r();
    },
    async prompt() {
      return a6r + i6r();
    },
    get inputSchema() {
      return monitorToolExports();
    },
    toAutoClassifierInput(e) {
      return e.command;
    },
    async checkPermissions(e, t) {
      return x9t(e, t);
    },
    async call(e, t) {
      return xHp(e.command, e, t);
    }
  });
});

export {MAX_TIMEOUT_MS as Ido,EHp as Q0p,vHp as eDp,u6a as applyCcrTimeoutCap,xHp as rDp,getOutputSchema as Hdo,monitorToolBase as wja,MonitorTool as Rja,THp as Y0p,SHp as J0p,bHp as X0p,CHp as Z0p,monitorToolExports as tDp,RHp as nDp,initMonitorToolModule as oDp,HHp as MonitorTool,Ruo as Ddo};
