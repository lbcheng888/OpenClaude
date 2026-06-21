// @ts-nocheck
import {JS,Mw} from "../src/config/2221_recursive.ts";
import {Bal,Fal} from "./m4544.ts";
import {Ie,Oe,ln} from "../src/telemetry/0594_feature_name.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {zt,qs} from "./m635.ts";
import {execFileNoThrowWithCwd,oa} from "./m684.ts";
import {b} from "../runtime.ts";
async function $al(e,t){try{let n=lTo.join(JS(),"screenshots");await Vpt.mkdir(n,{recursive:!0,mode:448});let r=lTo.join(n,`screenshot-${Date.now()}.png`),o=Bal(e,t);await Vpt.writeFile(r,o);let s=await XWp(r);try{await Vpt.unlink(r)}catch{}if(s.success)Ie("clipboard_write");else Oe("clipboard_write","copy_failed");return s}catch(n){return De(n),Oe("clipboard_write","render_failed"),{success:!1,message:`Failed to copy screenshot: ${n instanceof Error?n.message:"Unknown error"}`}}}
async function XWp(e){let t=zt();if(t==="macos"){let r=`set the clipboard to (read (POSIX file "${e.replaceAll("\\","\\\\").replaceAll('"',"\\\"")}") as \xABclass PNGf\xBB)`,o=await execFileNoThrowWithCwd("osascript",["-e",r],{timeout:5000});if(o.code===0)return{success:!0,message:"Screenshot copied to clipboard"};return{success:!1,message:`Failed to copy to clipboard: ${o.stderr}`}}if(t==="linux"){if(await QWp("xclip",["-selection","clipboard","-t","image/png","-i",e])===0)return{success:!0,message:"Screenshot copied to clipboard"};return{success:!1,message:"Failed to copy to clipboard. Please install xclip: sudo apt install xclip"}}if(t==="windows"){let n=`Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile('${e.replaceAll("'","''")}'))`,r=await execFileNoThrowWithCwd("powershell",["-NoProfile","-Command",n],{timeout:5000});if(r.code===0)return{success:!0,message:"Screenshot copied to clipboard"};return{success:!1,message:`Failed to copy to clipboard: ${r.stderr}`}}return{success:!1,message:`Screenshot to clipboard is not supported on ${t}`}}
function QWp(e,t,n=5000){return new Promise((r)=>{let o;try{o=Ual.spawn(e,t,{cwd:void 0,detached:!0,stdio:"ignore",windowsHide:!0})}catch{r(null);return}let s=!1;function i(l){if(s)return;s=!0,clearTimeout(a),r(l)}let a=setTimeout(()=>{o.kill("SIGKILL"),i(null)},n);o.once("exit",(l)=>i(l)),o.once("error",()=>i(null)),o.unref()})}
var Ual,Vpt,lTo;
var qal=b(()=>{ln();Fal();oa();Rn();qs();Mw();Ual=require("child_process"),Vpt=require("fs/promises"),lTo=require("path")});
export {$al,XWp,QWp,Ual,Vpt,lTo,qal};
