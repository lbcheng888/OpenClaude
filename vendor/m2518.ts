// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Vmd(e,t){switch(t.type){case"kill":{if(t.text.length===0)return e;return{ring:e.mode.type==="killing"&&e.ring.length>0?[t.direction==="prepend"?t.text+e.ring[0]:e.ring[0]+t.text,...e.ring.slice(1)]:[t.text,...e.ring].slice(0,Wmd),mode:{type:"killing"}}}case"yank":return{...e,mode:{type:"yanked",start:t.start,length:t.length,index:0}};case"yankPop":{if(e.mode.type!=="yanked"||e.ring.length<=1)return e;let n=(e.mode.index+1)%e.ring.length;return{...e,mode:{...e.mode,index:n}}}case"updateYankLength":if(e.mode.type!=="yanked")return e;return{...e,mode:{...e.mode,length:t.length}};case"interrupt":if(e.mode.type==="idle")return e;return{...e,mode:{type:"idle"}}}}
function Kbn(e){return e.ring[0]??""}
function zbn(e){if(e.mode.type!=="yanked"||e.ring.length<=1)return null;let t=(e.mode.index+1)%e.ring.length,{start:n,length:r}=e.mode;return{text:e.ring[t]??"",start:n,length:r}}
function oHi(){let e=Gmd;return{get state(){return e},dispatch(t){e=Vmd(e,t)}}}
function iHi({children:e}){let t=vwe.useRef(null);if(t.current===null)t.current=oHi();return vwe.default.createElement(sHi.Provider,{value:t.current},e)}
function Ybn(){return vwe.useContext(sHi)}
var vwe,Wmd=10,Gmd,sHi;
var Jbn=b(()=>{vwe=M(Te(),1),Gmd={ring:[],mode:{type:"idle"}};sHi=vwe.createContext(oHi())});
export {Vmd,Kbn,zbn,oHi,iHi,Ybn,vwe,Wmd,Gmd,sHi,Jbn};
