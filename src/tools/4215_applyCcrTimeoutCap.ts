// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {C as E} from "../../vendor/m321.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {r6n as m9n,lqt as w9t} from "../../vendor/m4211.ts";
import {l6n as _9n,i6n as h9n,cqt as R9t,a6n as g9n,b5e as Dqe,x7a as t6a,c6n as y9n} from "../../vendor/m4212.ts";
import {mye as Ige,C3t as i2t} from "../../vendor/m3972.ts";
import {Xae as $ae,KO as yL} from "../agent/3295_code.ts";
import {buildDefaultSystemPromptSections as BL,A5e as Oqe} from "../../vendor/m5213.ts";
import {Kxe as MIe,vG as UY} from "../../vendor/m4362.ts";
import {E5e as Pqe,C5e as fut,hS as HC} from "../agent/4362_toolUseCount.ts";
import {l2a as dUa} from "./3947_theme.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {ri as Ri,Ks as ai} from "./2235_userFacingName.ts";
import {dn as an} from "../config/0137_namespace.ts";
import {Zm as cA,Yc as du} from "../config/2709_Zm.ts";
import {jO as SL,dqt as x9t} from "./4385_stripAllEnvVars.ts";
import {qz as ez,EC as AC,v4 as V4,xVr as a6r,IVr as i6r} from "../telemetry/2700_qz.ts";
import {N7a as a6a,P7a as r6a,M7a as i6a,O7a as o6a,L7a as s6a} from "../../vendor/m4213.ts";
import {ve as Re} from "../../vendor/m461.ts";
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
export {MAX_TIMEOUT_MS as Cgo,EHp as yBp,vHp as SBp,u6a as applyCcrTimeoutCap,xHp as CBp,getOutputSchema as Ego,monitorToolBase as F7a,MonitorTool as B7a,THp as hBp,SHp as gBp,bHp as _Bp,CHp as TBp,monitorToolExports as bBp,RHp as EBp,initMonitorToolModule as ABp,HHp as MonitorTool,Ruo as Ago};
