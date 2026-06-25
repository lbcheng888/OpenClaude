// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {Yt,Iyr,Es} from "./m641.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {cn,Ct} from "./m197.ts";
import {ba,pd} from "./m706.ts";
import {KRt,oCe} from "./m729.ts";
var wWl={};
ft(wWl,{readClaudeDesktopMcpServers:()=>readClaudeDesktopMcpServers,getClaudeDesktopConfigPath:()=>getClaudeDesktopConfigPath});
async function getClaudeDesktopConfigPath(){let e=Yt();if(!Iyr.includes(e))throw Error(`Unsupported platform: ${e} - Claude Desktop integration only works on macOS and WSL.`);if(e==="macos")return L1o.join(RWl.homedir(),"Library","Application Support","Claude","claude_desktop_config.json");let t=process.env.USERPROFILE?process.env.USERPROFILE.replace(/\\/g,"/"):null;if(t){let r=`/mnt/c${t.replace(/^[A-Z]:/,"")}/AppData/Roaming/Claude/claude_desktop_config.json`;try{return await HGe.stat(r),r}catch{}}try{try{let r=await HGe.readdir("/mnt/c/Users",{withFileTypes:!0});for(let o of r){if(o.name==="Public"||o.name==="Default"||o.name==="Default User"||o.name==="All Users")continue;let s=L1o.join("/mnt/c/Users",o.name,"AppData","Roaming","Claude","claude_desktop_config.json");try{return await HGe.stat(s),s}catch{}}}catch{}}catch(n){logForDebugging(`Failed scanning /mnt/c/Users for Claude Desktop config: ${n}`,{level:"error"})}throw Error("Could not find Claude Desktop config file in Windows. Make sure Claude Desktop is installed on Windows.")}
async function readClaudeDesktopMcpServers(){if(!Iyr.includes(Yt()))throw Error("Unsupported platform - Claude Desktop integration only works on macOS and WSL.");try{let e=await getClaudeDesktopConfigPath(),t;try{t=await HGe.readFile(e,{encoding:"utf8"})}catch(s){if(cn(s)==="ENOENT")return{};throw s}let n=ba(t);if(!n||typeof n!=="object")return{};let r=n.mcpServers;if(!r||typeof r!=="object")return{};let o={};for(let[s,i]of Object.entries(r)){if(!i||typeof i!=="object")continue;let a=KRt().safeParse(i);if(a.success)o[s]=a.data}return o}catch(e){return logForDebugging(`Failed to read Claude Desktop MCP servers: ${e}`,{level:"error"}),{}}}
var HGe,RWl,L1o;
var kWl=b(()=>{oCe();qe();Ct();pd();Es();HGe=require("fs/promises"),RWl=require("os"),L1o=require("path")});
export {wWl,getClaudeDesktopConfigPath,readClaudeDesktopMcpServers,HGe,RWl,L1o,kWl};
