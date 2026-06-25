// @ts-nocheck
import {b} from "../runtime.ts";
function gOr(e={}){let{maxRetries:t=20}=e;return{name:"redirectPolicy",async sendRequest(n,r){let o=await r(n);return gYs(r,o,t)}}}
async function gYs(e,t,n,r=0){let{request:o,status:s,headers:i}=t,a=i.get("location");if(a&&(s===300||s===301&&hYs.includes(o.method)||s===302&&hYs.includes(o.method)||s===303&&o.method==="POST"||s===307)&&r<n){let l=new URL(a,o.url);if(o.url=l.toString(),s===303)o.method="GET",o.headers.delete("Content-Length"),delete o.body;o.headers.delete("Authorization");let c=await e(o);return gYs(e,c,n,r+1)}return t}
var hYs;
var _Ys=b(()=>{hYs=["GET","HEAD"]});
export {gOr,gYs,hYs,_Ys};
