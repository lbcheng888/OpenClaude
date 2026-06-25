// @ts-nocheck
import {w_o,wE} from "../../vendor/m5177.ts";
import {Kl,po} from "./5224_userPromptCount.ts";
import {$c,Ct} from "../../vendor/m197.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {wu,$k} from "../tui/2575_current.ts";
import {qt,tn} from "../config/0230_encoding.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {wl,sy} from "../../vendor/m2585.ts";
import {q6e,x3n} from "../../vendor/m4052.ts";
import {nu,lr} from "../../vendor/m233.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {r4t,xmo,s4t} from "./4091_type.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {b,x} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {Wo,at} from "../../vendor/m2557.ts";
import {initModelResolutionModule as iq,wC} from "../core/3298_result.ts";
import {O3t,pce} from "../../vendor/m3995.ts";
import {je} from "../../vendor/m2462.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {lIe,xI} from "../../vendor/m3295.ts";
import {v_o,wYa} from "../../vendor/m4263.ts";
import {tt} from "../../vendor/m2263.ts";
import {oe} from "../../vendor/m2275.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {lW} from "../../vendor/m2705.ts";
// Tool definition module: "Task Output" (aliases AgentOutputTool / BashOutputTool).
//
// Retrieves stdout/stderr/result output from a running or completed background
// task (local bash shell, local agent, or remote agent session) by task_id.
// The tool object is built via the shared tool factory `Ks` and exposed through
// the module-scope binding `s5n`; the lazy input schema is `N2p`. Those names,
// along with every imported/cross-module symbol, are preserved unchanged.
//
// Behavior is 1:1 with the obfuscated source — only local names, TS types, and
// comments were added.

/**
 * Normalize a registry task entry into the serializable output shape returned
 * by the tool. Fetches the task's textual output (from the shell command's
 * captured stdout/stderr when available, otherwise via `w_o(id)`), then layers
 * on type-specific fields (exit code, prompt, result, error, command).
 */
async function o5n(task) {
  let output;
  if (task.type === "local_bash") {
    let taskOutput = task.shellCommand?.taskOutput;
    if (taskOutput) {
      let stdout = await taskOutput.getStdout(),
        stderr = taskOutput.getStderr();
      output = [stdout, stderr].filter(Boolean).join(`
`);
    } else output = await w_o(task.id);
  } else output = await w_o(task.id);
  let base = {
    task_id: task.id,
    task_type: task.type,
    status: task.status,
    description: task.description,
    output: output
  };
  if (task.type === "local_bash") return {
    ...base,
    exitCode: task.result?.code ?? null
  };
  if (task.type === "local_agent") {
    let agentTask = task,
      truncatedResult = agentTask.result ? Kl(agentTask.result.content, `
`) : void 0;
    return {
      ...base,
      prompt: agentTask.prompt,
      result: truncatedResult || output,
      output: truncatedResult || output,
      error: agentTask.error
    };
  }
  if (task.type === "remote_agent") return {
    ...base,
    prompt: task.command
  };
  return base;
}

/**
 * Poll the app-state task registry for the task `taskId` until it leaves the
 * running/pending state, the timeout elapses, or the abort signal fires.
 * Returns the settled task, `null` if it disappears, or the last-known value on
 * timeout.
 */
async function F2p(taskId, getAppState, timeoutMs, abortController) {
  let startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    if (abortController?.signal.aborted) throw new $c();
    let task = getAppState().tasks?.[taskId];
    if (!task) return null;
    if (task.status !== "running" && task.status !== "pending") return task;
    await Kn(100);
  }
  return getAppState().tasks?.[taskId] ?? null;
}

/**
 * React component rendering a task-output result. Uses the React-compiler
 * memo cache (`kYa.c`) to memoize per-task subtrees. Renders different layouts
 * for local_bash, local_agent, and remote_agent task types.
 */
function B2p(props) {
  let cache = kYa.c(54),
    {
      content: content,
      verbose: verbose,
      theme: theme
    } = props,
    isVerbose = verbose === void 0 ? !1 : verbose,
    expandHint = wu("app:toggleTranscript", "Global", "ctrl+o"),
    parsedContent;
  if (cache[0] !== content) parsedContent = typeof content === "string" ? qt(content) : content, cache[0] = content, cache[1] = parsedContent;else parsedContent = cache[1];
  let result = parsedContent;
  if (!result.task) {
    let empty;
    if (cache[2] === Symbol.for("react.memo_cache_sentinel")) empty = Bm.jsx(Yn, {
      children: Bm.jsx(wl, {
        children: "No task output available"
      })
    }), cache[2] = empty;else empty = cache[2];
    return empty;
  }
  let {
    task: task
  } = result;
  if (task.task_type === "local_bash") {
    let bashResult;
    if (cache[3] !== task.error || cache[4] !== task.output) bashResult = {
      stdout: task.output,
      stderr: "",
      isImage: !1,
      dangerouslyDisableSandbox: !0,
      returnCodeInterpretation: task.error
    }, cache[3] = task.error, cache[4] = task.output, cache[5] = bashResult;else bashResult = cache[5];
    let bashContent = bashResult,
      bashView;
    if (cache[6] !== bashContent || cache[7] !== isVerbose) bashView = Bm.jsx(q6e, {
      content: bashContent,
      verbose: isVerbose
    }), cache[6] = bashContent, cache[7] = isVerbose, cache[8] = bashView;else bashView = cache[8];
    return bashView;
  }
  if (task.task_type === "local_agent") {
    let lineCount = task.result ? nu(task.result, `
`) + 1 : 0;
    if (result.retrieval_status === "success") {
      if (isVerbose) {
        let header;
        if (cache[9] !== lineCount || cache[10] !== task.description) header = Bm.jsxs(v, {
          children: [task.description, " (", lineCount, " lines)"]
        }), cache[9] = lineCount, cache[10] = task.description, cache[11] = header;else header = cache[11];
        let promptView;
        if (cache[12] !== task.prompt || cache[13] !== theme) promptView = task.prompt && Bm.jsx(r4t, {
          prompt: task.prompt,
          theme: theme,
          dim: !0
        }), cache[12] = task.prompt, cache[13] = theme, cache[14] = promptView;else promptView = cache[14];
        let resultView;
        if (cache[15] !== task.result || cache[16] !== theme) resultView = task.result && Bm.jsx($, {
          marginTop: 1,
          children: Bm.jsx(xmo, {
            content: [{
              type: "text",
              text: task.result
            }],
            theme: theme
          })
        }), cache[15] = task.result, cache[16] = theme, cache[17] = resultView;else resultView = cache[17];
        let errorView;
        if (cache[18] !== task.error) errorView = task.error && Bm.jsxs($, {
          flexDirection: "column",
          marginTop: 1,
          children: [Bm.jsx(v, {
            color: "error",
            bold: !0,
            children: "Error:"
          }), Bm.jsx($, {
            paddingLeft: 2,
            children: Bm.jsx(v, {
              color: "error",
              children: task.error
            })
          })]
        }), cache[18] = task.error, cache[19] = errorView;else errorView = cache[19];
        let bodyView;
        if (cache[20] !== promptView || cache[21] !== resultView || cache[22] !== errorView) bodyView = Bm.jsxs($, {
          flexDirection: "column",
          paddingLeft: 2,
          marginTop: 1,
          children: [promptView, resultView, errorView]
        }), cache[20] = promptView, cache[21] = resultView, cache[22] = errorView, cache[23] = bodyView;else bodyView = cache[23];
        let verboseView;
        if (cache[24] !== header || cache[25] !== bodyView) verboseView = Bm.jsxs($, {
          flexDirection: "column",
          children: [header, bodyView]
        }), cache[24] = header, cache[25] = bodyView, cache[26] = verboseView;else verboseView = cache[26];
        return verboseView;
      }
      let collapsedView;
      if (cache[27] !== expandHint) collapsedView = Bm.jsx(Yn, {
        children: Bm.jsxs(v, {
          dimColor: !0,
          children: ["Read output (", expandHint, " to expand)"]
        })
      }), cache[27] = expandHint, cache[28] = collapsedView;else collapsedView = cache[28];
      return collapsedView;
    }
    if (result.retrieval_status === "timeout" || task.status === "running") {
      let runningView;
      if (cache[29] === Symbol.for("react.memo_cache_sentinel")) runningView = Bm.jsx(Yn, {
        children: Bm.jsx(v, {
          dimColor: !0,
          children: "Task is still running…"
        })
      }), cache[29] = runningView;else runningView = cache[29];
      return runningView;
    }
    if (result.retrieval_status === "not_ready") {
      let notReadyView;
      if (cache[30] === Symbol.for("react.memo_cache_sentinel")) notReadyView = Bm.jsx(Yn, {
        children: Bm.jsx(v, {
          dimColor: !0,
          children: "Task is still running…"
        })
      }), cache[30] = notReadyView;else notReadyView = cache[30];
      return notReadyView;
    }
    let notReadyFallback;
    if (cache[31] === Symbol.for("react.memo_cache_sentinel")) notReadyFallback = Bm.jsx(Yn, {
      children: Bm.jsx(v, {
        dimColor: !0,
        children: "Task not ready"
      })
    }), cache[31] = notReadyFallback;else notReadyFallback = cache[31];
    return notReadyFallback;
  }
  if (task.task_type === "remote_agent") {
    let remoteHeader;
    if (cache[32] !== task.description || cache[33] !== task.status) remoteHeader = Bm.jsxs(v, {
      children: ["\xA0\xA0", task.description, " [", task.status, "]"]
    }), cache[32] = task.description, cache[33] = task.status, cache[34] = remoteHeader;else remoteHeader = cache[34];
    let remoteOutput;
    if (cache[35] !== task.output || cache[36] !== isVerbose) remoteOutput = task.output && isVerbose && Bm.jsx($, {
      paddingLeft: 4,
      marginTop: 1,
      children: Bm.jsx(v, {
        children: task.output
      })
    }), cache[35] = task.output, cache[36] = isVerbose, cache[37] = remoteOutput;else remoteOutput = cache[37];
    let remoteHint;
    if (cache[38] !== expandHint || cache[39] !== task.output || cache[40] !== isVerbose) remoteHint = !isVerbose && task.output && Bm.jsxs(v, {
      dimColor: !0,
      children: ["     ", "(", expandHint, " to expand)"]
    }), cache[38] = expandHint, cache[39] = task.output, cache[40] = isVerbose, cache[41] = remoteHint;else remoteHint = cache[41];
    let remoteView;
    if (cache[42] !== remoteHeader || cache[43] !== remoteOutput || cache[44] !== remoteHint) remoteView = Bm.jsxs($, {
      flexDirection: "column",
      children: [remoteHeader, remoteOutput, remoteHint]
    }), cache[42] = remoteHeader, cache[43] = remoteOutput, cache[44] = remoteHint, cache[45] = remoteView;else remoteView = cache[45];
    return remoteView;
  }
  let defaultHeader;
  if (cache[46] !== task.description || cache[47] !== task.status) defaultHeader = Bm.jsxs(v, {
    children: ["\xA0\xA0", task.description, " [", task.status, "]"]
  }), cache[46] = task.description, cache[47] = task.status, cache[48] = defaultHeader;else defaultHeader = cache[48];
  let defaultOutput;
  if (cache[49] !== task.output) defaultOutput = task.output && Bm.jsx($, {
    paddingLeft: 4,
    children: Bm.jsx(v, {
      children: task.output.slice(0, 500)
    })
  }), cache[49] = task.output, cache[50] = defaultOutput;else defaultOutput = cache[50];
  let defaultView;
  if (cache[51] !== defaultHeader || cache[52] !== defaultOutput) defaultView = Bm.jsxs($, {
    flexDirection: "column",
    children: [defaultHeader, defaultOutput]
  }), cache[51] = defaultHeader, cache[52] = defaultOutput, cache[53] = defaultView;else defaultView = cache[53];
  return defaultView;
}
var kYa, Bm, N2p, s5n;
var k_o = b(() => {
  Qr();
  sy();
  Wo();
  iq();
  O3t();
  Pl();
  je();
  $k();
  ri();
  Ct();
  po();
  lIe();
  tn();
  lr();
  wE();
  v_o();
  s4t();
  x3n();
  kYa = x(tt(), 1), Bm = x(oe(), 1), N2p = ve(() => C.strictObject({
    task_id: C.string().describe("The task ID to get output from"),
    block: xI(C.boolean().default(!0)).describe("Whether to wait for completion"),
    timeout: C.number().min(0).max(600000).default(30000).describe("Max wait time in ms")
  }));
  s5n = Ks({
    name: lW,
    searchHint: "read output/logs from a background task",
    maxResultSizeChars: 1e5,
    shouldDefer: !0,
    aliases: ["AgentOutputTool", "BashOutputTool", "AgentOutput", "BashOutput"],
    userFacingName() {
      return "Task Output";
    },
    get inputSchema() {
      return N2p();
    },
    async description() {
      return "[Deprecated] — for bash and remote_agent tasks, prefer Read on the output file path; for local_agent tasks, use the Agent tool result directly";
    },
    isConcurrencySafe(input) {
      return this.isReadOnly?.(input) ?? !1;
    },
    isEnabled() {
      return !0;
    },
    isReadOnly(input) {
      return !0;
    },
    toAutoClassifierInput(input) {
      return input.task_id;
    },
    async prompt() {
      return `DEPRECATED: Background tasks return their output file path in the tool result, and you receive a <task-notification> with the same path when the task completes.
- For bash tasks: prefer using the Read tool on that output file path — it contains stdout/stderr.
- For local_agent tasks: use the Agent tool result directly. Do NOT Read the .output file — it is a symlink to the full subagent conversation transcript (JSONL) and will overflow your context window.
- For remote_agent tasks: prefer using the Read tool on the output file path — it contains the streamed remote session output (same as bash).

- Retrieves output from a running or completed task (background shell, agent, or remote session)
- Takes a task_id parameter identifying the task
- Returns the task output along with status information
- Use block=true (default) to wait for task completion
- Use block=false for non-blocking check of current status
- Task IDs can be found using the /tasks command
- Works with all task types: background shells, async agents, and remote sessions`;
    },
    async validateInput({
      task_id: taskId
    }, {
      getAppState: getAppState
    }) {
      if (!taskId) return {
        result: !1,
        message: "Task ID is required",
        errorCode: 1
      };
      if (!getAppState().tasks?.[taskId]) return {
        result: !1,
        message: `No task found with ID: ${taskId}`,
        errorCode: 2
      };
      return {
        result: !0
      };
    },
    async call(input, context, n, r, onProgress) {
      let {
          task_id: taskId,
          block: block,
          timeout: timeoutMs
        } = input,
        task = context.getAppState().tasks?.[taskId];
      if (!task) throw Error(`No task found with ID: ${taskId}`);
      if (!block) {
        if (task.status !== "running" && task.status !== "pending") return context.taskRegistry.update(taskId, entry => ({
          ...entry,
          notified: !0
        })), {
          data: {
            retrieval_status: "success",
            task: await o5n(task)
          }
        };
        return {
          data: {
            retrieval_status: "not_ready",
            task: await o5n(task)
          }
        };
      }
      if (onProgress) onProgress({
        type: "progress",
        toolUseID: `task-output-waiting-${Date.now()}`,
        data: {
          type: "waiting_for_task",
          taskDescription: task.description,
          taskType: task.type
        }
      });
      let settledTask = await F2p(taskId, context.getAppState, timeoutMs, context.abortController);
      if (!settledTask) return {
        data: {
          retrieval_status: "timeout",
          task: null
        }
      };
      if (settledTask.status === "running" || settledTask.status === "pending") return {
        data: {
          retrieval_status: "timeout",
          task: await o5n(settledTask)
        }
      };
      return context.taskRegistry.update(taskId, entry => ({
        ...entry,
        notified: !0
      })), {
        data: {
          retrieval_status: "success",
          task: await o5n(settledTask)
        }
      };
    },
    mapToolResultToToolResultBlockParam(toolResult, toolUseId) {
      let lines = [];
      if (lines.push(`<retrieval_status>${toolResult.retrieval_status}</retrieval_status>`), toolResult.task) {
        if (lines.push(`<task_id>${toolResult.task.task_id}</task_id>`), lines.push(`<task_type>${toolResult.task.task_type}</task_type>`), lines.push(`<status>${toolResult.task.status}</status>`), toolResult.task.exitCode !== void 0 && toolResult.task.exitCode !== null) lines.push(`<exit_code>${toolResult.task.exitCode}</exit_code>`);
        if (toolResult.task.output?.trim()) {
          let {
            content: truncatedContent
          } = wYa(toolResult.task.output, toolResult.task.task_id);
          lines.push(`<output>
${truncatedContent.trimEnd()}
</output>`);
        }
        if (toolResult.task.error) lines.push(`<error>${toolResult.task.error}</error>`);
      }
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: lines.join(`

`)
      };
    },
    renderToolUseMessage(input) {
      let {
        block: block = !0
      } = input;
      if (!block) return "non-blocking";
      return "";
    },
    renderToolUseTag(input) {
      if (!input.task_id) return null;
      return Bm.jsxs(v, {
        dimColor: !0,
        children: [" ", input.task_id]
      });
    },
    renderToolUseProgressMessage(progressEvents) {
      let progressData = progressEvents.at(-1)?.data;
      return Bm.jsxs($, {
        flexDirection: "column",
        children: [progressData?.taskDescription && Bm.jsxs(v, {
          children: ["\xA0\xA0", progressData.taskDescription]
        }), Bm.jsxs(v, {
          children: ["\xA0\xA0\xA0\xA0\xA0Waiting for task", " ", Bm.jsx(v, {
            dimColor: !0,
            children: Bm.jsx(at, {
              chord: "escape",
              action: "give additional instructions",
              parens: !0,
              format: {
                keyCase: "lower"
              }
            })
          })]
        })]
      });
    },
    renderToolResultMessage(content, t, {
      verbose: verbose,
      theme: theme
    }) {
      return Bm.jsx(B2p, {
        content: content,
        verbose: verbose,
        theme: theme
      });
    },
    renderToolUseRejectedMessage() {
      return Bm.jsx(pce, {});
    },
    renderToolUseErrorMessage(result, {
      verbose: verbose
    }) {
      return Bm.jsx(wC, {
        result: result,
        verbose: verbose
      });
    }
  });
});

export {o5n,F2p,B2p,kYa,Bm,N2p,s5n,k_o};
