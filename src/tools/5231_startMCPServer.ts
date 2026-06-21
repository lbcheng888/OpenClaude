// @ts-nocheck
import {isFullscreenWithTTY,b} from "../../runtime.ts";
import {x_,initXL} from "../agent/3279_code.ts";
import {lMe,mZt} from "../../vendor/m431.ts";
import {gYa,kfo,x6} from "./4332_displayName.ts";
import {Y$,DF,xk} from "../../vendor/m2715.ts";
import {bpe,OSt} from "../session/0426_level.ts";
import {XV,t8,YT} from "./0323_ttl.ts";
import {O1,Cl,Ri} from "./2227_userFacingName.ts";
import {JL,Y0} from "../artifact/4303_Y0.ts";
import {P0e,P6n} from "../../vendor/m4412.ts";
import {Jl,ch} from "../../vendor/m2727.ts";
import {uh,sA} from "../../vendor/m2782.ts";
import {Af,S_} from "../agent/1454_agentType.ts";
import {getMainLoopModel,Mo} from "../permissions/1453_swapShrinksContextWindow.ts";
import {getDefaultAppState,kke} from "../../vendor/m3301.ts";
import {Qmt,kGn} from "../../vendor/m4821.ts";
import {RGn,kCo} from "../../vendor/m4819.ts";
import {wGn,Jmt} from "../../vendor/m4818.ts";
import {xGn,Xmt} from "../../vendor/m4820.ts";
import {logForDebugging,qe} from "../config/0234_setHasFormattedOutput.ts";
import {hasPermissionsToUseTool,ay} from "./5184_toolAlwaysAllowedRule.ts";
import {SS,lo} from "./5190_userPromptCount.ts";
import {Le,Xt} from "../config/0228_encoding.ts";
import {gpo,p3t} from "../../vendor/m4235.ts";
import {vu,BM,bt} from "../../vendor/m195.ts";
import {Fae,Kxe} from "../config/3156_maxSizeBytes.ts";
import {De,Rn} from "../session/0615_length.ts";
import {KCo,UGn} from "../../vendor/m4843.ts";
// Module exports map
var P2l = {};
isFullscreenWithTTY(P2l, {
  startMCPServer: () => startMCPServer,
  createMCPServer: () => createMCPServer
});

// Starts the MCP server: initializes the agent context, creates the server,
// then connects it to an in-memory MCP transport (lMe).
async function startMCPServer(agentArg: any, debugFlag: any, verboseFlag: any) {
  x_(agentArg); // initialize agent context with the given arg
  let mcpServer = createMCPServer(debugFlag, verboseFlag),
    transport = new lMe(); // in-memory stdio-less transport
  await mcpServer.connect(transport);
}

// Builds and returns a configured MCP server instance.
// Registers two request handlers: one to list tools, one to call a tool.
function createMCPServer(debugFlag: any, verboseFlag: any) {
  gYa(kfo()); // initialize tool display-name / icon registry
  let permCtx = Y$(DF),
    // build default tool permission context
    r = new bpe({
      name: "claude/tengu",
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.185",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-20T06:38:30Z",
        GIT_SHA: "9d0bb50cc439a8bbfdbf96567a55bd0e353e9333"
      }.VERSION
    }, {
      capabilities: {
        tools: {}
      }
    });

  // Handler: list all available tools with generated descriptions and JSON schemas
  return r.setRequestHandler(XV, async () => {
    let toolPermCtx = O1(),
      // get live tool permission context
      toolList = JL(toolPermCtx); // resolve tool definitions from context
    return {
      tools: await Promise.all(toolList.map(async (toolDef: any) => ({
        ...toolDef,
        description: await toolDef.prompt({
          getToolPermissionContext: async () => toolPermCtx,
          tools: toolList,
          agents: []
        }),
        inputSchema: P0e(toolDef.inputSchema),
        // convert to MCP-compatible JSON Schema
        outputSchema: void 0
      })))
    };
  }),
  // Handler: invoke a named tool with given arguments
  r.setRequestHandler(t8, async ({
    params: {
      name: toolName,
      arguments: toolArgs
    }
  }) => {
    let toolPermCtx = O1(),
      // get live tool permission context
      toolList = JL(toolPermCtx),
      // resolve tool definitions
      matchedTool = Cl(toolList, toolName); // look up tool by name
    if (!matchedTool) throw Error(`Tool ${toolName} not found`);

    // Assemble the invocation context (injected into every tool call)
    let callCtx = {
      abortController: Jl(),
      // cancellation support
      messageQueue: uh,
      // shared async message queue
      agentContext: Af(),
      // current agent context
      options: {
        commands: ivm,
        // available slash commands (initialized in O2l)
        tools: toolList,
        mainLoopModel: getMainLoopModel(),
        thinkingConfig: {
          type: "disabled"
        },
        mcpClients: [],
        mcpResources: {},
        isNonInteractiveSession: !0,
        // MCP server always runs non-interactively
        debug: debugFlag,
        verbose: verboseFlag,
        agentDefinitions: {
          activeAgents: [],
          allAgents: []
        }
      },
      getAppState: () => getDefaultAppState(),
      setAppState: () => {},
      getMcp: () => getDefaultAppState().mcp,
      getWebBrowser: () => getDefaultAppState().webBrowser,
      setToolPermissionContext: () => {},
      taskRegistry: Qmt,
      sessionHooksRegistry: RGn,
      getReplContexts: () => ({}),
      setReplContext: () => {},
      setWebBrowserSlice: () => {},
      setArtifactReadVersion: () => {},
      agentLifecycle: wGn,
      teammateColors: xGn,
      messages: [],
      turnStartIndex: 0,
      readFileState: permCtx,
      // permCtx = n in original (Y$(DF))
      getFileHistoryState: () => {
        return;
      },
      applyFileHistoryOp: () => {},
      applyAttributionOp: () => {}
    };
    try {
      // Guard: check tool is currently enabled
      if (!matchedTool.isEnabled()) {
        let errMsg = `Tool ${toolName} is not enabled`;
        return logForDebugging(`MCP server: ${errMsg}`, {
          level: "error"
        }), {
          isError: !0,
          content: [{
            type: "text",
            text: errMsg
          }]
        };
      }
      // Guard: validate input arguments against tool schema
      let validationResult = await matchedTool.validateInput?.(toolArgs ?? {}, callCtx);
      if (validationResult && !validationResult.result) {
        let errMsg = `Tool ${toolName} input is invalid: ${validationResult.message}`;
        return logForDebugging(`MCP server: ${errMsg}`, {
          level: "error"
        }), {
          isError: !0,
          content: [{
            type: "text",
            text: errMsg
          }]
        };
      }
      // Execute tool and return its output encoded as MCP text content
      let callResult = await matchedTool.call(toolArgs ?? {}, callCtx, hasPermissionsToUseTool, SS({
        content: []
      }));
      return {
        content: [{
          type: "text",
          text: typeof callResult === "string" ? callResult : Le(callResult.data)
        }]
      };
    } catch (err: any) {
      // Stringify error: use gpo for Error instances (extracts cause chain), String() otherwise
      let errMsg = (err instanceof Error ? gpo(err) : [String(err)]).filter(Boolean).join(`
`).trim() || "Error";
      // Known error categories: log and surface; unknown: fatal via De
      if (err instanceof vu || err instanceof BM || err instanceof Fae) logForDebugging(`MCP server tool call '${toolName}' failed: ${errMsg}`, {
        level: "error"
      });else De(err);
      return {
        isError: !0,
        content: [{
          type: "text",
          text: errMsg
        }]
      };
    }
  }), r; // return the configured server instance
}

// Lazy-initialized command list; populated in O2l init block
var ivm;

// Module init: side-effect all transitive dependencies, then set ivm to default command set [UGn]
var O2l = b(() => {
  OSt();
  mZt();
  YT();
  x6();
  kke();
  KCo();
  Ri();
  Kxe();
  Y0();
  ch();
  S_();
  Jmt();
  qe();
  bt();
  xk();
  kCo();
  Rn();
  sA();
  lo();
  Mo();
  ay();
  initXL();
  Xt();
  Xmt();
  kGn();
  p3t();
  P6n();
  ivm = [UGn];
});
export {P2l,startMCPServer,createMCPServer,ivm,O2l};
