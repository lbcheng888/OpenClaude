// @ts-nocheck
import {getSkillToolCommands as oM,clearCommandMemoizationCaches as jB,clearCommandsCache as Kk,Mm as nT} from "../tools/5174_toSlashCommands.ts";
import {getProjectRoot as I1,getLastInteractionTime as yR,getAdditionalDirectoriesForClaudeMd as ER,lt as w_} from "../session/0132_sent.ts";
import {Ni as TK} from "../../vendor/m127.ts";
import {oB as kC,zke as FPH} from "../../vendor/m2779.ts";
import {$tl as ugK,e8e as mpH,Z5e as upH,$q as lQ} from "../tools/4352_displayName.ts";
import {logForDebugging as N,qe as FH} from "./0236_setHasFormattedOutput.ts";
import {Si as m7,ud as U3} from "../../vendor/m134.ts";
import {jM as Wv,oie as q9H} from "../../vendor/m2269.ts";
import {Ce as GH,Ct as L_} from "../../vendor/m197.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {Ve as O_} from "../../vendor/m5.ts";
import {executeConfigChangeHooks as TPH} from "../../vendor/m5189.ts";
import {hasBlockingResult as $eH,Wd as YO} from "../tools/5204_shouldSkipHookDueToTrust.ts";
import {clearAgentDefinitionsCache as yAH,kg as tA} from "../permissions/4476_toAgentInfos.ts";
import {evictSentSkillNames as XOq,GA as $2} from "../agent/4451_tryGetPDFReference.ts";
import {Wt as Q_,ps as M9} from "../../vendor/m230.ts";
import {b as L,x as u} from "../../runtime.ts";
import {ig as Ow} from "../../vendor/m130.ts";
/*
 * config/5392_persistent.ts - configuration and daemon-control restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
async function XXT(): Promise<any> {
  let H = await oM(I1()),
    _ = new Map();
  for (let q of H) _.set(q.name, Bun.hash(`${q.description}\x00${q.whenToUse ?? ""}`).toString(36));
  return _;
}
function PXT(H: any): any {
  let stabilityThreshold = H?.stabilityThreshold ?? AXT,
    pollInterval = H?.pollInterval ?? wXT,
    K = H?.reloadDebounce ?? fXT,
    O = H?.chokidarInterval ?? jXT,
    T = H?.getFingerprint ?? XXT,
    z = H?.now ?? Date.now,
    $ = H?.lastInteractionTime ?? yR,
    Y = TK(),
    A = kC.subscribe((): any => Y.emit()),
    w = null,
    f = null,
    j = null,
    J = !1,
    D = [],
    M = new Set(),
    X = null,
    P = !1,
    Z = !1,
    W = null,
    G = null;
  async function initialize(): Promise<any> {
    if (P || Z) return;
    if (P = !0, !W) W = ugK((): any => {
      jB(), Y.emit();
    });
    if (D = await WXT(), D.length === 0) return;
    X = await T().catch((): any => null), N(`Watching for changes in skill/command directories: ${D.join(", ")}...`), w = h(O);
    let S = w;
    if (await new Promise((I: any): any => S.once("ready", (): any => I())), zm4) j = setInterval(y, MXT), j.unref?.();
    G = m7(dispose);
  }
  function h(interval: any): any {
    let I = Wv.watch(D, {
      persistent: !0,
      ignoreInitial: !0,
      depth: 2,
      awaitWriteFinish: {
        stabilityThreshold: stabilityThreshold,
        pollInterval: pollInterval
      },
      ignored: (p: any, b: any): any => {
        if (b && !b.isFile() && !b.isDirectory() && !b.isSymbolicLink()) return !0;
        if (p.split(/[/\\]/).some((x: any): any => x === ".git")) return !0;
        if (b?.isFile()) return !p.endsWith(".md");
        return !1;
      },
      ignorePermissionErrors: !0,
      usePolling: zm4,
      interval: interval,
      binaryInterval: interval,
      atomic: !0
    });
    return I.on("add", v), I.on("change", v), I.on("unlink", v), I.on("error", (p: any): any => N(`[skills] watcher error: ${GH(p)}`, {
      level: "warn"
    })), I;
  }
  function y(): any {
    if (Z || !w) return;
    let S = z() - $() > DXT;
    if (S === J) return;
    J = S;
    let I = S ? JXT : O;
    if (N(`[skills] ${S ? "idle" : "active"} \u2014 switching poll interval to ${I}ms`), w.close(), w = h(I), !S) C(_Gq);
  }
  function dispose(): any {
    if (Z = !0, G) G(), G = null;
    if (W) W(), W = null;
    if (j) clearInterval(j), j = null;
    let S = Promise.resolve();
    if (w) S = w.close(), w = null;
    if (f) clearTimeout(f), f = null;
    return M.clear(), A(), Y.clear(), S;
  }
  function v(S: any): any {
    N(`Detected skill change: ${S}`), c("tengu_skill_file_changed", {
      source: O_("chokidar")
    }), C(S);
  }
  function C(S: any): any {
    if (M.add(S), f) clearTimeout(f);
    f = setTimeout(async (): Promise<any> => {
      f = null;
      let I = [...M];
      M.clear();
      let p = I.length === 1 && I[0] === _Gq;
      if (!p) {
        let U = I.find((Q: any): any => Q !== _Gq) ?? I[0],
          F = await TPH("skills", U);
        if ($eH(F)) {
          N(`ConfigChange hook blocked skill reload (${I.length} paths)`);
          return;
        }
      }
      mpH(), Kk(), yAH();
      let b = await T().catch((): any => null);
      if (b === null) {
        Y.emit();
        return;
      }
      if (X !== null && b.size === X.size && [...X].every(([U, F]: any): any => b.get(U) === F)) {
        if (p) return;
        N(`[skills] ${I.length} fs event(s) but skill list unchanged \u2014 skipping re-announce`);
      } else {
        if (X !== null) {
          let U = [...X].filter(([F, Q]: any): any => b.get(F) !== Q).map(([F]: any): any => F);
          if (U.length > 0) XOq(U);
        }
        X = b;
      }
      Y.emit();
    }, K);
  }
  return {
    initialize: initialize,
    dispose: dispose,
    [Symbol.asyncDispose]: dispose,
    subscribe: Y.subscribe
  };
}
async function WXT(): Promise<any> {
  let H = Q_(),
    _ = [],
    q = upH("userSettings", "skills");
  if (q) try {
    await H.stat(q), _.push(q);
  } catch {}
  let K = upH("userSettings", "commands");
  if (K) try {
    await H.stat(K), _.push(K);
  } catch {}
  let O = upH("projectSettings", "skills");
  if (O) try {
    let Y = cT_.resolve(O);
    await H.stat(Y), _.push(Y);
  } catch {}
  let T = upH("projectSettings", "commands");
  if (T) try {
    let Y = cT_.resolve(T);
    await H.stat(Y), _.push(Y);
  } catch {}
  let z = upH("userSettings", "agents");
  if (z) try {
    await H.stat(z), _.push(z);
  } catch {}
  let $ = upH("projectSettings", "agents");
  if ($) try {
    let Y = cT_.resolve($);
    await H.stat(Y), _.push(Y);
  } catch {}
  for (let Y of ER()) {
    let A = cT_.join(Y, ".claude", "skills");
    try {
      await H.stat(A), _.push(A);
    } catch {}
  }
  return _;
}
var cT_,
  AXT = 1000,
  wXT = 500,
  fXT = 300,
  jXT = 2000,
  JXT = 30000,
  DXT = 60000,
  _Gq = "<skill-watcher-idle-wake>",
  MXT = 1e4,
  zm4 = !0,
  dT_;
var zi6 = L((): any => {
  q9H();
  w_();
  nT();
  y_();
  lQ();
  tA();
  $2();
  U3();
  FH();
  L_();
  M9();
  YO();
  Ow();
  FPH();
  cT_ = u(require("path"));
  dT_ = PXT();
});
export {XXT as c$m,PXT as u$m,WXT as d$m,cT_ as Syt,AXT as n$m,wXT as r$m,fXT as o$m,jXT as s$m,JXT as i$m,DXT as a$m,_Gq as PBo,MXT as l$m,zm4 as DQl,dT_ as byt,zi6 as Str};
