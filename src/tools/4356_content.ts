// @ts-nocheck
import {XX,GN} from "../../vendor/m640.ts";
import {In,Ct} from "../../vendor/m197.ts";
import {G0e,V0e,SBa,kBa,bBa,Fut,Y9t} from "../../vendor/m3913.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {iZe,mI,W0t} from "../config/2029_mI.ts";
import {ehe,dEn,pEn,ry,fa} from "../../vendor/m2253.ts";
import {QX,Xl,wje,vje,kje,doe,KN,zEe,jEe} from "../config/0651_maxBytes.ts";
import {gae,Gk} from "../../vendor/m2727.ts";
import {Ve,Le} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {kt,logEvent as W} from "../../vendor/m132.ts";
import {xrt,Lkn} from "../../vendor/m2692.ts";
import {p3e,Qge} from "../../vendor/m3238.ts";
import {Sit,rPn,oPn} from "../../vendor/m3239.ts";
import {zae,tIe} from "../../vendor/m3263.ts";
import {s9e,Xke} from "../telemetry/2792_eventName.ts";
import {XZr,RPn} from "../../vendor/m3265.ts";
import {$q,Yut,Jut,Xut} from "./4352_displayName.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {e3t,Gut} from "../agent/3925_e3t.ts";
import {xl,Mr,Q0e} from "../../vendor/m4427.ts";
import {Po,isTmuxControlMode as Lt} from "../../vendor/m638.ts";
import {qe,logForDebugging as A} from "../config/0236_setHasFormattedOutput.ts";
import {oce,W0e,j9t} from "../telemetry/3912_oldStart.ts";
import {Ir} from "../../vendor/m584.ts";
import {dn} from "../config/0137_namespace.ts";
import {Pq,TT,I0e} from "../session/3880_trackSequence.ts";
import {V$n,Ste} from "../telemetry/3926_operation.ts";
import {Xo,formatFileSize as Ra} from "../../vendor/m240.ts";
import {ps,Wt} from "../../vendor/m230.ts";
import {t3t,j$n} from "../config/3927_hunks.ts";
import {Ro,getCanonicalName as So} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Tu,hs} from "../../vendor/m649.ts";
import {Q$n} from "../../vendor/m3940.ts";
import {Xm,matchesPathRule as uye,checkWritePermissionForTool as exe,matchingRuleForInput as fw} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {ztl,Ktl} from "../../vendor/m4352.ts";
import {dm,gEn} from "../../vendor/m2256.ts";
import {Jtl,Ytl,jtl} from "../telemetry/4354_replace_all.ts";
import {n3t,Y$n,juo} from "../../vendor/m3927.ts";
import {HTo,m8n,kTo,Xtl,Qtl,Ztl,enl} from "../core/4355_file_path.ts";
import {Y0} from "./2710_allErrors.ts";
import {Ne} from "../../vendor/m583.ts";
import {nt} from "../../vendor/m127.ts";
// @ts-nocheck
/**
 * FileEditTool — string-replace editing of files in place.
 *
 * Reads a file, validates the requested old_string/new_string replacement,
 * handles permission/staleness/encoding concerns, applies the edit, formats,
 * writes back, notifies the LSP, and reports a structured patch + git diff.
 *
 * Structure mirrors the v2.1.185 readable module (tools/4336_content.ts);
 * identifiers below are the v2.1.190 mangled names with locals renamed for
 * readability and TS annotations / comments added.
 */

/**
 * Read a file's content + metadata; tolerate a missing file by returning an
 * empty "does not exist" descriptor instead of throwing.
 */
function p6p(filePath: string): any {
  try {
    let fileData: any = XX(filePath);
    return {
      content: fileData.content,
      fileExists: !0,
      encoding: fileData.encoding,
      lineEndings: fileData.lineEndings
    };
  } catch (err: any) {
    if (In(err)) return {
      content: "",
      fileExists: !1,
      encoding: "utf8",
      lineEndings: "LF"
    };
    throw err;
  }
}

/**
 * Classify whether oldString can be applied to fileContents:
 * "no_match" | "ambiguous" (multiple matches, replaceAll off) | "applies".
 */
function ITo(fileContents: string, oldString: string, replaceAll: any): any {
  if (oldString === "") return "no_match";
  let matched: any = G0e(fileContents, oldString);
  if (!matched) return "no_match";
  if (!replaceAll) {
    let firstIdx: any = fileContents.indexOf(matched);
    if (fileContents.indexOf(matched, firstIdx + matched.length) !== -1) return "ambiguous";
  }
  return "applies";
}

/** Stale-read recovery is allowed only when the edit still applies and the gate flag is on. */
function nnl(matchResult: any): any {
  return matchResult === "applies" && it("tengu_cedar_sundial", !1);
}

/**
 * Guard run before applying an edit: enforces read-before-write and freshness.
 * Returns true when a stale read was recovered, false when no guard fires,
 * and throws when the file was never read or has changed since last read.
 */
function m6p({
  absoluteFilePath: absoluteFilePath,
  fileContents: fileContents,
  lastRead: lastRead,
  oldString: oldString,
  replaceAll: replaceAll,
  model: model
}: any): any {
  if (!lastRead) {
    if (it("tengu_velvet_hammer", !1) || it(iZe("tengu_velvet_hammer", model), !1)) return !1;
    throw new ehe(dEn);
  }
  if (QX(absoluteFilePath) <= lastRead.timestamp) return !1;
  if ((lastRead.offset ?? 1) <= 1 && lastRead.limit === void 0 && gae(lastRead, fileContents)) return !1;
  if (nnl(ITo(fileContents, oldString, replaceAll))) return !0;
  throw new ehe(pEn);
}

/** Map a match-result classification to its localized result code. */
function rnl(matchResult: any): any {
  switch (matchResult) {
    case "no_match":
      return Ve("errorCode8");
    case "ambiguous":
      return Ve("errorCode9");
    case "applies":
      return Ve("success");
  }
}

/** Classify then localize: what would the edit have resulted in. */
function f6p(fileContents: string, oldString: string, replaceAll: any): any {
  return rnl(ITo(fileContents, oldString, replaceAll));
}

var eTe: any,
  /** Maximum editable file size in bytes (1 GiB). */
  tnl = 1073741824,
  ME: any;
var nxe = b(() => {
  kt();
  xrt();
  jn();
  p3e();
  Sit();
  zae();
  s9e();
  XZr();
  $q();
  ri();
  e3t();
  xl();
  Po();
  qe();
  oce();
  Ir();
  dn();
  Ct();
  Xl();
  Pq();
  V$n();
  GN();
  Gk();
  Xo();
  ps();
  t3t();
  mI();
  Ro();
  Tu();
  Q$n();
  Xm();
  ztl();
  dm();
  ry();
  Jtl();
  n3t();
  HTo();
  V0e();
  eTe = require("path"), ME = Ks({
    name: fa,
    ruleContentField: "file_path",
    searchHint: "modify file contents in place",
    maxResultSizeChars: 1e5,
    strict: !0,
    async description() {
      return "A tool for editing files";
    },
    async prompt({
      model: model
    }: any) {
      return Ytl(model);
    },
    userFacingName: m8n,
    getToolUseSummary: kTo,
    getActivityDescription(toolUse: any) {
      let summary: any = kTo(toolUse);
      return summary ? `Editing ${summary}` : "Editing file";
    },
    get inputSchema() {
      return Y$n();
    },
    get outputSchema() {
      return juo();
    },
    coerceInput: jtl,
    stripForStorage(input: any) {
      if (typeof input !== "object" || input === null) return input;
      if ((input.originalFile ?? "") === "") return input;
      return {
        ...input,
        originalFile: ""
      };
    },
    toAutoClassifierInput(input: any) {
      return `${input.file_path}: ${input.new_string}`;
    },
    getPath(input: any) {
      return input.file_path;
    },
    backfillObservableInput(input: any) {
      if (typeof input.file_path === "string") input.file_path = hs(input.file_path);
    },
    async preparePermissionMatcher({
      file_path: file_path
    }: any) {
      return (rule: any) => uye(rule, file_path);
    },
    async checkPermissions(input: any, ctx: any) {
      return exe(ME, input, Mr(ctx));
    },
    renderToolUseMessage: Xtl,
    renderToolResultMessage: Qtl,
    renderToolUseRejectedMessage: Ztl,
    renderToolUseErrorMessage: enl,
    async validateInput(input: any, ctx: any) {
      let {
          file_path: file_path,
          old_string: old_string,
          new_string: new_string,
          replace_all = !1
        } = input,
        absPath: any = hs(file_path),
        agentCheck: any = Gut(absPath, ctx);
      if (agentCheck) return {
        result: !1,
        message: agentCheck,
        errorCode: 12
      };
      let lineEndingCheck: any = RPn(absPath, new_string);
      if (lineEndingCheck) return {
        result: !1,
        message: lineEndingCheck,
        errorCode: 0
      };
      if (old_string === new_string) return {
        result: !1,
        behavior: "ask",
        message: "No changes to make: old_string and new_string are exactly the same.",
        errorCode: 1
      };
      if (fw(absPath, Mr(ctx), "edit", "deny") !== null) return {
        result: !1,
        behavior: "ask",
        message: "File is in a directory that is denied by your permission settings.",
        errorCode: 2
      };
      if (absPath.startsWith("\\\\") || absPath.startsWith("//")) return {
        result: !0
      };
      let fs: any = Wt();
      try {
        let {
          size: fileSize,
          mode: fileMode
        }: any = await fs.stat(absPath);
        if (fileSize > tnl) return {
          result: !1,
          behavior: "ask",
          message: `File is too large to edit (${Ra(fileSize)}). Maximum editable file size is ${Ra(tnl)}.`,
          errorCode: 10
        };
        if (wje(fileMode)) return {
          result: !1,
          behavior: "ask",
          message: vje,
          errorCode: 11
        };
      } catch (statErr: any) {
        if (!In(statErr)) throw statErr;
      }
      let fileContent: any;
      try {
        let rawBytes: any = await fs.readFileBytes(absPath),
          detectedEncoding: any = rawBytes.length >= 2 && rawBytes[0] === 255 && rawBytes[1] === 254 ? "utf16le" : "utf8";
        fileContent = rawBytes.toString(detectedEncoding).replaceAll(`\r
`, `
`);
      } catch (readErr: any) {
        if (In(readErr)) fileContent = null;else throw readErr;
      }
      if (fileContent === null) {
        if (old_string === "") return {
          result: !0
        };
        let nearMatchDir: any = kje(absPath),
          nearMatchFile: any = await doe(absPath),
          notExistMsg: any = `File does not exist. ${KN} ${Lt()}.`;
        if (nearMatchFile) notExistMsg += ` Did you mean ${nearMatchFile}?`;else if (nearMatchDir) notExistMsg += ` Did you mean ${nearMatchDir}?`;
        return {
          result: !1,
          behavior: "ask",
          message: notExistMsg,
          errorCode: 4
        };
      }
      if (old_string === "") {
        if (fileContent.trim() !== "") return {
          result: !1,
          behavior: "ask",
          message: "Cannot create new file - file already exists.",
          errorCode: 3
        };
        return {
          result: !0
        };
      }
      if (absPath.endsWith(".ipynb")) return {
        result: !1,
        behavior: "ask",
        message: `File is a Jupyter Notebook. Use the ${Y0} to edit this file.`,
        errorCode: 5
      };
      let readState: any = ctx.readFileState.get(absPath);
      if (!readState || readState.isPartialView) {
        let canonicalModelName: any = So(Q0e(ctx)),
          modelBucket: any = W0t(canonicalModelName),
          velvetHammerEnabled: any = it("tengu_velvet_hammer", !1) || it(iZe("tengu_velvet_hammer", canonicalModelName), !1);
        if (W("tengu_edit_tool_not_read_hypothetical", {
          wouldHaveResult: f6p(fileContent, old_string, replace_all),
          isPartialView: readState?.isPartialView === !0,
          isFilePathAbsolute: eTe.isAbsolute(file_path),
          guardSkipped: velvetHammerEnabled,
          modelBucket: Le(modelBucket)
        }), !velvetHammerEnabled) return {
          result: !1,
          behavior: "ask",
          message: "File has not been read yet. Read it first before writing to it.",
          meta: {
            isFilePathAbsolute: String(eTe.isAbsolute(file_path))
          },
          errorCode: 6
        };
      }
      if (readState) {
        if (QX(absPath) > readState.timestamp) if ((readState.offset ?? 1) <= 1 && readState.limit === void 0 && gae(readState, fileContent)) ;else {
          let matchResult: any = ITo(fileContent, old_string, replace_all),
            staleRecovered: any = nnl(matchResult);
          if (W("tengu_edit_tool_stale_read", {
            wouldHaveResult: rnl(matchResult),
            recovered: staleRecovered
          }), !staleRecovered) return {
            result: !1,
            behavior: "ask",
            message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
            errorCode: 7
          };
        }
      }
      let currentContent: any = fileContent,
        matchedOldString: any = G0e(currentContent, old_string);
      if (!matchedOldString) {
        let unicodeNote: any = SBa(old_string) ? `
(note: Edit also tried swapping \\uXXXX escapes and their characters; neither form matched, so the mismatch is likely elsewhere in old_string. Re-read the file and copy the exact surrounding text.)` : "";
        return {
          result: !1,
          behavior: "ask",
          message: `String to replace not found in file.
String: ${old_string}${unicodeNote}`,
          meta: {
            isFilePathAbsolute: String(eTe.isAbsolute(file_path))
          },
          errorCode: 8
        };
      }
      let matchCount: any = currentContent.split(matchedOldString).length - 1;
      if (matchCount > 1 && !replace_all) return {
        result: !1,
        behavior: "ask",
        message: `Found ${matchCount} matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.
String: ${old_string}`,
        meta: {
          isFilePathAbsolute: String(eTe.isAbsolute(file_path)),
          actualOldString: matchedOldString
        },
        errorCode: 9
      };
      let validationErr: any = Ktl(absPath, currentContent, () => replace_all ? currentContent.replaceAll(matchedOldString, new_string) : currentContent.replace(matchedOldString, new_string));
      if (validationErr !== null) return validationErr;
      return {
        result: !0,
        meta: {
          actualOldString: matchedOldString
        }
      };
    },
    inputsEquivalent(inputA: any, inputB: any) {
      return kBa({
        file_path: inputA.file_path,
        edits: [{
          old_string: inputA.old_string,
          new_string: inputA.new_string,
          replace_all: inputA.replace_all ?? !1
        }]
      }, {
        file_path: inputB.file_path,
        edits: [{
          old_string: inputB.old_string,
          new_string: inputB.new_string,
          replace_all: inputB.replace_all ?? !1
        }]
      });
    },
    async call(input: any, {
      options: options,
      permissionLayers: permissionLayers,
      readFileState: readFileState,
      userModified: userModified,
      getFileHistoryState: getFileHistoryState,
      applyFileHistoryOp: applyFileHistoryOp,
      dynamicSkillDirTriggers: dynamicSkillDirTriggers
    }: any, l: any, c: any) {
      let {
          file_path: file_path,
          old_string: old_string,
          new_string: new_string,
          replace_all = !1
        } = input,
        fs: any = Wt(),
        absPath: any = hs(file_path),
        platformInfo: any = Lt();
      if (!Ne.CLAUDE_CODE_SIMPLE) {
        let skillDirs: any = await Yut([absPath], platformInfo);
        if (skillDirs.length > 0) {
          if (dynamicSkillDirTriggers) {
            for (let skillDir: any of skillDirs) if (!dynamicSkillDirTriggers.includes(skillDir)) dynamicSkillDirTriggers.push(skillDir);
          }
          Jut(skillDirs).catch(() => {});
        }
        Xut([absPath], platformInfo);
      }
      if (await Qge.beforeFileEdited(absPath), await fs.mkdir(eTe.dirname(absPath)), TT()) await I0e(getFileHistoryState, applyFileHistoryOp, absPath, c.uuid);
      let {
          originalFileContents: originalFileContents,
          actualOldString: actualOldString,
          updatedFile: updatedFile,
          patch: patch,
          staleRecovered: staleRecovered
        } = await zEe(absPath, async () => {
          let {
              content: content,
              fileExists: fileExists,
              encoding: encoding,
              lineEndings: lineEndings
            } = p6p(absPath),
            isStale: any = fileExists && m6p({
              absoluteFilePath: absPath,
              fileContents: content,
              lastRead: readFileState.get(absPath),
              oldString: old_string,
              replaceAll: replace_all,
              model: So(Q0e({
                options: options,
                permissionLayers: permissionLayers
              }))
            }),
            resolvedOldString: any = G0e(content, old_string) || old_string,
            normalizedNewString: any = bBa(old_string, resolvedOldString, Fut(old_string, resolvedOldString, new_string)),
            editResult: any = Y9t({
              filePath: absPath,
              fileContents: content,
              oldString: resolvedOldString,
              newString: normalizedNewString,
              replaceAll: replace_all
            }),
            formattedContent: any = Lkn(absPath, editResult.updatedFile),
            finalPatch: any = formattedContent === editResult.updatedFile ? editResult.patch : W0e({
              filePath: absPath,
              oldContent: content,
              newContent: formattedContent,
              convertTabs: !0
            }),
            writeTimestamp: any = await jEe(absPath, formattedContent, encoding, lineEndings);
          return readFileState.set(absPath, {
            content: formattedContent,
            timestamp: writeTimestamp,
            offset: void 0,
            limit: void 0
          }), {
            originalFileContents: content,
            actualOldString: resolvedOldString,
            updatedFile: formattedContent,
            patch: finalPatch,
            staleRecovered: isStale
          };
        }),
        lspClient: any = tIe();
      if (lspClient) rPn(absPath), oPn(absPath), lspClient.changeFile(absPath, updatedFile).catch((lspErr: any) => {
        A(`LSP: Failed to notify server of file change for ${absPath}: ${lspErr.message}`, {
          level: "error"
        });
      }), lspClient.saveFile(absPath).catch((lspErr: any) => {
        A(`LSP: Failed to notify server of file save for ${absPath}: ${lspErr.message}`, {
          level: "error"
        });
      });
      if (Xke(absPath, originalFileContents, updatedFile), absPath.endsWith(`${eTe.sep}CLAUDE.md`)) W("tengu_write_claudemd", {});
      j9t(patch, c.message.model), Ste({
        operation: "edit",
        tool: "FileEditTool",
        filePath: absPath
      }), W("tengu_edit_string_lengths", {
        oldStringBytes: Buffer.byteLength(old_string, "utf8"),
        newStringBytes: Buffer.byteLength(new_string, "utf8"),
        replaceAll: replace_all
      });
      let gitDiff: any;
      if (nt(process.env.CLAUDE_CODE_REMOTE)) {
        let startTime: any = Date.now(),
          diffResult: any = await j$n(absPath);
        if (diffResult) gitDiff = diffResult;
        W("tengu_tool_use_diff_computed", {
          isEditTool: !0,
          durationMs: Date.now() - startTime,
          hasDiff: !!diffResult
        });
      }
      return {
        data: {
          filePath: file_path,
          oldString: actualOldString,
          newString: new_string,
          originalFile: originalFileContents,
          structuredPatch: patch,
          userModified: userModified ?? !1,
          replaceAll: replace_all,
          ...(staleRecovered && {
            staleRecovered: !0
          }),
          ...(gitDiff && {
            gitDiff: gitDiff
          })
        }
      };
    },
    mapToolResultToToolResultBlockParam(result: any, toolUseId: any) {
      let {
          filePath: filePath,
          userModified: userModified,
          replaceAll: replaceAll,
          staleRecovered: staleRecovered
        } = result,
        userModifiedNote: any = userModified ? ".  The user modified your proposed changes before accepting them. " : "",
        staleNote: any = staleRecovered ? " (note: the file had been modified on disk since you last read it — the edit applied cleanly, but the file contains other changes not in your context. Read it before edits that depend on surrounding content.)" : userModified ? "" : gEn;
      if (replaceAll) return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `The file ${filePath} has been updated${userModifiedNote}. All occurrences were successfully replaced.${staleNote}`
      };
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `The file ${filePath} has been updated successfully${userModifiedNote}.${staleNote}`
      };
    }
  });
});

export {p6p,ITo,nnl,m6p,rnl,f6p,eTe,tnl,ME,nxe};
