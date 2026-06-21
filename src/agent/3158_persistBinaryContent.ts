// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {khe as mhe,Kxe as kxe} from "../config/3156_maxSizeBytes.ts";
import {Cs as vs,Ph as rg} from "../../vendor/m2224.ts";
import {Di as ki,dr as fr} from "../../vendor/m231.ts";
import {Hhe as fhe,Uae as xae,eI as M0} from "../telemetry/3157_error.ts";
import {ci as oi,pT as iT} from "../../vendor/m1289.ts";
import {_o,bt as St} from "../../vendor/m195.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {formatFileSize as nl,ps as ds} from "../../vendor/m238.ts";
// @ts-nocheck
var GXi = {};
pt(GXi, {
  persistBinaryContent: () => persistBinaryContent,
  isSubagentTruncationPromptEnabled: () => isSubagentTruncationPromptEnabled,
  isBinaryContentType: () => isBinaryContentType,
  getLargeOutputInstructions: () => getLargeOutputInstructions,
  getFormatDescription: () => getFormatDescription,
  getBinaryBlobSavedMessage: () => getBinaryBlobSavedMessage,
  extensionForMimeType: () => extensionForMimeType
});
function isSubagentTruncationPromptEnabled() {
  let envOverride = process.env.MCP_TRUNCATION_PROMPT_OVERRIDE;
  return envOverride ? envOverride !== "legacy" : ut("tengu_mcp_subagent_prompt", false);
}
function getFormatDescription(contentKind, schema) {
  switch (contentKind) {
    case "toolResult":
      return "Plain text";
    case "structuredContent":
      return schema ? `JSON with schema: ${schema}` : "JSON";
    case "contentArray":
      return schema ? `JSON array with schema: ${schema}` : "JSON array";
  }
}
function getLargeOutputInstructions(filePath, charCount, formatDesc, bashOutputLimit, lineInfo) {
  let header = `Error: result (${lineInfo !== undefined ? `${charCount.toLocaleString()} characters across ${lineInfo.count.toLocaleString()} ${lineInfo.count === 1 ? "line" : "lines"}` : `${charCount.toLocaleString()} characters`}) exceeds maximum allowed tokens. Output has been saved to ${filePath}.
Format: ${formatDesc}
`,
    maxCharsPerChunk = Math.floor(mhe().maxTokens * 4 * 0.8),
    minLinesPerChunk = 8,
    canUseLineChunking = lineInfo !== undefined && lineInfo.count > 1 && lineInfo.maxLen <= maxCharsPerChunk,
    linesPerChunk = canUseLineChunking ? Math.max(1, Math.floor(maxCharsPerChunk / (lineInfo.maxLen + 8))) : undefined;
  if (!isSubagentTruncationPromptEnabled()) {
    let hasLongLines = lineInfo !== undefined && !canUseLineChunking;
    return header + `Use offset and limit parameters to read specific portions of the file, search within it for specific content, and jq to make structured queries.
REQUIREMENTS FOR SUMMARIZATION/ANALYSIS/REVIEW:
` + hUd(filePath, bashOutputLimit, hasLongLines);
  }
  let targetedQueryHint, readStrategyHint, subagentInstruction;
  if (lineInfo === undefined) targetedQueryHint = `- For targeted queries (find a value, filter by field): use jq on the file directly.
`, readStrategyHint = `first probe the structure (e.g., jq 'type, length, keys?' ${filePath}), then extract slices with jq or python \u2014 Read's line-based offset/limit will not chunk this file.`, subagentInstruction = `${filePath} is ${formatDesc}; probe the structure with jq (type/length/keys), then extract and read the content in full with jq or python, then summarize and quote any key findings verbatim.`;else if (!canUseLineChunking) {
    let maxCharsStr = maxCharsPerChunk.toLocaleString();
    targetedQueryHint = `- For targeted searches (find a string): use grep on the file directly.
`, readStrategyHint = `the file's lines are too long for Read's offset/limit. Slice by character range via Bash instead \u2014 e.g. python3 -c "print(open('${filePath}').read()[A:B])" in ~${maxCharsStr}-char spans until you have read 100% of it.`, subagentInstruction = `Slice ${filePath} in ~${maxCharsStr}-char spans via python (read()[A:B]) until you have read all ${charCount.toLocaleString()} characters, then summarize and quote any key findings verbatim.`;
  } else targetedQueryHint = `- For targeted searches (find a line, locate a string): use grep on the file directly.
`, readStrategyHint = `read ${filePath} in chunks of ~${linesPerChunk} lines using offset/limit until you have read 100% of it.`, subagentInstruction = `Read ${filePath} in chunks of ~${linesPerChunk} lines using offset/limit until you have read all ${lineInfo.count.toLocaleString()} lines, then summarize and quote any key findings verbatim.`;
  return header + targetedQueryHint + `- For analysis or summarization that requires reading the full content: ${readStrategyHint}
- If the ${vs} tool is available, do this inside a subagent so the full output stays out of your main context. Give it the instruction above verbatim, and be explicit about what it must return \u2014 e.g. "${subagentInstruction}" A vague "summarize this" may lose detail.
`;
}
function hUd(filePath, bashOutputLimit, hasLongLines) {
  let truncationWarning = bashOutputLimit ? `- If you receive truncation warnings when reading the file ("[N lines truncated]"), reduce the chunk size until you have read 100% of the content without truncation ***DO NOT PROCEED UNTIL YOU HAVE DONE THIS***. Bash output is limited to ${bashOutputLimit.toLocaleString()} chars.
` : `- If you receive truncation warnings when reading the file, reduce the chunk size until you have read 100% of the content without truncation.
`,
    longLineNote = hasLongLines ? `- Note: this file's lines are too long for Read's offset/limit chunking. If a shell tool is available, slice by character range (e.g. python read()[A:B], dd, or cut -c) instead.
` : "";
  return `- You MUST read the content from the file at ${filePath} in sequential chunks until 100% of the content has been read.
` + longLineNote + truncationWarning + `- Before producing ANY summary or analysis, you MUST explicitly describe what portion of the content you have read. ***If you did not read the entire content, you MUST explicitly state this.***
- If after a few attempts you cannot read the file (file not found, lines too long for Read's offset/limit, no shell access), STOP retrying. Summarize what you were able to read, explicitly state which portion you could not read and why, and proceed.
`;
}
function extensionForMimeType(mimeType) {
  if (!mimeType) return "bin";
  switch (ki(mimeType, ";").trim().toLowerCase()) {
    case "application/pdf":
      return "pdf";
    case "application/json":
      return "json";
    case "text/csv":
      return "csv";
    case "text/plain":
      return "txt";
    case "text/html":
      return "html";
    case "text/markdown":
      return "md";
    case "application/zip":
      return "zip";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "docx";
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "xlsx";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "pptx";
    case "application/msword":
      return "doc";
    case "application/vnd.ms-excel":
      return "xls";
    case "audio/mpeg":
      return "mp3";
    case "audio/wav":
      return "wav";
    case "audio/ogg":
      return "ogg";
    case "video/mp4":
      return "mp4";
    case "video/webm":
      return "webm";
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/gif":
      return "gif";
    case "image/webp":
      return "webp";
    case "image/svg+xml":
      return "svg";
    default:
      return "bin";
  }
}
function isBinaryContentType(mimeType) {
  if (!mimeType) return false;
  let baseType = ki(mimeType, ";").trim().toLowerCase();
  if (baseType.startsWith("text/")) return false;
  if (baseType.endsWith("+json") || baseType === "application/json") return false;
  if (baseType.endsWith("+xml") || baseType === "application/xml") return false;
  if (baseType.startsWith("application/javascript")) return false;
  if (baseType === "application/x-www-form-urlencoded") return false;
  return true;
}
async function persistBinaryContent(data, mimeType, baseName) {
  await fhe();
  let ext = extensionForMimeType(mimeType),
    outPath = jXi.join(xae(), `${baseName}.${ext}`);
  try {
    await oi().writeBytes(outPath, data);
  } catch (writeErr) {
    let errInfo = _o(writeErr);
    return v(`Failed to persist binary content to ${outPath}: ${errInfo.message}`, {
      level: "error"
    }), {
      error: errInfo.message
    };
  }
  return j("tengu_binary_content_persisted", {
    mimeType: mimeType ?? "unknown",
    sizeBytes: data.length,
    ext: ext
  }), {
    filepath: outPath,
    size: data.length,
    ext: ext
  };
}
function getBinaryBlobSavedMessage(filePath, mimeType, byteSize, prefix) {
  return `${prefix}Binary content (${mimeType || "unknown type"}, ${nl(byteSize)}) saved to ${filePath}`;
}
var jXi;
var YLt = b(() => {
  Yn();
  Ct();
  iT();
  rg();
  kxe();
  je();
  St();
  ds();
  fr();
  M0();
  jXi = require("path");
});

export {GXi as aZi,isSubagentTruncationPromptEnabled,getFormatDescription,getLargeOutputInstructions,hUd as $$d,extensionForMimeType,isBinaryContentType,persistBinaryContent,getBinaryBlobSavedMessage,jXi as sZi,YLt as TMt};
