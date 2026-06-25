// @ts-nocheck
import {b} from "../runtime.ts";
function $qr(e,t){let n=e&&(t?.demoRuler??!0);if(hAn===e&&Fqr===n)return;if(hAn=e,Fqr=n,!e)Uqr=null;for(let r of gAn)r()}
function Dtt(e){return gAn.add(e),()=>gAn.delete(e)}
function g0i(){return Uqr}
function _0i(){return hAn}
function y0i(){return Fqr}
function J_d(){j_d={enabled:PPt,events:xtt,position:Bqr};for(let e of Y_d)e()}
function qqr(e,t,n,r){if(hAn){Uqr={wheelMode:n.wheelMode};for(let s of gAn)s()}if(!PPt)return;let o=Nqr===0?1/0:r-Nqr;Nqr=r,S0i({kind:"in",ts:r,dir:e,step:t,flip:n.pendingFlip&&t===0,gap:o,mult:n.mult,wheelMode:n.wheelMode,burst:n.burstCount,jbBypass:n.jbBypass})}
function T0i(e,t,n){if(!PPt)return;S0i({kind:"out",ts:performance.now(),applied:e,remaining:t,algo:n})}
function Wqr(e){if(!PPt)return;Bqr={top:e.getScrollTop(),height:e.getScrollHeight(),viewport:e.getViewportHeight()}}
function S0i(e){xtt=xtt.length>=256?[...xtt.slice(-255),e]:[...xtt,e],J_d()}
var PPt=!1,xtt,Bqr=null,Nqr=0,j_d,Y_d,hAn=!1,Fqr=!1,Uqr=null,gAn;
var d2e=b(()=>{xtt=[],j_d={enabled:PPt,events:xtt,position:Bqr},Y_d=new Set,gAn=new Set});
export {$qr,Dtt,g0i,_0i,y0i,J_d,qqr,T0i,Wqr,S0i,PPt,xtt,Bqr,Nqr,j_d,Y_d,hAn,Fqr,Uqr,gAn,d2e};
