// @ts-nocheck
import {isFullscreenWithTTY as pt,b,M as L} from "../../runtime.ts";
import {OA as NA,Wtt as Rtt} from "../../vendor/m2708.ts";
import {rIe as FHe,wc as Uc,lo} from "../tools/5190_userPromptCount.ts";
import {tn as nn,Hc as xc} from "../../vendor/m235.ts";
import {uf as ff,Uu as Wu,zd as Xd,dr as fr} from "../../vendor/m231.ts";
import {JS as GS,Mw as Pw} from "../config/2221_recursive.ts";
import {ufr as Smr,mc} from "../config/0645_maxBytes.ts";
import {zR as VR,lg as og} from "../../vendor/m2269.ts";
import {getGlobalConfig as vt,saveGlobalConfig as un,Qn as nr} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {pr as Ar,Yl as zl} from "../../vendor/m2562.ts";
import {at as lt,rs as ts} from "../../vendor/m2546.ts";
import {Uy as By,zq as Lq} from "../../vendor/m3339.ts";
import {Tn as hn,zs as qs} from "../../vendor/m2554.ts";
import {Wu as Ku,lS as tS} from "../../vendor/m2571.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
var moduleNamespace = {};
pt(moduleNamespace, {
  tableTokenToMarkdown: () => tableTokenToMarkdown,
  normalizeTablesInMarkdown: () => normalizeTablesInMarkdown,
  fileExtension: () => fileExtension,
  collectRecentAssistantTexts: () => collectRecentAssistantTexts,
  call: () => call
});
function extractCodeBlocks(markdown) {
  let tokens = NA.lexer(FHe(markdown)),
    blocks = [];
  for (let token of tokens) if (token.type === "code") {
    let codeToken = token;
    blocks.push({
      code: codeToken.text,
      lang: codeToken.lang
    });
  }
  return blocks;
}
function renderTableCellRaw(cell) {
  return cell.tokens.map(token => token.raw).join("");
}
function tableToRows(table) {
  return [table.header.map(renderTableCellRaw), ...table.rows.map(row => row.map(renderTableCellRaw))];
}
function tableTokenToMarkdown(table) {
  let rows = tableToRows(table).map(row => row.map(cell => cell.replace(/\|/g, "\\|").replace(/[\r\n]/g, " "))),
    columnWidths = rows[0].map((_cell, columnIndex) => Math.max(3, ...rows.map(row => nn(row[columnIndex] ?? "")))),
    renderRow = row => `| ${row.map((cell, columnIndex) => cell + " ".repeat(Math.max(0, columnWidths[columnIndex] - nn(cell)))).join(" | ")} |`,
    renderSeparatorCell = (width, align) => {
      switch (align) {
        case "center":
          return `:${ff("-", width - 2)}:`;
        case "right":
          return `${ff("-", width - 1)}:`;
        case "left":
          return `:${ff("-", width - 1)}`;
        default:
          return "-".repeat(width);
      }
    },
    separatorRow = `| ${columnWidths.map((width, columnIndex) => renderSeparatorCell(width, table.align[columnIndex] ?? null)).join(" | ")} |`,
    [headerRow, ...bodyRows] = rows;
  return [renderRow(headerRow), separatorRow, ...bodyRows.map(renderRow)].join(`
`);
}
function normalizeTablesInMarkdown(markdown) {
  let tokens = NA.lexer(markdown),
    result = markdown,
    searchOffset = 0,
    lengthDelta = 0;
  for (let token of tokens) {
    let tokenStart = markdown.indexOf(token.raw, searchOffset);
    if (tokenStart === -1) continue;
    if (searchOffset = tokenStart + token.raw.length, token.type !== "table") continue;
    let trailingNewlines = token.raw.match(/\n*$/)?.[0] ?? "",
      rewritten = tableTokenToMarkdown(token) + trailingNewlines;
    result = result.slice(0, tokenStart + lengthDelta) + rewritten + result.slice(tokenStart + token.raw.length + lengthDelta), lengthDelta += rewritten.length - token.raw.length;
  }
  return result;
}
function collectRecentAssistantTexts(messages) {
  let texts = [];
  for (let index = messages.length - 1; index >= 0 && texts.length < MAX_RECENT_ASSISTANT_MESSAGES; index--) {
    let message = messages[index];
    if (message?.type !== "assistant" || message.isApiErrorMessage) continue;
    let content = message.message.content;
    if (!Array.isArray(content)) continue;
    let text = Uc(content, `

`);
    if (text) texts.push(text);
  }
  return texts;
}
function fileExtension(lang) {
  if (lang) {
    let sanitized = lang.replace(/[^a-zA-Z0-9]/g, "");
    if (sanitized && sanitized !== "plaintext") return `.${sanitized}`;
  }
  return ".txt";
}
async function writeToTempFile(content, filename) {
  let tempDir = GS(),
    filePath = pathModule.join(tempDir, filename);
  return await fsPromises.mkdir(tempDir, {
    recursive: true,
    mode: 448
  }), await Smr(filePath, content, {
    encoding: "utf-8"
  }), filePath;
}
async function copyToClipboardAndFile(content, filename) {
  let clipboardEscape = await VR(content);
  if (clipboardEscape) process.stdout.write(clipboardEscape);
  let lineCount = Wu(content, `
`) + 1,
    charCount = content.length;
  try {
    let writtenPath = await writeToTempFile(content, filename);
    return `Copied to clipboard (${charCount} characters, ${lineCount} lines)
Also written to ${writtenPath}`;
  } catch {
    return `Copied to clipboard (${charCount} characters, ${lineCount} lines)`;
  }
}
function truncateToWidth(text, maxWidth) {
  let normalized = Xd(text);
  if (nn(normalized) <= maxWidth) return normalized;
  let accumulated = "",
    accumulatedWidth = 0,
    budget = maxWidth - 1;
  for (let grapheme of normalized) {
    let graphemeWidth = nn(grapheme);
    if (accumulatedWidth + graphemeWidth > budget) break;
    accumulated += grapheme, accumulatedWidth += graphemeWidth;
  }
  return accumulated + "\u2026";
}
function CopyContentPicker(props) {
  let $memoCache = reactCompilerRuntime.c(35),
    {
      fullText: fullText,
      codeBlocks: codeBlocks,
      messageAge: messageAge,
      onDone: onDone
    } = props,
    focusedValueRef = React.useRef("full"),
    fullResponseDescription = `${fullText.length} chars, ${Wu(fullText, `
`) + 1} lines`,
    fullResponseOption;
  if ($memoCache[0] !== fullResponseDescription) fullResponseOption = {
    label: "Full response",
    value: "full",
    description: fullResponseDescription
  }, $memoCache[0] = fullResponseDescription, $memoCache[1] = fullResponseOption;else fullResponseOption = $memoCache[1];
  let options;
  if ($memoCache[2] !== codeBlocks || $memoCache[3] !== fullResponseOption) {
    let alwaysOption;
    if ($memoCache[5] === Symbol.for("react.memo_cache_sentinel")) alwaysOption = {
      label: "Always copy full response",
      value: "always",
      description: "Skip this picker in the future (revert via /config)"
    }, $memoCache[5] = alwaysOption;else alwaysOption = $memoCache[5];
    options = [fullResponseOption, ...codeBlocks.map(codeBlockToOption), alwaysOption], $memoCache[2] = codeBlocks, $memoCache[3] = fullResponseOption, $memoCache[4] = options;
  } else options = $memoCache[4];
  let pickerOptions = options,
    resolveSelection;
  if ($memoCache[6] !== codeBlocks || $memoCache[7] !== fullText) resolveSelection = function (selectedValue) {
    if (selectedValue === "full" || selectedValue === "always") return {
      text: fullText,
      filename: RESPONSE_FILENAME
    };
    let block = codeBlocks[selectedValue];
    return {
      text: block.code,
      filename: `copy${fileExtension(block.lang)}`,
      blockIndex: selectedValue
    };
  }, $memoCache[6] = codeBlocks, $memoCache[7] = fullText, $memoCache[8] = resolveSelection;else resolveSelection = $memoCache[8];
  let resolveSelectionFn = resolveSelection,
    handleSelect;
  if ($memoCache[9] !== codeBlocks.length || $memoCache[10] !== resolveSelectionFn || $memoCache[11] !== messageAge || $memoCache[12] !== onDone) handleSelect = async function (selectedValue) {
    let selection = resolveSelectionFn(selectedValue);
    if (selectedValue === "always") {
      if (!vt().copyFullResponse) un(enableCopyFullResponse);
      j("tengu_copy", {
        block_count: codeBlocks.length,
        always: true,
        message_age: messageAge
      });
      let summary = await copyToClipboardAndFile(selection.text, selection.filename);
      onDone(`${summary}
Preference saved. Use /config to change copyFullResponse`);
      return;
    }
    j("tengu_copy", {
      selected_block: selection.blockIndex,
      block_count: codeBlocks.length,
      message_age: messageAge
    });
    let summary = await copyToClipboardAndFile(selection.text, selection.filename);
    onDone(summary);
  }, $memoCache[9] = codeBlocks.length, $memoCache[10] = resolveSelectionFn, $memoCache[11] = messageAge, $memoCache[12] = onDone, $memoCache[13] = handleSelect;else handleSelect = $memoCache[13];
  let handleSelectFn = handleSelect,
    handleKeyDown;
  if ($memoCache[14] !== codeBlocks.length || $memoCache[15] !== resolveSelectionFn || $memoCache[16] !== messageAge || $memoCache[17] !== onDone) {
    let writeFocusedSelection = async function (selectedValue) {
      let selection = resolveSelectionFn(selectedValue);
      j("tengu_copy", {
        selected_block: selection.blockIndex,
        block_count: codeBlocks.length,
        message_age: messageAge,
        write_shortcut: true
      });
      try {
        let writtenPath = await writeToTempFile(selection.text, selection.filename);
        onDone(`Written to ${writtenPath}`);
      } catch (caught) {
        let error = caught;
        onDone(`Failed to write file: ${error instanceof Error ? error.message : error}`);
      }
    };
    handleKeyDown = function (event) {
      if (event.key === "w" && !event.ctrl && !event.meta) event.preventDefault(), writeFocusedSelection(focusedValueRef.current);
    }, $memoCache[14] = codeBlocks.length, $memoCache[15] = resolveSelectionFn, $memoCache[16] = messageAge, $memoCache[17] = onDone, $memoCache[18] = handleKeyDown;
  } else handleKeyDown = $memoCache[18];
  let handleKeyDownFn = handleKeyDown,
    promptText;
  if ($memoCache[19] === Symbol.for("react.memo_cache_sentinel")) promptText = React.default.createElement(w, {
    dimColor: true
  }, "Select content to copy:"), $memoCache[19] = promptText;else promptText = $memoCache[19];
  let handleFocus;
  if ($memoCache[20] === Symbol.for("react.memo_cache_sentinel")) handleFocus = value => {
    focusedValueRef.current = value;
  }, $memoCache[20] = handleFocus;else handleFocus = $memoCache[20];
  let handleChange;
  if ($memoCache[21] !== handleSelectFn) handleChange = value => {
    handleSelectFn(value);
  }, $memoCache[21] = handleSelectFn, $memoCache[22] = handleChange;else handleChange = $memoCache[22];
  let handleCancel;
  if ($memoCache[23] !== onDone) handleCancel = () => {
    onDone("Copy cancelled", {
      display: "system"
    });
  }, $memoCache[23] = onDone, $memoCache[24] = handleCancel;else handleCancel = $memoCache[24];
  let optionsList;
  if ($memoCache[25] !== pickerOptions || $memoCache[26] !== handleCancel || $memoCache[27] !== handleChange) optionsList = React.default.createElement(Ar, {
    options: pickerOptions,
    hideIndexes: false,
    onFocus: handleFocus,
    onChange: handleChange,
    onCancel: handleCancel
  }), $memoCache[25] = pickerOptions, $memoCache[26] = handleCancel, $memoCache[27] = handleChange, $memoCache[28] = optionsList;else optionsList = $memoCache[28];
  let copyHint, writeHint;
  if ($memoCache[29] === Symbol.for("react.memo_cache_sentinel")) copyHint = React.default.createElement(lt, {
    chord: "enter",
    action: "copy",
    format: {
      keyCase: "lower"
    }
  }), writeHint = React.default.createElement(lt, {
    chord: "w",
    action: "write to file"
  }), $memoCache[29] = copyHint, $memoCache[30] = writeHint;else copyHint = $memoCache[29], writeHint = $memoCache[30];
  let hintsFooter;
  if ($memoCache[31] === Symbol.for("react.memo_cache_sentinel")) hintsFooter = React.default.createElement(By, null, React.default.createElement(hn, null, copyHint, writeHint, React.default.createElement(lt, {
    chord: "escape",
    action: "cancel",
    format: {
      keyCase: "lower"
    }
  }))), $memoCache[31] = hintsFooter;else hintsFooter = $memoCache[31];
  let rendered;
  if ($memoCache[32] !== handleKeyDownFn || $memoCache[33] !== optionsList) rendered = React.default.createElement(Ku, null, React.default.createElement(B, {
    flexDirection: "column",
    gap: 1,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: handleKeyDownFn
  }, promptText, optionsList, hintsFooter)), $memoCache[32] = handleKeyDownFn, $memoCache[33] = optionsList, $memoCache[34] = rendered;else rendered = $memoCache[34];
  return rendered;
}
function enableCopyFullResponse(config) {
  return {
    ...config,
    copyFullResponse: true
  };
}
function codeBlockToOption(block, index) {
  let lineCount = Wu(block.code, `
`) + 1;
  return {
    label: truncateToWidth(block.code, 60),
    value: index,
    description: [block.lang, lineCount > 1 ? `${lineCount} lines` : undefined].filter(Boolean).join(", ") || undefined
  };
}
var reactCompilerRuntime,
  fsPromises,
  pathModule,
  React,
  RESPONSE_FILENAME = "response.md",
  MAX_RECENT_ASSISTANT_MESSAGES = 20,
  call = async (onDone, context, arg) => {
    let recentTexts = collectRecentAssistantTexts(context.messages);
    if (recentTexts.length === 0) return onDone("No assistant message to copy"), null;
    let messageAge = 0,
      trimmedArg = arg?.trim();
    if (trimmedArg) {
      let parsed = Number(trimmedArg);
      if (!Number.isInteger(parsed) || parsed < 1) return onDone(`Usage: /copy [N] where N is 1 (latest), 2, 3, \u2026 Got: ${trimmedArg}`), null;
      if (parsed > recentTexts.length) return onDone(`Only ${recentTexts.length} assistant ${recentTexts.length === 1 ? "message" : "messages"} available to copy`), null;
      messageAge = parsed - 1;
    }
    let normalizedText = normalizeTablesInMarkdown(recentTexts[messageAge]),
      codeBlocks = extractCodeBlocks(normalizedText),
      config = vt();
    if (codeBlocks.length === 0 || config.copyFullResponse) {
      j("tengu_copy", {
        always: config.copyFullResponse,
        block_count: codeBlocks.length,
        message_age: messageAge
      });
      let summary = await copyToClipboardAndFile(normalizedText, RESPONSE_FILENAME);
      return onDone(summary), null;
    }
    return React.default.createElement(CopyContentPicker, {
      fullText: normalizedText,
      codeBlocks: codeBlocks,
      messageAge: messageAge,
      onDone: onDone
    });
  };
var initModule = b(() => {
  Rtt();
  zl();
  qs();
  Lq();
  ts();
  tS();
  xc();
  og();
  Je();
  Ct();
  nr();
  mc();
  lo();
  fr();
  Pw();
  reactCompilerRuntime = L(nt(), 1), fsPromises = require("fs/promises"), pathModule = require("path"), React = L(Te(), 1);
});

export {moduleNamespace as fsl,extractCodeBlocks as $jp,renderTableCellRaw as osl,tableToRows as qjp,tableTokenToMarkdown,normalizeTablesInMarkdown,collectRecentAssistantTexts,fileExtension,writeToTempFile as msl,copyToClipboardAndFile as tyo,truncateToWidth as jjp,CopyContentPicker as Wjp,enableCopyFullResponse as Gjp,codeBlockToOption as Vjp,reactCompilerRuntime as ssl,fsPromises as isl,pathModule as asl,React as TG,RESPONSE_FILENAME as lsl,MAX_RECENT_ASSISTANT_MESSAGES as Ujp,call as Kjp,initModule as Asl};
