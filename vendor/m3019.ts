// @ts-nocheck
import {b} from "../runtime.ts";
var Cxn=(e)=>e.name==="up"||e.name==="k"||e.ctrl&&e.name==="p",gGr=(e)=>e.name==="down"||e.name==="j"||e.ctrl&&e.name==="n",vxn=(e)=>e.name==="backspace",eVi=(e)=>"123456789".includes(e.name),Knt=(e)=>e.name==="enter"||e.name==="return";
var _Gr,yGr,TGr,SGr,bLt;
var wxn=b(()=>{_Gr=class _Gr extends Error{name="AbortPromptError";message="Prompt was aborted";constructor(e){super();this.cause=e?.cause}};yGr=class yGr extends Error{name="CancelPromptError";message="Prompt was canceled"};TGr=class TGr extends Error{name="ExitPromptError"};SGr=class SGr extends Error{name="HookError"};bLt=class bLt extends Error{name="ValidationError"}});
export {Cxn,gGr,vxn,eVi,Knt,_Gr,yGr,TGr,SGr,bLt,wxn};
