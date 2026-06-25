// @ts-nocheck
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {b as L} from "../../runtime.ts";
import {Xo as H9,formatFileSize as f4} from "../../vendor/m240.ts";
// Image base64 size validation — guards against API-limit violations for
// inline base64 images embedded in user messages and tool_result blocks.
// Fires `tengu_image_api_validation_failed` telemetry and throws ImageSizeError
// when any image exceeds the configured per-image byte ceiling.

/** Returns true if `block` is an image content block with a base64 data source. */
function isBase64ImageBlock(block: unknown): block is {
  source: {
    type: "base64";
    data: string;
  };
  type: "image";
} {
  if (typeof block !== "object" || block === null) return !1;
  if (!("type" in block) || (block as any).type !== "image") return !1;
  if (!("source" in block) || typeof (block as any).source !== "object" || (block as any).source === null) return !1;
  let source = (block as any).source;
  return "type" in source && source.type === "base64" && "data" in source && typeof source.data === "string";
}

/** Returns true if `block` is a tool_result content block whose content is an array. */
function isToolResultBlock(block: unknown): block is {
  type: "tool_result";
  content: unknown[];
} {
  if (typeof block !== "object" || block === null) return !1;
  if (!("type" in block) || (block as any).type !== "tool_result") return !1;
  return "content" in (block as any) && Array.isArray((block as any).content);
}

/**
 * Validates a single base64 image block against `maxBytes`.
 * Emits `tengu_image_api_validation_failed` telemetry and appends to `violations`
 * when the encoded data length exceeds the limit.
 *
 * @param imageBlock  - A verified base64 image content block.
 * @param imageIndex  - 1-based sequential index of this image across all checked messages.
 * @param maxBytes    - Maximum allowed byte length of the base64-encoded data string.
 * @param violations  - Mutable array to which failed entries `{ index, size }` are pushed.
 */
function validateImageBase64Size(imageBlock: {
  source: {
    type: "base64";
    data: string;
  };
}, imageIndex: number, maxBytes: number, violations: Array<{
  index: number;
  size: number;
}>): void {
  let base64Length = imageBlock.source.data.length;
  if (base64Length > maxBytes) c("tengu_image_api_validation_failed", {
    base64_size_bytes: base64Length,
    max_bytes: maxBytes
  }), violations.push({
    index: imageIndex,
    size: base64Length
  });
}

/**
 * Walks `messages` looking for base64 image blocks (both direct and nested inside
 * tool_result blocks). Throws `ImageSizeError` if any image's base64 data exceeds
 * `maxBytes`. Safe to call before sending a request to the API.
 *
 * @param messages - The conversation message array to inspect (only "user" turns are scanned).
 * @param maxBytes - Maximum allowed base64-encoded byte length per image.
 */
function Bx_(messages: unknown[], maxBytes: number): void {
  let violations: Array<{
      index: number;
      size: number;
    }> = [],
    imageCounter = 0;
  for (let message of messages) {
    if (typeof message !== "object" || message === null) continue;
    if (!("type" in message) || (message as any).type !== "user") continue;
    if (!("message" in message) || typeof (message as any).message !== "object" || (message as any).message === null) continue;
    let userMessage = (message as any).message;
    if (!("content" in userMessage) || !Array.isArray(userMessage.content)) continue;
    for (let block of userMessage.content) {
      if (isBase64ImageBlock(block)) {
        validateImageBase64Size(block, ++imageCounter, maxBytes, violations);
        continue;
      }
      if (isToolResultBlock(block)) {
        for (let innerBlock of block.content) if (isBase64ImageBlock(innerBlock)) validateImageBase64Size(innerBlock, ++imageCounter, maxBytes, violations);
      }
    }
  }
  if (violations.length > 0) throw new l1_(violations, maxBytes);
}

/** Lazily-initialized ImageSizeError class — thrown when one or more images exceed the API byte limit. */
var l1_: {
  new (violations: Array<{
    index: number;
    size: number;
  }>, maxBytes: number): Error & {
    name: string;
  };
};
var ax6 = L(() => {
  y_();
  H9();
  l1_ = class l1_ extends Error {
    constructor(violations: Array<{
      index: number;
      size: number;
    }>, maxBytes: number) {
      let message: string,
        first = violations[0];
      if (violations.length === 1 && first) message = `Image base64 size (${f4(first.size)}) exceeds API limit (${f4(maxBytes)}). Please resize the image before sending.`;else message = `${violations.length} images exceed the API limit (${f4(maxBytes)}): ` + violations.map(entry => `Image ${entry.index}: ${f4(entry.size)}`).join(", ") + ". Please resize these images before sending.";
      super(message);
      this.name = "ImageSizeError";
    }
  };
});
export {isBase64ImageBlock as a6i,isToolResultBlock as e1d,validateImageBase64Size as l6i,Bx_ as JMt,l1_ as aot,ax6 as vHn};
