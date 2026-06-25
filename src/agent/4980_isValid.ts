// @ts-nocheck
import {fYn as Qg6,A0o as kJq} from "../../vendor/m4975.ts";
import {Ate as te,_Y as TKH} from "../permissions/3988_toolName.ts";
import {b as L} from "../../runtime.ts";
interface AgentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
/**
 * Shape of an agent definition object as consumed by the validator.
 * The actual runtime type is defined elsewhere; this captures only what
 * the validator inspects.
 */
interface AgentDefinitionLike {
  agentType?: string;
  whenToUse?: string;
  /** `undefined` = wildcard (all tools); empty array = no tools. */
  tools?: string[];
  source?: string;
  getSystemPrompt(): string | null | undefined;
}

/** A resolved-tools object as returned by the cross-module `te()` helper. */
interface ResolvedTools {
  invalidTools: string[];
  unavailableTools: string[];
  [key: string]: unknown;
}

/**
 * Validates just the agentType string token.
 *
 * Returns an error message string on failure, or `null` on success.
 */
function validateAgentTypeString(agentType: string): string | null {
  if (!agentType) return "Agent type is required";
  if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(agentType)) return "Agent type must start and end with alphanumeric characters and contain only letters, numbers, and hyphens";
  if (agentType.length < 3) return "Agent type must be at least 3 characters long";
  if (agentType.length > 50) return "Agent type must be less than 50 characters";
  return null;
}

/**
 * Validates a full agent definition and returns errors/warnings.
 *
 * @param agentDef    - The agent definition to validate.
 * @param toolContext - Context object passed through to the tool-resolution helper.
 * @param existingAgents - All currently registered agent definitions (used to detect duplicate agentType).
 */
function isValid(agentDef: AgentDefinitionLike, toolContext: unknown, existingAgents: AgentDefinitionLike[]): AgentValidationResult {
  let errors: string[] = [],
    warnings: string[] = [];
  if (!agentDef.agentType) errors.push("Agent type is required");else {
    let typeError = validateAgentTypeString(agentDef.agentType);
    if (typeError) errors.push(typeError);
    let duplicate = existingAgents.find(existing => existing.agentType === agentDef.agentType && existing.source !== agentDef.source);
    if (duplicate) errors.push(`Agent type "${agentDef.agentType}" already exists in ${Qg6(duplicate.source)}`); // FIXME: Qg6 = cross-module source-label formatter; name unverified
  }
  if (!agentDef.whenToUse) errors.push("Description (description) is required");else if (agentDef.whenToUse.length < 10) warnings.push("Description should be more descriptive (at least 10 characters)");else if (agentDef.whenToUse.length > 5000) warnings.push("Description is very long (over 5000 characters)");
  if (agentDef.tools !== void 0 && !Array.isArray(agentDef.tools)) errors.push("Tools must be an array");else {
    if (agentDef.tools === void 0) warnings.push("Agent has access to all tools");else if (agentDef.tools.length === 0) warnings.push("No tools selected - agent will have very limited capabilities");
    let resolvedTools: ResolvedTools = te(agentDef, toolContext, !1); // FIXME: te = cross-module tool-resolution helper; name as-is (cross-module linkage)
    if (resolvedTools.invalidTools.length > 0) errors.push(`Invalid tools: ${resolvedTools.invalidTools.join(", ")}`);
    if (resolvedTools.unavailableTools.length > 0) warnings.push(`Not available to subagents: ${resolvedTools.unavailableTools.join(", ")}`);
  }
  let systemPrompt = agentDef.getSystemPrompt();
  if (!systemPrompt) errors.push("System prompt is required");else if (systemPrompt.length < 20) errors.push("System prompt is too short (minimum 20 characters)");else if (systemPrompt.length > 1e4) warnings.push("System prompt is very long (over 10,000 characters)");
  return {
    isValid: errors.length === 0,
    errors: errors,
    warnings: warnings
  };
}

/** Lazy module initialiser — depends on TKH (agent loop init) and kJq (unknown cross-module init). */
var VJq = L(() => {
  TKH();
  kJq();
});
export {validateAgentTypeString as R0o,isValid as pOl,VJq as v0o};
