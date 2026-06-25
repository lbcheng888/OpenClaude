// @ts-nocheck
import {b} from "../runtime.ts";
function xRt(){return!1}
function mas(){let e="";try{e=cas.userInfo().username}catch{}let t=[];if(e)t.push({path:`/Library/Managed Preferences/${e}/${las}.plist`,label:"per-user managed preferences"});return t.push({path:`/Library/Managed Preferences/${las}.plist`,label:"device-level managed preferences"}),t}
var cas,las="com.anthropic.claudecode",kon="HKLM\\SOFTWARE\\Policies\\ClaudeCode",Hon="HKCU\\SOFTWARE\\Policies\\ClaudeCode",zje="Settings",uas="/usr/bin/plutil",das,pas=5000,lSr="/mnt/c/Windows/System32/reg.exe",uM="/mnt/c/Program Files/ClaudeCode";
var ZEe=b(()=>{cas=require("os"),das=["-convert","json","-o","-","--"]});
export {xRt,mas,cas,las,kon,Hon,zje,uas,das,pas,lSr,uM,ZEe};
