// @ts-nocheck
import {Rf} from "./m465.ts";
import {Jae,o_e} from "./m3289.ts";
import {Ml,Yk} from "./m2796.ts";
import {Ce,In,Ct} from "./m197.ts";
import {execFileNoThrow,Ii} from "./m690.ts";
import {b} from "../runtime.ts";
function gPe(){return!0}
function KRo(){if(!Rf())return process.argv[1];return tWt.join(Jae(),"claude")}
function oht(e){return Ml(e.replace(/[\r\n]/g," "))}
function zRo(){return tWt.join(VRo.homedir(),"Library","LaunchAgents",`${tWe}.plist`)}
function e_l(){return`gui/${process.getuid()}`}
function MKn(){return`${e_l()}/${tWe}`}
async function nWt(e){let{jsonPath:t,logPath:n}=e,r=KRo(),o=process.env.PATH||"/usr/local/bin:/usr/bin:/bin";{let s=zRo();try{await oJ.mkdir(tWt.join(VRo.homedir(),"Library","LaunchAgents"),{recursive:!0}),await oJ.writeFile(s,`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${tWe}</string>
  <key>ProgramArguments</key><array>
    <string>${oht(r)}</string>
    <string>daemon</string>
    <string>--json-path</string>
    <string>${oht(t)}</string>
    <string>--log-file</string>
    <string>${oht(n)}</string>
    <string>--origin</string>
    <string>service</string>
  </array>
  <key>EnvironmentVariables</key><dict>
    <key>PATH</key><string>${oht(o)}</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><dict><key>SuccessfulExit</key><false/></dict>
  <key>ThrottleInterval</key><integer>10</integer>
  <key>StandardOutPath</key><string>${oht(n)}</string>
  <key>StandardErrorPath</key><string>${oht(n)}</string>
</dict></plist>
`,"utf8")}catch(c){return{ok:!1,error:Ce(c),serviceId:tWe,servicePath:s}}await execFileNoThrow("launchctl",["bootout",MKn()],{useCwd:!1});let{code:i,stderr:a,error:l}=await execFileNoThrow("launchctl",["bootstrap",e_l(),s],{useCwd:!1});if(i!==0)return{ok:!1,error:a||l||"launchctl bootstrap failed",serviceId:tWe,servicePath:s};return{ok:!0,serviceId:tWe,servicePath:s}}return{ok:!1,error:`service install not available on ${"darwin"} \u2014 the daemon runs on demand instead`,serviceId:tWe,servicePath:""}}
async function sht(){{let e=zRo();await execFileNoThrow("launchctl",["bootout",MKn()],{useCwd:!1});try{await oJ.unlink(e)}catch(t){if(!In(t))return{ok:!1,error:Ce(t)}}return{ok:!0}}return{ok:!1,error:"service uninstall not available on darwin"}}
async function NKn(){return jRo("start")}
async function rWt(){return jRo("stop")}
async function t_l(){return jRo("restart")}
async function jRo(e){{let t=MKn(),n;switch(e){case"start":n=["kickstart",t];break;case"stop":n=["kill","SIGTERM",t];break;case"restart":{await execFileNoThrow("launchctl",["kill","SIGTERM",t],{useCwd:!1});let i=!1;for(let a=0;a<200;a++){let l=await execFileNoThrow("launchctl",["print",t],{useCwd:!1});if(l.code!==0||!/^\s*pid = /m.test(l.stdout)){i=!0;break}await Zgl.setTimeout(50)}if(!i)return{ok:!1,error:"daemon did not exit within 10s of SIGTERM; restart aborted before kickstart"};n=["kickstart",t];break}}let{code:r,stderr:o,error:s}=await execFileNoThrow("launchctl",n,{useCwd:!1});if(r!==0){if(e==="stop")return{ok:!0};return{ok:!1,error:o||s||`launchctl ${n[0]} failed`}}return{ok:!0}}return{ok:!1,error:`service ${e} not available on ${"darwin"} \u2014 the daemon runs on demand instead`}}
async function FKn(){let e=zRo();if(!e)return!1;let t;try{let s=await oJ.stat(e);if(!s.isFile()||s.size>1048576)return!1;t=await oJ.readFile(e,"utf8")}catch{return!1}let n=t.match(/<key>ProgramArguments<\/key><array>\s*<string>([^<]+)</),r=n?.[1]??n?.[2];if(!r)return!1;let o=r.replaceAll("&gt;",">").replaceAll("&lt;","<").replaceAll("&amp;","&");try{return await oJ.access(o),!1}catch{return!0}}
async function sJ(){{let{code:e}=await execFileNoThrow("launchctl",["print",MKn()],{useCwd:!1,timeout:5000});return e===0}return!1}
var Qgl,oJ,VRo,tWt,Zgl,tWe="com.anthropic.claude-daemon";
var _Pe=b(()=>{Ct();Ii();o_e();Yk();Qgl=require("fs"),oJ=require("fs/promises"),VRo=require("os"),tWt=require("path"),Zgl=require("timers/promises")});
export {gPe,KRo,oht,zRo,e_l,MKn,nWt,sht,NKn,rWt,t_l,jRo,FKn,sJ,Qgl,oJ,VRo,tWt,Zgl,tWe,_Pe};
