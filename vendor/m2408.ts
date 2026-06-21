// @ts-nocheck
import {b} from "../runtime.ts";
function u$r(e,t){let n=e&&(t?.demoRuler??!0);if(xSn===e&&a$r===n)return;if(xSn=e,a$r=n,!e)c$r=null;for(let r of kSn)r()}
function IZe(e){return kSn.add(e),()=>kSn.delete(e)}
function rvi(){return c$r}
function ovi(){return xSn}
function svi(){return a$r}
function vad(){Ead={enabled:n0t,events:HZe,position:l$r};for(let e of Cad)e()}
function d$r(e,t,n,r){if(xSn){c$r={wheelMode:n.wheelMode};for(let s of kSn)s()}if(!n0t)return;let o=i$r===0?1/0:r-i$r;i$r=r,avi({kind:"in",ts:r,dir:e,step:t,flip:n.pendingFlip&&t===0,gap:o,mult:n.mult,wheelMode:n.wheelMode,burst:n.burstCount,jbBypass:n.jbBypass})}
function ivi(e,t,n){if(!n0t)return;avi({kind:"out",ts:performance.now(),applied:e,remaining:t,algo:n})}
function p$r(e){if(!n0t)return;l$r={top:e.getScrollTop(),height:e.getScrollHeight(),viewport:e.getViewportHeight()}}
function avi(e){HZe=HZe.length>=256?[...HZe.slice(-255),e]:[...HZe,e],vad()}
var n0t=!1,HZe,l$r=null,i$r=0,Ead,Cad,xSn=!1,a$r=!1,c$r=null,kSn;
var fUe=b(()=>{HZe=[],Ead={enabled:n0t,events:HZe,position:l$r},Cad=new Set,kSn=new Set});
export {u$r,IZe,rvi,ovi,svi,vad,d$r,ivi,p$r,avi,n0t,HZe,l$r,i$r,Ead,Cad,xSn,a$r,c$r,kSn,fUe};
