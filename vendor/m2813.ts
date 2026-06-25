// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {ZM,Ove} from "./m2375.ts";
import {bt,Gc} from "./m588.ts";
import {N1t,uj} from "./m2812.ts";
import {kWi,EW} from "./m2811.ts";
import {b} from "../runtime.ts";
function FFd(e,t){let n=e.split(`
`),r=[];for(let s of n){let i=sn(s);if(i<=t)r.push(s.trimEnd());else{let a=0;while(a<i){let l=ZM(s,a,a+t);r.push(l.trimEnd()),a+=t}}}let o=r.length-nHe;if(o===1)return{aboveTheFold:r.slice(0,nHe+1).join(`
`).trimEnd(),remainingLines:0};return{aboveTheFold:r.slice(0,nHe).join(`
`).trimEnd(),remainingLines:Math.max(0,o)}}
function xWi(e,t,n=!1){let r=e.trimEnd();if(!r)return"";let o=Math.max(t-IWi,10),s=nHe*o*4,i=r.length>s,a=i?r.slice(0,s):r,{aboveTheFold:l,remainingLines:c}=FFd(a,o),u=c;if(i){let d=0,p=-1;for(;;){if(p=r.indexOf(`
`,p+1),p===-1)break;d++}let m=Math.max(d+1,Math.ceil(r.length/o));u=Math.max(c,m-nHe)}return[l,u>0?bt.dim(N1t(u)+(n?"":` ${kWi()}`)):""].filter(Boolean).join(`
`)}
function T1(e,t){if(typeof e!=="string")return!1;let n=e.trimEnd(),r=0,o=0;for(let c=0;c<=nHe;c++){if(r=n.indexOf(`
`,r),r===-1)break;o++,r++}if(r!==-1&&r<n.length)return!0;if(t===void 0)return!1;let s=Math.max(t-IWi,10),i=nHe+1,a=nHe*s*4;if(n.length>a)return!0;if(o===0){let c=i*s;if(n.length<=c)return!1;return sn(n)>c}let l=0;for(let c of n.split(`
`))if(l+=Math.max(1,Math.ceil(sn(c)/s)),l>i)return!0;return!1}
var nHe=3,IWi=10;
var rHe=b(()=>{Gc();EW();uj();mc();Ove()});
export {FFd,xWi,T1,nHe,IWi,rHe};
