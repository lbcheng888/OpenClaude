// @ts-nocheck
import {p2e,R0i,m2e,LPt} from "./m2419.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {_z,o4} from "./m2386.ts";
import {hhe,DPt} from "./m2413.ts";
import {Wki,dhe} from "./m2362.ts";
import {pO,mtt} from "./m2377.ts";
import {b} from "../runtime.ts";
function zqr(e,t){let n,r=p2e();return(o)=>{let{frontFrame:s,backFrame:i,isTTY:a,terminalWidth:l,terminalRows:c}=o,u=s.screen,d=i.screen,p=d.charPool,m=d.hyperlinkPool,f=e.yogaNode?.getComputedHeight(),h=e.yogaNode?.getComputedWidth(),g=f===void 0||!Number.isFinite(f)||f<0,_=h===void 0||!Number.isFinite(h)||h<0;if(!e.yogaNode||g||_){if(e.yogaNode&&(g||_))logForDebugging(`Invalid yoga dimensions: width=${h}, height=${f}, childNodes=${e.childNodes.length}, terminalWidth=${l}, terminalRows=${c}`);return{screen:_z(l,0,t,p,m),viewport:{width:l,height:c},cursor:{x:0,y:0,visible:!0}}}let T=Math.floor(e.yogaNode.getComputedWidth()),y=Math.floor(e.yogaNode.getComputedHeight()),S=o.altScreen?c:y;if(o.altScreen&&y>c)logForDebugging(`alt-screen: yoga height ${y} > terminalRows ${c} \u2014 `+"something is rendering outside <AlternateScreen>. Overflow clipped.",{level:"warn"});let E=d??_z(T,S,t,p,m);if(n)n.reset(T,S,E);else n=new hhe({width:T,height:S,stylePool:t,screen:E});R0i(r),r.overlayActive=o.overlayActive;let R=Wki();m2e(e,n,r,{prevScreen:R||o.prevFrameContaminated?void 0:u});let w=n.get(),H=r.scrollDrainNode;if(H)pO(H);return{scrollHint:o.altScreen?r.scrollHint:null,scrollDrainPending:H!==null,followScroll:r.followScroll,layoutShifted:r.layoutShifted,screen:w,viewport:{width:l,height:o.altScreen?c+1:c},cursor:{x:0,y:o.altScreen?Math.max(0,Math.min(E.height,c)-1):E.height,visible:!a||E.height===0}}}}
var D0i=b(()=>{qe();mtt();dhe();DPt();LPt();o4()});
export {zqr,D0i};
