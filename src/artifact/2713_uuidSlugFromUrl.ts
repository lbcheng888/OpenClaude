// @ts-nocheck
import {ft,b} from "../../runtime.ts";
// @ts-nocheck
/** Tool description text for the WaitForMcpServers tool. */
function waitForMcpServersDescription() {
  return ["Wait for MCP servers that are still connecting and whose tools are not", "yet in your tool list. Pass `servers` to wait for specific ones, or omit", "it to wait for all pending servers.", "", "If the user's request needs tools from a still-connecting server, call this", "tool to wait for it. Once it connects, its tools will be added to your tool", "list and you can use them directly. Returns ready=true when servers are", "ready, ready=false if they failed to connect, need authentication, or are", "disabled.", "", "You do not need to ask the user for confirmation to use this tool."].join(`
`);
}
var WAIT_FOR_MCP_SERVERS_TOOL_NAME = "WaitForMcpServers";
/** Lazily-populated export namespace for the artifact URL/title helpers. */
var artifactModuleExports = {};
ft(artifactModuleExports, {
  uuidSlugFromUrl: () => uuidSlugFromUrl,
  sanitizeArtifactTitle: () => sanitizeArtifactTitle,
  parseArtifactUrl: () => parseArtifactUrl,
  extractHtmlTitle: () => extractHtmlTitle,
  TITLE_SCAN_BYTES: () => TITLE_SCAN_BYTES,
  ArtifactInputError: () => ArtifactInputError,
  ARTIFACT_TOOL_NAME: () => ARTIFACT_TOOL_NAME
});
/**
 * Parse a Claude artifact/frame URL into its UUID slug and environment.
 * Recognises prod claude.ai, staging claude-ai.staging.ant.dev, and
 * claudeusercontent.com frame hosts. Returns null when no pattern matches.
 */
function parseArtifactUrl(url: string): { slug: string; env: "prod" | "staging" } | null {
  let prodMatch = url.match(new RegExp(`^https://(?:[a-z0-9-]+\\.)?claude\\.ai/code/(?:artifact|frame)/(${UUID_PATTERN})(?:[/?#]|$)`));
  if (prodMatch?.[1]) return {
    slug: prodMatch[1],
    env: "prod"
  };
  let stagingMatch = url.match(new RegExp(`^https://(?:preview\\.)?claude-ai\\.staging\\.ant\\.dev/code/(?:artifact|frame)/(${UUID_PATTERN})(?:[/?#]|$)`));
  if (stagingMatch?.[1]) return {
    slug: stagingMatch[1],
    env: "staging"
  };
  let frameMatch = url.match(new RegExp(`^https://(${UUID_PATTERN})\\.frame\\.(staging\\.)?claudeusercontent\\.com(?:[/?#]|$)`));
  if (frameMatch?.[1]) return {
    slug: frameMatch[1],
    env: frameMatch[2] ? "staging" : "prod"
  };
  return null;
}
/** Extract just the UUID slug from an artifact URL, or null. */
function uuidSlugFromUrl(url: string): string | null {
  return parseArtifactUrl(url)?.slug ?? null;
}
/**
 * Pull the <title> text out of an HTML head fragment, decoding HTML entities
 * and sanitizing the result. Strips comments and any trailing <svg> content
 * before searching. Returns null when no title is found.
 */
function extractHtmlTitle(html: string): string | null {
  let scanned = html.slice(0, HTML_SCAN_BYTES).replace(/<!--[\s\S]*?(?:-->|$)/g, ""),
    svgIndex = scanned.search(/<svg/i);
  if (svgIndex !== -1) scanned = scanned.slice(0, svgIndex);
  let titleContent = scanned.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (titleContent === void 0) return null;
  let decoded = titleContent.replace(HTML_ENTITY_PATTERN, (entityMatch: string, entityBody: string) => {
    if (entityBody.startsWith("#")) {
      let codePoint = entityBody[1] === "x" || entityBody[1] === "X" ? parseInt(entityBody.slice(2), 16) : parseInt(entityBody.slice(1), 10);
      return codePoint <= 1114111 && (codePoint < 55296 || codePoint > 57343) ? String.fromCodePoint(codePoint) : entityMatch;
    }
    return NAMED_ENTITIES[entityBody.toLowerCase()] ?? entityMatch;
  });
  return sanitizeArtifactTitle(decoded);
}
/**
 * Normalize an artifact title: replace control characters with spaces,
 * collapse whitespace, trim, and truncate to MAX_TITLE_LENGTH code points.
 * Returns null for an empty result.
 */
function sanitizeArtifactTitle(title: string): string | null {
  let normalized = Array.from(title, (char: string) => {
    let codePoint = char.codePointAt(0) ?? 0;
    return codePoint <= 31 || codePoint >= 127 && codePoint <= 159 ? " " : char;
  }).join("").replace(/\s+/g, " ").trim();
  if (normalized === "") return null;
  let chars = Array.from(normalized);
  return chars.length > MAX_TITLE_LENGTH ? chars.slice(0, MAX_TITLE_LENGTH).join("") : normalized;
}
var ARTIFACT_TOOL_NAME = "Artifact",
  ArtifactInputError,
  /** Lowercase canonical UUID pattern used to capture artifact slugs. */
  UUID_PATTERN = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}",
  /** Byte budget for the initial HTML head scan. */
  HTML_SCAN_BYTES = 8192,
  TITLE_SCAN_BYTES,
  /** Maximum title length in code points. */
  MAX_TITLE_LENGTH = 280,
  HTML_ENTITY_PATTERN,
  NAMED_ENTITIES;
/** Deferred initializer for the artifact module's mutable bindings. */
var initArtifactModule = b(() => {
  ArtifactInputError = class ArtifactInputError extends Error {
    reasonCode;
    constructor(message: string, reasonCode?: string) {
      super(message);
      this.name = "ArtifactInputError", this.reasonCode = reasonCode;
    }
  };
  TITLE_SCAN_BYTES = HTML_SCAN_BYTES * 4, HTML_ENTITY_PATTERN = /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, NAMED_ENTITIES = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: "\xA0"
  };
});

export {waitForMcpServersDescription as eKr,WAIT_FOR_MCP_SERVERS_TOOL_NAME as hke,artifactModuleExports as _Mt,parseArtifactUrl,uuidSlugFromUrl,extractHtmlTitle,sanitizeArtifactTitle,ARTIFACT_TOOL_NAME,ArtifactInputError,UUID_PATTERN as tKr,HTML_SCAN_BYTES as y3i,TITLE_SCAN_BYTES,MAX_TITLE_LENGTH as _3i,HTML_ENTITY_PATTERN as tOd,NAMED_ENTITIES as nOd,initArtifactModule as iee};
