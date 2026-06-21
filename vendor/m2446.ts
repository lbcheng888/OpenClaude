// @ts-nocheck
import {B4,vZe,bSn,rwe} from "./m2381.ts";
import {k$r,p0t} from "../src/config/2442_isVisible.ts";
import {gF} from "./m2379.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function useAnimationTimer(e){let t=k5.useContext(B4),n=e===null?null:Math.ceil(k$r(e)/gF)*gF,r=k5.useRef(null),o=k5.useMemo(()=>{if(!t||n===null)return vZe;return(s)=>t.subscribeFollower(()=>{r.current=t.now(),s()})},[t,n]);return k5.useSyncExternalStore(o,()=>{if(!t||n===null)return r.current=null,0;if(r.current===null)r.current=t.now();return Math.floor(r.current/n)*n})}
function useInterval(e,t,n){let r=k5.useRef(e);r.current=e;let o=k5.useContext(B4),s=n?.immediate??!1,i=k5.useRef(null),a=k5.useMemo(()=>!o||t===null?(l)=>(i.current=null,()=>{}):(l)=>{if(s&&i.current===null)r.current();i.current=t;let c=!1,u,d=()=>{if(c)return;try{r.current()}finally{if(!c)u=o.setTimeout(d,t)}};return u=o.setTimeout(d,t),()=>{c=!0,u()}},[o,t,s]);k5.useSyncExternalStore(a,bSn)}
var k5;
var D$r=b(()=>{rwe();p0t();k5=M(Te(),1)});
export {useAnimationTimer,useInterval,k5,D$r};
