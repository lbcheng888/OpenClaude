// @ts-nocheck
import {truncateToWidth as xs} from "../../vendor/m239.ts";
import {Yn,Pl} from "../../vendor/m2465.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {Xo} from "../../vendor/m240.ts";
import {oe} from "../../vendor/m2275.ts";
/**
 * Computer Use MCP tool — UI rendering for tool-use and tool-result messages.
 *
 * Provides a factory that builds the per-action renderer descriptor used by the
 * Claude Code CLI to display computer-use actions (clicks, typing, scrolling,
 * screenshots, etc.) in a human-readable form.
 */

/**
 * Apply a transform to the `computerUseMcpState` slice of the app store.
 *
 * @param applyStateUpdate - Store updater that receives a reducer over the full state.
 * @param transformMcpState - Maps the current `computerUseMcpState` to its next value.
 *   If the value is unchanged (referential equality) the state object is returned as-is.
 */
function Yge(
  applyStateUpdate: (reducer: (prevState: any) => any) => void,
  transformMcpState: (mcpState: any) => any
): void {
  applyStateUpdate(prevState => {
    let nextMcpState = transformMcpState(prevState.computerUseMcpState);
    if (nextMcpState === prevState.computerUseMcpState) return prevState;
    return {
      ...prevState,
      computerUseMcpState: nextMcpState
    };
  });
}

/**
 * Format a 2-tuple coordinate as `(x, y)`. Returns an empty string when absent.
 *
 * @param coordinate - `[x, y]` pixel pair, or undefined.
 */
function LFt(coordinate: [number, number] | undefined | null): string {
  return coordinate ? `(${coordinate[0]}, ${coordinate[1]})` : "";
}

/**
 * Build the renderer descriptor for a single computer-use action.
 *
 * @param actionName - The computer-use action identifier (e.g. "left_click", "type").
 * @returns An object exposing `userFacingName`, `renderToolUseMessage`, and
 *   `renderToolResultMessage` used by the tool-rendering pipeline.
 */
function rua(actionName: string) {
  return {
    userFacingName() {
      return `Computer Use[${actionName}]`;
    },
    renderToolUseMessage(input: any): string {
      switch (actionName) {
        case "screenshot":
        case "left_mouse_down":
        case "left_mouse_up":
        case "cursor_position":
        case "list_granted_applications":
        case "read_clipboard":
          return "";
        case "left_click":
        case "right_click":
        case "middle_click":
        case "double_click":
        case "triple_click":
        case "mouse_move":
          return LFt(input.coordinate);
        case "left_click_drag":
          return input.start_coordinate ? `${LFt(input.start_coordinate)} → ${LFt(input.coordinate)}` : `to ${LFt(input.coordinate)}`;
        case "type":
          return typeof input.text === "string" ? `"${xs(input.text, 40)}"` : "";
        case "key":
        case "hold_key":
          return typeof input.text === "string" ? input.text : "";
        case "scroll":
          return [input.direction, input.amount && `\xD7${input.amount}`, input.coordinate && `at ${LFt(input.coordinate)}`].filter(Boolean).join(" ");
        case "zoom":
          {
            let region = input.region;
            return Array.isArray(region) && region.length === 4 ? `[${region[0]}, ${region[1]}, ${region[2]}, ${region[3]}]` : "";
          }
        case "wait":
          return typeof input.duration === "number" ? `${input.duration}s` : "";
        case "write_clipboard":
          return typeof input.text === "string" ? `"${xs(input.text, 40)}"` : "";
        case "open_application":
          return typeof input.bundle_id === "string" ? String(input.bundle_id) : "";
        case "request_access":
          {
            let apps = input.apps;
            if (!Array.isArray(apps)) return "";
            return apps.map(app => typeof app?.displayName === "string" ? app.displayName : "").filter(Boolean).join(", ");
          }
        case "computer_batch":
          {
            let actions = input.actions;
            return Array.isArray(actions) ? `${actions.length} actions` : "";
          }
        default:
          return "";
      }
    },
    renderToolResultMessage(result: any, _meta: any, {
      verbose: isVerbose
    }: { verbose: boolean }) {
      if (isVerbose || typeof result !== "object" || result === null) return null;
      let resultLabel = Gjd[actionName];
      if (!resultLabel) return null;
      return XQr.jsx(Yn, {
        height: 1,
        children: XQr.jsx(v, {
          dimColor: !0,
          children: resultLabel
        })
      });
    }
  };
}
var XQr, Gjd;
var oua = b(() => {
  Pl();
  je();
  Xo();
  XQr = x(oe(), 1);
  Gjd = {
    screenshot: "Captured",
    zoom: "Captured",
    request_access: "Access updated",
    left_click: "Clicked",
    right_click: "Clicked",
    middle_click: "Clicked",
    double_click: "Clicked",
    triple_click: "Clicked",
    type: "Typed",
    key: "Pressed",
    hold_key: "Pressed",
    scroll: "Scrolled",
    left_click_drag: "Dragged",
    open_application: "Opened"
  };
});

export {Yge,LFt,rua,XQr,Gjd,oua};
