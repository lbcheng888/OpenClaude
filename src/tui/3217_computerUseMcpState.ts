// @ts-nocheck
import {truncateToWidth as Vs} from "../../vendor/m237.ts";
import {Gn as qn,sc as rc} from "../../vendor/m2455.ts";
import {Text as w} from "../../vendor/m2423.ts";
import {b,M as L} from "../../runtime.ts";
import {ze as Je} from "../../vendor/m2452.ts";
import {ps as ds} from "../../vendor/m238.ts";
import {Te} from "../../vendor/m2253.ts";
// @ts-nocheck
function updateComputerUseMcpState(setState, mapState) {
  setState(prev => {
    let nextSlice = mapState(prev.computerUseMcpState);
    if (nextSlice === prev.computerUseMcpState) return prev;
    return {
      ...prev,
      computerUseMcpState: nextSlice
    };
  });
}
function formatCoordinate(coordinate) {
  return coordinate ? `(${coordinate[0]}, ${coordinate[1]})` : "";
}
function getComputerUseMCPToolOverrides(action) {
  return {
    userFacingName() {
      return `Computer Use[${action}]`;
    },
    renderToolUseMessage(input) {
      switch (action) {
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
          return formatCoordinate(input.coordinate);
        case "left_click_drag":
          return input.start_coordinate ? `${formatCoordinate(input.start_coordinate)} \u2192 ${formatCoordinate(input.coordinate)}` : `to ${formatCoordinate(input.coordinate)}`;
        case "type":
          return typeof input.text === "string" ? `"${Vs(input.text, 40)}"` : "";
        case "key":
        case "hold_key":
          return typeof input.text === "string" ? input.text : "";
        case "scroll":
          return [input.direction, input.amount && `\xD7${input.amount}`, input.coordinate && `at ${formatCoordinate(input.coordinate)}`].filter(Boolean).join(" ");
        case "zoom":
          {
            let region = input.region;
            return Array.isArray(region) && region.length === 4 ? `[${region[0]}, ${region[1]}, ${region[2]}, ${region[3]}]` : "";
          }
        case "wait":
          return typeof input.duration === "number" ? `${input.duration}s` : "";
        case "write_clipboard":
          return typeof input.text === "string" ? `"${Vs(input.text, 40)}"` : "";
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
    renderToolResultMessage(result, _extra, {
      verbose: verbose
    }) {
      if (verbose || typeof result !== "object" || result === null) return null;
      let label = COMPUTER_USE_RESULT_LABELS[action];
      if (!label) return null;
      return React.createElement(qn, {
        height: 1
      }, React.createElement(w, {
        dimColor: true
      }, label));
    }
  };
}
var React, COMPUTER_USE_RESULT_LABELS;
var initComputerUseMcpStateModule = b(() => {
  rc();
  Je();
  ds();
  React = L(Te(), 1);
  COMPUTER_USE_RESULT_LABELS = {
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

export {updateComputerUseMcpState as Nhe,formatCoordinate as r1t,getComputerUseMCPToolOverrides as Qna,React as o1t,COMPUTER_USE_RESULT_LABELS as sqd,initComputerUseMcpStateModule as Zna};
