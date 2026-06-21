// @ts-nocheck
import {b as L} from "../../runtime.ts";
// Computer-use MCP tool definitions.
//
// This module produces the JSON-Schema tool descriptors for the computer-use
// (desktop control) MCP server: request_access, screenshot, the click/scroll/
// type/key family, application management, clipboard, and the optional
// "teach mode" tooling. The descriptors are consumed by the apps/setup modules
// (see 3196_apps.ts `buildComputerUseMCPServer` / 5646_setupComputerUseMCP.ts),
// which wire each descriptor's `name` to a runtime executor.
//
// 1:1 reverse-engineering: only names, types and doc comments were added.
// Cross-module symbols (`KIH`, `$c8`) keep their original bundled identifiers so
// the importing modules in other files continue to resolve them. File-private
// symbols (`Vv3` -> coordinateModeDescriptions, `$o7` -> batchActionSchema, and
// the internal `yv3` -> buildTeachModeTools) were renamed consistently.

/**
 * Bundler lazy-module-initializer factory (esbuild `__esm`): wraps a body so it
 * runs once on first access. Defined in another bundle module; declared here for
 * type-checking only. Identifier preserved.
 */
declare function L(body: () => void): () => void;

/** Minimal JSON-Schema node shapes used throughout the tool descriptors. */
interface JsonSchemaNode {
  type?: string;
  items?: JsonSchemaNode;
  properties?: Record<string, JsonSchemaNode>;
  required?: string[];
  enum?: string[];
  minItems?: number;
  maxItems?: number;
  minimum?: number;
  maximum?: number;
  description?: string;
}

/** A single MCP tool descriptor: a name plus its JSON-Schema input contract. */
interface ToolDescriptor {
  name: string;
  description: string;
  inputSchema: JsonSchemaNode;
}

/** Per-axis human descriptions for one coordinate mode (x and y semantics). */
interface CoordinateAxisDescriptions {
  x: string;
  y: string;
}

/** Lookup of coordinate-axis descriptions keyed by coordinate mode. */
type CoordinateModeDescriptions = Record<string, CoordinateAxisDescriptions>;

/**
 * Executor platform capabilities that influence the generated descriptors.
 * `screenshotFiltering` selects the screenshot description wording, and
 * `teachMode` decides whether the teach-mode tools are appended.
 */
interface ExecutorCapabilities {
  screenshotFiltering?: string;
  teachMode?: boolean;
}

/**
 * Build the full list of computer-use tool descriptors for a session.
 *
 * @param capabilities  Executor platform capabilities (screenshot filtering,
 *                       teach-mode availability).
 * @param coordinateMode Coordinate-mode key ("pixels" or "normalized_0_100")
 *                       selecting which axis descriptions to embed.
 * @param availableApps  Optional list of installed application names, appended
 *                       to the `request_access` app description as a hint.
 * @returns The ordered array of tool descriptors, including teach-mode tools
 *          when `capabilities.teachMode` is set.
 *
 * NOTE: `KIH` is referenced by other bundle modules (3196_apps.ts,
 * 5646_setupComputerUseMCP.ts); its identifier is preserved.
 */
function KIH(
  capabilities: ExecutorCapabilities,
  coordinateMode: string,
  availableApps?: string[]
): ToolDescriptor[] {
  let coordinateDescriptions: CoordinateAxisDescriptions = Vv3[coordinateMode],
    availableAppsSuffix =
      availableApps && availableApps.length > 0
        ? ` Available applications on this machine: ${availableApps.join(", ")}.`
        : "",
    coordinateSchema: JsonSchemaNode = {
      type: "array",
      items: {
        type: "number"
      },
      minItems: 2,
      maxItems: 2,
      description: `(x, y): ${coordinateDescriptions.x}`
    },
    modifierKeysSchema: JsonSchemaNode = {
      type: "string",
      description: 'Modifier keys to hold during the click (e.g. "shift", "ctrl+shift"). Supports the same syntax as the key tool.'
    },
    screenshotDescription =
      capabilities.screenshotFiltering === "native"
        ? "Take a screenshot of the primary display. Applications not in the session allowlist are excluded at the compositor level — only granted apps and the desktop are visible."
        : "Take a screenshot of the primary display. On this platform, screenshots are NOT filtered — all open windows are visible. Input actions targeting apps not in the session allowlist are rejected.";
  return [{
    name: "request_access",
    description: "Request user permission to control a set of applications for this session. Must be called before any other tool in this server. The user sees a single dialog listing all requested apps and either allows the whole set or denies it. Call this again mid-session to add more apps; previously granted apps remain granted. Returns the granted apps, denied apps, and screenshot filtering capability.",
    inputSchema: {
      type: "object",
      properties: {
        apps: {
          type: "array",
          items: {
            type: "string"
          },
          description: 'Application display names (e.g. "Slack", "Calendar") or bundle identifiers (e.g. "com.tinyspeck.slackmacgap"). Display names are resolved case-insensitively against installed apps.' + availableAppsSuffix
        },
        reason: {
          type: "string",
          description: "One-sentence explanation shown to the user in the approval dialog. Explain the task, not the mechanism."
        },
        clipboardRead: {
          type: "boolean",
          description: "Also request permission to read the user's clipboard (separate checkbox in the dialog)."
        },
        clipboardWrite: {
          type: "boolean",
          description: "Also request permission to write the user's clipboard. When granted, multi-line `type` calls use the clipboard fast path."
        },
        systemKeyCombos: {
          type: "boolean",
          description: "Also request permission to send system-level key combos (quit app, switch app, lock screen). Without this, those specific combos are blocked."
        }
      },
      required: ["apps", "reason"]
    }
  }, {
    name: "screenshot",
    description: screenshotDescription + " Returns an error if the allowlist is empty. The returned image is what subsequent click coordinates are relative to.",
    inputSchema: {
      type: "object",
      properties: {
        save_to_disk: {
          type: "boolean",
          description: "Save the image to disk so it can be attached to a message for the user. Returns the saved path in the tool result. Only set this when you intend to share the image — screenshots you're just looking at don't need saving."
        }
      },
      required: []
    }
  }, {
    name: "zoom",
    description: "Take a higher-resolution screenshot of a specific region of the last full-screen screenshot. Use this liberally to inspect small text, button labels, or fine UI details that are hard to read in the downsampled full-screen image. IMPORTANT: Coordinates in subsequent click calls always refer to the full-screen screenshot, never the zoomed image. This tool is read-only for inspecting detail.",
    inputSchema: {
      type: "object",
      properties: {
        region: {
          type: "array",
          items: {
            type: "integer"
          },
          minItems: 4,
          maxItems: 4,
          description: "(x0, y0, x1, y1): Rectangle to zoom into, in the coordinate space of the most recent full-screen screenshot. x0,y0 = top-left, x1,y1 = bottom-right."
        },
        save_to_disk: {
          type: "boolean",
          description: "Save the image to disk so it can be attached to a message for the user. Returns the saved path in the tool result. Only set this when you intend to share the image."
        }
      },
      required: ["region"]
    }
  }, {
    name: "left_click",
    description: "Left-click at the given coordinates. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: coordinateSchema,
        text: modifierKeysSchema
      },
      required: ["coordinate"]
    }
  }, {
    name: "double_click",
    description: "Double-click at the given coordinates. Selects a word in most text editors. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: coordinateSchema,
        text: modifierKeysSchema
      },
      required: ["coordinate"]
    }
  }, {
    name: "triple_click",
    description: "Triple-click at the given coordinates. Selects a line in most text editors. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: coordinateSchema,
        text: modifierKeysSchema
      },
      required: ["coordinate"]
    }
  }, {
    name: "right_click",
    description: "Right-click at the given coordinates. Opens a context menu in most applications. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: coordinateSchema,
        text: modifierKeysSchema
      },
      required: ["coordinate"]
    }
  }, {
    name: "middle_click",
    description: "Middle-click (scroll-wheel click) at the given coordinates. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: coordinateSchema,
        text: modifierKeysSchema
      },
      required: ["coordinate"]
    }
  }, {
    name: "type",
    description: "Type text into whatever currently has keyboard focus. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. Newlines are supported. For keyboard shortcuts use `key` instead.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "Text to type."
        }
      },
      required: ["text"]
    }
  }, {
    name: "key",
    description: 'Press a key or key combination (e.g. "return", "escape", "cmd+a", "ctrl+shift+tab"). The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. ' + "System-level combos (quit app, switch app, lock screen) require the `systemKeyCombos` grant — without it they return an error. All other combos work.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: 'Modifiers joined with "+", e.g. "cmd+shift+a".'
        },
        repeat: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          description: "Number of times to repeat the key press. Default is 1."
        }
      },
      required: ["text"]
    }
  }, {
    name: "scroll",
    description: "Scroll at the given coordinates. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: coordinateSchema,
        scroll_direction: {
          type: "string",
          enum: ["up", "down", "left", "right"],
          description: "Direction to scroll."
        },
        scroll_amount: {
          type: "integer",
          minimum: 0,
          maximum: 100,
          description: "Number of scroll ticks."
        }
      },
      required: ["coordinate", "scroll_direction", "scroll_amount"]
    }
  }, {
    name: "left_click_drag",
    description: "Press, move to target, and release. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: {
          ...coordinateSchema,
          description: `(x, y) end point: ${coordinateDescriptions.x}`
        },
        start_coordinate: {
          ...coordinateSchema,
          description: `(x, y) start point. If omitted, drags from the current cursor position. ${coordinateDescriptions.x}`
        }
      },
      required: ["coordinate"]
    }
  }, {
    name: "mouse_move",
    description: "Move the mouse cursor without clicking. Useful for triggering hover states. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing.",
    inputSchema: {
      type: "object",
      properties: {
        coordinate: coordinateSchema
      },
      required: ["coordinate"]
    }
  }, {
    name: "open_application",
    description: "Bring an application to the front, launching it if necessary. The target application must already be in the session allowlist — call request_access first.",
    inputSchema: {
      type: "object",
      properties: {
        app: {
          type: "string",
          description: 'Display name (e.g. "Slack") or bundle identifier (e.g. "com.tinyspeck.slackmacgap").'
        }
      },
      required: ["app"]
    }
  }, {
    name: "switch_display",
    description: "Switch which monitor subsequent screenshots capture. Use this when the application you need is on a different monitor than the one shown. The screenshot tool tells you which monitor it captured and lists " + "other attached monitors by name — pass one of those names here. " + 'After switching, call screenshot to see the new monitor. Pass "auto" to return to automatic monitor selection.',
    inputSchema: {
      type: "object",
      properties: {
        display: {
          type: "string",
          description: 'Monitor name from the screenshot note (e.g. "Built-in Retina Display", "LG UltraFine"), or "auto" to re-enable automatic selection.'
        }
      },
      required: ["display"]
    }
  }, {
    name: "list_granted_applications",
    description: "List the applications currently in the session allowlist, plus the active grant flags and coordinate mode. No side effects.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }, {
    name: "read_clipboard",
    description: "Read the current clipboard contents as text. Requires the `clipboardRead` grant.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }, {
    name: "write_clipboard",
    description: "Write text to the clipboard. Requires the `clipboardWrite` grant.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string"
        }
      },
      required: ["text"]
    }
  }, {
    name: "wait",
    description: "Wait for a specified duration.",
    inputSchema: {
      type: "object",
      properties: {
        duration: {
          type: "number",
          description: "Duration in seconds (0–100)."
        }
      },
      required: ["duration"]
    }
  }, {
    name: "cursor_position",
    description: "Get the current mouse cursor position. Returns image-pixel coordinates relative to the most recent screenshot, or logical points if no screenshot has been taken.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }, {
    name: "hold_key",
    description: "Press and hold a key or key combination for the specified duration, then release. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. System-level combos require the `systemKeyCombos` grant.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: 'Key or chord to hold, e.g. "space", "shift+down".'
        },
        duration: {
          type: "number",
          description: "Duration in seconds (0–100)."
        }
      },
      required: ["text", "duration"]
    }
  }, {
    name: "left_mouse_down",
    description: "Press the left mouse button at the current cursor position and leave it held. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. Use mouse_move first to position the cursor. Call left_mouse_up to release. Errors if the button is already held.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }, {
    name: "left_mouse_up",
    description: "Release the left mouse button at the current cursor position. The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing. Pairs with left_mouse_down. Safe to call even if the button is not currently held.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }, {
    name: "computer_batch",
    description: "Execute a sequence of actions in ONE tool call. Each individual tool call requires a model→API round trip (seconds); " + "batching a predictable sequence eliminates all but one. Use this whenever you can predict the outcome of several actions ahead — " + `e.g. click a field, type into it, press Return. Actions execute sequentially and stop on the first error. ${"The frontmost application must be in the session allowlist at the time of this call, or this tool returns an error and does nothing."} The frontmost check runs before EACH action inside the batch — if an action opens a non-allowed app, the next action's gate fires and the batch stops there. ` + "Mid-batch screenshot actions are allowed for inspection but coordinates in subsequent clicks always refer to the PRE-BATCH full-screen screenshot.",
    inputSchema: {
      type: "object",
      properties: {
        actions: {
          type: "array",
          minItems: 1,
          items: $o7,
          description: 'List of actions. Example: [{"action":"left_click","coordinate":[100,200]},{"action":"type","text":"hello"},{"action":"key","text":"Return"}]'
        }
      },
      required: ["actions"]
    }
  }, ...(capabilities.teachMode ? yv3(coordinateDescriptions, availableAppsSuffix) : [])];
}

/**
 * Build the teach-mode tool descriptors (request_teach_access, teach_step,
 * teach_batch). Appended to the main tool list only when the executor reports
 * teach-mode capability.
 *
 * @param coordinateDescriptions Axis descriptions for the active coordinate
 *                               mode, embedded in the tooltip `anchor` schema.
 * @param availableAppsSuffix    Installed-apps hint appended to the `apps`
 *                               description of request_teach_access.
 */
function yv3(
  coordinateDescriptions: CoordinateAxisDescriptions,
  availableAppsSuffix: string
): ToolDescriptor[] {
  // Shared property schema for a single teach step, reused by teach_step's
  // input schema and teach_batch's per-step item schema.
  let teachStepProperties: Record<string, JsonSchemaNode> = {
    explanation: {
      type: "string",
      description: "Tooltip body text. Explain what the user is looking at and why it matters. " + "This is the ONLY place the user sees your words — be complete but concise."
    },
    next_preview: {
      type: "string",
      description: `One line describing exactly what will happen when the user clicks Next. Example: "Next: I'll click Create Bucket and type the name." Shown below the explanation in a smaller font.`
    },
    anchor: {
      type: "array",
      items: {
        type: "number"
      },
      minItems: 2,
      maxItems: 2,
      description: `(x, y) — where the tooltip arrow points. ${coordinateDescriptions.x} Omit to center the tooltip with no arrow (for general-context steps).`
    },
    actions: {
      type: "array",
      items: $o7,
      description: "Actions to execute when the user clicks Next. Same item schema as computer_batch.actions. Empty array is valid for purely explanatory steps. Actions run sequentially and stop on first error."
    }
  };
  return [{
    name: "request_teach_access",
    description: 'Request permission to guide the user through a task step-by-step with on-screen tooltips. Use this INSTEAD OF request_access when the user wants to LEARN how to do something (phrases like "teach me", "walk me through", "show me how", "help me learn"). On approval the main Claude window hides and a fullscreen tooltip overlay appears. You then call teach_step repeatedly; each call shows one tooltip and waits for the user to click Next. Same app-allowlist semantics as request_access, but no clipboard/system-key flags. Teach mode ends automatically when your turn ends.',
    inputSchema: {
      type: "object",
      properties: {
        apps: {
          type: "array",
          items: {
            type: "string"
          },
          description: 'Application display names (e.g. "Slack", "Calendar") or bundle identifiers. Resolved case-insensitively against installed apps.' + availableAppsSuffix
        },
        reason: {
          type: "string",
          description: 'What you will be teaching. Shown in the approval dialog as "Claude wants to guide you through {reason}". Keep it short and task-focused.'
        }
      },
      required: ["apps", "reason"]
    }
  }, {
    name: "teach_step",
    description: "Show one guided-tour tooltip and wait for the user to click Next. On Next, execute the actions, " + "take a fresh screenshot, and return both — you do NOT need a separate screenshot call between steps. " + "The returned image shows the state after your actions ran; anchor the next teach_step against it. " + "IMPORTANT — the user only sees the tooltip during teach mode. Put ALL narration in `explanation`. " + "Text you emit outside teach_step calls is NOT visible until teach mode ends. " + "Pack as many actions as possible into each step's `actions` array — the user waits through " + "the whole round trip between clicks, so one step that fills a form beats five steps that fill one field each. " + "Returns {exited:true} if the user clicks Exit — do not call teach_step again after that. " + "Take an initial screenshot before your FIRST teach_step to anchor it.",
    inputSchema: {
      type: "object",
      properties: teachStepProperties,
      required: ["explanation", "next_preview", "actions"]
    }
  }, {
    name: "teach_batch",
    description: "Queue multiple teach steps in one tool call. Parallels computer_batch: " + "N steps → one model↔API round trip instead of N. Each step still shows a tooltip " + "and waits for the user's Next click, but YOU aren't waiting for a round trip between steps. " + "You can call teach_batch multiple times in one tour — treat each batch as one predictable " + "SEGMENT (typically: all the steps on one page). The returned screenshot shows the state after the batch's final actions; anchor the NEXT teach_batch against it. WITHIN a batch, all anchors and click coordinates refer to the PRE-BATCH screenshot " + "(same invariant as computer_batch) — for steps 2+ in a batch, either omit anchor " + "(centered tooltip) or target elements you know won't have moved. " + "Good pattern: batch 5 tooltips on page A (last step navigates) → read returned screenshot → " + "batch 3 tooltips on page B → done. " + "Returns {exited:true, stepsCompleted:N} if the user clicks Exit — do NOT call again after that; " + "{stepsCompleted, stepFailed, ...} if an action errors mid-batch; otherwise {stepsCompleted, results:[...]} plus a final screenshot. Fall back to individual teach_step calls when you need to react to each intermediate screenshot.",
    inputSchema: {
      type: "object",
      properties: {
        steps: {
          type: "array",
          minItems: 1,
          items: {
            type: "object",
            properties: teachStepProperties,
            required: ["explanation", "next_preview", "actions"]
          },
          description: "Ordered steps. Validated upfront — a typo in step 5 errors before any tooltip shows."
        }
      },
      required: ["steps"]
    }
  }];
}

/** Coordinate-mode axis descriptions; initialized lazily by `$c8`. */
var Vv3: CoordinateModeDescriptions,
  /** Shared JSON-Schema for a single batch/teach action; initialized by `$c8`. */
  $o7: JsonSchemaNode;

// Lazy module initializer (the bundler's `L(...)` once-wrapper). Populates the
// coordinate-mode description table and the shared action schema used by
// computer_batch and the teach-mode tools.
//
// NOTE: `$c8` is the module's init wrapper; identifier preserved.
var $c8 = L(() => {
  Vv3 = {
    pixels: {
      x: "Horizontal pixel position read directly from the most recent screenshot image, measured from the left edge. The server handles all scaling.",
      y: "Vertical pixel position read directly from the most recent screenshot image, measured from the top edge. The server handles all scaling."
    },
    normalized_0_100: {
      x: "Horizontal position as a percentage of screen width, 0.0–100.0 (0 = left edge, 100 = right edge).",
      y: "Vertical position as a percentage of screen height, 0.0–100.0 (0 = top edge, 100 = bottom edge)."
    }
  }, $o7 = {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["key", "type", "mouse_move", "left_click", "left_click_drag", "right_click", "middle_click", "double_click", "triple_click", "scroll", "hold_key", "screenshot", "cursor_position", "left_mouse_down", "left_mouse_up", "wait"],
        description: "The action to perform."
      },
      coordinate: {
        type: "array",
        items: {
          type: "number"
        },
        minItems: 2,
        maxItems: 2,
        description: "(x, y) for click/mouse_move/scroll/left_click_drag end point."
      },
      start_coordinate: {
        type: "array",
        items: {
          type: "number"
        },
        minItems: 2,
        maxItems: 2,
        description: "(x, y) drag start — left_click_drag only. Omit to drag from current cursor."
      },
      text: {
        type: "string",
        description: "For type: the text. For key/hold_key: the chord string. For click/scroll: modifier keys to hold."
      },
      scroll_direction: {
        type: "string",
        enum: ["up", "down", "left", "right"]
      },
      scroll_amount: {
        type: "integer",
        minimum: 0,
        maximum: 100
      },
      duration: {
        type: "number",
        description: "Seconds (0–100). For hold_key/wait."
      },
      repeat: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        description: "For key: repeat count."
      }
    },
    required: ["action"]
  };
});

export {KIH as Q$e,yv3 as G4d,Vv3 as W4d,$o7 as Tna,$c8 as JKr};
