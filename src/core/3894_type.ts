// @ts-nocheck
import {iN as KE,gq as ep,lx as H0} from "../../vendor/m2777.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {b as L} from "../../runtime.ts";
import {Xr as i8,cl as _4} from "../../vendor/m321.ts";
import {HFn as PE6,Llt as PK_} from "../../vendor/m3887.ts";
import {we as yH} from "../../vendor/m455.ts";
// @ts-nocheck
function handlePermissionPromptToolResponse(permissionResponse, tool, originalInput, agentCtx) {
  let decisionReason = {
    type: "permissionPromptTool",
    permissionPromptToolName: tool.name,
    toolResult: permissionResponse
  };
  if (permissionResponse.behavior === "allow") {
    let updatedPermissions = permissionResponse.updatedPermissions;
    if (updatedPermissions) agentCtx.setToolPermissionContext(ctx => KE(ctx, updatedPermissions)), ep(updatedPermissions);
    let effectiveInput = Object.keys(permissionResponse.updatedInput).length > 0 ? permissionResponse.updatedInput : originalInput;
    return {
      ...permissionResponse,
      updatedInput: effectiveInput,
      decisionReason: decisionReason
    };
  } else if (permissionResponse.behavior === "deny" && permissionResponse.interrupt) N(`SDK permission prompt deny+interrupt: tool=${tool.name} message=${permissionResponse.message}`), agentCtx.abortController.abort();
  return {
    ...permissionResponse,
    decisionReason: decisionReason,
    decideLocation: "ask-path"
  };
}
var permissionRequestInputSchema, decisionClassificationSchema, allowResponseSchema, denyResponseSchema, permissionResponseSchema;
var U6q = L(() => {
  i8();
  gH();
  H0();
  PE6();
  permissionRequestInputSchema = yH(() => _4.object({
    tool_name: _4.string().describe("The name of the tool requesting permission"),
    input: _4.record(_4.string(), _4.unknown()).describe("The input for the tool"),
    tool_use_id: _4.string().optional().describe("The unique tool use request ID")
  })), decisionClassificationSchema = yH(() => _4.enum(["user_temporary", "user_permanent", "user_reject"]).optional().catch(undefined)), allowResponseSchema = yH(() => _4.object({
    behavior: _4.literal("allow"),
    updatedInput: _4.record(_4.string(), _4.unknown()),
    updatedPermissions: _4.array(PK_()).optional().catch(H => {
      N(`Malformed updatedPermissions from SDK host ignored: ${H.error.issues[0]?.message ?? "unknown"}`, {
        level: "warn"
      });
      return;
    }),
    toolUseID: _4.string().optional(),
    decisionClassification: decisionClassificationSchema()
  })), denyResponseSchema = yH(() => _4.object({
    behavior: _4.literal("deny"),
    message: _4.string(),
    interrupt: _4.boolean().optional(),
    toolUseID: _4.string().optional(),
    decisionClassification: decisionClassificationSchema()
  })), permissionResponseSchema = yH(() => _4.union([allowResponseSchema(), denyResponseSchema()]));
});

export {handlePermissionPromptToolResponse as Ult,permissionRequestInputSchema as _$g,decisionClassificationSchema as eOa,allowResponseSchema as vyp,denyResponseSchema as wyp,permissionResponseSchema as E2t,U6q as Lso};
