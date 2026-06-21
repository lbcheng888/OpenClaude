// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {localPlatformLabel,createBridgeClient,WAIT_MAX_DURATION_S,PEER_WAIT_TIMEOUT_MS,DISCOVERY_TIMEOUT_MS,DEFAULT_TOOL_CALL_TIMEOUT_MS,BridgeClient,Csr} from "../src/permissions/0243_deviceId.ts";
import {createClaudeForChromeMcpServer,createChromeSocketClient,wWo} from "./m428.ts";
import {clearBrowserResolution,cZt} from "./m427.ts";
import {ToolCallTimeoutError,SocketConnectionError,NoExtensionConnectedError,ExtensionDisconnectedMidCallError,vGe} from "./m241.ts";
import {BROWSER_TOOLS,RGe} from "../src/tools/0244_name.ts";
var RWo={};
isFullscreenWithTTY(RWo,{localPlatformLabel:()=>localPlatformLabel,createClaudeForChromeMcpServer:()=>createClaudeForChromeMcpServer,createChromeSocketClient:()=>createChromeSocketClient,createBridgeClient:()=>createBridgeClient,clearBrowserResolution:()=>clearBrowserResolution,WAIT_MAX_DURATION_S:()=>WAIT_MAX_DURATION_S,ToolCallTimeoutError:()=>ToolCallTimeoutError,SocketConnectionError:()=>SocketConnectionError,PEER_WAIT_TIMEOUT_MS:()=>PEER_WAIT_TIMEOUT_MS,NoExtensionConnectedError:()=>NoExtensionConnectedError,ExtensionDisconnectedMidCallError:()=>ExtensionDisconnectedMidCallError,DISCOVERY_TIMEOUT_MS:()=>DISCOVERY_TIMEOUT_MS,DEFAULT_TOOL_CALL_TIMEOUT_MS:()=>DEFAULT_TOOL_CALL_TIMEOUT_MS,BridgeClient:()=>BridgeClient,BROWSER_TOOLS:()=>BROWSER_TOOLS});
var Sdr=b(()=>{Csr();RGe();wWo();cZt();vGe()});
export {RWo,Sdr};
