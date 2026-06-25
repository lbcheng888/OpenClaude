// @ts-nocheck
import {kO,Bwn} from "../../vendor/m2663.ts";
import {Lo} from "../../vendor/m2612.ts";
import {b,x} from "../../runtime.ts";
// @ts-nocheck

/** Directories that should never be copied/included into the sandbox workspace,
 *  augmented with the well-known Claude config command/agent locations. */
function getSandboxExcludedDirs(): string[] {
  return [...sandboxIgnoredDirs.filter(dir => dir !== ".git"), ".claude/commands", ".claude/agents"];
}

/** Lowercase helper. */
function toLowerCase(value: string): string {
  return value.toLowerCase();
}

/** Returns true if the path contains glob meta-characters. */
function hasGlobChars(path: string): boolean {
  return path.includes("*") || path.includes("?") || path.includes("[") || path.includes("]");
}

/** Strips a trailing recursive-glob suffix ("/**") from a directory pattern. */
function stripGlobstarSuffix(pattern: string): string {
  return pattern.replace(/\/\*\*$/, "") || "/";
}

/**
 * Decides whether a realpath resolution (`resolvedPath`) of `originalPath`
 * represents a "surprising" symlink redirection that should NOT be followed
 * (i.e. it escapes the original location in a way that could break sandboxing).
 * Returns true when the resolution should be treated as suspicious.
 */
function isSuspiciousRealpath(originalPath: string, resolvedPath: string): boolean {
  let normalizedOriginal = nodePath.normalize(originalPath),
    normalizedResolved = nodePath.normalize(resolvedPath);
  if (normalizedResolved === normalizedOriginal) return !1;
  if (normalizedOriginal.startsWith("/tmp/") && normalizedResolved === "/private" + normalizedOriginal) return !1;
  if (normalizedOriginal.startsWith("/var/") && normalizedResolved === "/private" + normalizedOriginal) return !1;
  if (normalizedOriginal.startsWith("/private/tmp/") && normalizedResolved === normalizedOriginal) return !1;
  if (normalizedOriginal.startsWith("/private/var/") && normalizedResolved === normalizedOriginal) return !1;
  if (normalizedResolved === "/") return !0;
  if (normalizedResolved.split("/").filter(Boolean).length <= 1) return !0;
  if (normalizedOriginal.startsWith(normalizedResolved + "/")) return !0;
  let privateAliased = normalizedOriginal;
  if (normalizedOriginal.startsWith("/tmp/")) privateAliased = "/private" + normalizedOriginal;else if (normalizedOriginal.startsWith("/var/")) privateAliased = "/private" + normalizedOriginal;
  if (privateAliased !== normalizedOriginal && privateAliased.startsWith(normalizedResolved + "/")) return !0;
  let resolvedInsideOriginal = normalizedResolved.startsWith(normalizedOriginal + "/"),
    resolvedInsideAliased = privateAliased !== normalizedOriginal && normalizedResolved.startsWith(privateAliased + "/");
  if (normalizedResolved !== normalizedOriginal && !(privateAliased !== normalizedOriginal && normalizedResolved === privateAliased) && !resolvedInsideOriginal && !resolvedInsideAliased) return !0;
  return !1;
}

/**
 * Resolves a user-supplied path: expands ~, makes it absolute relative to cwd,
 * and resolves symlinks (skipping suspicious redirections). Handles glob patterns
 * by resolving only the static prefix directory.
 */
function resolveSandboxPath(inputPath: string): string {
  let cwd = process.cwd(),
    resolvedPath = inputPath;
  if (inputPath === "~") resolvedPath = nodeOs.homedir();else if (inputPath.startsWith("~/")) resolvedPath = nodeOs.homedir() + inputPath.slice(1);else if (inputPath.startsWith("./") || inputPath.startsWith("../")) resolvedPath = nodePath.resolve(cwd, inputPath);else if (!nodePath.isAbsolute(inputPath)) resolvedPath = nodePath.resolve(cwd, inputPath);
  if (hasGlobChars(resolvedPath)) {
    let staticPrefix = resolvedPath.split(/[*?[\]]/)[0];
    if (staticPrefix && staticPrefix !== "/") {
      let prefixDir = staticPrefix.endsWith("/") ? staticPrefix.slice(0, -1) : nodePath.dirname(staticPrefix);
      try {
        let realPrefixDir = nodeFs.realpathSync(prefixDir);
        if (!isSuspiciousRealpath(prefixDir, realPrefixDir)) {
          let globRemainder = resolvedPath.slice(prefixDir.length);
          return realPrefixDir + globRemainder;
        }
      } catch {}
    }
    return resolvedPath;
  }
  try {
    let realPath = nodeFs.realpathSync(resolvedPath);
    if (isSuspiciousRealpath(resolvedPath, realPath)) ;else resolvedPath = realPath;
  } catch {}
  return resolvedPath;
}

/** Well-known device/special paths that the sandbox always allows. */
function getSandboxAllowedSpecialPaths(): string[] {
  let homeDir = nodeOs.homedir();
  return ["/dev/stdout", "/dev/stderr", "/dev/null", "/dev/tty", "/dev/dtracehelper", "/dev/autofs_nowait", "/tmp/claude", "/private/tmp/claude", nodePath.join(homeDir, ".npm/_logs"), nodePath.join(homeDir, ".claude/debug")];
}

/**
 * Builds the environment-variable list used to route a sandboxed subprocess
 * through the local HTTP (`httpPort`) and/or SOCKS (`socksPort`) proxies,
 * optionally injecting CA-bundle vars and a per-request-token (`requestToken`).
 */
function buildProxyEnvVars(httpPort: number | string | undefined, socksPort: number | string | undefined, caBundlePath: string | undefined, requestToken: string | undefined): string[] {
  let authPrefix = requestToken ? `srt:${requestToken}@` : "",
    envVars = ["SANDBOX_RUNTIME=1", `TMPDIR=${process.env.CLAUDE_CODE_TMPDIR || process.env.CLAUDE_TMPDIR || "/tmp/claude"}`];
  if (caBundlePath) for (let caVarName of caCertEnvVarNames) envVars.push(`${caVarName}=${caBundlePath}`);
  if (!httpPort && !socksPort) return envVars;
  let noProxyList = ["localhost", "127.0.0.1", "::1", "*.local", ".local", "169.254.0.0/16", "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"].join(",");
  if (envVars.push(`NO_PROXY=${noProxyList}`), envVars.push(`no_proxy=${noProxyList}`), httpPort) {
    if (envVars.push(`HTTP_PROXY=http://${authPrefix}localhost:${httpPort}`), envVars.push(`HTTPS_PROXY=http://${authPrefix}localhost:${httpPort}`), envVars.push(`http_proxy=http://${authPrefix}localhost:${httpPort}`), envVars.push(`https_proxy=http://${authPrefix}localhost:${httpPort}`), requestToken) envVars.push("GIT_CONFIG_PARAMETERS='http.proxyAuthMethod=basic'");
  }
  if (socksPort) {
    envVars.push(`ALL_PROXY=socks5h://${authPrefix}localhost:${socksPort}`), envVars.push(`all_proxy=socks5h://${authPrefix}localhost:${socksPort}`);
    let sshControlOpts = "-o ControlMaster=no -o ControlPath=none",
      platform = kO();
    if (platform === "macos") envVars.push(`GIT_SSH_COMMAND=ssh ${sshControlOpts} -o ProxyCommand='nc -X 5 -x localhost:${socksPort} %h %p'`);else if (platform === "linux" && httpPort) {
      let socatProxyAuth = requestToken ? `,proxyauth=srt:${requestToken}` : "";
      envVars.push(`GIT_SSH_COMMAND=ssh ${sshControlOpts} -o ProxyCommand='socat - PROXY:localhost:%h:%p,proxyport=${httpPort}${socatProxyAuth}'`);
    }
    if (envVars.push(`FTP_PROXY=socks5h://${authPrefix}localhost:${socksPort}`), envVars.push(`ftp_proxy=socks5h://${authPrefix}localhost:${socksPort}`), envVars.push(`RSYNC_PROXY=localhost:${socksPort}`), envVars.push(`DOCKER_HTTP_PROXY=http://${authPrefix}localhost:${httpPort || socksPort}`), envVars.push(`DOCKER_HTTPS_PROXY=http://${authPrefix}localhost:${httpPort || socksPort}`), httpPort) {
      if (envVars.push("CLOUDSDK_PROXY_TYPE=http"), envVars.push("CLOUDSDK_PROXY_ADDRESS=localhost"), envVars.push(`CLOUDSDK_PROXY_PORT=${httpPort}`), requestToken) envVars.push("CLOUDSDK_PROXY_USERNAME=srt"), envVars.push(`CLOUDSDK_PROXY_PASSWORD=${requestToken}`);
    }
    envVars.push(`GRPC_PROXY=socks5h://${authPrefix}localhost:${socksPort}`), envVars.push(`grpc_proxy=socks5h://${authPrefix}localhost:${socksPort}`);
  }
  return envVars;
}

/** Encodes (the first 100 chars of) a value as base64. */
function encodeBase64Prefix(value: string): string {
  let prefix = value.slice(0, 100);
  return Buffer.from(prefix).toString("base64");
}

/** Decodes a base64 string back to utf8. */
function decodeBase64(value: string): string {
  return Buffer.from(value, "base64").toString("utf8");
}

/** Compiles a glob pattern into an anchored regex source string. */
function globToRegexSource(pattern: string): string {
  return "^" + pattern.replace(/[.^$+{}()|\\]/g, "\\$&").replace(/\[([^\]]*?)$/g, "\\[$1").replace(/\*\*\//g, "__GLOBSTAR_SLASH__").replace(/\*\*/g, "__GLOBSTAR__").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]").replace(/__GLOBSTAR_SLASH__/g, "(.*/)?").replace(/__GLOBSTAR__/g, ".*") + "$";
}

/**
 * Expands a glob pattern against the filesystem, returning matching paths.
 * Refuses overly-broad patterns and missing base dirs, logging a warning.
 */
function expandGlob(pattern: string): string[] {
  let resolvedPattern = resolveSandboxPath(pattern),
    staticPrefix = resolvedPattern.split(/[*?[\]]/)[0];
  if (!staticPrefix || staticPrefix === "/") return Lo(`[Sandbox] Glob pattern too broad, skipping: ${pattern}`), [];
  let baseDir = staticPrefix.endsWith("/") ? staticPrefix.slice(0, -1) : nodePath.dirname(staticPrefix);
  if (!nodeFs.existsSync(baseDir)) return Lo(`[Sandbox] Base directory for glob does not exist: ${baseDir}`), [];
  let matchRegex = new RegExp(globToRegexSource(resolvedPattern)),
    matches = [];
  try {
    let entries = nodeFs.readdirSync(baseDir, {
      recursive: !0,
      withFileTypes: !0
    });
    for (let entry of entries) {
      let entryDir = entry.parentPath ?? entry.path ?? baseDir,
        entryPath = nodePath.join(entryDir, entry.name);
      if (matchRegex.test(entryPath)) matches.push(entryPath);
    }
  } catch (readErr) {
    Lo(`[Sandbox] Error expanding glob pattern ${pattern}: ${readErr}`);
  }
  return matches;
}
var nodeOs, nodePath, nodeFs, sandboxConfigFiles, sandboxIgnoredDirs, caCertEnvVarNames;
var sandboxPathModuleInit = b(() => {
  Bwn();
  nodeOs = require("os"), nodePath = x(require("path")), nodeFs = x(require("fs")), sandboxConfigFiles = [".gitconfig", ".gitmodules", ".bashrc", ".bash_profile", ".zshrc", ".zprofile", ".profile", ".ripgreprc", ".mcp.json"], sandboxIgnoredDirs = [".git", ".vscode", ".idea"];
  caCertEnvVarNames = ["NODE_EXTRA_CA_CERTS", "SSL_CERT_FILE", "CURL_CA_BUNDLE", "REQUESTS_CA_BUNDLE", "PIP_CERT", "GIT_SSL_CAINFO", "AWS_CA_BUNDLE", "CARGO_HTTP_CAINFO", "DENO_CERT"];
});

export {getSandboxExcludedDirs as Wwn,toLowerCase as oGr,hasGlobChars as HO,stripGlobstarSuffix as Yhe,isSuspiciousRealpath as qwn,resolveSandboxPath as JF,getSandboxAllowedSpecialPaths as SLt,buildProxyEnvVars as drt,encodeBase64Prefix as Gwn,decodeBase64 as JUi,globToRegexSource as Kwe,expandGlob as bLt,nodeOs as $wn,nodePath as a$,nodeFs as p$e,sandboxConfigFiles as TLt,sandboxIgnoredDirs as T0d,caCertEnvVarNames as S0d,sandboxPathModuleInit as m$e};
