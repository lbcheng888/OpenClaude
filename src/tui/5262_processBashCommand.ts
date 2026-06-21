// @ts-nocheck
import {isFullscreenWithTTY as j_,ro as b8,b as L,M as u} from "../../runtime.ts";
import {tN as pv,oA as O$} from "../config/2697_oA.ts";
import {CYn as en6,MDo as aZq} from "../../vendor/m5260.ts";
import {logEvent as c,Ct as y_} from "../../vendor/m131.ts";
import {Ln as U6,rG as Do,Ute as iHH,qte as S4H,lo as zq} from "../tools/5190_userPromptCount.ts";
import {wWt as hg_,LDo as oZq} from "../../vendor/m5259.ts";
import {qut as f4_,N3t as Tx_} from "./4327_detectBlockedSleepPattern.ts";
import {Rl as R4,TU as Hb} from "./4359_isSearch.ts";
import {zrt as n__,zxe as bWH,eI as LL} from "../telemetry/3157_error.ts";
import {isAmberSentinelEnabled as LO,QH as ML} from "../../vendor/m2784.ts";
import {BM as Ly,Se as GH,bt as L_} from "../../vendor/m195.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/** Restored Claude Code 2.1.177 module. Processes prompt-prefixed bash commands and returns the prompt state transition. */
var bashCommandExports = {};
j_(bashCommandExports, {
  processBashCommand: (): any => processBashCommand
});
async function processBashCommand(H: any, _: any, q: any, K: any): any {
  let O = pv() && en6() === "powershell";
  c("tengu_input_bash", {
    powershell: O
  });
  let T = U6({
      content: Do({
        inputString: `<bash-input>${H}</bash-input>`,
        precedingInputBlocks: _
      })
    }),
    z,
    $ = pathModule.randomUUID(),
    {
      emitToolProgress: Y
    } = q;
  Y?.({
    kind: "bash_mode_progress",
    toolUseId: $,
    input: H,
    progress: null,
    verbose: q.options.verbose
  }), K({
    jsx: osModule.createElement(hg_, {
      input: H,
      progress: null,
      verbose: q.options.verbose
    }),
    shouldHidePromptInput: !1
  });
  try {
    let A = {
        ...q,
        toolUseId: `${$}:inner`,
        setToolJSX: (W: any): any => {
          z = W?.jsx;
        }
      },
      w = (W: any): any => {
        if (W.type !== "progress") return;
        Y?.({
          kind: "bash_mode_progress",
          toolUseId: $,
          input: H,
          progress: W.data,
          verbose: q.options.verbose
        }), K({
          jsx: osModule.createElement(osModule.Fragment, null, osModule.createElement(hg_, {
            input: H,
            progress: W.data,
            verbose: q.options.verbose
          }), z),
          shouldHidePromptInput: !1,
          showSpinner: !1
        });
      },
      f = null;
    if (O) f = (f4_(), b8(Tx_)).PowerShellTool;
    let j = f ?? R4,
      D = (f ? await f.call({
        command: H,
        dangerouslyDisableSandbox: !0
      }, A, void 0, void 0, w) : await R4.call({
        command: H,
        dangerouslyDisableSandbox: !0
      }, A, void 0, void 0, w)).data;
    if (!D) throw Error("No result received from shell command");
    let M = D.stderr,
      X = await n__(j, {
        ...D,
        stderr: ""
      }, pathModule.randomUUID()),
      P = typeof X.content === "string" ? X.content : D.stdout,
      Z = P.startsWith(bWH) ? P : LO(P);
    return {
      messages: [iHH(), T, U6({
        content: `<bash-stdout>${Z}</bash-stdout><bash-stderr>${LO(M)}</bash-stderr>`
      })],
      shouldQuery: !1
    };
  } catch (A) {
    if (A instanceof Ly) {
      if (A.interrupted) return {
        messages: [iHH(), T, S4H({
          toolUse: !1
        })],
        shouldQuery: !1
      };
      return {
        messages: [iHH(), T, U6({
          content: `<bash-stdout>${LO(A.stdout)}</bash-stdout><bash-stderr>${LO(A.stderr)}</bash-stderr>`
        })],
        shouldQuery: !1
      };
    }
    return {
      messages: [iHH(), T, U6({
        content: `<bash-stderr>Command failed: ${LO(GH(A))}</bash-stderr>`
      })],
      shouldQuery: !1
    };
  } finally {
    Y?.({
      kind: "clear",
      toolUseId: $
    }), K(null);
  }
}
var pathModule, osModule;
var initProcessBashCommand = L((): any => {
  oZq();
  Hb();
  y_();
  L_();
  zq();
  aZq();
  O$();
  LL();
  ML();
  pathModule = require("crypto"), osModule = u(WH(), 1);
});

export {bashCommandExports as _9l,processBashCommand,pathModule as NDo,osModule as Xue,initProcessBashCommand as y9l};
