// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Bu as i5,isPolicyAllowed as Y7} from "../../vendor/m2213.ts";
import {lo as Mq,isClaudeAISubscriber as Lq} from "../config/2036_withOAuthRefreshLock.ts";
import {txl as aA4,exl as oA4} from "../../vendor/m4910.ts";
/** Definition of the "teleport" slash command for resuming a claude.ai session locally. */
var teleportCommandDef: {
    type: string;
    name: string;
    description: string;
    aliases: string[];
    isEnabled: () => boolean;
    readonly isHidden: boolean;
    load: () => Promise<unknown>;
  }, teleportCommand: typeof teleportCommandDef;

/** Lazy initializer for the teleport command module. */
var initTeleportCommand = L(() => {
  i5();
  Mq();
  teleportCommandDef = {
    type: "local-jsx",
    name: "teleport",
    description: "Resume a Claude Code session from claude.ai",
    aliases: ["tp"],
    /** Enabled only when the account is first-party and the org allows remote sessions. */
    isEnabled: () => Lq() && Y7("allow_remote_sessions"),
    get isHidden() {
      return !Lq() || !Y7("allow_remote_sessions");
    },
    /** Dynamically imports the teleport JSX component. */
    load: () => Promise.resolve().then(() => (aA4(), oA4))
  }, teleportCommand = teleportCommandDef;
});
export {teleportCommandDef as Ufm,teleportCommand as nxl,initTeleportCommand as rxl};
