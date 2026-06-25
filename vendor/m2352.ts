// @ts-nocheck
import {XM,Ive} from "../src/config/2352_useDecayCurve.ts";
import {b} from "../runtime.ts";
function hhd(){i4r=!0,a4r=!0,DCn++}
function uki(){a4r=!1,DCn=0}
function dki(){let e=DCn;return DCn=0,e}
function PCn(){if(i4r)return!0;if(process.env.INTELLIJ_TERMINAL_COMMAND_BLOCKS_REWORKED!==void 0||process.env.INTELLIJ_TERMINAL_COMMAND_BLOCKS!==void 0)return i4r=!0,!0;return!1}
function pki(){return a4r}
function mki(){return{lastWheelTime:0,lastWheelDownTime:0}}
function fki(e,t,n,r){if(!XM().jediTerm)return uki(),t;let o=null;for(let s=0;s<t.length;s++){let i=t[s];if(i.kind!=="key"){o?.push(i);continue}if(i.name==="wheelup"||i.name==="wheeldown"){if(n-e.lastWheelTime>l4r)e.lastWheelDownTime=0,uki();if(e.lastWheelTime=n,i.name==="wheeldown")e.lastWheelDownTime=n;if(i.name==="wheelup"&&n-e.lastWheelDownTime<_hd&&PCn()){o??=t.slice(0,s),o.push({...i,name:"wheeldown"});continue}o?.push(i);continue}if((i.name==="up"||i.name==="down")&&!i.ctrl&&!i.meta&&!i.shift&&!i.isPasted&&n-e.lastWheelTime<ghd){if(!cki)cki=!0,r();hhd(),o??=t.slice(0,s);continue}o?.push(i)}return o??t}
var i4r=!1,cki=!1,a4r=!1,DCn=0,ghd=75,_hd=250,l4r=200;
var OCn=b(()=>{Ive()});
export {hhd,uki,dki,PCn,pki,mki,fki,i4r,cki,a4r,DCn,ghd,_hd,l4r,OCn};
