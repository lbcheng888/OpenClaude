// @ts-nocheck
import {createBridgeClient,Csr} from "../src/permissions/0243_deviceId.ts";
import {EWo,CWo} from "./m426.ts";
import {CYt,vGe} from "./m241.ts";
import {bpe,OSt} from "../src/session/0426_level.ts";
import {XV,t8,YT} from "../src/tools/0323_ttl.ts";
import {Hyt,BROWSER_TOOLS,Y3o,RGe} from "../src/tools/0244_name.ts";
import {lZt,cZt} from "./m427.ts";
import {b} from "../runtime.ts";
function createChromeSocketClient(e){return e.bridgeConfig?createBridgeClient(e):e.getSocketPaths?EWo(e):CYt(e)}
function createClaudeForChromeMcpServer(e,t){let{serverName:n,logger:r}=e,o=t??createChromeSocketClient(e),s=new bpe({name:n,version:"1.0.0"},{capabilities:{tools:{},logging:{}}});return s.setRequestHandler(XV,async()=>{if(e.isDisabled?.())return{tools:[]};let i=Hyt(e.askUserToolName);return{tools:[...(e.bridgeConfig?BROWSER_TOOLS:BROWSER_TOOLS.filter((l)=>!Y3o.has(l.name))).map((l)=>l.name==="list_connected_browsers"?{...l,description:`${l.description} ${i}`}:l),...e.hostTools?.()??[]]}}),s.setRequestHandler(t8,async(i)=>(r.info(`[${n}] Executing tool: ${i.params.name}`),lZt(e,o,i.params.name,i.params.arguments||{}))),o.setNotificationHandler((i)=>{r.info(`[${n}] Forwarding MCP notification: ${i.method}`),s.notification({method:i.method,params:i.params}).catch((a)=>{r.info(`[${n}] Failed to forward MCP notification: ${a.message}`)})}),s}
var wWo=b(()=>{OSt();YT();Csr();RGe();vGe();CWo();cZt()});
export {createChromeSocketClient,createClaudeForChromeMcpServer,wWo};
