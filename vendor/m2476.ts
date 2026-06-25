// @ts-nocheck
import {Qxi,Az} from "./m2471.ts";
import {Yt,Es} from "./m641.ts";
import {lDi,w6r,H6r} from "./m2475.ts";
import {b} from "../runtime.ts";
function x6r(e,t,n){let r=!1,o;for(let s=0;s<n.length;s++){let i=n[s];if(!i||i.context!==t||i.action!==e)continue;r=!0;let a=!1;for(let l=s+1;l<n.length;l++){let c=n[l];if(c&&c.context===t&&I6r(c.chord,i.chord)){a=!0;break}}if(!a)o=i.chord}if(o)return o;return r?null:void 0}
function uDi(e,t,n){let r=new Set(t),o=new Map;for(let i of n){if(!r.has(i.context))continue;let a=o.get(i.context);if(a)a.push(i);else o.set(i.context,[i])}let s=!1;for(let i=0;i<t.length;i++){let a=t[i];if(a===void 0)continue;let l=o.get(a);if(!l)continue;let c=!1,u;for(let d=0;d<l.length;d++){let p=l[d];if(!p||p.action!==e)continue;c=!0;let m=!1;for(let f=d+1;f<l.length;f++){let h=l[f];if(h&&I6r(h.chord,p.chord)){m=!0;break}}if(!m)u=p.chord}if(u){for(let d=0;d<i;d++){let p=t[d];if(p===void 0)continue;let m=o.get(p);if(!m)continue;if(m.some((f)=>f&&I6r(f.chord,u)))return null}return u}if(c)s=!0}return s?null:void 0}
function dDi(e,t,n){let r=null;for(let o of n){if(o.context!==t||o.chord.length!==1)continue;let s=o.chord[0];if(s&&Xtt(s,e))r=o.action}return r}
function I6r(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++){let r=e[n],o=t[n];if(!r||!o||!Xtt(r,o))return!1}return!0}
function QAn(e,t,n){let r=x6r(e,t,n);return r?Qxi(r,Yt()):r}
function pDi(e){let t=e.name==="enter"?`
`:e.key,n=e.meta;if(Yt()==="macos"&&!e.meta&&!e.ctrl&&lDi(t))t=w6r[t],n=!0;let r=vTd[e.name]??(t.length===1?t.toLowerCase():null);if(!r)return null;let o=e.shift||t.length===1&&t!==t.toLowerCase()&&t===t.toUpperCase();return{key:r,ctrl:e.ctrl,alt:n,shift:o,meta:n,super:e.superKey}}
function Xtt(e,t){return e.key===t.key&&e.ctrl===t.ctrl&&e.shift===t.shift&&(e.alt||e.meta)===(t.alt||t.meta)&&e.super===t.super}
function mDi(e,t){if(e.length>=t.chord.length)return!1;for(let n=0;n<e.length;n++){let r=e[n],o=t.chord[n];if(!r||!o)return!1;if(!Xtt(r,o))return!1}return!0}
function fDi(e,t){if(e.length!==t.chord.length)return!1;for(let n=0;n<e.length;n++){let r=e[n],o=t.chord[n];if(!r||!o)return!1;if(!Xtt(r,o))return!1}return!0}
function YPt(e,t,n,r){if(e.name==="escape"&&r!==null)return{type:"chord_cancelled"};let o=pDi(e);if(!o){if(r!==null)return{type:"chord_cancelled"};return{type:"none"}}let s=r?[...r,o]:[o],i=new Set(t),a=n.filter((d)=>i.has(d.context)),l=new Map;for(let d of a)if(d.chord.length>s.length&&mDi(s,d))l.set(Az(d.chord),d.action);let c=!1;for(let d of l.values())if(d!==null){c=!0;break}if(c)return{type:"chord_started",pending:s};let u;for(let d of a)if(fDi(s,d))u=d;if(u){if(u.action===null)return{type:"unbound"};return{type:"match",action:u.action}}if(r!==null)return{type:"chord_cancelled"};return{type:"none"}}
function ZAn(e,t,n,r){if(e.name==="escape"&&r!==null)return{type:"chord_cancelled"};let o=pDi(e);if(!o){if(r!==null)return{type:"chord_cancelled"};return{type:"none"}}let s=r?[...r,o]:[o],i=new Set(t),a=new Map,l=new Map;for(let c of n){if(!i.has(c.context))continue;if(c.chord.length>s.length){if(mDi(s,c))a.set(Az(c.chord),c.action)}else if(fDi(s,c))l.set(c.context,c)}for(let c of a.values())if(c!==null)return{type:"chord_started",pending:s};for(let c of t){let u=l.get(c);if(u){if(u.action===null)return{type:"unbound"};return{type:"match",action:u.action}}}if(r!==null)return{type:"chord_cancelled"};return{type:"none"}}
var vTd;
var nwe=b(()=>{H6r();Es();vTd={escape:"escape",return:"enter",tab:"tab",backspace:"backspace",delete:"delete",up:"up",down:"down",left:"left",right:"right",pageup:"pageup",pagedown:"pagedown",wheelup:"wheelup",wheeldown:"wheeldown",home:"home",end:"end"}});
export {x6r,uDi,dDi,I6r,QAn,pDi,Xtt,mDi,fDi,YPt,ZAn,vTd,nwe};
