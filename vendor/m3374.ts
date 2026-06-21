// @ts-nocheck
import {X} from "../runtime.ts";
import {Hst} from "./m3363.ts";
import {ag} from "./m2133.ts";
import {Gke} from "./m3361.ts";
var rda=X((Nst)=>{Object.defineProperty(Nst,"__esModule",{value:!0});Nst.LastValueAggregator=Nst.LastValueAccumulation=void 0;var gVd=Hst(),LNt=ag(),_Vd=Gke();class MNt{startTime;_current;sampleTime;constructor(e,t=0,n=[0,0]){this.startTime=e,this._current=t,this.sampleTime=n}record(e){this._current=e,this.sampleTime=(0,LNt.millisToHrTime)(Date.now())}setStartTime(e){this.startTime=e}toPointValue(){return this._current}}Nst.LastValueAccumulation=MNt;class nda{kind=gVd.AggregatorKind.LAST_VALUE;createAccumulation(e){return new MNt(e)}merge(e,t){let n=(0,LNt.hrTimeToMicroseconds)(t.sampleTime)>=(0,LNt.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new MNt(e.startTime,n.toPointValue(),n.sampleTime)}diff(e,t){let n=(0,LNt.hrTimeToMicroseconds)(t.sampleTime)>=(0,LNt.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new MNt(t.startTime,n.toPointValue(),n.sampleTime)}toMetricData(e,t,n,r){return{descriptor:e,aggregationTemporality:t,dataPointType:_Vd.DataPointType.GAUGE,dataPoints:n.map(([o,s])=>({attributes:o,startTime:s.startTime,endTime:r,value:s.toPointValue()}))}}}Nst.LastValueAggregator=nda});
export {rda};
