// @ts-nocheck
import {b} from "../runtime.ts";
import {f1l,executePreCompactHooks,executePostCompactHooks} from "./m5155.ts";
import {A1l,executeConfigChangeHooks} from "./m5156.ts";
import {h1l,executeElicitationHooks,executeElicitationResultHooks} from "./m5157.ts";
import {_1l,executeCwdChangedHooks,executeFileChangedHooks} from "./m5158.ts";
import {y1l,executeInstructionsLoadedHooks} from "./m5159.ts";
import {IHo,executeMessageDisplayHooks} from "./m5160.ts";
import {T1l,executeNotificationHooks} from "./m5161.ts";
import {S1l,executeSessionStartHooks,executeSessionEndHooks,executeSetupHooks,executeSubagentStartHooks} from "./m5162.ts";
import {w1l,executeStopHooks,executeStopFailureHooks} from "./m5164.ts";
import {R1l,executeTeammateIdleHooks,executeTaskCreatedHooks,executeTaskCompletedHooks} from "./m5165.ts";
import {x1l,executePreToolHooks,executePostToolHooks,executePostToolUseFailureHooks,executePostToolBatchHooks,executePermissionDeniedHooks,executePermissionRequestHooks} from "../src/hooks/5167_level.ts";
import {Xao,executeUserPromptExpansionHooks} from "./m4028.ts";
import {H1l,executeUserPromptSubmitHooks} from "./m5167.ts";
import {I1l,executeWorktreeCreateHook,executeWorktreeRemoveHook} from "./m5168.ts";
var HOOK_EVENT_REGISTRY;
var D1l=b(()=>{f1l();A1l();h1l();_1l();y1l();IHo();T1l();S1l();w1l();R1l();x1l();Xao();H1l();I1l();HOOK_EVENT_REGISTRY={PreToolUse:executePreToolHooks,PostToolUse:executePostToolHooks,PostToolUseFailure:executePostToolUseFailureHooks,PostToolBatch:executePostToolBatchHooks,PermissionDenied:executePermissionDeniedHooks,PermissionRequest:executePermissionRequestHooks,Notification:executeNotificationHooks,Stop:executeStopHooks,SubagentStop:executeStopHooks,StopFailure:executeStopFailureHooks,TeammateIdle:executeTeammateIdleHooks,TaskCreated:executeTaskCreatedHooks,TaskCompleted:executeTaskCompletedHooks,UserPromptSubmit:executeUserPromptSubmitHooks,UserPromptExpansion:executeUserPromptExpansionHooks,SessionStart:executeSessionStartHooks,SessionEnd:executeSessionEndHooks,Setup:executeSetupHooks,SubagentStart:executeSubagentStartHooks,PreCompact:executePreCompactHooks,PostCompact:executePostCompactHooks,ConfigChange:executeConfigChangeHooks,CwdChanged:executeCwdChangedHooks,FileChanged:executeFileChangedHooks,InstructionsLoaded:executeInstructionsLoadedHooks,Elicitation:executeElicitationHooks,ElicitationResult:executeElicitationResultHooks,WorktreeCreate:executeWorktreeCreateHook,WorktreeRemove:executeWorktreeRemoveHook,MessageDisplay:executeMessageDisplayHooks}});
export {HOOK_EVENT_REGISTRY,D1l};
