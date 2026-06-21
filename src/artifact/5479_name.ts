// @ts-nocheck
import {ap,BE} from "../../vendor/m5006.ts";
import {aUn} from "../../vendor/m3923.ts";
import {isArtifactToolEnabled,gae} from "./2703_isPublishToolEnabled.ts";
import {A7l,h7l,f7l} from "../../vendor/m5477.ts";
import {b} from "../../runtime.ts";
import {Ev,RA} from "../../vendor/m2211.ts";
/** Register the "Design guidance for Artifact pages" command with its prompt and metadata. */
function _7l() {
  ap({
    name: aUn,
    menuDescription: "Design guidance for Artifact pages",
    description: HMm,
    isEnabled: isArtifactToolEnabled,
    userInvocable: !0,
    files: A7l,
    async getPromptForCommand() {
      return [{
        type: "text",
        text: kMm.trimStart()
      }];
    }
  });
}
var g7l, kMm, HMm;
/** Lazy initializer: parse the markdown file via RA, extract frontmatter and content, derive description string. */
var y7l = b(() => {
  gae();
  Ev();
  BE();
  h7l();
  ({
    frontmatter: g7l,
    content: kMm
  } = RA(f7l)), HMm = typeof g7l.description === "string" ? g7l.description : "Design guidance for Artifact pages \u2014 process, principles, palette, copy.";
});
export {_7l,g7l,kMm,HMm,y7l};
