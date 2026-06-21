// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {hts,gts,fts,Ats,oEt,PAr,ztn,Y7e,Ytn,_be} from "./m705.ts";
var Xns={};
isFullscreenWithTTY(Xns,{startMdmRawRead:()=>startMdmRawRead,getMdmRawReadPromise:()=>getMdmRawReadPromise,fireRawRead:()=>fireRawRead});
function Chr(e,t){return new Promise((n)=>{try{Yns.execFile(e,t,{encoding:"utf-8",timeout:hts,windowsHide:!0},(r,o)=>{n({stdout:o??"",code:r?1:0})})}catch{n({stdout:"",code:1})}})}
function fireRawRead(){return(async()=>{{let e=gts(),n=(await Promise.all(e.map(async({path:r,label:o})=>{if(!Jns.existsSync(r))return{stdout:"",label:o,ok:!1};let{stdout:s,code:i}=await Chr(fts,[...Ats,r]);return{stdout:s,label:o,ok:i===0&&!!s}}))).find((r)=>r.ok);return{plistStdouts:n?[{stdout:n.stdout,label:n.label}]:[],hklmStdout:null,hkcuStdout:null}}if(oEt()){let[e,t]=await Promise.all([Chr(PAr,["query",ztn,"/v",Y7e]),Chr(PAr,["query",Ytn,"/v",Y7e])]);return{plistStdouts:null,hklmStdout:e.code===0?e.stdout:null,hkcuStdout:t.code===0?t.stdout:null}}return{plistStdouts:null,hklmStdout:null,hkcuStdout:null}})()}
function startMdmRawRead(){if(vhr)return;vhr=fireRawRead()}
function getMdmRawReadPromise(){return vhr}
var Yns,Jns,vhr=null;
var Lnn=b(()=>{_be();Yns=require("child_process"),Jns=require("fs")});
export {Xns,Chr,fireRawRead,startMdmRawRead,getMdmRawReadPromise,Yns,Jns,vhr,Lnn};
