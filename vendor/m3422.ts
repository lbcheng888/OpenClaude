// @ts-nocheck
import {Q} from "../runtime.ts";
import {oMn} from "./m3419.ts";
import {eMn} from "./m3415.ts";
import {OTa} from "./m3420.ts";
import {MTa} from "./m3421.ts";
import {fUt} from "./m3394.ts";
var UTa=Q((aMn)=>{Object.defineProperty(aMn,"__esModule",{value:!0});aMn.View=void 0;var lrp=oMn(),NTa=eMn(),crp=OTa(),urp=MTa(),FTa=fUt();function drp(e){return e.instrumentName==null&&e.instrumentType==null&&e.instrumentUnit==null&&e.meterName==null&&e.meterVersion==null&&e.meterSchemaUrl==null}function prp(e){if(drp(e))throw Error("Cannot create view with no selector arguments supplied");if(e.name!=null&&(e?.instrumentName==null||lrp.PatternPredicate.hasWildcard(e.instrumentName)))throw Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.")}class BTa{name;description;aggregation;attributesProcessor;instrumentSelector;meterSelector;aggregationCardinalityLimit;constructor(e){if(prp(e),e.attributesProcessors!=null)this.attributesProcessor=(0,NTa.createMultiAttributesProcessor)(e.attributesProcessors);else this.attributesProcessor=(0,NTa.createNoopAttributesProcessor)();this.name=e.name,this.description=e.description,this.aggregation=(0,FTa.toAggregation)(e.aggregation??{type:FTa.AggregationType.DEFAULT}),this.instrumentSelector=new crp.InstrumentSelector({name:e.instrumentName,type:e.instrumentType,unit:e.instrumentUnit}),this.meterSelector=new urp.MeterSelector({name:e.meterName,version:e.meterVersion,schemaUrl:e.meterSchemaUrl}),this.aggregationCardinalityLimit=e.aggregationCardinalityLimit}}aMn.View=BTa});
export {UTa};
