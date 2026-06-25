// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {Nf,Krt} from "../../vendor/m2720.ts";
import {oxe,Kl,po} from "../tools/5224_userPromptCount.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {getFastModeModelDisplayName as Cm,nu,Cd,lr} from "../../vendor/m233.ts";
import {hE,resolveToolAlias as UR} from "../config/2229_observed_uid.ts";
import {Byr,Xl} from "../config/0651_maxBytes.ts";
import {sw,qEn,hg} from "../../vendor/m2280.ts";
import {getGlobalConfig as Ot,saveGlobalConfig as hn,tr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {hr,Ol} from "../../vendor/m2573.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {Ny,uq} from "../../vendor/m3355.ts";
import {bn,Is} from "../../vendor/m2565.ts";
import {ku,rS} from "../../vendor/m2582.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * /copy slash command: copies the most recent assistant response (or a chosen
 * code block) to the clipboard, normalizing any markdown tables on the way out
 * and optionally writing the content to a file.
 */

var npl = {};
ft(npl, {
  tableTokenToMarkdown: () => tableTokenToMarkdown,
  normalizeTablesInMarkdown: () => normalizeTablesInMarkdown,
  fileExtension: () => fileExtension,
  collectRecentAssistantTexts: () => collectRecentAssistantTexts,
  call: () => call
});

/**
 * Lex markdown text and extract every fenced code block as `{ code, lang }`.
 * @param markdown - Raw markdown source.
 * @returns Ordered list of code blocks found in the source.
 */
function AYp(markdown: string): Array<{ code: string; lang: string }> {
  let tokens = Nf.lexer(oxe(markdown)),
    blocks: Array<{ code: string; lang: string }> = [];
  for (let token of tokens) if (token.type === "code") {
    let codeToken = token;
    blocks.push({
      code: codeToken.text,
      lang: codeToken.lang
    });
  }
  return blocks;
}

/**
 * Reconstruct the rendered text of a single table cell from its inline tokens.
 * @param cell - A table cell token whose `tokens` hold the raw inline pieces.
 */
function Vdl(cell: { tokens: Array<{ raw: string }> }): string {
  return cell.tokens.map(inlineToken => inlineToken.raw).join("");
}

/**
 * Flatten a marked table token into a 2D string grid: the header row followed
 * by every body row.
 * @param tableToken - A marked `table` token.
 * @returns Rows of cell strings; row 0 is the header.
 */
function RYp(tableToken: { header: any[]; rows: any[][] }): string[][] {
  return [tableToken.header.map(Vdl), ...tableToken.rows.map(row => row.map(Vdl))];
}

/**
 * Render a marked table token back into a width-aligned GitHub-flavored
 * markdown table string.
 * @param tableToken - A marked `table` token (with `align` metadata).
 */
function tableTokenToMarkdown(tableToken: { header: any[]; rows: any[][]; align: (string | null)[] }): string {
  let grid = RYp(tableToken).map(row => row.map(cell => cell.replace(/\|/g, "\\|").replace(/[\r\n]/g, " "))),
    columnWidths = grid[0].map((_headerCell, columnIndex) => Math.max(3, ...grid.map(row => sn(row[columnIndex] ?? "")))),
    formatRow = (row: string[]) => `| ${row.map((cell, columnIndex) => cell + " ".repeat(Math.max(0, columnWidths[columnIndex] - sn(cell)))).join(" | ")} |`,
    formatDivider = (width: number, align: string | null) => {
      switch (align) {
        case "center":
          return `:${Cm("-", width - 2)}:`;
        case "right":
          return `${Cm("-", width - 1)}:`;
        case "left":
          return `:${Cm("-", width - 1)}`;
        default:
          return "-".repeat(width);
      }
    },
    dividerRow = `| ${columnWidths.map((width, columnIndex) => formatDivider(width, tableToken.align[columnIndex] ?? null)).join(" | ")} |`,
    [headerRow, ...bodyRows] = grid;
  return [formatRow(headerRow), dividerRow, ...bodyRows.map(formatRow)].join(`
`);
}

/**
 * Re-render every markdown table in a document in place, preserving each
 * table's trailing newlines and all surrounding non-table content.
 * @param markdown - Full markdown document.
 * @returns The document with tables normalized to aligned markdown.
 */
function normalizeTablesInMarkdown(markdown: string): string {
  let tokens = Nf.lexer(markdown),
    result = markdown,
    searchOffset = 0,
    rewriteDelta = 0;
  for (let token of tokens) {
    let rawStart = markdown.indexOf(token.raw, searchOffset);
    if (rawStart === -1) continue;
    if (searchOffset = rawStart + token.raw.length, token.type !== "table") continue;
    let trailingNewlines = token.raw.match(/\n*$/)?.[0] ?? "",
      rendered = tableTokenToMarkdown(token) + trailingNewlines;
    result = result.slice(0, rawStart + rewriteDelta) + rendered + result.slice(rawStart + token.raw.length + rewriteDelta), rewriteDelta += rendered.length - token.raw.length;
  }
  return result;
}

/**
 * Walk a message list from newest to oldest and collect the text of up to
 * `CYp` recent successful assistant messages.
 * @param messages - Conversation messages in chronological order.
 * @returns Assistant text bodies, newest first.
 */
function collectRecentAssistantTexts(messages: any[]): string[] {
  let texts: string[] = [];
  for (let index = messages.length - 1; index >= 0 && texts.length < CYp; index--) {
    let message = messages[index];
    if (message?.type !== "assistant" || message.isApiErrorMessage) continue;
    let content = message.message.content;
    if (!Array.isArray(content)) continue;
    let text = Kl(content, `

`);
    if (text) texts.push(text);
  }
  return texts;
}

/**
 * Derive a safe file extension (with leading dot) from a code block language
 * tag, falling back to `.txt`.
 * @param lang - Optional fenced-code language identifier.
 */
function fileExtension(lang?: string): string {
  if (lang) {
    let sanitized = lang.replace(/[^a-zA-Z0-9]/g, "");
    if (sanitized && sanitized !== "plaintext") return `.${sanitized}`;
  }
  return ".txt";
}

/**
 * Write `content` to a uniquely-located temp file named `filename` under the
 * copy-output directory, creating the directory if needed.
 * @returns The absolute path written to.
 */
async function tpl(content: string, filename: string): Promise<string> {
  let outputDir = hE(),
    outputPath = jdl.join(outputDir, filename);
  return await zdl.mkdir(outputDir, {
    recursive: !0,
    mode: 448
  }), await Byr(outputPath, content, {
    encoding: "utf-8"
  }), outputPath;
}

/**
 * Copy text to the system clipboard, also persisting it to a file, and return
 * a human-readable status message describing what happened.
 * @param content - Text to copy.
 * @param filename - File name to use for the on-disk copy.
 */
async function YCo(content: string, filename: string): Promise<string> {
  let clipboardWarning = await sw(content);
  if (clipboardWarning) process.stdout.write(clipboardWarning);
  let lineCount = nu(content, `
`) + 1,
    summary = `Copied to clipboard (${content.length} characters, ${lineCount} lines)`,
    contentWarning = qEn(content);
  try {
    let writtenPath = await tpl(content, filename),
      warningSuffix = contentWarning ? `
⚠ ${contentWarning}; the file below is unaffected` : "";
    return `${summary}${warningSuffix}
Also written to ${writtenPath}`;
  } catch {
    let warningSuffix = contentWarning ? `
⚠ ${contentWarning}` : "";
    return `${summary}${warningSuffix}`;
  }
}

/**
 * Truncate a string to at most `maxWidth` display columns, appending an
 * ellipsis when truncation occurs.
 * @param text - Source string.
 * @param maxWidth - Maximum display width in columns.
 */
function vYp(text: string, maxWidth: number): string {
  let graphemes = Cd(text);
  if (sn(graphemes) <= maxWidth) return graphemes;
  let truncated = "",
    width = 0,
    limit = maxWidth - 1;
  for (let grapheme of graphemes) {
    let graphemeWidth = sn(grapheme);
    if (width + graphemeWidth > limit) break;
    truncated += grapheme, width += graphemeWidth;
  }
  return truncated + "…";
}

/**
 * Interactive picker UI letting the user choose the full response or a specific
 * code block to copy (and optionally write to file). React component compiled
 * with the memo cache (`t`) for stable identities across renders.
 */
function wYp(props: {
  fullText: string;
  codeBlocks: Array<{ code: string; lang: string }>;
  messageAge: number;
  onDone: (message: string, opts?: any) => void;
}) {
  let cache = Kdl.c(35),
    {
      fullText: fullText,
      codeBlocks: codeBlocks,
      messageAge: messageAge,
      onDone: onDone
    } = props,
    focusedValueRef = Ydl.useRef("full"),
    fullDescription = `${fullText.length} chars, ${nu(fullText, `
`) + 1} lines`,
    fullOption;
  if (cache[0] !== fullDescription) fullOption = {
    label: "Full response",
    value: "full",
    description: fullDescription
  }, cache[0] = fullDescription, cache[1] = fullOption;else fullOption = cache[1];
  let pickerOptions;
  if (cache[2] !== codeBlocks || cache[3] !== fullOption) {
    let alwaysOption;
    if (cache[5] === Symbol.for("react.memo_cache_sentinel")) alwaysOption = {
      label: "Always copy full response",
      value: "always",
      description: "Skip this picker in the future (revert via /config)"
    }, cache[5] = alwaysOption;else alwaysOption = cache[5];
    pickerOptions = [fullOption, ...codeBlocks.map(HYp), alwaysOption], cache[2] = codeBlocks, cache[3] = fullOption, cache[4] = pickerOptions;
  } else pickerOptions = cache[4];
  let options = pickerOptions,
    resolveSelection;
  if (cache[6] !== codeBlocks || cache[7] !== fullText) resolveSelection = function (selectedValue: string) {
    if (selectedValue === "full" || selectedValue === "always") return {
      text: fullText,
      filename: Jdl
    };
    let block = codeBlocks[selectedValue as any];
    return {
      text: block.code,
      filename: `copy${fileExtension(block.lang)}`,
      blockIndex: selectedValue
    };
  }, cache[6] = codeBlocks, cache[7] = fullText, cache[8] = resolveSelection;else resolveSelection = cache[8];
  let resolve = resolveSelection,
    handleSelect;
  if (cache[9] !== codeBlocks.length || cache[10] !== resolve || cache[11] !== messageAge || cache[12] !== onDone) handleSelect = async function (selectedValue: string) {
    let selection = resolve(selectedValue);
    if (selectedValue === "always") {
      if (!Ot().copyFullResponse) hn(kYp);
      W("tengu_copy", {
        block_count: codeBlocks.length,
        always: !0,
        message_age: messageAge
      });
      let result = await YCo(selection.text, selection.filename);
      onDone(`${result}
Preference saved. Use /config to change copyFullResponse`);
      return;
    }
    W("tengu_copy", {
      selected_block: selection.blockIndex,
      block_count: codeBlocks.length,
      message_age: messageAge
    });
    let result = await YCo(selection.text, selection.filename);
    onDone(result);
  }, cache[9] = codeBlocks.length, cache[10] = resolve, cache[11] = messageAge, cache[12] = onDone, cache[13] = handleSelect;else handleSelect = cache[13];
  let onSelect = handleSelect,
    handleKeyDown;
  if (cache[14] !== codeBlocks.length || cache[15] !== resolve || cache[16] !== messageAge || cache[17] !== onDone) {
    let writeToFile = async function (selectedValue: string) {
      let selection = resolve(selectedValue);
      W("tengu_copy", {
        selected_block: selection.blockIndex,
        block_count: codeBlocks.length,
        message_age: messageAge,
        write_shortcut: !0
      });
      try {
        let writtenPath = await tpl(selection.text, selection.filename);
        onDone(`Written to ${writtenPath}`);
      } catch (error) {
        let err = error;
        onDone(`Failed to write file: ${err instanceof Error ? err.message : err}`);
      }
    };
    handleKeyDown = function (key: any) {
      if (key.key === "w" && !key.ctrl && !key.meta) key.preventDefault(), writeToFile(focusedValueRef.current);
    }, cache[14] = codeBlocks.length, cache[15] = resolve, cache[16] = messageAge, cache[17] = onDone, cache[18] = handleKeyDown;
  } else handleKeyDown = cache[18];
  let onKeyDown = handleKeyDown,
    promptNode;
  if (cache[19] === Symbol.for("react.memo_cache_sentinel")) promptNode = QY.jsx(v, {
    dimColor: !0,
    children: "Select content to copy:"
  }), cache[19] = promptNode;else promptNode = cache[19];
  let onFocus;
  if (cache[20] === Symbol.for("react.memo_cache_sentinel")) onFocus = (focusedValue: string) => {
    focusedValueRef.current = focusedValue;
  }, cache[20] = onFocus;else onFocus = cache[20];
  let onChange;
  if (cache[21] !== onSelect) onChange = (selectedValue: string) => {
    onSelect(selectedValue);
  }, cache[21] = onSelect, cache[22] = onChange;else onChange = cache[22];
  let onCancel;
  if (cache[23] !== onDone) onCancel = () => {
    onDone("Copy cancelled", {
      display: "system"
    });
  }, cache[23] = onDone, cache[24] = onCancel;else onCancel = cache[24];
  let selectNode;
  if (cache[25] !== options || cache[26] !== onCancel || cache[27] !== onChange) selectNode = QY.jsx(hr, {
    options: options,
    hideIndexes: !1,
    onFocus: onFocus,
    onChange: onChange,
    onCancel: onCancel
  }), cache[25] = options, cache[26] = onCancel, cache[27] = onChange, cache[28] = selectNode;else selectNode = cache[28];
  let copyHintNode, writeHintNode;
  if (cache[29] === Symbol.for("react.memo_cache_sentinel")) copyHintNode = QY.jsx(at, {
    chord: "enter",
    action: "copy",
    format: {
      keyCase: "lower"
    }
  }), writeHintNode = QY.jsx(at, {
    chord: "w",
    action: "write to file"
  }), cache[29] = copyHintNode, cache[30] = writeHintNode;else copyHintNode = cache[29], writeHintNode = cache[30];
  let hintsNode;
  if (cache[31] === Symbol.for("react.memo_cache_sentinel")) hintsNode = QY.jsx(Ny, {
    children: QY.jsxs(bn, {
      children: [copyHintNode, writeHintNode, QY.jsx(at, {
        chord: "escape",
        action: "cancel",
        format: {
          keyCase: "lower"
        }
      })]
    })
  }), cache[31] = hintsNode;else hintsNode = cache[31];
  let rootNode;
  if (cache[32] !== onKeyDown || cache[33] !== selectNode) rootNode = QY.jsx(ku, {
    children: QY.jsxs($, {
      flexDirection: "column",
      gap: 1,
      tabIndex: 0,
      autoFocus: !0,
      onKeyDown: onKeyDown,
      children: [promptNode, selectNode, hintsNode]
    })
  }), cache[32] = onKeyDown, cache[33] = selectNode, cache[34] = rootNode;else rootNode = cache[34];
  return rootNode;
}

/**
 * Config reducer: enable the "always copy full response" preference.
 * @param config - Current config object.
 */
function kYp(config: any) {
  return {
    ...config,
    copyFullResponse: !0
  };
}

/**
 * Build a picker option descriptor for a single code block.
 * @param block - A `{ code, lang }` code block.
 * @param index - Its index, used as the option value.
 */
function HYp(block: { code: string; lang: string }, index: number) {
  let lineCount = nu(block.code, `
`) + 1;
  return {
    label: vYp(block.code, 60),
    value: index,
    description: [block.lang, lineCount > 1 ? `${lineCount} lines` : void 0].filter(Boolean).join(", ") || void 0
  };
}

var Kdl,
  zdl,
  jdl,
  Ydl,
  QY,
  Jdl = "response.md",
  CYp = 20,
  call = async (notify: (message: string, opts?: any) => void, context: { messages: any[] }, arg?: string) => {
    let recentTexts = collectRecentAssistantTexts(context.messages);
    if (recentTexts.length === 0) return notify("No assistant message to copy"), null;
    let selectedIndex = 0,
      trimmedArg = arg?.trim();
    if (trimmedArg) {
      let parsed = Number(trimmedArg);
      if (!Number.isInteger(parsed) || parsed < 1) return notify(`Usage: /copy [N] where N is 1 (latest), 2, 3, … Got: ${trimmedArg}`), null;
      if (parsed > recentTexts.length) return notify(`Only ${recentTexts.length} assistant ${recentTexts.length === 1 ? "message" : "messages"} available to copy`), null;
      selectedIndex = parsed - 1;
    }
    let normalizedText = normalizeTablesInMarkdown(recentTexts[selectedIndex]),
      codeBlocks = AYp(normalizedText),
      config = Ot();
    if (codeBlocks.length === 0 || config.copyFullResponse) {
      W("tengu_copy", {
        always: config.copyFullResponse,
        block_count: codeBlocks.length,
        message_age: selectedIndex
      });
      let result = await YCo(normalizedText, Jdl);
      return notify(result), null;
    }
    return QY.jsx(wYp, {
      fullText: normalizedText,
      codeBlocks: codeBlocks,
      messageAge: selectedIndex,
      onDone: notify
    });
  };

var rpl = b(() => {
  Krt();
  Ol();
  Is();
  uq();
  Wo();
  rS();
  mc();
  hg();
  je();
  kt();
  tr();
  Xl();
  po();
  lr();
  UR();
  Kdl = x(tt(), 1), zdl = require("fs/promises"), jdl = require("path"), Ydl = x(et(), 1), QY = x(oe(), 1);
});

export {npl,AYp,Vdl,RYp,tableTokenToMarkdown,normalizeTablesInMarkdown,collectRecentAssistantTexts,fileExtension,tpl,YCo,vYp,wYp,kYp,HYp,Kdl,zdl,jdl,Ydl,QY,Jdl,CYp,call as IYp,rpl};
