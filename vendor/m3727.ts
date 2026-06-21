// @ts-nocheck
import {X} from "../runtime.ts";
import {z1n} from "./m3724.ts";
import {W1n} from "./m3720.ts";
import {fva} from "./m3725.ts";
import {hva} from "./m3726.ts";
import {yFt} from "./m3676.ts";
var Tva=X((X1n)=>{Object.defineProperty(X1n,"__esModule",{value:!0});X1n.View=void 0;var tup=z1n(),gva=W1n(),nup=fva(),rup=hva(),_va=yFt();function oup(e){return e.instrumentName==null&&e.instrumentType==null&&e.instrumentUnit==null&&e.meterName==null&&e.meterVersion==null&&e.meterSchemaUrl==null}function sup(e){if(oup(e))throw Error("Cannot create view with no selector arguments supplied");if(e.name!=null&&(e?.instrumentName==null||tup.PatternPredicate.hasWildcard(e.instrumentName)))throw Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.")}class yva{name;description;aggregation;attributesProcessor;instrumentSelector;meterSelector;aggregationCardinalityLimit;constructor(e){if(sup(e),e.attributesProcessors!=null)this.attributesProcessor=(0,gva.createMultiAttributesProcessor)(e.attributesProcessors);else this.attributesProcessor=(0,gva.createNoopAttributesProcessor)();this.name=e.name,this.description=e.description,this.aggregation=(0,_va.toAggregation)(e.aggregation??{type:_va.AggregationType.DEFAULT}),this.instrumentSelector=new nup.InstrumentSelector({name:e.instrumentName,type:e.instrumentType,unit:e.instrumentUnit}),this.meterSelector=new rup.MeterSelector({name:e.meterName,version:e.meterVersion,schemaUrl:e.meterSchemaUrl}),this.aggregationCardinalityLimit=e.aggregationCardinalityLimit}}X1n.View=yva});
export {Tva};
