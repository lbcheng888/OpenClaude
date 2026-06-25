// @ts-nocheck
import {Q} from "../runtime.ts";
import {hUt} from "./m3401.ts";
var Uno=Q((VLn)=>{Object.defineProperty(VLn,"__esModule",{value:!0});VLn.MetricStorage=void 0;var Anp=hUt();class Xya{_instrumentDescriptor;constructor(e){this._instrumentDescriptor=e}getInstrumentDescriptor(){return this._instrumentDescriptor}updateDescription(e){this._instrumentDescriptor=(0,Anp.createInstrumentDescriptor)(this._instrumentDescriptor.name,this._instrumentDescriptor.type,{description:e,valueType:this._instrumentDescriptor.valueType,unit:this._instrumentDescriptor.unit,advice:this._instrumentDescriptor.advice})}}VLn.MetricStorage=Xya});
export {Uno};
