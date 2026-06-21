// @ts-nocheck
import {VKn as zd6,bHo as u2q,vC as HX} from "../../vendor/m5145.ts";
import {b as L} from "../../runtime.ts";
import {logForDebugging as k} from "../config/0234_setHasFormattedOutput.ts";
import {formatDuration as p7,ps as H9} from "../../vendor/m238.ts";
import {rKr as kQ8,oKr as NQ8} from "../telemetry/3179_cwd.ts";
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {gS as ej,Bot as m6_} from "../../vendor/m3259.ts";
import {d9 as ev,Ax as nW} from "../../vendor/m5146.ts";
import {dn as L6,bt as L_} from "../../vendor/m195.ts";
/*
 * agent/5127_bigint.ts - agent/background-task restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols and exported names are kept as-is.
 * - Internal names are restored where verified from local property usage.
 * - Short names are retained when not verified.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 */
async function n9K(): Promise<any> {
  await Promise.allSettled(Array.from(p2q));
}
function Q5T(H: any, _: any): any {
  return _ ? `${H} ${_}` : H;
}
async function c5T(H: any): Promise<any> {
  try {
    let _ = fL4.dirname(H),
      q = await Ad6.statfs(_, {
        bigint: !0
      }),
      K = q.bavail * q.bsize / (1024n * 1024n),
      O = "Free up space or set CLAUDE_CODE_TMPDIR to a directory on a filesystem with room.";
    if (K < 0n) return null;
    if (K < 10n) return `Command output was lost: the temp filesystem at ${_} is full (${K}MB free). The child process's stdout/stderr writes failed with ENOSPC. Free up space or set CLAUDE_CODE_TMPDIR to a directory on a filesystem with room.`;
    if (q.files > 0n && q.ffree < 1000n) return `Command output was lost: the temp filesystem at ${_} is out of inodes (${q.ffree} free). The child process's stdout/stderr writes failed with ENOSPC. Free up space or set CLAUDE_CODE_TMPDIR to a directory on a filesystem with room.`;
  } catch {}
  return null;
}
class B2q {
  #H;
  #_ = !1;
  #q;
  #z;
  #T = this.#Y.bind(this);
  constructor(H: any, _: any, q: any) {
    this.#H = H, this.#q = _, this.#z = q, H.setEncoding("utf-8"), H.on("data", this.#T);
  }
  #Y(H: any): any {
    let _ = typeof H === "string" ? H : H.toString();
    if (this.#z) this.#q.writeStderr(_);else this.#q.writeStdout(_);
  }
  cleanup(): any {
    if (this.#_) return;
    this.#_ = !0, this.#H.removeListener("data", this.#T), this.#H = null, this.#q = null, this.#T = (): any => {};
  }
}
class U2q {
  #H = "running";
  #_;
  #q;
  #z;
  #T;
  #Y = null;
  #O = null;
  #A = !1;
  #w;
  #$;
  #K;
  #j;
  #X;
  #D = null;
  #f = null;
  #P = null;
  taskOutput;
  static #M(H: any): any {
    if (H.#X && H.#K) H.#K(H.background.bind(H));else H.#S(AL4);
  }
  result;
  onTimeout;
  constructor(H: any, _: any, q: any, K: any, O: any = !1, T: any = zd6) {
    if (this.#T = H, this.#$ = _, this.#j = q, this.#X = O, this.#w = T, this.taskOutput = K, this.#z = H.stderr ? new B2q(H.stderr, K, !0) : null, this.#q = H.stdout ? new B2q(H.stdout, K, !1) : null, O) this.onTimeout = (z: any): any => {
      this.#K = z;
    };
    this.result = this.#E();
  }
  get status(): any {
    return this.#H;
  }
  #Z(): any {
    if (this.#$.reason === "interrupt") return;
    this.kill();
  }
  #L(H: any, _: any): any {
    let q = H !== null && H !== void 0 ? H : _ === "SIGTERM" ? 144 : 1;
    this.#R(q);
  }
  #G(): any {
    this.#R(1);
  }
  #R(H: any): any {
    if (this.#f) this.#f(H), this.#f = null;
  }
  #k(): any {
    this.#W();
    let H = this.#Y;
    if (H) clearTimeout(H), this.#Y = null;
    let _ = this.#P;
    if (_) this.#$.removeEventListener("abort", _), this.#P = null;
  }
  #W(): any {
    if (this.#O) clearInterval(this.#O), this.#O = null;
  }
  #C(): any {
    if (this.#O) return;
    this.#O = setInterval((): any => {
      Ad6.stat(this.taskOutput.path).then((H: any): any => {
        if (H.size > this.#w && (this.#H === "running" || this.#H === "backgrounded") && this.#O !== null) this.#A = !0, this.#W(), this.#S(Yd6);
      }, (): any => {});
    }, g5T), this.#O.unref();
  }
  #E(): any {
    if (this.#P = this.#Z.bind(this), this.#$.addEventListener("abort", this.#P, {
      once: !0
    }), this.#T.once("exit", this.#L.bind(this)), this.#T.once("error", this.#G.bind(this)), this.#Y = setTimeout(U2q.#M, this.#j, this), this.taskOutput.stdoutToFile) this.#C();
    let H = new Promise((_: any): any => {
      this.#f = _;
    });
    return new Promise((_: any): any => {
      this.#D = _, H.then(this.#N.bind(this));
    });
  }
  async #N(code: any): Promise<any> {
    if (this.#k(), this.#H === "running" || this.#H === "backgrounded") this.#H = "completed";
    let stdout = await this.taskOutput.getStdout(),
      q = {
        code: code,
        stdout: stdout,
        stderr: this.taskOutput.getStderr(),
        interrupted: code === Yd6,
        backgroundTaskId: this.#_
      };
    if (this.taskOutput.stdoutToFile && !this.#_) if (this.taskOutput.outputFileRedundant || this.#A) setImmediate((): any => {
      if (!this.#_) this.taskOutput.deleteOutputFile();
    });else q.outputFilePath = this.taskOutput.path, q.outputFileSize = this.taskOutput.outputFileSize, q.outputTaskId = this.taskOutput.taskId;
    let K = (T: any): any => {
      if (this.taskOutput.stdoutToFile && !this.#_) q.stdout = stdout ? `${T}
${stdout}` : T;else q.stderr = Q5T(T, q.stderr);
    };
    if (this.#A) K(`Command killed: output file exceeded ${u2q}`), q.outputFileSize = this.taskOutput.outputFileSize;else if (code === AL4) K(`Command timed out after ${p7(this.#j)}`);else if (this.taskOutput.stdoutToFile && stdout === "" && code !== 0 && code !== Yd6) {
      let T = await c5T(this.taskOutput.path);
      if (T) q.stdout = T;
    }
    let O = this.#D;
    if (O) this.#D = null, O(q);
  }
  #S(H: any): any {
    this.#H = "killed";
    let _ = this.#T?.pid;
    if (this.#R(H ?? Yd6), !_) return Promise.resolve();
    let q = kQ8(_, "SIGTERM"),
      K = new Promise((O: any): any => {
        let T,
          z = !1,
          $ = setTimeout((): any => {
            z = !0, clearInterval(T);
            try {
              process.kill(-_, "SIGKILL");
            } catch {}
            kQ8(_, "SIGKILL").finally(O);
          }, U5T);
        if ($.unref(), t_() !== "windows") q.then((): any => {
          if (z) return;
          if (wL4(_)) {
            clearTimeout($), O();
            return;
          }
          T = setInterval((): any => {
            if (!wL4(_)) return;
            clearTimeout($), clearInterval(T), O();
          }, F5T), T.unref();
        });
      });
    return p2q.add(K), K.finally((): any => p2q.delete(K)), K;
  }
  kill(): any {
    return this.#S();
  }
  background(H: any, _: any): any {
    if (this.#H === "running") {
      if (this.#_ = H, this.#H = "backgrounded", this.#k(), this.taskOutput.stdoutToFile) this.#C();else if (!_?.skipSpill) this.taskOutput.spillToDisk();
      return !0;
    }
    return !1;
  }
  cleanup(): any {
    this.#q?.cleanup(), this.#z?.cleanup(), this.taskOutput.clear(), this.#k(), this.#T = null, this.#$ = null, this.#K = void 0;
  }
}
function h06(H: any, _: any, q: any, K: any, O: any = !1, T: any = zd6): any {
  return new U2q(H, _, q, K, O, T);
}
class jL4 {
  status = "killed";
  result;
  taskOutput;
  constructor() {
    this.taskOutput = new ej(ev("local_bash"), null), this.result = Promise.resolve({
      code: 145,
      stdout: "",
      stderr: "Command aborted before execution",
      interrupted: !0
    });
  }
  background(): any {
    return !1;
  }
  kill(): any {
    return Promise.resolve();
  }
  cleanup(): any {}
}
function ve7(): any {
  return new jL4();
}
function wL4(H: any): any {
  for (let _ of [-H, H]) try {
    return process.kill(_, 0), !1;
  } catch (q) {
    if (L6(q) !== "ESRCH") return !1;
  }
  return !0;
}
function R06(stderr: any): any {
  let taskOutput = new ej(ev("local_bash"), null);
  return {
    status: "completed",
    result: Promise.resolve({
      code: 1,
      stdout: "",
      stderr: stderr,
      interrupted: !1,
      preSpawnError: stderr
    }),
    taskOutput: taskOutput,
    background(): any {
      return !1;
    },
    kill(): any {
      return Promise.resolve();
    },
    cleanup(): any {}
  };
}
var Ad6,
  fL4,
  Yd6 = 137,
  AL4 = 143,
  U5T = 1500,
  F5T = 100,
  p2q,
  g5T = 5000;
var k06 = L((): any => {
  nW();
  L_();
  H9();
  NQ8();
  y9();
  HX();
  m6_();
  Ad6 = require("fs/promises"), fL4 = require("path"), p2q = new Set();
});

export {n9K as Ica,Q5T as $_m,c5T as q_m,B2q as vHo,U2q as wHo,h06 as a0n,jL4 as JMl,ve7 as qia,wL4 as zMl,R06 as s0n,Ad6 as YKn,fL4 as YMl,Yd6 as zKn,AL4 as KMl,U5T as B_m,F5T as F_m,p2q as CHo,g5T as U_m,k06 as l0n};
