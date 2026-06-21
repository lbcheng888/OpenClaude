// @ts-nocheck
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {ky as FS,$u as E3} from "../mcp/2194_mcpServerName.ts";
import {fromEnum as tH} from "../../vendor/m5.ts";
import {Dp as pz} from "../../vendor/m2215.ts";
import {b as L} from "../../runtime.ts";
import {Cv as hW} from "./2217_names.ts";
/**
 * Fabricated-turn candidate detection and telemetry.
 *
 * Scans assistant message content blocks (text and thinking) for patterns that
 * suggest the model has begun hallucinating a fake "Human:" / "User:" turn
 * inside its own reply.  When a candidate is found the module fires a
 * `tengu_fabricated_turn_candidate` telemetry event.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single text or thinking content block from an assistant message. */
interface ContentBlock {
  type: "text" | "thinking" | string;
  text?: string;
  thinking?: string;
}

/** One assistant message wrapper as it appears in the conversation turn array. */
interface AssistantTurn {
  message: {
    content: ContentBlock[];
  };
}

/** Result of a successful fragment match inside a content block string. */
interface FragmentMatchResult {
  /** The matched fragment string (e.g. "Human", "user", …). */
  fragment: string;
  /** Classification of the character immediately following the fragment. */
  suffix: "<" | " " | "other";
  /** Whether the surrounding text contains known fabrication-indicator patterns. */
  looksFabricated: boolean;
  /** Byte offset of the match inside the original text. */
  matchIndex: number;
  /** The 200-character window of text around the match used for heuristics. */
  tail: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Classifies the single character `ch` that immediately follows a matched
 * fragment as one of the three sentinel values used in telemetry.
 */
function classifyNextChar(ch: string): "<" | " " | "other" {
  if (ch === "<") return "<";
  if (ch === " ") return " ";
  return "other";
}

/**
 * Returns `true` when `text` contains at least one of the known
 * fabrication-indicator sub-strings (e.g. "Human:", "Assistant:", XML tags).
 */
function containsFabricationIndicators(text: string): boolean {
  for (let pattern of FABRICATION_INDICATOR_PATTERNS) if (text.includes(pattern)) return !0;
  return !1;
}

/**
 * Searches `text` for the earliest occurrence of any known turn-separator
 * fragment followed by `\n\n`.  Falls back to the catch-all regex when no
 * explicit fragment is found.
 *
 * Returns `null` when no match is found.
 */
function findFabricatedFragmentMatch(text: string): FragmentMatchResult | null {
  let best: { index: number; fragment: string } | null = null;
  for (let frag of KNOWN_TURN_FRAGMENTS) {
    let idx = text.indexOf(`\n\n${frag}`);
    if (idx !== -1 && (best === null || idx < best.index)) best = {
      index: idx,
      fragment: frag
    };
  }
  if (best === null) {
    let m = CATCH_ALL_FRAGMENT_RE.exec(text);
    if (m !== null) best = {
      index: m.index,
      fragment: m[1]
    };
  }
  if (best === null) return null;
  let afterFragmentPos = best.index + 2 + best.fragment.length,
    tail = text.slice(best.index, best.index + TAIL_WINDOW_LENGTH);
  return {
    fragment: best.fragment,
    suffix: classifyNextChar(text[afterFragmentPos]),
    looksFabricated: containsFabricationIndicators(tail),
    matchIndex: best.index,
    tail: tail
  };
}

/**
 * Normalizes `fragment` to one of the known turn-fragment strings, or
 * `"catch_all"` when the fragment is not in the known list.
 */
function normalizeFragment(fragment: string): string {
  for (let known of KNOWN_TURN_FRAGMENTS) if (known === fragment) return known;
  return "catch_all";
}

/**
 * Generator that yields `{ hit, blockType }` pairs for every content block
 * across all turns in `turns` that contains a fabricated-turn candidate.
 *
 * Blocks that match via `"catch_all"` are only yielded when the suffix is
 * `"<"` or the surrounding text looks fabricated (strict filter).
 */
function* yieldFabricatedTurnHits(
  turns: AssistantTurn[]
): Generator<{ hit: FragmentMatchResult; blockType: "text" | "thinking" }> {
  for (let turn of turns) for (let block of turn.message.content) {
    let blockType: "text" | "thinking" | undefined;
    let blockText: string | undefined;
    if (block.type === "text") blockType = "text", blockText = block.text;
    else if (block.type === "thinking") blockType = "thinking", blockText = block.thinking;
    else continue;
    let hit = findFabricatedFragmentMatch(blockText!);
    if (hit === null) continue;
    if (normalizeFragment(hit.fragment) === "catch_all" && hit.suffix !== "<" && !hit.looksFabricated) continue;
    yield {
      hit: hit,
      blockType: blockType!
    };
  }
}

// ---------------------------------------------------------------------------
// Exported API
// ---------------------------------------------------------------------------

/**
 * Scans `turns` for fabricated turn candidates and fires a
 * `tengu_fabricated_turn_candidate` telemetry event for each hit found.
 *
 * @param turns  - The array of assistant turns to inspect.
 * @param model  - The model string used for this request (passed through `FS` sanitizer).
 */
function rlK(turns: AssistantTurn[], model: string): void {
  for (let {
    hit: hit,
    blockType: blockType
  } of yieldFabricatedTurnHits(turns)) c("tengu_fabricated_turn_candidate", {
    model: FS(model),
    matched_fragment: tH(normalizeFragment(hit.fragment)),
    suffix: tH(hit.suffix),
    looks_fabricated: hit.looksFabricated,
    block_type: tH(blockType),
    tail_sha256: pz(hit.tail)
  });
}

// ---------------------------------------------------------------------------
// Module-level constants (initialized lazily)
// ---------------------------------------------------------------------------

/**
 * Ordered list of known turn-separator fragment strings.
 * Matched by searching for `\n\n<fragment>` in content blocks.
 */
var KNOWN_TURN_FRAGMENTS: string[];

/**
 * Sub-strings whose presence inside the match window suggests the text
 * contains a fabricated conversation structure.
 */
var FABRICATION_INDICATOR_PATTERNS: string[];

/**
 * Catch-all regex that matches `\n\n` followed by 1–12 Unicode letters
 * immediately before a `<` or space — used as a fallback when none of the
 * known fragment strings are found.
 */
var CATCH_ALL_FRAGMENT_RE: RegExp;

/** Number of characters extracted as the match "tail" window for hashing. */
var TAIL_WINDOW_LENGTH = 200;

// ---------------------------------------------------------------------------
// Lazy initializer
// ---------------------------------------------------------------------------

/** Initializes module-level constants required by fabricated-turn detection. */
var olK = L(() => {
  y_();
  E3();
  hW();
  KNOWN_TURN_FRAGMENTS = ["um", "user", "Hmm", "User", "Benutzer", "Human", "usr", "usem", "Mensch", "usuario"], FABRICATION_INDICATOR_PATTERNS = ["Human:", "Assistant:", "<dm ", "<system", "<tool_", "<function_"], CATCH_ALL_FRAGMENT_RE = /\n\n(\p{L}{1,12})(?=[< ])/u;
});

export {classifyNextChar as v9p,containsFabricationIndicators as w9p,findFabricatedFragmentMatch as R9p,normalizeFragment as BZa,yieldFabricatedTurnHits as x9p,rlK as FZa,KNOWN_TURN_FRAGMENTS as NZa,FABRICATION_INDICATOR_PATTERNS as b9p,CATCH_ALL_FRAGMENT_RE as E9p,TAIL_WINDOW_LENGTH as C9p,olK as UZa};
