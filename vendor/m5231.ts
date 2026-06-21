// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {zt,tfr,qs} from "./m635.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {dn,bt} from "./m195.ts";
import {Fa,Pd} from "./m701.ts";
import {yEt,bbe} from "./m724.ts";
var N2l={};
isFullscreenWithTTY(N2l,{readClaudeDesktopMcpServers:()=>readClaudeDesktopMcpServers,getClaudeDesktopConfigPath:()=>getClaudeDesktopConfigPath});
async function getClaudeDesktopConfigPath(){let e=zt();if(!tfr.includes(e))throw Error(`Unsupported platform: ${e} - Claude Desktop integration only works on macOS and WSL.`);if(e==="macos")return ADo.join(L2l.homedir(),"Library","Application Support","Claude","claude_desktop_config.json");let t=process.env.USERPROFILE?process.env.USERPROFILE.replace(/\\/g,"/"):null;if(t){let r=`/mnt/c${t.replace(/^[A-Z]:/,"")}/AppData/Roaming/Claude/claude_desktop_config.json`;try{return await B8e.stat(r),r}catch{}}try{try{let r=await B8e.readdir("/mnt/c/Users",{withFileTypes:!0});for(let o of r){if(o.name==="Public"||o.name==="Default"||o.name==="Default User"||o.name==="All Users")continue;let s=ADo.join("/mnt/c/Users",o.name,"AppData","Roaming","Claude","claude_desktop_config.json");try{return await B8e.stat(s),s}catch{}}}catch{}}catch(n){logForDebugging(`Failed scanning /mnt/c/Users for Claude Desktop config: ${n}`,{level:"error"})}throw Error("Could not find Claude Desktop config file in Windows. Make sure Claude Desktop is installed on Windows.")}
async function readClaudeDesktopMcpServers(){if(!tfr.includes(zt()))throw Error("Unsupported platform - Claude Desktop integration only works on macOS and WSL.");try{let e=await getClaudeDesktopConfigPath(),t;try{t=await B8e.readFile(e,{encoding:"utf8"})}catch(s){if(dn(s)==="ENOENT")return{};throw s}let n=Fa(t);if(!n||typeof n!=="object")return{};let r=n.mcpServers;if(!r||typeof r!=="object")return{};let o={};for(let[s,i]of Object.entries(r)){if(!i||typeof i!=="object")continue;let a=yEt().safeParse(i);if(a.success)o[s]=a.data}return o}catch(e){return logForDebugging(`Failed to read Claude Desktop MCP servers: ${e}`,{level:"error"}),{}}}
var B8e,L2l,ADo;
var B2l=b(()=>{bbe();qe();bt();Pd();qs();B8e=require("fs/promises"),L2l=require("os"),ADo=require("path")});
export {N2l,getClaudeDesktopConfigPath,readClaudeDesktopMcpServers,B8e,L2l,ADo,B2l};
