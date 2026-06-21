// @ts-nocheck
import {je as oH} from "../../vendor/m577.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/**
 * Returns true when the session is running in remote hermetic mode.
 *
 * Hermetic mode means that only MCP servers explicitly declared in the user config
 * are permitted; project-scope and local-scope servers are filtered out.
 */
function zQ_(): boolean | undefined {
  return oH.CLAUDE_CODE_REMOTE && oH.CLAUDE_CODE_REMOTE_HERMETIC_MODE;
}

/** Lazy module initializer — depends on the env-vars namespace module (_q). */
var KLq = L(() => {
  _q();
});

export {zQ_ as hVt,KLq as h1o};
