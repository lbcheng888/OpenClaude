// @ts-nocheck
import {Q} from "../runtime.ts";
var ryr=Q((mrn)=>{Object.defineProperty(mrn,"__esModule",{value:!0});mrn.getHomeDir=void 0;var Tnu=require("os"),Snu=require("path"),nyr={},bnu=()=>{if(process&&process.geteuid)return`${process.geteuid()}`;return"DEFAULT"},Enu=()=>{let{HOME:e,USERPROFILE:t,HOMEPATH:n,HOMEDRIVE:r=`C:${Snu.sep}`}=process.env;if(e)return e;if(t)return t;if(n)return`${r}${n}`;let o=bnu();if(!nyr[o])nyr[o]=(0,Tnu.homedir)();return nyr[o]};mrn.getHomeDir=Enu});
export {ryr};
