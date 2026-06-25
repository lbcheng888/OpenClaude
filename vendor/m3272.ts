// @ts-nocheck
import {Rm,tI} from "./m465.ts";
import {Yt,Es} from "./m641.ts";
import {Pt,He,mn} from "../src/telemetry/0600_feature_name.ts";
import {b} from "../runtime.ts";
async function nBt(e){try{return(await y3e.stat(e)).isFile()?e:null}catch{return null}}
async function MJd(e){let t;try{t=await y3e.readlink(e)}catch{return null}return nBt(t)}
async function NJd(){let e=await Rm("pwsh");if(e){if(Yt()==="linux"){let n=await y3e.realpath(e).catch(()=>e);if(e.startsWith("/snap/")||n.startsWith("/snap/")){let r=await nBt("/opt/microsoft/powershell/7/pwsh")??await nBt("/usr/bin/pwsh");if(r){let o=await y3e.realpath(r).catch(()=>r);if(!r.startsWith("/snap/")&&!o.startsWith("/snap/"))return Pt("shell_powershell_detect","snap_workaround"),r}}}return He("shell_powershell_detect"),e}if(Yt()==="windows"){let n=process.env.ProgramFiles,r=process.env.LOCALAPPDATA,o=process.env.USERPROFILE,s=(n?await nBt(LPn.join(n,"PowerShell","7","pwsh.exe")):null)??(r?await MJd(LPn.join(r,"Microsoft","WindowsApps","pwsh.exe")):null)??(o?await nBt(LPn.join(o,".dotnet","tools","pwsh.exe")):null);if(s)return Pt("shell_powershell_detect","windows_fallback_path"),s}let t=await Rm("powershell");if(t)return Pt("shell_powershell_detect","fell_back_to_powershell_5"),t;return null}
function LW(){if(!oeo)oeo=NJd();return oeo}
async function rBt(){let e=await LW();if(!e)return null;return e.split(/[/\\]/).pop().toLowerCase().replace(/\.exe$/,"")==="pwsh"?"core":"desktop"}
var y3e,LPn,oeo=null;
var oIe=b(()=>{mn();Es();tI();y3e=require("fs/promises"),LPn=require("path")});
export {nBt,MJd,NJd,LW,rBt,y3e,LPn,oeo,oIe};
