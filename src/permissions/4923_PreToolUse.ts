// @ts-nocheck
import {kvl as Ef4,Dvl as bf4,uft as YO_} from "../../vendor/m4921.ts";
import {getRegisteredHooks as ru,lt as w_} from "../session/0131_sent.ts";
import {b as L} from "../../runtime.ts";
import {ta as c7,wn as V6} from "../../vendor/m45.ts";
// Permissions subsystem: hook event registry builder and metadata catalog.
//
// This module owns two concerns:
//  1. A memoized factory (`getHookEventMetadata`) that returns per-event
//     descriptive metadata (summary, description, optional matcherMetadata
//     with fieldToMatch + allowed values) keyed by the current tool-name set.
//  2. `buildHooksByEvent` — the main hook registry builder called at session
//     start. It collects hook entries from all settings sources (via `Ef4`),
//     merges plugin-provided hooks (via `getRegisteredHooks` / `ru`), and
//     returns the complete `hooksByEvent` map used to drive hook dispatch.
//
// NOTE: Cross-module symbols (`Ef4`, `bf4`, `ru`, `V6`, `c7`, `w_`, `YO_`,
// `xg6`) are kept under their original minified names to preserve linkage.

// ---------------------------------------------------------------------------
// Types inferred from usage
// ---------------------------------------------------------------------------

/** Per-event matcher configuration describing which field to match against
 *  and the set of known/allowed values. */
interface MatcherMetadata {
  fieldToMatch: string;
  values: string[];
}

/** Descriptive metadata for a single hook event type. */
interface HookEventMetadata {
  summary: string;
  description: string;
  matcherMetadata?: MatcherMetadata;
}

/** A registry of hook event metadata, one entry per event name. */
type HookEventMetadataMap = Record<string, HookEventMetadata>;

/** A single concrete hook entry stored in the hook registry bucket. */
interface HookEntry {
  event: string;
  config: unknown;
  matcher?: string;
  source: string;
  pluginName?: string;
}

/** A plugin hook group as stored in the registered-hooks state:
 *  contains a matcher, a list of hook configs, and plugin identity fields. */
interface PluginHookGroup {
  matcher?: string;
  hooks: unknown[];
  pluginRoot?: string; // presence signals this is a plugin hook group
  pluginId?: string;
}

/** The per-event index in the hook registry:
 *  a mapping from matcher key (string) → array of hook entries. */
type EventHookBucket = Record<string, HookEntry[]>;

/** The full hook registry, one EventHookBucket per event name. */
type HooksByEvent = Record<string, EventHookBucket>;

/** Shape of the object returned by `getRegisteredHooks` (`ru`):
 *  maps event names to arrays of plugin hook groups. */
type RegisteredHooksMap = Record<string, PluginHookGroup[]>;

// ---------------------------------------------------------------------------
// Hook registry builder
// ---------------------------------------------------------------------------

/**
 * Build the per-session hook registry (`hooksByEvent`) by collecting hook
 * entries from all config sources and merging plugin-registered hooks.
 *
 * @param toolNames  The current set of available tool names (used to
 *                   populate `matcherMetadata.values` in the metadata catalog).
 * @param tools      Opaque tools value forwarded to the memoized metadata
 *                   factory as its cache key input.
 * @returns          A `HooksByEvent` map: for each known event name, a Record
 *                   from matcher-key string → array of `HookEntry` objects.
 */
function buildHooksByEvent(toolNames: string[], tools: unknown): HooksByEvent {
  let hooksByEvent: HooksByEvent = {
      PreToolUse: {},
      PostToolUse: {},
      PostToolUseFailure: {},
      PostToolBatch: {},
      PermissionDenied: {},
      Notification: {},
      UserPromptSubmit: {},
      UserPromptExpansion: {},
      SessionStart: {},
      SessionEnd: {},
      Stop: {},
      StopFailure: {},
      SubagentStart: {},
      SubagentStop: {},
      PreCompact: {},
      PostCompact: {},
      PermissionRequest: {},
      Setup: {},
      TeammateIdle: {},
      TaskCreated: {},
      TaskCompleted: {},
      Elicitation: {},
      ElicitationResult: {},
      ConfigChange: {},
      WorktreeCreate: {},
      WorktreeRemove: {},
      InstructionsLoaded: {},
      CwdChanged: {},
      FileChanged: {},
      MessageDisplay: {}
    },
    hookEventMetadata = xg6(tools);
  Ef4(toolNames).forEach((hookEntry: HookEntry) => {
    let eventBucket = hooksByEvent[hookEntry.event];
    if (eventBucket) {
      let matcherKey = hookEventMetadata[hookEntry.event].matcherMetadata !== void 0 ? hookEntry.matcher || "" : "";
      if (!eventBucket[matcherKey]) eventBucket[matcherKey] = [];
      eventBucket[matcherKey].push(hookEntry);
    }
  });
  let registeredHooks: RegisteredHooksMap | undefined = ru();
  if (registeredHooks) for (let [eventName, pluginGroups] of Object.entries(registeredHooks)) {
    let eventKey = eventName,
      eventBucket = hooksByEvent[eventKey];
    if (!eventBucket) continue;
    for (let pluginHookGroup of pluginGroups) {
      let matcherKey = pluginHookGroup.matcher || "";
      if ("pluginRoot" in pluginHookGroup) {
        eventBucket[matcherKey] ??= [];
        for (let hookConfig of pluginHookGroup.hooks) eventBucket[matcherKey].push({
          event: eventKey,
          config: hookConfig,
          matcher: pluginHookGroup.matcher,
          source: "pluginHook",
          pluginName: pluginHookGroup.pluginId
        });
      }
    }
  }
  return hooksByEvent;
}

/**
 * Return the sorted list of matcher keys registered for a given event in the
 * hook registry, using the source-priority sort from `bf4`.
 *
 * @param hooksByEvent  The registry produced by `buildHooksByEvent`.
 * @param eventName     The event name to look up.
 * @returns             Sorted array of matcher-key strings.
 */
function getSortedMatcherKeys(hooksByEvent: HooksByEvent, eventName: string): string[] {
  let matcherKeys = Object.keys(hooksByEvent[eventName] || {});
  return bf4(matcherKeys, hooksByEvent, eventName);
}

/**
 * Retrieve the list of hook entries for a given event and optional matcher key.
 *
 * @param hooksByEvent  The registry produced by `buildHooksByEvent`.
 * @param eventName     The event name to look up.
 * @param matcherKey    Optional matcher key; defaults to `""` (unmatched).
 * @returns             Array of `HookEntry` objects (empty if none registered).
 */
function getHookEntriesForMatcher(hooksByEvent: HooksByEvent, eventName: string, matcherKey?: string): HookEntry[] {
  let resolvedKey = matcherKey ?? "";
  return hooksByEvent[eventName]?.[resolvedKey] ?? [];
}

/**
 * Return the `MatcherMetadata` for a given event name (or undefined if the
 * event does not support matcher-based filtering).
 *
 * @param eventName  The hook event name.
 * @param tools      The tools value forwarded to the memoized metadata factory.
 * @returns          `MatcherMetadata` or `undefined`.
 */
function getMatcherMetadataForEvent(eventName: string, tools: unknown): MatcherMetadata | undefined {
  return xg6(tools)[eventName].matcherMetadata;
}

// ---------------------------------------------------------------------------
// Memoized hook event metadata factory
// ---------------------------------------------------------------------------

var xg6: (tools: unknown) => HookEventMetadataMap;

/** Lazy module initializer for the hook registry subsystem. */
var mf4 = L(() => {
  c7();
  w_();
  YO_();
  xg6 = V6(function (toolNames: string[]): HookEventMetadataMap {
    return {
      PreToolUse: {
        summary: "Before tool execution",
        description: `Input to command is JSON of tool call arguments.
Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and block tool call
Other exit codes - show stderr to user only but continue with tool call`,
        matcherMetadata: {
          fieldToMatch: "tool_name",
          values: toolNames
        }
      },
      PostToolUse: {
        summary: "After tool execution",
        description: `Input to command is JSON with fields "inputs" (tool call arguments) and "response" (tool call response).
Exit code 0 - stdout shown in transcript mode (ctrl+o)
Exit code 2 - show stderr to model immediately
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "tool_name",
          values: toolNames
        }
      },
      PostToolUseFailure: {
        summary: "After tool execution fails",
        description: `Input to command is JSON with tool_name, tool_input, tool_use_id, error, error_type, is_interrupt, and is_timeout.
Exit code 0 - stdout shown in transcript mode (ctrl+o)
Exit code 2 - show stderr to model immediately
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "tool_name",
          values: toolNames
        }
      },
      PostToolBatch: {
        summary: "After a batch of tool calls resolves",
        description: `Fires once after every tool call in a batch has resolved, before the next model request. Input includes tool_calls (array of {tool_name, tool_input, tool_use_id, tool_response}).
Return additionalContext via hookSpecificOutput to inject context once for the whole batch.
Exit code 2 - stop the agentic loop (stderr shown to user only)
Other exit codes - show stderr to user only`
      },
      PermissionDenied: {
        summary: "After auto mode classifier denies a tool call",
        description: `Input to command is JSON with tool_name, tool_input, tool_use_id, and reason.
Return {"hookSpecificOutput":{"hookEventName":"PermissionDenied","retry":true}} to tell the model it may retry.
Exit code 0 - stdout shown in transcript mode (ctrl+o)
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "tool_name",
          values: toolNames
        }
      },
      Notification: {
        summary: "When notifications are sent",
        description: `Input to command is JSON with notification message and type.
Exit code 0 - stdout/stderr not shown
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "notification_type",
          values: ["permission_prompt", "idle_prompt", "auth_success", "elicitation_dialog", "elicitation_complete", "elicitation_response"]
        }
      },
      UserPromptSubmit: {
        summary: "When the user submits a prompt",
        description: `Input to command is JSON with original user prompt text.
Exit code 0 - stdout shown to Claude
Exit code 2 - block processing, erase original prompt, and show stderr to user only
Other exit codes - show stderr to user only`
      },
      UserPromptExpansion: {
        summary: "When a user-typed slash command expands into a prompt",
        description: `Input to command is JSON with expansion_type, command_name, command_args, command_source, and original prompt.
Exit code 0 - stdout shown to Claude
Exit code 2 - block expansion and show stderr to user only
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "command_name",
          values: []
        }
      },
      SessionStart: {
        summary: "When a new session is started",
        description: `Input to command is JSON with session start source.
Exit code 0 - stdout shown to Claude
Blocking errors are ignored
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "source",
          values: ["startup", "resume", "clear", "compact"]
        }
      },
      Stop: {
        summary: "Right before Claude concludes its response",
        description: `Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and continue conversation
Other exit codes - show stderr to user only`
      },
      StopFailure: {
        summary: "When the turn ends due to an API error",
        description: "Fires instead of Stop when an API error (rate limit, auth failure, etc.) ended the turn. Fire-and-forget — hook output and exit codes are ignored.",
        matcherMetadata: {
          fieldToMatch: "error",
          values: ["rate_limit", "overloaded", "authentication_failed", "oauth_org_not_allowed", "billing_error", "invalid_request", "model_not_found", "server_error", "max_output_tokens", "unknown"]
        }
      },
      SubagentStart: {
        summary: "When a subagent (Agent tool call) is started",
        description: `Input to command is JSON with agent_id and agent_type.
Exit code 0 - stdout shown to subagent
Blocking errors are ignored
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "agent_type",
          values: []
        }
      },
      SubagentStop: {
        summary: "Right before a subagent (Agent tool call) concludes its response",
        description: `Input to command is JSON with agent_id, agent_type, and agent_transcript_path.
Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to subagent and continue having it run
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "agent_type",
          values: []
        }
      },
      PreCompact: {
        summary: "Before conversation compaction",
        description: `Input to command is JSON with compaction details.
Exit code 0 - stdout appended as custom compact instructions
Exit code 2 - block compaction
Other exit codes - show stderr to user only but continue with compaction`,
        matcherMetadata: {
          fieldToMatch: "trigger",
          values: ["manual", "auto"]
        }
      },
      PostCompact: {
        summary: "After conversation compaction",
        description: `Input to command is JSON with compaction details and the summary.
Exit code 0 - stdout shown to user
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "trigger",
          values: ["manual", "auto"]
        }
      },
      SessionEnd: {
        summary: "When a session is ending",
        description: `Input to command is JSON with session end reason.
Exit code 0 - command completes successfully
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "reason",
          values: ["clear", "logout", "prompt_input_exit", "other"]
        }
      },
      PermissionRequest: {
        summary: "When a permission dialog is displayed",
        description: `Input to command is JSON with tool_name, tool_input, and tool_use_id.
Output JSON with hookSpecificOutput containing decision to allow or deny.
Exit code 0 - use hook decision if provided
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "tool_name",
          values: toolNames
        }
      },
      Setup: {
        summary: "Repo setup hooks for init and maintenance",
        description: `Input to command is JSON with trigger (init or maintenance).
Exit code 0 - stdout shown to Claude
Blocking errors are ignored
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "trigger",
          values: ["init", "maintenance"]
        }
      },
      TeammateIdle: {
        summary: "When a teammate is about to go idle",
        description: `Input to command is JSON with teammate_name and team_name.
Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to teammate and prevent idle (teammate continues working)
Other exit codes - show stderr to user only`
      },
      TaskCreated: {
        summary: "When a task is being created",
        description: `Input to command is JSON with task_id, task_subject, task_description, teammate_name, and team_name.
Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and prevent task creation
Other exit codes - show stderr to user only`
      },
      TaskCompleted: {
        summary: "When a task is being marked as completed",
        description: `Input to command is JSON with task_id, task_subject, task_description, teammate_name, and team_name.
Exit code 0 - stdout/stderr not shown
Exit code 2 - show stderr to model and prevent task completion
Other exit codes - show stderr to user only`
      },
      Elicitation: {
        summary: "When an MCP server requests user input (elicitation)",
        description: `Input to command is JSON with mcp_server_name, message, and requested_schema.
Output JSON with hookSpecificOutput containing action (accept/decline/cancel) and optional content.
Exit code 0 - use hook response if provided
Exit code 2 - deny the elicitation
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "mcp_server_name",
          values: []
        }
      },
      ElicitationResult: {
        summary: "After a user responds to an MCP elicitation",
        description: `Input to command is JSON with mcp_server_name, action, content, mode, and elicitation_id.
Output JSON with hookSpecificOutput containing optional action and content to override the response.
Exit code 0 - use hook response if provided
Exit code 2 - block the response (action becomes decline)
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "mcp_server_name",
          values: []
        }
      },
      ConfigChange: {
        summary: "When configuration files change during a session",
        description: `Input to command is JSON with source (user_settings, project_settings, local_settings, policy_settings, skills) and file_path.
Exit code 0 - allow the change
Exit code 2 - block the change from being applied to the session
Other exit codes - show stderr to user only`,
        matcherMetadata: {
          fieldToMatch: "source",
          values: ["user_settings", "project_settings", "local_settings", "policy_settings", "skills"]
        }
      },
      InstructionsLoaded: {
        summary: "When an instruction file (CLAUDE.md or rule) is loaded",
        description: `Input to command is JSON with file_path, memory_type (User, Project, Local, Managed), load_reason (session_start, nested_traversal, path_glob_match, include, compact), globs (optional — the paths: frontmatter patterns that matched), trigger_file_path (optional — the file Claude touched that caused the load), and parent_file_path (optional — the file that @-included this one).
Exit code 0 - command completes successfully
Other exit codes - show stderr to user only
This hook is observability-only and does not support blocking.`,
        matcherMetadata: {
          fieldToMatch: "load_reason",
          values: ["session_start", "nested_traversal", "path_glob_match", "include", "compact"]
        }
      },
      WorktreeCreate: {
        summary: "Create an isolated worktree for VCS-agnostic isolation",
        description: `Input to command is JSON with name (suggested worktree slug).
Stdout should contain the absolute path to the created worktree directory.
Exit code 0 - worktree created successfully
Other exit codes - worktree creation failed`
      },
      WorktreeRemove: {
        summary: "Remove a previously created worktree",
        description: `Input to command is JSON with worktree_path (absolute path to worktree).
Exit code 0 - worktree removed successfully
Other exit codes - show stderr to user only`
      },
      CwdChanged: {
        summary: "After the working directory changes",
        description: `Input to command is JSON with old_cwd and new_cwd.
CLAUDE_ENV_FILE is set — write bash exports there to apply env to subsequent BashTool commands.
Hook output can include hookSpecificOutput.watchPaths (array of absolute paths) to register with the FileChanged watcher.
Exit code 0 - command completes successfully
Other exit codes - show stderr to user only`
      },
      FileChanged: {
        summary: "When a watched file changes",
        description: `Input to command is JSON with file_path and event (change, add, unlink).
CLAUDE_ENV_FILE is set — write bash exports there to apply env to subsequent BashTool commands.
The matcher field specifies filenames to watch in the current directory (e.g. ".envrc|.env").
Hook output can include hookSpecificOutput.watchPaths (array of absolute paths) to dynamically update the watch list.
Exit code 0 - command completes successfully
Other exit codes - show stderr to user only`
      },
      MessageDisplay: {
        summary: "While assistant message text is displayed",
        description: `Input to command is JSON with turn_id, message_id, index, final, and delta (the newly completed lines).
Output JSON with hookSpecificOutput containing displayContent to replace the delta on screen.
Display-only: the stored message and what the model sees are untouched.
Exit code 0 - use hook response if provided
Other exit codes - display the original delta`
      }
    };
  }, (toolNames: string[]) => toolNames.slice().sort().join(","));
});

export {buildHooksByEvent as Pvl,getSortedMatcherKeys as Ovl,getHookEntriesForMatcher as Lvl,getMatcherMetadataForEvent as A8t,xg6 as gVn,mf4 as Mvl};
