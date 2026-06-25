// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {hh,ace} from "./4441_tabAwareSeparator.ts";
import {vs,dm} from "../../vendor/m2256.ts";
import {Y$n,n3t} from "../../vendor/m3927.ts";
import {fa,ry} from "../../vendor/m2253.ts";
import {fb,sce} from "./3934_file_path.ts";
import {Ec,dw} from "../../vendor/m2593.ts";
import {v6t,f8n,t8e,Mmt} from "../../vendor/m4357.ts";
import {iL,dye} from "./3938_items.ts";
import {readRoster as Cc,XR} from "../../vendor/m2707.ts";
import {getActiveWorktree as z$,r6e} from "./3940_pattern.ts";
import {su,ow} from "../../vendor/m2257.ts";
import {nz,_E,cO} from "../telemetry/2249_cO.ts";
import {Ukt,_xr,Ph} from "../agent/1459_agentType.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {notifyMemoryWrite as L8n,N8n} from "../telemetry/4376_stopMemoryWatcher.ts";
import {jnl,Ynl} from "../../vendor/m4369.ts";
import {Vnl,Knl} from "../../vendor/m4368.ts";
import {registerHookCallbacks as jde,lt} from "../session/0132_sent.ts";
// @ts-nocheck
/** Module exports namespace object (populated by ft) */
var Vrl = {};
ft(Vrl, {
  registerSessionFileAccessHooks: () => registerSessionFileAccessHooks,
  isMemoryFileAccess: () => isMemoryFileAccess
});

/**
 * Extract the file_path from a tool's input for read/edit/write tool names.
 * Returns null for unrecognized tool names.
 */
function Grl(toolName: any, toolInput: any): any {
  switch (toolName) {
    case vs:
      {
        let parsed = hh.inputSchema.safeParse(toolInput);
        return parsed.success ? parsed.data.file_path : null;
      }
    case fa:
      {
        let parsed = Y$n().safeParse(toolInput);
        return parsed.success ? parsed.data.file_path : null;
      }
    case Ec:
      {
        let parsed = fb.inputSchema.safeParse(toolInput);
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
function u8p(toolName: any, toolInput: any): any {
  switch (toolName) {
    case vs:
      {
        let parsed = hh.inputSchema.safeParse(toolInput);
        if (!parsed.success) return null;
        return v6t(parsed.data.file_path);
      }
    case Cc:
      {
        let parsed = iL.inputSchema.safeParse(toolInput);
        if (!parsed.success) return null;
        if (parsed.data.path) {
          let resolvedPath = v6t(parsed.data.path);
          if (resolvedPath) return resolvedPath;
        }
        if (parsed.data.glob) {
          let resolvedGlob = f8n(parsed.data.glob);
          if (resolvedGlob) return resolvedGlob;
        }
        return null;
      }
    case su:
      {
        let parsed = z$.inputSchema.safeParse(toolInput);
        if (!parsed.success) return null;
        if (parsed.data.path) {
          let resolvedPath = v6t(parsed.data.path);
          if (resolvedPath) return resolvedPath;
        }
        let resolvedGlob = f8n(parsed.data.pattern);
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
  let filePath = Grl(toolName, toolInput);
  if (filePath && (t8e(filePath) || nz(filePath))) return !0;
  return !1;
}

/**
 * PostToolUse hook callback: logs telemetry events for memory directory and
 * team memory file accesses, and returns near-cap warnings (team-mem prompt
 * index or memdir entrypoint) if needed.
 */
async function d8p(hookEvent: any, unused1: any, unused2: any): Promise<any> {
  if (hookEvent.hook_event_name !== "PostToolUse") return {};
  let resolvedDir = u8p(hookEvent.tool_name, hookEvent.tool_input),
    agentStore = Ukt.getStore(),
    agentName = agentStore ? _xr(agentStore) : void 0,
    subagentContext = agentName ? {
      subagent_name: agentName
    } : {};
  if (resolvedDir === "session_transcript") W("tengu_transcript_accessed", {
    ...subagentContext
  });
  let filePath = Grl(hookEvent.tool_name, hookEvent.tool_input);
  if (filePath && t8e(filePath)) switch (W("tengu_memdir_accessed", {
    tool: hookEvent.tool_name,
    ...subagentContext
  }), hookEvent.tool_name) {
    case vs:
      W("tengu_memdir_file_read", {
        ...subagentContext
      });
      break;
    case fa:
      W("tengu_memdir_file_edit", {
        ...subagentContext
      }), L8n(filePath);
      break;
    case Ec:
      W("tengu_memdir_file_write", {
        ...subagentContext
      }), L8n(filePath);
      break;
  }
  if (filePath && nz(filePath)) switch (W("tengu_team_mem_accessed", {
    tool: hookEvent.tool_name,
    ...subagentContext
  }), hookEvent.tool_name) {
    case vs:
      W("tengu_team_mem_file_read", {
        ...subagentContext
      });
      break;
    case fa:
      W("tengu_team_mem_file_edit", {
        ...subagentContext
      });
      break;
    case Ec:
      W("tengu_team_mem_file_write", {
        ...subagentContext
      });
      break;
  }
  if (filePath && (hookEvent.tool_name === fa || hookEvent.tool_name === Ec) && nz(filePath)) {
    let nearCapMessage = await jnl(filePath, _E());
    if (nearCapMessage !== null) return W("tengu_team_mem_prompt_index_near_cap", {
      ...subagentContext
    }), {
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: nearCapMessage
      }
    };
  }
  if (filePath && (hookEvent.tool_name === fa || hookEvent.tool_name === Ec)) {
    let entrypointMessage = await Vnl(filePath);
    if (entrypointMessage !== null) return W("tengu_memdir_entrypoint_near_cap", {
      ...subagentContext
    }), {
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: entrypointMessage
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
    callback: d8p,
    timeout: 1,
    internal: !0
  };
  jde({
    PostToolUse: [{
      matcher: vs,
      hooks: [hookEntry]
    }, {
      matcher: Cc,
      hooks: [hookEntry]
    }, {
      matcher: su,
      hooks: [hookEntry]
    }, {
      matcher: fa,
      hooks: [hookEntry]
    }, {
      matcher: Ec,
      hooks: [hookEntry]
    }]
  });
}

/** Module initializer — runs all vendor/peer module init functions */
var dSo = b(() => {
  lt();
  cO();
  kt();
  Knl();
  Ynl();
  N8n();
  ry();
  n3t();
  ace();
  dm();
  sce();
  dw();
  r6e();
  ow();
  dye();
  XR();
  Mmt();
  Ph();
});

export {Vrl,Grl,u8p,isMemoryFileAccess,d8p,registerSessionFileAccessHooks,dSo};
