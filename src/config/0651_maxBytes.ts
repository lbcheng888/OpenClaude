// @ts-nocheck
import {$g as Dg,tn as Xt} from "./0230_encoding.ts";
import {Ta as pc,cn as ln,Jo as ls,Dre as Ere,In as Dn,Ct as St} from "../../vendor/m197.ts";
import {Wt as jt,Nd as Xp,ps as bs} from "../../vendor/m230.ts";
import {nt as rt} from "../../vendor/m127.ts";
import {Orn as uen,Lrn as den,GN as mB} from "../../vendor/m640.ts";
import {logForDebugging as v,qe as je} from "./0236_setHasFormattedOutput.ts";
import {Ie,vn as wn} from "../session/0621_length.ts";
import {hs as Rs,Tu as Pu} from "../../vendor/m649.ts";
import {isTmuxControlMode as Pt,Po as Ko} from "../../vendor/m638.ts";
import {Yt,Es as $s} from "../../vendor/m641.ts";
import {P1e as SMe,Pv as ek} from "../../vendor/m639.ts";
import {b} from "../../runtime.ts";
import {dn as an} from "./0137_namespace.ts";
// @ts-nocheck
async function pd(filePath) {
  try {
    return await x3.stat(filePath), true;
  } catch {
    return false;
  }
}
function u7e(filePath, {
  maxBytes: byteLimit
}) {
  using _span = Dg`fs.readBoundedSync(${filePath}, max ${byteLimit} bytes)`;
  let fd = rf.openSync(filePath, "r");
  try {
    let chunks = [],
      totalBytesRead = 0,
      readBuffer = Buffer.alloc(8192);
    while (true) {
      let bytesRead = rf.readSync(fd, readBuffer, 0, readBuffer.length, null);
      if (bytesRead === 0) return Buffer.concat(chunks).toString("utf8");
      if (totalBytesRead += bytesRead, totalBytesRead > byteLimit) throw new pc(`refusing to read ${filePath}: content exceeds ${byteLimit} byte limit`, "readBoundedSync: content exceeds byte limit");
      chunks.push(Buffer.from(readBuffer.subarray(0, bytesRead)));
    }
  } finally {
    rf.closeSync(fd);
  }
}
function VX(filePath) {
  let fsAdapter = jt();
  return Math.floor(fsAdapter.statSync(filePath).mtimeMs);
}
async function xMe(filePath) {
  let stat = await jt().stat(filePath);
  return Math.floor(stat.mtimeMs);
}
function Tmr() {
  return rt(process.env.CLAUDE_CODE_PERFORCE_MODE);
}
function c7e(err) {
  let errCode = ln(err);
  return errCode === "EINVAL" || errCode === "ENOTSUP" || errCode === "EPERM" || errCode === "ENOSYS";
}
function p7e(fileMode) {
  return Tmr() && (fileMode & 128) === 0;
}
function JSe(filePath, fn) {
  let pendingPromise = (writeSerializationMap.get(filePath) ?? Promise.resolve()).then(fn),
    silentPendingPromise = pendingPromise.then(() => {}, () => {});
  return writeSerializationMap.set(filePath, silentPendingPromise), silentPendingPromise.then(() => {
    if (writeSerializationMap.get(filePath) === silentPendingPromise) writeSerializationMap.delete(filePath);
  }), pendingPromise;
}
async function XSe(filePath, content, encoding, lineEnding) {
  let normalizedContent = content;
  if (lineEnding === "CRLF") normalizedContent = content.replaceAll(`\r
`, `
`).split(`
`).join(`\r
`);
  await Smr(filePath, normalizedContent, {
    encoding: encoding
  });
  let expectedByteLength = Buffer.byteLength(normalizedContent, encoding),
    stat = await jt().stat(filePath);
  if (stat.size !== expectedByteLength) throw new pc(`Write verification failed: ${filePath} is ${stat.size} bytes on disk, expected ${expectedByteLength}. The filesystem may have silently truncated the write (network drive / cloud sync).`, "writeTextContent: on-disk size mismatch after write");
  return Math.floor(stat.mtimeMs);
}
function ven(filePath) {
  try {
    let fsAdapter = jt(),
      {
        resolvedPath: resolvedPath
      } = Xp(fsAdapter, filePath);
    return uen(resolvedPath);
  } catch (err) {
    if (ls(err) || Ere(err)) v(`detectFileEncoding failed for expected reason: ${ln(err)}`, {
      level: "debug"
    });else Ie(err);
    return "utf8";
  }
}
function GJo(filePath, encoding = "utf8") {
  try {
    let fsAdapter = jt(),
      {
        resolvedPath: resolvedPath
      } = Xp(fsAdapter, filePath),
      {
        buffer: buffer,
        bytesRead: bytesRead
      } = fsAdapter.readSync(resolvedPath, {
        length: 4096
      }),
      sample = buffer.toString(encoding, 0, bytesRead);
    return den(sample);
  } catch (err) {
    if (ls(err) || Ere(err)) v(`detectLineEndings failed for expected reason: ${ln(err)}`, {
      level: "debug"
    });else Ie(err);
    return "LF";
  }
}
function QV(content) {
  if (!content.includes("\t")) return content;
  return content.replace(/^\t+/gm, tabs => "  ".repeat(tabs.length));
}
function u7c(rawPath) {
  let absolutePath = rawPath ? Rs(rawPath) : undefined,
    relativePath = absolutePath ? hf.relative(Pt(), absolutePath) : undefined;
  return {
    absolutePath: absolutePath,
    relativePath: relativePath
  };
}
function Md(rawPath) {
  let {
    relativePath: relativePath
  } = u7c(rawPath);
  if (relativePath && !relativePath.startsWith("..")) return relativePath;
  let homeDir = _mr.homedir();
  if (rawPath.startsWith(homeDir + hf.sep)) return "~" + rawPath.slice(homeDir.length);
  return rawPath;
}
function m7e(filePath) {
  let fsAdapter = jt();
  try {
    let dirPath = hf.dirname(filePath),
      baseName = hf.basename(filePath, hf.extname(filePath)),
      similarEntry = fsAdapter.readdirSync(dirPath).filter(entry => hf.basename(entry.name, hf.extname(entry.name)) === baseName && hf.join(dirPath, entry.name) !== filePath)[0];
    if (similarEntry) return similarEntry.name;
    return;
  } catch (err) {
    if (!Dn(err)) v(`findSimilarFile failed for ${filePath}: ${err}`, {
      level: "error"
    });
    return;
  }
}
async function noe(filePath) {
  let projectRoot = Pt(),
    projectParent = hf.dirname(projectRoot),
    resolvedFilePath = filePath;
  try {
    let resolvedDir = await x3.realpath(hf.dirname(filePath));
    resolvedFilePath = hf.join(resolvedDir, hf.basename(filePath));
  } catch {}
  let parentWithSep = projectParent === hf.sep ? hf.sep : projectParent + hf.sep,
    normalizeCaseFn = Yt() === "windows" ? p => p.toLowerCase() : p => p,
    normalizedFilePath = normalizeCaseFn(resolvedFilePath);
  if (!normalizedFilePath.startsWith(normalizeCaseFn(parentWithSep)) || normalizedFilePath.startsWith(normalizeCaseFn(projectRoot + hf.sep)) || normalizedFilePath === normalizeCaseFn(projectRoot)) return;
  let relativePart = hf.relative(projectParent, resolvedFilePath),
    candidatePath = hf.join(projectRoot, relativePart);
  try {
    return await x3.stat(candidatePath), candidatePath;
  } catch {
    return;
  }
}
function wen({
  content: content,
  startLine: startLine,
  tabAwareSeparator = false
}) {
  if (!content) return "";
  let separator = tabAwareSeparator && (content.startsWith("\t") || content.includes(`
	`)) ? ":" : "\t",
    lines = [],
    lineNumber = startLine,
    pos = 0,
    nextNewline = content.indexOf(`
`);
  while (nextNewline !== -1) lines.push(WJo(content.slice(pos, nextNewline), lineNumber++, separator)), pos = nextNewline + 1, nextNewline = content.indexOf(`
`, pos);
  return lines.push(WJo(content.slice(pos), lineNumber, separator)), lines.join(`
`);
}
function WJo(lineContent, lineNumber, separator) {
  let trimmedLine = lineContent.endsWith("\r") ? lineContent.slice(0, -1) : lineContent;
  return `${lineNumber}${separator}${trimmedLine}`;
}
function VJo(formattedLine) {
  return formattedLine.match(/^\s*\d+[\u2192\t:](.*)$/)?.[1] ?? formattedLine;
}
function KJo(dirPath) {
  try {
    return jt().isDirEmptySync(dirPath);
  } catch (err) {
    return Dn(err);
  }
}
function lbt(targetPath, content, options = {
  encoding: "utf-8"
}) {
  let fsAdapter = jt(),
    noFollowFlag = options.allowSymlink ? 0 : rf.constants.O_NOFOLLOW,
    resolvedPath = targetPath,
    existingMode,
    fileExists = false;
  if (options.allowSymlink) try {
    let linkTarget = fsAdapter.readlinkSync(targetPath);
    resolvedPath = hf.isAbsolute(linkTarget) ? linkTarget : hf.resolve(Xp(fsAdapter, hf.dirname(targetPath)).resolvedPath, linkTarget), v(`Writing through symlink: ${targetPath} -> ${resolvedPath}`);
  } catch {} else {
    if (options.checkParentDir) try {
      rf.closeSync(rf.openSync(hf.dirname(targetPath), rf.constants.O_RDONLY | rf.constants.O_DIRECTORY | rf.constants.O_NOFOLLOW));
    } catch (err) {
      let errCode = ln(err);
      if (errCode === "ELOOP" || errCode === "ENOTDIR") throw new RMe(`Refusing to write into symlinked directory: ${hf.dirname(targetPath)}`);
    }
    try {
      let lstat = fsAdapter.lstatSync(targetPath);
      if (lstat.isSymbolicLink()) throw new RMe(`Refusing to write through symlink: ${targetPath}. Resolve the symlink and pass the real target path explicitly.`);
      existingMode = lstat.mode, fileExists = true;
    } catch (err) {
      if (!Dn(err)) throw err;
    }
  }
  let tempPath = `${resolvedPath}.tmp.${process.pid}.${gmr.randomBytes(6).toString("hex")}`,
    tempWritten = false;
  if (options.allowSymlink && !fileExists) try {
    existingMode = fsAdapter.statSync(resolvedPath).mode, fileExists = true;
  } catch (err) {
    if (!Dn(err)) throw err;
  }
  if (fileExists && existingMode !== undefined) v(`Preserving file permissions: ${existingMode.toString(8)}`);else if (options.mode !== undefined) existingMode = options.mode, v(`Setting permissions for new file: ${existingMode.toString(8)}`);
  try {
    v(`Writing to temp file: ${tempPath}`);
    let fd = rf.openSync(tempPath, rf.constants.O_WRONLY | rf.constants.O_CREAT | rf.constants.O_EXCL | noFollowFlag, !fileExists && options.mode !== undefined ? options.mode : undefined);
    try {
      if (rf.writeFileSync(fd, content, {
        encoding: options.encoding
      }), fileExists && existingMode !== undefined) try {
        rf.fchmodSync(fd, existingMode), v("Applied original permissions to temp file");
      } catch (err) {
        if (!c7e(err)) throw err;
        v(`fchmod unsupported on this filesystem: ${err}`);
      }
      try {
        rf.fsyncSync(fd);
      } catch (err) {
        if (!c7e(err)) throw err;
        v(`fsync unsupported on this filesystem: ${err}`);
      }
      tempWritten = true;
    } finally {
      rf.closeSync(fd);
    }
    v(`Temp file written successfully, size: ${content.length} bytes`), v(`Renaming ${tempPath} to ${resolvedPath}`), fsAdapter.renameSync(tempPath, resolvedPath), v(`File ${resolvedPath} written atomically`);
  } catch (err) {
    v(`Failed to write file atomically: ${err}`, {
      level: "error"
    });
    let errCode = ln(err);
    if (tempWritten && errCode !== undefined && SMe.has(errCode) || !tempWritten && fileExists && errCode === "EACCES") {
      let inPlaceFd;
      try {
        inPlaceFd = rf.openSync(resolvedPath, rf.constants.O_WRONLY | rf.constants.O_CREAT | rf.constants.O_TRUNC | noFollowFlag, !fileExists && options.mode !== undefined ? options.mode : undefined);
      } catch (openErr) {
        try {
          fsAdapter.unlinkSync(tempPath);
        } catch (cleanupErr) {
          v(`Failed to clean up temp file: ${cleanupErr}`);
        }
        if (ln(openErr) === "ELOOP") throw new RMe(`Refusing to write through symlink: ${resolvedPath} (O_NOFOLLOW)`);
        throw err;
      }
      try {
        rf.writeFileSync(inPlaceFd, content, {
          encoding: options.encoding
        });
        try {
          rf.fsyncSync(inPlaceFd);
        } catch (syncErr) {
          if (!c7e(syncErr)) throw syncErr;
          v(`fsync unsupported on this filesystem: ${syncErr}`);
        }
        rf.closeSync(inPlaceFd);
        try {
          fsAdapter.unlinkSync(tempPath);
        } catch (cleanupErr) {
          v(`Failed to clean up temp file: ${cleanupErr}`);
        }
        v(`File ${resolvedPath} written via in-place fallback`);
        return;
      } catch (writeErr) {
        try {
          rf.closeSync(inPlaceFd);
        } catch {}
        try {
          fsAdapter.unlinkSync(resolvedPath);
        } catch {}
        if (tempWritten) throw new pc(`Write to ${resolvedPath} failed (${ln(writeErr) ?? writeErr}) after the target was truncated. The new content was preserved at ${tempPath}.`, "writeFileSyncAndFlush: in-place fallback write failed; content preserved at temp path");
        throw writeErr;
      }
    }
    try {
      fsAdapter.unlinkSync(tempPath);
    } catch (cleanupErr) {
      v(`Failed to clean up temp file: ${cleanupErr}`);
    }
    throw err;
  }
}
async function Smr(targetPath, content, options = {
  encoding: "utf-8"
}) {
  let fsAdapter = jt(),
    noFollowFlag = options.allowSymlink ? 0 : rf.constants.O_NOFOLLOW,
    resolvedPath = targetPath,
    existingMode,
    fileExists = false;
  if (options.allowSymlink) try {
    let linkTarget = await x3.readlink(targetPath);
    resolvedPath = hf.isAbsolute(linkTarget) ? linkTarget : hf.resolve(await x3.realpath(hf.dirname(targetPath)), linkTarget), v(`Writing through symlink: ${targetPath} -> ${resolvedPath}`);
  } catch {} else {
    if (options.checkParentDir) try {
      await (await x3.open(hf.dirname(targetPath), rf.constants.O_RDONLY | rf.constants.O_DIRECTORY | rf.constants.O_NOFOLLOW)).close();
    } catch (err) {
      let errCode = ln(err);
      if (errCode === "ELOOP" || errCode === "ENOTDIR") throw new RMe(`Refusing to write into symlinked directory: ${hf.dirname(targetPath)}`);
    }
    try {
      let lstat = await x3.lstat(targetPath);
      if (lstat.isSymbolicLink()) throw new RMe(`Refusing to write through symlink: ${targetPath}. Resolve the symlink and pass the real target path explicitly.`);
      existingMode = lstat.mode, fileExists = true;
    } catch (err) {
      if (!Dn(err)) throw err;
    }
  }
  let tempPath = `${resolvedPath}.tmp.${process.pid}.${gmr.randomBytes(6).toString("hex")}`,
    tempWritten = false;
  if (options.allowSymlink && !fileExists) try {
    existingMode = (await fsAdapter.stat(resolvedPath)).mode, fileExists = true;
  } catch (err) {
    if (!Dn(err)) throw err;
  }
  if (fileExists && existingMode !== undefined) v(`Preserving file permissions: ${existingMode.toString(8)}`);else if (options.mode !== undefined) existingMode = options.mode, v(`Setting permissions for new file: ${existingMode.toString(8)}`);
  try {
    v(`Writing to temp file: ${tempPath}`);
    let fileHandle = await x3.open(tempPath, rf.constants.O_WRONLY | rf.constants.O_CREAT | rf.constants.O_EXCL | noFollowFlag, !fileExists && options.mode !== undefined ? options.mode : undefined);
    try {
      if (await fileHandle.writeFile(content, {
        encoding: options.encoding
      }), fileExists && existingMode !== undefined) try {
        await fileHandle.chmod(existingMode), v("Applied original permissions to temp file");
      } catch (err) {
        if (!c7e(err)) throw err;
        v(`fchmod unsupported on this filesystem: ${err}`);
      }
      try {
        await fileHandle.sync();
      } catch (err) {
        if (!c7e(err)) throw err;
        v(`fsync unsupported on this filesystem: ${err}`);
      }
      tempWritten = true;
    } finally {
      await fileHandle.close();
    }
    v(`Temp file written successfully, size: ${content.length} bytes`), v(`Renaming ${tempPath} to ${resolvedPath}`), await fsAdapter.rename(tempPath, resolvedPath), v(`File ${resolvedPath} written atomically`);
  } catch (err) {
    v(`Failed to write file atomically: ${err}`, {
      level: "error"
    });
    let errCode = ln(err);
    if (tempWritten && errCode !== undefined && SMe.has(errCode) || !tempWritten && fileExists && errCode === "EACCES") {
      let inPlaceHandle;
      try {
        inPlaceHandle = await x3.open(resolvedPath, rf.constants.O_WRONLY | rf.constants.O_CREAT | rf.constants.O_TRUNC | noFollowFlag, !fileExists && options.mode !== undefined ? options.mode : undefined);
      } catch (openErr) {
        try {
          await fsAdapter.unlink(tempPath);
        } catch (cleanupErr) {
          v(`Failed to clean up temp file: ${cleanupErr}`);
        }
        if (ln(openErr) === "ELOOP") throw new RMe(`Refusing to write through symlink: ${resolvedPath} (O_NOFOLLOW)`);
        throw err;
      }
      try {
        await inPlaceHandle.writeFile(content, {
          encoding: options.encoding
        });
        try {
          await inPlaceHandle.sync();
        } catch (syncErr) {
          if (!c7e(syncErr)) throw syncErr;
          v(`fsync unsupported on this filesystem: ${syncErr}`);
        }
        await inPlaceHandle.close();
        try {
          await fsAdapter.unlink(tempPath);
        } catch (cleanupErr) {
          v(`Failed to clean up temp file: ${cleanupErr}`);
        }
        v(`File ${resolvedPath} written via in-place fallback`);
        return;
      } catch (writeErr) {
        try {
          await inPlaceHandle.close();
        } catch {}
        try {
          await fsAdapter.unlink(resolvedPath);
        } catch {}
        if (tempWritten) throw new pc(`Write to ${resolvedPath} failed (${ln(writeErr) ?? writeErr}) after the target was truncated. The new content was preserved at ${tempPath}.`, "writeFileAndFlush: in-place fallback write failed; content preserved at temp path");
        throw writeErr;
      }
    }
    try {
      await fsAdapter.unlink(tempPath);
    } catch (cleanupErr) {
      v(`Failed to clean up temp file: ${cleanupErr}`);
    }
    throw err;
  }
}
function zJo() {
  let platform = Yt(),
    homeDir = _mr.homedir();
  if (platform === "macos") return hf.join(homeDir, "Desktop");
  if (platform === "windows") {
    let userProfile = process.env.USERPROFILE ? process.env.USERPROFILE.replaceAll("\\", "/") : null;
    if (userProfile) {
      let wslDesktopPath = `/mnt/c${userProfile.replace(/^[A-Z]:/, "")}/Desktop`;
      if (jt().existsSync(wslDesktopPath)) return wslDesktopPath;
    }
    try {
      let usersDir = jt().readdirSync("/mnt/c/Users");
      for (let entry of usersDir) {
        if (entry.name === "Public" || entry.name === "Default" || entry.name === "Default User" || entry.name === "All Users") continue;
        let desktopPath = hf.join("/mnt/c/Users", entry.name, "Desktop");
        if (jt().existsSync(desktopPath)) return desktopPath;
      }
    } catch (err) {
      v(`Failed to enumerate /mnt/c/Users for Windows desktop path: ${err}`, {
        level: "error"
      });
    }
  }
  let defaultDesktop = hf.join(homeDir, "Desktop");
  if (jt().existsSync(defaultDesktop)) return defaultDesktop;
  return homeDir;
}
function Ren(filePath, maxSize = DEFAULT_MAX_FILE_BYTES) {
  try {
    return jt().statSync(filePath).size <= maxSize;
  } catch {
    return false;
  }
}
function rv(filePath) {
  let normalized = hf.normalize(filePath);
  if (Yt() === "windows") normalized = normalized.replaceAll("/", "\\").toLowerCase();
  return normalized;
}
function YJo(pathA, pathB) {
  return rv(pathA) === rv(pathB);
}
var gmr,
  rf,
  x3,
  _mr,
  hf,
  RMe,
  DEFAULT_MAX_FILE_BYTES = 262144,
  PERFORCE_READ_ONLY_MESSAGE = "File is read-only \u2014 it has not been opened for edit in Perforce. Run `p4 edit <file>` to check it out, then retry. Do not chmod the file writable; that bypasses Perforce tracking.",
  writeSerializationMap,
  CWD_NOTE = "Note: your current working directory is";
var mc = b(() => {
  Ko();
  ek();
  je();
  an();
  St();
  mB();
  bs();
  wn();
  Pu();
  $s();
  Xt();
  gmr = require("crypto"), rf = require("fs"), x3 = require("fs/promises"), _mr = require("os"), hf = require("path");
  RMe = class RMe extends Error {
    constructor(e) {
      super(e);
      this.name = "SymlinkWriteRefusedError";
    }
  };
  writeSerializationMap = new Map();
});
export {pd as Gu,u7e as Rje,VX as QX,xMe as U1e,Tmr as Fyr,c7e as Aje,p7e as wje,JSe as zEe,XSe as jEe,ven as Yrn,GJo as Xrs,QV as FK,u7c as tsu,Md as dd,m7e as kje,noe as doe,wen as Jrn,WJo as Jrs,VJo as Qrs,KJo as Zrs,lbt as sRt,Smr as Byr,zJo as eos,Ren as Xrn,rv as mA,YJo as tos,gmr as Lyr,rf as cm,x3 as l3,_mr as Myr,hf as vm,RMe as B1e,DEFAULT_MAX_FILE_BYTES as Nyr,PERFORCE_READ_ONLY_MESSAGE as vje,writeSerializationMap as jrn,CWD_NOTE as KN,mc as Xl};
