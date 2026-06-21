// @ts-nocheck
import {B1,Gve} from "../src/config/2342_useDecayCurve.ts";
import {b} from "../runtime.ts";
function qod(){kUr=!0,HUr=!0,VTn++}
function tbi(){HUr=!1,VTn=0}
function nbi(){let e=VTn;return VTn=0,e}
function KTn(){if(kUr)return!0;if(process.env.INTELLIJ_TERMINAL_COMMAND_BLOCKS_REWORKED!==void 0||process.env.INTELLIJ_TERMINAL_COMMAND_BLOCKS!==void 0)return kUr=!0,!0;return!1}
function rbi(){return HUr}
function obi(){return{lastWheelTime:0,lastWheelDownTime:0}}
function sbi(e,t,n,r){if(!B1().jediTerm)return tbi(),t;let o=null;for(let s=0;s<t.length;s++){let i=t[s];if(i.kind!=="key"){o?.push(i);continue}if(i.name==="wheelup"||i.name==="wheeldown"){if(n-e.lastWheelTime>IUr)e.lastWheelDownTime=0,tbi();if(e.lastWheelTime=n,i.name==="wheeldown")e.lastWheelDownTime=n;if(i.name==="wheelup"&&n-e.lastWheelDownTime<Wod&&KTn()){o??=t.slice(0,s),o.push({...i,name:"wheeldown"});continue}o?.push(i);continue}if((i.name==="up"||i.name==="down")&&!i.ctrl&&!i.meta&&!i.shift&&!i.isPasted&&n-e.lastWheelTime<jod){if(!ebi)ebi=!0,r();qod(),o??=t.slice(0,s);continue}o?.push(i)}return o??t}
var kUr=!1,ebi=!1,HUr=!1,VTn=0,jod=75,Wod=250,IUr=200;
var zTn=b(()=>{Gve()});
export {qod,tbi,nbi,KTn,rbi,obi,sbi,kUr,ebi,HUr,VTn,jod,Wod,IUr,zTn};
