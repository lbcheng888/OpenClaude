// @ts-nocheck
import {useClock as Ps} from "../../vendor/m2432.ts";
import {Oc as Dc,b_ as T_} from "../../vendor/m2039.ts";
import {lyo as o_o,a8n as _jn,xsl as tol,cyo as s_o} from "../core/4496_code.ts";
import {flushSessionStorage as eD,ja as za} from "../permissions/5143_writeRemoteAgentMetadata.ts";
import {_i as wi,hp as gp} from "../session/1460_promise.ts";
import {K_e as H_e,Qqt as kqt} from "../../vendor/m4494.ts";
import {gracefulShutdown as Pi,ym as Km} from "../config/3332_flushAnalyticsSinks.ts";
import {Se,bt as St} from "../../vendor/m195.ts";
import {Box as B} from "../../vendor/m2422.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {Jc as zc,vE as bE} from "../../vendor/m3837.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function gn4() {
  switch ("darwin") {
    case "win32":
      return "https://claude.ai/api/desktop/win32/x64/exe/latest/redirect";
    default:
      return "https://claude.ai/api/desktop/darwin/universal/dmg/latest/redirect";
  }
}
function Qn4({
  onDone: e
}) {
  let [t, n] = Fn4.useState(Fn4_2?.state ?? "checking"),
    [r, o] = Fn4.useState(Fn4_2?.error ?? null),
    [s, i] = Fn4.useState(Fn4_2?.downloadMessage ?? ""),
    O = Ps();
  Fn4.useEffect(() => {
    if (Fn4_2) Fn4_2.setters = {
      setState: n,
      setError: o,
      setDownloadMessage: i
    }, n(Fn4_2.state), o(Fn4_2.error), i(Fn4_2.downloadMessage);
    return () => {
      if (Fn4_2?.setters?.setState === n) Fn4_2.setters = null;
    };
  }, []);
  function l(d, p) {
    Fn4_2 = null, e(d, p);
  }
  function c(d) {
    if (d.key === "escape" || (d.ctrl || d.meta) && (d.key === "c" || d.key === "d")) {
      d.preventDefault(), l(`Cancelled. Learn more about Claude Desktop at ${i_o}`, {
        display: "system"
      });
      return;
    }
    if (d.ctrl || d.meta) return;
    if (t === "error") {
      d.preventDefault(), l(r ?? "Unknown error", {
        display: "system"
      });
      return;
    }
    if (t === "prompt-download") {
      if (d.key === "y" || d.key === "Y") d.preventDefault(), Dc(gn4()).catch(() => {}), l(`Starting download. Re-run /desktop once you\u2019ve installed the app.
Learn more at ${i_o}`, {
        display: "system"
      });else if (d.key === "n" || d.key === "N") d.preventDefault(), l(`The desktop app is required for /desktop. Learn more at ${i_o}`, {
        display: "system"
      });
    }
  }
  if (Fn4.useEffect(() => {
    if (Fn4_2) return;
    Fn4_2 = {
      state: "checking",
      error: null,
      downloadMessage: "",
      setters: {
        setState: n,
        setError: o,
        setDownloadMessage: i
      }
    };
    function d(m) {
      if (!Fn4_2) return;
      Object.assign(Fn4_2, m);
      let f = Fn4_2.setters;
      if (m.state !== undefined) f?.setState(m.state);
      if (m.error !== undefined) f?.setError(m.error);
      if (m.downloadMessage !== undefined) f?.setDownloadMessage(m.downloadMessage);
    }
    async function p() {
      d({
        state: "checking"
      });
      let m = await o_o();
      if (m.status === "not-installed") {
        d({
          state: "prompt-download",
          downloadMessage: "Claude Desktop is not installed."
        });
        return;
      }
      if (m.status === "version-too-old") {
        d({
          state: "prompt-download",
          downloadMessage: `Claude Desktop needs to be updated (found v${m.version}, need v${_jn}+).`
        });
        return;
      }
      d({
        state: "flushing"
      }), await eD(), d({
        state: "opening"
      });
      let f = await tol();
      if (!f.success) {
        d({
          state: "error",
          error: f.error
        });
        return;
      }
      d({
        state: "success"
      }), O.setTimeout(async () => {
        if (l("Session transferred to Claude Desktop", {
          display: "system"
        }), wi()) H_e({
          broadcast: true
        });
        await Pi(0, "other");
      }, 500);
    }
    p().catch(m => {
      d({
        state: "error",
        error: Se(m)
      });
    });
  }, []), t === "error") return Fn4.default.createElement(B, {
    flexDirection: "column",
    paddingX: 2,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: c
  }, Fn4.default.createElement(w, {
    color: "error"
  }, "Error: ", r), Fn4.default.createElement(w, {
    dimColor: true
  }, "Press any key to continue\u2026"));
  if (t === "prompt-download") return Fn4.default.createElement(B, {
    flexDirection: "column",
    paddingX: 2,
    tabIndex: 0,
    autoFocus: true,
    onKeyDown: c
  }, Fn4.default.createElement(w, null, s), Fn4.default.createElement(w, null, "Download now? (y/n)"));
  return Fn4.default.createElement(B, {
    paddingX: 2
  }, Fn4.default.createElement(zc, {
    message: {
      checking: "Checking for Claude Desktop\u2026",
      flushing: "Saving session\u2026",
      opening: "Opening Claude Desktop\u2026",
      success: "Opening in Claude Desktop\u2026"
    }[t]
  }));
}
var Fn4,
  i_o = "https://clau.de/desktop",
  Fn4_2 = null;
var bu = b(() => {
  kqt();
  Je();
  T_();
  gp();
  s_o();
  St();
  Km();
  za();
  bE();
  Fn4 = L(Te(), 1);
});

export {gn4 as e8p,Qn4 as l8n,Fn4 as IU,i_o as uyo,Fn4_2 as HU,bu as dyo};
