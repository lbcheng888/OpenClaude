// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Qr as a8} from "../../vendor/m323.ts";
import {lmr as Jq8,PS as ZJ,ir as z8,ag as rY,looseObject as xR,Sa as SK,fc as Z1,lA as CX,sa as MK,GU as OI,gCt as Ew_,qT as Sj,OS as GJ,Cen as Nr_,rC as NM,_en as Zr_,ben as hr_} from "../../vendor/m318.ts";
import {sze as PcH} from "../../vendor/m315.ts";
/**
 * Model Context Protocol (MCP) wire-format schema definitions.
 *
 * This module is a 1:1 port of the official `@modelcontextprotocol/sdk` `types.ts`.
 * It declares the full set of Zod schemas describing the JSON-RPC envelope and
 * every MCP request / response / notification (initialize, tools, resources,
 * prompts, sampling, elicitation, completion, roots, logging, tasks, ...), plus
 * the `McpError` error class and its URL-elicitation subclass.
 *
 * Naming note: the upstream Zod-like schema constructors are imported under
 * minified aliases. Their semantics (confirmed against the MCP SDK):
 *   z8()        -> z.string()
 *   rY()        -> z.number()
 *   Sj()        -> z.boolean()
 *   CX()        -> z.unknown()
 *   SK({...})   -> z.object({...})
 *   xR({...})   -> z.object({...}).passthrough()   (loose/open object)
 *   OI([...])   -> z.enum([...])
 *   MK(x)       -> z.array(x)
 *   NM(x)       -> x.nullable().optional()         (optional-nullable wrapper)
 *   Z1(lit)     -> z.literal(lit)
 *   ZJ([...])   -> z.union([...])
 *   GJ(k, v)    -> z.record(k, v)
 *   Ew_(a, b)   -> a.and(b)                         (intersection)
 *   Nr_(fn, s)  -> z.preprocess(fn, s)
 *   hr_(k,[...]) -> z.discriminatedUnion(k, [...])
 *   Zr_()       -> z.null()
 *   Jq8(pred)   -> z.custom(pred)
 *   PcH         -> z.string() (datetime builder)
 *   L(fn)       -> deferred module-initializer (lazy `__esm`-style wrapper)
 */

/**
 * Validate that a `completion/complete` request references a prompt.
 * Throws TypeError when the ref is not of type "ref/prompt".
 */
function YIq(request) {
  if (request.params.ref.type !== "ref/prompt") throw TypeError(`Expected CompleteRequestPrompt, but got ${request.params.ref.type}`);
}

/**
 * Validate that a `completion/complete` request references a resource template.
 * Throws TypeError when the ref is not of type "ref/resource".
 */
function AIq(request) {
  if (request.params.ref.type !== "ref/resource") throw TypeError(`Expected CompleteRequestResourceTemplate, but got ${request.params.ref.type}`);
}

/** Latest MCP protocol revision date this client implements. */
var i6H = "2025-11-25",
  /** Schema: predicate that a value is an MCP-protocol-versioned client info object. */
  yr_,
  /** `_meta` key used to associate a request with a related task. */
  r6H = "io.modelcontextprotocol/related-task",
  /** JSON-RPC protocol version literal. */
  vr_ = "2.0",
  /** Schema: any non-null object or function. */
  hh,
  /** Schema: progress token (string or integer). */
  ibq,
  /** Schema: opaque pagination cursor (string). */
  rbq,
  /** Schema: client task hints (`ttl`, `pollInterval`). */
  mnT,
  /** Schema: server task acknowledgement augmentation (`ttl`). */
  Jz1,
  /** Schema: related-task reference (`taskId`). */
  Pq8,
  /** Schema: request `_meta` (progress token + related task). */
  Wq8,
  /** Schema: base params object carrying optional `_meta`. */
  _F,
  /** Schema: request params extended with optional `task`. */
  Cw_,
  /** Type guard for {@link Cw_} (request-with-task params). */
  obq = candidate => Cw_.safeParse(candidate).success,
  /** Schema: generic JSON-RPC request (method + params). */
  Vy,
  /** Schema: notification base params (with `_meta`). */
  Kl,
  /** Schema: generic JSON-RPC notification (method + params). */
  Ol,
  /** Schema: generic JSON-RPC result base (with `_meta`). */
  yy,
  /** Schema: JSON-RPC request id (string or integer). */
  Er_,
  /** Schema: a full JSON-RPC request frame. */
  abq,
  /** Type guard for {@link abq} (JSON-RPC request). */
  JNH = candidate => abq.safeParse(candidate).success,
  /** Schema: a full JSON-RPC notification frame. */
  sbq,
  /** Type guard for {@link sbq} (JSON-RPC notification). */
  Sr_ = candidate => sbq.safeParse(candidate).success,
  /** Schema: a successful JSON-RPC response frame. */
  Zq8,
  /** Type guard for {@link Zq8} (JSON-RPC success response). */
  DNH = candidate => Zq8.safeParse(candidate).success,
  /** Enum: standard JSON-RPC / MCP error codes. */
  F7,
  /** Schema: a JSON-RPC error response frame. */
  Gq8,
  /** Type guard for {@link Gq8} (JSON-RPC error response). */
  tbq = candidate => Gq8.safeParse(candidate).success,
  /** Schema: any JSON-RPC message (request | notification | response | error). */
  o6H,
  /** Schema: a JSON-RPC response (success | error). */
  pnT,
  /** Schema: empty result. */
  e5H,
  /** Schema: cancelled-notification params. */
  Dz1,
  /** Schema: `notifications/cancelled`. */
  Cr_,
  /** Schema: an icon descriptor (src/mimeType/sizes/theme). */
  Mz1,
  /** Schema: object carrying optional `icons`. */
  bw_,
  /** Schema: base named entity (name/title). */
  GcH,
  /** Schema: implementation/client info (name/version/icons/...). */
  ebq,
  /** Schema: elicitation form capability descriptor. */
  Xz1,
  /** Schema: elicitation capability (form/url). */
  Pz1,
  /** Schema: client tasks capability. */
  Wz1,
  /** Schema: server tasks capability. */
  Zz1,
  /** Schema: client capabilities. */
  Gz1,
  /** Schema: `initialize` request params. */
  Rz1,
  /** Schema: `initialize` request. */
  Rq8,
  /** Schema: server capabilities. */
  Lz1,
  /** Schema: `initialize` result. */
  Iw_,
  /** Schema: `notifications/initialized`. */
  br_,
  /** Type guard for {@link br_} (initialized notification). */
  HIq = candidate => br_.safeParse(candidate).success,
  /** Schema: `ping` request. */
  Ir_,
  /** Schema: progress payload (progress/total/message). */
  hz1,
  /** Schema: progress-notification params. */
  kz1,
  /** Schema: `notifications/progress`. */
  xr_,
  /** Schema: paginated request params (optional cursor). */
  Nz1,
  /** Schema: paginated request. */
  xw_,
  /** Schema: paginated result (optional nextCursor). */
  uw_,
  /** Enum: task status values. */
  Vz1,
  /** Schema: task metadata object. */
  mw_,
  /** Schema: result containing a task. */
  H3H,
  /** Schema: task-status notification params. */
  yz1,
  /** Schema: `notifications/tasks/status`. */
  MNH,
  /** Schema: `tasks/get` request. */
  ur_,
  /** Schema: `tasks/get` result. */
  mr_,
  /** Schema: `tasks/result` request. */
  pr_,
  /** Schema: `tasks/result` result (loose). */
  BnT,
  /** Schema: `tasks/list` request. */
  Br_,
  /** Schema: `tasks/list` result. */
  Ur_,
  /** Schema: `tasks/cancel` request. */
  Fr_,
  /** Schema: `tasks/cancel` result. */
  _Iq,
  /** Schema: base resource-contents descriptor. */
  qIq,
  /** Schema: text resource contents. */
  KIq,
  /** Schema: base64-encoded string (validated via atob). */
  Lq8,
  /** Schema: blob resource contents. */
  OIq,
  /** Enum: message role (user/assistant). */
  pw_,
  /** Schema: content annotations (audience/priority/lastModified). */
  RcH,
  /** Schema: a resource descriptor. */
  TIq,
  /** Schema: a resource-template descriptor. */
  vz1,
  /** Schema: `resources/list` request. */
  gr_,
  /** Schema: `resources/list` result. */
  Bw_,
  /** Schema: `resources/templates/list` request. */
  Qr_,
  /** Schema: `resources/templates/list` result. */
  Uw_,
  /** Schema: request params carrying a `uri`. */
  hq8,
  /** Schema: `resources/read` params. */
  Ez1,
  /** Schema: `resources/read` request. */
  cr_,
  /** Schema: `resources/read` result (contents). */
  RjH,
  /** Schema: `notifications/resources/list_changed`. */
  Fw_,
  /** Schema: `resources/subscribe` params. */
  Sz1,
  /** Schema: `resources/subscribe` request. */
  Cz1,
  /** Schema: `resources/unsubscribe` params. */
  bz1,
  /** Schema: `resources/unsubscribe` request. */
  Iz1,
  /** Schema: resource-updated notification params. */
  xz1,
  /** Schema: `notifications/resources/updated`. */
  uz1,
  /** Schema: a prompt argument descriptor. */
  mz1,
  /** Schema: a prompt descriptor. */
  pz1,
  /** Schema: `prompts/list` request. */
  dr_,
  /** Schema: `prompts/list` result. */
  gw_,
  /** Schema: `prompts/get` params. */
  Bz1,
  /** Schema: `prompts/get` request. */
  lr_,
  /** Schema: text content block. */
  kq8,
  /** Schema: image content block. */
  Nq8,
  /** Schema: audio content block. */
  Vq8,
  /** Schema: tool-use content block. */
  Uz1,
  /** Schema: embedded-resource content block. */
  Fz1,
  /** Schema: resource-link content block. */
  gz1,
  /** Schema: union of all standard content blocks. */
  yq8,
  /** Schema: a prompt message (role + content). */
  Qz1,
  /** Schema: `prompts/get` result. */
  vq8,
  /** Schema: `notifications/prompts/list_changed`. */
  Qw_,
  /** Schema: tool annotations (hints). */
  cz1,
  /** Schema: tool execution config (taskSupport). */
  dz1,
  /** Schema: a tool descriptor (name/inputSchema/outputSchema/...). */
  zIq,
  /** Schema: `tools/list` request. */
  Tl,
  /** Schema: `tools/list` result. */
  LcH,
  /** Schema: `tools/call` result. */
  TI,
  /** Schema: `tools/call` result allowing legacy `toolResult`. */
  UnT,
  /** Schema: `tools/call` params. */
  lz1,
  /** Schema: `tools/call` request. */
  qF,
  /** Schema: `notifications/tools/list_changed`. */
  XNH,
  /** Schema: tool list-change auto-refresh config. */
  $Iq,
  /** Enum: logging levels (syslog severities). */
  cw_,
  /** Schema: `logging/setLevel` params. */
  nz1,
  /** Schema: `logging/setLevel` request. */
  Eq8,
  /** Schema: logging-message notification params. */
  iz1,
  /** Schema: `notifications/message`. */
  rz1,
  /** Schema: a model hint. */
  oz1,
  /** Schema: model preferences (hints/priorities). */
  az1,
  /** Schema: sampling tool-choice config. */
  sz1,
  /** Schema: tool-result content block (for sampling). */
  tz1,
  /** Schema: sampling content (text/image/audio discriminated union). */
  ez1,
  /** Schema: sampling message content (incl. tool_use/tool_result). */
  Vr_,
  /** Schema: a sampling message (role + content). */
  H$1,
  /** Schema: `sampling/createMessage` params. */
  _$1,
  /** Schema: `sampling/createMessage` request. */
  Sq8,
  /** Schema: `sampling/createMessage` result. */
  PNH,
  /** Schema: `sampling/createMessage` result allowing tool-use stop reason. */
  dw_,
  /** Schema: boolean elicitation field. */
  q$1,
  /** Schema: string elicitation field. */
  K$1,
  /** Schema: number/integer elicitation field. */
  O$1,
  /** Schema: enum (string) elicitation field. */
  T$1,
  /** Schema: oneOf (const/title) string elicitation field. */
  z$1,
  /** Schema: enum-with-names elicitation field. */
  $$1,
  /** Schema: union of primitive string enum elicitation fields. */
  Y$1,
  /** Schema: string-array (enum) elicitation field. */
  A$1,
  /** Schema: string-array (anyOf const) elicitation field. */
  w$1,
  /** Schema: union of array elicitation fields. */
  f$1,
  /** Schema: union of complex elicitation fields. */
  j$1,
  /** Schema: union of all primitive elicitation schema fields. */
  J$1,
  /** Schema: form-mode elicitation request params. */
  D$1,
  /** Schema: url-mode elicitation request params. */
  Cq8,
  /** Schema: union of elicitation request params (form | url). */
  M$1,
  /** Schema: `elicitation/create` request. */
  _3H,
  /** Schema: elicitation-complete notification params. */
  X$1,
  /** Schema: `notifications/elicitation/complete`. */
  lw_,
  /** Schema: `elicitation/create` result (action + content). */
  LjH,
  /** Schema: completion ref to a resource. */
  P$1,
  /** Schema: completion ref to a prompt. */
  W$1,
  /** Schema: `completion/complete` params. */
  Z$1,
  /** Schema: `completion/complete` request. */
  nr_,
  /** Schema: `completion/complete` result. */
  bq8,
  /** Schema: a workspace root descriptor. */
  G$1,
  /** Schema: `roots/list` request. */
  Iq8,
  /** Schema: `roots/list` result. */
  xq8,
  /** Schema: `notifications/roots/list_changed`. */
  R$1,
  /** Schema: union of all client-originated requests. */
  FnT,
  /** Schema: union of all client-originated notifications. */
  gnT,
  /** Schema: union of all client-originated results. */
  QnT,
  /** Schema: union of all server-originated requests. */
  cnT,
  /** Schema: union of all server-originated notifications. */
  dnT,
  /** Schema: union of all server-originated results. */
  lnT,
  /** Error class for MCP JSON-RPC errors. */
  S7,
  /** Error subclass signalling that URL elicitation is required. */
  wIq;

/**
 * Lazy module initializer: populates every schema/enum/class binding declared
 * above. Wrapped in `L(...)` so construction is deferred until first use.
 */
var ZD = L(() => {
  a8();
  yr_ = [i6H, "2025-06-18", "2025-03-26", "2024-11-05", "2024-10-07"], hh = Jq8(value => value !== null && (typeof value === "object" || typeof value === "function")), ibq = ZJ([z8(), rY().int()]), rbq = z8(), mnT = xR({
    ttl: rY().optional(),
    pollInterval: rY().optional()
  }), Jz1 = SK({
    ttl: rY().optional()
  }), Pq8 = SK({
    taskId: z8()
  }), Wq8 = xR({
    progressToken: ibq.optional(),
    [r6H]: Pq8.optional()
  }), _F = SK({
    _meta: Wq8.optional()
  }), Cw_ = _F.extend({
    task: Jz1.optional()
  }), Vy = SK({
    method: z8(),
    params: _F.loose().optional()
  }), Kl = SK({
    _meta: Wq8.optional()
  }), Ol = SK({
    method: z8(),
    params: Kl.loose().optional()
  }), yy = xR({
    _meta: Wq8.optional()
  }), Er_ = ZJ([z8(), rY().int()]), abq = SK({
    jsonrpc: Z1(vr_),
    id: Er_,
    ...Vy.shape
  }).strict(), sbq = SK({
    jsonrpc: Z1(vr_),
    ...Ol.shape
  }).strict(), Zq8 = SK({
    jsonrpc: Z1(vr_),
    id: Er_,
    result: yy
  }).strict();
  (function (errorCodes) {
    errorCodes[errorCodes.ConnectionClosed = -32000] = "ConnectionClosed", errorCodes[errorCodes.RequestTimeout = -32001] = "RequestTimeout", errorCodes[errorCodes.ParseError = -32700] = "ParseError", errorCodes[errorCodes.InvalidRequest = -32600] = "InvalidRequest", errorCodes[errorCodes.MethodNotFound = -32601] = "MethodNotFound", errorCodes[errorCodes.InvalidParams = -32602] = "InvalidParams", errorCodes[errorCodes.InternalError = -32603] = "InternalError", errorCodes[errorCodes.UrlElicitationRequired = -32042] = "UrlElicitationRequired";
  })(F7 || (F7 = {}));
  Gq8 = SK({
    jsonrpc: Z1(vr_),
    id: Er_.optional(),
    error: SK({
      code: rY().int(),
      message: z8(),
      data: CX().optional()
    })
  }).strict(), o6H = ZJ([abq, sbq, Zq8, Gq8]), pnT = ZJ([Zq8, Gq8]), e5H = yy.strict(), Dz1 = Kl.extend({
    requestId: Er_.optional(),
    reason: z8().optional()
  }), Cr_ = Ol.extend({
    method: Z1("notifications/cancelled"),
    params: Dz1
  }), Mz1 = SK({
    src: z8(),
    mimeType: z8().optional(),
    sizes: MK(z8()).optional(),
    theme: OI(["light", "dark"]).optional()
  }), bw_ = SK({
    icons: MK(Mz1).optional()
  }), GcH = SK({
    name: z8(),
    title: z8().optional()
  }), ebq = GcH.extend({
    ...GcH.shape,
    ...bw_.shape,
    version: z8(),
    websiteUrl: z8().optional(),
    description: z8().optional()
  }), Xz1 = Ew_(SK({
    applyDefaults: Sj().optional()
  }), GJ(z8(), CX())), Pz1 = Nr_(elicitation => {
    if (elicitation && typeof elicitation === "object" && !Array.isArray(elicitation)) {
      if (Object.keys(elicitation).length === 0) return {
        form: {}
      };
    }
    return elicitation;
  }, Ew_(SK({
    form: Xz1.optional(),
    url: hh.optional()
  }), GJ(z8(), CX()).optional())), Wz1 = xR({
    list: hh.optional(),
    cancel: hh.optional(),
    requests: xR({
      sampling: xR({
        createMessage: hh.optional()
      }).optional(),
      elicitation: xR({
        create: hh.optional()
      }).optional()
    }).optional()
  }), Zz1 = xR({
    list: hh.optional(),
    cancel: hh.optional(),
    requests: xR({
      tools: xR({
        call: hh.optional()
      }).optional()
    }).optional()
  }), Gz1 = SK({
    experimental: GJ(z8(), hh).optional(),
    sampling: SK({
      context: hh.optional(),
      tools: hh.optional()
    }).optional(),
    elicitation: Pz1.optional(),
    roots: SK({
      listChanged: Sj().optional()
    }).optional(),
    tasks: Wz1.optional(),
    extensions: GJ(z8(), hh).optional()
  }), Rz1 = _F.extend({
    protocolVersion: z8(),
    capabilities: Gz1,
    clientInfo: ebq
  }), Rq8 = Vy.extend({
    method: Z1("initialize"),
    params: Rz1
  }), Lz1 = SK({
    experimental: GJ(z8(), hh).optional(),
    logging: hh.optional(),
    completions: hh.optional(),
    prompts: SK({
      listChanged: Sj().optional()
    }).optional(),
    resources: SK({
      subscribe: Sj().optional(),
      listChanged: Sj().optional()
    }).optional(),
    tools: SK({
      listChanged: Sj().optional()
    }).optional(),
    tasks: Zz1.optional(),
    extensions: GJ(z8(), hh).optional()
  }), Iw_ = yy.extend({
    protocolVersion: z8(),
    capabilities: Lz1,
    serverInfo: ebq,
    instructions: z8().optional()
  }), br_ = Ol.extend({
    method: Z1("notifications/initialized"),
    params: Kl.optional()
  }), Ir_ = Vy.extend({
    method: Z1("ping"),
    params: _F.optional()
  }), hz1 = SK({
    progress: rY(),
    total: NM(rY()),
    message: NM(z8())
  }), kz1 = SK({
    ...Kl.shape,
    ...hz1.shape,
    progressToken: ibq
  }), xr_ = Ol.extend({
    method: Z1("notifications/progress"),
    params: kz1
  }), Nz1 = _F.extend({
    cursor: rbq.optional()
  }), xw_ = Vy.extend({
    params: Nz1.optional()
  }), uw_ = yy.extend({
    nextCursor: rbq.optional()
  }), Vz1 = OI(["working", "input_required", "completed", "failed", "cancelled"]), mw_ = SK({
    taskId: z8(),
    status: Vz1,
    ttl: ZJ([rY(), Zr_()]),
    createdAt: z8(),
    lastUpdatedAt: z8(),
    pollInterval: NM(rY()),
    statusMessage: NM(z8())
  }), H3H = yy.extend({
    task: mw_
  }), yz1 = Kl.merge(mw_), MNH = Ol.extend({
    method: Z1("notifications/tasks/status"),
    params: yz1
  }), ur_ = Vy.extend({
    method: Z1("tasks/get"),
    params: _F.extend({
      taskId: z8()
    })
  }), mr_ = yy.merge(mw_), pr_ = Vy.extend({
    method: Z1("tasks/result"),
    params: _F.extend({
      taskId: z8()
    })
  }), BnT = yy.loose(), Br_ = xw_.extend({
    method: Z1("tasks/list")
  }), Ur_ = uw_.extend({
    tasks: MK(mw_)
  }), Fr_ = Vy.extend({
    method: Z1("tasks/cancel"),
    params: _F.extend({
      taskId: z8()
    })
  }), _Iq = yy.merge(mw_), qIq = SK({
    uri: z8(),
    mimeType: NM(z8()),
    _meta: GJ(z8(), CX()).optional()
  }), KIq = qIq.extend({
    text: z8()
  }), Lq8 = z8().refine(base64 => {
    try {
      return atob(base64), !0;
    } catch {
      return !1;
    }
  }, {
    message: "Invalid Base64 string"
  }), OIq = qIq.extend({
    blob: Lq8
  }), pw_ = OI(["user", "assistant"]), RcH = SK({
    audience: MK(pw_).optional(),
    priority: rY().min(0).max(1).optional(),
    lastModified: PcH.datetime({
      offset: !0
    }).optional()
  }), TIq = SK({
    ...GcH.shape,
    ...bw_.shape,
    uri: z8(),
    description: NM(z8()),
    mimeType: NM(z8()),
    size: NM(rY()),
    annotations: RcH.optional(),
    _meta: NM(xR({}))
  }), vz1 = SK({
    ...GcH.shape,
    ...bw_.shape,
    uriTemplate: z8(),
    description: NM(z8()),
    mimeType: NM(z8()),
    annotations: RcH.optional(),
    _meta: NM(xR({}))
  }), gr_ = xw_.extend({
    method: Z1("resources/list")
  }), Bw_ = uw_.extend({
    resources: MK(TIq)
  }), Qr_ = xw_.extend({
    method: Z1("resources/templates/list")
  }), Uw_ = uw_.extend({
    resourceTemplates: MK(vz1)
  }), hq8 = _F.extend({
    uri: z8()
  }), Ez1 = hq8, cr_ = Vy.extend({
    method: Z1("resources/read"),
    params: Ez1
  }), RjH = yy.extend({
    contents: MK(ZJ([KIq, OIq]))
  }), Fw_ = Ol.extend({
    method: Z1("notifications/resources/list_changed"),
    params: Kl.optional()
  }), Sz1 = hq8, Cz1 = Vy.extend({
    method: Z1("resources/subscribe"),
    params: Sz1
  }), bz1 = hq8, Iz1 = Vy.extend({
    method: Z1("resources/unsubscribe"),
    params: bz1
  }), xz1 = Kl.extend({
    uri: z8()
  }), uz1 = Ol.extend({
    method: Z1("notifications/resources/updated"),
    params: xz1
  }), mz1 = SK({
    name: z8(),
    description: NM(z8()),
    required: NM(Sj())
  }), pz1 = SK({
    ...GcH.shape,
    ...bw_.shape,
    description: NM(z8()),
    arguments: NM(MK(mz1)),
    _meta: NM(xR({}))
  }), dr_ = xw_.extend({
    method: Z1("prompts/list")
  }), gw_ = uw_.extend({
    prompts: MK(pz1)
  }), Bz1 = _F.extend({
    name: z8(),
    arguments: GJ(z8(), z8()).optional()
  }), lr_ = Vy.extend({
    method: Z1("prompts/get"),
    params: Bz1
  }), kq8 = SK({
    type: Z1("text"),
    text: z8(),
    annotations: RcH.optional(),
    _meta: GJ(z8(), CX()).optional()
  }), Nq8 = SK({
    type: Z1("image"),
    data: Lq8,
    mimeType: z8(),
    annotations: RcH.optional(),
    _meta: GJ(z8(), CX()).optional()
  }), Vq8 = SK({
    type: Z1("audio"),
    data: Lq8,
    mimeType: z8(),
    annotations: RcH.optional(),
    _meta: GJ(z8(), CX()).optional()
  }), Uz1 = SK({
    type: Z1("tool_use"),
    name: z8(),
    id: z8(),
    input: GJ(z8(), CX()),
    _meta: GJ(z8(), CX()).optional()
  }), Fz1 = SK({
    type: Z1("resource"),
    resource: ZJ([KIq, OIq]),
    annotations: RcH.optional(),
    _meta: GJ(z8(), CX()).optional()
  }), gz1 = TIq.extend({
    type: Z1("resource_link")
  }), yq8 = ZJ([kq8, Nq8, Vq8, gz1, Fz1]), Qz1 = SK({
    role: pw_,
    content: yq8
  }), vq8 = yy.extend({
    description: z8().optional(),
    messages: MK(Qz1)
  }), Qw_ = Ol.extend({
    method: Z1("notifications/prompts/list_changed"),
    params: Kl.optional()
  }), cz1 = SK({
    title: z8().optional(),
    readOnlyHint: Sj().optional(),
    destructiveHint: Sj().optional(),
    idempotentHint: Sj().optional(),
    openWorldHint: Sj().optional()
  }), dz1 = SK({
    taskSupport: OI(["required", "optional", "forbidden"]).optional()
  }), zIq = SK({
    ...GcH.shape,
    ...bw_.shape,
    description: z8().optional(),
    inputSchema: SK({
      type: Z1("object"),
      properties: GJ(z8(), hh).optional(),
      required: MK(z8()).optional()
    }).catchall(CX()),
    outputSchema: SK({
      type: Z1("object"),
      properties: GJ(z8(), hh).optional(),
      required: MK(z8()).optional()
    }).catchall(CX()).optional(),
    annotations: cz1.optional(),
    execution: dz1.optional(),
    _meta: GJ(z8(), CX()).optional()
  }), Tl = xw_.extend({
    method: Z1("tools/list")
  }), LcH = uw_.extend({
    tools: MK(zIq)
  }), TI = yy.extend({
    content: MK(yq8).default([]),
    structuredContent: GJ(z8(), CX()).optional(),
    isError: Sj().optional()
  }), UnT = TI.or(yy.extend({
    toolResult: CX()
  })), lz1 = Cw_.extend({
    name: z8(),
    arguments: GJ(z8(), CX()).optional()
  }), qF = Vy.extend({
    method: Z1("tools/call"),
    params: lz1
  }), XNH = Ol.extend({
    method: Z1("notifications/tools/list_changed"),
    params: Kl.optional()
  }), $Iq = SK({
    autoRefresh: Sj().default(!0),
    debounceMs: rY().int().nonnegative().default(300)
  }), cw_ = OI(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]), nz1 = _F.extend({
    level: cw_
  }), Eq8 = Vy.extend({
    method: Z1("logging/setLevel"),
    params: nz1
  }), iz1 = Kl.extend({
    level: cw_,
    logger: z8().optional(),
    data: CX()
  }), rz1 = Ol.extend({
    method: Z1("notifications/message"),
    params: iz1
  }), oz1 = SK({
    name: z8().optional()
  }), az1 = SK({
    hints: MK(oz1).optional(),
    costPriority: rY().min(0).max(1).optional(),
    speedPriority: rY().min(0).max(1).optional(),
    intelligencePriority: rY().min(0).max(1).optional()
  }), sz1 = SK({
    mode: OI(["auto", "required", "none"]).optional()
  }), tz1 = SK({
    type: Z1("tool_result"),
    toolUseId: z8().describe("The unique identifier for the corresponding tool call."),
    content: MK(yq8).default([]),
    structuredContent: SK({}).loose().optional(),
    isError: Sj().optional(),
    _meta: GJ(z8(), CX()).optional()
  }), ez1 = hr_("type", [kq8, Nq8, Vq8]), Vr_ = hr_("type", [kq8, Nq8, Vq8, Uz1, tz1]), H$1 = SK({
    role: pw_,
    content: ZJ([Vr_, MK(Vr_)]),
    _meta: GJ(z8(), CX()).optional()
  }), _$1 = Cw_.extend({
    messages: MK(H$1),
    modelPreferences: az1.optional(),
    systemPrompt: z8().optional(),
    includeContext: OI(["none", "thisServer", "allServers"]).optional(),
    temperature: rY().optional(),
    maxTokens: rY().int(),
    stopSequences: MK(z8()).optional(),
    metadata: hh.optional(),
    tools: MK(zIq).optional(),
    toolChoice: sz1.optional()
  }), Sq8 = Vy.extend({
    method: Z1("sampling/createMessage"),
    params: _$1
  }), PNH = yy.extend({
    model: z8(),
    stopReason: NM(OI(["endTurn", "stopSequence", "maxTokens"]).or(z8())),
    role: pw_,
    content: ez1
  }), dw_ = yy.extend({
    model: z8(),
    stopReason: NM(OI(["endTurn", "stopSequence", "maxTokens", "toolUse"]).or(z8())),
    role: pw_,
    content: ZJ([Vr_, MK(Vr_)])
  }), q$1 = SK({
    type: Z1("boolean"),
    title: z8().optional(),
    description: z8().optional(),
    default: Sj().optional()
  }), K$1 = SK({
    type: Z1("string"),
    title: z8().optional(),
    description: z8().optional(),
    minLength: rY().optional(),
    maxLength: rY().optional(),
    format: OI(["email", "uri", "date", "date-time"]).optional(),
    default: z8().optional()
  }), O$1 = SK({
    type: OI(["number", "integer"]),
    title: z8().optional(),
    description: z8().optional(),
    minimum: rY().optional(),
    maximum: rY().optional(),
    default: rY().optional()
  }), T$1 = SK({
    type: Z1("string"),
    title: z8().optional(),
    description: z8().optional(),
    enum: MK(z8()),
    default: z8().optional()
  }), z$1 = SK({
    type: Z1("string"),
    title: z8().optional(),
    description: z8().optional(),
    oneOf: MK(SK({
      const: z8(),
      title: z8()
    })),
    default: z8().optional()
  }), $$1 = SK({
    type: Z1("string"),
    title: z8().optional(),
    description: z8().optional(),
    enum: MK(z8()),
    enumNames: MK(z8()).optional(),
    default: z8().optional()
  }), Y$1 = ZJ([T$1, z$1]), A$1 = SK({
    type: Z1("array"),
    title: z8().optional(),
    description: z8().optional(),
    minItems: rY().optional(),
    maxItems: rY().optional(),
    items: SK({
      type: Z1("string"),
      enum: MK(z8())
    }),
    default: MK(z8()).optional()
  }), w$1 = SK({
    type: Z1("array"),
    title: z8().optional(),
    description: z8().optional(),
    minItems: rY().optional(),
    maxItems: rY().optional(),
    items: SK({
      anyOf: MK(SK({
        const: z8(),
        title: z8()
      }))
    }),
    default: MK(z8()).optional()
  }), f$1 = ZJ([A$1, w$1]), j$1 = ZJ([$$1, Y$1, f$1]), J$1 = ZJ([j$1, q$1, K$1, O$1]), D$1 = Cw_.extend({
    mode: Z1("form").optional(),
    message: z8(),
    requestedSchema: SK({
      type: Z1("object"),
      properties: GJ(z8(), J$1),
      required: MK(z8()).optional()
    })
  }), Cq8 = Cw_.extend({
    mode: Z1("url"),
    message: z8(),
    elicitationId: z8(),
    url: z8().url()
  }), M$1 = ZJ([D$1, Cq8]), _3H = Vy.extend({
    method: Z1("elicitation/create"),
    params: M$1
  }), X$1 = Kl.extend({
    elicitationId: z8()
  }), lw_ = Ol.extend({
    method: Z1("notifications/elicitation/complete"),
    params: X$1
  }), LjH = yy.extend({
    action: OI(["accept", "decline", "cancel"]),
    content: Nr_(content => content === null ? void 0 : content, GJ(z8(), ZJ([z8(), rY(), Sj(), MK(z8())])).optional())
  }), P$1 = SK({
    type: Z1("ref/resource"),
    uri: z8()
  }), W$1 = SK({
    type: Z1("ref/prompt"),
    name: z8()
  }), Z$1 = _F.extend({
    ref: ZJ([W$1, P$1]),
    argument: SK({
      name: z8(),
      value: z8()
    }),
    context: SK({
      arguments: GJ(z8(), z8()).optional()
    }).optional()
  }), nr_ = Vy.extend({
    method: Z1("completion/complete"),
    params: Z$1
  });
  bq8 = yy.extend({
    completion: xR({
      values: MK(z8()).max(100),
      total: NM(rY().int()),
      hasMore: NM(Sj())
    })
  }), G$1 = SK({
    uri: z8().startsWith("file://"),
    name: z8().optional(),
    _meta: GJ(z8(), CX()).optional()
  }), Iq8 = Vy.extend({
    method: Z1("roots/list"),
    params: _F.optional()
  }), xq8 = yy.extend({
    roots: MK(G$1)
  }), R$1 = Ol.extend({
    method: Z1("notifications/roots/list_changed"),
    params: Kl.optional()
  }), FnT = ZJ([Ir_, Rq8, nr_, Eq8, lr_, dr_, gr_, Qr_, cr_, Cz1, Iz1, qF, Tl, ur_, pr_, Br_, Fr_]), gnT = ZJ([Cr_, xr_, br_, R$1, MNH]), QnT = ZJ([e5H, PNH, dw_, LjH, xq8, mr_, Ur_, H3H]), cnT = ZJ([Ir_, Sq8, _3H, Iq8, ur_, pr_, Br_, Fr_]), dnT = ZJ([Cr_, xr_, rz1, uz1, Fw_, XNH, Qw_, MNH, lw_]), lnT = ZJ([e5H, Iw_, bq8, vq8, gw_, Bw_, Uw_, RjH, TI, LcH, mr_, Ur_, H3H]);
  S7 = class S7 extends Error {
    constructor(code: number, message: string, data?: unknown) {
      super(`MCP error ${code}: ${message}`);
      this.code = code, this.data = data, this.name = "McpError";
    }
    static fromError(code: number, message: string, data?: unknown) {
      if (code === F7.UrlElicitationRequired && data) {
        let detail = data as {
          elicitations?: unknown;
        };
        if (detail.elicitations) return new wIq(detail.elicitations, message);
      }
      return new S7(code, message, data);
    }
  };
  wIq = class wIq extends S7 {
    constructor(elicitations: unknown, message: string = `URL elicitation${(elicitations as unknown[]).length > 1 ? "s" : ""} required`) {
      super(F7.UrlElicitationRequired, message, {
        elicitations
      });
    }
    get elicitations() {
      return (this.data as {
        elicitations?: unknown[];
      })?.elicitations ?? [];
    }
  };
});
export {YIq as RKo,AIq as vKo,i6H as Vre,yr_ as Ren,r6H as Kre,vr_ as ven,hh as Xx,ibq as uKo,rbq as dKo,mnT as dgf,Jz1 as bDc,Pq8 as pmr,Wq8 as mmr,_F as g5,Cw_ as yCt,obq as pKo,Vy as tM,Kl as SK,Ol as UuidSchema,yy as nM,Er_ as wen,abq as mKo,JNH as $Me,sbq as fKo,Sr_ as ken,Zq8 as fmr,DNH as qMe,F7 as _i,Gq8 as hmr,tbq as hKo,o6H as zre,pnT as pgf,e5H as Ape,Dz1 as EDc,Cr_ as Hen,Mz1 as CDc,bw_ as TCt,GcH as cze,ebq as gKo,Xz1 as ADc,Pz1 as RDc,Wz1 as vDc,Zz1 as wDc,Gz1 as kDc,Rz1 as HDc,Rq8 as gmr,Lz1 as IDc,Iw_ as SCt,br_ as Ien,HIq as _Ko,Ir_ as xen,hz1 as xDc,kz1 as DDc,xr_ as Den,Nz1 as PDc,xw_ as bCt,uw_ as ECt,Vz1 as ODc,mw_ as CCt,H3H as Rpe,yz1 as LDc,MNH as WMe,ur_ as Pen,mr_ as Oen,pr_ as Len,BnT as mgf,Br_ as Men,Ur_ as Nen,Fr_ as Fen,_Iq as yKo,qIq as TKo,KIq as SKo,Lq8 as _mr,OIq as bKo,pw_ as ACt,RcH as uze,TIq as EKo,vz1 as MDc,gr_ as Ben,Bw_ as GMe,Qr_ as Uen,Uw_ as RCt,hq8 as ymr,Ez1 as NDc,cr_ as $en,RjH as jre,Fw_ as vCt,Sz1 as FDc,Cz1 as BDc,bz1 as UDc,Iz1 as $Dc,xz1 as qDc,uz1 as WDc,mz1 as GDc,pz1 as VDc,dr_ as qen,gw_ as wCt,Bz1 as KDc,lr_ as Wen,kq8 as Tmr,Nq8 as Smr,Vq8 as bmr,Uz1 as zDc,Fz1 as jDc,gz1 as YDc,yq8 as Emr,Qz1 as JDc,vq8 as Cmr,Qw_ as kCt,cz1 as XDc,dz1 as QDc,zIq as CKo,Tl as EK,LcH as dze,TI as VU,UnT as fgf,lz1 as ZDc,qF as _5,XNH as VMe,$Iq as AKo,cw_ as HCt,nz1 as ePc,Eq8 as Amr,iz1 as tPc,rz1 as nPc,oz1 as rPc,az1 as oPc,sz1 as sPc,tz1 as iPc,ez1 as aPc,Vr_ as Aen,H$1 as lPc,_$1 as cPc,Sq8 as Rmr,PNH as KMe,dw_ as ICt,q$1 as uPc,K$1 as dPc,O$1 as pPc,T$1 as mPc,z$1 as fPc,$$1 as hPc,Y$1 as gPc,A$1 as _Pc,w$1 as yPc,f$1 as TPc,j$1 as SPc,J$1 as bPc,D$1 as EPc,Cq8 as vmr,M$1 as CPc,_3H as vpe,X$1 as APc,lw_ as xCt,LjH as hEe,P$1 as RPc,W$1 as vPc,Z$1 as wPc,nr_ as Gen,bq8 as wmr,G$1 as kPc,Iq8 as kmr,xq8 as Hmr,R$1 as HPc,FnT as hgf,gnT as ggf,QnT as _gf,cnT as ygf,dnT as Tgf,lnT as Sgf,S7 as li,wIq as wKo,ZD as Qy};
