// @ts-nocheck
import {getCommands,dropShadowedFallbackSkills,builtInCommandNames,attributionSkillName,Mm as Sf,findCommand,filterSkillCommandsByAllowlist,getSkillOverride} from "./5174_toSlashCommands.ts";
import {getProjectRoot,clearInvokedSkillsForAgent,lt,getDisableSlashCommands,getSessionSkillAllowlist} from "../session/0132_sent.ts";
import {mk as VI,lr as dr} from "../../vendor/m233.ts";
import {xv as bR,Ud as initKp} from "../../vendor/m615.ts";
import {cL as qL,ST as wT,po as lo} from "./5224_userPromptCount.ts";
import {OP as mO,YL as MM} from "../../vendor/m123.ts";
import {Vnt as Uet,$he as xAe,qhe as kAe,zOt as hDt,slowOpTracer as tx} from "../telemetry/2606_skill_name.ts";
import {logEvent,kt as Ct} from "../../vendor/m132.ts";
import {Ve as Qe,Le as fromEnum} from "../../vendor/m5.ts";
import {xr as Br,QT as WS} from "../../vendor/m1461.ts";
import {a6e as z4e,_3t as U2t,y3t as $2t} from "../artifact/3966_kind.ts";
import {prepareForkedCommandContext,extractResultText,ID as gP} from "../artifact/4427_withDisallowedCommandTools.ts";
import {logForDebugging,qe} from "../config/0236_setHasFormattedOutput.ts";
import {Q$ as k9,fye as Yge} from "../permissions/4104_clients.ts";
import {He as Ie,mn as ln,xe as Oe} from "../telemetry/0600_feature_name.ts";
import {CD as lP,ts as gs,oh as sh} from "../../vendor/m2600.ts";
import {b} from "../../runtime.ts";
import {sxe as BIe,d9n as A$n} from "../config/3967_sxe.ts";
import {ri as Ri,Ks as pi} from "./2235_userFacingName.ts";
import {xl as Ql,Mr as Fr} from "../../vendor/m4427.ts";
import {ly as ay,getRuleByContentsForTool} from "./5218_toolAlwaysAllowedRule.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {S3t as e9t,axe as FIe,m9n as g$n,u$a as m$a,ixe as Ict} from "../config/3968_maxEditDistance.ts";
import {Ro as Mo,resolveSkillModelOverride} from "../permissions/1458_swapShrinksContextWindow.ts";
import {br as yr,getInitialSettings} from "../config/0745_updateSettingsForSource.ts";
import {eW as rz,t$ as F5} from "../../vendor/m2601.ts";
import {u6e as Sqe,f9n as g2n} from "../../vendor/m3968.ts";
import {Tot as fnt} from "../../vendor/m2765.ts";
import {nge as SRe,getPrompt} from "./2691_getSkillToolInfo.ts";
import {x5a as b$a,v5a as g$a,R5a as h$a,w5a as _$a,k5a as y$a,g4n as _$n,H5a as T$a,I5a as S$a} from "../core/4105_sourceToolUseID.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {CE as AE} from "./2710_allErrors.ts";
import {getCommandName} from "./4092_done.ts";
import {ept as Nct,d4t as w$t} from "../telemetry/4103_runUserPromptExpansionHook.ts";
function hRp(e) {
  let t = new Map();
  for (let n of e) {
    let r = t.get(n.name);
    if (r === void 0 || r.disableModelInvocation && !n.disableModelInvocation) t.set(n.name, n);
  }
  return [...t.values()];
}
async function sco(e) {
  let t = e.getAppState().mcp.commands.filter(r => r.type === "prompt" && r.loadedFrom === "mcp"),
    n = await getCommands(getProjectRoot());
  return dropShadowedFallbackSkills(hRp([...n, ...t]));
}
function E$a(e, t) {
  if (t.agentId !== void 0) return !1;
  let n = new RegExp(`(?<!\\S)/${VI(e)}(?=$|\\s)`);
  for (let r = t.messages.length - 1; r >= t.turnStartIndex; r--) {
    let o = t.messages[r];
    if (o.type !== "user" || o.isMeta) continue;
    let s = o.message.content;
    if (typeof s === "string") {
      if (s.includes(`<${bR}>`)) continue;
    } else if (s.some(i => i.type === "tool_result")) continue;
    if (n.test(qL(o) ?? "")) return !0;
  }
  return !1;
}
async function gRp(e, t, n, r, o, s, i) {
  let a = Date.now(),
    l = mO(),
    c = builtInCommandNames().has(t),
    u = C$a(e),
    d = e.source === "bundled",
    {
      sanitizedName: p,
      skillNameHash: m
    } = Uet({
      rawName: t,
      canonicalName: e.name,
      isMcp: e.loadedFrom === "mcp",
      isBuiltIn: c,
      isBundled: d,
      isOfficial: u
    }),
    f = r.queryTracking?.depth ?? 0,
    A = f > 0 ? "nested-skill" : "claude-proactive",
    h = r.agentId;
  logEvent("tengu_skill_tool_invocation", {
    command_name: p,
    _PROTO_skill_name: t,
    ...m,
    execution_context: Qe("fork"),
    invocation_trigger: fromEnum(A),
    query_depth: f,
    ...(h && {
      parent_agent_id: Br(h)
    }),
    ...xAe(e.source, e.loadedFrom, e.kind, e.createdBy),
    ...z4e(e.source, t),
    attribution_shown: U2t(e.source, t) !== null,
    skill_content_chars: e.contentLength,
    ...!1,
    ...(e.pluginInfo && {
      ...kAe(e.pluginInfo),
      plugin_name: u ? e.pluginInfo.pluginManifest.name : "third-party",
      plugin_repository: u ? e.pluginInfo.repository : "third-party"
    })
  }), hDt(t, e, A);
  let {
      modifiedGetAppState: g,
      contextLayers: _,
      baseAgent: y,
      promptMessages: T,
      skillContent: S
    } = await prepareForkedCommandContext(e, n || "", r),
    v = e.getEffort?.(n || "") ?? e.effort,
    R = v !== void 0 ? {
      ...y,
      effort: v
    } : y,
    k = [];
  logForDebugging(`SkillTool executing forked skill ${t} with agent ${R.agentType}`);
  try {
    for await (let I of k9({
      agentDefinition: R,
      promptMessages: T,
      toolUseContext: {
        ...r,
        getAppState: g,
        permissionLayers: _.length > 0 ? [...(r.permissionLayers ?? []), ..._] : r.permissionLayers
      },
      canUseTool: o,
      isAsync: !1,
      querySource: "agent:custom",
      spawnedBySkill: attributionSkillName(e),
      model: e.model,
      availableTools: r.options.tools,
      override: {
        agentId: l
      }
    })) {
      if (I.type === "api_metrics") {
        i?.(I);
        continue;
      }
      if (I.type === "set_in_progress_tool_use_ids" || I.type === "spinner_mode") continue;
      if (k.push(I), (I.type === "assistant" || I.type === "user") && i) {
        let P = wT([I]);
        for (let L of P) if (L.message.content.some(N => N.type === "tool_use" || N.type === "tool_result")) i({
          type: "progress",
          toolUseID: `skill_${s.message.id}`,
          data: {
            message: L,
            type: "skill_progress",
            prompt: S,
            agentId: l,
            agentType: R.agentType,
            description: e.description
          }
        });
      }
    }
    let x = extractResultText(k, "Skill execution completed");
    k.length = 0;
    let H = Date.now() - a;
    return logForDebugging(`SkillTool forked skill ${t} completed in ${H}ms`), Ie("skill_invoke"), {
      data: {
        success: !0,
        commandName: t,
        status: "forked",
        agentId: l,
        result: x
      }
    };
  } finally {
    clearInvokedSkillsForAgent(l);
  }
}
function SRp(e) {
  for (let t of Object.keys(e)) {
    if (TRp.has(t)) continue;
    let n = e[t];
    if (n === void 0 || n === null) continue;
    if (Array.isArray(n) && n.length === 0) continue;
    if (typeof n === "object" && !Array.isArray(n) && Object.keys(n).length === 0) continue;
    return !1;
  }
  return !0;
}
function C$a(e) {
  if (e.source !== "plugin" || !e.pluginInfo?.repository) return !1;
  return lP(gs(e.pluginInfo.repository).marketplace);
}
var _Rp, yRp, aut, TRp;
var ico = b(() => {
  lt();
  Sf();
  $2t();
  BIe();
  Ri();
  Ql();
  qe();
  ay();
  sh();
  tx();
  Xr();
  lt();
  initKp();
  ln();
  Ct();
  e9t();
  gP();
  lo();
  Mo();
  yr();
  dr();
  rz();
  Sqe();
  MM();
  Yge();
  fnt();
  SRe();
  b$a();
  WS();
  _Rp = we(() => E.object({
    skill: E.string().describe("The name of a skill from the available-skills list. Do not guess names."),
    args: E.string().optional().describe("Optional arguments for the skill")
  })), yRp = we(() => {
    let e = E.object({
        success: E.boolean().describe("Whether the skill is valid"),
        commandName: E.string().describe("The name of the skill"),
        allowedTools: E.array(E.string()).optional().describe("Tools allowed by this skill"),
        model: E.string().optional().describe("Model override if specified"),
        status: E.literal("inline").optional().describe("Execution status")
      }),
      t = E.object({
        success: E.boolean().describe("Whether the skill completed successfully"),
        commandName: E.string().describe("The name of the skill"),
        status: E.literal("forked").describe("Execution status"),
        agentId: E.string().describe("The ID of the sub-agent that executed the skill"),
        result: E.string().describe("The result from the forked skill execution")
      });
    return E.union([e, t]);
  }), aut = pi({
    name: AE,
    searchHint: "invoke a slash-command skill",
    isEnabled() {
      if (getDisableSlashCommands()) return !1;
      return !0;
    },
    maxResultSizeChars: 1e5,
    get inputSchema() {
      return _Rp();
    },
    get outputSchema() {
      return yRp();
    },
    description: async ({
      skill: e
    }) => `Execute skill: ${e}`,
    prompt: async () => getPrompt(getProjectRoot()),
    toAutoClassifierInput: ({
      skill: e
    }) => e ?? "",
    async validateInput({
      skill: e
    }, t) {
      let n = e.trim();
      if (!n) return Oe("skill_invoke", "skill_invoke_empty_name"), {
        result: !1,
        message: `Invalid skill format: ${e}`,
        errorCode: 1
      };
      let r = n.startsWith("/");
      if (r) logEvent("tengu_skill_tool_slash_prefix", {});
      let o = r ? n.substring(1) : n,
        s;
      if (FIe()) {
        let u = await g$n(o);
        if (!u.ok) s = u.reason;
      }
      let i = t.agentId === void 0 ? getSessionSkillAllowlist() : void 0,
        a = await sco(t),
        l = findCommand(o, a);
      if (s !== void 0 && (!l || m$a(l))) return Oe("skill_invoke", "skill_invoke_not_materialized"), {
        result: !1,
        message: `Skill ${o} could not be downloaded (${s}). Proceed without it.`,
        errorCode: 10
      };
      if (!l) {
        let u = Ict(o, a.map(d => ({
          name: getCommandName(d),
          aliases: d.aliases
        })), {
          maxEditDistance: 2
        });
        return Oe("skill_invoke", "skill_invoke_not_found"), {
          result: !1,
          message: u ? `Unknown skill: ${o}. Did you mean ${u}?` : `Unknown skill: ${o}`,
          errorCode: 2
        };
      }
      if (l.type === "prompt" && l.context === "fork" && t.options.spawnedBySkill === attributionSkillName(l)) return Oe("skill_invoke", "skill_invoke_fork_recursion"), logEvent("tengu_skill_tool_fork_recursion_blocked", {}), {
        result: !1,
        message: `Skill ${o} is already executing in this forked context \u2014 you are the subagent running it. Execute the instructions in the skill body directly instead of re-invoking the ${AE} tool.`,
        errorCode: 9
      };
      if (l.disableModelInvocation && !E$a(o, t)) return Oe("skill_invoke", "skill_invoke_model_disabled"), {
        result: !1,
        message: `Skill ${o} cannot be used with ${AE} tool due to disable-model-invocation`,
        errorCode: 4
      };
      if (i !== void 0 && filterSkillCommandsByAllowlist([l], i).length === 0) return Oe("skill_invoke", "skill_invoke_not_allowlisted"), {
        result: !1,
        message: `Skill ${o} is not in this session's skills allowlist`,
        errorCode: 8
      };
      let c = getSkillOverride(l);
      if (c === "off" || c === "user-invocable-only" && !E$a(o, t)) {
        let u = getInitialSettings(),
          d = A$n(l, u),
          p = u.skillOverrides?.[l.name],
          m = p === "user-invocable-only" || p === "off";
        Oe("skill_invoke", d && !m ? "skill_invoke_bundled_skills_disabled" : "skill_invoke_override_disabled");
        let f = "by the disableBundledSkills setting or CLAUDE_CODE_DISABLE_BUNDLED_SKILLS env var",
          A = d ? m ? `${f}, and by an explicit skillOverrides entry` : f : "in skillOverrides settings";
        return {
          result: !1,
          message: `Skill ${o} is disabled for model invocation ${A}`,
          errorCode: 7
        };
      }
      if (l.type !== "prompt") {
        let u = l.type === "local-jsx" ? "UI" : "built-in CLI";
        return Oe("skill_invoke", "skill_invoke_not_prompt_type"), {
          result: !1,
          message: `${o} is a ${u} command, not a skill. Ask the user to run /${o} themselves \u2014 it cannot be invoked via the ${AE} tool.`,
          errorCode: 5
        };
      }
      return {
        result: !0
      };
    },
    async checkPermissions({
      skill: e,
      args: t
    }, n) {
      let r = e.trim(),
        o = r.startsWith("/") ? r.substring(1) : r,
        s = Fr(n),
        i = await sco(n),
        a = findCommand(o, i),
        l = p => {
          let m = p.startsWith("/") ? p.substring(1) : p;
          if (m === o) return !0;
          if (m.endsWith(":*") || m.endsWith(" *")) {
            let f = m.slice(0, -2);
            return o.startsWith(f);
          }
          return !1;
        },
        c = getRuleByContentsForTool(s, aut, "deny");
      for (let [p, m] of c.entries()) if (l(p)) return {
        behavior: "deny",
        message: "Skill execution blocked by permission rules",
        decisionReason: {
          type: "rule",
          rule: m
        }
      };
      let u = getRuleByContentsForTool(s, aut, "allow");
      for (let [p, m] of u.entries()) if (l(p)) return {
        behavior: "allow",
        updatedInput: {
          skill: e,
          args: t
        },
        decisionReason: {
          type: "rule",
          rule: m
        }
      };
      if (a?.type === "prompt" && SRp(a)) return {
        behavior: "allow",
        updatedInput: {
          skill: e,
          args: t
        },
        decisionReason: void 0
      };
      let d = [{
        type: "addRules",
        rules: [{
          toolName: AE,
          ruleContent: o
        }],
        behavior: "allow",
        destination: "localSettings"
      }, {
        type: "addRules",
        rules: [{
          toolName: AE,
          ruleContent: `${o}:*`
        }],
        behavior: "allow",
        destination: "localSettings"
      }];
      return {
        behavior: "ask",
        message: `Execute skill: ${o}`,
        decisionReason: void 0,
        suggestions: d,
        updatedInput: {
          skill: e,
          args: t
        },
        metadata: a ? {
          command: a
        } : void 0
      };
    },
    async call({
      skill: e,
      args: t
    }, n, r, o, s) {
      let i = e.trim(),
        a = i.startsWith("/") ? i.substring(1) : i,
        l = n.options.activeSkill;
      n.options.activeSkill = a;
      let c = await sco(n),
        u = findCommand(a, c);
      if (u) n.options.activeSkill = attributionSkillName(u);
      if (g2n(a), u?.type === "prompt" && u.pluginInfo) F5(u.pluginInfo.repository);
      if (u?.type === "prompt" && u.context === "fork") try {
        return await gRp(u, a, t, n, r, o, s);
      } finally {
        n.options.activeSkill = l;
      }
      let {
          processPromptSlashCommand: d
        } = await Promise.resolve().then(() => (Nct(), w$t)),
        p = await d(a, t || "", c, n);
      if (!p.shouldQuery) throw Oe("skill_invoke", "skill_invoke_process_failed"), Error("Command processing failed");
      let m = p.allowedTools || [],
        f = p.model,
        A = p.effort,
        h = builtInCommandNames().has(a),
        g = u?.type === "prompt" && u.source === "bundled",
        _ = u?.type === "prompt" && C$a(u),
        {
          sanitizedName: y,
          skillNameHash: T
        } = Uet({
          rawName: a,
          canonicalName: u?.name ?? a,
          isMcp: u?.loadedFrom === "mcp",
          isBuiltIn: h,
          isBundled: g,
          isOfficial: _
        }),
        S = n.queryTracking?.depth ?? 0,
        v = S > 0 ? "nested-skill" : "claude-proactive",
        R = n.agentId,
        k = u?.type === "prompt" ? u.source : void 0;
      logEvent("tengu_skill_tool_invocation", {
        command_name: y,
        _PROTO_skill_name: a,
        ...T,
        execution_context: Qe("inline"),
        invocation_trigger: fromEnum(v),
        query_depth: S,
        ...(R && {
          parent_agent_id: Br(R)
        }),
        ...xAe(k, u?.loadedFrom, u?.kind, u?.type === "prompt" ? u.createdBy : void 0),
        ...z4e(k, a),
        attribution_shown: U2t(k, a) !== null,
        ...(u?.type === "prompt" && {
          skill_content_chars: u.contentLength
        }),
        ...!1,
        ...(u?.type === "prompt" && u.pluginInfo && {
          ...kAe(u.pluginInfo),
          plugin_name: _ ? u.pluginInfo.pluginManifest.name : "third-party",
          plugin_repository: _ ? u.pluginInfo.repository : "third-party"
        })
      }), hDt(a, u, v);
      let x = n.toolUseId ?? g$a(o, AE),
        H = h$a(p.messages.filter(P => {
          if (P.type === "progress") return !1;
          if (P.type === "user" && "message" in P) {
            let L = P.message.content;
            if (typeof L === "string" && L.includes(`<${bR}>`)) return !1;
          }
          return !0;
        }), x);
      logForDebugging(`SkillTool returning ${H.length} newMessages for skill ${a}`), Ie("skill_invoke");
      let I = [];
      if (m.length > 0) I.push({
        kind: "allowed_tools",
        allowedTools: m
      });
      if (f) I.push({
        kind: "model",
        mainLoopModel: resolveSkillModelOverride(f, n.options.mainLoopModel)
      });
      if (A !== void 0) I.push({
        kind: "effort",
        effort: A
      });
      return {
        data: {
          success: !0,
          commandName: a,
          allowedTools: m.length > 0 ? m : void 0,
          model: f
        },
        newMessages: H,
        ...(I.length > 0 && {
          contextLayers: I
        })
      };
    },
    mapToolResultToToolResultBlockParam(e, t) {
      if ("status" in e && e.status === "forked") return {
        type: "tool_result",
        tool_use_id: t,
        content: `Skill "${e.commandName}" completed (forked execution).

Result:
${e.result}`
      };
      return {
        type: "tool_result",
        tool_use_id: t,
        content: `Launching skill: ${e.commandName}`
      };
    },
    renderToolResultMessage: _$a,
    renderToolUseMessage: y$a,
    renderToolUseProgressMessage: _$n,
    renderToolUseRejectedMessage: T$a,
    renderToolUseErrorMessage: S$a
  }), TRp = new Set(["type", "progressMessage", "contentLength", "argNames", "model", "effort", "source", "pluginInfo", "disableNonInteractive", "skillRoot", "context", "agent", "getPromptForCommand", "getEffort", "declaredFields", "createdBy", "fallback", "unqualifiedName", "urlTemplate", "name", "description", "hasUserSpecifiedDescription", "isEnabled", "isHidden", "aliases", "subcommands", "isMcp", "argumentHint", "whenToUse", "paths", "version", "disableModelInvocation", "userInvocable", "loadedFrom", "immediate", "userFacingName"]);
});
export {hRp as POp,sco as zmo,E$a as D5a,gRp as OOp,SRp as FOp,C$a as P5a,_Rp as LOp,yRp as MOp,aut as opt,TRp as NOp,ico as jmo};
