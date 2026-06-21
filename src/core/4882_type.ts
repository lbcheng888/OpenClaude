// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {rd as i5,isPolicyAllowed as Y7} from "../../vendor/m2205.ts";
import {Ao as Mq,isClaudeAISubscriber as Lq} from "../config/2031_withOAuthRefreshLock.ts";
import {VEl as aA4,GEl as oA4} from "../../vendor/m4880.ts";
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

export {teleportCommandDef as xsm,teleportCommand as KEl,initTeleportCommand as zEl};
