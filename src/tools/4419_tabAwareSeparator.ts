// @ts-nocheck
import {tr,sn} from "../config/0047_namespace.ts";
import {N$e,khe,Fae,Kxe} from "../config/3156_maxSizeBytes.ts";
import {Vhi,VBr,oIt,Ws,ef,Ghi,zhi,Khi,Yhi,Whi} from "../../vendor/m2248.ts";
import {Atn,mc,KMe,I7e,moe,CB} from "../config/0645_maxBytes.ts";
import {F1i} from "../../vendor/m2680.ts";
import {G1i,HF} from "../core/2683_HF.ts";
import {Iel,Z5} from "../api/4416_type.ts";
import {Fl,bt,dn,Pn} from "../../vendor/m195.ts";
import {MUa,Q2n,NUa} from "../core/4055_truncatedContent.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {Su,Js,oA} from "../config/2697_oA.ts";
import {ns,Gse,$u} from "../mcp/2194_mcpServerName.ts";
import {formatFileSize,ps} from "../../vendor/m238.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {Wte,e$n} from "../telemetry/4059_operation.ts";
import {initCg,j1} from "../telemetry/2531_ignore1mTag.ts";
import {aet,ZO,mAe,QO,Oki,V4} from "../telemetry/2512_error_name.ts";
import {Ln,lo} from "./5190_userPromptCount.ts";
import {OQe,GBr,PQe,Dyn} from "../../vendor/m2247.ts";
import {ago,U6n,Pel,lgo} from "../../vendor/m4416.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Lbn,Iie,bki,qZ,_ki,jZ} from "../../vendor/m2510.ts";
import {Zdt,Jqn} from "../../vendor/m4377.ts";
import {Uu,dr} from "../../vendor/m231.ts";
import {$c,Vw} from "../../vendor/m2695.ts";
import {Kvn,xtt} from "../../vendor/m2681.ts";
import {x6e,Ndt} from "../../vendor/m4337.ts";
import {Br} from "../../vendor/m1456.ts";
import {De,Rn} from "../session/0615_length.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {pAe,Dbn} from "../../vendor/m2509.ts";
import {b,M} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {Htn,Ubt} from "../../vendor/m685.ts";
import {zn,getFeatureValue_CACHED_MAY_BE_STALE} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {x6,eut,tut,nut} from "./4332_displayName.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {Ql,Fr} from "../../vendor/m4405.ts";
import {Go,Pt} from "../../vendor/m632.ts";
import {Lr} from "../../vendor/m578.ts";
import {Iu,Ds} from "../../vendor/m643.ts";
import {nA,matchesPathRule,checkReadPermissionForTool,matchingRuleForInput} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {jot,VF} from "../../vendor/m3280.ts";
import {Uel,Oel,Fel,ugo,Lel,Mel,Nel,Bel} from "../tui/4418_limit.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {Qe} from "../../vendor/m5.ts";
import {je} from "../../vendor/m577.ts";
function $3p(filePath: string) {
  if (U3p.has(filePath)) return !0;
  if (filePath.startsWith("/proc/") && (filePath.endsWith("/fd/0") || filePath.endsWith("/fd/1") || filePath.endsWith("/fd/2"))) return !0;
  if (/^\/proc\/[^/]+\/(environ|cmdline|auxv|maps|mem|stat)$/.test(filePath)) return !0;
  return !1;
}
function j3p(filePath: string) {
  let basename = J6e.basename(filePath),
    amPmPattern = /^(.+)([ \u202F])(AM|PM)(\.png)$/,
    matchResult = basename.match(amPmPattern);
  if (!matchResult) return;
  let sepChar = matchResult[2],
    altSep = sepChar === " " ? q3p : " ";
  return filePath.replace(`${sepChar}${matchResult[3]}${matchResult[4]}`, `${altSep}${matchResult[3]}${matchResult[4]}`);
}
function W3p(filePath: string) {
  let dataDir = tr();
  if (!filePath.startsWith(dataDir)) return null;
  let normalized = filePath.split(W6n.win32.sep).join(W6n.posix.sep);
  if (normalized.includes("/projects/") && normalized.endsWith(".jsonl")) return "session_transcript";
  return null;
}
function K3p() {
  return N$e() ? Vhi : VBr;
}
function z3p(options: any) {
  return Atn({
    ...options,
    tabAwareSeparator: N$e()
  });
}
function J3p(resultObj: any) {
  let cachedVal = Wel.get(resultObj);
  if (cachedVal === void 0) return "";
  return F1i(cachedVal);
}
async function $el(content: string, ext: string, tokenLimit?: any) {
  let maxTok = tokenLimit ?? khe().maxTokens,
    tokCount = G1i(content, ext);
  if (!tokCount || tokCount <= maxTok / 4) return;
  let actualTokCount = (await Iel(content)) ?? tokCount;
  if (actualTokCount > maxTok) throw new Fae(actualTokCount, maxTok);
}
function q6n(imgBuf: any, mediaType: string, origSize: number, dims: any) {
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
function dgo(errObj: any) {
  return errObj.reason === "unknown" ? Error(errObj.message) : new Fl(errObj.message, `PDF extraction failed (${errObj.reason})`);
}
async function qel(displayPath: string, cacheKey: string, resolvedPath: string, ext: string, offset: any, limitArg: any, pages: any, maxSizeBytes: any, maxTokens: any, readFileState: any, context: any, msgId: any) {
  if (ext === "ipynb") {
    let notebookContent = await MUa(resolvedPath),
      encodedStr = Le(notebookContent),
      byteLen = Buffer.byteLength(encodedStr);
    if (byteLen > maxSizeBytes) {
      let platformHint = Su() ? `Use ${ns} with jq to read specific portions:
  cat "${displayPath}" | jq '.cells[:20]' # First 20 cells
  cat "${displayPath}" | jq '.cells[100:120]' # Cells 100-120
  cat "${displayPath}" | jq '.cells | length' # Count total cells
  cat "${displayPath}" | jq '.cells[] | select(.cell_type=="code") | .source' # All code sources` : `Use ${Js} to read specific portions:
  Get-Content "${displayPath}" | ConvertFrom-Json | Select-Object -ExpandProperty cells | Select-Object -First 20
  Get-Content "${displayPath}" | ConvertFrom-Json | Select-Object -ExpandProperty cells | Select-Object -Skip 100 -First 20 # Cells 100-120
  (Get-Content "${displayPath}" | ConvertFrom-Json).cells.Count # Count total cells
  Get-Content "${displayPath}" | ConvertFrom-Json | Select-Object -ExpandProperty cells | Where-Object cell_type -eq code | Select-Object -ExpandProperty source`;
      throw Error(`Notebook content (${formatFileSize(byteLen)}) exceeds maximum allowed size (${formatFileSize(maxSizeBytes)}). ${platformHint}`);
    }
    await $el(encodedStr, ext, maxTokens);
    let fileStat = await jt().stat(resolvedPath);
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
    return Wte({
      operation: "read",
      tool: "FileReadTool",
      filePath: cacheKey,
      content: encodedStr
    }), {
      data: notebookResult
    };
  }
  let modelId = initCg(context.options.mainLoopModel);
  if (jel.has(ext)) {
    let imgResult = await pgo(resolvedPath, maxTokens, void 0, modelId),
      attachTriggers = context.nestedMemoryAttachmentTriggers;
    if (attachTriggers && !attachTriggers.includes(cacheKey)) attachTriggers.push(cacheKey);
    Wte({
      operation: "read",
      tool: "FileReadTool",
      filePath: cacheKey,
      content: imgResult.file.base64
    });
    let dimInfo = imgResult.file.dimensions ? aet(imgResult.file.dimensions) : null;
    return {
      data: imgResult,
      ...(dimInfo && {
        newMessages: [Ln({
          content: dimInfo,
          isMeta: !0
        })]
      })
    };
  }
  if (OQe(ext)) {
    if (pages) {
      let pageRange = GBr(pages),
        extractResult = await ago(resolvedPath, pageRange ?? void 0);
      if (!extractResult.success) throw dgo(extractResult.error);
      logEvent("tengu_pdf_page_extraction", {
        success: !0,
        pageCount: extractResult.data.file.count,
        fileSize: extractResult.data.file.originalSize,
        hasPageRange: !0
      }), Wte({
        operation: "read",
        tool: "FileReadTool",
        filePath: cacheKey,
        content: `PDF pages ${pages}`
      });
      let pageFiles = (await j6n.readdir(extractResult.data.file.outputDir)).filter((fileName: any) => fileName.endsWith(".jpg")).sort(),
        pageImages = await Promise.all(pageFiles.map(async (fileName: any) => {
          let fullPath = J6e.join(extractResult.data.file.outputDir, fileName),
            fileData = await j6n.readFile(fullPath),
            {
              block: imgBlock
            } = await ZO({
              data: fileData,
              mediaType: "jpeg",
              limits: modelId
            });
          return imgBlock;
        }));
      return {
        data: extractResult.data,
        ...(pageImages.length > 0 && {
          newMessages: [Ln({
            content: pageImages,
            isMeta: !0
          })]
        })
      };
    }
    let pageCount = await U6n(resolvedPath);
    if (pageCount !== null && pageCount > Lbn) throw dgo({
      reason: "too_many_pages",
      message: `This PDF has ${pageCount} pages, which is too many to read at once. Use the pages parameter to read specific page ranges (e.g., pages: "1-5"). Maximum ${Iie} pages per request.`
    });
    let fileStat = await jt().stat(resolvedPath);
    if (!PQe() || fileStat.size > bki) {
      let extractResult = await ago(resolvedPath);
      if (extractResult.success) logEvent("tengu_pdf_page_extraction", {
        success: !0,
        pageCount: extractResult.data.file.count,
        fileSize: extractResult.data.file.originalSize
      });else logEvent("tengu_pdf_page_extraction", {
        success: !1,
        available: extractResult.error.reason !== "unavailable",
        fileSize: fileStat.size
      });
    }
    if (!PQe()) throw new Fl(`Reading full PDFs is not supported with this model. Use a newer model (Sonnet 3.5 v2 or later), or use the pages parameter to read specific page ranges (e.g., pages: "1-5", maximum ${Iie} pages per request). Page extraction requires poppler-utils: install with \`brew install poppler\` on macOS or \`apt-get install poppler-utils\` on Debian/Ubuntu.`, "PDF unsupported on current model");
    let pdfResult = await Pel(resolvedPath);
    if (!pdfResult.success) throw dgo(pdfResult.error);
    let pdfData = pdfResult.data;
    return Wte({
      operation: "read",
      tool: "FileReadTool",
      filePath: cacheKey,
      content: pdfData.file.base64
    }), {
      data: pdfData,
      newMessages: [Ln({
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
    } = await Zdt(resolvedPath, zeroOffset, limitArg, limitArg === void 0 ? maxSizeBytes : void 0, context.abortController.signal),
    outContent = rawContent,
    outLineCount = linesRead,
    outLimit = limitArg,
    truncBanner: any,
    isWholeFile = (offset ?? 1) <= 1 && limitArg === void 0 && pages === void 0;
  try {
    await $el(rawContent, ext, maxTokens);
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
      outContent = truncStr, outLineCount = usedCharFallback ? Uu(truncStr, `
`) + 1 : targetLines, outLimit = outLineCount, truncBanner = !usedCharFallback && outLineCount < totalLines ? oIt + `showing lines 1-${outLineCount} of ${totalLines} total (${tokenErr.tokenCount} tokens, cap ${maxTokens}). Call ${Ws} with offset=${outLineCount + 1} limit=${outLineCount} for the next page, or ${$c} to find a specific section. Do NOT answer from this page alone if the answer may be further in the file.]` : oIt + `showing the first ${truncStr.length} of ${rawContent.length} characters (${tokenErr.tokenCount} tokens, cap ${maxTokens}); this file has very long lines and cannot be paginated by line. Use ${$c} to find a specific section, or ${Ws} with offset/limit to page through it. Do NOT answer from this excerpt alone if the answer may be elsewhere in the file.]`;
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
  Kvn(cacheKey);
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
  if (x6e(cacheKey)) Wel.set(textResult, mtimeMs);
  if (truncBanner !== void 0) Gel.set(textResult, truncBanner);
  Wte({
    operation: "read",
    tool: "FileReadTool",
    filePath: cacheKey,
    content: outContent
  });
  let sessionTranscriptType = W3p(cacheKey),
    fileExtVal = Gse(cacheKey);
  return logEvent("tengu_session_file_read", {
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
      messageID: Br(msgId)
    }),
    is_session_transcript: sessionTranscriptType === "session_transcript"
  }), {
    data: textResult
  };
}
async function pgo(imgPath: string, tokenLim: any = khe().maxTokens, pageRangeArg: any, modelId: any) {
  let rawBytes = await jt().readFileBytes(imgPath, pageRangeArg),
    fileSize = rawBytes.length;
  if (fileSize === 0) throw new Fl(`Image file is empty: ${imgPath}`, "Image file is empty");
  let detectedType = qZ(rawBytes);
  if (detectedType === null) throw new Fl(`File has an image extension but its content is not a valid PNG/JPEG/GIF/WebP. Detected: ${_ki(rawBytes)}. This usually means a download saved an error/login page instead of the image. Use \`file "${imgPath}"\` to confirm, or read it as text with ${ns} (e.g. \`head -c 500\`).`, "Image extension but invalid magic bytes");
  let imgFmt = detectedType.split("/")[1] || "png",
    imgBlock: any;
  try {
    let resizeResult = await mAe(rawBytes, fileSize, imgFmt, modelId);
    imgBlock = q6n(resizeResult.buffer, resizeResult.mediaType, fileSize, resizeResult.dimensions);
  } catch (resizeErr: any) {
    if (resizeErr instanceof QO) throw resizeErr;
    De(resizeErr), imgBlock = q6n(rawBytes, imgFmt, fileSize);
  }
  if (Math.ceil(imgBlock.file.base64.length * 0.125) > tokenLim) try {
    let compressResult = await Oki(rawBytes, tokenLim, detectedType);
    return {
      type: "image",
      file: {
        base64: compressResult.base64,
        type: compressResult.mediaType,
        originalSize: fileSize
      }
    };
  } catch (compressErr: any) {
    logForDebugging(`Image compression failed for ${imgPath}: ${compressErr instanceof Error ? compressErr.message : String(compressErr)}`, {
      level: "error"
    });
    try {
      let fallbackBuf = await (await pAe())(rawBytes).resize(400, 400, {
        fit: "inside",
        withoutEnlargement: !0
      }).jpeg({
        quality: 20
      }).toBuffer();
      return q6n(fallbackBuf, "jpeg", fileSize);
    } catch (fallbackErr: any) {
      return logForDebugging(`Fallback image compression failed for ${imgPath}: ${fallbackErr instanceof Error ? fallbackErr.message : String(fallbackErr)}`, {
        level: "error"
      }), q6n(rawBytes, imgFmt, fileSize);
    }
  }
  return imgBlock;
}
var j6n,
  J6e,
  W6n,
  U3p,
  q3p,
  jel,
  G3p,
  V3p,
  gh,
  Wel,
  Gel,
  Y3p = 512,
  Z4t;
var Rce = b(() => {
  Xr();
  jZ();
  Htn();
  xtt();
  zn();
  Ct();
  $u();
  HF();
  Z5();
  x6();
  Ri();
  Ql();
  Go();
  qe();
  Lr();
  sn();
  bt();
  mc();
  e$n();
  ps();
  ws();
  V4();
  Rn();
  Ndt();
  lo();
  j1();
  Q2n();
  Iu();
  lgo();
  Dyn();
  nA();
  Jqn();
  jot();
  oA();
  Xt();
  dr();
  Vw();
  Dbn();
  Kxe();
  ef();
  Uel();
  j6n = require("fs/promises"), J6e = M(require("path")), W6n = require("path"), U3p = new Set(["/dev/zero", "/dev/random", "/dev/urandom", "/dev/full", "/dev/stdin", "/dev/tty", "/dev/console", "/dev/stdout", "/dev/stderr", "/dev/fd/0", "/dev/fd/1", "/dev/fd/2"]);
  q3p = String.fromCharCode(8239);
  jel = new Set(["png", "jpg", "jpeg", "gif", "webp"]);
  G3p = we(() => E.strictObject({
    file_path: E.string().describe("The absolute path to the file to read"),
    offset: VF(E.number().int().nonnegative().optional()).describe("The line number to start reading from. Only provide if the file is too large to read at once"),
    limit: VF(E.number().int().positive().optional()).describe("The number of lines to read. Only provide if the file is too large to read at once."),
    pages: E.string().optional().describe(`Page range for PDF files (e.g., "1-5", "3", "10-20"). Only applicable to PDF files. Maximum ${Iie} pages per request.`)
  })), V3p = we(() => {
    let e = E.enum(["image/jpeg", "image/png", "image/gif", "image/webp"]);
    return E.discriminatedUnion("type", [E.object({
      type: E.literal("text"),
      file: E.object({
        filePath: E.string().describe("The path to the file that was read"),
        content: E.string().describe("The content of the file"),
        numLines: E.number().describe("Number of lines in the returned content"),
        startLine: E.number().describe("The starting line number"),
        totalLines: E.number().describe("Total number of lines in the file"),
        truncatedByTokenCap: E.boolean().optional().describe("True when a whole-file read was auto-paginated because it exceeded the token cap (the content is a partial first page). A programmatic signal for internal consumers; survives output reconstruction (unlike the render-time banner).")
      })
    }), E.object({
      type: E.literal("image"),
      file: E.object({
        base64: E.string().describe("Base64-encoded image data"),
        type: e.describe("The MIME type of the image"),
        originalSize: E.number().describe("Original file size in bytes"),
        dimensions: E.object({
          originalWidth: E.number().optional().describe("Original image width in pixels"),
          originalHeight: E.number().optional().describe("Original image height in pixels"),
          displayWidth: E.number().optional().describe("Displayed image width in pixels (after resizing)"),
          displayHeight: E.number().optional().describe("Displayed image height in pixels (after resizing)")
        }).optional().describe("Image dimension info for coordinate mapping")
      })
    }), E.object({
      type: E.literal("notebook"),
      file: E.object({
        filePath: E.string().describe("The path to the notebook file"),
        cells: E.array(E.any()).describe("Array of notebook cells")
      })
    }), E.object({
      type: E.literal("pdf"),
      file: E.object({
        filePath: E.string().describe("The path to the PDF file"),
        base64: E.string().describe("Base64-encoded PDF data"),
        originalSize: E.number().describe("Original file size in bytes")
      })
    }), E.object({
      type: E.literal("parts"),
      file: E.object({
        filePath: E.string().describe("The path to the PDF file"),
        originalSize: E.number().describe("Original file size in bytes"),
        count: E.number().describe("Number of pages extracted"),
        outputDir: E.string().describe("Directory containing extracted page images")
      })
    }), E.object({
      type: E.literal("file_unchanged"),
      file: E.object({
        filePath: E.string().describe("The path to the file")
      })
    })]);
  }), gh = pi({
    name: Ws,
    ruleContentField: "file_path",
    searchHint: "read files, images, PDFs, notebooks",
    maxResultSizeChars: 1 / 0,
    strict: !0,
    async description() {
      return Ghi;
    },
    async prompt({
      model: e
    }) {
      let t = khe(),
        n = t.includeMaxSizeInPrompt ? `. Files larger than ${formatFileSize(t.maxSizeBytes)} will return an error; use offset and limit for larger files` : "",
        r = t.targetedRangeNudge ? zhi : Khi;
      return Yhi(e, K3p(), n, r);
    },
    get inputSchema() {
      return G3p();
    },
    coerceInput: Oel,
    get outputSchema() {
      return V3p();
    },
    userFacingName: Fel,
    getToolUseSummary: ugo,
    getActivityDescription(e) {
      let t = ugo(e);
      return t ? `Reading ${t}` : "Reading file";
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(e) {
      return e.file_path;
    },
    isSearchOrReadCommand() {
      return {
        isSearch: !1,
        isRead: !0
      };
    },
    getPath({
      file_path: e
    }) {
      return e || Pt();
    },
    backfillObservableInput(e) {
      if (typeof e.file_path === "string") e.file_path = Ds(e.file_path);
    },
    async preparePermissionMatcher({
      file_path: e
    }) {
      return t => matchesPathRule(t, e);
    },
    async checkPermissions(e, t) {
      return checkReadPermissionForTool(gh, e, Fr(t));
    },
    renderToolUseMessage: Lel,
    renderToolUseTag: Mel,
    renderToolResultMessage: Nel,
    extractSearchText() {
      return "";
    },
    stripForStorage(e) {
      if (typeof e !== "object" || e === null) return e;
      switch (e.type) {
        case "text":
          if (e.file.content === "") return e;
          return {
            ...e,
            file: {
              ...e.file,
              content: ""
            }
          };
        case "image":
          if (e.file.base64 === "") return e;
          return {
            ...e,
            file: {
              ...e.file,
              base64: ""
            }
          };
        case "pdf":
          if (e.file.base64 === "") return e;
          return {
            ...e,
            file: {
              ...e.file,
              base64: ""
            }
          };
        case "notebook":
          {
            let {
              cells: t
            } = e.file;
            if (t.length === 0 || t[0] == null) return e;
            return {
              ...e,
              file: {
                ...e.file,
                cells: Array(t.length)
              }
            };
          }
        default:
          return e;
      }
    },
    renderToolUseErrorMessage: Bel,
    async validateInput({
      file_path: e,
      pages: t
    }, n) {
      if (t !== void 0) {
        let a = GBr(t);
        if (!a) return {
          result: !1,
          message: `Invalid pages parameter: "${t}". Use formats like "1-5", "3", or "10-20". Pages are 1-indexed.`,
          errorCode: 7
        };
        if ((a.lastPage === 1 / 0 ? Iie + 1 : a.lastPage - a.firstPage + 1) > Iie) return {
          result: !1,
          message: `Page range "${t}" exceeds maximum of ${Iie} pages per request. Please use a smaller range.`,
          errorCode: 8
        };
      }
      let r = Ds(e);
      if (matchingRuleForInput(r, Fr(n), "read", "deny") !== null) return {
        result: !1,
        message: "File is in a directory that is denied by your permission settings.",
        errorCode: 1
      };
      if (r.startsWith("\\\\") || r.startsWith("//")) return {
        result: !0
      };
      let i = J6e.extname(r).toLowerCase();
      if (Ubt(r) && !OQe(i) && !jel.has(i.slice(1))) return {
        result: !1,
        message: `This tool cannot read binary files. The file appears to be a binary ${i} file. Please use appropriate tools for binary file analysis.`,
        errorCode: 4
      };
      if ($3p(r)) return {
        result: !1,
        message: `Cannot read '${e}': this device file would block or produce infinite output.`,
        errorCode: 9
      };
      return {
        result: !0
      };
    },
    async call({
      file_path: e,
      offset: t = 1,
      limit: n = void 0,
      pages: r
    }, o, s, i) {
      let {
          readFileState: a,
          fileReadingLimits: l
        } = o,
        c = khe(),
        u = l?.maxSizeBytes ?? c.maxSizeBytes,
        d = l?.maxTokens ?? c.maxTokens;
      if (l !== void 0) logEvent("tengu_file_read_limits_override", {
        hasMaxTokens: l.maxTokens !== void 0,
        hasMaxSizeBytes: l.maxSizeBytes !== void 0
      });
      let p = J6e.extname(e).toLowerCase().slice(1),
        m = Ds(e),
        f = a.get(m);
      if (f) logEvent("tengu_file_read_reread", {
        priorOp: Qe(f.offset === void 0 ? "edit_write" : "read")
      });
      let h = getFeatureValue_CACHED_MAY_BE_STALE("tengu_read_dedup_killswitch", !1) ? void 0 : a.get(m);
      if (h && !h.isPartialView && h.offset !== void 0) {
        if (h.offset === t && h.limit === n) try {
          if ((await KMe(m)) === h.timestamp) {
            let T = Gse(m);
            return logEvent("tengu_file_read_dedup", {
              ...(T !== void 0 && {
                ext: T
              })
            }), {
              data: {
                type: "file_unchanged",
                file: {
                  filePath: e
                }
              }
            };
          }
        } catch {}
      }
      let g = Pt();
      if (!je.CLAUDE_CODE_SIMPLE) {
        let _ = await eut([m], g);
        if (_.length > 0) {
          let y = o.dynamicSkillDirTriggers;
          if (y) {
            for (let T of _) if (!y.includes(T)) y.push(T);
          }
          tut(_).catch(() => {});
        }
        nut([m], g);
      }
      try {
        return await qel(e, m, m, p, t, n, r, u, d, a, o, i?.message.id);
      } catch (_) {
        if (dn(_) === "ENOENT") {
          let T = j3p(m);
          if (T) try {
            return await qel(e, m, T, p, t, n, r, u, d, a, o, i?.message.id);
          } catch (k) {
            if (!Pn(k)) throw k;
          }
          let S = I7e(m),
            v = await moe(m),
            R = `File does not exist. ${CB} ${Pt()}.`;
          if (v) R += ` Did you mean ${v}?`;else if (S) R += ` Did you mean ${S}?`;
          throw new Fl(R, "File does not exist");
        }
        throw _;
      }
    },
    mapToolResultToToolResultBlockParam(e, t) {
      switch (e.type) {
        case "image":
          return {
            tool_use_id: t,
            type: "tool_result",
            content: [{
              type: "image",
              source: {
                type: "base64",
                data: e.file.base64,
                media_type: e.file.type
              }
            }]
          };
        case "notebook":
          return NUa(e.file.cells, t);
        case "pdf":
          return {
            tool_use_id: t,
            type: "tool_result",
            content: `PDF file read: ${e.file.filePath} (${formatFileSize(e.file.originalSize)})`
          };
        case "parts":
          return {
            tool_use_id: t,
            type: "tool_result",
            content: `PDF pages extracted: ${e.file.count} page(s) from ${e.file.filePath} (${formatFileSize(e.file.originalSize)})`
          };
        case "file_unchanged":
          return {
            tool_use_id: t,
            type: "tool_result",
            content: Whi()
          };
        case "text":
          {
            let n;
            if (e.file.content) {
              let r = Gel.get(e);
              if (r !== void 0) {
                if (Z4t.size >= Y3p) {
                  let o = Z4t.keys().next().value;
                  if (o !== void 0) Z4t.delete(o);
                }
                Z4t.set(t, r);
              } else r = Z4t.get(t);
              n = (r ? `<system-reminder>${r}</system-reminder>

` : "") + J3p(e) + z3p(e.file);
            } else n = e.file.totalLines === 0 ? "<system-reminder>Warning: the file exists but the contents are empty.</system-reminder>" : `<system-reminder>Warning: the file exists but is shorter than the provided offset (${e.file.startLine}). The file has ${e.file.totalLines} lines.</system-reminder>`;
            return {
              tool_use_id: t,
              type: "tool_result",
              content: n
            };
          }
      }
    }
  });
  Wel = new WeakMap(), Gel = new WeakMap(), Z4t = new Map();
});
export {$3p,j3p,W3p,K3p,z3p,J3p,$el,q6n,dgo,qel,pgo,j6n,J6e,W6n,U3p,q3p,jel,G3p,V3p,gh,Wel,Gel,Y3p,Z4t,Rce};
