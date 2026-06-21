// @ts-nocheck
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {Clt,KHe,zHe} from "../../vendor/m3880.ts";
import {Wut,d3n} from "../permissions/4203_TEAMMATE_SYSTEM_PROMPT_ADDENDUM.ts";
import {fwt} from "../../vendor/m1454.ts";
import {writeToMailbox,createShutdownRequestMessage,Tx} from "../permissions/3886_writeToMailbox.ts";
import {jge,IDa,YHe} from "../../vendor/m3881.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {b} from "../../runtime.ts";
/** In-process backend: runs agents in the same process via the task registry. */
class Fja {
  type = "in-process";
  context = null;
  setContext(agentContext: any) {
    this.context = agentContext;
  }
  async isAvailable() {
    return !0;
  }
  async spawn(spawnParams: any) {
    if (!this.context) return logForDebugging(`[InProcessBackend] spawn() called without context for ${spawnParams.name}`), {
      success: !1,
      agentId: `${spawnParams.name}@${spawnParams.teamName}`,
      error: "InProcessBackend not initialized. Call setContext() before spawn()."
    };
    logForDebugging(`[InProcessBackend] spawn() called for ${spawnParams.name}`);
    let spawnResult = await Clt({
      name: spawnParams.name,
      teamName: spawnParams.teamName,
      prompt: spawnParams.prompt,
      color: spawnParams.color,
      planModeRequired: spawnParams.planModeRequired ?? !1
    }, this.context);
    if (!spawnResult.ok) return {
      success: !1,
      agentId: spawnResult.agentId,
      error: spawnResult.error
    };
    return Wut({
      identity: spawnResult.identity,
      taskId: spawnResult.taskId,
      prompt: spawnParams.prompt,
      teammateContext: spawnResult.teammateContext,
      toolUseContext: {
        ...this.context,
        messages: []
      },
      abortController: spawnResult.abortController,
      model: spawnParams.model,
      systemPrompt: spawnParams.systemPrompt,
      systemPromptMode: spawnParams.systemPromptMode,
      allowedTools: spawnParams.permissions,
      allowPermissionPrompts: spawnParams.allowPermissionPrompts
    }), logForDebugging(`[InProcessBackend] Started agent execution for ${spawnResult.agentId}`), {
      success: !0,
      agentId: spawnResult.agentId,
      taskId: spawnResult.taskId,
      abortController: spawnResult.abortController
    };
  }
  async sendMessage(agentId: any, message: any) {
    logForDebugging(`[InProcessBackend] sendMessage() to ${agentId}: ${message.text.substring(0, 50)}...`);
    let parsed = fwt(agentId);
    if (!parsed) throw logForDebugging(`[InProcessBackend] Invalid agentId format: ${agentId}`), Error(`Invalid agentId format: ${agentId}. Expected format: agentName@teamName`);
    let {
      agentName: agentName,
      teamName: teamName
    } = parsed;
    await writeToMailbox(agentName, {
      text: message.text,
      from: message.from,
      color: message.color,
      timestamp: message.timestamp ?? new Date().toISOString()
    }, teamName), logForDebugging(`[InProcessBackend] sendMessage() completed for ${agentId}`);
  }
  async terminate(agentId: any, reason: any) {
    if (logForDebugging(`[InProcessBackend] terminate() called for ${agentId}: ${reason}`), !this.context) return logForDebugging(`[InProcessBackend] terminate() failed: no context set for ${agentId}`), !1;
    let appState = this.context.getAppState(),
      task = jge(agentId, appState.tasks);
    if (!task) return logForDebugging(`[InProcessBackend] terminate() failed: task not found for ${agentId}`), !1;
    if (task.shutdownRequested) return logForDebugging(`[InProcessBackend] terminate(): shutdown already requested for ${agentId}`), !0;
    let requestId = `shutdown-${agentId}-${Date.now()}`,
      shutdownMsg = createShutdownRequestMessage({
        requestId: requestId,
        from: "team-lead",
        reason: reason
      }),
      agentName = task.identity.agentName;
    return await writeToMailbox(agentName, {
      from: "team-lead",
      text: Le(shutdownMsg),
      timestamp: new Date().toISOString()
    }, task.identity.teamName), IDa(task.id, this.context.taskRegistry), logForDebugging(`[InProcessBackend] terminate() sent shutdown request to ${agentId}`), !0;
  }
  async kill(agentId: any) {
    if (logForDebugging(`[InProcessBackend] kill() called for ${agentId}`), !this.context) return logForDebugging(`[InProcessBackend] kill() failed: no context set for ${agentId}`), !1;
    let appState = this.context.getAppState(),
      task = jge(agentId, appState.tasks);
    if (!task) return logForDebugging(`[InProcessBackend] kill() failed: task not found for ${agentId}`), !1;
    let killResult = KHe(task.id, this.context.taskRegistry, this.context.setAppState);
    return logForDebugging(`[InProcessBackend] kill() ${killResult ? "succeeded" : "failed"} for ${agentId}`), killResult;
  }
  async isActive(agentId: any) {
    if (logForDebugging(`[InProcessBackend] isActive() called for ${agentId}`), !this.context) return logForDebugging(`[InProcessBackend] isActive() failed: no context set for ${agentId}`), !1;
    let appState = this.context.getAppState(),
      task = jge(agentId, appState.tasks);
    if (!task) return logForDebugging(`[InProcessBackend] isActive(): task not found for ${agentId}`), !1;
    let isRunning = task.status === "running",
      isAborted = task.abortController?.signal.aborted ?? !0,
      isActive = isRunning && !isAborted;
    return logForDebugging(`[InProcessBackend] isActive() for ${agentId}: ${isActive} (running=${isRunning}, aborted=${isAborted})`), isActive;
  }
}

/** Factory: create a new InProcessBackend instance. */
function Uja() {
  return new Fja();
}

/** Lazy init side-effects for this module's dependencies. */
var $ja = b(() => {
  YHe();
  qe();
  Xt();
  Tx();
  d3n();
  zHe();
});
export {Fja,Uja,$ja};
