// @ts-nocheck
import {X} from "../runtime.ts";
var lAl=X((wWn)=>{var Tjt=new Uint8Array(512),vWn=new Uint8Array(256);(function(){let t=1;for(let n=0;n<255;n++)if(Tjt[n]=t,vWn[t]=n,t<<=1,t&256)t^=285;for(let n=255;n<512;n++)Tjt[n]=Tjt[n-255]})();wWn.log=function(t){if(t<1)throw Error("log("+t+")");return vWn[t]};wWn.exp=function(t){return Tjt[t]};wWn.mul=function(t,n){if(t===0||n===0)return 0;return Tjt[vWn[t]+vWn[n]]}});
export {lAl};
