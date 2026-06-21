// @ts-nocheck
import {_oe,Pd} from "../../vendor/m701.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {Box} from "../../vendor/m2422.ts";
import {Ansi} from "../../vendor/m2431.ts";
import {JR,U4} from "../../vendor/m2426.ts";
import {MF,s$e} from "../../vendor/m2801.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
/** Returns true if the given tool name is a known Slack tool. */
function ata(toolName: string): boolean {
  return s3d.has(toolName);
}

/** Parses a Slack channel_id/channel input into a label+url object, or null if invalid. */
function i3d(input: any): {
  label: string;
  url: string | null;
} | null {
  let channelRaw = input.channel_id ?? input.channel;
  if (typeof channelRaw !== "string" || !channelRaw) return null;
  // Strip leading # to normalize channel name
  let channelName = channelRaw.replace(/^#/, "");
  let channelLabel = `#${channelName}`;
  // Build redirect URL only for valid Slack channel IDs
  let channelUrl = o3d.test(channelName) ? `https://slack.com/app_redirect?channel=${channelName}` : null;
  return {
    label: channelLabel,
    url: channelUrl
  };
}

/** Factory that returns the Slack tool descriptor with rendering methods. */
function lta(): any {
  return {
    userFacingName() {
      return "Slacked";
    },
    renderToolUseMessage(toolInput: any, {
      verbose: isVerbose
    }: {
      verbose: boolean;
    }) {
      if (!isVerbose) return "";
      let overrideText = _oe(toolInput);
      if (overrideText !== null) return overrideText;
      return Object.entries(toolInput).map(([key, value]) => `${key}: ${Le(value)}`).join(", ");
    },
    renderToolUseTag(toolInput: any) {
      let channelInfo = i3d(toolInput);
      if (channelInfo === null) return null;
      // Render the channel label, optionally as a hyperlink if supported
      return FMt.createElement(Box, {
        flexWrap: "nowrap",
        marginLeft: 1
      }, FMt.createElement(Ansi, null, channelInfo.url && JR() ? MF(channelInfo.url, channelInfo.label) : channelInfo.label));
    }
  };
}
var FMt: any, o3d: RegExp, s3d: Set<string>;

/** Module initializer — sets up React ref, channel-ID regex, and known Slack tool names. */
var cta = b(() => {
  U4();
  ze();
  s$e();
  Pd();
  Xt();
  // FMt is the React/Ink createElement handle
  FMt = M(Te(), 1),
  // Matches Slack channel/DM/group IDs like C1234567, D1234567, G1234567
  o3d = /^[CDG][A-Z0-9]{6,}$/, s3d = new Set(["slack_send_message", "slack_post_message"]);
});
export {ata,i3d,lta,FMt,o3d,s3d,cta};
