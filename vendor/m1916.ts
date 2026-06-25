// @ts-nocheck
import {ERe,D1r} from "./m1915.ts";
import {b,x} from "../runtime.ts";
var P1r,p0t,hYu,gYu=async()=>`${await hYu()}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`,O1r=async()=>{if(ERe)return gYu();return`${P1r.default.env.SYSTEMROOT||P1r.default.env.windir||String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`};
var _ri=b(()=>{D1r();D1r();P1r=x(require("process")),p0t=x(require("fs/promises")),hYu=(()=>{let t;return async function(){if(t)return t;let n="/etc/wsl.conf",r=!1;try{await p0t.default.access(n,p0t.constants.F_OK),r=!0}catch{}if(!r)return"/mnt/";let o=await p0t.default.readFile(n,{encoding:"utf8"}),s=/(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(o);if(!s)return"/mnt/";return t=s.groups.mountPoint.trim(),t=t.endsWith("/")?t:`${t}/`,t}})()});
export {P1r,p0t,hYu,gYu,O1r,_ri};
