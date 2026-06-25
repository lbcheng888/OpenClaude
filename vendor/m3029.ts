// @ts-nocheck
import {b} from "../runtime.ts";
var m0n=(e)=>e.name==="up"||e.name==="k"||e.ctrl&&e.name==="p",Qjr=(e)=>e.name==="down"||e.name==="j"||e.ctrl&&e.name==="n",f0n=(e)=>e.name==="backspace",zXi=(e)=>"123456789".includes(e.name),Xot=(e)=>e.name==="enter"||e.name==="return";
var Zjr,eYr,tYr,nYr,J1t;
var h0n=b(()=>{Zjr=class Zjr extends Error{name="AbortPromptError";message="Prompt was aborted";constructor(e){super();this.cause=e?.cause}};eYr=class eYr extends Error{name="CancelPromptError";message="Prompt was canceled"};tYr=class tYr extends Error{name="ExitPromptError"};nYr=class nYr extends Error{name="HookError"};J1t=class J1t extends Error{name="ValidationError"}});
export {m0n,Qjr,f0n,zXi,Xot,Zjr,eYr,tYr,nYr,J1t,h0n};
