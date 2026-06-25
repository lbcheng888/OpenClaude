// @ts-nocheck
import {ft,b,oo} from "../runtime.ts";
import {d1,lW,Zp,Vz} from "./m2705.ts";
import {dm,vs} from "./m2256.ts";
import {ow,su} from "./m2257.ts";
import {XR,readRoster,LO} from "./m2707.ts";
import {G9e,Nae,Aj} from "./m3168.ts";
import {zz} from "../src/config/2719_isDeferredTool.ts";
import {E9n,x$a} from "./m3978.ts";
import {m3i} from "../src/config/2711_WORKFLOW_TOOL_NAME.ts";
import {odt} from "./m3979.ts";
import {qh} from "./m2704.ts";
import {Rae} from "./m2814.ts";
import {hke} from "../src/artifact/2713_uuidSlugFromUrl.ts";
import {QR,Kz,wD,o_} from "../src/tools/2710_allErrors.ts";
import {j0,vD} from "../src/session/2702_resolveLoopFileFire.ts";
import {Urt} from "./m2706.ts";
import {Lk} from "../src/config/2259_R9r.ts";
import {v6n} from "../src/tools/4235_role.ts";
var Qql={};
ft(Qql,{isChromeMcpToolName:()=>isChromeMcpToolName,isAutoModeAllowlistedTool:()=>isAutoModeAllowlistedTool});
function isChromeMcpToolName(e){return TQn.some((t)=>e.startsWith(t))}
function Xql(e){return RIm.has(String(e?.action))}
function isAutoModeAllowlistedTool(e,t){if(SIm.has(e))return!0;if(EIm.has(e))return!0;if(CIm.has(e))return Xql(t);if(AIm.has(e)){let n=t?.actions;if(!Array.isArray(n)||n.length===0)return!1;return n.every(Xql)}return!1}
var Kql=null,zql,jql=null,Yql=null,Jql=null,TIm,SIm,TQn,EIm,CIm,AIm,RIm;
var Zql=b(()=>{d1();dm();ow();XR();G9e();zz();E9n();zql=oo(m3i).WORKFLOW_TOOL_NAME,TIm=[],SIm=new Set([vs,readRoster,su,odt,qh,Rae,Nae,Aj,hke,LO,QR,Kz,wD,j0,vD,lW,Zp,Urt,Vz,Lk,o_,...zql?[zql]:[],...Kql?[Kql]:[],...jql?[jql]:[],...Yql?[Yql]:[],v6n,...Jql?[Jql]:[],...TIm,x$a]),TQn=["mcp__claude-in-chrome__","mcp__Claude_in_Chrome__"];EIm=new Set(["find","get_page_text","gif_creator","list_connected_browsers","read_console_messages","read_network_requests","read_page","resize_window","select_browser","shortcuts_list","switch_browser","tabs_close_mcp","tabs_context_mcp"].flatMap((e)=>TQn.map((t)=>t+e))),CIm=new Set(TQn.map((e)=>`${e}computer`)),AIm=new Set(TQn.map((e)=>`${e}browser_batch`)),RIm=new Set(["screenshot","zoom","wait","get_page_text","find","scroll","scroll_to","hover","mouse_move","cursor_position","left_click","right_click","middle_click","double_click","triple_click","left_click_drag"])});
export {Qql,isChromeMcpToolName,Xql,isAutoModeAllowlistedTool,Kql,zql,jql,Yql,Jql,TIm,SIm,TQn,EIm,CIm,AIm,RIm,Zql};
