// @ts-nocheck
import {b} from "../../runtime.ts";
import {lfr as Vlr,PCt as MTt,etn as DXt} from "../../vendor/m353.ts";
import {Qy as HS,HCt as DTt,gmr as elr,Ien as lXt,Amr as llr,_5 as Nj,li as Bi,_i as zi,Rpe as Qde,VU as A2,Ren as rXt,Vre as Mre,Ape as Xde,ICt as PTt,KMe as OLe,hEe as _Se,Hmr as mlr} from "../tools/0325_ttl.ts";
import {Vhr as kur,sAt as lSt} from "../../vendor/m425.ts";
import {oze as jGe,Gre as Lre,Q9 as g3,WU as m2} from "../../vendor/m313.ts";
import {gYo as p5o,Khr as Hur} from "../core/0427_method.ts";
// @ts-nocheck
function assertServerTaskRequestCapability(requestCapabilities, method, role) {
  if (!requestCapabilities) throw Error(`${role} does not support task creation (required for ${method})`);
  switch (method) {
    case "tools/call":
      if (!requestCapabilities.tools?.call) throw Error(`${role} does not support task creation for tools/call (required for ${method})`);
      break;
    default:
      break;
  }
}
function assertClientTaskRequestCapability(requestCapabilities, method, role) {
  if (!requestCapabilities) throw Error(`${role} does not support task creation (required for ${method})`);
  switch (method) {
    case "sampling/createMessage":
      if (!requestCapabilities.sampling?.createMessage) throw Error(`${role} does not support task creation for sampling/createMessage (required for ${method})`);
      break;
    case "elicitation/create":
      if (!requestCapabilities.elicitation?.create) throw Error(`${role} does not support task creation for elicitation/create (required for ${method})`);
      break;
    default:
      break;
  }
}
var McpServer;
var initMcpServerModule = b(() => {
  Vlr();
  HS();
  kur();
  jGe();
  p5o();
  McpServer = class McpServer extends MTt {
    constructor(e, t) {
      super(t);
      if (this._serverInfo = e, this._loggingLevels = new Map(), this.LOG_LEVEL_SEVERITY = new Map(DTt.options.map((n, r) => [n, r])), this.isMessageIgnored = (n, r) => {
        let o = this._loggingLevels.get(r);
        return o ? this.LOG_LEVEL_SEVERITY.get(n) < this.LOG_LEVEL_SEVERITY.get(o) : false;
      }, this._capabilities = t?.capabilities ?? {}, this._instructions = t?.instructions, this._jsonSchemaValidator = t?.jsonSchemaValidator ?? new lSt(), this.setRequestHandler(elr, n => this._oninitialize(n)), this.setNotificationHandler(lXt, () => this.oninitialized?.()), this._capabilities.logging) this.setRequestHandler(llr, async (n, r) => {
        let o = r.sessionId || r.requestInfo?.headers["mcp-session-id"] || undefined,
          {
            level: s
          } = n.params,
          i = DTt.safeParse(s);
        if (i.success) this._loggingLevels.set(o, i.data);
        return {};
      });
    }
    get experimental() {
      if (!this._experimental) this._experimental = {
        tasks: new Hur(this)
      };
      return this._experimental;
    }
    registerCapabilities(e) {
      if (this.transport) throw Error("Cannot register capabilities after connecting to transport");
      this._capabilities = DXt(this._capabilities, e);
    }
    setRequestHandler(e, t) {
      let r = Lre(e)?.method;
      if (!r) throw Error("Schema is missing a method literal");
      let o;
      if (g3(r)) {
        let i = r;
        o = i._zod?.def?.value ?? i.value;
      } else {
        let i = r;
        o = i._def?.value ?? i.value;
      }
      if (typeof o !== "string") throw Error("Schema method literal must be a string");
      if (o === "tools/call") {
        let i = async (a, l) => {
          let c = m2(Nj, a);
          if (!c.success) {
            let m = c.error instanceof Error ? c.error.message : String(c.error);
            throw new Bi(zi.InvalidParams, `Invalid tools/call request: ${m}`);
          }
          let {
              params: u
            } = c.data,
            d = await Promise.resolve(t(a, l));
          if (u.task) {
            let m = m2(Qde, d);
            if (!m.success) {
              let f = m.error instanceof Error ? m.error.message : String(m.error);
              throw new Bi(zi.InvalidParams, `Invalid task creation result: ${f}`);
            }
            return m.data;
          }
          let p = m2(A2, d);
          if (!p.success) {
            let m = p.error instanceof Error ? p.error.message : String(p.error);
            throw new Bi(zi.InvalidParams, `Invalid tools/call result: ${m}`);
          }
          return p.data;
        };
        return super.setRequestHandler(e, i);
      }
      return super.setRequestHandler(e, t);
    }
    assertCapabilityForMethod(e) {
      switch (e) {
        case "sampling/createMessage":
          if (!this._clientCapabilities?.sampling) throw Error(`Client does not support sampling (required for ${e})`);
          break;
        case "elicitation/create":
          if (!this._clientCapabilities?.elicitation) throw Error(`Client does not support elicitation (required for ${e})`);
          break;
        case "roots/list":
          if (!this._clientCapabilities?.roots) throw Error(`Client does not support listing roots (required for ${e})`);
          break;
        case "ping":
          break;
      }
    }
    assertNotificationCapability(e) {
      switch (e) {
        case "notifications/message":
          if (!this._capabilities.logging) throw Error(`Server does not support logging (required for ${e})`);
          break;
        case "notifications/resources/updated":
        case "notifications/resources/list_changed":
          if (!this._capabilities.resources) throw Error(`Server does not support notifying about resources (required for ${e})`);
          break;
        case "notifications/tools/list_changed":
          if (!this._capabilities.tools) throw Error(`Server does not support notifying of tool list changes (required for ${e})`);
          break;
        case "notifications/prompts/list_changed":
          if (!this._capabilities.prompts) throw Error(`Server does not support notifying of prompt list changes (required for ${e})`);
          break;
        case "notifications/elicitation/complete":
          if (!this._clientCapabilities?.elicitation?.url) throw Error(`Client does not support URL elicitation (required for ${e})`);
          break;
        case "notifications/cancelled":
          break;
        case "notifications/progress":
          break;
      }
    }
    assertRequestHandlerCapability(e) {
      if (!this._capabilities) return;
      switch (e) {
        case "completion/complete":
          if (!this._capabilities.completions) throw Error(`Server does not support completions (required for ${e})`);
          break;
        case "logging/setLevel":
          if (!this._capabilities.logging) throw Error(`Server does not support logging (required for ${e})`);
          break;
        case "prompts/get":
        case "prompts/list":
          if (!this._capabilities.prompts) throw Error(`Server does not support prompts (required for ${e})`);
          break;
        case "resources/list":
        case "resources/templates/list":
        case "resources/read":
          if (!this._capabilities.resources) throw Error(`Server does not support resources (required for ${e})`);
          break;
        case "tools/call":
        case "tools/list":
          if (!this._capabilities.tools) throw Error(`Server does not support tools (required for ${e})`);
          break;
        case "tasks/get":
        case "tasks/list":
        case "tasks/result":
        case "tasks/cancel":
          if (!this._capabilities.tasks) throw Error(`Server does not support tasks capability (required for ${e})`);
          break;
        case "ping":
        case "initialize":
          break;
      }
    }
    assertTaskCapability(e) {
      assertClientTaskRequestCapability(this._clientCapabilities?.tasks?.requests, e, "Client");
    }
    assertTaskHandlerCapability(e) {
      if (!this._capabilities) return;
      assertServerTaskRequestCapability(this._capabilities.tasks?.requests, e, "Server");
    }
    async _oninitialize(e) {
      let t = e.params.protocolVersion;
      return this._clientCapabilities = e.params.capabilities, this._clientVersion = e.params.clientInfo, {
        protocolVersion: rXt.includes(t) ? t : Mre,
        capabilities: this.getCapabilities(),
        serverInfo: this._serverInfo,
        ...(this._instructions && {
          instructions: this._instructions
        })
      };
    }
    getClientCapabilities() {
      return this._clientCapabilities;
    }
    getClientVersion() {
      return this._clientVersion;
    }
    getCapabilities() {
      return this._capabilities;
    }
    async ping() {
      return this.request({
        method: "ping"
      }, Xde);
    }
    async createMessage(method, t) {
      if (method.tools || method.toolChoice) {
        if (!this._clientCapabilities?.sampling?.tools) throw Error("Client does not support sampling tools capability.");
      }
      if (method.messages.length > 0) {
        let n = method.messages[method.messages.length - 1],
          r = Array.isArray(n.content) ? n.content : [n.content],
          o = r.some(l => l.type === "tool_result"),
          s = method.messages.length > 1 ? method.messages[method.messages.length - 2] : undefined,
          i = s ? Array.isArray(s.content) ? s.content : [s.content] : [],
          a = i.some(l => l.type === "tool_use");
        if (o) {
          if (r.some(l => l.type !== "tool_result")) throw Error("The last message must contain only tool_result content if any is present");
          if (!a) throw Error("tool_result blocks are not matching any tool_use from the previous message");
        }
        if (a) {
          let l = new Set(i.filter(u => u.type === "tool_use").map(u => u.id)),
            c = new Set(r.filter(u => u.type === "tool_result").map(u => u.toolUseId));
          if (l.size !== c.size || ![...l].every(u => c.has(u))) throw Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
        }
      }
      if (method.tools) return this.request({
        method: "sampling/createMessage",
        params: method
      }, PTt, t);
      return this.request({
        method: "sampling/createMessage",
        params: method
      }, OLe, t);
    }
    async elicitInput(method, t) {
      switch (method.mode ?? "form") {
        case "url":
          {
            if (!this._clientCapabilities?.elicitation?.url) throw Error("Client does not support url elicitation.");
            let r = method;
            return this.request({
              method: "elicitation/create",
              params: r
            }, _Se, t);
          }
        case "form":
          {
            if (!this._clientCapabilities?.elicitation?.form) throw Error("Client does not support form elicitation.");
            let r = method.mode === "form" ? method : {
                ...method,
                mode: "form"
              },
              o = await this.request({
                method: "elicitation/create",
                params: r
              }, _Se, t);
            if (o.action === "accept" && o.content && r.requestedSchema) try {
              let i = this._jsonSchemaValidator.getValidator(r.requestedSchema)(o.content);
              if (!i.valid) throw new Bi(zi.InvalidParams, `Elicitation response content does not match requested schema: ${i.errorMessage}`);
            } catch (s) {
              if (s instanceof Bi) throw s;
              throw new Bi(zi.InternalError, `Error validating elicitation response: ${s instanceof Error ? s.message : String(s)}`);
            }
            return o;
          }
      }
    }
    createElicitationCompletionNotifier(method, t) {
      if (!this._clientCapabilities?.elicitation?.url) throw Error("Client does not support URL elicitation (required for notifications/elicitation/complete)");
      return () => this.notification({
        method: "notifications/elicitation/complete",
        params: {
          elicitationId: method
        }
      }, t);
    }
    async listRoots(method, t) {
      return this.request({
        method: "roots/list",
        params: method
      }, mlr, t);
    }
    async sendLoggingMessage(method, t) {
      if (this._capabilities.logging) {
        if (!this.isMessageIgnored(method.level, t)) return this.notification({
          method: "notifications/message",
          params: method
        });
      }
    }
    async sendResourceUpdated(request) {
      return this.notification({
        method: "notifications/resources/updated",
        params: request
      });
    }
    async sendResourceListChanged() {
      return this.notification({
        method: "notifications/resources/list_changed"
      });
    }
    async sendToolListChanged() {
      return this.notification({
        method: "notifications/tools/list_changed"
      });
    }
    async sendPromptListChanged() {
      return this.notification({
        method: "notifications/prompts/list_changed"
      });
    }
  };
});
export {assertServerTaskRequestCapability as Ftn,assertClientTaskRequestCapability as Btn,McpServer as Ipe,initMcpServerModule as iAt};
