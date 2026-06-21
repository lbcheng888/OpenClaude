// @ts-nocheck
import {je as oH} from "../../vendor/m577.ts";
import {getSettingsForSource as C6,getSettings_DEPRECATED as nq,yr as N8} from "./0740_updateSettingsForSource.ts";
import {MIn as tW6,Dot as S6_} from "../../vendor/m3250.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Skill shell execution policy: checks whether inline shell execution is
 * disabled by policy or settings, and redacts shell command literals from
 * markdown content when execution is disabled.
 */

/**
 * Returns true if inline shell execution in skills/slash commands is disabled.
 *
 * Priority order:
 *  1. CLAUDE_CODE_IS_COWORK environment flag
 *  2. policySettings.disableSkillShellExecution
 *  3. localSettings (nq()).disableSkillShellExecution
 */
function isSkillShellExecutionDisabled(): boolean {
  if (oH.CLAUDE_CODE_IS_COWORK) return !0;
  if (C6("policySettings")?.disableSkillShellExecution === !0) return !0;
  return nq().disableSkillShellExecution === !0;
}

/**
 * Redacts shell command expressions from a markdown string by replacing them
 * with the policy-disabled placeholder.
 *
 * Handles two syntactic forms:
 *  - Fenced shell blocks:  ```!\n...\n```
 *  - Inline shell ticks:   !`command`
 *
 * @param content - Raw markdown text that may contain shell command literals.
 * @returns The text with shell commands replaced by SHELL_EXECUTION_DISABLED_PLACEHOLDER.
 */
function redactShellCommandsFromMarkdown(content: string): string {
  let redacted = content.replace(fencedShellBlockRegex, SHELL_EXECUTION_DISABLED_PLACEHOLDER);
  if (redacted.includes("!`")) {
    let processed = tW6(redacted);  // FIXME: unverified name — cross-module string processor (likely strips HTML comments before inline matching)
    for (let match of [...processed.matchAll(inlineShellTickRegex)].reverse())
      redacted = redacted.slice(0, match.index) + SHELL_EXECUTION_DISABLED_PLACEHOLDER + redacted.slice(match.index! + match[0].length);
  }
  return redacted;
}

/** Matches fenced code blocks with a `!` language tag: ```!\n...\n``` */
var fencedShellBlockRegex: RegExp,
  /** Matches inline shell-backtick expressions: !`command` */
  inlineShellTickRegex: RegExp,
  /** Placeholder substituted in place of redacted shell command expressions. */
  SHELL_EXECUTION_DISABLED_PLACEHOLDER = "[shell command execution disabled by policy]";

var Y1q = L(() => {
  _q();
  S6_();
  N8();
  fencedShellBlockRegex = /```!\s*\n?[\s\S]*?\n?```/g, inlineShellTickRegex = /(?<=^|\s)!`[^`]+`/gm;
});

export {isSkillShellExecutionDisabled as K4n,redactShellCommandsFromMarkdown as z4n,fencedShellBlockRegex as dBp,inlineShellTickRegex as pBp,SHELL_EXECUTION_DISABLED_PLACEHOLDER as pYa,Y1q as bfo};
