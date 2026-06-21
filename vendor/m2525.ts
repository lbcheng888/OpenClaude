// @ts-nocheck
import {b} from "../runtime.ts";
import {ta,wn} from "./m45.ts";
function eL(e){return Math.round(e*HHi)/HHi}
function mEn(e){return eL(e/360)*360}
function fEn(e,t){return(1-Math.cos(2*Math.PI*e/t))/2}
function tL(e,t,n){return{r:Math.round(e.r+(t.r-e.r)*n),g:Math.round(e.g+(t.g-e.g)*n),b:Math.round(e.b+(t.b-e.b)*n)}}
function nL(e){return`rgb(${e.r},${e.g},${e.b})`}
function AEn(e){let t=(e%360+360)%360,n=0.7,r=0.6,o=(1-Math.abs(0.19999999999999996))*0.7,s=o*(1-Math.abs(t/60%2-1)),i=0.6-o/2,a=0,l=0,c=0;if(t<60)a=o,l=s;else if(t<120)a=s,l=o;else if(t<180)l=o,c=s;else if(t<240)l=s,c=o;else if(t<300)a=s,c=o;else a=o,c=s;return{r:Math.round((a+i)*255),g:Math.round((l+i)*255),b:Math.round((c+i)*255)}}
function with1mTag(e){let t=IHi.get(e);if(t!==void 0)return t;let n=e.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/),r=n?{r:parseInt(n[1],10),g:parseInt(n[2],10),b:parseInt(n[3],10)}:null;return IHi.set(e,r),r}
var AAe,HHi=8,IHi;
var GZ=b(()=>{ta();AAe=wn(()=>{if(process.env.TERM==="xterm-ghostty")return["\xB7","\u2722","\u2733","\u2736","\u273B","\u273B"];return["\xB7","\u2722","\u2733","\u2736","\u273B","\u273D"]},()=>process.env.TERM);IHi=new Map});
export {eL,mEn,fEn,tL,nL,AEn,with1mTag,AAe,HHi,IHi,GZ};
