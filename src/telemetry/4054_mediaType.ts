// @ts-nocheck
import {qZ as DZ} from "../../vendor/m2510.ts";
import {mAe as zfe,V4 as P4} from "./2512_error_name.ts";
import {Not as _ot,H1t as c1t} from "../../vendor/m3258.ts";
import {Uu as Wu,dr as fr} from "../../vendor/m231.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {getOriginalCwd as gr,lt as ct} from "../session/0131_sent.ts";
import {TFo as LUo,sn as an} from "../config/0047_namespace.ts";
import {pathInAllowedWorkingPath as bF,nA as aA} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {x_ as R_,initXL as yL} from "../agent/3279_code.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
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

export {trimEmptyLines as V2n,isBase64ImageDataUrl as N$t,parseDataUrl as PUa,buildToolResultImageBlock as K2n,processBase64ImageDataUrl as z2n,truncateContent as OUa,shouldResetCwdBeforeBashTool as J2n,fsPromises as W2n,MAX_CONTENT_DISPLAY_LINES as G2n,BASE64_DATA_URL_RE as twp,MAX_IMAGE_FILE_BYTES as nwp,formatCwdResetMessage as Y2n,Mv6 as X2n};
