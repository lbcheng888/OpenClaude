// @ts-nocheck
import {iUe as MFe,GUr as XFr} from "../../vendor/m2351.ts";
import {mr as hr,ki as Ii} from "../../vendor/m2453.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Pt,Go as Ko} from "../../vendor/m632.ts";
import {mU as rU,kIe as dIe} from "../../vendor/m4051.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {initModule as cL,Oz as yz} from "../../vendor/m2799.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {xT as ST,yx as Ax} from "./5144_encoding.ts";
import {o2a as MFa,s2a as NFa} from "../../vendor/m4063.ts";
import {Id as Md,mc} from "../config/0645_maxBytes.ts";
import {initRN as TN,uIe as VHe} from "../../vendor/m3974.ts";
import {zd as Xd,dr as fr} from "../../vendor/m231.ts";
import {IIe as mIe,qlo as Fao} from "../../vendor/m4062.ts";
import {M$t as h$t,q2n as n2n,j2n as r2n} from "../../vendor/m4048.ts";
import {sG as UW,vce as pce} from "../telemetry/4046_oldStart.ts";
import {qp as Jp,bt as St} from "../../vendor/m195.ts";
import {logForDebugging as v,qe as je} from "../config/0234_setHasFormattedOutput.ts";
import {De as Ie,Rn as wn} from "../session/0615_length.ts";
import {Dl as Ol,lo} from "../tools/5190_userPromptCount.ts";
import {wC as SC,jq as Hq} from "../tui/3282_result.tsx";
import {s$n as y2n,$lo as Bao} from "../../vendor/m4061.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function BFa(e) {
  let t = e.split(wct);
  return e.endsWith(wct) ? t.length - 1 : t.length;
}
function lCp(e, t) {
  let n = MFe(e, t).height;
  return e.endsWith(wct) ? n - 1 : n;
}
function cCp(e) {
  let t = reactCompilerRuntime.c(31),
    {
      filePath: n,
      content: r,
      verbose: o
    } = e,
    {
      columns: s
    } = hr(),
    i = Math.max(1, s - 12),
    a = r || "(No content)",
    l;
  if (t[0] !== r) l = BFa(r), t[0] = r, t[1] = l;else l = t[1];
  let c = l,
    u;
  if (t[2] !== a || t[3] !== i || t[4] !== o) u = o ? a : a.split(wct).slice(0, vct).join(wct).slice(0, vct * (i + 1)), t[2] = a, t[3] = i, t[4] = o, t[5] = u;else u = t[5];
  let d = u,
    p = o ? 0 : lCp(a, i) - vct,
    m;
  if (t[6] !== c) m = ad.createElement(w, {
    bold: true
  }, c), t[6] = c, t[7] = m;else m = t[7];
  let f;
  if (t[8] !== n || t[9] !== o) f = o ? n : cqe.relative(Pt(), n), t[8] = n, t[9] = o, t[10] = f;else f = t[10];
  let A;
  if (t[11] !== f) A = ad.createElement(w, {
    bold: true
  }, f), t[11] = f, t[12] = A;else A = t[12];
  let h;
  if (t[13] !== m || t[14] !== A) h = ad.createElement(w, null, "Wrote ", m, " lines to", " ", A), t[13] = m, t[14] = A, t[15] = h;else h = t[15];
  let g = o ? undefined : "hidden",
    _ = o ? undefined : vct,
    y;
  if (t[16] !== d || t[17] !== n || t[18] !== i) y = ad.createElement(rU, {
    code: d,
    filePath: n,
    width: i
  }), t[16] = d, t[17] = n, t[18] = i, t[19] = y;else y = t[19];
  let T;
  if (t[20] !== g || t[21] !== _ || t[22] !== y) T = ad.createElement(B, {
    flexDirection: "column",
    overflowY: g,
    maxHeight: _
  }, y), t[20] = g, t[21] = _, t[22] = y, t[23] = T;else T = t[23];
  let S;
  if (t[24] !== p || t[25] !== o) S = !o && ad.createElement(cL, {
    count: p,
    expandable: true
  }), t[24] = p, t[25] = o, t[26] = S;else S = t[26];
  let C;
  if (t[27] !== T || t[28] !== S || t[29] !== h) C = ad.createElement(qn, null, ad.createElement(B, {
    flexDirection: "column"
  }, h, T, S)), t[27] = T, t[28] = S, t[29] = h, t[30] = C;else C = t[30];
  return C;
}
function FFa(e) {
  if (e?.file_path?.startsWith(ST())) return "Updated plan";
  return "Write";
}
function UFa({
  type: e,
  content: t
}, {
  columns: n
}) {
  if (e !== "create") return false;
  if (typeof t !== "string") return false;
  let r = t.endsWith(wct) ? vct + 1 : vct;
  return MFa(t, Math.max(1, n - 12), r);
}
function Uao(e) {
  if (!e?.file_path) return null;
  return Md(e.file_path);
}
function $ZK(content, {
  verbose: t
}) {
  if (!content.file_path) return null;
  if (content.file_path.startsWith(ST())) return "";
  return ad.createElement(TN, {
    filePath: content.file_path
  }, t ? content.file_path : Md(content.file_path));
}
function Z3O({
  file_path: e,
  content: t
}, {
  style: n,
  verbose: r
}) {
  return ad.createElement(G3O, {
    filePath: e,
    content: t,
    style: n,
    verbose: r
  });
}
function G3O(props) {
  let memo = reactCompilerRuntime.c(20),
    {
      filePath: filePath,
      content: content,
      style: verbose,
      verbose: verbose_2
    } = props,
    i;
  if (memo[0] !== content || memo[1] !== filePath) i = () => AZK(filePath, content), memo[0] = content, memo[1] = filePath, memo[2] = i;else i = memo[2];
  let [a] = Rct.useState(i),
    lineCount;
  if (memo[3] !== content) lineCount = Xd(content), memo[3] = content, memo[4] = lineCount;else lineCount = memo[4];
  let totalLines = lineCount,
    previewCode;
  if (memo[5] !== content || memo[6] !== filePath || memo[7] !== totalLines || memo[8] !== verbose_2) previewCode = ad.createElement(mIe, {
    file_path: filePath,
    operation: "write",
    content: content,
    firstLine: totalLines,
    verbose: verbose_2
  }), memo[5] = content, memo[6] = filePath, memo[7] = totalLines, memo[8] = verbose_2, memo[9] = previewCode;else previewCode = memo[9];
  let code = previewCode,
    hiddenLineCount;
  if (memo[10] !== code || memo[11] !== a || memo[12] !== filePath || memo[13] !== totalLines || memo[14] !== verbose || memo[15] !== verbose_2) hiddenLineCount = ad.createElement(YZK, {
    promise: a,
    filePath: filePath,
    firstLine: totalLines,
    createFallback: code,
    style: verbose,
    verbose: verbose_2
  }), memo[10] = code, memo[11] = a, memo[12] = filePath, memo[13] = totalLines, memo[14] = verbose, memo[15] = verbose_2, memo[16] = hiddenLineCount;else hiddenLineCount = memo[16];
  let m;
  if (memo[17] !== code || memo[18] !== hiddenLineCount) m = ad.createElement(Rct.Suspense, {
    fallback: code
  }, hiddenLineCount), memo[17] = code, memo[18] = hiddenLineCount, memo[19] = m;else m = memo[19];
  return m;
}
function YZK(input) {
  let t = reactCompilerRuntime.c(8),
    {
      promise: n,
      filePath: r,
      firstLine: o,
      createFallback: s,
      style: i,
      verbose: a
    } = input,
    l = Rct.use(n);
  if (l.type === "create") return s;
  if (l.type === "error") {
    let u;
    if (t[0] === Symbol.for("react.memo_cache_sentinel")) u = ad.createElement(qn, null, ad.createElement(w, null, "(No changes)")), t[0] = u;else u = t[0];
    return u;
  }
  let c;
  if (t[1] !== l.oldContent || t[2] !== l.patch || t[3] !== r || t[4] !== o || t[5] !== i || t[6] !== a) c = ad.createElement(mIe, {
    file_path: r,
    operation: "update",
    patch: l.patch,
    firstLine: o,
    fileContent: l.oldContent,
    style: i,
    verbose: a
  }), t[1] = l.oldContent, t[2] = l.patch, t[3] = r, t[4] = o, t[5] = i, t[6] = a, t[7] = c;else c = t[7];
  return c;
}
async function AZK(e, t) {
  try {
    let n = cqe.isAbsolute(e) ? e : cqe.resolve(Pt(), e),
      r = await h$t(n);
    if (r === null) return {
      type: "create"
    };
    let o;
    try {
      o = await n2n(r);
    } finally {
      await r.close();
    }
    if (o === null) return {
      type: "create"
    };
    return {
      type: "update",
      patch: UW({
        filePath: e,
        fileContents: o,
        edits: [{
          old_string: o,
          new_string: t,
          replace_all: false
        }]
      }),
      oldContent: o
    };
  } catch (n) {
    if (Jp(n)) v(`Failed to load rejection diff for ${e}: ${n.message}`, {
      level: "error"
    });else Ie(n);
    return {
      type: "error"
    };
  }
}
function N_q(input, {
  verbose: t
}) {
  if (!t && typeof input === "string" && Ol(input, "tool_use_error")) return ad.createElement(qn, null, ad.createElement(w, {
    color: "error"
  }, "Error writing file"));
  return ad.createElement(SC, {
    result: input,
    verbose: t
  });
}
function wZK({
  filePath: e = "",
  content: t,
  structuredPatch: n,
  type: r,
  originalFile: o
}, s, {
  style: i,
  verbose: a
}) {
  if (!e) return null;
  switch (r) {
    case "create":
      {
        if (e.startsWith(ST()) && !a) {
          if (i !== "condensed") return ad.createElement(qn, null, ad.createElement(w, {
            dimColor: true
          }, "/plan to preview"));
        } else if (i === "condensed" && !a) {
          let c = BFa(t);
          return ad.createElement(w, null, "Wrote ", ad.createElement(w, {
            bold: true
          }, c), " lines to", " ", ad.createElement(w, {
            bold: true
          }, cqe.relative(Pt(), e)));
        }
        return ad.createElement(cCp, {
          filePath: e,
          content: t,
          verbose: a
        });
      }
    case "update":
      {
        let l = e.startsWith(ST());
        return ad.createElement(y2n, {
          filePath: e,
          structuredPatch: n,
          firstLine: Xd(t),
          fileContent: o ?? undefined,
          style: i,
          verbose: a,
          previewHint: l ? "/plan to preview" : undefined
        });
      }
  }
}
var reactCompilerRuntime,
  cqe,
  ad,
  Rct,
  vct = 10,
  wct = `
`;
var DZK = b(() => {
  rc();
  lo();
  yz();
  Hq();
  Bao();
  Fao();
  VHe();
  dIe();
  Ii();
  NFa();
  XFr();
  Je();
  Ko();
  je();
  pce();
  St();
  mc();
  wn();
  Ax();
  r2n();
  fr();
  reactCompilerRuntime = L(nt(), 1), cqe = require("path"), ad = L(Te(), 1), Rct = L(Te(), 1);
});

export {BFa as i2a,lCp as Mwp,cCp as Nwp,FFa as a2a,UFa as l2a,Uao as jlo,$ZK as c2a,Z3O as u2a,G3O as Bwp,YZK as Fwp,AZK as Uwp,N_q as d2a,wZK as p2a,reactCompilerRuntime as i$n,cqe as Hqe,ad as sd,Rct as Zct,vct as Xct,wct as Qct,DZK as m2a};
