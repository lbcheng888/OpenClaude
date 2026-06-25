// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {getOauthConfig as Hs,Sc} from "../api/0465_getOauthConfig.ts";
import {xe,He,mn} from "../telemetry/0600_feature_name.ts";
import {Vs,lT} from "../../vendor/m2195.ts";
import {goCpHeaders as Apt,MAX_ARTIFACT_BYTES as OY,c5e} from "./4166_publishArtifact.ts";
import {isCancel as $P} from "../../vendor/m573.ts";
import {externalHttp as $b,_k} from "../core/0576_isCancel.ts";
/** Module exports table for artifact-read helpers. */
var RVa = {};
ft(RVa, {
  readArtifactContent: () => readArtifactContent,
  getFrameShareStatus: () => getFrameShareStatus
});

/**
 * Performs the frame "boot" handshake for an artifact: validates the session
 * environment, fetches the frame metadata (version + asset token) from the API,
 * and normalizes failures into `{ err }` results.
 *
 * @param descriptor - Artifact descriptor with `slug` and target `env`.
 * @param telemetryName - Telemetry event name used for failure reporting.
 * @param signal - Abort signal forwarded to the HTTP request.
 */
async function bootFrame({
  slug: slug,
  env: env
}: { slug: string; env: string }, telemetryName: string, signal?: AbortSignal): Promise<any> {
  let expectedEnv = Hs().CLAUDE_AI_ORIGIN.includes("staging") ? "staging" : "prod";
  if (env !== expectedEnv) return xe(telemetryName, "env_mismatch"), {
    err: `that artifact URL is for ${env} claude.ai, but this session targets ${expectedEnv}`
  };
  let bootResponse: any;
  try {
    bootResponse = await Vs.get(`/api/frame/${slug}?via=model_read`, {
      host: "frame",
      auth: "required",
      refreshOAuth: !0,
      headers: Apt(),
      timeout: 15000,
      validateStatus: () => !0,
      signal: signal
    });
  } catch (requestError) {
    if ($P(requestError)) throw requestError;
    return xe(telemetryName, "boot_request_error"), {
      err: "artifact read failed (network error)"
    };
  }
  if (!bootResponse.ok) return xe(telemetryName, bootResponse.reason), {
    err: bootResponse.reason === "no-auth" ? `not authenticated — run /login (${bootResponse.detail})` : `artifact read unavailable: ${bootResponse.reason}`
  };
  if (bootResponse.status === 404) return xe(telemetryName, "boot_404"), {
    err: "artifact not found — it may have been deleted, or it has not been shared with you",
    status: 404
  };
  if (bootResponse.status < 200 || bootResponse.status >= 300) return xe(telemetryName, "boot_failed"), {
    err: `artifact read failed (HTTP ${bootResponse.status})`,
    status: bootResponse.status
  };
  let bootData = bootResponse.data ?? {},
    {
      ver: ver,
      assetToken: assetToken
    } = bootData;
  if (!ver || !assetToken) return xe(telemetryName, "boot_incomplete"), {
    err: "artifact read failed: incomplete boot response"
  };
  return {
    err: null,
    data: bootData,
    ver: ver,
    assetToken: assetToken
  };
}

/**
 * Returns the share status (permission mode + shared flag) for an artifact by
 * running the boot handshake and reading its permission metadata.
 */
async function getFrameShareStatus(descriptor: { slug: string; env: string }, signal?: AbortSignal): Promise<any> {
  let result = await bootFrame(descriptor, "artifact_share_status", signal);
  if (result.err !== null) return {
    err: result.err
  };
  return {
    err: null,
    mode: result.data.perm?.mode,
    shared: result.data.shared
  };
}

/**
 * Reads the rendered HTML content of an artifact: runs the boot handshake to
 * get the version + asset token, then fetches the artifact body from its
 * `claudeusercontent.com` frame host and returns the decoded HTML, role,
 * byte size, title and version.
 */
async function readArtifactContent(descriptor: { slug: string; env: string }, signal?: AbortSignal): Promise<any> {
  let bootResult = await bootFrame(descriptor, "artifact_webfetch_read", signal);
  if (bootResult.err !== null) return bootResult;
  let {
      ver: ver,
      assetToken: assetToken
    } = bootResult,
    {
      title: title,
      perm: perm
    } = bootResult.data,
    role = perm?.role === "owner" ? "owner" : "reader",
    frameHost = `${descriptor.slug}.frame.${descriptor.env === "staging" ? "staging." : ""}claudeusercontent.com`,
    assetResponse;
  try {
    assetResponse = await $b.get(`https://${frameHost}/_f/${ver}/?__frame_t=${encodeURIComponent(assetToken)}`, {
      signal: signal,
      timeout: 30000,
      responseType: "arraybuffer",
      maxRedirects: 0,
      maxContentLength: OY + 4096,
      validateStatus: () => !0
    });
  } catch (assetError) {
    if ($P(assetError)) throw assetError;
    return xe("artifact_webfetch_read", "asset_request_error"), {
      err: "artifact content fetch failed (network error)"
    };
  }
  if (assetResponse.status === 403 && assetResponse.headers["x-proxy-error"] === "blocked-by-allowlist") return xe("artifact_webfetch_read", "asset_egress_blocked"), {
    err: `the network egress proxy in this environment blocks ${frameHost} — your access to the artifact itself is fine (the boot check passed)`,
    status: 403
  };
  if (assetResponse.status < 200 || assetResponse.status >= 300) return xe("artifact_webfetch_read", "asset_failed"), {
    err: `artifact content fetch failed (HTTP ${assetResponse.status})`,
    status: assetResponse.status
  };
  let bodyBuffer = Buffer.from(assetResponse.data);
  return He("artifact_webfetch_read"), {
    err: null,
    html: bodyBuffer.toString("utf-8").replace(`<base href="/_f/${ver}/">`, ""),
    role: role,
    bytes: bodyBuffer.length,
    title: title ?? "",
    ver: ver
  };
}

/** Lazy module initializer wiring up the dependency modules. */
var xho = b(() => {
  Sc();
  mn();
  _k();
  lT();
  c5e();
});

export {RVa,bootFrame as AVa,getFrameShareStatus,readArtifactContent,xho};
