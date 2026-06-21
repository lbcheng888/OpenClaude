// @ts-nocheck
import {isFullscreenWithTTY,b,ro} from "../runtime.ts";
import {Z1,K5,Fm,yz} from "./m2693.ts";
import {ef,Ws} from "./m2248.ts";
import {VR,yu} from "./m2249.ts";
import {Vw,$c,gL} from "./m2695.ts";
import {Y5} from "../src/config/2707_isDeferredTool.ts";
import {VFn,vOa} from "./m3907.ts";
import {xNi} from "../src/config/2699_WORKFLOW_TOOL_NAME.ts";
import {Glt} from "./m3908.ts";
import {TOOL_SEARCH_TOOL_NAME} from "./m2692.ts";
import {vae} from "./m2801.ts";
import {IRe} from "../src/artifact/2701_uuidSlugFromUrl.ts";
import {Kw,Tz,mP,freshFeatureValues} from "../src/tools/2698_allErrors.ts";
import {H0,pP} from "../src/session/2690_resolveLoopFileFire.ts";
import {Ntt} from "./m2694.ts";
import {Tk} from "../src/config/2251_zBr.ts";
import {T3n} from "../src/tui/4217_role.tsx";
var uBl={};
isFullscreenWithTTY(uBl,{isAutoModeAllowlistedTool:()=>isAutoModeAllowlistedTool});
function cBl(e){return rSm.has(String(e?.action))}
function isAutoModeAllowlistedTool(e,t){if(ZTm.has(e))return!0;if(eSm.has(e))return!0;if(tSm.has(e))return cBl(t);if(nSm.has(e)){let n=t?.actions;if(!Array.isArray(n)||n.length===0)return!1;return n.every(cBl)}return!1}
var rBl=null,oBl=null,sBl,iBl=null,aBl=null,lBl=null,QTm,ZTm,TIo,eSm,tSm,nSm,rSm;
var dBl=b(()=>{Z1();ef();VR();Vw();Y5();VFn();sBl=ro(xNi).WORKFLOW_TOOL_NAME,QTm=[],ZTm=new Set([Ws,$c,yu,Glt,TOOL_SEARCH_TOOL_NAME,vae,"ReadMcpResourceTool",IRe,gL,Kw,Tz,mP,H0,pP,K5,Fm,Ntt,yz,Tk,freshFeatureValues,...sBl?[sBl]:[],...rBl?[rBl]:[],...iBl?[iBl]:[],...aBl?[aBl]:[],T3n,...lBl?[lBl]:[],...QTm,...oBl?[oBl]:[],vOa]),TIo=["mcp__claude-in-chrome__","mcp__Claude_in_Chrome__"],eSm=new Set(["find","get_page_text","gif_creator","list_connected_browsers","read_console_messages","read_network_requests","read_page","resize_window","select_browser","shortcuts_list","switch_browser","tabs_close_mcp","tabs_context_mcp"].flatMap((e)=>TIo.map((t)=>t+e))),tSm=new Set(TIo.map((e)=>`${e}computer`)),nSm=new Set(TIo.map((e)=>`${e}browser_batch`)),rSm=new Set(["screenshot","zoom","wait","get_page_text","find","scroll","scroll_to","hover","mouse_move","cursor_position","left_click","right_click","middle_click","double_click","triple_click","left_click_drag"])});
export {uBl,cBl,isAutoModeAllowlistedTool,rBl,oBl,sBl,iBl,aBl,lBl,QTm,ZTm,TIo,eSm,tSm,nSm,rSm,dBl};
