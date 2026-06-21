// @ts-nocheck
import {Di,zd,dr} from "../../vendor/m231.ts";
import {KOt,qRn,oW,L$i,X2e,VOt,$Rn} from "../../vendor/m2778.ts";
import {Rl,TU} from "../tui/4359_isSearch.ts";
import {nle,lb,Zg,eQa,f4t,AN} from "../telemetry/5180_commandWithoutRedirections.ts";
import {getRuleByContentsForTool,Yp,findSafetyCheckReason,ay} from "./5184_toolAlwaysAllowedRule.ts";
import {SandboxManager,Ag} from "../../vendor/m2671.ts";
import {KL,t6e} from "../../vendor/m5180.ts";
import {$Ot,R$i,qOt} from "../config/2776_qOt.ts";
import {Qhe,x0n,Waa,g9e,k0n,_Jr} from "../../vendor/m3303.ts";
import {Pt,Go} from "../../vendor/m632.ts";
import {_Re,C1i,ytt,I6r,pPt,mPt,O6r,L6r,rm,dPt,f1i,w1i,see,fPt} from "../../vendor/m2674.ts";
import {SANDBOX_AUTO_ALLOW_REASON,BASH_PROMPT_RULE_DENY_PREFIX,READ_ONLY_AUTO_ALLOW_REASON,U2} from "../../vendor/m716.ts";
import {TPt,qAe} from "../../vendor/m2676.ts";
import {pathInAllowedWorkingPath,allWorkingDirectories,normalizeCaseForComparison,nA} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {zt,qs} from "../../vendor/m635.ts";
import {VH,lae} from "../../vendor/m2675.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {uxe,NRn,BRn,k$i,H$i} from "../../vendor/m2776.ts";
import {Fr,Ql} from "../../vendor/m4405.ts";
import {parseCommandRaw,gRe} from "../telemetry/2674_parseCommandRaw.ts";
import {vu,bt} from "../../vendor/m195.ts";
import {OXa,LXa} from "../../vendor/m4360.ts";
import {UD,L2} from "../config/0640_existsSync.ts";
import {fs,Wn} from "../api/0459_getOauthConfig.ts";
import {jp,jt,ws} from "../../vendor/m228.ts";
import {H0n,G1t,V1t} from "../../vendor/m3304.ts";
import {AJr,hJr,Naa,R0n} from "../../vendor/m3302.ts";
import {GOt,lx} from "../../vendor/m2777.ts";
import {Qm,Sw} from "../mcp/0728_serverName.ts";
import {MXa,NXa} from "../../vendor/m4361.ts";
import {b} from "../../runtime.ts";
import {LD} from "../../vendor/m194.ts";
import {Xt} from "../config/0228_encoding.ts";
/** No-op placeholder for prompt-rule logging (deny/ask classification events). */
function BXa(e: any, t: any, n: any, r: any) {
  return;
}

/** Extract a "verb subcommand" summary string from a command line, stripping leading env-var assignments. */
function Tqn(e: any) {
  let t = e.trim().split(/\s+/).filter(Boolean);
  if (t.length === 0) return null;
  let n = 0;
  while (n < t.length && xAo.test(t[n])) {
    let s = Di(t[n], "="),
      i = !1;
    if (!A4t.has(s)) return null;
    n++;
  }
  let r = t.slice(n);
  if (r.length < 2) return null;
  if (GXa.has(r[0])) return null;
  let o = r[1];
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(o)) return null;
  return r.slice(0, 2).join(" ");
}

/** Extract just the executable name from a command line, skipping leading env-var assignments. */
function VXa(e: any) {
  let t = e.trim().split(/\s+/).filter(Boolean),
    n = 0;
  while (n < t.length && xAo.test(t[n])) {
    let o = Di(t[n], "="),
      s = !1;
    if (!A4t.has(o)) return null;
    n++;
  }
  let r = t[n];
  if (!r) return null;
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(r)) return null;
  if (GXa.has(r)) return null;
  return r;
}

/** Build a suggestion object for the bash tool from a raw command string. */
function JHe(e: any) {
  let t = E2p(e);
  if (t) return KOt(Rl.name, t);
  if (e.includes(`
`)) {
    let r = zd(e).trim();
    if (r) return KOt(Rl.name, r);
  }
  let n = Tqn(e);
  if (n) return KOt(Rl.name, n);
  return qRn(Rl.name, e);
}

/** Extract a here-doc prefix summary from a command that contains "<<". */
function E2p(e: any) {
  if (!e.includes("<<")) return null;
  let t = e.indexOf("<<");
  if (t <= 0) return null;
  let n = e.substring(0, t).trim();
  if (!n) return null;
  let r = Tqn(n);
  if (r) return r;
  let o = n.split(/\s+/).filter(Boolean),
    s = 0;
  while (s < o.length && xAo.test(o[s])) {
    let i = Di(o[s], "="),
      a = !1;
    if (!A4t.has(i)) return null;
    s++;
  }
  if (s >= o.length) return null;
  return o.slice(s, s + 2).join(" ") || null;
}

/** Wrap an exact command prefix into a suggestion. */
function KXa(e: any) {
  return KOt(Rl.name, e);
}

/** Glob/wildcard match helper: match pattern against command (case-insensitive on some platforms). */
function L6e(e: any, t: any) {
  return oW(e, t, !1, !0);
}

/** Return true if the given env-var name is in the safe allowlist. */
function Zhe(e: any) {
  return A4t.has(e) || !1;
}

/** Strip lines that are pure shell comments from a multiline command string. */
function RAo(e: any) {
  let n = e.split(`
`).filter((r: any) => !r.trim().startsWith("#"));
  if (n.length === 0) return e;
  return n.join(`
`);
}

/**
 * Strip env-var assignments and common wrapper commands (timeout, time, nice, etc.)
 * from the front of a command string, returning the "core" invocation.
 */
function Gq(e: any) {
  let t = [/^timeout[ \t]+(?:(?:--(?:foreground|preserve-status|verbose)|--(?:kill-after|signal)=[A-Za-z0-9_.+-]+|--(?:kill-after|signal)[ \t]+[A-Za-z0-9_.+-]+|-v|-[ks][ \t]+[A-Za-z0-9_.+-]+|-[ks][A-Za-z0-9_.+-]+)[ \t]+)*(?:--[ \t]+)?\d+(?:\.\d+)?[smhd]?[ \t]+/, /^time[ \t]+(?:--[ \t]+)?/, /^nice(?:[ \t]+-n[ \t]+-?\d+|[ \t]+-\d+)?[ \t]+(?:--[ \t]+)?/, /^stdbuf(?:[ \t]+-[ioe][LN0-9]+)+[ \t]+(?:--[ \t]+)?/, /^nohup[ \t]+(?:--[ \t]+)?/, /^command(?:[ \t]+-p+)*(?:[ \t]+--)?[ \t]+(?!-)/, /^builtin(?:[ \t]+--)?[ \t]+(?!-)/, /^noglob[ \t]+(?!-)/],
    n = /^([A-Za-z_][A-Za-z0-9_]*)=([A-Za-z0-9_./:-]+)[ \t]+/,
    r = e,
    o = "";
  while (r !== o) {
    o = r, r = RAo(r);
    let i = r.match(n);
    if (i) {
      let a = i[1],
        l = !1;
      if (A4t.has(a)) r = r.replace(n, "");
    }
  }
  function s(i: any) {
    let a = i.match(/^([^\s]+)([\s\S]*)$/);
    if (!a) return i;
    let l = a[1],
      c = null,
      u = !1;
    for (let p = 0; p < l.length; p++) {
      let m = l[p];
      if (u = !1, c === "'") {
        if (m === "'") c = null;
      } else if (c === '"') {
        if (m === "\\") p++, u = p >= l.length;else if (m === '"') c = null;
      } else if (m === "\\") p++, u = p >= l.length;else if (m === '"' || m === "'") c = m;
    }
    if (c !== null || u) return i;
    return l.replace(/[\\'"]/g, "") + a[2];
  }
  o = "";
  while (r !== o) {
    o = r, r = RAo(r), r = s(r);
    for (let i of t) r = r.replace(i, "");
  }
  return r.trim();
}

/**
 * Parse `timeout` argv, returning the index of the first non-option argument
 * (i.e., the duration), or -1 if the options are invalid/unrecognized.
 */
function C2p(e: any) {
  let t = 1;
  while (t < e.length) {
    let n = e[t],
      r = e[t + 1];
    if (n === "--foreground" || n === "--preserve-status" || n === "--verbose") t++;else if (/^--(?:kill-after|signal)=[A-Za-z0-9_.+-]+$/.test(n)) t++;else if ((n === "--kill-after" || n === "--signal") && r && FXa.test(r)) t += 2;else if (n === "--") {
      t++;
      break;
    } else if (n.startsWith("--")) return -1;else if (n === "-v") t++;else if ((n === "-k" || n === "-s") && r && FXa.test(r)) t += 2;else if (/^-[ks][A-Za-z0-9_.+-]+$/.test(n)) t++;else if (n.startsWith("-")) return -1;else break;
  }
  return t;
}

/**
 * Recursively peel off argv wrapper commands (time, nohup, timeout, nice)
 * to find the real command argv array.
 */
function v2p(e: any) {
  let t = e;
  for (;;) if (t[0] === "time" || t[0] === "nohup") t = t.slice(t[1] === "--" ? 2 : 1);else if (t[0] === "timeout") {
    let n = C2p(t);
    if (n < 0 || !t[n] || !/^\d+(?:\.\d+)?[smhd]?$/.test(t[n])) return t;
    t = t.slice(n + 1);
  } else if (t[0] === "nice" && t[1] === "-n" && t[2] && /^-?\d+$/.test(t[2])) t = t.slice(t[3] === "--" ? 4 : 3);else return t;
}

/** Return true if the command (or AST command node) passes non-allowlisted env vars to a subprocess. */
function w2p(e: any, t: any) {
  if (t) return t.envVars.some((s: any) => !Zhe(s.name));
  let n = /^([A-Za-z_][A-Za-z0-9_]*)\+?=/,
    r = /^[A-Za-z_][A-Za-z0-9_]*\+?=(?:"[^"$`\\]*"|'[^']*'|[A-Za-z0-9_./:+-]*)[ \t]+/,
    o = e.command;
  for (;;) {
    let s = o.match(n);
    if (!s) return !1;
    if (!Zhe(s[1])) return !0;
    let i = o.match(r);
    if (!i) return !0;
    o = o.slice(i[0].length);
  }
}

/**
 * Strip leading env-var assignments from a command string (supports quoted values and += syntax).
 * Stops early if `stopPattern` regex matches the assignment name (used to avoid stripping
 * non-safe vars).
 */
function HAo(e: any, t: any) {
  let n = /^([A-Za-z_][A-Za-z0-9_]*(?:\[[^\]]*\])?)\+?=(?:'[^'\n\r]*'|"(?:\\.|[^"$`\\\n\r])*"|\\.|[^ \t\n\r$`;|&()<>\\\\'"])*[ \t]+/,
    r = e,
    o = "";
  while (r !== o) {
    o = r, r = RAo(r);
    let s = r.match(n);
    if (!s) continue;
    if (t?.test(s[1])) break;
    r = r.slice(s[0].length);
  }
  return r.trim();
}

/**
 * Walk an argv array, peeling off wrapper commands and resolving to the "real"
 * argv using the R2p/x2p/k2p dispatch tables.
 */
function H2p(e: any) {
  let t = e.slice();
  for (;;) {
    while (t[0] !== void 0 && UXa.test(t[0])) t = t.slice(1);
    t = v2p(t);
    let n = t[0];
    if (n === void 0) return t;
    let r = R2p[n];
    if (r === void 0) return t;
    let o = x2p[n],
      s = k2p[n],
      i = 1,
      a: any,
      l = !1;
    while (i < t.length) {
      let c = t[i];
      if (c === "--") {
        if (i++, !l && s !== void 0 && i + 1 < t.length && s(t[i])) {
          l = !0, i++;
          continue;
        }
        break;
      }
      if (o !== void 0) {
        if (o.has(c) && t[i + 1] !== void 0) {
          let d = t[i + 1].trim();
          if (d !== "") {
            a = d;
            break;
          }
          i += 2;
          continue;
        }
        let u = c.indexOf("=");
        if (u > 0 && o.has(c.slice(0, u))) {
          let d = c.slice(u + 1).trim();
          if (d !== "") {
            a = d;
            break;
          }
          i++;
          continue;
        }
        if (c.length > 2 && c[1] !== "-" && o.has(c.slice(0, 2))) {
          let d = c.slice(2).trim();
          if (d !== "") {
            a = d;
            break;
          }
          i++;
          continue;
        }
      }
      if (c.startsWith("-") && (c !== "-" || s === void 0)) {
        if (n === "command" && /^-[pvV]+$/.test(c) && /[vV]/.test(c)) return t;
        i += r.has(c) && i + 1 < t.length ? 2 : 1;
        continue;
      }
      if (n === "env" && UXa.test(c)) {
        i++;
        continue;
      }
      if (!l && s?.(c) && i + 1 < t.length) {
        l = !0, i++;
        continue;
      }
      break;
    }
    if (a !== void 0) {
      if (t = a.trim().split(/\s+/), t.length === 0 || t[0] === "") return e.slice();
      continue;
    }
    if (i >= t.length) return t;
    t = t.slice(i);
  }
}

/**
 * Core permission check: compare a bash input command against allow/deny/ask rule maps,
 * optionally stripping env vars and skipping compound-command checks.
 */
function wAo(e: any, t: any, n: any, {
  stripAllEnvVars: r = !1,
  skipCompoundCheck: o = !1,
  astCommand: s,
  ruleBehavior: i
}: any = {}) {
  let a = e.command.trim(),
    l = nle(a).commandWithoutRedirections,
    u = (n === "exact" ? [a, l] : [l]).flatMap((p: any) => {
      let m = Gq(p);
      return m !== p ? [p, m] : [p];
    });
  if (r) {
    let p = s?.argv ?? lb(l),
      m = H2p(p);
    if (m.length > 0 && m[0] !== p[0]) u.push(m.join(" "));
    let f = new Set(u),
      A = 0;
    while (A < u.length) {
      let h = u.length;
      for (let g = A; g < h; g++) {
        let _ = u[g];
        if (!_) continue;
        let y = HAo(_);
        if (!f.has(y)) u.push(y), f.add(y);
        let T = Gq(_);
        if (!f.has(T)) u.push(T), f.add(T);
      }
      A = h;
    }
  }
  let d = new Map();
  if (n === "prefix" && !o) {
    for (let p of u) if (!d.has(p)) d.set(p, Zg(p).length > 1);
  }
  return Array.from(t.entries()).filter(([p]: any) => {
    let m = kAo(p);
    return u.some((f: any) => {
      switch (m.type) {
        case "exact":
          return m.command === f;
        case "prefix":
          {
            let A = m.prefix.replace(/[ \t]+/g, " "),
              h = f.replace(/[ \t]+/g, " ");
            switch (n) {
              case "exact":
                return A === h;
              case "prefix":
                {
                  if (d.get(f)) return !1;
                  if (h === A) return !0;
                  if (h.startsWith(A + " ")) return !0;
                  let g = "xargs " + A;
                  if (h === g) return !0;
                  return h.startsWith(g + " ");
                }
            }
            break;
          }
        case "wildcard":
          if (n === "exact") return !1;
          if (d.get(f)) return !1;
          if (L6e(m.pattern, f)) return !0;
          if (i !== "deny" && i !== "ask" && !L$i(m.pattern)) return !1;
          return L6e(`xargs ${m.pattern}`, f);
      }
    });
  }).map(([, p]: any) => p);
}

/** Look up matching deny/ask/allow rules for a bash command input, supporting exact and prefix modes. */
function v0e(e: any, t: any, n: any, {
  skipCompoundCheck: r = !1,
  astCommand: o
}: any = {}) {
  let s = getRuleByContentsForTool(t, Rl, "deny"),
    i = wAo(e, s, n, {
      stripAllEnvVars: !0,
      skipCompoundCheck: !0,
      astCommand: o,
      ruleBehavior: "deny"
    }),
    a = getRuleByContentsForTool(t, Rl, "ask"),
    l = wAo(e, a, n, {
      stripAllEnvVars: !0,
      skipCompoundCheck: !0,
      astCommand: o,
      ruleBehavior: "ask"
    }),
    c = getRuleByContentsForTool(t, Rl, "allow"),
    u = wAo(e, c, n, {
      skipCompoundCheck: r,
      ruleBehavior: "allow"
    });
  return {
    matchingDenyRules: i,
    matchingAskRules: l,
    matchingAllowRules: u
  };
}

/** Final permission decision for a single subcommand, merging rule-based and auto-suggest results. */
async function $Xa(e: any, t: any, n: any, r: any, o: any, s: any, i: any = []) {
  let a = Sqn(e, t);
  if (a.behavior === "deny" || a.behavior === "ask") return a;
  let l = zXa(e, t, r, o, s, i);
  if (l.behavior === "deny" || l.behavior === "ask") return l;
  if (l.behavior === "allow") return l;
  let c = n?.commandPrefix ? KXa(n.commandPrefix) : JHe(e.command);
  return {
    ...l,
    suggestions: c
  };
}

/** Auto-allow check when sandboxing is enabled: validates env vars and redirects are safe, skips certain rm/cd combos. */
function qXa(e: any, t: any, n: any, r: any) {
  if (!SandboxManager.isSandboxingEnabled() || !SandboxManager.isAutoAllowBashIfSandboxedEnabled() || !KL(e)) return null;
  let o = O2p(e, t, n);
  if (o.behavior === "passthrough") return null;
  let s = $Ot(),
    i = r.some((u: any) => !Zhe(u) && (s === null || s.has(u))) || n.some((u: any) => u.envVars.some((d: any) => !Zhe(d.name)) || u.argv.some((d: any) => {
      if (!d.includes("=") || d.startsWith("-")) return !1;
      let p = d.indexOf("="),
        m = d[p - 1] === "+" ? d.slice(0, p - 1) : d.slice(0, p);
      return !Zhe(m);
    })),
    a = n.some((u: any) => u.redirects.some((d: any) => /^\/dev\/(tcp|udp)\//.test(d.target)));
  if (i || a) return null;
  let l = !1,
    c = !1;
  for (let u of n) {
    let [d, ...p] = Qhe(u.argv),
      m = d?.replace(/^.*[\\/]/, "");
    if (m === "cd" || m === "pushd" || m === "popd" || m === "chdir") {
      l = !0;
      continue;
    }
    if (m !== "rm" && m !== "rmdir") continue;
    if (c = !0, x0n(m, p, Pt(), t).behavior !== "passthrough") return null;
  }
  if (l && c) return null;
  return o;
}

/**
 * Sandbox-mode fast-path for simple (non-compound, non-heredoc) commands:
 * returns allow/deny/ask without prompting the user when the command is deemed safe.
 */
function I2p(e: any, t: any, n: any) {
  if (!SandboxManager.isSandboxingEnabled() || !SandboxManager.isAutoAllowBashIfSandboxedEnabled() || !KL(e)) return null;
  if (n === void 0 || n === "PARSE_ABORT" || n === "ERROR") return null;
  if (/(?<!<)<<(?!<)/.test(e.command)) return null;
  if (/\$\{[\s|]/.test(e.command.replace(/['"\\]/g, ""))) return null;
  if (/\$\{![A-Za-z_0-9]/.test(e.command.replace(/['"\\]/g, ""))) return null;
  if (/\/proc\/.*\/environ/.test(e.command.replace(/['"\\]/g, ""))) return null;
  let r = eQa(e.command);
  if (r === null || r.length === 0) return null;
  let o: any;
  for (let s of r) {
    let {
      matchingDenyRules: i,
      matchingAskRules: a
    } = v0e({
      ...e,
      command: s
    }, t, "prefix");
    if (i[0] !== void 0) return {
      behavior: "deny",
      message: `Permission to use ${Rl.name} with command ${e.command.trim()} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: i[0]
      }
    };
    o ??= a[0];
  }
  for (let s of r) {
    let i = s.trim().split(/\s+/).filter(Boolean),
      a = P2p(i);
    if (a === null) return null;
    if (a.length === 0) continue;
    let l = Qhe(a),
      c = a.slice(0, a.length - l.length);
    if (c.some((f: any) => /["'`$\\(){}|;&<>*?[\]]/.test(f))) return null;
    if (c.some((f: any) => {
      let A = f.match(/^([A-Za-z_]\w*)\+?=/);
      return A !== null && _Re(A[1]);
    })) return null;
    let u = l.map((f: any) => f.replace(/['"\\]/g, ""));
    if (u.some((f: any) => {
      let A = f.match(/^([A-Za-z_]\w*)\+?=/);
      return A !== null && _Re(A[1]);
    })) return null;
    let d = l.some((f: any, A: any) => {
        if (A === 0) return !1;
        if (f.includes("$'") && !/^'[^']*\$'$/.test(f) || f.includes('$"') && !/^"[^"]*\$"$/.test(f)) return !0;
        let h = u[A];
        return h.includes("`") || /\$\((?!\()/.test(h) || /\$[^(\s]/.test(h) && h.includes("-") || /\$\{[^}]*:?[+=]/.test(h) || /\{[^\s]*(,|\.\.)/.test(f) || (h.match(/\{/g) ?? []).length !== (h.match(/\}/g) ?? []).length;
      }),
      p = u.some((f: any, A: any) => A > 0 && f.includes("$")),
      m = l[0];
    if (m === void 0 || !/^[A-Za-z0-9._/~+][A-Za-z0-9._/~+-]*$/.test(m) || C1i(m) || jXa.has(m) || jXa.has(m.replace(/^.*[\\/]/, "")) || D2p.has(m) && (d || u.some((f: any) => f.includes("[") && /[$`]/.test(f))) || m === "test" && (d || u.some((f: any) => f === "-t" || ytt.has(f))) || m === "jq" || m === "find" && (d || (() => {
      for (let f = 1; f < u.length; f++) {
        let A = u[f];
        if (I6r.has(A)) return !0;
        if (pPt.has(l[f]) || mPt.test(l[f])) {
          let h = u[f + 1];
          if (h !== void 0 && (!h.includes("$") || /^["'].*["']$/.test(l[f + 1]) && /^\$\{?[A-Za-z_]\w*\}?$/.test(h))) {
            f++;
            continue;
          }
        }
        if (A.includes("$") || /[[\]*?]/.test(A)) return !0;
      }
      return !1;
    })()) || m === "jobs" && (d || p || u.some((f: any) => /^-[^-]*x/.test(f))) || m === "set" && (d || (() => {
      for (let f = 1; f < u.length; f++) {
        let A = u[f];
        if (A === "--") return !1;
        if (A.includes("$")) return !0;
        if (!/^[-+]/.test(A)) continue;
        for (let h = 1; h < A.length; h++) {
          let g = A[h];
          if (g === "o") {
            let _ = h < A.length - 1 ? A.slice(h + 1) : u[f + 1];
            if (_ !== void 0 && _ !== "" && !O6r.has(_.toLowerCase().replace(/[_-]/g, ""))) return !0;
            break;
          }
          if (g === "A") break;
          if (!L6r.has(g)) return !0;
        }
      }
      return !1;
    })())) return null;
  }
  if (o) return {
    behavior: "ask",
    message: Yp(Rl.name),
    decisionReason: {
      type: "rule",
      rule: o
    }
  };
  return {
    behavior: "allow",
    updatedInput: e,
    decisionReason: {
      type: "other",
      reason: SANDBOX_AUTO_ALLOW_REASON
    }
  };
}

/** Strip leading env-var assignments from an argv array; return null if any assignment is a built-in env var. */
function P2p(e: any) {
  let t = 0;
  while (t < e.length) {
    let r = e[t].match(/^([A-Za-z_][A-Za-z0-9_]*)\+?=(.*)$/);
    if (r === null) break;
    if (_Re(r[1])) return null;
    if (/["'`$\\(){}|;&<>*?[\]]/.test(r[2])) return null;
    t++;
  }
  return t === 0 ? e : e.slice(t);
}

/** Check a single subcommand (prefix match) against deny/ask rules and return a behavior decision. */
function O2p(e: any, t: any, n: any) {
  let r = e.command.trim(),
    {
      matchingDenyRules: o,
      matchingAskRules: s
    } = v0e(e, t, "prefix", {
      astCommand: n.length === 1 ? n[0] : void 0
    });
  if (o[0] !== void 0) return {
    behavior: "deny",
    message: `Permission to use ${Rl.name} with command ${r} has been denied.`,
    decisionReason: {
      type: "rule",
      rule: o[0]
    }
  };
  if (n.length > 1) {
    let i: any;
    for (let a of n) {
      let l = v0e({
        command: a.text
      }, t, "prefix", {
        astCommand: a
      });
      if (l.matchingDenyRules[0] !== void 0) return {
        behavior: "deny",
        message: `Permission to use ${Rl.name} with command ${r} has been denied.`,
        decisionReason: {
          type: "rule",
          rule: l.matchingDenyRules[0]
        }
      };
      i ??= l.matchingAskRules[0];
    }
    if (i) return {
      behavior: "ask",
      message: Yp(Rl.name),
      decisionReason: {
        type: "rule",
        rule: i
      }
    };
  }
  if (s[0] !== void 0) return {
    behavior: "ask",
    message: Yp(Rl.name),
    decisionReason: {
      type: "rule",
      rule: s[0]
    }
  };
  return {
    behavior: "allow",
    updatedInput: e,
    decisionReason: {
      type: "other",
      reason: SANDBOX_AUTO_ALLOW_REASON
    }
  };
}

/** Filter subcommand lists by removing safe `cd <workdir>` commands to reduce noise. */
function L2p(e: any, t: any, n: any, r: any) {
  let o: any[] = [],
    s: any[] = [];
  for (let i = 0; i < e.length; i++) {
    let a = e[i],
      l = t?.[i];
    if ((a === `cd ${n}` || a === `cd ${r}`) && l !== void 0 && l.argv.length === 2 && l.argv[0] === "cd" && l.envVars.length === 0 && l.redirects.length === 0 && !/[*?[\]]/.test(l.argv[1]) && !rm(l.argv[1])) continue;
    o.push(a), s.push(l);
  }
  return {
    subcommands: o,
    astCommandsByIdx: s
  };
}

/** Return true if a command string contains only simple sequential operators (no ; || & newlines). */
function M2p(e: any) {
  if (e.includes("||") || e.includes(";")) return !1;
  if (e.includes(`
`)) return !1;
  if (e.replaceAll("&&", "").includes("&")) return !1;
  return !0;
}

/**
 * If the AST command is a simple `cd <path>` that navigates within allowed working directories,
 * return the resolved destination path, otherwise null.
 */
function N2p(e: any, t: any, n: any) {
  if (!e) return null;
  if (e.envVars.length > 0 || e.redirects.length > 0) return null;
  if (e.argv.length !== 2 || e.argv[0] !== "cd") return null;
  let r = e.argv[1];
  if (rm(r)) return null;
  if (r.startsWith("-")) return null;
  if (!JXa(r)) return null;
  if (/[*?[\]]/.test(r)) return null;
  let {
    allowed: o,
    resolvedPath: s
  } = TPt(r, t, n, "read");
  if (!o) return null;
  if (!pathInAllowedWorkingPath(s, n, [s])) return null;
  return s;
}

/** Validate that all `cd` commands in a set of subcommands stay within the same filesystem device. */
async function B2p(e: any, t: any, n: any) {
  let r = await IAo(n);
  if (r === null) return !1;
  let o = !1;
  for (let s = 0; s < t.length; s++) {
    if (!Hke(t[s])) continue;
    o = !0;
    let i = e[s];
    if (!i) return !1;
    if (i.envVars.length > 0 || i.redirects.length > 0) return !1;
    if (i.argv.length !== 2 || i.argv[0] !== "cd") return !1;
    if (rm(i.argv[1])) return !1;
    let a = zt() === "windows" ? YXa(t[s]) : i.argv[1];
    if (a === null) return !1;
    if (!(await XXa(a, n, r))) return !1;
  }
  return o;
}

/** Validate that all `cd`-like subcommands (text form) stay on the same filesystem device. */
async function F2p(e: any, t: any) {
  let n = await IAo(t);
  if (n === null) return !1;
  let r = !1;
  for (let o of e) {
    let s = o.trim();
    if (!Hke(s)) continue;
    r = !0;
    let i = YXa(s);
    if (i === null) return !1;
    if (!(await XXa(i, t, n))) return !1;
  }
  return r;
}

/** Extract the path argument from a "cd <path>" string, handling quoted and plain forms. */
function YXa(e: any) {
  let t = e.trim();
  if (!t.startsWith("cd ")) return null;
  let n = t.slice(3).trim();
  if (n.length === 0) return null;
  let r = n[0];
  if (r === '"' || r === "'") {
    if (n.length < 2 || n.at(-1) !== r) return null;
    let o = n.slice(1, -1);
    if (o.includes(r)) return null;
    if (r === '"' && o.includes("\\") && zt() !== "windows") return null;
    return o;
  }
  if (/\s/.test(n)) return null;
  if (/['"]/.test(n)) return null;
  if (n.includes("\\")) {
    if (zt() !== "windows" || !ZL.isAbsolute(n)) return null;
  }
  return n;
}

/** Return true if the path is relative-safe: absolute, ./, ../, ., or .. */
function JXa(e: any) {
  return ZL.isAbsolute(e) || e.startsWith("./") || e.startsWith("../") || e === "." || e === "..";
}

/** Verify a `cd` target path is safe: no shell metacharacters, resolves to same device as cwd. */
async function XXa(e: any, t: any, n: any) {
  if (e.startsWith("-")) return !1;
  if (!JXa(e)) return !1;
  if (e.includes("$") || e.includes("`") || /[*?[]/.test(e) || zt() !== "windows" && e.includes("\\") || zt() === "windows" && e.includes("%")) return !1;
  if (VH(e) || zt() === "windows" && /^[\\/]{2}/.test(e)) return !1;
  let r = ZL.isAbsolute(e) ? e : ZL.resolve(t, e),
    o = await IAo(r);
  if (o === null) return !1;
  return o === n;
}

/** Resolve a path to its real (symlink-resolved, lowercased on Windows) absolute path. */
async function IAo(e: any) {
  let t = await WXa.realpath(e).catch(() => null);
  if (t === null) return null;
  return zt() === "windows" ? t.toLowerCase() : t;
}

/** Combined deny/ask check for a command; returns null if neither deny nor ask rules match. */
function QXa(e: any, t: any) {
  let {
    matchingDenyRules: n,
    matchingAskRules: r
  } = v0e(e, t, "prefix");
  if (n[0] !== void 0) return {
    behavior: "deny",
    message: `Permission to use ${Rl.name} with command ${e.command} has been denied.`,
    decisionReason: {
      type: "rule",
      rule: n[0]
    }
  };
  let o = Sqn(e, t);
  if (o.behavior === "deny") return o;
  if (r[0] !== void 0) return {
    behavior: "ask",
    message: Yp(Rl.name),
    decisionReason: {
      type: "rule",
      rule: r[0]
    }
  };
  if (o.behavior !== "passthrough") return o;
  return null;
}

/** Check a too-complex command (can't be split into subcommands): deny if any subcommand matches deny rules, else allow if exact-match allow. */
function U2p(e: any, t: any) {
  let n = QXa(e, t);
  if (n?.behavior === "deny") return n;
  for (let s of Zg(e.command)) {
    let i = v0e({
      ...e,
      command: s
    }, t, "prefix").matchingDenyRules[0];
    if (i !== void 0) return {
      behavior: "deny",
      message: `Permission to use ${Rl.name} with command ${e.command} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: i
      }
    };
  }
  let r = Waa(e.command);
  if (r !== null) {
    logEvent("tengu_bash_dangerous_rm_too_complex", {});
    let {
      command: s,
      target: i
    } = r;
    return g9e(s, `Dangerous ${s} operation detected: '${i}'

This target is a shell variable expansion that points at the filesystem ` + "root (or a top-level directory) when the variable is unset or empty \u2014 " + "e.g. `rm -rf $UNSET/*` becomes `rm -rf /*`. This requires explicit approval and cannot be auto-allowed by permission rules.", `on possibly-empty variable path: ${i}`);
  }
  if (n === null || n.behavior !== "allow") return n;
  return (n.decisionReason?.type === "rule" ? n.decisionReason.rule.ruleValue.ruleContent : void 0) === e.command.trim() ? n : null;
}

/** Check a semantically-invalid command (parsed but not simple): deny on deny rules, allow only if exact-match. */
function $2p(e: any, t: any, n: any) {
  let r = QXa(e, t);
  if (r?.behavior === "deny") return r;
  for (let o of n) {
    let s = v0e({
      ...e,
      command: o.text
    }, t, "prefix", {
      astCommand: o
    }).matchingDenyRules[0];
    if (s !== void 0) return {
      behavior: "deny",
      message: `Permission to use ${Rl.name} with command ${e.command} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: s
      }
    };
  }
  if (r?.behavior === "allow") {
    if ((r.decisionReason?.type === "rule" ? r.decisionReason.rule.ruleValue.ruleContent : void 0) === e.command.trim()) return r;
  }
  if (r?.behavior === "ask") return r;
  return null;
}

/** Pre-cache a LLM-based prompt-rule check so the result is ready before the user is asked. */
function qKa(e: any, t: any, n: any, r: any) {
  if (!uxe()) return !1;
  if (t.mode === "auto") return !1;
  if (t.mode === "bypassPermissions") return !1;
  let o = NRn(t);
  if (o.length === 0) return !1;
  let s = Pt(),
    i = BRn(e, s, o, "allow", n, r);
  return i.catch(() => {}), ZXa.set(e, i), !0;
}

/** Clear the prompt-rule pre-cache. */
function bqn() {
  ZXa.clear();
}

/**
 * Main bash tool permission check entry point.
 * Parses the command AST, runs deny/ask/allow rule checks, sandbox auto-allow,
 * LLM prompt rules, multi-cd safety, and composes the final decision.
 */
async function Y9t(e: any, t: any, n: any = f4t) {
  let r = Fr(t);
  R$i(t.sessionEnvVars?.keys() ?? []);
  let o = await parseCommandRaw(e.command),
    s = o ? dPt(e.command, o) : {
      kind: "simple",
      commands: [],
      bareAssignmentNames: []
    };
  if (s.kind === "too-complex") {
    let V = U2p(e, r);
    if (V !== null) return V;
    let Q = I2p(e, r, s.nodeType);
    if (Q !== null) return Q;
    let K = {
      type: "other",
      reason: s.reason,
      bashMissKind: "too-complex"
    };
    return logEvent("tengu_bash_ast_too_complex", {
      nodeTypeId: f1i(s.nodeType)
    }), {
      behavior: "ask",
      decisionReason: K,
      message: Yp(Rl.name, K),
      suggestions: [],
      ...{}
    };
  }
  let i = s.commands,
    a = w1i(i);
  if (!a.ok) {
    let V = $2p(e, r, i);
    if (V !== null) return V;
    if (a.kind === "newline-hash") {
      let K = qXa(e, r, i, s.bareAssignmentNames);
      if (K) return K;
    }
    let Q = {
      type: "other",
      reason: a.reason,
      bashMissKind: "semantics"
    };
    return {
      behavior: "ask",
      decisionReason: Q,
      message: Yp(Rl.name, Q),
      suggestions: []
    };
  }
  let l = i.map((V: any) => V.text),
    c = i.flatMap((V: any) => V.redirects),
    u = qXa(e, r, i, s.bareAssignmentNames);
  if (u) return u;
  let d = Sqn(e, r);
  if (d.behavior === "deny") return d;
  if (uxe() && r.mode !== "auto") {
    let V = k$i(r),
      Q = H$i(r),
      K = V.length > 0,
      Y = Q.length > 0;
    if (K || Y) {
      let [J, ee] = await Promise.all([K ? BRn(e.command, Pt(), V, "deny", t.abortController.signal, t.options.isNonInteractiveSession) : null, Y ? BRn(e.command, Pt(), Q, "ask", t.abortController.signal, t.options.isNonInteractiveSession) : null]);
      if (t.abortController.signal.aborted) throw new vu();
      if (J) BXa(e.command, "deny", V, J);
      if (ee) BXa(e.command, "ask", Q, ee);
      if (J?.matches && J.confidence === "high") return {
        behavior: "deny",
        message: `${BASH_PROMPT_RULE_DENY_PREFIX}: "${J.matchedDescription}"`,
        decisionReason: {
          type: "safetyCheck",
          reason: `${BASH_PROMPT_RULE_DENY_PREFIX}: "${J.matchedDescription}"`,
          classifierApprovable: !1
        }
      };
      if (ee?.matches && ee.confidence === "high") {
        let te: any;
        if (n === f4t) te = JHe(e.command);else {
          let ne = await n(e.command, t.abortController.signal, t.options.isNonInteractiveSession);
          if (t.abortController.signal.aborted) throw new vu();
          te = ne?.commandPrefix ? KXa(ne.commandPrefix) : JHe(e.command);
        }
        return {
          behavior: "ask",
          message: Yp(Rl.name),
          decisionReason: {
            type: "other",
            reason: `Required by Bash prompt rule: "${ee.matchedDescription}"`,
            bashMissKind: "prompt-ask-rule"
          },
          suggestions: te,
          ...{}
        };
      }
    }
  }
  let p = await OXa(e, (V: any) => Y9t(V, t, n), {
    isNormalizedCdCommand: Hke,
    isNormalizedGitCommand: K1t
  }, o, i, (V: any) => F2p(V, Pt()));
  if (p.behavior !== "passthrough") {
    if (p.behavior === "allow") {
      r = Fr(t);
      let V = k0n(e, Pt(), r, V3t(e.command), c, i);
      if (V.behavior === "deny" || V.behavior === "ask" && !V.bashAllowRuleOverridable) return V;
    }
    if (p.behavior === "ask") return r = Fr(t), {
      ...p,
      ...{}
    };
    return p;
  }
  let m = Pt(),
    f = zt() === "windows" ? UD(m) : m,
    {
      subcommands: A,
      astCommandsByIdx: h
    } = L2p(l, i, m, f),
    g = A.filter((V: any) => Hke(V));
  if (g.length > 1) {
    let Q = fs([m, ...allWorkingDirectories(Fr(t))].flatMap((oe: any) => {
        let {
          resolvedPath: ce
        } = jp(jt(), oe);
        return ce === oe ? [oe] : [oe, ce];
      }).map((oe: any) => ZL.normalize(oe))).map((oe: any) => ({
        exact: normalizeCaseForComparison(oe),
        prefix: normalizeCaseForComparison(/[\\/]$/.test(oe) ? oe : oe + ZL.sep)
      })),
      K = (oe: any) => {
        let ce = normalizeCaseForComparison(ZL.normalize(oe));
        return Q.some((ue: any) => ce === ue.exact || ce.startsWith(ue.prefix));
      },
      J = !/[;|\n&]/.test(e.command.replace(/&&/g, "")),
      {
        resolvedPath: ee
      } = jp(jt(), m),
      te = fs([ZL.normalize(m), ZL.normalize(ee)]),
      ne: any[] = [];
    for (let oe of i) {
      let [ce, ...ue] = Qhe(oe.argv),
        ae = ce?.replace(/^.*[\\/]/, "");
      if (ae === "cd" || ae === "chdir" || ae === "pushd" || ae === "popd") {
        if (ae === "popd") {
          if (ue.length === 0 && ne.length > 0) te = ne.pop();else J = !1;
        } else {
          let se = ue.filter((_e: any) => _e !== "--" && (_e === "-" || !_e.startsWith("-"))),
            le = se.length === 1 ? se[0] : void 0,
            pe = !1,
            de: any[] = [];
          if (le !== void 0 && le !== "-" && !/^[+-]\d+$/.test(le) && !le.startsWith("~") && !/[*?[]/.test(le) && !rm(le) && !/(^|[\\/])\.\.([\\/]|$)/.test(le)) {
            pe = !0;
            for (let _e of te) {
              let fe = ZL.isAbsolute(le) ? ZL.normalize(le) : ZL.resolve(_e, le),
                {
                  resolvedPath: ie
                } = jp(jt(), fe);
              if (!K(fe) || !K(ie)) {
                pe = !1;
                break;
              }
              de.push(ZL.normalize(fe), ZL.normalize(ie));
            }
          }
          if (J &&= pe, pe) {
            if (ae === "pushd") ne.push(te);
            te = fs(de);
          }
        }
        continue;
      }
      if (ae !== "rm" && ae !== "rmdir") continue;
      let he = x0n(ae, ue, m, Fr(t), !J);
      if (he.behavior !== "passthrough") return he;
    }
    let re = {
      type: "other",
      reason: "Multiple directory changes in one command require approval for clarity",
      bashMissKind: "multi-cd"
    };
    return {
      behavior: "ask",
      decisionReason: re,
      message: Yp(Rl.name, re)
    };
  }
  let _ = g.length > 0,
    y = m,
    T = _,
    S = !1;
  if (_ && A.length > 1 && A.length === l.length && Hke(A[0]) && M2p(e.command)) {
    let V = N2p(h[0], m, r);
    if (V !== null) y = V, T = !1, S = !0;
  }
  if (_) {
    if (A.some((Q: any) => K1t(Q.trim())) && !(await B2p(h, A, m))) {
      let Q = {
        type: "other",
        reason: "This command changes directory before running git, which can execute untrusted hooks from the target directory. Approve only if you trust it.",
        bashMissKind: "cd-git-compound"
      };
      return {
        behavior: "ask",
        decisionReason: Q,
        message: Yp(Rl.name, Q)
      };
    }
  }
  if (A.some((Q: any) => K1t(Q.trim())) && (H0n(h, y) || G1t(e.command))) {
    let Q = {
      type: "other",
      reason: "This command creates git repository structure files (HEAD/objects/refs/hooks) and then runs git, which can execute hooks/fsmonitor from the created files.",
      bashMissKind: "cd-git-compound"
    };
    return {
      behavior: "ask",
      decisionReason: Q,
      message: Yp(Rl.name, Q)
    };
  }
  r = Fr(t);
  let v = A.map((V: any, Q: any) => zXa({
    command: V
  }, r, T, h[Q], S && Q === 0 ? m : y, s.bareAssignmentNames));
  if (v.find((V: any) => V.behavior === "deny") !== void 0) return {
    behavior: "deny",
    message: `Permission to use ${Rl.name} with command ${e.command} has been denied.`,
    decisionReason: {
      type: "subcommandResults",
      reasons: new Map(v.map((V: any, Q: any) => [A[Q], V]))
    }
  };
  let k = h.slice(S ? 1 : 0).filter((V: any) => V !== void 0),
    x = k0n(e, y, r, T, c, k);
  if (x.behavior === "deny") return x;
  let H = A.map((V: any, Q: any) => [V, Q]).filter(([V]: any) => AJr(V)).map(([, V]: any) => V);
  if (H.length > 0) {
    let V = H.every((Y: any) => {
        let J = v[Y];
        return J?.behavior === "allow" && J.decisionReason?.type === "rule";
      }),
      Q = v.some((Y: any) => Y.behavior !== "allow"),
      K = x.behavior === "ask" && !x.bashAllowRuleOverridable;
    if (!V && !Q && !K && d.behavior !== "allow") {
      let Y = new Set(H.filter((ee: any) => {
          let te = v[ee];
          return te?.behavior === "allow" && te.decisionReason?.type === "rule";
        }).map((ee: any) => A[ee].trim())),
        J = hJr(e, r, Y);
      if (J.behavior === "ask") return {
        ...J,
        ...{}
      };
    }
  }
  let I = v.find((V: any) => V.behavior === "ask"),
    P = Wn(v, (V: any) => V.behavior !== "allow");
  if (x.behavior === "ask" && I === void 0 && !x.bashAllowRuleOverridable) return x;
  if (I !== void 0 && P === 1) return {
    ...I,
    ...{}
  };
  if (d.behavior === "allow") return d;
  if (v.every((V: any) => V.behavior === "allow")) return {
    behavior: "allow",
    updatedInput: e,
    decisionReason: {
      type: "subcommandResults",
      reasons: new Map(v.map((V: any, Q: any) => [A[Q], V]))
    }
  };
  let L = null;
  if (n !== f4t) {
    if (L = await n(e.command, t.abortController.signal, t.options.isNonInteractiveSession), t.abortController.signal.aborted) throw new vu();
  }
  if (r = Fr(t), A.length === 1) {
    let V = await $Xa({
      command: A[0]
    }, r, L, T, h[0], y, s.bareAssignmentNames);
    if (V.behavior === "ask" || V.behavior === "passthrough") return {
      ...V,
      ...{}
    };
    return V;
  }
  let D: any[] = [];
  for (let V = 0; V < A.length; V++) {
    let Q = A[V];
    D.push(await $Xa({
      ...e,
      command: Q
    }, r, L?.subcommandPrefixes.get(Q), T, h[V], S && V === 0 ? m : y, s.bareAssignmentNames));
  }
  let N = {
      deny: 3,
      ask: 2,
      passthrough: 1,
      allow: 0
    },
    O = new Map();
  for (let V = 0; V < A.length; V++) {
    let Q = A[V],
      K = D[V],
      Y = O.get(Q),
      J = N[K.behavior],
      ee = Y ? N[Y.behavior] : -1;
    if (!Y || J > ee || J === ee && findSafetyCheckReason(K.decisionReason) !== void 0 && findSafetyCheckReason(Y.decisionReason) === void 0) O.set(Q, K);
  }
  if (D.every((V: any) => V.behavior === "allow")) return {
    behavior: "allow",
    updatedInput: e,
    decisionReason: {
      type: "subcommandResults",
      reasons: O
    }
  };
  let $ = new Map();
  for (let V = 0; V < D.length; V++) {
    let Q = A[V],
      K = D[V];
    if (K.behavior === "ask" || K.behavior === "passthrough") {
      let Y = "suggestions" in K ? K.suggestions : void 0,
        J = GOt(Y);
      for (let ee of J) {
        let te = Qm(ee);
        $.set(te, ee);
      }
      if (K.behavior === "ask" && J.length === 0 && K.decisionReason?.type !== "rule") for (let ee of GOt(JHe(Q))) {
        let te = Qm(ee);
        $.set(te, ee);
      }
    }
  }
  let U = {
      type: "subcommandResults",
      reasons: O
    },
    W = Array.from($.values()).slice(0, b2p),
    G = W.length > 0 ? [{
      type: "addRules",
      rules: W,
      behavior: "allow",
      destination: "localSettings"
    }] : void 0;
  return {
    behavior: I !== void 0 ? "ask" : "passthrough",
    message: Yp(Rl.name, U),
    decisionReason: U,
    suggestions: G,
    ...{}
  };
}

/** Return true if the command (after stripping wrappers) invokes git. */
function K1t(e: any) {
  if (e.startsWith("git ") || e === "git") return !0;
  let t = Gq(e),
    n = lb(t);
  if (n[0] === "git") return !0;
  if (n[0] === "xargs" && n.includes("git")) return !0;
  return !1;
}

/** Return true if the command is a directory-change built-in (cd/pushd/popd/chdir). */
function Hke(e: any) {
  let t = lb(Gq(e))[0];
  return t === "cd" || t === "pushd" || t === "popd" || t === "chdir";
}

/** Return true if any subcommand in the piped/chained command is a cd-like invocation. */
function V3t(e: any) {
  return Zg(e).some((t: any) => Hke(t.trim()));
}
var WXa: any,
  ZL: any,
  xAo: any,
  b2p = 5,
  GXa: any,
  xXa: any,
  kAo: any,
  A4t: any,
  FXa: any,
  R2p: any,
  x2p: any,
  k2p: any,
  UXa: any,
  Sqn = (e: any, t: any) => {
    let n = e.command.trim(),
      {
        matchingDenyRules: r,
        matchingAskRules: o,
        matchingAllowRules: s
      } = v0e(e, t, "exact");
    if (r[0] !== void 0) return {
      behavior: "deny",
      message: `Permission to use ${Rl.name} with command ${n} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: r[0]
      }
    };
    if (o[0] !== void 0) return {
      behavior: "ask",
      message: Yp(Rl.name),
      decisionReason: {
        type: "rule",
        rule: o[0]
      }
    };
    if (s[0] !== void 0) return {
      behavior: "allow",
      updatedInput: e,
      decisionReason: {
        type: "rule",
        rule: s[0]
      }
    };
    let i = {
      type: "other",
      reason: "This command requires approval",
      bashMissKind: "no-rule-match"
    };
    return {
      behavior: "passthrough",
      message: Yp(Rl.name, i),
      decisionReason: i,
      suggestions: JHe(n)
    };
  },
  zXa = (e: any, t: any, n: any, r: any, o: any = Pt(), s: any = []) => {
    let i = e.command.trim(),
      a = Sqn(e, t);
    if (a.behavior === "deny" || a.behavior === "ask") return a;
    let {
      matchingDenyRules: l,
      matchingAskRules: c,
      matchingAllowRules: u
    } = v0e(e, t, "prefix", {
      skipCompoundCheck: r !== void 0,
      astCommand: r
    });
    if (l[0] !== void 0) return {
      behavior: "deny",
      message: `Permission to use ${Rl.name} with command ${i} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: l[0]
      }
    };
    if (c[0] !== void 0) return {
      behavior: "ask",
      message: Yp(Rl.name),
      decisionReason: {
        type: "rule",
        rule: c[0]
      }
    };
    let d = k0n(e, o, t, n, r?.redirects, r ? [r] : void 0);
    if (d.behavior === "deny" || d.behavior === "ask" && !d.bashAllowRuleOverridable) return d;
    if (a.behavior === "allow") return a;
    if (u[0] !== void 0) return {
      behavior: "allow",
      updatedInput: e,
      decisionReason: {
        type: "rule",
        rule: u[0]
      }
    };
    if (d.behavior === "ask") return d;
    let p = Naa(e, t);
    if (p.behavior !== "passthrough") return p;
    let m = MXa(e, t);
    if (m.behavior !== "passthrough") return m;
    let f = $Ot();
    if (Rl.isReadOnly(e) && !w2p(e, r) && !s.some((h: any) => !Zhe(h) && (f === null || f.has(h)))) return {
      behavior: "allow",
      updatedInput: e,
      decisionReason: {
        type: "other",
        reason: READ_ONLY_AUTO_ALLOW_REASON
      }
    };
    let A = {
      type: "other",
      reason: "This command requires approval",
      bashMissKind: "no-rule-match"
    };
    return {
      behavior: "passthrough",
      message: Yp(Rl.name, A),
      decisionReason: A,
      suggestions: JHe(i)
    };
  },
  D2p: any,
  jXa: any,
  ZXa: any;
var HL = b(() => {
  LD();
  Ct();
  U2();
  see();
  AN();
  gRe();
  qOt();
  Ql();
  Go();
  bt();
  ws();
  nA();
  lx();
  qAe();
  Sw();
  ay();
  X2e();
  qs();
  Ag();
  lae();
  Xt();
  dr();
  L2();
  TU();
  LXa();
  NXa();
  _Jr();
  V1t();
  R0n();
  t6e();
  WXa = require("fs/promises"), ZL = require("path"), xAo = /^[A-Za-z_]\w*=/;
  GXa = new Set(["sh", "bash", "zsh", "fish", "csh", "tcsh", "ksh", "dash", "cmd", "powershell", "pwsh", "env", "xargs", "command", "builtin", "noglob", "nice", "stdbuf", "nohup", "timeout", "time", "watch", "ionice", "chrt", "setsid", "taskset", "strace", "ltrace", "script", "flock", "unshare", "nsenter", "sudo", "doas", "pkexec"]);
  xXa = VOt;
  kAo = $Rn, A4t = new Set(["GOEXPERIMENT", "GOOS", "GOARCH", "CGO_ENABLED", "GO111MODULE", "RUST_BACKTRACE", "RUST_LOG", "NODE_ENV", "PYTHONUNBUFFERED", "PYTHONDONTWRITEBYTECODE", "PYTEST_DISABLE_PLUGIN_AUTOLOAD", "PYTEST_DEBUG", "ANTHROPIC_API_KEY", "LANG", "LANGUAGE", "LC_ALL", "LC_CTYPE", "LC_TIME", "CHARSET", "TERM", "COLORTERM", "NO_COLOR", "FORCE_COLOR", "TZ", "LS_COLORS", "LSCOLORS", "GREP_COLOR", "GREP_COLORS", "GCC_COLORS", "TIME_STYLE", "BLOCK_SIZE", "BLOCKSIZE", "COLUMNS", "LINES", "CLICOLOR", "CLICOLOR_FORCE", "CI", "DEBIAN_FRONTEND", "GIT_TERMINAL_PROMPT"]);
  FXa = /^[A-Za-z0-9_.+-]+$/;
  R2p = {
    env: new Set(["-u", "-C", "--unset", "--chdir"]),
    sudo: new Set(["-u", "-g", "-U", "-C", "-D", "-h", "-p", "-r", "-R", "-t", "-T", "--user", "--group", "--other-user", "--close-from", "--chdir", "--host", "--prompt", "--role", "--chroot", "--type", "--command-timeout", "-a", "--auth-type"]),
    doas: new Set(["-a", "-u", "-C"]),
    pkexec: new Set(["--user"]),
    watch: new Set(["-n", "--interval", "--equexit"]),
    ionice: new Set(["-c", "-n", "-p", "-P", "-u", "--class", "--classdata", "--pid", "--pgid", "--uid"]),
    setsid: new Set([]),
    taskset: new Set(["-c", "--cpu-list"]),
    chrt: new Set(["-p", "--pid", "-T", "-P", "-D", "--sched-runtime", "--sched-period", "--sched-deadline"]),
    strace: new Set(["-e", "-o", "-p", "-s", "-E", "-P", "-S", "-a", "-b", "-I", "-u", "-X", "-O", "-U", "--output", "--trace", "--expr", "--attach", "--string-limit", "--env", "--trace-path", "--columns", "--user", "--interruptible", "--detach-on", "--const-print-style", "--summary-sort-by", "--summary-syscall-overhead", "--summary-columns"]),
    ltrace: new Set(["-a", "-A", "-e", "-l", "-n", "-o", "-p", "-s", "-u", "-x", "-D", "-F", "--align", "--config", "--debug", "--indent", "--library", "--output", "--string-max", "-w", "--where"]),
    flock: new Set(["-w", "-E", "--timeout", "--wait", "--conflict-exit-code"]),
    script: new Set(["-E", "-T", "-m", "-o", "-O", "-B", "-I", "--echo", "--log-timing", "--logging-format", "--output-limit", "--log-out", "--log-io", "--log-in"]),
    unshare: new Set(["-R", "-w", "-S", "-G", "--setuid", "--setgid", "--root", "--wd", "--propagation", "--setgroups", "--monotonic", "--boottime"]),
    nsenter: new Set(["-t", "-S", "-G", "--target", "--setuid", "--setgid"]),
    exec: new Set(["-a"]),
    command: new Set([]),
    builtin: new Set([]),
    noglob: new Set([]),
    nocorrect: new Set([])
  }, x2p = {
    env: new Set(["-S", "--split-string"]),
    flock: new Set(["-c", "--command"]),
    script: new Set(["-c", "--command"])
  }, k2p = {
    chrt: (e: any) => /^\d+$/.test(e),
    taskset: (e: any) => /^(0x[\da-f]+|\d+)$/i.test(e),
    flock: () => !0,
    script: () => !0
  }, UXa = /^[A-Za-z_][A-Za-z0-9_]*\+?=/;
  D2p = new Set(["printf", "test", "read", "wait", "unset", ...fPt]), jXa = new Set(["time", "nohup", "timeout", "nice", "stdbuf", "env", "command", "builtin", "noglob"]);
  ZXa = new Map();
});
export {BXa,Tqn,VXa,JHe,E2p,KXa,L6e,Zhe,RAo,Gq,C2p,v2p,w2p,HAo,H2p,wAo,v0e,$Xa,qXa,I2p,P2p,O2p,L2p,M2p,N2p,B2p,F2p,YXa,JXa,XXa,IAo,QXa,U2p,$2p,qKa,bqn,Y9t,K1t,Hke,V3t,WXa,ZL,xAo,b2p,GXa,xXa,kAo,A4t,FXa,R2p,x2p,k2p,UXa,Sqn,zXa,D2p,jXa,ZXa,HL};
