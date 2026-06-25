// @ts-nocheck
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Zf,vu} from "../mcp/2200_mcpServerName.ts";
import {Le} from "../../vendor/m5.ts";
import {ep} from "../../vendor/m2223.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {b} from "../../runtime.ts";
import {IA} from "./2225_names.ts";
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
  requestId?: string;
  message: {
    id?: string;
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
  /** The fabrication tail-marker sub-string found in the window, or null. */
  tailMarker: string | null;
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
 * Returns the first known fabrication-indicator sub-string contained in `text`
 * (e.g. "Human:", "Assistant:", XML tags), or `null` when none is present.
 */
function findFabricationIndicator(text: string): string | null {
  for (let pattern of FABRICATION_INDICATOR_PATTERNS) if (text.includes(pattern)) return pattern;
  return null;
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
    let idx = text.indexOf(`

${frag}`);
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
    tail = text.slice(best.index, best.index + TAIL_WINDOW_LENGTH),
    tailMarker = findFabricationIndicator(tail);
  return {
    fragment: best.fragment,
    suffix: classifyNextChar(text[afterFragmentPos]),
    looksFabricated: tailMarker !== null,
    tailMarker: tailMarker,
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
 * Generator that yields `{ hit, blockType, message }` triples for every content
 * block across all turns in `turns` that contains a fabricated-turn candidate.
 *
 * Blocks that match via `"catch_all"` are only yielded when the suffix is
 * `"<"` or the surrounding text looks fabricated (strict filter).
 */
function* yieldFabricatedTurnHits(
  turns: AssistantTurn[]
): Generator<{ hit: FragmentMatchResult; blockType: "text" | "thinking"; message: AssistantTurn }> {
  for (let turn of turns) for (let block of turn.message.content) {
    let blockType: "text" | "thinking" | undefined, blockText: string | undefined;
    if (block.type === "text") blockType = "text", blockText = block.text;else if (block.type === "thinking") blockType = "thinking", blockText = block.thinking;else continue;
    let hit = findFabricatedFragmentMatch(blockText!);
    if (hit === null) continue;
    if (normalizeFragment(hit.fragment) === "catch_all" && hit.suffix !== "<" && !hit.looksFabricated) continue;
    yield {
      hit: hit,
      blockType: blockType!,
      message: turn
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
 * @param model  - The model string used for this request (passed through `Zf` sanitizer).
 */
function reportFabricatedTurns(turns: AssistantTurn[], model: string): void {
  for (let {
    hit: hit,
    blockType: blockType,
    message: message
  } of yieldFabricatedTurnHits(turns)) W("tengu_fabricated_turn_candidate", {
    model: Zf(model),
    matched_fragment: Le(normalizeFragment(hit.fragment)),
    suffix: Le(hit.suffix),
    looks_fabricated: hit.looksFabricated,
    tail_marker: hit.tailMarker !== null ? Le(hit.tailMarker) : void 0,
    block_type: Le(blockType),
    tail_sha256: ep(hit.tail),
    request_id: xr(message.requestId),
    message_id: xr(message.message.id)
  });
}

// ---------------------------------------------------------------------------
// Module-level constants (initialized lazily)
// ---------------------------------------------------------------------------

/**
 * Ordered list of known turn-separator fragment strings.
 * Matched by searching for `\n\n<fragment>` in content blocks.
 */
var KNOWN_TURN_FRAGMENTS: string[],
  /**
   * Sub-strings whose presence inside the match window suggests the text
   * contains a fabricated conversation structure.
   */
  FABRICATION_INDICATOR_PATTERNS: string[],
  /**
   * Catch-all regex that matches `\n\n` followed by 1–12 Unicode letters
   * immediately before a `<` or space — used as a fallback when none of the
   * known fragment strings are found.
   */
  CATCH_ALL_FRAGMENT_RE: RegExp,
  /** Number of characters extracted as the match "tail" window for hashing. */
  TAIL_WINDOW_LENGTH = 200;

// ---------------------------------------------------------------------------
// Lazy initializer
// ---------------------------------------------------------------------------

/** Initializes module-level constants required by fabricated-turn detection. */
var initFabricatedTurnConstants = b(() => {
  kt();
  vu();
  QT();
  IA();
  KNOWN_TURN_FRAGMENTS = ["um", "user", "Hmm", "User", "Benutzer", "Human", "usr", "usem", "Mensch", "usuario"], FABRICATION_INDICATOR_PATTERNS = ["Human:", "Assistant:", "<dm ", "<system", "<tool_", "<function_"], CATCH_ALL_FRAGMENT_RE = /\n\n(\p{L}{1,12})(?=[< ])/u;
});

export {classifyNextChar as aVp,findFabricationIndicator as lVp,findFabricatedFragmentMatch as cVp,normalizeFragment as vil,yieldFabricatedTurnHits as uVp,reportFabricatedTurns as wil,KNOWN_TURN_FRAGMENTS as Ril,FABRICATION_INDICATOR_PATTERNS as oVp,CATCH_ALL_FRAGMENT_RE as sVp,TAIL_WINDOW_LENGTH as iVp,initFabricatedTurnConstants as kil};
