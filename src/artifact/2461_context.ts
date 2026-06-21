// @ts-nocheck
import {b} from "../../runtime.ts";
import {qs,zt} from "../../vendor/m635.ts";
import {F3} from "../../vendor/m459.ts";
import {QNr} from "../../vendor/m2206.ts";
var nbn, Pld, Old, Lld, kwi, KZe;
var rbn = b(() => {
  qs();
  nbn = zt(), Pld = nbn === "windows" || nbn === "wsl", Old = Pld ? "alt+v" : "ctrl+v", Lld = nbn !== "windows" || (F3() ? QNr("1.4.0", ">=1.2.23") : QNr(process.versions.node, ">=22.17.0 <23.0.0 || >=24.2.0")), kwi = Lld ? "shift+tab" : "meta+m", KZe = [{
    context: "Global",
    bindings: {
      "ctrl+c": "app:interrupt",
      "ctrl+d": "app:exit",
      "ctrl+t": "app:toggleTodos",
      "ctrl+o": "app:toggleTranscript",
      "ctrl+shift+b": "app:toggleBrief",
      ...{},
      "ctrl+r": "history:search",
      ...{},
      ...{
        "ctrl+]": "app:openArtifact"
      }
    }
  }, {
    context: "Chat",
    bindings: {
      escape: "chat:cancel",
      "ctrl+l": "chat:clearInput",
      "cmd+k": "chat:clearScreen",
      "ctrl+x ctrl+k": "chat:killAgents",
      [kwi]: "chat:cycleMode",
      "meta+p": "chat:modelPicker",
      "meta+o": "chat:fastMode",
      "meta+t": "chat:thinkingToggle",
      "meta+w": "chat:workflowKeywordToggle",
      enter: "chat:submit",
      "ctrl+j": "chat:newline",
      up: "history:previous",
      down: "history:next",
      "ctrl+_": "chat:undo",
      "ctrl+-": "chat:undo",
      "ctrl+shift+-": "chat:undo",
      "ctrl+shift+_": "chat:undo",
      "ctrl+x ctrl+e": "chat:externalEditor",
      "ctrl+g": "chat:externalEditor",
      "ctrl+s": "chat:stash",
      [Old]: "chat:imagePaste",
      ...(nbn === "wsl" && {
        "ctrl+v": "chat:imagePaste"
      }),
      ...{
        space: "voice:pushToTalk"
      }
    }
  }, {
    context: "Autocomplete",
    bindings: {
      tab: "autocomplete:accept",
      escape: "autocomplete:dismiss",
      up: "autocomplete:previous",
      down: "autocomplete:next"
    }
  }, {
    context: "Settings",
    bindings: {
      escape: "confirm:no",
      up: "select:previous",
      down: "select:next",
      k: "select:previous",
      j: "select:next",
      "ctrl+p": "select:previous",
      "ctrl+n": "select:next",
      space: "select:accept",
      enter: "select:accept",
      "/": "settings:search",
      r: "settings:retry",
      d: "settings:periodDay",
      w: "settings:periodWeek",
      t: "settings:sortByTokens",
      "ctrl+u": "scroll:halfPageUp",
      "ctrl+d": "scroll:halfPageDown"
    }
  }, {
    context: "Doctor",
    bindings: {
      f: "doctor:fix"
    }
  }, {
    context: "Confirmation",
    bindings: {
      y: "confirm:yes",
      n: "confirm:no",
      enter: "confirm:yes",
      escape: "confirm:no",
      up: "confirm:previous",
      down: "confirm:next",
      tab: "confirm:nextField",
      space: "confirm:toggle",
      [kwi]: "confirm:cycleMode",
      "ctrl+e": "confirm:toggleExplanation"
    }
  }, {
    context: "Tabs",
    bindings: {
      tab: "tabs:next",
      "shift+tab": "tabs:previous",
      right: "tabs:next",
      left: "tabs:previous"
    }
  }, {
    context: "Transcript",
    bindings: {
      "ctrl+e": "transcript:toggleShowAll",
      "ctrl+c": "transcript:exit",
      escape: "transcript:exit",
      q: "transcript:exit",
      "ctrl+u": "scroll:halfPageUp",
      "ctrl+d": "scroll:halfPageDown",
      "ctrl+b": "scroll:fullPageUp",
      "ctrl+f": "scroll:fullPageDown",
      "ctrl+n": "scroll:lineDown",
      "ctrl+p": "scroll:lineUp",
      g: "scroll:top",
      "shift+g": "scroll:bottom",
      j: "scroll:lineDown",
      k: "scroll:lineUp",
      space: "scroll:fullPageDown",
      b: "scroll:fullPageUp",
      up: "scroll:lineUp",
      down: "scroll:lineDown",
      home: "scroll:top",
      end: "scroll:bottom"
    }
  }, {
    context: "HistorySearch",
    bindings: {
      "ctrl+r": "historySearch:next",
      escape: "historySearch:accept",
      tab: "historySearch:accept",
      "ctrl+c": "historySearch:cancel",
      enter: "historySearch:execute",
      "ctrl+s": "historySearch:cycleScope"
    }
  }, {
    context: "Task",
    bindings: {
      "ctrl+x ctrl+b": "task:background",
      "ctrl+b": "task:background"
    }
  }, {
    context: "ThemePicker",
    bindings: {
      "ctrl+t": "theme:toggleSyntaxHighlighting",
      "ctrl+e": "theme:editCustom"
    }
  }, {
    context: "Scroll",
    bindings: {
      pageup: "scroll:pageUp",
      pagedown: "scroll:pageDown",
      wheelup: "scroll:lineUp",
      wheeldown: "scroll:lineDown",
      "ctrl+home": "scroll:top",
      "ctrl+end": "scroll:bottom",
      "ctrl+shift+c": "selection:copy",
      "cmd+c": "selection:copy",
      "shift+left": "selection:extendLeft",
      "shift+right": "selection:extendRight",
      "shift+up": "selection:extendUp",
      "shift+down": "selection:extendDown",
      "shift+home": "selection:extendLineStart",
      "shift+end": "selection:extendLineEnd"
    }
  }, {
    context: "Help",
    bindings: {
      escape: "help:dismiss"
    }
  }, {
    context: "Attachments",
    bindings: {
      right: "attachments:next",
      left: "attachments:previous",
      backspace: "attachments:remove",
      delete: "attachments:remove",
      down: "attachments:exit",
      escape: "attachments:exit"
    }
  }, {
    context: "Footer",
    bindings: {
      up: "footer:up",
      "ctrl+p": "footer:up",
      down: "footer:down",
      "ctrl+n": "footer:down",
      right: "footer:next",
      left: "footer:previous",
      enter: "footer:openSelected",
      escape: "footer:clearSelection",
      x: "footer:close"
    }
  }, {
    context: "MessageSelector",
    bindings: {
      up: "messageSelector:up",
      down: "messageSelector:down",
      k: "messageSelector:up",
      j: "messageSelector:down",
      "ctrl+p": "messageSelector:up",
      "ctrl+n": "messageSelector:down",
      "ctrl+up": "messageSelector:top",
      "shift+up": "messageSelector:top",
      "meta+up": "messageSelector:top",
      "shift+k": "messageSelector:top",
      "ctrl+down": "messageSelector:bottom",
      "shift+down": "messageSelector:bottom",
      "meta+down": "messageSelector:bottom",
      "shift+j": "messageSelector:bottom",
      enter: "messageSelector:select"
    }
  }, {
    context: "DiffDialog",
    bindings: {
      escape: "diff:dismiss",
      left: "diff:previousSource",
      right: "diff:nextSource",
      up: "diff:previousFile",
      down: "diff:nextFile",
      enter: "diff:viewDetails",
      j: "diff:nextFile",
      k: "diff:previousFile",
      pageup: "scroll:pageUp",
      pagedown: "scroll:pageDown",
      space: "scroll:fullPageDown",
      "shift+space": "scroll:fullPageUp",
      b: "scroll:fullPageUp",
      g: "scroll:top",
      "shift+g": "scroll:bottom",
      home: "scroll:top",
      end: "scroll:bottom"
    }
  }, {
    context: "ModelPicker",
    bindings: {
      left: "modelPicker:decreaseEffort",
      right: "modelPicker:increaseEffort",
      s: "modelPicker:thisSessionOnly"
    }
  }, {
    context: "Select",
    bindings: {
      up: "select:previous",
      down: "select:next",
      j: "select:next",
      k: "select:previous",
      "ctrl+n": "select:next",
      "ctrl+p": "select:previous",
      pageup: "select:pageUp",
      pagedown: "select:pageDown",
      home: "select:first",
      end: "select:last",
      enter: "select:accept",
      escape: "select:cancel"
    }
  }, {
    context: "Plugin",
    bindings: {
      space: "plugin:toggle",
      i: "plugin:install",
      f: "plugin:favorite"
    }
  }];
});
export {nbn,Pld,Old,Lld,kwi,KZe,rbn};
