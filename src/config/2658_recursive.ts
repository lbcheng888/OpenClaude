// @ts-nocheck
import {dL as tL,YCn as mCn} from "../../vendor/m2652.ts";
import {Jo as Qo} from "../../vendor/m2601.ts";
import {b,M as L} from "../../runtime.ts";
// @ts-nocheck
function EJ6() {
  return [...P33.filter(dir => dir !== ".git"), ".claude/commands", ".claude/agents"];
}
function _x8(str) {
  return str.toLowerCase();
}
function isGlobPattern(pattern) {
  return pattern.includes("*") || pattern.includes("?") || pattern.includes("[") || pattern.includes("]");
}
function NzH(pattern) {
  return pattern.replace(/\/\*\*$/, "") || "/";
}
function vJ6(originalPath, realpathResult) {
  let normalizedOriginal = Jx.normalize(originalPath),
    normalizedRealpath = Jx.normalize(realpathResult);
  if (normalizedRealpath === normalizedOriginal) return false;
  if (normalizedOriginal.startsWith("/tmp/") && normalizedRealpath === "/private" + normalizedOriginal) return false;
  if (normalizedOriginal.startsWith("/var/") && normalizedRealpath === "/private" + normalizedOriginal) return false;
  if (normalizedOriginal.startsWith("/private/tmp/") && normalizedRealpath === normalizedOriginal) return false;
  if (normalizedOriginal.startsWith("/private/var/") && normalizedRealpath === normalizedOriginal) return false;
  if (normalizedRealpath === "/") return true;
  if (normalizedRealpath.split("/").filter(Boolean).length <= 1) return true;
  if (normalizedOriginal.startsWith(normalizedRealpath + "/")) return true;
  let privateAliasOriginal = normalizedOriginal;
  if (normalizedOriginal.startsWith("/tmp/")) privateAliasOriginal = "/private" + normalizedOriginal;else if (normalizedOriginal.startsWith("/var/")) privateAliasOriginal = "/private" + normalizedOriginal;
  if (privateAliasOriginal !== normalizedOriginal && privateAliasOriginal.startsWith(normalizedRealpath + "/")) return true;
  let realpathIsDescendantOfOriginal = normalizedRealpath.startsWith(normalizedOriginal + "/"),
    realpathIsDescendantOfPrivateAlias = privateAliasOriginal !== normalizedOriginal && normalizedRealpath.startsWith(privateAliasOriginal + "/");
  if (normalizedRealpath !== normalizedOriginal && !(privateAliasOriginal !== normalizedOriginal && normalizedRealpath === privateAliasOriginal) && !realpathIsDescendantOfOriginal && !realpathIsDescendantOfPrivateAlias) return true;
  return false;
}
function Dx(inputPath) {
  let cwd = process.cwd(),
    resolvedPath = inputPath;
  if (inputPath === "~") resolvedPath = yJ6.homedir();else if (inputPath.startsWith("~/")) resolvedPath = yJ6.homedir() + inputPath.slice(1);else if (inputPath.startsWith("./") || inputPath.startsWith("../")) resolvedPath = Jx.resolve(cwd, inputPath);else if (!Jx.isAbsolute(inputPath)) resolvedPath = Jx.resolve(cwd, inputPath);
  if (isGlobPattern(resolvedPath)) {
    let prefixBeforeGlob = resolvedPath.split(/[*?[\]]/)[0];
    if (prefixBeforeGlob && prefixBeforeGlob !== "/") {
      let baseDir = prefixBeforeGlob.endsWith("/") ? prefixBeforeGlob.slice(0, -1) : Jx.dirname(prefixBeforeGlob);
      try {
        let realBase = hCH.realpathSync(baseDir);
        if (!vJ6(baseDir, realBase)) {
          let remainder = resolvedPath.slice(baseDir.length);
          return realBase + remainder;
        }
      } catch {}
    }
    return resolvedPath;
  }
  try {
    let realpath = hCH.realpathSync(resolvedPath);
    if (vJ6(resolvedPath, realpath)) ;else resolvedPath = realpath;
  } catch {}
  return resolvedPath;
}
function bR_() {
  let homeDir = yJ6.homedir();
  return ["/dev/stdout", "/dev/stderr", "/dev/null", "/dev/tty", "/dev/dtracehelper", "/dev/autofs_nowait", "/tmp/claude", "/private/tmp/claude", Jx.join(homeDir, ".npm/_logs"), Jx.join(homeDir, ".claude/debug")];
}
function TeH(httpPort, socksPort, caBundle) {
  let envVars = ["SANDBOX_RUNTIME=1", `TMPDIR=${process.env.CLAUDE_CODE_TMPDIR || process.env.CLAUDE_TMPDIR || "/tmp/claude"}`];
  if (caBundle) for (let varName of W33) envVars.push(`${varName}=${caBundle}`);
  if (!httpPort && !socksPort) return envVars;
  let noProxyList = ["localhost", "127.0.0.1", "::1", "*.local", ".local", "169.254.0.0/16", "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"].join(",");
  if (envVars.push(`NO_PROXY=${noProxyList}`), envVars.push(`no_proxy=${noProxyList}`), httpPort) envVars.push(`HTTP_PROXY=http://localhost:${httpPort}`), envVars.push(`HTTPS_PROXY=http://localhost:${httpPort}`), envVars.push(`http_proxy=http://localhost:${httpPort}`), envVars.push(`https_proxy=http://localhost:${httpPort}`);
  if (socksPort) {
    envVars.push(`ALL_PROXY=socks5h://localhost:${socksPort}`), envVars.push(`all_proxy=socks5h://localhost:${socksPort}`);
    let i = "-o ControlMaster=no -o ControlPath=none",
      sshControlOpts = tL();
    if (sshControlOpts === "macos") envVars.push(`GIT_SSH_COMMAND=ssh ${i} -o ProxyCommand='nc -X 5 -x localhost:${socksPort} %h %p'`);else if (sshControlOpts === "linux" && httpPort) envVars.push(`GIT_SSH_COMMAND=ssh ${i} -o ProxyCommand='socat - PROXY:localhost:%h:%p,proxyport=${httpPort}'`);
    if (envVars.push(`FTP_PROXY=socks5h://localhost:${socksPort}`), envVars.push(`ftp_proxy=socks5h://localhost:${socksPort}`), envVars.push(`RSYNC_PROXY=localhost:${socksPort}`), envVars.push(`DOCKER_HTTP_PROXY=http://localhost:${httpPort || socksPort}`), envVars.push(`DOCKER_HTTPS_PROXY=http://localhost:${httpPort || socksPort}`), httpPort) envVars.push("CLOUDSDK_PROXY_TYPE=http"), envVars.push("CLOUDSDK_PROXY_ADDRESS=localhost"), envVars.push(`CLOUDSDK_PROXY_PORT=${httpPort}`);
    envVars.push(`GRPC_PROXY=socks5h://localhost:${socksPort}`), envVars.push(`grpc_proxy=socks5h://localhost:${socksPort}`);
  }
  return envVars;
}
function SJ6(path) {
  let truncated = path.slice(0, 100);
  return Buffer.from(truncated).toString("base64");
}
function OG7(encoded) {
  return Buffer.from(encoded, "base64").toString("utf8");
}
function _PH(globPattern) {
  return "^" + globPattern.replace(/[.^$+{}()|\\]/g, "\\$&").replace(/\[([^\]]*?)$/g, "\\[$1").replace(/\*\*\//g, "__GLOBSTAR_SLASH__").replace(/\*\*/g, "__GLOBSTAR__").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]").replace(/__GLOBSTAR_SLASH__/g, "(.*/)?").replace(/__GLOBSTAR__/g, ".*") + "$";
}
function IR_(globPattern) {
  let resolvedPattern = Dx(globPattern),
    prefixBeforeGlob = resolvedPattern.split(/[*?[\]]/)[0];
  if (!prefixBeforeGlob || prefixBeforeGlob === "/") return Qo(`[Sandbox] Glob pattern too broad, skipping: ${globPattern}`), [];
  let baseDir = prefixBeforeGlob.endsWith("/") ? prefixBeforeGlob.slice(0, -1) : Jx.dirname(prefixBeforeGlob);
  if (!hCH.existsSync(baseDir)) return Qo(`[Sandbox] Base directory for glob does not exist: ${baseDir}`), [];
  let patternRegex = new RegExp(_PH(resolvedPattern)),
    matchedPaths = [];
  try {
    let entries = hCH.readdirSync(baseDir, {
      recursive: true,
      withFileTypes: true
    });
    for (let entry of entries) {
      let parentDir = entry.parentPath ?? entry.path ?? baseDir,
        fullPath = Jx.join(parentDir, entry.name);
      if (patternRegex.test(fullPath)) matchedPaths.push(fullPath);
    }
  } catch (err) {
    Qo(`[Sandbox] Error expanding glob pattern ${globPattern}: ${err}`);
  }
  return matchedPaths;
}
var yJ6, Jx, hCH, CR_, P33, W33;
var kCH = b(() => {
  mCn();
  yJ6 = require("os"), Jx = L(require("path")), hCH = L(require("fs")), CR_ = [".gitconfig", ".gitmodules", ".bashrc", ".bash_profile", ".zshrc", ".zprofile", ".profile", ".ripgreprc", ".mcp.json"], P33 = [".git", ".vscode", ".idea"];
  W33 = ["NODE_EXTRA_CA_CERTS", "SSL_CERT_FILE", "CURL_CA_BUNDLE", "REQUESTS_CA_BUNDLE", "PIP_CERT", "GIT_SSL_CAINFO", "AWS_CA_BUNDLE", "CARGO_HTTP_CAINFO", "DENO_CERT"];
});

export {EJ6 as ZCn,_x8 as wqr,isGlobPattern as z1,NzH as MAe,vJ6 as QCn,Dx as B$,bR_ as qDt,TeH as att,SJ6 as evn,OG7 as _Li,_PH as cRe,IR_ as jDt,yJ6 as XCn,Jx as N$,hCH as d2e,CR_ as $Dt,P33 as zTd,W33 as YTd,kCH as p2e};
