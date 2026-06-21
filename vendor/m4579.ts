// @ts-nocheck
import {_A} from "./m459.ts";
import {Xae,Ske} from "./m3273.ts";
import {isAmberSentinelEnabled,QH} from "./m2784.ts";
import {Se,Pn,bt} from "./m195.ts";
import {execFileNoThrow,oa} from "./m684.ts";
import {b} from "../runtime.ts";
function hDe(){return!0}
function PTo(){if(!_A())return process.argv[1];return H6t.join(Xae(),"claude")}
function Qpt(e){return isAmberSentinelEnabled(e.replace(/[\r\n]/g," "))}
function OTo(){return H6t.join(DTo.homedir(),"Library","LaunchAgents",`${xje}.plist`)}
function ycl(){return`gui/${process.getuid()}`}
function n5n(){return`${ycl()}/${xje}`}
async function I6t(e){let{jsonPath:t,logPath:n}=e,r=PTo(),o=process.env.PATH||"/usr/local/bin:/usr/bin:/bin";{let s=OTo();try{await yJ.mkdir(H6t.join(DTo.homedir(),"Library","LaunchAgents"),{recursive:!0}),await yJ.writeFile(s,`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${xje}</string>
  <key>ProgramArguments</key><array>
    <string>${Qpt(r)}</string>
    <string>daemon</string>
    <string>--json-path</string>
    <string>${Qpt(t)}</string>
    <string>--log-file</string>
    <string>${Qpt(n)}</string>
    <string>--origin</string>
    <string>service</string>
  </array>
  <key>EnvironmentVariables</key><dict>
    <key>PATH</key><string>${Qpt(o)}</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><dict><key>SuccessfulExit</key><false/></dict>
  <key>ThrottleInterval</key><integer>10</integer>
  <key>StandardOutPath</key><string>${Qpt(n)}</string>
  <key>StandardErrorPath</key><string>${Qpt(n)}</string>
</dict></plist>
`,"utf8")}catch(c){return{ok:!1,error:Se(c),serviceId:xje,servicePath:s}}await execFileNoThrow("launchctl",["bootout",n5n()],{useCwd:!1});let{code:i,stderr:a,error:l}=await execFileNoThrow("launchctl",["bootstrap",ycl(),s],{useCwd:!1});if(i!==0)return{ok:!1,error:a||l||"launchctl bootstrap failed",serviceId:xje,servicePath:s};return{ok:!0,serviceId:xje,servicePath:s}}return{ok:!1,error:`service install not available on ${"darwin"} \u2014 the daemon runs on demand instead`,serviceId:xje,servicePath:""}}
async function Zpt(){{let e=OTo();await execFileNoThrow("launchctl",["bootout",n5n()],{useCwd:!1});try{await yJ.unlink(e)}catch(t){if(!Pn(t))return{ok:!1,error:Se(t)}}return{ok:!0}}return{ok:!1,error:"service uninstall not available on darwin"}}
async function r5n(){return LTo("start")}
async function D6t(){return LTo("stop")}
async function Tcl(){return LTo("restart")}
async function LTo(e){{let t=n5n(),n;switch(e){case"start":n=["kickstart",t];break;case"stop":n=["kill","SIGTERM",t];break;case"restart":{await execFileNoThrow("launchctl",["kill","SIGTERM",t],{useCwd:!1});let i=!1;for(let a=0;a<200;a++){let l=await execFileNoThrow("launchctl",["print",t],{useCwd:!1});if(l.code!==0||!/^\s*pid = /m.test(l.stdout)){i=!0;break}await _cl.setTimeout(50)}if(!i)return{ok:!1,error:"daemon did not exit within 10s of SIGTERM; restart aborted before kickstart"};n=["kickstart",t];break}}let{code:r,stderr:o,error:s}=await execFileNoThrow("launchctl",n,{useCwd:!1});if(r!==0){if(e==="stop")return{ok:!0};return{ok:!1,error:o||s||`launchctl ${n[0]} failed`}}return{ok:!0}}return{ok:!1,error:`service ${e} not available on ${"darwin"} \u2014 the daemon runs on demand instead`}}
async function o5n(){let e=OTo();if(!e)return!1;let t;try{let s=await yJ.stat(e);if(!s.isFile()||s.size>1048576)return!1;t=await yJ.readFile(e,"utf8")}catch{return!1}let n=t.match(/<key>ProgramArguments<\/key><array>\s*<string>([^<]+)</),r=n?.[1]??n?.[2];if(!r)return!1;let o=r.replaceAll("&gt;",">").replaceAll("&lt;","<").replaceAll("&amp;","&");try{return await yJ.access(o),!1}catch{return!0}}
async function TJ(){{let{code:e}=await execFileNoThrow("launchctl",["print",n5n()],{useCwd:!1,timeout:5000});return e===0}return!1}
var gcl,yJ,DTo,H6t,_cl,xje="com.anthropic.claude-daemon";
var gDe=b(()=>{bt();oa();Ske();QH();gcl=require("fs"),yJ=require("fs/promises"),DTo=require("os"),H6t=require("path"),_cl=require("timers/promises")});
export {hDe,PTo,Qpt,OTo,ycl,n5n,I6t,Zpt,r5n,D6t,Tcl,LTo,o5n,TJ,gcl,yJ,DTo,H6t,_cl,xje,gDe};
