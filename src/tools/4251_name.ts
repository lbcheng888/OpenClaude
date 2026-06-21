// @ts-nocheck
import {b as L} from "../../runtime.ts";
import {Xr as a8} from "../../vendor/m321.ts";
import {Ri as M7,pi as c9} from "./2227_userFacingName.ts";
import {we as kH} from "../../vendor/m455.ts";
import {E as k} from "../../vendor/m319.ts";
// Tool definition: "TestingPermission".
//
// A no-op test tool used by end-to-end tests. It is always disabled in
// production (isEnabled returns false) and its checkPermissions always returns
// an "ask" decision, so it exercises the permission-prompt path during testing.
//
// External helpers (declared in other modules, kept by their recovered/minified
// names so cross-module references stay intact):
//   L  - lazy module-initializer wrapper; runs the body once on first call.
//   c9 - tool factory; builds a registered tool descriptor from a spec object.
//   kH - lazy/memoized value wrapper; defers building the schema until needed.
//   k  - schema builder (Zod-like); k.strictObject({}) is an empty input schema.
//   a8 / M7 - side-effecting module-init imports invoked before use.

/** Canonical tool name shared by `name` and `userFacingName`. */
var testingPermissionToolName = "TestingPermission",
  /** Lazily-built, memoized input schema (an empty strict object). */
  testingPermissionInputSchema: (() => unknown) | undefined,
  /** The constructed TestingPermission tool descriptor (module-local). */
  testingPermissionTool: unknown;

// NOTE: `xuK` is the module's lazy initializer and is invoked from another
// module (artifact/4278_uL.ts). Its name MUST stay `xuK`.
var xuK = L(() => {
  a8();
  M7();
  testingPermissionInputSchema = kH(() => k.strictObject({})), testingPermissionTool = c9({
    name: testingPermissionToolName,
    maxResultSizeChars: 1e5,
    async description() {
      return "Test tool that always asks for permission";
    },
    async prompt() {
      return "Test tool that always asks for permission before executing. Used for end-to-end testing.";
    },
    get inputSchema() {
      return testingPermissionInputSchema!();
    },
    userFacingName() {
      return "TestingPermission";
    },
    isEnabled() {
      return !1;
    },
    isConcurrencySafe() {
      return !0;
    },
    isReadOnly() {
      return !0;
    },
    async checkPermissions() {
      return {
        behavior: "ask",
        message: "Run test?"
      };
    },
    renderToolUseMessage() {
      return null;
    },
    renderToolUseProgressMessage() {
      return null;
    },
    renderToolUseQueuedMessage() {
      return null;
    },
    renderToolUseRejectedMessage() {
      return null;
    },
    renderToolResultMessage() {
      return null;
    },
    renderToolUseErrorMessage() {
      return null;
    },
    async call() {
      return {
        data: `${testingPermissionToolName} executed successfully`
      };
    },
    /**
     * Wrap a tool result value into an Anthropic API tool_result block.
     * @param result   the value returned from `call`'s data.
     * @param toolUseId the tool_use id this result corresponds to.
     */
    mapToolResultToToolResultBlockParam(result: unknown, toolUseId: string) {
      return {
        type: "tool_result",
        content: String(result),
        tool_use_id: toolUseId
      };
    }
  });
});

export {testingPermissionToolName as hWa,testingPermissionInputSchema as xOp,testingPermissionTool as BH_,xuK as gWa};
