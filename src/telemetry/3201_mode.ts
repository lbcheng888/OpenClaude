// @ts-nocheck
import {vpe,xCt,Qy} from "../tools/0325_ttl.ts";
import {ln,Vc,vn} from "../session/0621_length.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {He,xe,mn} from "./0600_feature_name.ts";
import {executeNotificationHooks as vj} from "../../vendor/m5194.ts";
import {executeElicitationHooks as mFt,executeElicitationResultHooks as gFt} from "../../vendor/m5190.ts";
import {b} from "../../runtime.ts";
import {Wd} from "../tools/5204_shouldSkipHookDueToTrust.ts";
// @ts-nocheck
/** Map elicitation params to a coarse UI mode: "url" for URL-based, "form" otherwise. */
function getElicitationMode(params) {
  return params.mode === "url" ? "url" : "form";
}
/** Find the index of a queued url-mode elicitation matching serverName + elicitationId, or -1. */
function findElicitationQueueIndex(queue, serverName, elicitationId) {
  return queue.findIndex(entry => entry.serverName === serverName && entry.params.mode === "url" && "elicitationId" in entry.params && entry.params.elicitationId === elicitationId);
}
/**
 * Wire up MCP elicitation request/notification handlers on a client.
 * @param client      MCP client to attach handlers to
 * @param serverName  Originating MCP server name
 * @param setState    State setter used to enqueue pending elicitations
 * @param metrics     Optional in-flight elicitation tracker (pending count / last-closed timestamp)
 */
function registerElicitationHandlers(client, serverName, setState, metrics) {
  try {
    client.setRequestHandler(vpe, async (request, ctx) => {
      if (metrics) metrics.pendingElicitations++;
      ln(serverName, `Received elicitation request: ${Pe(request)}`);
      let mode = getElicitationMode(request.params);
      W("tengu_mcp_elicitation_shown", {
        mode: Le(mode)
      });
      try {
        let hookResult = await runElicitationHookCheck(serverName, request.params, ctx.signal);
        if (hookResult) return ln(serverName, `Elicitation resolved by hook: ${Pe(hookResult)}`), W("tengu_mcp_elicitation_response", {
          mode: Le(mode),
          action: Le(hookResult.action)
        }), He("mcp_elicitation_handle"), hookResult;
        let elicitationId = mode === "url" && "elicitationId" in request.params ? request.params.elicitationId : void 0,
          userResponse = await new Promise(resolve => {
            let onAbort = () => {
              resolve({
                action: "cancel"
              });
            };
            if (ctx.signal.aborted) {
              onAbort();
              return;
            }
            let waitingState = elicitationId ? {
              actionLabel: "Skip confirmation"
            } : void 0;
            setState(state => ({
              ...state,
              elicitation: {
                queue: [...state.elicitation.queue, {
                  serverName: serverName,
                  requestId: ctx.requestId,
                  params: request.params,
                  signal: ctx.signal,
                  waitingState: waitingState,
                  respond: response => {
                    ctx.signal.removeEventListener("abort", onAbort), W("tengu_mcp_elicitation_response", {
                      mode: Le(mode),
                      action: Le(response.action)
                    }), resolve(response);
                  }
                }]
              }
            })), ctx.signal.addEventListener("abort", onAbort, {
              once: !0
            });
          });
        ln(serverName, `Elicitation response: ${Pe(userResponse)}`);
        let result = await runElicitationResultHookCheck(serverName, userResponse, ctx.signal, mode, elicitationId);
        return He("mcp_elicitation_handle"), result;
      } catch (err) {
        return Vc(serverName, `Elicitation error: ${err}`), xe("mcp_elicitation_handle", "handler_error"), {
          action: "cancel"
        };
      } finally {
        if (metrics) metrics.pendingElicitations--, metrics.lastElicitationClosedAt = Date.now();
      }
    }), client.setNotificationHandler(xCt, notification => {
      let {
        elicitationId: elicitationId
      } = notification.params;
      ln(serverName, `Received elicitation completion notification: ${elicitationId}`), vj({
        message: `MCP server "${serverName}" confirmed elicitation ${elicitationId} complete`,
        notificationType: "elicitation_complete"
      });
      let found = !1;
      if (setState(state => {
        let index = findElicitationQueueIndex(state.elicitation.queue, serverName, elicitationId);
        if (index === -1) return state;
        found = !0;
        let queue = [...state.elicitation.queue];
        return queue[index] = {
          ...queue[index],
          completed: !0
        }, {
          ...state,
          elicitation: {
            queue: queue
          }
        };
      }), !found) ln(serverName, `Ignoring completion notification for unknown elicitation: ${elicitationId}`);
    });
  } catch {
    return;
  }
}
/** Run pre-prompt elicitation hooks; returns a resolved response if a hook short-circuits, else undefined. */
async function runElicitationHookCheck(serverName, params, signal) {
  try {
    let mode = params.mode === "url" ? "url" : "form",
      url = "url" in params ? params.url : void 0,
      elicitationId = "elicitationId" in params ? params.elicitationId : void 0,
      {
        elicitationResponse: elicitationResponse,
        blockingError: blockingError
      } = await mFt({
        serverName: serverName,
        message: params.message,
        requestedSchema: "requestedSchema" in params ? params.requestedSchema : void 0,
        signal: signal,
        mode: mode,
        url: url,
        elicitationId: elicitationId
      });
    if (blockingError) return {
      action: "decline"
    };
    if (elicitationResponse) return {
      action: elicitationResponse.action,
      content: elicitationResponse.content
    };
    return;
  } catch (err) {
    Vc(serverName, `Elicitation hook error: ${err}`);
    return;
  }
}
/** Run post-response elicitation-result hooks, possibly overriding the user's response. */
async function runElicitationResultHookCheck(serverName, userResponse, signal, mode, elicitationId) {
  try {
    let {
      elicitationResultResponse: elicitationResultResponse,
      blockingError: blockingError
    } = await gFt({
      serverName: serverName,
      action: userResponse.action,
      content: userResponse.content,
      signal: signal,
      mode: mode,
      elicitationId: elicitationId
    });
    if (blockingError) return vj({
      message: `Elicitation response for server "${serverName}": decline`,
      notificationType: "elicitation_response"
    }), {
      action: "decline"
    };
    let finalResponse = elicitationResultResponse ? {
      action: elicitationResultResponse.action,
      content: elicitationResultResponse.content ?? userResponse.content
    } : userResponse;
    return vj({
      message: `Elicitation response for server "${serverName}": ${finalResponse.action}`,
      notificationType: "elicitation_response"
    }), finalResponse;
  } catch (err) {
    return Vc(serverName, `ElicitationResult hook error: ${err}`), vj({
      message: `Elicitation response for server "${serverName}": ${userResponse.action}`,
      notificationType: "elicitation_response"
    }), userResponse;
  }
}
var yDn = b(() => {
  Qy();
  Wd();
  vn();
  tn();
  mn();
  kt();
});

export {getElicitationMode as F7d,findElicitationQueueIndex as B7d,registerElicitationHandlers as rla,runElicitationHookCheck as mFt,runElicitationResultHookCheck as fFt,yDn};
