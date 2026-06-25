// @ts-nocheck
import {nt} from "../../vendor/m127.ts";
import {hE,resolveToolAlias as UR} from "./2229_observed_uid.ts";
import {unt,iOt} from "../../vendor/m2522.ts";
import {b} from "../../runtime.ts";
import {dn} from "./0137_namespace.ts";
// @ts-nocheck
/**
 * PowerShell shell-execution backend descriptor.
 *
 * Builds the argument list and command wrapping used when Claude Code drives a
 * PowerShell (`pwsh`/`powershell.exe`) shell. It assembles the standard
 * non-interactive flags, optionally relaxes the execution policy, and wraps the
 * user command so that the working directory and exit code are captured back
 * out of the shell after each invocation. Supports an optional sandbox mode in
 * which the command is re-encoded via `-EncodedCommand` and a sandbox temp dir.
 *
 * Cross-module references kept minified to preserve linkage:
 *   nt   — env-flag truthiness helper (isTruthy)
 *   hE   — resolve the effective temp directory (honors CLAUDE_CODE_TMPDIR)
 *   unt  — quote/describe a filesystem path for embedding in a PS command
 *   Fma  — require("fs/promises")
 *   Bma  — require("path")
 *   Uma  — require("path/posix")
 *   dn / UR / iOt — dependency initializers run on lazy module init
 *   b    — lazy module initializer harness
 */

/** Base PowerShell CLI flags; appends an ExecutionPolicy bypass unless opted out. */
function $ma(): string[] {
  let flags = ["-NoProfile", "-NonInteractive"];
  if (!nt(process.env.CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY)) flags.push("-ExecutionPolicy", "Bypass");
  return flags;
}

/** Wrap a command string into the full PowerShell spawn argument vector. */
function pBt(command: string): string[] {
  return [...$ma(), "-Command", command];
}

/** Base64-encode a UTF-16LE script for PowerShell's `-EncodedCommand`. */
function WXd(script: string): string {
  return Buffer.from(script, "utf16le").toString("base64");
}

/**
 * Construct the PowerShell shell descriptor bound to the given shell path.
 * @param shellPath absolute path to the PowerShell executable
 */
function qma(shellPath: string) {
  let tmpDirOverride: string | undefined;
  return {
    type: "powershell" as const,
    shellPath,
    detached: !1,
    async buildExecCommand(command: string, opts: any) {
      tmpDirOverride = opts.useSandbox ? opts.sandboxTmpDir : void 0;
      let cwdFilePath: string;
      if (opts.useSandbox && opts.sandboxTmpDir) cwdFilePath = Uma.join(opts.sandboxTmpDir, `claude-pwd-ps-${opts.id}`);else {
        let tmpDir = hE();
        await Fma.mkdir(tmpDir, {
          recursive: !0,
          mode: 448
        }).catch(() => {}), cwdFilePath = Bma.join(tmpDir, `claude-pwd-ps-${opts.id}`);
      }
      let suffix = `
; $_ec = if ($null -ne $LASTEXITCODE) { $LASTEXITCODE } elseif ($?) { 0 } else { 1 }
; (Get-Location).Path | Out-File -FilePath ${unt(cwdFilePath, "the temp-directory path (override with CLAUDE_CODE_TMPDIR)")} -Encoding utf8 -NoNewline
; if ($ExecutionContext.SessionState.LanguageMode -eq 'FullLanguage') { $host.SetShouldExit($_ec) } else { exit $_ec }`,
        fullCommand = command + suffix;
      return {
        commandString: opts.useSandbox ? [`'${shellPath.replace(/'/g, "'\\''")}'`, ...$ma(), "-EncodedCommand", WXd(fullCommand)].join(" ") : fullCommand,
        cwdFilePath
      };
    },
    getSpawnArgs(command: string) {
      return pBt(command);
    },
    async getEnvironmentOverrides(_command: string, baseEnv?: Iterable<[string, string]>) {
      let overrides: Record<string, string> = {};
      if (baseEnv) for (let [key, value] of baseEnv) overrides[key] = value;
      if (tmpDirOverride) overrides.TMPDIR = tmpDirOverride, overrides.CLAUDE_CODE_TMPDIR = hE();
      return overrides;
    }
  };
}
var Fma, Bma, Uma;
var jPn = b(() => {
  dn();
  UR();
  iOt();
  Fma = require("fs/promises"), Bma = require("path"), Uma = require("path/posix");
});

export {$ma,pBt,WXd,qma,Fma,Bma,Uma,jPn};
