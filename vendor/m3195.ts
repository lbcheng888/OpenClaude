// @ts-nocheck
import {kyt,RGe} from "../src/tools/0244_name.ts";
import {CFC_TOOL_PREFIX,oL} from "../src/mcp/2581_trackClaudeInChromeTabId.ts";
import {b} from "../runtime.ts";
function Y$e(e,t){let n=e?.mcpInfo?.serverName,r=n!==void 0?t.mcpPermissionModeOverrides?.[n]:void 0,o=t.mode==="bypassPermissions"||t.mode==="auto"||t.mode==="plan"&&t.isBypassPermissionsModeAvailable===!0;if(r!==void 0&&o)return r;return t.mode}
function Ita(e){if(e===null)return{ok:!0,override:void 0};if(e==="default")return{ok:!0,override:"default"};return{ok:!1,rejected:e}}
function I3d(e){let t=e.slice(0,H3d),n=e.length-t.length;if(n>0)t.push(`${n} more`);if(t.length===1)return t[0]??"";if(t.length===2)return`${t[0]} and ${t[1]}`;return`${t.slice(0,-1).join(", ")}, and ${t.at(-1)}`}
function GMt(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function D3d(e){if(!Array.isArray(e.actions))return[];let t=new Set,n=[];for(let r of e.actions){if(!GMt(r)||typeof r.name!=="string")continue;if(r.name==="browser_batch"||kyt.has(r.name))continue;let o=VMt(r.name,GMt(r.input)?r.input:{});if(!t.has(o))t.add(o),n.push(o)}return n}
function VMt(e,t){let n=e.startsWith(CFC_TOOL_PREFIX)?e.slice(CFC_TOOL_PREFIX.length):e;if(n==="computer"){let r=typeof t.action==="string"?t.action:void 0;if(r&&Dta[r])return Dta[r];return"use the browser"}if(n==="browser_batch"){let r=D3d(t);return r.length>0?I3d(r):"use the browser"}return k3d[n]??"use the browser"}
var k3d,Dta,H3d=4;
var NKr=b(()=>{RGe();oL();k3d={navigate:"navigate",read_page:"read the page",get_page_text:"extract page text",find:"find an element",form_input:"fill in a form field",javascript_tool:"run JavaScript",read_console_messages:"read console messages",read_network_requests:"read network requests",upload_image:"upload an image",file_upload:"upload a file",select_browser:"select a browser"},Dta={screenshot:"take a screenshot",left_click:"click",right_click:"right-click",middle_click:"middle-click",double_click:"double-click",triple_click:"triple-click",type:"type text",key:"press keys",hold_key:"hold a key",scroll:"scroll",scroll_to:"scroll to an element",left_click_drag:"drag",zoom:"zoom in",hover:"hover",mouse_move:"move the mouse",left_mouse_down:"press the mouse button",left_mouse_up:"release the mouse button",cursor_position:"read the cursor position",wait:"wait"}});
export {Y$e,Ita,I3d,GMt,D3d,VMt,k3d,Dta,H3d,NKr};
