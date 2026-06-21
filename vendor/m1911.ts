// @ts-nocheck
import {FCe,nPr} from "./m1910.ts";
import {b,M} from "../runtime.ts";
var rPr,Fxt,Jqu,Xqu=async()=>`${await Jqu()}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`,oPr=async()=>{if(FCe)return Xqu();return`${rPr.default.env.SYSTEMROOT||rPr.default.env.windir||String.raw`C:\Windows`}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`};
var bXs=b(()=>{nPr();nPr();rPr=M(require("process")),Fxt=M(require("fs/promises")),Jqu=(()=>{let t;return async function(){if(t)return t;let n="/etc/wsl.conf",r=!1;try{await Fxt.default.access(n,Fxt.constants.F_OK),r=!0}catch{}if(!r)return"/mnt/";let o=await Fxt.default.readFile(n,{encoding:"utf8"}),s=/(?<!#.*)root\s*=\s*(?<mountPoint>.*)/g.exec(o);if(!s)return"/mnt/";return t=s.groups.mountPoint.trim(),t=t.endsWith("/")?t:`${t}/`,t}})()});
export {rPr,Fxt,Jqu,Xqu,oPr,bXs};
