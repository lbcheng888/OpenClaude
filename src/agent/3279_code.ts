// @ts-nocheck
import {execFileNoThrow as Bn,oa} from "../../vendor/m684.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {yA as CA,XI as KI} from "../../vendor/m459.ts";
import {Hia as Asa,Iia as hsa} from "../config/3277_type.ts";
import {ven as MZt} from "../config/0571_externalHttp.ts";
import {TQe as rQe,JS as GS,lF as ZB,Mw as Pw} from "../config/2221_recursive.ts";
import {Qen as cen,Qmr as cmr,FMe as TMe,Go as Ko} from "../../vendor/m632.ts";
import {Pn as Dn,Se,bt as St} from "../../vendor/m195.ts";
import {getOriginalCwd as gr,getSessionId as kt,lt as ct} from "../session/0131_sent.ts";
import {s0n as TIn,qia as Rsa,a0n as bIn,l0n as EIn} from "./5148_bigint.ts";
import {isScrubEnabled as Ak,enforceScriptCaps as wNr,isScrubSandboxAvailable as Tfe,scrubSandboxConfig as xNr,subprocessEnv as PO,P1 as E1} from "./2223_subprocessEnv.ts";
import {_tt as ett,see as JZ} from "../../vendor/m2674.ts";
import {SandboxManager as zo,addSandboxAllowWriteDirectory as oqr,Ag as dg} from "../../vendor/m2671.ts";
import {fs as ps} from "../api/0459_getOauthConfig.ts";
import {d9 as J$,Ax as dx} from "../../vendor/m5146.ts";
import {gS as uS,Bot as yot} from "../../vendor/m3259.ts";
import {qot as Eot,vC as TC} from "../../vendor/m5145.ts";
import {MMi as HLi,Kqr as eqr,zqr as tqr} from "../../vendor/m2670.ts";
import {Uot as Sot,XIn as pIn} from "../session/3272_CLAUDECODE.ts";
import {DMt as iMt,HMt as oMt,V$e as E$e,Nq as Eq} from "./3184_code.ts";
import {uN as tN,Zxe as Lxe} from "../telemetry/3181_content.ts";
import {hia as tsa,OYr as Nzr} from "../../vendor/m3270.ts";
import {zt as Yt,qs as $s} from "../../vendor/m635.ts";
import {jMe as CMe,L2 as v2} from "../config/0640_existsSync.ts";
import {A_ as f_,ng as Jh} from "../../vendor/m132.ts";
import {Tnt as rnt,K2e as v2e} from "../../vendor/m2764.ts";
import {d$i as r2i,OOt as uOt} from "../../vendor/m2765.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {jt,ws as bs} from "../../vendor/m228.ts";
import {b} from "../../runtime.ts";
import {ta as na,wn as bn} from "../../vendor/m45.ts";
import {Lr as Or} from "../../vendor/m578.ts";
import {hke as Zxe,yW as tW} from "../../vendor/m3256.ts";
import {o0n as yIn,Mia as Ssa} from "../config/3278_type.ts";
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

export {Gzr as qYr,Lqd as o8d,buildBashProvider as s8d,Kzr as WYr,wsa as $ia,$ae as Qae,isRunnableShell as x_,detectShellPath as GYr,buildBashProvider_2 as l8d,childProcess as Bia,fs as EW,fsPromises as d9e,os as Fia,nodePath as i0n,fsForAccess as Uia,DEFAULT_SHELL_TIMEOUT_MS as r8d,tmpdirWarningEmitted as Nia,getBashProviderCached as jYr,getPowershellProviderCached as i8d,SHELL_PROVIDERS as a8d,DV as initXL};
