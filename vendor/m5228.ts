// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function cYn(){saveGlobalConfig((e)=>({...e,iterm2SetupInProgress:!1}))}
function nvm(){let e=getGlobalConfig();return{inProgress:e.iterm2SetupInProgress??!1,backupPath:e.iterm2BackupPath||null}}
function rvm(){return k2l.join(x2l.homedir(),"Library","Preferences","com.googlecode.iterm2.plist")}
async function H2l(){let{inProgress:e,backupPath:t}=nvm();if(!e)return{status:"no_backup"};if(!t)return cYn(),{status:"no_backup"};try{await uYn.stat(t)}catch{return cYn(),{status:"no_backup"}}try{return await uYn.copyFile(t,rvm()),cYn(),{status:"restored"}}catch(n){return logForDebugging(`Failed to restore iTerm2 settings with: ${n}`,{level:"error"}),cYn(),{status:"failed",backupPath:t}}}
var uYn,x2l,k2l;
var I2l=b(()=>{Qn();qe();uYn=require("fs/promises"),x2l=require("os"),k2l=require("path")});
export {cYn,nvm,rvm,H2l,uYn,x2l,k2l,I2l};
