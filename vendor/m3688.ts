// @ts-nocheck
import {Q} from "../runtime.ts";
import {Glt} from "./m3677.ts";
import {ote} from "./m3673.ts";
import {M_e} from "./m3675.ts";
var LIa=Q((Xlt)=>{Object.defineProperty(Xlt,"__esModule",{value:!0});Xlt.LastValueAggregator=Xlt.LastValueAccumulation=void 0;var Kyp=Glt(),K2t=ote(),zyp=M_e();class z2t{startTime;_current;sampleTime;constructor(e,t=0,n=[0,0]){this.startTime=e,this._current=t,this.sampleTime=n}record(e){this._current=e,this.sampleTime=(0,K2t.millisToHrTime)(Date.now())}setStartTime(e){this.startTime=e}toPointValue(){return this._current}}Xlt.LastValueAccumulation=z2t;class OIa{kind=Kyp.AggregatorKind.LAST_VALUE;createAccumulation(e){return new z2t(e)}merge(e,t){let n=(0,K2t.hrTimeToMicroseconds)(t.sampleTime)>=(0,K2t.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new z2t(e.startTime,n.toPointValue(),n.sampleTime)}diff(e,t){let n=(0,K2t.hrTimeToMicroseconds)(t.sampleTime)>=(0,K2t.hrTimeToMicroseconds)(e.sampleTime)?t:e;return new z2t(t.startTime,n.toPointValue(),n.sampleTime)}toMetricData(e,t,n,r){return{descriptor:e,aggregationTemporality:t,dataPointType:zyp.DataPointType.GAUGE,dataPoints:n.map(([o,s])=>({attributes:o,startTime:s.startTime,endTime:r,value:s.toPointValue()}))}}}Xlt.LastValueAggregator=OIa});
export {LIa};
