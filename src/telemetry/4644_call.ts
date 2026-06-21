// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {saveGlobalConfig as P6,Qn as T8} from "../session/5194_shouldSkipPluginAutoupdate.ts";
import {Oc as o4,b_ as rw} from "../../vendor/m2039.ts";
/** /install-slack-app inline command handler — opens the Claude Slack marketplace page in the browser. */

// Cross-module linkage: keep minified names as-is.
declare function j_(exports: object, defs: Record<string, () => unknown>): void;
declare function c(event: string, properties: Record<string, unknown>): void;
declare function P6(updater: (config: { slackAppInstallCount?: number; [key: string]: unknown }) => { slackAppInstallCount: number; [key: string]: unknown }): void;
declare function o4(url: string): Promise<boolean>;
declare function y_(): void;
declare function rw(): void;
declare function T8(): void;
declare const L: (init: () => void) => unknown;

/** Module exports namespace. */
var x74 = {};
j_(x74, {
  call: () => call
});

/** Text result shape returned to the conversation. */
interface TextResult {
  type: "text";
  value: string;
}

/**
 * Implements the `/install-slack-app` inline slash command.
 *
 * Fires a `tengu_install_slack_app_clicked` telemetry event, increments the
 * persistent `slackAppInstallCount` config counter, then attempts to open the
 * Claude Slack Marketplace listing in the user's default browser.
 *
 * Returns a text message indicating success or failure.
 */
async function call(): Promise<TextResult> {
  if (c("tengu_install_slack_app_clicked", {}), P6(config => ({
    ...config,
    slackAppInstallCount: (config.slackAppInstallCount ?? 0) + 1
  })), await o4(SLACK_APP_MARKETPLACE_URL)) return {
    type: "text",
    value: "Opening Slack app installation page in browser…"
  };else return {
    type: "text",
    value: `Couldn't open browser. Visit: ${SLACK_APP_MARKETPLACE_URL}`
  };
}

/** URL of the Claude app in the Slack Marketplace. */
var SLACK_APP_MARKETPLACE_URL = "https://slack.com/marketplace/A08SF47R6P4-claude";

/** Lazy module initializer — ensures telemetry, config, and utility modules are ready. */
var u74 = L(() => {
  y_();
  rw();
  T8();
});

export {x74 as Cpl,call as Ezp,SLACK_APP_MARKETPLACE_URL as Epl,u74 as vpl};
