// @ts-nocheck
import {Yt,Es} from "./m641.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function Voa(e){let t=e?.platform??Yt(),n=e?.homedir??Goa.homedir(),r=e?.env??process.env,o={HOME:n,DESKTOP:O9e.join(n,"Desktop"),DOCUMENTS:O9e.join(n,"Documents"),DOWNLOADS:O9e.join(n,"Downloads")};switch(t){case"windows":{let s=r.USERPROFILE||n;return{HOME:n,DESKTOP:O9e.join(s,"Desktop"),DOCUMENTS:O9e.join(s,"Documents"),DOWNLOADS:O9e.join(s,"Downloads")}}case"linux":case"wsl":return{HOME:n,DESKTOP:r.XDG_DESKTOP_DIR||o.DESKTOP,DOCUMENTS:r.XDG_DOCUMENTS_DIR||o.DOCUMENTS,DOWNLOADS:r.XDG_DOWNLOAD_DIR||o.DOWNLOADS};case"macos":default:{if(t==="unknown")logForDebugging("Unknown platform detected, using default paths");return o}}}
var Goa,O9e;
var Koa=b(()=>{qe();Es();Goa=require("os"),O9e=require("path")});
export {Voa,Goa,O9e,Koa};
