// @ts-nocheck
import {dl,Ed,dn} from "../config/0137_namespace.ts";
import {Ne} from "../../vendor/m583.ts";
import {getAdditionalDirectoriesForClaudeMd as KH,lt} from "../session/0132_sent.ts";
import {b} from "../../runtime.ts";
import {Ir} from "../../vendor/m584.ts";
// @ts-nocheck
function setNodeIgnoreBrand(value) {
  nodeIgnoreBrand = value;
}
function getNodeIgnoreBrand() {
  return nodeIgnoreBrand;
}
var nodeIgnoreBrand;
function Vl(e, t) {
  if (dl() && !SIMPLE_MODE_DISABLED_FEATURES[e]) return true;
  if (Ed() && !t?.explicitlyRequested) return jld[e];
  return false;
}
function isFeatureDisabled() {
  return Boolean(Ne.CLAUDE_CODE_DISABLE_CLAUDE_MDS || Vl("claudeMd", {
    explicitlyRequested: KH().length > 0
  }));
}
var jld, SIMPLE_MODE_DISABLED_FEATURES;
var SAFE_MODE_ENABLED_FEATURES = b(() => {
  lt();
  Ir();
  dn();
  jld = {
    claudeMd: true,
    skills: true,
    workflows: false,
    plugins: true,
    pluginMonitors: false,
    themes: false,
    hooks: true,
    statusLine: false,
    fileSuggestion: false,
    mcpAutoDiscovered: false,
    mcpClaudeAi: false,
    mcpAgentFrontmatter: true,
    agents: true,
    outputStyles: false,
    lspServers: true,
    keybindings: false
  }, SIMPLE_MODE_DISABLED_FEATURES = {
    claudeMd: false,
    skills: false,
    workflows: false,
    plugins: false,
    pluginMonitors: false,
    themes: false,
    hooks: true,
    statusLine: true,
    fileSuggestion: true,
    mcpAutoDiscovered: false,
    mcpClaudeAi: false,
    mcpAgentFrontmatter: false,
    agents: false,
    outputStyles: false,
    lspServers: false,
    keybindings: false
  };
});

export {setNodeIgnoreBrand as CDt,getNodeIgnoreBrand as Ybn,nodeIgnoreBrand as Zbi,Vl as buildMcpToolName,isFeatureDisabled as Qse,jld,SIMPLE_MODE_DISABLED_FEATURES as Yld,SAFE_MODE_ENABLED_FEATURES as ky};
