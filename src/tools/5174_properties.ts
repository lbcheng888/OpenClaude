// @ts-nocheck
import {bd as uz,z2 as vm} from "../../vendor/m1280.ts";
import {getCanonicalName as _9,Mo as iq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {ZHo as wPq,oG as aQ} from "../agent/5173_len.ts";
import {Di as Z7,dr as P8} from "../../vendor/m231.ts";
import {getAPIProvider as l8,isFirstPartyAnthropicBaseUrl as T3,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {Dh as GY,NH as WG} from "../config/2024_NH.ts";
import {$ti as w47,ykt as dz6} from "../../vendor/m2029.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,zn as o6} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {P0e as MRH,P6n as iu6} from "../../vendor/m4412.ts";
import {isAgentSwarmsEnabled as wK,cb as Lf} from "../config/3298_isAgentSwarmsEnabled.ts";
import {qBe as hEH,$Be as LEH,QCe as HXH,jR as LW} from "../config/2028_allowed.ts";
import {_l as P4,st as q_} from "../../vendor/m5.ts";
import {logForDebugging as N,qe as FH} from "../config/0234_setHasFormattedOutput.ts";
import {Le as bH,Xt as H6} from "../config/0228_encoding.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {SYSTEM_PROMPT_DYNAMIC_BOUNDARY as L8H} from "../../vendor/m718.ts";
import {uyn as Z$6,pyn as R$6} from "../core/2226_pyn.ts";
import {Ln as U6,lo as zq} from "./5190_userPromptCount.ts";
import {u$ as CI,s5 as mF} from "../config/2182_s5.ts";
import {d1t as pN_,O0 as WL} from "./3222_name.ts";
import {JL as BV,Y0 as uL} from "../artifact/4303_Y0.ts";
import {pS as ij,hE as rD,dq as Cp} from "../config/2722_duration_ms.ts";
import {Pt as u_,Go as Fq} from "../../vendor/m632.ts";
import {getFileReadIgnorePatterns as I8_,normalizePatternsToPath as b8_,nA as o$} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {mvn as cJ6,oee as we} from "../config/2670_cause.ts";
import {$f as Fz,HF as ZC} from "../core/2683_HF.ts";
import {De as EH,Rn as S6} from "../session/0615_length.ts";
import {Ws as V9,ef as lT} from "../../vendor/m2248.ts";
import {DP as Wk,IP as Pk,m$n as Uv6,yx as tW} from "../core/5144_encoding.ts";
import {VO as VN} from "../config/2251_zBr.ts";
import {Rl as R4,TU as Hb} from "../tui/4359_isSearch.ts";
import {zt as t_,qs as y9} from "../../vendor/m635.ts";
import {UD as Nh,L2 as DI} from "../config/0640_existsSync.ts";
import {IE as TM,MIe as sZH} from "./4336_content.ts";
import {yUa as $0K,ylo as H_q,wIe as UZH} from "../../vendor/m4047.ts";
import {_b as sJ,wce as w4H} from "./4066_file_path.ts";
import {K5 as De} from "../../vendor/m2693.ts";
import {b as L} from "../../runtime.ts";
import {Ri as M7} from "./2227_userFacingName.ts";
import {Ph as KA,Cs as G9} from "../../vendor/m2224.ts";
import {sn as A6} from "../config/0047_namespace.ts";
/** Restored Claude Code 2.1.177 module. Builds tool property descriptors and tool-use message helpers. */
function getToolPropertyNames(H: any): any {
  return toolPropertyDefaults ??= new Map(Object.values(uz).map((_: any): any => [_9(_.firstParty), _])), toolPropertyDefaults.get(_9(H));
}
function pickToolProperty(H: any, _: any): any {
  if (_.length === 0) return H;
  let q = H.properties;
  if (!q || typeof q !== "object") return H;
  let K = {
    ...q
  };
  for (let O of _) delete K[O];
  return {
    ...H,
    properties: K
  };
}
function mapToolProperty(H: any, _: any): any {
  return pickToolProperty(_, toolPropertySchema[H] ?? []);
}
async function filterToolProperties(H: any, _: any): any {
  if (!wPq()) return H.prompt(_);
  if (H.searchHint) return H.searchHint;
  let q = await H.prompt(_);
  return Z7(q, `

`).trim() || q;
}
async function normalizeToolProperties(H: any, _: any): any {
  let q = l8(),
    K = _.model ? getToolPropertyNames(_.model) : void 0,
    O = GY(_.model) ? "L:" : "",
    T = q === "vertex" && K?.eagerInputStreaming?.vertex || q === "bedrock" && K?.eagerInputStreaming?.bedrock ? "F:" : "",
    z = "",
    $ = O + T + "" + ("inputJSONSchema" in H && H.inputJSONSchema ? `${H.name}:${getToolPropertySchema(H.inputJSONSchema)}` : H.name),
    Y = w47(),
    A = Y.get($);
  if (!A) {
    let f = Y_("tengu_tool_pear", !1),
      J = "inputJSONSchema" in H && H.inputJSONSchema ? H.inputJSONSchema : MRH(H.inputSchema);
    if (!wK()) J = mapToolProperty(H.name, J);
    if (A = {
      name: H.name,
      description: await filterToolProperties(H, _),
      input_schema: J
    }, f && H.strict === !0 && _.model && hEH(_.model)) A.strict = !0;
    let D = process.env.CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING;
    if (!P4(D) && (q === "firstParty" && T3() && Y_("tengu_fgts", !1) || q === "vertex" && !process.env.ANTHROPIC_VERTEX_BASE_URL && K?.eagerInputStreaming?.vertex || q === "bedrock" && !process.env.ANTHROPIC_BEDROCK_BASE_URL && K?.eagerInputStreaming?.bedrock || q_(D))) A.eager_input_streaming = !0;
    Y.set($, A);
  }
  let w = {
    name: A.name,
    description: A.description,
    input_schema: A.input_schema,
    ...(A.strict && {
      strict: !0
    }),
    ...(A.eager_input_streaming && {
      eager_input_streaming: !0
    })
  };
  if (_.deferLoading) w.defer_loading = !0;
  if (_.cacheControl) w.cache_control = _.cacheControl;
  if (LEH()) {
    let f = new Set(["name", "description", "input_schema", "cache_control"]),
      j = Object.keys(w).filter((J: any): any => !f.has(J));
    if (j.length > 0) return isToolPropertyVisible(j), {
      name: w.name,
      description: w.description,
      input_schema: w.input_schema,
      ...(w.cache_control && {
        cache_control: w.cache_control
      })
    };
  }
  return w;
}
function isToolPropertyVisible(H: any): any {
  if (toolPropertyCache) return;
  toolPropertyCache = !0, N(`[betas] Stripped from tool schemas: [${H.join(", ")}] (experimental betas disabled)`);
}
function getToolPropertySchema(H: any): any {
  let _ = toolPropertySymbols.get(H);
  if (_ === void 0) _ = bH(H), toolPropertySymbols.set(H, _);
  return _;
}
function buildToolPropertyDescriptor(H: any): any {
  let [_] = mergeToolProperties(H),
    q = _?.text;
  c("tengu_sysprompt_block", {
    length: q?.length ?? 0,
    hash: q ? toolPropertyNames.createHash("sha256").update(q).digest("hex") : ""
  });
}
function mergeToolProperties(H: any, _: any): any {
  let q = HXH(),
    K = H.findIndex((A: any): any => A === L8H);
  if (q && _?.skipGlobalCacheForSystemPrompt && K === -1) {
    c("tengu_sysprompt_using_tool_based_cache", {
      promptBlockCount: H.length
    });
    let A,
      w,
      f = [];
    for (let D of H) {
      if (!D) continue;
      if (D === L8H) continue;
      if (D.startsWith("x-anthropic-billing-header")) A = D;else if (Z$6.has(D)) w = D;else f.push(D);
    }
    let j = [];
    if (A) j.push({
      text: A,
      cacheScope: null
    });
    if (w) j.push({
      text: w,
      cacheScope: "org"
    });
    let J = f.join(`

`);
    if (J) j.push({
      text: J,
      cacheScope: "org"
    });
    return j;
  }
  if (q) if (K !== -1) {
    let A,
      w,
      f = [],
      j = [];
    for (let X = 0; X < H.length; X++) {
      let P = H[X];
      if (!P || P === L8H) continue;
      if (P.startsWith("x-anthropic-billing-header")) A = P;else if (Z$6.has(P)) w = P;else if (X < K) f.push(P);else j.push(P);
    }
    let J = [];
    if (A) J.push({
      text: A,
      cacheScope: null
    });
    if (w) J.push({
      text: w,
      cacheScope: null
    });
    let D = f.join(`

`);
    if (D) J.push({
      text: D,
      cacheScope: "global"
    });
    let M = j.join(`

`);
    if (M) J.push({
      text: M,
      cacheScope: "org"
    });
    return c("tengu_sysprompt_boundary_found", {
      blockCount: J.length,
      staticBlockLength: D.length,
      dynamicBlockLength: M.length
    }), J;
  } else c("tengu_sysprompt_missing_boundary_marker", {
    promptBlockCount: H.length
  });
  let O,
    T,
    z = [];
  for (let A of H) {
    if (!A) continue;
    if (A.startsWith("x-anthropic-billing-header")) O = A;else if (Z$6.has(A)) T = A;else z.push(A);
  }
  let $ = [];
  if (O) $.push({
    text: O,
    cacheScope: null
  });
  if (T) $.push({
    text: T,
    cacheScope: "org"
  });
  let Y = z.join(`

`);
  if (Y) $.push({
    text: Y,
    cacheScope: "org"
  });
  return $;
}
function compareToolProperties(H: any, _: any): any {
  return [...H, Object.entries(_).map(([q, K]: any): any => `${q}: ${K}`).join(`
`)].filter(Boolean);
}
function buildToolMessageProperties(H: any, _: any): any {
  if (Object.entries(_).length === 0) return H;
  return [U6({
    content: `<system-reminder>
As you answer the user's questions, you can use the following context:
${Object.entries(_).map(([q, K]: any): any => `# ${q}
${K}`).join(`
`)}

      IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task.
</system-reminder>
`,
    isMeta: !0
  }), ...H];
}
async function getToolUseProperties(H: any, _: any): any {
  if (CI()) return;
  let [{
      tools: q
    }, K, O, T] = await Promise.all([pN_(H), BV(_), ij(), rD()]),
    z = T.gitStatus?.length ?? 0,
    $ = O.claudeMd?.length ?? 0,
    Y = z + $,
    A = u_(),
    w = I8_(_),
    f = b8_(w, A),
    j = await cJ6(A, AbortSignal.timeout(1000), f),
    J = 0,
    D = 0,
    M = 0,
    X = 0,
    P = 0,
    Z = K.filter((G: any): any => !G.isMcp);
  J = q.length, X = Z.length;
  let W = new Set();
  for (let G of q) {
    let R = G.name.split("__");
    if (R.length >= 3 && R[1]) W.add(R[1]);
  }
  D = W.size;
  for (let G of q) {
    let h = "inputJSONSchema" in G && G.inputJSONSchema ? G.inputJSONSchema : MRH(G.inputSchema);
    M += Fz(bH(h));
  }
  for (let G of Z) {
    let R = "inputJSONSchema" in G && G.inputJSONSchema ? G.inputJSONSchema : MRH(G.inputSchema);
    P += Fz(bH(R));
  }
  c("tengu_context_size", {
    git_status_size: z,
    claude_md_size: $,
    has_user_email: Boolean(O.userEmail),
    total_context_size: Y,
    project_file_count_rounded: j,
    mcp_tools_count: J,
    mcp_servers_count: D,
    mcp_tools_tokens: M,
    non_mcp_tools_count: X,
    non_mcp_tools_tokens: P
  });
}
function applyToolPropertyDefaults(H: any, _: any, q: any): any {
  switch (H.name) {
    case V9:
      {
        try {
          if (_ === null || typeof _ !== "object") return _;
          let K = _,
            O = K.offset;
          if (typeof O === "string") {
            let T = O.trim();
            if (/^[-+]?\d+(\.\d+)?$/.test(T)) {
              let z = Number(T);
              if (Number.isFinite(z)) return {
                ...K,
                offset: z
              };
            }
          }
        } catch (K) {
          EH(Error(`normalizeToolInput Read.offset coercion failed: ${K}`));
        }
        return _;
      }
    case VN:
      {
        let K = Wk(q),
          O = Pk(q);
        return Uv6(), K !== null ? {
          ..._,
          plan: K,
          planFilePath: O
        } : _;
      }
    case R4.name:
      {
        let K = R4.inputSchema.parse(_),
          {
            command: O,
            timeout: T,
            description: z
          } = K,
          $ = u_(),
          Y = O.replace(`cd ${$} && `, "");
        if (t_() === "windows") Y = Y.replace(`cd ${Nh($)} && `, "");
        if (Y = Y.replaceAll("\\\\;", "\\;"), /^echo\s+["']?[^|&;><]*["']?$/i.test(Y.trim())) c("tengu_bash_tool_simple_echo", {});
        let A = "run_in_background" in K ? K.run_in_background : void 0;
        return {
          command: Y,
          description: z,
          ...(T !== void 0 && {
            timeout: T
          }),
          ...(z !== void 0 && {
            description: z
          }),
          ...(A !== void 0 && {
            run_in_background: A
          }),
          ...("dangerouslyDisableSandbox" in K && K.dangerouslyDisableSandbox !== void 0 && {
            dangerouslyDisableSandbox: K.dangerouslyDisableSandbox
          })
        };
      }
    case TM.name:
      {
        let O = {
          ..._
        };
        if ("old_str" in O) {
          if (!("old_string" in O)) O.old_string = O.old_str;
          delete O.old_str;
        }
        if ("new_str" in O) {
          if (!("new_string" in O)) O.new_string = O.new_str;
          delete O.new_str;
        }
        let T = TM.inputSchema.parse(O),
          {
            file_path: z,
            edits: $
          } = $0K({
            file_path: T.file_path,
            edits: [{
              old_string: T.old_string,
              new_string: T.new_string,
              replace_all: T.replace_all
            }]
          });
        return {
          replace_all: $[0].replace_all,
          file_path: z,
          old_string: $[0].old_string,
          new_string: $[0].new_string
        };
      }
    case sJ.name:
      {
        let K = sJ.inputSchema.parse(_),
          O = /\.(md|mdx)$/i.test(K.file_path);
        return {
          file_path: K.file_path,
          content: O ? K.content : H_q(K.content)
        };
      }
    case De:
      {
        let K = _,
          O = K.task_id ?? K.agentId ?? K.bash_id,
          T = K.timeout ?? (typeof K.wait_up_to === "number" ? K.wait_up_to * 1000 : void 0);
        return {
          task_id: O ?? "",
          block: K.block ?? !0,
          timeout: T ?? 30000
        };
      }
    default:
      return _;
  }
}
function isPropertyObject(H: any): any {
  if (typeof H === "string") {
    if (!H.includes("\\u")) return H;
    return H.replace(/\\u([dD][89aAbB][0-9a-fA-F]{2})\\u([dD][c-fC-F][0-9a-fA-F]{2})|\\u([0-9a-fA-F]{4})/g, (_: any, q: any, K: any, O: any, T: any): any => {
      let z = T;
      while (z > 0 && H[z - 1] === "\\") z--;
      if (T - z & 1) return _;
      if (q !== void 0) return String.fromCharCode(parseInt(q, 16), parseInt(K, 16));
      let $ = parseInt(O, 16);
      if ($ >= 55296 && $ <= 57343) return _;
      return String.fromCharCode($);
    });
  }
  if (Array.isArray(H)) return H.map(isPropertyObject);
  if (H !== null && typeof H === "object") {
    let _ = {};
    for (let [q, K] of Object.entries(H)) _[q] = isPropertyObject(K);
    return _;
  }
  return H;
}
function serializeToolProperties(H: any, _: any): any {
  switch (H.name) {
    case VN:
      {
        if (_ && typeof _ === "object" && ("plan" in _ || "planFilePath" in _)) {
          let {
            plan: q,
            planFilePath: K,
            ...O
          } = _;
          return O;
        }
        return _;
      }
    case TM.name:
      {
        if (_ && typeof _ === "object" && "edits" in _) {
          let {
            old_string: q,
            new_string: K,
            replace_all: O,
            ...T
          } = _;
          return T;
        }
        return _;
      }
    default:
      return _;
  }
}
var toolPropertyNames,
  toolPropertyDefaults,
  toolPropertySchema,
  toolPropertyCache = !1,
  toolPropertySymbols;
var initToolProperties = L((): any => {
  aQ();
  Cp();
  mF();
  o6();
  y_();
  WL();
  Hb();
  sZH();
  UZH();
  w4H();
  uL();
  P8();
  R$6();
  ZC();
  M7();
  KA();
  lT();
  Lf();
  LW();
  Fq();
  FH();
  A6();
  S6();
  zq();
  vm();
  WG();
  iq();
  V7();
  o$();
  tW();
  y9();
  we();
  H6();
  dz6();
  DI();
  iu6();
  toolPropertyNames = require("crypto");
  toolPropertySchema = {
    [VN]: ["launchSwarm", "teammateCount"],
    [G9]: ["name", "team_name", "mode"]
  };
  toolPropertySymbols = new WeakMap();
});

export {getToolPropertyNames as oTm,pickToolProperty as iTm,mapToolProperty as aTm,filterToolProperties as lTm,normalizeToolProperties as D6n,isToolPropertyVisible as cTm,getToolPropertySchema as uTm,buildToolPropertyDescriptor as lNl,mergeToolProperties as oIo,compareToolProperties as WZa,buildToolMessageProperties as A6n,getToolUseProperties as cNl,applyToolPropertyDefaults as uNl,isPropertyObject as hzn,serializeToolProperties as dNl,toolPropertyNames as aNl,toolPropertyDefaults as oNl,toolPropertySchema as sTm,toolPropertyCache as sNl,toolPropertySymbols as iNl,initToolProperties as K6e};
