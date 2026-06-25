// @ts-nocheck
import {Q} from "../runtime.ts";
import {wat} from "./m3379.ts";
import {pg} from "./m2138.ts";
import {DIe} from "./m3377.ts";
var yya=Q((Oat)=>{Object.defineProperty(Oat,"__esModule",{value:!0});Oat.LastValueAggregator=Oat.LastValueAccumulation=void 0;var onp=wat(),dUt=pg(),snp=DIe();class pUt{startTime;_current;sampleTime;constructor(e,t=0,n=[0,0]){this.startTime=e,this._current=t,this.sampleTime=n}record(e){this._current=e,this.sampleTime=(0,dUt.millisToHrTime)(Date.now())}setStartTime(e){this.startTime=e}toPointValue(){return this._current}}Oat.LastValueAccumulation=pUt;class _ya{kind=onp.AggregatorKind.LAST_VALUE;createAccumulation(e){return new pUt(e)}merge(e,t){let n=(0,dUt.hrTimeToMicroseconds)(t.sampleTime)>=(0,dUt.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new pUt(e.startTime,n.toPointValue(),n.sampleTime)}diff(e,t){let n=(0,dUt.hrTimeToMicroseconds)(t.sampleTime)>=(0,dUt.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new pUt(t.startTime,n.toPointValue(),n.sampleTime)}toMetricData(e,t,n,r){return{descriptor:e,aggregationTemporality:t,dataPointType:snp.DataPointType.GAUGE,dataPoints:n.map(([o,s])=>({attributes:o,startTime:s.startTime,endTime:r,value:s.toPointValue()}))}}}Oat.LastValueAggregator=_ya});
export {yya};
