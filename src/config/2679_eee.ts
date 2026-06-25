// @ts-nocheck
import {Mh as GY,mI as WG} from "./2029_mI.ts";
import {b as L} from "../../runtime.ts";
// Module: WebFetch tool description strings and lazy initializer.
// Subsystem: config — settings/config loading and CLAUDE.md handling.

/** The registered tool name for the WebFetch tool. */
var QJ = "WebFetch";

/**
 * Returns the tool description string for the WebFetch tool.
 *
 * @param model - The current model identifier, used to select simple vs. full prompt style.
 * @param isArtifactToolEnabled - Whether the Artifact tool is active; when true, adds a note
 *   that claude.ai artifact URLs are fetchable via WebFetch.
 */
function wR7(model: string, isArtifactToolEnabled: boolean = !1): string {
  if (GY(model)) return `Fetches a URL, converts the page to markdown, and answers \`prompt\` against it using a small fast model.

- Fails on authenticated/private URLs — use an authenticated MCP tool or \`gh\` for those instead.${isArtifactToolEnabled ? " Exception: claude.ai/code/artifact/{uuid} URLs ARE fetchable via your claude.ai login — use WebFetch, not curl (curl gets the SPA shell or a Cloudflare 403)." : ""}
- HTTP is upgraded to HTTPS. Cross-host redirects are returned to you rather than followed; call again with the redirect URL.
- Responses are cached for 15 minutes per URL.`;
  return `IMPORTANT: WebFetch WILL FAIL for authenticated or private URLs. Before using this tool, check if the URL points to an authenticated service (e.g. Google Docs, Confluence, Jira, GitHub). If so, look for a specialized MCP tool that provides authenticated access.
${isArtifactToolEnabled ? `- Exception: claude.ai/code/artifact/{uuid} URLs (including preview.claude.ai) ARE fetchable — WebFetch uses your claude.ai login. Use WebFetch for these, not curl or a headless browser (those return the SPA shell or a Cloudflare 403, not the content).
` : ""}${DO3}`;
}

/**
 * Builds the user-facing prompt sent to the small fast model when processing fetched web content.
 *
 * @param pageMarkdown - The fetched page content converted to markdown.
 * @param userPrompt - The user's question/instruction to apply to the page content.
 * @param allowFullQuoting - When true (e.g. open-source URLs), uses a permissive response
 *   instruction; when false, enforces strict copyright/quoting constraints.
 */
function fR7(pageMarkdown: string, userPrompt: string, allowFullQuoting: boolean): string {
  return `
Web page content:
---
${pageMarkdown}
---

${userPrompt}

${allowFullQuoting ? "Provide a concise response based on the content above. Include relevant details, code examples, and documentation excerpts as needed." : `Provide a concise response based only on the content above. In your response:
 - Enforce a strict 125-character maximum for quotes from any source document. Open Source Software is ok as long as we respect the license.
 - Use quotation marks for exact language from articles; any language outside of the quotation should never be word-for-word the same.
 - You are not a lawyer and never comment on the legality of your own prompts and responses.
 - Never produce or reproduce exact song lyrics.`}
`;
}

/**
 * Full-form WebFetch tool description body (used when the model is not in simple-prompt mode).
 * Describes usage notes, caching behaviour, redirect handling, and restrictions.
 */
var DO3 = `
- Fetches content from a specified URL and processes it using an AI model
- Takes a URL and a prompt as input
- Fetches the URL content, converts HTML to markdown
- Processes the content with the prompt using a small, fast model
- Returns the model's response about the content
- Use this tool when you need to retrieve and analyze web content

Usage notes:
  - IMPORTANT: If an MCP-provided web fetch tool is available, prefer using that tool instead of this one, as it may have fewer restrictions.
  - The URL must be a fully-formed valid URL
  - HTTP URLs will be automatically upgraded to HTTPS
  - The prompt should describe what information you want to extract from the page
  - This tool is read-only and does not modify any files
  - Results may be summarized if the content is very large
  - Includes a self-cleaning 15-minute cache for faster responses when repeatedly accessing the same URL
  - When a URL redirects to a different host, the tool will inform you and provide the redirect URL in a special format. You should then make a new WebFetch request with the redirect URL to fetch the content.
  - For GitHub URLs, prefer using the gh CLI via Bash instead (e.g., gh pr view, gh issue view, gh api).
`;

/** Lazy module initializer; ensures the WG dependency bundle is loaded before this module is used. */
var Ae = L(() => {
  WG();
});
export {QJ as nb,wR7 as l$i,fR7 as c$i,DO3 as Sxd,Ae as eee};
