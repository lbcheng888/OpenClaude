// @ts-nocheck
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {b as L} from "../../runtime.ts";
// Token-count estimation utilities.
//
// This module provides cheap, heuristic token estimates for strings and
// Anthropic-style message content blocks, without invoking a real tokenizer.
// The core heuristic is "chars per token": divide a string's character length
// by an estimated number of characters per token (default 4, or 2 for dense
// JSON-like text).
//
// Cross-module references are preserved exactly as recovered:
//   - `bH`  = JSON.stringify wrapper (config/0226_encoding.ts)
//   - `H6`  = lazy module initializer for the encoding module
//   - `L`   = esbuild __esm lazy-init helper (computer-use/0006_getPrototypeOf.ts)

/**
 * A single Anthropic-style content block. Only the fields used for token
 * estimation are modeled here; the discriminant `type` selects the shape.
 */
type ContentBlock = {
  type: "text";
  text: string;
} | {
  type: "image";
} | {
  type: "document";
} | {
  type: "tool_result";
  content: TokenCountableContent;
} | {
  type: "tool_use";
  name: string;
  input?: unknown;
} | {
  type: "thinking";
  thinking: string;
} | {
  type: "redacted_thinking";
  data: string;
} | {
  type: string;
  [key: string]: unknown;
};

/** Content that can be token-counted: a raw string, one block, or many blocks. */
type TokenCountableContent = string | ContentBlock | Array<string | ContentBlock> | null | undefined;

/**
 * Estimate the token count of a string from its character length.
 *
 * @param text          Text to measure. Non-strings yield 0.
 * @param charsPerToken Estimated characters per token (default 4).
 * @returns Rounded estimated token count.
 */
function estimateTokensFromLength(text: unknown, charsPerToken: number = 4): number {
  if (typeof text !== "string") return 0;
  return Math.round(text.length / charsPerToken);
}

/**
 * Pick the estimated chars-per-token ratio for a given text format.
 * JSON-family formats are denser, so they use 2 chars/token; everything else 4.
 *
 * @param format Format identifier (e.g. file extension or content kind).
 */
function charsPerTokenForFormat(format: string): number {
  switch (format) {
    case "json":
    case "jsonl":
    case "jsonc":
      return 2;
    default:
      return 4;
  }
}

/**
 * Estimate the token count of a string, using a format-specific
 * chars-per-token ratio.
 *
 * @param text   Text to measure.
 * @param format Format identifier passed to {@link charsPerTokenForFormat}.
 */
function estimateTokensForFormat(text: unknown, format: string): number {
  return estimateTokensFromLength(text, charsPerTokenForFormat(format));
}

/**
 * Estimate the token count of message content, which may be a raw string or
 * an array of content blocks.
 *
 * @param content       String content, an array of blocks, or null/undefined.
 * @param charsPerToken Chars-per-token ratio passed through to leaf estimates.
 */
function estimateContentTokens(content: TokenCountableContent, charsPerToken: number): number {
  if (!content) return 0;
  if (typeof content === "string") return estimateTokensFromLength(content, charsPerToken);
  let total = 0;
  for (let block of content as Array<string | ContentBlock>) {
    total += estimateContentBlockTokens(block, charsPerToken);
  }
  return total;
}

/**
 * Estimate the token count of a single content block (or raw string).
 * Images and documents use a fixed flat estimate of 2000 tokens.
 *
 * @param block         A string or a typed content block.
 * @param charsPerToken Chars-per-token ratio passed through to leaf estimates.
 */
function estimateContentBlockTokens(block: string | ContentBlock, charsPerToken: number): number {
  if (typeof block === "string") return estimateTokensFromLength(block, charsPerToken);
  if (block.type === "text") return estimateTokensFromLength(block.text, charsPerToken);
  if (block.type === "image" || block.type === "document") return 2000;
  if (block.type === "tool_result") return estimateContentTokens(block.content, charsPerToken);
  if (block.type === "tool_use") return estimateTokensFromLength(block.name + bH(block.input ?? {}), charsPerToken);
  if (block.type === "thinking") return estimateTokensFromLength(block.thinking, charsPerToken);
  if (block.type === "redacted_thinking") return estimateTokensFromLength(block.data, charsPerToken);
  return estimateTokensFromLength(bH(block), charsPerToken);
}

/**
 * Lazy module initializer for this token-counting module. On first call it
 * eagerly initializes the encoding module (`H6`) so that `bH`
 * (JSON.stringify) is available. Subsequent calls are no-ops.
 */
var ZC = L(() => {
  H6();
});
export {estimateTokensFromLength as pm,charsPerTokenForFormat as fPd,estimateTokensForFormat as I9i,estimateContentTokens as lke,estimateContentBlockTokens as hPd,ZC as l1};
