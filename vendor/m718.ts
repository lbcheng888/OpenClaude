// @ts-nocheck
import {b} from "../runtime.ts";
var HOOK_EVENTS,EXIT_REASONS,SYSTEM_PROMPT_DYNAMIC_BOUNDARY="__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__";
var cnn=b(()=>{HOOK_EVENTS=["PreToolUse","PostToolUse","PostToolUseFailure","PostToolBatch","Notification","UserPromptSubmit","UserPromptExpansion","SessionStart","SessionEnd","Stop","StopFailure","SubagentStart","SubagentStop","PreCompact","PostCompact","PermissionRequest","PermissionDenied","Setup","TeammateIdle","TaskCreated","TaskCompleted","Elicitation","ElicitationResult","ConfigChange","WorktreeCreate","WorktreeRemove","InstructionsLoaded","CwdChanged","FileChanged","MessageDisplay"],EXIT_REASONS=["clear","resume","logout","prompt_input_exit","other","bypass_permissions_disabled"]});
export {HOOK_EVENTS,EXIT_REASONS,SYSTEM_PROMPT_DYNAMIC_BOUNDARY,cnn};
