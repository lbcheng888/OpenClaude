// @ts-nocheck
import {X} from "../runtime.ts";
import {dPn} from "./m3403.ts";
import {aPn} from "./m3399.ts";
import {ypa} from "./m3404.ts";
import {Spa} from "./m3405.ts";
import {BNt} from "./m3378.ts";
var vpa=X((fPn)=>{Object.defineProperty(fPn,"__esModule",{value:!0});fPn.View=void 0;var S7d=dPn(),bpa=aPn(),b7d=ypa(),E7d=Spa(),Epa=BNt();function C7d(e){return e.instrumentName==null&&e.instrumentType==null&&e.instrumentUnit==null&&e.meterName==null&&e.meterVersion==null&&e.meterSchemaUrl==null}function v7d(e){if(C7d(e))throw Error("Cannot create view with no selector arguments supplied");if(e.name!=null&&(e?.instrumentName==null||S7d.PatternPredicate.hasWildcard(e.instrumentName)))throw Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.")}class Cpa{name;description;aggregation;attributesProcessor;instrumentSelector;meterSelector;aggregationCardinalityLimit;constructor(e){if(v7d(e),e.attributesProcessors!=null)this.attributesProcessor=(0,bpa.createMultiAttributesProcessor)(e.attributesProcessors);else this.attributesProcessor=(0,bpa.createNoopAttributesProcessor)();this.name=e.name,this.description=e.description,this.aggregation=(0,Epa.toAggregation)(e.aggregation??{type:Epa.AggregationType.DEFAULT}),this.instrumentSelector=new b7d.InstrumentSelector({name:e.instrumentName,type:e.instrumentType,unit:e.instrumentUnit}),this.meterSelector=new E7d.MeterSelector({name:e.meterName,version:e.meterVersion,schemaUrl:e.meterSchemaUrl}),this.aggregationCardinalityLimit=e.aggregationCardinalityLimit}}fPn.View=Cpa});
export {vpa};
