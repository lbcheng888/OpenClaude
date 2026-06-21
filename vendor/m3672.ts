// @ts-nocheck
import {X} from "../runtime.ts";
import {Kit} from "./m3661.ts";
import {ute} from "./m3657.ts";
import {bge} from "./m3659.ts";
var TEa=X((eat)=>{Object.defineProperty(eat,"__esModule",{value:!0});eat.LastValueAggregator=eat.LastValueAccumulation=void 0;var slp=Kit(),hFt=ute(),ilp=bge();class gFt{startTime;_current;sampleTime;constructor(e,t=0,n=[0,0]){this.startTime=e,this._current=t,this.sampleTime=n}record(e){this._current=e,this.sampleTime=(0,hFt.millisToHrTime)(Date.now())}setStartTime(e){this.startTime=e}toPointValue(){return this._current}}eat.LastValueAccumulation=gFt;class yEa{kind=slp.AggregatorKind.LAST_VALUE;createAccumulation(e){return new gFt(e)}merge(e,t){let n=(0,hFt.hrTimeToMicroseconds)(t.sampleTime)>=(0,hFt.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new gFt(e.startTime,n.toPointValue(),n.sampleTime)}diff(e,t){let n=(0,hFt.hrTimeToMicroseconds)(t.sampleTime)>=(0,hFt.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new gFt(t.startTime,n.toPointValue(),n.sampleTime)}toMetricData(e,t,n,r){return{descriptor:e,aggregationTemporality:t,dataPointType:ilp.DataPointType.GAUGE,dataPoints:n.map(([o,s])=>({attributes:o,startTime:s.startTime,endTime:r,value:s.toPointValue()}))}}}eat.LastValueAggregator=yEa});
export {TEa};
