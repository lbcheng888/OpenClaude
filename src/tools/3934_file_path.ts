// @ts-nocheck
import {b} from "../../runtime.ts";
import {kt as Ct,logEvent} from "../../vendor/m132.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {xrt as xtt,Lkn as Vvn} from "../../vendor/m2692.ts";
import {jn as zn,getFeatureValue_CACHED_MAY_BE_STALE} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {p3e as r9e,Qge as Uhe} from "../../vendor/m3238.ts";
import {Sit as yot,rPn as mIn,oPn as fIn} from "../../vendor/m3239.ts";
import {zae as Kae,tIe as mke} from "../../vendor/m3263.ts";
import {s9e as Q2e,Xke as dxe} from "../telemetry/2792_eventName.ts";
import {XZr as fYr,RPn as LIn} from "../../vendor/m3265.ts";
import {$q as x6,Yut as eut,Jut as tut,Xut as nut} from "./4352_displayName.ts";
import {ri as Ri,Ks as pi} from "./2235_userFacingName.ts";
import {e3t as U$t,Gut as Yct} from "../agent/3925_e3t.ts";
import {xl as Ql,Mr as Fr,Q0e as DIe} from "../../vendor/m4427.ts";
import {Po as Go,isTmuxControlMode as Pt} from "../../vendor/m638.ts";
import {qe,logForDebugging} from "../config/0236_setHasFormattedOutput.ts";
import {oce as vce,W0e as CIe,j9t as O$t} from "../telemetry/3912_oldStart.ts";
import {dn as sn} from "../config/0137_namespace.ts";
import {Ct as bt,In as Pn} from "../../vendor/m197.ts";
import {Xl as mc,wje as H7e,vje as k7e,zEe as pbe,QX as tQ,jEe as mbe} from "../config/0651_maxBytes.ts";
import {Pq as _6,TT as vT,I0e as UHe} from "../session/3880_trackSequence.ts";
import {V$n as e$n,Ste as Wte} from "../telemetry/3926_operation.ts";
import {GN as bB,XX as eQ} from "../../vendor/m640.ts";
import {Gk as xk,gae as yae} from "../../vendor/m2727.ts";
import {ps as ws,Wt as jt} from "../../vendor/m230.ts";
import {t3t as $$t,j$n as r$n} from "../config/3927_hunks.ts";
import {mI as NH,W0t as hkt,iZe as lXe} from "../config/2029_mI.ts";
import {Ro as Mo,getCanonicalName} from "../permissions/1458_swapShrinksContextWindow.ts";
import {Tu as Iu,hs as Ds} from "../../vendor/m649.ts";
import {Xm as nA,matchesPathRule,checkWritePermissionForTool,matchingRuleForInput} from "../permissions/5177_untypeDenyReasonForAskPropagation.ts";
import {ry as ty,ehe as jfe,dEn as xyn,pEn as kyn} from "../../vendor/m2253.ts";
import {n3t as q$t,Kuo as Blo,zuo as Flo} from "../../vendor/m3927.ts";
import {dm as ef,gEn as Pyn} from "../../vendor/m2256.ts";
import {dw as ex,Ec as zc,rNi as v0i} from "../../vendor/m2593.ts";
import {vUa as m2a,SUa as a2a,Xuo as jlo,EUa as c2a,bUa as l2a,CUa as u2a,AUa as d2a,RUa as p2a} from "../core/3933_filePath.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {Ve as Qe,Le as fromEnum} from "../../vendor/m5.ts";
import {nt as st} from "../../vendor/m127.ts";
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
export {PIe as Z0e,$wp as Zkp,qwp as eHp,_b as fb,wce as sce};
