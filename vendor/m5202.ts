// @ts-nocheck
import {b} from "../runtime.ts";
import {Q3l,executePreCompactHooks,executePostCompactHooks} from "./m5188.ts";
import {Z3l,executeConfigChangeHooks} from "./m5189.ts";
import {e4l,executeElicitationHooks,executeElicitationResultHooks} from "./m5190.ts";
import {n4l,executeCwdChangedHooks,executeFileChangedHooks} from "./m5191.ts";
import {r4l,executeInstructionsLoadedHooks} from "./m5192.ts";
import {VOo,executeMessageDisplayHooks} from "./m5193.ts";
import {o4l,executeNotificationHooks} from "./m5194.ts";
import {s4l,executeSessionStartHooks,executeSessionEndHooks,executeSetupHooks,executeSubagentStartHooks} from "./m5195.ts";
import {u4l,executeStopHooks,executeStopFailureHooks} from "./m5197.ts";
import {d4l,executeTeammateIdleHooks,executeTaskCreatedHooks,executeTaskCompletedHooks} from "./m5198.ts";
import {p4l,executePreToolHooks,executePostToolHooks,executePostToolUseFailureHooks,executePostToolBatchHooks,executePermissionDeniedHooks,executePermissionRequestHooks} from "../src/hooks/5200_level.ts";
import {Nmo,executeUserPromptExpansionHooks} from "./m4092.ts";
import {f4l,executeUserPromptSubmitHooks} from "./m5200.ts";
import {h4l,executeWorktreeCreateHook,executeWorktreeRemoveHook} from "./m5201.ts";
var HOOK_EVENT_REGISTRY;
var g4l=b(()=>{Q3l();Z3l();e4l();n4l();r4l();VOo();o4l();s4l();u4l();d4l();p4l();Nmo();f4l();h4l();HOOK_EVENT_REGISTRY={PreToolUse:executePreToolHooks,PostToolUse:executePostToolHooks,PostToolUseFailure:executePostToolUseFailureHooks,PostToolBatch:executePostToolBatchHooks,PermissionDenied:executePermissionDeniedHooks,PermissionRequest:executePermissionRequestHooks,Notification:executeNotificationHooks,Stop:executeStopHooks,SubagentStop:executeStopHooks,StopFailure:executeStopFailureHooks,TeammateIdle:executeTeammateIdleHooks,TaskCreated:executeTaskCreatedHooks,TaskCompleted:executeTaskCompletedHooks,UserPromptSubmit:executeUserPromptSubmitHooks,UserPromptExpansion:executeUserPromptExpansionHooks,SessionStart:executeSessionStartHooks,SessionEnd:executeSessionEndHooks,Setup:executeSetupHooks,SubagentStart:executeSubagentStartHooks,PreCompact:executePreCompactHooks,PostCompact:executePostCompactHooks,ConfigChange:executeConfigChangeHooks,CwdChanged:executeCwdChangedHooks,FileChanged:executeFileChangedHooks,InstructionsLoaded:executeInstructionsLoadedHooks,Elicitation:executeElicitationHooks,ElicitationResult:executeElicitationResultHooks,WorktreeCreate:executeWorktreeCreateHook,WorktreeRemove:executeWorktreeRemoveHook,MessageDisplay:executeMessageDisplayHooks}});
export {HOOK_EVENT_REGISTRY,g4l};
