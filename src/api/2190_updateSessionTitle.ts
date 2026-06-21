// @ts-nocheck
import {isFullscreenWithTTY as j_,b as L} from "../../runtime.ts";
import {fo as wq} from "../../vendor/m566.ts";
import {logForDebugging as N,qe as gH} from "../config/0234_setHasFormattedOutput.ts";
import {Se as GH,_o as Dq,K_ as Fw,iT as gf,bt as G_} from "../../vendor/m195.ts";
import {sleep as o6} from "../telemetry/1483_withTimeout.ts";
import {isFirstPartyProvider as R1,li as M7} from "./1282_usesFirstPartyModelIds.ts";
import {checkAndRefreshOAuthTokenIfNeeded as LY,getClaudeAIOAuthTokens as f7,Ao as jq} from "../config/2031_withOAuthRefreshLock.ts";
import {getOrganizationUUID as lI,DH as bG} from "../config/1288_storeOAuthAccountInfo.ts";
import {Ul as sK,ln as P6} from "../telemetry/0594_feature_name.ts";
import {getOauthConfig as v9,Dc as G1} from "./0459_getOauthConfig.ts";
import {parseGitHubRepository as HyH,ZI as Fh} from "../../vendor/m692.ts";
import {De as CH,Rn as C6} from "../session/0615_length.ts";
import {getClientPlatform as Q0} from "../config/0048_ISSUES_EXPLAINER.ts";
import {Le as xH,Xt as t_} from "../config/0228_encoding.ts";
import {Gp as rO} from "../../vendor/m567.ts";
import {fk as AZ} from "./2032_withOAuth401Retry.ts";
import {Xr as i8,cl as _4} from "../../vendor/m321.ts";
import {we as yH} from "../../vendor/m455.ts";
// @ts-nocheck
var sessionApiExports = {};
j_(sessionApiExports, {
  updateSessionTitle: () => updateSessionTitle,
  sendEventToRemoteSession: () => sendEventToRemoteSession,
  sendBashCommandToRemoteSession: () => sendBashCommandToRemoteSession,
  reportClientPresence: () => reportClientPresence,
  prepareApiRequest: () => prepareApiRequest,
  markSessionRead: () => markSessionRead,
  isTransientNetworkError: () => isTransientNetworkError,
  getOAuthHeaders: () => getOAuthHeaders,
  getBranchFromSession: () => getBranchFromSession,
  fetchSession: () => fetchSession,
  fetchCodeSessionsFromSessionsAPI: () => fetchCodeSessionsFromSessionsAPI,
  ccrSessionToResource: () => ccrSessionToResource,
  axiosGetWithRetry: () => axiosGetWithRetry,
  CodeSessionSchema: () => CodeSessionSchema,
  CCR_BYOC_BETA: () => CCR_BYOC_BETA
});
function isTransientNetworkError(err) {
  if (!wq.isAxiosError(err)) return false;
  if (!err.response) return true;
  if (err.response.status >= 500) return true;
  return false;
}
async function axiosGetWithRetry(url, config) {
  let lastError;
  for (let attempt = 0; attempt <= MAX_GET_RETRIES; attempt++) try {
    return await wq.get(url, config);
  } catch (err) {
    if (lastError = err, !isTransientNetworkError(err)) throw err;
    if (attempt >= MAX_GET_RETRIES) throw N(`Teleport request failed after ${attempt + 1} attempts: ${GH(err)}`), err;
    let delayMs = GET_RETRY_DELAYS[attempt] ?? 2000;
    N(`Teleport request failed (attempt ${attempt + 1}/${MAX_GET_RETRIES + 1}), retrying in ${delayMs}ms: ${GH(err)}`), await o6(delayMs);
  }
  throw lastError;
}
function ccrSessionToResource(rawSession) {
  let status = rawSession.status === "archived" ? "archived" : rawSession.worker_status ?? "idle";
  return {
    type: "session",
    id: rawSession.id,
    title: rawSession.title || null,
    session_status: status,
    environment_id: rawSession.environment_id,
    created_at: rawSession.created_at,
    updated_at: "updated_at" in rawSession ? rawSession.updated_at : rawSession.last_event_at,
    session_context: {
      sources: rawSession.config?.sources ?? [],
      outcomes: rawSession.config?.outcomes ?? null,
      model: rawSession.config?.model ?? null,
      cwd: "",
      custom_system_prompt: null,
      append_system_prompt: null
    }
  };
}
async function prepareApiRequest() {
  if (!R1()) throw Error("Cloud sessions are only available on the first-party Anthropic API provider.");
  await LY();
  let accessToken = f7()?.accessToken;
  if (accessToken === undefined) throw Error("Claude Code web sessions require authentication with a Claude.ai account. API key authentication is not sufficient. Please run /login to authenticate, or check your authentication status with /status.");
  let orgUUID = await lI();
  if (!orgUUID) throw Error("Unable to get organization UUID");
  return {
    accessToken: accessToken,
    orgUUID: orgUUID
  };
}
async function fetchCodeSessionsFromSessionsAPI() {
  return sK("teleport_sessions_list", async () => {
    let {
        accessToken: accessToken
      } = await prepareApiRequest(),
      sessionsUrl = `${v9().BASE_API_URL}/v1/code/sessions`;
    try {
      let resp = await axiosGetWithRetry(sessionsUrl, {
        headers: getOAuthHeaders(accessToken)
      });
      if (resp.status !== 200) throw Error(`Failed to fetch code sessions: ${resp.statusText}`);
      return resp.data.data.map(rawSession => {
        let gitSource = rawSession.config?.sources?.find(src => src.type === "git_repository"),
          repo = null;
        if (gitSource?.url) {
          let parsed = HyH(gitSource.url);
          if (parsed) {
            let [owner, name] = parsed.split("/");
            if (owner && name) repo = {
              name: name,
              owner: {
                login: owner
              },
              default_branch: gitSource.revision || undefined
            };
          }
        }
        return {
          id: rawSession.id,
          title: rawSession.title || "Untitled",
          description: "",
          status: rawSession.status === "archived" ? "archived" : rawSession.worker_status ?? "idle",
          repo: repo,
          turns: [],
          created_at: rawSession.created_at,
          updated_at: rawSession.last_event_at
        };
      });
    } catch (err) {
      let normalized = Dq(err);
      if (Fw(err)) N(`Failed to fetch code sessions: ${normalized.message}`, {
        level: "error"
      });else CH(normalized);
      throw err;
    }
  });
}
function getOAuthHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "anthropic-version": "2023-06-01",
    "anthropic-client-platform": Q0()
  };
}
async function fetchSession(sessionId, preparedAuth) {
  if (!R1()) throw new gf("Cloud sessions are only available on the first-party Anthropic API provider.", "Cloud sessions are only available on the first-party Anthropic API provider.");
  let {
      accessToken: accessToken
    } = preparedAuth ?? (await prepareApiRequest()),
    sessionUrl = `${v9().BASE_API_URL}/v1/code/sessions/${sessionId}`,
    resp = await wq.get(sessionUrl, {
      headers: getOAuthHeaders(accessToken),
      timeout: 15000,
      validateStatus: status => status < 500
    });
  if (resp.status !== 200) {
    let errMsg = resp.data?.error?.message;
    if (resp.status === 404) {
      let notFoundMsg = `Session not found: ${sessionId}`;
      throw new gf(notFoundMsg, notFoundMsg);
    }
    if (resp.status === 401) throw new gf("Session expired. Please run /login to sign in again.", "Session expired. Please run /login to sign in again.");
    if (resp.status === 400 && errMsg?.startsWith("invalid session ID")) throw new gf(errMsg, errMsg);
    throw Error(errMsg || `Failed to fetch session: ${resp.status} ${resp.statusText}`);
  }
  let sessionData = resp.data.response_shape ?? resp.data.session;
  if (!sessionData?.id) throw Error(`Session not found: ${sessionId}`);
  return ccrSessionToResource(sessionData);
}
function getBranchFromSession(session) {
  return session.session_context.outcomes?.find(outcome => outcome.type === "git_repository")?.git_info?.branches[0];
}
async function sendEventInternal(sessionId, payload, logPrefix) {
  if (!R1()) return {
    ok: false,
    reason: "Cloud sessions are only available on the first-party Anthropic API provider."
  };
  try {
    let {
        accessToken: accessToken
      } = await prepareApiRequest(),
      eventsUrl = `${v9().BASE_API_URL}/v1/code/sessions/${sessionId}/events`,
      headers = getOAuthHeaders(accessToken);
    N(`${logPrefix} Sending event to session ${sessionId}`);
    let resp = await wq.post(eventsUrl, {
      events: [{
        payload: payload
      }]
    }, {
      headers: headers,
      validateStatus: status => status < 500,
      timeout: 30000
    });
    if (resp.status === 200 || resp.status === 201) return N(`${logPrefix} Successfully sent event to session ${sessionId}`), {
      ok: true
    };
    N(`${logPrefix} Failed with status ${resp.status}: ${xH(resp.data)}`);
    let errMsg = resp.data?.error?.message;
    return {
      ok: false,
      reason: typeof errMsg === "string" ? `${errMsg} (HTTP ${resp.status})` : `HTTP ${resp.status}`
    };
  } catch (err) {
    return N(`${logPrefix} Error: ${GH(err)}`), {
      ok: false,
      reason: GH(err)
    };
  }
}
async function sendEventToRemoteSession(sessionId, content, opts) {
  return sendEventInternal(sessionId, {
    uuid: opts?.uuid ?? cryptoModule.randomUUID(),
    session_id: sessionId,
    type: "user",
    parent_tool_use_id: null,
    message: {
      role: "user",
      content: content
    }
  }, "[sendEventToRemoteSession]");
}
async function sendBashCommandToRemoteSession(sessionId, cmd, opts) {
  return sendEventInternal(sessionId, {
    uuid: opts?.uuid ?? cryptoModule.randomUUID(),
    session_id: sessionId,
    type: "bash_command",
    command: cmd.command,
    ...(cmd.cwd !== undefined && {
      cwd: cmd.cwd
    })
  }, "[sendBashCommandToRemoteSession]");
}
async function updateSessionTitle(sessionId, newTitle) {
  try {
    let {
        accessToken: accessToken
      } = await prepareApiRequest(),
      sessionUrl = `${v9().BASE_API_URL}/v1/code/sessions/${sessionId}`;
    N(`[updateSessionTitle] Updating title for session ${sessionId}: "${newTitle}"`);
    let resp = await wq.put(sessionUrl, {
      title: newTitle
    }, {
      headers: getOAuthHeaders(accessToken),
      validateStatus: status => status < 500
    });
    if (resp.status === 200) return N(`[updateSessionTitle] Successfully updated title for session ${sessionId}`), true;
    return N(`[updateSessionTitle] Failed with status ${resp.status}: ${xH(resp.data)}`), false;
  } catch (err) {
    return N(`[updateSessionTitle] Error: ${GH(err)}`), false;
  }
}
async function markSessionRead(sessionId, lastEventId) {
  try {
    let {
        accessToken: accessToken
      } = await prepareApiRequest(),
      markReadUrl = `${v9().BASE_API_URL}/v1/code/sessions/${sessionId}/mark_read`,
      resp = await wq.post(markReadUrl, lastEventId ? {
        event_id: lastEventId
      } : {}, {
        headers: getOAuthHeaders(accessToken),
        timeout: 1e4,
        validateStatus: status => status < 500
      });
    if (resp.status !== 200) N(`[markSessionRead] Failed with status ${resp.status}: ${xH(resp.data)}`);
  } catch (err) {
    N(`[markSessionRead] Error: ${GH(err)}`);
  }
}
async function reportClientPresence(sessionId, clientId, clear = false) {
  try {
    let {
        accessToken: accessToken
      } = await prepareApiRequest(),
      presenceUrl = `${v9().BASE_API_URL}/v1/code/sessions/${sessionId}/client/presence`,
      resp = await wq.post(presenceUrl, {
        client_id: clientId,
        clear: clear
      }, {
        headers: getOAuthHeaders(accessToken),
        timeout: 1e4,
        validateStatus: status => status < 500
      });
    if (resp.status !== 200) return N(`[reportClientPresence] Failed with status ${resp.status}: ${xH(resp.data)}`), null;
    return resp.data.refresh_after_seconds ?? null;
  } catch (err) {
    return N(`[reportClientPresence] Error: ${GH(err)}`), null;
  }
}
var cryptoModule,
  GET_RETRY_DELAYS,
  MAX_GET_RETRIES,
  CCR_BYOC_BETA = "ccr-byoc-2025-07-29",
  CodeSessionSchema;
var sessionApiInitLazy = L(() => {
  rO();
  G1();
  bG();
  AZ();
  i8();
  P6();
  jq();
  gH();
  Fh();
  G_();
  C6();
  M7();
  t_();
  cryptoModule = require("crypto"), GET_RETRY_DELAYS = [2000, 4000, 8000, 16000], MAX_GET_RETRIES = GET_RETRY_DELAYS.length;
  CodeSessionSchema = yH(() => _4.object({
    id: _4.string(),
    title: _4.string(),
    description: _4.string(),
    status: _4.enum(["idle", "working", "waiting", "completed", "archived", "cancelled", "rejected"]),
    repo: _4.object({
      name: _4.string(),
      owner: _4.object({
        login: _4.string()
      }),
      default_branch: _4.string().optional()
    }).nullable(),
    turns: _4.array(_4.string()),
    created_at: _4.string(),
    updated_at: _4.string()
  }));
});

export {sessionApiExports as vfe,isTransientNetworkError,axiosGetWithRetry,ccrSessionToResource,prepareApiRequest as d$,fetchCodeSessionsFromSessionsAPI,getOAuthHeaders,fetchSession,getBranchFromSession,sendEventInternal as ofi,sendEventToRemoteSession,sendBashCommandToRemoteSession,updateSessionTitle,markSessionRead,reportClientPresence,cryptoModule as dNr,GET_RETRY_DELAYS as nfi,MAX_GET_RETRIES as uNr,CCR_BYOC_BETA,CodeSessionSchema,sessionApiInitLazy as Dw};
