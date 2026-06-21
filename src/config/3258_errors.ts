// @ts-nocheck
import {logForDebugging as v,qe as je} from "./0234_setHasFormattedOutput.ts";
import {yW as tW,hke as Zxe} from "../../vendor/m3256.ts";
import {qb as Fb,vB as hB} from "../../vendor/m682.ts";
import {qt as Wt,Xt} from "./0228_encoding.ts";
import {b} from "../../runtime.ts";
import {u8 as Vj,CR as ER} from "../../vendor/m637.ts";
// @ts-nocheck
function getPwshParseTimeout() {
  let rawEnv = process.env.CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS;
  if (rawEnv) {
    let parsed = parseInt(rawEnv, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return DEFAULT_PWSH_TIMEOUT_MS;
}
function getPwshKillTimeout(timeoutMs) {
  return timeoutMs + Math.min(timeoutMs, PWSH_KILL_TIMEOUT_EXTRA_MS);
}
function createPwshParseError(command, message, errorId) {
  return {
    ...PWSH_PARSE_ERROR_RESULT_BASE,
    errors: [{
      message: message,
      errorId: errorId
    }],
    originalCommand: command
  };
}
function normalizeDashes(text) {
  return text.replace(/[\u2013\u2014\u2015]/g, "-");
}
function encodeUtf16LeToBase64(str) {
  if (typeof Buffer < "u") return Buffer.from(str, "utf16le").toString("base64");
  let bytes = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    bytes.push(code & 255, code >> 8 & 255);
  }
  return btoa(bytes.map(b => String.fromCharCode(b)).join(""));
}
function buildPwshEncodedScript(command) {
  return `$EncodedCommand = '${typeof Buffer < "u" ? Buffer.from(command, "utf8").toString("base64") : btoa(new TextEncoder().encode(command).reduce((acc, byte) => acc + String.fromCharCode(byte), ""))}'
${PWSH_PARSER_SCRIPT}`;
}
function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}
function getStatementTypeName(type) {
  switch (type) {
    case "PipelineAst":
      return "PipelineAst";
    case "PipelineChainAst":
      return "PipelineChainAst";
    case "AssignmentStatementAst":
      return "AssignmentStatementAst";
    case "IfStatementAst":
      return "IfStatementAst";
    case "ForStatementAst":
      return "ForStatementAst";
    case "ForEachStatementAst":
      return "ForEachStatementAst";
    case "WhileStatementAst":
      return "WhileStatementAst";
    case "DoWhileStatementAst":
      return "DoWhileStatementAst";
    case "DoUntilStatementAst":
      return "DoUntilStatementAst";
    case "SwitchStatementAst":
      return "SwitchStatementAst";
    case "TryStatementAst":
      return "TryStatementAst";
    case "TrapStatementAst":
      return "TrapStatementAst";
    case "FunctionDefinitionAst":
      return "FunctionDefinitionAst";
    case "DataStatementAst":
      return "DataStatementAst";
    default:
      return "UnknownStatementAst";
  }
}
function getElementTypeName(type, expressionType) {
  switch (type) {
    case "ScriptBlockExpressionAst":
      return "ScriptBlock";
    case "SubExpressionAst":
    case "ArrayExpressionAst":
      return "SubExpression";
    case "ExpandableStringExpressionAst":
      return "ExpandableString";
    case "InvokeMemberExpressionAst":
    case "MemberExpressionAst":
      return "MemberInvocation";
    case "VariableExpressionAst":
      return "Variable";
    case "StringConstantExpressionAst":
    case "ConstantExpressionAst":
      return "StringConstant";
    case "CommandParameterAst":
      return "Parameter";
    case "ParenExpressionAst":
      return "SubExpression";
    case "CommandExpressionAst":
      if (expressionType) return getElementTypeName(expressionType);
      return "Other";
    default:
      return "Other";
  }
}
function classifyCommandName(name) {
  if (/^[A-Za-z]+-[A-Za-z][A-Za-z0-9_]*$/.test(name)) return "cmdlet";
  if (/[.\\/]/.test(name)) return "application";
  return "unknown";
}
function extractCommandBaseName(name) {
  let lastBackslash = name.lastIndexOf("\\");
  if (lastBackslash < 0) return name;
  if (/^[A-Za-z]:/.test(name) || name.startsWith("\\\\") || name.startsWith(".\\") || name.startsWith("..\\")) return name;
  let baseName = name.substring(lastBackslash + 1);
  if (baseName === "") return name;
  return baseName;
}
function parseCommandAst(node) {
  let elements = toArray(node.commandElements),
    commandName = "",
    args = [],
    elementTypes = [],
    childSets = [],
    hasChildren = false,
    nameType = "unknown";
  if (elements.length > 0) {
    let firstElem = elements[0],
      rawName = ((firstElem.type === "StringConstantExpressionAst" || firstElem.type === "ExpandableStringExpressionAst") && typeof firstElem.value === "string" ? firstElem.value : firstElem.text).replace(/^['"]|['"]$/g, "");
    if (/[\u0080-\uFFFF]/.test(rawName)) nameType = "application";else nameType = classifyCommandName(rawName);
    commandName = normalizeDashes(extractCommandBaseName(rawName)), elementTypes.push(getElementTypeName(firstElem.type, firstElem.expressionType));
    for (let i = 1; i < elements.length; i++) {
      let elem = elements[i],
        isStringLiteral = elem.type === "StringConstantExpressionAst" || elem.type === "ExpandableStringExpressionAst";
      args.push(normalizeDashes(isStringLiteral && elem.value != null ? elem.value : elem.text)), elementTypes.push(getElementTypeName(elem.type, elem.expressionType));
      let children = toArray(elem.children);
      if (children.length > 0) hasChildren = true, childSets.push(children.map(child => ({
        type: getElementTypeName(child.type),
        text: normalizeDashes(child.text)
      })));else childSets.push(undefined);
    }
  }
  let result = {
      name: commandName,
      nameType: nameType,
      elementType: "CommandAst",
      args: args,
      text: normalizeDashes(node.text),
      elementTypes: elementTypes,
      ...(hasChildren && {
        children: childSets
      })
    },
    redirections = toArray(node.redirections);
  if (redirections.length > 0) result.redirections = redirections.map(parseRedirection);
  return result;
}
function parseCommandExpressionAst(node) {
  let elementType = node.type === "ParenExpressionAst" ? "ParenExpressionAst" : "CommandExpressionAst",
    elementTypes = [getElementTypeName(node.type, node.expressionType)];
  return {
    name: normalizeDashes(node.text),
    nameType: "unknown",
    elementType: elementType,
    args: [],
    text: normalizeDashes(node.text),
    elementTypes: elementTypes
  };
}
function parseRedirection(node) {
  if (node.type === "MergingRedirectionAst") return {
    operator: "2>&1",
    target: "",
    isMerging: true
  };
  let isAppend = node.append ?? false,
    fromStream = node.fromStream ?? "Output",
    operator;
  if (isAppend) switch (fromStream) {
    case "Error":
      operator = "2>>";
      break;
    case "All":
      operator = "*>>";
      break;
    default:
      operator = ">>";
      break;
  } else switch (fromStream) {
    case "Error":
      operator = "2>";
      break;
    case "All":
      operator = "*>";
      break;
    default:
      operator = ">";
      break;
  }
  return {
    operator: operator,
    target: normalizeDashes(node.locationText ?? ""),
    isMerging: false
  };
}
function parsePipelineStatement(node) {
  let statementType = getStatementTypeName(node.type),
    commands = [],
    redirections = [];
  if (node.elements) {
    for (let elem of toArray(node.elements)) if (elem.type === "CommandAst") {
      commands.push(parseCommandAst(elem));
      for (let redir of toArray(elem.redirections)) redirections.push(parseRedirection(redir));
    } else {
      commands.push(parseCommandExpressionAst(elem));
      for (let redir of toArray(elem.redirections)) redirections.push(parseRedirection(redir));
    }
    let seen = new Set(redirections.map(r => `${r.operator}\x00${r.target}`));
    for (let redir of toArray(node.redirections)) {
      let parsed = parseRedirection(redir),
        key = `${parsed.operator}\x00${parsed.target}`;
      if (!seen.has(key)) seen.add(key), redirections.push(parsed);
    }
  } else {
    commands.push({
      name: normalizeDashes(node.text),
      nameType: "unknown",
      elementType: "CommandExpressionAst",
      args: [],
      text: normalizeDashes(node.text)
    });
    for (let redir of toArray(node.redirections)) redirections.push(parseRedirection(redir));
  }
  let nestedCommands,
    rawNested = toArray(node.nestedCommands);
  if (rawNested.length > 0) nestedCommands = rawNested.map(parseCommandAst);
  let statement = {
    statementType: statementType,
    commands: commands,
    redirections: redirections,
    text: normalizeDashes(node.text),
    nestedCommands: nestedCommands
  };
  if (node.securityPatterns) statement.securityPatterns = node.securityPatterns;
  return statement;
}
function normalizePwshParseResult(raw) {
  let result = {
      valid: raw.valid,
      errors: toArray(raw.errors),
      statements: toArray(raw.statements).map(parsePipelineStatement),
      variables: toArray(raw.variables),
      hasStopParsing: raw.hasStopParsing,
      originalCommand: raw.originalCommand
    },
    typeLiterals = toArray(raw.typeLiterals);
  if (typeLiterals.length > 0) result.typeLiterals = typeLiterals;
  if (raw.hasUsingStatements) result.hasUsingStatements = true;
  if (raw.hasScriptRequirements) result.hasScriptRequirements = true;
  if (raw.hasBackgroundJob) result.hasBackgroundJob = true;
  return result;
}
async function invokePwshParser(command) {
  let byteLength = Buffer.byteLength(command, "utf8");
  if (byteLength > pwshMaxCommandBytes) return v(`PowerShell parser: command too long (${byteLength} bytes, max ${pwshMaxCommandBytes})`), createPwshParseError(command, `Command too long for parsing (${byteLength} bytes). Maximum supported length is ${pwshMaxCommandBytes} bytes.`, "CommandTooLong");
  if (/`u\{[0-9A-Fa-f]/.test(command)) return createPwshParseError(command, "PowerShell `u{HEX} codepoint escape is runtime-resolved and cannot be statically validated.", "UnicodeCodepointEscape");
  let pwshPath = await tW();
  if (!pwshPath) return createPwshParseError(command, "PowerShell is not available", "NoPowerShell");
  let encodedScript = buildPwshEncodedScript(command),
    pwshArgs = ["-NoProfile", "-NonInteractive", "-NoLogo", "-EncodedCommand", encodeUtf16LeToBase64(encodedScript)],
    timeoutMs = getPwshParseTimeout(),
    killTimeoutMs = getPwshKillTimeout(timeoutMs),
    stdout = "",
    stderr = "",
    exitCode = null,
    timedOut = false,
    spawnError = null;
  for (let attempt = 0; attempt < MAX_PWSH_RETRY_ATTEMPTS; attempt++) {
    spawnError = null, timedOut = false;
    let killTimer;
    try {
      let proc = Fb(pwshPath, pwshArgs, {
          timeout: timeoutMs,
          reject: false
        }),
        result = await Promise.race([proc, new Promise(resolve => {
          killTimer = setTimeout(cb => cb(null), killTimeoutMs, resolve);
        })]);
      if (result === null) proc.catch(() => {}), timedOut = true, exitCode = 1;else stdout = result.stdout, stderr = result.stderr, timedOut = result.timedOut, exitCode = result.failed ? result.exitCode ?? 1 : 0;
    } catch (err) {
      spawnError = err instanceof Error ? err.message : String(err), exitCode = null;
    } finally {
      clearTimeout(killTimer);
    }
    if (exitCode === 0) break;
    v(`PowerShell parser: ${spawnError ? `failed to spawn pwsh: ${spawnError}` : timedOut ? `pwsh timed out after ${timeoutMs}ms` : `pwsh exited ${exitCode}: ${stderr}`} (attempt ${attempt + 1})`);
  }
  if (spawnError) return createPwshParseError(command, `Failed to spawn PowerShell: ${spawnError}`, "PwshSpawnError");
  if (timedOut) return createPwshParseError(command, `pwsh timed out after ${timeoutMs}ms (2 attempts)`, "PwshTimeout");
  if (exitCode !== 0) return v(`PowerShell parser: pwsh exited with code ${exitCode}, stderr: ${stderr}`), createPwshParseError(command, `pwsh exited with code ${exitCode}: ${stderr}`, "PwshError");
  let trimmedOutput = stdout.trim();
  if (!trimmedOutput) return v("PowerShell parser: empty stdout from pwsh"), createPwshParseError(command, "No output from PowerShell parser", "EmptyOutput");
  try {
    let parsed = Wt(trimmedOutput);
    return normalizePwshParseResult(parsed);
  } catch {
    return v(`PowerShell parser: invalid JSON output: ${trimmedOutput.slice(0, 200)}`), createPwshParseError(command, "Invalid JSON from PowerShell parser", "InvalidJson");
  }
}
function getAllCommandNames(result) {
  let names = [];
  for (let stmt of result.statements) {
    for (let cmd of stmt.commands) names.push(cmd.name.toLowerCase());
    if (stmt.nestedCommands) for (let cmd of stmt.nestedCommands) names.push(cmd.name.toLowerCase());
  }
  return names;
}
function getAllCommands(result) {
  let cmds = [];
  for (let stmt of result.statements) {
    for (let cmd of stmt.commands) cmds.push(cmd);
    if (stmt.nestedCommands) for (let cmd of stmt.nestedCommands) cmds.push(cmd);
  }
  return cmds;
}
function getAllRedirections(result) {
  let redirs = [];
  for (let stmt of result.statements) {
    for (let redir of stmt.redirections) redirs.push(redir);
    if (stmt.nestedCommands) {
      for (let cmd of stmt.nestedCommands) if (cmd.redirections) for (let redir of cmd.redirections) redirs.push(redir);
    }
  }
  return redirs;
}
function getVariablesByProvider(result, providerName) {
  let prefix = providerName.toLowerCase() + ":";
  return result.variables.filter(v => v.path.toLowerCase().startsWith(prefix));
}
function commandUsesName(result, targetName) {
  let lower = targetName.toLowerCase(),
    aliasTarget = POWERSHELL_ALIAS_MAP[lower]?.toLowerCase();
  for (let name of getAllCommandNames(result)) {
    if (name === lower) return true;
    let nameAlias = POWERSHELL_ALIAS_MAP[name]?.toLowerCase();
    if (nameAlias === lower) return true;
    if (aliasTarget && name === aliasTarget) return true;
    if (nameAlias && aliasTarget && nameAlias === aliasTarget) return true;
  }
  return false;
}
function isParameter(text, elementType) {
  if (elementType !== undefined) return elementType === "Parameter";
  return text.length > 0 && DASH_CHARS.has(text[0]);
}
function commandHasParameter(commandNode, paramFull, paramPrefix) {
  let lowerFull = paramFull.toLowerCase(),
    lowerPrefix = paramPrefix.toLowerCase();
  return commandNode.args.some(arg => {
    let colonIdx = arg.indexOf(":", 1),
      normalized = (colonIdx > 0 ? arg.slice(0, colonIdx) : arg).replace(/`[\r\n]+\s*/g, "").replaceAll("`", "").toLowerCase();
    return normalized.startsWith(lowerPrefix) && lowerFull.startsWith(normalized) && normalized.length <= lowerFull.length;
  });
}
function getStatements(result) {
  return result.statements;
}
function isNullLiteral(text) {
  let lower = text.trim().toLowerCase();
  return lower === "$null" || lower === "${null}";
}
function getNonNullFileRedirections(result) {
  return getAllRedirections(result).filter(r => !r.isMerging && !isNullLiteral(r.target));
}
function analyzeParseResult(result) {
  let flags = {
    hasSubExpressions: false,
    hasScriptBlocks: false,
    hasSplatting: false,
    hasExpandableStrings: false,
    hasMemberInvocations: false,
    hasAssignments: false,
    hasStopParsing: result.hasStopParsing
  };
  function accumulateElementTypes(cmd) {
    if (!cmd.elementTypes) return;
    for (let elemType of cmd.elementTypes) switch (elemType) {
      case "ScriptBlock":
        flags.hasScriptBlocks = true;
        break;
      case "SubExpression":
        flags.hasSubExpressions = true;
        break;
      case "ExpandableString":
        flags.hasExpandableStrings = true;
        break;
      case "MemberInvocation":
        flags.hasMemberInvocations = true;
        break;
    }
  }
  for (let stmt of result.statements) {
    if (stmt.statementType === "AssignmentStatementAst") flags.hasAssignments = true;
    for (let cmd of stmt.commands) accumulateElementTypes(cmd);
    if (stmt.nestedCommands) for (let cmd of stmt.nestedCommands) accumulateElementTypes(cmd);
    if (stmt.securityPatterns) {
      if (stmt.securityPatterns.hasMemberInvocations) flags.hasMemberInvocations = true;
      if (stmt.securityPatterns.hasSubExpressions) flags.hasSubExpressions = true;
      if (stmt.securityPatterns.hasExpandableStrings) flags.hasExpandableStrings = true;
      if (stmt.securityPatterns.hasScriptBlocks) flags.hasScriptBlocks = true;
    }
  }
  for (let variable of result.variables) if (variable.isSplatted) {
    flags.hasSplatting = true;
    break;
  }
  return flags;
}
var DEFAULT_PWSH_TIMEOUT_MS = 5000,
  MAX_PWSH_RETRY_ATTEMPTS = 2,
  PWSH_KILL_TIMEOUT_EXTRA_MS = 1e4,
  PWSH_PARSER_SCRIPT = `
if (-not $EncodedCommand) {
    Write-Output '{"valid":false,"errors":[{"message":"No command provided","errorId":"NoInput"}],"statements":[],"variables":[],"hasStopParsing":false,"originalCommand":""}'
    exit 0
}

$Command = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($EncodedCommand))

$tokens = $null
$parseErrors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseInput(
    $Command,
    [ref]$tokens,
    [ref]$parseErrors
)

$allVariables = [System.Collections.ArrayList]::new()

function Get-RawCommandElements {
    param([System.Management.Automation.Language.CommandAst]$CmdAst)
    $elems = [System.Collections.ArrayList]::new()
    foreach ($ce in $CmdAst.CommandElements) {
        $ceData = @{ type = $ce.GetType().Name; text = $ce.Extent.Text }
        if ($ce.PSObject.Properties['Value'] -and $null -ne $ce.Value -and $ce.Value -is [string]) {
            $ceData.value = $ce.Value
        }
        if ($ce -is [System.Management.Automation.Language.CommandExpressionAst]) {
            $ceData.expressionType = $ce.Expression.GetType().Name
        }
        $a=$ce.Argument;if($a){$ceData.children=@(@{type=$a.GetType().Name;text=$a.Extent.Text})}
        [void]$elems.Add($ceData)
    }
    return $elems
}

function Get-RawRedirections {
    param($Redirections)
    $result = [System.Collections.ArrayList]::new()
    foreach ($redir in $Redirections) {
        $redirData = @{ type = $redir.GetType().Name }
        if ($redir -is [System.Management.Automation.Language.FileRedirectionAst]) {
            $redirData.append = [bool]$redir.Append
            $redirData.fromStream = $redir.FromStream.ToString()
            $redirData.locationText = $redir.Location.Extent.Text
        }
        [void]$result.Add($redirData)
    }
    return $result
}

function Get-SecurityPatterns($A) {
    $p = @{}
    foreach ($n in $A.FindAll({ param($x)
        $x -is [System.Management.Automation.Language.MemberExpressionAst] -or
        $x -is [System.Management.Automation.Language.SubExpressionAst] -or
        $x -is [System.Management.Automation.Language.ArrayExpressionAst] -or
        $x -is [System.Management.Automation.Language.ExpandableStringExpressionAst] -or
        $x -is [System.Management.Automation.Language.ScriptBlockExpressionAst] -or
        $x -is [System.Management.Automation.Language.ParenExpressionAst]
    }, $true)) { switch ($n.GetType().Name) {
        'InvokeMemberExpressionAst' { $p.hasMemberInvocations = $true }
        'MemberExpressionAst' { $p.hasMemberInvocations = $true }
        'SubExpressionAst' { $p.hasSubExpressions = $true }
        'ArrayExpressionAst' { $p.hasSubExpressions = $true }
        'ParenExpressionAst' { $p.hasSubExpressions = $true }
        'ExpandableStringExpressionAst' { $p.hasExpandableStrings = $true }
        'ScriptBlockExpressionAst' { $p.hasScriptBlocks = $true }
    }}
    if ($p.Count -gt 0) { return $p }
    return $null
}

$varExprs = $ast.FindAll({ param($node) $node -is [System.Management.Automation.Language.VariableExpressionAst] }, $true)
foreach ($v in $varExprs) {
    [void]$allVariables.Add(@{
        path = $v.VariablePath.ToString()
        isSplatted = [bool]$v.Splatted
    })
}

$typeLiterals = [System.Collections.ArrayList]::new()
foreach ($t in $ast.FindAll({ param($n)
    $n -is [System.Management.Automation.Language.TypeExpressionAst] -or
    $n -is [System.Management.Automation.Language.TypeConstraintAst]
}, $true)) { [void]$typeLiterals.Add($t.TypeName.FullName) }

$hasStopParsing = $false
foreach ($tok in $tokens) {
    $norm = $tok.Text -replace '[\\u2013\\u2014\\u2015]','-' -replace '[\`''""\\u2018-\\u201f]',''
    if ($norm -eq '--%') {
        $hasStopParsing = $true; break
    }
}

$statements = [System.Collections.ArrayList]::new()
$script:hasBg = $false
foreach ($p in $ast.FindAll({param($n) $n -is [System.Management.Automation.Language.PipelineBaseAst]}, $true)) {
    if ($p.PSObject.Properties['Background'] -and $p.Background) { $script:hasBg = $true; break }
}

function Process-BlockStatements {
    param($Block)
    if (-not $Block) { return }

    foreach ($stmt in $Block.Statements) {
        $statement = @{
            type = $stmt.GetType().Name
            text = $stmt.Extent.Text
        }

        if ($stmt -is [System.Management.Automation.Language.PipelineAst]) {
            $elements = [System.Collections.ArrayList]::new()
            foreach ($element in $stmt.PipelineElements) {
                $elemData = @{
                    type = $element.GetType().Name
                    text = $element.Extent.Text
                }

                if ($element -is [System.Management.Automation.Language.CommandAst]) {
                    $elemData.commandElements = @(Get-RawCommandElements -CmdAst $element)
                    $elemData.redirections = @(Get-RawRedirections -Redirections $element.Redirections)
                } elseif ($element -is [System.Management.Automation.Language.CommandExpressionAst]) {
                    $elemData.expressionType = $element.Expression.GetType().Name
                    $elemData.redirections = @(Get-RawRedirections -Redirections $element.Redirections)
                }

                [void]$elements.Add($elemData)
            }
            $statement.elements = @($elements)

            $allNestedCmds = $stmt.FindAll(
                { param($node) $node -is [System.Management.Automation.Language.CommandAst] },
                $true
            )
            $nestedCmds = [System.Collections.ArrayList]::new()
            foreach ($cmd in $allNestedCmds) {
                if ($cmd.Parent -eq $stmt) { continue }
                $nested = @{
                    type = $cmd.GetType().Name
                    text = $cmd.Extent.Text
                    commandElements = @(Get-RawCommandElements -CmdAst $cmd)
                    redirections = @(Get-RawRedirections -Redirections $cmd.Redirections)
                }
                [void]$nestedCmds.Add($nested)
            }
            if ($nestedCmds.Count -gt 0) {
                $statement.nestedCommands = @($nestedCmds)
            }
            $r = $stmt.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)
            if ($r.Count -gt 0) {
                $rr = @(Get-RawRedirections -Redirections $r)
                $statement.redirections = if ($statement.redirections) { @($statement.redirections) + $rr } else { $rr }
            }
        } else {
            $nestedCmdAsts = $stmt.FindAll(
                { param($node) $node -is [System.Management.Automation.Language.CommandAst] },
                $true
            )
            $nested = [System.Collections.ArrayList]::new()
            foreach ($cmd in $nestedCmdAsts) {
                [void]$nested.Add(@{
                    type = 'CommandAst'
                    text = $cmd.Extent.Text
                    commandElements = @(Get-RawCommandElements -CmdAst $cmd)
                    redirections = @(Get-RawRedirections -Redirections $cmd.Redirections)
                })
            }
            if ($nested.Count -gt 0) {
                $statement.nestedCommands = @($nested)
            }
            $r = $stmt.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)
            if ($r.Count -gt 0) { $statement.redirections = @(Get-RawRedirections -Redirections $r) }
        }

        $sp = Get-SecurityPatterns $stmt
        if ($sp) { $statement.securityPatterns = $sp }

        [void]$statements.Add($statement)
    }

    if ($Block.Traps) {
        foreach ($trap in $Block.Traps) {
            $statement = @{
                type = 'TrapStatementAst'
                text = $trap.Extent.Text
            }
            $nestedCmdAsts = $trap.FindAll(
                { param($node) $node -is [System.Management.Automation.Language.CommandAst] },
                $true
            )
            $nestedCmds = [System.Collections.ArrayList]::new()
            foreach ($cmd in $nestedCmdAsts) {
                $nested = @{
                    type = $cmd.GetType().Name
                    text = $cmd.Extent.Text
                    commandElements = @(Get-RawCommandElements -CmdAst $cmd)
                    redirections = @(Get-RawRedirections -Redirections $cmd.Redirections)
                }
                [void]$nestedCmds.Add($nested)
            }
            if ($nestedCmds.Count -gt 0) {
                $statement.nestedCommands = @($nestedCmds)
            }
            $r = $trap.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)
            if ($r.Count -gt 0) { $statement.redirections = @(Get-RawRedirections -Redirections $r) }
            $sp = Get-SecurityPatterns $trap
            if ($sp) { $statement.securityPatterns = $sp }
            [void]$statements.Add($statement)
        }
    }
}

Process-BlockStatements -Block $ast.BeginBlock
Process-BlockStatements -Block $ast.ProcessBlock
Process-BlockStatements -Block $ast.EndBlock
Process-BlockStatements -Block $ast.CleanBlock
Process-BlockStatements -Block $ast.DynamicParamBlock

if ($ast.ParamBlock) {
  $pb = $ast.ParamBlock
  $pn = [System.Collections.ArrayList]::new()
  foreach ($c in $pb.FindAll({param($n) $n -is [System.Management.Automation.Language.CommandAst]}, $true)) {
    [void]$pn.Add(@{type='CommandAst';text=$c.Extent.Text;commandElements=@(Get-RawCommandElements -CmdAst $c);redirections=@(Get-RawRedirections -Redirections $c.Redirections)})
  }
  $pr = $pb.FindAll({param($n) $n -is [System.Management.Automation.Language.FileRedirectionAst]}, $true)
  $ps = Get-SecurityPatterns $pb
  if ($pn.Count -gt 0 -or $pr.Count -gt 0 -or $ps) {
    $st = @{type='ParamBlockAst';text=$pb.Extent.Text}
    if ($pn.Count -gt 0) { $st.nestedCommands = @($pn) }
    if ($pr.Count -gt 0) { $st.redirections = @(Get-RawRedirections -Redirections $pr) }
    if ($ps) { $st.securityPatterns = $ps }
    [void]$statements.Add($st)
  }
}

$hasUsingStatements = $ast.UsingStatements -and $ast.UsingStatements.Count -gt 0
$hasScriptRequirements = $ast.ScriptRequirements -ne $null

$output = @{
    valid = ($parseErrors.Count -eq 0)
    errors = @($parseErrors | ForEach-Object {
        @{
            message = $_.Message
            errorId = $_.ErrorId
        }
    })
    statements = @($statements)
    variables = @($allVariables)
    hasStopParsing = $hasStopParsing
    originalCommand = $Command
    typeLiterals = @($typeLiterals)
    hasUsingStatements = [bool]$hasUsingStatements
    hasScriptRequirements = [bool]$hasScriptRequirements
    hasBackgroundJob = [bool]$script:hasBg
}

$output | ConvertTo-Json -Depth 10 -Compress
`,
  PWSH_MAX_ENCODED_COMMAND_CHARS = 32767,
  PWSH_ENCODED_COMMAND_OVERHEAD_CHARS = 200,
  PWSH_ARGS_OVERHEAD_CHARS = 21,
  PWSH_MAX_COMMAND_SAFETY_MARGIN = 100,
  PWSH_MAX_ENCODED_CHARS,
  PWSH_MAX_DECODED_BYTES,
  PWSH_MAX_DECODED_BYTES_2,
  PWSH_MAX_COMMAND_UTF16_CHARS = 4500,
  pwshMaxCommandBytes,
  PWSH_PARSE_ERROR_RESULT_BASE,
  PWSH_TRANSIENT_ERROR_IDS,
  parsePowerShellCommand,
  POWERSHELL_ALIAS_MAP,
  DASH_CHARS;
var a7H = b(() => {
  je();
  Vj();
  hB();
  Zxe();
  Xt();
  PWSH_MAX_ENCODED_CHARS = (PWSH_MAX_ENCODED_COMMAND_CHARS - PWSH_ENCODED_COMMAND_OVERHEAD_CHARS) * 3 / 8, PWSH_MAX_DECODED_BYTES = PWSH_MAX_ENCODED_CHARS - PWSH_PARSER_SCRIPT.length - PWSH_ARGS_OVERHEAD_CHARS, PWSH_MAX_DECODED_BYTES_2 = Math.max(0, Math.floor(PWSH_MAX_DECODED_BYTES * 3 / 4) - PWSH_MAX_COMMAND_SAFETY_MARGIN), pwshMaxCommandBytes = PWSH_MAX_COMMAND_UTF16_CHARS, PWSH_PARSE_ERROR_RESULT_BASE = {
    valid: false,
    statements: [],
    variables: [],
    hasStopParsing: false
  };
  PWSH_TRANSIENT_ERROR_IDS = new Set(["PwshSpawnError", "PwshError", "PwshTimeout", "EmptyOutput", "InvalidJson"]), parsePowerShellCommand = ER(command => {
    let promise = invokePwshParser(command);
    return promise.then(result => {
      if (!result.valid && PWSH_TRANSIENT_ERROR_IDS.has(result.errors[0]?.errorId ?? "")) parsePowerShellCommand.cache.delete(command);
    }), promise;
  }, command => command, 256), POWERSHELL_ALIAS_MAP = Object.assign(Object.create(null), {
    ls: "Get-ChildItem",
    dir: "Get-ChildItem",
    gci: "Get-ChildItem",
    cat: "Get-Content",
    type: "Get-Content",
    gc: "Get-Content",
    cd: "Set-Location",
    sl: "Set-Location",
    chdir: "Set-Location",
    pushd: "Push-Location",
    popd: "Pop-Location",
    pwd: "Get-Location",
    gl: "Get-Location",
    gi: "Get-Item",
    gp: "Get-ItemProperty",
    ni: "New-Item",
    mkdir: "New-Item",
    md: "New-Item",
    ri: "Remove-Item",
    del: "Remove-Item",
    rd: "Remove-Item",
    rmdir: "Remove-Item",
    rm: "Remove-Item",
    erase: "Remove-Item",
    mi: "Move-Item",
    mv: "Move-Item",
    move: "Move-Item",
    ci: "Copy-Item",
    cp: "Copy-Item",
    copy: "Copy-Item",
    cpi: "Copy-Item",
    si: "Set-Item",
    rni: "Rename-Item",
    ren: "Rename-Item",
    ps: "Get-Process",
    gps: "Get-Process",
    kill: "Stop-Process",
    spps: "Stop-Process",
    start: "Start-Process",
    saps: "Start-Process",
    sajb: "Start-Job",
    ipmo: "Import-Module",
    echo: "Write-Output",
    write: "Write-Output",
    sleep: "Start-Sleep",
    help: "Get-Help",
    man: "Get-Help",
    gcm: "Get-Command",
    gsv: "Get-Service",
    gv: "Get-Variable",
    sv: "Set-Variable",
    h: "Get-History",
    history: "Get-History",
    iex: "Invoke-Expression",
    iwr: "Invoke-WebRequest",
    irm: "Invoke-RestMethod",
    icm: "Invoke-Command",
    ii: "Invoke-Item",
    nsn: "New-PSSession",
    etsn: "Enter-PSSession",
    exsn: "Exit-PSSession",
    gsn: "Get-PSSession",
    rsn: "Remove-PSSession",
    cls: "Clear-Host",
    clear: "Clear-Host",
    select: "Select-Object",
    where: "Where-Object",
    foreach: "ForEach-Object",
    "%": "ForEach-Object",
    "?": "Where-Object",
    measure: "Measure-Object",
    ft: "Format-Table",
    fl: "Format-List",
    fw: "Format-Wide",
    oh: "Out-Host",
    ogv: "Out-GridView",
    ac: "Add-Content",
    clc: "Clear-Content",
    tee: "Tee-Object",
    epcsv: "Export-Csv",
    sp: "Set-ItemProperty",
    rp: "Remove-ItemProperty",
    cli: "Clear-Item",
    epal: "Export-Alias",
    sls: "Select-String"
  });
  DASH_CHARS = new Set(["-", "\u2013", "\u2014", "\u2015"]);
});

export {getPwshParseTimeout as Q6d,getPwshKillTimeout as tjd,createPwshParseError as gke,normalizeDashes as zae,encodeUtf16LeToBase64 as ujd,buildPwshEncodedScript as djd,toArray as TW,getStatementTypeName as pjd,getElementTypeName as x1t,classifyCommandName as EYr,extractCommandBaseName as VIn,parseCommandAst as Ksa,parseCommandExpressionAst as mjd,parseRedirection as R1t,parsePipelineStatement as fjd,normalizePwshParseResult as Ajd,invokePwshParser as hjd,getAllCommandNames as CYr,getAllCommands as $0,getAllRedirections as _jd,getVariablesByProvider as Ysa,commandUsesName as vYr,isParameter as yke,commandHasParameter as wYr,getStatements as KIn,isNullLiteral as Mot,getNonNullFileRedirections as k1t,analyzeParseResult as qq,DEFAULT_PWSH_TIMEOUT_MS as X6d,MAX_PWSH_RETRY_ATTEMPTS as Z6d,PWSH_KILL_TIMEOUT_EXTRA_MS as ejd,PWSH_PARSER_SCRIPT as zsa,PWSH_MAX_ENCODED_COMMAND_CHARS as njd,PWSH_ENCODED_COMMAND_OVERHEAD_CHARS as rjd,PWSH_ARGS_OVERHEAD_CHARS as ojd,PWSH_MAX_COMMAND_SAFETY_MARGIN as sjd,PWSH_MAX_ENCODED_CHARS as ijd,PWSH_MAX_DECODED_BYTES as ajd,PWSH_MAX_DECODED_BYTES_2 as Qng,PWSH_MAX_COMMAND_UTF16_CHARS as ljd,pwshMaxCommandBytes as bYr,PWSH_PARSE_ERROR_RESULT_BASE as cjd,PWSH_TRANSIENT_ERROR_IDS as gjd,parsePowerShellCommand as _ke,POWERSHELL_ALIAS_MAP as Yae,DASH_CHARS as SW,a7H as Jae};
