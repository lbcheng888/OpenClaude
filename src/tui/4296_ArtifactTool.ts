// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../../runtime.ts";
import {uuidSlugFromUrl,XAe,ARTIFACT_TOOL_NAME,parseArtifactUrl,TITLE_SCAN_BYTES,extractHtmlTitle,ArtifactInputError} from "../artifact/2701_uuidSlugFromUrl.ts";
import {Xr} from "../../vendor/m321.ts";
import {Vk,isRunningInRemoteEnvironment} from "../api/5193_isRunningInRemoteEnvironment.ts";
import {zs,Tn} from "../../vendor/m2554.ts";
import {sc,Gn} from "../../vendor/m2455.ts";
import {Dc,getOauthConfig} from "../api/0459_getOauthConfig.ts";
import {juo,getFrameShareStatus} from "../artifact/4154_readArtifactContent.ts";
import {qqe,isFrameBaseVersionEnabled,isShareAwarePublishEnabled,MAX_ARTIFACT_BYTES,publishArtifact} from "../artifact/4153_publishArtifact.ts";
import {E7a,b7a} from "../../vendor/m4293.ts";
import {w7a,cmo,dmo,umo,pmo,_4n,v7a,C7a} from "../../vendor/m4294.ts";
import {ze} from "../../vendor/m2452.ts";
import {ln,isTmuxControlMode,Ie} from "../telemetry/0594_feature_name.ts";
import {Ri,pi} from "../tools/2227_userFacingName.ts";
import {b_,Oc} from "../../vendor/m2039.ts";
import {hp,_i} from "../session/1460_promise.ts";
import {Ql,Fr} from "../../vendor/m4405.ts";
import {qe,logForDebugging} from "../config/0234_setHasFormattedOutput.ts";
import {xH,aoe} from "../config/0580_xH.ts";
import {tk,je} from "../../vendor/m577.ts";
import {sn} from "../config/0047_namespace.ts";
import {bt,Pn} from "../../vendor/m195.ts";
import {Iu,Ds} from "../../vendor/m643.ts";
import {nA,checkReadPermissionForTool} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {Am,isTeammate} from "../agent/1459_waitForTeammatesToBecomeIdle.ts";
import {gae,isArtifactToolEnabled} from "../artifact/2703_isPublishToolEnabled.ts";
import {Te} from "../../vendor/m2253.ts";
import {aUn} from "../../vendor/m3923.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {Text} from "../../vendor/m2423.ts";
import {Link} from "../../vendor/m2427.ts";
import {_l} from "../../vendor/m5.ts";
var I7a = {};
isFullscreenWithTTY(I7a, {
  ArtifactTool: () => ArtifactTool
});
function fmo(e: any) {
  return x_e ? x_e.mcpFromGatedInput(e) : void 0;
}
function mmo(e: any) {
  return x_e ? x_e.frameMcpSummary(fmo(e)) : "";
}
function k7a(e: any, t: any) {
  if (e?.title === void 0) return;
  if (t === void 0) return e.title;
  let n = uuidSlugFromUrl(t);
  return n !== null && uuidSlugFromUrl(e.url) === n ? e.title : void 0;
}
var Adt: any,
  fdt: any,
  m0e: any,
  x_e: any = null,
  R7a: any,
  x7a: any,
  RMp: any,
  ArtifactTool: any;
var D7a = b(() => {
  Xr();
  Vk();
  zs();
  sc();
  Dc();
  juo();
  qqe();
  E7a();
  w7a();
  ze();
  ln();
  Ri();
  b_();
  hp();
  Ql();
  qe();
  xH();
  tk();
  sn();
  bt();
  Iu();
  nA();
  Am();
  XAe();
  gae();
  Adt = require("fs/promises"), fdt = require("path"), m0e = M(Te(), 1);
  R7a = `Render an HTML or Markdown file to an Artifact \u2014 a default-private web page hosted on claude.ai that the user can later choose to share with their teammates. Use this when communicating visually would be clearer than terminal text.

Write the content to a file first (via Write/Edit), then call Artifact with its path. The file is wrapped in a \`<!doctype html>\u2026<head>\u2026</head><body>\` skeleton at publish time, so write the page content directly \u2014 no \`<!DOCTYPE>\`, \`<html>\`, \`<head>\`, or \`<body>\` tags of your own. The file includes a minimal CSS reset. Unless the user names a location, put the file in your scratchpad directory if one is listed in your system prompt.

**Design guidance**: Before writing the page, load the \`${aUn}\` skill and apply it.

**Title**: Set a concise \`<title>\` in the HTML \u2014 it names the artifact in the browser tab and gallery. Keep it stable across redeploys.

**To update**: Edit the file, then call Artifact again with the same file path \u2014 it redeploys to the same URL. A different file path claims a new URL so only use a different path if you intend to create a separate new Artifact.

**To update an artifact the user gives you a URL for** (an artifact link not published in this session): pass the URL as \`url\`. Without it, a fresh session always mints a new URL \u2014 there is no other way to target an existing one.

**To read an existing artifact's content**: call WebFetch with its URL.

**Self-contained only**: A strict CSP blocks requests to any external host \u2014 CDN scripts, external stylesheets, fonts, remote images, fetch/XHR/WebSockets. Inline all CSS/JS and embed assets as data: URIs.

**Responsive**: Use relative units, flexbox/grid, \`max-width:100%\` on images. Wide content (tables, diagrams, code blocks) must scroll inside its own \`overflow-x: auto\` container \u2014 the page body must never scroll horizontally.

**Favicon** (required): Pass one or two emoji as \`favicon\` (e.g. \`"\uD83D\uDCCA"\`, \`"\uD83D\uDC1B"\`, \`"\u26A1\uD83D\uDD25"\`). It becomes the browser-tab icon. Emoji only \u2014 no SVG, no markup. Keep it the **same** across redeploys of an artifact \u2014 users find their tab by its icon, and a changed favicon reads as a different page. Only pick a new emoji on a hard pivot in what the artifact is about (new investigation, new deliverable), not for incremental updates.`, x7a = we(() => E.strictObject({
    file_path: E.string().describe("Path to an .html or .md file to render. Use a short, distinctive basename \u2014 it is the fallback title if the HTML has no <title>."),
    favicon: E.string().min(1).max(32).describe('Browser-tab icon: one or two emoji (e.g. "\uD83D\uDCCA"). No markup. Keep stable across redeploys; change only on a hard topic pivot.'),
    label: E.string().max(60).optional().describe('Short human-readable name for this version (e.g. "fixed-background"). Shown in the version picker instead of the raw version id.'),
    url: E.string().optional().describe("Existing artifact URL to redeploy to. Pass when the user gives you a URL for an artifact not published in this session; omit for new artifacts or same-session redeploys. Must be an artifact the user owns."),
    ...(isFrameBaseVersionEnabled() && {
      force: E.boolean().optional().describe("Overwrite without a conflict check. Use only after a 409 when you have reconciled with the other session's version and intend to replace it. Omit (or false) to send baseVersion so a concurrent write 409s instead of being silently clobbered.")
    }),
    ...(x_e && x_e.isFrameMcpEnabled() && {
      mcp: x_e.frameMcpInputSchema()
    })
  })), RMp = we(() => E.object({
    url: E.string(),
    path: E.string(),
    title: E.string().optional(),
    version: E.string().optional(),
    mcpDropped: E.string().optional()
  }));
  ArtifactTool = pi({
    name: ARTIFACT_TOOL_NAME,
    searchHint: "render an HTML or Markdown file to a claude.ai web page",
    briefStandalone: !0,
    shouldDefer: !1,
    maxResultSizeChars: 1000,
    userFacingName() {
      return "Artifact";
    },
    get inputSchema() {
      return x7a();
    },
    get outputSchema() {
      return RMp();
    },
    isEnabled() {
      return isArtifactToolEnabled();
    },
    isConcurrencySafe() {
      return !1;
    },
    isReadOnly() {
      return !1;
    },
    ruleContentField: "file_path",
    getPath({
      file_path: e
    }: any) {
      return Ds(e);
    },
    async checkPermissions(e: any, t: any) {
      let n = Fr(t),
        r = checkReadPermissionForTool(ArtifactTool, e, n);
      if (r.behavior === "deny") return r;
      let o = r.behavior === "ask",
        s = Ds(e.file_path),
        i = t.getAppState().frameUrls[s],
        a = e.url ?? i?.url,
        l = a ? parseArtifactUrl(a) : null,
        c = isShareAwarePublishEnabled(),
        u = c && l ? cmo(l.slug) : void 0;
      if (c && !l) dmo(s);
      if (c && l) {
        if (umo(s, l.slug), !(!!t.toolUseId && u?.lastProbeToolUseId === t.toolUseId)) {
          let _ = await getFrameShareStatus(l, t.abortController.signal);
          if (_.err === null) {
            let y = pmo(_.mode, _.shared);
            if (y.mode === "unknown") isTmuxControlMode("artifact_share_status", "unknown_share_mode");else Ie("artifact_share_status");
            _4n(l.slug, {
              ...y,
              lastProbeToolUseId: t.toolUseId
            });
          } else logForDebugging(`[artifact] share-status probe failed: ${_.err}`), _4n(l.slug, {
            mode: u?.mode ?? "owner",
            isSharedLive: u?.isSharedLive ?? !1,
            lastProbeToolUseId: t.toolUseId,
            probeFailed: !0
          });
          u = cmo(l.slug);
        }
      }
      let d = u?.isSharedLive === !0 || u?.probeFailed;
      if (!o && e.url === void 0 && fmo(e) === void 0 && i !== void 0 && l !== null && !d) return {
        behavior: "allow",
        updatedInput: e,
        decisionReason: {
          type: "other",
          reason: "Redeploy of an artifact already published this session"
        }
      };
      let p = null;
      if (!o && fdt.extname(s).toLowerCase() !== ".md") try {
        let g = await Adt.open(s, "r");
        try {
          let _ = Buffer.alloc(TITLE_SCAN_BYTES),
            {
              bytesRead: y
            } = await g.read(_, 0, _.length, 0);
          p = extractHtmlTitle(_.toString("utf8", 0, y));
        } finally {
          await g.close();
        }
      } catch {}
      let m = p ?? k7a(i, e.url),
        f = mmo(e),
        A = f ? `, granting the page access to your connectors${f}` : "",
        h = u?.probeFailed ? "a page on claude.ai (share status could not be confirmed)" : u?.isSharedLive ? `a page shared with ${v7a(u.mode)} on claude.ai (viewers see updates immediately)` : u !== void 0 && u.mode !== "owner" ? "a page on claude.ai (viewers see a pinned earlier version)" : "a private page on claude.ai";
      return {
        behavior: "ask",
        message: m !== void 0 && m !== null ? `Claude wants to publish "${m}" (${e.file_path}) to ${h}${A}` : `Claude wants to publish ${e.file_path} to ${h}${A}`,
        ...(r.behavior === "ask" && {
          suggestions: r.suggestions,
          blockedPath: r.blockedPath
        }),
        decisionReason: {
          type: "other",
          reason: d ? "Publishing to a shared-live artifact requires confirmation" : "Publishing a file to the web requires confirmation"
        },
        ...(r.behavior === "ask" && r.decisionReason?.type === "rule" && {
          decisionReason: r.decisionReason
        })
      };
    },
    toAutoClassifierInput(e: any) {
      let {
          file_path: t,
          url: n
        } = e,
        r = [t];
      if (n) r.push(`\u2192 ${n}`);
      let o;
      try {
        o = r.join(" ") + mmo(e);
      } catch {
        return "";
      }
      if (!isShareAwarePublishEnabled()) return o;
      o = o.replace(/[[\]]/g, " ");
      try {
        let s = typeof t === "string" ? C7a(Ds(t)) : void 0;
        if (s?.isSharedLive || s?.probeFailed) o += ` [shared-live: ${s.probeFailed ? "unknown" : s.mode}]`;
      } catch {}
      return o;
    },
    async description() {
      return "Render an HTML or Markdown file to an Artifact \u2014 a default-private claude.ai web page the user can share with teammates.";
    },
    async prompt({
      tools: e
    }: any) {
      return x_e && "mcp" in x7a().shape ? `${R7a}

${x_e.buildFrameMcpPrompt(e)}` : R7a;
    },
    async validateInput({
      file_path: e,
      favicon: t,
      url: n
    }: any) {
      let r = fdt.extname(e).toLowerCase();
      if (r !== ".html" && r !== ".htm" && r !== ".md") return {
        result: !1,
        message: `unsupported file type: ${r || "(none)"} \u2014 use .html or .md`,
        errorCode: 1
      };
      if (t.includes("<")) return {
        result: !1,
        message: "favicon must be one or two emoji \u2014 no markup",
        errorCode: 1
      };
      if (n !== void 0) {
        let o = parseArtifactUrl(n);
        if (o === null) return {
          result: !1,
          message: `not an artifact URL: ${n}`,
          errorCode: 1
        };
        let s = getOauthConfig().CLAUDE_AI_ORIGIN.includes("staging") ? "staging" : "prod";
        if (o.env !== s) return {
          result: !1,
          message: `that artifact URL is for ${o.env}, but this session targets ${s} claude.ai \u2014 republish it here to mint a ${s} URL, or switch environments`,
          errorCode: 1
        };
      }
      return {
        result: !0
      };
    },
    mapToolResultToToolResultBlockParam(e: any, t: any) {
      let n = e.mcpDropped ? `

\u26A0 The mcp manifest was rejected by the server and the page was published without it (the page's connector bridge will be unavailable). Server said: ${e.mcpDropped}` : "";
      return {
        tool_use_id: t,
        type: "tool_result",
        content: `Published ${e.path} at ${e.url}${n}`
      };
    },
    renderToolUseMessage(e: any) {
      let {
          file_path: t,
          url: n
        } = e,
        r = mmo(e);
      return m0e.default.createElement(Text, null, t, n && m0e.default.createElement(Text, {
        dimColor: !0
      }, " \u2192 ", n), r && m0e.default.createElement(Text, {
        dimColor: !0
      }, r));
    },
    renderToolResultMessage(e: any) {
      return m0e.default.createElement(Gn, null, m0e.default.createElement(Text, {
        dimColor: !0
      }, m0e.default.createElement(Tn, null, "published", m0e.default.createElement(Link, {
        url: e.url
      }, e.url))));
    },
    async call(e: any, t: any) {
      let {
          file_path: n,
          favicon: r,
          label: o,
          url: s
        } = e,
        i = fmo(e),
        a = Ds(n),
        c = fdt.extname(a).toLowerCase() === ".md",
        u;
      try {
        u = await Adt.stat(a);
      } catch (v: any) {
        if (Pn(v)) throw new ArtifactInputError(`file not found: ${a}`);
        throw v;
      }
      if (u.size > MAX_ARTIFACT_BYTES) throw new ArtifactInputError(`too large: ${Math.ceil(u.size / 1024 / 1024)}MB (max ${MAX_ARTIFACT_BYTES / 1024 / 1024}MB)`);
      let d = await Adt.readFile(a, "utf8"),
        p = c ? b7a(d) : d;
      t.readFileState.set(a, {
        content: d,
        timestamp: Math.floor(u.mtimeMs),
        offset: void 0,
        limit: void 0
      });
      let m = t.getAppState(),
        f = m.frameUrls[a],
        A = s ?? f?.url,
        h = A ? uuidSlugFromUrl(A) : null,
        g = isFrameBaseVersionEnabled(),
        _ = "force" in e && e.force === !0,
        y = g && !_ && h !== null ? m.artifactReadVersions?.[h] : void 0;
      if (g && h !== null && y === void 0 && !_) throw new ArtifactInputError("This session hasn't viewed the latest version of the artifact. WebFetch the URL first, or pass force:true to overwrite.");
      let T = (c ? null : extractHtmlTitle(d)) ?? k7a(f, s) ?? fdt.parse(a).name,
        S = await publishArtifact(p, {
          ...(h && {
            slug: h
          }),
          title: T,
          favicon: r,
          label: o,
          ...(i && {
            mcp: i
          }),
          ...(y && {
            baseVersion: y
          })
        });
      if (S.err !== null) {
        if (g && S.liveVersion && h !== null && !S.conflict) t.setArtifactReadVersion(h, S.liveVersion);
        throw new ArtifactInputError(S.err);
      }
      if (isShareAwarePublishEnabled() && S.read !== void 0) umo(a, S.slug), _4n(S.slug, pmo(S.read, S.shared));
      if (h === null && t.agentId === void 0 && !t.options.isNonInteractiveSession && !_i() && !isTeammate() && !isRunningInRemoteEnvironment() && !aoe() && !_l(je.CLAUDE_CODE_ARTIFACT_AUTO_OPEN)) Oc(S.url);
      if (t.setAppState((v: any) => {
        let {
          [a]: R,
          ...k
        } = v.frameUrls;
        if (h !== null) {
          for (let [x, H] of Object.entries(k)) if (uuidSlugFromUrl(H.url) === h) delete k[x], dmo(x);
        }
        return {
          ...v,
          frameUrls: {
            ...k,
            [a]: {
              url: S.url,
              updatedAt: Date.now(),
              title: T,
              favicon: r
            }
          }
        };
      }), g) t.setArtifactReadVersion(S.slug, S.version);
      return {
        data: {
          url: S.url,
          path: a,
          title: T,
          ...(g && {
            version: S.version
          }),
          ...(S.mcpDropped !== void 0 && {
            mcpDropped: S.mcpDropped
          })
        }
      };
    }
  });
});
export {I7a,fmo,mmo,k7a,Adt,fdt,m0e,x_e,R7a,x7a,RMp,ArtifactTool,D7a};
