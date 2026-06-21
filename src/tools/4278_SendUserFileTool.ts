// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {lt,yH} from "../session/0131_sent.ts";
import {zn,getFeatureValue_CACHED_MAY_BE_STALE} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {Ct,logEvent} from "../../vendor/m131.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {sn} from "../config/0047_namespace.ts";
import {li,getAPIProvider} from "../api/1282_usesFirstPartyModelIds.ts";
import {Ap,ra} from "../config/0614_Ap.ts";
import {dr,Cn} from "../../vendor/m231.ts";
import {dpo,D3n,P3n} from "../config/4227_result.ts";
import {L9,isBriefEnabled} from "../config/4228_shouldToolsListOptInToBrief.ts";
import {oVa,nVa,rVa} from "../../vendor/m4276.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {SEND_USER_FILE_TOOL_NAME,pjr,SEND_USER_FILE_TOOL_PROMPT} from "../../vendor/m2693.ts";
import {st} from "../../vendor/m5.ts";
var sVa = {};
isFullscreenWithTTY(sVa, {
  SendUserFileTool: () => SendUserFileTool
});
var yLp, TLp, SendUserFileTool;
var iVa = b(() => {
  Xr();
  lt();
  zn();
  Ct();
  Ri();
  sn();
  li();
  Ap();
  dr();
  dpo();
  L9();
  oVa();
  yLp = we(() => E.strictObject({
    files: E.preprocess((fileArg: any) => typeof fileArg === "string" ? [fileArg] : fileArg, E.array(E.string()).min(1)).describe("File paths (absolute or relative to cwd) to send to the user. Always pass an array, even for a single file."),
    caption: E.string().optional().describe("Optional short caption for the file(s)."),
    status: E.enum(["normal", "proactive"]).describe("Use 'proactive' when you're surfacing a file the user hasn't asked for and needs to see now \u2014 a generated artifact, a completed report. Use 'normal' when replying to something the user just said.")
  })), TLp = we(() => E.object({
    caption: E.string().optional(),
    attachments: E.array(E.object({
      path: E.string(),
      size: E.number(),
      isImage: E.boolean(),
      file_uuid: E.string().optional(),
      media_type: E.string().optional()
    })).describe("Resolved file metadata")
  })), SendUserFileTool = pi({
    name: SEND_USER_FILE_TOOL_NAME,
    searchHint: "deliver files (screenshots, reports, artifacts) to the user",
    briefStandalone: !0,
    maxResultSizeChars: 1e5,
    userFacingName() {
      return "";
    },
    get inputSchema() {
      return yLp();
    },
    get outputSchema() {
      return TLp();
    },
    isEnabled() {
      if (getAPIProvider() !== "firstParty" || ra()) return !1;
      if (!getFeatureValue_CACHED_MAY_BE_STALE("tengu_send_user_file", !0)) return !1;
      return (yH() || !!process.env.CLAUDE_CODE_REMOTE_ENVIRONMENT_TYPE || st(process.env.CLAUDE_CODE_REMOTE)) && !isBriefEnabled();
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(inputArgs: any) {
      return inputArgs.caption ?? `[${inputArgs.files?.length ?? 0} file(s)]`;
    },
    async validateInput({
      files: filePaths
    }: any, ctx: any) {
      return D3n(filePaths);
    },
    async description() {
      return pjr;
    },
    async prompt() {
      return SEND_USER_FILE_TOOL_PROMPT;
    },
    mapToolResultToToolResultBlockParam(toolResult: any, toolUseId: any) {
      let fileCount = toolResult.attachments.length,
        uuidLines = toolResult.attachments.filter((attachment: any) => attachment.file_uuid !== void 0).map((attachment: any) => `  ${attachment.path} \u2192 file_uuid: ${attachment.file_uuid}`);
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `${fileCount} ${Cn(fileCount, "file")} delivered to user.` + (uuidLines.length > 0 ? `
${uuidLines.join(`
`)}` : "")
      };
    },
    renderToolUseMessage: nVa,
    renderToolResultMessage: rVa,
    async call({
      files: filePaths,
      caption: captionText,
      status: statusValue
    }: any, callCtx: any) {
      logEvent("tengu_send_user_file", {
        proactive: statusValue === "proactive",
        file_count: filePaths.length
      });
      let appState = callCtx.getAppState(),
        resolvedAttachments = await P3n(filePaths, {
          replBridgeEnabled: appState.replBridgeEnabled,
          signal: callCtx.abortController.signal
        });
      return {
        data: {
          caption: captionText,
          attachments: resolvedAttachments
        }
      };
    }
  });
});
export {sVa,yLp,TLp,SendUserFileTool,iVa};
