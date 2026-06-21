// @ts-nocheck
import {tft as HO_,_ye as h1H} from "../../vendor/m4860.ts";
import {uE as dD,h$ as iI,L1 as Pv} from "../../vendor/m2232.ts";
import {getSettingsForSource as C6,getSettingsAfterPluginLoad as hJ_,yr as N8} from "../config/0740_updateSettingsForSource.ts";
import {shouldSkipHookDueToTrust as VwH,createBaseHookInput as L3,yp as YO} from "../tools/5171_shouldSkipHookDueToTrust.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Pt as u_,Go as Fq} from "../../vendor/m632.ts";
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {Hpe as j3H,stn as gs_,itn as Qs_,L2 as DI} from "../config/0640_existsSync.ts";
import {yW as XQ,hke as eWH} from "../../vendor/m3256.ts";
import {subprocessEnv as QN,P1 as Vv} from "./2223_subprocessEnv.ts";
import {Uot as B6_,u9e as JIH,XIn as J06} from "../session/3272_CLAUDECODE.ts";
import {getProjectRoot as I1,lt as w_} from "../session/0131_sent.ts";
import {Le as bH,qt as d_,Xt as H6} from "../config/0228_encoding.ts";
import {execFileNoThrowWithCwd as c8,oa as l7} from "../../vendor/m684.ts";
import {L1t as wV_,o0n as G06} from "../config/3278_type.ts";
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
/**
 * Subagent status-line command execution and token-sample tracking.
 *
 * Claude Code 2.1.177 semantic restoration. Only private names, TypeScript
 * annotations, and comments were added; runtime literals, property names,
 * operators, control flow, and cross-module link symbols are preserved.
 */

/** Cross-module helper: maintain rolling token-count samples by task id. */
function yb4(H: any, _: any) : any {
  let q = new Set();
  for (let {
    id: K,
    tokenCount: O
  } of _) {
    q.add(K);
    let T = H.get(K);
    if (!T) H.set(K, T = []);
    if (T.push(O), T.length > Vb4) T.splice(0, T.length - Vb4);
  }
  for (let K of H.keys()) if (!q.has(K)) H.delete(K);
}
/** Derive a human-facing task label for status-line JSON. */
function getTaskStatusLineLabel(H: any) : any {
  if ("label" in H && typeof H.label === "string") return H.label;
  if (H.type === "local_agent") return H.progress?.summary;
  if (H.type === "local_bash" && H.kind !== "monitor") return H.command;
  if (H.type === "local_workflow") return H.workflowName ?? H.summary;
  if (H.type === "remote_agent") return H.title;
  if (H.type === "in_process_teammate") return HO_(H);
  return;
}
/** Resolve the configured subagent status-line command. */
function getSubagentStatusLineCommand() : any {
  let H = dD() ? C6("policySettings")?.subagentStatusLine : hJ_("subagentStatusLine");
  return H?.type === "command" ? H.command : void 0;
}
/** Cross-module helper: execute subagent status-line command and parse per-task decorations. */
async function vb4(H: any, _: any, q: any, K: any) : any {
  if (iI()) return {};
  if (VwH()) return N("Skipping subagentStatusLine execution - workspace trust not accepted"), {};
  let O = getSubagentStatusLineCommand();
  if (O === void 0 || H.length === 0) return {};
  let T = u_(),
    z = {
      ...L3(),
      columns: _,
      tasks: H.map(M => ({
        id: M.id,
        name: q.get(M.id),
        type: M.type,
        status: M.status,
        description: M.description,
        label: getTaskStatusLineLabel(M) || M.description,
        startTime: M.startTime,
        tokenCount: M.progress?.tokenCount ?? 0,
        tokenSamples: K.get(M.id) ?? [],
        cwd: M.cwd ?? T
      }))
    },
    $ = t_() === "windows",
    Y = $ ? j3H() : null,
    A = $ && !Y ? await XQ() : null,
    w = $ && Y ? M => M.replaceAll("\\", "/") : M => M,
    f = {
      ...QN(),
      ...B6_(JIH(z)),
      CLAUDE_PROJECT_DIR: w(I1())
    };
  if (Y) gs_(f, Y);
  let j = {
      cwd: T,
      env: f,
      timeout: KJT,
      input: bH(z),
      preserveOutputOnError: !0
    },
    J = A ? await c8(A, wV_(O), {
      ...j
    }) : await c8(Y ? Qs_(O) : O, [], {
      shell: $ ? Y ?? !0 : !0,
      ...j
    });
  if (J.code !== 0) return N(`subagentStatusLine exited ${J.code}: ${J.error ?? J.stderr}`, {
    level: "error"
  }), {};
  let D = {};
  for (let M of J.stdout.split(`
`)) {
    if (!M.trim()) continue;
    let X;
    try {
      X = d_(M);
    } catch {
      N(`subagentStatusLine emitted non-JSON line: ${M}`, {
        level: "error"
      });
      continue;
    }
    let P = OJT().safeParse(X);
    if (!P.success) {
      N(`subagentStatusLine emitted invalid schema: ${P.error.message}`, {
        level: "error"
      });
      continue;
    }
    D[P.data.id] = {
      content: P.data.content
    };
  }
  return D;
}
var KJT = 5000,
  OJT,
  Vb4 = 16;
var Eb4 = L(() => {
  a8();
  w_();
  h1H();
  J06();
  Fq();
  FH();
  l7();
  Pv();
  YO();
  y9();
  N8();
  eWH();
  G06();
  H6();
  Vv();
  DI();
  OJT = kH(() => k.object({
    id: k.string(),
    content: k.string()
  }));
});
export {yb4 as ajl,getTaskStatusLineLabel as NIm,getSubagentStatusLineCommand as AOo,vb4 as ljl,KJT as LIm,OJT as MIm,Vb4 as ijl,Eb4 as cjl};
