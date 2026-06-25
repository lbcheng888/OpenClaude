// @ts-nocheck
import {useTheme as ji,gZ} from "../../vendor/m2285.ts";
import {dJl,pJl} from "../tools/5413_name.ts";
import {Zer,ZFo} from "../../vendor/m5413.ts";
import {fS,po} from "../tools/5224_userPromptCount.ts";
import {pl,Wu} from "../../vendor/m438.ts";
import {uqn} from "../../vendor/m4171.ts";
import {b,x} from "../../runtime.ts";
import {et} from "../../vendor/m2261.ts";
/* Bridges remote can_use_tool requests into the local permission dialog flow. */
/* Restored Claude Code 2.1.190 module: Remote permission dispatcher hook.
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function etr({
  sessionKey: sessionKey,
  sendResponse: sendResponse,
  requestDialog: requestDialog,
  toolRegistry: toolRegistry,
  toolPermissionContext: toolPermissionContext,
  canInterruptTurn: canInterruptTurn
}: any): any {
  let sendResponseRef = SV.useRef(sendResponse);
  sendResponseRef.current = sendResponse;
  let requestDialogRef = SV.useRef(requestDialog);
  requestDialogRef.current = requestDialog;
  let toolRegistryRef = SV.useRef(toolRegistry);
  toolRegistryRef.current = toolRegistry;
  let toolPermissionContextRef = SV.useRef(toolPermissionContext);
  toolPermissionContextRef.current = toolPermissionContext;
  let canInterruptTurnRef = SV.useRef(canInterruptTurn);
  canInterruptTurnRef.current = canInterruptTurn;
  let [theme] = ji(),
    themeRef = SV.useRef(theme);
  themeRef.current = theme;
  let pendingControllers = SV.useRef(new Map()),
    dispatch = SV.useCallback((message: any): any => {
      if (message.request.subtype !== "can_use_tool") return;
      let {
          request: request,
          request_id: requestId
        } = message,
        controllers = pendingControllers.current,
        tool = dJl(request.tool_name, toolRegistryRef.current),
        description = request.description ?? `${request.tool_name} requires permission`,
        abortController = new AbortController();
      controllers.set(requestId, abortController), Zer({
        tool: tool,
        input: request.input,
        description: description,
        toolUseID: request.tool_use_id,
        permissionResult: {
          behavior: "ask",
          message: description,
          suggestions: request.permission_suggestions,
          blockedPath: request.blocked_path
        },
        assistantMessage: fS({
          content: [{
            type: "tool_use",
            id: request.tool_use_id,
            name: request.tool_name,
            input: request.input
          }]
        }),
        theme: themeRef.current,
        toolPermissionContext: toolPermissionContextRef.current,
        remoteWorkspace: pl(),
        signal: abortController.signal
      }).then(({
        dialog: dialog,
        descriptor: descriptor
      }: any): any => {
        if (!controllers.has(requestId)) return Promise.resolve({
          behavior: "cancelled"
        });
        return requestDialogRef.current(dialog, descriptor, {
          signal: abortController.signal,
          queueBehind: !0
        });
      }).then((result: any): any => {
        if (!controllers.delete(requestId)) return;
        switch (result.behavior) {
          case "allow":
            sendResponseRef.current(requestId, {
              behavior: "allow",
              updatedInput: result.updatedInput,
              ...(result.permissionUpdates?.length && {
                updatedPermissions: result.permissionUpdates
              }),
              toolUseID: request.tool_use_id
            });
            return;
          case "deny":
            {
              let shouldInterrupt = canInterruptTurnRef.current && uqn({
                feedback: result.feedback,
                contentBlocks: result.contentBlocks,
                isSubagent: !!request.agent_id
              });
              sendResponseRef.current(requestId, {
                behavior: "deny",
                message: result.feedback ?? "User denied permission",
                ...(shouldInterrupt && {
                  interrupt: !0
                }),
                toolUseID: request.tool_use_id
              });
              return;
            }
          case "cancelled":
            sendResponseRef.current(requestId, {
              behavior: "deny",
              message: "User aborted",
              ...(canInterruptTurnRef.current && {
                interrupt: !0
              }),
              toolUseID: request.tool_use_id
            });
            return;
        }
      }).catch((error: any): any => {
        if (!controllers.delete(requestId)) return;
        sendResponseRef.current(requestId, {
          behavior: "deny",
          message: `Permission dialog failed: ${error instanceof Error ? error.message : String(error)}`,
          toolUseID: request.tool_use_id
        });
      });
    }, []),
    cancel = SV.useCallback((requestId: any): any => {
      let abortController = pendingControllers.current.get(requestId);
      if (abortController) pendingControllers.current.delete(requestId), abortController.abort();
    }, []);
  return SV.useEffect((): any => {
    let controllers = pendingControllers.current;
    return (): any => {
      for (let [requestId, abortController] of controllers) controllers.delete(requestId), sendResponseRef.current(requestId, {
        behavior: "deny",
        message: "Permission dispatcher unmounted"
      }), abortController.abort();
    };
  }, [sessionKey]), {
    dispatch: dispatch,
    cancel: cancel
  };
}
var SV;
var eBo = b((): any => {
  gZ();
  pJl();
  ZFo();
  Wu();
  po();
  SV = x(et(), 1);
});

export {etr,SV,eBo};
