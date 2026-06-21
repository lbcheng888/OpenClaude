// @ts-nocheck
import {zt,qs} from "./m635.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
function QXi(e){let t=e?.platform??zt(),n=e?.homedir??XXi.homedir(),r=e?.env??process.env,o={HOME:n,DESKTOP:I$e.join(n,"Desktop"),DOCUMENTS:I$e.join(n,"Documents"),DOWNLOADS:I$e.join(n,"Downloads")};switch(t){case"windows":{let s=r.USERPROFILE||n;return{HOME:n,DESKTOP:I$e.join(s,"Desktop"),DOCUMENTS:I$e.join(s,"Documents"),DOWNLOADS:I$e.join(s,"Downloads")}}case"linux":case"wsl":return{HOME:n,DESKTOP:r.XDG_DESKTOP_DIR||o.DESKTOP,DOCUMENTS:r.XDG_DOCUMENTS_DIR||o.DOCUMENTS,DOWNLOADS:r.XDG_DOWNLOAD_DIR||o.DOWNLOADS};case"macos":default:{if(t==="unknown")logForDebugging("Unknown platform detected, using default paths");return o}}}
var XXi,I$e;
var ZXi=b(()=>{qe();qs();XXi=require("os"),I$e=require("path")});
export {QXi,XXi,I$e,ZXi};
