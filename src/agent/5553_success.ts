// @ts-nocheck
import {ra,Ap} from "../config/0614_Ap.ts";
import {Oe,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {isPolicyAllowed,rd} from "../../vendor/m2205.ts";
import {rje,L_o,oje} from "./4471_kind.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {kk,lo} from "../tools/5190_userPromptCount.ts";
import {extractAgentIdsFromMessages,loadSubagentTranscripts,MAX_TRANSCRIPT_READ_BYTES,ja} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {getHead,Ba} from "../../vendor/m693.ts";
import {qf,ry} from "./2772_withFileTypes.ts";
import {qjn,Hpt,w_o} from "../../vendor/m4468.ts";
import {Le,qt,Xt} from "../config/0228_encoding.ts";
import {epe,Kc,tv} from "../../vendor/m232.ts";
import {kpt,v_o} from "../../vendor/m4467.ts";
import {withOAuth401Retry,getUserAgent,fk} from "../api/2032_withOAuth401Retry.ts";
import {si,gT} from "../../vendor/m2190.ts";
import {Se,Lb,bt} from "../../vendor/m195.ts";
import {b} from "../../runtime.ts";
// Main function: collect and share (or bundle) a session transcript for feedback
async function lQn(messages: any, trigger: any, appearanceId: any) {
  // Block if only essential traffic is allowed
  if (ra()) return Oe("feedback_transcript_share", "essential_traffic_only"), {
    success: !1,
    errorCode: "essential_traffic_only"
  };
  // Block if policy disallows product feedback
  if (!isPolicyAllowed("allow_product_feedback")) return Oe("feedback_transcript_share", "policy_blocked"), {
    success: !1,
    errorCode: "policy_blocked"
  };
  // Determine delivery mode: "bundle" (zip locally) or "post" (HTTP upload)
  let deliveryMode = rje().kind === "bundle" ? "bundle" : "post";
  try {
    logForDebugging("Collecting transcript for sharing", {
      level: "info"
    });
    // Summarize messages and gather sub-agent IDs
    let summarizedTranscript = kk(messages),
      subagentIds = extractAgentIdsFromMessages(messages),
      // Load sub-agent transcripts and git HEAD commit SHA in parallel
      [subagentTranscripts, headCommitSha] = await Promise.all([loadSubagentTranscripts(subagentIds), getHead()]),
      rawTranscriptJsonl: string | undefined;
    // Attempt to read the raw JSONL transcript file if it is not too large
    try {
      let transcriptFilePath = qf(),
        {
          size: fileSize
        } = await aQn.stat(transcriptFilePath);
      if (fileSize <= MAX_TRANSCRIPT_READ_BYTES) rawTranscriptJsonl = await aQn.readFile(transcriptFilePath, "utf-8");else logForDebugging(`Skipping raw transcript read: file too large (${fileSize} bytes)`, {
        level: "warn"
      });
    } catch {}
    // For HTTP post mode: strip any sub-agent transcripts or raw JSONL that contain third-party markers
    if (deliveryMode === "post") {
      for (let [subagentId, subagentData] of Object.entries(subagentTranscripts)) if (qjn(subagentData)) delete subagentTranscripts[subagentId], logForDebugging(`subagent transcript ${subagentId} withheld: contains_3p_transcript_markers`);
      if (rawTranscriptJsonl !== void 0 && Hpt(rawTranscriptJsonl)) rawTranscriptJsonl = void 0, logForDebugging("rawTranscriptJsonl withheld from transcript share: contains_3p_transcript_markers");
    }
    // Re-encode each line of the raw JSONL (pretty-print JSON if parseable, else keep as-is)
    let prettyRawJsonl = rawTranscriptJsonl?.split(`
`).map(line => {
        if (!line) return line;
        try {
          return Le(epe(qt(line)));
        } catch {
          return Kc(line);
        }
      }).join(`
`),
      // Build the payload object with version metadata, platform info, and transcript content
      payloadBody = {
        ...epe({
          trigger,
          version: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.1.185",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2026-06-20T06:38:30Z",
            GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
          }.VERSION,
          platform: "darwin",
          commitSha: headCommitSha || null,
          transcript: summarizedTranscript,
          subagentTranscripts: Object.keys(subagentTranscripts).length > 0 ? subagentTranscripts : void 0
        }),
        rawTranscriptJsonl: prettyRawJsonl
      },
      // Serialize payload, redacting fields in the sensitive sets
      serializedPayload = kpt(payloadBody, KUm, zUm, {
        extraOuterFields: {
          appearance_id: appearanceId
        }
      });
    // Bundle mode: write as a zip archive locally
    if (deliveryMode === "bundle") {
      let bundleResult = await L_o(serializedPayload, "transcript.json");
      if (bundleResult.success) return Ie("feedback_transcript_share"), {
        success: !0,
        bundlePath: bundleResult.zipPath
      };
      return Oe("feedback_transcript_share", "bundle_write_failed"), {
        success: !1,
        errorCode: "bundle_write_failed"
      };
    }
    // Post mode: upload to the shared-session-transcripts API endpoint
    let httpResponse = await withOAuth401Retry(() => si.post("/api/claude_code_shared_session_transcripts", serializedPayload, {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": getUserAgent()
      }
    }));
    if (!httpResponse.ok) switch (httpResponse.reason) {
      case "essential-traffic-only":
        return Oe("feedback_transcript_share", "essential_traffic_only"), {
          success: !1,
          errorCode: "essential_traffic_only"
        };
      case "data-residency":
        return Oe("feedback_transcript_share", "data_residency"), {
          success: !1,
          errorCode: "data_residency"
        };
      case "no-auth":
        return Oe("feedback_transcript_share", "auth_unavailable"), {
          success: !1,
          errorCode: "auth_unavailable"
        };
    }
    if (httpResponse.status === 200 || httpResponse.status === 201) return logForDebugging("Transcript shared successfully", {
      level: "info"
    }), Ie("feedback_transcript_share"), {
      success: !0,
      transcriptId: httpResponse.data?.transcript_id
    };
    // Return HTTP error code for any other status
    let httpErrorCode = `http_${httpResponse.status}`;
    return Oe("feedback_transcript_share", httpErrorCode), {
      success: !1,
      errorCode: httpErrorCode
    };
  } catch (caughtError) {
    logForDebugging(Se(caughtError), {
      level: "error"
    });
    let errorCode = YUm(caughtError);
    return Oe("feedback_transcript_share", errorCode), {
      success: !1,
      errorCode
    };
  }
}
// Map a caught error to a canonical error-code string for telemetry
function YUm(error: any): string {
  if (error instanceof RangeError) return "payload_range_error";
  let {
    kind: errorKind,
    status: httpStatus
  } = Lb(error);
  switch (errorKind) {
    case "timeout":
    case "network":
      return errorKind;
    case "auth":
    case "http":
      if (httpStatus !== void 0) return `http_${httpStatus}`;
      return error.code?.toLowerCase() ?? "no_response";
    case "other":
      return "exception";
  }
}
var aQn, KUm, zUm;
// Module initializer: set up lazy dependencies (fs/promises, sensitive field sets)
var HMo = b(() => {
  ln();
  oje();
  gT();
  rd();
  v_o();
  qe();
  bt();
  Ba();
  fk();
  lo();
  Ap();
  tv();
  ry();
  ja();
  Xt();
  w_o();
  aQn = require("fs/promises"),
  // fs/promises used for stat + readFile on the raw transcript file
  KUm = new Set(["transcript"]),
  // fields to redact in outer serialization layer
  zUm = new Set(["subagentTranscripts"]); // fields to redact in nested serialization layer
});
export {lQn,YUm,aQn,KUm,zUm,HMo};
