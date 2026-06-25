// @ts-nocheck
import {wj} from "../../vendor/m3201.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {DTt,Ve} from "../../vendor/m5.ts";
import {mk,lr} from "../../vendor/m233.ts";
import {ln,vn} from "../session/0621_length.ts";
import {b} from "../../runtime.ts";
/**
 * MCP tool-description / argument XML-injection scanning.
 *
 * Anthropic's tool-call protocol uses XML-ish wrappers (`<invoke>`,
 * `</invoke>`, and per-parameter tags). Untrusted MCP servers can smuggle
 * those markers into their tool descriptions or argument values, which the
 * model may then interpret as real tool-call structure. The helpers here
 * detect such markers (for telemetry) and strip the specific
 * `</param></invoke>` trailing artifact that models sometimes emit.
 */

/** Tokens that signal an `<invoke>`-level XML marker. */
declare var ZXr: string[];
/** HTML element names that are too common to treat as MCP parameter tags. */
declare var U7d: Set<string>;
/** Maximum length used when sampling description/instruction text. */
declare var wj: number;

/**
 * Classify whether a single MCP tool's description or property metadata
 * contains an embedded toolcall XML marker.
 *
 * @param tool - MCP tool definition (with optional `inputSchema`/`description`).
 * @returns `"invoke"` if an `<invoke>`-style marker matched, `"param"` if a
 *   property-tag marker matched, or `undefined` if nothing matched.
 */
function $7d(tool): "invoke" | "param" | undefined {
  let schemaProperties = tool.inputSchema?.properties ?? {},
    propertyNames = Object.keys(schemaProperties),
    textSamples: string[] = [];
  if (tool.description) textSamples.push(tool.description.slice(0, wj));
  for (let propertyName of propertyNames) {
    let property = schemaProperties[propertyName],
      propertyDescription =
        property && typeof property === "object" && "description" in property
          ? property.description
          : void 0;
    if (typeof propertyDescription === "string") textSamples.push(propertyDescription);
  }
  if (textSamples.length === 0) return;
  let combinedText = textSamples.join(`
`).toLowerCase(),
    markers = [...ZXr];
  for (let propertyName of propertyNames) {
    let lowerName = propertyName.toLowerCase();
    if (propertyName.length >= 4 && !U7d.has(lowerName)) markers.push(`<${lowerName}>`, `</${lowerName}>`);
  }
  let matchedMarker = markers.find(marker => combinedText.includes(marker));
  if (matchedMarker === void 0) return;
  return ZXr.some(marker => marker === matchedMarker) ? "invoke" : "param";
}

/**
 * Scan every tool exposed by an MCP server and emit telemetry if any of their
 * descriptions (or the server instructions) contain toolcall XML markers.
 *
 * @param tools - List of MCP tool definitions for this server.
 * @param serverName - The MCP server's name.
 * @param config - Context passed to `DTt` for name normalization/hashing.
 * @param serverBaseUrl - Optional server base URL (for remote MCP servers).
 * @param instructions - Optional server instruction text to scan as well.
 */
function lla(tools, serverName, config, serverBaseUrl, instructions): void {
  let invokeCount = 0,
    paramCount = 0,
    firstMatchedToolName;
  for (let tool of tools) {
    let classification = $7d(tool);
    if (classification === void 0) continue;
    if (classification === "invoke") invokeCount++;
    else paramCount++;
    firstMatchedToolName ??= tool.name;
  }
  let instructionsSample = instructions?.slice(0, wj).toLowerCase(),
    instructionsMatch = instructionsSample !== void 0 && ZXr.some(marker => instructionsSample.includes(marker)),
    matchedToolCount = invokeCount + paramCount;
  if (matchedToolCount === 0 && !instructionsMatch) return;
  W("tengu_mcp_description_contains_toolcall_xml", {
    matchedToolCount: matchedToolCount,
    invokeCount: invokeCount,
    paramCount: paramCount,
    instructionsMatch: instructionsMatch,
    sampleToolName: firstMatchedToolName ? DTt(firstMatchedToolName, config) : void 0,
    mcpServerName: DTt(serverName, config),
    ...(serverBaseUrl && {
      mcpServerBaseUrl: serverBaseUrl
    })
  });
}

/**
 * Case-insensitive "ends with" check.
 *
 * @param text - The string to test.
 * @param suffix - The candidate trailing substring.
 * @returns `true` if `text` ends with `suffix` ignoring case.
 */
function ala(text, suffix): boolean {
  return text.length >= suffix.length && text.slice(-suffix.length).toLowerCase() === suffix.toLowerCase();
}

/**
 * Strip a trailing `</param></invoke>` toolcall artifact from MCP argument
 * values, when the value otherwise ends with whitespace/markup that indicates
 * a model emission artifact rather than real content. Emits telemetry for each
 * candidate value describing whether it would (or did) get stripped.
 *
 * @param args - The raw argument record for the tool call.
 * @param toolName - The MCP tool name (for telemetry).
 * @param serverName - The MCP server name (for telemetry).
 * @param config - Context passed to `DTt` for name normalization/hashing.
 * @param stripEnabled - Whether stripping is actually applied (vs. dry-run).
 * @param serverBaseUrl - Optional server base URL (for telemetry).
 * @returns The (possibly cloned and) sanitized argument record.
 */
function cla(args, toolName, serverName, config, stripEnabled, serverBaseUrl) {
  let result = args;
  for (let [argName, argValue] of Object.entries(args)) {
    if (typeof argValue !== "string") continue;
    let lastIndex = argValue.length - 1;
    while (
      lastIndex >= 0 &&
      (argValue.charCodeAt(lastIndex) === 32 ||
        argValue.charCodeAt(lastIndex) === 9 ||
        argValue.charCodeAt(lastIndex) === 10 ||
        argValue.charCodeAt(lastIndex) === 13)
    )
      lastIndex--;
    if (lastIndex >= 0) {
      let lastCharCode = argValue.charCodeAt(lastIndex);
      if (lastCharCode >= 33 && lastCharCode <= 126 && lastCharCode !== 62) continue;
    }
    let trimmed = argValue.trimEnd();
    if (!ala(trimmed, ila)) continue;
    trimmed = trimmed.slice(0, -ila.length).trimEnd();
    let paramCloseTag = `</${argName}>`,
      hasParamClose = ala(trimmed, paramCloseTag);
    if (hasParamClose) trimmed = trimmed.slice(0, -paramCloseTag.length).trimEnd();
    let hasMatchingOpenTag = hasParamClose && new RegExp(`<${mk(argName)}[\\s>/]`, "i").test(argValue),
      missKind = !hasParamClose ? Ve("param_close") : hasMatchingOpenTag ? Ve("open_guard") : void 0;
    if (
      (W("tengu_mcp_arg_trailing_invoke_suffix", {
        wouldStrip: missKind === void 0,
        missKind: missKind,
        flagOn: stripEnabled,
        paramNameLen: argName.length,
        strippedToLen: trimmed.length,
        mcpToolName: DTt(toolName, config),
        mcpServerName: DTt(serverName, config),
        ...(serverBaseUrl && {
          mcpServerBaseUrl: serverBaseUrl
        })
      }),
      missKind !== void 0 || !stripEnabled)
    )
      continue;
    if (result === args)
      result = {
        ...args
      };
    (result[argName] = trimmed),
      ln(serverName, `stripped trailing </${argName}></invoke> from ${toolName}.${argName} (model emission artifact)`);
  }
  return result;
}
var ZXr,
  U7d,
  ila = "</invoke>";
var ula = b(() => {
  vn();
  lr();
  kt();
  (ZXr = ["<invoke>", "<invoke ", "<invoke\t", `<invoke
`, "</invoke>"]),
    (U7d = new Set([
      "address",
      "area",
      "article",
      "audio",
      "base",
      "body",
      "button",
      "cite",
      "code",
      "data",
      "details",
      "dialog",
      "figure",
      "footer",
      "form",
      "head",
      "header",
      "html",
      "image",
      "input",
      "label",
      "link",
      "main",
      "mark",
      "menu",
      "meta",
      "object",
      "option",
      "output",
      "path",
      "picture",
      "script",
      "section",
      "select",
      "slot",
      "source",
      "span",
      "style",
      "summary",
      "table",
      "template",
      "text",
      "time",
      "title",
      "video"
    ]));
});

export {$7d,lla,ala,cla,ZXr,U7d,ila,ula};
