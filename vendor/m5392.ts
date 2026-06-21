// @ts-nocheck
import {Whe,Xae,Ske} from "./m3273.ts";
import {dn,xp,bt} from "./m195.ts";
import {hj,oXn} from "./m5391.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {yA,XI} from "./m459.ts";
import {getInitialSettings,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {tr,sn} from "../src/config/0047_namespace.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {b,M} from "../runtime.ts";
function sXn(){return Qne.join(Whe(),"applications",p5l)}
function f5l(e){return`Exec="${e}" --handle-uri %u`}
function A5l(e){return`"${e}" --handle-uri "%1"`}
async function KDm(e){let t=Qne.join(bGt,"Contents");try{await gj.promises.rm(bGt,{recursive:!0})}catch(o){if(dn(o)!=="ENOENT")throw o}await gj.promises.mkdir(Qne.dirname(GOo),{recursive:!0});let n=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${KOo}</string>
  <key>CFBundleName</key>
  <string>${zOo}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${hj}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await gj.promises.writeFile(Qne.join(t,"Info.plist"),n),await gj.promises.symlink(e,GOo),await execFileNoThrow("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",bGt],{useCwd:!1}),logForDebugging(`Registered ${hj}:// protocol handler at ${bGt}`)}
async function zDm(e){await gj.promises.mkdir(Qne.dirname(sXn()),{recursive:!0});let t=`[Desktop Entry]
Name=${zOo}
Comment=Handle ${hj}:// deep links for Claude Code
${f5l(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${hj};
`;await gj.promises.writeFile(sXn(),t);let n=await yA("xdg-mime");if(n){let{code:r}=await execFileNoThrow(n,["default",p5l,`x-scheme-handler/${hj}`],{useCwd:!1});if(r!==0)throw Object.assign(Error(`xdg-mime exited with code ${r}`),{code:"XDG_MIME_FAILED"})}logForDebugging(`Registered ${hj}:// protocol handler at ${sXn()}`)}
async function YDm(e){for(let t of[["add",VOo,"/ve","/d",`URL:${zOo}`,"/f"],["add",VOo,"/v","URL Protocol","/d","","/f"],["add",m5l,"/ve","/d",A5l(e),"/f"]]){let{code:n}=await execFileNoThrow("reg",t,{useCwd:!1});if(n!==0)throw Object.assign(Error(`reg add exited with code ${n}`),{code:"REG_FAILED"})}logForDebugging(`Registered ${hj}:// protocol handler in Windows registry`)}
async function JDm(e){let t=e??await h5l();switch("darwin"){case"darwin":await KDm(t);break;case"linux":await zDm(t);break;case"win32":await YDm(t);break;default:throw Error("Unsupported platform: darwin")}}
async function h5l(){let t=Qne.join(Xae(),"claude");try{return await gj.promises.realpath(t),t}catch{return process.execPath}}
async function XDm(e){try{switch("darwin"){case"darwin":return await gj.promises.readlink(GOo)===e;case"linux":return(await gj.promises.readFile(sXn(),"utf8")).includes(f5l(e));case"win32":{let{stdout:t,code:n}=await execFileNoThrow("reg",["query",m5l,"/ve"],{useCwd:!1});return n===0&&t.includes(A5l(e))}default:return!1}}catch{return!1}}
async function g5l(){if(getInitialSettings().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("darwin"))return;let e=await h5l();if(await XDm(e))return;let t=Qne.join(tr(),".deep-link-register-failed");try{let n=await gj.promises.stat(t);if(Date.now()-n.mtimeMs<VDm)return}catch{}try{await JDm(e),Ie("deep_link_register"),logForDebugging("Auto-registered claude-cli:// deep link protocol handler"),await gj.promises.rm(t,{force:!0}).catch(()=>{})}catch(n){let r=xp(n);if(Oe("deep_link_register",r??"register_failed"),logForDebugging(`Failed to auto-register deep link protocol handler: ${n instanceof Error?n.message:String(n)}`,{level:"warn"}),r==="EACCES"||r==="ENOSPC")await gj.promises.writeFile(t,"").catch(()=>{})}}
var gj,d5l,Qne,KOo="com.anthropic.claude-code-url-handler",zOo="Claude Code URL Handler",p5l="claude-code-url-handler.desktop",GDm="Claude Code URL Handler.app",bGt,GOo,VOo,m5l,VDm=86400000;
var YOo=b(()=>{ln();qe();sn();bt();oa();yr();XI();Ske();oXn();gj=require("fs"),d5l=M(require("os")),Qne=M(require("path")),bGt=Qne.join(d5l.homedir(),"Applications",GDm),GOo=Qne.join(bGt,"Contents","MacOS","claude");VOo=`HKEY_CURRENT_USER\\Software\\Classes\\${hj}`,m5l=`${VOo}\\shell\\open\\command`});
export {sXn,f5l,A5l,KDm,zDm,YDm,JDm,h5l,XDm,g5l,gj,d5l,Qne,KOo,zOo,p5l,GDm,bGt,GOo,VOo,m5l,VDm,YOo};
