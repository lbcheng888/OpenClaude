// @ts-nocheck
import {ap as JT,BE as QP} from "../../vendor/m5006.ts";
import {je as oH} from "../../vendor/m577.ts";
import {j7l as dB4,q7l as cB4,W7l as lB4} from "../mcp/5484_references_component_schemas_md.ts";
import {b as L} from "../../runtime.ts";
import {Lr as _q} from "../../vendor/m578.ts";
/*
 * config/5445_name.ts - Configuration and daemon-control restoration.
 *
 * 1:1 restoration notes:
 * - Cross-module bundle symbols, property names, literals, and exported names are preserved.
 * - Type annotations and comments are compile-time only; runtime logic is unchanged.
 * - Short internal names are retained where local usage does not verify a safer semantic name.
 */
// FIXME: unverified name
function nB4(): any {
  JT({
    name: "cowork-plugin",
    description: TWT,
    userInvocable: !1,
    isEnabled: (): any => oH.CLAUDE_CODE_ENTRYPOINT === "remote_cowork",
    files: dB4,
    async getPromptForCommand(H: any): Promise<any> {
      let _ = [cB4.trimStart()],
        q = H?.trim();
      if (q) _.push(`## User Request

${q}`);
      return [{
        type: "text",
        text: _.join(`

`)
      }];
    }
  });
}
var TWT = "Create a new Cowork plugin from scratch, or customize an installed plugin for a specific organization. Use when: customize plugin, set up plugin, configure plugin, tailor plugin, adjust plugin settings, customize plugin connectors, customize plugin skill, tweak plugin, modify plugin configuration, create a plugin, build a plugin, make a new plugin, develop a plugin, scaffold a plugin.";
var iB4 = L((): any => {
  _q();
  QP();
  lB4();
});
export {nB4 as G7l,TWT as KMm,iB4 as V7l};
