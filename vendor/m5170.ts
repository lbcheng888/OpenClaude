// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {vd,Ws} from "../src/session/1465_promise.ts";
import {J$l,Y$l} from "./m5168.ts";
import {Q$l,X$l} from "./m5169.ts";
var Z$l={};
ft(Z$l,{stopNonInteractive:()=>stopNonInteractive,default:()=>svm});
var rvm,stopNonInteractive,svm;
var e9l=b(()=>{vd();rvm={type:"local-jsx",name:"stop",description:"Stop this background session; transcript and worktree are kept",immediate:!0,isEnabled:Ws,load:()=>Promise.resolve().then(() => (J$l(),Y$l))},stopNonInteractive={type:"local",name:"stop",supportsNonInteractive:!0,description:"Stop this background session; transcript and worktree are kept",isEnabled:Ws,load:()=>Promise.resolve().then(() => (Q$l(),X$l))},svm=rvm});
export {Z$l,rvm,stopNonInteractive,svm,e9l};
