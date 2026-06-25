// @ts-nocheck
import {rl,ri} from "./2235_userFacingName.ts";
import {goe,pd} from "../../vendor/m706.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Render a human-readable label for a tool-use entry.
 *
 * Looks up the tool definition by name, validates the recorded input against
 * the tool's input schema, then returns either the tool's user-facing name on
 * its own or a JSX node combining that name with a rendered argument summary
 * in the form `name(args)`. Falls back to the raw `toolName` whenever the tool
 * is unknown, has no user-facing name, or anything throws.
 *
 * @param toolUseEntry  The tool-use record, carrying `toolName` and `input`.
 * @param toolContext   Context passed to the tool registry lookup (`rl`).
 * @param theme         Theme used when rendering the tool-use message.
 */
function formatToolUseLabel(toolUseEntry: any, toolContext: any, theme: any): any {
  let toolDef = rl(toolContext, toolUseEntry.toolName);
  if (!toolDef) return toolUseEntry.toolName;
  try {
    let preRendered = goe(toolUseEntry.input),
      parsed = toolDef.inputSchema.safeParse(toolUseEntry.input),
      parsedInput = parsed.success ? parsed.data : {},
      userFacingName = toolDef.userFacingName(parsedInput);
    if (!userFacingName) return toolUseEntry.toolName;
    let argSummary = preRendered ?? toolDef.renderToolUseMessage(parsedInput, {
      theme: theme,
      verbose: !1
    });
    if (argSummary) return GIl.jsxs(v, {
      children: [userFacingName, "(", argSummary, ")"]
    });
    return userFacingName;
  } catch {
    return toolUseEntry.toolName;
  }
}
var GIl: any;
var TIo = b(() => {
  je();
  ri();
  pd();
  GIl = x(oe(), 1);
});

export {formatToolUseLabel as Pjn,GIl,TIo};
