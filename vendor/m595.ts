// @ts-nocheck
import {X} from "../runtime.ts";
var xmr=X((Den)=>{Object.defineProperty(Den,"__esModule",{value:!0});Den.getHomeDir=void 0;var n7c=require("os"),r7c=require("path"),Rmr={},o7c=()=>{if(process&&process.geteuid)return`${process.geteuid()}`;return"DEFAULT"},s7c=()=>{let{HOME:e,USERPROFILE:t,HOMEPATH:n,HOMEDRIVE:r=`C:${r7c.sep}`}=process.env;if(e)return e;if(t)return t;if(n)return`${r}${n}`;let o=o7c();if(!Rmr[o])Rmr[o]=(0,n7c.homedir)();return Rmr[o]};Den.getHomeDir=s7c});
export {xmr};
