// @ts-nocheck
import {b} from "../runtime.ts";
import {ftt,AZ} from "./m2380.ts";
var uno;
var h_a=b(()=>{ftt();uno=class uno extends AZ{action;sourceEvent;isChordCompletion;origin;constructor(e,t){super("action",{bubbles:!0,cancelable:!0});this.action=e,this.sourceEvent=t?.sourceEvent??null,this.isChordCompletion=t?.isChordCompletion??!1,this.origin=t?.origin??"single"}consume(){this.stopPropagation(),this.sourceEvent?.preventDefault(),this.sourceEvent?.stopImmediatePropagation()}get consumed(){return this._isPropagationStopped()}}});
export {uno,h_a};
