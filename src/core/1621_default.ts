// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {AnthropicBedrock as nW8,TPr as iW8} from "../../vendor/m1617.ts";
import {BaseAnthropic as PY} from "../api/0196_baseURL.ts";
import {AnthropicBedrockMantle as rW8,Bzs as Wr9} from "../../vendor/m1619.ts";
/**
 * Entry-point module for the `@anthropic-ai/bedrock-sdk` package.
 *
 * Registers exports for `AnthropicBedrock` (the standard Bedrock client),
 * `AnthropicBedrockMantle` (the Bedrock Mantle variant), and the shared
 * `BaseAnthropic` base class.  The module uses the lazy-init (`L`) pattern
 * so the heavy implementation chunks are only evaluated on first access.
 */

/** Module namespace object — populated by the `j_` export helper. */
var W2_: Record<string, unknown> = {};
j_(W2_, {
  /** Default export resolves to the `AnthropicBedrock` class. */
  default: () => nW8,
  /** Re-exported `BaseAnthropic` base class (cross-module ref). */
  BaseAnthropic: () => PY,
  /** `AnthropicBedrockMantle` client class (Bedrock Mantle variant). */
  AnthropicBedrockMantle: () => rW8,
  /** `AnthropicBedrock` client class (standard Bedrock). */
  AnthropicBedrock: () => nW8
});

/**
 * Lazy initialiser: triggers both implementation chunks so that
 * `AnthropicBedrock` (iW8) and `AnthropicBedrockMantle` (Wr9) are ready
 * before any export is consumed.
 */
var Z2_ = L(() => {
  iW8(); // initialise AnthropicBedrock implementation chunk
  Wr9(); // initialise AnthropicBedrockMantle implementation chunk
  iW8(); // second call matches the original bundle pattern (idempotent)
});
export {W2_ as zXe,Z2_ as jXe};
