// @ts-nocheck
import {ny,v5} from "./m2375.ts";
import {useHasFocus,I$r} from "./m2445.ts";
import {Wo,Ts} from "./m2542.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function t8t(e,t,n){let r=ny(e-n+1,0,Math.max(0,t-n)),o=Math.min(r+n,t);return{windowStart:r,windowEnd:o,moreAbove:r,moreBelow:t-o}}
function ybl({count:e,visibleCount:t,containerRef:n,isDisabled:r=!1,onAccept:o,onRowKeyDown:s,onCursorChange:i,edge:a="clamp"}){let[l,c]=VDe.useState(0),u=useHasFocus(n),d=Math.max(0,e-1),p=ny(l,0,d);function m(_){c((y)=>{let S=ny(y,0,d)+_;if(a==="wrap"&&e>0)return(S%e+e)%e;return ny(S,0,d)})}VDe.useEffect(()=>{if(l!==p)c(p)},[l,p]);let f=VDe.useRef(i);f.current=i;let A=VDe.useRef(null);VDe.useEffect(()=>{if(e===0){A.current=null;return}if(A.current!==p)A.current=p,f.current?.(p)},[p,e]),Wo({"select:next":()=>m(1),"select:previous":()=>m(-1),"select:pageDown":()=>m(t),"select:pageUp":()=>m(-t),"select:first":()=>c(0),"select:last":()=>c(d)},{context:"Select",isActive:u&&!r&&e>0});function h(_){if(r||e===0)return;if(_.key==="return"&&o){o(p),_.preventDefault(),_.stopImmediatePropagation();return}s?.(_,p)}let g=t8t(p,e,t);return{cursor:p,...g,isCursor:(_)=>_===p&&e>0,hasFocus:u,setCursor:(_)=>c(ny(_,0,d)),bind:{tabIndex:0,onKeyDown:h}}}
var VDe;
var WGn=b(()=>{I$r();v5();Ts();VDe=M(Te(),1)});
export {t8t,ybl,VDe,WGn};
