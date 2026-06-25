// @ts-nocheck
import {nEt,A7e} from "../src/tools/0246_name.ts";
import {CFC_TOOL_PREFIX,bO} from "../src/mcp/2592_trackClaudeInChromeTabId.ts";
import {b} from "../runtime.ts";
function gzd(e){let t=e.slice(0,hzd),n=e.length-t.length;if(n>0)t.push(`${n} more`);if(t.length===1)return t[0]??"";if(t.length===2)return`${t[0]} and ${t[1]}`;return`${t.slice(0,-1).join(", ")}, and ${t.at(-1)}`}
function EFt(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}
function _zd(e){if(!Array.isArray(e.actions))return[];let t=new Set,n=[];for(let r of e.actions){if(!EFt(r)||typeof r.name!=="string")continue;if(r.name==="browser_batch"||nEt.has(r.name))continue;let o=CFt(r.name,EFt(r.input)?r.input:{});if(!t.has(o))t.add(o),n.push(o)}return n}
function CFt(e,t){let n=e.startsWith(CFC_TOOL_PREFIX)?e.slice(CFC_TOOL_PREFIX.length):e;if(n==="computer"){let r=typeof t.action==="string"?t.action:void 0;if(r&&Nla[r])return Nla[r];return"use the browser"}if(n==="browser_batch"){let r=_zd(t);return r.length>0?gzd(r):"use the browser"}return fzd[n]??"use the browser"}
var fzd,Nla,hzd=4;
var yQr=b(()=>{A7e();bO();fzd={navigate:"navigate",read_page:"read the page",get_page_text:"extract page text",find:"find an element",form_input:"fill in a form field",javascript_tool:"run JavaScript",read_console_messages:"read console messages",read_network_requests:"read network requests",upload_image:"upload an image",file_upload:"upload a file",select_browser:"select a browser"},Nla={screenshot:"take a screenshot",left_click:"click",right_click:"right-click",middle_click:"middle-click",double_click:"double-click",triple_click:"triple-click",type:"type text",key:"press keys",hold_key:"hold a key",scroll:"scroll",scroll_to:"scroll to an element",left_click_drag:"drag",zoom:"zoom in",hover:"hover",mouse_move:"move the mouse",left_mouse_down:"press the mouse button",left_mouse_up:"release the mouse button",cursor_position:"read the cursor position",wait:"wait"}});
export {gzd,EFt,_zd,CFt,fzd,Nla,hzd,yQr};
