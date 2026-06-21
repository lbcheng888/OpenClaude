// @ts-nocheck
import {nzo,rzo} from "./m548.ts";
import {ozo,szo} from "./m549.ts";
import {er,ZE} from "./m460.ts";
import {b} from "../runtime.ts";
var wpe=(e,t,n=3)=>{let r=0,o=nzo(50,250);return ozo((s)=>{let i=s.loaded,a=s.lengthComputable?s.total:void 0,l=a!=null?Math.min(i,a):i,c=Math.max(0,l-r),u=o(c);r=Math.max(r,l);let d={loaded:l,total:a,progress:a?l/a:void 0,bytes:c,rate:u?u:void 0,estimated:u&&a?(a-l)/u:void 0,event:s,lengthComputable:a!=null,[t?"download":"upload"]:!0};e(d)},n)},XVe=(e,t)=>{let n=e!=null;return[(r)=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},QVe=(e)=>(...t)=>er.asap(()=>e(...t));
var Aen=b(()=>{rzo();szo();ZE()});
export {wpe,XVe,QVe,Aen};
