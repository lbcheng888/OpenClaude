// @ts-nocheck
import {Cl,Ri} from "../tools/2227_userFacingName.ts";
import {o_e,u$t} from "../../vendor/m4336.ts";
import {_oe,Pd} from "../../vendor/m701.ts";
import {Box} from "../../vendor/m2422.ts";
import {Ite,ict} from "../../vendor/m3937.ts";
import {Text} from "../../vendor/m2423.ts";
import {useTheme} from "../../vendor/m2274.ts";
import {mr,ki} from "../../vendor/m2453.ts";
import {Rct,qao,LHe} from "../hooks/4340_isCollapsible.ts";
import {iBa,aBa,lBa} from "../../vendor/m4006.ts";
import {Ms,Pp} from "../config/2273_loggedTmuxCcDisable.ts";
import {Id,mc} from "../config/0645_maxBytes.ts";
import {ZNa,eBa} from "../../vendor/m4003.ts";
import {XNa,QNa} from "../../vendor/m4002.ts";
import {IUn,tao} from "../../vendor/m3960.ts";
import {formatSecondsShort,formatDuration,ps} from "../../vendor/m238.ts";
import {Ansi} from "../../vendor/m2431.ts";
import {Oq,Qxe} from "../../vendor/m3175.ts";
import {fs} from "../api/0459_getOauthConfig.ts";
import {fqe,t2n} from "../../vendor/m4005.ts";
import {cx,iW} from "../../vendor/m2798.ts";
import {l_,dU} from "../../vendor/m3932.ts";
import {fc,sl} from "../../vendor/m715.ts";
import {mt,configProtoStore} from "../../vendor/m2458.ts";
import {mainAgentId,lt} from "../session/0131_sent.ts";
import {oaa,ele} from "../../vendor/m3293.ts";
import {useAnimationFrame} from "../config/2442_isVisible.ts";
import {$1,FIt} from "../../vendor/m2366.ts";
import {Uu,dr} from "../../vendor/m231.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {lo} from "../tools/5190_userPromptCount.ts";
import {Fao} from "../../vendor/m4009.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function TCp(e: any) {
  let t = $ao.c(49),
    {
      content: n,
      tools: r,
      lookups: o,
      inProgressToolUseIDs: s,
      shouldAnimate: i,
      theme: a
    } = e,
    l: any,
    c: any,
    u: any,
    d: any,
    p: any,
    m: any,
    f: any,
    A: any,
    h: any,
    g: any,
    _: any;
  if (t[0] !== n.id || t[1] !== n.input || t[2] !== n.name || t[3] !== s || t[4] !== o || t[5] !== i || t[6] !== a || t[7] !== r) {
    g = Symbol.for("react.early_return_sentinel");
    e: {
      if (_ = Cl(r, n.name) ?? Cl(o_e(), n.name), !_ || _.isTransparentWrapper?.()) {
        g = null;
        break e;
      }
      let S: any;
      if (t[19] !== n.id || t[20] !== o.resolvedToolUseIDs) S = o.resolvedToolUseIDs.has(n.id), t[19] = n.id, t[20] = o.resolvedToolUseIDs, t[21] = S;else S = t[21];
      u = S;
      let v: any;
      if (t[22] !== n.id || t[23] !== o.erroredToolUseIDs) v = o.erroredToolUseIDs.has(n.id), t[22] = n.id, t[23] = o.erroredToolUseIDs, t[24] = v;else v = t[24];
      c = v;
      let R: any;
      if (t[25] !== n.id || t[26] !== s) R = s.has(n.id), t[25] = n.id, t[26] = s, t[27] = R;else R = t[27];
      let k = R;
      d = o.toolResultByToolUseID.get(n.id);
      let x = d?.type === "user" ? d.toolUseResult : void 0,
        H = _.outputSchema?.safeParse(x),
        I = H?.success ? H.data : void 0,
        P = _.inputSchema.safeParse(n.input),
        L = P.success ? P.data : void 0,
        D = _.userFacingName(L),
        N: any;
      if (t[28] !== n.input) N = _oe(n.input), t[28] = n.input, t[29] = N;else N = t[29];
      let O = N,
        $ = O !== null ? O : L ? _.renderToolUseMessage(L, {
          theme: a,
          verbose: !0
        }) : null;
      l = Box, p = n.id, m = "column", f = 1;
      let U = i && k,
        W = !u,
        G: any;
      if (t[30] !== c || t[31] !== U || t[32] !== W) G = yi.default.createElement(Ite, {
        shouldAnimate: U,
        isUnresolved: W,
        isError: c
      }), t[30] = c, t[31] = U, t[32] = W, t[33] = G;else G = t[33];
      A = yi.default.createElement(Box, {
        flexDirection: "row"
      }, G, yi.default.createElement(Text, null, yi.default.createElement(Text, {
        bold: !0
      }, D), $ && yi.default.createElement(Text, null, "(", $, ")")), L && _.renderToolUseTag?.(L, {
        toolUseId: n.id,
        toolUseResult: x,
        progressMessages: o.progressMessagesByToolUseID.get(n.id)
      })), h = u && !c && I !== void 0 && yi.default.createElement(Box, null, _.renderToolResultMessage?.(I, [], {
        verbose: !0,
        tools: r,
        theme: a
      }));
    }
    t[0] = n.id, t[1] = n.input, t[2] = n.name, t[3] = s, t[4] = o, t[5] = i, t[6] = a, t[7] = r, t[8] = l, t[9] = c, t[10] = u, t[11] = d, t[12] = p, t[13] = m, t[14] = f, t[15] = A, t[16] = h, t[17] = g, t[18] = _;
  } else l = t[8], c = t[9], u = t[10], d = t[11], p = t[12], m = t[13], f = t[14], A = t[15], h = t[16], g = t[17], _ = t[18];
  if (g !== Symbol.for("react.early_return_sentinel")) return g;
  let y: any;
  if (t[34] !== n.id || t[35] !== c || t[36] !== u || t[37] !== d || t[38] !== _ || t[39] !== r) y = null, t[34] = n.id, t[35] = c, t[36] = u, t[37] = d, t[38] = _, t[39] = r, t[40] = y;else y = t[40];
  let T: any;
  if (t[41] !== l || t[42] !== p || t[43] !== m || t[44] !== f || t[45] !== A || t[46] !== h || t[47] !== y) T = yi.default.createElement(l, {
    key: p,
    flexDirection: m,
    marginTop: f
  }, A, h, y), t[41] = l, t[42] = p, t[43] = m, t[44] = f, t[45] = A, t[46] = h, t[47] = y, t[48] = T;else T = t[48];
  return T;
}
function hBa({
  message: e,
  inProgressToolUseIDs: t,
  shouldAnimate: n,
  verbose: r,
  tools: o,
  lookups: s,
  isActiveGroup: i,
  addMargin: a = !0
}: any) {
  let {
      searchCount: l,
      readCount: c,
      listCount: u,
      replCount: d,
      memorySearchCount: p,
      memoryReadCount: m,
      memoryWriteCount: f,
      messages: A
    } = e,
    [h] = useTheme(),
    {
      columns: g
    } = mr(),
    _ = Rct(e),
    y = _.some((pe: any) => s.erroredToolUseIDs.has(pe)),
    T = p > 0 || m > 0 || f > 0,
    S = iBa(e),
    v = yi.useRef(0),
    R = yi.useRef(0),
    k = yi.useRef(0),
    x = yi.useRef(0),
    H = yi.useRef(0);
  v.current = Math.max(v.current, c), R.current = Math.max(R.current, l), k.current = Math.max(k.current, u), x.current = Math.max(x.current, e.mcpCallCount ?? 0), H.current = Math.max(H.current, e.bashCount ?? 0);
  let I = e.otherToolCount ?? 0,
    P = e.editFileCount ?? 0,
    L = e.frameCount ?? 0,
    D = e.linesAdded ?? 0,
    N = e.linesRemoved ?? 0,
    O = v.current,
    $ = R.current,
    U = k.current,
    W = x.current,
    G = e.gitOpBashCount ?? 0,
    V = Ms() ? Math.max(0, H.current - G) : 0,
    Q = e.thoughtForMs ?? 0,
    K = Q > 0 || e.latestThinkingSummary !== void 0,
    Y = $ > 0 || O > 0 || U > 0 || d > 0 || W > 0 || V > 0 || G > 0 || I > 0 || P > 0 || L > 0 || K,
    J = e.readFilePaths,
    ee = e.searchArgs,
    te = e.latestDisplayHint;
  if (te === void 0) {
    let pe = ee?.at(-1),
      de = pe !== void 0 ? `"${pe}"` : void 0,
      _e = J?.at(-1);
    te = _e !== void 0 ? Id(_e) : de;
  }
  if (i) for (let pe of _) {
    if (!t.has(pe)) continue;
    let de = s.progressMessagesByToolUseID.get(pe)?.at(-1)?.data;
    if (de?.type === "repl_tool_call" && (de.phase === "start" || de.phase === "executing")) {
      let _e = de.toolInput;
      te = _e.file_path ?? (_e.pattern ? `"${_e.pattern}"` : void 0) ?? _e.command ?? de.toolName;
    } else if (de?.type === "mcp_progress") {
      let {
          progress: _e,
          total: fe,
          progressMessage: ie
        } = de,
        Ae = ie?.replace(/\s+/g, " ").trim() || void 0,
        ge = Ae && Ae.length > 200 ? Ae.slice(0, 199) + "\u2026" : Ae;
      if (_e !== void 0 && fe !== void 0 && fe > 0) {
        let Ce = Math.round(Math.min(1, Math.max(0, _e / fe)) * 100);
        te = ge ? `${ge} (${Ce}%)` : `${Ce}%`;
      } else if (ge) te = ge;else if (_e !== void 0) te = `Processing\u2026 ${_e}`;
    }
  }
  let ne = ZNa(te, hCp),
    re = XNa(i ? e.latestThinkingSummary : void 0, gCp),
    oe = i && re !== void 0,
    ce = oe ? re : ne;
  if (r) {
    let pe: any[] = [];
    for (let de of A) if (de.type === "assistant") pe.push(de);else if (de.type === "grouped_tool_use") pe.push(...de.messages);
    return yi.default.createElement(Box, {
      flexDirection: "column"
    }, pe.map((de: any) => {
      let _e = de.message.content[0];
      if (_e?.type === "thinking" && _e.thinking) return yi.default.createElement(Box, {
        key: de.uuid,
        marginTop: 1
      }, yi.default.createElement(IUn, {
        param: _e,
        addMargin: !1,
        isTranscriptMode: !0,
        verbose: !0
      }));
      if (_e?.type !== "tool_use") return null;
      return yi.default.createElement(TCp, {
        key: _e.id,
        content: _e,
        tools: o,
        lookups: s,
        inProgressToolUseIDs: t,
        shouldAnimate: n,
        theme: h
      });
    }), e.hookInfos && e.hookInfos.length > 0 && yi.default.createElement(yi.default.Fragment, null, yi.default.createElement(Text, {
      dimColor: !0
    }, yi.default.createElement(Text, {
      "aria-hidden": !0
    }, "  \u23BF  "), "Ran ", e.hookCount, " ", "PreToolUse ", e.hookCount === 1 ? "hook" : "hooks", " (", formatSecondsShort(e.hookTotalMs ?? 0), ")"), e.hookInfos.map((de: any, _e: any) => yi.default.createElement(Text, {
      key: `hook-${_e}`,
      dimColor: !0
    }, yi.default.createElement(Text, {
      "aria-hidden": !0
    }, "     \u23BF "), de.command, " (", formatSecondsShort(de.durationMs ?? 0), ")"))), e.relevantMemories?.map((de: any) => yi.default.createElement(Box, {
      key: de.path,
      flexDirection: "column",
      marginTop: 1
    }, yi.default.createElement(Text, {
      dimColor: !0
    }, yi.default.createElement(Text, {
      "aria-hidden": !0
    }, "  \u23BF  "), "Recalled", " ", ABa.basename(de.path)), yi.default.createElement(Box, {
      paddingLeft: 5
    }, yi.default.createElement(Text, null, yi.default.createElement(Ansi, null, de.content))))));
  }
  if (!T && !S && !Y) return null;
  let ue = "";
  if (Ms() && i) {
    let pe: any,
      de = 0;
    for (let _e of _) {
      if (!t.has(_e)) continue;
      let fe = s.progressMessagesByToolUseID.get(_e)?.at(-1)?.data;
      if (fe?.type !== "bash_progress" && fe?.type !== "powershell_progress") continue;
      if (pe === void 0 || fe.elapsedTimeSeconds > pe) pe = fe.elapsedTimeSeconds, de = fe.totalLines;
    }
    if (pe !== void 0 && pe >= 2) {
      let _e = formatDuration(pe * 1000);
      ue = de > 0 ? ` (${_e} \xB7 ${de} ${de === 1 ? "line" : "lines"})` : ` (${_e})`;
    }
  }
  let ae: any[] = [];
  if (K) {
    let pe = i ? "Thinking" : "Thought",
      de: any;
    if (i && Ms()) {
      let _e = 0;
      for (let fe = A.length - 1; fe >= 0; fe--) {
        let ie = A[fe];
        if (ie?.type === "assistant" && ie.message.content[0]?.type === "thinking") {
          let Ae = Date.parse(ie.timestamp);
          if (Number.isFinite(Ae)) _e = Ae;
          break;
        }
      }
      de = yi.default.createElement(SCp, {
        baseMs: Q,
        lastThinkingAtMs: _e
      });
    } else de = yi.default.createElement(Text, {
      bold: !0
    }, formatDuration(Math.max(1000, Q)));
    ae.push(yi.default.createElement(Text, {
      key: "thought"
    }, pe, " for ", de));
  }
  if (P > 0) {
    let pe = ae.length === 0,
      de = i ? pe ? "Editing" : "editing" : pe ? "Edited" : "edited";
    if (!pe) ae.push(yi.default.createElement(Text, {
      key: "comma-edit"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "edit"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, P), " ", P === 1 ? "file" : "files", " ", yi.default.createElement(Oq, {
      added: D,
      removed: N
    })));
  }
  function he(pe: any, de: any, _e: any) {
    let fe = ae.length === 0;
    if (!fe) ae.push(yi.default.createElement(Text, {
      key: `comma-${pe}`
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: pe
    }, fe ? de[0].toUpperCase() + de.slice(1) : de, _e != null && yi.default.createElement(yi.default.Fragment, null, " ", _e)));
  }
  if (Ms() && e.commits?.length) {
    let pe: any = {
      committed: "committed",
      amended: "amended commit",
      "cherry-picked": "cherry-picked"
    };
    for (let de of ["committed", "amended", "cherry-picked"]) {
      let _e = e.commits.filter((fe: any) => fe.kind === de).map((fe: any) => fe.sha);
      if (_e.length) he(de, pe[de], yi.default.createElement(Text, {
        bold: !0
      }, _e.join(", ")));
    }
  }
  if (Ms() && e.pushes?.length) {
    let pe = fs(e.pushes.map((de: any) => de.branch));
    he("push", "pushed to", yi.default.createElement(Text, {
      bold: !0
    }, pe.join(", ")));
  }
  if (Ms() && e.branches?.length) {
    let pe: any = {
      merged: "merged",
      rebased: "rebased onto"
    };
    for (let de of e.branches) he(`br-${de.action}-${de.ref}`, pe[de.action], yi.default.createElement(Text, {
      bold: !0
    }, de.ref));
  }
  if (Ms() && e.prs?.length) {
    let pe: any = {
      created: "created",
      edited: "edited",
      merged: "merged",
      commented: "commented on",
      closed: "closed",
      ready: "marked ready",
      draft: "marked draft",
      "auto-merge-enabled": "enabled auto-merge on",
      "auto-merge-disabled": "disabled auto-merge on"
    };
    for (let de of e.prs) he(`pr-${de.action}-${de.number}`, pe[de.action], de.url ? yi.default.createElement(fqe, {
      number: de.number,
      url: de.url,
      bold: !0
    }) : yi.default.createElement(Text, {
      bold: !0
    }, "PR #", de.number));
  }
  if (L > 0) he("frame", i ? "publishing" : "published", null);
  if ($ > 0) {
    let pe = ae.length === 0,
      de = i ? pe ? "Searching for" : "searching for" : pe ? "Searched for" : "searched for";
    if (!pe) ae.push(yi.default.createElement(Text, {
      key: "comma-s"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "search"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, $), " ", $ === 1 ? "pattern" : "patterns"));
  }
  if (O > 0) {
    let pe = ae.length === 0,
      de = i ? pe ? "Reading" : "reading" : pe ? "Read" : "read";
    if (!pe) ae.push(yi.default.createElement(Text, {
      key: "comma-r"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "read"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, O), " ", O === 1 ? "file" : "files"));
  }
  if (U > 0) {
    let pe = ae.length === 0,
      de = i ? pe ? "Listing" : "listing" : pe ? "Listed" : "listed";
    if (!pe) ae.push(yi.default.createElement(Text, {
      key: "comma-l"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "list"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, U), " ", U === 1 ? "directory" : "directories"));
  }
  if (d > 0) {
    let pe = i ? "REPL'ing" : "REPL'd";
    if (ae.length > 0) ae.push(yi.default.createElement(Text, {
      key: "comma-repl"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "repl"
    }, pe, " ", yi.default.createElement(Text, {
      bold: !0
    }, d), " ", d === 1 ? "time" : "times"));
  }
  if (W > 0) {
    let pe = e.mcpServerNames?.map((fe: any) => fe.replace(/^claude\.ai /, "")).join(", ") || "MCP",
      de = ae.length === 0,
      _e = i ? de ? "Calling" : "calling" : de ? "Called" : "called";
    if (!de) ae.push(yi.default.createElement(Text, {
      key: "comma-mcp"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "mcp"
    }, _e, " ", pe, W > 1 && yi.default.createElement(yi.default.Fragment, null, " ", yi.default.createElement(Text, {
      bold: !0
    }, W), " times")));
  }
  if (I > 0) {
    let pe = ae.length === 0,
      de = i ? pe ? "Calling" : "calling" : pe ? "Called" : "called";
    if (!pe) ae.push(yi.default.createElement(Text, {
      key: "comma-other"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "other"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, I), " ", I === 1 ? "tool" : "tools"));
  }
  if (Ms() && V > 0) {
    let pe = ae.length === 0,
      de = i ? pe ? "Running" : "running" : pe ? "Ran" : "ran";
    if (!pe) ae.push(yi.default.createElement(Text, {
      key: "comma-bash"
    }, ", "));
    ae.push(yi.default.createElement(Text, {
      key: "bash"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, V), " shell", " ", V === 1 ? "command" : "commands"));
  }
  let se = ae.length > 0,
    le: any[] = [];
  if (m > 0) {
    let pe = !se && le.length === 0,
      de = i ? pe ? "Recalling" : "recalling" : pe ? "Recalled" : "recalled";
    if (!pe) le.push(yi.default.createElement(Text, {
      key: "comma-mr"
    }, ", "));
    le.push(yi.default.createElement(Text, {
      key: "mem-read"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, m), " ", m === 1 ? "memory" : "memories"));
  }
  if (p > 0) {
    let pe = !se && le.length === 0,
      de = i ? pe ? "Searching" : "searching" : pe ? "Searched" : "searched";
    if (!pe) le.push(yi.default.createElement(Text, {
      key: "comma-ms"
    }, ", "));
    le.push(yi.default.createElement(Text, {
      key: "mem-search"
    }, `${de} memories`));
  }
  if (f > 0) {
    let pe = !se && le.length === 0,
      de = i ? pe ? "Writing" : "writing" : pe ? "Wrote" : "wrote";
    if (!pe) le.push(yi.default.createElement(Text, {
      key: "comma-mw"
    }, ", "));
    le.push(yi.default.createElement(Text, {
      key: "mem-write"
    }, de, " ", yi.default.createElement(Text, {
      bold: !0
    }, f), " ", f === 1 ? "memory" : "memories"));
  }
  return yi.default.createElement(Box, {
    flexDirection: "column",
    marginTop: a ? 1 : 0
  }, yi.default.createElement(Box, {
    flexDirection: "row"
  }, i ? yi.default.createElement(Ite, {
    shouldAnimate: !0,
    isUnresolved: !0,
    isError: y
  }) : yi.default.createElement(Box, {
    minWidth: 2
  }), yi.default.createElement(Text, {
    dimColor: !i
  }, ae, le, aBa({
    message: e,
    isActiveGroup: i,
    hasPrecedingParts: se || le.length > 0
  }), i && yi.default.createElement(Text, {
    key: "ellipsis"
  }, "\u2026"), " ", yi.default.createElement(cx, null))), i && ce !== void 0 && yi.default.createElement(Box, {
    flexDirection: "row"
  }, yi.default.createElement(Box, {
    width: 5,
    flexShrink: 0
  }, yi.default.createElement(Text, {
    "aria-hidden": !0,
    dimColor: !0
  }, "  \u23BF  ")), yi.default.createElement(Box, {
    flexDirection: "column",
    flexGrow: 1
  }, oe ? yi.default.createElement(l_, {
    dimColor: !0,
    italic: !0
  }, ECp(ce, g - _Cp, yCp)) : ce.split(`
`).map((pe: any, de: any, _e: any) => yi.default.createElement(Text, {
    key: `hint-${de}`,
    dimColor: !0
  }, pe, de === _e.length - 1 && ue)))), e.hookTotalMs !== void 0 && e.hookTotalMs > 0 && yi.default.createElement(Text, {
    dimColor: !0
  }, yi.default.createElement(Text, {
    "aria-hidden": !0
  }, "  \u23BF  "), "Ran ", e.hookCount, " PreToolUse", " ", e.hookCount === 1 ? "hook" : "hooks", " (", formatSecondsShort(e.hookTotalMs), ")"), i && e.pendingText && yi.default.createElement(Box, {
    flexDirection: "row",
    marginTop: 1
  }, yi.default.createElement(Box, {
    width: 2,
    flexShrink: 0
  }, yi.default.createElement(Text, {
    "aria-hidden": !0,
    dimColor: !0
  }, fc)), yi.default.createElement(Box, {
    flexDirection: "column",
    flexGrow: 1
  }, yi.default.createElement(l_, {
    dimColor: !0
  }, e.pendingText))));
}
function SCp(e: any) {
  let t = $ao.c(6),
    {
      baseMs: n,
      lastThinkingAtMs: r
    } = e,
    o = mt(bCp),
    s: any;
  if (t[0] !== o) s = o ?? mainAgentId(), t[0] = o, t[1] = s;else s = t[1];
  let i = oaa(s);
  useAnimationFrame(i !== null ? 1000 : null);
  let a = i !== null ? n + Math.min(qao, Math.max(0, Date.now() - Math.max(i, r))) : n,
    l = Math.max(1000, a),
    c: any;
  if (t[2] !== l) c = formatDuration(l), t[2] = l, t[3] = c;else c = t[3];
  let u: any;
  if (t[4] !== c) u = yi.default.createElement(Text, {
    bold: !0
  }, c), t[4] = c, t[5] = u;else u = t[5];
  return u;
}
function bCp(e: any) {
  return e.viewingAgentTaskId;
}
function ECp(e: any, t: any, n: any) {
  if (t < 1) return e;
  let r = $1(e, t, "wrap").split(`
`);
  if (r.length <= n) return e;
  let o = r.slice(0, n).join("").replace(/\s+/g, " ").trim();
  while (o.length > 0 && Uu($1(`${o}\u2026`, t, "wrap"), `
`) + 1 > n) {
    let s = o.length > 1 ? o.codePointAt(o.length - 2) : void 0;
    o = o.slice(0, s !== void 0 && s > 65535 ? -2 : -1);
  }
  return `${o.trimEnd()}\u2026`;
}
var $ao: any,
  ABa: any,
  yi: any,
  hCp = 700,
  gCp = 3000,
  _Cp = 5,
  yCp = 10;
var gBa = b(() => {
  lt();
  sl();
  QNa();
  eBa();
  ki();
  FIt();
  ze();
  configProtoStore();
  Ri();
  u$t();
  LHe();
  mc();
  ps();
  Pp();
  Pd();
  lo();
  dr();
  iW();
  Qxe();
  dU();
  t2n();
  ele();
  ict();
  tao();
  lBa();
  Fao();
  $ao = M(rt(), 1), ABa = require("path"), yi = M(Te(), 1);
});
export {TCp,hBa,SCp,bCp,ECp,$ao,ABa,yi,hCp,gCp,_Cp,yCp,gBa};
