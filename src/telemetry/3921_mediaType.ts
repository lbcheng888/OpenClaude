// @ts-nocheck
import {vz as DZ} from "../../vendor/m2520.ts";
import {vhe as zfe,f4 as P4} from "./2522_error_name.ts";
import {Nit as _ot,aBt as c1t} from "../../vendor/m3274.ts";
import {nu as Wu,lr as fr} from "../../vendor/m233.ts";
import {isTmuxControlMode as Pt,Po as Ko} from "../../vendor/m638.ts";
import {getOriginalCwd as gr,lt as ct} from "../session/0132_sent.ts";
import {O6o as LUo,dn as an} from "../config/0137_namespace.ts";
import {pathInAllowedWorkingPath as bF,Xm as aA} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {markTelemetryString as R_,KO as yL} from "../agent/3295_code.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function trimEmptyLines(text) {
  let lines = text.split(`
`),
    startIdx = 0;
  while (startIdx < lines.length && lines[startIdx]?.trim() === "") startIdx++;
  let endIdx = lines.length - 1;
  while (endIdx >= 0 && lines[endIdx]?.trim() === "") endIdx--;
  if (startIdx > endIdx) return "";
  return lines.slice(startIdx, endIdx + 1).join(`
`);
}
function isBase64ImageDataUrl(value) {
  return /^data:image\/[a-z0-9.+_-]+;base64,/i.test(value);
}
function parseDataUrl(dataUrl) {
  let match = dataUrl.trim().match(BASE64_DATA_URL_RE);
  if (!match || !match[1] || !match[2]) return null;
  return {
    mediaType: match[1],
    data: match[2]
  };
}
function buildToolResultImageBlock(dataUrl, toolUseId) {
  let parsed = parseDataUrl(dataUrl);
  if (!parsed) return null;
  let detectedMediaType = DZ(Buffer.from(parsed.data, "base64"));
  if (detectedMediaType === null) return null;
  return {
    tool_use_id: toolUseId,
    type: "tool_result",
    content: [{
      type: "image",
      source: {
        type: "base64",
        media_type: detectedMediaType,
        data: parsed.data
      }
    }]
  };
}
async function processBase64ImageDataUrl(dataUrlOrContent, filePath, fileSizeHint, resizeOptions) {
  let content = dataUrlOrContent;
  if (filePath) {
    if ((fileSizeHint ?? (await fsPromises.stat(filePath)).size) > MAX_IMAGE_FILE_BYTES) return null;
    content = await fsPromises.readFile(filePath, "utf8");
  }
  let parsed = parseDataUrl(content);
  if (!parsed) return null;
  let rawBuffer = Buffer.from(parsed.data, "base64"),
    subtype = parsed.mediaType.split("/")[1] || "png",
    result = await zfe(rawBuffer, rawBuffer.length, subtype, resizeOptions);
  return `data:image/${result.mediaType};base64,${result.buffer.toString("base64")}`;
}
function truncateContent(content) {
  let isImg = isBase64ImageDataUrl(content);
  if (isImg) return {
    totalLines: 1,
    truncatedContent: content,
    isImage: isImg
  };
  let maxLen = _ot();
  if (content.length <= maxLen) return {
    totalLines: Wu(content, `
`) + 1,
    truncatedContent: content,
    isImage: isImg
  };
  let truncated = content.slice(0, maxLen),
    truncatedLineCount = Wu(content, `
`, maxLen) + 1,
    truncatedText = `${truncated}

... [${truncatedLineCount} lines truncated] ...`;
  return {
    totalLines: Wu(content, `
`) + 1,
    truncatedContent: truncatedText,
    isImage: isImg
  };
}
function shouldResetCwdBeforeBashTool(toolPermissionContext) {
  let currentCwd = Pt(),
    projectRoot = gr(),
    maintainProjectDir = LUo();
  if (maintainProjectDir || currentCwd !== projectRoot && !bF(currentCwd, toolPermissionContext)) {
    try {
      R_(projectRoot);
    } catch {
      return true;
    }
    if (!maintainProjectDir) return j("tengu_bash_tool_reset_to_original_dir", {}), true;
  }
  return false;
}
var fsPromises,
  MAX_CONTENT_DISPLAY_LINES = 25,
  BASE64_DATA_URL_RE,
  MAX_IMAGE_FILE_BYTES = 20971520,
  formatCwdResetMessage = H => `${H.trim()}
Shell cwd was reset to ${Pt()}`;
var Mv6 = b(() => {
  ct();
  Ct();
  Ko();
  aA();
  yL();
  an();
  P4();
  c1t();
  fr();
  fsPromises = require("fs/promises");
  BASE64_DATA_URL_RE = /^data:([^;]+);base64,(.+)$/;
});
export {trimEmptyLines as N$n,isBase64ImageDataUrl as X9t,parseDataUrl as WBa,buildToolResultImageBlock as F$n,processBase64ImageDataUrl as B$n,truncateContent as GBa,shouldResetCwdBeforeBashTool as $$n,fsPromises as L$n,MAX_CONTENT_DISPLAY_LINES as M$n,BASE64_DATA_URL_RE as mkp,MAX_IMAGE_FILE_BYTES as fkp,formatCwdResetMessage as U$n,Mv6 as q$n};
