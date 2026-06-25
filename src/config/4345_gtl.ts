// @ts-nocheck
import {Qxe as qIe,X6n as o3n} from "../../vendor/m4256.ts";
import {Ne as Ge} from "../../vendor/m583.ts";
import {rBt as s1t,oIe as Zxe} from "../../vendor/m3272.ts";
import {Nit as _ot,aBt as c1t} from "../../vendor/m3274.ts";
import {su as yu,ow as GR} from "../../vendor/m2257.ts";
import {readRoster as Fc,XR as qw} from "../../vendor/m2707.ts";
import {vs as Bs,dm as sf} from "../../vendor/m2256.ts";
import {fa as $a,ry as ty} from "../../vendor/m2253.ts";
import {Ec as Jc,dw as XR} from "../../vendor/m2593.ts";
import {ws as Gs} from "./2709_Zm.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
// @ts-nocheck
// PowerShell 工具描述文本生成器（xKa：生成 Bash 工具的 Windows PowerShell 变体提示词）

declare const qIe: any;
declare const o3n: any;
declare const Ge: any;
declare const s1t: any;
declare const Zxe: any;
declare const _ot: any;
declare const c1t: any;
declare const yu: any;
declare const GR: any;
declare const Fc: any;
declare const qw: any;
declare const Bs: any;
declare const sf: any;
declare const $a: any;
declare const ty: any;
declare const Jc: any;
declare const XR: any;
declare const Gs: any;
declare const b: any;
declare const Or: any;

/** 返回默认命令超时毫秒数 */
function getDefaultTimeoutMs(): number {
  return qIe();
}

/** 返回最大命令超时毫秒数 */
function getMaxTimeoutMs(): number {
  return o3n();
}

/** 返回 run_in_background 提示行（禁用后台任务时返回 null） */
function getBackgroundParamHint(): string | null {
  if (Ge.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS) return null;
  return "  - You can use the `run_in_background` parameter to run the command in the background. Only use this if you don't need the result immediately and are OK being notified when the command completes later. You do not need to check the output right away - you'll be notified when it finishes.";
}

/** 返回 Start-Sleep 规避提示（禁用后台任务时返回 null） */
function getPowerShellSleepHint(): string | null {
  if (Ge.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS) return null;
  return "  - Avoid unnecessary `Start-Sleep` commands:\n    - Do not sleep between commands that can run immediately — just run them.\n    - If your command is long running and you would like to be notified when it finishes — simply run your command using `run_in_background`. There is no need to sleep in this case.\n    - Do not retry failing commands in a sleep loop — diagnose the root cause or consider an alternative approach.\n    - If waiting for a background task you started with `run_in_background`, you will be notified when it completes — do not poll.\n    - If you must poll an external process, use a check command rather than sleeping first.\n    - If you must sleep, keep the duration short to avoid blocking the user.";
}

/** 根据 PowerShell 版本（desktop/core/unknown）返回版本特定语法说明 */
function getPowerShellEditionNote(e: string): string {
  if (e === "desktop") return "PowerShell edition: Windows PowerShell 5.1 (powershell.exe)\n   - Pipeline chain operators `&&` and `||` are NOT available — they cause a parser error. To run B only if A succeeds: `A; if ($?) { B }`. To chain unconditionally: `A; B`.\n   - Ternary (`?:`), null-coalescing (`??`), and null-conditional (`?.`) operators are NOT available. Use `if/else` and explicit `$null -eq` checks instead.\n   - Avoid `2>&1` on native executables. In 5.1, redirecting a native command's stderr inside PowerShell wraps each line in an ErrorRecord (NativeCommandError) and sets `$?` to `$false` even when the exe returned exit code 0. stderr is already captured for you — don't redirect it.\n   - Default file encoding is UTF-16 LE (with BOM). When writing files other tools will read, pass `-Encoding utf8` to `Out-File`/`Set-Content`.\n   - `ConvertFrom-Json` returns a PSCustomObject, not a hashtable. `-AsHashtable` is not available.";
  if (e === "core") return "PowerShell edition: PowerShell 7+ (pwsh)\n   - Pipeline chain operators `&&` and `||` ARE available and work like bash. Prefer `cmd1 && cmd2` over `cmd1; cmd2` when cmd2 should only run if cmd1 succeeds.\n   - Ternary (`$cond ? $a : $b`), null-coalescing (`??`), and null-conditional (`?.`) operators are available.\n   - Default file encoding is UTF-8 without BOM.";
  return "PowerShell edition: unknown — assume Windows PowerShell 5.1 for compatibility\n   - Do NOT use `&&`, `||`, ternary `?:`, null-coalescing `??`, or null-conditional `?.`. These are PowerShell 7+ only and parser-error on 5.1.\n   - To chain commands conditionally: `A; if ($?) { B }`. Unconditionally: `A; B`.";
}

/** 异步生成 PowerShell 工具完整描述文本 */
async function buildPowerShellToolDescription(): Promise<string> {
  let backgroundHint = getBackgroundParamHint(),
    sleepHint = getPowerShellSleepHint(),
    psEdition = await s1t();
  return `Executes a given PowerShell command with optional timeout. Working directory persists between commands; shell state (variables, functions) does not.

IMPORTANT: This tool is for terminal operations via PowerShell: git, npm, docker, and PS cmdlets. DO NOT use it for file operations (reading, writing, editing, searching, finding files) - use the specialized tools for this instead.

${getPowerShellEditionNote(psEdition)}

Before executing the command, please follow these steps:

1. Directory Verification:
   - If the command will create new directories or files, first use \`Get-ChildItem\` (or \`ls\`) to verify the parent directory exists and is the correct location

2. Command Execution:
   - Always quote file paths that contain spaces with double quotes
   - Capture the output of the command.

PowerShell Syntax Notes:
   - Variables use $ prefix: $myVar = "value"
   - Escape character is backtick (\`), not backslash
   - Use Verb-Noun cmdlet naming: Get-ChildItem, Set-Location, New-Item, Remove-Item
   - Common aliases: ls (Get-ChildItem), cd (Set-Location), cat (Get-Content), rm (Remove-Item)
   - Pipe operator | works similarly to bash but passes objects, not text
   - Use Select-Object, Where-Object, ForEach-Object for filtering and transformation
   - String interpolation: "Hello $name" or "Hello $($obj.Property)"
   - Registry access uses PSDrive prefixes: \`HKLM:\\SOFTWARE\\...\`, \`HKCU:\\...\` — NOT raw \`HKEY_LOCAL_MACHINE\\...\`
   - Environment variables: read with \`$env:NAME\`, set with \`$env:NAME = "value"\` (NOT \`Set-Variable\` or bash \`export\`)
   - Call native exe with spaces in path via call operator: \`& "C:\\Program Files\\App\\app.exe" arg1 arg2\`

Unix commands that DO NOT exist in PowerShell — use the equivalent instead:
   - head / tail → \`Get-Content file -TotalCount N\` / \`-Tail N\`; piped: \`| Select-Object -First N\` / \`-Last N\`
   - which → \`(Get-Command name).Source\`
   - touch → \`if (-not (Test-Path path)) { New-Item -ItemType File path }\` (NEVER use \`New-Item -Force\` on a file — it truncates existing content)
   - wc -l → \`(Get-Content file | Measure-Object -Line).Lines\`
   - mkdir -p → \`New-Item -ItemType Directory -Force path\` (\`-p\` is not a PowerShell flag)
   - rm -rf → \`Remove-Item -Recurse -Force path\`
   - ln -s → \`New-Item -ItemType SymbolicLink -Path link -Target target\`
   - chmod / chown → not applicable on Windows; use \`icacls\` only if ACL changes are required
   - 2>/dev/null → \`2>$null\` (but stderr is captured for you — usually unnecessary)
   - VAR=x cmd → \`$env:VAR = 'x'; cmd\` (PowerShell has no inline env-var prefix)
   - Bash control flow (\`if [ -f x ]\`, \`for x in *\`, backtick \`\`cmd\`\` substitution) is a parser error — use \`if (Test-Path x)\`, \`foreach ($x in ...)\`, \`$(cmd)\`

Exit-code note: \`-ErrorAction SilentlyContinue\` suppresses error OUTPUT but the cmdlet failure still causes this tool to report exit 1. To make a cmdlet failure truly non-fatal, promote it to terminating and swallow it: \`try { Cmdlet ... -ErrorAction Stop } catch {}\` (without \`-ErrorAction Stop\`, non-terminating errors skip the \`catch\` and still exit 1).

Interactive and blocking commands (will hang — this tool runs with -NonInteractive):
   - NEVER use \`Read-Host\`, \`Get-Credential\`, \`Out-GridView\`, \`$Host.UI.PromptForChoice\`, or \`pause\`
   - Destructive cmdlets (\`Remove-Item\`, \`Stop-Process\`, \`Clear-Content\`, etc.) may prompt for confirmation. Add \`-Confirm:$false\` when you intend the action to proceed. Use \`-Force\` for read-only/hidden items.
   - Never use \`git rebase -i\`, \`git add -i\`, or other commands that open an interactive editor

Passing multiline strings (commit messages, file content) to native executables:
   - Use a single-quoted here-string so PowerShell does not expand \`$\` or backticks inside. The closing \`'@\` MUST be at column 0 (no leading whitespace) on its own line — indenting it is a parse error:
<example>
git commit -m @'
Commit message here.
Second line with $literal dollar signs.
'@
</example>
   - Use \`@'...'@\` (single-quoted, literal) not \`@"..."@\` (double-quoted, interpolated) unless you need variable expansion
   - For arguments containing \`-\`, \`@\`, or other characters PowerShell parses as operators, use the stop-parsing token: \`git log --% --format=%H\`

Usage notes:
  - The command argument is required.
  - You can specify an optional timeout in milliseconds (up to ${getMaxTimeoutMs()}ms / ${getMaxTimeoutMs() / 60000} minutes). If not specified, commands will timeout after ${getDefaultTimeoutMs()}ms (${getDefaultTimeoutMs() / 60000} minutes).
  - It is very helpful if you write a clear, concise description of what this command does.
  - If the output exceeds ${_ot()} characters, output will be truncated before being returned to you.
${backgroundHint ? backgroundHint + `
` : ""}  - Avoid using PowerShell to run commands that have dedicated tools, unless explicitly instructed:
    - File search: Use ${yu} (NOT Get-ChildItem -Recurse)
    - Content search: Use ${Fc} (NOT Select-String)
    - Read files: Use ${Bs} (NOT Get-Content)
    - Edit files: Use ${$a}
    - Write files: Use ${Jc} (NOT Set-Content/Out-File)
    - Communication: Output text directly (NOT Write-Output/Write-Host)
  - When issuing multiple commands:
    - If the commands are independent and can run in parallel, make multiple ${Gs} tool calls in a single message.
    - If the commands depend on each other and must run sequentially, chain them in a single ${Gs} call (see edition-specific chaining syntax above).
    - Use \`;\` only when you need to run commands sequentially but don't care if earlier commands fail.
    - DO NOT use newlines to separate commands (newlines are ok in quoted strings and here-strings)
  - Do NOT prefix commands with \`cd\` or \`Set-Location\` -- the working directory is already set to the correct project directory automatically.
${sleepHint ? sleepHint + `
` : ""}  - For git commands:
    - Prefer to create a new commit rather than amending an existing commit.
    - Before running destructive operations (e.g., git reset --hard, git push --force, git checkout --), consider whether there is a safer alternative that achieves the same goal. Only use destructive operations when they are truly the best approach.
    - Never skip hooks (--no-verify) or bypass signing (--no-gpg-sign, -c commit.gpgsign=false) unless the user has explicitly asked for it. If a hook fails, investigate and fix the underlying issue.`;
}
var xKa = b(() => {
  Or();
  c1t();
  Zxe();
  ty();
  sf();
  XR();
  GR();
  qw();
});
export {getDefaultTimeoutMs as s8n,getMaxTimeoutMs as g6t,getBackgroundParamHint as Iqp,getPowerShellSleepHint as xqp,getPowerShellEditionNote as Dqp,buildPowerShellToolDescription as htl,xKa as gtl};
