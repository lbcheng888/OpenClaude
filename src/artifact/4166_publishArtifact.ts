// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as it,jn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {XU,xK,rI} from "../config/0586_rI.ts";
import {Ne,AR} from "../../vendor/m583.ts";
import {xe,Pt,He,mn} from "../telemetry/0600_feature_name.ts";
import {Vs,lT} from "../../vendor/m2195.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {externalHttp as $b,_k} from "../core/0576_isCancel.ts";
import {$On,rle} from "../telemetry/3340_reason.ts";
import {sleep as Kn} from "../telemetry/1488_withTimeout.ts";
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
/** Module namespace object for publishArtifact module */
var CVa = {};
ft(CVa, {
  publishArtifact: () => publishArtifact,
  makeSetArtifactReadVersion: () => makeSetArtifactReadVersion,
  isShareAwarePublishEnabled: () => isShareAwarePublishEnabled,
  isFrameBaseVersionEnabled: () => isFrameBaseVersionEnabled,
  goCpHeaders: () => goCpHeaders,
  artifactViewerUrl: () => artifactViewerUrl,
  MAX_ARTIFACT_BYTES: () => MAX_ARTIFACT_BYTES
});

/** Returns true if the frame-base-version feature flag is enabled */
function isFrameBaseVersionEnabled() {
  return it("tengu_cobalt_plinth_fern", !1);
}

/** Returns true if share-aware publish feature flag is enabled */
function isShareAwarePublishEnabled() {
  return it("tengu_saffron_anchor", !1);
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
function yVa(artifactOptions: any) {
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
function TVa() {
  let entrypoint = XU();
  return entrypoint ? {
    entrypoint: entrypoint.toLowerCase().slice(0, 64)
  } : {};
}

/** Returns a session_id object if a valid remote session ID env var is set */
function SVa() {
  let sessionId = Ne.CLAUDE_CODE_REMOTE_SESSION_ID;
  return sessionId && _Np.test(sessionId) ? {
    session_id: sessionId
  } : {};
}

/** Builds the standard X-Frame-* request headers for the frame deploy endpoints */
function goCpHeaders() {
  return {
    "X-Frame-CP": "go",
    "X-Frame-Surface": "code",
    "X-Frame-Platform": xK() ? "desktop" : "cli"
  };
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
    wrappedHtml = `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1">${gNp}</head><body>
${htmlContent}
</body></html>`,
    byteSize = Buffer.byteLength(wrappedHtml, "utf8");
  if (byteSize > MAX_ARTIFACT_BYTES) return xe("artifact_publish", "too_large"), Z$(`too large: rendered page is ${Math.ceil(byteSize / 1024 / 1024)}MB (max ${MAX_ARTIFACT_BYTES / 1024 / 1024}MB)`);
  let entrypointVal = Ne.CLAUDE_CODE_ENTRYPOINT ?? "";
  if (hNp.has(entrypointVal) || Ne.CLAUDE_CODE_ARTIFACT_DIRECT_UPLOAD || it("tengu_cobalt_plinth_direct", !1)) return _Va(wrappedHtml, metaFields, mcpVal, void 0, baseVersion);
  try {
    let initRequest = (includeMcp: any) => Vs.post("/api/frame/deploy/init", {
        ...yVa(metaFields),
        ...TVa(),
        ...SVa(),
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
        headers: goCpHeaders(),
        timeout: 15000,
        validateStatus: () => !0
      }),
      initResponse = await initRequest(!0);
    if (!initResponse.ok) return xe("artifact_publish", initResponse.reason), Z$(initResponse.reason === "no-auth" ? `not authenticated — run /login (${initResponse.detail})` : `publish unavailable: ${initResponse.reason}`);
    let mcpDropReason: any;
    if (initResponse.status === 400 && mcpVal) {
      if (mcpDropReason = Cpt(initResponse.data) || "(400, no body)", A(`[artifact] init 400 with mcp, retrying without: ${mcpDropReason}`), initResponse = await initRequest(!1), !initResponse.ok) return xe("artifact_publish", initResponse.reason), Z$(`publish unavailable: ${initResponse.reason}`);
    }
    if (useBaseVersion && initResponse.status === 409) {
      let conflictLive = EVa(initResponse.data);
      if (conflictLive) return xe("artifact_publish", "conflict"), {
        ...Z$(bVa),
        liveVersion: conflictLive,
        conflict: !0
      };
    }
    if (initResponse.status < 200 || initResponse.status >= 300) return xe("artifact_publish", "init_failed"), Z$(`init ${initResponse.status}: ${Cpt(initResponse.data)}`);
    let {
      slug: slugResult,
      version: versionResult,
      putURL: putUrlResult,
      putHeaders: putHeadersResult,
      read: readResult,
      shared: sharedResult
    } = initResponse.data ?? {};
    if (!slugResult || !versionResult || !putUrlResult) return xe("artifact_publish", "init_incomplete"), Z$("init returned incomplete response");
    let uploadErr = await SNp(putUrlResult, wrappedHtml, MAX_ARTIFACT_BYTES, putHeadersResult);
    if (uploadErr) {
      if (await gVa(slugResult, versionResult, !1), uploadErr.status === 403) {
        let fallbackResult = await _Va(wrappedHtml, {
          ...metaFields,
          slug: slugResult
        }, mcpDropReason ? void 0 : mcpVal, mcpDropReason, baseVersion ? versionResult : void 0);
        if (fallbackResult.err === null) return Pt("artifact_publish", "upload_blocked_fallback"), fallbackResult;
        return useBaseVersion ? {
          ...fallbackResult,
          liveVersion: fallbackResult.liveVersion ?? versionResult
        } : fallbackResult;
      }
      return xe("artifact_publish", uploadErr.precondition ? "upload_precondition" : "upload_failed"), useBaseVersion ? {
        ...Z$(uploadErr.err),
        liveVersion: versionResult
      } : Z$(uploadErr.err);
    }
    if (await gVa(slugResult, versionResult, !0), mcpDropReason !== void 0) Pt("artifact_publish", "mcp_rejected");
    return He("artifact_publish"), {
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
    return xe("artifact_publish", "request_error"), Z$(caughtErr instanceof Error ? caughtErr.message : String(caughtErr));
  }
}

/** Adds a PUT URL to the LRU cache of recently-seen URLs (max yNp entries) */
function TNp(putUrl: any) {
  if (Ept.delete(putUrl), Ept.add(putUrl), Ept.size > yNp) {
    let oldest = Ept.values().next().value;
    if (oldest !== void 0) Ept.delete(oldest);
  }
}

/**
 * Uploads HTML content to the given PUT URL (GCS signed URL).
 * Returns null on success, or an error object on failure.
 */
async function SNp(putUrl: any, htmlContent: any, maxBytes: any, customHeaders: any) {
  let headers = customHeaders && Object.keys(customHeaders).length > 0 ? customHeaders : {
      "Content-Type": "text/html; charset=utf-8",
      "x-goog-content-length-range": `0,${maxBytes}`,
      "Cache-Control": "public, max-age=31536000, immutable"
    },
    alreadySeen = Ept.has(putUrl),
    uploadResult: any;
  try {
    uploadResult = await $b.put(putUrl, htmlContent, {
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
  if (TNp(putUrl), uploadResult.status === 412) {
    if (alreadySeen) return null;
    return {
      status: 412,
      err: "upload 412: this version was already written (create-only precondition). Re-run publish to mint a fresh version.",
      precondition: !0
    };
  }
  if (uploadResult.status < 200 || uploadResult.status >= 300) return {
    status: uploadResult.status,
    err: `upload ${uploadResult.status}: ${Cpt(uploadResult.data)}`,
    precondition: !1
  };
  return null;
}

/** Notifies the frame service that a deploy is complete (or failed) */
async function gVa(slugVal: any, versionVal: any, successFlag: any) {
  try {
    let completeResponse = await Vs.post("/api/frame/deploy/complete", {
      slug: slugVal,
      version: versionVal,
      ok: successFlag
    }, {
      host: "frame",
      auth: "required",
      refreshOAuth: !0,
      headers: goCpHeaders(),
      timeout: 15000,
      validateStatus: () => !0
    });
    if (!completeResponse.ok) A(`[artifact] deploy/complete skipped: ${completeResponse.reason}`);else if (completeResponse.status !== 204) A(`[artifact] deploy/complete ${completeResponse.status}: ${Cpt(completeResponse.data)}`);
  } catch (completeErr) {
    A(`[artifact] deploy/complete failed: ${completeErr instanceof Error ? completeErr.message : String(completeErr)}`);
  }
}

/**
 * Publishes an artifact using the direct deploy endpoint (single-request path).
 * Used for remote sessions, direct-upload flag, or feature-flag-enabled direct mode.
 */
async function _Va(htmlContent: any, metaFields: any, mcpVal: any, mcpDropReason: any, baseVersion: any) {
  try {
    let doRequest = async (includeMcp: any) => {
        let attemptRequest = () => Vs.post("/api/frame/deploy/direct", {
            ...yVa(metaFields),
            ...TVa(),
            ...SVa(),
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
            headers: goCpHeaders(),
            timeout: 60000,
            validateStatus: () => !0,
            maxBodyLength: 2 * MAX_ARTIFACT_BYTES
          }),
          directResponse = await attemptRequest();
        if (directResponse.ok && directResponse.status === 429) {
          let retryAfterMs = $On(directResponse.response?.headers?.["retry-after"]) ?? 2000;
          await Kn(Math.min(retryAfterMs, 30000)), directResponse = await attemptRequest();
        }
        return directResponse;
      },
      initResponse = await doRequest(!0);
    if (!initResponse.ok) return xe("artifact_publish", initResponse.reason), Z$(initResponse.reason === "no-auth" ? `not authenticated — run /login (${initResponse.detail})` : `publish unavailable: ${initResponse.reason}`);
    let droppedMcp = mcpDropReason;
    if (initResponse.status === 400 && mcpVal) {
      if (droppedMcp = Cpt(initResponse.data) || "(400, no body)", A(`[artifact] deploy 400 with mcp, retrying without: ${droppedMcp}`), initResponse = await doRequest(!1), !initResponse.ok) return xe("artifact_publish", initResponse.reason), Z$(`publish unavailable: ${initResponse.reason}`);
    }
    if (baseVersion && initResponse.status === 409) {
      let conflictLive = EVa(initResponse.data);
      if (conflictLive) return xe("artifact_publish", "conflict"), {
        ...Z$(bVa),
        liveVersion: conflictLive,
        conflict: !0
      };
    }
    if (initResponse.status < 200 || initResponse.status >= 300) return xe("artifact_publish", "deploy_failed"), Z$(`deploy ${initResponse.status}: ${Cpt(initResponse.data)}`);
    let {
      slug: slugResult,
      version: versionResult,
      read: readResult,
      shared: sharedResult
    } = initResponse.data ?? {};
    if (!slugResult || !versionResult) return xe("artifact_publish", "deploy_incomplete"), Z$("deploy returned incomplete response");
    if (droppedMcp !== void 0) Pt("artifact_publish", "mcp_rejected");
    return He("artifact_publish"), {
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
    return xe("artifact_publish", "request_error"), Z$(caughtErr instanceof Error ? caughtErr.message : String(caughtErr));
  }
}

/** Constructs the viewer URL for a published artifact by slug */
function artifactViewerUrl(slugVal: any) {
  return new URL(`/code/artifact/${slugVal}`, Hs().CLAUDE_AI_ORIGIN).toString();
}

/** Returns a standard error result object with null url/slug/version */
function Z$(errMsg: any) {
  return {
    url: null,
    slug: null,
    version: null,
    err: errMsg
  };
}

/** Extracts the live version string from a 409 conflict response body, or returns null */
function EVa(responseData: any) {
  if (responseData && typeof responseData === "object" && "conflict" in responseData && responseData.conflict === !0 && "live" in responseData && typeof responseData.live === "string") return responseData.live;
  return null;
}

/** Truncates a response body (string or object) to 200 chars for logging */
function Cpt(responseBody: any) {
  if (typeof responseBody === "string") return responseBody.slice(0, 200);
  if (responseBody && typeof responseBody === "object") return (Pe(responseBody) ?? "").slice(0, 200);
  return "";
}
var MAX_ARTIFACT_BYTES = 16777216,
  hNp,
  gNp = "<style>:root{color-scheme:light}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#faf9f5;color:#141413}img{max-width:100%}</style>",
  _Np,
  Ept,
  yNp = 64,
  bVa = "conflict: another session published a newer version of this artifact. Re-read the current content (WebFetch the URL), reconcile your edits, then publish again.";
var c5e = b(() => {
  rle();
  Sc();
  mn();
  jn();
  _k();
  lT();
  qe();
  rI();
  AR();
  tn();
  hNp = new Set(["remote", "remote_cowork"]);
  _Np = /^(?:session_|cse_)[A-Za-z0-9_-]{1,184}$/;
  Ept = new Set();
});

export {CVa,isFrameBaseVersionEnabled,isShareAwarePublishEnabled,makeSetArtifactReadVersion,yVa,TVa,SVa,goCpHeaders,publishArtifact,TNp,SNp,gVa,_Va,artifactViewerUrl,Z$,EVa,Cpt,MAX_ARTIFACT_BYTES,hNp,gNp,_Np,Ept,yNp,bVa,c5e};
