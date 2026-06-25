// @ts-nocheck
import {goe,pd} from "../../vendor/m706.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Ansi as nd} from "../../vendor/m2441.ts";
import {lw,a4} from "../../vendor/m2436.ts";
import {LD,oHe} from "../../vendor/m2814.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Slack tool helpers: detection of Slack send-message tool names and
 * rendering of a clickable channel label/tag for tool-use output.
 */

/** True when `toolName` is one of the known Slack message-sending tools. */
function dla(toolName: string): boolean {
  return W7d.has(toolName);
}

/**
 * Build a `#channel` label and an optional Slack app-redirect URL from a
 * tool input object that carries a `channel_id`/`channel` field.
 * Returns null when no usable string channel is present.
 */
function G7d(toolInput: { channel_id?: string; channel?: string }): { label: string; url: string | null } | null {
  let channelRaw = toolInput.channel_id ?? toolInput.channel;
  if (typeof channelRaw !== "string" || !channelRaw) return null;
  let channelName = channelRaw.replace(/^#/, ""),
    channelLabel = `#${channelName}`,
    channelUrl = q7d.test(channelName) ? `https://slack.com/app_redirect?channel=${channelName}` : null;
  return {
    label: channelLabel,
    url: channelUrl
  };
}

/** Factory producing the Slack tool's user-facing display behavior. */
function pla() {
  return {
    userFacingName() {
      return "Slacked";
    },
    renderToolUseMessage(toolInput: Record<string, unknown>, {
      verbose: verbose
    }: { verbose: boolean }) {
      if (!verbose) return "";
      let customMessage = goe(toolInput);
      if (customMessage !== null) return customMessage;
      return Object.entries(toolInput).map(([key, value]) => `${key}: ${Pe(value)}`).join(", ");
    },
    renderToolUseTag(toolInput: { channel_id?: string; channel?: string }) {
      let channelInfo = G7d(toolInput);
      if (channelInfo === null) return null;
      return eQr.jsx($, {
        flexWrap: "nowrap",
        marginLeft: 1,
        children: eQr.jsx(nd, {
          children: channelInfo.url && lw() ? LD(channelInfo.url, channelInfo.label) : channelInfo.label
        })
      });
    }
  };
}
var eQr: any, q7d: RegExp, W7d: Set<string>;
var mla = b(() => {
  a4();
  je();
  oHe();
  pd();
  tn();
  eQr = x(oe(), 1), q7d = /^[CDG][A-Z0-9]{6,}$/, W7d = new Set(["slack_send_message", "slack_post_message"]);
});

export {dla,G7d,pla,eQr,q7d,W7d,mla};
