// @ts-nocheck
import {b} from "../runtime.ts";
import {UDt} from "./m2651.ts";
async function hLi(e,t,n,r={command:"rg"}){let{command:o,args:s=[],argv0:i}=r,a=ALi.spawn(o,[...s,...e,t],{argv0:i,signal:n,timeout:1e4,windowsHide:!0}),[l,c,u]=await Promise.all([vqr.text(a.stdout),vqr.text(a.stderr),new Promise((d,p)=>{a.on("close",d),a.on("error",p)})]);if(u===0)return l.trim().split(`
`).filter(Boolean);if(u===1)return[];throw Error(`ripgrep failed with exit code ${u}: ${c}`)}
var ALi,vqr;
var gLi=b(()=>{UDt();ALi=require("child_process"),vqr=require("stream/consumers")});
export {hLi,ALi,vqr,gLi};
