// @ts-nocheck
import {Mee,Jae,o_e} from "./m3289.ts";
import {cn,Xd,Ct} from "./m197.ts";
import {V6,str} from "./m5425.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Rm,tI} from "./m465.ts";
import {getInitialSettings,br} from "../src/config/0745_updateSettingsForSource.ts";
import {or,dn} from "../src/config/0137_namespace.ts";
import {He,xe,mn} from "../src/telemetry/0600_feature_name.ts";
import {b,x} from "../runtime.ts";
function itr(){return Kne.join(Mee(),"applications",JJl)}
function QJl(e){return`Exec="${e}" --handle-uri %u`}
function ZJl(e){return`"${e}" --handle-uri "%1"`}
async function n2m(e){let t=Kne.join(Y7t,"Contents");try{await K6.promises.rm(Y7t,{recursive:!0})}catch(o){if(cn(o)!=="ENOENT")throw o}await K6.promises.mkdir(Kne.dirname(uBo),{recursive:!0});let n=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${pBo}</string>
  <key>CFBundleName</key>
  <string>${mBo}</string>
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
        <string>${V6}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await K6.promises.writeFile(Kne.join(t,"Info.plist"),n),await K6.promises.symlink(e,uBo),await execFileNoThrow("/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister",["-R",Y7t],{useCwd:!1}),logForDebugging(`Registered ${V6}:// protocol handler at ${Y7t}`)}
async function r2m(e){await K6.promises.mkdir(Kne.dirname(itr()),{recursive:!0});let t=`[Desktop Entry]
Name=${mBo}
Comment=Handle ${V6}:// deep links for Claude Code
${QJl(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${V6};
`;await K6.promises.writeFile(itr(),t);let n=await Rm("xdg-mime");if(n){let{code:r}=await execFileNoThrow(n,["default",JJl,`x-scheme-handler/${V6}`],{useCwd:!1});if(r!==0)throw Object.assign(Error(`xdg-mime exited with code ${r}`),{code:"XDG_MIME_FAILED"})}logForDebugging(`Registered ${V6}:// protocol handler at ${itr()}`)}
async function o2m(e){for(let t of[["add",dBo,"/ve","/d",`URL:${mBo}`,"/f"],["add",dBo,"/v","URL Protocol","/d","","/f"],["add",XJl,"/ve","/d",ZJl(e),"/f"]]){let{code:n}=await execFileNoThrow("reg",t,{useCwd:!1});if(n!==0)throw Object.assign(Error(`reg add exited with code ${n}`),{code:"REG_FAILED"})}logForDebugging(`Registered ${V6}:// protocol handler in Windows registry`)}
async function s2m(e){let t=e??await eXl();switch("darwin"){case"darwin":await n2m(t);break;case"linux":await r2m(t);break;case"win32":await o2m(t);break;default:throw Error("Unsupported platform: darwin")}}
async function eXl(){let t=Kne.join(Jae(),"claude");try{return await K6.promises.realpath(t),t}catch{return process.execPath}}
async function i2m(e){try{switch("darwin"){case"darwin":return await K6.promises.readlink(uBo)===e;case"linux":return(await K6.promises.readFile(itr(),"utf8")).includes(QJl(e));case"win32":{let{stdout:t,code:n}=await execFileNoThrow("reg",["query",XJl,"/ve"],{useCwd:!1});return n===0&&t.includes(ZJl(e))}default:return!1}}catch{return!1}}
async function tXl(){if(getInitialSettings().disableDeepLinkRegistration==="disable")return;if(!["darwin","linux","win32"].includes("darwin"))return;let e=await eXl();if(await i2m(e))return;let t=Kne.join(or(),".deep-link-register-failed");try{let n=await K6.promises.stat(t);if(Date.now()-n.mtimeMs<t2m)return}catch{}try{await s2m(e),He("deep_link_register"),logForDebugging("Auto-registered claude-cli:// deep link protocol handler"),await K6.promises.rm(t,{force:!0}).catch(()=>{})}catch(n){let r=Xd(n);if(xe("deep_link_register",r??"register_failed"),logForDebugging(`Failed to auto-register deep link protocol handler: ${n instanceof Error?n.message:String(n)}`,{level:"warn"}),r==="EACCES"||r==="ENOSPC")await K6.promises.writeFile(t,"").catch(()=>{})}}
var K6,YJl,Kne,pBo="com.anthropic.claude-code-url-handler",mBo="Claude Code URL Handler",JJl="claude-code-url-handler.desktop",e2m="Claude Code URL Handler.app",Y7t,uBo,dBo,XJl,t2m=86400000;
var fBo=b(()=>{mn();qe();dn();Ct();Ii();br();tI();o_e();str();K6=require("fs"),YJl=x(require("os")),Kne=x(require("path")),Y7t=Kne.join(YJl.homedir(),"Applications",e2m),uBo=Kne.join(Y7t,"Contents","MacOS","claude");dBo=`HKEY_CURRENT_USER\\Software\\Classes\\${V6}`,XJl=`${dBo}\\shell\\open\\command`});
export {itr,QJl,ZJl,n2m,r2m,o2m,s2m,eXl,i2m,tXl,K6,YJl,Kne,pBo,mBo,JJl,e2m,Y7t,uBo,dBo,XJl,t2m,fBo};
