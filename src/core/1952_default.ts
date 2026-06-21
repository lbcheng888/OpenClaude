// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {AnthropicAws as tW8,WPr as eW8} from "../../vendor/m1950.ts";
import {BaseAnthropic as PY} from "../api/0194_baseURL.ts";
/**
 * Lazy module barrel for the `@anthropic-ai/foundry-sdk` integration.
 *
 * Exports `AnthropicFoundry` (the default Foundry client class) and re-exports
 * the shared `BaseAnthropic` base class so callers can type-check against the
 * common supertype.
 *
 * Usage (dynamic import pattern found throughout the codebase):
 *   Promise.resolve().then(() => (Nr9(), kr9))
 *   // → { default: AnthropicFoundry, BaseAnthropic, AnthropicFoundry }
 *
 * Compare to the analogous shims for:
 *   - AnthropicBedrock  (core/1780_default.ts)
 *   - AnthropicAws      (core/2116_default.ts)
 *   - AnthropicVertex   (core/2183_default.ts)
 *
 * Cross-module names preserved verbatim (bundle linkage):
 *   j_    – esbuild __export helper
 *   tW8   – AnthropicFoundry class (defined in the Foundry implementation chunk)
 *   PY    – BaseAnthropic base class
 *   eW8   – AnthropicFoundry module lazy-init trigger
 *   L     – esbuild __esm lazy module-init wrapper
 */

/** Module namespace object for dynamic import consumers. */
var kr9: Record<string, unknown> = {};

j_(kr9, {
  /** Default export resolves to the `AnthropicFoundry` class. */
  default: () => tW8,
  /** Re-exported `BaseAnthropic` base class (cross-module ref). */
  BaseAnthropic: () => PY,
  /** `AnthropicFoundry` client class. */
  AnthropicFoundry: () => tW8,
});

/**
 * Lazy initializer — must be called before accessing `kr9`.
 * Invokes the Foundry implementation chunk init twice to match the bundler's
 * double-init guard pattern (idempotent after the first call).
 */
var Nr9 = L(() => {
  eW8(); // initAnthropicFoundryModule — first call registers the module
  eW8(); // initAnthropicFoundryModule — second call is a no-op guard
});

export {kr9 as OQs,Nr9 as LQs};
