// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {pas,mas,uas,das,xRt,lSr,kon,zje,Hon,ZEe} from "./m710.ts";
var Vls={};
ft(Vls,{startMdmRawRead:()=>startMdmRawRead,getMdmRawReadPromise:()=>getMdmRawReadPromise,fireRawRead:()=>fireRawRead});
function ZSr(e,t){return new Promise((n)=>{try{Wls.execFile(e,t,{encoding:"utf-8",timeout:pas,windowsHide:!0},(r,o)=>{n({stdout:o??"",code:r?1:0})})}catch{n({stdout:"",code:1})}})}
function fireRawRead(){return(async()=>{{let e=mas(),n=(await Promise.all(e.map(async({path:r,label:o})=>{if(!Gls.existsSync(r))return{stdout:"",label:o,ok:!1};let{stdout:s,code:i}=await ZSr(uas,[...das,r]);return{stdout:s,label:o,ok:i===0&&!!s}}))).find((r)=>r.ok);return{plistStdouts:n?[{stdout:n.stdout,label:n.label}]:[],hklmStdout:null,hkcuStdout:null}}if(xRt()){let[e,t]=await Promise.all([ZSr(lSr,["query",kon,"/v",zje]),ZSr(lSr,["query",Hon,"/v",zje])]);return{plistStdouts:null,hklmStdout:e.code===0?e.stdout:null,hkcuStdout:t.code===0?t.stdout:null}}return{plistStdouts:null,hklmStdout:null,hkcuStdout:null}})()}
function startMdmRawRead(){if(ebr)return;ebr=fireRawRead()}
function getMdmRawReadPromise(){return ebr}
var Wls,Gls,ebr=null;
var ysn=b(()=>{ZEe();Wls=require("child_process"),Gls=require("fs")});
export {Vls,ZSr,fireRawRead,startMdmRawRead,getMdmRawReadPromise,Wls,Gls,ebr,ysn};
