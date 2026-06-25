// @ts-nocheck
import {ME as wE,nxe as _Ie} from "./4356_content.ts";
import {fb as Ab,sce as mce} from "./3934_file_path.ts";
import {lu as yd,Cf as JA,zf as Jh} from "../../vendor/m133.ts";
import {Ov as bR,GN as mB} from "../../vendor/m640.ts";
import {In as Dn,Ct as St} from "../../vendor/m197.ts";
import {J9e as T$e,X4 as Sq,nFt as ZLt,uS as ob} from "../config/3192_path.ts";
import {getGlobalConfig as vt,tr as nr} from "../session/5228_shouldSkipPluginAutoupdate.ts";
import {Oho as qco,xVa as n4a,IVa as t4a,DVa as r4a} from "../../vendor/m4169.ts";
import {logForDebugging as v,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {Pi as Xi,vu as od} from "../mcp/2200_mcpServerName.ts";
import {logEvent as j,kt as Ct} from "../../vendor/m132.ts";
import {He,Pt as Bt,mn as cn} from "../telemetry/0600_feature_name.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function Fxp(e, t) {
  if (e === wE) {
    let n = wE.inputSchema.parse(t);
    return {
      filePath: n.file_path,
      edits: [{
        old_string: n.old_string,
        new_string: n.new_string,
        replace_all: n.replace_all || false
      }]
    };
  }
  if (e === Ab) {
    let n = Ab.inputSchema.parse(t),
      r = "";
    if (!yd(n.file_path) || JA(n.file_path)) try {
      r = bR(n.file_path);
    } catch (o) {
      if (!Dn(o)) throw o;
    }
    return {
      filePath: n.file_path,
      edits: [{
        old_string: r,
        new_string: n.content,
        replace_all: false
      }]
    };
  }
  return null;
}
function Uxp(e, t, n) {
  let r = n[0];
  if (!r) return t;
  if (e === wE) return {
    ...t,
    old_string: r.old_string,
    new_string: r.new_string,
    replace_all: r.replace_all || false
  };
  if (e === Ab) return {
    ...t,
    content: r.new_string
  };
  return t;
}
function extractFileEdits(tool, input, n) {
  if (tool !== wE && tool !== Ab) return null;
  let r = n.options.mcpClients;
  if (!T$e(r)) return null;
  if (vt().diffTool !== "auto") return null;
  let o = Fxp(tool, input);
  if (o === null) return null;
  if (yd(o.filePath) && !JA(o.filePath)) return null;
  if (o.filePath.endsWith(".ipynb")) return null;
  let s = Sq(r);
  if (!s) return null;
  return {
    ideName: ZLt(r) ?? "IDE",
    ideClient: s,
    filePath: o.filePath,
    edits: o.edits
  };
}
function mergeEditsIntoInput(tool) {
  let {
      ctx: t,
      tool: n,
      input: r,
      permissionResult: o,
      permissionPromptStartTimeMs: s,
      eligibility: i,
      claim: a,
      notifyBridge: l,
      dismissAndTeardown: c,
      resolveOnce: u
    } = tool,
    {
      filePath: d,
      edits: p,
      ideName: m,
      ideClient: f
    } = i,
    A = cryptoModule.randomUUID().slice(0, 6),
    h = `\u273B [Claude Code] ${pathModule.basename(d)} (${A}) \u29C9`,
    g = false;
  function _() {
    if (g) return;
    g = true, qco(h, f).catch(T => {
      v(`closeTabInIDE failed: ${T}`, {
        level: "error"
      });
    });
  }
  let y = {
    ideName: m,
    toolName: Xi(n.name),
    editCount: p.length
  };
  return j("tengu_ext_will_show_diff", {}), n4a(d, p, t.toolUseContext, h).then(({
    oldContent: T,
    newContent: S
  }) => {
    let C = t4a(d, T, S, "single"),
      k = {
        ...y,
        isNewFile: T === ""
      };
    if (C.length === 0) {
      if (!a()) return;
      _(), j("tengu_ext_diff_rejected", k), He("ide_diff_view"), l({
        behavior: "deny",
        message: "User denied via IDE"
      }), c(), t.logDecision({
        decision: "reject",
        source: {
          type: "user_reject",
          hasFeedback: false
        }
      }, {
        permissionPromptStartTimeMs: s
      }), u(t.cancelAndAbort(undefined));
      return;
    }
    if (!a()) return;
    _();
    let x = Uxp(n, r, C);
    j("tengu_ext_diff_accepted", k), He("ide_diff_view"), l({
      behavior: "allow",
      updatedInput: x,
      updatedPermissions: []
    }), c(), t.logDecision({
      decision: "accept",
      source: {
        type: "user",
        permanent: false
      }
    }, {
      permissionPromptStartTimeMs: s
    }), u(t.handleUserAllow(x, [], undefined, s, undefined, o.decisionReason));
  }).catch(T => {
    if (t.toolUseContext.abortController.signal.aborted) return;
    v(`IDE diff view failed: ${T instanceof Error ? T.message : String(T)}`, {
      level: "error"
    }), Bt("ide_diff_view", "ide_diff_view_failed");
  }), {
    closeTab: _
  };
}
var cryptoModule, pathModule;
var initIdeDiffModule = b(() => {
  r4a();
  cn();
  Ct();
  od();
  _Ie();
  mce();
  Jh();
  nr();
  je();
  St();
  mB();
  ob();
  cryptoModule = require("crypto"), pathModule = require("path");
});
export {Fxp as INp,Uxp as xNp,extractFileEdits as LVa,mergeEditsIntoInput as MVa,cryptoModule as PVa,pathModule as OVa,initIdeDiffModule as NVa};
