// @ts-nocheck
import {b} from "../runtime.ts";
function eVc(e,t){e=e||10;let n=Array(e),r=Array(e),o=0,s=0,i;return t=t!==void 0?t:1000,function(l){let c=Date.now(),u=r[s];if(!i)i=c;n[o]=l,r[o]=c;let d=s,p=0;while(d!==o)p+=n[d++],d=d%e;if(o=(o+1)%e,o===s)s=(s+1)%e;if(c-i<t)return;let m=u&&c-u;return m?Math.round(p*1000/m):void 0}}
var ZZo;
var ees=b(()=>{ZZo=eVc});
export {eVc,ZZo,ees};
