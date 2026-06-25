// @ts-nocheck
import {b} from "../../runtime.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {lt as ct,getSessionId as kt} from "../session/0132_sent.ts";
import {ri as Ri,Ks as ai} from "./2235_userFacingName.ts";
import {oH as Ok,HE as gE} from "../agent/3332_id.ts";
import {Ato as jYr,pat as Kot} from "../../vendor/m3332.ts";
import {cga as Uaa,lga as Faa,aga as Baa} from "../../vendor/m3333.ts";
import {ve as Re} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {LO as aL} from "../../vendor/m2707.ts";
// @ts-nocheck
var getTodoWriteInputSchema, getTodoWriteOutputSchema, TodoWriteTool;
var initTodoWriteModule = b(() => {
  Xr();
  ct();
  Ri();
  Ok();
  jYr();
  Uaa();
  getTodoWriteInputSchema = Re(() => E.strictObject({
    todos: Kot().describe("The updated todo list")
  })), getTodoWriteOutputSchema = Re(() => E.object({
    oldTodos: Kot().describe("The todo list before the update"),
    newTodos: Kot().describe("The todo list after the update")
  })), TodoWriteTool = ai({
    name: aL,
    searchHint: "manage the session task checklist",
    maxResultSizeChars: 1e5,
    strict: true,
    async description() {
      return Faa;
    },
    async prompt({
      model: e
    }) {
      return Baa(e);
    },
    get inputSchema() {
      return getTodoWriteInputSchema();
    },
    get outputSchema() {
      return getTodoWriteOutputSchema();
    },
    userFacingName() {
      return "";
    },
    shouldDefer: true,
    isEnabled() {
      return !gE();
    },
    toAutoClassifierInput(e) {
      return `${e.todos.length} items`;
    },
    async checkPermissions(e) {
      return {
        behavior: "allow",
        updatedInput: e
      };
    },
    renderToolUseMessage() {
      return null;
    },
    async call({
      todos: e
    }, t) {
      let n = t.getAppState(),
        r = t.agentId ?? kt(),
        o = n.todos[r] ?? [],
        i = e.every(a => a.status === "completed") ? [] : e;
      return t.setAppState(a => ({
        ...a,
        todos: {
          ...a.todos,
          [r]: i
        }
      })), {
        data: {
          oldTodos: o,
          newTodos: e
        }
      };
    },
    mapToolResultToToolResultBlockParam(e, t) {
      return {
        tool_use_id: t,
        type: "tool_result",
        content: "Todos have been modified successfully. Ensure that you continue to use the todo list to track your progress. Please proceed with the current tasks if applicable"
      };
    }
  });
});
export {getTodoWriteInputSchema as kep,getTodoWriteOutputSchema as Hep,TodoWriteTool as SIe,initTodoWriteModule as OOn};
