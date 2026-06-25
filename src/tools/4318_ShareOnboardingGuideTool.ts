// @ts-nocheck
import {ft as j_,b as L} from "../../runtime.ts";
import {hyo as $4q,L5n as pI6,gmt as P1_,oZa as sBK,fyo as z4q,rZa as aBK} from "../telemetry/4317_content.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {lt as w_,getOriginalCwd as G8} from "../session/0132_sent.ts";
import {ri as M7,Ks as c9} from "./2235_userFacingName.ts";
import {Ct as L_,In as b6} from "../../vendor/m197.ts";
import {ve as kH} from "../../vendor/m461.ts";
import {C as k} from "../../vendor/m321.ts";
// ===========================================================================
// ShareOnboardingGuideTool
//
// Tool definition for the "ShareOnboardingGuide" tool. It uploads the local
// `ONBOARDING.md` file to the organization's Claude Code onboarding-guide
// service and returns a share link teammates can open in Claude Code.
//
// Modes:
//   - "check"  (default): if a local ONBOARDING.md exists, upload it to the
//                          most-recently-updated org guide (creating one if
//                          none exist) and return a fresh link; otherwise
//                          return the existing link without uploading.
//   - "update": upload to a specific guide identified by short_code.
//   - "create": always create a brand new guide/link.
//   - "delete": remove a guide.
//
// Cross-module / bundler symbols kept verbatim (do NOT rename — they are
// referenced from other modules or are bundler-internal):
//   j_   = __export helper (defines export getters on the module object)
//   L    = __esmRunOnce helper (lazy, run-once module initializer)
//   tBK  = this module's exports object
//   eBK  = this module's run-once init function
//   c9   = tool factory (spreads base tool descriptor + adds userFacingName)
//   kH   = memoize helper (caches the lazily-built Zod schema)
//   k    = Zod schema namespace
//   $4q  = getOnboardingGuides()  -> all guides for the org
//   z4q  = updateOnboardingGuide(shortCode, content) -> PUT
//   aBK  = createOnboardingGuide(content, name?)      -> POST
//   sBK  = deleteOnboardingGuide(shortCode)           -> DELETE
//   P1_  = isTeamOnboardingShareEnabled()
//   G8   = getCwd()  (current working directory)
//   b6   = isFileNotFoundError(err) (ENOENT-style guard)
//   a8/w_/pI6/M7/L_ = sibling module run-once initializers
// ===========================================================================

/** Result status values produced by this tool. */
type ShareStatus = "created" | "updated" | "deleted" | "has_existing" | "unavailable";

/** Input arguments accepted by the tool's `call` method. */
interface ShareOnboardingGuideInput {
  mode?: "check" | "update" | "create" | "delete";
  short_code?: string;
}

/** A guide record as returned by the onboarding-guide service. */
interface OnboardingGuide {
  share_url: string;
  short_code: string;
  updated_at: string;
}

/** Result of a create/update call against the onboarding-guide service. */
interface OnboardingShareResult {
  share_url: string;
  short_code: string;
}

/** Standard tool result envelope: data carrying status + message. */
interface ShareToolResult {
  data: {
    status: ShareStatus;
    share_url?: string;
    short_code?: string;
    message: string;
  };
}

/** The tool's user-facing / registry name. */
var toolName = "ShareOnboardingGuide",
  /** Long-form description shown to the model. */
  toolDescription = `Upload the ONBOARDING.md in the current directory and return a share link teammates can open in Claude Code. Call this after the user has confirmed the final content.

When called with the default mode='check': if a local ONBOARDING.md is present, uploads it to the most-recently-updated org guide (or creates one if none exist) and returns a fresh link. If no local file is present, returns the existing link without uploading (status: has_existing).`;

/** This module's exports object (bundler-managed). */
var tBK = {};
j_(tBK, {
  ShareOnboardingGuideTool: () => ShareOnboardingGuideTool
});

/**
 * Returns the most-recently-updated onboarding guide for the org, or
 * `undefined` if the org has no guides.
 */
async function findMostRecentGuide(): Promise<OnboardingGuide | undefined> {
  let guides: OnboardingGuide[] = await $4q();
  if (guides.length === 0) return;
  return guides.reduce((latest, current) => latest.updated_at > current.updated_at ? latest : current);
}

/**
 * Builds a successful tool result for a created/updated share link, optionally
 * appending guidance telling the assistant how to close the conversation.
 */
function buildShareResult(status: ShareStatus, shareUrl: string, shortCode: string, includeClosingGuidance: boolean): ShareToolResult {
  let closingGuidance = includeClosingGuidance ? `

Close with: "Here's your onboarding guide: ${shareUrl}" followed by the send-to-teammates line.` : "";
  return {
    data: {
      status,
      share_url: shareUrl,
      short_code: shortCode,
      message: `Share link ${status}: ${shareUrl} (short_code: ${shortCode})${closingGuidance}`
    }
  };
}

/** Builds an "unavailable" tool result with the given explanatory message. */
function buildUnavailableResult(message: string): ShareToolResult {
  return {
    data: {
      status: "unavailable",
      message
    }
  };
}
var /** Node `fs/promises` module. */
  fsPromises: typeof import("fs/promises"),
  /** Node `path` module. */
  pathModule: typeof import("path"),
  /** Memoized factory for the input Zod schema. */
  getInputSchema: () => unknown,
  /** Memoized factory for the output Zod schema. */
  getOutputSchema: () => unknown,
  /** Name of the local onboarding file uploaded by this tool. */
  onboardingFileName = "ONBOARDING.md",
  /** Maximum allowed size (in bytes) of the onboarding file: 64 KiB. */
  maxFileSizeBytes = 65536,
  /** The exported tool definition (recovered export name — keep). */
  ShareOnboardingGuideTool: unknown;

/** Run-once initializer for this module (bundler-managed). */
var eBK = L(() => {
  a8();
  w_();
  pI6();
  M7();
  L_();
  fsPromises = require("fs/promises"), pathModule = require("path"), getInputSchema = kH(() => k.strictObject({
    mode: k.enum(["check", "update", "create", "delete"]).default("check").describe("'check' (default): if ONBOARDING.md is present locally, uploads it to the most-recent guide (creates one if none exist); otherwise reports the existing link without uploading. 'update': upload to a specific guide by short_code. 'create': always make a new link. 'delete': remove a guide."),
    short_code: k.string().regex(/^[A-Za-z0-9_-]{1,64}$/).optional().describe("Short code of a specific guide to target (returned by a previous call). Honored by check, update, and delete — skips the org-wide lookup and targets this guide directly.")
  })), getOutputSchema = kH(() => k.object({
    status: k.enum(["created", "updated", "deleted", "has_existing", "unavailable"]),
    share_url: k.string().optional(),
    short_code: k.string().optional(),
    message: k.string()
  })), ShareOnboardingGuideTool = c9({
    name: toolName,
    searchHint: "upload ONBOARDING.md and get a team share link",
    maxResultSizeChars: 1000,
    async description() {
      return toolDescription;
    },
    isEnabled() {
      return P1_();
    },
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    get inputSchema() {
      return getInputSchema();
    },
    get outputSchema() {
      return getOutputSchema();
    },
    async validateInput() {
      return {
        result: !0
      };
    },
    async prompt() {
      return toolDescription;
    },
    toAutoClassifierInput(input: ShareOnboardingGuideInput) {
      return `share onboarding guide (mode: ${input.mode ?? "check"})`;
    },
    isDestructive(input: ShareOnboardingGuideInput) {
      return input.mode === "delete";
    },
    renderToolUseMessage(input: ShareOnboardingGuideInput) {
      return input.mode && input.mode !== "check" ? input.mode : null;
    },
    async call({
      mode = "check",
      short_code: shortCode
    }: ShareOnboardingGuideInput) {
      if (mode === "delete") try {
        let targetShortCode = shortCode ?? (await findMostRecentGuide())?.short_code;
        if (!targetShortCode) return buildUnavailableResult("No guide found for this org to delete.");
        return await sBK(targetShortCode), {
          data: {
            status: "deleted",
            message: `Guide ${targetShortCode} deleted.`
          }
        };
      } catch (deleteError) {
        let errorMessage = deleteError instanceof Error ? deleteError.message : String(deleteError);
        return buildUnavailableResult(`Delete didn't go through (${errorMessage}).`);
      }
      if (mode === "check") try {
        let guide = shortCode ? (await $4q()).find((candidate: OnboardingGuide) => candidate.short_code === shortCode) : await findMostRecentGuide();
        if (guide) {
          let filePath = pathModule.join(G8(), onboardingFileName),
            fileSize: number | null = null;
          try {
            fileSize = (await fsPromises.stat(filePath)).size;
          } catch (statError) {
            if (!b6(statError)) throw statError;
          }
          if (fileSize === null) return {
            data: {
              status: "has_existing",
              share_url: guide.share_url,
              short_code: guide.short_code,
              message: `A guide already exists for this org at ${guide.share_url} (short_code: ${guide.short_code}). If this link is what the user needed, share it. If they want to create or update a guide, tell them to run /team-onboarding themselves (it scans local session data and cannot be invoked by the model).`
            }
          };
          if (fileSize > maxFileSizeBytes) return buildUnavailableResult(`${onboardingFileName} is over ${maxFileSizeBytes / 1024}KB. Trim it before sharing.`);
          let fileContent = await fsPromises.readFile(filePath, "utf8"),
            updateResult: OnboardingShareResult = await z4q(guide.short_code, fileContent);
          return buildShareResult("updated", updateResult.share_url, updateResult.short_code, !1);
        }
      } catch (uploadError) {
        let errorMessage = uploadError instanceof Error ? uploadError.message : String(uploadError);
        return buildUnavailableResult(`Upload didn't go through (${errorMessage}). Fall back to the manual share copy.`);
      }
      let filePath = pathModule.join(G8(), onboardingFileName),
        fileSize: number;
      try {
        fileSize = (await fsPromises.stat(filePath)).size;
      } catch (statError) {
        if (b6(statError)) return buildUnavailableResult(`${onboardingFileName} not found in the current directory. Write the guide first.`);
        throw statError;
      }
      if (fileSize > maxFileSizeBytes) return buildUnavailableResult(`${onboardingFileName} is over ${maxFileSizeBytes / 1024}KB. Trim it before sharing.`);
      let fileContent = await fsPromises.readFile(filePath, "utf8");
      try {
        if (mode === "update") {
          let targetShortCode = shortCode ?? (await findMostRecentGuide())?.short_code;
          if (targetShortCode) {
            let updateResult: OnboardingShareResult = await z4q(targetShortCode, fileContent);
            return buildShareResult("updated", updateResult.share_url, updateResult.short_code, !0);
          }
        }
        let createResult: OnboardingShareResult = await aBK(fileContent);
        return buildShareResult("created", createResult.share_url, createResult.short_code, !1);
      } catch (uploadError) {
        let errorMessage = uploadError instanceof Error ? uploadError.message : String(uploadError);
        return buildUnavailableResult(`Upload didn't go through (${errorMessage}). Fall back to the manual share copy.`);
      }
    },
    mapToolResultToToolResultBlockParam(result: ShareToolResult["data"], toolUseId: string) {
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `[${result.status}] ${result.message}`
      };
    }
  });
});
export {toolName as e6t,toolDescription as gyo,tBK as sZa,findMostRecentGuide as _yo,buildShareResult as yyo,buildUnavailableResult as q5e,fsPromises as _mt,pathModule as Tyo,getInputSchema as t3p,getOutputSchema as n3p,onboardingFileName as t6t,maxFileSizeBytes as M5n,ShareOnboardingGuideTool,eBK as iZa};
