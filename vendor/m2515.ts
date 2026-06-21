// @ts-nocheck
import {saveGlobalConfig,getGlobalConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {ds,bt} from "./m195.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b} from "../runtime.ts";
function Mmd(e){saveGlobalConfig((t)=>({...t,appleTerminalSetupInProgress:!0,appleTerminalBackupPath:e}))}
function det(){saveGlobalConfig((e)=>({...e,appleTerminalSetupInProgress:!1}))}
function Nmd(){let e=getGlobalConfig();return{inProgress:e.appleTerminalSetupInProgress??!1,backupPath:e.appleTerminalBackupPath||null}}
function pet(){return Yki.join(zki.homedir(),"Library","Preferences","com.apple.Terminal.plist")}
async function Jki(){let e=pet(),t=`${e}.bak`;try{let{code:n}=await execFileNoThrow("defaults",["export","com.apple.Terminal",e]);if(n!==0)return null;try{await P9r.stat(e)}catch{return null}return await execFileNoThrow("defaults",["export","com.apple.Terminal",t]),Mmd(t),t}catch(n){if(ds(n))return logForDebugging(`backupTerminalPreferences: config write failed: ${n}`),null;return De(n),null}}
async function Fbn(){let{inProgress:e,backupPath:t}=Nmd();if(!e)return{status:"no_backup"};if(!t)return det(),{status:"no_backup"};try{await P9r.stat(t)}catch{return det(),{status:"no_backup"}}let n=!1;try{let{code:r}=await execFileNoThrow("defaults",["import","com.apple.Terminal",t]);if(r!==0)return{status:"failed",backupPath:t};return n=!0,await execFileNoThrow("killall",["cfprefsd"]),det(),{status:"restored"}}catch(r){if(ds(r))logForDebugging(`checkAndRestoreTerminalBackup: config write failed: ${r}`);else De(r);try{det()}catch{}return n?{status:"restored"}:{status:"failed",backupPath:t}}}
var P9r,zki,Yki;
var O9r=b(()=>{Qn();qe();bt();oa();Rn();P9r=require("fs/promises"),zki=require("os"),Yki=require("path")});
export {Mmd,det,Nmd,pet,Jki,Fbn,P9r,zki,Yki,O9r};
