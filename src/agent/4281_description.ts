// @ts-nocheck
import {Cd as Xd,lr as fr} from "../../vendor/m233.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}
function hasMultiTaskShape(value) {
  return "tasks" in value || "todos" in value;
}
function hasAgentToolShape(value) {
  return "prompt" in value || "subagent_type" in value;
}
function deriveSubjectFromDescription(description) {
  let sanitized = Xd(description).trim(),
    chars = Array.from(sanitized);
  if (chars.length <= 80) return sanitized;
  let truncated = chars.slice(0, 80).join(""),
    lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 40 ? truncated.slice(0, lastSpace) : truncated).trim();
}
function coerceTaskCreateInput(rawInput) {
  if (!isPlainObject(rawInput)) return null;
  if (hasMultiTaskShape(rawInput)) return null;
  let appliedShapes = [],
    input = {
      ...rawInput
    };
  if (hasAgentToolShape(input) && !(isNonEmptyString(input.subject) && isNonEmptyString(input.description))) return null;
  if (!("subject" in input) && !("description" in input) && "task" in input) {
    let wrapped = input.task;
    if (isNonEmptyString(wrapped)) delete input.task, input.description = wrapped, appliedShapes.push("task_wrapper_string");else if (isPlainObject(wrapped)) {
      if (hasMultiTaskShape(wrapped)) return null;
      if (hasAgentToolShape(wrapped) && !(isNonEmptyString(wrapped.subject) && isNonEmptyString(wrapped.description))) return null;
      delete input.task, Object.assign(input, wrapped), appliedShapes.push("task_wrapper_object");
    } else return null;
  }
  let aliasGroups = [[SUBJECT_ALIASES, "subject"], [DESCRIPTION_ALIASES, "description"], [ACTIVE_FORM_ALIASES, "activeForm"]];
  for (let [aliases, canonical] of aliasGroups) for (let alias of aliases) if (alias in input && !(canonical in input) && isNonEmptyString(input[alias])) input[canonical] = input[alias], delete input[alias], appliedShapes.push(`alias_${alias}`);
  if (isNonEmptyString(input.subject) && !("description" in input)) input.description = input.subject, appliedShapes.push("backfill_description");else if (isNonEmptyString(input.description) && !("subject" in input)) input.subject = deriveSubjectFromDescription(input.description), appliedShapes.push("backfill_subject");
  if (isNonEmptyString(input.subject) && isNonEmptyString(input.description)) {
    for (let key of Object.keys(input)) if (!CANONICAL_KEYS.has(key)) delete input[key], appliedShapes.push(`strip_${KNOWN_FOREIGN_KEYS.has(key) ? key : "other"}`);
    if ("activeForm" in input && typeof input.activeForm !== "string") delete input.activeForm, appliedShapes.push("drop_invalid_activeForm");
    if ("metadata" in input && !isPlainObject(input.metadata)) delete input.metadata, appliedShapes.push("drop_invalid_metadata");
  }
  if (appliedShapes.length === 0) return null;
  return {
    input: input,
    shapeClass: appliedShapes.join("+")
  };
}
function getTaskCreateValidationSteer(rawInput) {
  if (!isPlainObject(rawInput)) return null;
  let nestedTask = isPlainObject(rawInput.task) ? rawInput.task : null;
  if (hasMultiTaskShape(rawInput) || nestedTask !== null && hasMultiTaskShape(nestedTask)) return "TaskCreate creates ONE task per call and has no `tasks` or `todos` parameter. Call TaskCreate once per task, passing `subject` (a brief title) and `description` (what needs to be done) as top-level string parameters.";
  if ((hasAgentToolShape(rawInput) || nestedTask !== null && hasAgentToolShape(nestedTask)) && !(isNonEmptyString(rawInput.subject) && isNonEmptyString(rawInput.description))) return "This call used Agent-tool parameters (`prompt`/`subagent_type`). TaskCreate adds an item to the task list and takes `subject` and `description` string parameters. To delegate work to a subagent, use the Agent tool instead.";
  return null;
}
var CANONICAL_KEYS, SUBJECT_ALIASES, DESCRIPTION_ALIASES, ACTIVE_FORM_ALIASES, KNOWN_FOREIGN_KEYS;
var EmK = b(() => {
  fr();
  CANONICAL_KEYS = new Set(["subject", "description", "activeForm", "metadata"]), SUBJECT_ALIASES = ["title", "name"], DESCRIPTION_ALIASES = ["content"], ACTIVE_FORM_ALIASES = ["active_form"], KNOWN_FOREIGN_KEYS = new Set(["status", "state", "priority", "prompt", "subagent_type", "id", "type", "owner", "blocks", "blockedBy", "addBlocks", "addBlockedBy"]);
});
export {isPlainObject as Fqt,isNonEmptyString as fileReadTool,hasMultiTaskShape as d5n,hasAgentToolShape as p5n,deriveSubjectFromDescription as y$p,coerceTaskCreateInput as xJa,getTaskCreateValidationSteer as DJa,CANONICAL_KEYS as m$p,SUBJECT_ALIASES as f$p,DESCRIPTION_ALIASES as h$p,ACTIVE_FORM_ALIASES as g$p,KNOWN_FOREIGN_KEYS as _$p,EmK as PJa};
