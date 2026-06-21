// @ts-nocheck
import {eQ,bB} from "../../vendor/m634.ts";
import {Pn,bt} from "../../vendor/m195.ts";
import {vIe,wIe,pUa,TUa,mUa,Wct,L$t} from "../../vendor/m4047.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {lXe,NH,hkt} from "../config/2024_NH.ts";
import {jfe,xyn,kyn,ty,Ua} from "../../vendor/m2245.ts";
import {tQ,mc,H7e,k7e,I7e,moe,CB,pbe,mbe} from "../config/0645_maxBytes.ts";
import {yae,xk} from "../../vendor/m2715.ts";
import {Qe,fromEnum,st} from "../../vendor/m5.ts";
import {b} from "../../runtime.ts";
import {Ct,logEvent} from "../../vendor/m131.ts";
import {xtt,Vvn} from "../../vendor/m2681.ts";
import {r9e,Uhe} from "../../vendor/m3222.ts";
import {yot,mIn,fIn} from "../../vendor/m3223.ts";
import {Kae,mke} from "../../vendor/m3247.ts";
import {Q2e,dxe} from "../telemetry/2780_eventName.ts";
import {fYr,LIn} from "../../vendor/m3249.ts";
import {x6,eut,tut,nut} from "./4332_displayName.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {U$t,Yct} from "../agent/4058_U$t.ts";
import {Ql,Fr,DIe} from "../../vendor/m4405.ts";
import {Go,Pt} from "../../vendor/m632.ts";
import {qe,logForDebugging} from "../config/0234_setHasFormattedOutput.ts";
import {vce,CIe,O$t} from "../telemetry/4046_oldStart.ts";
import {Lr} from "../../vendor/m578.ts";
import {sn} from "../config/0047_namespace.ts";
import {_6,vT,UHe} from "../session/3862_trackSequence.ts";
import {e$n,Wte} from "../telemetry/4059_operation.ts";
import {ps,formatFileSize} from "../../vendor/m238.ts";
import {ws,jt} from "../../vendor/m228.ts";
import {$$t,r$n} from "../config/4060_hunks.ts";
import {Mo,getCanonicalName} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Iu,Ds} from "../../vendor/m643.ts";
import {nA,matchesPathRule,checkWritePermissionForTool,matchingRuleForInput} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {CYa,EYa} from "../../vendor/m4332.ts";
import {ef,Pyn} from "../../vendor/m2248.ts";
import {RYa,wYa,vYa} from "../telemetry/4334_replace_all.ts";
import {q$t,o$n,Ulo} from "../../vendor/m4060.ts";
import {Pfo,J4n,Dfo,xYa,kYa,HYa,IYa} from "../core/4335_file_path.ts";
import {I0} from "./2698_allErrors.ts";
import {je} from "../../vendor/m577.ts";
function IBp(filePath: string): any {
  try {
    let fileData: any = eQ(filePath);
    return {
      content: fileData.content,
      fileExists: !0,
      encoding: fileData.encoding,
      lineEndings: fileData.lineEndings
    };
  } catch (err: any) {
    if (Pn(err)) return {
      content: "",
      fileExists: !1,
      encoding: "utf8",
      lineEndings: "LF"
    };
    throw err;
  }
}
function Ofo(fileContents: string, oldString: string, replaceAll: any): any {
  if (oldString === "") return "no_match";
  let matched: any = vIe(fileContents, oldString);
  if (!matched) return "no_match";
  if (!replaceAll) {
    let firstIdx: any = fileContents.indexOf(matched);
    if (fileContents.indexOf(matched, firstIdx + matched.length) !== -1) return "ambiguous";
  }
  return "applies";
}
function PYa(matchResult: any): any {
  return matchResult === "applies" && getFeatureValue_CACHED_MAY_BE_STALE("tengu_cedar_sundial", !1);
}
function DBp({
  absoluteFilePath: absoluteFilePath,
  fileContents: fileContents,
  lastRead: lastRead,
  oldString: oldString,
  replaceAll: replaceAll,
  model: model
}: any): any {
  if (!lastRead) {
    if (getFeatureValue_CACHED_MAY_BE_STALE("tengu_velvet_hammer", !1) || getFeatureValue_CACHED_MAY_BE_STALE(lXe("tengu_velvet_hammer", model), !1)) return !1;
    throw new jfe(xyn);
  }
  if (tQ(absoluteFilePath) <= lastRead.timestamp) return !1;
  if ((lastRead.offset ?? 1) <= 1 && lastRead.limit === void 0 && yae(lastRead, fileContents)) return !1;
  if (PYa(Ofo(fileContents, oldString, replaceAll))) return !0;
  throw new jfe(kyn);
}
function OYa(matchResult: any): any {
  switch (matchResult) {
    case "no_match":
      return Qe("errorCode8");
    case "ambiguous":
      return Qe("errorCode9");
    case "applies":
      return Qe("success");
  }
}
function PBp(fileContents: string, oldString: string, replaceAll: any): any {
  return OYa(Ofo(fileContents, oldString, replaceAll));
}
var P_e: any,
  DYa = 1073741824,
  IE: any;
var MIe = b(() => {
  Ct();
  xtt();
  zn();
  r9e();
  yot();
  Kae();
  Q2e();
  fYr();
  x6();
  Ri();
  U$t();
  Ql();
  Go();
  qe();
  vce();
  Lr();
  sn();
  bt();
  mc();
  _6();
  e$n();
  bB();
  xk();
  ps();
  ws();
  $$t();
  NH();
  Mo();
  Iu();
  nA();
  CYa();
  ef();
  ty();
  RYa();
  q$t();
  Pfo();
  wIe();
  P_e = require("path"), IE = pi({
    name: Ua,
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
      return wYa(model);
    },
    userFacingName: J4n,
    getToolUseSummary: Dfo,
    getActivityDescription(e: any) {
      let summary: any = Dfo(e);
      return summary ? `Editing ${summary}` : "Editing file";
    },
    get inputSchema() {
      return o$n();
    },
    get outputSchema() {
      return Ulo();
    },
    coerceInput: vYa,
    stripForStorage(e: any) {
      if (typeof e !== "object" || e === null) return e;
      if ((e.originalFile ?? "") === "") return e;
      return {
        ...e,
        originalFile: ""
      };
    },
    toAutoClassifierInput(e: any) {
      return `${e.file_path}: ${e.new_string}`;
    },
    getPath(e: any) {
      return e.file_path;
    },
    backfillObservableInput(e: any) {
      if (typeof e.file_path === "string") e.file_path = Ds(e.file_path);
    },
    async preparePermissionMatcher({
      file_path: file_path
    }: any) {
      return (rule: any) => matchesPathRule(rule, file_path);
    },
    async checkPermissions(e: any, t: any) {
      return checkWritePermissionForTool(IE, e, Fr(t));
    },
    renderToolUseMessage: xYa,
    renderToolResultMessage: kYa,
    renderToolUseRejectedMessage: HYa,
    renderToolUseErrorMessage: IYa,
    async validateInput(e: any, t: any) {
      let {
          file_path: file_path,
          old_string: old_string,
          new_string: new_string,
          replace_all = !1
        } = e,
        absPath: any = Ds(file_path),
        agentCheck: any = Yct(absPath, t);
      if (agentCheck) return {
        result: !1,
        message: agentCheck,
        errorCode: 12
      };
      let lineEndingCheck: any = LIn(absPath, new_string);
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
      if (matchingRuleForInput(absPath, Fr(t), "edit", "deny") !== null) return {
        result: !1,
        behavior: "ask",
        message: "File is in a directory that is denied by your permission settings.",
        errorCode: 2
      };
      if (absPath.startsWith("\\\\") || absPath.startsWith("//")) return {
        result: !0
      };
      let fs: any = jt();
      try {
        let {
          size: fileSize,
          mode: fileMode
        }: any = await fs.stat(absPath);
        if (fileSize > DYa) return {
          result: !1,
          behavior: "ask",
          message: `File is too large to edit (${formatFileSize(fileSize)}). Maximum editable file size is ${formatFileSize(DYa)}.`,
          errorCode: 10
        };
        if (H7e(fileMode)) return {
          result: !1,
          behavior: "ask",
          message: k7e,
          errorCode: 11
        };
      } catch (statErr: any) {
        if (!Pn(statErr)) throw statErr;
      }
      let fileContent: any;
      try {
        let rawBytes: any = await fs.readFileBytes(absPath),
          detectedEncoding: any = rawBytes.length >= 2 && rawBytes[0] === 255 && rawBytes[1] === 254 ? "utf16le" : "utf8";
        fileContent = rawBytes.toString(detectedEncoding).replaceAll(`\r
`, `
`);
      } catch (readErr: any) {
        if (Pn(readErr)) fileContent = null;else throw readErr;
      }
      if (fileContent === null) {
        if (old_string === "") return {
          result: !0
        };
        let nearMatchDir: any = I7e(absPath),
          nearMatchFile: any = await moe(absPath),
          notExistMsg: any = `File does not exist. ${CB} ${Pt()}.`;
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
        message: `File is a Jupyter Notebook. Use the ${I0} to edit this file.`,
        errorCode: 5
      };
      let readState: any = t.readFileState.get(absPath);
      if (!readState || readState.isPartialView) {
        let canonicalModelName: any = getCanonicalName(DIe(t)),
          modelBucket: any = hkt(canonicalModelName),
          velvetHammerEnabled: any = getFeatureValue_CACHED_MAY_BE_STALE("tengu_velvet_hammer", !1) || getFeatureValue_CACHED_MAY_BE_STALE(lXe("tengu_velvet_hammer", canonicalModelName), !1);
        if (logEvent("tengu_edit_tool_not_read_hypothetical", {
          wouldHaveResult: PBp(fileContent, old_string, replace_all),
          isPartialView: readState?.isPartialView === !0,
          isFilePathAbsolute: P_e.isAbsolute(file_path),
          guardSkipped: velvetHammerEnabled,
          modelBucket: fromEnum(modelBucket)
        }), !velvetHammerEnabled) return {
          result: !1,
          behavior: "ask",
          message: "File has not been read yet. Read it first before writing to it.",
          meta: {
            isFilePathAbsolute: String(P_e.isAbsolute(file_path))
          },
          errorCode: 6
        };
      }
      if (readState) {
        if (tQ(absPath) > readState.timestamp) if ((readState.offset ?? 1) <= 1 && readState.limit === void 0 && yae(readState, fileContent)) ;else {
          let matchResult: any = Ofo(fileContent, old_string, replace_all),
            staleRecovered: any = PYa(matchResult);
          if (logEvent("tengu_edit_tool_stale_read", {
            wouldHaveResult: OYa(matchResult),
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
        matchedOldString: any = vIe(currentContent, old_string);
      if (!matchedOldString) {
        let unicodeNote: any = pUa(old_string) ? `
(note: Edit also tried swapping \\uXXXX escapes and their characters; neither form matched, so the mismatch is likely elsewhere in old_string. Re-read the file and copy the exact surrounding text.)` : "";
        return {
          result: !1,
          behavior: "ask",
          message: `String to replace not found in file.
String: ${old_string}${unicodeNote}`,
          meta: {
            isFilePathAbsolute: String(P_e.isAbsolute(file_path))
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
          isFilePathAbsolute: String(P_e.isAbsolute(file_path)),
          actualOldString: matchedOldString
        },
        errorCode: 9
      };
      let validationErr: any = EYa(absPath, currentContent, () => replace_all ? currentContent.replaceAll(matchedOldString, new_string) : currentContent.replace(matchedOldString, new_string));
      if (validationErr !== null) return validationErr;
      return {
        result: !0,
        meta: {
          actualOldString: matchedOldString
        }
      };
    },
    inputsEquivalent(e: any, t: any) {
      return TUa({
        file_path: e.file_path,
        edits: [{
          old_string: e.old_string,
          new_string: e.new_string,
          replace_all: e.replace_all ?? !1
        }]
      }, {
        file_path: t.file_path,
        edits: [{
          old_string: t.old_string,
          new_string: t.new_string,
          replace_all: t.replace_all ?? !1
        }]
      });
    },
    async call(e: any, {
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
        } = e,
        fs: any = jt(),
        absPath: any = Ds(file_path),
        platformInfo: any = Pt();
      if (!je.CLAUDE_CODE_SIMPLE) {
        let skillDirs: any = await eut([absPath], platformInfo);
        if (skillDirs.length > 0) {
          if (dynamicSkillDirTriggers) {
            for (let skillDir: any of skillDirs) if (!dynamicSkillDirTriggers.includes(skillDir)) dynamicSkillDirTriggers.push(skillDir);
          }
          tut(skillDirs).catch(() => {});
        }
        nut([absPath], platformInfo);
      }
      if (await Uhe.beforeFileEdited(absPath), await fs.mkdir(P_e.dirname(absPath)), vT()) await UHe(getFileHistoryState, applyFileHistoryOp, absPath, c.uuid);
      let {
          originalFileContents: originalFileContents,
          actualOldString: actualOldString,
          updatedFile: updatedFile,
          patch: patch,
          staleRecovered: staleRecovered
        } = await pbe(absPath, async () => {
          let {
              content: content,
              fileExists: fileExists,
              encoding: encoding,
              lineEndings: lineEndings
            } = IBp(absPath),
            isStale: any = fileExists && DBp({
              absoluteFilePath: absPath,
              fileContents: content,
              lastRead: readFileState.get(absPath),
              oldString: old_string,
              replaceAll: replace_all,
              model: getCanonicalName(DIe({
                options: options,
                permissionLayers: permissionLayers
              }))
            }),
            resolvedOldString: any = vIe(content, old_string) || old_string,
            normalizedNewString: any = mUa(old_string, resolvedOldString, Wct(old_string, resolvedOldString, new_string)),
            editResult: any = L$t({
              filePath: absPath,
              fileContents: content,
              oldString: resolvedOldString,
              newString: normalizedNewString,
              replaceAll: replace_all
            }),
            formattedContent: any = Vvn(absPath, editResult.updatedFile),
            finalPatch: any = formattedContent === editResult.updatedFile ? editResult.patch : CIe({
              filePath: absPath,
              oldContent: content,
              newContent: formattedContent,
              convertTabs: !0
            }),
            writeTimestamp: any = await mbe(absPath, formattedContent, encoding, lineEndings);
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
        lspClient: any = mke();
      if (lspClient) mIn(absPath), fIn(absPath), lspClient.changeFile(absPath, updatedFile).catch((lspErr: any) => {
        logForDebugging(`LSP: Failed to notify server of file change for ${absPath}: ${lspErr.message}`, {
          level: "error"
        });
      }), lspClient.saveFile(absPath).catch((lspErr: any) => {
        logForDebugging(`LSP: Failed to notify server of file save for ${absPath}: ${lspErr.message}`, {
          level: "error"
        });
      });
      if (dxe(absPath, originalFileContents, updatedFile), absPath.endsWith(`${P_e.sep}CLAUDE.md`)) logEvent("tengu_write_claudemd", {});
      O$t(patch, c.message.model), Wte({
        operation: "edit",
        tool: "FileEditTool",
        filePath: absPath
      }), logEvent("tengu_edit_string_lengths", {
        oldStringBytes: Buffer.byteLength(old_string, "utf8"),
        newStringBytes: Buffer.byteLength(new_string, "utf8"),
        replaceAll: replace_all
      });
      let gitDiff: any;
      if (st(process.env.CLAUDE_CODE_REMOTE)) {
        let startTime: any = Date.now(),
          diffResult: any = await r$n(absPath);
        if (diffResult) gitDiff = diffResult;
        logEvent("tengu_tool_use_diff_computed", {
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
    mapToolResultToToolResultBlockParam(e: any, t: any) {
      let {
          filePath: filePath,
          userModified: userModified,
          replaceAll: replaceAll,
          staleRecovered: staleRecovered
        } = e,
        userModifiedNote: any = userModified ? ".  The user modified your proposed changes before accepting them. " : "",
        staleNote: any = staleRecovered ? " (note: the file had been modified on disk since you last read it — the edit applied cleanly, but the file contains other changes not in your context. Read it before edits that depend on surrounding content.)" : userModified ? "" : Pyn;
      if (replaceAll) return {
        tool_use_id: t,
        type: "tool_result",
        content: `The file ${filePath} has been updated${userModifiedNote}. All occurrences were successfully replaced.${staleNote}`
      };
      return {
        tool_use_id: t,
        type: "tool_result",
        content: `The file ${filePath} has been updated successfully${userModifiedNote}.${staleNote}`
      };
    }
  });
});
export {IBp,Ofo,PYa,DBp,OYa,PBp,P_e,DYa,IE,MIe};
