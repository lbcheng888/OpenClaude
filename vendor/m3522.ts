// @ts-nocheck
import {X} from "../runtime.ts";
import {DL} from "./m3513.ts";
import {aA} from "./m3509.ts";
var cge=X((Qke)=>{Object.defineProperty(Qke,"__esModule",{value:!0});Qke.QueuePicker=Qke.UnavailablePicker=Qke.PickResultType=void 0;var JJd=DL(),XJd=aA(),POn;(function(e){e[e.COMPLETE=0]="COMPLETE",e[e.QUEUE=1]="QUEUE",e[e.TRANSIENT_FAILURE=2]="TRANSIENT_FAILURE",e[e.DROP=3]="DROP"})(POn||(Qke.PickResultType=POn={}));class nha{constructor(e){this.status=Object.assign({code:XJd.Status.UNAVAILABLE,details:"No connection established",metadata:new JJd.Metadata},e)}pick(e){return{pickResultType:POn.TRANSIENT_FAILURE,subchannel:null,status:this.status,onCallStarted:null,onCallEnded:null}}}Qke.UnavailablePicker=nha;class rha{constructor(e,t){this.loadBalancer=e,this.childPicker=t,this.calledExitIdle=!1}pick(e){if(!this.calledExitIdle)process.nextTick(()=>{this.loadBalancer.exitIdle()}),this.calledExitIdle=!0;if(this.childPicker)return this.childPicker.pick(e);else return{pickResultType:POn.QUEUE,subchannel:null,status:null,onCallStarted:null,onCallEnded:null}}}Qke.QueuePicker=rha});
export {cge};
