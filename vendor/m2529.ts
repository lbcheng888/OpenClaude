// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function yAd(e,t){switch(t.type){case"kill":{if(t.text.length===0)return e;return{ring:e.mode.type==="killing"&&e.ring.length>0?[t.direction==="prepend"?t.text+e.ring[0]:e.ring[0]+t.text,...e.ring.slice(1)]:[t.text,...e.ring].slice(0,gAd),mode:{type:"killing"}}}case"yank":return{...e,mode:{type:"yanked",start:t.start,length:t.length,index:0}};case"yankPop":{if(e.mode.type!=="yanked"||e.ring.length<=1)return e;let n=(e.mode.index+1)%e.ring.length;return{...e,mode:{...e.mode,index:n}}}case"updateYankLength":if(e.mode.type!=="yanked")return e;return{...e,mode:{...e.mode,length:t.length}};case"interrupt":if(e.mode.type==="idle")return e;return{...e,mode:{type:"idle"}}}}
function ORn(e){return e.ring[0]??""}
function LRn(e){if(e.mode.type!=="yanked"||e.ring.length<=1)return null;let t=(e.mode.index+1)%e.ring.length,{start:n,length:r}=e.mode;return{text:e.ring[t]??"",start:n,length:r}}
function ALi(){let e=_Ad;return{get state(){return e},dispatch(t){e=yAd(e,t)}}}
function vLi({children:e}){let t=gnt.useRef(null);if(t.current===null)t.current=ALi();return wLi.jsx(RLi.Provider,{value:t.current,children:e})}
function MRn(){return gnt.useContext(RLi)}
var gnt,wLi,gAd=10,_Ad,RLi;
var NRn=b(()=>{gnt=x(et(),1),wLi=x(oe(),1),_Ad={ring:[],mode:{type:"idle"}};RLi=gnt.createContext(ALi())});
export {yAd,ORn,LRn,ALi,vLi,MRn,gnt,wLi,gAd,_Ad,RLi,NRn};
