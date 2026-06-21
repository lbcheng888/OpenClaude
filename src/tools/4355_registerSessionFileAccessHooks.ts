// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {gh,Rce} from "./4419_tabAwareSeparator.ts";
import {Ws,ef} from "../../vendor/m2248.ts";
import {o$n,q$t} from "../../vendor/m4060.ts";
import {Ua,ty} from "../../vendor/m2245.ts";
import {_b,wce} from "./4066_file_path.ts";
import {zc,ex} from "../../vendor/m2582.ts";
import {i4t,X4n,x6e,Ndt} from "../../vendor/m4337.ts";
import {UL,Jge} from "./3918_items.ts";
import {$c,Vw} from "../../vendor/m2695.ts";
import {T9,$4e} from "./3920_pattern.ts";
import {yu,VR} from "../../vendor/m2249.ts";
import {xK,dE,GO} from "../telemetry/2241_GO.ts";
import {mwt,$$s,S_} from "../agent/1454_agentType.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {notifyMemoryWrite,hqn} from "../telemetry/4354_stopMemoryWatcher.ts";
import {yJa,TJa} from "../../vendor/m4347.ts";
import {registerHookCallbacks,lt} from "../session/0131_sent.ts";
/** Module exports namespace object (populated by isFullscreenWithTTY) */
var uXa = {};
isFullscreenWithTTY(uXa, {
  registerSessionFileAccessHooks: () => registerSessionFileAccessHooks,
  isMemoryFileAccess: () => isMemoryFileAccess
});

/**
 * Extract the file_path from a tool's input for read/edit/write tool names.
 * Returns null for unrecognized tool names.
 */
function cXa(toolName: any, toolInput: any): any {
  switch (toolName) {
    case Ws:
      {
        let parsed = gh.inputSchema.safeParse(toolInput);
        return parsed.success ? parsed.data.file_path : null;
      }
    case Ua:
      {
        let parsed = o$n().safeParse(toolInput);
        return parsed.success ? parsed.data.file_path : null;
      }
    case zc:
      {
        let parsed = _b.inputSchema.safeParse(toolInput);
        return parsed.success ? parsed.data.file_path : null;
      }
    default:
      return null;
  }
}

/**
 * Extract a directory/glob path from a tool's input for directory/glob/search tools.
 * Returns null if the tool is not recognized or the input is invalid.
 */
function xUp(toolName: any, toolInput: any): any {
  switch (toolName) {
    case Ws:
      {
        let parsed = gh.inputSchema.safeParse(toolInput);
        if (!parsed.success) return null;
        return i4t(parsed.data.file_path);
      }
    case $c:
      {
        let parsed = UL.inputSchema.safeParse(toolInput);
        if (!parsed.success) return null;
        if (parsed.data.path) {
          let resolvedPath = i4t(parsed.data.path);
          if (resolvedPath) return resolvedPath;
        }
        if (parsed.data.glob) {
          let resolvedGlob = X4n(parsed.data.glob);
          if (resolvedGlob) return resolvedGlob;
        }
        return null;
      }
    case yu:
      {
        let parsed = T9.inputSchema.safeParse(toolInput);
        if (!parsed.success) return null;
        if (parsed.data.path) {
          let resolvedPath = i4t(parsed.data.path);
          if (resolvedPath) return resolvedPath;
        }
        let resolvedGlob = X4n(parsed.data.pattern);
        if (resolvedGlob) return resolvedGlob;
        return null;
      }
    default:
      return null;
  }
}

/**
 * Returns true if the tool use accesses a memory file (personal or team memory directory).
 */
function isMemoryFileAccess(toolName: any, toolInput: any): any {
  let filePath = cXa(toolName, toolInput);
  if (filePath && (x6e(filePath) || xK(filePath))) return !0;
  return !1;
}

/**
 * PostToolUse hook callback: logs telemetry events for memory directory and
 * team memory file accesses, and returns a prompt index near-cap warning if needed.
 */
async function kUp(hookEvent: any, unused1: any, unused2: any): Promise<any> {
  if (hookEvent.hook_event_name !== "PostToolUse") return {};
  let resolvedDir = xUp(hookEvent.tool_name, hookEvent.tool_input),
    agentStore = mwt.getStore(),
    agentName = agentStore ? $$s(agentStore) : void 0,
    subagentContext = agentName ? {
      subagent_name: agentName
    } : {};
  if (resolvedDir === "session_transcript") logEvent("tengu_transcript_accessed", {
    ...subagentContext
  });
  let filePath = cXa(hookEvent.tool_name, hookEvent.tool_input);
  if (filePath && x6e(filePath)) switch (logEvent("tengu_memdir_accessed", {
    tool: hookEvent.tool_name,
    ...subagentContext
  }), hookEvent.tool_name) {
    case Ws:
      logEvent("tengu_memdir_file_read", {
        ...subagentContext
      });
      break;
    case Ua:
      logEvent("tengu_memdir_file_edit", {
        ...subagentContext
      }), notifyMemoryWrite(filePath);
      break;
    case zc:
      logEvent("tengu_memdir_file_write", {
        ...subagentContext
      }), notifyMemoryWrite(filePath);
      break;
  }
  if (filePath && xK(filePath)) switch (logEvent("tengu_team_mem_accessed", {
    tool: hookEvent.tool_name,
    ...subagentContext
  }), hookEvent.tool_name) {
    case Ws:
      logEvent("tengu_team_mem_file_read", {
        ...subagentContext
      });
      break;
    case Ua:
      logEvent("tengu_team_mem_file_edit", {
        ...subagentContext
      });
      break;
    case zc:
      logEvent("tengu_team_mem_file_write", {
        ...subagentContext
      });
      break;
  }
  if (filePath && (hookEvent.tool_name === Ua || hookEvent.tool_name === zc) && xK(filePath)) {
    let nearCapMessage = await yJa(filePath, dE());
    if (nearCapMessage !== null) return logEvent("tengu_team_mem_prompt_index_near_cap", {
      ...subagentContext
    }), {
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: nearCapMessage
      }
    };
  }
  return {};
}

/**
 * Register PostToolUse hook callbacks for all relevant file-access tool names
 * so that memory file accesses are tracked and telemetry is emitted.
 */
function registerSessionFileAccessHooks(): any {
  let hookEntry = {
    type: "callback",
    callback: kUp,
    timeout: 1,
    internal: !0
  };
  registerHookCallbacks({
    PostToolUse: [{
      matcher: Ws,
      hooks: [hookEntry]
    }, {
      matcher: $c,
      hooks: [hookEntry]
    }, {
      matcher: yu,
      hooks: [hookEntry]
    }, {
      matcher: Ua,
      hooks: [hookEntry]
    }, {
      matcher: zc,
      hooks: [hookEntry]
    }]
  });
}

/** Module initializer — runs all vendor/peer module init functions */
var yAo = b(() => {
  lt();
  GO();
  Ct();
  TJa();
  hqn();
  ty();
  q$t();
  Rce();
  ef();
  wce();
  ex();
  $4e();
  VR();
  Jge();
  Vw();
  Ndt();
  S_();
});
export {uXa,cXa,xUp,isMemoryFileAccess,kUp,registerSessionFileAccessHooks,yAo};
