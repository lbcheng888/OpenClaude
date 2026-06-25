// @ts-nocheck
import {Q} from "../runtime.ts";
import {$Bn} from "./m3740.ts";
import {NBn} from "./m3736.ts";
import {Hxa} from "./m3741.ts";
import {xxa} from "./m3742.ts";
import {Y2t} from "./m3692.ts";
var Lxa=Q((GBn)=>{Object.defineProperty(GBn,"__esModule",{value:!0});GBn.View=void 0;var qSp=$Bn(),Dxa=NBn(),WSp=Hxa(),GSp=xxa(),Pxa=Y2t();function VSp(e){return e.instrumentName==null&&e.instrumentType==null&&e.instrumentUnit==null&&e.meterName==null&&e.meterVersion==null&&e.meterSchemaUrl==null}function KSp(e){if(VSp(e))throw Error("Cannot create view with no selector arguments supplied");if(e.name!=null&&(e?.instrumentName==null||qSp.PatternPredicate.hasWildcard(e.instrumentName)))throw Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.")}class Oxa{name;description;aggregation;attributesProcessor;instrumentSelector;meterSelector;aggregationCardinalityLimit;constructor(e){if(KSp(e),e.attributesProcessors!=null)this.attributesProcessor=(0,Dxa.createMultiAttributesProcessor)(e.attributesProcessors);else this.attributesProcessor=(0,Dxa.createNoopAttributesProcessor)();this.name=e.name,this.description=e.description,this.aggregation=(0,Pxa.toAggregation)(e.aggregation??{type:Pxa.AggregationType.DEFAULT}),this.instrumentSelector=new WSp.InstrumentSelector({name:e.instrumentName,type:e.instrumentType,unit:e.instrumentUnit}),this.meterSelector=new GSp.MeterSelector({name:e.meterName,version:e.meterVersion,schemaUrl:e.meterSchemaUrl}),this.aggregationCardinalityLimit=e.aggregationCardinalityLimit}}GBn.View=Oxa});
export {Lxa};
