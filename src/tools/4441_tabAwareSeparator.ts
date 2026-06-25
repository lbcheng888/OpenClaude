// @ts-nocheck
import {or,dn} from "../config/0137_namespace.ts";
import {V9e,$ge,Fae,MHe} from "../config/3172_maxSizeBytes.ts";
import {zEi,C9r,DDt,vs,dm,KEi,YEi,jEi,JEi,VEi} from "../../vendor/m2256.ts";
import {Jrn,Xl,U1e,kje,doe,KN} from "../config/0651_maxBytes.ts";
import {A9i} from "../../vendor/m2691.ts";
import {I9i,l1} from "../core/2694_l1.ts";
import {Tal,fW} from "../api/4438_type.ts";
import {Ta,Ct,cn,In} from "../../vendor/m197.ts";
import {KBa,W$n,zBa} from "../core/3922_truncatedContent.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Yc,ws,Zm} from "../config/2709_Zm.ts";
import {Mo,Vse,vu} from "../mcp/2200_mcpServerName.ts";
import {formatFileSize as Ra,Xo} from "../../vendor/m240.ts";
import {Wt,ps} from "../../vendor/m230.ts";
import {Ste,V$n} from "../telemetry/3926_operation.ts";
import {gg,t1} from "../telemetry/2542_ignore1mTag.ts";
import {vz,ERn,vie,WOi,BOi,BZ} from "../../vendor/m2520.ts";
import {cnt,gO,vhe,isLocalAgentTask as hO,tLi,f4} from "../telemetry/2522_error_name.ts";
import {Mn,po} from "./5224_userPromptCount.ts";
import {Let,E9r,Oet,hEn} from "../../vendor/m2255.ts";
import {eEo,sGn,bal,tEo} from "../../vendor/m4438.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Zmt,gWn} from "../../vendor/m4399.ts";
import {nu,lr} from "../../vendor/m233.ts";
import {readRoster as Cc,XR} from "../../vendor/m2707.ts";
import {Mkn,xrt} from "../../vendor/m2692.ts";
import {t8e,Mmt} from "../../vendor/m4357.ts";
import {xr} from "../../vendor/m1461.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Rhe,TRn} from "../../vendor/m2519.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {don,pRt} from "../../vendor/m691.ts";
import {jn,getFeatureValue_CACHED_MAY_BE_STALE as it} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {$q,Yut,Jut,Xut} from "./4352_displayName.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {Po,isTmuxControlMode as Lt} from "../../vendor/m638.ts";
import {Ir} from "../../vendor/m584.ts";
import {Tu,hs} from "../../vendor/m649.ts";
import {Xm,matchesPathRule as uye,checkReadPermissionForTool as hY,matchingRuleForInput as fw} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {qit,hB} from "../../vendor/m3296.ts";
import {kal,Eal,wal,rEo,Cal,Aal,Ral,val} from "../core/4440_offset.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Ve} from "../../vendor/m5.ts";
import {Ne} from "../../vendor/m583.ts";
/**
 * FileReadTool — reads text files, images, PDFs and notebooks.
 * Handles token-cap truncation, dedup, device-file guards and screenshot
 * path normalization (AM/PM separator quirk).
 */

/** True when the path is a device/proc file that would block or stream forever. */
function AKp(filePath: string): boolean {
  if (CKp.has(filePath)) return !0;
  if (filePath.startsWith("/proc/") && (filePath.endsWith("/fd/0") || filePath.endsWith("/fd/1") || filePath.endsWith("/fd/2"))) return !0;
  if (/^\/proc\/[^/]+\/(environ|cmdline|auxv|maps|mem|stat)$/.test(filePath)) return !0;
  return !1;
}
/** Swap the AM/PM separator (space <-> narrow no-break space) in screenshot names. */
function vKp(filePath: string): string | undefined {
  let basename = C8e.basename(filePath),
    amPmPattern = /^(.+)([ \u202F])(AM|PM)(\.png)$/,
    matchResult = basename.match(amPmPattern);
  if (!matchResult) return;
  let sepChar = matchResult[2],
    altSep = sepChar === " " ? RKp : " ";
  return filePath.replace(`${sepChar}${matchResult[3]}${matchResult[4]}`, `${altSep}${matchResult[3]}${matchResult[4]}`);
}
/** Classify a path as a session transcript (.jsonl under projects/) or null. */
function wKp(filePath: string): string | null {
  let dataDir = or();
  if (!filePath.startsWith(dataDir)) return null;
  let normalized = filePath.split(cGn.win32.sep).join(cGn.posix.sep);
  if (normalized.includes("/projects/") && normalized.endsWith(".jsonl")) return "session_transcript";
  return null;
}
function IKp() {
  return V9e() ? zEi : C9r;
}
function xKp(options: any) {
  return Jrn({
    ...options,
    tabAwareSeparator: V9e()
  });
}
function PKp(resultObj: any): string {
  let cachedVal = Dal.get(resultObj);
  if (cachedVal === void 0) return "";
  return A9i(cachedVal);
}
/** Throw if the content's token count exceeds the read token cap. */
async function Hal(content: string, ext: string, tokenLimit?: any): Promise<void> {
  let maxTok = tokenLimit ?? $ge().maxTokens,
    tokCount = I9i(content, ext);
  if (!tokCount || tokCount <= maxTok / 4) return;
  let actualTokCount = (await Tal(content)) ?? tokCount;
  if (actualTokCount > maxTok) throw new Fae(actualTokCount, maxTok);
}
/** Build an image tool-result block from raw image bytes. */
function aGn(imgBuf: any, mediaType: string, origSize: number, dims?: any) {
  return {
    type: "image",
    file: {
      base64: imgBuf.toString("base64"),
      type: `image/${mediaType}`,
      originalSize: origSize,
      dimensions: dims
    }
  };
}
/** Map a PDF extraction error to the appropriate Error type. */
function oEo(errObj: any) {
  return errObj.reason === "unknown" ? Error(errObj.message) : new Ta(errObj.message, `PDF extraction failed (${errObj.reason})`);
}
/** Core read dispatcher: handles ipynb, image, PDF and text by extension. */
async function Ial(displayPath: string, cacheKey: string, resolvedPath: string, ext: string, offset: any, limitArg: any, pages: any, maxSizeBytes: any, maxTokens: any, readFileState: any, context: any, msgId: any): Promise<any> {
  if (ext === "ipynb") {
    let notebookContent = await KBa(resolvedPath),
      encodedStr = Pe(notebookContent),
      byteLen = Buffer.byteLength(encodedStr);
    if (byteLen > maxSizeBytes) {
      let platformHint = Yc() ? `Use ${Mo} with jq to read specific portions:
  cat "${displayPath}" | jq '.cells[:20]' # First 20 cells
  cat "${displayPath}" | jq '.cells[100:120]' # Cells 100-120
  cat "${displayPath}" | jq '.cells | length' # Count total cells
  cat "${displayPath}" | jq '.cells[] | select(.cell_type=="code") | .source' # All code sources` : `Use ${ws} to read specific portions:
  Get-Content "${displayPath}" | ConvertFrom-Json | Select-Object -ExpandProperty cells | Select-Object -First 20
  Get-Content "${displayPath}" | ConvertFrom-Json | Select-Object -ExpandProperty cells | Select-Object -Skip 100 -First 20 # Cells 100-120
  (Get-Content "${displayPath}" | ConvertFrom-Json).cells.Count # Count total cells
  Get-Content "${displayPath}" | ConvertFrom-Json | Select-Object -ExpandProperty cells | Where-Object cell_type -eq code | Select-Object -ExpandProperty source`;
      throw Error(`Notebook content (${Ra(byteLen)}) exceeds maximum allowed size (${Ra(maxSizeBytes)}). ${platformHint}`);
    }
    await Hal(encodedStr, ext, maxTokens);
    let fileStat = await Wt().stat(resolvedPath);
    readFileState.set(cacheKey, {
      content: encodedStr,
      timestamp: Math.floor(fileStat.mtimeMs),
      offset: offset,
      limit: limitArg
    });
    let attachTriggers = context.nestedMemoryAttachmentTriggers;
    if (attachTriggers && !attachTriggers.includes(cacheKey)) attachTriggers.push(cacheKey);
    let notebookResult = {
      type: "notebook",
      file: {
        filePath: displayPath,
        cells: notebookContent
      }
    };
    return Ste({
      operation: "read",
      tool: "FileReadTool",
      filePath: cacheKey,
      content: encodedStr
    }), {
      data: notebookResult
    };
  }
  let modelId = gg(context.options.mainLoopModel),
    isBinary = !1;
  if (ext === "") try {
    let fs = Wt();
    if ((await fs.stat(resolvedPath)).isFile()) {
      let headBytes = await fs.readFileBytes(resolvedPath, 16);
      isBinary = vz(headBytes) !== null;
    }
  } catch {}
  if (xal.has(ext) || isBinary) {
    let imgResult = await sEo(resolvedPath, maxTokens, void 0, modelId),
      attachTriggers = context.nestedMemoryAttachmentTriggers;
    if (attachTriggers && !attachTriggers.includes(cacheKey)) attachTriggers.push(cacheKey);
    Ste({
      operation: "read",
      tool: "FileReadTool",
      filePath: cacheKey,
      content: imgResult.file.base64
    });
    let dimInfo = imgResult.file.dimensions ? cnt(imgResult.file.dimensions) : null;
    return {
      data: imgResult,
      ...(dimInfo && {
        newMessages: [Mn({
          content: dimInfo,
          isMeta: !0
        })]
      })
    };
  }
  if (Let(ext)) {
    if (pages) {
      let pageRange = E9r(pages),
        extractResult = await eEo(resolvedPath, pageRange ?? void 0);
      if (!extractResult.success) throw oEo(extractResult.error);
      W("tengu_pdf_page_extraction", {
        success: !0,
        pageCount: extractResult.data.file.count,
        fileSize: extractResult.data.file.originalSize,
        hasPageRange: !0
      }), Ste({
        operation: "read",
        tool: "FileReadTool",
        filePath: cacheKey,
        content: `PDF pages ${pages}`
      });
      let pageFiles = (await lGn.readdir(extractResult.data.file.outputDir)).filter((fileName: any) => fileName.endsWith(".jpg")).sort(),
        pageImages = await Promise.all(pageFiles.map(async (fileName: any) => {
          let fullPath = C8e.join(extractResult.data.file.outputDir, fileName),
            fileData = await lGn.readFile(fullPath),
            {
              block: imgBlock
            } = await gO({
              data: fileData,
              mediaType: "jpeg",
              limits: modelId
            });
          return imgBlock;
        }));
      return {
        data: extractResult.data,
        ...(pageImages.length > 0 && {
          newMessages: [Mn({
            content: pageImages,
            isMeta: !0
          })]
        })
      };
    }
    let pageCount = await sGn(resolvedPath);
    if (pageCount !== null && pageCount > ERn) throw oEo({
      reason: "too_many_pages",
      message: `This PDF has ${pageCount} pages, which is too many to read at once. Use the pages parameter to read specific page ranges (e.g., pages: "1-5"). Maximum ${vie} pages per request.`
    });
    let fileStat = await Wt().stat(resolvedPath);
    if (!Oet() || fileStat.size > WOi) {
      let extractResult = await eEo(resolvedPath);
      if (extractResult.success) W("tengu_pdf_page_extraction", {
        success: !0,
        pageCount: extractResult.data.file.count,
        fileSize: extractResult.data.file.originalSize
      });else W("tengu_pdf_page_extraction", {
        success: !1,
        available: extractResult.error.reason !== "unavailable",
        fileSize: fileStat.size
      });
    }
    if (!Oet()) throw new Ta(`Reading full PDFs is not supported with this model. Use a newer model (Sonnet 3.5 v2 or later), or use the pages parameter to read specific page ranges (e.g., pages: "1-5", maximum ${vie} pages per request). Page extraction requires poppler-utils: install with \`brew install poppler\` on macOS or \`apt-get install poppler-utils\` on Debian/Ubuntu.`, "PDF unsupported on current model");
    let pdfResult = await bal(resolvedPath);
    if (!pdfResult.success) throw oEo(pdfResult.error);
    let pdfData = pdfResult.data;
    return Ste({
      operation: "read",
      tool: "FileReadTool",
      filePath: cacheKey,
      content: pdfData.file.base64
    }), {
      data: pdfData,
      newMessages: [Mn({
        content: [{
          type: "document",
          source: {
            type: "base64",
            media_type: "application/pdf",
            data: pdfData.file.base64
          }
        }],
        isMeta: !0
      })]
    };
  }
  let zeroOffset = offset === 0 ? 0 : offset - 1,
    {
      content: rawContent,
      lineCount: linesRead,
      totalLines: totalLines,
      totalBytes: totalBytes,
      readBytes: readBytes,
      mtimeMs: mtimeMs
    } = await Zmt(resolvedPath, zeroOffset, limitArg, limitArg === void 0 ? maxSizeBytes : void 0, context.abortController.signal),
    outContent = rawContent,
    outLineCount = linesRead,
    outLimit = limitArg,
    truncBanner: any,
    isWholeFile = (offset ?? 1) <= 1 && limitArg === void 0 && pages === void 0;
  try {
    await Hal(rawContent, ext, maxTokens);
  } catch (tokenErr: any) {
    if (tokenErr instanceof Fae && isWholeFile) {
      let lines = rawContent.split(`
`),
        charsPerTok = Math.max(0.5, rawContent.length / Math.max(1, tokenErr.tokenCount)),
        estTokens = (str: any) => str.length / charsPerTok,
        targetLines = Math.max(1, Math.min(lines.length, Math.floor(lines.length * maxTokens / Math.max(1, tokenErr.tokenCount) * 0.85))),
        truncStr = lines.slice(0, targetLines).join(`
`);
      for (let pass = 0; pass < 6; pass++) {
        if (estTokens(truncStr) <= maxTokens || targetLines <= 1) break;
        targetLines = Math.max(1, Math.floor(targetLines * 0.7)), truncStr = lines.slice(0, targetLines).join(`
`);
      }
      let usedCharFallback = !1;
      if (estTokens(truncStr) > maxTokens || truncStr.trim() === "") {
        let charLim = Math.max(1, Math.floor(maxTokens * charsPerTok * 0.85));
        for (let pass = 0; pass < 6; pass++) {
          if (truncStr = rawContent.slice(0, charLim), estTokens(truncStr) <= maxTokens) break;
          charLim = Math.max(1, Math.floor(charLim * 0.7));
        }
        let lastCode = truncStr.charCodeAt(truncStr.length - 1);
        if (lastCode >= 55296 && lastCode <= 56319) truncStr = truncStr.slice(0, -1);
        usedCharFallback = !0;
      }
      outContent = truncStr, outLineCount = usedCharFallback ? nu(truncStr, `
`) + 1 : targetLines, outLimit = outLineCount, truncBanner = !usedCharFallback && outLineCount < totalLines ? DDt + `showing lines 1-${outLineCount} of ${totalLines} total (${tokenErr.tokenCount} tokens, cap ${maxTokens}). Call ${vs} with offset=${outLineCount + 1} limit=${outLineCount} for the next page, or ${Cc} to find a specific section. Do NOT answer from this page alone if the answer may be further in the file.]` : DDt + `showing the first ${truncStr.length} of ${rawContent.length} characters (${tokenErr.tokenCount} tokens, cap ${maxTokens}); this file has very long lines and cannot be paginated by line. Use ${Cc} to find a specific section, or ${vs} with offset/limit to page through it. Do NOT answer from this excerpt alone if the answer may be elsewhere in the file.]`;
    } else throw tokenErr;
  }
  readFileState.set(cacheKey, {
    content: outContent,
    timestamp: Math.floor(mtimeMs),
    offset: offset,
    limit: outLimit,
    ...(truncBanner !== void 0 && {
      isPartialView: !0
    })
  });
  let attachTriggers = context.nestedMemoryAttachmentTriggers;
  if (attachTriggers && !attachTriggers.includes(cacheKey)) attachTriggers.push(cacheKey);
  Mkn(cacheKey);
  let textResult = {
    type: "text",
    file: {
      filePath: displayPath,
      content: outContent,
      numLines: outLineCount,
      startLine: truncBanner !== void 0 ? Math.max(1, offset) : offset,
      totalLines: totalLines,
      ...(truncBanner !== void 0 && {
        truncatedByTokenCap: !0
      })
    }
  };
  if (t8e(cacheKey)) Dal.set(textResult, mtimeMs);
  if (truncBanner !== void 0) Pal.set(textResult, truncBanner);
  Ste({
    operation: "read",
    tool: "FileReadTool",
    filePath: cacheKey,
    content: outContent
  });
  let sessionTranscriptType = wKp(cacheKey),
    fileExtVal = Vse(cacheKey);
  return W("tengu_session_file_read", {
    totalLines: totalLines,
    readLines: outLineCount,
    totalBytes: totalBytes,
    readBytes: truncBanner !== void 0 ? Buffer.byteLength(outContent, "utf8") : readBytes,
    offset: offset,
    ...(limitArg !== void 0 && {
      limit: limitArg
    }),
    ...(fileExtVal !== void 0 && {
      ext: fileExtVal
    }),
    ...(msgId !== void 0 && {
      messageID: xr(msgId)
    }),
    is_session_transcript: sessionTranscriptType === "session_transcript"
  }), {
    data: textResult
  };
}
/** Read an image file, resizing/compressing it to fit under the token cap. */
async function sEo(imgPath: string, tokenLim: any = $ge().maxTokens, pageRangeArg?: any, modelId?: any): Promise<any> {
  let rawBytes = await Wt().readFileBytes(imgPath, pageRangeArg),
    fileSize = rawBytes.length;
  if (fileSize === 0) throw new Ta(`Image file is empty: ${imgPath}`, "Image file is empty");
  let detectedType = vz(rawBytes);
  if (detectedType === null) throw new Ta(`File has an image extension but its content is not a valid PNG/JPEG/GIF/WebP. Detected: ${BOi(rawBytes)}. This usually means a download saved an error/login page instead of the image. Use \`file "${imgPath}"\` to confirm, or read it as text with ${Mo} (e.g. \`head -c 500\`).`, "Image extension but invalid magic bytes");
  let imgFmt = detectedType.split("/")[1] || "png",
    imgBlock: any;
  try {
    let resizeResult = await vhe(rawBytes, fileSize, imgFmt, modelId);
    imgBlock = aGn(resizeResult.buffer, resizeResult.mediaType, fileSize, resizeResult.dimensions);
  } catch (resizeErr: any) {
    if (resizeErr instanceof hO) throw resizeErr;
    Ie(resizeErr), imgBlock = aGn(rawBytes, imgFmt, fileSize);
  }
  if (Math.ceil(imgBlock.file.base64.length * 0.125) > tokenLim) try {
    let compressResult = await tLi(rawBytes, tokenLim, detectedType);
    return {
      type: "image",
      file: {
        base64: compressResult.base64,
        type: compressResult.mediaType,
        originalSize: fileSize
      }
    };
  } catch (compressErr: any) {
    A(`Image compression failed for ${imgPath}: ${compressErr instanceof Error ? compressErr.message : String(compressErr)}`, {
      level: "error"
    });
    try {
      let fallbackBuf = await (await Rhe())(rawBytes).resize(400, 400, {
        fit: "inside",
        withoutEnlargement: !0
      }).jpeg({
        quality: 20
      }).toBuffer();
      return aGn(fallbackBuf, "jpeg", fileSize);
    } catch (fallbackErr: any) {
      return A(`Fallback image compression failed for ${imgPath}: ${fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)}`, {
        level: "error"
      }), aGn(rawBytes, imgFmt, fileSize);
    }
  }
  return imgBlock;
}
var lGn,
  C8e,
  cGn,
  CKp,
  RKp,
  xal,
  kKp,
  HKp,
  hh,
  Dal,
  Pal,
  DKp = 512,
  R5t;
var ace = b(() => {
  Qr();
  BZ();
  don();
  xrt();
  jn();
  kt();
  vu();
  l1();
  fW();
  $q();
  ri();
  xl();
  Po();
  qe();
  Ir();
  dn();
  Ct();
  Xl();
  V$n();
  Xo();
  ps();
  f4();
  vn();
  Mmt();
  po();
  t1();
  W$n();
  Tu();
  tEo();
  hEn();
  Xm();
  gWn();
  qit();
  Zm();
  tn();
  lr();
  XR();
  TRn();
  MHe();
  dm();
  kal();
  lGn = require("fs/promises"), C8e = x(require("path")), cGn = require("path"), CKp = new Set(["/dev/zero", "/dev/random", "/dev/urandom", "/dev/full", "/dev/stdin", "/dev/tty", "/dev/console", "/dev/stdout", "/dev/stderr", "/dev/fd/0", "/dev/fd/1", "/dev/fd/2"]);
  RKp = String.fromCharCode(8239);
  xal = new Set(["png", "jpg", "jpeg", "gif", "webp"]);
  kKp = ve(() => C.strictObject({
    file_path: C.string().describe("The absolute path to the file to read"),
    offset: hB(C.number().int().nonnegative().optional()).describe("The line number to start reading from. Only provide if the file is too large to read at once"),
    limit: hB(C.number().int().positive().optional()).describe("The number of lines to read. Only provide if the file is too large to read at once."),
    pages: C.string().optional().describe(`Page range for PDF files (e.g., "1-5", "3", "10-20"). Only applicable to PDF files. Maximum ${vie} pages per request.`)
  })), HKp = ve(() => {
    let imageMimeEnum = C.enum(["image/jpeg", "image/png", "image/gif", "image/webp"]);
    return C.discriminatedUnion("type", [C.object({
      type: C.literal("text"),
      file: C.object({
        filePath: C.string().describe("The path to the file that was read"),
        content: C.string().describe("The content of the file"),
        numLines: C.number().describe("Number of lines in the returned content"),
        startLine: C.number().describe("The starting line number"),
        totalLines: C.number().describe("Total number of lines in the file"),
        truncatedByTokenCap: C.boolean().optional().describe("True when a whole-file read was auto-paginated because it exceeded the token cap (the content is a partial first page). A programmatic signal for internal consumers; survives output reconstruction (unlike the render-time banner).")
      })
    }), C.object({
      type: C.literal("image"),
      file: C.object({
        base64: C.string().describe("Base64-encoded image data"),
        type: imageMimeEnum.describe("The MIME type of the image"),
        originalSize: C.number().describe("Original file size in bytes"),
        dimensions: C.object({
          originalWidth: C.number().optional().describe("Original image width in pixels"),
          originalHeight: C.number().optional().describe("Original image height in pixels"),
          displayWidth: C.number().optional().describe("Displayed image width in pixels (after resizing)"),
          displayHeight: C.number().optional().describe("Displayed image height in pixels (after resizing)")
        }).optional().describe("Image dimension info for coordinate mapping")
      })
    }), C.object({
      type: C.literal("notebook"),
      file: C.object({
        filePath: C.string().describe("The path to the notebook file"),
        cells: C.array(C.any()).describe("Array of notebook cells")
      })
    }), C.object({
      type: C.literal("pdf"),
      file: C.object({
        filePath: C.string().describe("The path to the PDF file"),
        base64: C.string().describe("Base64-encoded PDF data"),
        originalSize: C.number().describe("Original file size in bytes")
      })
    }), C.object({
      type: C.literal("parts"),
      file: C.object({
        filePath: C.string().describe("The path to the PDF file"),
        originalSize: C.number().describe("Original file size in bytes"),
        count: C.number().describe("Number of pages extracted"),
        outputDir: C.string().describe("Directory containing extracted page images")
      })
    }), C.object({
      type: C.literal("file_unchanged"),
      file: C.object({
        filePath: C.string().describe("The path to the file")
      })
    })]);
  }), hh = Ks({
    name: vs,
    ruleContentField: "file_path",
    searchHint: "read files, images, PDFs, notebooks",
    maxResultSizeChars: 1 / 0,
    strict: !0,
    async description() {
      return KEi;
    },
    async prompt({
      model: model
    }) {
      let limits = $ge(),
        sizeNote = limits.includeMaxSizeInPrompt ? `. Files larger than ${Ra(limits.maxSizeBytes)} will return an error; use offset and limit for larger files` : "",
        rangeNudge = limits.targetedRangeNudge ? YEi : jEi;
      return JEi(model, IKp(), sizeNote, rangeNudge);
    },
    get inputSchema() {
      return kKp();
    },
    coerceInput: Eal,
    get outputSchema() {
      return HKp();
    },
    userFacingName: wal,
    getToolUseSummary: rEo,
    getActivityDescription(toolInput) {
      let summary = rEo(toolInput);
      return summary ? `Reading ${summary}` : "Reading file";
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(toolInput) {
      return toolInput.file_path;
    },
    isSearchOrReadCommand() {
      return {
        isSearch: !1,
        isRead: !0
      };
    },
    getPath({
      file_path: filePath
    }) {
      return filePath || Lt();
    },
    backfillObservableInput(toolInput) {
      if (typeof toolInput.file_path === "string") toolInput.file_path = hs(toolInput.file_path);
    },
    async preparePermissionMatcher({
      file_path: filePath
    }) {
      return (rule: any) => uye(rule, filePath);
    },
    async checkPermissions(toolInput, context) {
      return hY(hh, toolInput, Mr(context));
    },
    renderToolUseMessage: Cal,
    renderToolUseTag: Aal,
    renderToolResultMessage: Ral,
    extractSearchText() {
      return "";
    },
    stripForStorage(result) {
      if (typeof result !== "object" || result === null) return result;
      switch (result.type) {
        case "text":
          if (result.file.content === "") return result;
          return {
            ...result,
            file: {
              ...result.file,
              content: ""
            }
          };
        case "image":
          if (result.file.base64 === "") return result;
          return {
            ...result,
            file: {
              ...result.file,
              base64: ""
            }
          };
        case "pdf":
          if (result.file.base64 === "") return result;
          return {
            ...result,
            file: {
              ...result.file,
              base64: ""
            }
          };
        case "notebook":
          {
            let {
              cells: cells
            } = result.file;
            if (cells.length === 0 || cells[0] == null) return result;
            return {
              ...result,
              file: {
                ...result.file,
                cells: Array(cells.length)
              }
            };
          }
        default:
          return result;
      }
    },
    renderToolUseErrorMessage: val,
    async validateInput({
      file_path: filePath,
      pages: pages
    }, context) {
      if (pages !== void 0) {
        let pageRange = E9r(pages);
        if (!pageRange) return {
          result: !1,
          message: `Invalid pages parameter: "${pages}". Use formats like "1-5", "3", or "10-20". Pages are 1-indexed.`,
          errorCode: 7
        };
        if ((pageRange.lastPage === 1 / 0 ? vie + 1 : pageRange.lastPage - pageRange.firstPage + 1) > vie) return {
          result: !1,
          message: `Page range "${pages}" exceeds maximum of ${vie} pages per request. Please use a smaller range.`,
          errorCode: 8
        };
      }
      let resolvedPath = hs(filePath);
      if (fw(resolvedPath, Mr(context), "read", "deny") !== null) return {
        result: !1,
        message: "File is in a directory that is denied by your permission settings.",
        errorCode: 1
      };
      if (resolvedPath.startsWith("\\\\") || resolvedPath.startsWith("//")) return {
        result: !0
      };
      let ext = C8e.extname(resolvedPath).toLowerCase();
      if (pRt(resolvedPath) && !Let(ext) && !xal.has(ext.slice(1))) return {
        result: !1,
        message: `This tool cannot read binary files. The file appears to be a binary ${ext} file. Please use appropriate tools for binary file analysis.`,
        errorCode: 4
      };
      if (AKp(resolvedPath)) return {
        result: !1,
        message: `Cannot read '${filePath}': this device file would block or produce infinite output.`,
        errorCode: 9
      };
      return {
        result: !0
      };
    },
    async call({
      file_path: filePath,
      offset: offset = 1,
      limit: limitArg = void 0,
      pages: pages
    }, context, _unused, callMeta) {
      let {
          readFileState: readFileState,
          fileReadingLimits: fileReadingLimits
        } = context,
        limits = $ge(),
        maxSizeBytes = fileReadingLimits?.maxSizeBytes ?? limits.maxSizeBytes,
        maxTokens = fileReadingLimits?.maxTokens ?? limits.maxTokens;
      if (fileReadingLimits !== void 0) W("tengu_file_read_limits_override", {
        hasMaxTokens: fileReadingLimits.maxTokens !== void 0,
        hasMaxSizeBytes: fileReadingLimits.maxSizeBytes !== void 0
      });
      let ext = C8e.extname(filePath).toLowerCase().slice(1),
        resolvedPath = hs(filePath),
        priorEntry = readFileState.get(resolvedPath);
      if (priorEntry) W("tengu_file_read_reread", {
        priorOp: Ve(priorEntry.offset === void 0 ? "edit_write" : "read")
      });
      let dedupEntry = it("tengu_read_dedup_killswitch", !1) ? void 0 : readFileState.get(resolvedPath);
      if (dedupEntry && !dedupEntry.isPartialView && dedupEntry.offset !== void 0) {
        if (dedupEntry.offset === offset && dedupEntry.limit === limitArg) try {
          if ((await U1e(resolvedPath)) === dedupEntry.timestamp) {
            let fileExtVal = Vse(resolvedPath);
            return W("tengu_file_read_dedup", {
              ...(fileExtVal !== void 0 && {
                ext: fileExtVal
              })
            }), {
              data: {
                type: "file_unchanged",
                file: {
                  filePath: filePath
                }
              }
            };
          }
        } catch {}
      }
      let cwd = Lt();
      if (!Ne.CLAUDE_CODE_SIMPLE) {
        let skillDirs = await Yut([resolvedPath], cwd);
        if (skillDirs.length > 0) {
          let skillDirTriggers = context.dynamicSkillDirTriggers;
          if (skillDirTriggers) {
            for (let skillDir of skillDirs) if (!skillDirTriggers.includes(skillDir)) skillDirTriggers.push(skillDir);
          }
          Jut(skillDirs).catch(() => {});
        }
        Xut([resolvedPath], cwd);
      }
      try {
        return await Ial(filePath, resolvedPath, resolvedPath, ext, offset, limitArg, pages, maxSizeBytes, maxTokens, readFileState, context, callMeta?.message.id);
      } catch (readErr: any) {
        if (cn(readErr) === "ENOENT") {
          let altPath = vKp(resolvedPath);
          if (altPath) try {
            return await Ial(filePath, resolvedPath, altPath, ext, offset, limitArg, pages, maxSizeBytes, maxTokens, readFileState, context, callMeta?.message.id);
          } catch (altErr: any) {
            if (!In(altErr)) throw altErr;
          }
          let extSuggestion = kje(resolvedPath),
            caseSuggestion = await doe(resolvedPath),
            errMsg = `File does not exist. ${KN} ${Lt()}.`;
          if (caseSuggestion) errMsg += ` Did you mean ${caseSuggestion}?`;else if (extSuggestion) errMsg += ` Did you mean ${extSuggestion}?`;
          throw new Ta(errMsg, "File does not exist");
        }
        throw readErr;
      }
    },
    mapToolResultToToolResultBlockParam(result, toolUseId) {
      switch (result.type) {
        case "image":
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: [{
              type: "image",
              source: {
                type: "base64",
                data: result.file.base64,
                media_type: result.file.type
              }
            }]
          };
        case "notebook":
          return zBa(result.file.cells, toolUseId);
        case "pdf":
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: `PDF file read: ${result.file.filePath} (${Ra(result.file.originalSize)})`
          };
        case "parts":
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: `PDF pages extracted: ${result.file.count} page(s) from ${result.file.filePath} (${Ra(result.file.originalSize)})`
          };
        case "file_unchanged":
          return {
            tool_use_id: toolUseId,
            type: "tool_result",
            content: VEi()
          };
        case "text":
          {
            let content;
            if (result.file.content) {
              let banner = Pal.get(result);
              if (banner !== void 0) {
                if (R5t.size >= DKp) {
                  let oldestKey = R5t.keys().next().value;
                  if (oldestKey !== void 0) R5t.delete(oldestKey);
                }
                R5t.set(toolUseId, banner);
              } else banner = R5t.get(toolUseId);
              content = (banner ? `<system-reminder>${banner}</system-reminder>

` : "") + PKp(result) + xKp(result.file);
            } else content = result.file.totalLines === 0 ? "<system-reminder>Warning: the file exists but the contents are empty.</system-reminder>" : `<system-reminder>Warning: the file exists but is shorter than the provided offset (${result.file.startLine}). The file has ${result.file.totalLines} lines.</system-reminder>`;
            return {
              tool_use_id: toolUseId,
              type: "tool_result",
              content: content
            };
          }
      }
    }
  });
  Dal = new WeakMap(), Pal = new WeakMap(), R5t = new Map();
});

export {AKp,vKp,wKp,IKp,xKp,PKp,Hal,aGn,oEo,Ial,sEo,lGn,C8e,cGn,CKp,RKp,xal,kKp,HKp,hh,Dal,Pal,DKp,R5t,ace};
