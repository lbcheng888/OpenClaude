// @ts-nocheck
import {useClock as As} from "../../vendor/m2442.ts";
import {Zl,Jg} from "../../vendor/m2044.ts";
import {nAo,wVn,hpl,rAo} from "../core/4518_code.ts";
import {flushSessionStorage as _v,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {Ws,vd} from "../session/1465_promise.ts";
import {hTe,R8t} from "../../vendor/m4516.ts";
import {gracefulShutdown as gi,isAmberSentinelEnabled as Np} from "../config/3348_flushAnalyticsSinks.ts";
import {Ce,Ct} from "../../vendor/m197.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {Hc,OE} from "../../vendor/m3855.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck

/** Resolve the platform-specific Claude Desktop download redirect URL. */
function NYp(): string {
  switch ("darwin") {
    case "win32":
      return "https://claude.ai/api/desktop/win32/x64/exe/latest/redirect";
    default:
      return "https://claude.ai/api/desktop/darwin/universal/dmg/latest/redirect";
  }
}

/**
 * /desktop flow component: checks for Claude Desktop, prompts to download if
 * missing/outdated, flushes the session and hands off to the desktop app.
 */
function gpl({
  onDone
}: {
  onDone: (message: string, options: { display: string }) => void;
}) {
  let [state, setState] = B8e.useState(YB?.state ?? "checking"),
    [error, setError] = B8e.useState(YB?.error ?? null),
    [downloadMessage, setDownloadMessage] = B8e.useState(YB?.downloadMessage ?? ""),
    timers = As();
  B8e.useEffect(() => {
    if (YB) YB.setters = {
      setState,
      setError,
      setDownloadMessage
    }, setState(YB.state), setError(YB.error), setDownloadMessage(YB.downloadMessage);
    return () => {
      if (YB?.setters?.setState === setState) YB.setters = null;
    };
  }, []);
  /** Finish the flow: clear shared state and notify the parent. */
  function finish(message: string, options: { display: string }) {
    YB = null, onDone(message, options);
  }
  /** Keyboard handler for the desktop dialog (cancel / error / download prompt). */
  function handleKeyDown(key: any) {
    if (key.key === "escape" || (key.ctrl || key.meta) && (key.key === "c" || key.key === "d")) {
      key.preventDefault(), finish(`Cancelled. Learn more about Claude Desktop at ${oAo}`, {
        display: "system"
      });
      return;
    }
    if (key.ctrl || key.meta) return;
    if (state === "error") {
      key.preventDefault(), finish(error ?? "Unknown error", {
        display: "system"
      });
      return;
    }
    if (state === "prompt-download") {
      if (key.key === "y" || key.key === "Y") key.preventDefault(), Zl(NYp()).catch(() => {}), finish(`Starting download. Re-run /desktop once you’ve installed the app.
Learn more at ${oAo}`, {
        display: "system"
      });else if (key.key === "n" || key.key === "N") key.preventDefault(), finish(`The desktop app is required for /desktop. Learn more at ${oAo}`, {
        display: "system"
      });
    }
  }
  if (B8e.useEffect(() => {
    if (YB) return;
    YB = {
      state: "checking",
      error: null,
      downloadMessage: "",
      setters: {
        setState,
        setError,
        setDownloadMessage
      }
    };
    /** Apply a partial update to shared state and propagate to React setters. */
    function update(patch: any) {
      if (!YB) return;
      Object.assign(YB, patch);
      let setters = YB.setters;
      if (patch.state !== void 0) setters?.setState(patch.state);
      if (patch.error !== void 0) setters?.setError(patch.error);
      if (patch.downloadMessage !== void 0) setters?.setDownloadMessage(patch.downloadMessage);
    }
    /** Drive the full check → flush → open → hand-off sequence. */
    async function run() {
      update({
        state: "checking"
      });
      let installCheck = await nAo();
      if (installCheck.status === "not-installed") {
        update({
          state: "prompt-download",
          downloadMessage: "Claude Desktop is not installed."
        });
        return;
      }
      if (installCheck.status === "version-too-old") {
        update({
          state: "prompt-download",
          downloadMessage: `Claude Desktop needs to be updated (found v${installCheck.version}, need v${wVn}+).`
        });
        return;
      }
      update({
        state: "flushing"
      }), await _v(), update({
        state: "opening"
      });
      let openResult = await hpl();
      if (!openResult.success) {
        update({
          state: "error",
          error: openResult.error
        });
        return;
      }
      update({
        state: "success"
      }), timers.setTimeout(async () => {
        if (finish("Session transferred to Claude Desktop", {
          display: "system"
        }), Ws()) hTe({
          broadcast: !0
        });
        await gi(0, "other");
      }, 500);
    }
    run().catch(err => {
      update({
        state: "error",
        error: Ce(err)
      });
    });
  }, []), state === "error") return oue.jsxs($, {
    flexDirection: "column",
    paddingX: 2,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown,
    children: [oue.jsxs(v, {
      color: "error",
      children: ["Error: ", error]
    }), oue.jsx(v, {
      dimColor: !0,
      children: "Press any key to continue…"
    })]
  });
  if (state === "prompt-download") return oue.jsxs($, {
    flexDirection: "column",
    paddingX: 2,
    tabIndex: 0,
    autoFocus: !0,
    onKeyDown: handleKeyDown,
    children: [oue.jsx(v, {
      children: downloadMessage
    }), oue.jsx(v, {
      children: "Download now? (y/n)"
    })]
  });
  return oue.jsx($, {
    paddingX: 2,
    children: oue.jsx(Hc, {
      message: {
        checking: "Checking for Claude Desktop…",
        flushing: "Saving session…",
        opening: "Opening Claude Desktop…",
        success: "Opening in Claude Desktop…"
      }[state]
    })
  });
}
var B8e,
  oue,
  oAo = "https://clau.de/desktop",
  YB = null;
var _pl = b(() => {
  R8t();
  je();
  Jg();
  vd();
  rAo();
  Ct();
  Np();
  _a();
  OE();
  B8e = x(et(), 1), oue = x(oe(), 1);
});

export {NYp,gpl,B8e,oue,oAo,YB,_pl};
