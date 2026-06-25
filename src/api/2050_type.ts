// @ts-nocheck
import {Ne as Ge} from "../../vendor/m583.ts";
import {isFirstPartyProvider as Ac,Ps as si} from "./1287_usesFirstPartyModelIds.ts";
import {$3 as eK,vfe as qCe} from "../../vendor/m2048.ts";
import {b} from "../../runtime.ts";
import {Ir as Or} from "../../vendor/m584.ts";
// @ts-nocheck
function getClaudeDesignMcpUrl() {
  return CLAUDE_DESIGN_MCP_URL;
}
function setGrowthBookFlagReader(fn) {
  let previous = growthBookFlagReader;
  return growthBookFlagReader = fn, previous;
}
function isClaudeDesignEnabled() {
  let envVal = Ge.CLAUDE_CODE_ENABLE_DESIGN_MCP;
  if (envVal !== undefined) return envVal;
  return growthBookFlagReader?.(CLAUDE_DESIGN_GB_FLAG_KEY, false) ?? false;
}
function getFirstPartyBuiltinMcpServers() {
  if (!Ac()) return {};
  let servers = {};
  if (isClaudeDesignEnabled()) servers[CLAUDE_DESIGN_SERVER_NAME] = {
    type: "http",
    url: getClaudeDesignMcpUrl(),
    scope: "dynamic"
  };
  for (let server of Object.values(servers)) if ("url" in server && !eK(server.url)) throw Error("A built-in first-party MCP server URL is not on the first-party allowlist (FIRST_PARTY_MCP_PATH_PREFIXES / isFirstPartyAnthropicHost) \u2014 login-OAT auto-attach and bare-name rendering would not fire. Update firstPartyBuiltins.ts or authState.ts so they agree.");
  return servers;
}
var CLAUDE_DESIGN_SERVER_NAME = "claude_design",
  CLAUDE_DESIGN_MCP_URL = "https://api.anthropic.com/v1/design/mcp",
  CLAUDE_DESIGN_GB_FLAG_KEY = "tengu_omelette_whisk",
  growthBookFlagReader = null;
var firstPartyBuiltinsInit = b(() => {
  Or();
  si();
  qCe();
});
export {getClaudeDesignMcpUrl as Btd,setGrowthBookFlagReader as Bli,isClaudeDesignEnabled as tUr,getFirstPartyBuiltinMcpServers as gTn,CLAUDE_DESIGN_SERVER_NAME as HZe,CLAUDE_DESIGN_MCP_URL as Ftd,CLAUDE_DESIGN_GB_FLAG_KEY as Utd,growthBookFlagReader as eUr,firstPartyBuiltinsInit as gxt};
