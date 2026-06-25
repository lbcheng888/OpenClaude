// @ts-nocheck
import {Kk as TZ,po as zq} from "../tools/5224_userPromptCount.ts";
import {pm as Fz,l1 as ZC} from "./2694_l1.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
// ---------------------------------------------------------------------------
// core/2731_toolRequests.ts
//
// Token-usage analytics for a conversation transcript. Walks the messages of a
// session, estimating the token cost of each piece (human text, assistant text,
// local command output, tool requests, tool results, attachments, etc.) and
// detecting duplicate file reads. Produces both a rich in-memory summary
// (analyzeTokenUsage) and a flat telemetry record (tokenUsageToTelemetry).
//
// Cross-module dependencies (kept exactly, names recovered elsewhere):
//   Fz  — estimateTokens(str, charsPerToken=4): rough token estimate (len/4)
//   bH  — JSON.stringify wrapper (with timing-span side effect)
//   TZ  — normalize/expand a message list into a flat array of message entries
//   L   — esbuild __esm once-wrapper for lazy module init
//   ZC / zq / H6 — init thunks of dependency modules
// ---------------------------------------------------------------------------

/**
 * Aggregated, per-category token statistics collected while scanning a
 * conversation. Maps are keyed by category-specific strings (tool name,
 * attachment type, file path) and store token counts.
 */
interface TokenUsageStats {
  /** Tokens spent per tool name when the model requested a tool (tool_use). */
  toolRequests: Map<string, number>;
  /** Tokens spent per tool name in the tool's results (tool_result). */
  toolResults: Map<string, number>;
  /** Tokens attributable to human (user) text messages. */
  humanMessages: number;
  /** Tokens attributable to assistant text messages. */
  assistantMessages: number;
  /** Tokens from local command stdout embedded in user messages. */
  localCommandOutputs: number;
  /** Tokens from content blocks not otherwise categorized. */
  other: number;
  /** Count of attachments seen, keyed by attachment type. */
  attachments: Map<string, number>;
  /**
   * For files read more than once: the file path mapped to how many times it
   * was read and the redundant token cost of the repeat reads.
   */
  duplicateFileReads: Map<string, {
    count: number;
    tokens: number;
  }>;
  /** Grand total of estimated tokens across all categories. */
  total: number;
}

/** Running tally for a file that has been read, used to detect duplicates. */
interface FileReadTally {
  /** Number of times the file's contents appeared in tool results. */
  count: number;
  /** Total tokens across all reads of this file. */
  totalTokens: number;
}

/** A single normalized message entry as produced by TZ. */
interface NormalizedMessage {
  type: string;
  message: {
    content: string | unknown[];
  };
}

/** A single content block within a message (text, tool_use, tool_result, ...). */
type ContentBlock = {
  type: string;
  [key: string]: unknown;
};

/** An attachment entry that may appear in the raw message list. */
interface AttachmentEntry {
  type: "attachment";
  attachment: {
    type?: string;
  };
}

/**
 * Analyze a conversation's messages and return per-category token statistics,
 * including detection of files read more than once.
 *
 * @param messages Raw message/attachment entries for the conversation.
 * @returns A {@link TokenUsageStats} summary.
 */
function HM6(messages: Array<AttachmentEntry | unknown>): TokenUsageStats {
  let stats: TokenUsageStats = {
      toolRequests: new Map(),
      toolResults: new Map(),
      humanMessages: 0,
      assistantMessages: 0,
      localCommandOutputs: 0,
      other: 0,
      attachments: new Map(),
      duplicateFileReads: new Map(),
      total: 0
    },
    // Reserved/working maps. `toolNameById` maps a tool_use id to its tool name
    // so that the later tool_result can be attributed to the same tool.
    toolNameById = new Map<string, string>(),
    // `filePathById` maps a Read tool_use id to the file path it requested.
    filePathById = new Map<string, string>(),
    // `fileReadTallies` accumulates read counts/tokens keyed by file path.
    fileReadTallies = new Map<string, FileReadTally>();
  return (messages as AttachmentEntry[]).forEach(entry => {
    if (entry.type === "attachment") {
      let attachmentType = entry.attachment.type || "unknown";
      stats.attachments.set(attachmentType, (stats.attachments.get(attachmentType) || 0) + 1);
    }
  }), (TZ(messages) as NormalizedMessage[]).forEach(message => {
    let {
      content
    } = message.message;
    if (typeof content === "string") {
      let tokens = Fz(content);
      if (stats.total += tokens, message.type === "user" && content.includes("local-command-stdout")) stats.localCommandOutputs += tokens;else stats[message.type === "user" ? "humanMessages" : "assistantMessages"] += tokens;
    } else content.forEach(block => XA3(block as ContentBlock, message, stats, toolNameById, filePathById, fileReadTallies));
  }), fileReadTallies.forEach((tally, filePath) => {
    if (tally.count > 1) {
      // Redundant tokens = average tokens per read times the number of repeats.
      let redundantTokens = Math.floor(tally.totalTokens / tally.count) * (tally.count - 1);
      stats.duplicateFileReads.set(filePath, {
        count: tally.count,
        tokens: redundantTokens
      });
    }
  }), stats;
}

/**
 * Process a single message content block, estimating its token cost and folding
 * it into the running {@link TokenUsageStats}. Also tracks tool_use ids so that
 * tool_result blocks and duplicate Read file paths can be correlated.
 *
 * @param block          The content block to process.
 * @param message        The normalized message that owns this block.
 * @param stats          The statistics accumulator to update.
 * @param toolNameById   Map from tool_use id to tool name (built/read here).
 * @param filePathById   Map from Read tool_use id to file path (built/read here).
 * @param fileReadTallies Map from file path to read tally (updated here).
 */
function XA3(block: ContentBlock, message: NormalizedMessage, stats: TokenUsageStats, toolNameById: Map<string, string>, filePathById: Map<string, string>, fileReadTallies: Map<string, FileReadTally>): void {
  let tokens = Fz(bH(block));
  switch (stats.total += tokens, block.type) {
    case "text":
      if (message.type === "user" && "text" in block && (block.text as string).includes("local-command-stdout")) stats.localCommandOutputs += tokens;else stats[message.type === "user" ? "humanMessages" : "assistantMessages"] += tokens;
      break;
    case "tool_use":
      {
        if ("name" in block && "id" in block) {
          let toolName = block.name as string || "unknown";
          if (XN7(stats.toolRequests, toolName, tokens), toolNameById.set(block.id as string, toolName), toolName === "Read" && "input" in block && block.input && typeof block.input === "object" && "file_path" in (block.input as object)) {
            let filePath = String((block.input as {
              file_path: unknown;
            }).file_path);
            filePathById.set(block.id as string, filePath);
          }
        }
        break;
      }
    case "tool_result":
      {
        if ("tool_use_id" in block) {
          let toolName = toolNameById.get(block.tool_use_id as string) || "unknown";
          if (XN7(stats.toolResults, toolName, tokens), toolName === "Read") {
            let filePath = filePathById.get(block.tool_use_id as string);
            if (filePath) {
              let priorTally = fileReadTallies.get(filePath) || {
                count: 0,
                totalTokens: 0
              };
              fileReadTallies.set(filePath, {
                count: priorTally.count + 1,
                totalTokens: priorTally.totalTokens + tokens
              });
            }
          }
        }
        break;
      }
    case "image":
    case "server_tool_use":
    case "web_search_tool_result":
    case "search_result":
    case "document":
    case "thinking":
    case "redacted_thinking":
    case "code_execution_tool_result":
    case "mcp_tool_use":
    case "mcp_tool_result":
    case "container_upload":
    case "web_fetch_tool_result":
    case "bash_code_execution_tool_result":
    case "text_editor_code_execution_tool_result":
    case "tool_search_tool_result":
    case "advisor_tool_result":
    case "compaction":
      stats.other += tokens;
      break;
  }
}

/**
 * Add `amount` tokens to the value stored under `key` in a token-count map,
 * initializing missing entries to 0.
 */
function XN7(tokenMap: Map<string, number>, key: string, amount: number): void {
  tokenMap.set(key, (tokenMap.get(key) || 0) + amount);
}

/** Flat telemetry record produced from {@link TokenUsageStats}. */
type TokenUsageTelemetry = {
  total_tokens: number;
  human_message_tokens: number;
  assistant_message_tokens: number;
  local_command_output_tokens: number;
  other_tokens: number;
  [key: string]: number;
};

/**
 * Flatten a {@link TokenUsageStats} summary into a single-level telemetry
 * record of numeric metrics (token counts plus percentage breakdowns), suitable
 * for emitting as event properties.
 *
 * @param stats The statistics to flatten.
 * @returns A flat record of metric name to numeric value.
 */
function _M6(stats: TokenUsageStats): TokenUsageTelemetry {
  let telemetry: TokenUsageTelemetry = {
    total_tokens: stats.total,
    human_message_tokens: stats.humanMessages,
    assistant_message_tokens: stats.assistantMessages,
    local_command_output_tokens: stats.localCommandOutputs,
    other_tokens: stats.other
  };
  stats.attachments.forEach((count, attachmentType) => {
    telemetry[`attachment_${attachmentType}_count`] = count;
  }), stats.toolRequests.forEach((tokens, toolName) => {
    telemetry[`tool_request_${toolName}_tokens`] = tokens;
  }), stats.toolResults.forEach((tokens, toolName) => {
    telemetry[`tool_result_${toolName}_tokens`] = tokens;
  });
  let duplicateReadTokens = [...stats.duplicateFileReads.values()].reduce((sum, entry) => sum + entry.tokens, 0);
  if (telemetry.duplicate_read_tokens = duplicateReadTokens, telemetry.duplicate_read_file_count = stats.duplicateFileReads.size, stats.total > 0) {
    telemetry.human_message_percent = Math.round(stats.humanMessages / stats.total * 100), telemetry.assistant_message_percent = Math.round(stats.assistantMessages / stats.total * 100), telemetry.local_command_output_percent = Math.round(stats.localCommandOutputs / stats.total * 100), telemetry.duplicate_read_percent = Math.round(duplicateReadTokens / stats.total * 100);
    let toolRequestTotal = [...stats.toolRequests.values()].reduce((sum, tokens) => sum + tokens, 0),
      toolResultTotal = [...stats.toolResults.values()].reduce((sum, tokens) => sum + tokens, 0);
    telemetry.tool_request_percent = Math.round(toolRequestTotal / stats.total * 100), telemetry.tool_result_percent = Math.round(toolResultTotal / stats.total * 100), stats.toolRequests.forEach((tokens, toolName) => {
      telemetry[`tool_request_${toolName}_percent`] = Math.round(tokens / stats.total * 100);
    }), stats.toolResults.forEach((tokens, toolName) => {
      telemetry[`tool_result_${toolName}_percent`] = Math.round(tokens / stats.total * 100);
    });
  }
  return telemetry;
}

/**
 * Lazy module-init thunk (esbuild __esm). Ensures dependency modules (ZC, zq,
 * H6) are initialized once before this module's exports are used.
 */
var Op8 = L(() => {
  ZC();
  zq();
  H6();
});
export {HM6 as JHn,XA3 as nNd,XN7 as g5i,_M6 as XHn,Op8 as Y7r};
