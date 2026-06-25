// @ts-nocheck
import {ntc,ttc} from "./5513_SKILL_MD.ts";
import {Td,Cb} from "../../vendor/m5036.ts";
import {B9n} from "../../vendor/m3990.ts";
import {isArtifactToolEnabled as _ke,fae} from "./2715_isPublishToolEnabled.ts";
import {xf,HA} from "../../vendor/m2219.ts";
import {b} from "../../runtime.ts";
/**
 * Lazy module loader: resolve (and cache) the dynamically-imported skill module
 * that exports the Artifacts design-guidance markdown (SKILL_MD).
 */
function U3m() {
  return B3m ??= Promise.resolve().then(() => (ntc(), ttc));
}
/** Register the "Design guidance for Artifacts" command with its prompt and metadata. */
function rtc() {
  Td({
    name: B9n,
    menuDescription: "Design guidance for Artifacts",
    description: $3m,
    isEnabled: _ke,
    userInvocable: !0,
    async getPromptForCommand() {
      let {
        SKILL_MD: skillMd
      } = await U3m();
      return [{
        type: "text",
        text: xf(skillMd).content.trimStart()
      }];
    }
  });
}
/** Cached promise for the lazily-loaded skill module. */
var B3m,
  /** Command description shown for the Artifacts design-guidance command. */
  $3m = "Design guidance and fundamentals for Artifacts.";
/** Lazy initializer: pull in the dependency modules backing this command. */
var otc = b(() => {
  fae();
  HA();
  Cb();
});
export {U3m,rtc,B3m,$3m,otc};
