// @ts-nocheck
import {sEi,p2r} from "./m2368.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {dTn} from "./m2283.ts";
function iEi(e,t,n){let r=e._eventHandlers;if(!r)return;let o=sEi[t];if(!o)return;let s=n?o.capture:o.bubble;if(!s)return;return r[s]}
function Usd(e,t){let n=[],r=e;while(r){let o=r===e,s=iEi(r,t.type,!0),i=iEi(r,t.type,!1);if(s)n.unshift({node:r,handler:s,phase:o?"at_target":"capturing"});if(i&&(t.bubbles||o))n.push({node:r,handler:i,phase:o?"at_target":"bubbling"});r=r.parentNode}return n}
function $sd(e,t){let n;for(let{node:r,handler:o,phase:s}of e){if(t._isImmediatePropagationStopped())break;if(t._isPropagationStopped()&&r!==n)break;t._setEventPhase(s),t._setCurrentTarget(r),t._prepareForTarget(r);try{o(t)}catch(i){De(i)}n=r}}
function qsd(e){switch(e){case"keydown":case"keyup":case"click":case"focus":case"blur":case"paste":case"action":return xZ.DiscreteEventPriority;case"resize":case"scroll":case"wheel":case"mousemove":return xZ.ContinuousEventPriority;default:return xZ.DefaultEventPriority}}
class m2r{currentEvent=null;currentUpdatePriority=xZ.DefaultEventPriority;discreteUpdates=null;resolveEventPriority(){if(this.currentUpdatePriority!==xZ.NoEventPriority)return this.currentUpdatePriority;if(this.currentEvent)return qsd(this.currentEvent.type);return xZ.DefaultEventPriority}dispatch(e,t){let n=this.currentEvent;this.currentEvent=t;try{t._setTarget(e);let r=Usd(e,t);return $sd(r,t),t._setEventPhase("none"),t._setCurrentTarget(null),!t.defaultPrevented}finally{this.currentEvent=n}}dispatchDiscrete(e,t){if(!this.discreteUpdates)return this.dispatch(e,t);return this.discreteUpdates((n,r)=>this.dispatch(n,r),e,t,void 0,void 0)}dispatchContinuous(e,t){let n=this.currentUpdatePriority;try{return this.currentUpdatePriority=xZ.ContinuousEventPriority,this.dispatch(e,t)}finally{this.currentUpdatePriority=n}}}
var xZ;
var aEi=b(()=>{Rn();p2r();xZ=M(dTn(),1)});
export {iEi,Usd,$sd,qsd,m2r,xZ,aEi};
