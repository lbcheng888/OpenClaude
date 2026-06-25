// @ts-nocheck
import {Ipe as rpe,iAt as cSt} from "../session/0428_level.ts";
import {EK as NV,_5 as Nj,li as Bi,_i as zi,Gen as bXt,RKo as Sqo,vKo as bqo,Ben as gXt,Uen as _Xt,$en as yXt,qen as TXt,Wen as SXt,Qy as HS} from "./0325_ttl.ts";
import {rze as qGe,sen as NJt,ien as BJt,Gre as Lre,UMe as kLe,bVo as g4o,EVo as _4o,aen as FJt,oze as jGe} from "../../vendor/m313.ts";
import {ofr as qlr,afr as Glr} from "../../vendor/m352.ts";
import {Qxo as Fwo,jFl as QHl,YFl as ZHl} from "../../vendor/m5103.ts";
import {ZodOptional as Pj} from "../../vendor/m252.ts";
import {Zxo as Uwo,JFl as eIl} from "../../vendor/m5104.ts";
import {b} from "../../runtime.ts";
import {MS as dw} from "../../vendor/m460.ts";
// @ts-nocheck
class TaskToolNamespace {
  constructor(H) {
    this._mcpServer = H;
  }
  registerToolTask(H, _, q) {
    let K = {
      taskSupport: "required",
      ..._.execution
    };
    if (K.taskSupport === "forbidden") throw Error(`Cannot register task-based tool '${H}' with taskSupport 'forbidden'. Use registerTool() instead.`);
    return this._mcpServer._createRegisteredTool(H, _.title, _.description, _.inputSchema, _.outputSchema, _.annotations, K, _._meta, q);
  }
}
class TaskAwareMcpServer {
  constructor(H, _) {
    this._registeredResources = {}, this._registeredResourceTemplates = {}, this._registeredTools = {}, this._registeredPrompts = {}, this._toolHandlersInitialized = false, this._completionHandlerInitialized = false, this._resourceHandlersInitialized = false, this._promptHandlersInitialized = false, this.server = new rpe(H, _);
  }
  get experimental() {
    if (!this._experimental) this._experimental = {
      tasks: new TaskToolNamespace(this)
    };
    return this._experimental;
  }
  async connect(H) {
    return await this.server.connect(H);
  }
  async close() {
    await this.server.close();
  }
  setToolRequestHandlers() {
    if (this._toolHandlersInitialized) return;
    this.server.assertCanSetRequestHandler(schemaMethodName(NV)), this.server.assertCanSetRequestHandler(schemaMethodName(Nj)), this.server.registerCapabilities({
      tools: {
        listChanged: true
      }
    }), this.server.setRequestHandler(NV, () => ({
      tools: Object.entries(this._registeredTools).filter(([, H]) => H.enabled).map(([H, _]) => {
        let q = {
          name: H,
          title: _.title,
          description: _.description,
          inputSchema: (() => {
            let K = qGe(_.inputSchema);
            return K ? qlr(K, {
              strictUnions: true,
              pipeStrategy: "input"
            }) : kqT;
          })(),
          annotations: _.annotations,
          execution: _.execution,
          _meta: _._meta
        };
        if (_.outputSchema) {
          let K = qGe(_.outputSchema);
          if (K) q.outputSchema = qlr(K, {
            strictUnions: true,
            pipeStrategy: "output"
          });
        }
        return q;
      })
    })), this.server.setRequestHandler(Nj, async (H, _) => {
      try {
        let q = this._registeredTools[H.params.name];
        if (!q) throw new Bi(zi.InvalidParams, `Tool ${H.params.name} not found`);
        if (!q.enabled) throw new Bi(zi.InvalidParams, `Tool ${H.params.name} disabled`);
        let K = !!H.params.task,
          O = q.execution?.taskSupport,
          T = "createTask" in q.handler;
        if ((O === "required" || O === "optional") && !T) throw new Bi(zi.InternalError, `Tool ${H.params.name} has taskSupport '${O}' but was not registered with registerToolTask`);
        if (O === "required" && !K) throw new Bi(zi.MethodNotFound, `Tool ${H.params.name} requires task augmentation (taskSupport: 'required')`);
        if (O === "optional" && !K && T) return await this.handleAutomaticTaskPolling(q, H, _);
        let z = await this.validateToolInput(q, H.params.arguments, H.params.name),
          $ = await this.executeToolHandler(q, z, _);
        if (K) return $;
        return await this.validateToolOutput(q, $, H.params.name), $;
      } catch (q) {
        if (q instanceof Bi) {
          if (q.code === zi.UrlElicitationRequired) throw q;
        }
        return this.createToolError(q instanceof Error ? q.message : String(q));
      }
    }), this._toolHandlersInitialized = true;
  }
  createToolError(H) {
    return {
      content: [{
        type: "text",
        text: H
      }],
      isError: true
    };
  }
  async validateToolInput(H, _, q) {
    if (!H.inputSchema) return;
    let O = qGe(H.inputSchema) ?? H.inputSchema,
      T = await NJt(O, _);
    if (!T.success) {
      let z = "error" in T ? T.error : "Unknown error",
        $ = BJt(z);
      throw new Bi(zi.InvalidParams, `Input validation error: Invalid arguments for tool ${q}: ${$}`);
    }
    return T.data;
  }
  async validateToolOutput(H, _, q) {
    if (!H.outputSchema) return;
    if (!("content" in _)) return;
    if (_.isError) return;
    if (!_.structuredContent) throw new Bi(zi.InvalidParams, `Output validation error: Tool ${q} has an output schema but no structured content was provided`);
    let K = qGe(H.outputSchema),
      O = await NJt(K, _.structuredContent);
    if (!O.success) {
      let T = "error" in O ? O.error : "Unknown error",
        z = BJt(T);
      throw new Bi(zi.InvalidParams, `Output validation error: Invalid structured content for tool ${q}: ${z}`);
    }
  }
  async executeToolHandler(H, _, q) {
    let K = H.handler;
    if ("createTask" in K) {
      if (!q.taskStore) throw Error("No task store provided.");
      let T = {
        ...q,
        taskStore: q.taskStore
      };
      if (H.inputSchema) return await Promise.resolve(K.createTask(_, T));else return await Promise.resolve(K.createTask(T));
    }
    if (H.inputSchema) return await Promise.resolve(K(_, q));else return await Promise.resolve(K(q));
  }
  async handleAutomaticTaskPolling(H, _, q) {
    if (!q.taskStore) throw Error("No task store provided for task-capable tool.");
    let K = await this.validateToolInput(H, _.params.arguments, _.params.name),
      O = H.handler,
      T = {
        ...q,
        taskStore: q.taskStore
      },
      z = K ? await Promise.resolve(O.createTask(K, T)) : await Promise.resolve(O.createTask(T)),
      $ = z.task.taskId,
      Y = z.task,
      A = Y.pollInterval ?? 5000;
    while (Y.status !== "completed" && Y.status !== "failed" && Y.status !== "cancelled") {
      await new Promise(f => setTimeout(f, A));
      let w = await q.taskStore.getTask($);
      if (!w) throw new Bi(zi.InternalError, `Task ${$} not found during polling`);
      Y = w;
    }
    return await q.taskStore.getTaskResult($);
  }
  setCompletionRequestHandler() {
    if (this._completionHandlerInitialized) return;
    this.server.assertCanSetRequestHandler(schemaMethodName(bXt)), this.server.registerCapabilities({
      completions: {}
    }), this.server.setRequestHandler(bXt, async H => {
      switch (H.params.ref.type) {
        case "ref/prompt":
          return Sqo(H), this.handlePromptCompletion(H, H.params.ref);
        case "ref/resource":
          return bqo(H), this.handleResourceCompletion(H, H.params.ref);
        default:
          throw new Bi(zi.InvalidParams, `Invalid completion reference: ${H.params.ref}`);
      }
    }), this._completionHandlerInitialized = true;
  }
  async handlePromptCompletion(H, _) {
    let q = this._registeredPrompts[_.name];
    if (!q) throw new Bi(zi.InvalidParams, `Prompt ${_.name} not found`);
    if (!q.enabled) throw new Bi(zi.InvalidParams, `Prompt ${_.name} disabled`);
    if (!q.argsSchema) return oB_;
    let O = Lre(q.argsSchema)?.[H.params.argument.name];
    if (!Fwo(O)) return oB_;
    let T = QHl(O);
    if (!T) return oB_;
    let z = await T(H.params.argument.value, H.params.context);
    return buildCompletionResult(z);
  }
  async handleResourceCompletion(H, _) {
    let q = Object.values(this._registeredResourceTemplates).find(T => T.resourceTemplate.uriTemplate.toString() === _.uri);
    if (!q) {
      if (this._registeredResources[_.uri]) return oB_;
      throw new Bi(zi.InvalidParams, `Resource template ${H.params.ref.uri} not found`);
    }
    let K = q.resourceTemplate.completeCallback(H.params.argument.name);
    if (!K) return oB_;
    let O = await K(H.params.argument.value, H.params.context);
    return buildCompletionResult(O);
  }
  setResourceRequestHandlers() {
    if (this._resourceHandlersInitialized) return;
    this.server.assertCanSetRequestHandler(schemaMethodName(gXt)), this.server.assertCanSetRequestHandler(schemaMethodName(_Xt)), this.server.assertCanSetRequestHandler(schemaMethodName(yXt)), this.server.registerCapabilities({
      resources: {
        listChanged: true
      }
    }), this.server.setRequestHandler(gXt, async (H, _) => {
      let q = Object.entries(this._registeredResources).filter(([O, T]) => T.enabled).map(([O, T]) => ({
          uri: O,
          name: T.name,
          ...T.metadata
        })),
        K = [];
      for (let O of Object.values(this._registeredResourceTemplates)) {
        if (!O.resourceTemplate.listCallback) continue;
        let T = await O.resourceTemplate.listCallback(_);
        for (let z of T.resources) K.push({
          ...O.metadata,
          ...z
        });
      }
      return {
        resources: [...q, ...K]
      };
    }), this.server.setRequestHandler(_Xt, async () => ({
      resourceTemplates: Object.entries(this._registeredResourceTemplates).map(([t, n]) => ({
        name: t,
        uriTemplate: n.resourceTemplate.uriTemplate.toString(),
        ...n.metadata
      }))
    })), this.server.setRequestHandler(yXt, async (H, _) => {
      let q = new URL(H.params.uri),
        K = this._registeredResources[q.toString()];
      if (K) {
        if (!K.enabled) throw new Bi(zi.InvalidParams, `Resource ${q} disabled`);
        return K.readCallback(q, _);
      }
      for (let O of Object.values(this._registeredResourceTemplates)) {
        let T = O.resourceTemplate.uriTemplate.match(q.toString());
        if (T) return O.readCallback(q, T, _);
      }
      throw new Bi(zi.InvalidParams, `Resource ${q} not found`);
    }), this._resourceHandlersInitialized = true;
  }
  setPromptRequestHandlers() {
    if (this._promptHandlersInitialized) return;
    this.server.assertCanSetRequestHandler(schemaMethodName(TXt)), this.server.assertCanSetRequestHandler(schemaMethodName(SXt)), this.server.registerCapabilities({
      prompts: {
        listChanged: true
      }
    }), this.server.setRequestHandler(TXt, () => ({
      prompts: Object.entries(this._registeredPrompts).filter(([, H]) => H.enabled).map(([H, _]) => ({
        name: H,
        title: _.title,
        description: _.description,
        arguments: _.argsSchema ? schemaShapeToPromptArguments(_.argsSchema) : undefined
      }))
    })), this.server.setRequestHandler(SXt, async (H, _) => {
      let q = this._registeredPrompts[H.params.name];
      if (!q) throw new Bi(zi.InvalidParams, `Prompt ${H.params.name} not found`);
      if (!q.enabled) throw new Bi(zi.InvalidParams, `Prompt ${H.params.name} disabled`);
      if (q.argsSchema) {
        let K = qGe(q.argsSchema),
          O = await NJt(K, H.params.arguments);
        if (!O.success) {
          let $ = "error" in O ? O.error : "Unknown error",
            Y = BJt($);
          throw new Bi(zi.InvalidParams, `Invalid arguments for prompt ${H.params.name}: ${Y}`);
        }
        let T = O.data,
          z = q.callback;
        return await Promise.resolve(z(T, _));
      } else {
        let K = q.callback;
        return await Promise.resolve(K(_));
      }
    }), this._promptHandlersInitialized = true;
  }
  resource(H, _, ...q) {
    let K;
    if (typeof q[0] === "object") K = q.shift();
    let O = q[0];
    if (typeof _ === "string") {
      if (this._registeredResources[_]) throw Error(`Resource ${_} is already registered`);
      let T = this._createRegisteredResource(H, undefined, _, K, O);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), T;
    } else {
      if (this._registeredResourceTemplates[H]) throw Error(`Resource template ${H} is already registered`);
      let T = this._createRegisteredResourceTemplate(H, undefined, _, K, O);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), T;
    }
  }
  registerResource(H, _, q, K) {
    if (typeof _ === "string") {
      if (this._registeredResources[_]) throw Error(`Resource ${_} is already registered`);
      let O = this._createRegisteredResource(H, q.title, _, q, K);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), O;
    } else {
      if (this._registeredResourceTemplates[H]) throw Error(`Resource template ${H} is already registered`);
      let O = this._createRegisteredResourceTemplate(H, q.title, _, q, K);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), O;
    }
  }
  _createRegisteredResource(H, _, q, K, O) {
    let T = {
      name: H,
      title: _,
      metadata: K,
      readCallback: O,
      enabled: true,
      disable: () => T.update({
        enabled: false
      }),
      enable: () => T.update({
        enabled: true
      }),
      remove: () => T.update({
        uri: null
      }),
      update: z => {
        if (typeof z.uri < "u" && z.uri !== q) {
          if (delete this._registeredResources[q], z.uri) this._registeredResources[z.uri] = T;
        }
        if (typeof z.name < "u") T.name = z.name;
        if (typeof z.title < "u") T.title = z.title;
        if (typeof z.metadata < "u") T.metadata = z.metadata;
        if (typeof z.callback < "u") T.readCallback = z.callback;
        if (typeof z.enabled < "u") T.enabled = z.enabled;
        this.sendResourceListChanged();
      }
    };
    return this._registeredResources[q] = T, T;
  }
  _createRegisteredResourceTemplate(H, _, q, K, O) {
    let T = {
      resourceTemplate: q,
      title: _,
      metadata: K,
      readCallback: O,
      enabled: true,
      disable: () => T.update({
        enabled: false
      }),
      enable: () => T.update({
        enabled: true
      }),
      remove: () => T.update({
        name: null
      }),
      update: Y => {
        if (typeof Y.name < "u" && Y.name !== H) {
          if (delete this._registeredResourceTemplates[H], Y.name) this._registeredResourceTemplates[Y.name] = T;
        }
        if (typeof Y.title < "u") T.title = Y.title;
        if (typeof Y.template < "u") T.resourceTemplate = Y.template;
        if (typeof Y.metadata < "u") T.metadata = Y.metadata;
        if (typeof Y.callback < "u") T.readCallback = Y.callback;
        if (typeof Y.enabled < "u") T.enabled = Y.enabled;
        this.sendResourceListChanged();
      }
    };
    this._registeredResourceTemplates[H] = T;
    let z = q.uriTemplate.variableNames;
    if (Array.isArray(z) && z.some(Y => !!q.completeCallback(Y))) this.setCompletionRequestHandler();
    return T;
  }
  _createRegisteredPrompt(H, _, q, K, O) {
    let T = {
      title: _,
      description: q,
      argsSchema: K === undefined ? undefined : kLe(K),
      callback: O,
      enabled: true,
      disable: () => T.update({
        enabled: false
      }),
      enable: () => T.update({
        enabled: true
      }),
      remove: () => T.update({
        name: null
      }),
      update: z => {
        if (typeof z.name < "u" && z.name !== H) {
          if (delete this._registeredPrompts[H], z.name) this._registeredPrompts[z.name] = T;
        }
        if (typeof z.title < "u") T.title = z.title;
        if (typeof z.description < "u") T.description = z.description;
        if (typeof z.argsSchema < "u") T.argsSchema = kLe(z.argsSchema);
        if (typeof z.callback < "u") T.callback = z.callback;
        if (typeof z.enabled < "u") T.enabled = z.enabled;
        this.sendPromptListChanged();
      }
    };
    if (this._registeredPrompts[H] = T, K) {
      if (Object.values(K).some($ => {
        let Y = $ instanceof Pj ? $._def?.innerType : $;
        return Fwo(Y);
      })) this.setCompletionRequestHandler();
    }
    return T;
  }
  _createRegisteredTool(H, _, q, K, O, T, z, $, Y) {
    Uwo(H);
    let A = {
      title: _,
      description: q,
      inputSchema: normalizeToolSchema(K),
      outputSchema: normalizeToolSchema(O),
      annotations: T,
      execution: z,
      _meta: $,
      handler: Y,
      enabled: true,
      disable: () => A.update({
        enabled: false
      }),
      enable: () => A.update({
        enabled: true
      }),
      remove: () => A.update({
        name: null
      }),
      update: w => {
        if (typeof w.name < "u" && w.name !== H) {
          if (typeof w.name === "string") Uwo(w.name);
          if (delete this._registeredTools[H], w.name) this._registeredTools[w.name] = A;
        }
        if (typeof w.title < "u") A.title = w.title;
        if (typeof w.description < "u") A.description = w.description;
        if (typeof w.paramsSchema < "u") A.inputSchema = kLe(w.paramsSchema);
        if (typeof w.outputSchema < "u") A.outputSchema = kLe(w.outputSchema);
        if (typeof w.callback < "u") A.handler = w.callback;
        if (typeof w.annotations < "u") A.annotations = w.annotations;
        if (typeof w._meta < "u") A._meta = w._meta;
        if (typeof w.enabled < "u") A.enabled = w.enabled;
        this.sendToolListChanged();
      }
    };
    return this._registeredTools[H] = A, this.setToolRequestHandlers(), this.sendToolListChanged(), A;
  }
  tool(H, ..._) {
    if (this._registeredTools[H]) throw Error(`Tool ${H} is already registered`);
    let q, K, O, T;
    if (typeof _[0] === "string") q = _.shift();
    if (_.length > 1) {
      let $ = _[0];
      if (isRawShapeSchema($)) {
        if (K = _.shift(), _.length > 1 && typeof _[0] === "object" && _[0] !== null && !isRawShapeSchema(_[0])) T = _.shift();
      } else if (typeof $ === "object" && $ !== null) {
        if (Object.values($).some(Y => typeof Y === "object" && Y !== null)) throw Error(`Tool ${H} expected a Zod schema or ToolAnnotations, but received an unrecognized object`);
        T = _.shift();
      }
    }
    let z = _[0];
    return this._createRegisteredTool(H, undefined, q, K, O, T, {
      taskSupport: "forbidden"
    }, undefined, z);
  }
  registerTool(H, _, q) {
    if (this._registeredTools[H]) throw Error(`Tool ${H} is already registered`);
    let {
      title: K,
      description: O,
      inputSchema: T,
      outputSchema: z,
      annotations: $,
      _meta: Y
    } = _;
    return this._createRegisteredTool(H, K, O, T, z, $, {
      taskSupport: "forbidden"
    }, Y, q);
  }
  prompt(H, ..._) {
    if (this._registeredPrompts[H]) throw Error(`Prompt ${H} is already registered`);
    let q;
    if (typeof _[0] === "string") q = _.shift();
    let K;
    if (_.length > 1) K = _.shift();
    let O = _[0],
      T = this._createRegisteredPrompt(H, undefined, q, K, O);
    return this.setPromptRequestHandlers(), this.sendPromptListChanged(), T;
  }
  registerPrompt(H, _, q) {
    if (this._registeredPrompts[H]) throw Error(`Prompt ${H} is already registered`);
    let {
        title: K,
        description: O,
        argsSchema: T
      } = _,
      z = this._createRegisteredPrompt(H, K, O, T, q);
    return this.setPromptRequestHandlers(), this.sendPromptListChanged(), z;
  }
  isConnected() {
    return this.server.transport !== undefined;
  }
  async sendLoggingMessage(H, _) {
    return this.server.sendLoggingMessage(H, _);
  }
  sendResourceListChanged() {
    if (this.isConnected()) this.server.sendResourceListChanged();
  }
  sendToolListChanged() {
    if (this.isConnected()) this.server.sendToolListChanged();
  }
  sendPromptListChanged() {
    if (this.isConnected()) this.server.sendPromptListChanged();
  }
}
function isParserLikeSchema(H) {
  return H !== null && typeof H === "object" && "parse" in H && typeof H.parse === "function" && "safeParse" in H && typeof H.safeParse === "function";
}
function isZodLikeSchema(H) {
  return "_def" in H || "_zod" in H || isParserLikeSchema(H);
}
function isRawShapeSchema(H) {
  if (typeof H !== "object" || H === null) return false;
  if (isZodLikeSchema(H)) return false;
  if (Object.keys(H).length === 0) return true;
  return Object.values(H).some(isParserLikeSchema);
}
function normalizeToolSchema(H) {
  if (!H) return;
  if (isRawShapeSchema(H)) return kLe(H);
  if (!isZodLikeSchema(H)) throw Error("inputSchema must be a Zod schema or raw shape, received an unrecognized object");
  return H;
}
function schemaShapeToPromptArguments(H) {
  let _ = Lre(H);
  if (!_) return [];
  return Object.entries(_).map(([q, K]) => {
    let O = g4o(K),
      T = _4o(K);
    return {
      name: q,
      description: O,
      required: !T
    };
  });
}
function schemaMethodName(H) {
  let q = Lre(H)?.method;
  if (!q) throw Error("Schema is missing a method literal");
  let K = FJt(q);
  if (typeof K === "string") return K;
  throw Error("Schema method literal must be a string");
}
function buildCompletionResult(H) {
  return {
    completion: {
      values: H.slice(0, 100),
      total: H.length,
      hasMore: H.length > 100
    }
  };
}
var kqT, oB_;
var mP4 = b(() => {
  cSt();
  jGe();
  Glr();
  HS();
  ZHl();
  eIl();
  dw();
  kqT = {
    type: "object",
    properties: {}
  };
  oB_ = {
    completion: {
      values: [],
      hasMore: false
    }
  };
});
export {TaskToolNamespace as eDo,TaskAwareMcpServer as nDo,isParserLikeSchema as ZFl,isZodLikeSchema as eBl,isRawShapeSchema as tDo,normalizeToolSchema as XFl,schemaShapeToPromptArguments as kbm,schemaMethodName as aOe,buildCompletionResult as QFl,kqT as wbm,oB_ as lVt,mP4 as tBl};
