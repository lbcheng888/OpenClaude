// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {localPlatformLabel,createBridgeClient,WAIT_MAX_DURATION_S,PEER_WAIT_TIMEOUT_MS,DISCOVERY_TIMEOUT_MS,DEFAULT_TOOL_CALL_TIMEOUT_MS,BridgeClient,Qcr} from "../src/permissions/0245_deviceId.ts";
import {createClaudeForChromeMcpServer,createChromeSocketClient,bYo} from "./m430.ts";
import {clearBrowserResolution,qtn} from "./m429.ts";
import {ToolCallTimeoutError,SocketConnectionError,NoExtensionConnectedError,ExtensionDisconnectedMidCallError,E7e} from "./m243.ts";
import {BROWSER_TOOLS,A7e} from "../src/tools/0246_name.ts";
var EYo={};
ft(EYo,{localPlatformLabel:()=>localPlatformLabel,createClaudeForChromeMcpServer:()=>createClaudeForChromeMcpServer,createChromeSocketClient:()=>createChromeSocketClient,createBridgeClient:()=>createBridgeClient,clearBrowserResolution:()=>clearBrowserResolution,WAIT_MAX_DURATION_S:()=>WAIT_MAX_DURATION_S,ToolCallTimeoutError:()=>ToolCallTimeoutError,SocketConnectionError:()=>SocketConnectionError,PEER_WAIT_TIMEOUT_MS:()=>PEER_WAIT_TIMEOUT_MS,NoExtensionConnectedError:()=>NoExtensionConnectedError,ExtensionDisconnectedMidCallError:()=>ExtensionDisconnectedMidCallError,DISCOVERY_TIMEOUT_MS:()=>DISCOVERY_TIMEOUT_MS,DEFAULT_TOOL_CALL_TIMEOUT_MS:()=>DEFAULT_TOOL_CALL_TIMEOUT_MS,BridgeClient:()=>BridgeClient,BROWSER_TOOLS:()=>BROWSER_TOOLS});
var jhr=b(()=>{Qcr();A7e();bYo();qtn();E7e()});
export {EYo,jhr};
