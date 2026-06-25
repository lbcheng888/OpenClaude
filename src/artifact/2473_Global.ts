// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
function Pwi(contextName: any) {
  return Uld.has(contextName);
}
var zZe, Uld, Owi, G$r, $ld, hph;
var ibn = b(() => {
  Xr();
  zZe = ["Global", "Chat", "Autocomplete", "Confirmation", "Help", "Transcript", "HistorySearch", "Task", "ThemePicker", "Settings", "Tabs", "Attachments", "Footer", "MessageSelector", "DiffDialog", "ModelPicker", "Select", "Plugin", "Scroll", "Doctor"], Uld = new Set(zZe);
  Owi = {
    Global: "Active everywhere, regardless of focus",
    Chat: "When the chat input is focused",
    Autocomplete: "When autocomplete menu is visible",
    Confirmation: "When a confirmation/permission dialog is shown",
    Help: "When the help overlay is open",
    Transcript: "When viewing the transcript",
    HistorySearch: "When searching command history (ctrl+r)",
    Task: "When a task/agent is running in the foreground",
    ThemePicker: "When the theme picker is open",
    Settings: "When the settings menu is open",
    Tabs: "When tab navigation is active",
    Attachments: "When navigating image attachments in a select dialog",
    Footer: "When footer indicators are focused",
    MessageSelector: "When the message selector (rewind) is open",
    DiffDialog: "When the diff dialog is open",
    ModelPicker: "When the model picker is open",
    Select: "When a select/list component is focused",
    Plugin: "When the plugin dialog is open",
    Scroll: "When a scrollable view is focused (fullscreen layout)",
    Doctor: "When the /doctor diagnostics screen is open"
  }, G$r = ["app:interrupt", "app:exit", "app:toggleTodos", "app:toggleTranscript", "app:toggleBrief", "app:toggleReplTab", "app:toggleTerminal", "app:redraw", "app:openArtifact", "history:search", "history:previous", "history:next", "chat:cancel", "chat:killAgents", "chat:cycleMode", "chat:modelPicker", "chat:fastMode", "chat:thinkingToggle", "chat:workflowKeywordToggle", "chat:submit", "chat:newline", "chat:undo", "chat:externalEditor", "chat:stash", "chat:imagePaste", "chat:clearInput", "chat:clearScreen", "autocomplete:accept", "autocomplete:dismiss", "autocomplete:previous", "autocomplete:next", "confirm:yes", "confirm:no", "confirm:previous", "confirm:next", "confirm:nextField", "confirm:previousField", "confirm:cycleMode", "confirm:toggle", "confirm:toggleExplanation", "tabs:next", "tabs:previous", "transcript:toggleShowAll", "transcript:exit", "historySearch:next", "historySearch:accept", "historySearch:cancel", "historySearch:execute", "historySearch:cycleScope", "task:background", "theme:toggleSyntaxHighlighting", "theme:editCustom", "help:dismiss", "attachments:next", "attachments:previous", "attachments:remove", "attachments:exit", "footer:up", "footer:down", "footer:next", "footer:previous", "footer:openSelected", "footer:clearSelection", "footer:close", "messageSelector:up", "messageSelector:down", "messageSelector:top", "messageSelector:bottom", "messageSelector:select", "diff:dismiss", "diff:previousSource", "diff:nextSource", "diff:back", "diff:viewDetails", "diff:previousFile", "diff:nextFile", "modelPicker:decreaseEffort", "modelPicker:increaseEffort", "modelPicker:thisSessionOnly", "select:next", "select:previous", "select:pageUp", "select:pageDown", "select:first", "select:last", "select:accept", "select:cancel", "plugin:toggle", "plugin:install", "plugin:favorite", "doctor:fix", "permission:toggleDebug", "settings:search", "settings:retry", "settings:periodDay", "settings:periodWeek", "settings:sortByTokens", "voice:pushToTalk", "scroll:pageUp", "scroll:pageDown", "scroll:lineUp", "scroll:lineDown", "scroll:top", "scroll:bottom", "scroll:halfPageUp", "scroll:halfPageDown", "scroll:fullPageUp", "scroll:fullPageDown", "selection:copy", "selection:clear", "selection:extendLeft", "selection:extendRight", "selection:extendUp", "selection:extendDown", "selection:extendLineStart", "selection:extendLineEnd"], $ld = we(() => E.object({
    context: E.enum(zZe).describe("UI context where these bindings apply. Global bindings work everywhere."),
    bindings: E.record(E.string().describe('Keystroke pattern (e.g., "ctrl+k", "shift+tab")'), E.union([E.enum(G$r), E.string().regex(/^command:[a-zA-Z0-9:\-_]+$/).describe('Command binding (e.g., "command:help", "command:compact"). Executes the slash command as if typed.'), E.null().describe("Set to null to unbind a default shortcut")]).describe("Action to trigger, command to invoke, or null to unbind")).describe("Map of keystroke patterns to actions")
  }).describe("A block of keybindings for a specific context")), hph = we(() => E.object({
    $schema: E.string().optional().describe("JSON Schema URL for editor validation"),
    $docs: E.string().optional().describe("Documentation URL"),
    bindings: E.array($ld()).describe("Array of keybinding blocks by context")
  }).describe("Claude Code keybindings configuration. Customize keyboard shortcuts by context."));
});
export {Pwi as eDi,zZe as Jtt,Uld as uTd,Owi as tDi,G$r as C6r,$ld as dTd,hph as XAg,ibn as zAn};
