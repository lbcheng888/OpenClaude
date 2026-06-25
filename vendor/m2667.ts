// @ts-nocheck
import {b} from "../runtime.ts";
import {yLt} from "./m2662.ts";
async function jUi(e,t,n,r={command:"rg"}){let{command:o,args:s=[],argv0:i}=r,a=zUi.spawn(o,[...s,...e,t],{argv0:i,signal:n,timeout:1e4,windowsHide:!0}),[l,c,u]=await Promise.all([rGr.text(a.stdout),rGr.text(a.stderr),new Promise((d,p)=>{a.on("close",d),a.on("error",p)})]);if(u===0)return l.trim().split(`
`).filter(Boolean);if(u===1)return[];throw Error(`ripgrep failed with exit code ${u}: ${c}`)}
var zUi,rGr;
var YUi=b(()=>{yLt();zUi=require("child_process"),rGr=require("stream/consumers")});
export {jUi,zUi,rGr,YUi};
