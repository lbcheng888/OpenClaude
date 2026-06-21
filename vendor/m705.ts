// @ts-nocheck
import {b} from "../runtime.ts";
function oEt(){return!1}
function gts(){let e="";try{e=mts.userInfo().username}catch{}let t=[];if(e)t.push({path:`/Library/Managed Preferences/${e}/${pts}.plist`,label:"per-user managed preferences"});return t.push({path:`/Library/Managed Preferences/${pts}.plist`,label:"device-level managed preferences"}),t}
var mts,pts="com.anthropic.claudecode",ztn="HKLM\\SOFTWARE\\Policies\\ClaudeCode",Ytn="HKCU\\SOFTWARE\\Policies\\ClaudeCode",Y7e="Settings",fts="/usr/bin/plutil",Ats,hts=5000,PAr="/mnt/c/Windows/System32/reg.exe",XM="/mnt/c/Program Files/ClaudeCode";
var _be=b(()=>{mts=require("os"),Ats=["-convert","json","-o","-","--"]});
export {oEt,gts,mts,pts,ztn,Ytn,Y7e,fts,Ats,hts,PAr,XM,_be};
