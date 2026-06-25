// @ts-nocheck
import {Yt,Es} from "./m641.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {Si,ud} from "./m134.ts";
import {b} from "../runtime.ts";
import {Ct} from "./m197.ts";
function eKl(){if(PGe++,PGe===1){if(Wne!==null)clearTimeout(Wne),Wne=null;oKl(),VLm()}}
function tKl(){if(PGe>0)PGe--;if(PGe===0&&Wne===null)Wne=setTimeout(()=>{Wne=null,rKl(),TNo()},WLm),Wne.unref()}
function GLm(){if(PGe=0,Wne!==null)clearTimeout(Wne),Wne=null;rKl(),TNo()}
function nKl(){let e=String($Lm);if(Yt()==="macos")return["caffeinate",["-i","-t",e]];return null}
function VLm(){if(nKl()===null)return;if(z_t!==null)return;z_t=setInterval(()=>{if(PGe>0||Wne!==null)logForDebugging("Restarting sleep inhibitor to maintain prevention"),TNo(),oKl()},qLm),z_t.unref()}
function rKl(){if(z_t!==null)clearInterval(z_t),z_t=null}
function oKl(){let e=nKl();if(e===null)return;if(G6!==null)return;if(!QVl)QVl=!0,Si(async()=>{GLm()});try{let[t,n]=e;G6=ZVl.spawn(t,n,{stdio:"ignore",windowsHide:!0}),G6.unref();let r=G6;G6.on("error",(o)=>{if(logForDebugging(`sleep inhibitor spawn error: ${o.message}`),G6===r)G6=null}),G6.on("exit",()=>{if(G6===r)G6=null}),logForDebugging(`Started ${t} to prevent sleep`)}catch{G6=null}}
function TNo(){if(G6!==null){let e=G6;G6=null;try{e.kill("SIGKILL"),logForDebugging("Stopped sleep inhibitor, allowing sleep")}catch{}}}
var ZVl,$Lm=300,qLm=240000,WLm=30000,G6=null,z_t=null,Wne=null,PGe=0,QVl=!1;
var sKl=b(()=>{ud();qe();Ct();Es();ZVl=require("child_process")});
export {eKl,tKl,GLm,nKl,VLm,rKl,oKl,TNo,ZVl,$Lm,qLm,WLm,G6,z_t,Wne,PGe,QVl,sKl};
