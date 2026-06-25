// @ts-nocheck
import {ktc,wtc} from "./5519_SKILL_MD.ts";
import {Td,Cb} from "../../vendor/m5036.ts";
import {Ne} from "../../vendor/m583.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
/**
 * Lazily imports the Cowork-plugin skill payload module (skill markdown + file list).
 * Memoized via the module-level `i4m` promise cache so the dynamic import runs once.
 */
function Htc(): Promise<typeof wtc> {
  return i4m ??= Promise.resolve().then(() => (ktc(), wtc));
}

/**
 * Registers the "cowork-plugin" skill with the skill registry.
 * The skill is not user-invocable and only enabled for the remote_cowork entrypoint.
 */
function Itc(): void {
  Td({
    name: "cowork-plugin",
    description: a4m,
    userInvocable: !1,
    isEnabled: () => Ne.CLAUDE_CODE_ENTRYPOINT === "remote_cowork",
    files: () => Htc().then(e => e.SKILL_FILES),
    /**
     * Builds the prompt content blocks for this command, appending any user request text.
     * @param userRequest - optional trimmed user-supplied request to append under a header
     */
    async getPromptForCommand(userRequest?: string) {
      let {
          SKILL_MD: skillMarkdown
        } = await Htc(),
        promptParts: string[] = [skillMarkdown.trimStart()],
        trimmedRequest = userRequest?.trim();
      if (trimmedRequest) promptParts.push(`## User Request

${trimmedRequest}`);
      return [{
        type: "text",
        text: promptParts.join(`

`)
      }];
    }
  });
}

/** Cached promise for the lazily-imported Cowork-plugin skill payload module. */
var i4m: Promise<typeof wtc> | undefined,
  /** Skill description shown to the model, listing trigger phrases for plugin customization. */
  a4m = "Create a new Cowork plugin from scratch, or customize an installed plugin for a specific organization. Use when: customize plugin, set up plugin, configure plugin, tailor plugin, adjust plugin settings, customize plugin connectors, customize plugin skill, tweak plugin, modify plugin configuration, create a plugin, build a plugin, make a new plugin, develop a plugin, scaffold a plugin.";

/** Module init thunk: pulls in dependency modules and registers the skill. */
var xtc = b(() => {
  Ir();
  Cb();
});

export {Htc,Itc,i4m,a4m,xtc};
