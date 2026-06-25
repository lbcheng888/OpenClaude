// @ts-nocheck
import {Q} from "../runtime.ts";
import {JO} from "./m3529.ts";
import {yf} from "./m3525.ts";
var C_e=Q((BIe)=>{Object.defineProperty(BIe,"__esModule",{value:!0});BIe.QueuePicker=BIe.UnavailablePicker=BIe.PickResultType=void 0;var Fap=JO(),Bap=yf(),v1n;(function(e){e[e.COMPLETE=0]="COMPLETE",e[e.QUEUE=1]="QUEUE",e[e.TRANSIENT_FAILURE=2]="TRANSIENT_FAILURE",e[e.DROP=3]="DROP"})(v1n||(BIe.PickResultType=v1n={}));class _Ca{constructor(e){this.status=Object.assign({code:Bap.Status.UNAVAILABLE,details:"No connection established",metadata:new Fap.Metadata},e)}pick(e){return{pickResultType:v1n.TRANSIENT_FAILURE,subchannel:null,status:this.status,onCallStarted:null,onCallEnded:null}}}BIe.UnavailablePicker=_Ca;class yCa{constructor(e,t){this.loadBalancer=e,this.childPicker=t,this.calledExitIdle=!1}pick(e){if(!this.calledExitIdle)process.nextTick(()=>{this.loadBalancer.exitIdle()}),this.calledExitIdle=!0;if(this.childPicker)return this.childPicker.pick(e);else return{pickResultType:v1n.QUEUE,subchannel:null,status:null,onCallStarted:null,onCallEnded:null}}}BIe.QueuePicker=yCa});
export {C_e};
