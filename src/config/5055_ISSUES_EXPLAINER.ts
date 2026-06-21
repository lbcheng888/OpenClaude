// @ts-nocheck
import {getFeatureValue_DEPRECATED,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {tZ} from "../../vendor/m2206.ts";
import {b} from "../../runtime.ts";
import {Xr} from "../../vendor/m321.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
// Fetches remote bridge REPL config from feature flag and validates against schema; falls back to defaults
async function SRo() {
  let remoteConfig = await getFeatureValue_DEPRECATED("tengu_bridge_repl_v2_config", AIl),
    parseResult = Adm().safeParse(remoteConfig);
  return parseResult.success ? parseResult.data : AIl;
}
// Returns an error string if the current Claude Code version is too old for Remote Control, otherwise null
async function e7n() {
  let bridgeConfig = await SRo();
  if (bridgeConfig.min_version && tZ({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION, bridgeConfig.min_version)) return `Your version of Claude Code (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION}) is too old for Remote Control.
Version ${bridgeConfig.min_version} or higher is required. Run \`claude update\` to update.`;
  return null;
}
var AIl, Adm;
// Module initializer: sets default bridge REPL config and builds the Zod schema validator (lazy via `we`)
var t7n = b(() => {
  Xr();
  zn();
  AIl = {
    init_retry_max_attempts: 3,
    init_retry_base_delay_ms: 500,
    init_retry_jitter_fraction: 0.25,
    init_retry_max_delay_ms: 4000,
    http_timeout_ms: 1e4,
    uuid_dedup_buffer_size: 2000,
    heartbeat_interval_ms: 20000,
    heartbeat_jitter_fraction: 0.1,
    token_refresh_buffer_ms: 300000,
    teardown_archive_timeout_ms: 1500,
    connect_timeout_ms: 15000,
    oauth_retry_max_attempts: 3,
    oauth_retry_base_delay_ms: 2000,
    min_version: "0.0.0",
    should_show_app_upgrade_message: !1
  }, Adm = we(() => E.object({
    init_retry_max_attempts: E.number().int().min(1).max(10).default(3),
    init_retry_base_delay_ms: E.number().int().min(100).default(500),
    init_retry_jitter_fraction: E.number().min(0).max(1).default(0.25),
    init_retry_max_delay_ms: E.number().int().min(500).default(4000),
    http_timeout_ms: E.number().int().min(2000).default(1e4),
    uuid_dedup_buffer_size: E.number().int().min(100).max(50000).default(2000),
    heartbeat_interval_ms: E.number().int().min(5000).max(30000).default(20000),
    heartbeat_jitter_fraction: E.number().min(0).max(0.5).default(0.1),
    token_refresh_buffer_ms: E.number().int().min(30000).max(1800000).default(300000),
    teardown_archive_timeout_ms: E.number().int().min(500).max(2000).default(1500),
    connect_timeout_ms: E.number().int().min(5000).max(60000).default(15000),
    oauth_retry_max_attempts: E.number().int().min(0).max(6).default(3),
    oauth_retry_base_delay_ms: E.number().int().min(100).max(1e4).default(2000),
    min_version: E.string().refine(versionStr => {
      try {
        return tZ(versionStr, "0.0.0"), !0;
      } catch {
        return !1;
      }
    }).default("0.0.0"),
    should_show_app_upgrade_message: E.boolean().default(!1)
  }));
});
export {SRo,e7n,AIl,Adm,t7n};
