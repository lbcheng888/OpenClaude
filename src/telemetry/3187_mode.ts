// @ts-nocheck
import {_pe as Zde,sSt as OTt,YT as HS} from "../tools/0323_ttl.ts";
import {on as sn,wu as Du,Rn as wn} from "../session/0615_length.ts";
import {Le as Oe,Xt} from "../config/0228_encoding.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {Ie as He,Oe as Pe,ln as cn} from "./0594_feature_name.ts";
import {executeNotificationHooks as Nz} from "../../vendor/m5161.ts";
import {executeElicitationHooks as dMt,executeElicitationResultHooks as pMt} from "../../vendor/m5157.ts";
import {b} from "../../runtime.ts";
import {yp as Tp} from "../tools/5171_shouldSkipHookDueToTrust.ts";
// @ts-nocheck
function getElicitationMode(params) {
  return params.mode === "url" ? "url" : "form";
}
function findElicitationQueueIndex(queue, serverName, elicitationId) {
  return queue.findIndex(entry => entry.serverName === serverName && entry.params.mode === "url" && "elicitationId" in entry.params && entry.params.elicitationId === elicitationId);
}
function qr7(client, serverName, setState) {
  try {
    client.setRequestHandler(Zde, async (r, o) => {
      sn(serverName, `Received elicitation request: ${Oe(r)}`);
      let s = getElicitationMode(r.params);
      j("tengu_mcp_elicitation_shown", {
        mode: Ue(s)
      });
      try {
        let i = await runElicitationHookCheck(serverName, r.params, o.signal);
        if (i) return sn(serverName, `Elicitation resolved by hook: ${Oe(i)}`), j("tengu_mcp_elicitation_response", {
          mode: Ue(s),
          action: Ue(i.action)
        }), He("mcp_elicitation_handle"), i;
        let a = s === "url" && "elicitationId" in r.params ? r.params.elicitationId : undefined,
          c = await new Promise(d => {
            let p = () => {
              d({
                action: "cancel"
              });
            };
            if (o.signal.aborted) {
              p();
              return;
            }
            let m = a ? {
              actionLabel: "Skip confirmation"
            } : undefined;
            setState(f => ({
              ...f,
              elicitation: {
                queue: [...f.elicitation.queue, {
                  serverName: serverName,
                  requestId: o.requestId,
                  params: r.params,
                  signal: o.signal,
                  waitingState: m,
                  respond: A => {
                    o.signal.removeEventListener("abort", p), j("tengu_mcp_elicitation_response", {
                      mode: Ue(s),
                      action: Ue(A.action)
                    }), d(A);
                  }
                }]
              }
            })), o.signal.addEventListener("abort", p, {
              once: true
            });
          });
        sn(serverName, `Elicitation response: ${Oe(c)}`);
        let u = await runElicitationResultHookCheck(serverName, c, o.signal, s, a);
        return He("mcp_elicitation_handle"), u;
      } catch (i) {
        return Du(serverName, `Elicitation error: ${i}`), Pe("mcp_elicitation_handle", "handler_error"), {
          action: "cancel"
        };
      }
    }), client.setNotificationHandler(OTt, r => {
      let {
        elicitationId: o
      } = r.params;
      sn(serverName, `Received elicitation completion notification: ${o}`), Nz({
        message: `MCP server "${serverName}" confirmed elicitation ${o} complete`,
        notificationType: "elicitation_complete"
      });
      let s = false;
      if (setState(i => {
        let a = findElicitationQueueIndex(i.elicitation.queue, serverName, o);
        if (a === -1) return i;
        s = true;
        let l = [...i.elicitation.queue];
        return l[a] = {
          ...l[a],
          completed: true
        }, {
          ...i,
          elicitation: {
            queue: l
          }
        };
      }), !s) sn(serverName, `Ignoring completion notification for unknown elicitation: ${o}`);
    });
  } catch {
    return;
  }
}
async function runElicitationHookCheck(serverName, params, signal) {
  try {
    let mode = params.mode === "url" ? "url" : "form",
      url = "url" in params ? params.url : undefined,
      elicitationId = "elicitationId" in params ? params.elicitationId : undefined,
      {
        elicitationResponse: elicitationResponse,
        blockingError: blockingError
      } = await dMt({
        serverName: serverName,
        message: params.message,
        requestedSchema: "requestedSchema" in params ? params.requestedSchema : undefined,
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
    Du(serverName, `Elicitation hook error: ${err}`);
    return;
  }
}
async function runElicitationResultHookCheck(serverName, userResponse, signal, mode, elicitationId) {
  try {
    let {
      elicitationResultResponse: elicitationResultResponse,
      blockingError: blockingError
    } = await pMt({
      serverName: serverName,
      action: userResponse.action,
      content: userResponse.content,
      signal: signal,
      mode: mode,
      elicitationId: elicitationId
    });
    if (blockingError) return Nz({
      message: `Elicitation response for server "${serverName}": decline`,
      notificationType: "elicitation_response"
    }), {
      action: "decline"
    };
    let finalResponse = elicitationResultResponse ? {
      action: elicitationResultResponse.action,
      content: elicitationResultResponse.content ?? userResponse.content
    } : userResponse;
    return Nz({
      message: `Elicitation response for server "${serverName}": ${finalResponse.action}`,
      notificationType: "elicitation_response"
    }), finalResponse;
  } catch (err) {
    return Du(serverName, `ElicitationResult hook error: ${err}`), Nz({
      message: `Elicitation response for server "${serverName}": ${userResponse.action}`,
      notificationType: "elicitation_response"
    }), userResponse;
  }
}
var tP6 = b(() => {
  HS();
  Tp();
  wn();
  Xt();
  cn();
  Ct();
});

export {getElicitationMode as n3d,findElicitationQueueIndex as r3d,qr7 as ota,runElicitationHookCheck as LMt,runElicitationResultHookCheck as MMt,tP6 as RHn};
