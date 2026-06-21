// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {lt as w_,getSessionId as v_,setOriginalCwd as Wh} from "../session/0131_sent.ts";
import {EU as nB,ES as YM} from "../../vendor/m4256.ts";
import {y3t as cI_,a0e as nGH} from "../../vendor/m4257.ts";
import {Ct as y_,logEvent as c} from "../../vendor/m131.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {zw as hP,clearMemoryFileCaches as uG} from "../config/2717_stripHtmlComments.ts";
import {Go as Fq,FMe as qVH,Pt as u_} from "../../vendor/m632.ts";
import {qe as FH,logForDebugging as N} from "../config/0234_setHasFormattedOutput.ts";
import {bt as L_,Se as GH} from "../../vendor/m195.ts";
import {vO as wN,reanchorGitFileWatcher as Zl} from "../../vendor/m691.ts";
import {Ba as gK,findCanonicalGitRoot as h$} from "../../vendor/m693.ts";
import {yx as tW,l0e as iGH,xT as wj} from "../core/5144_encoding.ts";
import {initXL as DV,x_ as ow,GYr as ed8} from "../agent/3279_code.ts";
import {ja as iK,readAgentMetadata as wpH,writeAgentMetadata as l4_,saveWorktreeState as iB} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {hI as rG,validateWorktreeSlug as z1_,WorktreeIsolationError as L2,resolveExistingWorktreeTarget as LI6,enterExistingWorktreeForSession as cKq,createWorktreeForSession as dI_} from "../session/5172_worktreeBranchName.ts";
import {XWa as MmK,zWa as jmK,YWa as JmK,JWa as DmK} from "../tui/4259_name.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
import {zAe as pzH} from "../../vendor/m2692.ts";
import {getCurrentWorktreeSession as z$} from "../config/3332_flushAnalyticsSinks.ts";
// ============================================================================
// Tool definition: EnterWorktree
//
// Creates (or switches into) an isolated git worktree and re-points the current
// session's working directory + write access at it. This is the registry entry
// for the user-facing "EnterWorktree" tool.
//
// 1:1 reverse-engineering of the obfuscated bundle chunk. Only names, types,
// and comments were added — control flow, operators (incl. !0/!1), string
// literals, and cross-module/property references are preserved exactly.
//
// NOTE ON SYMBOL NAMING:
//   `initEnterWorktreeModule` (orig. `WmK`) and `enterWorktreeTool` (orig.
//   `PmK`) are referenced by their ORIGINAL bundler identifiers from another
//   bundle chunk (artifact/4278_uL.ts). Those identifiers are kept here so the
//   bundle's cross-module references continue to resolve; the readable names
//   are provided via aliasing comments / re-export below.
// ============================================================================

// --- External (cross-module) symbols, defined in sibling bundle chunks ------
// These are free identifiers resolved at bundle scope; they are intentionally
// NOT renamed so cross-chunk references stay intact.

/** Module loader / lazy-init wrapper used throughout the bundle. */
declare function L<T>(init: () => T): T;

// Lazy module-init side-effect functions for dependency chunks.
declare function a8(): void;
declare function w_(): void;
declare function nB(): void;
declare function cI_(): void;
declare function y_(): void;
declare function M7(): void;
declare function hP(): void;
declare function Fq(): void;
declare function FH(): void;
declare function L_(): void;
declare function wN(): void;
declare function gK(): void;
declare function tW(): void;
declare function DV(): void;
declare function iK(): void;
declare function rG(): void;
/** Lazy-init of the tui render-helpers chunk (tui/4234_name.ts). */
declare function MmK(): void;

/** Zod-like schema builder namespace. */
declare const k: any;

/** Lazy/memoized schema factory: caches the schema produced by `factory`. */
declare function kH<T>(factory: () => T): () => T;

/** Tool factory: merges default tool behavior with the supplied definition. */
declare function c9<T extends Record<string, unknown>>(def: T): EnterWorktreeToolDefinition;

/** Validates a proposed worktree name; throws on an invalid name. */
declare function z1_(name: string): void;

/** Formats an unknown thrown value into a human-readable message string. */
declare function GH(err: unknown): string;

/** The canonical user-facing name of the EnterWorktree tool. */
declare const pzH: string;

/** Returns the EnterWorktree tool prompt text. */
declare function jmK(): Promise<string> | string;

/** Renders the tool-use message (React/JSX element factory). */
declare function JmK(props: unknown): unknown;

/** Renders the tool-result message (React/JSX element factory). */
declare function DmK(result: unknown, second: unknown, third: unknown): unknown;

/** True when running inside a subagent with a pinned/overridden cwd. */
declare function qVH(): boolean;

/** True when the current session is already inside a worktree session. */
declare function z$(): boolean;

/** Returns the current working directory (logical session cwd). */
declare function u_(): string;

/** Resolves the originating/host cwd for a given directory. */
declare function h$(dir: string): string | null | undefined;

/** Returns the current agent/session id. */
declare function v_(): string;

/** Updates the tracked logical working directory. */
declare function ow(dir: string): void;

/** Records that `agentId` now owns the given worktree path. */
declare function ed8(worktreePath: string, agentId: string): void;

/** Loads stored agent metadata by id. */
declare function wpH(agentId: string): Promise<AgentMetadata | null | undefined>;

/** Persists updated agent metadata. */
declare function l4_(agentId: string, metadata: AgentMetadata): Promise<void>;

/** Generates a random worktree name. */
declare function iGH(): string;

/** Switches into an existing worktree for the given agent + path. */
declare function cKq(agentId: string, path: string): Promise<WorktreeResult>;

/** Creates a new worktree for the given agent + name. */
declare function dI_(agentId: string, name: string, unused: undefined, opts: {
  fromCwd: string;
}): Promise<WorktreeResult>;

/** Resolves/validates a managed worktree path for the "enter existing" flow. */
declare function LI6(path: string, opts: {
  requireManagedLocation: boolean;
  requireCwdInsideRepo: boolean;
}): Promise<WorktreeResult>;

/** Telemetry event emitter. */
declare function c(event: string, props: Record<string, unknown>): void;

/** Logger (warning-level). */
declare function N(message: string): void;

/** Refreshes/initializes worktree-related session state. */
declare function Wh(cwd: string): void;

/** Marks the active worktree result as the current one. */
declare function iB(result: WorktreeResult): void;

/** Side-effect refresh after worktree creation. */
declare function nGH(): void;

/** Side-effect refresh after worktree creation. */
declare function uG(): void;

/** Recomputes/clears derived session state (git, etc.). */
declare function Zl(): void;

/** Returns the active UI controller (with optional git-branch refresh). */
declare function YM(): {
  refreshGitBranch?: () => void;
} | null | undefined;

/** Process-wide cache with an optional clear method. */
declare const wj: {
  cache: {
    clear?: () => void;
  };
};

/** Domain error type used for user-facing tool failures. */
declare class L2 extends Error {}

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

/** Validated input accepted by the EnterWorktree tool. */
interface EnterWorktreeInput {
  /** Optional name for a *new* worktree. Mutually exclusive with `path`. */
  name?: string;
  /** Path of an *existing* worktree to switch into. Mutually exclusive with `name`. */
  path?: string;
}

/** Structured output returned by the EnterWorktree tool. */
interface EnterWorktreeOutput {
  /** Absolute filesystem path of the worktree the session is now in. */
  worktreePath: string;
  /** Branch checked out in the worktree, if any. */
  worktreeBranch?: string;
  /** Human-readable status message. */
  message: string;
}

/** Result of creating or entering a worktree. */
interface WorktreeResult {
  worktreePath: string;
  worktreeBranch?: string;
}

/** Stored per-agent metadata (only the `cwd` field is touched here). */
interface AgentMetadata {
  cwd: string;
  [key: string]: unknown;
}

/** Tool-call execution context (carries the invoking agent id). */
interface ToolCallContext {
  agentId?: string;
}

/** Result of `validateInput`. */
interface ValidateInputResult {
  result: boolean;
  message?: string;
  errorCode?: number;
}

/** A context layer pushed onto the session after entering a worktree. */
interface WorkingDirectoryContextLayer {
  kind: "working_directory";
  directory: string;
}

/** Tool `call` return value. */
interface EnterWorktreeCallResult {
  data: EnterWorktreeOutput;
  contextLayers?: WorkingDirectoryContextLayer[];
}

/** Shape of the assembled EnterWorktree tool definition object. */
interface EnterWorktreeToolDefinition {
  name: string;
  searchHint: string;
  maxResultSizeChars: number;
  description(): Promise<string>;
  prompt(): Promise<string> | string;
  readonly inputSchema: unknown;
  readonly outputSchema: unknown;
  userFacingName(input?: EnterWorktreeInput): string;
  shouldDefer: boolean;
  toAutoClassifierInput(input: EnterWorktreeInput): string;
  validateInput(input: EnterWorktreeInput): Promise<ValidateInputResult>;
  renderToolUseMessage: typeof JmK;
  renderToolResultMessage: typeof DmK;
  call(input: EnterWorktreeInput, context: ToolCallContext): Promise<EnterWorktreeCallResult>;
  mapToolResultToToolResultBlockParam(output: EnterWorktreeOutput, toolUseId: string): {
    type: "tool_result";
    content: string;
    tool_use_id: string;
  };
}

// ----------------------------------------------------------------------------
// Module-level bindings (hoisted by the bundler).
//   `pathModule`   — orig. `XmK` (file-internal)
//   `getInputSchema`  — orig. `fPO` (file-internal)
//   `getOutputSchema` — orig. `jPO` (file-internal)
//   `enterWorktreeTool` — orig. `PmK` (referenced cross-chunk; keep original name)
// ----------------------------------------------------------------------------

/** Node `path` module. (orig. `XmK`) */
var pathModule: typeof import("path");
/** Lazily-built/cached Zod input schema. (orig. `fPO`) */
var getInputSchema: () => unknown;
/** Lazily-built/cached Zod output schema. (orig. `jPO`) */
var getOutputSchema: () => unknown;
/**
 * The EnterWorktree tool definition object.
 *
 * Kept under its original bundler identifier `PmK` because sibling chunk
 * `artifact/4278_uL.ts` references it by that name when assembling the tool
 * registry.
 */
var PmK: EnterWorktreeToolDefinition;

/**
 * Lazy module initializer for the EnterWorktree tool chunk.
 *
 * Kept under its original bundler identifier `WmK` because sibling chunk
 * `artifact/4278_uL.ts` invokes it by that name. Runs dependency chunk
 * initializers, then builds the schemas and the tool definition.
 */
var WmK = L(() => {
  a8();
  w_();
  nB();
  cI_();
  y_();
  M7();
  hP();
  Fq();
  FH();
  L_();
  wN();
  gK();
  tW();
  DV();
  iK();
  rG();
  MmK();
  pathModule = require("path"), getInputSchema = kH(() => k.strictObject({
    name: k.string().superRefine((name: string, ctx: {
      addIssue: (issue: {
        code: string;
        message: string;
      }) => void;
    }) => {
      try {
        z1_(name);
      } catch (err) {
        ctx.addIssue({
          code: "custom",
          message: GH(err)
        });
      }
    }).optional().describe('Optional name for a new worktree. Each "/"-separated segment may contain only letters, digits, dots, underscores, and dashes; max 64 chars total. A random name is generated if not provided. Mutually exclusive with `path`.'),
    path: k.string().optional().describe("Path to an existing worktree of the current repository to switch into instead of creating a new one. Must appear in `git worktree list` for the current repo. Mutually exclusive with `name`.")
  }).refine((input: EnterWorktreeInput) => !(input.name && input.path), {
    message: "Provide at most one of `name` or `path`, not both."
  })), getOutputSchema = kH(() => k.object({
    worktreePath: k.string(),
    worktreeBranch: k.string().optional(),
    message: k.string()
  })), PmK = c9({
    name: pzH,
    searchHint: "create an isolated git worktree and switch into it",
    maxResultSizeChars: 1e5,
    async description() {
      return "Creates an isolated worktree (via git or configured hooks) and switches the session into it";
    },
    async prompt() {
      return jmK();
    },
    get inputSchema() {
      return getInputSchema();
    },
    get outputSchema() {
      return getOutputSchema();
    },
    userFacingName(input?: EnterWorktreeInput): string {
      return input?.path ? "Entering worktree" : "Creating worktree";
    },
    shouldDefer: !0,
    toAutoClassifierInput(input: EnterWorktreeInput): string {
      return input.path ?? input.name ?? "";
    },
    async validateInput(input: EnterWorktreeInput): Promise<ValidateInputResult> {
      if (qVH()) {
        if (input.path) return {
          result: !0
        };
        let currentCwd = u_(),
          hostCwd = h$(currentCwd);
        return {
          result: !1,
          message: `EnterWorktree cannot create a worktree from a subagent with a cwd override (isolation: "worktree" or explicit cwd) — it would mutate the parent session's process-wide working directory. ` + (hostCwd != null && currentCwd !== hostCwd && currentCwd.startsWith(hostCwd + pathModule.sep) ? "To switch this agent into an existing worktree managed by Claude Code (under .claude/worktrees/ of this repository), call EnterWorktree with `path`. To work in any other directory, spawn an Agent with `cwd` set to it." : "To work in a different directory (including a worktree), spawn an Agent with `cwd` set to it."),
          errorCode: 1
        };
      }
      if (z$() && !input.path) return {
        result: !1,
        message: "Already in a worktree session. Pass `path` to switch into another existing worktree, or use ExitWorktree to leave this one before creating a new worktree.",
        errorCode: 2
      };
      return {
        result: !0
      };
    },
    renderToolUseMessage: JmK,
    renderToolResultMessage: DmK,
    async call(input: EnterWorktreeInput, context: ToolCallContext): Promise<EnterWorktreeCallResult> {
      if (qVH()) {
        if (!input.path) throw new L2("EnterWorktree from a session with a pinned working directory requires `path`.");
        let entered = await LI6(input.path, {
          requireManagedLocation: !0,
          requireCwdInsideRepo: !0
        });
        if (ow(entered.worktreePath), ed8(entered.worktreePath, context.agentId ?? v_()), context.agentId) try {
          let metadata = await wpH(context.agentId);
          if (metadata) await l4_(context.agentId, {
            ...metadata,
            cwd: entered.worktreePath
          });
        } catch (err) {
          N(`Failed to update agent metadata cwd after worktree switch: ${GH(err)}`);
        }
        c("tengu_worktree_entered_existing", {
          mid_session: !0,
          cwd_override: !0
        });
        let branchSuffix = entered.worktreeBranch ? ` on branch ${entered.worktreeBranch}` : "";
        return {
          data: {
            worktreePath: entered.worktreePath,
            worktreeBranch: entered.worktreeBranch,
            message: `Entered worktree at ${entered.worktreePath}${branchSuffix}. This agent's working directory and write access now point at the worktree; the previous directory was left untouched.`
          },
          contextLayers: [{
            kind: "working_directory",
            directory: entered.worktreePath
          }]
        };
      }
      if (z$() && !input.path) throw Error("Already in a worktree session");
      let result: WorktreeResult;
      if (input.path) result = await cKq(v_(), input.path);else {
        let currentCwd = u_(),
          hostCwd = h$(currentCwd),
          didChdir = !1;
        if (hostCwd && hostCwd !== currentCwd) process.chdir(hostCwd), ow(hostCwd), didChdir = !0;
        try {
          result = await dI_(v_(), input.name ?? iGH(), void 0, {
            fromCwd: currentCwd
          });
        } catch (err) {
          if (didChdir) try {
            process.chdir(currentCwd), ow(currentCwd);
          } catch {
            Zl(), YM()?.refreshGitBranch?.();
          }
          throw err;
        }
      }
      process.chdir(result.worktreePath), ow(result.worktreePath), Wh(u_()), ed8(result.worktreePath, v_()), iB(result), nGH(), uG(), wj.cache.clear?.(), Zl(), YM()?.refreshGitBranch?.(), c(input.path ? "tengu_worktree_entered_existing" : "tengu_worktree_created", {
        mid_session: !0
      });
      let branchSuffix = result.worktreeBranch ? ` on branch ${result.worktreeBranch}` : "",
        verb = input.path ? "Entered" : "Created";
      return {
        data: {
          worktreePath: result.worktreePath,
          worktreeBranch: result.worktreeBranch,
          message: `${verb} worktree at ${result.worktreePath}${branchSuffix}. The session is now working in the worktree. Use ExitWorktree to leave mid-session, or exit the session to be prompted.`
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      message
    }: EnterWorktreeOutput, toolUseId: string) {
      return {
        type: "tool_result",
        content: message,
        tool_use_id: toolUseId
      };
    }
  });
});

// Readable aliases for the cross-chunk-referenced bindings (no behavior change).
export {pathModule as QWa,getInputSchema as jOp,getOutputSchema as WOp,PmK as ZWa,WmK as eGa};
