// @ts-nocheck
import {Cjn,tIo} from "../../vendor/m4863.ts";
import {_et,tZ,Kfe,Cp,gD} from "../config/2223_level.ts";
import {pdt,fG,N9n,uxe} from "../config/3990_maxFiles.ts";
import {Kh,xl} from "../../vendor/m4427.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {WORKFLOW_TOOL_NAME as AI,CODE_REVIEW_WORKFLOW_NAME as Wrt} from "../config/2711_WORKFLOW_TOOL_NAME.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {hC,L2} from "../agent/2222_available.ts";
import {Gl,ri} from "../tools/2235_userFacingName.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {isCommandEnabled as YD} from "../tools/4092_done.ts";
import {Td,Cb} from "../../vendor/m5036.ts";
import {Sye} from "../../vendor/m3990.ts";
import {b} from "../../runtime.ts";
import {F5n,fZa,N5n,hZa,_Za,yZa} from "../agent/4319_F5n.ts";
// @ts-nocheck
/**
 * Semantic restoration for mcp/5517_rawFirstToken.ts (Claude Code v2.1.190).
 * Cross-module bundled symbols and export names are intentionally preserved.
 * Structure is byte/structure-exact with the reverse-engineered slice; only
 * local identifier names, TS type annotations and comments are restored.
 */

/**
 * Parse the `/code-review` argument string into structured options:
 * explicit effort level, target, --comment / --fix flags, an unrecognized
 * level token, and whether `ultra` triggered the max-effort fallback.
 */
function parseCodeReviewArgs(input: any): any {
  let {
      rawFirstToken: firstToken,
      flags: flags,
      rest: rest
    } = Cjn(input, ["comment", "fix"]),
    comment = flags.has("comment"),
    fix = flags.has("fix"),
    words = rest.split(/\s+/).filter(Boolean),
    firstWord = words[0] ?? "";
  if (firstToken.toLowerCase() === "ultra") return {
    explicit: void 0,
    target: words.slice(1).join(" "),
    comment: comment,
    fix: fix,
    unrecognizedLevel: void 0,
    ultraFallback: !0
  };
  let explicitLevel = firstWord.toLowerCase() === "ultra" ? void 0 : _et(firstWord);
  if (explicitLevel !== void 0) return {
    explicit: explicitLevel,
    target: words.slice(1).join(" "),
    comment: comment,
    fix: fix,
    unrecognizedLevel: void 0,
    ultraFallback: !1
  };
  let looksLikeLevel = z3m.test(firstWord);
  return {
    explicit: void 0,
    target: rest,
    comment: comment,
    fix: fix,
    unrecognizedLevel: looksLikeLevel ? firstWord : void 0,
    ultraFallback: !1
  };
}

/** Build the `/code-review` slash-command description shown in menus/help. */
function getCodeReviewDescription(): any {
  return `Review the current diff for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high→max: broader coverage, may include uncertain findings${pdt() ? `; ultra: deep multi-agent review in the cloud${fG() ? "" : " (requires claude.ai account access)"}` : ""}). Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.`;
}

/** Build the `/code-review` argument-hint string shown in the command UI. */
function getCodeReviewArgumentHint(): any {
  return `[${pdt() ? `${Wtr.join("|")}|ultra` : Wtr.join("|")}] [--fix] [--comment] [<target>]`;
}

/**
 * Produce the prompt text blocks for the `/code-review` command: resolve the
 * effort level, decide whether to route to the workflow-backed review, emit
 * routing telemetry, and assemble the preamble + body.
 */
async function getCodeReviewPrompt(input: any, context: any): Promise<any> {
  let {
      explicit: explicit,
      target: target,
      comment: comment,
      fix: fix,
      unrecognizedLevel: unrecognizedLevel,
      ultraFallback: ultraFallback
    } = parseCodeReviewArgs(input),
    requestedLevel = ultraFallback ? "max" : explicit,
    mainLoopModel = context.options?.mainLoopModel,
    resolvedLevel = mainLoopModel ? tZ(mainLoopModel, requestedLevel ?? Kh(context)) ?? requestedLevel : requestedLevel ?? Kh(context),
    level = resolvedLevel === void 0 ? "medium" : Kfe(resolvedLevel),
    preamble = buildCodeReviewPreamble({
      ultraFallback: ultraFallback,
      fix: fix,
      unrecognizedLevel: unrecognizedLevel,
      level: level,
      context: context
    }),
    routeToWorkflow = !ultraFallback && shouldRouteToReviewWorkflow(level, context);
  if (!context.options?.isSkillPreload) W("tengu_code_review_routed", {
    effort_level: Le(level),
    routed_to_workflow: routeToWorkflow,
    has_fix: fix,
    has_comment: comment,
    has_target: target.length > 0,
    is_ultra_fallback: ultraFallback
  });
  if (routeToWorkflow) {
    let workflowArgs = target ? `${level} ${target}` : level;
    return [{
      type: "text",
      text: `${preamble}Run the workflow-backed code review at ${level} effort instead of reviewing inline.

Invoke: ${AI}({ name: ${Pe(Wrt)}, args: ${Pe(workflowArgs)} })

Everything after the level in the args string is passed to the workflow as the review target / instructions. If the user gave additional instructions for this review elsewhere in the conversation (a scope restriction, files to focus on, things to skip), append them to the args string so the workflow honors them.

The workflow runs the same finder angles and verify pass as the inline review, in the background; the verified findings arrive as a task notification. When they arrive, present the findings ranked most-severe first (or note that nothing survived verification).${comment ? dtc : ""}${fix ? ptc : ""}`
    }];
  }
  let targetLine = target ? `Review target: \`${target}\`

` : "";
  return [{
    type: "text",
    text: `${preamble}${targetLine}${K3m[level]}${comment ? dtc : ""}${fix ? ptc : ""}`
  }];
}

/**
 * Decide whether a high/xhigh/max review should be routed to the background
 * workflow tool rather than run inline this session.
 */
function shouldRouteToReviewWorkflow(level: any, context: any): any {
  if (level !== "high" && level !== "xhigh" && level !== "max") return !1;
  if (context.options?.isSkillPreload) return !1;
  if (!hC()) return !1;
  if (context.options?.isNonInteractiveSession) return !1;
  if (!context.options?.tools?.some((tool: any): any => Gl(tool, AI))) return !1;
  return it("tengu_review_workflow_routing", !1);
}

/**
 * Build the parenthetical preamble explaining ultra/cloud-review fallback or
 * an unrecognized-effort notice; returns "" when there's nothing to say.
 */
function buildCodeReviewPreamble({
  ultraFallback: ultraFallback,
  fix: fix,
  unrecognizedLevel: unrecognizedLevel,
  level: level,
  context: context
}: any): any {
  if (ultraFallback) {
    if (!fG()) {
      if (fix) return `(Running a local ${level}-effort review and applying its findings.)

`;
      if (pdt()) {
        if (context.options?.isNonInteractiveSession) {
          let reason = N9n();
          if (reason) return `(${reason} Falling back to a local ${level}-effort review.)

`;
        }
        return `(ultra (cloud review) requires claude.ai account access this session doesn't have — see https://code.claude.com/docs/en/ultrareview. Falling back to a local ${level}-effort review.)

`;
      }
      return `(ultra (cloud review) isn't available in this environment — see https://code.claude.com/docs/en/ultrareview. Falling back to a local ${level}-effort review.)

`;
    }
    let hasUltrareviewCommand = context.options?.commands?.some((command: any): any => command.name === "ultrareview" && YD(command)) ?? !1;
    if (fix) return hasUltrareviewCommand ? `(Claude can't launch the cloud review directly — type \`/code-review ultra --fix\` to review in the cloud and apply the findings locally when it completes. Running a local ${level}-effort review and applying its findings for now.)

` : `(Running a local ${level}-effort review and applying its findings.)

`;
    return hasUltrareviewCommand ? `(Claude can't launch the cloud review directly — type \`/code-review ultra\` to run it. Falling back to a local ${level}-effort review for now.)

` : `(Claude can't launch the cloud review directly — the user can run \`claude ultrareview\` from a terminal to start it. Falling back to a local ${level}-effort review for now.)

`;
  }
  if (unrecognizedLevel !== void 0) return `(Ignoring unrecognized effort "${unrecognizedLevel}"; valid: ${Wtr.join(", ")}. Using ${level}.)

`;
  return "";
}

/** Register the `/code-review` slash command and its handlers. */
function registerCodeReviewCommand(): any {
  Td({
    name: Sye,
    menuDescription: "Review the current diff for bugs and cleanups",
    subcommands: {
      ultra: "ultrareview"
    },
    description: getCodeReviewDescription,
    argumentHint: getCodeReviewArgumentHint,
    userInvocable: !0,
    getEffort(input: any): any {
      return parseCodeReviewArgs(input).explicit;
    },
    getPromptForCommand: getCodeReviewPrompt
  });
}

var K3m,
  dtc = `

## Posting to GitHub (--comment)

The \`--comment\` flag was passed. After producing the findings list, if the
review target is a GitHub PR, post each finding as an inline PR comment via
\`mcp__github_inline_comment__create_inline_comment\` (one call per finding;
include a suggestion block only when it fully fixes the issue). If that tool
is not available in this session, fall back to \`gh api\` (repos/{owner}/{repo}/pulls/{pr}/comments)
or print the findings instead. If the target is not a PR, print the findings
to the terminal and note that \`--comment\` was ignored.
`,
  ptc = `

## Applying fixes (--fix)

The \`--fix\` flag was passed. After producing the findings list, apply the
findings to the working tree instead of stopping at the report: fix each one
directly — correctness bugs and reuse/simplification/efficiency cleanups alike.
Skip any finding whose fix would change intended behavior, require changes well
outside the reviewed diff, or that you judge to be a false positive — note the
skip rather than arguing with it. Finish with a brief summary of what was fixed
and what was skipped.
`,
  Wtr,
  z3m;

/** Lazy module-init: resolve effort-level prompt templates and the level regexp. */
var htc = b((): any => {
  uxe();
  jn();
  kt();
  ri();
  L2();
  xl();
  Cp();
  tn();
  Cb();
  tIo();
  F5n();
  K3m = {
    low: fZa,
    medium: N5n,
    high: hZa,
    xhigh: _Za,
    max: yZa
  }, Wtr = gD, z3m = new RegExp(`^(${Wtr.map((level: any): any => level.slice(0, 3)).join("|")})[a-z]*$`, "i");
});

export {parseCodeReviewArgs as mtc,getCodeReviewDescription as j3m,getCodeReviewArgumentHint as Y3m,getCodeReviewPrompt as J3m,shouldRouteToReviewWorkflow as X3m,buildCodeReviewPreamble as Q3m,registerCodeReviewCommand as ftc,K3m,dtc,ptc,Wtr,z3m,htc};
