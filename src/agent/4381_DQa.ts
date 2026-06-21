// @ts-nocheck
import {Su as $5,Js as K7,oA as O$} from "../config/2697_oA.ts";
import {ns as aq} from "../mcp/2194_mcpServerName.ts";
import {lE as cD,tA as Bz} from "../config/2201_tA.ts";
import {Ws as V9,ef as lT} from "../../vendor/m2248.ts";
import {$c as g1,Vw as RP} from "../../vendor/m2695.ts";
import {yu as B5,VR as qZ} from "../../vendor/m2249.ts";
import {zc as t1,ex as mW} from "../../vendor/m2582.ts";
import {Ua as xK,ty as dw} from "../../vendor/m2245.ts";
import {b as L} from "../../runtime.ts";
// Module 4351 — Memory-extraction subagent prompt builder.
//
// This module exposes a single helper, `UdK`, that assembles the system/user
// prompt for the "memory extraction subagent" (a short, tool-restricted forked
// agent run that scans the last N conversation messages and writes durable
// memory files). The builder adapts its wording to two runtime conditions:
//
//   1. Shell platform — on Unix the agent is told it has `Bash` and the usual
//      `ls/find/cat/...` read tools plus `rm`; on Windows it is told about
//      PowerShell equivalents (`Get-ChildItem/Get-Content/...` and
//      `Remove-Item`). Chosen via `$5()` (true => Unix/Bash available).
//   2. Immutable-memory mode — when the `tengu_billiard_aviary` flag is on
//      (`cD()`), memories are immutable: the Edit tool is forbidden and the
//      agent must delete-and-recreate instead of editing in place. This changes
//      both the tool-availability text and the turn-budget strategy text.
//
// The actual extraction run (token accounting, telemetry, file collection) lives
// in module 4352 (`tools/4352_initExtractMemories.ts`), which calls `UdK` to
// produce the prompt string.
//
// `FdK` is this module's esbuild lazy-init thunk: invoking it runs the init
// thunks of every module whose symbols are referenced here, then returns void.
//
// NOTE: behavior is preserved 1:1 from the obfuscated source — only names,
// types, and comments were added. Cross-module references (tool-name constants
// V9/g1/B5/t1/xK, shell-name constants aq/K7, flag helpers $5/cD, and the init
// thunks) are kept exactly as in the original.

// --- Cross-module symbols (declared in other modules; referenced here) -------

/** Returns true when a Unix-style shell (Bash) is available; false on Windows
 *  without bash. Defined in module `O$` (config/2689). */
declare function $5(): boolean;

/** Feature flag `tengu_billiard_aviary`: when true, persistent memories are
 *  immutable (edit-in-place is disallowed). Defined in module `Bz` (config/2197). */
declare function cD(): boolean;

/** Tool-name constant: the Read tool (paginated file reads via offset/limit/pages). */
declare const V9: string;
/** Tool-name constant: the Grep tool (search file contents). */
declare const g1: string;
/** Tool-name constant: the Glob tool (find files by pattern). */
declare const B5: string;
/** Tool-name constant: the Write tool (`content` parameter). */
declare const t1: string;
/** Tool-name constant: the Edit tool (requires a prior Read of the same file). */
declare const xK: string;

/** Shell-name constant: "Bash" (the Unix Bash tool). */
declare const aq: string;
/** Shell-name constant: "PowerShell" (the Windows PowerShell tool). */
declare const K7: string;

/** esbuild `__esm` lazy module-init helper: wraps an init fn so it runs at most
 *  once and returns its (void) result. */
declare const L: <T>(init: () => T, result?: T) => () => T;

// Init thunks of the modules whose symbols are used above; invoked by `FdK`.
declare function Bz(): void;
declare function dw(): void;
declare function lT(): void;
declare function mW(): void;
declare function qZ(): void;
declare function RP(): void;
declare function O$(): void;

// --- Prompt builder ----------------------------------------------------------

/**
 * Build the prompt for the memory-extraction subagent.
 *
 * The returned string instructs a forked agent to analyze the most recent
 * `recentMessageCount` conversation messages and update the user's persistent
 * memory files, using only a restricted set of tools scoped to the memory
 * directory. Wording adapts to the shell platform (`$5()`) and to whether
 * memories are immutable (`cD()`).
 *
 * @param recentMessageCount     Number of trailing messages the subagent may use.
 * @param existingMemoryFilesText Rendered listing of existing memory files (empty
 *                                string when there are none); included verbatim so
 *                                the agent can dedupe/update rather than duplicate.
 * @param includeScopeGuidance   When true, the closing instruction mentions
 *                                "scope guidance" among the criteria to apply.
 * @returns The fully assembled prompt, newline-joined.
 */
function UdK(
  recentMessageCount: number,
  existingMemoryFilesText: string,
  includeScopeGuidance: boolean,
): string {
  let useUnixShell = $5(),
    fileToolName = useUnixShell ? aq : K7,
    readOnlyToolList = useUnixShell
      ? "ls/find/cat/stat/wc/head/tail and similar"
      : "Get-ChildItem/Get-Content/Select-Object -First/-Last and similar",
    deleteCommand = useUnixShell ? "rm" : "Remove-Item",
    immutableMemories = cD(),
    dedupeGuidance = immutableMemories
      ? `Check this list before writing — if the fact is already covered, skip it; if a memory has gone stale, ${deleteCommand} it and write a fresh single-fact memory in its place. Never edit memories in-place.`
      : "Check this list before writing — update an existing file rather than creating a duplicate.",
    existingFilesSection =
      existingMemoryFilesText.length > 0
        ? `

## Existing memory files

${existingMemoryFilesText}

${dedupeGuidance}`
        : "",
    scopeGuidanceFragment = includeScopeGuidance ? "scope guidance, " : "",
    availableToolsText = immutableMemories
      ? `Available tools: ${V9}, ${g1}, ${B5}, read-only ${fileToolName} (${readOnlyToolList}), ${t1} for paths inside the memory directory only, and ${fileToolName} ${deleteCommand} with paths inside the memory directory only. ${xK} is not permitted — memories are immutable, so delete-and-recreate replaces in-place edits. All other tools — MCP, Agent, write-capable ${fileToolName}, etc — will be denied.`
      : `Available tools: ${V9}, ${g1}, ${B5}, read-only ${fileToolName} (${readOnlyToolList}), and ${xK}/${t1} for paths inside the memory directory only, and ${fileToolName} ${deleteCommand} with paths inside the memory directory only. All other tools — MCP, Agent, write-capable ${fileToolName}, etc — will be denied.`,
    turnBudgetText = immutableMemories
      ? `You have a limited turn budget. Issue all ${t1} and ${deleteCommand} calls in parallel in a single turn — there is no read-then-edit dance, since memories are immutable.`
      : `You have a limited turn budget. ${xK} requires a prior ${V9} of the same file, so the efficient strategy is: turn 1 — issue all ${V9} calls in parallel for every file you might update; turn 2 — issue all ${t1}/${xK} calls in parallel. Do not interleave reads and writes across multiple turns.`;
  return [
    `You are now acting as the memory extraction subagent. Analyze the most recent ~${recentMessageCount} messages above and use them to update your persistent memory systems.`,
    "",
    availableToolsText,
    "",
    turnBudgetText,
    "",
    `You MUST only use content from the last ~${recentMessageCount} messages to update your persistent memories. Do not waste any turns attempting to investigate or verify that content further — no grepping source files, no reading code to confirm a pattern exists, no git commands.` +
      existingFilesSection,
    "",
    "If nothing is worth saving, output only 'Nothing to save.' Do not explain why.",
    "",
    "If the user explicitly asks you to remember something, save it immediately as whichever type fits best. If they ask you to forget something, find and remove the relevant entry.",
    "",
    `Apply the memory types, ${scopeGuidanceFragment}what-not-to-save criteria, and frontmatter format from the Memory section of your system prompt — it is already in your context above.`,
  ].join(`
`);
}

/**
 * Lazy module-init thunk for module 4351. Running it initializes every
 * dependency module whose symbols this module references, then returns void.
 */
var FdK = L(() => {
  Bz();
  dw();
  lT();
  mW();
  qZ();
  RP();
  O$();
});

export {UdK as IQa,FdK as DQa};
