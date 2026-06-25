// @ts-nocheck
import {b} from "../../runtime.ts";
/**
 * Returns the set of terminal-backed MCP tool names that should be treated
 * specially, parsed from the `CLAUDE_CODE_TERMINAL_MCP_TOOLS` env var
 * (comma-separated, trimmed, empties dropped).
 */
function getTerminalMcpToolNames(): Set<string> {
  return new Set((process.env.CLAUDE_CODE_TERMINAL_MCP_TOOLS ?? "").split(",").map(rawToolName => rawToolName.trim()).filter(Boolean));
}

/**
 * Scans the conversation transcript (newest-first) to decide whether the most
 * recent turn ended with a successful tool_use of a terminal MCP tool whose
 * result has already been returned without error.
 *
 * Walks backwards: collects tool_use_ids of non-error tool_results from user
 * turns, then checks assistant tool_use entries against those ids and the
 * configured terminal-tool name set.
 *
 * @param messages - transcript entries, ordered oldest-first.
 * @returns true if a successful terminal MCP tool call is found, else false.
 */
function hasSuccessfulTerminalMcpToolCall(messages: any[]): boolean {
  let terminalToolNames = getTerminalMcpToolNames();
  if (terminalToolNames.size === 0) return !1;
  let succeededToolUseIds = new Set<string>();
  for (let messageIndex = messages.length - 1; messageIndex >= 0; messageIndex--) {
    let message = messages[messageIndex];
    if (message.type === "user") {
      if (message.isMeta) continue;
      let userContent = message.message.content;
      if (!Array.isArray(userContent)) return !1;
      let sawToolResult = !1;
      for (let contentBlock of userContent) if (contentBlock.type === "tool_result") {
        if (sawToolResult = !0, !contentBlock.is_error) succeededToolUseIds.add(contentBlock.tool_use_id);
      }
      if (!sawToolResult) return !1;
    } else if (message.type === "assistant") {
      for (let contentBlock of message.message.content) if (contentBlock.type === "tool_use" && succeededToolUseIds.has(contentBlock.id) && terminalToolNames.has(contentBlock.name)) return !0;
    }
  }
  return !1;
}

/**
 * Reads a file as UTF-8 text, returning null if it is not a regular file,
 * exceeds the given size limit, or cannot be read.
 *
 * @param filePath - absolute or relative path to the file.
 * @param maxSizeBytes - maximum allowed file size in bytes.
 */
async function U1(filePath: string, maxSizeBytes: number): Promise<string | null> {
  try {
    let fileStats = await X2n.lstat(filePath);
    if (!fileStats.isFile() || fileStats.size > maxSizeBytes) return null;
    return await X2n.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

var X2n: typeof import("fs/promises");
var x0e = b(() => {
  X2n = require("fs/promises");
});

export {getTerminalMcpToolNames as Sco,hasSuccessfulTerminalMcpToolCall as pFa,U1,X2n,x0e};
