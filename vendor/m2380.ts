// @ts-nocheck
import {b} from "../runtime.ts";
import {Event} from "./m2264.ts";
var AZ;
var ftt=b(()=>{AZ=class AZ extends Event{type;timeStamp;bubbles;cancelable;_target=null;_currentTarget=null;_eventPhase="none";_propagationStopped=!1;_defaultPrevented=!1;constructor(e,t){super();this.type=e,this.timeStamp=performance.now(),this.bubbles=t?.bubbles??!0,this.cancelable=t?.cancelable??!0}get target(){return this._target}get currentTarget(){return this._currentTarget}get eventPhase(){return this._eventPhase}get defaultPrevented(){return this._defaultPrevented}stopPropagation(){this._propagationStopped=!0}stopImmediatePropagation(){super.stopImmediatePropagation(),this._propagationStopped=!0}preventDefault(){if(this.cancelable)this._defaultPrevented=!0}consume(){this.preventDefault(),this.stopImmediatePropagation()}_setTarget(e){this._target=e}_setCurrentTarget(e){this._currentTarget=e}_setEventPhase(e){this._eventPhase=e}_isPropagationStopped(){return this._propagationStopped}_isImmediatePropagationStopped(){return this.didStopImmediatePropagation()}_prepareForTarget(e){}}});
export {AZ,ftt};
