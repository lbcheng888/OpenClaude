// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function lZn(){saveGlobalConfig((e)=>({...e,iterm2SetupInProgress:!1}))}
function hPm(){let e=getGlobalConfig();return{inProgress:e.iterm2SetupInProgress??!1,backupPath:e.iterm2BackupPath||null}}
function gPm(){return TWl.join(yWl.homedir(),"Library","Preferences","com.googlecode.iterm2.plist")}
async function SWl(){let{inProgress:e,backupPath:t}=hPm();if(!e)return{status:"no_backup"};if(!t)return lZn(),{status:"no_backup"};try{await cZn.stat(t)}catch{return lZn(),{status:"no_backup"}}try{return await cZn.copyFile(t,gPm()),lZn(),{status:"restored"}}catch(n){return logForDebugging(`Failed to restore iTerm2 settings with: ${n}`,{level:"error"}),lZn(),{status:"failed",backupPath:t}}}
var cZn,yWl,TWl;
var bWl=b(()=>{tr();qe();cZn=require("fs/promises"),yWl=require("os"),TWl=require("path")});
export {lZn,hPm,gPm,SWl,cZn,yWl,TWl,bWl};
