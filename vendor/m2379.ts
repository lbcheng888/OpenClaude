// @ts-nocheck
import {hHi,G4r} from "./m2378.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b,x} from "../runtime.ts";
import {XEn} from "./m2294.ts";
function gHi(e,t,n){let r=e._eventHandlers;if(!r)return;let o=hHi[t];if(!o)return;let s=n?o.capture:o.bubble;if(!s)return;return r[s]}
function dgd(e,t){let n=[],r=e;while(r){let o=r===e,s=gHi(r,t.type,!0),i=gHi(r,t.type,!1);if(s)n.unshift({node:r,handler:s,phase:o?"at_target":"capturing"});if(i&&(t.bubbles||o))n.push({node:r,handler:i,phase:o?"at_target":"bubbling"});r=r.parentNode}return n}
function pgd(e,t){let n;for(let{node:r,handler:o,phase:s}of e){if(t._isImmediatePropagationStopped())break;if(t._isPropagationStopped()&&r!==n)break;t._setEventPhase(s),t._setCurrentTarget(r),t._prepareForTarget(r);try{o(t)}catch(i){Ie(i)}n=r}}
function mgd(e){switch(e){case"keydown":case"keyup":case"click":case"focus":case"blur":case"paste":case"action":return CZ.DiscreteEventPriority;case"resize":case"scroll":case"wheel":case"mousemove":return CZ.ContinuousEventPriority;default:return CZ.DefaultEventPriority}}
class V4r{currentEvent=null;currentUpdatePriority=CZ.DefaultEventPriority;discreteUpdates=null;resolveEventPriority(){if(this.currentUpdatePriority!==CZ.NoEventPriority)return this.currentUpdatePriority;if(this.currentEvent)return mgd(this.currentEvent.type);return CZ.DefaultEventPriority}dispatch(e,t){let n=this.currentEvent;this.currentEvent=t;try{t._setTarget(e);let r=dgd(e,t);return pgd(r,t),t._setEventPhase("none"),t._setCurrentTarget(null),!t.defaultPrevented}finally{this.currentEvent=n}}dispatchDiscrete(e,t){if(!this.discreteUpdates)return this.dispatch(e,t);return this.discreteUpdates((n,r)=>this.dispatch(n,r),e,t,void 0,void 0)}dispatchContinuous(e,t){let n=this.currentUpdatePriority;try{return this.currentUpdatePriority=CZ.ContinuousEventPriority,this.dispatch(e,t)}finally{this.currentUpdatePriority=n}}}
var CZ;
var _Hi=b(()=>{vn();G4r();CZ=x(XEn(),1)});
export {gHi,dgd,pgd,mgd,V4r,CZ,_Hi};
