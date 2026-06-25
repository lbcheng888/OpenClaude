// @ts-nocheck
import {createBridgeClient,Qcr} from "../src/permissions/0245_deviceId.ts";
import {yYo,TYo} from "./m428.ts";
import {rQt,E7e} from "./m243.ts";
import {Ipe,iAt} from "../src/session/0428_level.ts";
import {EK,_5,Qy} from "../src/tools/0325_ttl.ts";
import {rEt,BROWSER_TOOLS,GWo,A7e} from "../src/tools/0246_name.ts";
import {$tn,qtn} from "./m429.ts";
import {b} from "../runtime.ts";
function createChromeSocketClient(e){return e.bridgeConfig?createBridgeClient(e):e.getSocketPaths?yYo(e):rQt(e)}
function createClaudeForChromeMcpServer(e,t){let{serverName:n,logger:r}=e,o=t??createChromeSocketClient(e),s=new Ipe({name:n,version:"1.0.0"},{capabilities:{tools:{},logging:{}}});return s.setRequestHandler(EK,async()=>{if(e.isDisabled?.())return{tools:[]};let i=rEt(e.askUserToolName);return{tools:[...(e.bridgeConfig?BROWSER_TOOLS:BROWSER_TOOLS.filter((l)=>!GWo.has(l.name))).map((l)=>l.name==="list_connected_browsers"?{...l,description:`${l.description} ${i}`}:l),...e.hostTools?.()??[]]}}),s.setRequestHandler(_5,async(i)=>(r.info(`[${n}] Executing tool: ${i.params.name}`),$tn(e,o,i.params.name,i.params.arguments||{}))),o.setNotificationHandler((i)=>{r.info(`[${n}] Forwarding MCP notification: ${i.method}`),s.notification({method:i.method,params:i.params}).catch((a)=>{r.info(`[${n}] Failed to forward MCP notification: ${a.message}`)})}),s}
var bYo=b(()=>{iAt();Qy();Qcr();A7e();E7e();TYo();qtn()});
export {createChromeSocketClient,createClaudeForChromeMcpServer,bYo};
