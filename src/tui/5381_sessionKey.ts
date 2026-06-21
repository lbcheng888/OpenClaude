// @ts-nocheck
import {useTheme as _K,SZ as kt} from "../../vendor/m2274.ts";
import {R8l as pI4,x8l as BI4} from "../tools/5380_name.ts";
import {jut as j4_,u3n as $C6} from "../../vendor/m4201.ts";
import {SS as qJ,lo as zq} from "../tools/5190_userPromptCount.ts";
import {ec as b4,Dd as X3} from "../../vendor/m687.ts";
import {d9n as pE6} from "../../vendor/m4158.ts";
import {b as L,M as u} from "../../runtime.ts";
import {Te as WH} from "../../vendor/m2253.ts";
// FIXME: unverified name: un6
/* Bridges remote can_use_tool requests into the local permission dialog flow. */
/* Restored Claude Code 2.1.177 module: Remote permission dispatcher hook..
Only local names, TypeScript annotations, and comments were restored; control flow and literals are preserved. */
function un6({
  sessionKey: H,
  sendResponse: _,
  requestDialog: q,
  toolRegistry: K,
  toolPermissionContext: O,
  canInterruptTurn: T
}: any): any {
  let z = $d.useRef(_);
  z.current = _;
  let $ = $d.useRef(q);
  $.current = q;
  let Y = $d.useRef(K);
  Y.current = K;
  let A = $d.useRef(O);
  A.current = O;
  let w = $d.useRef(T);
  w.current = T;
  let [f] = _K(),
    j = $d.useRef(f);
  j.current = f;
  let J = $d.useRef(new Map()),
    D = $d.useCallback((X: any): any => {
      if (X.request.subtype !== "can_use_tool") return;
      let {
          request: P,
          request_id: Z
        } = X,
        W = J.current,
        G = pI4(P.tool_name, Y.current),
        R = P.description ?? `${P.tool_name} requires permission`,
        h = new AbortController();
      W.set(Z, h), j4_({
        tool: G,
        input: P.input,
        description: R,
        toolUseID: P.tool_use_id,
        permissionResult: {
          behavior: "ask",
          message: R,
          suggestions: P.permission_suggestions,
          blockedPath: P.blocked_path
        },
        assistantMessage: qJ({
          content: [{
            type: "tool_use",
            id: P.tool_use_id,
            name: P.tool_name,
            input: P.input
          }]
        }),
        theme: j.current,
        toolPermissionContext: A.current,
        remoteWorkspace: b4(),
        signal: h.signal
      }).then(({
        dialog: y,
        descriptor: E
      }: any): any => {
        if (!W.has(Z)) return Promise.resolve({
          behavior: "cancelled"
        });
        return $.current(y, E, {
          signal: h.signal
        });
      }).then((y: any): any => {
        if (!W.delete(Z)) return;
        switch (y.behavior) {
          case "allow":
            z.current(Z, {
              behavior: "allow",
              updatedInput: y.updatedInput,
              ...(y.permissionUpdates?.length && {
                updatedPermissions: y.permissionUpdates
              }),
              toolUseID: P.tool_use_id
            });
            return;
          case "deny":
            {
              let E = w.current && pE6({
                feedback: y.feedback,
                contentBlocks: y.contentBlocks,
                isSubagent: !!P.agent_id
              });
              z.current(Z, {
                behavior: "deny",
                message: y.feedback ?? "User denied permission",
                ...(E && {
                  interrupt: !0
                }),
                toolUseID: P.tool_use_id
              });
              return;
            }
          case "cancelled":
            z.current(Z, {
              behavior: "deny",
              message: "User aborted",
              ...(w.current && {
                interrupt: !0
              }),
              toolUseID: P.tool_use_id
            });
            return;
        }
      }).catch((y: any): any => {
        if (!W.delete(Z)) return;
        z.current(Z, {
          behavior: "deny",
          message: `Permission dialog failed: ${y instanceof Error ? y.message : String(y)}`,
          toolUseID: P.tool_use_id
        });
      });
    }, []),
    M = $d.useCallback((X: any): any => {
      let P = J.current.get(X);
      if (P) J.current.delete(X), P.abort();
    }, []);
  return $d.useEffect((): any => {
    let X = J.current;
    return (): any => {
      for (let [P, Z] of X) X.delete(P), z.current(P, {
        behavior: "deny",
        message: "Permission dispatcher unmounted"
      }), Z.abort();
    };
  }, [H]), {
    dispatch: D,
    cancel: M
  };
}
var $d;
var hZq = L((): any => {
  kt();
  BI4();
  X3();
  zq();
  $C6();
  $d = u(WH(), 1);
});

export {un6 as ZJn,$d as nV,hZq as LOo};
