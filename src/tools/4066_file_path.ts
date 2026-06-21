// @ts-nocheck
import {b} from "../../runtime.ts";
import {Ct,logEvent} from "../../vendor/m131.ts";
import {Xr} from "../../vendor/m321.ts";
import {xtt,Vvn} from "../../vendor/m2681.ts";
import {zn,getFeatureValue_CACHED_MAY_BE_STALE} from "../api/2198_stopPeriodicGrowthBookRefresh.ts";
import {r9e,Uhe} from "../../vendor/m3222.ts";
import {yot,mIn,fIn} from "../../vendor/m3223.ts";
import {Kae,mke} from "../../vendor/m3247.ts";
import {Q2e,dxe} from "../telemetry/2780_eventName.ts";
import {fYr,LIn} from "../../vendor/m3249.ts";
import {x6,eut,tut,nut} from "./4332_displayName.ts";
import {Ri,pi} from "./2227_userFacingName.ts";
import {U$t,Yct} from "../agent/4058_U$t.ts";
import {Ql,Fr,DIe} from "../../vendor/m4405.ts";
import {Go,Pt} from "../../vendor/m632.ts";
import {qe,logForDebugging} from "../config/0234_setHasFormattedOutput.ts";
import {vce,CIe,O$t} from "../telemetry/4046_oldStart.ts";
import {sn} from "../config/0047_namespace.ts";
import {bt,Pn} from "../../vendor/m195.ts";
import {mc,H7e,k7e,pbe,tQ,mbe} from "../config/0645_maxBytes.ts";
import {_6,vT,UHe} from "../session/3862_trackSequence.ts";
import {e$n,Wte} from "../telemetry/4059_operation.ts";
import {bB,eQ} from "../../vendor/m634.ts";
import {xk,yae} from "../../vendor/m2715.ts";
import {ws,jt} from "../../vendor/m228.ts";
import {$$t,r$n} from "../config/4060_hunks.ts";
import {NH,hkt,lXe} from "../config/2024_NH.ts";
import {Mo,getCanonicalName} from "../permissions/1453_swapShrinksContextWindow.ts";
import {Iu,Ds} from "../../vendor/m643.ts";
import {nA,matchesPathRule,checkWritePermissionForTool,matchingRuleForInput} from "../permissions/5145_untypeDenyReasonForAskPropagation.ts";
import {ty,jfe,xyn,kyn} from "../../vendor/m2245.ts";
import {q$t,Blo,Flo} from "../../vendor/m4060.ts";
import {ef,Pyn} from "../../vendor/m2248.ts";
import {ex,zc,v0i} from "../../vendor/m2582.ts";
import {m2a,a2a,jlo,c2a,l2a,u2a,d2a,p2a} from "../core/4065_filePath.ts";
import {we} from "../../vendor/m455.ts";
import {E} from "../../vendor/m319.ts";
import {Qe,fromEnum,st} from "../../vendor/m5.ts";
var PIe: any, $wp: any, qwp: any, _b: any;
var wce = b(() => {
  Ct();
  Xr();
  xtt();
  zn();
  r9e();
  yot();
  Kae();
  Q2e();
  fYr();
  x6();
  Ri();
  U$t();
  Ql();
  Go();
  qe();
  vce();
  sn();
  bt();
  mc();
  _6();
  e$n();
  bB();
  xk();
  ws();
  $$t();
  NH();
  Mo();
  Iu();
  nA();
  ty();
  q$t();
  ef();
  ex();
  m2a();
  PIe = require("path"), $wp = we(() => E.strictObject({
    file_path: E.string().describe("The absolute path to the file to write (must be absolute, not relative)"),
    content: E.string().describe("The content to write to the file")
  })), qwp = we(() => E.object({
    type: E.enum(["create", "update"]).describe("Whether a new file was created or an existing file was updated"),
    filePath: E.string().describe("The path to the file that was written"),
    content: E.string().describe("The content that was written to the file"),
    structuredPatch: E.array(Blo()).describe("Diff patch showing the changes"),
    originalFile: E.string().nullable().describe("The original file content before the write (null for new files)"),
    gitDiff: Flo().optional(),
    userModified: E.boolean().optional().describe("True when the user edited the proposed content in the permission dialog before accepting")
  })), _b = pi({
    name: zc,
    ruleContentField: "file_path",
    searchHint: "create or overwrite files",
    maxResultSizeChars: 1e5,
    strict: !0,
    async description() {
      return "Write a file to the local filesystem.";
    },
    userFacingName: a2a,
    getToolUseSummary: jlo,
    getActivityDescription(e: any) {
      let t = jlo(e);
      return t ? `Writing ${t}` : "Writing file";
    },
    async prompt({
      model: e
    }: any) {
      return v0i(e);
    },
    renderToolUseMessage: c2a,
    isResultTruncated: l2a,
    get inputSchema() {
      return $wp();
    },
    get outputSchema() {
      return qwp();
    },
    stripForStorage(e: any) {
      if (typeof e !== "object" || e === null) return e;
      if (e.type !== "update") return e;
      if (e.content === "" && (e.originalFile ?? "") === "") return e;
      return {
        ...e,
        content: "",
        originalFile: null
      };
    },
    toAutoClassifierInput(e: any) {
      return `${e.file_path}: ${e.content}`;
    },
    getPath(e: any) {
      return e.file_path;
    },
    inputsEquivalent(e: any, t: any) {
      if (e.file_path !== t.file_path) return !1;
      if (e.content === t.content) return !0;
      return e.content.replace(/\n+$/, "") === t.content.replace(/\n+$/, "");
    },
    backfillObservableInput(e: any) {
      if (typeof e.file_path === "string") e.file_path = Ds(e.file_path);
    },
    async preparePermissionMatcher({
      file_path: e
    }: any) {
      return (t: any) => matchesPathRule(t, e);
    },
    async checkPermissions(e: any, t: any) {
      return checkWritePermissionForTool(_b, e, Fr(t));
    },
    renderToolUseRejectedMessage: u2a,
    renderToolUseErrorMessage: d2a,
    renderToolResultMessage: p2a,
    extractSearchText() {
      return "";
    },
    async validateInput({
      file_path: e,
      content: t
    }: any, n: any) {
      let r = Ds(e),
        o = Yct(r, n);
      if (o) return {
        result: !1,
        message: o,
        errorCode: 7
      };
      if (n.agentId && /^(REPORT|SUMMARY|FINDINGS|ANALYSIS).*\.md$/i.test(PIe.basename(r))) return logEvent("tengu_subagent_md_report_blocked", {
        contentBytes: Buffer.byteLength(t)
      }), {
        result: !1,
        message: "Subagents should return findings as text, not write report files. Include this content in your final response instead.",
        errorCode: 5
      };
      let s = LIn(r, t);
      if (s) return {
        result: !1,
        message: s,
        errorCode: 0
      };
      if (matchingRuleForInput(r, Fr(n), "edit", "deny") !== null) return {
        result: !1,
        message: "File is in a directory that is denied by your permission settings.",
        errorCode: 1
      };
      if (r.startsWith("\\\\") || r.startsWith("//")) return {
        result: !0
      };
      let a = jt(),
        l: any;
      try {
        let d = await a.stat(r);
        if (l = d.mtimeMs, H7e(d.mode)) return {
          result: !1,
          message: k7e,
          errorCode: 6
        };
      } catch (d: any) {
        if (Pn(d)) return {
          result: !0
        };
        throw d;
      }
      let c = n.readFileState.get(r);
      if (!c || c.isPartialView) {
        let d = getCanonicalName(DIe(n)),
          p = hkt(d),
          m = !c && (getFeatureValue_CACHED_MAY_BE_STALE("tengu_velvet_mallet", !1) || getFeatureValue_CACHED_MAY_BE_STALE(lXe("tengu_velvet_mallet", d), !1));
        if (logEvent("tengu_write_tool_not_read_hypothetical", {
          wouldHaveResult: c && Math.floor(l) > c.timestamp ? Qe("errorCode3") : Qe("success"),
          isPartialView: c?.isPartialView === !0,
          isFilePathAbsolute: PIe.isAbsolute(e),
          guardSkipped: m,
          modelBucket: fromEnum(p)
        }), !m) return {
          result: !1,
          message: "File has not been read yet. Read it first before writing to it.",
          errorCode: 2
        };
        return {
          result: !0
        };
      }
      if (Math.floor(l) > c.timestamp) {
        let d = (c.offset ?? 1) <= 1 && c.limit === void 0,
          p = !1;
        if (d) {
          let f = (await a.readFileBytes(r)).toString("utf8").replaceAll(`\r\n`, `\n`);
          p = yae(c, f);
        }
        if (!p) return {
          result: !1,
          message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
          errorCode: 3
        };
      }
      return {
        result: !0
      };
    },
    async call({
      file_path: e,
      content: t
    }: any, {
      options: n,
      permissionLayers: r,
      readFileState: o,
      userModified: s,
      getFileHistoryState: i,
      applyFileHistoryOp: a,
      dynamicSkillDirTriggers: l
    }: any, c: any, u: any) {
      let d = Ds(e),
        p = PIe.dirname(d),
        m = Pt(),
        f = await eut([d], m);
      if (f.length > 0) {
        if (l) {
          for (let y of f) if (!l.includes(y)) l.push(y);
        }
        tut(f).catch(() => {});
      }
      if (nut([d], m), await Uhe.beforeFileEdited(d), await jt().mkdir(p), vT()) await UHe(i, a, d, u.uuid);
      let A = await pbe(d, async () => {
          let y: any;
          try {
            y = eQ(d);
          } catch (R: any) {
            if (Pn(R)) y = null;else throw R;
          }
          if (y !== null) {
            let R = o.get(d);
            if (!R) {
              if (!(getFeatureValue_CACHED_MAY_BE_STALE("tengu_velvet_mallet", !1) || getFeatureValue_CACHED_MAY_BE_STALE(lXe("tengu_velvet_mallet", getCanonicalName(DIe({
                options: n,
                permissionLayers: r
              }))), !1))) throw new jfe(xyn);
            } else if (tQ(d) > R.timestamp) {
              if (!((R.offset ?? 1) <= 1 && R.limit === void 0 && yae(R, y.content))) throw new jfe(kyn);
            }
          }
          let T = y?.encoding ?? "utf8",
            S = y?.content ?? null;
          t = Vvn(d, t);
          let v = await mbe(d, t, T, "LF");
          return o.set(d, {
            content: t,
            timestamp: v,
            offset: void 0,
            limit: void 0
          }), S;
        }),
        h = mke();
      if (h) mIn(d), fIn(d), h.changeFile(d, t).catch((y: any) => {
        logForDebugging(`LSP: Failed to notify server of file change for ${d}: ${y.message}`, {
          level: "error"
        });
      }), h.saveFile(d).catch((y: any) => {
        logForDebugging(`LSP: Failed to notify server of file save for ${d}: ${y.message}`, {
          level: "error"
        });
      });
      if (dxe(d, A, t), d.endsWith(`${PIe.sep}CLAUDE.md`)) logEvent("tengu_write_claudemd", {});
      let g: any;
      if (st(process.env.CLAUDE_CODE_REMOTE)) {
        let y = Date.now(),
          T = await r$n(d);
        if (T) g = T;
        logEvent("tengu_tool_use_diff_computed", {
          isWriteTool: !0,
          durationMs: Date.now() - y,
          hasDiff: !!T
        });
      }
      if (A) {
        let y = CIe({
            filePath: e,
            oldContent: A,
            newContent: t,
            convertTabs: !0
          }),
          T = {
            type: "update",
            filePath: e,
            content: t,
            structuredPatch: y,
            originalFile: A,
            userModified: s ?? !1,
            ...(g && {
              gitDiff: g
            })
          };
        return O$t(y, u.message.model), Wte({
          operation: "write",
          tool: "FileWriteTool",
          filePath: d,
          type: "update"
        }), {
          data: T
        };
      }
      let _ = {
        type: "create",
        filePath: e,
        content: t,
        structuredPatch: [],
        originalFile: null,
        userModified: s ?? !1,
        ...(g && {
          gitDiff: g
        })
      };
      return O$t([], u.message.model, t), Wte({
        operation: "write",
        tool: "FileWriteTool",
        filePath: d,
        type: "create"
      }), {
        data: _
      };
    },
    mapToolResultToToolResultBlockParam({
      filePath: e,
      type: t,
      userModified: n
    }: any, r: any) {
      let o = n ? " The user modified your proposed content before accepting it." : "",
        s = n ? "" : Pyn;
      switch (t) {
        case "create":
          return {
            tool_use_id: r,
            type: "tool_result",
            content: `File created successfully at: ${e}${o}${s}`
          };
        case "update":
          return {
            tool_use_id: r,
            type: "tool_result",
            content: `The file ${e} has been updated successfully.${o}${s}`
          };
      }
    }
  });
});
export {PIe,$wp,qwp,_b,wce};
