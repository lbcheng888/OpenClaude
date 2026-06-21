// @ts-nocheck
import {eN as mv,oA as O$} from "../config/2697_oA.ts";
import {b as L} from "../../runtime.ts";
/**
 * Utilities for extracting bash command strings and hostnames from
 * assistant-turn tool_use messages in a conversation transcript.
 *
 * Used by the TUI help-menu to build auto-complete suggestions for
 * bash executables and remote hosts encountered during a session.
 */

/** Yields the raw `command` string from every Bash/PowerShell tool_use block in `messages`. */
function* iterBashCommands(messages: unknown[]): Generator<string> {
  for (let message of messages) if ((message as any).type === "assistant" && Array.isArray((message as any).message.content)) {
    for (let contentBlock of (message as any).message.content) if (contentBlock.type === "tool_use" && mv.includes(contentBlock.name)) {
      let {
        input: toolInput
      } = contentBlock;
      if (typeof toolInput === "object" && toolInput !== null && "command" in toolInput && typeof (toolInput as any).command === "string") yield (toolInput as any).command;
    }
  }
}

/** Collects the set of distinct executables used in Bash/PowerShell tool calls across `messages`. */
function collectBashTools(messages: unknown[]): Set<string> {
  let result = new Set<string>();
  for (let command of iterBashCommands(messages)) {
    let executable = getCommandExecutable(command);
    if (executable) result.add(executable);
  }
  return result;
}

/** Extracts all hostnames referenced via HTTP/HTTPS URLs in a shell command string. */
function extractHostnames(command: string | undefined | null): string[] {
  if (!command) return [];
  let hostnames: string[] = [],
    match: RegExpExecArray | null;
  urlRegex.lastIndex = 0;
  while ((match = urlRegex.exec(command)) !== null) {
    let host = match[1].toLowerCase(),
      atIndex = host.lastIndexOf("@");
    if (atIndex !== -1) host = host.slice(atIndex + 1);
    let colonIndex = host.indexOf(":");
    if (colonIndex !== -1) host = host.slice(0, colonIndex);
    if (host) hostnames.push(host);
  }
  return hostnames;
}

/** Collects the set of distinct hostnames accessed via HTTP/HTTPS in Bash/PowerShell tool calls across `messages`. */
function collectBashHosts(messages: unknown[]): Set<string> {
  let result = new Set<string>();
  for (let command of iterBashCommands(messages)) for (let hostname of extractHostnames(command)) result.add(hostname);
  return result;
}

/**
 * Returns the effective executable name from a shell command string.
 * Skips leading environment variable assignments (e.g. `FOO=bar`) and
 * known transparent prefixes like `sudo`.
 */
function getCommandExecutable(command: string | undefined | null): string | undefined {
  if (!command) return;
  let tokens = command.trim().split(/\s+/);
  for (let token of tokens) {
    if (/^[A-Za-z_]\w*=/.test(token)) continue;
    if (commandPrefixSkipSet.has(token)) continue;
    return token;
  }
  return;
}

var urlRegex: RegExp, commandPrefixSkipSet: Set<string>;
var initBashCommandExtractors = L(() => {
  O$();
  urlRegex = /https?:\/\/([^\s/?#'"`<>\\)\];&|(,]+)/gi;
  commandPrefixSkipSet = new Set(["sudo"]);
});

export {iterBashCommands as iml,collectBashTools as ejt,extractHostnames as tYp,collectBashHosts as tjt,getCommandExecutable as rYp,urlRegex as sml,commandPrefixSkipSet as nYp,initBashCommandExtractors as NSo};
