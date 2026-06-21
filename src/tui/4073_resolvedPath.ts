// @ts-nocheck
import {IE as wE,MIe as _Ie} from "../tools/4336_content.ts";
import {_b as Ab,wce as mce} from "../tools/4066_file_path.ts";
import {k6 as g6,rut as Ict} from "../tools/4070_notebook_path.ts";
import {T9 as s9,$4e as y4e} from "../tools/3920_pattern.ts";
import {UL as IL,Jge as Pge} from "../tools/3918_items.ts";
import {gh,Rce as fce} from "../tools/4419_tabAwareSeparator.ts";
import {Ds as Rs,Iu as Pu} from "../../vendor/m643.ts";
import {jt,jp as Xp,ws as bs} from "../../vendor/m228.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Rlo as vao,vUa as rFa} from "../../vendor/m4049.ts";
import {yd,YA as JA,ng as Jh} from "../../vendor/m132.ts";
import {ER as bR,bB as mB} from "../../vendor/m634.ts";
import {Pn as Dn,bt as St} from "../../vendor/m195.ts";
import {IUa as cFa,DUa as uFa} from "../../vendor/m4052.ts";
import {FUa as gFa,UUa as _Fa} from "../../vendor/m4055.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {HP as kP,l$n as b2n} from "../tools/4072_theme.ts";
import {y9e as z$e,T9e as Y$e} from "../../vendor/m3307.ts";
import {zUa as wFa,F$t as y$t} from "../../vendor/m4056.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function isFileTool(tool) {
  switch (tool) {
    case wE:
    case Ab:
    case g6:
    case s9:
    case IL:
    case gh:
      return true;
    default:
      return false;
  }
}
function isFileEditTool(tool) {
  switch (tool) {
    case wE:
    case Ab:
    case g6:
      return true;
    default:
      return false;
  }
}
function tryGetToolPath(tool, input) {
  try {
    let candidate = tool;
    if (typeof candidate.getPath !== "function") return null;
    let path = candidate.getPath(input);
    return typeof path === "string" && path !== "" ? path : null;
  } catch {
    return null;
  }
}
function resolveSymlinkTarget(filePath, operationType, isRemoteWorkspace) {
  if (operationType === "read" || isRemoteWorkspace) return null;
  try {
    let canonical = Rs(filePath),
      ctx = jt(),
      {
        resolvedPath: resolvedPath,
        isSymlink: isSymlink
      } = Xp(ctx, canonical);
    return isSymlink ? resolvedPath : null;
  } catch {
    return null;
  }
}
function formatSubtitlePath(filePath, isRemoteWorkspace) {
  return isRemoteWorkspace ? filePath : nodePath.relative(Pt(), filePath);
}
function formatBasename(filePath, isRemoteWorkspace) {
  return isRemoteWorkspace ? nodePath.posix.basename(filePath) : nodePath.basename(filePath);
}
function buildFileToolPermissionContent(tool, rawInput, theme, isRemoteWorkspace, remoteOldContent) {
  if (tool === wE) {
    let input = wE.inputSchema.parse(rawInput);
    return {
      title: "Edit file",
      subtitle: formatSubtitlePath(input.file_path, isRemoteWorkspace),
      question: oU.default.createElement(w, null, "Do you want to make this edit to", " ", oU.default.createElement(w, {
        bold: true
      }, formatBasename(input.file_path, isRemoteWorkspace)), "?"),
      content: oU.default.createElement(vao, {
        file_path: input.file_path,
        edits: [{
          old_string: input.old_string,
          new_string: input.new_string,
          replace_all: input.replace_all || false
        }],
        remoteOldContent: remoteOldContent ?? undefined,
        skipLocalRead: isRemoteWorkspace
      })
    };
  }
  if (tool === Ab) {
    let input = Ab.inputSchema.parse(rawInput),
      oldContent = "",
      fileExists = false,
      title,
      verb;
    if (isRemoteWorkspace) {
      if (typeof remoteOldContent === "string") oldContent = remoteOldContent, fileExists = true, title = "Overwrite file", verb = "overwrite";else if (remoteOldContent === null) title = "Create file", verb = "create";else title = "Write file", verb = "write to";
    } else {
      if (!yd(input.file_path) || JA(input.file_path)) try {
        oldContent = bR(input.file_path), fileExists = true;
      } catch (error) {
        if (!Dn(error)) throw error;
      }
      title = fileExists ? "Overwrite file" : "Create file", verb = fileExists ? "overwrite" : "create";
    }
    return {
      title: title,
      subtitle: formatSubtitlePath(input.file_path, isRemoteWorkspace),
      question: oU.default.createElement(w, null, "Do you want to ", verb, " ", oU.default.createElement(w, {
        bold: true
      }, formatBasename(input.file_path, isRemoteWorkspace)), "?"),
      content: oU.default.createElement(cFa, {
        file_path: input.file_path,
        content: input.content,
        fileExists: fileExists,
        oldContent: oldContent
      })
    };
  }
  if (tool === g6) {
    let input = g6.inputSchema.parse(rawInput),
      verbPhrase = input.edit_mode === "insert" ? "insert this cell into" : input.edit_mode === "delete" ? "delete this cell from" : "make this edit to";
    return {
      title: "Edit notebook",
      subtitle: undefined,
      question: oU.default.createElement(w, null, "Do you want to ", verbPhrase, " ", oU.default.createElement(w, {
        bold: true
      }, formatBasename(input.notebook_path, isRemoteWorkspace)), "?"),
      content: oU.default.createElement(gFa, {
        notebook_path: input.notebook_path,
        cell_id: input.cell_id,
        new_source: input.new_source,
        cell_type: input.cell_type,
        edit_mode: input.edit_mode,
        verbose: true,
        width: 120,
        remoteOldContent: remoteOldContent ?? undefined,
        skipLocalRead: isRemoteWorkspace
      })
    };
  }
  let title = `${tool.isReadOnly(rawInput) ? "Read" : "Edit"} file`,
    userFacingName = tool.userFacingName(rawInput),
    renderedMessage = tool.renderToolUseMessage(rawInput, {
      theme: theme,
      verbose: true
    });
  return {
    title: title,
    subtitle: undefined,
    question: "Do you want to proceed?",
    content: oU.default.createElement(B, {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1
    }, oU.default.createElement(w, null, userFacingName, "(", renderedMessage, ")"))
  };
}
function buildFilePermissionDescriptor(request) {
  let base = kP(request),
    tool = request.tool;
  if (!isFileTool(tool)) throw Error(`buildFilePermissionDescriptor called with non-file tool: ${request.tool.name}`);
  let isRemoteWorkspace = request.remoteWorkspace === true,
    operationType = tool.isReadOnly(request.input) ? "read" : "write",
    {
      title: title,
      subtitle: subtitle,
      question: question,
      content: content
    } = buildFileToolPermissionContent(tool, request.input, request.theme, isRemoteWorkspace, request.remoteOldContent),
    symlinkTarget = resolveSymlinkTarget(request.filePath, operationType, isRemoteWorkspace);
  return {
    ...base,
    title: title,
    subtitle: subtitle,
    question: question,
    content: content,
    filePath: request.filePath,
    operationType: operationType,
    symlinkTarget: symlinkTarget
  };
}
function buildCompletionMetadata(tool, input, languageSource) {
  if (tool === wE) return {
    completion_type: "str_replace_single",
    language_name: z$e(languageSource)
  };
  if (tool === Ab) return {
    completion_type: "write_file_single",
    language_name: z$e(languageSource)
  };
  if (tool === g6) return {
    completion_type: "tool_use_single",
    language_name: input.cell_type === "markdown" ? "markdown" : "python"
  };
  return {
    completion_type: "tool_use_single",
    language_name: z$e(languageSource)
  };
}
function buildSedEditDescriptor(request) {
  let base = kP(request),
    rawFilePath = request.sedInfo.filePath,
    canonicalPath = Rs(rawFilePath),
    isNonPreviewable = (yd(rawFilePath) || yd(canonicalPath)) && !(JA(rawFilePath) || JA(canonicalPath)),
    oldContent = "",
    fileExists = false;
  if (!isNonPreviewable) try {
    oldContent = bR(canonicalPath), fileExists = true;
  } catch (error) {
    if (!Dn(error)) throw error;
  }
  let newContent = wFa(oldContent, request.sedInfo),
    edits = isNonPreviewable || oldContent === newContent ? [] : [{
      old_string: oldContent,
      new_string: newContent,
      replace_all: false
    }],
    statusMessage = isNonPreviewable ? `Network path \u2014 diff not previewed. The sed command will run against ${canonicalPath} on approval.` : fileExists ? "Pattern did not match any content" : "File does not exist",
    symlinkTarget = resolveSymlinkTarget(canonicalPath, "write", false),
    input = isNonPreviewable ? {
      ...request.input
    } : {
      ...request.input,
      _simulatedSedEdit: {
        filePath: canonicalPath,
        newContent: newContent
      }
    };
  return {
    ...base,
    input: input,
    title: "Edit file",
    subtitle: nodePath.relative(Pt(), canonicalPath),
    question: oU.default.createElement(w, null, "Do you want to make this edit to ", oU.default.createElement(w, {
      bold: true
    }, nodePath.basename(canonicalPath)), "?"),
    content: edits.length > 0 ? oU.default.createElement(vao, {
      file_path: canonicalPath,
      edits: edits
    }) : oU.default.createElement(w, {
      dimColor: true
    }, statusMessage),
    filePath: canonicalPath,
    operationType: "write",
    symlinkTarget: symlinkTarget
  };
}
function buildSedCompletionMetadata(languageSource) {
  return {
    completion_type: "str_replace_single",
    language_name: z$e(languageSource)
  };
}
var nodePath, oU;
var Gao = b(() => {
  rFa();
  uFa();
  _Fa();
  Je();
  y$t();
  _Ie();
  fce();
  mce();
  y4e();
  Pge();
  Ict();
  Jh();
  Y$e();
  Ko();
  St();
  mB();
  bs();
  Pu();
  b2n();
  nodePath = require("path"), oU = L(Te(), 1);
});

export {isFileTool as G$t,isFileEditTool as W2a,tryGetToolPath as V$t,resolveSymlinkTarget as G2a,formatSubtitlePath as j2a,formatBasename as Klo,buildFileToolPermissionContent as Zwp,buildFilePermissionDescriptor as c$n,buildCompletionMetadata as V2a,buildSedEditDescriptor as K2a,buildSedCompletionMetadata as z2a,nodePath as LIe,oU as fU,Gao as zlo};
