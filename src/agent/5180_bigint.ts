// @ts-nocheck
import {qXn,OOo,wE} from "../../vendor/m5177.ts";
import {b,x} from "../../runtime.ts";
import {logForDebugging as A} from "../config/0236_setHasFormattedOutput.ts";
import {formatDuration as Fi,Xo} from "../../vendor/m240.ts";
import {rFt,cDn} from "../telemetry/3193_cwd.ts";
import {Yt,Es} from "../../vendor/m641.ts";
import {My,T3e} from "../../vendor/m3275.ts";
import {M$,vw} from "../../vendor/m5178.ts";
import {cn,Ct} from "../../vendor/m197.ts";
// @ts-nocheck
async function Wga() {
  await Promise.allSettled(Array.from(MOo));
}
function lkm(message, suffix) {
  return suffix ? `${message} ${suffix}` : message;
}
async function ckm(outputPath) {
  try {
    let dir = P3l.dirname(outputPath),
      stats = await VXn.statfs(dir, {
        bigint: true
      }),
      freeMb = stats.bavail * stats.bsize / (1024n * 1024n),
      hint = "Free up space or set CLAUDE_CODE_TMPDIR to a directory on a filesystem with room.";
    if (freeMb < 0n) return null;
    if (freeMb < 10n) return `Command output was lost: the temp filesystem at ${dir} is full (${freeMb}MB free). The child process's stdout/stderr writes failed with ENOSPC. Free up space or set CLAUDE_CODE_TMPDIR to a directory on a filesystem with room.`;
    if (stats.files > 0n && stats.ffree < 1000n) return `Command output was lost: the temp filesystem at ${dir} is out of inodes (${stats.ffree} free). The child process's stdout/stderr writes failed with ENOSPC. Free up space or set CLAUDE_CODE_TMPDIR to a directory on a filesystem with room.`;
  } catch {}
  return null;
}
class NOo {
  #e;
  #t = false;
  #n;
  #s;
  #i = this.#a.bind(this);
  constructor(stream, taskOutput, isStderr) {
    this.#e = stream, this.#n = taskOutput, this.#s = isStderr, stream.setEncoding("utf-8"), stream.on("data", this.#i);
  }
  #a(chunk) {
    let text = typeof chunk === "string" ? chunk : chunk.toString();
    if (this.#s) this.#n.writeStderr(text);else this.#n.writeStdout(text);
  }
  cleanup() {
    if (this.#t) return;
    this.#t = true, this.#e.removeListener("data", this.#i), this.#e = null, this.#n = null, this.#i = () => {};
  }
}
class FOo {
  #e = "running";
  #t;
  #n;
  #s;
  #i;
  #a = null;
  #o = null;
  #c = false;
  #u;
  #l;
  #r;
  #p;
  #g;
  #f = null;
  #d = null;
  #_ = null;
  taskOutput;
  static #h(self) {
    if (self.#g && self.#r) self.#r(self.background.bind(self));else self.#I(x3l);
  }
  result;
  onTimeout;
  constructor(child, abortSignal, timeoutMs, taskOutput, allowBackgroundOnTimeout = false, maxOutputFileSize = qXn) {
    if (this.#i = child, this.#l = abortSignal, this.#p = timeoutMs, this.#g = allowBackgroundOnTimeout, this.#u = maxOutputFileSize, this.taskOutput = taskOutput, this.#s = child.stderr ? new NOo(child.stderr, taskOutput, true) : null, this.#n = child.stdout ? new NOo(child.stdout, taskOutput, false) : null, allowBackgroundOnTimeout) this.onTimeout = cb => {
      this.#r = cb;
    };
    this.result = this.#H();
  }
  get status() {
    return this.#e;
  }
  #T() {
    if (this.#l.reason === "interrupt") return;
    this.kill();
  }
  #E(code, signal) {
    let resolvedCode = code !== null && code !== undefined ? code : signal === "SIGTERM" ? 144 : 1;
    this.#b(resolvedCode);
  }
  #S() {
    this.#b(1);
  }
  #b(code) {
    if (this.#d) this.#d(code), this.#d = null;
  }
  #A() {
    this.#y();
    let timeoutHandle = this.#a;
    if (timeoutHandle) clearTimeout(timeoutHandle), this.#a = null;
    let abortListener = this.#_;
    if (abortListener) this.#l.removeEventListener("abort", abortListener), this.#_ = null;
  }
  #y() {
    if (this.#o) clearInterval(this.#o), this.#o = null;
  }
  #x() {
    if (this.#o) return;
    this.#o = setInterval(() => {
      VXn.stat(this.taskOutput.path).then(stats => {
        if (stats.size > this.#u && (this.#e === "running" || this.#e === "backgrounded") && this.#o !== null) this.#c = true, this.#y(), this.#I(GXn);
      }, () => {});
    }, akm), this.#o.unref();
  }
  #H() {
    if (this.#_ = this.#T.bind(this), this.#l.addEventListener("abort", this.#_, {
      once: true
    }), this.#i.once("exit", this.#E.bind(this)), this.#i.once("error", this.#S.bind(this)), this.#a = setTimeout(FOo.#h, this.#p, this), this.taskOutput.stdoutToFile) this.#x();
    let exitPromise = new Promise(resolve => {
      this.#d = resolve;
    });
    return new Promise(resolve => {
      this.#f = resolve, exitPromise.then(this.#R.bind(this));
    });
  }
  async #R(code) {
    if (this.#A(), this.#e === "running" || this.#e === "backgrounded") this.#e = "completed";
    let stdout = await this.taskOutput.getStdout(),
      result = {
        code: code,
        stdout: stdout,
        stderr: this.taskOutput.getStderr(),
        interrupted: code === GXn,
        backgroundTaskId: this.#t
      };
    if (this.taskOutput.stdoutToFile && !this.#t) if (this.taskOutput.outputFileRedundant || this.#c) setImmediate(() => {
      if (!this.#t) this.taskOutput.deleteOutputFile();
    });else result.outputFilePath = this.taskOutput.path, result.outputFileSize = this.taskOutput.outputFileSize, result.outputTaskId = this.taskOutput.taskId;
    let prependMessage = msg => {
      if (this.taskOutput.stdoutToFile && !this.#t) result.stdout = stdout ? `${msg}
${stdout}` : msg;else result.stderr = lkm(msg, result.stderr);
    };
    if (this.#c) prependMessage(`Command killed: output file exceeded ${OOo}`), result.outputFileSize = this.taskOutput.outputFileSize;else if (code === x3l) prependMessage(`Command timed out after ${Fi(this.#p)}`);else if (this.taskOutput.stdoutToFile && stdout === "" && code !== 0 && code !== GXn) {
      let diskFullMsg = await ckm(this.taskOutput.path);
      if (diskFullMsg) result.stdout = diskFullMsg;
    }
    let resolveResult = this.#f;
    if (resolveResult) this.#f = null, resolveResult(result);
  }
  #I(code) {
    this.#e = "killed";
    let pid = this.#i?.pid;
    if (this.#b(code ?? GXn), !pid) return Promise.resolve();
    let termPromise = rFt(pid, "SIGTERM"),
      killPromise = new Promise(resolve => {
        let pollInterval,
          killedHard = false,
          forceKillTimer = setTimeout(() => {
            killedHard = true, clearInterval(pollInterval);
            try {
              process.kill(-pid, "SIGKILL");
            } catch {}
            rFt(pid, "SIGKILL").finally(resolve);
          }, skm);
        if (forceKillTimer.unref(), Yt() !== "windows") termPromise.then(() => {
          if (killedHard) return;
          if (D3l(pid)) {
            clearTimeout(forceKillTimer), resolve();
            return;
          }
          pollInterval = setInterval(() => {
            if (!D3l(pid)) return;
            clearTimeout(forceKillTimer), clearInterval(pollInterval), resolve();
          }, ikm), pollInterval.unref();
        });
      });
    return MOo.add(killPromise), killPromise.finally(() => MOo.delete(killPromise)), killPromise;
  }
  kill() {
    return this.#I();
  }
  background(taskId, opts) {
    if (this.#e === "running") {
      if (this.#t = taskId, this.#e = "backgrounded", this.#A(), this.taskOutput.stdoutToFile) this.#x();else if (!opts?.skipSpill) this.taskOutput.spillToDisk();
      return true;
    }
    return false;
  }
  detach() {
    let pid = this.#i?.pid;
    if (pid !== undefined) this.#i.unref();
    return pid;
  }
  cleanup() {
    this.#n?.cleanup(), this.#s?.cleanup(), this.taskOutput.clear(), this.#A(), this.#i = null, this.#l = null, this.#r = undefined;
  }
}
function XPn(child, abortSignal, timeoutMs, taskOutput, allowBackgroundOnTimeout = false, maxOutputFileSize = qXn) {
  return new FOo(child, abortSignal, timeoutMs, taskOutput, allowBackgroundOnTimeout, maxOutputFileSize);
}
class O3l {
  status = "killed";
  result;
  taskOutput;
  constructor() {
    this.taskOutput = new My(M$("local_bash"), null), this.result = Promise.resolve({
      code: 145,
      stdout: "",
      stderr: "Command aborted before execution",
      interrupted: true
    });
  }
  background() {
    return false;
  }
  kill() {
    return Promise.resolve();
  }
  cleanup() {}
}
function jma() {
  return new O3l();
}
function D3l(pid) {
  for (let target of [-pid, pid]) try {
    return process.kill(target, 0), false;
  } catch (err) {
    if (cn(err) !== "ESRCH") return false;
  }
  return true;
}
function YPn(stderr) {
  let taskOutput = new My(M$("local_bash"), null);
  return {
    status: "completed",
    result: Promise.resolve({
      code: 1,
      stdout: "",
      stderr: stderr,
      interrupted: false,
      preSpawnError: stderr
    }),
    taskOutput: taskOutput,
    background() {
      return false;
    },
    kill() {
      return Promise.resolve();
    },
    cleanup() {}
  };
}
var VXn,
  P3l,
  GXn = 137,
  x3l = 143,
  skm = 1500,
  ikm = 100,
  MOo,
  akm = 5000;
var QPn = b(() => {
  vw();
  Ct();
  Xo();
  cDn();
  Es();
  wE();
  T3e();
  VXn = require("fs/promises"), P3l = require("path"), MOo = new Set();
});

export {Wga,lkm,ckm,NOo,FOo,XPn,O3l,jma,D3l,YPn,VXn,P3l,GXn,x3l,skm,ikm,MOo,akm,QPn};
