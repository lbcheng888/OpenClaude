// @ts-nocheck
import {b} from "../runtime.ts";
import {fZe,kZ} from "./m2370.ts";
var xXr;
var nua=b(()=>{fZe();xXr=class xXr extends kZ{action;sourceEvent;isChordCompletion;origin;constructor(e,t){super("action",{bubbles:!0,cancelable:!0});this.action=e,this.sourceEvent=t?.sourceEvent??null,this.isChordCompletion=t?.isChordCompletion??!1,this.origin=t?.origin??"single"}consume(){this.stopPropagation(),this.sourceEvent?.preventDefault(),this.sourceEvent?.stopImmediatePropagation()}get consumed(){return this._isPropagationStopped()}}});
export {xXr,nua};
