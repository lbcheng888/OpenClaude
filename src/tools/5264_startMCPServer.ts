// @ts-nocheck
import {ft,b} from "../../runtime.ts";
import {markTelemetryString as O_,KO} from "../agent/3295_code.ts";
import {t1e,Ktn} from "../../vendor/m433.ts";
import {Utl,RTo,$q} from "./4352_displayName.ts";
import {_$,eB,Gk} from "../../vendor/m2727.ts";
import {Ipe,iAt} from "../session/0428_level.ts";
import {EK,_5,Qy} from "./0325_ttl.ts";
import {KM,rl,ri} from "./2235_userFacingName.ts";
import {gL,cx} from "../artifact/4323_cx.ts";
import {HDe,QWn} from "../../vendor/m4434.ts";
import {kl,lh} from "../../vendor/m2739.ts";
import {ch,ef} from "../../vendor/m2794.ts";
import {initProfileReportModule as Hm,Ph} from "../agent/1459_agentType.ts";
import {getMainLoopModel as gs,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {$W,gIe} from "../../vendor/m3317.ts";
import {dgt,yjn} from "../../vendor/m4853.ts";
import {gjn,jHo} from "../../vendor/m4851.ts";
import {hjn,cgt} from "../../vendor/m4850.ts";
import {_jn,ugt} from "../../vendor/m4852.ts";
import {logForDebugging as A,qe} from "../config/0236_setHasFormattedOutput.ts";
import {hasPermissionsToUseTool as lx,ly} from "./5218_toolAlwaysAllowedRule.ts";
import {fS,po} from "./5224_userPromptCount.ts";
import {TeamDeleteToolName as Pe,tn} from "../config/0230_encoding.ts";
import {m_o,Hqt} from "../../vendor/m4253.ts";
import {$c,XL,Ct} from "../../vendor/m197.ts";
import {Fae,MHe} from "../config/3172_maxSizeBytes.ts";
import {Ie,vn} from "../session/0621_length.ts";
import {pIo,Hjn} from "../../vendor/m4875.ts";
// Module exports map
var CWl = {};
ft(CWl, {
  startMCPServer: () => startMCPServer,
  createMCPServer: () => createMCPServer
});

// Starts the MCP server: initializes the agent context, creates the server,
// then connects it to an in-memory MCP transport (t1e).
async function startMCPServer(agentArg: any, debugFlag: any, verboseFlag: any) {
  O_(agentArg); // initialize agent context with the given arg
  let mcpServer = createMCPServer(debugFlag, verboseFlag),
    transport = new t1e(); // in-memory stdio-less transport
  await mcpServer.connect(transport);
}

// Builds and returns a configured MCP server instance.
// Registers two request handlers: one to list tools, one to call a tool.
function createMCPServer(debugFlag: any, verboseFlag: any) {
  Utl(RTo()); // initialize tool display-name / icon registry
  let readFileState = _$(eB),
    // build default read-file state
    mcpServer = new Ipe({
      name: "claude/tengu",
      version: {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://code.claude.com/docs/en/overview",
        VERSION: "2.1.190",
        FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
        BUILD_TIME: "2026-06-24T02:21:52Z",
        GIT_SHA: "c1e566ee5380a4c29ddd0fd0a742361e013cebd0"
      }.VERSION
    }, {
      capabilities: {
        tools: {}
      }
    });

  // Handler: list all available tools with generated descriptions and JSON schemas
  return mcpServer.setRequestHandler(EK, async () => {
    let toolPermCtx = KM(),
      // get live tool permission context
      toolList = gL(toolPermCtx); // resolve tool definitions from context
    return {
      tools: await Promise.all(toolList.map(async (toolDef: any) => ({
        ...toolDef,
        description: await toolDef.prompt({
          getToolPermissionContext: async () => toolPermCtx,
          tools: toolList,
          agents: []
        }),
        inputSchema: HDe(toolDef.inputSchema),
        // convert to MCP-compatible JSON Schema
        outputSchema: void 0
      })))
    };
  }),
  // Handler: invoke a named tool with given arguments
  mcpServer.setRequestHandler(_5, async ({
    params: {
      name: toolName,
      arguments: toolArgs
    }
  }) => {
    let toolPermCtx = KM(),
      // get live tool permission context
      toolList = gL(toolPermCtx),
      // resolve tool definitions
      matchedTool = rl(toolList, toolName); // look up tool by name
    if (!matchedTool) throw Error(`Tool ${toolName} not found`);

    // Assemble the invocation context (injected into every tool call)
    let callCtx = {
      abortController: kl(),
      // cancellation support
      messageQueue: ch,
      // shared async message queue
      agentContext: Hm(),
      // current agent context
      options: {
        commands: TPm,
        // available slash commands (initialized in AWl)
        tools: toolList,
        mainLoopModel: gs(),
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
      getAppState: () => $W(),
      setAppState: () => {},
      getMcp: () => $W().mcp,
      getWebBrowser: () => $W().webBrowser,
      setToolPermissionContext: () => {},
      taskRegistry: dgt,
      sessionHooksRegistry: gjn,
      getReplContexts: () => ({}),
      setReplContext: () => {},
      setWebBrowserSlice: () => {},
      setArtifactReadVersion: () => {},
      agentLifecycle: hjn,
      teammateColors: _jn,
      // root tool surface available to spawned subagents
      rootToolSurface: {
        tools: toolList,
        mainLoopModel: gs()
      },
      messages: [],
      turnStartIndex: 0,
      readFileState: readFileState,
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
        return A(`MCP server: ${errMsg}`, {
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
        return A(`MCP server: ${errMsg}`, {
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
      let callResult = await matchedTool.call(toolArgs ?? {}, callCtx, lx, fS({
        content: []
      }));
      return {
        content: [{
          type: "text",
          text: typeof callResult === "string" ? callResult : Pe(callResult.data)
        }]
      };
    } catch (err: any) {
      // Stringify error: use m_o for Error instances (extracts cause chain), String() otherwise
      let errMsg = (err instanceof Error ? m_o(err) : [String(err)]).filter(Boolean).join(`
`).trim() || "Error";
      // Known error categories: log and surface; unknown: fatal via Ie
      if (err instanceof $c || err instanceof XL || err instanceof Fae) A(`MCP server tool call '${toolName}' failed: ${errMsg}`, {
        level: "error"
      });else Ie(err);
      return {
        isError: !0,
        content: [{
          type: "text",
          text: errMsg
        }]
      };
    }
  }), mcpServer; // return the configured server instance
}

// Lazy-initialized command list; populated in AWl init block
var TPm;

// Module init: side-effect all transitive dependencies, then set TPm to default command set [Hjn]
var AWl = b(() => {
  iAt();
  Ktn();
  Qy();
  $q();
  gIe();
  pIo();
  ri();
  MHe();
  cx();
  lh();
  Ph();
  cgt();
  qe();
  Ct();
  Gk();
  jHo();
  vn();
  ef();
  po();
  Ro();
  ly();
  KO();
  tn();
  ugt();
  yjn();
  Hqt();
  QWn();
  TPm = [Hjn];
});

export {CWl,startMCPServer,createMCPServer,TPm,AWl};
