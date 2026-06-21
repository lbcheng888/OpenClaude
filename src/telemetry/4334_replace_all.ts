// @ts-nocheck
import {Ws as Bs,ef as sf} from "../../vendor/m2248.ts";
import {N$e as A$e,Kxe as kxe} from "../config/3156_maxSizeBytes.ts";
import {Dh as kh,NH as IH} from "../config/2024_NH.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as ut,zn as Yn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function GMp(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function oza(rawInput) {
  if (!GMp(rawInput)) return null;
  let normalized = {
      ...rawInput
    },
    aliases = [];
  if ("replace_name" in normalized) {
    let replaceNameVal = normalized.replace_name;
    if (!("replace_all" in normalized)) normalized.replace_all = replaceNameVal === true || replaceNameVal === "true";
    delete normalized.replace_name, aliases.push("alias_replace_name");
  }
  if ("path" in normalized && !("file_path" in normalized) && typeof normalized.path === "string") normalized.file_path = normalized.path, delete normalized.path, aliases.push("path");
  if ("old_str" in normalized && !("old_string" in normalized) && typeof normalized.old_str === "string") normalized.old_string = normalized.old_str, delete normalized.old_str, aliases.push("old_str");
  if ("new_str" in normalized && !("new_string" in normalized) && typeof normalized.new_str === "string") normalized.new_string = normalized.new_str, delete normalized.new_str, aliases.push("new_str");
  return aliases.length ? {
    input: normalized,
    shapeClass: aliases.join(",")
  } : null;
}
function VMp() {
  return `
- You must use your \`${Bs}\` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file.`;
}
function sza(context) {
  return KMp(context);
}
function KMp(context) {
  let maxSizeBytes = A$e();
  if (kh(context)) return `Performs exact string replacement in a file.

- You must ${Bs} the file in this conversation before editing, or the call will fail.
- \`old_string\` must match the file exactly, including indentation, and be unique \u2014 the edit fails otherwise. Strip the Read line prefix (${maxSizeBytes ? "line number + a single tab or `:`" : "line number + tab"}) before matching.
- \`replace_all: true\` replaces every occurrence instead.`;
  let lineNumFormat = maxSizeBytes ? "line number + a single separator character (a tab or `:`)" : "line number + tab",
    minimalAnchorNote = ut("tengu_edit_minimalanchor_jrn", false) ? "\n- Keep `old_string` minimal \u2014 usually 1-3 lines, only enough to be unique in the file. Including excess context wastes tokens and is an error.\n- The edit will FAIL if `old_string` is not unique in the file. In that case, add the minimum extra context needed for uniqueness, or use `replace_all` to change every instance." : "\n- The edit will FAIL if `old_string` is not unique in the file. Either provide a larger string with more surrounding context to make it unique or use `replace_all` to change every instance of `old_string`.";
  return `Performs exact string replacements in files.

Usage:${VMp()}
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: ${lineNumFormat}. Everything after that is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.${minimalAnchorNote}
- Use \`replace_all\` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.`;
}
var iza = b(() => {
  Yn();
  IH();
  kxe();
  sf();
});

export {GMp as vBp,oza as vYa,VMp as wBp,sza as wYa,KMp as RBp,iza as RYa};
