// @ts-nocheck
import {isFullscreenWithTTY as pt,b} from "../../runtime.ts";
import {getOauthConfig as Is,Dc as Hc} from "../api/0459_getOauthConfig.ts";
import {Oe as Pe,Ie as He,ln as cn} from "../telemetry/0594_feature_name.ts";
import {si as ei,gT as dT} from "../../vendor/m2190.ts";
import {isCancel as cB} from "../../vendor/m567.ts";
import {externalHttp as Ob,ek as Xx} from "../core/0570_isCancel.ts";
import {MAX_ARTIFACT_BYTES as yce,qqe as Sqe} from "./4153_publishArtifact.ts";
// @ts-nocheck
var DkK = {};
pt(DkK, {
  readArtifactContent: () => readArtifactContent_2,
  getFrameShareStatus: () => l4q
});
async function readArtifactContent({
  slug: slug,
  env: env
}, signal, K) {
  let O = Is().CLAUDE_AI_ORIGIN.includes("staging") ? "staging" : "prod";
  if (env !== O) return Pe(signal, "env_mismatch"), {
    err: `that artifact URL is for ${env} claude.ai, but this session targets ${O}`
  };
  let T;
  try {
    T = await ei.get(`/api/frame/${slug}`, {
      host: "frame",
      auth: "required",
      refreshOAuth: true,
      headers: {
        "X-Frame-CP": "go"
      },
      timeout: 15000,
      validateStatus: () => true,
      signal: K
    });
  } catch (w) {
    if (cB(w)) throw w;
    return Pe(signal, "boot_request_error"), {
      err: "artifact read failed (network error)"
    };
  }
  if (!T.ok) return Pe(signal, T.reason), {
    err: T.reason === "no-auth" ? `not authenticated \u2014 run /login (${T.detail})` : `artifact read unavailable: ${T.reason}`
  };
  if (T.status === 404) return Pe(signal, "boot_404"), {
    err: "artifact not found \u2014 it may have been deleted, or it has not been shared with you",
    status: 404
  };
  if (T.status < 200 || T.status >= 300) return Pe(signal, "boot_failed"), {
    err: `artifact read failed (HTTP ${T.status})`,
    status: T.status
  };
  let z = T.data ?? {},
    {
      ver: $,
      assetToken: Y
    } = z;
  if (!$ || !Y) return Pe(signal, "boot_incomplete"), {
    err: "artifact read failed: incomplete boot response"
  };
  return {
    err: null,
    data: z,
    ver: $,
    assetToken: Y
  };
}
async function l4q(H, _) {
  let q = await readArtifactContent(H, "artifact_share_status", _);
  if (q.err !== null) return {
    err: q.err
  };
  return {
    err: null,
    mode: q.data.perm?.mode,
    shared: q.data.shared
  };
}
async function readArtifactContent_2(H, _) {
  let q = await readArtifactContent(H, "artifact_webfetch_read", _);
  if (q.err !== null) return q;
  let {
      ver: K,
      assetToken: O
    } = q,
    {
      title: T,
      perm: z
    } = q.data,
    $ = z?.role === "owner" ? "owner" : "reader",
    Y = `${H.slug}.frame.${H.env === "staging" ? "staging." : ""}claudeusercontent.com`,
    w;
  try {
    w = await Ob.get(`https://${Y}/_f/${K}/?__frame_t=${encodeURIComponent(O)}`, {
      signal: _,
      timeout: 30000,
      responseType: "arraybuffer",
      maxRedirects: 0,
      maxContentLength: yce + 4096,
      validateStatus: () => true
    });
  } catch (j) {
    if (cB(j)) throw j;
    return Pe("artifact_webfetch_read", "asset_request_error"), {
      err: "artifact content fetch failed (network error)"
    };
  }
  if (w.status === 403 && w.headers["x-proxy-error"] === "blocked-by-allowlist") return Pe("artifact_webfetch_read", "asset_egress_blocked"), {
    err: `the network egress proxy in this environment blocks ${Y} \u2014 your access to the artifact itself is fine (the boot check passed)`,
    status: 403
  };
  if (w.status < 200 || w.status >= 300) return Pe("artifact_webfetch_read", "asset_failed"), {
    err: `artifact content fetch failed (HTTP ${w.status})`,
    status: w.status
  };
  let A = Buffer.from(w.data);
  return He("artifact_webfetch_read"), {
    err: null,
    html: A.toString("utf-8").replace(`<base href="/_f/${K}/">`, ""),
    role: $,
    bytes: A.length,
    title: T ?? "",
    ver: K
  };
}
var n4q = b(() => {
  Hc();
  cn();
  Xx();
  dT();
  Sqe();
});

export {DkK as hqa,readArtifactContent as Aqa,l4q as getFrameShareStatus,readArtifactContent_2 as readArtifactContent,n4q as juo};
