// @ts-nocheck
import {getFeatureValue_DEPRECATED as _bn,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {QQ} from "../../vendor/m2214.ts";
import {b} from "../../runtime.ts";
import {Qr} from "../../vendor/m323.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
// @ts-nocheck
/**
 * Loads the remote-control ("tengu bridge REPL v2") config from gate storage,
 * validates it against the zod schema, and falls back to defaults on failure.
 */
async function loadBridgeConfig(): Promise<typeof $Nl> {
  let raw = await _bn("tengu_bridge_repl_v2_config", $Nl),
    parsed = vSm().safeParse(raw);
  return parsed.success ? parsed.data : $Nl;
}
/**
 * If the loaded bridge config declares a min_version newer than the current
 * build, returns a user-facing "too old for Remote Control" message; else null.
 */
async function getRemoteControlVersionWarning(): Promise<string | null> {
  let config = await loadBridgeConfig();
  if (config.min_version && QQ({
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION, config.min_version)) return `Your version of Claude Code (${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.190",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-24T02:21:52Z",
    GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
  }.VERSION}) is too old for Remote Control.
Version ${config.min_version} or higher is required. Run \`claude update\` to update.`;
  return null;
}
/** Default remote-control bridge config (timeouts, retry/backoff, heartbeat tuning). */
var $Nl, vSm;
var jYn = b(() => {
  Qr();
  jn();
  $Nl = {
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
  }, vSm = ve(() => C.object({
    init_retry_max_attempts: C.number().int().min(1).max(10).default(3),
    init_retry_base_delay_ms: C.number().int().min(100).default(500),
    init_retry_jitter_fraction: C.number().min(0).max(1).default(0.25),
    init_retry_max_delay_ms: C.number().int().min(500).default(4000),
    http_timeout_ms: C.number().int().min(2000).default(1e4),
    uuid_dedup_buffer_size: C.number().int().min(100).max(50000).default(2000),
    heartbeat_interval_ms: C.number().int().min(5000).max(30000).default(20000),
    heartbeat_jitter_fraction: C.number().min(0).max(0.5).default(0.1),
    token_refresh_buffer_ms: C.number().int().min(30000).max(1800000).default(300000),
    teardown_archive_timeout_ms: C.number().int().min(500).max(2000).default(1500),
    connect_timeout_ms: C.number().int().min(5000).max(60000).default(15000),
    oauth_retry_max_attempts: C.number().int().min(0).max(6).default(3),
    oauth_retry_base_delay_ms: C.number().int().min(100).max(1e4).default(2000),
    min_version: C.string().refine(version => {
      try {
        return QQ(version, "0.0.0"), !0;
      } catch {
        return !1;
      }
    }).default("0.0.0"),
    should_show_app_upgrade_message: C.boolean().default(!1)
  }));
});

export {loadBridgeConfig as Hxo,getRemoteControlVersionWarning as zYn,$Nl,vSm,jYn};
