// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {kt as Ct,logEvent} from "../../vendor/m132.ts";
import {ri as Ri,Ks as pi} from "./2235_userFacingName.ts";
import {aZe as cXe,isPewterOwlTool} from "../config/2031_isPewterOwlTool.ts";
import {lr as dr,Sn as Cn} from "../../vendor/m233.ts";
import {i_o as dpo,B6n as D3n,U6n as P3n} from "../config/4245_result.ts";
import {parsePermissionRule as j$,BRIEF_TOOL_NAME,LEGACY_BRIEF_TOOL_NAME,DESCRIPTION,BRIEF_TOOL_PROMPT,PEWTER_OWL_TOOL_PROMPT} from "../../vendor/m2704.ts";
import {n9 as L9,isBriefEnabled} from "../config/4246_shouldToolsListOptInToBrief.ts";
import {a_o as ppo,Ija as d5a,xja as p5a} from "../../vendor/m4246.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
var gPp,
  m5a = "The message for the user. Supports markdown formatting.",
  _Pp,
  yPp,
  TPp,
  f5a;
var A5a = b(() => {
  Xr();
  Ct();
  Ri();
  cXe();
  dr();
  dpo();
  j$();
  L9();
  ppo();
  gPp = we(() => E.strictObject({
    file_uuid: E.string(),
    file_name: E.string(),
    size: E.number(),
    is_image: E.boolean(),
    media_type: E.string().optional()
  }).describe("A file already uploaded to the filestore (e.g. by the device attach_file tool). Passed through without local stat or upload.")), _Pp = we(() => E.strictObject({
    message: E.string().describe(m5a),
    attachments: E.array(E.union([E.string(), gPp()])).optional().describe("Optional attachments for the user to see alongside your message. Each entry is either a file path (absolute or relative to cwd) for a file you can read locally, or a pre-resolved {file_uuid, file_name, size, is_image} object you obtained from a device tool such as attach_file."),
    status: E.enum(["normal", "proactive"]).describe("Use 'proactive' when you're surfacing something the user hasn't asked for and needs to see now — task completion while they're away, a blocker you hit, an unsolicited status update. Use 'normal' when replying to something the user just said.")
  })), yPp = we(() => E.object({
    message: E.string().describe(m5a)
  })), TPp = we(() => E.object({
    message: E.string().describe("The message"),
    attachments: E.array(E.object({
      path: E.string(),
      size: E.number(),
      isImage: E.boolean(),
      file_uuid: E.string().optional(),
      media_type: E.string().optional()
    })).optional().describe("Resolved attachment metadata"),
    sentAt: E.string().optional().describe("ISO timestamp captured at tool execution on the emitting process. Optional — resumed sessions replay pre-sentAt outputs verbatim.")
  })), f5a = pi({
    name: BRIEF_TOOL_NAME,
    aliases: [LEGACY_BRIEF_TOOL_NAME],
    searchHint: "send a message to the user — your primary visible output channel",
    briefStandalone: !0,
    maxResultSizeChars: 1e5,
    userFacingName() {
      return "";
    },
    get inputSchema() {
      return isBriefEnabled() ? _Pp() : yPp();
    },
    get outputSchema() {
      return TPp();
    },
    isEnabled() {
      return isBriefEnabled() || isPewterOwlTool();
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    toAutoClassifierInput(e) {
      return e.message;
    },
    async validateInput(e, t) {
      if (!("attachments" in e) || !e.attachments?.length) return {
        result: !0
      };
      return D3n(e.attachments);
    },
    async description() {
      return DESCRIPTION;
    },
    async prompt() {
      return isBriefEnabled() ? BRIEF_TOOL_PROMPT : PEWTER_OWL_TOOL_PROMPT;
    },
    mapToolResultToToolResultBlockParam(e, t) {
      let n = e.attachments?.length ?? 0,
        r = n === 0 ? "" : ` (${n} ${Cn(n, "attachment")} included)`;
      return {
        tool_use_id: t,
        type: "tool_result",
        content: `Message delivered to user.${r}`
      };
    },
    renderToolUseMessage: d5a,
    renderToolResultMessage: p5a,
    async call(e, t) {
      let {
          message: n
        } = e,
        r = "attachments" in e ? e.attachments : void 0,
        o = new Date().toISOString();
      if (logEvent("tengu_brief_send", {
        proactive: "status" in e && e.status === "proactive",
        attachment_count: r?.length ?? 0
      }), !r?.length) return {
        data: {
          message: n,
          sentAt: o
        }
      };
      let s = t.getAppState(),
        i = await P3n(r, {
          replBridgeEnabled: s.replBridgeEnabled,
          signal: t.abortController.signal
        });
      return {
        data: {
          message: n,
          attachments: i,
          sentAt: o
        }
      };
    }
  });
});
export {gPp as MUp,m5a as Dja,_Pp as NUp,yPp as FUp,TPp as BUp,f5a as Pja,A5a as Oja};
