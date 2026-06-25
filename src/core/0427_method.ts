// @ts-nocheck
import {KMe as OLe,hEe as _Se,Qy as HS} from "../tools/0325_ttl.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
class s78 {
  constructor(e) {
    this._server = e;
  }
  requestStream(server, t, n) {
    return this._server.requestStream(server, t, n);
  }
  createMessageStream(request, resultSchema) {
    let n = this._server.getClientCapabilities();
    if ((request.tools || request.toolChoice) && !n?.sampling?.tools) throw Error("Client does not support sampling tools capability.");
    if (request.messages.length > 0) {
      let r = request.messages[request.messages.length - 1],
        o = Array.isArray(r.content) ? r.content : [r.content],
        s = o.some(c => c.type === "tool_result"),
        i = request.messages.length > 1 ? request.messages[request.messages.length - 2] : undefined,
        a = i ? Array.isArray(i.content) ? i.content : [i.content] : [],
        l = a.some(c => c.type === "tool_use");
      if (s) {
        if (o.some(c => c.type !== "tool_result")) throw Error("The last message must contain only tool_result content if any is present");
        if (!l) throw Error("tool_result blocks are not matching any tool_use from the previous message");
      }
      if (l) {
        let c = new Set(a.filter(d => d.type === "tool_use").map(d => d.id)),
          u = new Set(o.filter(d => d.type === "tool_result").map(d => d.toolUseId));
        if (c.size !== u.size || ![...c].every(d => u.has(d))) throw Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
      }
    }
    return this.requestStream({
      method: "sampling/createMessage",
      params: request
    }, OLe, resultSchema);
  }
  elicitInputStream(params, options) {
    let clientCapabilities = this._server.getClientCapabilities(),
      r = params.mode ?? "form";
    switch (r) {
      case "url":
        {
          if (!clientCapabilities?.elicitation?.url) throw Error("Client does not support url elicitation.");
          break;
        }
      case "form":
        {
          if (!clientCapabilities?.elicitation?.form) throw Error("Client does not support form elicitation.");
          break;
        }
    }
    let o = r === "form" && params.mode === undefined ? {
      ...params,
      mode: "form"
    } : params;
    return this.requestStream({
      method: "elicitation/create",
      params: o
    }, _Se, options);
  }
  async getTask(params, options) {
    return this._server.getTask({
      taskId: params
    }, options);
  }
  async getTaskResult(taskId, options, n) {
    return this._server.getTaskResult({
      taskId: taskId
    }, options, n);
  }
  async listTasks(taskId, options) {
    return this._server.listTasks(taskId ? {
      cursor: taskId
    } : undefined, options);
  }
  async cancelTask(cursor, options) {
    return this._server.cancelTask({
      taskId: cursor
    }, options);
  }
}
var emq = b(() => {
  HS();
});
export {s78 as Khr,emq as gYo};
