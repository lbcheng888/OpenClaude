// @ts-nocheck
import {ft as isFullscreenWithTTY,b} from "../../runtime.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {lt,isReplBridgeActive as yH} from "../session/0132_sent.ts";
import {jn as zn,getFeatureValue_CACHED_MAY_BE_STALE} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {kt as Ct,logEvent} from "../../vendor/m132.ts";
import {ri as Ri,Ks as pi} from "./2235_userFacingName.ts";
import {dn as sn} from "../config/0137_namespace.ts";
import {Ps as li,getAPIProvider} from "../api/1287_usesFirstPartyModelIds.ts";
import {$d as Ap,Vi as ra} from "../config/0620_$d.ts";
import {lr as dr,Sn as Cn} from "../../vendor/m233.ts";
import {i_o as dpo,B6n as D3n,U6n as P3n} from "../config/4245_result.ts";
import {n9 as L9,isBriefEnabled} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {AXa as oVa,EXa as nVa,CXa as rVa} from "../../vendor/m4294.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {SEND_USER_FILE_TOOL_NAME,WVr as pjr,SEND_USER_FILE_TOOL_PROMPT} from "../../vendor/m2705.ts";
import {nt as st} from "../../vendor/m127.ts";
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
export {sVa as RXa,yLp as B$p,TLp as U$p,SendUserFileTool,iVa as vXa};
