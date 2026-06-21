// @ts-nocheck
import {yA,XI} from "./m459.ts";
import {zt,qs} from "./m635.ts";
import {isTmuxControlMode,Ie,ln} from "../src/telemetry/0594_feature_name.ts";
import {b} from "../runtime.ts";
async function v1t(e){try{return(await l9e.stat(e)).isFile()?e:null}catch{return null}}
async function Y6d(e){let t;try{t=await l9e.readlink(e)}catch{return null}return v1t(t)}
async function J6d(){let e=await yA("pwsh");if(e){if(zt()==="linux"){let n=await l9e.realpath(e).catch(()=>e);if(e.startsWith("/snap/")||n.startsWith("/snap/")){let r=await v1t("/opt/microsoft/powershell/7/pwsh")??await v1t("/usr/bin/pwsh");if(r){let o=await l9e.realpath(r).catch(()=>r);if(!r.startsWith("/snap/")&&!o.startsWith("/snap/"))return isTmuxControlMode("shell_powershell_detect","snap_workaround"),r}}}return Ie("shell_powershell_detect"),e}if(zt()==="windows"){let n=process.env.ProgramFiles,r=process.env.LOCALAPPDATA,o=process.env.USERPROFILE,s=(n?await v1t(GIn.join(n,"PowerShell","7","pwsh.exe")):null)??(r?await Y6d(GIn.join(r,"Microsoft","WindowsApps","pwsh.exe")):null)??(o?await v1t(GIn.join(o,".dotnet","tools","pwsh.exe")):null);if(s)return isTmuxControlMode("shell_powershell_detect","windows_fallback_path"),s}let t=await yA("powershell");if(t)return isTmuxControlMode("shell_powershell_detect","fell_back_to_powershell_5"),t;return null}
function yW(){if(!SYr)SYr=J6d();return SYr}
async function w1t(){let e=await yW();if(!e)return null;return e.split(/[/\\]/).pop().toLowerCase().replace(/\.exe$/,"")==="pwsh"?"core":"desktop"}
var l9e,GIn,SYr=null;
var hke=b(()=>{ln();qs();XI();l9e=require("fs/promises"),GIn=require("path")});
export {v1t,Y6d,J6d,yW,w1t,l9e,GIn,SYr,hke};
