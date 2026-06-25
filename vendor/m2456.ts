// @ts-nocheck
import {s4,vtt,lAn,$ve} from "./m2391.ts";
import {i6r,qPt} from "../src/config/2452_isVisible.ts";
import {UF} from "./m2389.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useAnimationTimer(e){let t=W8.useContext(s4),n=e===null?null:Math.ceil(i6r(e)/UF)*UF,r=W8.useRef(null),o=W8.useMemo(()=>{if(!t||n===null)return vtt;return(s)=>t.subscribeFollower(()=>{r.current=t.now(),s()})},[t,n]);return W8.useSyncExternalStore(o,()=>{if(!t||n===null)return r.current=null,0;if(r.current===null)r.current=t.now();return Math.floor(r.current/n)*n})}
function useInterval(e,t,n){let r=W8.useRef(e);r.current=e;let o=W8.useContext(s4),s=n?.immediate??!1,i=W8.useRef(null),a=W8.useMemo(()=>!o||t===null?(l)=>(i.current=null,()=>{}):(l)=>{if(s&&i.current===null)r.current();i.current=t;let c=!1,u,d=()=>{if(c)return;try{r.current()}finally{if(!c)u=o.setTimeout(d,t)}};return u=o.setTimeout(d,t),()=>{c=!0,u()}},[o,t,s]);W8.useSyncExternalStore(a,lAn)}
var W8;
var c6r=b(()=>{$ve();qPt();W8=x(et(),1)});
export {useAnimationTimer,useInterval,W8,c6r};
