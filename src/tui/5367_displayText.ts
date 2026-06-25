// @ts-nocheck
import {pl,Wu} from "../../vendor/m438.ts";
import {bzl,Ezl} from "../../vendor/m5360.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {WGe,yer,iFo,lFo,aFo,cFo,Izl} from "../agent/5363_descriptionKey.ts";
import {Ci,fd} from "../../vendor/m2469.ts";
import {wu,$k} from "./2575_current.ts";
import {getCommandName as mu} from "../tools/4092_done.ts";
import {_t,gc,bo,uo} from "../../vendor/m2468.ts";
import {Iua,ReactRuntime as Ew} from "../tools/3238_name.ts";
import {QS,cvn,Q2} from "../../vendor/m2552.ts";
import {Eer,mFo,Wzl} from "../../vendor/m5365.ts";
import {globalFileIndexCache as eue,startBackgroundCacheRefresh as u8t,findLongestCommonPrefix as GCo,applyFileSuggestion as p8t,Oft} from "../telemetry/4503_startBackgroundCacheRefresh.ts";
import {useDebouncedCallback as u4} from "../../vendor/m2453.ts";
import {Uzl,ber,dFo} from "../../vendor/m5364.ts";
import {Pzl,uFo} from "../../vendor/m5363.ts";
import {isAgentSwarmsEnabled as Wa,lb} from "../config/3314_isAgentSwarmsEnabled.ts";
import {Dd,wB} from "../config/3893_wB.ts";
import {uvn,HMi,IMi,$5r} from "../../vendor/m2554.ts";
import {searchSessionsByCustomTitle as YY,getSessionIdFromLog as fh,_a} from "../permissions/5175_writeRemoteAgentMetadata.ts";
import {formatLogMetadata as b7e,Xo} from "../../vendor/m240.ts";
import {findCommand as hb,Mm} from "../tools/5174_toSlashCommands.ts";
import {Azl,Czl} from "../../vendor/m5361.ts";
import {ZZr,Ipa,XFt} from "../../vendor/m3267.ts";
import {mcpTools as eH,kee} from "../telemetry/3165_kee.ts";
import {b9a,mdt,fdt} from "../../vendor/m3990.ts";
import {mi,lr} from "../../vendor/m233.ts";
import {xhe,_g,zR} from "../../vendor/m2562.ts";
import {Oo,ss} from "../../vendor/m2553.ts";
import {React as Bk,qF} from "../../vendor/m2525.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Autocomplete / suggestion engine for the prompt input box.
 * Handles slash-commands, @-file paths, MCP resource templates, emoji,
 * shell completions, slack channels, agent DMs, and inline ghost-text.
 *
 * Ported from v2.1.185 (5330_displayText.ts); structure matches v2.1.190.
 */

/**
 * Returns true when `e[startPos..end]` is a `name:` style colon-token whose
 * surrounding text (with that token spliced out) equals `t`.
 */
function BNm(input: any, expected: any, end: any): boolean {
  if (expected === void 0) return !1;
  let lenDiff = input.length - expected.length,
    spliceStart = end - lenDiff;
  return lenDiff > 0 && spliceStart >= 0 && input.slice(0, spliceStart) + input.slice(end) === expected && /^[a-z0-9_+-]*:$/.test(input.slice(spliceStart, end));
}

/** Type guard: suggestion metadata describes a file or directory entry. */
function M7t(metadata: any): boolean {
  return typeof metadata === "object" && metadata !== null && "type" in metadata && (metadata.type === "directory" || metadata.type === "file");
}

/**
 * Re-resolves the selected suggestion index after the list changed, keeping the
 * previously selected item highlighted when it is still present.
 */
function ude(prevSuggestions: any, prevSelected: any, nextSuggestions: any): number {
  if (nextSuggestions.length === 0) return -1;
  if (prevSelected < 0) return 0;
  let prevItem = prevSuggestions[prevSelected];
  if (!prevItem) return 0;
  let idx = nextSuggestions.findIndex((item: any) => item.id === prevItem.id);
  return idx >= 0 ? idx : 0;
}

/** Builds the `/resume <id|title>` command string for a resume suggestion. */
function Vzl(suggestion: any): string {
  let meta = suggestion.metadata;
  return meta?.sessionId ? `/resume ${meta.sessionId}` : `/resume ${suggestion.displayText}`;
}

/** Extracts the bare path/word from a parsed token (strips `@`/quotes). */
function gFo(token: any): string {
  if (token.isQuoted) return token.token.slice(2).replace(/"$/, "");else if (token.token.startsWith("@")) return token.token.substring(1);else return token.token;
}

/** Formats a file-suggestion's display text into the text inserted into input. */
function _Fo(opts: any): string {
  let {
      displayText: text,
      mode,
      hasAtPrefix,
      needsQuotes,
      isQuoted,
      isComplete
    } = opts,
    trailing = isComplete ? " " : "";
  if (isQuoted || needsQuotes) return mode === "bash" ? `"${text}"${trailing}` : `@"${text}"${trailing}`;else if (hasAtPrefix) return mode === "bash" ? `${text}${trailing}` : `@${text}${trailing}`;else return text;
}

/** Inserts a shell/variable/command completion at the current word boundary. */
function yFo(suggestion: any, input: any, cursor: any, setInput: any, setCursor: any, completionType: any): void {
  let wordStart = input.slice(0, cursor).lastIndexOf(" ") + 1,
    insertion: any;
  if (completionType === "variable") insertion = "$" + suggestion.displayText + " ";else if (completionType === "command") insertion = suggestion.displayText + " ";else insertion = suggestion.displayText;
  let nextInput = input.slice(0, wordStart) + insertion + input.slice(cursor);
  setInput(nextInput), setCursor(wordStart + insertion.length);
}

/** Inserts an agent/slack/emoji suggestion at the position matched by `regex`. */
function ayt(suggestion: any, input: any, cursor: any, regex: any, setInput: any, setCursor: any): void {
  let match = input.slice(0, cursor).match(regex);
  if (!match || match.index === void 0) return;
  let insertAt = match.index + (match[1]?.length ?? 0),
    prefix = input.slice(0, insertAt),
    nextInput = prefix + suggestion.displayText + " " + input.slice(cursor);
  setInput(nextInput), setCursor(prefix.length + suggestion.displayText.length + 1);
}

/** Runs the bash shell completion request, aborting any in-flight request. */
async function UNm(input: any, cursor: any, sessionEnvVars: any): Promise<any[]> {
  if (pl()) return [];
  try {
    if (Aer) Aer.abort();
    return Aer = new AbortController(), await bzl(input, cursor, Aer.signal, sessionEnvVars);
  } catch {
    return W("tengu_shell_completion_failed", {}), [];
  }
}

/** Replaces an @-token in `input` with `@<path><sep>`, returning new input + cursor. */
function Kzl(input: any, path: any, startPos: any, tokenLen: any, isDirectory: any): { newInput: string; cursorPos: number } {
  let sep = isDirectory ? "/" : " ",
    before = input.slice(0, startPos),
    after = input.slice(startPos + tokenLen),
    inserted = "@" + path + sep;
  return {
    newInput: before + inserted + after,
    cursorPos: before.length + inserted.length
  };
}

/**
 * Parses the @-mention / file token under the cursor.
 * `withAt` enables `@`-prefixed (quoted or plain) token matching.
 */
function DSe(input: any, cursor: any, withAt: any = !1): any {
  if (!input) return null;
  let beforeCursor = input.substring(0, cursor);
  if (withAt) {
    let quotedRe = /@"([^"]*)"?$/,
      quotedMatch = beforeCursor.match(quotedRe);
    if (quotedMatch && quotedMatch.index !== void 0) {
      let afterMatch = input.substring(cursor).match(/^[^"]*"?/),
        afterText = afterMatch ? afterMatch[0] : "";
      return {
        token: quotedMatch[0] + afterText,
        startPos: quotedMatch.index,
        isQuoted: !0
      };
    }
  }
  if (withAt) {
    let atPos = beforeCursor.lastIndexOf("@");
    if (atPos >= 0 && (atPos === 0 || /[\s\u3002\u3001\uFF1F\uFF01]/.test(beforeCursor[atPos - 1]))) {
      let atSegment = beforeCursor.substring(atPos),
        atMatch = atSegment.match(ONm);
      if (atMatch && atMatch[0].length === atSegment.length) {
        let tailMatch = input.substring(cursor).match(Gzl),
          tail = tailMatch ? tailMatch[0] : "";
        return {
          token: atMatch[0] + tail,
          startPos: atPos,
          isQuoted: !1
        };
      }
    }
  }
  let wordRe = withAt ? LNm : MNm,
    wordMatch = beforeCursor.match(wordRe);
  if (!wordMatch || wordMatch.index === void 0) return null;
  let tailMatch = input.substring(cursor).match(Gzl),
    tail = tailMatch ? tailMatch[0] : "";
  return {
    token: wordMatch[0] + tail,
    startPos: wordMatch.index,
    isQuoted: !1
  };
}

/** Splits a slash-command string into `{ commandName, args }`, or null. */
function $Nm(input: any): { commandName: string; args: string } | null {
  if (WGe(input)) {
    let spaceIdx = input.indexOf(" ");
    if (spaceIdx === -1) return {
      commandName: input.slice(1),
      args: ""
    };
    return {
      commandName: input.slice(1, spaceIdx),
      args: input.slice(spaceIdx + 1)
    };
  }
  return null;
}

/** True when text has an arg (contains a space) that is not yet space-terminated. */
function zzl(hasTrailingSpace: any, text: any): boolean {
  return !hasTrailingSpace && text.includes(" ") && !text.endsWith(" ");
}

/** Main autocomplete hook driving the prompt input suggestion UI. */
function jzl({
  commands,
  onInputChange,
  onSubmit,
  setCursorOffset,
  input,
  cursorOffset,
  mode,
  agents,
  setSuggestionsState,
  suggestionsState: {
    suggestions,
    selectedSuggestion,
    hoveredSuggestionId,
    commandArgumentHint,
    suggestionsEmptyMessage
  },
  suppressSuggestions,
  markAccepted,
  onModeChange,
  sessionEnvVars
}: any): any {
  let {
      addNotification
    } = Ci(),
    thinkingToggleKey = wu("chat:thinkingToggle", "Chat", "alt+t"),
    [suggestionType, setSuggestionType] = Ef.useState("none"),
    hoveredIdRef = Ef.useRef(hoveredSuggestionId);
  hoveredIdRef.current = hoveredSuggestionId ?? null;
  let maxColumnWidth = Ef.useMemo(() => {
      let visible = commands.filter((cmd: any) => !cmd.isHidden);
      if (visible.length === 0) return;
      return Math.max(...visible.map((cmd: any) => mu(cmd).length)) + 6;
    }, [commands]),
    [maxColWidthState, setMaxColWidthState] = Ef.useState(void 0),
    mcpResources = _t((s: any) => s.mcp.resources),
    mcpResourceTemplates = _t((s: any) => s.mcp.resourceTemplates),
    store = gc(),
    updateStore = bo(),
    refreshResourceTemplates = Ef.useCallback(() => {
      let state = store.getState();
      Iua(state.mcp.clients, state.mcp.resourceTemplates).then((fetched: any) => {
        if (fetched.length === 0) return;
        let changed = !1;
        if (updateStore((draft: any) => {
          let templates = draft.mcp.resourceTemplates;
          for (let {
            client,
            templates: clientTemplates
          } of fetched) {
            if (client.name in templates || !draft.mcp.clients.some((c: any) => c.type === "connected" && c.client === client.client)) continue;
            templates = {
              ...templates,
              [client.name]: clientTemplates
            };
          }
          if (templates === draft.mcp.resourceTemplates) return draft;
          return changed = !0, {
            ...draft,
            mcp: {
              ...draft.mcp,
              resourceTemplates: templates
            }
          };
        }), changed && completionKindRef.current === "at") pendingQueryRef.current = null;
      });
    }, [store, updateStore]),
    promptSuggestion = _t((s: any) => s.promptSuggestion),
    viewingAgentTask = _t((s: any) => !!s.viewingAgentTaskId),
    keyHint = QS(),
    [bashGhostText, setBashGhostText] = Ef.useState(void 0),
    promptGhostText = Ef.useMemo(() => {
      if (mode !== "prompt" || suppressSuggestions) return;
      let parsed = yer(input, cursorOffset);
      if (!parsed) return;
      let completion = iFo(parsed.partialCommand, commands);
      if (!completion) return;
      return {
        text: completion.suffix,
        fullCommand: completion.fullCommand,
        insertPosition: parsed.startPos + 1 + parsed.partialCommand.length
      };
    }, [input, cursorOffset, mode, commands, suppressSuggestions]),
    inlineGhostText = suppressSuggestions ? void 0 : mode === "prompt" ? promptGhostText : bashGhostText,
    cursorOffsetRef = Ef.useRef(cursorOffset);
  cursorOffsetRef.current = cursorOffset;
  let pendingQueryRef = Ef.useRef(null),
    completionKindRef = Ef.useRef("file"),
    lastInputRef = Ef.useRef(""),
    atPathQueryRef = Ef.useRef(""),
    directorySourceRef = Ef.useRef("at-path"),
    bashQueryRef = Ef.useRef(""),
    slackQueryRef = Ef.useRef(""),
    suggestionsRef = Ef.useRef(suggestions);
  suggestionsRef.current = suggestions;
  let acceptedInputRef = Ef.useRef(null),
    clearSuggestions = Ef.useCallback(() => {
      setSuggestionsState(() => ({
        commandArgumentHint: void 0,
        suggestions: [],
        selectedSuggestion: -1
      })), setSuggestionType("none"), setMaxColWidthState(void 0), setBashGhostText(void 0);
    }, [setSuggestionsState]),
    runFileCompletion = Ef.useCallback(async (query: any, isAt: any = !1) => {
      pendingQueryRef.current = query, completionKindRef.current = isAt ? "at" : "file";
      let isRestricted = pl(),
        resourceResults = null,
        templates = isAt && !isRestricted ? store.getState().mcp.resourceTemplates : mcpResourceTemplates;
      if (isAt && !isRestricted) {
        if (refreshResourceTemplates(), resourceResults = await Eer(query, templates, store.getState().mcp.clients, "@"), pendingQueryRef.current !== query) return;
      }
      if (!resourceResults) resourceResults = await mFo(eue, query, isRestricted ? {} : mcpResources, isRestricted ? [] : agents, isAt, isRestricted ? {} : templates);
      if (pendingQueryRef.current !== query) return;
      if (resourceResults.length === 0) {
        setSuggestionsState(() => ({
          commandArgumentHint: void 0,
          suggestions: [],
          selectedSuggestion: -1
        })), setSuggestionType("none"), setMaxColWidthState(void 0);
        return;
      }
      setSuggestionsState((prev: any) => ({
        commandArgumentHint: void 0,
        suggestions: resourceResults,
        selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, resourceResults)
      })), setSuggestionType(resourceResults.length > 0 ? "file" : "none"), setMaxColWidthState(void 0);
    }, [mcpResources, mcpResourceTemplates, store, refreshResourceTemplates, setSuggestionsState, setSuggestionType, setMaxColWidthState, agents]);
  Ef.useEffect(() => {
    let immediate = setImmediate(() => {
        if (!pl()) u8t(eue);
      }),
      unsubscribe = eue.indexBuildComplete.subscribe(() => {
        let query = pendingQueryRef.current;
        if (query === null) return;
        let kind = completionKindRef.current;
        if (kind === "slash-template") return;
        pendingQueryRef.current = null, runFileCompletion(query, kind === "at");
      });
    return () => {
      clearImmediate(immediate), unsubscribe();
    };
  }, [runFileCompletion]);
  let debouncedFileCompletion = u4(runFileCompletion, 50),
    runSlackCompletion = Ef.useCallback(async (query: any) => {
      slackQueryRef.current = query;
      let results = await Uzl(store.getState().mcp.clients, query);
      if (slackQueryRef.current !== query) return;
      setSuggestionsState((prev: any) => ({
        commandArgumentHint: void 0,
        suggestions: results,
        selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, results)
      })), setSuggestionType(results.length > 0 ? "slack-channel" : "none"), setMaxColWidthState(void 0);
    }, [setSuggestionsState]),
    debouncedSlackCompletion = u4(runSlackCompletion, 150),
    runSlashTemplateCompletion = Ef.useCallback(async (query: any, scheme: any, template: any) => {
      pendingQueryRef.current = query, completionKindRef.current = "slash-template";
      let results = await Eer(query, {
        [scheme]: template
      }, store.getState().mcp.clients, "/");
      if (pendingQueryRef.current !== query) return;
      let list = results ?? [];
      setSuggestionsState(() => ({
        commandArgumentHint: void 0,
        suggestions: list,
        selectedSuggestion: list.length > 0 ? 0 : -1
      })), setSuggestionType(list.length > 0 ? "command" : "none"), setMaxColWidthState(void 0);
    }, [setSuggestionsState]),
    debouncedSlashTemplateCompletion = u4(runSlashTemplateCompletion, 150),
    updateSuggestions = Ef.useCallback(async (text: any, cursorArg: any, prevText: any) => {
      let cursor = cursorArg ?? cursorOffsetRef.current;
      if (suppressSuggestions) {
        debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
        return;
      }
      if (mode === "prompt") {
        let parsed = yer(text, cursor);
        if (parsed) {
          if (iFo(parsed.partialCommand, commands)) {
            setSuggestionsState(() => ({
              commandArgumentHint: void 0,
              suggestions: [],
              selectedSuggestion: -1
            })), setSuggestionType("none"), setMaxColWidthState(void 0);
            return;
          }
        }
      }
      if (mode === "bash" && text.trim()) {
        bashQueryRef.current = text;
        let bashGhost = await Pzl(text);
        if (bashQueryRef.current !== text) return;
        if (bashGhost) {
          setBashGhostText({
            text: bashGhost.suffix,
            fullCommand: bashGhost.fullCommand,
            insertPosition: text.length
          }), setSuggestionsState(() => ({
            commandArgumentHint: void 0,
            suggestions: [],
            selectedSuggestion: -1
          })), setSuggestionType("none"), setMaxColWidthState(void 0);
          return;
        } else setBashGhostText(void 0);
      }
      let agentMentionMatch = mode !== "bash" ? text.substring(0, cursor).match(Cer) : null;
      if (agentMentionMatch) {
        let prefix = (agentMentionMatch[2] ?? "").toLowerCase(),
          state = store.getState(),
          agentSuggestions = [],
          seenNames = new Set();
        if (Wa() && state.teamContext) for (let teammate of Object.values(state.teamContext.teammates ?? {})) {
          if (teammate.name === Dd) continue;
          if (!teammate.name.toLowerCase().startsWith(prefix)) continue;
          seenNames.add(teammate.name), agentSuggestions.push({
            id: `dm-${teammate.name}`,
            displayText: `@${teammate.name}`,
            description: "send message"
          });
        }
        for (let [agentName, taskId] of state.agentNameRegistry) {
          if (seenNames.has(agentName)) continue;
          if (!agentName.toLowerCase().startsWith(prefix)) continue;
          let status = state.tasks[taskId]?.status;
          agentSuggestions.push({
            id: `dm-${agentName}`,
            displayText: `@${agentName}`,
            description: status ? `send message \xB7 ${status}` : "send message"
          });
        }
        if (agentSuggestions.length > 0) {
          debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), setSuggestionsState((prev: any) => ({
            commandArgumentHint: void 0,
            suggestions: agentSuggestions,
            selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, agentSuggestions)
          })), setSuggestionType("agent"), setMaxColWidthState(void 0);
          return;
        }
      }
      if (mode === "prompt") {
        let slackMatch = text.substring(0, cursor).match(fFo);
        if (slackMatch && ber(store.getState().mcp.clients)) {
          debouncedSlackCompletion(slackMatch[2]);
          return;
        } else if (suggestionType === "slack-channel") debouncedSlackCompletion.cancel(), clearSuggestions();
      }
      if (L7t && mode === "prompt") {
        let beforeCursor = text.substring(0, cursor),
          emojiColonMatch = BNm(text, prevText, cursor) ? beforeCursor.match(FNm) : null;
        if (emojiColonMatch) {
          let emoji = L7t.getEmoji(emojiColonMatch[2]);
          if (emoji) {
            let insertAt = (emojiColonMatch.index ?? 0) + (emojiColonMatch[1]?.length ?? 0),
              nextInput = text.slice(0, insertAt) + emoji + text.slice(cursor);
            onInputChange(nextInput), setCursorOffset(insertAt + emoji.length), clearSuggestions();
            return;
          }
        }
        let emojiPrefixMatch = beforeCursor.match(hFo);
        if (emojiPrefixMatch) {
          let emojiSuggestions = L7t.getEmojiSuggestions(emojiPrefixMatch[2]);
          if (emojiSuggestions.length > 0) {
            setSuggestionsState((prev: any) => ({
              commandArgumentHint: void 0,
              suggestions: emojiSuggestions,
              selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, emojiSuggestions)
            })), setSuggestionType("emoji"), setMaxColWidthState(void 0);
            return;
          }
        }
        if (suggestionType === "emoji") clearSuggestions();
      }
      let atMentionMatch = text.substring(0, cursor).match(NNm),
        hasTrailingSpace = cursor === text.length && cursor > 0 && text.length > 0 && text[cursor - 1] === " ";
      if (mode === "prompt" && WGe(text) && cursor > 0) {
        let command = $Nm(text);
        if (command && command.commandName === "add-dir" && command.args) {
          let {
            args
          } = command;
          if (args.match(/\s+$/)) {
            debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
            return;
          }
          let dirResults = await uvn(args);
          if (dirResults.length > 0) {
            setSuggestionsState((prev: any) => ({
              suggestions: dirResults,
              selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, dirResults),
              commandArgumentHint: void 0
            })), directorySourceRef.current = "command-arg", setSuggestionType("directory");
            return;
          }
          debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
          return;
        }
        if (command && command.commandName === "resume" && command.args !== void 0 && command.args.trim().length > 0 && text.includes(" ")) {
          let {
              args
            } = command,
            resumeResults = (await YY(args, {
              limit: 10
            })).map((session: any) => {
              let sessionId = fh(session);
              return {
                id: `resume-title-${sessionId}`,
                displayText: session.customTitle ?? session.aiTitle,
                description: b7e(session),
                metadata: {
                  sessionId
                }
              };
            });
          if (resumeResults.length > 0) {
            setSuggestionsState((prev: any) => ({
              suggestions: resumeResults,
              selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, resumeResults),
              commandArgumentHint: void 0
            })), setSuggestionType("custom-title");
            return;
          }
          clearSuggestions();
          return;
        }
        if (command && text.includes(" ")) {
          let cmdDef = hb(command.commandName, commands);
          if (cmdDef?.getArgumentCompletions) {
            let argResults = await Azl(text, cmdDef.getArgumentCompletions);
            if (argResults.length > 0) {
              setSuggestionsState((prev: any) => ({
                suggestions: argResults,
                selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, argResults),
                commandArgumentHint: void 0
              })), setSuggestionType("command"), setMaxColWidthState(void 0);
              return;
            }
            debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
            return;
          }
        }
      }
      if (mode === "prompt" && WGe(text) && cursor > 0 && !zzl(hasTrailingSpace, text)) {
        let argHint = void 0;
        if (text.length > 1) {
          let spaceIdx = text.indexOf(" "),
            cmdName = spaceIdx === -1 ? text.slice(1) : text.slice(1, spaceIdx),
            hasArgs = spaceIdx !== -1 && text.slice(spaceIdx + 1).trim().length > 0,
            atSpace = spaceIdx !== -1 && text.length === spaceIdx + 1;
          if (spaceIdx !== -1) {
            let cmdDef = hb(cmdName, commands);
            if (cmdDef || hasArgs) {
              if (cmdDef?.argumentHint && atSpace) argHint = cmdDef.argumentHint;else if (cmdDef?.type === "prompt" && cmdDef.argNames?.length && text.endsWith(" ")) {
                let argsText = text.slice(spaceIdx + 1),
                  parsedArgs = ZZr(argsText);
                argHint = Ipa(cmdDef.argNames, parsedArgs);
              }
              setSuggestionsState(() => ({
                commandArgumentHint: argHint,
                suggestions: [],
                selectedSuggestion: -1
              })), setSuggestionType("none"), setMaxColWidthState(void 0);
              return;
            }
          }
        }
        if (eH()) {
          let afterSlash = text.slice(1),
            colonIdx = afterSlash.indexOf(":");
          if (colonIdx > 0 && afterSlash.slice(colonIdx + 1).includes("://")) {
            let scheme = afterSlash.slice(0, colonIdx),
              templates = b9a(commands, scheme);
            if (templates.length > 0) {
              if (pendingQueryRef.current === afterSlash) return;
              debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion(afterSlash, scheme, templates);
              return;
            }
          }
          debouncedSlashTemplateCompletion.cancel();
        }
        let commandSuggestions = lFo(text, commands),
          firstWord = mi(text.slice(1), " ");
        if (setSuggestionsState((prev: any) => ({
          commandArgumentHint: argHint,
          suggestions: commandSuggestions,
          selectedSuggestion: text === prevText ? ude(prev.suggestions, prev.selectedSuggestion, commandSuggestions) : commandSuggestions.length > 0 ? 0 : -1,
          suggestionsEmptyMessage: commandSuggestions.length === 0 && text.length > 1 && aFo(firstWord) ? `No commands match "${text}"` : void 0
        })), setSuggestionType("command"), commandSuggestions.length > 0) setMaxColWidthState(maxColumnWidth);
        return;
      }
      if (suggestionType === "command") debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();else if (WGe(text) && zzl(hasTrailingSpace, text)) setSuggestionsState((prev: any) => prev.commandArgumentHint ? {
        ...prev,
        commandArgumentHint: void 0
      } : prev);
      if (suggestionType === "custom-title") clearSuggestions();
      if (suggestionType === "agent" && suggestionsRef.current.some((s: any) => s.id?.startsWith("dm-"))) {
        if (!text.substring(0, cursor).match(Cer)) clearSuggestions();
      }
      if (atMentionMatch && mode !== "bash") {
        let token = DSe(text, cursor, !0);
        if (token && token.token.startsWith("@")) {
          let path = gFo(token);
          if (HMi(path)) {
            atPathQueryRef.current = path;
            let pathResults = await IMi(path, {
              maxResults: 10
            });
            if (atPathQueryRef.current !== path) return;
            if (pathResults.length > 0) {
              setSuggestionsState((prev: any) => ({
                suggestions: pathResults,
                selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, pathResults),
                commandArgumentHint: void 0
              })), directorySourceRef.current = "at-path", setSuggestionType("directory");
              return;
            }
          }
          if (pendingQueryRef.current === path) return;
          debouncedFileCompletion(path, !0);
          return;
        }
      }
      if (suggestionType === "file") {
        let token = DSe(text, cursor, !0);
        if (token) {
          let path = gFo(token);
          if (pendingQueryRef.current === path) return;
          debouncedFileCompletion(path, !1);
        } else debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
      }
      if (suggestionType === "shell") {
        let snapshot = suggestionsRef.current[0]?.metadata?.inputSnapshot;
        if (mode !== "bash" || text !== snapshot) debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
      }
    }, [suggestionType, commands, setSuggestionsState, clearSuggestions, runFileCompletion, debouncedFileCompletion, debouncedSlackCompletion, debouncedSlashTemplateCompletion, mode, suppressSuggestions, onInputChange, setCursorOffset, maxColumnWidth]);
  Ef.useEffect(() => {
    if (acceptedInputRef.current === input) return;
    let prevText = lastInputRef.current;
    if (prevText !== input) lastInputRef.current = input, pendingQueryRef.current = null;
    acceptedInputRef.current = null, updateSuggestions(input, void 0, prevText);
  }, [input, updateSuggestions]);
  let acceptSuggestion = Ef.useCallback(async () => {
      if (inlineGhostText) {
        if (mode === "bash") {
          onInputChange(inlineGhostText.fullCommand), setCursorOffset(inlineGhostText.fullCommand.length), setBashGhostText(void 0);
          return;
        }
        let parsed = yer(input, cursorOffset);
        if (parsed) {
          let before = input.slice(0, parsed.startPos),
            after = input.slice(parsed.startPos + parsed.token.length),
            nextInput = before + "/" + inlineGhostText.fullCommand + " " + after,
            nextCursor = parsed.startPos + 1 + inlineGhostText.fullCommand.length + 1;
          onInputChange(nextInput), setCursorOffset(nextCursor);
          return;
        }
      }
      if (suggestions.length > 0) {
        debouncedFileCompletion.cancel(), debouncedSlackCompletion.cancel(), debouncedSlashTemplateCompletion.cancel();
        let hoveredIdx = hoveredIdRef.current ? suggestions.findIndex((s: any) => s.id === hoveredIdRef.current) : -1,
          selIdx = hoveredIdx >= 0 ? hoveredIdx : selectedSuggestion === -1 ? 0 : selectedSuggestion,
          selected = suggestions[selIdx];
        if (suggestionType === "command" && selIdx < suggestions.length) {
          if (selected) {
            let result = cFo(selected, !1, commands, onInputChange, setCursorOffset, onSubmit);
            if (result?.reSuggest) updateSuggestions(result.newInput, result.newInput.length);else clearSuggestions();
          }
        } else if (suggestionType === "custom-title" && suggestions.length > 0) {
          if (selected) {
            let resumeCmd = Vzl(selected);
            onInputChange(resumeCmd), setCursorOffset(resumeCmd.length), clearSuggestions();
          }
        } else if (suggestionType === "directory" && suggestions.length > 0) {
          let selectedDir = suggestions[selIdx];
          if (selectedDir) {
            let nextInput: any;
            if (directorySourceRef.current === "command-arg") {
              let spaceIdx = input.indexOf(" "),
                prefix = input.slice(0, spaceIdx + 1),
                sep = M7t(selectedDir.metadata) && selectedDir.metadata.type === "directory" ? "/" : " ";
              if (nextInput = prefix + selectedDir.id + sep, onInputChange(nextInput), setCursorOffset(nextInput.length), M7t(selectedDir.metadata) && selectedDir.metadata.type === "directory") setSuggestionsState((prev: any) => ({
                ...prev,
                commandArgumentHint: void 0
              })), updateSuggestions(nextInput, nextInput.length);else clearSuggestions();
            } else {
              let token = DSe(input, cursorOffset, !0) ?? DSe(input, cursorOffset, !1);
              if (token) {
                let isDirectory = M7t(selectedDir.metadata) && selectedDir.metadata.type === "directory",
                  replaced = Kzl(input, selectedDir.id, token.startPos, token.token.length, isDirectory);
                if (nextInput = replaced.newInput, onInputChange(nextInput), setCursorOffset(replaced.cursorPos), isDirectory) setSuggestionsState((prev: any) => ({
                  ...prev,
                  commandArgumentHint: void 0
                })), updateSuggestions(nextInput, replaced.cursorPos);else clearSuggestions();
              } else clearSuggestions();
            }
          }
        } else if (suggestionType === "shell" && suggestions.length > 0) {
          let selectedShell = suggestions[selIdx];
          if (selectedShell) {
            let meta = selectedShell.metadata;
            yFo(selectedShell, input, cursorOffset, onInputChange, setCursorOffset, meta?.completionType), clearSuggestions();
          }
        } else if (suggestionType === "agent" && suggestions.length > 0 && suggestions[selIdx]?.id?.startsWith("dm-")) {
          let selectedAgent = suggestions[selIdx];
          if (selectedAgent) ayt(selectedAgent, input, cursorOffset, Cer, onInputChange, setCursorOffset), clearSuggestions();
        } else if (suggestionType === "slack-channel" && suggestions.length > 0) {
          let selectedSlack = suggestions[selIdx];
          if (selectedSlack) ayt(selectedSlack, input, cursorOffset, fFo, onInputChange, setCursorOffset), clearSuggestions();
        } else if (L7t && suggestionType === "emoji" && suggestions.length > 0) {
          let selectedEmoji = suggestions[selIdx];
          if (selectedEmoji) ayt(selectedEmoji, input, cursorOffset, hFo, onInputChange, setCursorOffset), clearSuggestions();
        } else if (suggestionType === "file" && suggestions.length > 0) {
          let token = DSe(input, cursorOffset, !0);
          if (!token) {
            clearSuggestions();
            return;
          }
          let commonPrefix = suggestions.some((s: any) => mdt(s.metadata) !== null) ? "" : GCo(suggestions),
            hasAtPrefix = token.token.startsWith("@"),
            tokenLen: any;
          if (token.isQuoted) tokenLen = token.token.slice(2).replace(/"$/, "").length;else if (hasAtPrefix) tokenLen = token.token.length - 1;else tokenLen = token.token.length;
          if (commonPrefix.length > tokenLen) {
            let inserted = _Fo({
              displayText: commonPrefix,
              mode,
              hasAtPrefix,
              needsQuotes: !1,
              isQuoted: token.isQuoted,
              isComplete: !1
            });
            p8t(inserted, input, token.token, token.startPos, onInputChange, setCursorOffset), updateSuggestions(input.replace(token.token, inserted), cursorOffset);
          } else if (selIdx < suggestions.length) {
            let selectedFile = suggestions[selIdx];
            if (selectedFile) {
              let replacement = mdt(selectedFile.metadata),
                inserted = replacement ? `${replacement.replacement}${replacement.partial ? "" : " "}` : _Fo({
                  displayText: selectedFile.displayText,
                  mode,
                  hasAtPrefix,
                  needsQuotes: selectedFile.displayText.includes(" "),
                  isQuoted: token.isQuoted,
                  isComplete: !0
                }),
                nextInput = p8t(inserted, input, token.token, token.startPos, onInputChange, setCursorOffset);
              if (replacement?.partial) updateSuggestions(nextInput, token.startPos + inserted.length);else clearSuggestions();
            }
          }
        }
      } else if (input.trim() !== "") {
        let kind: any, results: any;
        if (mode === "bash") {
          kind = "shell";
          let shellResults = await UNm(input, cursorOffset, sessionEnvVars);
          if (shellResults.length === 1) {
            let only = shellResults[0];
            if (only) {
              let meta = only.metadata;
              yFo(only, input, cursorOffset, onInputChange, setCursorOffset, meta?.completionType);
            }
            results = [];
          } else results = shellResults;
        } else {
          kind = "file";
          let token = DSe(input, cursorOffset, !0);
          if (token) {
            let isAt = token.token.startsWith("@"),
              path = gFo(token),
              isRestricted = pl();
            pendingQueryRef.current = path, completionKindRef.current = isAt ? "at" : "file";
            let templates = isAt && !isRestricted ? store.getState().mcp.resourceTemplates : mcpResourceTemplates,
              resourceResults = null;
            if (isAt && !isRestricted) {
              if (refreshResourceTemplates(), resourceResults = await Eer(path, templates, store.getState().mcp.clients, "@"), pendingQueryRef.current !== path) return;
            }
            if (results = resourceResults ?? (await mFo(eue, path, isRestricted ? {} : mcpResources, isRestricted ? [] : agents, isAt, isRestricted ? {} : templates)), pendingQueryRef.current !== path) return;
          } else results = [];
        }
        if (results.length > 0) setSuggestionsState((prev: any) => ({
          commandArgumentHint: void 0,
          suggestions: results,
          selectedSuggestion: ude(prev.suggestions, prev.selectedSuggestion, results)
        })), setSuggestionType(kind), setMaxColWidthState(void 0);
      }
    }, [suggestions, selectedSuggestion, input, suggestionType, commands, mode, onInputChange, setCursorOffset, onSubmit, clearSuggestions, cursorOffset, updateSuggestions, mcpResources, mcpResourceTemplates, store, refreshResourceTemplates, setSuggestionsState, agents, debouncedFileCompletion, debouncedSlackCompletion, debouncedSlashTemplateCompletion, inlineGhostText, sessionEnvVars]),
    submitSelected = Ef.useCallback((indexArg: any) => {
      let hoveredIdx = hoveredIdRef.current ? suggestions.findIndex((s: any) => s.id === hoveredIdRef.current) : -1,
        selIdx = indexArg ?? (hoveredIdx >= 0 ? hoveredIdx : selectedSuggestion);
      if (selIdx < 0 || suggestions.length === 0) return;
      let selected = suggestions[selIdx];
      if (suggestionType === "command" && selIdx < suggestions.length) {
        if (selected) {
          if (indexArg === void 0 && selected.id.startsWith(Czl) && /^\/\S+\s+$/.test(input)) {
            debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions(), onSubmit(input, !0);
            return;
          }
          let result = cFo(selected, indexArg === void 0, commands, onInputChange, setCursorOffset, onSubmit);
          if (debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), result?.reSuggest) updateSuggestions(result.newInput, result.newInput.length);else clearSuggestions();
        }
      } else if (suggestionType === "custom-title" && selIdx < suggestions.length) {
        if (selected) {
          let resumeCmd = Vzl(selected);
          onInputChange(resumeCmd), setCursorOffset(resumeCmd.length), onSubmit(resumeCmd, !0), debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
        }
      } else if (suggestionType === "shell" && selIdx < suggestions.length) {
        if (selected) {
          let meta = selected.metadata;
          yFo(selected, input, cursorOffset, onInputChange, setCursorOffset, meta?.completionType), debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
        }
      } else if (suggestionType === "agent" && selIdx < suggestions.length && selected?.id?.startsWith("dm-")) ayt(selected, input, cursorOffset, Cer, onInputChange, setCursorOffset), debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();else if (suggestionType === "slack-channel" && selIdx < suggestions.length) {
        if (selected) ayt(selected, input, cursorOffset, fFo, onInputChange, setCursorOffset), debouncedSlackCompletion.cancel(), clearSuggestions();
      } else if (L7t && suggestionType === "emoji" && selIdx < suggestions.length) {
        if (selected) ayt(selected, input, cursorOffset, hFo, onInputChange, setCursorOffset), clearSuggestions();
      } else if (suggestionType === "file" && selIdx < suggestions.length) {
        let token = DSe(input, cursorOffset, !0);
        if (token) {
          if (selected) {
            let replacement = mdt(selected.metadata),
              hasAtPrefix = token.token.startsWith("@"),
              inserted = replacement ? `${replacement.replacement}${replacement.partial ? "" : " "}` : _Fo({
                displayText: selected.displayText,
                mode,
                hasAtPrefix,
                needsQuotes: selected.displayText.includes(" "),
                isQuoted: token.isQuoted,
                isComplete: !0
              }),
              nextInput = p8t(inserted, input, token.token, token.startPos, onInputChange, setCursorOffset);
            if (debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), replacement?.partial) updateSuggestions(nextInput, token.startPos + inserted.length);else clearSuggestions();
          }
        }
      } else if (suggestionType === "directory" && selIdx < suggestions.length) {
        if (selected) {
          if (directorySourceRef.current === "command-arg") {
            if (debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), indexArg !== void 0) {
              let spaceIdx = input.indexOf(" "),
                prefix = input.slice(0, spaceIdx + 1),
                isDirectory = M7t(selected.metadata) && selected.metadata.type === "directory",
                nextInput = prefix + selected.id + (isDirectory ? "/" : " ");
              if (onInputChange(nextInput), setCursorOffset(nextInput.length), isDirectory) updateSuggestions(nextInput, nextInput.length);else clearSuggestions();
              return;
            }
            clearSuggestions(), onSubmit(input, !0);
            return;
          }
          let token = DSe(input, cursorOffset, !0) ?? DSe(input, cursorOffset, !1);
          if (token) {
            let isDirectory = M7t(selected.metadata) && selected.metadata.type === "directory",
              replaced = Kzl(input, selected.id, token.startPos, token.token.length, isDirectory);
            onInputChange(replaced.newInput), setCursorOffset(replaced.cursorPos);
          }
          debouncedFileCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions();
        }
      }
    }, [suggestions, selectedSuggestion, suggestionType, commands, input, cursorOffset, mode, onInputChange, setCursorOffset, onSubmit, clearSuggestions, debouncedFileCompletion, debouncedSlackCompletion, debouncedSlashTemplateCompletion, updateSuggestions]),
    onAccept = Ef.useCallback(() => {
      acceptSuggestion();
    }, [acceptSuggestion]),
    onDismiss = Ef.useCallback(() => {
      debouncedFileCompletion.cancel(), debouncedSlackCompletion.cancel(), debouncedSlashTemplateCompletion.cancel(), clearSuggestions(), acceptedInputRef.current = input;
    }, [debouncedFileCompletion, debouncedSlackCompletion, debouncedSlashTemplateCompletion, clearSuggestions, input]),
    onPrevious = Ef.useCallback(() => {
      setSuggestionsState((prev: any) => ({
        ...prev,
        hoveredSuggestionId: null,
        selectedSuggestion: prev.selectedSuggestion <= 0 ? suggestions.length - 1 : prev.selectedSuggestion - 1
      }));
    }, [suggestions.length, setSuggestionsState]),
    onNext = Ef.useCallback(() => {
      setSuggestionsState((prev: any) => ({
        ...prev,
        hoveredSuggestionId: null,
        selectedSuggestion: prev.selectedSuggestion >= suggestions.length - 1 ? 0 : prev.selectedSuggestion + 1
      }));
    }, [suggestions.length, setSuggestionsState]),
    setHovered = Ef.useCallback((id: any) => {
      setSuggestionsState((prev: any) => prev.hoveredSuggestionId === id ? prev : {
        ...prev,
        hoveredSuggestionId: id
      });
    }, [setSuggestionsState]),
    submitSelectedRef = Ef.useRef(submitSelected);
  submitSelectedRef.current = submitSelected;
  let selectSuggestion = Ef.useCallback((index: any) => submitSelectedRef.current(index), []),
    keyBindings = Ef.useMemo(() => ({
      "autocomplete:accept": onAccept,
      "autocomplete:dismiss": onDismiss,
      "autocomplete:previous": onPrevious,
      "autocomplete:next": onNext
    }), [onAccept, onDismiss, onPrevious, onNext]),
    isActive = suggestions.length > 0 || !!inlineGhostText,
    isPasting = xhe();
  _g("autocomplete", isActive), cvn("Autocomplete", isActive), Oo(keyBindings, {
    context: "Autocomplete",
    isActive: isActive && !isPasting
  });
  /** Applies a ghost-text suggestion, switching modes if the text changes it. */
  function applyGhostText(text: any): void {
    let nextMode = Bk(text);
    if (nextMode !== "prompt") {
      onModeChange(nextMode);
      let stripped = qF(text);
      onInputChange(stripped), setCursorOffset(stripped.length);
    } else onInputChange(text), setCursorOffset(text.length);
  }
  return {
    suggestions,
    selectedSuggestion,
    suggestionType,
    maxColumnWidth: maxColWidthState,
    commandArgumentHint,
    suggestionsEmptyMessage,
    inlineGhostText,
    handleKeyDown: (key: any) => {
      if (key.name === "right" && !viewingAgentTask) {
        let {
          text,
          shownAt
        } = promptSuggestion;
        if (text && shownAt > 0 && input === "") {
          markAccepted(), applyGhostText(text), key.preventDefault(), key.stopImmediatePropagation();
          return;
        }
      }
      if (key.name === "tab" && !key.shift) {
        if (suggestions.length > 0 || inlineGhostText) return;
        let {
          text,
          shownAt
        } = promptSuggestion;
        if (text && shownAt > 0 && input === "" && !viewingAgentTask) {
          key.preventDefault(), markAccepted(), applyGhostText(text);
          return;
        }
        if (input.trim() === "") key.preventDefault(), addNotification({
          key: "thinking-toggle-hint",
          kind: "hint",
          jsx: Yzl.jsxs(v, {
            dimColor: !0,
            children: ["Use ", thinkingToggleKey, " to toggle thinking"]
          }),
          priority: "immediate",
          timeoutMs: 3000
        });
        return;
      }
      if (suggestions.length === 0) return;
      let hasPendingChord = keyHint?.pendingChord != null;
      if (key.ctrl && key.key === "n" && !hasPendingChord) {
        key.preventDefault(), onNext();
        return;
      }
      if (key.ctrl && key.key === "p" && !hasPendingChord) {
        key.preventDefault(), onPrevious();
        return;
      }
      if (key.name === "return" && !key.shift && !key.meta) key.preventDefault(), submitSelected();
    },
    selectSuggestion,
    setHoveredSuggestion: setHovered,
    hoveredSuggestionId: hoveredSuggestionId ?? null
  };
}
var Ef,
  Yzl,
  ONm,
  Gzl,
  LNm,
  MNm,
  NNm,
  fFo,
  hFo,
  FNm,
  L7t = null,
  Cer,
  Aer = null;
var Jzl = b(() => {
  fd();
  je();
  kt();
  Mm();
  zR();
  je();
  Q2();
  ss();
  $k();
  Wu();
  Ew();
  kee();
  fdt();
  uo();
  lb();
  XFt();
  Ezl();
  Xo();
  _a();
  lr();
  Izl();
  $5r();
  uFo();
  dFo();
  wB();
  Oft();
  Wzl();
  Ef = x(et(), 1), Yzl = x(oe(), 1), ONm = /^@[\p{L}\p{N}\p{M}_\-./\\()[\]~:]*/u, Gzl = /^[\p{L}\p{N}\p{M}_\-./\\()[\]~:]+/u, LNm = /(@[\p{L}\p{N}\p{M}_\-./\\()[\]~:]*|[\p{L}\p{N}\p{M}_\-./\\()[\]~:]+)$/u, MNm = /[\p{L}\p{N}\p{M}_\-./\\()[\]~:]+$/u, NNm = /(^|[\s\u3002\u3001\uFF1F\uFF01])@([\p{L}\p{N}\p{M}_\-./\\()[\]~:]*|"[^"]*"?)$/u, fFo = /(^|\s)#([a-z0-9][a-z0-9_-]*)$/, hFo = /(^|\s):([a-z0-9_+-]{2,})$/, FNm = /(^|\s):([a-z0-9_+-]+):$/;
  Cer = /(^|[\s\u3002\u3001\uFF1F\uFF01])@([\w-]*)$/;
});

export {BNm,M7t,ude,Vzl,gFo,_Fo,yFo,ayt,UNm,Kzl,DSe,$Nm,zzl,jzl,Ef,Yzl,ONm,Gzl,LNm,MNm,NNm,fFo,hFo,FNm,L7t,Cer,Aer,Jzl};
