// @ts-nocheck
import {OGn as sF6,MCo as Hjq} from "../../vendor/m4831.ts";
import {hQe as GrH,oZ as Qs,Mfe as vOH,Om as dT,nP as Fh} from "../config/2215_level.ts";
import {ect as F8_,jW as VQ,sUn as nZ6,nIe as k0H} from "../config/3923_maxFiles.ts";
import {Fh as xY,Ql as c4} from "../../vendor/m4405.ts";
import {WORKFLOW_TOOL_NAME as bG,CODE_REVIEW_WORKFLOW_NAME as peH} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {Ow as TP,R4 as Dn} from "../agent/2214_available.ts";
import {Lc as o1,Ri as M7} from "../tools/2227_userFacingName.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {isCommandEnabled as uV} from "../tools/4028_maxEditDistance.ts";
import {ap as JT,BE as QP} from "../../vendor/m5006.ts";
import {K4e as dPH} from "../../vendor/m3923.ts";
import {b as L} from "../../runtime.ts";
import {Rmo as W4q,W7a as $UK,G7a as YUK,V7a as AUK,z7a as fUK,Y7a as jUK} from "../agent/4299_Rmo.ts";
/**
 * Semantic restoration for mcp/5443_rawFirstToken.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

/** Internal restored helper for mcp/5443_rawFirstToken.ts; behavior is preserved. */
function parseCodeReviewArgs(H: any): any {
  let {
      rawFirstToken: _,
      flags: q,
      rest: K
    } = sF6(H, ["comment", "fix"]),
    O = q.has("comment"),
    T = q.has("fix"),
    z = K.split(/\s+/).filter(Boolean),
    $ = z[0] ?? "";
  if (_.toLowerCase() === "ultra") return {
    explicit: void 0,
    target: z.slice(1).join(" "),
    comment: O,
    fix: T,
    unrecognizedLevel: void 0,
    ultraFallback: !0
  };
  let Y = $.toLowerCase() === "ultra" ? void 0 : GrH($);
  if (Y !== void 0) return {
    explicit: Y,
    target: z.slice(1).join(" "),
    comment: O,
    fix: T,
    unrecognizedLevel: void 0,
    ultraFallback: !1
  };
  let A = rPT.test($);
  return {
    explicit: void 0,
    target: K,
    comment: O,
    fix: T,
    unrecognizedLevel: A ? $ : void 0,
    ultraFallback: !1
  };
}
/** Internal restored helper for mcp/5443_rawFirstToken.ts; behavior is preserved. */
function getCodeReviewDescription(): any {
  return `Review the current diff for correctness bugs and reuse/simplification/efficiency cleanups at the given effort level (low/medium: fewer, high-confidence findings; high\u2192max: broader coverage, may include uncertain findings${F8_() ? `; ultra: deep multi-agent review in the cloud${VQ() ? "" : " (requires claude.ai account access)"}` : ""}). Pass --comment to post findings as inline PR comments, or --fix to apply the findings to the working tree after the review.`;
}
/** Internal restored helper for mcp/5443_rawFirstToken.ts; behavior is preserved. */
function getCodeReviewArgumentHint(): any {
  return `[${F8_() ? `${Ei6.join("|")}|ultra` : Ei6.join("|")}] [--fix] [--comment] [<target>]`;
}
/** Internal restored helper for mcp/5443_rawFirstToken.ts; behavior is preserved. */
async function getCodeReviewPrompt(H: any, _: any): Promise<any> {
  let {
      explicit: q,
      target: K,
      comment: O,
      fix: T,
      unrecognizedLevel: z,
      ultraFallback: $
    } = parseCodeReviewArgs(H),
    Y = $ ? "max" : q,
    A = _.options?.mainLoopModel,
    w = A ? Qs(A, Y ?? xY(_)) ?? Y : Y ?? xY(_),
    f = w === void 0 ? "medium" : vOH(w),
    j = buildCodeReviewPreamble({
      ultraFallback: $,
      fix: T,
      unrecognizedLevel: z,
      level: f,
      context: _
    });
  if (!$ && shouldRouteToReviewWorkflow(f, _)) {
    let D = K ? `${f} ${K}` : f;
    return [{
      type: "text",
      text: `${j}Run the workflow-backed code review at ${f} effort instead of reviewing inline.

Invoke: ${bG}({ name: ${bH(peH)}, args: ${bH(D)} })

Everything after the level in the args string is passed to the workflow as the review target / instructions. If the user gave additional instructions for this review elsewhere in the conversation (a scope restriction, files to focus on, things to skip), append them to the args string so the workflow honors them.

The workflow runs the same finder angles and verify pass as the inline review, in the background; the verified findings arrive as a task notification. When they arrive, present the findings ranked most-severe first (or note that nothing survived verification).${O ? vB4 : ""}${T ? EB4 : ""}`
    }];
  }
  let J = K ? `Review target: \`${K}\`

` : "";
  return [{
    type: "text",
    text: `${j}${J}${iPT[f]}${O ? vB4 : ""}${T ? EB4 : ""}`
  }];
}
/** Internal restored helper for mcp/5443_rawFirstToken.ts; behavior is preserved. */
function shouldRouteToReviewWorkflow(H: any, _: any): any {
  if (H !== "high" && H !== "xhigh" && H !== "max") return !1;
  if (!TP()) return !1;
  if (_.options?.isNonInteractiveSession) return !1;
  if (!_.options?.tools?.some((q: any): any => o1(q, bG))) return !1;
  return Y_("tengu_review_workflow_routing", !1);
}
/** Internal restored helper for mcp/5443_rawFirstToken.ts; behavior is preserved. */
function buildCodeReviewPreamble({
  ultraFallback: H,
  fix: _,
  unrecognizedLevel: q,
  level: K,
  context: O
}: any): any {
  if (H) {
    if (!VQ()) {
      if (_) return `(Running a local ${K}-effort review and applying its findings.)

`;
      if (F8_()) {
        if (O.options?.isNonInteractiveSession) {
          let z = nZ6();
          if (z) return `(${z} Falling back to a local ${K}-effort review.)

`;
        }
        return `(ultra (cloud review) requires claude.ai account access this session doesn't have \u2014 see https://code.claude.com/docs/en/ultrareview. Falling back to a local ${K}-effort review.)

`;
      }
      return `(ultra (cloud review) isn't available in this environment \u2014 see https://code.claude.com/docs/en/ultrareview. Falling back to a local ${K}-effort review.)

`;
    }
    let T = O.options?.commands?.some((z: any): any => z.name === "ultrareview" && uV(z)) ?? !1;
    if (_) return T ? `(Claude can't launch the cloud review directly \u2014 type \`/code-review ultra --fix\` to review in the cloud and apply the findings locally when it completes. Running a local ${K}-effort review and applying its findings for now.)

` : `(Running a local ${K}-effort review and applying its findings.)

`;
    return T ? `(Claude can't launch the cloud review directly \u2014 type \`/code-review ultra\` to run it. Falling back to a local ${K}-effort review for now.)

` : `(Claude can't launch the cloud review directly \u2014 the user can run \`claude ultrareview\` from a terminal to start it. Falling back to a local ${K}-effort review for now.)

`;
  }
  if (q !== void 0) return `(Ignoring unrecognized effort "${q}"; valid: ${Ei6.join(", ")}. Using ${K}.)

`;
  return "";
}
// FIXME: unverified name
/** Internal restored helper for mcp/5443_rawFirstToken.ts; behavior is preserved. */
function CB4(): any {
  JT({
    name: dPH,
    menuDescription: "Review the current diff for bugs and cleanups",
    subcommands: {
      ultra: "ultrareview"
    },
    description: getCodeReviewDescription,
    argumentHint: getCodeReviewArgumentHint,
    userInvocable: !0,
    getEffort(H: any): any {
      return parseCodeReviewArgs(H).explicit;
    },
    getPromptForCommand: getCodeReviewPrompt
  });
}
var iPT,
  vB4 = `

## Posting to GitHub (--comment)

The \`--comment\` flag was passed. After producing the findings list, if the
review target is a GitHub PR, post each finding as an inline PR comment via
\`mcp__github_inline_comment__create_inline_comment\` (one call per finding;
include a suggestion block only when it fully fixes the issue). If that tool
is not available in this session, fall back to \`gh api\` (repos/{owner}/{repo}/pulls/{pr}/comments)
or print the findings instead. If the target is not a PR, print the findings
to the terminal and note that \`--comment\` was ignored.
`,
  EB4 = `

## Applying fixes (--fix)

The \`--fix\` flag was passed. After producing the findings list, apply the
findings to the working tree instead of stopping at the report: fix each one
directly \u2014 correctness bugs and reuse/simplification/efficiency cleanups alike.
Skip any finding whose fix would change intended behavior, require changes well
outside the reviewed diff, or that you judge to be a false positive \u2014 note the
skip rather than arguing with it. Finish with a brief summary of what was fixed
and what was skipped.
`,
  Ei6,
  rPT;
var bB4 = L((): any => {
  k0H();
  o6();
  M7();
  Dn();
  c4();
  dT();
  H6();
  QP();
  Hjq();
  W4q();
  iPT = {
    low: $UK,
    medium: YUK,
    high: AUK,
    xhigh: fUK,
    max: jUK
  }, Ei6 = Fh, rPT = new RegExp(`^(${Ei6.map((H: any): any => H.slice(0, 3)).join("|")})[a-z]*$`, "i");
});

export {parseCodeReviewArgs as x7l,getCodeReviewDescription as NMm,getCodeReviewArgumentHint as BMm,getCodeReviewPrompt as FMm,shouldRouteToReviewWorkflow as UMm,buildCodeReviewPreamble as $Mm,CB4 as k7l,iPT as LMm,vB4 as w7l,EB4 as R7l,Ei6 as $Xn,rPT as MMm,bB4 as H7l};
