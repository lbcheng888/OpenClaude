// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {U1,Yve} from "./m2365.ts";
import {_t,cu} from "./m582.ts";
import {lLt,Oz} from "./m2799.ts";
import {M9i,iW} from "./m2798.ts";
import {b} from "../runtime.ts";
function Qkd(e,t){let n=e.split(`
`),r=[];for(let s of n){let i=tn(s);if(i<=t)r.push(s.trimEnd());else{let a=0;while(a<i){let l=U1(s,a,a+t);r.push(l.trimEnd()),a+=t}}}let o=r.length-gxe;if(o===1)return{aboveTheFold:r.slice(0,gxe+1).join(`
`).trimEnd(),remainingLines:0};return{aboveTheFold:r.slice(0,gxe).join(`
`).trimEnd(),remainingLines:Math.max(0,o)}}
function F9i(e,t,n=!1){let r=e.trimEnd();if(!r)return"";let o=Math.max(t-B9i,10),s=gxe*o*4,i=r.length>s,a=i?r.slice(0,s):r,{aboveTheFold:l,remainingLines:c}=Qkd(a,o),u=c;if(i){let d=0,p=-1;for(;;){if(p=r.indexOf(`
`,p+1),p===-1)break;d++}let m=Math.max(d+1,Math.ceil(r.length/o));u=Math.max(c,m-gxe)}return[l,u>0?_t.dim(lLt(u)+(n?"":` ${M9i()}`)):""].filter(Boolean).join(`
`)}
function Tq(e,t){if(typeof e!=="string")return!1;let n=e.trimEnd(),r=0,o=0;for(let c=0;c<=gxe;c++){if(r=n.indexOf(`
`,r),r===-1)break;o++,r++}if(r!==-1&&r<n.length)return!0;if(t===void 0)return!1;let s=Math.max(t-B9i,10),i=gxe+1,a=gxe*s*4;if(n.length>a)return!0;if(o===0){let c=i*s;if(n.length<=c)return!1;return tn(n)>c}let l=0;for(let c of n.split(`
`))if(l+=Math.max(1,Math.ceil(tn(c)/s)),l>i)return!0;return!1}
var gxe=3,B9i=10;
var o$e=b(()=>{cu();iW();Oz();Hc();Yve()});
export {Qkd,F9i,Tq,gxe,B9i,o$e};
