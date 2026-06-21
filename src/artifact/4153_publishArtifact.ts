// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,zn} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {k2,xH} from "../config/0580_xH.ts";
import {je,tk} from "../../vendor/m577.ts";
import {Oe,isTmuxControlMode,Ie,ln} from "../telemetry/0594_feature_name.ts";
import {si,gT} from "../../vendor/m2190.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {externalHttp,ek} from "../core/0570_isCancel.ts";
import {J0n,ole} from "../telemetry/3324_reason.ts";
import {sleep} from "../telemetry/1483_withTimeout.ts";
import {getOauthConfig,Dc} from "../api/0459_getOauthConfig.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
/** Module namespace object for publishArtifact module */
var fqa = {};
isFullscreenWithTTY(fqa, {
  publishArtifact: () => publishArtifact,
  makeSetArtifactReadVersion: () => makeSetArtifactReadVersion,
  isShareAwarePublishEnabled: () => isShareAwarePublishEnabled,
  isFrameBaseVersionEnabled: () => isFrameBaseVersionEnabled,
  artifactViewerUrl: () => artifactViewerUrl,
  MAX_ARTIFACT_BYTES: () => MAX_ARTIFACT_BYTES
});

/** Returns true if the frame-base-version feature flag is enabled */
function isFrameBaseVersionEnabled() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_cobalt_plinth_fern", !1);
}

/** Returns true if share-aware publish feature flag is enabled */
function isShareAwarePublishEnabled() {
  return getFeatureValue_CACHED_MAY_BE_STALE("tengu_saffron_anchor", !1);
}

/** Creates a state updater that sets the read version for a given artifact slug */
function makeSetArtifactReadVersion(setState: any) {
  return (slugKey: any, version: any) => setState((prevState: any) => ({
    ...prevState,
    artifactReadVersions: {
      ...prevState.artifactReadVersions,
      [slugKey]: version
    }
  }));
}

/** Picks only the metadata fields (slug, title, favicon, label) from artifact options */
function cqa(artifactOptions: any) {
  return {
    ...(artifactOptions.slug && {
      slug: artifactOptions.slug
    }),
    title: artifactOptions.title,
    favicon: artifactOptions.favicon,
    ...(artifactOptions.label && {
      label: artifactOptions.label
    })
  };
}

/** Returns the entrypoint object (lowercased, max 64 chars) if one is configured */
function uqa() {
  let entrypoint = k2();
  return entrypoint ? {
    entrypoint: entrypoint.toLowerCase().slice(0, 64)
  } : {};
}

/** Returns a session_id object if a valid remote session ID env var is set */
function dqa() {
  let sessionId = je.CLAUDE_CODE_REMOTE_SESSION_ID;
  return sessionId && eIp.test(sessionId) ? {
    session_id: sessionId
  } : {};
}

/**
 * Publishes an artifact (HTML content) to the frame hosting service.
 * Handles both direct-upload and init+PUT+complete flows, with MCP retry logic and conflict detection.
 */
async function publishArtifact(htmlContent: any, options: any) {
  let {
      slug: slugVal,
      title: titleVal,
      favicon: faviconVal,
      label: labelVal,
      mcp: mcpVal
    } = options,
    useBaseVersion = isFrameBaseVersionEnabled(),
    baseVersion = useBaseVersion ? options.baseVersion : void 0,
    metaFields = {
      slug: slugVal,
      title: titleVal,
      favicon: faviconVal,
      label: labelVal
    },
    wrappedHtml = `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1">${ZHp}</head><body>
${htmlContent}
</body></html>`,
    byteSize = Buffer.byteLength(wrappedHtml, "utf8");
  if (byteSize > MAX_ARTIFACT_BYTES) return Oe("artifact_publish", "too_large"), D9(`too large: rendered page is ${Math.ceil(byteSize / 1024 / 1024)}MB (max ${MAX_ARTIFACT_BYTES / 1024 / 1024}MB)`);
  let entrypointVal = je.CLAUDE_CODE_ENTRYPOINT ?? "";
  if (QHp.has(entrypointVal) || je.CLAUDE_CODE_ARTIFACT_DIRECT_UPLOAD || getFeatureValue_CACHED_MAY_BE_STALE("tengu_cobalt_plinth_direct", !1)) return lqa(wrappedHtml, metaFields, mcpVal, void 0, baseVersion);
  try {
    let initRequest = (includeMcp: any) => si.post("/api/frame/deploy/init", {
        ...cqa(metaFields),
        ...uqa(),
        ...dqa(),
        ...(includeMcp && mcpVal && {
          mcp: mcpVal
        }),
        ...(baseVersion && {
          baseVersion: baseVersion
        })
      }, {
        host: "frame",
        auth: "required",
        refreshOAuth: !0,
        headers: {
          "X-Frame-CP": "go"
        },
        timeout: 15000,
        validateStatus: () => !0
      }),
      initResponse = await initRequest(!0);
    if (!initResponse.ok) return Oe("artifact_publish", initResponse.reason), D9(initResponse.reason === "no-auth" ? `not authenticated — run /login (${initResponse.detail})` : `publish unavailable: ${initResponse.reason}`);
    let mcpDropReason: any;
    if (initResponse.status === 400 && mcpVal) {
      if (mcpDropReason = wut(initResponse.data) || "(400, no body)", logForDebugging(`[artifact] init 400 with mcp, retrying without: ${mcpDropReason}`), initResponse = await initRequest(!1), !initResponse.ok) return Oe("artifact_publish", initResponse.reason), D9(`publish unavailable: ${initResponse.reason}`);
    }
    if (useBaseVersion && initResponse.status === 409) {
      let conflictLive = mqa(initResponse.data);
      if (conflictLive) return Oe("artifact_publish", "conflict"), {
        ...D9(pqa),
        liveVersion: conflictLive,
        conflict: !0
      };
    }
    if (initResponse.status < 200 || initResponse.status >= 300) return Oe("artifact_publish", "init_failed"), D9(`init ${initResponse.status}: ${wut(initResponse.data)}`);
    let {
      slug: slugResult,
      version: versionResult,
      putURL: putUrlResult,
      putHeaders: putHeadersResult,
      read: readResult,
      shared: sharedResult
    } = initResponse.data ?? {};
    if (!slugResult || !versionResult || !putUrlResult) return Oe("artifact_publish", "init_incomplete"), D9("init returned incomplete response");
    let uploadErr = await rIp(putUrlResult, wrappedHtml, MAX_ARTIFACT_BYTES, putHeadersResult);
    if (uploadErr) {
      if (await aqa(slugResult, versionResult, !1), uploadErr.status === 403) {
        let fallbackResult = await lqa(wrappedHtml, {
          ...metaFields,
          slug: slugResult
        }, mcpDropReason ? void 0 : mcpVal, mcpDropReason, baseVersion ? versionResult : void 0);
        if (fallbackResult.err === null) return isTmuxControlMode("artifact_publish", "upload_blocked_fallback"), fallbackResult;
        return useBaseVersion ? {
          ...fallbackResult,
          liveVersion: fallbackResult.liveVersion ?? versionResult
        } : fallbackResult;
      }
      return Oe("artifact_publish", uploadErr.precondition ? "upload_precondition" : "upload_failed"), useBaseVersion ? {
        ...D9(uploadErr.err),
        liveVersion: versionResult
      } : D9(uploadErr.err);
    }
    if (await aqa(slugResult, versionResult, !0), mcpDropReason !== void 0) isTmuxControlMode("artifact_publish", "mcp_rejected");
    return Ie("artifact_publish"), {
      url: artifactViewerUrl(slugResult),
      slug: slugResult,
      version: versionResult,
      err: null,
      ...(readResult !== void 0 && {
        read: readResult
      }),
      ...(sharedResult !== void 0 && {
        shared: sharedResult
      }),
      ...(mcpDropReason !== void 0 && {
        mcpDropped: mcpDropReason
      })
    };
  } catch (caughtErr) {
    return Oe("artifact_publish", "request_error"), D9(caughtErr instanceof Error ? caughtErr.message : String(caughtErr));
  }
}

/** Adds a PUT URL to the LRU cache of recently-seen URLs (max tIp entries) */
function nIp(putUrl: any) {
  if (vut.delete(putUrl), vut.add(putUrl), vut.size > tIp) {
    let oldest = vut.values().next().value;
    if (oldest !== void 0) vut.delete(oldest);
  }
}

/**
 * Uploads HTML content to the given PUT URL (GCS signed URL).
 * Returns null on success, or an error object on failure.
 */
async function rIp(putUrl: any, htmlContent: any, maxBytes: any, customHeaders: any) {
  let headers = customHeaders && Object.keys(customHeaders).length > 0 ? customHeaders : {
      "Content-Type": "text/html; charset=utf-8",
      "x-goog-content-length-range": `0,${maxBytes}`,
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    alreadySeen = vut.has(putUrl),
    uploadResult: any;
  try {
    uploadResult = await externalHttp.put(putUrl, htmlContent, {
      headers: headers,
      validateStatus: () => !0,
      timeout: 30000,
      maxBodyLength: maxBytes + 4096
    });
  } catch (uploadError) {
    return {
      status: 0,
      err: `upload failed: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}`,
      precondition: !1
    };
  }
  if (nIp(putUrl), uploadResult.status === 412) {
    if (alreadySeen) return null;
    return {
      status: 412,
      err: "upload 412: this version was already written (create-only precondition). Re-run publish to mint a fresh version.",
      precondition: !0
    };
  }
  if (uploadResult.status < 200 || uploadResult.status >= 300) return {
    status: uploadResult.status,
    err: `upload ${uploadResult.status}: ${wut(uploadResult.data)}`,
    precondition: !1
  };
  return null;
}

/** Notifies the frame service that a deploy is complete (or failed) */
async function aqa(slugVal: any, versionVal: any, successFlag: any) {
  try {
    let completeResponse = await si.post("/api/frame/deploy/complete", {
      slug: slugVal,
      version: versionVal,
      ok: successFlag
    }, {
      host: "frame",
      auth: "required",
      refreshOAuth: !0,
      headers: {
        "X-Frame-CP": "go"
      },
      timeout: 15000,
      validateStatus: () => !0
    });
    if (!completeResponse.ok) logForDebugging(`[artifact] deploy/complete skipped: ${completeResponse.reason}`);else if (completeResponse.status !== 204) logForDebugging(`[artifact] deploy/complete ${completeResponse.status}: ${wut(completeResponse.data)}`);
  } catch (completeErr) {
    logForDebugging(`[artifact] deploy/complete failed: ${completeErr instanceof Error ? completeErr.message : String(completeErr)}`);
  }
}

/**
 * Publishes an artifact using the direct deploy endpoint (single-request path).
 * Used for remote sessions, direct-upload flag, or feature-flag-enabled direct mode.
 */
async function lqa(htmlContent: any, metaFields: any, mcpVal: any, mcpDropReason: any, baseVersion: any) {
  try {
    let doRequest = async (includeMcp: any) => {
        let attemptRequest = () => si.post("/api/frame/deploy/direct", {
            ...cqa(metaFields),
            ...uqa(),
            ...dqa(),
            ...(includeMcp && mcpVal && {
              mcp: mcpVal
            }),
            ...(baseVersion && {
              baseVersion: baseVersion
            }),
            content: htmlContent
          }, {
            host: "frame",
            auth: "required",
            refreshOAuth: !0,
            headers: {
              "X-Frame-CP": "go"
            },
            timeout: 60000,
            validateStatus: () => !0,
            maxBodyLength: 2 * MAX_ARTIFACT_BYTES
          }),
          directResponse = await attemptRequest();
        if (directResponse.ok && directResponse.status === 429) {
          let retryAfterMs = J0n(directResponse.response?.headers?.["retry-after"]) ?? 2000;
          await sleep(Math.min(retryAfterMs, 30000)), directResponse = await attemptRequest();
        }
        return directResponse;
      },
      initResponse = await doRequest(!0);
    if (!initResponse.ok) return Oe("artifact_publish", initResponse.reason), D9(initResponse.reason === "no-auth" ? `not authenticated — run /login (${initResponse.detail})` : `publish unavailable: ${initResponse.reason}`);
    let droppedMcp = mcpDropReason;
    if (initResponse.status === 400 && mcpVal) {
      if (droppedMcp = wut(initResponse.data) || "(400, no body)", logForDebugging(`[artifact] deploy 400 with mcp, retrying without: ${droppedMcp}`), initResponse = await doRequest(!1), !initResponse.ok) return Oe("artifact_publish", initResponse.reason), D9(`publish unavailable: ${initResponse.reason}`);
    }
    if (baseVersion && initResponse.status === 409) {
      let conflictLive = mqa(initResponse.data);
      if (conflictLive) return Oe("artifact_publish", "conflict"), {
        ...D9(pqa),
        liveVersion: conflictLive,
        conflict: !0
      };
    }
    if (initResponse.status < 200 || initResponse.status >= 300) return Oe("artifact_publish", "deploy_failed"), D9(`deploy ${initResponse.status}: ${wut(initResponse.data)}`);
    let {
      slug: slugResult,
      version: versionResult,
      read: readResult,
      shared: sharedResult
    } = initResponse.data ?? {};
    if (!slugResult || !versionResult) return Oe("artifact_publish", "deploy_incomplete"), D9("deploy returned incomplete response");
    if (droppedMcp !== void 0) isTmuxControlMode("artifact_publish", "mcp_rejected");
    return Ie("artifact_publish"), {
      url: artifactViewerUrl(slugResult),
      slug: slugResult,
      version: versionResult,
      err: null,
      ...(readResult !== void 0 && {
        read: readResult
      }),
      ...(sharedResult !== void 0 && {
        shared: sharedResult
      }),
      ...(droppedMcp !== void 0 && {
        mcpDropped: droppedMcp
      })
    };
  } catch (caughtErr) {
    return Oe("artifact_publish", "request_error"), D9(caughtErr instanceof Error ? caughtErr.message : String(caughtErr));
  }
}

/** Constructs the viewer URL for a published artifact by slug */
function artifactViewerUrl(slugVal: any) {
  return new URL(`/code/artifact/${slugVal}`, getOauthConfig().CLAUDE_AI_ORIGIN).toString();
}

/** Returns a standard error result object with null url/slug/version */
function D9(errMsg: any) {
  return {
    url: null,
    slug: null,
    version: null,
    err: errMsg
  };
}

/** Extracts the live version string from a 409 conflict response body, or returns null */
function mqa(responseData: any) {
  if (responseData && typeof responseData === "object" && "conflict" in responseData && responseData.conflict === !0 && "live" in responseData && typeof responseData.live === "string") return responseData.live;
  return null;
}

/** Truncates a response body (string or object) to 200 chars for logging */
function wut(responseBody: any) {
  if (typeof responseBody === "string") return responseBody.slice(0, 200);
  if (responseBody && typeof responseBody === "object") return (Le(responseBody) ?? "").slice(0, 200);
  return "";
}
var MAX_ARTIFACT_BYTES = 16777216,
  QHp,
  ZHp = "<style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}</style>",
  eIp,
  vut,
  tIp = 64,
  pqa = "conflict: another session published a newer version of this artifact. Re-read the current content (WebFetch the URL), reconcile your edits, then publish again.";
var qqe = b(() => {
  ole();
  Dc();
  ln();
  zn();
  ek();
  gT();
  qe();
  xH();
  tk();
  Xt();
  QHp = new Set(["remote", "remote_cowork"]);
  eIp = /^(?:session_|cse_)[A-Za-z0-9_-]{1,184}$/;
  vut = new Set();
});
export {fqa,isFrameBaseVersionEnabled,isShareAwarePublishEnabled,makeSetArtifactReadVersion,cqa,uqa,dqa,publishArtifact,nIp,rIp,aqa,lqa,artifactViewerUrl,D9,mqa,wut,MAX_ARTIFACT_BYTES,QHp,ZHp,eIp,vut,tIp,pqa,qqe};
