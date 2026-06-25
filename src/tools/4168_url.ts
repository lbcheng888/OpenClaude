// @ts-nocheck
import {nb as ZS,eee as zZ,l$i as _Li} from "../config/2679_eee.ts";
import {iee as OAe,_Mt as hPt} from "../artifact/2713_uuidSlugFromUrl.ts";
import {fae as LAe,Jkn as Cvn} from "../artifact/2715_isPublishToolEnabled.ts";
import {rl as vl,ri as Ri,Ks as ai} from "./2235_userFacingName.ts";
import {b} from "../../runtime.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {kt as Ct,logEvent as j} from "../../vendor/m132.ts";
import {Bu as sd,isPolicyAllowed as ii} from "../../vendor/m2213.ts";
import {xl as Xl,Mr as Lr} from "../../vendor/m4427.ts";
import {Xo as ds,formatFileSize as nl} from "../../vendor/m240.ts";
import {ly as ay,getRuleByContentsForTool as DY} from "./5218_toolAlwaysAllowedRule.ts";
import {lr as fr,Yx as MD} from "../../vendor/m233.ts";
import {Jmo as slo,_4n as P2n,_4t as M$t,N5a as i2a} from "../../vendor/m4106.ts";
import {$5a as u2a,Xmo as ilo,F5a as a2a,B5a as l2a,U5a as c2a} from "../../vendor/m4107.ts";
import {who as Lco,isPreapprovedUrl as T$n,WebFetchTransportError as r9t,MAX_MARKDOWN_LENGTH as Qct,applyPromptToMarkdown as b$n,convertHtmlToMarkdown as y$n,getURLMarkdownContent as S$n} from "../api/4165_validateURL.ts";
import {v1t as COt} from "../telemetry/2792_eventName.ts";
import {ve as Re} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {xho as Fco,RVa as J3a} from "../artifact/4167_readArtifactContent.ts";
import {QNt as YLt,uia as GXi} from "../agent/3174_persistBinaryContent.ts";
import {c5e as Sqe,CVa as z3a} from "../artifact/4166_publishArtifact.ts";
import {Le as Ue} from "../../vendor/m5.ts";
// @ts-nocheck
function getStatusText(statusCode) {
  return TbK.STATUS_CODES[statusCode] ?? "Unknown Status";
}
function formatHttpError(httpError) {
  let statusText = getStatusText(httpError.statusCode),
    retryAfterLine = httpError.retryAfter ? `
Retry-After: ${httpError.retryAfter}` : "";
  return `The server returned HTTP ${httpError.statusCode} ${statusText}.${retryAfterLine}

The response body was not retrieved. If this URL requires authentication, use an authenticated tool (e.g. \`gh\` for GitHub, or an MCP-provided fetch tool) instead of WebFetch.`;
}
function extractPermissionKey(rawInput) {
  try {
    let parsed = WebFetchTool_2.inputSchema.safeParse(rawInput);
    if (!parsed.success) return `input:${rawInput.toString()}`;
    let {
      url: parsedUrl
    } = parsed.data;
    return `domain:${new URL(parsedUrl).hostname}`;
  } catch {
    return `input:${rawInput.toString()}`;
  }
}
function buildAllowRuleSuggestions(ruleContent) {
  return [{
    type: "addRules",
    destination: "localSettings",
    rules: [{
      toolName: ZS,
      ruleContent: ruleContent
    }],
    behavior: "allow"
  }];
}
async function resolveArtifactUrl(url, toolUseContext) {
  {
    let [{
      ARTIFACT_TOOL_NAME: artifactToolName,
      parseArtifactUrl: parseArtifactUrl
    }, {
      isArtifactToolEnabled: isArtifactToolEnabled
    }] = await Promise.all([Promise.resolve().then(() => (OAe(), hPt)), Promise.resolve().then(() => (LAe(), Cvn))]);
    if (vl(toolUseContext.options.tools ?? [], artifactToolName) && isArtifactToolEnabled()) return parseArtifactUrl(url);
  }
  return null;
}
var TbK, MXO, XXO, WebFetchTool, WebFetchTool_2;
var i9t = b(() => {
  Xr();
  Ct();
  sd();
  Ri();
  Xl();
  ds();
  ay();
  fr();
  zZ();
  slo();
  u2a();
  Lco();
  TbK = require("http");
  MXO = COt - 2000;
  XXO = Re(() => E.strictObject({
    url: E.string().url().describe("The URL to fetch content from"),
    prompt: E.string().describe("The prompt to run on the fetched content")
  })), WebFetchTool = Re(() => E.object({
    bytes: E.number().describe("Size of the fetched content in bytes"),
    code: E.number().describe("HTTP response code"),
    codeText: E.string().describe("HTTP response code text"),
    result: E.string().describe("Processed result from applying the prompt to the content"),
    durationMs: E.number().describe("Time taken to fetch and process the content"),
    url: E.string().describe("The URL that was fetched"),
    artifactRead: E.object({
      slug: E.string(),
      ver: E.string()
    }).optional()
  }));
  WebFetchTool_2 = ai({
    name: ZS,
    ruleContentField: "url",
    searchHint: "fetch and extract content from a URL",
    maxResultSizeChars: 1e5,
    shouldDefer: true,
    async description(e) {
      let {
        url: t
      } = e;
      try {
        return `Claude wants to fetch content from ${new URL(t).hostname}`;
      } catch {
        return "Claude wants to fetch content from this URL";
      }
    },
    userFacingName() {
      return "Fetch";
    },
    getToolUseSummary: ilo,
    getActivityDescription(e) {
      let t = ilo(e);
      return t ? `Fetching ${t}` : "Fetching web page";
    },
    get inputSchema() {
      return XXO();
    },
    get outputSchema() {
      return WebFetchTool();
    },
    isEnabled() {
      return ii("allow_web_fetch");
    },
    isConcurrencySafe() {
      return true;
    },
    isReadOnly() {
      return true;
    },
    toAutoClassifierInput(e) {
      return e.prompt ? `${e.url}: ${e.prompt}` : e.url;
    },
    async checkPermissions(e, t) {
      let n = Lr(t),
        r = extractPermissionKey(e),
        o = P2n(DY(n, WebFetchTool_2, "deny"), r);
      if (o) return {
        behavior: "deny",
        message: `${WebFetchTool_2.name} denied access to ${r}.`,
        decisionReason: {
          type: "rule",
          rule: o
        }
      };
      let s = P2n(DY(n, WebFetchTool_2, "ask"), r);
      if (s) return {
        behavior: "ask",
        message: `Claude requested permissions to use ${WebFetchTool_2.name}, but you haven't granted it yet.`,
        decisionReason: {
          type: "rule",
          rule: s
        },
        suggestions: buildAllowRuleSuggestions(r)
      };
      let i = P2n(DY(n, WebFetchTool_2, "allow"), r);
      if (i) return {
        behavior: "allow",
        updatedInput: e,
        decisionReason: {
          type: "rule",
          rule: i
        }
      };
      if (T$n(e.url)) return {
        behavior: "allow",
        updatedInput: e,
        decisionReason: {
          type: "other",
          reason: "Preapproved host"
        }
      };
      return {
        behavior: "ask",
        message: `Claude requested permissions to use ${WebFetchTool_2.name}, but you haven't granted it yet.`,
        suggestions: buildAllowRuleSuggestions(r)
      };
    },
    renderToolUseMessage: a2a,
    renderToolUseProgressMessage: l2a,
    renderToolResultMessage: c2a,
    async validateInput(e) {
      let {
        url: t
      } = e;
      try {
        new URL(t);
      } catch {
        return {
          result: false,
          message: `Error: Invalid URL "${t}". The URL provided could not be parsed.`,
          meta: {
            reason: "invalid_url"
          },
          errorCode: 1
        };
      }
      return {
        result: true
      };
    },
    async prompt({
      model: e,
      tools: t
    }) {
      let n = false;
      {
        let [{
          ARTIFACT_TOOL_NAME: r
        }, {
          isArtifactToolEnabled: o
        }] = await Promise.all([Promise.resolve().then(() => (OAe(), hPt)), Promise.resolve().then(() => (LAe(), Cvn))]);
        n = !!vl(t ?? [], r) && o();
      }
      return _Li(e, n);
    },
    async call(e, t, n, r) {
      let {
          url: o,
          prompt: s
        } = e,
        {
          abortController: i,
          options: {
            isNonInteractiveSession: a
          }
        } = t,
        l = Date.now();
      {
        let T = o;
        try {
          let C = new URL(o);
          if (C.protocol === "http:") C.protocol = "https:";
          T = C.href;
        } catch {}
        let S = await resolveArtifactUrl(T, t);
        if (S) {
          let {
              readArtifactContent: C
            } = await Promise.resolve().then(() => (Fco(), J3a)),
            R = await C(S, i.signal);
          if (R.err !== null) {
            if (R.status === undefined) throw new r9t(`Artifact ${S.slug}: ${R.err}`);
            return {
              data: {
                bytes: 0,
                code: R.status,
                codeText: getStatusText(R.status),
                result: `Artifact ${S.slug}: ${R.err}`,
                durationMs: Date.now() - l,
                url: o
              }
            };
          }
          let k;
          if (R.role === "owner") {
            let H = MD(R.title, 200),
              P = `[Artifact ${S.slug}${H ? ` "${H}"` : ""} \u2014 owned by you`,
              O,
              D;
            if (R.html.length > MXO) {
              let {
                  persistBinaryContent: M
                } = await Promise.resolve().then(() => (YLt(), GXi)),
                U = F => F.replace(/[^\w-]/g, ""),
                $ = await M(Buffer.from(R.html), "text/html", `artifact-${U(S.slug).slice(0, 8)}-${U(R.ver)}`);
              if ("error" in $) O = `${nl(R.bytes)} total \u2014 saving the full HTML to disk failed; raw HTML (may be truncated) follows`, D = MD(R.html, Qct);else {
                O = `${nl(R.bytes)} total \u2014 full HTML saved to ${$.filepath}; head follows`;
                let F = P.length + O.length + 4;
                D = MD(R.html, Math.max(0, COt - F));
              }
            } else O = "raw HTML follows", D = R.html;
            k = `${P}; ${O}]
${D}`;
          } else k = await b$n(s, await y$n(R.html), i.signal, a, false, t.agentContext);
          let x;
          if (R.role === "owner") {
            let {
              isFrameBaseVersionEnabled: H
            } = await Promise.resolve().then(() => (Sqe(), z3a));
            if (H()) t.setArtifactReadVersion(S.slug, R.ver), x = {
              slug: S.slug,
              ver: R.ver
            };
          }
          return {
            data: {
              bytes: R.bytes,
              code: 200,
              codeText: "OK",
              result: k,
              durationMs: Date.now() - l,
              url: o,
              ...(x && {
                artifactRead: x
              })
            }
          };
        }
      }
      let c = await S$n(o, i);
      if ("type" in c && c.type === "provenance_denied") {
        if (!n || !r) throw M$t(c.errorMessage);
        let T = c.url;
        c = await i2a({
          denial: c,
          prompt: s,
          tool: WebFetchTool_2,
          context: t,
          canUseTool: n,
          parentMessage: r,
          suggestions: buildAllowRuleSuggestions(extractPermissionKey({
            url: T,
            prompt: s
          })),
          refetch: S => S$n(S, i),
          onOutcome: S => {
            j("tengu_web_fetch_provenance_prompt", {
              outcome: Ue(S)
            });
          }
        });
      }
      if ("type" in c && c.type === "http_error") {
        j("tengu_web_fetch_http_error", {
          statusCode: c.statusCode
        });
        let T = formatHttpError(c);
        return {
          data: {
            bytes: 0,
            code: c.statusCode,
            codeText: getStatusText(c.statusCode),
            result: T,
            durationMs: Date.now() - l,
            url: o
          }
        };
      }
      if ("type" in c && c.type === "redirect") {
        let T = getStatusText(c.statusCode),
          S = `REDIRECT DETECTED: The URL redirects to a different host.

Original URL: ${c.originalUrl}
Redirect URL: ${c.redirectUrl}
Status: ${c.statusCode} ${T}

To complete your request, I need to fetch content from the redirected URL. Please use WebFetch again with these parameters:
- url: "${c.redirectUrl}"
- prompt: "${s}"`;
        return {
          data: {
            bytes: Buffer.byteLength(S),
            code: c.statusCode,
            codeText: T,
            result: S,
            durationMs: Date.now() - l,
            url: o
          }
        };
      }
      let {
          content: u,
          bytes: d,
          code: p,
          codeText: m,
          contentType: f,
          persistedPath: A,
          persistedSize: h
        } = c,
        g = T$n(o),
        _;
      if (g && f.includes("text/markdown") && u.length < Qct) _ = u;else _ = await b$n(s, u, i.signal, a, g, t.agentContext);
      if (A) _ += `

[Binary content (${f}, ${nl(h ?? d)}) also saved to ${A}]`;
      return {
        data: {
          bytes: d,
          code: p,
          codeText: m,
          result: _,
          durationMs: Date.now() - l,
          url: o
        }
      };
    },
    mapToolResultToToolResultBlockParam({
      result: e
    }, t) {
      return {
        tool_use_id: t,
        type: "tool_result",
        content: e
      };
    }
  });
});
export {getStatusText as lqn,formatHttpError as CNp,extractPermissionKey as wVa,buildAllowRuleSuggestions as Dho,resolveArtifactUrl as vNp,TbK as kVa,MXO as ENp,XXO as ANp,WebFetchTool as RNp,WebFetchTool_2 as BB,i9t as $4t};
