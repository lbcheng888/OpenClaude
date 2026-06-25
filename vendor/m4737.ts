// @ts-nocheck
import {Q} from "../runtime.ts";
var oCl=Q((pzn)=>{var FWt=new Uint8Array(512),dzn=new Uint8Array(256);(function(){let t=1;for(let n=0;n<255;n++)if(FWt[n]=t,dzn[t]=n,t<<=1,t&256)t^=285;for(let n=255;n<512;n++)FWt[n]=FWt[n-255]})();pzn.log=function(t){if(t<1)throw Error("log("+t+")");return dzn[t]};pzn.exp=function(t){return FWt[t]};pzn.mul=function(t,n){if(t===0||n===0)return 0;return FWt[dzn[t]+dzn[n]]}});
export {oCl};
