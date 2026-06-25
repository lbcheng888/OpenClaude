// @ts-nocheck
import {D5r,x5r} from "./m2533.ts";
import {oo,b,x} from "../runtime.ts";
import {useClock} from "./m2442.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function jLi(){if(zLi)return;zLi=!0;try{let{prewarm:e}=(D5r(),oo(x5r));e()}catch{}}
function YLi(e){let{isModifierPressed:t}=(D5r(),oo(x5r));return t(e)}
var zLi=!1;
function X2(e,t,n,r=$Ad){let o=useClock(),s=pwe.useRef(0),i=pwe.useRef(void 0),a=pwe.useCallback(()=>{if(i.current)i.current(),i.current=void 0},[]);return pwe.useEffect(()=>()=>{a()},[a]),pwe.useCallback(()=>{let l=Date.now();if(l-s.current<=r&&i.current!==void 0)a(),e(!1),t();else n?.(),e(!0),a(),i.current=o.setTimeout(()=>{e(!1),i.current=void 0},r);s.current=l},[e,t,n,a,o,r])}
var pwe,$Ad=800;
var Snt=b(()=>{je();pwe=x(et(),1)});
export {jLi,YLi,zLi,X2,pwe,$Ad,Snt};
