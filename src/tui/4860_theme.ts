// @ts-nocheck
import {Cl,Ri} from "../tools/2227_userFacingName.ts";
import {_oe,Pd} from "../../vendor/m701.ts";
import {Text} from "../../vendor/m2423.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Te} from "../../vendor/m2253.ts";
/** Renders a tool-use block's label, optionally including its input summary. */
function GGn(e, t, n) {
  let toolDef = Cl(t, e.toolName);
  if (!toolDef) return e.toolName;
  try {
    let parsedInput = _oe(e.input),
      parseResult = toolDef.inputSchema.safeParse(e.input),
      inputData = parseResult.success ? parseResult.data : {},
      displayName = toolDef.userFacingName(inputData);
    if (!displayName) return e.toolName;
    let inputLabel = parsedInput ?? toolDef.renderToolUseMessage(inputData, {
      theme: n,
      verbose: !1
    });
    if (inputLabel) return Fbl.default.createElement(Text, null, displayName, "(", inputLabel, ")");
    return displayName;
  } catch {
    return e.toolName;
  }
}
var Fbl;
var ovo = b(() => {
  ze();
  Ri();
  Pd();
  Fbl = M(Te(), 1);
});
export {GGn,Fbl,ovo};
