// @ts-nocheck
import {AUe,pvi,hUe,o0t} from "./m2409.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {qK,N4} from "./m2376.ts";
import {oAe,t0t} from "./m2403.ts";
import {Pbi,tAe} from "./m2352.ts";
import {YO,mZe} from "./m2367.ts";
import {b} from "../runtime.ts";
function h$r(e,t){let n,r=AUe();return(o)=>{let{frontFrame:s,backFrame:i,isTTY:a,terminalWidth:l,terminalRows:c}=o,u=s.screen,d=i.screen,p=d.charPool,m=d.hyperlinkPool,f=e.yogaNode?.getComputedHeight(),A=e.yogaNode?.getComputedWidth(),h=f===void 0||!Number.isFinite(f)||f<0,g=A===void 0||!Number.isFinite(A)||A<0;if(!e.yogaNode||h||g){if(e.yogaNode&&(h||g))logForDebugging(`Invalid yoga dimensions: width=${A}, height=${f}, childNodes=${e.childNodes.length}, terminalWidth=${l}, terminalRows=${c}`);return{screen:qK(l,0,t,p,m),viewport:{width:l,height:c},cursor:{x:0,y:0,visible:!0}}}let _=Math.floor(e.yogaNode.getComputedWidth()),y=Math.floor(e.yogaNode.getComputedHeight()),T=o.altScreen?c:y;if(o.altScreen&&y>c)logForDebugging(`alt-screen: yoga height ${y} > terminalRows ${c} \u2014 `+"something is rendering outside <AlternateScreen>. Overflow clipped.",{level:"warn"});let S=d??qK(_,T,t,p,m);if(n)n.reset(_,T,S);else n=new oAe({width:_,height:T,stylePool:t,screen:S});pvi(r),r.overlayActive=o.overlayActive;let v=Pbi();hUe(e,n,r,{prevScreen:v||o.prevFrameContaminated?void 0:u});let R=n.get(),k=r.scrollDrainNode;if(k)YO(k);return{scrollHint:o.altScreen?r.scrollHint:null,scrollDrainPending:k!==null,followScroll:r.followScroll,layoutShifted:r.layoutShifted,screen:R,viewport:{width:l,height:o.altScreen?c+1:c},cursor:{x:0,y:o.altScreen?Math.max(0,Math.min(S.height,c)-1):S.height,visible:!a||S.height===0}}}}
var yvi=b(()=>{qe();mZe();tAe();t0t();o0t();N4()});
export {h$r,yvi};
