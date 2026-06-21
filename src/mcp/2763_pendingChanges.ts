// @ts-nocheck
import {je as oH} from "../../vendor/m577.ts";
import {getClaudeTempDir as Xx,nA as o$} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {getSessionId as v_,lt as w_} from "../session/0131_sent.ts";
import {qt as d_,Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {bNr as a28,$u as E3} from "./2194_mcpServerName.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Fg as RY} from "../agent/2188_kind.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
import {iv as r2} from "../../vendor/m454.ts";
import {we as kH} from "../../vendor/m455.ts";
import {hn as k6} from "../../vendor/m251.ts";
/** A text content block (the only block shape we read `.text` off of). */
interface TextBlock {
  text?: unknown;
  cache_control?: unknown;
  [key: string]: unknown;
}

/** A tool schema as passed to the API. */
interface ToolSchema {
  name?: string;
  description?: string;
  input_schema?: unknown;
  cache_control?: unknown;
  [key: string]: unknown;
}

/** A stored conversation message (used when hashing message history). */
interface StoredMessage {
  type?: string;
  timestamp: string | number | Date;
  message: {
    role: string;
    content: unknown;
  };
}

/** The diff between the previous request snapshot and the current one. */
interface PendingChanges {
  systemPromptChanged: boolean;
  toolSchemasChanged: boolean;
  modelChanged: boolean;
  fastModeChanged: boolean;
  cacheControlChanged: boolean;
  globalCacheStrategyChanged: boolean;
  betasChanged: boolean;
  autoModeChanged: boolean;
  overageChanged: boolean;
  cacheDiagnosisChanged: boolean;
  effortChanged: boolean;
  extraBodyChanged: boolean;
  messagesHistoryChanged: boolean;
  firstChangedMessageIndex: number;
  prevMessageCount: number;
  addedToolCount: number;
  removedToolCount: number;
  addedTools: string[];
  removedTools: string[];
  changedToolSchemas: string[];
  prevBlockCount: number;
  newBlockCount: number;
  changedBlockIndices: number[];
  changedBlockLengthDeltas: number[];
  systemCharDelta: number;
  previousModel: string;
  newModel: string;
  prevGlobalCacheStrategy: string;
  newGlobalCacheStrategy: string;
  addedBetas: string[];
  removedBetas: string[];
  prevEffortValue: string;
  newEffortValue: string;
  buildPrevDiffContent: () => string;
}

/** Per-cache-key snapshot of the last observed request. */
interface CacheEntry {
  systemHash: number;
  toolsHash: number;
  cacheControlHash: number;
  toolNames: string[];
  /** name -> hash of that tool's schema (after cache-control stripping). */
  perToolHashes: Record<string, number>;
  /** hash of each system-prompt block. */
  perBlockHashes: number[];
  /** char length of each system-prompt block. */
  perBlockLengths: number[];
  systemCharCount: number;
  model: string;
  fastMode: boolean;
  globalCacheStrategy: string;
  betas: string[];
  autoModeActive: boolean;
  isUsingOverage: boolean;
  is1hCacheTTL: boolean;
  queryDepth: number | undefined;
  cacheDiagnosis: boolean;
  effortValue: string;
  extraBodyHash: number;
  callCount: number;
  prevCacheReadTokens: number | null;
  cacheDeletionsPending: boolean;
  messageHashes: number[];
  /** Recorded diff vs. the previous request, or null when nothing changed. */
  pendingChanges: PendingChanges | null;
  /** Lazily builds a human-readable model/system/tools dump for diagnostics. */
  buildDiffContent: () => string;
}

/** Input snapshot for {@link recordRequestSnapshot}. */
interface RequestSnapshotInput {
  system: TextBlock[];
  toolSchemas: ToolSchema[];
  querySource: string;
  model: string;
  agentId?: string;
  fastMode?: boolean;
  globalCacheStrategy?: string;
  betas?: string[];
  autoModeActive?: boolean;
  isUsingOverage?: boolean;
  is1hCacheTTL?: boolean;
  queryDepth?: number;
  cacheDiagnosis?: boolean;
  effortValue?: unknown;
  extraBodyParams?: unknown;
  messagesForAPI?: StoredMessage[];
}

/** A cache-diagnosis payload returned by the API. */
interface CacheDiagnosis {
  type: string;
  cache_missed_input_tokens?: number;
}

/** Context for {@link recordCacheDiagnosis}. */
interface CacheDiagnosisContext {
  requestId?: string;
  previousMessageId?: string;
  model: string;
  is1hCacheTTL: boolean;
  querySource: string;
  queryDepth: number | undefined;
}

/** True when the process is the Claude Desktop entrypoint. */
function isClaudeDesktop(): boolean {
  return process.env.CLAUDE_CODE_ENTRYPOINT === "claude-desktop";
}

/** True in Cowork mode or when running under Claude Desktop. */
function isCoworkOrDesktop(): boolean {
  if (oH.CLAUDE_CODE_IS_COWORK) return !0;
  return isClaudeDesktop();
}

/** True when running in Cowork mode (state is persisted to disk in this mode). */
function isCowork(): boolean {
  return oH.CLAUDE_CODE_IS_COWORK;
}

/** Path to the per-session on-disk cache-break-state file. */
function getCacheBreakStateFilePath(): string {
  return aN7.join(Xx(), `cache-break-state-${v_()}.json`);
}

/**
 * Loads previously persisted cache-break state from disk (once per process).
 * Only runs in Cowork mode. Entries already present in memory are not
 * overwritten; restored entries have their `pendingChanges` cleared and an
 * empty `buildDiffContent`.
 */
function loadCacheBreakStateFromDisk(): void {
  if (cacheBreakStateLoaded || !isCowork()) return;
  cacheBreakStateLoaded = !0;
  try {
    let fileContents = oN7.readFileSync(getCacheBreakStateFilePath(), "utf8"),
      parsed = getCacheStateSchema().safeParse(d_(fileContents));
    if (!parsed.success) return;
    for (let [cacheKey, entry] of Object.entries(parsed.data)) {
      if (cacheEntries.has(cacheKey)) continue;
      cacheEntries.set(cacheKey, {
        ...(entry as Omit<CacheEntry, "pendingChanges" | "buildDiffContent">),
        pendingChanges: null,
        buildDiffContent: () => ""
      });
    }
  } catch {}
}

/**
 * Persists the in-memory cache-break state to disk (Cowork mode only).
 * The non-serializable fields (`buildDiffContent`, `pendingChanges`) are
 * stripped before writing. Writes are serialized through {@link persistQueue}.
 */
function persistCacheBreakState(): void {
  if (!isCowork()) return;
  try {
    let serializable: Record<string, Omit<CacheEntry, "buildDiffContent" | "pendingChanges">> = {};
    for (let [cacheKey, entry] of cacheEntries) {
      let {
        buildDiffContent: _omitBuildDiff,
        pendingChanges: _omitPending,
        ...rest
      } = entry;
      serializable[cacheKey] = rest;
    }
    let filePath = getCacheBreakStateFilePath(),
      json = bH(serializable);
    persistQueue = persistQueue.then(() => AM6.mkdir(Xx(), {
      recursive: !0,
      mode: 448
    })).then(() => AM6.writeFile(filePath, json)).catch(() => {});
  } catch {}
}

/** True when the model name denotes a Haiku model (cache-break tracking skipped). */
function isHaikuModel(model: string): boolean {
  return model.includes("haiku");
}

/**
 * Resolves the logical cache key for a request from its querySource (and
 * optional agent id). Returns null for query sources we do not track.
 */
function resolveCacheKey(querySource: string, agentId?: string): string | null {
  if (querySource === "compact") return "repl_main_thread";
  for (let prefix of CACHEABLE_QUERY_SOURCES) if (querySource.startsWith(prefix)) return agentId || querySource;
  return null;
}

/** Returns a copy of the blocks with any `cache_control` field removed. */
function stripCacheControl<T extends {
  cache_control?: unknown;
}>(blocks: T[]): Array<Omit<T, "cache_control"> | T> {
  return blocks.map(block => {
    if (!("cache_control" in block)) return block;
    let {
      cache_control: _omit,
      ...rest
    } = block;
    return rest;
  });
}

/** Returns the `.text` of a block when it is a string, else undefined. */
function getTextBlockText(block: TextBlock): string | undefined {
  let text = block.text;
  return typeof text === "string" ? text : void 0;
}

/** True when a block is the internal billing-header marker block. */
function isBillingHeaderBlock(block: TextBlock): boolean {
  return getTextBlockText(block)?.startsWith(BILLING_HEADER_PREFIX) ?? !1;
}

/**
 * Hashes any JSON-serializable value to a 32-bit number using Bun.hash over
 * its JSON form (truncating the bigint hash to its low 32 bits).
 */
function hashValue(value: unknown): number {
  let hash = Bun.hash(bH(value));
  return typeof hash === "bigint" ? Number(hash & 0xffffffffn) : hash;
}

/**
 * Redacts an MCP tool name for analytics: keeps the `mcp__<server>` prefix only
 * for the local-agent entrypoint or for known servers in {@link a28}, otherwise
 * collapses it to just `"mcp"`. Non-MCP names pass through unchanged.
 */
function redactMcpToolName(toolName: string): string {
  if (!toolName.startsWith("mcp__")) return toolName;
  let server = toolName.split("__")[1];
  if (!server) return "mcp";
  if (process.env.CLAUDE_CODE_ENTRYPOINT === "local-agent" || a28.has(server)) return `mcp__${server}`;
  return "mcp";
}

/**
 * Recursively replaces large inline image data (`source.data` over 256 chars)
 * with its length, so hashes stay stable and diagnostics stay small. Also
 * strips `cache_control` from the block before hashing.
 */
function redactLargeImageData(block: unknown): unknown {
  if (!block || typeof block !== "object") return block;
  let {
      cache_control: _omit,
      ...rest
    } = block as Record<string, unknown>,
    source = (rest as {
      source?: unknown;
    }).source;
  if (source && typeof source === "object") {
    let src = source as {
      data?: unknown;
      [key: string]: unknown;
    };
    if (typeof src.data === "string" && src.data.length > 256) return {
      ...rest,
      source: {
        ...src,
        data: src.data.length
      }
    };
  }
  if (Array.isArray((rest as {
    content?: unknown;
  }).content)) return {
    ...rest,
    content: (rest as {
      content: unknown[];
    }).content.map(redactLargeImageData)
  };
  return rest;
}

/** Hashes each message (role + redacted content) into an array of hashes. */
function hashMessages(messages: StoredMessage[]): number[] {
  return messages.map(message => {
    let content = message.message.content;
    return hashValue({
      role: message.message.role,
      content: Array.isArray(content) ? content.map(redactLargeImageData) : content
    });
  });
}

/**
 * Hashes each tool schema and keys it by tool name (falling back to
 * `__idx_<i>` when a name is missing).
 */
function hashPerTool(toolSchemas: unknown[], toolNames: string[]): Record<string, number> {
  let result: Record<string, number> = {};
  for (let i = 0; i < toolSchemas.length; i++) result[toolNames[i] ?? `__idx_${i}`] = hashValue(toolSchemas[i]);
  return result;
}

/** Sums the character lengths of all text blocks. */
function sumTextLength(blocks: TextBlock[]): number {
  let total = 0;
  for (let block of blocks) total += getTextBlockText(block)?.length ?? 0;
  return total;
}

/**
 * Builds a human-readable dump of the model, system prompt and tools, used as
 * the diagnostic "diff content" for a snapshot.
 */
function buildDiffContent(system: TextBlock[], toolSchemas: ToolSchema[], model: string): string {
  let systemText = system.map(block => block.text).join(`

`),
    toolsText = toolSchemas.map(tool => {
      if (!("name" in tool)) return "unknown";
      let description = "description" in tool ? tool.description : "",
        inputSchema = "input_schema" in tool ? bH(tool.input_schema) : "";
      return `${tool.name}
  description: ${description}
  input_schema: ${inputSchema}`;
    }).sort().join(`

`);
  return `Model: ${model}

=== System Prompt ===

${systemText}

=== Tools (${toolSchemas.length}) ===

${toolsText}
`;
}

/**
 * Records a snapshot of the current request for the resolved cache key. On the
 * first call for a key it just stores the baseline; on subsequent calls it
 * computes and stores the diff (`pendingChanges`) describing what changed since
 * the previous request, so a later cache break can be attributed to it.
 */
function recordRequestSnapshot(input: RequestSnapshotInput): void {
  try {
    let {
        system,
        toolSchemas,
        querySource,
        model,
        agentId,
        fastMode,
        globalCacheStrategy = "",
        betas = [],
        autoModeActive = !1,
        isUsingOverage = !1,
        is1hCacheTTL = !1,
        queryDepth,
        cacheDiagnosis = !1,
        effortValue,
        extraBodyParams,
        messagesForAPI
      } = input,
      cacheKey = resolveCacheKey(querySource, agentId);
    if (!cacheKey) return;
    let systemBlocks = stripCacheControl(system).filter(block => !isBillingHeaderBlock(block)) as TextBlock[],
      toolsStripped = stripCacheControl(toolSchemas),
      systemHash = hashValue(systemBlocks),
      toolsHash = hashValue(toolsStripped),
      cacheControlHash = hashValue(system.filter(block => !isBillingHeaderBlock(block)).map(block => "cache_control" in block ? block.cache_control : null)),
      toolNames = toolSchemas.map(tool => "name" in tool ? tool.name! : "unknown"),
      computePerToolHashes = () => hashPerTool(toolsStripped, toolNames),
      computePerBlockHashes = () => systemBlocks.map(block => hashValue(block)),
      computePerBlockLengths = () => systemBlocks.map(block => getTextBlockText(block)?.length ?? 0),
      systemCharCount = sumTextLength(systemBlocks),
      makeDiffContent = () => buildDiffContent(system, toolSchemas, model),
      fastModeFlag = fastMode ?? !1,
      sortedBetas = [...betas].sort(),
      effortValueStr = effortValue === void 0 ? "" : String(effortValue),
      extraBodyHash = extraBodyParams === void 0 ? 0 : hashValue(extraBodyParams),
      messageHashes = messagesForAPI ? hashMessages(messagesForAPI) : [];
    loadCacheBreakStateFromDisk();
    let entry = cacheEntries.get(cacheKey);
    if (!entry) {
      while (cacheEntries.size >= MAX_CACHE_ENTRIES) {
        let oldestKey = cacheEntries.keys().next().value;
        if (oldestKey !== void 0) cacheEntries.delete(oldestKey);
      }
      cacheEntries.set(cacheKey, {
        systemHash: systemHash,
        toolsHash: toolsHash,
        cacheControlHash: cacheControlHash,
        toolNames: toolNames,
        systemCharCount: systemCharCount,
        model: model,
        fastMode: fastModeFlag,
        globalCacheStrategy: globalCacheStrategy,
        betas: sortedBetas,
        autoModeActive: autoModeActive,
        isUsingOverage: isUsingOverage,
        is1hCacheTTL: is1hCacheTTL,
        queryDepth: queryDepth,
        cacheDiagnosis: cacheDiagnosis,
        effortValue: effortValueStr,
        extraBodyHash: extraBodyHash,
        callCount: 1,
        pendingChanges: null,
        prevCacheReadTokens: null,
        cacheDeletionsPending: !1,
        messageHashes: messageHashes,
        buildDiffContent: makeDiffContent,
        perToolHashes: computePerToolHashes(),
        perBlockHashes: computePerBlockHashes(),
        perBlockLengths: computePerBlockLengths()
      }), persistCacheBreakState();
      return;
    }
    entry.callCount++;
    let systemPromptChanged = systemHash !== entry.systemHash,
      toolSchemasChanged = toolsHash !== entry.toolsHash,
      modelChanged = model !== entry.model,
      fastModeChanged = fastModeFlag !== entry.fastMode,
      cacheControlChanged = cacheControlHash !== entry.cacheControlHash,
      globalCacheStrategyChanged = globalCacheStrategy !== entry.globalCacheStrategy,
      betasChanged = sortedBetas.length !== entry.betas.length || sortedBetas.some((beta, i) => beta !== entry.betas[i]),
      autoModeChanged = autoModeActive !== entry.autoModeActive,
      overageChanged = isUsingOverage !== entry.isUsingOverage,
      cacheDiagnosisChanged = cacheDiagnosis !== entry.cacheDiagnosis,
      effortChanged = effortValueStr !== entry.effortValue,
      extraBodyChanged = extraBodyHash !== entry.extraBodyHash,
      firstChangedMessageIndex = entry.messageHashes.findIndex((hash, i) => messageHashes[i] !== hash),
      messagesHistoryChanged = firstChangedMessageIndex !== -1;
    if (systemPromptChanged || toolSchemasChanged || modelChanged || fastModeChanged || cacheControlChanged || globalCacheStrategyChanged || betasChanged || autoModeChanged || overageChanged || cacheDiagnosisChanged || effortChanged || extraBodyChanged || messagesHistoryChanged) {
      let prevToolNameSet = new Set(entry.toolNames),
        newToolNameSet = new Set(toolNames),
        prevBetaSet = new Set(entry.betas),
        newBetaSet = new Set(sortedBetas),
        addedTools = toolNames.filter(name => !prevToolNameSet.has(name)),
        removedTools = entry.toolNames.filter(name => !newToolNameSet.has(name)),
        changedToolSchemas: string[] = [];
      if (toolSchemasChanged) {
        let perToolHashes = computePerToolHashes();
        for (let name of toolNames) {
          if (!prevToolNameSet.has(name)) continue;
          if (perToolHashes[name] !== entry.perToolHashes[name]) changedToolSchemas.push(name);
        }
        entry.perToolHashes = perToolHashes;
      }
      let prevBlockCount = entry.perBlockHashes.length,
        newBlockCount = systemBlocks.length,
        changedBlockIndices: number[] = [],
        changedBlockLengthDeltas: number[] = [];
      if (systemPromptChanged) {
        let perBlockHashes = computePerBlockHashes(),
          perBlockLengths = computePerBlockLengths();
        if (newBlockCount === prevBlockCount) {
          for (let i = 0; i < newBlockCount; i++) if (perBlockHashes[i] !== entry.perBlockHashes[i]) changedBlockIndices.push(i), changedBlockLengthDeltas.push(perBlockLengths[i] - entry.perBlockLengths[i]);
        }
        entry.perBlockHashes = perBlockHashes, entry.perBlockLengths = perBlockLengths;
      }
      entry.pendingChanges = {
        systemPromptChanged: systemPromptChanged,
        toolSchemasChanged: toolSchemasChanged,
        modelChanged: modelChanged,
        fastModeChanged: fastModeChanged,
        cacheControlChanged: cacheControlChanged,
        globalCacheStrategyChanged: globalCacheStrategyChanged,
        betasChanged: betasChanged,
        autoModeChanged: autoModeChanged,
        overageChanged: overageChanged,
        cacheDiagnosisChanged: cacheDiagnosisChanged,
        effortChanged: effortChanged,
        extraBodyChanged: extraBodyChanged,
        messagesHistoryChanged: messagesHistoryChanged,
        firstChangedMessageIndex: firstChangedMessageIndex,
        prevMessageCount: entry.messageHashes.length,
        addedToolCount: addedTools.length,
        removedToolCount: removedTools.length,
        addedTools: addedTools,
        removedTools: removedTools,
        changedToolSchemas: changedToolSchemas,
        prevBlockCount: prevBlockCount,
        newBlockCount: newBlockCount,
        changedBlockIndices: changedBlockIndices,
        changedBlockLengthDeltas: changedBlockLengthDeltas,
        systemCharDelta: systemCharCount - entry.systemCharCount,
        previousModel: entry.model,
        newModel: model,
        prevGlobalCacheStrategy: entry.globalCacheStrategy,
        newGlobalCacheStrategy: globalCacheStrategy,
        addedBetas: sortedBetas.filter(beta => !prevBetaSet.has(beta)),
        removedBetas: entry.betas.filter(beta => !newBetaSet.has(beta)),
        prevEffortValue: entry.effortValue,
        newEffortValue: effortValueStr,
        buildPrevDiffContent: entry.buildDiffContent
      };
    } else entry.pendingChanges = null;
    entry.systemHash = systemHash, entry.toolsHash = toolsHash, entry.cacheControlHash = cacheControlHash, entry.toolNames = toolNames, entry.systemCharCount = systemCharCount, entry.model = model, entry.fastMode = fastModeFlag, entry.globalCacheStrategy = globalCacheStrategy, entry.betas = sortedBetas, entry.autoModeActive = autoModeActive, entry.isUsingOverage = isUsingOverage, entry.is1hCacheTTL = is1hCacheTTL, entry.queryDepth = queryDepth, entry.cacheDiagnosis = cacheDiagnosis, entry.effortValue = effortValueStr, entry.extraBodyHash = extraBodyHash, entry.messageHashes = messageHashes, entry.buildDiffContent = makeDiffContent, persistCacheBreakState();
  } catch (error) {
    EH(error);
  }
}

/**
 * Called when a response's cache-read token count is observed. Detects an
 * unexpected drop relative to the previous request, attributes it to the
 * recorded `pendingChanges` (or to TTL expiry / server-side cause when nothing
 * changed), emits a `tengu_prompt_cache_break` analytics event, and logs a
 * warning. Skips Haiku models and untracked query sources.
 *
 * @param querySource         the query source for this request
 * @param cacheReadTokens     cache_read_input_tokens from this response
 * @param cacheCreationTokens cache_creation_input_tokens from this response
 * @param messages            conversation messages (to find last assistant msg)
 * @param agentId             optional agent id for cache-key resolution
 * @param requestId           optional request id, for analytics
 * @param previousMessageId   optional previous message id, for analytics
 */
async function recordCacheBreak(querySource: string, cacheReadTokens: number, cacheCreationTokens: number, messages: StoredMessage[], agentId: string | undefined, requestId?: string, previousMessageId?: string): Promise<void> {
  let cacheKey = resolveCacheKey(querySource, agentId);
  if (!cacheKey) return;
  let entry = cacheEntries.get(cacheKey);
  if (!entry) return;
  if (isHaikuModel(entry.model)) return;
  try {
    let prevCacheReadTokens = entry.prevCacheReadTokens;
    entry.prevCacheReadTokens = cacheReadTokens;
    let lastAssistantMsg = messages.findLast(message => message.type === "assistant"),
      timeSinceLastAssistantMsg = lastAssistantMsg ? Date.now() - new Date(lastAssistantMsg.timestamp).getTime() : null;
    if (prevCacheReadTokens === null) return;
    let pendingChanges = entry.pendingChanges;
    if (entry.cacheDeletionsPending) {
      entry.cacheDeletionsPending = !1, N(`[PROMPT CACHE] cache deletion applied, cache read: ${prevCacheReadTokens} → ${cacheReadTokens} (expected drop)`), entry.pendingChanges = null;
      return;
    }
    let cacheReadDrop = prevCacheReadTokens - cacheReadTokens;
    if (cacheReadTokens >= prevCacheReadTokens * 0.95 || cacheReadDrop < MIN_CACHE_DROP_THRESHOLD) {
      entry.pendingChanges = null;
      return;
    }
    let reasons: string[] = [];
    if (pendingChanges) {
      if (pendingChanges.modelChanged) reasons.push(`model changed (${pendingChanges.previousModel} → ${pendingChanges.newModel})`);
      if (pendingChanges.systemPromptChanged) {
        let delta = pendingChanges.systemCharDelta,
          deltaText = delta === 0 ? "" : delta > 0 ? ` (+${delta} chars)` : ` (${delta} chars)`;
        reasons.push(`system prompt changed${deltaText}`);
      }
      if (pendingChanges.toolSchemasChanged) {
        let toolDelta = pendingChanges.addedToolCount > 0 || pendingChanges.removedToolCount > 0 ? ` (+${pendingChanges.addedToolCount}/-${pendingChanges.removedToolCount} tools)` : " (tool prompt/schema changed, same tool set)";
        reasons.push(`tools changed${toolDelta}`);
      }
      if (pendingChanges.fastModeChanged) reasons.push("fast mode toggled");
      if (pendingChanges.globalCacheStrategyChanged) reasons.push(`global cache strategy changed (${pendingChanges.prevGlobalCacheStrategy || "none"} → ${pendingChanges.newGlobalCacheStrategy || "none"})`);
      if (pendingChanges.cacheControlChanged && !pendingChanges.globalCacheStrategyChanged && !pendingChanges.systemPromptChanged) reasons.push("cache_control changed (scope or TTL)");
      if (pendingChanges.betasChanged) {
        let added = pendingChanges.addedBetas.length ? `+${pendingChanges.addedBetas.join(",")}` : "",
          removed = pendingChanges.removedBetas.length ? `-${pendingChanges.removedBetas.join(",")}` : "",
          betaDelta = [added, removed].filter(Boolean).join(" ");
        reasons.push(`betas changed${betaDelta ? ` (${betaDelta})` : ""}`);
      }
      if (pendingChanges.autoModeChanged) reasons.push("auto mode toggled");
      if (pendingChanges.overageChanged) reasons.push("overage state changed (TTL flip expected)");
      if (pendingChanges.cacheDiagnosisChanged) reasons.push("cache diagnosis toggled");
      if (pendingChanges.effortChanged) reasons.push(`effort changed (${pendingChanges.prevEffortValue || "default"} → ${pendingChanges.newEffortValue || "default"})`);
      if (pendingChanges.extraBodyChanged) reasons.push("extra body params changed");
      if (pendingChanges.messagesHistoryChanged) reasons.push(`message history mutated at index ${pendingChanges.firstChangedMessageIndex}/${pendingChanges.prevMessageCount}`);
    }
    let lastAssistantMsgOver5minAgo = timeSinceLastAssistantMsg !== null && timeSinceLastAssistantMsg > FIVE_MIN_MS,
      lastAssistantMsgOver1hAgo = timeSinceLastAssistantMsg !== null && timeSinceLastAssistantMsg > ONE_HOUR_MS,
      cause: string;
    if (reasons.length > 0) cause = reasons.join(", ");else if (lastAssistantMsgOver1hAgo) cause = "possible 1h TTL expiry (prompt unchanged)";else if (lastAssistantMsgOver5minAgo) cause = "possible 5min TTL expiry (prompt unchanged)";else if (timeSinceLastAssistantMsg !== null) cause = "likely server-side (prompt unchanged, <5min gap)";else cause = "unknown cause";
    c("tengu_prompt_cache_break", {
      systemPromptChanged: pendingChanges?.systemPromptChanged ?? !1,
      toolSchemasChanged: pendingChanges?.toolSchemasChanged ?? !1,
      modelChanged: pendingChanges?.modelChanged ?? !1,
      fastModeChanged: pendingChanges?.fastModeChanged ?? !1,
      cacheControlChanged: pendingChanges?.cacheControlChanged ?? !1,
      globalCacheStrategyChanged: pendingChanges?.globalCacheStrategyChanged ?? !1,
      betasChanged: pendingChanges?.betasChanged ?? !1,
      autoModeChanged: pendingChanges?.autoModeChanged ?? !1,
      overageChanged: pendingChanges?.overageChanged ?? !1,
      cacheDiagnosisChanged: pendingChanges?.cacheDiagnosisChanged ?? !1,
      effortChanged: pendingChanges?.effortChanged ?? !1,
      extraBodyChanged: pendingChanges?.extraBodyChanged ?? !1,
      messagesHistoryChanged: pendingChanges?.messagesHistoryChanged ?? !1,
      firstChangedMessageIndex: pendingChanges?.firstChangedMessageIndex ?? -1,
      addedToolCount: pendingChanges?.addedToolCount ?? 0,
      removedToolCount: pendingChanges?.removedToolCount ?? 0,
      systemCharDelta: pendingChanges?.systemCharDelta ?? 0,
      prevBlockCount: pendingChanges?.prevBlockCount ?? 0,
      newBlockCount: pendingChanges?.newBlockCount ?? 0,
      changedBlockIndices: (pendingChanges?.changedBlockIndices ?? []).join(","),
      changedBlockLengthDeltas: (pendingChanges?.changedBlockLengthDeltas ?? []).join(","),
      addedTools: (pendingChanges?.addedTools ?? []).map(redactMcpToolName).join(","),
      removedTools: (pendingChanges?.removedTools ?? []).map(redactMcpToolName).join(","),
      changedToolSchemas: (pendingChanges?.changedToolSchemas ?? []).map(redactMcpToolName).join(","),
      addedBetas: (pendingChanges?.addedBetas ?? []).join(","),
      removedBetas: (pendingChanges?.removedBetas ?? []).join(","),
      prevGlobalCacheStrategy: pendingChanges?.prevGlobalCacheStrategy ?? "",
      newGlobalCacheStrategy: pendingChanges?.newGlobalCacheStrategy ?? "",
      systemHash: entry.systemHash,
      toolsHash: entry.toolsHash,
      is1hCacheTTL: entry.is1hCacheTTL,
      queryDepth: entry.queryDepth,
      querySource: RY(querySource),
      model: entry.model,
      globalCacheStrategy: entry.globalCacheStrategy,
      callNumber: entry.callCount,
      prevCacheReadTokens: prevCacheReadTokens,
      cacheReadTokens: cacheReadTokens,
      cacheCreationTokens: cacheCreationTokens,
      timeSinceLastAssistantMsg: timeSinceLastAssistantMsg ?? -1,
      lastAssistantMsgOver5minAgo: lastAssistantMsgOver5minAgo,
      lastAssistantMsgOver1hAgo: lastAssistantMsgOver1hAgo,
      isCowork: oH.CLAUDE_CODE_IS_COWORK,
      isDesktop: isClaudeDesktop(),
      requestId: requestId ?? "",
      previousMessageId: previousMessageId ?? ""
    });
    let diffContent: string | undefined,
      diffSuffix = diffContent ? `, diff: ${diffContent}` : "",
      logMessage = `[PROMPT CACHE BREAK] ${cause} [source=${querySource}, call #${entry.callCount}, cache read: ${prevCacheReadTokens} → ${cacheReadTokens}, creation: ${cacheCreationTokens}${diffSuffix}]`;
    N(logMessage, {
      level: "warn"
    }), entry.pendingChanges = null;
  } catch (error) {
    EH(error);
  } finally {
    persistCacheBreakState();
  }
}

/**
 * Records a `tengu_prompt_cache_diagnosis_received` analytics event from a
 * server-provided cache-diagnosis payload.
 */
function recordCacheDiagnosis(diagnosis: CacheDiagnosis, context: CacheDiagnosisContext): void {
  try {
    c("tengu_prompt_cache_diagnosis_received", {
      diagnosisType: diagnosis.type,
      tokensMissed: diagnosis.cache_missed_input_tokens ?? -1,
      requestId: context.requestId ?? "",
      previousMessageId: context.previousMessageId ?? "",
      model: context.model,
      isCowork: oH.CLAUDE_CODE_IS_COWORK,
      is1hCacheTTL: context.is1hCacheTTL,
      querySource: RY(context.querySource),
      queryDepth: context.queryDepth
    });
  } catch (error) {
    EH(error);
  }
}

/**
 * Marks the entry for a cache key as having a pending explicit cache deletion,
 * so the next observed cache-read drop is treated as expected.
 */
function markCacheDeletionPending(querySource: string, agentId?: string): void {
  let cacheKey = resolveCacheKey(querySource, agentId),
    entry = cacheKey ? cacheEntries.get(cacheKey) : void 0;
  if (entry) entry.cacheDeletionsPending = !0, persistCacheBreakState();
}

/**
 * Resets the recorded previous cache-read token count for a cache key, so the
 * next observation does not trigger a false cache-break diagnosis.
 */
function resetCacheReadTokens(querySource: string, cacheKey?: string): void {
  let resolvedKey = cacheKey ?? resolveCacheKey(querySource),
    entry = resolvedKey ? cacheEntries.get(resolvedKey) : void 0;
  if (entry) entry.prevCacheReadTokens = null, persistCacheBreakState();
}

/** Deletes the snapshot entry for a specific cache key. */
function deleteCacheEntry(cacheKey: string): void {
  cacheEntries.delete(cacheKey), persistCacheBreakState();
}

/** Clears all cache-break state and resets the disk-load flag. */
function clearCacheState(): void {
  cacheEntries.clear(), cacheBreakStateLoaded = !1, persistCacheBreakState();
}

// ---------------------------------------------------------------------------
// Module-level state (lazily initialized in the module init block below).
// ---------------------------------------------------------------------------

/** node "fs" module. */
var oN7: typeof import("fs"),
  /** node "fs/promises" module. */
  AM6: typeof import("fs/promises"),
  /** node "path" module. */
  aN7: typeof import("path"),
  /** cacheKey -> last-request snapshot. */
  cacheEntries: Map<string, CacheEntry>,
  /** Lazily-built zod schema for the persisted cache-break state. */
  getCacheStateSchema: () => Zod.ZodType<Record<string, Omit<CacheEntry, "pendingChanges" | "buildDiffContent">>>,
  /** Whether on-disk state has already been loaded this process. */
  cacheBreakStateLoaded = !1,
  /** Promise chain that serializes async writes to the state file. */
  persistQueue: Promise<void>,
  /** Maximum number of cache-key entries kept in memory (LRU-ish eviction). */
  MAX_CACHE_ENTRIES = 10,
  /** Query-source prefixes whose requests are tracked for cache breaks. */
  CACHEABLE_QUERY_SOURCES: string[],
  /** Minimum cache-read token drop to be considered a real cache break. */
  MIN_CACHE_DROP_THRESHOLD = 2000,
  /** 5 minutes, in ms (default cache TTL boundary). */
  FIVE_MIN_MS = 300000,
  /** 1 hour, in ms (extended cache TTL boundary). */
  ONE_HOUR_MS = 3600000,
  /** Marker prefix identifying the internal billing-header system block. */
  BILLING_HEADER_PREFIX = "x-anthropic-billing-header:";

/** Lazy module initializer. */
var pPH = L(() => {
  w_();
  FH();
  _q();
  S6();
  o$();
  H6();
  r2();
  y_();
  E3();
  oN7 = require("fs"), AM6 = require("fs/promises"), aN7 = require("path");
  cacheEntries = new Map();
  getCacheStateSchema = kH(() => k6.record(k6.string(), k6.object({
    systemHash: k6.number(),
    toolsHash: k6.number(),
    cacheControlHash: k6.number(),
    toolNames: k6.array(k6.string()),
    perToolHashes: k6.record(k6.string(), k6.number()),
    perBlockHashes: k6.array(k6.number()),
    perBlockLengths: k6.array(k6.number()),
    systemCharCount: k6.number(),
    model: k6.string(),
    fastMode: k6.boolean(),
    globalCacheStrategy: k6.string(),
    betas: k6.array(k6.string()),
    autoModeActive: k6.boolean(),
    isUsingOverage: k6.boolean(),
    is1hCacheTTL: k6.boolean().default(!1),
    queryDepth: k6.number().optional(),
    cacheDiagnosis: k6.boolean().default(!1),
    effortValue: k6.string(),
    extraBodyHash: k6.number(),
    callCount: k6.number(),
    prevCacheReadTokens: k6.number().nullable(),
    cacheDeletionsPending: k6.boolean(),
    messageHashes: k6.array(k6.number())
  })));
  persistQueue = Promise.resolve();
  CACHEABLE_QUERY_SOURCES = ["repl_main_thread", "sdk", "agent:custom", "agent:default", "agent:builtin"];
});
export {isClaudeDesktop as K2i,isCoworkOrDesktop as Iz,isCowork as z2i,getCacheBreakStateFilePath as Y2i,loadCacheBreakStateFromDisk as xxd,persistCacheBreakState as V2e,isHaikuModel as Pxd,resolveCacheKey as _Rn,stripCacheControl as j2i,getTextBlockText as x5r,isBillingHeaderBlock as W2i,hashValue as G2e,redactMcpToolName as v5r,redactLargeImageData as J2i,hashMessages as Lxd,hashPerTool as Mxd,sumTextLength as Nxd,buildDiffContent as Bxd,recordRequestSnapshot as X2i,recordCacheBreak as Q2i,recordCacheDiagnosis as Z2i,markCacheDeletionPending as e$i,resetCacheReadTokens as IOt,deleteCacheEntry as t$i,clearCacheState as n$i,oN7 as G2i,AM6 as gRn,aN7 as V2i,cacheEntries as tW,getCacheStateSchema as Rxd,cacheBreakStateLoaded as w5r,persistQueue as q2i,MAX_CACHE_ENTRIES as kxd,CACHEABLE_QUERY_SOURCES as Hxd,MIN_CACHE_DROP_THRESHOLD as Ixd,FIVE_MIN_MS as Dxd,ONE_HOUR_MS as R5r,BILLING_HEADER_PREFIX as Oxd,pPH as oxe};
