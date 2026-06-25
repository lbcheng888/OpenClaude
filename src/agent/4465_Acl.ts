// @ts-nocheck
import {b as L} from "../../runtime.ts";
/**
 * Agent plugin settings keys — the subset of global config fields that
 * belong to the agent/subagent subsystem.  Consumed by the plugin-loader
 * (4413_resolvePluginRoot) to build a Zod `.pick()` schema that retains
 * only these two keys from the full global config shape.
 */

/** Global config key names for the agent/subagent plugin settings slice. */
var erK: string[];

/** Lazy module initializer — populates {@link erK}. */
var HoK = L(() => {
  erK = ["agent", "subagentStatusLine"];
});
export {erK as Ccl,HoK as Acl};
