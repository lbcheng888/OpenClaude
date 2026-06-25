// @ts-nocheck
import {hnc,fnc} from "../../vendor/m5545.ts";
import {Td,Cb} from "../../vendor/m5036.ts";
import {pmt,T5n} from "../telemetry/4302_T5n.ts";
import {xf,HA} from "../../vendor/m2219.ts";
import {b} from "../../runtime.ts";
/**
 * Lazily loads the design-sync skill bundle (SKILL_FILES, SKILL_MD).
 * Caches the load promise so the dynamic import runs at most once.
 */
function loadDesignSyncSkillBundle(): Promise<typeof fnc> {
  return uqm ??= Promise.resolve().then(() => (hnc(), fnc));
}

/**
 * Registers the `/design-sync` slash command, which pushes a React design
 * system to claude.ai/design via the bundled converter.
 */
function registerDesignSyncCommand(): void {
  Td({
    name: "design-sync",
    menuDescription: "Push your design system components to claude.ai/design",
    description: dqm,
    isEnabled: pmt,
    argumentHint: '[<project hint, e.g. "Acme DS">]',
    disableModelInvocation: !0,
    userInvocable: !0,
    files: () => loadDesignSyncSkillBundle().then((bundle) => bundle.SKILL_FILES),
    async getPromptForCommand(commandArgument: string | undefined) {
      let {
          SKILL_MD: skillMarkdown
        } = await loadDesignSyncSkillBundle(),
        /** Prompt segments: skill body first, optional hint block appended. */
        promptSegments = [xf(skillMarkdown).content.trimStart()];
      if (commandArgument?.trim()) promptSegments.push(`## Hint

\`\`\`
${commandArgument.trim()}
\`\`\``);
      return [{
        type: "text",
        text: promptSegments.join(`

`)
      }];
    }
  });
}

var uqm: Promise<typeof fnc> | undefined,
  /** Long-form description shown for the design-sync command. */
  dqm = 'Push a React design system to claude.ai/design. This runs a converter that bundles the real component code (from Storybook or a bare package) and uploads it. Use when the user runs /design-sync or says "sync my design system to Claude Design".';
var ync = b(() => {
  T5n();
  HA();
  Cb();
});

export {loadDesignSyncSkillBundle as gnc,registerDesignSyncCommand as _nc,uqm,dqm,ync};
