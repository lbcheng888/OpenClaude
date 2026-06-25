// @ts-nocheck
import {ft,b,x} from "../../runtime.ts";
import {uuidSlugFromUrl as mae,iee,ARTIFACT_TOOL_NAME as uW,parseArtifactUrl as gMt,TITLE_SCAN_BYTES as nKr,extractHtmlTitle as jkn,ArtifactInputError as x$e} from "../artifact/2713_uuidSlugFromUrl.ts";
import {Qr} from "../../vendor/m323.ts";
import {lt,getSessionId as It} from "../session/0132_sent.ts";
import {pH,isRunningInRemoteEnvironment as hG} from "../api/5227_isRunningInRemoteEnvironment.ts";
import {Is,bn} from "../../vendor/m2565.ts";
import {Pl,Yn} from "../../vendor/m2465.ts";
import {Sc,getOauthConfig as Hs} from "../api/0465_getOauthConfig.ts";
import {xho,getFrameShareStatus as Iho} from "../artifact/4167_readArtifactContent.ts";
import {c5e,isShareAwarePublishEnabled as U4t,MAX_ARTIFACT_BYTES as OY,isFrameBaseVersionEnabled as aqn,publishArtifact as kho} from "../artifact/4166_publishArtifact.ts";
import {jQa,zQa} from "../../vendor/m4313.ts";
import {XQa,ayo,cyo,lyo,uyo,I5n,JQa,YQa} from "../../vendor/m4314.ts";
import {je} from "../../vendor/m2462.ts";
import {mn,Pt,He} from "../telemetry/0600_feature_name.ts";
import {ri,Ks} from "./2235_userFacingName.ts";
import {Jg,Zl} from "../../vendor/m2044.ts";
import {vd,Ws} from "../session/1465_promise.ts";
import {xl,Mr} from "../../vendor/m4427.ts";
import {qe,logForDebugging as A} from "../config/0236_setHasFormattedOutput.ts";
import {rI,xK} from "../config/0586_rI.ts";
import {AR,Ne} from "../../vendor/m583.ts";
import {dn} from "../config/0137_namespace.ts";
import {Ct,In} from "../../vendor/m197.ts";
import {Tu,hs} from "../../vendor/m649.ts";
import {Xm,checkReadPermissionForTool as hY} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {_a,getMaterializedSessionFile as px,getTranscriptPathForSession as SH,appendEntryToFileAsync as x5n} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Op,isTeammate as um} from "../agent/1464_waitForTeammatesToBecomeIdle.ts";
import {fae,isArtifactToolEnabled as _ke} from "../artifact/2715_isPublishToolEnabled.ts";
import {oe} from "../../vendor/m2275.ts";
import {B9n} from "../../vendor/m3990.ts";
import {ve} from "../../vendor/m461.ts";
import {C} from "../../vendor/m321.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Link as Ss} from "../../vendor/m2437.ts";
import {Za} from "../../vendor/m127.ts";
var tZa = {};
ft(tZa, {
  ArtifactTool: () => ArtifactTool
});
/**
 * Build the MCP (Model Context Protocol) frame payload from a gated tool input,
 * if the optional MCP frame integration (`Qye`) is wired in. Returns undefined
 * when MCP framing is unavailable.
 */
function pyo(input: any): any {
  return Qye ? Qye.mcpFromGatedInput(input) : void 0;
}
/**
 * Produce a short human-readable summary of the MCP connectors that would be
 * attached to a published artifact for the given input. Empty string when MCP
 * framing is unavailable.
 */
function dyo(input: any): string {
  return Qye ? Qye.frameMcpSummary(pyo(input)) : "";
}
/**
 * Resolve the cached title for a previously-published frame entry, but only when
 * it is safe to reuse it: when a target `url` is supplied, the cached entry's URL
 * must canonicalize to the same artifact as `url`. Returns undefined otherwise.
 */
function eZa(frameEntry: any, targetUrl: string | undefined): string | undefined {
  if (frameEntry?.title === void 0) return;
  if (targetUrl === void 0) return frameEntry.title;
  let canonicalTargetUrl = mae(targetUrl);
  return canonicalTargetUrl !== null && mae(frameEntry.url) === canonicalTargetUrl ? frameEntry.title : void 0;
}
var $5e: typeof import("fs/promises"),
  hmt: typeof import("path"),
  Xye: any,
  Qye: any = null,
  QQa: string,
  ZQa: () => any,
  Z9p: () => any,
  ArtifactTool: any;
var nZa = b(() => {
  Qr();
  lt();
  pH();
  Is();
  Pl();
  Sc();
  xho();
  c5e();
  jQa();
  XQa();
  je();
  mn();
  ri();
  Jg();
  vd();
  xl();
  qe();
  rI();
  AR();
  dn();
  Ct();
  Tu();
  Xm();
  _a();
  Op();
  iee();
  fae();
  $5e = require("fs/promises"), hmt = require("path"), Xye = x(oe(), 1);
  QQa = `Render an HTML or Markdown file to an Artifact — a default-private web page hosted on claude.ai that the user can later choose to share with their teammates. Use this when communicating visually would be clearer than terminal text.

**Before writing the page, you MUST load the \`${B9n}\` skill** to calibrate how much design investment this particular request warrants. Then write the content to a file (via Write/Edit) and call Artifact with its path. The file is wrapped in a \`<!doctype html>…<head>…</head><body>\` skeleton at publish time, so write the page content directly — no \`<!DOCTYPE>\`, \`<html>\`, \`<head>\`, or \`<body>\` tags of your own. The file includes a minimal CSS reset. Unless the user names a location, put the file in your scratchpad directory if one is listed in your system prompt.

**Title**: Set a concise \`<title>\` in the HTML — it names the artifact in the browser tab and gallery. Keep it stable across redeploys.

**To update**: Edit the file, then call Artifact again with the same file path — it redeploys to the same URL. A different file path claims a new URL so only use a different path if you intend to create a separate new Artifact.

**To update an artifact the user gives you a URL for** (an artifact link not published in this session): pass the URL as \`url\`. Without it, a fresh session always mints a new URL — there is no other way to target an existing one.

**To read an existing artifact's content**: call WebFetch with its URL.

**Self-contained only**: A strict CSP blocks requests to any external host — CDN scripts, external stylesheets, fonts, remote images, fetch/XHR/WebSockets. Inline all CSS/JS and embed assets as data: URIs.

**Responsive**: Use relative units, flexbox/grid, \`max-width:100%\` on images. Wide content (tables, diagrams, code blocks) must scroll inside its own \`overflow-x: auto\` container — the page body must never scroll horizontally.

**Favicon** (required): Pass one or two emoji as \`favicon\` (e.g. \`"📊"\`, \`"🐛"\`, \`"⚡🔥"\`). It becomes the browser-tab icon. Emoji only — no SVG, no markup. Keep it the **same** across redeploys of an artifact — users find their tab by its icon, and a changed favicon reads as a different page. Only pick a new emoji on a hard pivot in what the artifact is about (new investigation, new deliverable), not for incremental updates.`, ZQa = ve(() => C.strictObject({
    file_path: C.string().describe("Path to an .html or .md file to render. Use a short, distinctive basename — it is the fallback title if the HTML has no <title>."),
    favicon: C.string().min(1).max(32).describe('Browser-tab icon: one or two emoji (e.g. "📊"). No markup. Keep stable across redeploys; change only on a hard topic pivot.'),
    label: C.string().max(60).optional().describe('Short human-readable name for this version (e.g. "fixed-background"). Shown in the version picker instead of the raw version id.'),
    url: C.string().optional().describe("Existing artifact URL to redeploy to. Pass when the user gives you a URL for an artifact not published in this session; omit for new artifacts or same-session redeploys. Must be an artifact the user owns."),
    force: C.boolean().optional().describe("Overwrite without a conflict check. Use only after a 409 when you have reconciled with the other session's version and intend to replace it. Omit (or false) to send baseVersion so a concurrent write 409s instead of being silently clobbered."),
    ...(Qye && Qye.isFrameMcpEnabled() && {
      mcp: Qye.frameMcpInputSchema()
    })
  })), Z9p = ve(() => C.object({
    url: C.string(),
    path: C.string(),
    title: C.string().optional(),
    version: C.string().optional(),
    mcpDropped: C.string().optional()
  }));
  ArtifactTool = Ks({
    name: uW,
    searchHint: "render an HTML or Markdown file to a claude.ai web page",
    briefStandalone: !0,
    shouldDefer: !1,
    maxResultSizeChars: 1000,
    preserveToolUseResultInSubagents: !0,
    userFacingName() {
      return "Artifact";
    },
    get inputSchema() {
      return ZQa();
    },
    get outputSchema() {
      return Z9p();
    },
    isEnabled() {
      return _ke();
    },
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    ruleContentField: "file_path",
    getPath({
      file_path: filePath
    }) {
      return hs(filePath);
    },
    /**
     * Decide whether publishing this artifact needs an explicit "ask" prompt.
     * Same-session redeploys to an already-published, non-shared artifact are
     * auto-allowed; everything else (new URLs, shared-live targets, MCP grants)
     * surfaces a confirmation describing where the page goes.
     */
    async checkPermissions(input, context) {
      let permissionContext = Mr(context),
        ruleDecision = hY(ArtifactTool, input, permissionContext);
      if (ruleDecision.behavior === "deny") return ruleDecision;
      let isAskByRule = ruleDecision.behavior === "ask",
        resolvedPath = hs(input.file_path),
        cachedFrame = context.getAppState().frameUrls[resolvedPath],
        targetUrl = input.url ?? cachedFrame?.url,
        artifactRef = targetUrl ? gMt(targetUrl) : null,
        shareStatusFeatureOn = U4t(),
        shareStatus = shareStatusFeatureOn && artifactRef ? ayo(artifactRef.slug) : void 0;
      if (shareStatusFeatureOn && !artifactRef) cyo(resolvedPath);
      if (shareStatusFeatureOn && artifactRef) {
        if (lyo(resolvedPath, artifactRef.slug), !(!!context.toolUseId && shareStatus?.lastProbeToolUseId === context.toolUseId)) {
          let probeResult = await Iho(artifactRef, context.abortController.signal);
          if (probeResult.err === null) {
            let probedShareStatus = uyo(probeResult.mode, probeResult.shared);
            if (probedShareStatus.mode === "unknown") Pt("artifact_share_status", "unknown_share_mode");else He("artifact_share_status");
            I5n(artifactRef.slug, {
              ...probedShareStatus,
              lastProbeToolUseId: context.toolUseId
            });
          } else A(`[artifact] share-status probe failed: ${probeResult.err}`), I5n(artifactRef.slug, {
            mode: shareStatus?.mode ?? "owner",
            isSharedLive: shareStatus?.isSharedLive ?? !1,
            lastProbeToolUseId: context.toolUseId,
            probeFailed: !0
          });
          shareStatus = ayo(artifactRef.slug);
        }
      }
      let isSharedOrUnconfirmed = shareStatus?.isSharedLive === !0 || shareStatus?.probeFailed;
      if (!isAskByRule && input.url === void 0 && pyo(input) === void 0 && cachedFrame !== void 0 && artifactRef !== null && !isSharedOrUnconfirmed) return {
        behavior: "allow",
        updatedInput: input,
        decisionReason: {
          type: "other",
          reason: "Redeploy of an artifact already published this session"
        }
      };
      let htmlTitle: string | null = null;
      if (!isAskByRule && hmt.extname(resolvedPath).toLowerCase() !== ".md") try {
        let fileHandle = await $5e.open(resolvedPath, "r");
        try {
          let headBuffer = Buffer.alloc(nKr),
            {
              bytesRead: bytesRead
            } = await fileHandle.read(headBuffer, 0, headBuffer.length, 0);
          htmlTitle = jkn(headBuffer.toString("utf8", 0, bytesRead));
        } finally {
          await fileHandle.close();
        }
      } catch {}
      let displayTitle = htmlTitle ?? eZa(cachedFrame, input.url),
        mcpSummary = dyo(input),
        mcpClause = mcpSummary ? `, granting the page access to your connectors${mcpSummary}` : "",
        destinationDescription = shareStatus?.probeFailed ? "a page on claude.ai (share status could not be confirmed)" : shareStatus?.isSharedLive ? `a page shared with ${JQa(shareStatus.mode)} on claude.ai (viewers see updates immediately)` : shareStatus !== void 0 && shareStatus.mode !== "owner" ? "a page on claude.ai (viewers see a pinned earlier version)" : "a private page on claude.ai";
      return {
        behavior: "ask",
        message: displayTitle !== void 0 && displayTitle !== null ? `Claude wants to publish "${displayTitle}" (${input.file_path}) to ${destinationDescription}${mcpClause}` : `Claude wants to publish ${input.file_path} to ${destinationDescription}${mcpClause}`,
        ...(ruleDecision.behavior === "ask" && {
          suggestions: ruleDecision.suggestions,
          blockedPath: ruleDecision.blockedPath
        }),
        decisionReason: {
          type: "other",
          reason: isSharedOrUnconfirmed ? "Publishing to a shared-live artifact requires confirmation" : "Publishing a file to the web requires confirmation"
        },
        ...(ruleDecision.behavior === "ask" && ruleDecision.decisionReason?.type === "rule" && {
          decisionReason: ruleDecision.decisionReason
        })
      };
    },
    /**
     * Flatten the input into a single string for the auto-permission classifier:
     * the file path, an arrow to the target URL, the MCP connector summary, and a
     * trailing share-live annotation when the target is a shared/unconfirmed page.
     */
    toAutoClassifierInput(input) {
      let {
          file_path: filePath,
          url: targetUrl
        } = input,
        parts = [filePath];
      if (targetUrl) parts.push(`→ ${targetUrl}`);
      let classifierText;
      try {
        classifierText = parts.join(" ") + dyo(input);
      } catch {
        return "";
      }
      if (!U4t()) return classifierText;
      classifierText = classifierText.replace(/[[\]]/g, " ");
      try {
        let shareStatus = typeof filePath === "string" ? YQa(hs(filePath)) : void 0;
        if (shareStatus?.isSharedLive || shareStatus?.probeFailed) classifierText += ` [shared-live: ${shareStatus.probeFailed ? "unknown" : shareStatus.mode}]`;
      } catch {}
      return classifierText;
    },
    async description() {
      return "Render an HTML or Markdown file to an Artifact — a default-private claude.ai web page the user can share with teammates.";
    },
    async prompt({
      tools: tools
    }) {
      return Qye && "mcp" in ZQa().shape ? `${QQa}

${Qye.buildFrameMcpPrompt(tools)}` : QQa;
    },
    /**
     * Validate the artifact input before publishing: file extension must be
     * html/htm/md, favicon must contain no markup, any supplied `url` must be a
     * well-formed artifact URL targeting the current environment, and the file
     * (when the rule permits reading it) must exist and be under the size cap.
     */
    async validateInput(input, context) {
      let {
          file_path: filePath,
          favicon: favicon,
          url: targetUrl
        } = input,
        extension = hmt.extname(filePath).toLowerCase();
      if (extension !== ".html" && extension !== ".htm" && extension !== ".md") return {
        result: !1,
        message: `unsupported file type: ${extension || "(none)"} — use .html or .md`,
        errorCode: 1
      };
      if (favicon.includes("<")) return {
        result: !1,
        message: "favicon must be one or two emoji — no markup",
        errorCode: 6
      };
      if (targetUrl !== void 0) {
        let artifactRef = gMt(targetUrl);
        if (artifactRef === null) return {
          result: !1,
          message: `not an artifact URL: ${targetUrl}`,
          errorCode: 4
        };
        let sessionEnv = Hs().CLAUDE_AI_ORIGIN.includes("staging") ? "staging" : "prod";
        if (artifactRef.env !== sessionEnv) return {
          result: !1,
          message: `that artifact URL is for ${artifactRef.env}, but this session targets ${sessionEnv} claude.ai — republish it here to mint a ${sessionEnv} URL, or switch environments`,
          errorCode: 5
        };
      }
      if (hY(ArtifactTool, input, Mr(context)).behavior === "allow") {
        let resolvedPath = hs(filePath);
        if (!resolvedPath.startsWith("\\\\") && !resolvedPath.startsWith("//")) try {
          let stats = await $5e.stat(resolvedPath);
          if (stats.size > OY) return {
            result: !1,
            message: `too large: ${Math.ceil(stats.size / 1024 / 1024)}MB (max ${OY / 1024 / 1024}MB)`,
            errorCode: 3
          };
        } catch (statError) {
          if (In(statError)) return {
            result: !1,
            message: `File not found: ${resolvedPath}. Create the file first (Write tool, or via shell if Write is unavailable), then retry with the same path.`,
            errorCode: 2
          };
        }
      }
      return {
        result: !0
      };
    },
    /**
     * When the model passes the wrong shape (inline `content`/`title`, or an
     * over-long `label`), return a corrective hint steering it back to the
     * file-based interface; otherwise null.
     */
    validationErrorSteer(rawInput) {
      if (typeof rawInput !== "object" || rawInput === null) return null;
      if ("content" in rawInput || "title" in rawInput) return "The Artifact tool reads from a file on disk — it does not take inline `content` or `title`. " + "Write the page to an .html or .md file first (Write/Edit), then call Artifact with `file_path` pointing at it. Set the title via an HTML `<title>` tag in the file.";
      if ("label" in rawInput && typeof rawInput.label === "string" && rawInput.label.length > 60) return "`label` is a short version name (max 60 chars). Move longer text into the page content.";
      return null;
    },
    mapToolResultToToolResultBlockParam(result, toolUseId) {
      let mcpDroppedWarning = result.mcpDropped ? `

⚠ The mcp manifest was rejected by the server and the page was published without it (the page's connector bridge will be unavailable). Server said: ${result.mcpDropped}` : "";
      return {
        tool_use_id: toolUseId,
        type: "tool_result",
        content: `Published ${result.path} at ${result.url}${mcpDroppedWarning}`
      };
    },
    renderToolUseMessage(input) {
      let {
          file_path: filePath,
          url: targetUrl
        } = input,
        mcpSummary = dyo(input);
      return Xye.jsxs(v, {
        children: [filePath, targetUrl && Xye.jsxs(v, {
          dimColor: !0,
          children: [" → ", targetUrl]
        }), mcpSummary && Xye.jsx(v, {
          dimColor: !0,
          children: mcpSummary
        })]
      });
    },
    renderToolResultMessage(result) {
      return Xye.jsx(Yn, {
        children: Xye.jsx(v, {
          dimColor: !0,
          children: Xye.jsxs(bn, {
            children: ["published", Xye.jsx(Ss, {
              url: result.url,
              children: result.url
            })]
          })
        })
      });
    },
    /**
     * Publish the file to claude.ai as an Artifact: read and (for markdown)
     * transform it, enforce the size cap and stale-version guard, resolve the
     * title, POST it to the publish endpoint, then update frame-URL app state,
     * record the read version, optionally auto-open the page, and append a
     * frame-link history entry. Returns the published URL/path/title.
     */
    async call(input, context) {
      let {
          file_path: filePath,
          favicon: favicon,
          label: label,
          url: targetUrl
        } = input,
        mcpPayload = pyo(input),
        resolvedPath = hs(filePath),
        isMarkdown = hmt.extname(resolvedPath).toLowerCase() === ".md",
        stats;
      try {
        stats = await $5e.stat(resolvedPath);
      } catch (statError) {
        if (In(statError)) throw new x$e(`File not found: ${resolvedPath}. Create the file first (Write tool, or via shell if Write is unavailable), then retry with the same path.`, "file_not_found");
        throw statError;
      }
      if (stats.size > OY) throw new x$e(`too large: ${Math.ceil(stats.size / 1024 / 1024)}MB (max ${OY / 1024 / 1024}MB)`, "too_large_raw");
      let fileContent = await $5e.readFile(resolvedPath, "utf8"),
        renderedContent = isMarkdown ? zQa(fileContent) : fileContent;
      context.readFileState.set(resolvedPath, {
        content: fileContent,
        timestamp: Math.floor(stats.mtimeMs),
        offset: void 0,
        limit: void 0
      });
      let appState = context.getAppState(),
        cachedFrame = appState.frameUrls[resolvedPath],
        effectiveUrl = targetUrl ?? cachedFrame?.url,
        canonicalUrl = effectiveUrl ? mae(effectiveUrl) : null,
        versionGuardOn = aqn(),
        force = "force" in input && input.force === !0,
        baseVersion = versionGuardOn && !force && canonicalUrl !== null ? appState.artifactReadVersions?.[canonicalUrl] : void 0;
      if (versionGuardOn && canonicalUrl !== null && baseVersion === void 0 && !force) throw new x$e("This session hasn't viewed the latest version of the artifact. WebFetch the URL first, or pass force:true to overwrite.", "stale_version_guard");
      let resolvedTitle = (isMarkdown ? null : jkn(fileContent)) ?? eZa(cachedFrame, targetUrl) ?? hmt.parse(resolvedPath).name,
        publishResult = await kho(renderedContent, {
          ...(canonicalUrl && {
            slug: canonicalUrl
          }),
          title: resolvedTitle,
          favicon: favicon,
          label: label,
          ...(mcpPayload && {
            mcp: mcpPayload
          }),
          ...(baseVersion && {
            baseVersion: baseVersion
          })
        });
      if (publishResult.err !== null) {
        if (versionGuardOn && publishResult.liveVersion && canonicalUrl !== null && !publishResult.conflict) context.setArtifactReadVersion(canonicalUrl, publishResult.liveVersion);
        throw new x$e(publishResult.err, publishResult.conflict ? "publish_conflict" : "publish_rejected");
      }
      if (U4t() && publishResult.read !== void 0) lyo(resolvedPath, publishResult.slug), I5n(publishResult.slug, uyo(publishResult.read, publishResult.shared));
      if (canonicalUrl === null && context.agentId === void 0 && !context.options.isNonInteractiveSession && !Ws() && !um() && !hG() && !xK() && !Za(Ne.CLAUDE_CODE_ARTIFACT_AUTO_OPEN)) Zl(publishResult.url);
      if (context.setAppState(prevState => {
        let {
          [resolvedPath]: _removed,
          ...remainingFrameUrls
        } = prevState.frameUrls;
        if (canonicalUrl !== null) {
          for (let [path, frame] of Object.entries(remainingFrameUrls)) if (mae(frame.url) === canonicalUrl) delete remainingFrameUrls[path], cyo(path);
        }
        return {
          ...prevState,
          frameUrls: {
            ...remainingFrameUrls,
            [resolvedPath]: {
              url: publishResult.url,
              updatedAt: Date.now(),
              title: resolvedTitle,
              favicon: favicon
            }
          }
        };
      }), versionGuardOn) context.setArtifactReadVersion(publishResult.slug, publishResult.version);
      let sessionId = It(),
        historyLogPath = px() ?? SH(sessionId);
      return x5n(historyLogPath, {
        type: "frame-link",
        sessionId: sessionId,
        path: resolvedPath,
        frameUrl: publishResult.url,
        timestamp: new Date().toISOString()
      }).catch(() => {}), {
        data: {
          url: publishResult.url,
          path: resolvedPath,
          title: resolvedTitle,
          ...(versionGuardOn && {
            version: publishResult.version
          }),
          ...(publishResult.mcpDropped !== void 0 && {
            mcpDropped: publishResult.mcpDropped
          })
        }
      };
    }
  });
});

export {tZa,pyo,dyo,eZa,$5e,hmt,Xye,Qye,QQa,ZQa,Z9p,ArtifactTool,nZa};
