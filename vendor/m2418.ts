// @ts-nocheck
import {DZe,NSn} from "../src/tui/2418_type.ts";
import {qu,bk} from "./m2291.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function wvi({stdout:e=process.stdout,stdin:t=process.stdin,stderr:n=process.stderr,exitOnCtrlC:r=!0,patchConsole:o=!0,onFrame:s,nativeCursor:i,isScreenReaderEnabled:a}={}){await Promise.resolve();let l=new DZe({stdout:e,stdin:t,stderr:n,exitOnCtrlC:r,patchConsole:o,onFrame:s,nativeCursor:i,isScreenReaderEnabled:a});return qu.set(e,l),{render:(c)=>l.render(c),unmount:()=>l.unmount(),waitUntilExit:()=>l.waitUntilExit()}}
var vvi,Xad=(e,t)=>{let n=Zad(t),r={stdout:process.stdout,stdin:process.stdin,stderr:process.stderr,exitOnCtrlC:!0,patchConsole:!0,...n},o=eld(r.stdout,()=>new DZe(r));return o.render(e),{rerender:o.render,unmount(){o.unmount()},waitUntilExit:o.waitUntilExit,cleanup:()=>qu.delete(r.stdout)}},Qad=async(e,t)=>{await Promise.resolve();let n=Xad(e,t);return logForDebugging(`[render] first ink render: ${Math.round(process.uptime()*1000)}ms since process start`),n},T$r,Zad=(e={})=>{if(e instanceof vvi.Stream)return{stdout:e,stdin:process.stdin};return e},eld=(e,t)=>{let n=qu.get(e);if(!n)n=t(),qu.set(e,n);return n};
var Rvi=b(()=>{qe();NSn();bk();vvi=require("stream"),T$r=Qad});
export {wvi,vvi,Xad,Qad,T$r,Zad,eld,Rvi};
