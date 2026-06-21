// @ts-nocheck
import {qTe,lgt} from "../../vendor/m35.ts";
import {b} from "../../runtime.ts";
// Returns the user-agent string "claude-code/<version>"
function tg() {
  return `claude-code/${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION}`;
}
// Maps the CLAUDE_CODE_ENTRYPOINT env var to a canonical client platform string
function getClientPlatform() {
  switch (process.env.CLAUDE_CODE_ENTRYPOINT) {
    case "claude-vscode":
      return "claude_code_vscode";
    case "remote":
    case "remote_baku":
    case "remote_cowork":
    case "remote_desktop":
    case "remote_mobile":
      return "claude_code_remote";
    case "claude-in-teams":
      return "claude_code_remote";
    case "sdk-cli":
    case "sdk-ts":
    case "sdk-py":
      return "claude_code_sdk";
    case "mcp":
      return "claude_code_mcp";
    case "claude-code-github-action":
      return "claude_code_github_action";
    case "local-agent":
      return "claude_code_local_agent";
    case "claude_in_slack":
      return "claude_in_slack";
    case "claude-in-slack":
      return "claude-in-slack";
    case "cli":
    default:
      return "claude_code_cli";
  }
}
// Builds an AI_AGENT identifier: "claude-code_<version-with-dashes>_<agentSuffix>"
function Mer(agentSuffix: string) {
  return `claude-code_${{
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://code.claude.com/docs/en/overview",
    VERSION: "2.1.185",
    FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
    BUILD_TIME: "2026-06-20T06:38:30Z",
    GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
  }.VERSION.replace(/\./g, "-")}_${agentSuffix}`;
}
// Sets AI_AGENT env var to the harness identifier if not already set by another claude-code agent
function j7t() {
  if (!process.env.AI_AGENT || process.env.AI_AGENT.startsWith("claude-code_") || process.env.AI_AGENT.startsWith("claude-code/")) process.env.AI_AGENT = Mer("harness");
}
// Returns empty string; parameter defaults to BUILD_REF_NAME from build metadata (always undefined in prod builds)
function u2(buildRefName: any = {
  ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
  PACKAGE_URL: "@anthropic-ai/claude-code",
  README_URL: "https://code.claude.com/docs/en/overview",
  VERSION: "2.1.185",
  FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
  BUILD_TIME: "2026-06-20T06:38:30Z",
  GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
}.BUILD_REF_NAME) {
  return "";
}
// Cache constructor: wraps a qTe Map-like backing store with a size counter
function $pc() {
  this.__data__ = new qTe(), this.size = 0;
}
var bFo: any;
// Lazy initializer: runs lgt() setup then assigns $pc constructor to bFo
var EFo = b(() => {
  lgt();
  bFo = $pc;
});
export {tg,getClientPlatform,Mer,j7t,u2,$pc,bFo,EFo};
