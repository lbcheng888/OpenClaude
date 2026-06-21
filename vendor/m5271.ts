// @ts-nocheck
import {zt,qs} from "./m635.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {Gi,ReactHooks} from "./m133.ts";
import {b} from "../runtime.ts";
import {bt} from "./m195.ts";
function V9l(){if(U8e++,U8e===1){if(Yne!==null)clearTimeout(Yne),Yne=null;J9l(),hRm()}}
function K9l(){if(U8e>0)U8e--;if(U8e===0&&Yne===null)Yne=setTimeout(()=>{Yne=null,Y9l(),VDo()},fRm),Yne.unref()}
function ARm(){if(U8e=0,Yne!==null)clearTimeout(Yne),Yne=null;Y9l(),VDo()}
function z9l(){let e=String(pRm);if(zt()==="macos")return["caffeinate",["-i","-t",e]];return null}
function hRm(){if(z9l()===null)return;if(HAt!==null)return;HAt=setInterval(()=>{if(U8e>0||Yne!==null)logForDebugging("Restarting sleep inhibitor to maintain prevention"),VDo(),J9l()},mRm),HAt.unref()}
function Y9l(){if(HAt!==null)clearInterval(HAt),HAt=null}
function J9l(){let e=z9l();if(e===null)return;if(mj!==null)return;if(!W9l)W9l=!0,Gi(async()=>{ARm()});try{let[t,n]=e;mj=G9l.spawn(t,n,{stdio:"ignore",windowsHide:!0}),mj.unref();let r=mj;mj.on("error",(o)=>{if(logForDebugging(`sleep inhibitor spawn error: ${o.message}`),mj===r)mj=null}),mj.on("exit",()=>{if(mj===r)mj=null}),logForDebugging(`Started ${t} to prevent sleep`)}catch{mj=null}}
function VDo(){if(mj!==null){let e=mj;mj=null;try{e.kill("SIGKILL"),logForDebugging("Stopped sleep inhibitor, allowing sleep")}catch{}}}
var G9l,pRm=300,mRm=240000,fRm=30000,mj=null,HAt=null,Yne=null,U8e=0,W9l=!1;
var X9l=b(()=>{ReactHooks();qe();bt();qs();G9l=require("child_process")});
export {V9l,K9l,ARm,z9l,hRm,Y9l,J9l,VDo,G9l,pRm,mRm,fRm,mj,HAt,Yne,U8e,W9l,X9l};
