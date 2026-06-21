// @ts-nocheck
import {e3r,Z9r} from "./m2522.ts";
import {ro,b,M} from "../runtime.ts";
import {useClock} from "./m2432.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function RHi(){if(wHi)return;wHi=!0;try{let{prewarm:e}=(e3r(),ro(Z9r));e()}catch{}}
function xHi(e){let{isModifierPressed:t}=(e3r(),ro(Z9r));return t(e)}
var wHi=!1;
function logFeatureBadAsync(e,t,n,r=Afd){let o=useClock(),s=xwe.useRef(0),i=xwe.useRef(void 0),a=xwe.useCallback(()=>{if(i.current)i.current(),i.current=void 0},[]);return xwe.useEffect(()=>()=>{a()},[a]),xwe.useCallback(()=>{let l=Date.now();if(l-s.current<=r&&i.current!==void 0)a(),e(!1),t();else n?.(),e(!0),a(),i.current=o.setTimeout(()=>{e(!1),i.current=void 0},r);s.current=l},[e,t,n,a,o,r])}
var xwe,Afd=800;
var get=b(()=>{ze();xwe=M(Te(),1)});
export {RHi,xHi,wHi,logFeatureBadAsync,xwe,Afd,get};
