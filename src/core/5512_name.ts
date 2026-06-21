// @ts-nocheck
import {ap as JT,BE as QP} from "../../vendor/m5006.ts";
import {pdt as yI6,d4n as oKq} from "../telemetry/4284_d4n.ts";
import {HKl as vU4,IKl as EU4,kKl as yU4} from "../../vendor/m5510.ts";
import {b as L} from "../../runtime.ts";
import {Ev as jP,RA as NY} from "../../vendor/m2211.ts";
/**
 * Registers the `/design-sync` slash command, which lets Claude push React
 * design-system components to claude.ai/design.
 *
 * Cross-module references (JT, NY, yU4, vU4, EU4, oKq, jP, QP, yI6) are
 * kept as-is to preserve bundle linkage.
 */

/** Registers the `/design-sync` slash command with the CLI. */
function registerDesignSyncSlashCommand() {
  JT({
    name: "design-sync",
    menuDescription: "Push your design system components to claude.ai/design",
    description: designSyncDescription,
    isEnabled: yI6,
    argumentHint: '[<project hint, e.g. "Acme DS">]',
    disableModelInvocation: !0,
    userInvocable: !0,
    files: vU4,
    async getPromptForCommand(hint: string | undefined) {
      let parts = [designSyncContent.trimStart()];
      if (hint?.trim()) parts.push(`## Hint

\`\`\`
${hint.trim()}
\`\`\``);
      return [{
        type: "text",
        text: parts.join(`

`)
      }];
    }
  });
}

var designSyncFrontmatter: { description?: string; [key: string]: unknown },
    designSyncContent: string,
    designSyncDescription: string;

/** Lazy initialiser: parses the skill's SKILL.md frontmatter and content. */
var initDesignSyncCommand = L(() => {
  oKq();
  jP();
  QP();
  EU4();
  ({
    frontmatter: designSyncFrontmatter,
    content: designSyncContent
  } = NY(yU4)), designSyncDescription = typeof designSyncFrontmatter.description === "string" ? designSyncFrontmatter.description : "Push a React design system to claude.ai/design.";
});

export {registerDesignSyncSlashCommand as PKl,designSyncFrontmatter as DKl,designSyncContent as z1m,designSyncDescription as Y1m,initDesignSyncCommand as OKl};
