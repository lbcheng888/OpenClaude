// @ts-nocheck
import {Vi,$d} from "../config/0620_$d.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {I8e,ICo,x8e} from "./4493_kind.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Kk,po} from "../tools/5224_userPromptCount.ts";
import {extractAgentIdsFromMessages as AOo,loadSubagentTranscripts as LXn,MAX_TRANSCRIPT_READ_BYTES as aOo,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {getHead as Bje,ia} from "../../vendor/m698.ts";
import {Nm,D_} from "./2784_withFileTypes.ts";
import {lVn,Ift,bCo} from "../../vendor/m4490.ts";
import {TeamDeleteToolName as Pe,qt,tn} from "../config/0230_encoding.ts";
import {lpe,kc,aA} from "../../vendor/m234.ts";
import {Hft,SCo} from "../../vendor/m4489.ts";
import {withOAuth401Retry as N0,getUserAgent as N7,kk} from "../api/2037_withOAuth401Retry.ts";
import {Vs,lT} from "../../vendor/m2195.ts";
import {Ce,Fb,Ct} from "../../vendor/m197.ts";
import {b} from "../../runtime.ts";
// Main function: collect and share (or bundle) a session transcript for feedback
async function unr(messages: any, trigger: any, appearanceId: any) {
  // Block if only essential traffic is allowed
  if (Vi()) return xe("feedback_transcript_share", "essential_traffic_only"), {
    success: !1,
    errorCode: "essential_traffic_only"
  };
  // Block if policy disallows product feedback
  if (!Xs("allow_product_feedback")) return xe("feedback_transcript_share", "policy_blocked"), {
    success: !1,
    errorCode: "policy_blocked"
  };
  // Determine delivery mode: "bundle" (zip locally) or "post" (HTTP upload)
  let deliveryMode = I8e().kind === "bundle" ? "bundle" : "post";
  try {
    A("Collecting transcript for sharing", {
      level: "info"
    });
    // Summarize messages and gather sub-agent IDs
    let summarizedTranscript = Kk(messages),
      subagentIds = AOo(messages),
      // Load sub-agent transcripts and git HEAD commit SHA in parallel
      [subagentTranscripts, headCommitSha] = await Promise.all([LXn(subagentIds), Bje()]),
      rawTranscriptJsonl: string | undefined;
    // Attempt to read the raw JSONL transcript file if it is not too large
    try {
      let transcriptFilePath = Nm(),
        {
          size: fileSize
        } = await cnr.stat(transcriptFilePath);
      if (fileSize <= aOo) rawTranscriptJsonl = await cnr.readFile(transcriptFilePath, "utf-8");else A(`Skipping raw transcript read: file too large (${fileSize} bytes)`, {
        level: "warn"
      });
    } catch {}
    // For HTTP post mode: strip any sub-agent transcripts or raw JSONL that contain third-party markers
    if (deliveryMode === "post") {
      for (let [subagentId, subagentData] of Object.entries(subagentTranscripts)) if (lVn(subagentData)) delete subagentTranscripts[subagentId], A(`subagent transcript ${subagentId} withheld: contains_3p_transcript_markers`);
      if (rawTranscriptJsonl !== void 0 && Ift(rawTranscriptJsonl)) rawTranscriptJsonl = void 0, A("rawTranscriptJsonl withheld from transcript share: contains_3p_transcript_markers");
    }
    // Re-encode each line of the raw JSONL (pretty-print JSON if parseable, else keep as-is)
    let prettyRawJsonl = rawTranscriptJsonl?.split(`
`).map(line => {
        if (!line) return line;
        try {
          return Pe(lpe(qt(line)));
        } catch {
          return kc(line);
        }
      }).join(`
`),
      // Build the payload object with version metadata, platform info, and transcript content
      payloadBody = {
        ...lpe({
          trigger,
          version: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.1.190",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2026-06-24T02:21:52Z",
            GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
          }.VERSION,
          platform: "darwin",
          commitSha: headCommitSha || null,
          transcript: summarizedTranscript,
          subagentTranscripts: Object.keys(subagentTranscripts).length > 0 ? subagentTranscripts : void 0
        }),
        rawTranscriptJsonl: prettyRawJsonl
      },
      // Serialize payload, redacting fields in the sensitive sets
      serializedPayload = Hft(payloadBody, RWm, vWm, {
        extraOuterFields: {
          appearance_id: appearanceId
        }
      });
    // Bundle mode: write as a zip archive locally
    if (deliveryMode === "bundle") {
      let bundleResult = await ICo(serializedPayload, "transcript.json");
      if (bundleResult.success) return He("feedback_transcript_share"), {
        success: !0,
        bundlePath: bundleResult.zipPath
      };
      return xe("feedback_transcript_share", "bundle_write_failed"), {
        success: !1,
        errorCode: "bundle_write_failed"
      };
    }
    // Post mode: upload to the shared-session-transcripts API endpoint
    let httpResponse = await N0(() => Vs.post("/api/claude_code_shared_session_transcripts", serializedPayload, {
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": N7()
      }
    }));
    if (!httpResponse.ok) switch (httpResponse.reason) {
      case "essential-traffic-only":
        return xe("feedback_transcript_share", "essential_traffic_only"), {
          success: !1,
          errorCode: "essential_traffic_only"
        };
      case "data-residency":
        return xe("feedback_transcript_share", "data_residency"), {
          success: !1,
          errorCode: "data_residency"
        };
      case "no-auth":
        return xe("feedback_transcript_share", "auth_unavailable"), {
          success: !1,
          errorCode: "auth_unavailable"
        };
    }
    if (httpResponse.status === 200 || httpResponse.status === 201) return A("Transcript shared successfully", {
      level: "info"
    }), He("feedback_transcript_share"), {
      success: !0,
      transcriptId: httpResponse.data?.transcript_id
    };
    // Return HTTP error code for any other status
    let httpErrorCode = `http_${httpResponse.status}`;
    return xe("feedback_transcript_share", httpErrorCode), {
      success: !1,
      errorCode: httpErrorCode
    };
  } catch (caughtError) {
    A(Ce(caughtError), {
      level: "error"
    });
    let errorCode = wWm(caughtError);
    return xe("feedback_transcript_share", errorCode), {
      success: !1,
      errorCode
    };
  }
}
// Map a caught error to a canonical error-code string for telemetry
function wWm(error: any): string {
  if (error instanceof RangeError) return "payload_range_error";
  let {
    kind: errorKind,
    status: httpStatus
  } = Fb(error);
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
var cnr, RWm, vWm;
// Module initializer: set up lazy dependencies (fs/promises, sensitive field sets)
var e2o = b(() => {
  mn();
  x8e();
  lT();
  Bu();
  SCo();
  qe();
  Ct();
  ia();
  kk();
  po();
  $d();
  aA();
  D_();
  _a();
  tn();
  bCo();
  cnr = require("fs/promises"), RWm = new Set(["transcript"]), vWm = new Set(["subagentTranscripts"]);
});

export {unr,wWm,cnr,RWm,vWm,e2o};
