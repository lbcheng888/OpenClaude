// @ts-nocheck
import {Qtt as oeH,Ztt as aeH,kk as TZ,lo as zq} from "../tools/5190_userPromptCount.ts";
import {WR as kG} from "../../vendor/m2207.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Nv as T2,Z5 as rg} from "../api/4416_type.ts";
import {b as L} from "../../runtime.ts";
// core/2719_input_tokens.ts
//
// Token-accounting helpers for the message transcript.
//
// These functions read Anthropic-style `usage` records off assistant messages
// in a conversation transcript and derive totals: total tokens for a single
// usage record, the most-recent message's tokens, the context-window size,
// and whether the transcript has crossed the 200k-token mark. Synthetic
// messages (model === "<synthetic>", marker `kG`) and synthetic-text
// placeholders (`oeH`) are skipped so they never contribute to the counts.
//
// 1:1 restoration: only identifiers' TYPES and comments were added. Function
// and variable names are kept verbatim because they are referenced across
// other bundle modules (e.g. `gi`, `z2`, `We`, `reH`, `aD6`, `sD6`, `sm8`,
// `ik7`, `Uv`). All control flow, operators (incl. `!0`/`!1`), string
// literals and external references are preserved exactly.
//
// External symbols (defined in sibling bundle modules; kept verbatim):
//   kG  - the "<synthetic>" model marker. Messages with this model are not real
//         API turns and are excluded from usage accounting.
//   oeH - Set<string> of known synthetic message texts; a leading text block
//         whose value is in this set marks the message as synthetic.
//   bH  - JSON.stringify-style serializer (config/0226_encoding.ts).
//   aeH - token estimate for a thinking signature: Math.round(len * 0.75).
//   T2  - sums billable content tokens across a list of transcript entries.
//   TZ  - normalizes/filters a transcript into the canonical message list.
//   L   - lazy module-init wrapper (webpack-style); `Uv` is this module's init.
//   rg, zq, H6 - sibling module inits invoked from the wrapper body.

declare const kG: string;
declare const oeH: Set<string>;
declare function bH(value: unknown): string;
declare function aeH(length: number): number;
declare function T2(messages: TranscriptEntry[], context?: unknown): number;
declare function TZ(messages: TranscriptEntry[], tools?: unknown[], extra?: unknown): TranscriptEntry[];
declare function L<T>(init: () => T): T;
declare function rg(): void;
declare function zq(): void;
declare function H6(): void;

// ---------------------------------------------------------------------------
// Types (inferred from usage)
// ---------------------------------------------------------------------------

/** One per-turn iteration of a usage record (present when the model fell back mid-turn). */
interface UsageIteration {
  input_tokens: number;
  output_tokens: number;
}

/** Anthropic-style token usage, optionally annotated with per-iteration breakdown. */
interface Usage {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  /** Per-fallback-iteration usage; the last entry reflects the final API call. */
  iterations?: UsageIteration[];
}

/** Content block of an assistant/user message (Anthropic content union). */
interface ContentBlock {
  type: string;
  text?: string;
  thinking?: string;
  signature?: string;
  data?: string;
  input?: unknown;
}

/** The inner Anthropic message carried by an assistant transcript entry. */
interface AssistantInnerMessage {
  id: string;
  model: string;
  content: ContentBlock[];
  usage: Usage;
}

/** A single entry in the conversation transcript (assistant/user/attachment/system/progress …). */
interface TranscriptEntry {
  type: string;
  message: AssistantInnerMessage;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Returns the usage record for a real assistant turn, or `undefined`.
 *
 * Skips entries that aren't assistant messages, synthetic-text placeholders
 * (first text block listed in `oeH`), and synthetic-model turns (`kG`).
 */
function P7H(H: TranscriptEntry | undefined): Usage | undefined {
  if (H?.type === "assistant" && "usage" in H.message && !(H.message.content[0]?.type === "text" && oeH.has(H.message.content[0].text!)) && H.message.model !== kG) return H.message.usage;
  return;
}

/**
 * Returns the message id for a real (non-synthetic) assistant turn, or `undefined`.
 */
function lk7(H: TranscriptEntry | undefined): string | undefined {
  if (H?.type === "assistant" && "id" in H.message && H.message.model !== kG) return H.message.id;
  return;
}

/**
 * Total tokens for one usage record: input + cache-creation + cache-read + output.
 * Missing cache fields count as 0.
 */
function We(H: Usage): number {
  return H.input_tokens + (H.cache_creation_input_tokens ?? 0) + (H.cache_read_input_tokens ?? 0) + H.output_tokens;
}

/**
 * Total tokens of the most recent real assistant turn in the transcript, or 0 if none.
 */
function gi(H: TranscriptEntry[]): number {
  let _ = H.length - 1;
  while (_ >= 0) {
    let q = H[_],
      K = q ? P7H(q) : void 0;
    if (K) return We(K);
    _--;
  }
  return 0;
}

/**
 * Input+output tokens of the most recent real assistant turn's final API call.
 *
 * When the turn fell back across models its `iterations` list holds per-call
 * usage; the last iteration reflects the final call. Falls back to the
 * top-level usage when there are no iterations. Returns 0 if no real turn exists.
 */
function sm8(H: TranscriptEntry[]): number {
  let _ = H.length - 1;
  while (_ >= 0) {
    let q = H[_],
      K = q ? P7H(q) : void 0;
    if (K) {
      let O = K.iterations;
      if (O && O.length > 0) {
        let T = O.at(-1)!;
        return T.input_tokens + T.output_tokens;
      }
      return K.input_tokens + K.output_tokens;
    }
    _--;
  }
  return 0;
}

/**
 * Returns the most recent real assistant turn's usage broken out into the four
 * token fields (cache fields defaulted to 0), or `null` if no real turn exists.
 */
function reH(H: TranscriptEntry[]): {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
} | null {
  for (let _ = H.length - 1; _ >= 0; _--) {
    let q = H[_],
      K = q ? P7H(q) : void 0;
    if (K) return {
      input_tokens: K.input_tokens,
      output_tokens: K.output_tokens,
      cache_creation_input_tokens: K.cache_creation_input_tokens ?? 0,
      cache_read_input_tokens: K.cache_read_input_tokens ?? 0
    };
  }
  return null;
}

/**
 * True when the last assistant turn's total usage exceeds 200,000 tokens.
 * Returns false when there is no assistant message or no real usage.
 */
function aD6(H: TranscriptEntry[]): boolean {
  let q = H.findLast(O => O.type === "assistant");
  if (!q) return !1;
  let K = P7H(q);
  return K ? We(K) > 200000 : !1;
}

/**
 * Approximate character length of a single message's content, used as a cheap
 * size estimate. Sums text/redacted-thinking lengths, the estimated thinking
 * signature size (`aeH`), and serialized tool-input length (`bH`) across all
 * content blocks.
 */
function sD6(H: TranscriptEntry): number {
  let _ = 0;
  for (let q of H.message.content) if (q.type === "text") _ += q.text!.length;else if (q.type === "thinking") _ += aeH(q.signature?.length ?? 0);else if (q.type === "redacted_thinking") _ += q.data!.length;else if (q.type === "tool_use") _ += bH(q.input).length;
  return _;
}

/**
 * Context-window token count for the transcript.
 *
 * Anchors on the most recent real assistant turn (`nk7`): its reported total
 * usage already accounts for everything up to and including that turn, so only
 * the entries after the anchor are re-counted with `T2`. With no anchor, counts
 * the whole transcript.
 */
function z2(H: TranscriptEntry[], _?: unknown): number {
  let q = nk7(H);
  if (!q) return T2(H, _);
  return We(q.usage) + T2(H.slice(q.anchorIndex + 1), _);
}

/**
 * Finds the most recent real assistant turn and the transcript index to anchor
 * context accounting on.
 *
 * Once a real assistant turn with usage is found, walks backwards over any
 * earlier entries sharing the same message id (the streamed parts of the same
 * turn) and moves the anchor to the earliest such entry, stopping at the first
 * entry with a different defined id. Returns `null` if no real turn exists.
 */
function nk7(H: TranscriptEntry[]): { usage: Usage; anchorIndex: number } | null {
  let _ = H.length - 1;
  while (_ >= 0) {
    let q = H[_],
      K = q ? P7H(q) : void 0;
    if (q && K) {
      let O = lk7(q);
      if (O) {
        let T = _ - 1;
        while (T >= 0) {
          let z = H[T],
            $ = z ? lk7(z) : void 0;
          if ($ === O) _ = T;else if ($ !== void 0) break;
          T--;
        }
      }
      return {
        usage: K,
        anchorIndex: _
      };
    }
    _--;
  }
  return null;
}

/**
 * Context tokens of the entries *after* the most recent usage anchor only,
 * normalized through `TZ`. Used to size the post-anchor tail (e.g. tokens
 * accumulated since the last reported usage). With no anchor, normalizes the
 * whole transcript.
 */
function ik7(H: TranscriptEntry[], _?: unknown): number {
  let q = nk7(H),
    K = q ? H.slice(q.anchorIndex + 1) : [...H];
  return T2(TZ(K), _);
}

/**
 * Lazy module initializer for this module: pulls in the sibling bundle modules
 * it depends on (`rg`, `zq`, `H6`). Runs its body only on first invocation.
 */
var Uv = L(() => {
  rg();
  zq();
  H6();
});

export {P7H as Sae,lk7 as bFi,We as uee,gi as wz,sm8 as w8r,reH as Xtt,aD6 as Cwn,sD6 as vwn,z2 as SC,nk7 as EFi,ik7 as CFi,Uv as oN};
