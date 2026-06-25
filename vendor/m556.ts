// @ts-nocheck
import {ZZo,ees} from "./m554.ts";
import {tes,nes} from "./m555.ts";
import {rr,oC} from "./m466.ts";
import {b} from "../runtime.ts";
var Ope=(e,t,n=3)=>{let r=0,o=ZZo(50,250);return tes((s)=>{let i=s.loaded,a=s.lengthComputable?s.total:void 0,l=a!=null?Math.min(i,a):i,c=Math.max(0,l-r),u=o(c);r=Math.max(r,l);let d={loaded:l,total:a,progress:a?l/a:void 0,bytes:c,rate:u?u:void 0,estimated:u&&a?(a-l)/u:void 0,event:s,lengthComputable:a!=null,[t?"download":"upload"]:!0};e(d)},n)},Yze=(e,t)=>{let n=e!=null;return[(r)=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},Jze=(e)=>(...t)=>rr.asap(()=>e(...t));
var Jnn=b(()=>{ees();nes();oC()});
export {Ope,Yze,Jze,Jnn};
