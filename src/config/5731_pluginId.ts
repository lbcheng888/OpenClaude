// @ts-nocheck
import {Ne as dH} from "../../vendor/m583.ts";
import {sleep as n6} from "../telemetry/1488_withTimeout.ts";
import {Vs as a9,lT as nf} from "../../vendor/m2195.ts";
import {wn as b6,pf as W$} from "./0693_timestamp.ts";
import {Fb as PD,Ct as R_} from "../../vendor/m197.ts";
import {qt as l_,tn as a_} from "./0230_encoding.ts";
import {b as L} from "../../runtime.ts";
import {MS as s2} from "../../vendor/m460.ts";
import {Ir as l8} from "../../vendor/m584.ts";
import {ve as NH} from "../../vendor/m461.ts";
import {jt as R6} from "../../vendor/m253.ts";
// @ts-nocheck
function r61(rawPlugin) {
  return {
    pluginId: rawPlugin.id,
    name: rawPlugin.name,
    description: rawPlugin.description ?? "",
    version: rawPlugin.version ?? null,
    updatedAt: rawPlugin.updated_at ?? null
  };
}
function o61(plugin) {
  return plugin.enabled !== false;
}
function sCT() {
  return dH.CLAUDE_CODE_SYNC_PLUGINS_DOWNLOAD_STALL_MS ?? ZNq;
}
async function H81(requestFn) {
  let result = await requestFn();
  if ("success" in result ? result.success : result.ok) return result;
  return await n6(aCT), requestFn();
}
async function _81() {
  return H81(eCT);
}
async function eCT() {
  try {
    let response = await a9.get(tCT, {
      auth: "teleport-org",
      timeout: oCT
    });
    if (!response.ok) return {
      success: false,
      error: response.reason === "no-auth" ? response.detail : response.reason
    };
    if (!Array.isArray(response.data?.plugins)) {
      let parseResult = e61().safeParse(response.data);
      if (parseResult.success) {
        let errorType = parseResult.data.error.type ?? "error_envelope_no_type";
        return b6("warn", "plugins_sync_list_error", {
          serverError: errorType,
          status: response.status
        }), {
          success: false,
          error: errorType
        };
      }
      return b6("warn", "plugins_sync_list_malformed"), {
        success: false,
        error: "malformed list-plugins response"
      };
    }
    return {
      success: true,
      plugins: response.data.plugins.filter(o61).map(r61)
    };
  } catch (err) {
    let {
      message: errorMessage
    } = PD(err);
    return {
      success: false,
      error: errorMessage
    };
  }
}
async function q81(pluginId, destPath) {
  return H81(() => HbT(pluginId, destPath));
}
async function HbT(pluginId, destPath) {
  if (dH.CLAUDE_CODE_SYNC_PLUGINS_BUFFERED_DOWNLOAD) return _bT(pluginId, destPath);
  let downloadedBytes = 0,
    stallDetected = false;
  try {
    let triggerStallAbort = function () {
        stallDetected = true, transformStream.destroy(Error("plugin download stream stalled"));
      },
      response = await a9.get(`/api/oauth/organizations/:orgUUID/plugins/${encodeURIComponent(pluginId)}/download`, {
        auth: "teleport-org",
        timeout: ZNq,
        responseType: "stream"
      });
    if (!response.ok || !response.data) {
      let failReason = response.ok ? "empty_body" : response.reason;
      return b6("warn", "plugins_sync_download_not_ok", {
        reason: failReason
      }), {
        ok: false,
        reason: failReason
      };
    }
    let stallTimeoutMs = sCT(),
      stallTimer,
      transformStream = new s61.Transform({
        transform(chunk, _encoding, callback) {
          if (clearTimeout(stallTimer), stallTimer = setTimeout(triggerStallAbort, stallTimeoutMs), downloadedBytes += chunk.length, downloadedBytes > WNq) callback(Error("plugin zip exceeds download byte cap"));else callback(null, chunk);
        },
        flush(callback) {
          clearTimeout(stallTimer), callback();
        }
      });
    stallTimer = setTimeout(triggerStallAbort, stallTimeoutMs);
    try {
      await t61.pipeline(response.data, transformStream, a61.createWriteStream(destPath));
    } finally {
      clearTimeout(stallTimer);
    }
    let headerBuf = Buffer.alloc(2048),
      fileHandle = await mgH.open(destPath, "r"),
      bytesRead;
    try {
      bytesRead = (await fileHandle.read(headerBuf, 0, headerBuf.length, 0)).bytesRead;
    } finally {
      await fileHandle.close();
    }
    if (bytesRead < 2 || headerBuf[0] !== 80 || headerBuf[1] !== 75) {
      await mgH.rm(destPath, {
        force: true
      });
      let zipCheckReason = bytesRead === 0 ? "empty_body" : K81(headerBuf.subarray(0, bytesRead));
      return b6("warn", "plugins_sync_download_not_zip", {
        serverError: zipCheckReason,
        bodyLen: downloadedBytes
      }), {
        ok: false,
        reason: zipCheckReason
      };
    }
    return {
      ok: true
    };
  } catch (err) {
    await mgH.rm(destPath, {
      force: true
    }).catch(() => {});
    let responseData = err?.response?.data;
    if (responseData !== null && typeof responseData === "object" && "destroy" in responseData && typeof responseData.destroy === "function") responseData.destroy();
    let errCode = err !== null && typeof err === "object" && "code" in err ? err.code : undefined,
      failKind = stallDetected ? "timeout" : downloadedBytes > WNq ? "too_large" : errCode === "ECONNRESET" || errCode === "EPIPE" || errCode === "ETIMEDOUT" ? "network" : PD(err).kind;
    return b6("warn", "plugins_sync_download_exception", {
      kind: failKind
    }), {
      ok: false,
      reason: failKind
    };
  }
}
async function _bT(pluginId, destPath) {
  try {
    let response = await a9.get(`/api/oauth/organizations/:orgUUID/plugins/${encodeURIComponent(pluginId)}/download`, {
      auth: "teleport-org",
      timeout: ZNq,
      responseType: "arraybuffer",
      maxContentLength: WNq
    });
    if (!response.ok || !response.data) {
      let failReason = response.ok ? "empty_body" : response.reason;
      return b6("warn", "plugins_sync_download_not_ok", {
        reason: failReason
      }), {
        ok: false,
        reason: failReason
      };
    }
    let dataBuf = Buffer.from(response.data);
    if (dataBuf.length < 2 || dataBuf[0] !== 80 || dataBuf[1] !== 75) {
      let zipCheckReason = dataBuf.length === 0 ? "empty_body" : K81(dataBuf);
      return b6("warn", "plugins_sync_download_not_zip", {
        serverError: zipCheckReason,
        bodyLen: dataBuf.length
      }), {
        ok: false,
        reason: zipCheckReason
      };
    }
    return await mgH.writeFile(destPath, dataBuf), {
      ok: true
    };
  } catch (err) {
    let {
      kind: errKind
    } = PD(err);
    return b6("warn", "plugins_sync_download_exception", {
      kind: errKind
    }), {
      ok: false,
      reason: errKind
    };
  }
}
function K81(headerBytes) {
  try {
    let parseResult = e61().safeParse(l_(headerBytes.toString("utf8", 0, 2048)));
    if (parseResult.success) return parseResult.data.error.type ?? "error_envelope_no_type";
  } catch {}
  return "non_json_body";
}
var a61,
  mgH,
  s61,
  t61,
  oCT = 1e4,
  ZNq = 60000,
  aCT = 500,
  WNq = 268435456,
  e61,
  tCT = "/api/oauth/organizations/:orgUUID/plugins/list-plugins?enabled_only=true&compact=true";
var O81 = L(() => {
  s2();
  W$();
  l8();
  R_();
  a_();
  nf();
  a61 = require("fs"), mgH = require("fs/promises"), s61 = require("stream"), t61 = require("stream/promises");
  e61 = NH(() => R6.object({
    error: R6.object({
      type: R6.string().optional()
    })
  }));
});
export {r61 as Qhc,o61 as Zhc,sCT as z7m,H81 as ogc,_81 as sgc,eCT as Y7m,q81 as igc,HbT as J7m,_bT as X7m,K81 as agc,a61 as egc,mgH as yVe,s61 as tgc,t61 as ngc,oCT as V7m,ZNq as k$o,aCT as K7m,WNq as w$o,e61 as rgc,tCT as j7m,O81 as lgc};
