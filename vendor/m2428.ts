// @ts-nocheck
import {Ptt,AAn} from "../src/config/2428_type.ts";
import {du,iw} from "./m2302.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b} from "../runtime.ts";
async function B0i({stdout:e=process.stdout,stdin:t=process.stdin,stderr:n=process.stderr,exitOnCtrlC:r=!0,patchConsole:o=!0,onFrame:s,nativeCursor:i,isScreenReaderEnabled:a}={}){await Promise.resolve();let l=new Ptt({stdout:e,stdin:t,stderr:n,exitOnCtrlC:r,patchConsole:o,onFrame:s,nativeCursor:i,isScreenReaderEnabled:a});return du.set(e,l),{render:(c)=>l.render(c),unmount:()=>l.unmount(),waitUntilExit:()=>l.waitUntilExit()}}
var F0i,Eyd=(e,t)=>{let n=Ayd(t),r={stdout:process.stdout,stdin:process.stdin,stderr:process.stderr,exitOnCtrlC:!0,patchConsole:!0,...n},o=Ryd(r.stdout,()=>new Ptt(r));return o.render(e),{rerender:o.render,unmount(){o.unmount()},waitUntilExit:o.waitUntilExit,cleanup:()=>du.delete(r.stdout)}},Cyd=async(e,t)=>{await Promise.resolve();let n=Eyd(e,t);return logForDebugging(`[render] first ink render: ${Math.round(process.uptime()*1000)}ms since process start`),n},Xqr,Ayd=(e={})=>{if(e instanceof F0i.Stream)return{stdout:e,stdin:process.stdin};return e},Ryd=(e,t)=>{let n=du.get(e);if(!n)n=t(),du.set(e,n);return n};
var U0i=b(()=>{qe();AAn();iw();F0i=require("stream"),Xqr=Cyd});
export {B0i,F0i,Eyd,Cyd,Xqr,Ayd,Ryd,U0i};
