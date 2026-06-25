// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {Jo,Ct} from "./m197.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b} from "../runtime.ts";
function lAd(e){saveGlobalConfig((t)=>({...t,appleTerminalSetupInProgress:!0,appleTerminalBackupPath:e}))}
function mnt(){saveGlobalConfig((e)=>({...e,appleTerminalSetupInProgress:!1}))}
function cAd(){let e=getGlobalConfig();return{inProgress:e.appleTerminalSetupInProgress??!1,backupPath:e.appleTerminalBackupPath||null}}
function fnt(){return hLi.join(fLi.homedir(),"Library","Preferences","com.apple.Terminal.plist")}
async function gLi(){let e=fnt(),t=`${e}.bak`;try{let{code:n}=await execFileNoThrow("defaults",["export","com.apple.Terminal",e]);if(n!==0)return null;try{await d5r.stat(e)}catch{return null}return await execFileNoThrow("defaults",["export","com.apple.Terminal",t]),lAd(t),t}catch(n){if(Jo(n))return logForDebugging(`backupTerminalPreferences: config write failed: ${n}`),null;return Ie(n),null}}
async function vRn(){let{inProgress:e,backupPath:t}=cAd();if(!e)return{status:"no_backup"};if(!t)return mnt(),{status:"no_backup"};try{await d5r.stat(t)}catch{return mnt(),{status:"no_backup"}}let n=!1;try{let{code:r}=await execFileNoThrow("defaults",["import","com.apple.Terminal",t]);if(r!==0)return{status:"failed",backupPath:t};return n=!0,await execFileNoThrow("killall",["cfprefsd"]),mnt(),{status:"restored"}}catch(r){if(Jo(r))logForDebugging(`checkAndRestoreTerminalBackup: config write failed: ${r}`);else Ie(r);try{mnt()}catch{}return n?{status:"restored"}:{status:"failed",backupPath:t}}}
var d5r,fLi,hLi;
var p5r=b(()=>{tr();qe();Ct();Ii();vn();d5r=require("fs/promises"),fLi=require("os"),hLi=require("path")});
export {lAd,mnt,cAd,fnt,gLi,vRn,d5r,fLi,hLi,p5r};
