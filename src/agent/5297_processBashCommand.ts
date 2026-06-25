// @ts-nocheck
import {ft,oo,b,x} from "../../runtime.ts";
import {m1,Zm} from "../config/2709_Zm.ts";
import {wZn,lNo} from "../../vendor/m5295.ts";
import {getInitialSettings as Fr,br} from "../config/0745_updateSettingsForSource.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Mn,EG,Dte,HY,po} from "../tools/5224_userPromptCount.ts";
import {r7t,aNo} from "../../vendor/m5294.ts";
import {Upt,r6t} from "../tools/4347_isAutobackgroundingAllowed.ts";
import {sl,UB} from "../tools/4381_isSearch.ts";
import {jst,NHe,HI} from "../telemetry/3173_error.ts";
import {Ml,Yk} from "../../vendor/m2796.ts";
import {XL,Ce,Ct} from "../../vendor/m197.ts";
import {oe} from "../../vendor/m2275.ts";
var TVl = {};
ft(TVl, {
  processBashCommand: () => processBashCommand
});
/**
 * Executes a "bash-mode" command typed by the user (the `!`-prefixed input).
 *
 * Runs the command through the appropriate shell tool (PowerShell on Windows
 * when the active shell is PowerShell, otherwise the default Bash tool `sl`),
 * streams live progress back to the UI, and returns the resulting conversation
 * messages plus whether the assistant should be queried with the output.
 *
 * @param commandInput   The raw shell command string the user entered.
 * @param precedingInputBlocks  Prior input blocks to render alongside this command.
 * @param toolContext    Tool-use context (options, abortController, progress emitter, setToolJSX).
 * @param setPromptUI    Callback that mounts/clears the prompt-input JSX for live UI updates.
 */
async function processBashCommand(
  commandInput: string,
  precedingInputBlocks: unknown,
  toolContext: any,
  setPromptUI: (state: any) => void
): Promise<{ messages: any[]; shouldQuery: boolean }> {
  let isPowerShell = m1() && wZn() === "powershell",
    respondToBashCommands = Fr().respondToBashCommands ?? !0;
  W("tengu_input_bash", {
    powershell: isPowerShell,
    respond: respondToBashCommands
  });
  let inputMessage = Mn({
      content: EG({
        inputString: `<bash-input>${commandInput}</bash-input>`,
        precedingInputBlocks: precedingInputBlocks
      })
    }),
    innerToolJSX: any,
    toolUseId = cNo.randomUUID(),
    {
      emitToolProgress: emitToolProgress
    } = toolContext;
  emitToolProgress?.({
    kind: "bash_mode_progress",
    toolUseId: toolUseId,
    input: commandInput,
    progress: null,
    verbose: toolContext.options.verbose
  }), setPromptUI({
    jsx: xGe.jsx(r7t, {
      input: commandInput,
      progress: null,
      verbose: toolContext.options.verbose
    }),
    shouldHidePromptInput: !1
  });
  try {
    let innerToolContext = {
        ...toolContext,
        toolUseId: `${toolUseId}:inner`,
        setToolJSX: (jsxState: any) => {
          innerToolJSX = jsxState?.jsx;
        }
      },
      onShellEvent = (event: any) => {
        if (event.type !== "progress") return;
        emitToolProgress?.({
          kind: "bash_mode_progress",
          toolUseId: toolUseId,
          input: commandInput,
          progress: event.data,
          verbose: toolContext.options.verbose
        }), setPromptUI({
          jsx: xGe.jsxs(xGe.Fragment, {
            children: [xGe.jsx(r7t, {
              input: commandInput,
              progress: event.data,
              verbose: toolContext.options.verbose
            }), innerToolJSX]
          }),
          shouldHidePromptInput: !1,
          showSpinner: !1
        });
      },
      powerShellTool = null;
    if (isPowerShell) powerShellTool = (Upt(), oo(r6t)).PowerShellTool;
    let shellTool = powerShellTool ?? sl,
      shellResult = (powerShellTool ? await powerShellTool.call({
        command: commandInput,
        dangerouslyDisableSandbox: !0
      }, innerToolContext, void 0, void 0, onShellEvent) : await sl.call({
        command: commandInput,
        dangerouslyDisableSandbox: !0
      }, innerToolContext, void 0, void 0, onShellEvent)).data;
    if (!shellResult) throw Error("No result received from shell command");
    let stderrOutput = shellResult.stderr,
      formattedResult = await jst(shellTool, {
        ...shellResult,
        stderr: ""
      }, cNo.randomUUID()),
      stdoutText = typeof formattedResult.content === "string" ? formattedResult.content : shellResult.stdout,
      renderedStdout = stdoutText.startsWith(NHe) ? stdoutText : Ml(stdoutText),
      shouldQuery = respondToBashCommands && !shellResult.interrupted && !shellResult.backgroundTaskId && !toolContext.abortController.signal.aborted;
    return {
      messages: [...(shouldQuery ? [] : [Dte()]), inputMessage, Mn({
        content: `<bash-stdout>${renderedStdout}</bash-stdout><bash-stderr>${Ml(stderrOutput)}</bash-stderr>`
      })],
      shouldQuery: shouldQuery
    };
  } catch (error) {
    if (error instanceof XL) {
      if (error.interrupted) return {
        messages: [Dte(), inputMessage, HY({
          toolUse: !1
        })],
        shouldQuery: !1
      };
      let shouldQueryOnInterrupt = respondToBashCommands && !toolContext.abortController.signal.aborted;
      return {
        messages: [...(shouldQueryOnInterrupt ? [] : [Dte()]), inputMessage, Mn({
          content: `<bash-stdout>${Ml(error.stdout)}</bash-stdout><bash-stderr>${Ml(error.stderr)}</bash-stderr>`
        })],
        shouldQuery: shouldQueryOnInterrupt
      };
    }
    let shouldQueryOnError = respondToBashCommands && !toolContext.abortController.signal.aborted;
    return {
      messages: [...(shouldQueryOnError ? [] : [Dte()]), inputMessage, Mn({
        content: `<bash-stderr>Command failed: ${Ml(Ce(error))}</bash-stderr>`
      })],
      shouldQuery: shouldQueryOnError
    };
  } finally {
    emitToolProgress?.({
      kind: "clear",
      toolUseId: toolUseId
    }), setPromptUI(null);
  }
}
var cNo, xGe;
var SVl = b(() => {
  aNo();
  UB();
  kt();
  Ct();
  po();
  br();
  lNo();
  Zm();
  HI();
  Yk();
  cNo = require("crypto"), xGe = x(oe(), 1);
});

export {TVl,processBashCommand,cNo,xGe,SVl};
