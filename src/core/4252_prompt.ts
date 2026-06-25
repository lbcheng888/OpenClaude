// @ts-nocheck
import {qt as Wt,tn as Xt} from "../config/0230_encoding.ts";
import {nmt as kut,rb as eb} from "../permissions/5211_level.ts";
import {vc as jc} from "../api/3886_level.ts";
import {Kl as Uc,po as lo} from "../tools/5224_userPromptCount.ts";
import {_1 as J1,kD as mP} from "../api/2754_actualTokens.ts";
import {i2 as x2,pd as Pp} from "../../vendor/m706.ts";
import {getSmallFastModel as Sw,Ro as Fo} from "../permissions/1458_swapShrinksContextWindow.ts";
import {b} from "../../runtime.ts";
// @ts-nocheck
function WKq(toJsonSchema, context, onProgress) {
  function createSamplingTool(toolName, getModel) {
    return async (prompt, schema) => {
      if (typeof prompt !== "string") throw Error(`${toolName}: prompt must be a string`);
      let outputSchema;
      if (schema !== undefined) {
        let parsedSchema;
        try {
          parsedSchema = Wt(toJsonSchema(schema));
        } catch {
          throw Error(`${toolName}: schema must be JSON-serializable`);
        }
        if (parsedSchema === null || typeof parsedSchema !== "object" || Array.isArray(parsedSchema)) throw Error(`${toolName}: schema must be an object`);
        outputSchema = PKq(parsedSchema);
      }
      let toolUseId = `repl_${lxK.randomUUID()}`,
        toolInput = {
          prompt: prompt.slice(0, 200)
        };
      onProgress?.({
        type: "progress",
        toolUseID: toolUseId,
        data: {
          type: "repl_tool_call",
          toolName: toolName,
          toolInput: toolInput,
          toolUseId: toolUseId,
          phase: "start"
        }
      });
      try {
        let response = await kut({
            systemPrompt: jc([]),
            userPrompt: prompt,
            outputFormat: outputSchema ? {
              type: "json_schema",
              schema: outputSchema
            } : undefined,
            signal: context.abortController.signal,
            options: {
              model: getModel(),
              querySource: "repl_sampling",
              agents: [],
              isNonInteractiveSession: context.options.isNonInteractiveSession,
              hasAppendSystemPrompt: false,
              mcpTools: [],
              agentContext: context.agentContext
            }
          }),
          responseText = Uc(response.message.content);
        if (J1(responseText)) throw Error(responseText);
        let result = outputSchema ? Wt(x2(responseText)) : responseText;
        return onProgress?.({
          type: "progress",
          toolUseID: toolUseId,
          data: {
            type: "repl_tool_call",
            toolName: toolName,
            toolInput: toolInput,
            toolUseId: toolUseId,
            phase: "complete",
            result: result
          }
        }), result;
      } catch (error) {
        let errorMessage = error instanceof Error ? error.message : String(error);
        throw onProgress?.({
          type: "progress",
          toolUseID: toolUseId,
          data: {
            type: "repl_tool_call",
            toolName: toolName,
            toolInput: toolInput,
            toolUseId: toolUseId,
            phase: "error",
            error: errorMessage
          }
        }), error;
      }
    };
  }
  let samplingTool = createSamplingTool("haiku", Sw);
  return {
    haiku: samplingTool,
    opus: samplingTool,
    sonnet: samplingTool,
    fable: samplingTool
  };
}
function PKq(schema) {
  if (schema === null || typeof schema !== "object") return schema;
  if (Array.isArray(schema)) return schema.map(PKq);
  let source = schema,
    result = {};
  for (let key of Object.keys(source)) result[key] = PKq(source[key]);
  if (result.type === "object" && !("additionalProperties" in result)) result.additionalProperties = false;
  return result;
}
var lxK;
var nxK = b(() => {
  eb();
  mP();
  Pp();
  lo();
  Fo();
  Xt();
  lxK = require("crypto");
});
export {WKq as u_o,PKq as c_o,lxK as $ja,nxK as qja};
