// @ts-nocheck
import {yce as ice,hct as Glt} from "../../vendor/m3961.ts";
import {PA as MA,Lv as Hv} from "../config/2699_WORKFLOW_TOOL_NAME.ts";
import {fileReadTool as wY,gct as Vlt} from "../../vendor/m3964.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {fc,sl as rl} from "../../vendor/m715.ts";
import {Ite as Ste,ict as Mlt} from "../../vendor/m3937.ts";
import {g1a as YLa,h1a as zLa,A1a as KLa,DUn as VFn,nao as eio} from "../../vendor/m3962.ts";
import {truncateToWidth as Vs,EH as _H} from "../../vendor/m237.ts";
import {Di as ki,dr as fr} from "../../vendor/m231.ts";
import {logEvent as j,Ct} from "../../vendor/m131.ts";
import {fromEnum as Ue} from "../../vendor/m5.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {rt as nt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function iio(e) {
  let t = zlt.c(2);
  if (!ice() || e.param.name !== MA) return null;
  let n;
  if (t[0] !== e) n = ip.createElement(uTp, {
    ...e
  }), t[0] = e, t[1] = n;else n = t[1];
  return n;
}
function uTp({
  param: e,
  isQueued: t,
  isResolved: n,
  isError: r,
  shouldAnimate: o,
  shouldShowDot: s,
  addMargin: i,
  progressMessagesForMessage: a,
  resultMsg: l
}) {
  let c = n ? r ? "failed" : "done" : t ? "writing" : "running",
    u = a.filter(A => A.data.type === "repl_tool_call");
  TTp(c, n);
  let d = Klt.useRef(Date.now()).current,
    p = wY(d, c === "running", 200),
    m = typeof e.input.code === "string" ? e.input.code : "",
    f = l?.type === "user" ? l.toolUseResult : undefined;
  return ip.createElement(B, {
    flexDirection: "column",
    marginTop: i ? 1 : 0,
    marginBottom: 1,
    width: "100%"
  }, ip.createElement(B, {
    flexDirection: "row"
  }, s && (t ? ip.createElement(B, {
    minWidth: 2
  }, ip.createElement(w, {
    dimColor: true
  }, fc)) : ip.createElement(Ste, {
    shouldAnimate: o,
    isUnresolved: !n,
    isError: r
  })), ip.createElement(w, {
    bold: true
  }, "REPL"), ip.createElement(dTp, {
    state: c,
    elapsed: p,
    progress: u,
    error: f?.error
  })), ip.createElement(mTp, {
    code: m,
    state: c,
    fold: c === "done" || c === "failed"
  }), c === "done" && f && ip.createElement(ATp, {
    output: f
  }), c === "failed" && f?.error && ip.createElement(gTp, {
    error: f.error
  }));
}
function dTp(e) {
  let t = zlt.c(23),
    {
      state: n,
      elapsed: r,
      progress: o,
      error: s
    } = e,
    i;
  if (t[0] !== o) i = YLa(o), t[0] = o, t[1] = i;else i = t[1];
  let a = i;
  switch (n) {
    case "writing":
      {
        let l;
        if (t[2] === Symbol.for("react.memo_cache_sentinel")) l = ip.createElement(w, {
          dimColor: true
        }, "(Writing\u2026)"), t[2] = l;else l = t[2];
        return l;
      }
    case "running":
      {
        let l, c;
        if (t[3] !== o) l = o.findLast(ToolResultMessage), c = l ? zLa(l.data.toolInput) : "", t[3] = o, t[4] = l, t[5] = c;else l = t[4], c = t[5];
        let u = c,
          d = l ? `Running ${l.data.toolName}(${u})\u2026` : "Running\u2026",
          p;
        if (t[6] !== r || t[7] !== d) p = ip.createElement(w, {
          dimColor: true
        }, "(", d, " ", r, ")"), t[6] = r, t[7] = d, t[8] = p;else p = t[8];
        return p;
      }
    case "done":
      {
        let l;
        if (t[9] !== o) l = KLa(o), t[9] = o, t[10] = l;else l = t[10];
        let c = l,
          u = c ? `Ran ${c}` : "Done",
          d;
        if (t[11] !== a || t[12] !== u) d = [u, a].filter(Boolean), t[11] = a, t[12] = u, t[13] = d;else d = t[13];
        let m = d.join(" \xB7 "),
          f;
        if (t[14] !== m) f = ip.createElement(w, {
          dimColor: true
        }, "(", m, ")"), t[14] = m, t[15] = f;else f = t[15];
        return f;
      }
    case "failed":
      {
        let l;
        if (t[16] !== s) l = s ? Vs(ki(s, ":"), 40) : "Failed", t[16] = s, t[17] = l;else l = t[17];
        let u = l || "Failed",
          d;
        if (t[18] !== a || t[19] !== u) d = [u, a].filter(Boolean), t[18] = a, t[19] = u, t[20] = d;else d = t[20];
        let m = d.join(" \xB7 "),
          f;
        if (t[21] !== m) f = ip.createElement(w, {
          color: "error"
        }, "(", m, ")"), t[21] = m, t[22] = f;else f = t[22];
        return f;
      }
  }
}
function ToolResultMessage(props) {
  return props.data.phase === "start";
}
function mTp(e) {
  let t = zlt.c(12),
    {
      code: n,
      state: r,
      fold: o
    } = e,
    s,
    i,
    a,
    l;
  if (t[0] !== n || t[1] !== o || t[2] !== r) {
    let u = n.split(`
`),
      d = o ? VFn(u, 3, 2) : u.map(fTp),
      p = r !== "running";
    s = B, i = "column", a = 1, l = d.map((m, f) => ip.createElement(B, {
      key: f,
      flexDirection: "row"
    }, ip.createElement(w, {
      dimColor: true
    }, sio), ip.createElement(w, {
      dimColor: p || m.folded
    }, m.line), r === "writing" && f === d.length - 1 && ip.createElement(w, null, cTp))), t[0] = n, t[1] = o, t[2] = r, t[3] = s, t[4] = i, t[5] = a, t[6] = l;
  } else s = t[3], i = t[4], a = t[5], l = t[6];
  let c;
  if (t[7] !== s || t[8] !== i || t[9] !== a || t[10] !== l) c = ip.createElement(s, {
    flexDirection: i,
    marginTop: a
  }, l), t[7] = s, t[8] = i, t[9] = a, t[10] = l, t[11] = c;else c = t[11];
  return c;
}
function fTp(e) {
  return {
    line: e
  };
}
function ATp(e) {
  let t = zlt.c(10),
    {
      output: n
    } = e,
    r,
    o,
    s,
    i;
  if (t[0] !== n.result) {
    let l = yTp(n.result),
      c = VFn(l.split(`
`), 6, 2);
    r = B, o = "column", s = 1, i = c.map(hTp), t[0] = n.result, t[1] = r, t[2] = o, t[3] = s, t[4] = i;
  } else r = t[1], o = t[2], s = t[3], i = t[4];
  let a;
  if (t[5] !== r || t[6] !== o || t[7] !== s || t[8] !== i) a = ip.createElement(r, {
    flexDirection: o,
    marginTop: s
  }, i), t[5] = r, t[6] = o, t[7] = s, t[8] = i, t[9] = a;else a = t[9];
  return a;
}
function hTp(e, t) {
  return ip.createElement(w, {
    key: t
  }, sio, e.line);
}
function gTp(e) {
  let t = zlt.c(10),
    {
      error: n
    } = e,
    r,
    o,
    s,
    i;
  if (t[0] !== n) {
    let l = VFn(n.split(`
`), 8, 2);
    r = B, o = "column", s = 1, i = l.map(_Tp), t[0] = n, t[1] = r, t[2] = o, t[3] = s, t[4] = i;
  } else r = t[1], o = t[2], s = t[3], i = t[4];
  let a;
  if (t[5] !== r || t[6] !== o || t[7] !== s || t[8] !== i) a = ip.createElement(r, {
    flexDirection: o,
    marginTop: s
  }, i), t[5] = r, t[6] = o, t[7] = s, t[8] = i, t[9] = a;else a = t[9];
  return a;
}
function _Tp(e, t) {
  return ip.createElement(w, {
    key: t,
    color: "error"
  }, sio, e.line);
}
function yTp(e) {
  try {
    return XLa.inspect(e, {
      colors: false,
      depth: 3,
      customInspect: false
    });
  } catch {
    return "[non-serializable value]";
  }
}
function TTp(e, t) {
  let n = Klt.useRef(t).current,
    r = Klt.useRef(new Set());
  Klt.useEffect(() => {
    if (n || r.current.has(e)) return;
    r.current.add(e), j("tengu_repl_verbose_render", {
      state: Ue(e)
    });
  }, [n, e]);
}
var zlt,
  ip,
  Klt,
  XLa,
  sio = "    ",
  cTp = "\u258C";
var QLa = b(() => {
  Mlt();
  rl();
  Vlt();
  Je();
  Ct();
  fr();
  _H();
  Hv();
  eio();
  Glt();
  zlt = L(nt(), 1), ip = L(Te(), 1), Klt = L(Te(), 1), XLa = require("util");
});

export {iio as lao,uTp as Fbp,dTp as Ubp,ToolResultMessage as $bp,mTp as qbp,fTp as jbp,ATp as Wbp,hTp as Gbp,gTp as Vbp,_Tp as Kbp,yTp as zbp,TTp as Ybp,zlt as yct,ip as op,Klt as _ct,XLa as y1a,sio as aao,cTp as Bbp,QLa as T1a};
