// @ts-nocheck
import {Wwn,TLt,oGr,JF,qwn,drt,m$e} from "./2669_recursive.ts";
import {jUi,YUi} from "../../vendor/m2667.ts";
import {Lo} from "../../vendor/m2612.ts";
import {jhe,yLt} from "../../vendor/m2662.ts";
import {aGr,t2i} from "../../vendor/m2669.ts";
import {b,x} from "../../runtime.ts";
import {nGr} from "../../vendor/m2666.ts";
// @ts-nocheck

/**
 * Walk a path component-by-component and return the first ancestor that is a
 * symbolic link AND falls within one of the allowed (write) paths.
 * Used to detect symlink-replacement attacks on bound write paths.
 */
function A0d(filePath, allowedWritePaths) {
  let components = filePath.split(YR.default.sep),
    parent = "";
  for (let component of components) {
    if (!component) continue;
    let current = parent + YR.default.sep + component;
    try {
      if (Bh.lstatSync(current).isSymbolicLink()) {
        if (allowedWritePaths.some(allowed => current.startsWith(allowed + "/") || current === allowed)) return current;
      }
    } catch {
      break;
    }
    parent = current;
  }
  return null;
}

/**
 * Returns true if any ancestor component of the given path is an existing file
 * or symlink (i.e. you cannot create paths underneath a file).
 */
function R0d(filePath) {
  let components = filePath.split(YR.default.sep),
    parent = "";
  for (let component of components) {
    if (!component) continue;
    let current = parent + YR.default.sep + component;
    try {
      let stat = Bh.statSync(current);
      if (stat.isFile() || stat.isSymbolicLink()) return !0;
    } catch {
      break;
    }
    parent = current;
  }
  return !1;
}

/**
 * Walk the path and return the first component that does not yet exist on disk.
 * Returns the full path if every component exists.
 */
function v0d(filePath) {
  let components = filePath.split(YR.default.sep),
    parent = "";
  for (let component of components) {
    if (!component) continue;
    let current = parent + YR.default.sep + component;
    if (!Bh.existsSync(current)) return current;
    parent = current;
  }
  return filePath;
}

/**
 * Scan the workspace with ripgrep to discover sensitive paths (vcs ignore dirs,
 * .git internals, etc.) that should be deny-mounted inside the sandbox.
 * Returns a de-duplicated list of absolute paths.
 */
async function w0d(ripgrepConfig = {
  command: "rg"
}, maxDepth = cGr, allowGitConfig = !1, abortSignal) {
  let cwd = process.cwd(),
    abortController = new AbortController(),
    signal = abortSignal ?? abortController.signal,
    vcsIgnoreDirs = Wwn(),
    paths = [...TLt.map(p => YR.default.resolve(cwd, p)), ...vcsIgnoreDirs.map(p => YR.default.resolve(cwd, p))],
    gitDir = YR.default.resolve(cwd, ".git"),
    hasGitDir = !1;
  try {
    hasGitDir = Bh.statSync(gitDir).isDirectory();
  } catch {}
  if (hasGitDir) {
    if (paths.push(YR.default.resolve(cwd, ".git/hooks")), !allowGitConfig) paths.push(YR.default.resolve(cwd, ".git/config"));
  }
  let iglobArgs = [];
  for (let dir of TLt) iglobArgs.push("--iglob", dir);
  for (let dir of vcsIgnoreDirs) iglobArgs.push("--iglob", `**/${dir}/**`);
  if (iglobArgs.push("--iglob", "**/.git/hooks/**"), !allowGitConfig) iglobArgs.push("--iglob", "**/.git/config");
  let matches = [];
  try {
    matches = await jUi(["--files", "--hidden", "--max-depth", String(maxDepth), ...iglobArgs, "-g", "!**/node_modules/**"], cwd, signal, ripgrepConfig);
  } catch (err) {
    Lo(`[Sandbox] ripgrep scan failed: ${err}`);
  }
  for (let match of matches) {
    let absPath = YR.default.resolve(cwd, match),
      matched = !1;
    for (let dir of [...vcsIgnoreDirs, ".git"]) {
      let normalizedDir = oGr(dir),
        segments = absPath.split(YR.default.sep),
        idx = segments.findIndex(seg => oGr(seg) === normalizedDir);
      if (idx !== -1) {
        if (dir === ".git") {
          let gitRoot = segments.slice(0, idx + 1).join(YR.default.sep);
          if (match.includes(".git/hooks")) paths.push(YR.default.join(gitRoot, "hooks"));else if (match.includes(".git/config")) paths.push(YR.default.join(gitRoot, "config"));
        } else paths.push(segments.slice(0, idx + 1).join(YR.default.sep));
        matched = !0;
        break;
      }
    }
    if (!matched) paths.push(absPath);
  }
  return [...new Set(paths)];
}

/** Register a process-exit handler to force cleanup of bwrap mount points (once). */
function r2i() {
  if (n2i) return;
  process.on("exit", () => {
    jwn({
      force: !0
    });
  }), n2i = !0;
}

/**
 * Clean up bwrap mount points created during sandbox setup. Uses a refcount
 * (zwe) so cleanup is deferred while other sandboxes are still active, unless
 * `force` is set.
 */
function jwn(opts) {
  if (!opts?.force) {
    if (zwe > 0) zwe--;
    if (zwe > 0) {
      Lo(`[Sandbox Linux] Deferring mount point cleanup — ${zwe} sandbox(es) still active`);
      return;
    }
  } else zwe = 0;
  for (let mountPoint of zwn) try {
    let stat = Bh.statSync(mountPoint);
    if (stat.isFile() && stat.size === 0) Bh.unlinkSync(mountPoint), Lo(`[Sandbox Linux] Cleaned up bwrap mount point (file): ${mountPoint}`);else if (stat.isDirectory()) {
      if (Bh.readdirSync(mountPoint).length === 0) Bh.rmdirSync(mountPoint), Lo(`[Sandbox Linux] Cleaned up bwrap mount point (dir): ${mountPoint}`);
    }
  } catch {}
  zwn.clear();
}

/** Returns true if the path is executable (X_OK). */
function o2i(path) {
  try {
    return Bh.accessSync(path, Bh.constants.X_OK), !0;
  } catch {
    return !1;
  }
}

/**
 * Validate that the sandbox prerequisites (bwrap, socat, seccomp) are available.
 * Returns collected warnings and errors.
 */
function l2i(config) {
  let {
      seccompConfig,
      bwrapPath,
      socatPath
    } = config ?? {},
    errors = [],
    warnings = [];
  if (bwrapPath) {
    if (!o2i(bwrapPath)) errors.push(`bubblewrap (bwrap) not executable at ${bwrapPath}`);
  } else if (jhe("bwrap") === null) errors.push("bubblewrap (bwrap) not installed");
  if (socatPath) {
    if (!o2i(socatPath)) errors.push(`socat not executable at ${socatPath}`);
  } else if (jhe("socat") === null) errors.push("socat not installed");
  if (!seccompConfig?.argv0 && aGr(seccompConfig?.applyPath) === null) warnings.push("seccomp not available - unix socket access not restricted");
  return {
    warnings: warnings,
    errors: errors
  };
}

/**
 * Start socat HTTP and SOCKS bridge processes that listen on unix sockets and
 * forward to localhost TCP proxy ports. Waits for both sockets to appear.
 */
async function c2i(httpProxyPort, socksProxyPort, socatPathArg) {
  let socatPath = socatPathArg ?? "socat",
    suffix = a2i.randomBytes(8).toString("hex"),
    httpSocketPath = YR.join(Kwn.tmpdir(), `claude-http-${suffix}.sock`),
    socksSocketPath = YR.join(Kwn.tmpdir(), `claude-socks-${suffix}.sock`),
    httpArgs = [`UNIX-LISTEN:${httpSocketPath},fork,reuseaddr`, `TCP:localhost:${httpProxyPort},keepalive,keepidle=10,keepintvl=5,keepcnt=3`];
  Lo(`Starting HTTP bridge: ${socatPath} ${httpArgs.join(" ")}`);
  let httpBridgeProcess = lGr.spawn(socatPath, httpArgs, {
    stdio: "ignore"
  });
  if (httpBridgeProcess.on("error", err => {
    Lo(`HTTP bridge process error: ${err}`, {
      level: "error"
    });
  }), httpBridgeProcess.on("exit", (code, signal) => {
    Lo(`HTTP bridge process exited with code ${code}, signal ${signal}`, {
      level: code === 0 ? "info" : "error"
    });
  }), !httpBridgeProcess.pid) throw Error("Failed to start HTTP bridge process");
  let socksArgs = [`UNIX-LISTEN:${socksSocketPath},fork,reuseaddr`, `TCP:localhost:${socksProxyPort},keepalive,keepidle=10,keepintvl=5,keepcnt=3`];
  Lo(`Starting SOCKS bridge: ${socatPath} ${socksArgs.join(" ")}`);
  let socksBridgeProcess = lGr.spawn(socatPath, socksArgs, {
    stdio: "ignore"
  });
  if (socksBridgeProcess.on("error", err => {
    Lo(`SOCKS bridge process error: ${err}`, {
      level: "error"
    });
  }), socksBridgeProcess.on("exit", (code, signal) => {
    Lo(`SOCKS bridge process exited with code ${code}, signal ${signal}`, {
      level: code === 0 ? "info" : "error"
    });
  }), !socksBridgeProcess.pid) {
    if (httpBridgeProcess.pid) try {
      process.kill(httpBridgeProcess.pid, "SIGTERM");
    } catch {}
    throw Error("Failed to start SOCKS bridge process");
  }
  let maxAttempts = 5;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (!httpBridgeProcess.pid || httpBridgeProcess.killed || !socksBridgeProcess.pid || socksBridgeProcess.killed) throw Error("Linux bridge process died unexpectedly");
    try {
      if (Bh.existsSync(httpSocketPath) && Bh.existsSync(socksSocketPath)) {
        Lo(`Linux bridges ready after ${attempt + 1} attempts`);
        break;
      }
    } catch (err) {
      Lo(`Error checking sockets (attempt ${attempt + 1}): ${err}`, {
        level: "error"
      });
    }
    if (attempt === maxAttempts - 1) {
      if (httpBridgeProcess.pid) try {
        process.kill(httpBridgeProcess.pid, "SIGTERM");
      } catch {}
      if (socksBridgeProcess.pid) try {
        process.kill(socksBridgeProcess.pid, "SIGTERM");
      } catch {}
      throw Error(`Failed to create bridge sockets after ${maxAttempts} attempts`);
    }
    await new Promise(resolve => setTimeout(resolve, attempt * 100));
  }
  return {
    httpSocketPath: httpSocketPath,
    socksSocketPath: socksSocketPath,
    httpBridgeProcess: httpBridgeProcess,
    socksBridgeProcess: socksBridgeProcess,
    httpProxyPort: httpProxyPort,
    socksProxyPort: socksProxyPort
  };
}

/**
 * Build the seccomp wrapper prefix used to apply a unix-socket-blocking seccomp
 * filter. With argv0 set, builds an ARGV0= prefixed invocation; otherwise
 * resolves the apply-seccomp binary path.
 */
function k0d(applyPath, argv0) {
  if (argv0) {
    if (!applyPath) throw Error("seccompConfig.argv0 requires seccompConfig.applyPath");
    return `ARGV0=${ZZ.default.quote([argv0])} ${ZZ.default.quote([applyPath])} `;
  }
  let resolved = aGr(applyPath);
  return resolved ? `${ZZ.default.quote([resolved])} ` : void 0;
}

/**
 * Build the inner shell script for the sandbox: starts socat TCP listeners that
 * bridge to the host's http/socks unix sockets, then runs the user command,
 * optionally behind a seccomp prefix.
 */
function H0d(httpSocketPath, socksSocketPath, command, seccompPrefix, binShell, socatPathArg) {
  let shell = binShell || "bash",
    socat = ZZ.default.quote([socatPathArg ?? "socat"]),
    lines = [`${socat} TCP-LISTEN:3128,fork,reuseaddr UNIX-CONNECT:${httpSocketPath} >/dev/null 2>&1 &`, `${socat} TCP-LISTEN:1080,fork,reuseaddr UNIX-CONNECT:${socksSocketPath} >/dev/null 2>&1 &`, 'trap "kill %1 %2 2>/dev/null; exit" EXIT'];
  if (seccompPrefix) {
    let wrappedCommand = seccompPrefix + ZZ.default.quote([shell, "-c", command]),
      script = [...lines, wrappedCommand].join(`
`);
    return `${shell} -c ${ZZ.default.quote([script])}`;
  } else {
    let script = [...lines, `eval ${ZZ.default.quote([command])}`].join(`
`);
    return `${shell} -c ${ZZ.default.quote([script])}`;
  }
}

/** Resolve a path to its real target if it is a symlink; otherwise return as-is. */
function s2i(path) {
  try {
    if (Bh.lstatSync(path).isSymbolicLink()) return Bh.realpathSync(path);
  } catch {}
  return path;
}

/**
 * Apply a denyRead tmpfs over `denyDir`, then re-bind any allowed write paths
 * and re-allow any read-allow paths that fall within the now-hidden region.
 */
function i2i(bwrapArgs, denyDir, allowedWritePaths, readAllowPaths) {
  let denyPrefix = denyDir === "/" ? "/" : denyDir + "/";
  bwrapArgs.push("--tmpfs", denyDir);
  for (let writePath of allowedWritePaths) if (writePath.startsWith(denyPrefix) || writePath === denyDir) bwrapArgs.push("--bind", writePath, writePath), Lo(`[Sandbox Linux] Re-bound write path wiped by denyRead tmpfs: ${writePath}`);
  for (let readPath of readAllowPaths) if (readPath.startsWith(denyPrefix) || readPath === denyDir) {
    if (!Bh.existsSync(readPath)) {
      Lo(`[Sandbox Linux] Skipping non-existent read allow path: ${readPath}`);
      continue;
    }
    if (allowedWritePaths.some(writePath => (writePath.startsWith(denyPrefix) || writePath === denyDir) && (readPath === writePath || readPath.startsWith(writePath + "/")))) continue;
    bwrapArgs.push("--ro-bind", readPath, readPath), Lo(`[Sandbox Linux] Re-allowed read access within denied region: ${readPath}`);
  }
}

/**
 * Build the bwrap --bind/--ro-bind/--tmpfs argument list that enforces the
 * read/write filesystem policy (writeConfig allowOnly + denyWithinAllow,
 * readConfig denyOnly + allowWithinDeny).
 */
async function I0d(readConfig, writeConfig, ripgrepConfig = {
  command: "rg"
}, maxDepth = cGr, allowGitConfig = !1, abortSignal) {
  let bwrapArgs = [],
    allowedWritePaths = [],
    denyWriteBinds = [];
  if (writeConfig) {
    bwrapArgs.push("--ro-bind", "/", "/");
    for (let rawWritePath of writeConfig.allowOnly || []) {
      let writePath = JF(rawWritePath);
      if (Lo(`[Sandbox Linux] Processing write path: ${rawWritePath} -> ${writePath}`), writePath.startsWith("/dev/")) {
        Lo(`[Sandbox Linux] Skipping /dev path: ${writePath}`);
        continue;
      }
      if (!Bh.existsSync(writePath)) {
        Lo(`[Sandbox Linux] Skipping non-existent write path: ${writePath}`);
        continue;
      }
      try {
        let realPath = Bh.realpathSync(writePath),
          trimmed = writePath.replace(/\/+$/, "");
        if (realPath !== trimmed && qwn(writePath, realPath)) {
          Lo(`[Sandbox Linux] Skipping symlink write path pointing outside expected location: ${rawWritePath} -> ${realPath}`);
          continue;
        }
      } catch {
        Lo(`[Sandbox Linux] Skipping write path that could not be resolved: ${writePath}`);
        continue;
      }
      bwrapArgs.push("--bind", writePath, writePath), allowedWritePaths.push(writePath);
    }
    let denyPaths = [...(writeConfig.denyWithinAllow || []), ...(await w0d(ripgrepConfig, maxDepth, allowGitConfig, abortSignal))],
      seenDenyPaths = new Set();
    for (let rawDenyPath of denyPaths) {
      let denyPath = JF(rawDenyPath);
      if (seenDenyPaths.has(denyPath)) continue;
      if (seenDenyPaths.add(denyPath), denyPath.startsWith("/dev/")) continue;
      let symlinkAncestor = A0d(denyPath, allowedWritePaths);
      if (symlinkAncestor) {
        denyWriteBinds.push("--ro-bind", "/dev/null", symlinkAncestor), Lo(`[Sandbox Linux] Mounted /dev/null at symlink ${symlinkAncestor} to prevent symlink replacement attack`);
        continue;
      }
      if (!Bh.existsSync(denyPath)) {
        if (R0d(denyPath)) {
          Lo(`[Sandbox Linux] Skipping deny path with file ancestor (cannot create paths under a file): ${denyPath}`);
          continue;
        }
        let ancestor = YR.default.dirname(denyPath);
        while (ancestor !== "/" && !Bh.existsSync(ancestor)) ancestor = YR.default.dirname(ancestor);
        if (allowedWritePaths.some(writePath => ancestor.startsWith(writePath + "/") || ancestor === writePath || denyPath.startsWith(writePath + "/"))) {
          let firstMissing = v0d(denyPath);
          if (firstMissing !== denyPath) {
            let emptyDir = Bh.mkdtempSync(YR.default.join(Kwn.tmpdir(), "claude-empty-"));
            denyWriteBinds.push("--ro-bind", emptyDir, firstMissing), zwn.add(firstMissing), r2i(), Lo(`[Sandbox Linux] Mounted empty dir at ${firstMissing} to block creation of ${denyPath}`);
          } else denyWriteBinds.push("--ro-bind", "/dev/null", firstMissing), zwn.add(firstMissing), r2i(), Lo(`[Sandbox Linux] Mounted /dev/null at ${firstMissing} to block creation of ${denyPath}`);
        } else Lo(`[Sandbox Linux] Skipping non-existent deny path not within allowed paths: ${denyPath}`);
        continue;
      }
      if (allowedWritePaths.some(writePath => denyPath.startsWith(writePath + "/") || denyPath === writePath)) denyWriteBinds.push("--ro-bind", denyPath, denyPath);else Lo(`[Sandbox Linux] Skipping deny path not within allowed paths: ${denyPath}`);
    }
  } else bwrapArgs.push("--bind", "/", "/");
  let denyReadPaths = [],
    readAllowPaths = (readConfig?.allowWithinDeny || []).map(p => JF(p)),
    maskedFiles = new Set(),
    tmpfsDirs = [],
    skipRootChildren = new Set(["proc", "dev", "sys"]);
  for (let rawDenyPath of readConfig?.denyOnly || []) if (JF(rawDenyPath) === "/") {
    for (let entry of Bh.readdirSync("/")) if (!skipRootChildren.has(entry)) denyReadPaths.push("/" + entry);
  } else denyReadPaths.push(rawDenyPath);
  if (Bh.existsSync("/etc/ssh/ssh_config.d")) denyReadPaths.push("/etc/ssh/ssh_config.d");
  let sortedDenyReadPaths = denyReadPaths.map(p => JF(p)).sort((a, b) => a.split("/").length - b.split("/").length);
  for (let denyReadPath of sortedDenyReadPaths) {
    if (!Bh.existsSync(denyReadPath)) {
      Lo(`[Sandbox Linux] Skipping non-existent read deny path: ${denyReadPath}`);
      continue;
    }
    if (Bh.statSync(denyReadPath).isDirectory()) tmpfsDirs.push(denyReadPath), i2i(bwrapArgs, denyReadPath, allowedWritePaths, readAllowPaths);else {
      if (readAllowPaths.includes(denyReadPath)) {
        Lo(`[Sandbox Linux] Skipping read deny for re-allowed path: ${denyReadPath}`);
        continue;
      }
      let resolved = s2i(denyReadPath);
      bwrapArgs.push("--ro-bind", "/dev/null", resolved), maskedFiles.add(resolved), maskedFiles.add(denyReadPath);
    }
  }
  let appliedDenyWriteBinds = [];
  for (let i = 0; i < denyWriteBinds.length; i += 3) {
    let bindTarget = denyWriteBinds[i + 2];
    if (maskedFiles.has(bindTarget)) continue;
    if (tmpfsDirs.some(tmpfsDir => {
      if (!(bindTarget === tmpfsDir || bindTarget.startsWith(tmpfsDir + "/"))) return !1;
      return !allowedWritePaths.some(writePath => (writePath === tmpfsDir || writePath.startsWith(tmpfsDir + "/")) && (bindTarget === writePath || bindTarget.startsWith(writePath + "/")));
    })) {
      Lo(`[Sandbox Linux] Skipping denyWrite bind already hidden by denyRead tmpfs: ${bindTarget}`);
      continue;
    }
    bwrapArgs.push(denyWriteBinds[i], denyWriteBinds[i + 1], bindTarget), appliedDenyWriteBinds.push(bindTarget);
  }
  for (let tmpfsDir of tmpfsDirs) if (appliedDenyWriteBinds.some(bindTarget => tmpfsDir.startsWith(bindTarget + "/"))) Lo(`[Sandbox Linux] Re-applying denyRead tmpfs re-exposed by denyWrite bind: ${tmpfsDir}`), i2i(bwrapArgs, tmpfsDir, allowedWritePaths, readAllowPaths);
  for (let maskedFile of maskedFiles) if (appliedDenyWriteBinds.some(bindTarget => maskedFile.startsWith(bindTarget + "/"))) {
    if (s2i(maskedFile) !== maskedFile) continue;
    Lo(`[Sandbox Linux] Re-applying denyRead file mask re-exposed by denyWrite bind: ${maskedFile}`), bwrapArgs.push("--ro-bind", "/dev/null", maskedFile);
  }
  return bwrapArgs;
}

/**
 * Wrap a shell command with bubblewrap (bwrap) to enforce the requested
 * network / filesystem / env / seccomp restrictions. Returns the quoted bwrap
 * command string, or the original command if no restrictions are needed.
 */
async function u2i(options) {
  let {
      command,
      needsNetworkRestriction,
      httpSocketPath,
      socksSocketPath,
      httpProxyPort,
      socksProxyPort,
      proxyAuthToken,
      caCertPath,
      readConfig,
      writeConfig,
      unsetEnvVars,
      enableWeakerNestedSandbox,
      allowAllUnixSockets,
      binShell,
      ripgrepConfig = {
        command: "rg"
      },
      mandatoryDenySearchDepth = cGr,
      allowGitConfig = !1,
      seccompConfig,
      bwrapPath,
      socatPath,
      abortSignal
    } = options,
    needsReadRestriction = readConfig && readConfig.denyOnly.length > 0,
    needsWriteRestriction = writeConfig !== void 0,
    needsEnvRestriction = unsetEnvVars !== void 0 && unsetEnvVars.length > 0;
  if (!needsNetworkRestriction && !needsReadRestriction && !needsWriteRestriction && !needsEnvRestriction) return command;
  zwe++;
  let bwrapArgs = ["--new-session", "--die-with-parent"],
    seccompPrefix;
  try {
    if (!allowAllUnixSockets) {
      if (seccompPrefix = k0d(seccompConfig?.applyPath, seccompConfig?.argv0), !seccompPrefix) Lo("[Sandbox Linux] apply-seccomp binary not available - unix socket blocking disabled. Install @anthropic-ai/sandbox-runtime globally for full protection.", {
        level: "warn"
      });else Lo("[Sandbox Linux] Applying seccomp filter for Unix socket blocking");
    } else Lo("[Sandbox Linux] Skipping seccomp filter - allowAllUnixSockets is enabled");
    if (needsEnvRestriction) for (let envVar of unsetEnvVars) bwrapArgs.push("--unsetenv", envVar);
    if (needsNetworkRestriction) {
      if (bwrapArgs.push("--unshare-net"), httpSocketPath && socksSocketPath) {
        if (!Bh.existsSync(httpSocketPath)) throw Error(`Linux HTTP bridge socket does not exist: ${httpSocketPath}. The bridge process may have died. Try reinitializing the sandbox.`);
        if (!Bh.existsSync(socksSocketPath)) throw Error(`Linux SOCKS bridge socket does not exist: ${socksSocketPath}. The bridge process may have died. Try reinitializing the sandbox.`);
        bwrapArgs.push("--bind", httpSocketPath, httpSocketPath), bwrapArgs.push("--bind", socksSocketPath, socksSocketPath);
        let proxyEnv = drt(3128, 1080, caCertPath, proxyAuthToken);
        if (bwrapArgs.push(...proxyEnv.flatMap(entry => {
          let eq = entry.indexOf("="),
            key = entry.slice(0, eq),
            value = entry.slice(eq + 1);
          return ["--setenv", key, value];
        })), httpProxyPort !== void 0) bwrapArgs.push("--setenv", "CLAUDE_CODE_HOST_HTTP_PROXY_PORT", String(httpProxyPort));
        if (socksProxyPort !== void 0) bwrapArgs.push("--setenv", "CLAUDE_CODE_HOST_SOCKS_PROXY_PORT", String(socksProxyPort));
      }
    }
    let fsArgs = await I0d(readConfig, writeConfig, ripgrepConfig, mandatoryDenySearchDepth, allowGitConfig, abortSignal);
    if (bwrapArgs.push(...fsArgs), bwrapArgs.push("--dev", "/dev"), bwrapArgs.push("--unshare-pid"), !enableWeakerNestedSandbox) bwrapArgs.push("--proc", "/proc");else bwrapArgs.push("--unshare-user", "--bind", "/proc", "/proc");
    let shell = binShell || "bash",
      shellPath = jhe(shell);
    if (!shellPath) throw Error(`Shell '${shell}' not found in PATH`);
    if (bwrapArgs.push("--", shellPath, "-c"), needsNetworkRestriction && httpSocketPath && socksSocketPath) {
      let innerScript = H0d(httpSocketPath, socksSocketPath, command, seccompPrefix, shellPath, socatPath);
      bwrapArgs.push(innerScript);
    } else if (seccompPrefix) {
      let wrappedCommand = seccompPrefix + ZZ.default.quote([shellPath, "-c", command]);
      bwrapArgs.push(wrappedCommand);
    } else bwrapArgs.push(command);
    let wrappedCmd = ZZ.default.quote([bwrapPath ?? "bwrap", ...bwrapArgs]),
      restrictions = [];
    if (needsNetworkRestriction) restrictions.push("network");
    if (needsReadRestriction || needsWriteRestriction) restrictions.push("filesystem");
    if (needsEnvRestriction) restrictions.push("env");
    if (seccompPrefix) restrictions.push("seccomp(unix-block)");
    return Lo(`[Sandbox Linux] Wrapped command with bwrap (${restrictions.join(", ")} restrictions)`), wrappedCmd;
  } catch (err) {
    if (zwe > 0) zwe--;
    throw err;
  }
}
var ZZ,
  a2i,
  Bh,
  lGr,
  Kwn,
  YR,
  cGr = 3,
  zwn,
  zwe = 0,
  n2i = !1;
var d2i = b(() => {
  yLt();
  YUi();
  m$e();
  t2i();
  ZZ = x(nGr(), 1), a2i = require("crypto"), Bh = x(require("fs")), lGr = require("child_process"), Kwn = require("os"), YR = x(require("path"));
  zwn = new Set();
});

export {A0d,R0d,v0d,w0d,r2i,jwn,o2i,l2i,c2i,k0d,H0d,s2i,i2i,I0d,u2i,ZZ,a2i,Bh,lGr,Kwn,YR,cGr,zwn,zwe,n2i,d2i};
