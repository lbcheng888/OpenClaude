// @ts-nocheck
import {b} from "../runtime.ts";
function uYt(e){let t=!1,n,r={addDir:[],pluginDir:[],pluginDirNoMcp:[],settings:void 0,mcpConfig:[],strictMcpConfig:!1},o=[],s={"--cwd":(i)=>{n=i},"--settings":(i)=>{r.settings=i},"--add-dir":(i)=>r.addDir.push(i),"--plugin-dir":(i)=>r.pluginDir.push(i),"--plugin-dir-no-mcp":(i)=>r.pluginDirNoMcp.push(i),"--mcp-config":(i)=>r.mcpConfig.push(i)};for(let i=0;i<e.length;i++){let a=e[i];if(a==="agents"&&!t){t=!0;continue}if(a==="--strict-mcp-config"){r.strictMcpConfig=!0;continue}let l=a.indexOf("="),c=l===-1?a:a.slice(0,l),u=Object.hasOwn(s,c)?s[c]:void 0;if(u){if(l!==-1)u(a.slice(l+1));else if(i+1<e.length)u(e[++i]);else o.push(a);continue}o.push(a)}return{hasAgentsPositional:t,cwdFilter:n,config:r,rest:o}}
function sKe(e,t){let n=(r,o)=>r===""||o&&r.trimStart().startsWith("{")?r:t(r);return{settings:e.settings===void 0?void 0:n(e.settings,!0),pluginDir:e.pluginDir.map((r)=>n(r,!1)),pluginDirNoMcp:e.pluginDirNoMcp.map((r)=>n(r,!1)),addDir:e.addDir.map((r)=>n(r,!1)),mcpConfig:e.mcpConfig.map((r)=>n(r,!0)),strictMcpConfig:e.strictMcpConfig}}
function iKe(e){return[...e.settings?["--settings",e.settings]:[],...e.pluginDir.flatMap((t)=>["--plugin-dir",t]),...e.pluginDirNoMcp.flatMap((t)=>["--plugin-dir-no-mcp",t]),...e.addDir.flatMap((t)=>["--add-dir",t]),...e.mcpConfig.flatMap((t)=>["--mcp-config",t]),...e.strictMcpConfig?["--strict-mcp-config"]:[]]}
function aKe(e){return e}
function Ve(e){return aKe(e)}
function Le(e){return aKe(e)}
function Bo(e){return e==null?void 0:aKe(e)}
function HN(e){return aKe(String(e))}
function pre(e){return aKe([...e].sort().join(","))}
function isKeybindingCustomizationEnabled(e){return aKe(e)}
function DTt(e,t){return t?isKeybindingCustomizationEnabled(e):void 0}
function dYt(e){let t=e.indexOf("--handle-uri");if(t===-1||!e[t+1])return null;if(e.length>t+2)return`claude: rejected deep-link invocation \u2014 unexpected arguments after the URI.
`+"The OS protocol handler passes exactly `--handle-uri <uri>`; extra arguments indicate argument injection via the URL. If invoking --handle-uri manually, place other flags before it.";return null}
function Fg(){return`claude-code/${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION}`}
function getClientPlatform(){switch(process.env.CLAUDE_CODE_ENTRYPOINT){case"claude-vscode":return"claude_code_vscode";case"remote":case"remote_baku":case"remote_cowork":case"remote_desktop":case"remote_mobile":return"claude_code_remote";case"claude-in-teams":return"claude_code_remote";case"sdk-cli":case"sdk-ts":case"sdk-py":return"claude_code_sdk";case"mcp":return"claude_code_mcp";case"claude-code-github-action":return"claude_code_github_action";case"local-agent":return"claude_code_local_agent";case"claude_in_slack":return"claude_in_slack";case"claude-in-slack":return"claude-in-slack";case"cli":default:return"claude_code_cli"}}
function tsr(e){return`claude-code_${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.VERSION.replace(/\./g,"-")}_${e}`}
function pYt(){if(!process.env.AI_AGENT||process.env.AI_AGENT.startsWith("claude-code_")||process.env.AI_AGENT.startsWith("claude-code/"))process.env.AI_AGENT=tsr("harness")}
function IU(e={ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://code.claude.com/docs/en/overview",VERSION:"2.1.190",FEEDBACK_CHANNEL:"https://github.com/anthropics/claude-code/issues",BUILD_TIME:"2026-06-24T02:21:52Z",GIT_SHA:"c1e566ee5380a4c29ddd0fd0a742361e013cebd0"}.BUILD_REF_NAME){return""}
function Obc(){this.__data__=[],this.size=0}
var u3o;
var d3o=b(()=>{u3o=Obc});
export {uYt,sKe,iKe,aKe,Ve,Le,Bo,HN,pre,isKeybindingCustomizationEnabled,DTt,dYt,Fg,getClientPlatform,tsr,pYt,IU,Obc,u3o,d3o};
