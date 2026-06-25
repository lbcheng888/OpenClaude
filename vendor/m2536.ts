// @ts-nocheck
import {b} from "../runtime.ts";
import {Wi,Hn} from "./m100.ts";
function _O(e){return Math.round(e*XLi)/XLi}
function evn(e){return _O(e/360)*360}
function tvn(e,t){return(1-Math.cos(2*Math.PI*e/t))/2}
function yO(e,t,n){return{r:Math.round(e.r+(t.r-e.r)*n),g:Math.round(e.g+(t.g-e.g)*n),b:Math.round(e.b+(t.b-e.b)*n)}}
function TO(e){return`rgb(${e.r},${e.g},${e.b})`}
function nvn(e){let t=(e%360+360)%360,n=0.7,r=0.6,o=(1-Math.abs(0.19999999999999996))*0.7,s=o*(1-Math.abs(t/60%2-1)),i=0.6-o/2,a=0,l=0,c=0;if(t<60)a=o,l=s;else if(t<120)a=s,l=o;else if(t<180)l=o,c=s;else if(t<240)l=s,c=o;else if(t<300)a=s,c=o;else a=o,c=s;return{r:Math.round((a+i)*255),g:Math.round((l+i)*255),b:Math.round((c+i)*255)}}
function KF(e){let t=QLi.get(e);if(t!==void 0)return t;let n=e.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/),r=n?{r:parseInt(n[1],10),g:parseInt(n[2],10),b:parseInt(n[3],10)}:null;return QLi.set(e,r),r}
var khe,XLi=8,QLi;
var $Z=b(()=>{Wi();khe=Hn(()=>{if(process.env.TERM==="xterm-ghostty")return["\xB7","\u2722","\u2733","\u2736","\u273B","\u273B"];return["\xB7","\u2722","\u2733","\u2736","\u273B","\u273D"]},()=>process.env.TERM);QLi=new Map});
export {_O,evn,tvn,yO,TO,nvn,KF,khe,XLi,QLi,$Z};
