// @ts-nocheck
import {Cnt as ant,NRn as Qwn,che as KAe} from "../../vendor/m2776.ts";
import {VMt as bMt,NKr as q7r} from "../../vendor/m3195.ts";
import {out as Dct,j$t as C$t} from "../tui/4071_answers.ts";
import {yd,YA as JA,ng as Jh} from "../../vendor/m132.ts";
import {ER as bR,bB as mB} from "../../vendor/m634.ts";
import {Pn as Dn,bt as St} from "../../vendor/m195.ts";
import {DP as IP,IP as HP,yx as Ax} from "../core/5144_encoding.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function Xk(H) {
  if (H === 9 || H === 10) return false;
  return H < 32 || H >= 127 && H <= 159;
}
function v_q(H) {
  for (let t = 0; t < H.length; t++) if (Xk(H.charCodeAt(t))) return false;
  return true;
}
function IZK(H) {
  let _ = "";
  for (let n = 0; n < H.length; n++) _ += Xk(H.charCodeAt(n)) ? "\uFFFD" : H[n];
  return _;
}
function Xk_2(H) {
  let _ = H.tool.userFacingName(H.input),
    q = _.endsWith(" (MCP)"),
    K = q ? _.slice(0, -6) : _,
    o = H.tool.renderToolUseMessage(H.input, {
      theme: H.theme,
      verbose: true
    });
  return {
    requestId: H.toolUseID,
    toolName: H.tool.name,
    input: H.input,
    description: H.description,
    permissionResult: H.permissionResult,
    userFacingName: K,
    hasMcpSuffix: q,
    renderedToolUseMessage: o,
    messageId: H.assistantMessage.message.id,
    isMcp: H.tool.isMcp ?? false,
    isAskCappedByOrg: H.tool.mcpInfo?.effectiveMaxPermission === "ask",
    showAlwaysAllow: ant(),
    workerBadge: H.workerBadge,
    requestSource: H.requestSource
  };
}
function uZK(H) {
  let _ = H.spawnedByWorkflowRunId;
  if (_ === undefined) return;
  let K;
  for (let r of Object.values(H.taskRegistry.all())) if (r.type === "local_workflow" && r.workflowRunId === _) {
    K = r.workflowName;
    break;
  }
  return {
    type: "workflow-agent",
    workflowName: K
  };
}
function mZK(H) {
  let _ = Xk_2(H),
    q = H.permissionResult.metadata?.command?.chrome;
  if (!q && typeof H.input.url === "string") try {
    let r = new URL(H.input.url);
    if (r.host) q = {
      host: r.host,
      url: r.href
    };
  } catch {}
  return {
    ..._,
    chrome: q,
    verbPhrase: bMt(H.tool.name, H.input)
  };
}
function pZK(H) {
  let _ = Xk_2(H),
    q = H.input.url,
    K = "";
  if (typeof q === "string") try {
    K = new URL(q).hostname;
  } catch {
    K = "";
  }
  return {
    ..._,
    hostname: K
  };
}
function BZK(H) {
  let _ = Xk_2(H),
    q = Dct.inputSchema.safeParse(H.input),
    K = q.success ? q.data.questions ?? [] : [],
    T = q.success ? q.data.metadata?.source : undefined;
  return {
    ..._,
    questions: K,
    metadataSource: T
  };
}
function UZK(H) {
  let _ = Xk_2(H),
    q = typeof H.input.command === "string" ? IZK(H.input.command) : undefined,
    K = H.input.mcp,
    O = K !== null && typeof K === "object" && "server" in K && typeof K.server === "string" && "tool" in K && typeof K.tool === "string" ? {
      server: IZK(K.server),
      tool: IZK(K.tool)
    } : undefined,
    T = typeof H.input.interval_ms === "number" ? H.input.interval_ms : 30000,
    $ = typeof H.input.description === "string" ? IZK(H.input.description) : undefined;
  return {
    ..._,
    command: q,
    mcp: O,
    intervalMs: T,
    monitorDescription: $
  };
}
function FZK(H) {
  let _ = Xk_2(H),
    q = typeof H.input.script === "string" ? H.input.script : "",
    r = typeof H.input.name === "string" && H.input.name !== "" ? H.input.name : undefined,
    o = H.input.args;
  return {
    ..._,
    script: q,
    workflowName: r,
    args: o
  };
}
function gZK(H) {
  let _ = Xk_2(H),
    q = typeof H.input.filePath === "string" ? H.input.filePath : "",
    K = typeof H.input.title === "string" ? H.input.title : "",
    O = (Array.isArray(H.input.options) ? H.input.options : []).filter(a => a !== null && typeof a === "object" && "label" in a && typeof a.label === "string" && "description" in a && typeof a.description === "string" && "value" in a && typeof a.value === "string").map(a => ({
      label: a.label,
      description: a.description,
      value: a.value
    })),
    T;
  if (yd(q) && !JA(q)) T = `(Network path \u2014 content not previewed: ${q})`;else try {
    T = bR(q);
  } catch (a) {
    T = Dn(a) ? `(File not found: ${q})` : `(Error reading file: ${String(a)})`;
  }
  return {
    ..._,
    filePath: q,
    artifactTitle: K,
    artifactOptions: O,
    fileContent: T
  };
}
function Cv6(H) {
  let _ = Xk_2(H),
    q = H.permissionResult.metadata,
    K = q !== null && typeof q === "object" && "command" in q && q.command !== null && typeof q.command === "object" ? q.command : undefined,
    o = K !== undefined && typeof K.name === "string" ? K.name : undefined,
    s = K !== undefined && typeof K.description === "string" ? K.description : undefined,
    a = (typeof H.input.skill === "string" ? H.input.skill : undefined) ?? o ?? "";
  return {
    ..._,
    skill: a,
    skillDescription: s
  };
}
function yUa(e) {
  let t = Xk_2(e),
    n = typeof e.input.command === "string" ? e.input.command : "";
  return {
    ...t,
    command: n
  };
}
function TUa(e) {
  let t = Xk_2(e),
    n = IP() ?? "",
    r = HP(),
    o = Array.isArray(e.input.allowedPrompts) ? e.input.allowedPrompts : undefined,
    s = e.assistantMessage.message.usage,
    i = s && typeof s.input_tokens === "number" ? {
      input_tokens: s.input_tokens,
      cache_creation_input_tokens: s.cache_creation_input_tokens,
      cache_read_input_tokens: s.cache_read_input_tokens
    } : undefined;
  return {
    ...t,
    plan: n,
    planFilePath: r,
    allowedPrompts: o,
    usage: i
  };
}
function S2n(e) {
  let t = Xk_2(e),
    n = typeof e.input.command === "string" ? e.input.command : "",
    r = Qwn(e.toolPermissionContext);
  return {
    ...t,
    command: n,
    classifierState: e.classifierState,
    existingAllowDescriptions: r
  };
}
var b2n = b(() => {
  C$t();
  Jh();
  q7r();
  St();
  mB();
  KAe();
  Ax();
});

export {Xk as D2a,v_q as P2a,IZK as W$t,Xk_2 as HP,uZK as Vlo,mZK as O2a,pZK as L2a,BZK as M2a,UZK as N2a,FZK as B2a,gZK as F2a,Cv6 as U2a,yUa as $2a,TUa as q2a,S2n as a$n,b2n as l$n};
