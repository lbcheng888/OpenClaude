// @ts-nocheck
import {ARTIFACT_TOOL_NAME as FzH,uuidSlugFromUrl as Xe,sanitizeArtifactTitle as BD6,XAe as gzH} from "./2701_uuidSlugFromUrl.ts";
import {nb as QJ} from "../config/2668_ree.ts";
import {b as L} from "../../runtime.ts";
/**
 * Artifact subsystem — frame URL / artifact-read state derivation.
 *
 * This module reconstructs the current set of published "frame" URLs and the
 * versions of artifacts that have been read, by replaying a conversation
 * transcript. The frame backend publishes local HTML/Markdown to claude.ai web
 * pages; each successful `Artifact` tool call records the page URL, its local
 * source path and version, while each `WebFetch` tool call that resolved an
 * artifact records the slug/version it observed.
 *
 * `ur6` is the public entry point (consumed by other modules); it is kept under
 * its original mangled name because callers reference it across module
 * boundaries.
 */

// --- Cross-module references (resolved at runtime, kept as-is) ---
// FzH  -> "Artifact" tool name
// QJ   -> "WebFetch" tool name
// Xe(url)   -> extracts the artifact slug from a claude.ai code URL, or null
// BD6(title) -> sanitizes/truncates a title string, or null if empty
// L(fn)     -> ESM lazy module-init wrapper
// gzH()     -> init dependency that defines Xe / BD6 / FzH
declare const FzH: string;
declare const QJ: string;
declare function Xe(url: string): string | null;
declare function BD6(title: string): string | null;
declare function L<T>(init: () => T): () => T;
declare function gzH(): void;

/** A single entry in the conversation transcript. */
interface TranscriptEntry {
  type: "assistant" | "user" | string;
  message: { content: unknown };
  /** Tool result payload attached to a `user` entry carrying a `tool_result`. */
  toolUseResult?: unknown;
  /** ISO timestamp string of the entry. */
  timestamp?: string;
}

/** Assistant `tool_use` content block. */
interface ToolUseBlock {
  type: "tool_use";
  id: string;
  name: string;
}

/** User `tool_result` content block. */
interface ToolResultBlock {
  type: "tool_result";
  tool_use_id?: string;
}

/** Result payload produced by a successful `Artifact` tool call. */
interface ArtifactToolResult {
  url: string;
  path: string;
  title?: string;
  version?: string;
  mcpDropped?: string;
}

/** Result payload produced by a `WebFetch` tool call that resolved an artifact. */
interface WebFetchToolResult {
  artifactRead?: {
    slug: string;
    ver: string;
  };
}

/** Metadata recorded for a published frame, keyed by its local source path. */
interface FrameUrlEntry {
  url: string;
  updatedAt: number;
  title?: string;
}

/** Map from local source path -> published frame metadata. */
type FrameUrlMap = Record<string, FrameUrlEntry>;

/** Map from artifact slug -> version string. */
type ArtifactVersionMap = Record<string, string>;

/** Combined state derived from the transcript. */
interface ArtifactTranscriptState {
  /** Map from local source path -> published frame metadata. */
  frameUrls: FrameUrlMap;
  /** Map from artifact slug -> last-read version. */
  artifactReadVersions: ArtifactVersionMap;
}

/**
 * Replays a conversation transcript and derives the current frame-URL and
 * artifact-read-version state.
 *
 * It first collects the tool_use ids that belong to `Artifact` and `WebFetch`
 * calls, then walks the matching `tool_result` entries to fold their payloads
 * into the accumulated state.
 *
 * @param transcript Ordered list of transcript entries.
 * @returns The published frame slug->version map and the read slug->version map.
 */
function ur6(transcript: TranscriptEntry[]): ArtifactTranscriptState {
  let artifactToolUseIds = new Set<string>(),
    webFetchToolUseIds = new Set<string>();
  for (let entry of transcript) {
    if (entry.type !== "assistant" || !Array.isArray(entry.message.content)) continue;
    for (let block of entry.message.content as ToolUseBlock[])
      if (block.type === "tool_use") {
        if (block.name === FzH) artifactToolUseIds.add(block.id);
        else if (block.name === QJ) webFetchToolUseIds.add(block.id);
      }
  }
  let frameUrls: FrameUrlMap = {},
    artifactReadVersions: ArtifactVersionMap = {};
  for (let entry of transcript) {
    if (entry.type !== "user" || !Array.isArray(entry.message.content)) continue;
    for (let block of entry.message.content as ToolResultBlock[]) {
      if (block.type !== "tool_result" || !block.tool_use_id) continue;
      if (artifactToolUseIds.has(block.tool_use_id))
        applyArtifactResult(entry.toolUseResult, entry.timestamp, frameUrls, artifactReadVersions);
      else if (webFetchToolUseIds.has(block.tool_use_id))
        applyWebFetchArtifactRead(entry.toolUseResult, artifactReadVersions);
    }
  }
  return {
    frameUrls,
    artifactReadVersions,
  };
}

/**
 * Folds one `Artifact` tool result into the accumulated frame-URL state.
 *
 * Resolves the artifact slug from the published URL, evicts any stale entry that
 * points at the same slug under a different local path (and the current path's
 * prior entry), then records the fresh URL, update time and sanitized title.
 * When the result carries a version, records it as the published version for
 * that slug.
 */
function applyArtifactResult(
  toolUseResult: unknown,
  timestamp: string | undefined,
  frameUrls: FrameUrlMap,
  publishedVersions: ArtifactVersionMap,
): void {
  let result = toolUseResult as ArtifactToolResult | null | undefined,
    slug = typeof result?.url === "string" ? Xe(result.url) : null;
  if (typeof result?.url !== "string" || slug === null || typeof result.path !== "string") return;
  for (let [path, entry] of Object.entries(frameUrls))
    if (path !== result.path && Xe(entry.url) === slug) delete frameUrls[path];
  delete frameUrls[result.path];
  let title = typeof result.title === "string" ? BD6(result.title) : null;
  if (
    ((frameUrls[result.path] = {
      url: result.url,
      updatedAt: Date.parse(timestamp as string) || 0,
      ...(title !== null && {
        title,
      }),
    }),
    typeof result.version === "string")
  )
    publishedVersions[slug] = result.version;
}

/**
 * Folds one `WebFetch` tool result into the accumulated artifact-read-version
 * state. Only counts reads whose slug round-trips through the canonical
 * claude.ai artifact URL (guarding against malformed slugs) and that carry a
 * version string.
 */
function applyWebFetchArtifactRead(toolUseResult: unknown, readVersions: ArtifactVersionMap): void {
  let artifactRead = (toolUseResult as WebFetchToolResult | null | undefined)?.artifactRead;
  if (
    !artifactRead ||
    typeof artifactRead.slug !== "string" ||
    Xe(`https://claude.ai/code/artifact/${artifactRead.slug}`) !== artifactRead.slug ||
    typeof artifactRead.ver !== "string"
  )
    return;
  readVersions[artifactRead.slug] = artifactRead.ver;
}

/** ESM lazy init: ensures the `Xe`/`BD6` dependency module is initialized. */
var dRq = L(() => {
  gzH();
});

export {ur6 as zQn,applyArtifactResult as U$m,applyWebFetchArtifactRead as $$m,dRq as r1o};
