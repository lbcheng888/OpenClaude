// @ts-nocheck
import {st as q_} from "../../vendor/m5.ts";
import {JS as gM,Mw as CW} from "./2221_recursive.ts";
import {b as L} from "../../runtime.ts";
import {sn as A6} from "./0047_namespace.ts";
/** Returns the base PowerShell invocation flags shared by all invocations. */
function getPowerShellBaseArgs(): string[] {
  let args = ["-NoProfile", "-NonInteractive"];
  if (!q_(process.env.CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY)) args.push("-ExecutionPolicy", "Bypass");
  return args;
}

/**
 * Builds PowerShell spawn args with -Command for the given command string.
 * Cross-module: kept as wV_ for linkage.
 */
function wV_(command: string): string[] {
  return [...getPowerShellBaseArgs(), "-Command", command];
}

/** Encodes a script string as base64-encoded UTF-16LE for PowerShell -EncodedCommand. */
function encodeCommandToBase64Utf16(script: string): string {
  return Buffer.from(script, "utf16le").toString("base64");
}

/**
 * Creates a PowerShell shell descriptor used by the shell execution engine.
 * Cross-module: kept as Le7 for linkage.
 * @param shellPath - Absolute path to the powershell.exe (or pwsh.exe) binary.
 */
function Le7(shellPath: string) {
  let sandboxTmpDir: string | undefined;
  return {
    type: "powershell",
    shellPath: shellPath,
    detached: !1,
    async buildExecCommand(commandStr: string, shellContext: {
      useSandbox: boolean;
      sandboxTmpDir: string;
      id: string;
    }) {
      sandboxTmpDir = shellContext.useSandbox ? shellContext.sandboxTmpDir : void 0;
      let cwdFilePath: string;
      if (shellContext.useSandbox && shellContext.sandboxTmpDir) cwdFilePath = Ge7.join(shellContext.sandboxTmpDir, `claude-pwd-ps-${shellContext.id}`);else {
        let tmpDir = gM();
        await We7.mkdir(tmpDir, {
          recursive: !0,
          mode: 448
        }).catch(() => {}), cwdFilePath = Ze7.join(tmpDir, `claude-pwd-ps-${shellContext.id}`);
      }
      let exitCodeCaptureSuffix = `
; $_ec = if ($null -ne $LASTEXITCODE) { $LASTEXITCODE } elseif ($?) { 0 } else { 1 }
; (Get-Location).Path | Out-File -FilePath '${cwdFilePath.replaceAll("'", "''")}' -Encoding utf8 -NoNewline
; if ($ExecutionContext.SessionState.LanguageMode -eq 'FullLanguage') { $host.SetShouldExit($_ec) } else { exit $_ec }`,
        fullScript = commandStr + exitCodeCaptureSuffix;
      return {
        commandString: shellContext.useSandbox ? [`'${shellPath.replace(/'/g, "'\\''")}'`, ...getPowerShellBaseArgs(), "-EncodedCommand", encodeCommandToBase64Utf16(fullScript)].join(" ") : fullScript,
        cwdFilePath: cwdFilePath
      };
    },
    getSpawnArgs(command: string): string[] {
      return wV_(command);
    },
    async getEnvironmentOverrides(
      _sessionId: unknown,
      envOverrides: Map<string, string> | undefined
    ): Promise<Record<string, string>> {
      let env: Record<string, string> = {};
      if (envOverrides) for (let [key, value] of envOverrides) env[key] = value;
      if (sandboxTmpDir) env.TMPDIR = sandboxTmpDir, env.CLAUDE_CODE_TMPDIR = gM();
      return env;
    }
  };
}
var We7: typeof import("fs/promises"),
  Ze7: typeof import("path"),
  Ge7: typeof import("path/posix");
var G06 = L(() => {
  A6();
  CW();
  We7 = require("fs/promises"), Ze7 = require("path"), Ge7 = require("path/posix");
});

export {getPowerShellBaseArgs as Lia,wV_ as L1t,encodeCommandToBase64Utf16 as n8d,Le7 as Mia,We7 as Dia,Ze7 as Pia,Ge7 as Oia,G06 as o0n};
