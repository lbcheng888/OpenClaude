// @ts-nocheck
import {ed as uz,h2 as vm} from "../../vendor/m1285.ts";
import {getCanonicalName as _9,Ro as iq} from "../permissions/1458_swapShrinksContextWindow.ts";
import {pLo as wPq,CG as aQ} from "../agent/5206_len.ts";
import {mi as Z7,lr as P8} from "../../vendor/m233.ts";
import {getAPIProvider as l8,isFirstPartyAnthropicBaseUrl as T3,Ps as V7} from "../api/1287_usesFirstPartyModelIds.ts";
import {Mh as GY,mI as WG} from "../config/2029_mI.ts";
import {Nai as w47,K0t as dz6} from "../../vendor/m2034.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE as Y_,jn as o6} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {HDe as MRH,QWn as iu6} from "../../vendor/m4434.ts";
import {isAgentSwarmsEnabled as wK,lb as Lf} from "../config/3314_isAgentSwarmsEnabled.ts";
import {FBe as hEH,NBe as LEH,ORe as HXH,MR as LW} from "../config/2033_allowed.ts";
import {Za as P4,nt as q_} from "../../vendor/m127.ts";
import {logForDebugging as N,qe as FH} from "../config/0236_setHasFormattedOutput.ts";
import {TeamDeleteToolName as bH,tn as H6} from "../config/0230_encoding.ts";
import {logEvent as c,kt as y_} from "../../vendor/m132.ts";
import {SYSTEM_PROMPT_DYNAMIC_BOUNDARY as L8H} from "../../vendor/m723.ts";
import {Vbn as Z$6,zbn as R$6} from "../core/2234_zbn.ts";
import {Mn as U6,po as zq} from "./5224_userPromptCount.ts";
import {P2 as CI,S8 as mF} from "../config/2187_S8.ts";
import {qFt as pN_,ReactRuntime as WL} from "./3238_name.ts";
import {gL as BV,cx as uL} from "../artifact/4323_cx.ts";
import {Py as ij,AE as rD,y$ as Cp} from "../config/2734_duration_ms.ts";
import {isTmuxControlMode as u_,Po as Fq} from "../../vendor/m638.ts";
import {getFileReadIgnorePatterns as I8_,normalizePatternsToPath as b8_,Xm as o$} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {nkn as cJ6,tee as we} from "../config/2681_cause.ts";
import {pm as Fz,l1 as ZC} from "../core/2694_l1.ts";
import {Ie as EH,vn as S6} from "../session/0621_length.ts";
import {vs as V9,dm as lT} from "../../vendor/m2256.ts";
import {VD as Wk,GD as Pk,l9n as Uv6,Dw as tW} from "../core/5176_encoding.ts";
import {yD as VN} from "../config/2259_R9r.ts";
import {sl as R4,UB as Hb} from "./4381_isSearch.ts";
import {Yt as t_,Es as y9} from "../../vendor/m641.ts";
import {Qx as Nh,r2 as DI} from "../config/0646_existsSync.ts";
import {ME as TM,nxe as sZH} from "./4356_content.ts";
import {wBa as $0K,wuo as H_q,V0e as UZH} from "../../vendor/m3913.ts";
import {fb as sJ,sce as w4H} from "./3934_file_path.ts";
import {lW as De} from "../../vendor/m2705.ts";
import {b as L} from "../../runtime.ts";
import {ri as M7} from "./2235_userFacingName.ts";
import {fg as KA,ls as G9} from "../../vendor/m2232.ts";
import {dn as A6} from "../config/0137_namespace.ts";
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
export {getToolPropertyNames as RHm,pickToolProperty as wHm,mapToolProperty as kHm,filterToolProperties as HHm,normalizeToolProperties as XWn,isToolPropertyVisible as IHm,getToolPropertySchema as xHm,buildToolPropertyDescriptor as X4l,mergeToolProperties as _Lo,compareToolProperties as Dil,buildToolMessageProperties as OWn,getToolUseProperties as Q4l,applyToolPropertyDefaults as Z4l,isPropertyObject as dQn,serializeToolProperties as eql,toolPropertyNames as J4l,toolPropertyDefaults as z4l,toolPropertySchema as vHm,toolPropertyCache as j4l,toolPropertySymbols as Y4l,initToolProperties as S8e};
