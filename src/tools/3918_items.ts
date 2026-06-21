// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as i8} from "../../vendor/m321.ts";
import {Ri as N7,pi as Y7} from "./2227_userFacingName.ts";
import {Go as Qq,Pt as u_} from "../../vendor/m632.ts";
import {bt as G_,Pn as x6} from "../../vendor/m195.ts";
import {mc as w1,moe as a8H,CB as IS} from "../config/0645_maxBytes.ts";
import {ws as Z9,jt as n_} from "../../vendor/m228.ts";
import {Iu as Z5,Ds as k9,w7e as ElH} from "../../vendor/m643.ts";
import {nA as S$,checkReadPermissionForTool as eHH,normalizePatternsToPath as hmH,getFileReadIgnorePatterns as kmH} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {X2e as tbH,oW as CQ} from "../../vendor/m2778.ts";
import {L2t as FC_,Jlt as SK_} from "../../vendor/m3914.ts";
import {oee as de,tae as x7H} from "../config/2670_cause.ts";
import {bke as U0H,rI as zR} from "../../vendor/m3279.ts";
import {jot as Gy_,VF as RB} from "../../vendor/m3280.ts";
import {dr as P8,Cn as b6} from "../../vendor/m231.ts";
import {Vw as xP,$c as p1,Ajr as EB8} from "../../vendor/m2695.ts";
import {Ql as v4,Fr as I8} from "../../vendor/m4405.ts";
import {fLa as qGK,sio as Y8q,dLa as eZK,pLa as HGK,mLa as _GK} from "../core/3917_count.ts";
import {we as yH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
// @ts-nocheck
function slicePage(items, limit, offset = 0) {
  if (limit === 0) return {
    items: items.slice(offset),
    appliedLimit: undefined
  };
  let truncated = limit ?? wzO,
    O = items.slice(offset, offset + truncated),
    T = items.length - offset > truncated;
  return {
    items: O,
    appliedLimit: T ? truncated : undefined
  };
}
function formatPaginationLabel(offset, offset_2) {
  let parts = [];
  if (offset !== undefined) parts.push(`limit: ${offset}`);
  if (offset_2) parts.push(`offset: ${offset_2}`);
  return parts.join(", ");
}
var YzO,
  AzO,
  wzO = 250,
  fzO,
  isCompletedWithKeepalive;
var OAH = L(() => {
  i8();
  N7();
  Qq();
  G_();
  w1();
  Z9();
  Z5();
  S$();
  tbH();
  FC_();
  de();
  U0H();
  Gy_();
  P8();
  xP();
  v4();
  qGK();
  YzO = yH(() => k.strictObject({
    pattern: k.string().describe("The regular expression pattern to search for in file contents"),
    path: k.string().optional().describe("File or directory to search in (rg PATH). Defaults to current working directory."),
    glob: k.string().optional().describe('Glob pattern to filter files (e.g. "*.js", "*.{ts,tsx}") - maps to rg --glob'),
    output_mode: k.enum(["content", "files_with_matches", "count"]).optional().describe('Output mode: "content" shows matching lines (supports -A/-B/-C context, -n line numbers, head_limit), "files_with_matches" shows file paths (supports head_limit), "count" shows match counts (supports head_limit). Defaults to "files_with_matches".'),
    "-B": RB(k.number().optional()).describe('Number of lines to show before each match (rg -B). Requires output_mode: "content", ignored otherwise.'),
    "-A": RB(k.number().optional()).describe('Number of lines to show after each match (rg -A). Requires output_mode: "content", ignored otherwise.'),
    "-C": RB(k.number().optional()).describe("Alias for context."),
    context: RB(k.number().optional()).describe('Number of lines to show before and after each match (rg -C). Requires output_mode: "content", ignored otherwise.'),
    "-n": zR(k.boolean().optional()).describe('Show line numbers in output (rg -n). Requires output_mode: "content", ignored otherwise. Defaults to true.'),
    "-i": zR(k.boolean().optional()).describe("Case insensitive search (rg -i)"),
    "-o": zR(k.boolean().optional()).describe('Print only the matched (non-empty) parts of each matching line, one match per output line (rg -o / --only-matching). Requires output_mode: "content", ignored otherwise. Defaults to false.'),
    type: k.string().optional().describe("File type to search (rg --type). Common types: js, py, rust, go, java, etc. More efficient than include for standard file types."),
    head_limit: RB(k.number().optional()).describe('Limit output to first N lines/entries, equivalent to "| head -N". Works across all output modes: content (limits output lines), files_with_matches (limits file paths), count (limits count entries). Defaults to 250 when unspecified. Pass 0 for unlimited (use sparingly \u2014 large result sets waste context).'),
    offset: RB(k.number().optional()).describe('Skip first N lines/entries before applying head_limit, equivalent to "| tail -n +N | head -N". Works across all output modes. Defaults to 0.'),
    multiline: zR(k.boolean().optional()).describe("Enable multiline mode where . matches newlines and patterns can span lines (rg -U --multiline-dotall). Default: false.")
  })), AzO = [".git", ".svn", ".hg", ".bzr", ".jj", ".sl"];
  fzO = yH(() => k.object({
    mode: k.enum(["content", "files_with_matches", "count"]).optional(),
    numFiles: k.number(),
    filenames: k.array(k.string()),
    content: k.string().optional(),
    numLines: k.number().optional(),
    numMatches: k.number().optional(),
    appliedLimit: k.number().optional(),
    appliedOffset: k.number().optional()
  })), isCompletedWithKeepalive = Y7({
    name: p1,
    searchHint: "search file contents with regex (ripgrep)",
    maxResultSizeChars: 20000,
    strict: true,
    async description() {
      return EB8(undefined);
    },
    userFacingName() {
      return "Search";
    },
    getToolUseSummary: Y8q,
    getActivityDescription(H) {
      let _ = Y8q(H);
      return _ ? `Searching for ${_}` : "Searching";
    },
    get inputSchema() {
      return YzO();
    },
    get outputSchema() {
      return fzO();
    },
    isConcurrencySafe() {
      return true;
    },
    isReadOnly() {
      return true;
    },
    toAutoClassifierInput(H) {
      return H.path ? `${H.pattern} in ${H.path}` : H.pattern;
    },
    isSearchOrReadCommand() {
      return {
        isSearch: true,
        isRead: false
      };
    },
    ruleContentField: "path",
    getPath({
      path: H
    }) {
      return H || u_();
    },
    async preparePermissionMatcher({
      pattern: H
    }) {
      return _ => CQ(_, H);
    },
    async validateInput({
      pattern: H,
      path: _,
      glob: q,
      type: K
    }) {
      let O = [["pattern", H], ["path", _], ["glob", q], ["type", K]].find(([, T]) => T?.includes("\x00"));
      if (O) return {
        result: false,
        message: `${p1} ${O[0]} cannot contain null bytes (\\0). Remove the null byte and try again.`,
        errorCode: 2
      };
      if (_) {
        let T = n_(),
          z = k9(_);
        if (z.startsWith("\\\\") || z.startsWith("//")) return {
          result: true
        };
        try {
          await T.stat(z);
        } catch ($) {
          if (x6($)) {
            let Y = await a8H(z),
              A = `Path does not exist: ${_}. ${IS} ${u_()}.`;
            if (Y) A += ` Did you mean ${Y}?`;
            return {
              result: false,
              message: A,
              errorCode: 1
            };
          }
          throw $;
        }
      }
      return {
        result: true
      };
    },
    async checkPermissions(H, _) {
      return eHH(isCompletedWithKeepalive, H, I8(_));
    },
    async prompt({
      model: H
    }) {
      return EB8(H);
    },
    renderToolUseMessage: eZK,
    renderToolUseErrorMessage: HGK,
    renderToolResultMessage: _GK,
    extractSearchText({
      mode: H,
      content: _,
      filenames: q
    }) {
      if (H === "content" && _) return _;
      return q.join(`
`);
    },
    mapToolResultToToolResultBlockParam({
      mode: H = "files_with_matches",
      numFiles: _,
      filenames: q,
      content: K,
      numLines: O,
      numMatches: T,
      appliedLimit: z,
      appliedOffset: $
    }, Y) {
      if (H === "content") {
        let f = formatPaginationLabel(z, $),
          j = K || "No matches found",
          J = f ? `${j}

[Showing results with pagination = ${f}]` : j;
        return {
          tool_use_id: Y,
          type: "tool_result",
          content: J
        };
      }
      if (H === "count") {
        let f = formatPaginationLabel(z, $),
          j = K || "No matches found",
          J = T ?? 0,
          D = _ ?? 0,
          M = `

Found ${J} total ${J === 1 ? "occurrence" : "occurrences"} across ${D} ${D === 1 ? "file" : "files"}.${f ? ` with pagination = ${f}` : ""}`;
        return {
          tool_use_id: Y,
          type: "tool_result",
          content: j + M
        };
      }
      let A = formatPaginationLabel(z, $);
      if (_ === 0) return {
        tool_use_id: Y,
        type: "tool_result",
        content: "No files found"
      };
      let w = `Found ${_} ${b6(_, "file")}${A ? ` ${A}` : ""}
${q.join(`
`)}`;
      return {
        tool_use_id: Y,
        type: "tool_result",
        content: w
      };
    },
    async call({
      pattern: H,
      path: _,
      glob: q,
      type: K,
      output_mode: O = "files_with_matches",
      "-B": T,
      "-A": z,
      "-C": $,
      context: Y,
      "-n": A = true,
      "-i": w = false,
      "-o": f = false,
      head_limit: j,
      offset: J = 0,
      multiline: D = false
    }, M) {
      let {
          abortController: X
        } = M,
        P = _ ? k9(_) : u_(),
        Z = ["--hidden"];
      for (let I of AzO) Z.push("--glob", `!${I}`);
      if (Z.push("--max-columns", "500"), D) Z.push("-U", "--multiline-dotall");
      if (w) Z.push("-i");
      if (O === "files_with_matches") Z.push("-l");else if (O === "count") Z.push("-c", "-H");
      if (A && O === "content") Z.push("-n");
      if (f && O === "content") Z.push("-o");
      if (O === "content") if (Y !== undefined) Z.push("-C", Y.toString());else if ($ !== undefined) Z.push("-C", $.toString());else {
        if (T !== undefined) Z.push("-B", T.toString());
        if (z !== undefined) Z.push("-A", z.toString());
      }
      if (H.startsWith("-")) Z.push("-e", H);else Z.push(H);
      if (K) Z.push("--type", K);
      if (q) {
        let I = [],
          u = q.split(/\s+/);
        for (let b of u) if (b.includes("{") && b.includes("}")) I.push(b);else I.push(...b.split(",").filter(Boolean));
        for (let b of I.filter(Boolean)) Z.push("--glob", b);
      }
      let W = hmH(kmH(I8(M)), u_());
      for (let I of W) {
        let u = I.startsWith("/") ? `!${I}` : `!**/${I}`;
        Z.push("--glob", u);
      }
      for (let I of await SK_(P)) Z.push("--glob", I);
      let G,
        R = null;
      if (G = await x7H(Z, P, X.signal), O === "content") {
        let {
            items: I,
            appliedLimit: u
          } = slicePage(G, j, J),
          b = I.map(U => {
            let Q = /^[A-Za-z]:/.test(U) ? 2 : 0,
              F = U.indexOf(":", Q);
            if (F > 0) {
              let d = U.substring(0, F),
                l = U.substring(F);
              return ElH(d) + l;
            }
            return U;
          });
        return {
          data: {
            mode: "content",
            numFiles: 0,
            filenames: [],
            content: b.join(`
`),
            numLines: b.length,
            ...(u !== undefined && {
              appliedLimit: u
            }),
            ...(J > 0 && {
              appliedOffset: J
            })
          }
        };
      }
      if (O === "count") {
        let {
            items: I,
            appliedLimit: u
          } = slicePage(G, j, J),
          b = I.map(F => {
            let d = F.lastIndexOf(":");
            if (d > 0) {
              let l = F.substring(0, d),
                n = F.substring(d);
              return ElH(l) + n;
            }
            return F;
          }),
          B = 0,
          U = 0;
        for (let F of b) {
          let d = F.lastIndexOf(":");
          if (d > 0) {
            let l = F.substring(d + 1),
              n = parseInt(l, 10);
            if (!isNaN(n)) B += n, U += 1;
          }
        }
        return {
          data: {
            mode: "count",
            numFiles: U,
            filenames: [],
            content: b.join(`
`),
            numMatches: B,
            ...(u !== undefined && {
              appliedLimit: u
            }),
            ...(J > 0 && {
              appliedOffset: J
            })
          }
        };
      }
      let h = await Promise.allSettled(G.map(I => n_().stat(I))),
        y = G.map((I, u) => {
          let b = h[u];
          return [I, b.status === "fulfilled" ? b.value.mtimeMs ?? 0 : 0];
        }).sort((I, u) => {
          let b = u[1] - I[1];
          if (b === 0) return I[0].localeCompare(u[0]);
          return b;
        }).map(I => I[0]),
        {
          items: E,
          appliedLimit: v
        } = slicePage(y, j, J),
        C = E.map(ElH);
      return {
        data: {
          mode: "files_with_matches",
          filenames: C,
          numFiles: C.length,
          ...(v !== undefined && {
            appliedLimit: v
          }),
          ...(J > 0 && {
            appliedOffset: J
          })
        }
      };
    }
  });
});

export {slicePage as iio,formatPaginationLabel as aio,YzO as jTp,AzO as WTp,wzO as GTp,fzO as VTp,isCompletedWithKeepalive as UL,OAH as Jge};
