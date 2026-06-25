// @ts-nocheck
import {oy,B8} from "./m2385.ts";
import {useHasFocus,l6r} from "./m2455.ts";
import {Oo,ss} from "./m2553.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function IWt(e,t,n){let r=oy(e-n+1,0,Math.max(0,t-n)),o=Math.min(r+n,t);return{windowStart:r,windowEnd:o,moreAbove:r,moreBelow:t-o}}
function Wbl({count:e,visibleCount:t,containerRef:n,isDisabled:r=!1,onAccept:o,onRowKeyDown:s,onCursorChange:i,edge:a="clamp"}){let[l,c]=vPe.useState(0),u=useHasFocus(n),d=Math.max(0,e-1),p=oy(l,0,d);function m(T){c((y)=>{let E=oy(y,0,d)+T;if(a==="wrap"&&e>0)return(E%e+e)%e;return oy(E,0,d)})}vPe.useEffect(()=>{if(l!==p)c(p)},[l,p]);let f=vPe.useRef(i);f.current=i;let h=vPe.useRef(null);vPe.useEffect(()=>{if(e===0){h.current=null;return}if(h.current!==p)h.current=p,f.current?.(p)},[p,e]),Oo({"select:next":()=>m(1),"select:previous":()=>m(-1),"select:pageDown":()=>m(t),"select:pageUp":()=>m(-t),"select:first":()=>c(0),"select:last":()=>c(d)},{context:"Select",isActive:u&&!r&&e>0});function g(T){if(r||e===0)return;if(T.key==="return"&&o){o(p),T.preventDefault(),T.stopImmediatePropagation();return}s?.(T,p)}let _=IWt(p,e,t);return{cursor:p,..._,isCursor:(T)=>T===p&&e>0,hasFocus:u,setCursor:(T)=>c(oy(T,0,d)),bind:{tabIndex:0,onKeyDown:g}}}
var vPe;
var z7n=b(()=>{l6r();B8();ss();vPe=x(et(),1)});
export {IWt,Wbl,vPe,z7n};
