// @ts-nocheck
import {je as oH} from "../../vendor/m577.ts";
import {getInitialSettings as n8,yr as N8} from "./0740_updateSettingsForSource.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Bundled-skill disable check helpers.
 *
 * Determines whether bundled (built-in) skills should be suppressed based on
 * either the environment variable CLAUDE_CODE_DISABLE_BUNDLED_SKILLS or the
 * `disableBundledSkills` field in user settings.
 */

/**
 * Returns true when bundled skills are globally disabled — either by the
 * CLAUDE_CODE_DISABLE_BUNDLED_SKILLS env-var flag or by the
 * `disableBundledSkills: true` setting.
 *
 * @param settings - Optional pre-fetched settings object. Falls back to n8() when omitted.
 */
function isBundledSkillsDisabled(settings?: { disableBundledSkills?: boolean } | null): boolean {
  return oH.CLAUDE_CODE_DISABLE_BUNDLED_SKILLS || (settings ?? n8()).disableBundledSkills === !0;
}

/**
 * Returns true when the given skill entry is a built-in prompt skill AND
 * bundled skills are currently disabled.
 *
 * Cross-module linkage name — kept as `Fv6` to preserve import compatibility.
 *
 * @param skill   - Skill descriptor with `type` and `source` fields.
 * @param settings - Optional pre-fetched settings; forwarded to isBundledSkillsDisabled.
 */
function Fv6(skill: { type: string; source: string }, settings?: { disableBundledSkills?: boolean } | null): boolean {
  return skill.type === "prompt" && skill.source === "builtin" && isBundledSkillsDisabled(settings);
}

/** Lazy-init thunk: initialises env-flags module (_q) and settings module (N8). */
var eZH = L(() => {
  _q();
  N8();
});

export {isBundledSkillsDisabled as aG,Fv6 as A$n,eZH as BIe};
