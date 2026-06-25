// @ts-nocheck
import {ME,nxe} from "./4356_content.ts";
import {fb,sce} from "./3934_file_path.ts";
import {qq,edt} from "./3945_notebook_path.ts";
import {getActiveWorktree as z$,r6e} from "./3940_pattern.ts";
import {iL,dye} from "./3938_items.ts";
import {hh,ace} from "./4441_tabAwareSeparator.ts";
import {hs,Tu} from "../../vendor/m649.ts";
import {Wt,Nd,ps} from "../../vendor/m230.ts";
import {isTmuxControlMode as Lt,Po} from "../../vendor/m638.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Luo,LBa} from "../../vendor/m3916.ts";
import {lu,Cf,zf} from "../../vendor/m133.ts";
import {Ov,GN} from "../../vendor/m640.ts";
import {In,Ct} from "../../vendor/m197.ts";
import {$Ba,qBa} from "../../vendor/m3919.ts";
import {YBa,JBa} from "../../vendor/m3922.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {WD,e9n} from "./3947_theme.ts";
import {I3e,x3e} from "../../vendor/m3323.ts";
import {oUa,Z9t} from "../../vendor/m3923.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * File-permission descriptor builders for file-editing tools.
 *
 * This module turns a pending tool call (Edit / Write / NotebookEdit, or any
 * file tool) into the permission-prompt descriptor shown to the user:
 * title, subtitle, the yes/no question, and the rendered diff/content preview.
 * It also resolves symlink targets and produces telemetry shape descriptors.
 *
 * `ME` = Edit tool, `fb` = Write tool, `qq` = NotebookEdit tool.
 */

/** True if the given tool is one of the recognized file tools. */
function i3t(tool: any): boolean {
  switch (tool) {
    case ME:
    case fb:
    case qq:
    case z$:
    case iL:
    case hh:
      return !0;
    default:
      return !1;
  }
}

/** True if the tool is one of the three file-mutating tools (Edit/Write/NotebookEdit). */
function T2a(tool: any): boolean {
  switch (tool) {
    case ME:
    case fb:
    case qq:
      return !0;
    default:
      return !1;
  }
}

/**
 * Safely call `tool.getPath(input)` and return the path string, or null if the
 * method is missing, throws, or yields a non-string / empty result.
 */
function a3t(tool: any, input: any): string | null {
  try {
    let candidateTool = tool;
    if (typeof candidateTool.getPath !== "function") return null;
    let path = candidateTool.getPath(input);
    return typeof path === "string" && path !== "" ? path : null;
  } catch {
    return null;
  }
}

/**
 * Resolve a symlink target for a write/create operation. Returns the resolved
 * path only when the file is a symlink; null for read ops, remote workspaces,
 * non-symlinks, or on error.
 */
function S2a(filePath: string, operationType: string, isRemote: boolean): string | null {
  if (operationType === "read" || isRemote) return null;
  try {
    let absolutePath = hs(filePath),
      cwd = Wt(),
      {
        resolvedPath: resolved,
        isSymlink
      } = Nd(cwd, absolutePath);
    return isSymlink ? resolved : null;
  } catch {
    return null;
  }
}

/** Subtitle path: absolute when remote, otherwise relative to cwd. */
function y2a(filePath: string, isRemote: boolean): string {
  return isRemote ? filePath : txe.relative(Lt(), filePath);
}

/** Display name: posix basename for remote paths, platform basename otherwise. */
function ido(filePath: string, isRemote: boolean): string {
  return isRemote ? txe.posix.basename(filePath) : txe.basename(filePath);
}

/**
 * Build the title/subtitle/question/content of the permission prompt for a
 * file tool, branching on which tool is being invoked.
 *
 * @param tool the tool object (Edit/Write/NotebookEdit, or a generic file tool)
 * @param input the parsed tool input
 * @param theme the active UI theme
 * @param isRemote whether this is a remote workspace operation
 * @param remoteOldContent prior remote content for diffing, if available
 */
function AHp(tool: any, input: any, theme: any, isRemote: boolean, remoteOldContent: any) {
  if (tool === ME) {
    let editInput = ME.inputSchema.parse(input);
    return {
      title: "Edit file",
      subtitle: y2a(editInput.file_path, isRemote),
      question: W1.jsxs(v, {
        children: ["Do you want to make this edit to", " ", W1.jsx(v, {
          bold: !0,
          children: ido(editInput.file_path, isRemote)
        }), "?"]
      }),
      content: W1.jsx(Luo, {
        file_path: editInput.file_path,
        edits: [{
          old_string: editInput.old_string,
          new_string: editInput.new_string,
          replace_all: editInput.replace_all || !1
        }],
        remoteOldContent: remoteOldContent ?? void 0,
        skipLocalRead: isRemote
      })
    };
  }
  if (tool === fb) {
    let writeInput = fb.inputSchema.parse(input),
      oldContent = "",
      fileExists = !1,
      titleText,
      verbText;
    if (isRemote) {
      if (typeof remoteOldContent === "string") oldContent = remoteOldContent, fileExists = !0, titleText = "Overwrite file", verbText = "overwrite";else if (remoteOldContent === null) titleText = "Create file", verbText = "create";else titleText = "Write file", verbText = "write to";
    } else {
      if (!lu(writeInput.file_path) || Cf(writeInput.file_path)) try {
        oldContent = Ov(writeInput.file_path), fileExists = !0;
      } catch (readError) {
        if (!In(readError)) throw readError;
      }
      titleText = fileExists ? "Overwrite file" : "Create file", verbText = fileExists ? "overwrite" : "create";
    }
    return {
      title: titleText,
      subtitle: y2a(writeInput.file_path, isRemote),
      question: W1.jsxs(v, {
        children: ["Do you want to ", verbText, " ", W1.jsx(v, {
          bold: !0,
          children: ido(writeInput.file_path, isRemote)
        }), "?"]
      }),
      content: W1.jsx($Ba, {
        file_path: writeInput.file_path,
        content: writeInput.content,
        fileExists: fileExists,
        oldContent: oldContent
      })
    };
  }
  if (tool === qq) {
    let notebookInput = qq.inputSchema.parse(input),
      verbText = notebookInput.edit_mode === "insert" ? "insert this cell into" : notebookInput.edit_mode === "delete" ? "delete this cell from" : "make this edit to";
    return {
      title: "Edit notebook",
      subtitle: void 0,
      question: W1.jsxs(v, {
        children: ["Do you want to ", verbText, " ", W1.jsx(v, {
          bold: !0,
          children: ido(notebookInput.notebook_path, isRemote)
        }), "?"]
      }),
      content: W1.jsx(YBa, {
        notebook_path: notebookInput.notebook_path,
        cell_id: notebookInput.cell_id,
        new_source: notebookInput.new_source,
        cell_type: notebookInput.cell_type,
        edit_mode: notebookInput.edit_mode,
        verbose: !0,
        width: 120,
        remoteOldContent: remoteOldContent ?? void 0,
        skipLocalRead: isRemote
      })
    };
  }
  let titleText = `${tool.isReadOnly(input) ? "Read" : "Edit"} file`,
    facingName = tool.userFacingName(input),
    useMessage = tool.renderToolUseMessage(input, {
      theme: theme,
      verbose: !0
    });
  return {
    title: titleText,
    subtitle: void 0,
    question: "Do you want to proceed?",
    content: W1.jsx($, {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1,
      children: W1.jsxs(v, {
        children: [facingName, "(", useMessage, ")"]
      })
    })
  };
}

/**
 * Assemble the full permission descriptor for a file tool request, including
 * base fields, the rendered prompt, operation type, and any symlink target.
 */
function t9n(request: any) {
  let baseDescriptor = WD(request),
    tool = request.tool;
  if (!i3t(tool)) throw Error(`buildFilePermissionDescriptor called with non-file tool: ${request.tool.name}`);
  let isRemote = request.remoteWorkspace === !0,
    operationType = tool.isReadOnly(request.input) ? "read" : "write",
    {
      title: title,
      subtitle: subtitle,
      question: question,
      content: content
    } = AHp(tool, request.input, request.theme, isRemote, request.remoteOldContent),
    symlinkTarget = S2a(request.filePath, operationType, isRemote);
  return {
    ...baseDescriptor,
    title: title,
    subtitle: subtitle,
    question: question,
    content: content,
    filePath: request.filePath,
    operationType: operationType,
    symlinkTarget: symlinkTarget
  };
}

/**
 * Build the completion-telemetry shape (completion_type + language) for a file
 * tool, used to classify the kind of edit/write for metrics.
 */
function b2a(tool: any, input: any, filePath: string) {
  if (tool === ME) return {
    completion_type: "str_replace_single",
    language_name: I3e(filePath)
  };
  if (tool === fb) return {
    completion_type: "write_file_single",
    language_name: I3e(filePath)
  };
  if (tool === qq) return {
    completion_type: "tool_use_single",
    language_name: input.cell_type === "markdown" ? "markdown" : "python"
  };
  return {
    completion_type: "tool_use_single",
    language_name: I3e(filePath)
  };
}

/**
 * Build the permission descriptor for a simulated `sed`-style edit: reads the
 * current file, applies the sed transform, and renders the resulting diff
 * (or a "no match"/"missing file"/"network path" notice).
 */
function E2a(request: any) {
  let baseDescriptor = WD(request),
    inputFilePath = request.sedInfo.filePath,
    absolutePath = hs(inputFilePath),
    isNetworkPath = (lu(inputFilePath) || lu(absolutePath)) && !(Cf(inputFilePath) || Cf(absolutePath)),
    originalContent = "",
    fileRead = !1;
  if (!isNetworkPath) try {
    originalContent = Ov(absolutePath), fileRead = !0;
  } catch (readError) {
    if (!In(readError)) throw readError;
  }
  let newContent = oUa(originalContent, request.sedInfo),
    edits = isNetworkPath || originalContent === newContent ? [] : [{
      old_string: originalContent,
      new_string: newContent,
      replace_all: !1
    }],
    noPreviewMessage = isNetworkPath ? `Network path — diff not previewed. The sed command will run against ${absolutePath} on approval.` : fileRead ? "Pattern did not match any content" : "File does not exist",
    symlinkTarget = S2a(absolutePath, "write", !1),
    descriptorInput = isNetworkPath ? {
      ...request.input
    } : {
      ...request.input,
      _simulatedSedEdit: {
        filePath: absolutePath,
        newContent: newContent
      }
    };
  return {
    ...baseDescriptor,
    input: descriptorInput,
    title: "Edit file",
    subtitle: txe.relative(Lt(), absolutePath),
    question: W1.jsxs(v, {
      children: ["Do you want to make this edit to ", W1.jsx(v, {
        bold: !0,
        children: txe.basename(absolutePath)
      }), "?"]
    }),
    content: edits.length > 0 ? W1.jsx(Luo, {
      file_path: absolutePath,
      edits: edits
    }) : W1.jsx(v, {
      dimColor: !0,
      children: noPreviewMessage
    }),
    filePath: absolutePath,
    operationType: "write",
    symlinkTarget: symlinkTarget
  };
}

/** Completion-telemetry shape for a sed-style str-replace edit. */
function C2a(filePath: string) {
  return {
    completion_type: "str_replace_single",
    language_name: I3e(filePath)
  };
}
var txe: any, W1: any;
var ado = b(() => {
  LBa();
  qBa();
  JBa();
  je();
  Z9t();
  nxe();
  ace();
  sce();
  r6e();
  dye();
  edt();
  zf();
  x3e();
  Po();
  Ct();
  GN();
  ps();
  Tu();
  e9n();
  txe = require("path"), W1 = x(oe(), 1);
});

export {i3t,T2a,a3t,S2a,y2a,ido,AHp,t9n,b2a,E2a,C2a,txe,W1,ado};
