// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {hp,_i} from "../src/session/1460_promise.ts";
import {dLl,uLl} from "./m5136.ts";
import {mLl,pLl} from "./m5137.ts";
var fLl={};
isFullscreenWithTTY(fLl,{stopNonInteractive:()=>stopNonInteractive,default:()=>Fhm});
var Nhm,stopNonInteractive,Fhm;
var ALl=b(()=>{hp();Nhm={type:"local-jsx",name:"stop",description:"Stop this background session; transcript and worktree are kept",immediate:!0,isEnabled:_i,load:()=>Promise.resolve().then(() => (dLl(),uLl))},stopNonInteractive={type:"local",name:"stop",supportsNonInteractive:!0,description:"Stop this background session; transcript and worktree are kept",isEnabled:_i,load:()=>Promise.resolve().then(() => (mLl(),pLl))},Fhm=Nhm});
export {fLl,Nhm,stopNonInteractive,Fhm,ALl};
