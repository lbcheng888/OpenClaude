// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {mO,MM} from "../../vendor/m126.ts";
import {Uet,xAe,kAe,hDt,tx} from "./2595_skill_name.ts";
import {builtInCommandNames,attributionSkillName,findCommand,isSkillOff,getCommand,shippedCommandNames,Sf} from "../tools/5142_toSlashCommands.ts";
import {lP,gs,sh} from "../../vendor/m2589.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe,fromEnum} from "../../vendor/m5.ts";
import {z4e,$2t} from "../artifact/3925_kind.ts";
import {prepareForkedCommandContext,extractResultText,gP} from "../artifact/4405_withDisallowedCommandTools.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {AIe,y$t} from "../tui/4027_type.ts";
import {k9,Yge} from "../permissions/4040_clients.ts";
import {wT,Ln,rG,Ute,nu,Sx,xE,nlo,qte,SIe,lo} from "../tools/5190_userPromptCount.ts";
import {vwn,oN} from "../core/2729_input_tokens.ts";
import {getCommandName,isCommandEnabled,Ict,S$t,hIe,p2n,gqe} from "../tools/4028_maxEditDistance.ts";
import {setPromptId,getSessionId,addInvokedSkill,lt} from "../session/0131_sent.ts";
import {E0,m$,Om} from "../config/2215_level.ts";
import {Fh,Fr,Ql} from "../../vendor/m4405.ts";
import {Ou,ADt,uS} from "../config/2594_event_name.ts";
import {_Ie,h2n,g2n,A2n,Zao,C$t,Sqe} from "../../vendor/m4035.ts";
import {Oe,Ie,aJo,ln} from "./0594_feature_name.ts";
import {B0,Pee} from "./3153_Pee.ts";
import {lUn,K4e,nct} from "../../vendor/m3923.ts";
import {sUn,nIe} from "../config/3923_maxFiles.ts";
import {jt,ws} from "../../vendor/m228.ts";
import {wA,_T,$u} from "../mcp/2194_mcpServerName.ts";
import {F5,rz} from "../../vendor/m2590.ts";
import {FFa,UFa} from "../../vendor/m4037.ts";
import {Ms,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {Pw} from "../../vendor/m2207.ts";
import {De,Rn} from "../session/0615_length.ts";
import {c_e,fee} from "../permissions/4409_prompt.ts";
import {h_,vu,UV,bt} from "../../vendor/m195.ts";
import {hasPermissionsToUseTool,ay} from "../tools/5184_toolAlwaysAllowedRule.ts";
import {bR,O2,initKp} from "../../vendor/m609.ts";
import {executeUserPromptExpansionHooks,Xao} from "../../vendor/m4028.ts";
import {createAttachmentMessage,getAttachmentMessages,Bv} from "../agent/4429_tryGetPDFReference.ts";
import {ix,Sz} from "../config/2704_Sz.ts";
import {parseToolListFromCLI,ly} from "../permissions/5185_verifyAutoModeGateAccess.ts";
import {iS,Ufe,RK} from "../../vendor/m2231.ts";
import {xFa,kFa} from "../../vendor/m4034.ts";
var w$t = {};
isFullscreenWithTTY(w$t, {
  runUserPromptExpansionHook: () => runUserPromptExpansionHook,
  processSlashCommand: () => processSlashCommand,
  processPromptSlashCommand: () => processPromptSlashCommand,
  looksLikeCommand: () => looksLikeCommand,
  formatSkillLoadingMetadata: () => formatSkillLoadingMetadata
});
async function Cvp(e: any, t: any, n: any, r: any, o: any, s: any, i: any = []) {
  let a = mO(),
    {
      sanitizedName: l,
      skillNameHash: c
    } = Uet({
      rawName: e.name,
      canonicalName: e.name,
      isMcp: e.loadedFrom === "mcp",
      isBuiltIn: builtInCommandNames().has(e.name),
      isBundled: e.source === "bundled",
      isOfficial: e.source === "plugin" && !!e.pluginInfo?.repository && lP(gs(e.pluginInfo.repository).marketplace)
    });
  logEvent("tengu_slash_command_forked", {
    command_name: l,
    ...c,
    _PROTO_skill_name: e.name,
    invocation_trigger: Qe("user-slash"),
    ...xAe(e.source, e.loadedFrom, e.kind, e.createdBy),
    ...z4e(e.source, e.name),
    ...(e.pluginInfo && kAe(e.pluginInfo))
  });
  let {
      skillContent: u,
      modifiedGetAppState: d,
      contextLayers: p,
      baseAgent: m,
      promptMessages: f
    } = await prepareForkedCommandContext(e, t, n),
    A = p.length > 0 ? [...(n.permissionLayers ?? []), ...p] : n.permissionLayers;
  f.push(...i);
  let h = e.getEffort?.(t) ?? e.effort,
    g = h !== void 0 ? {
      ...m,
      effort: h
    } : m;
  logForDebugging(`Executing forked slash command /${e.name} with agent ${g.agentType}`);
  let _ = [],
    y = [],
    T = `forked-command-${e.name}`,
    S = 0,
    v = (H: any) => (S++, {
      type: "progress",
      data: {
        message: H,
        type: "agent_progress",
        prompt: u,
        agentId: a,
        agentType: g.agentType,
        description: e.description
      },
      parentToolUseID: T,
      toolUseID: `${T}-${S}`,
      timestamp: new Date().toISOString(),
      uuid: Mct.randomUUID()
    }),
    R = () => {
      o({
        jsx: AIe(y, {
          tools: n.options.tools,
          verbose: !1
        }),
        shouldHidePromptInput: !1,
        shouldContinueAnimation: !0,
        showSpinner: !0
      }), n.emitToolProgress?.({
        kind: "agent_progress",
        toolUseId: T,
        progressMessages: [...y]
      });
    };
  R();
  try {
    for await (let H of k9({
      agentDefinition: g,
      promptMessages: f,
      toolUseContext: {
        ...n,
        getAppState: d,
        permissionLayers: A
      },
      canUseTool: s,
      isAsync: !1,
      querySource: "agent:custom",
      spawnedBySkill: attributionSkillName(e),
      model: e.model,
      availableTools: n.options.tools
    })) {
      if (H.type === "api_metrics" || H.type === "set_in_progress_tool_use_ids" || H.type === "spinner_mode") continue;
      _.push(H);
      let I = wT([H]);
      if (H.type === "assistant") {
        let P = vwn(H);
        if (P > 0) n.onQueryEvent?.({
          type: "response_length",
          op: "add",
          delta: P
        });
        let L = I[0];
        if (L && L.type === "assistant") y.push(v(H)), R();
      }
      if (H.type === "user") {
        let P = I[0];
        if (P && P.type === "user") y.push(v(P)), R();
      }
    }
  } finally {
    o(null), n.emitToolProgress?.({
      kind: "clear",
      toolUseId: T
    });
  }
  let k = extractResultText(_, "Command completed");
  return logForDebugging(`Forked slash command /${e.name} completed with agent ${a}`), {
    messages: [Ln({
      content: rG({
        inputString: `/${getCommandName(e)} ${t}`.trim(),
        precedingInputBlocks: r
      })
    }), Ln({
      content: `<local-command-stdout>
${k}
</local-command-stdout>`
    })],
    shouldQuery: !1,
    command: e,
    resultText: k
  };
}
function looksLikeCommand(e: any) {
  return !/[^a-zA-Z0-9:\-_]/.test(e);
}
async function processSlashCommand(e: any, t: any, n: any, r: any, o: any, s: any, i: any, a: any, l: any, c: any) {
  function u() {
    let J = Mct.randomUUID();
    setPromptId(J);
    let ee = E0(o.options.mainLoopModel, Fh(o));
    return logEvent("tengu_input_prompt", {
      ...(c && {
        prompt_source: fromEnum(c)
      }),
      ...(ee && {
        effort_level: fromEnum(ee)
      })
    }), Ou("user_prompt", {
      prompt_length: String(e.length),
      prompt: ADt(e),
      "prompt.id": J
    }), {
      messages: [Ln({
        content: rG({
          inputString: e,
          precedingInputBlocks: t
        }),
        uuid: i,
        promptSource: c
      }), ...r],
      shouldQuery: !0
    };
  }
  let d = _Ie(e);
  if (!d) {
    if (logEvent("tengu_input_slash_missing", {}), o.options.isNonInteractiveSession) return u();
    Oe("cmd_dispatch", "cmd_parse_failed");
    let J = "Commands are in the form `/command [args]`";
    return {
      messages: [Ute(), ...r, Ln({
        content: rG({
          inputString: J,
          precedingInputBlocks: t
        })
      })],
      shouldQuery: !1,
      resultText: J
    };
  }
  let {
      commandName: p,
      args: m
    } = d,
    {
      isMcp: f
    } = d,
    A = !1;
  if (B0()) {
    let J = lUn(p, o.options.commands);
    if (J) p = J.commandName, m = J.args;else if (p.includes("://")) A = !0;
  }
  let h = findCommand(p, o.options.commands);
  if (!h && !f && m.trim()) {
    let J = m.trimStart(),
      ee = J.search(/\s/),
      te = ee === -1 ? J : J.slice(0, ee),
      ne = `${p}:${te}`,
      re = findCommand(ne, o.options.commands);
    if (re) h = re, p = ne, m = ee === -1 ? "" : J.slice(ee + 1).trimStart();
  }
  let g: any;
  if (h && !isSkillOff(h)) {
    let J = h2n(h, m);
    if (J) {
      let ee = findCommand(J.targetName, o.options.commands);
      if (ee && isCommandEnabled(ee)) h = ee, p = J.targetName, m = J.remainingArgs;else if (h.name === K4e) {
        let te = sUn();
        if (te) g = nu(`${te} Running a local review instead.`, "warning");
      }
    }
  }
  let _ = builtInCommandNames().has(p),
    y = h?.type === "prompt" && h.source === "bundled",
    T = h?.type === "prompt" && h.source === "plugin" && !!h.pluginInfo?.repository && lP(gs(h.pluginInfo.repository).marketplace),
    S = f || h?.type === "prompt" && h.source === "mcp";
  if (!h) {
    let J = !1;
    try {
      await jt().stat(`/${p}`), J = !0;
    } catch {}
    if ((looksLikeCommand(p) || A) && !J) {
      if (o.options.isNonInteractiveSession && builtInCommandNames().has(p)) {
        let ne = `/${p} isn't available in this environment.`;
        return logEvent("tengu_input_slash_invalid", {
          input_length: p.length,
          had_suggestion: !1
        }), Oe("cmd_dispatch", "cmd_unavailable_headless"), {
          messages: [Sx(`/${p}${m ? ` ${m}` : ""}`), Sx(`<local-command-stdout>${ne}</local-command-stdout>`)],
          shouldQuery: !1,
          resultText: ne
        };
      }
      let ee = Ict(p, o.options.commands.filter((ne: any) => !ne.isHidden && !isSkillOff(ne)).map((ne: any) => ({
        name: getCommandName(ne),
        aliases: ne.aliases
      })), {
        maxEditDistance: 2
      });
      logEvent("tengu_input_slash_invalid", {
        input_length: p.length,
        is_mcp_template_unmatched: A,
        had_suggestion: Boolean(ee),
        suggestion_distance: ee ? S$t(p, ee) : void 0
      }), Oe("cmd_dispatch", "cmd_unknown");
      let te = ee ? `Unknown command: /${p}. Did you mean /${ee}?` : `Unknown command: /${p}`;
      if (o.options.isNonInteractiveSession) return {
        messages: [...r, Sx(`/${p}${m ? ` ${m}` : ""}`), Sx(`<local-command-stdout>${te}</local-command-stdout>`)],
        shouldQuery: !1,
        resultText: te
      };
      return {
        messages: [...r, nu(te, "warning"), ...(m ? [nu(`Args from unknown skill: ${m}`, "warning")] : [])],
        shouldQuery: !1,
        resultText: te
      };
    }
    return u();
  }
  let v = S || h.loadedFrom === "mcp" ? "mcp" : _ || h.type === "prompt" && (h.source === "bundled" || h.source === "builtin") ? "builtin" : "custom",
    R = h.isSensitive && m.trim() ? `/${p} ***` : e;
  if (!(o.deferSlashToEngine?.(h) ?? !1)) {
    let J = Mct.randomUUID();
    setPromptId(J), Ou("user_prompt", {
      prompt_length: String(R.length),
      prompt: ADt(R),
      "prompt.id": J,
      command_name: v === "builtin" || wA() ? p : v,
      command_source: v
    });
  }
  let {
      messages: x,
      shouldQuery: H,
      allowedTools: I,
      disallowedTools: P,
      model: L,
      effort: D,
      command: N,
      resultText: O,
      nextInput: $,
      submitNextInput: U,
      engineDeferredSlash: W
    } = await wvp(p, m, s, o, t, n, a, l, i),
    {
      sanitizedName: G,
      skillNameHash: V
    } = Uet({
      rawName: p,
      canonicalName: N.name,
      isMcp: S || N.loadedFrom === "mcp",
      isBuiltIn: _,
      isBundled: y,
      isOfficial: T
    });
  if (x.length === 0) {
    let J = {
      input: G,
      ...V
    };
    if (N.type === "prompt" && N.pluginInfo) {
      let {
          pluginManifest: ee,
          repository: te
        } = N.pluginInfo,
        {
          marketplace: ne
        } = gs(te),
        re = lP(ne);
      if (J.plugin_repository = re ? te : "third-party", J.plugin_name = re ? ee.name : "third-party", re && ee.version) J.plugin_version = _T(ee.version);
      Object.assign(J, kAe(N.pluginInfo));
    }
    return logEvent("tengu_input_command", {
      ...J,
      invocation_trigger: Qe("user-slash"),
      ...xAe(N.type === "prompt" ? N.source : void 0, N.loadedFrom, N.kind, N.type === "prompt" ? N.createdBy : void 0),
      ...z4e(N.type === "prompt" ? N.source : void 0, p),
      ...(N.type === "prompt" && {
        command_content_chars: N.contentLength
      }),
      ...(N.type === "prompt" && {
        _PROTO_skill_name: N.name
      }),
      ...!1
    }), {
      messages: [],
      shouldQuery: !1,
      model: L,
      nextInput: $,
      submitNextInput: U
    };
  }
  if (x.length === 2 && x[1].type === "user" && typeof x[1].message.content === "string" && x[1].message.content.startsWith("Unknown command:")) {
    if (!(e.startsWith("/var") || e.startsWith("/tmp") || e.startsWith("/private"))) logEvent("tengu_input_slash_invalid", {
      input_length: p.length,
      had_suggestion: !1
    }), Oe("cmd_dispatch", "cmd_unknown");
    return {
      messages: [Ute(), ...x],
      shouldQuery: H,
      allowedTools: I,
      disallowedTools: P,
      model: L
    };
  }
  if (!W) Ie("cmd_dispatch");
  let Q = {
    input: G,
    ...V
  };
  if (N.type === "prompt" && N.pluginInfo) {
    let {
        pluginManifest: J,
        repository: ee
      } = N.pluginInfo,
      {
        marketplace: te
      } = gs(ee),
      ne = lP(te);
    if (Q.plugin_repository = ne ? ee : "third-party", Q.plugin_name = ne ? J.name : "third-party", ne && J.version) Q.plugin_version = _T(J.version);
    Object.assign(Q, kAe(N.pluginInfo));
  }
  if (!W) logEvent("tengu_input_command", {
    ...Q,
    invocation_trigger: Qe("user-slash"),
    ...xAe(N.type === "prompt" ? N.source : void 0, N.loadedFrom, N.kind, N.type === "prompt" ? N.createdBy : void 0),
    ...z4e(N.type === "prompt" ? N.source : void 0, p),
    ...(N.type === "prompt" && {
      command_content_chars: N.contentLength
    }),
    ...(N.type === "prompt" && {
      _PROTO_skill_name: N.name
    }),
    ...!1
  });
  let K = x.length > 0 && x[0] && xE(x[0]),
    Y = H || x.every((J: any) => nlo(J) || J.type === "system" && J.subtype === "informational" || J.type === "user" && J.isMeta) || K || W ? x : [Ute(), ...x];
  return {
    messages: g && H ? [...Y, g] : Y,
    shouldQuery: H,
    allowedTools: I,
    disallowedTools: P,
    model: L,
    effort: D,
    resultText: O,
    nextInput: $,
    submitNextInput: U,
    engineDeferredSlash: W
  };
}
async function wvp(e: any, t: any, n: any, r: any, o: any, s: any, i: any, a: any, l: any) {
  let c = getCommand(e, r.options.commands),
    u = aJo(shippedCommandNames().has(e) ? e : "custom");
  if (isSkillOff(c)) {
    if (Oe(u, "cmd_skill_override_off"), r.options.isNonInteractiveSession) {
      let p = `Skill "${c.name}" is disabled via skillOverrides. Remove the override from your settings to run it.`;
      return {
        messages: [Sx(Eqe(c, t)), Sx(`<local-command-stdout>${p}</local-command-stdout>`)],
        shouldQuery: !1,
        command: c,
        resultText: p
      };
    }
    let d = `Skill "${c.name}" is disabled via skillOverrides. Re-enable it in /skills or remove the override from your settings to run it.`;
    return {
      messages: [nu(d, "warning"), ...(t ? [nu(`Args from disabled skill: ${t}`, "warning")] : [])],
      shouldQuery: !1,
      command: c,
      resultText: d
    };
  }
  if (c.type === "prompt" && c.userInvocable !== !1) g2n(c.name);
  if (c.type === "prompt" && c.pluginInfo) F5(c.pluginInfo.repository);
  if (!r.deferSlashToEngine?.(c)) FFa({
    commandName: c.name,
    agentId: r.agentId,
    isNonInteractiveSession: Boolean(r.options.isNonInteractiveSession),
    setAppState: r.setAppState
  });
  if (c.userInvocable === !1) return Oe(u, "cmd_not_user_invocable"), {
    messages: [Ln({
      content: rG({
        inputString: `/${e}`,
        precedingInputBlocks: o
      })
    }), Ln({
      content: `This skill can only be invoked by Claude, not directly by users. Ask Claude to use the "${e}" skill for you.`
    })],
    shouldQuery: !1,
    command: c
  };
  if (c.type === "local-jsx" && r.options.isNonInteractiveSession) {
    Oe(u, "cmd_local_jsx_headless");
    let d = `/${getCommandName(c)} opens an interactive panel and isn't available in this environment. Run it from the Claude Code terminal instead.`;
    return {
      messages: [Sx(Eqe(c, t)), Sx(`<local-command-stdout>${d}</local-command-stdout>`)],
      shouldQuery: !1,
      command: c,
      resultText: d
    };
  }
  try {
    switch (c.type) {
      case "local-jsx":
        return new Promise((d: any) => {
          let p = !1,
            m = (f: any, A: any) => {
              if (p = !0, Ie(u), A?.display === "skip") {
                d({
                  messages: [],
                  shouldQuery: !1,
                  command: c,
                  nextInput: A?.nextInput,
                  submitNextInput: A?.submitNextInput
                });
                return;
              }
              let h = (A?.metaMessages ?? []).map((_: any) => Ln({
                  content: _,
                  isMeta: !0
                })),
                g = Ms() && typeof f === "string" && f.endsWith(" dismissed");
              d({
                messages: A?.display === "system" ? g ? h : [Sx(Eqe(c, t)), Sx(`<local-command-stdout>${f}</local-command-stdout>`), ...h] : [Ln({
                  content: rG({
                    inputString: Eqe(c, t),
                    precedingInputBlocks: o
                  })
                }), f ? Ln({
                  content: `<local-command-stdout>${f}</local-command-stdout>`
                }) : Ln({
                  content: `<local-command-stdout>${Pw}</local-command-stdout>`
                }), ...h],
                shouldQuery: A?.shouldQuery ?? !1,
                command: c,
                nextInput: A?.nextInput,
                submitNextInput: A?.submitNextInput
              });
            };
          c.load().then((f: any) => f.call(m, {
            ...r,
            canUseTool: a
          }, t, e)).then((f: any) => {
            if (f == null) return;
            if (p) return;
            n({
              jsx: f,
              shouldHidePromptInput: !0,
              showSpinner: !1,
              isLocalJSXCommand: !0,
              isImmediate: hIe(c, t)
            });
          }).catch((f: any) => {
            if (De(f), Oe(u, "cmd_local_jsx_threw"), p) return;
            p = !0, n({
              jsx: null,
              shouldHidePromptInput: !1,
              clearLocalJSX: !0
            }), d({
              messages: [],
              shouldQuery: !1,
              command: c
            });
          });
        });
      case "local":
        {
          if (r.deferSlashToEngine?.(c)) {
            let m = `/${getCommandName(c)} ${t}`.trim(),
              f = Ln({
                content: rG({
                  inputString: m,
                  precedingInputBlocks: o
                })
              });
            return {
              messages: [f],
              shouldQuery: !1,
              command: c,
              engineDeferredSlash: {
                text: m,
                messageUuid: f.uuid
              }
            };
          }
          let d = c.isSensitive && t.trim() ? "***" : t,
            p = Ln({
              content: rG({
                inputString: Eqe(c, d),
                precedingInputBlocks: o
              })
            });
          try {
            let m = Ute(),
              A = await (await c.load()).call(t, r);
            if (Ie(u), A.type === "skip") return {
              messages: [],
              shouldQuery: !1,
              command: c
            };
            if (A.type === "compact") {
              let h = [m, p, ...(A.displayText ? [Ln({
                  content: `<local-command-stdout>${A.displayText}</local-command-stdout>`,
                  timestamp: new Date(Date.now() + 100).toISOString()
                })] : [])],
                g = {
                  ...A.compactionResult,
                  messagesToKeep: [...A.compactionResult.messagesToKeep, ...h]
                };
              return {
                messages: c_e(g),
                shouldQuery: !1,
                command: c
              };
            }
            if (A.type === "query") return {
              messages: [p, Ln({
                content: `<local-command-stdout>${A.value}</local-command-stdout>`
              }), Ln({
                content: A.prompt,
                isMeta: !0
              })],
              shouldQuery: !0,
              command: c,
              resultText: A.value
            };
            return {
              messages: [p, Sx(`<local-command-stdout>${A.value}</local-command-stdout>`)],
              shouldQuery: !1,
              command: c,
              resultText: A.value
            };
          } catch (m: any) {
            if (h_(m)) logForDebugging(`local command aborted: ${m instanceof Error ? m.message : String(m)}`);else De(m);
            return Oe(u, "cmd_local_threw"), {
              messages: [p, Sx(`<local-command-stderr>${String(m)}</local-command-stderr>`)],
              shouldQuery: !1,
              command: c
            };
          }
        }
      case "prompt":
        {
          if (!(c.isMcp && c.loadedFrom !== "mcp")) hDt(c.name, c, "user-slash");
          try {
            let d = await runUserPromptExpansionHook(c, t, r);
            if ("blocked" in d) return Oe(u, "cmd_hook_blocked"), d.blocked;
            if (c.getEffort?.(t) !== void 0 && !r.options.isNonInteractiveSession) m$();
            if (c.context === "fork") {
              let m = await Cvp(c, t, r, o, n, a ?? hasPermissionsToUseTool, d.hookMessages);
              return Ie(u), m;
            }
            let p = await GFa(c, t, r, o, s, l, d.hookMessages);
            return Ie(u), p;
          } catch (d: any) {
            if (d instanceof vu) return Oe(u, "cmd_prompt_aborted"), {
              messages: [Ln({
                content: rG({
                  inputString: Eqe(c, t),
                  precedingInputBlocks: o
                })
              }), qte({
                toolUse: !1
              })],
              shouldQuery: !1,
              command: c
            };
            return Oe(u, "cmd_prompt_threw"), {
              messages: [Ln({
                content: rG({
                  inputString: Eqe(c, t),
                  precedingInputBlocks: o
                })
              }), Ln({
                content: `<local-command-stderr>${String(d)}</local-command-stderr>`
              })],
              shouldQuery: !1,
              command: c
            };
          }
        }
    }
  } catch (d: any) {
    if (d instanceof UV) return Oe(u, "cmd_malformed"), {
      messages: [Ln({
        content: rG({
          inputString: d.message,
          precedingInputBlocks: o
        })
      })],
      shouldQuery: !1,
      command: c
    };
    throw d;
  }
}
function Eqe(e: any, t: any) {
  return SIe(getCommandName(e), t);
}
function formatSkillLoadingMetadata(e: any, t: any = "loading") {
  return [`<${bR}>${e}</${bR}>`, `<${O2}>${e}</${O2}>`, "<skill-format>true</skill-format>"].join(`
`);
}
function $Fa(e: any, t: any) {
  return [`<${bR}>${e}</${bR}>`, `<${O2}>/${e}</${O2}>`, t ? `<command-args>${t}</command-args>` : null].filter(Boolean).join(`
`);
}
function qFa(e: any, t: any) {
  if (e.userInvocable !== !1) return $Fa(e.name, t);
  if (e.loadedFrom === "skills" || e.loadedFrom === "plugin" || e.loadedFrom === "mcp") return formatSkillLoadingMetadata(e.name, e.progressMessage);
  return $Fa(e.name, t);
}
async function runUserPromptExpansionHook(e: any, t: any, n: any) {
  let r: any[] = [],
    o = t ? `/${e.name} ${t}` : `/${e.name}`;
  for await (let s of executeUserPromptExpansionHooks(e.source === "mcp" ? "mcp_prompt" : "slash_command", e.name, t, e.source, o, Fr(n).mode, n)) {
    if (s.message?.type === "progress") continue;
    if (s.blockingError) {
      let i = `UserPromptExpansion operation blocked by hook:
${s.blockingError.blockingError}

Original prompt: ${o}`;
      return {
        blocked: {
          messages: [nu(i, "warning", void 0, !0)],
          shouldQuery: !1,
          resultText: i,
          command: e
        }
      };
    }
    if (s.preventContinuation) {
      let i = s.stopReason ? `Operation stopped by hook: ${s.stopReason}` : "Operation stopped by hook";
      return {
        blocked: {
          messages: [Ln({
            content: i
          }), nu(i, "warning", void 0, !0)],
          shouldQuery: !1,
          resultText: i,
          command: e
        }
      };
    }
    if (s.additionalContexts?.length) r.push(createAttachmentMessage({
      type: "hook_additional_context",
      content: s.additionalContexts,
      hookName: "UserPromptExpansion",
      toolUseID: `hook-${Mct.randomUUID()}`,
      hookEvent: "UserPromptExpansion"
    }));
    if (s.message && !(s.message.type === "attachment" && s.message.attachment.type === "hook_success" && s.message.attachment.content === "")) r.push(s.message);
  }
  return {
    hookMessages: r
  };
}
async function processPromptSlashCommand(e: any, t: any, n: any, r: any, o: any = []) {
  let s = findCommand(e, n);
  if (!s) throw new UV(`Unknown command: ${e}`);
  if (s.type !== "prompt") throw Error(`Unexpected ${s.type} command. Expected 'prompt' command. Use /${e} directly in the main conversation.`);
  return GFa(s, t, r, [], o);
}
async function GFa(e: any, t: any, n: any, r: any = [], o: any = [], s: any, i: any = []) {
  if (ix() && !n.agentId) {
    let g = qFa(e, t),
      _ = [`Skill "/${e.name}" is available for workers.`];
    if (e.description) _.push(`Description: ${e.description}`);
    if (e.whenToUse) _.push(`When to use: ${e.whenToUse}`);
    let y = e.allowedTools ?? [];
    if (y.length > 0) _.push(`This skill grants workers additional tool permissions: ${y.join(", ")}`);
    _.push(`
Instruct a worker to use this skill by including "Use the /${e.name} skill" in your Agent prompt. The worker has access to the Skill tool and will receive the skill's content and permissions when it invokes it.`);
    let T = [{
      type: "text",
      text: _.join(`
`)
    }];
    return {
      messages: [Ln({
        content: g,
        uuid: s
      }), Ln({
        content: T,
        isMeta: !0
      })],
      shouldQuery: !0,
      disallowedTools: parseToolListFromCLI(e.disallowedTools ?? []),
      model: e.model,
      effort: e.getEffort?.(t) ?? e.effort,
      command: e
    };
  }
  let a = await e.getPromptForCommand(t, n),
    l = !iS("hooks") || Ufe(e.source);
  if (e.hooks && l) {
    let g = getSessionId();
    xFa(n.setAppState, g, e.hooks, e.name, e.type === "prompt" ? e.skillRoot : void 0);
  }
  let c = e.source ? `${e.source}:${e.name}` : e.name,
    u = a.filter((g: any) => g.type === "text").map((g: any) => g.text).join(`

`);
  addInvokedSkill(e.name, c, u, n.agentId ?? null), n.options.activeSkill = attributionSkillName(e);
  let d = qFa(e, t),
    p = parseToolListFromCLI(e.allowedTools ?? []),
    m = parseToolListFromCLI(e.disallowedTools ?? []);
  if (m.length > 0) A2n(n.setToolPermissionContext, m, "union");
  let f = o.length > 0 || r.length > 0 ? [...o, ...r, ...a] : a,
    A = await p2n(getAttachmentMessages(a.filter((g: any) => g.type === "text").map((g: any) => g.text).join(" "), n, null, [], {
      now: () => new Date().toISOString(),
      uuid: () => Mct.randomUUID()
    }, n.messages, "repl_main_thread", {
      planSlugSeed: t
    }));
  return {
    messages: [Ln({
      content: d,
      uuid: s
    }), Ln({
      content: f,
      isMeta: !0
    }), ...A, ...i, createAttachmentMessage({
      type: "command_permissions",
      allowedTools: p,
      model: e.model
    })],
    shouldQuery: !0,
    allowedTools: p,
    disallowedTools: m,
    model: e.model,
    effort: e.getEffort?.(t) ?? e.effort,
    command: e
  };
}
var Mct: any;
var Nct = b(() => {
  lt();
  Sf();
  lt();
  nIe();
  initKp();
  Sz();
  ln();
  Ct();
  $u();
  fee();
  Pee();
  nct();
  $2t();
  Yge();
  y$t();
  Bv();
  Ql();
  qe();
  Om();
  bt();
  gP();
  ws();
  Pp();
  gqe();
  Xao();
  kFa();
  Rn();
  lo();
  ly();
  ay();
  Zao();
  sh();
  RK();
  C$t();
  rz();
  Sqe();
  uS();
  tx();
  oN();
  MM();
  UFa();
  Mct = require("crypto");
});
export {w$t,Cvp,looksLikeCommand,processSlashCommand,wvp,Eqe,formatSkillLoadingMetadata,$Fa,qFa,runUserPromptExpansionHook,processPromptSlashCommand,GFa,Mct,Nct};
