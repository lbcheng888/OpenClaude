// @ts-nocheck
import {execFileNoThrow as Bn,Ii as oa} from "../../vendor/m690.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Rm as CA,tI as KI} from "../../vendor/m465.ts";
import {Mma as Asa,Nma as hsa} from "../config/3293_type.ts";
import {irn as MZt} from "../config/0577_externalHttp.ts";
import {bet as rQe,hE as GS,xF as ZB,resolveToolAlias as Pw} from "../config/2229_observed_uid.ts";
import {Prn as cen,wyr as cmr,D1e as TMe,Po as Ko} from "../../vendor/m638.ts";
import {In as Dn,Ce as Se,Ct as St} from "../../vendor/m197.ts";
import {getOriginalCwd as gr,getSessionId as kt,lt as ct} from "../session/0132_sent.ts";
import {YPn as TIn,jma as Rsa,XPn as bIn,QPn as EIn} from "./5180_bigint.ts";
import {isScrubEnabled as Ak,enforceScriptCaps as wNr,isScrubSandboxAvailable as Tfe,scrubSandboxConfig as xNr,subprocessEnv as PO,VM as E1} from "./2231_subprocessEnv.ts";
import {brt as ett,nee as JZ} from "../../vendor/m2685.ts";
import {SandboxManager as zo,addSandboxAllowWriteDirectory as oqr,Uh as dg} from "../../vendor/m2682.ts";
import {os as ps} from "../api/0465_getOauthConfig.ts";
import {M$ as J$,vw as dx} from "../../vendor/m5178.ts";
import {My as uS,T3e as yot} from "../../vendor/m3275.ts";
import {$it as Eot,wE as TC} from "../../vendor/m5177.ts";
import {S$i as HLi,RGr as eqr,vGr as tqr} from "../../vendor/m2681.ts";
import {Bit as Sot,$Pn as pIn} from "../session/3288_CLAUDECODE.ts";
import {uFt as iMt,lFt as oMt,Z9e as E$e,Z4 as Eq} from "./3198_code.ts";
import {A1 as tN,qHe as Lxe} from "../telemetry/3195_content.ts";
import {Ema as tsa,_eo as Nzr} from "../../vendor/m3286.ts";
import {Yt,Es as $s} from "../../vendor/m641.ts";
import {M1e as CMe,r2 as v2} from "../config/0646_existsSync.ts";
import {A_ as f_,zf as Jh} from "../../vendor/m133.ts";
import {Rot as rnt,Z$e as v2e} from "../../vendor/m2776.ts";
import {n8i as r2i,m1t as uOt} from "../../vendor/m2777.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {Wt as jt,ps as bs} from "../../vendor/m230.ts";
import {b} from "../../runtime.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
import {Ir as Or} from "../../vendor/m584.ts";
import {oIe as Zxe,LW as tW} from "../../vendor/m3272.ts";
import {jPn as yIn,qma as Ssa} from "../config/3294_type.ts";
// @ts-nocheck
async function Gzr(e) {
  try {
    return fsForAccess.accessSync(e, fs.constants.X_OK), true;
  } catch (t) {
    let {
      code: n
    } = await Bn(e, ["--version"], {
      timeout: 1000,
      useCwd: false
    });
    return n === 0;
  }
}
async function Lqd() {
  let e = process.env.CLAUDE_CODE_SHELL;
  if (e) if ((e.includes("bash") || e.includes("zsh")) && (await Gzr(e))) return v(`Using shell override: ${e}`), e;else v(`CLAUDE_CODE_SHELL="${e}" is not a valid bash/zsh path, falling back to detection`);
  let t = process.env.SHELL,
    n = t && (t.includes("bash") || t.includes("zsh")),
    r = t?.includes("bash"),
    [o, s] = await Promise.all([CA("zsh"), CA("bash")]),
    i = ["/bin", "/usr/bin", "/usr/local/bin", "/opt/homebrew/bin"],
    l = (r ? ["bash", "zsh"] : ["zsh", "bash"]).flatMap(u => i.map(d => `${d}/${u}`));
  if (r) {
    if (s) l.unshift(s);
    if (o) l.push(o);
  } else {
    if (o) l.unshift(o);
    if (s) l.push(s);
  }
  if (n && (await Gzr(t))) l.unshift(t);
  let c;
  for (let u of l) if (u && (await Gzr(u))) {
    c = u;
    break;
  }
  if (!c) {
    let u = "No suitable shell found. Claude CLI requires a Posix shell environment. Please ensure you have a valid shell installed and the SHELL environment variable set.";
    throw v(u, {
      level: "error"
    }), Error(u);
  }
  return c;
}
async function buildBashProvider() {
  let e = await Lqd();
  return {
    provider: await Asa(e)
  };
}
async function Kzr() {
  try {
    let {
      provider: e
    } = await getBashProviderCached();
    return MZt(e.shellPath);
  } catch {
    return "none";
  }
}
function wsa() {
  getBashProviderCached.cache?.clear?.();
}
async function $ae(e, t, n, r) {
  let {
      timeout: o,
      onProgress: s,
      preventCwdChanges: i,
      shouldUseSandbox: a,
      shouldAutoBackground: l,
      onStdout: c,
      sessionEnvVars: u,
      effortLevel: d
    } = r ?? {},
    p = o || DEFAULT_SHELL_TIMEOUT_MS,
    m = await SHELL_PROVIDERS[n](),
    f = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0"),
    A = a ? rQe() : undefined;
  if (A !== undefined && !tmpdirWarningEmitted) {
    let U = GS();
    if (A !== U) tmpdirWarningEmitted = true, v(`CLAUDE_CODE_TMPDIR makes the per-uid temp dir ${Buffer.byteLength(U)} bytes, too long for AF_UNIX sockets; child-process $TMPDIR falls back to ${A}. ` + "Shorten CLAUDE_CODE_TMPDIR to \u2264~30 bytes if child processes should use your override.", {
      level: "warn"
    });
  }
  let {
      commandString: h,
      cwdFilePath: g
    } = await m.buildExecCommand(e, {
      id: f,
      sandboxTmpDir: A,
      useSandbox: a ?? false
    }),
    _ = h,
    y = cen(),
    T = false;
  try {
    await fsPromises.realpath(y);
  } catch (U) {
    T = Dn(U);
  }
  if (T) {
    let U = [gr(), os.homedir(), ZB()],
      $ = null,
      F = -1;
    for (let [W, G] of U.entries()) try {
      $ = await fsPromises.realpath(G), F = W;
      break;
    } catch {}
    if ($ === null) return TIn(`Working directory "${y}" no longer exists. Please restart Claude from an existing directory.`);
    if (v(`Shell CWD "${y}" no longer exists, recovering to "${$}"`), cmr($), F > 0) return TIn(`Working directory "${y}" was deleted; shell cwd recovered to "${$}". Re-issue your command (it will run from the recovered directory).`);
    y = $;
  }
  if (t.aborted) return Rsa();
  let S = m.shellPath,
    C = a && n === "powershell",
    R = C ? "/bin/sh" : S;
  if (Ak()) {
    let U = await ett(e);
    wNr(U.kind === "simple" ? U.commands.map($ => $.text).join(`
`) : e);
  }
  if (a) {
    let U;
    if (Ak() && Tfe()) {
      let $ = xNr(),
        F = $.filesystem.denyWrite,
        W = $.filesystem.allowWrite,
        G = zo.getFsWriteConfig(),
        K = zo.getConfig()?.filesystem,
        Q = K?.allowWrite ?? [],
        V = ps([...W, ...Q.filter(J => J !== "/" && J.length > 0)]),
        Y = G.denyWithinAllow.filter(J => V.some(ee => J === ee || J.startsWith(`${ee}/`)) && !F.some(ee => J === ee || J.startsWith(`${ee}/`)));
      U = {
        ...$,
        filesystem: {
          allowWrite: V,
          denyWrite: ps([...F, ...Y]),
          denyRead: ps([...$.filesystem.denyRead, ...(K?.denyRead ?? [])])
        }
      };
    }
    if (A && !process.env.CLAUDE_TMPDIR) process.env.CLAUDE_TMPDIR = A;
    _ = await zo.wrapWithSandbox(_, R, U, t);
  }
  let k = C ? "/bin/sh" : S,
    x = C ? ["-c", _] : m.getSpawnArgs(_),
    I = await m.getEnvironmentOverrides(e, u),
    H = !!c,
    P = J$("local_bash"),
    O = new uS(P, s ?? null, !H);
  await fsPromises.mkdir(Eot(), {
    recursive: true
  });
  let D, M;
  if (!H) {
    let U = fs.constants.O_NOFOLLOW ?? 0;
    D = await fsPromises.open(O.path, fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_APPEND | U);
  }
  try {
    M = a ? await HLi() : undefined;
    let U = childProcess.spawn(k, x, {
        env: {
          ...PO(),
          SHELL: n === "bash" ? S : undefined,
          GIT_EDITOR: "true",
          ...I,
          ...Sot({
            sessionId: kt(),
            effortLevel: d,
            source: "agent"
          })
        },
        cwd: y,
        stdio: buildBashProvider_2(H, D?.fd, M),
        detached: m.detached,
        windowsHide: true
      }),
      $ = bIn(U, t, p, O, l),
      F = iMt("claude_code.bash.subprocess", {
        spanType: "bash.subprocess",
        attrs: {
          "shell.type": n,
          command_length: e.length,
          timeout_ms: p,
          command: tN(e).content
        }
      });
    if (F) {
      let G = tsa(e).catch(() => []);
      $.result.then(async K => {
        let Q = await G;
        if (Q.length > 0) oMt(F, {
          command_prefix: Q.map(V => tN(V).content)
        });
        if (oMt(F, {
          exit_code: K.code,
          stdout_bytes: K.outputFileSize ?? Buffer.byteLength(K.stdout),
          stderr_bytes: Buffer.byteLength(K.stderr),
          interrupted: K.interrupted,
          ...(K.backgroundTaskId && {
            backgrounded: true
          })
        }), K.interrupted) E$e(F, `interrupted (exit ${K.code})`);
      }).catch(K => {
        E$e(F, Se(K));
      }).finally(() => F.end()).catch(() => {});
    }
    if (D !== undefined) try {
      await D.close();
    } catch {}
    if (M !== undefined) try {
      fs.closeSync(M);
    } catch {}
    if (U.stdout && c) U.stdout.on("data", G => {
      c(typeof G === "string" ? G : G.toString());
    });
    let W = Yt() === "windows" ? CMe(g) : g;
    return $.result.then(async G => {
      if (a) zo.cleanupAfterCommand();
      if (G && !i && !G.backgroundTaskId) try {
        let K = fs.readFileSync(W, {
          encoding: "utf8"
        }).trim();
        if (Yt() === "windows") K = CMe(K);
        if (f_(K) !== y) {
          if (isRunnableShell(K, y), !TMe()) rnt(), r2i(y, K);
        }
      } catch {
        j("tengu_shell_set_cwd", {
          success: false
        });
      }
      try {
        fs.unlinkSync(W);
      } catch {}
    }), $;
  } catch (U) {
    if (D !== undefined) try {
      await D.close();
    } catch {}
    if (M !== undefined) try {
      fs.closeSync(M);
    } catch {}
    return O.clear(), v(`Shell exec error: ${Se(U)}`), TIn(Se(U));
  }
}
function isRunnableShell(candidatePath, t) {
  let n = nodePath.isAbsolute(candidatePath) ? candidatePath : nodePath.resolve(t || jt().cwd(), candidatePath),
    r;
  try {
    r = jt().realpathSync(n);
  } catch (o) {
    if (Dn(o)) throw Error(`Path "${n}" does not exist`);
    r = n;
  }
  cmr(r);
  try {
    j("tengu_shell_set_cwd", {
      success: true
    });
  } catch (o) {}
}
function detectShellPath(e, t) {
  oqr(e, t);
}
function buildBashProvider_2(e, t, n) {
  let r = e ? ["pipe", "pipe", "pipe"] : ["pipe", t, t];
  if (n !== undefined) r[eqr] = n;
  return r;
}
var childProcess,
  fs,
  fsPromises,
  os,
  nodePath,
  fsForAccess,
  DEFAULT_SHELL_TIMEOUT_MS = 1800000,
  tmpdirWarningEmitted = false,
  getBashProviderCached,
  getPowershellProviderCached,
  SHELL_PROVIDERS;
var DV = b(() => {
  na();
  Ct();
  ct();
  dx();
  Jh();
  Ko();
  je();
  St();
  oa();
  bs();
  EIn();
  TC();
  yot();
  Pw();
  KI();
  JZ();
  Nzr();
  pIn();
  Or();
  uOt();
  $s();
  dg();
  tqr();
  v2e();
  hsa();
  Zxe();
  yIn();
  E1();
  Lxe();
  Eq();
  v2();
  childProcess = require("child_process"), fs = require("fs"), fsPromises = require("fs/promises"), os = require("os"), nodePath = require("path"), fsForAccess = require("fs");
  getBashProviderCached = bn(buildBashProvider);
  getPowershellProviderCached = bn(async () => {
    let powershellPath = await tW();
    if (!powershellPath) throw Error("PowerShell is not available");
    return Ssa(powershellPath);
  }), SHELL_PROVIDERS = {
    bash: async () => (await getBashProviderCached()).provider,
    powershell: getPowershellProviderCached
  };
});
export {Gzr as Reo,Lqd as VXd,buildBashProvider as KXd,Kzr as weo,wsa as zma,$ae as Xae,isRunnableShell as markTelemetryString,detectShellPath as keo,buildBashProvider_2 as YXd,childProcess as Gma,fs as FW,fsPromises as E3e,os as Vma,nodePath as JPn,fsForAccess as Kma,DEFAULT_SHELL_TIMEOUT_MS as GXd,tmpdirWarningEmitted as Wma,getBashProviderCached as veo,getPowershellProviderCached as zXd,SHELL_PROVIDERS as jXd,DV as KO};
